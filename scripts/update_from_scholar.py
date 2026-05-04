#!/usr/bin/env python3
"""
Update data/publications.json with fresh data from Google Scholar + OpenAlex.

Strategy:
  1. Fetch the user's Scholar profile via the `scholarly` library.
  2. For each paper Scholar reports:
       - try to match against an existing entry by normalized title;
       - if matched, refresh only the citation count and (if missing) the link;
       - if new, add it with whatever Scholar gives us.
  3. For papers with DOIs that are missing abstracts, fetch the abstract from
     OpenAlex (free, no auth, reliable). Skip silently on any failure.
  4. Update the top-level totals (total citations, h-index, i10-index).
  5. Always preserve manually curated fields: featured, tags, doi, link.
  6. If Scholar fetching fails entirely (CAPTCHA, network, etc.), exit 0 with
     a non-fatal warning so the GitHub Action doesn't fail and the site keeps
     serving the previous data.

Run locally:
    pip install -r requirements.txt
    python scripts/update_from_scholar.py
"""
from __future__ import annotations

import json
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = REPO_ROOT / "data" / "publications.json"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 "
    "(KHTML, like Gecko) Version/16.6 Safari/605.1.15"
)
OPENALEX_MAILTO = "ashutosh.ghimire@wright.edu"  # OpenAlex courtesy header


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def normalize_title(t: str) -> str:
    """Make titles comparable across small whitespace / punctuation differences."""
    t = (t or "").lower()
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def http_get_json(url: str, timeout: int = 15):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8"))


def reconstruct_abstract_inverted(inv_idx) -> str | None:
    """OpenAlex returns abstracts as inverted indices to side-step copyright;
    we reconstruct the prose."""
    if not inv_idx:
        return None
    positions: list[tuple[int, str]] = []
    for word, idxs in inv_idx.items():
        for i in idxs:
            positions.append((i, word))
    positions.sort()
    text = " ".join(w for _, w in positions)
    # Truncate at ~280 chars on a sentence boundary to keep things compact
    if len(text) > 320:
        cut = text[:320]
        last_period = cut.rfind(". ")
        text = cut[: last_period + 1] if last_period > 100 else cut + "…"
    return text


def fetch_openalex_abstract(doi: str) -> str | None:
    if not doi:
        return None
    try:
        url = f"https://api.openalex.org/works/doi:{urllib.parse.quote(doi)}?mailto={OPENALEX_MAILTO}"
        data = http_get_json(url)
        return reconstruct_abstract_inverted(data.get("abstract_inverted_index"))
    except Exception as exc:
        print(f"  · OpenAlex miss for {doi}: {exc}", file=sys.stderr)
        return None


# ---------------------------------------------------------------------------
# Scholar fetch — wrapped in a try so failures are non-fatal
# ---------------------------------------------------------------------------
def fetch_scholar(user_id: str) -> dict | None:
    try:
        from scholarly import scholarly  # type: ignore
    except ImportError:
        print("scholarly not installed — pip install scholarly", file=sys.stderr)
        return None

    print(f"Fetching Scholar profile {user_id} …", file=sys.stderr)
    try:
        author = scholarly.search_author_id(user_id)
        author = scholarly.fill(author, sections=["basics", "indices", "publications"])
    except Exception as exc:
        print(f"Scholar fetch failed: {exc}", file=sys.stderr)
        return None

    pubs = []
    for entry in author.get("publications", []):
        try:
            bib = entry.get("bib", {})
            pubs.append({
                "title": (bib.get("title") or "").strip(),
                "authors": bib.get("author") or bib.get("authors") or "",
                "venue": bib.get("venue") or bib.get("citation") or "",
                "year": str(bib.get("pub_year") or bib.get("year") or "").strip(),
                "citations": int(entry.get("num_citations") or 0),
                "scholar_id": entry.get("author_pub_id") or None,
                "scholar_url": (
                    f"https://scholar.google.com/citations?view_op=view_citation"
                    f"&hl=en&user={user_id}&citation_for_view={entry['author_pub_id']}"
                    if entry.get("author_pub_id")
                    else None
                ),
            })
        except Exception as exc:
            print(f"  · skipped a publication: {exc}", file=sys.stderr)

    return {
        "total_citations": int(author.get("citedby", 0) or 0),
        "h_index": int(author.get("hindex", 0) or 0),
        "i10_index": int(author.get("i10index", 0) or 0),
        "publications": pubs,
    }


# ---------------------------------------------------------------------------
# Main merge
# ---------------------------------------------------------------------------
def main() -> int:
    if not DATA_FILE.exists():
        print(f"missing {DATA_FILE}", file=sys.stderr)
        return 1

    db = json.loads(DATA_FILE.read_text())
    user_id = db.get("scholar_user_id") or "mhTDRysAAAAJ"

    scholar = fetch_scholar(user_id)
    if not scholar:
        # Non-fatal: keep existing data, just record the failed attempt.
        db["last_refreshed"] = date.today().isoformat()
        db["last_refresh_status"] = "scholar fetch failed; previous data retained"
        DATA_FILE.write_text(json.dumps(db, indent=2, ensure_ascii=False))
        print("Scholar unavailable; kept existing data.")
        return 0

    # --- merge by normalized title ---
    by_title: dict[str, dict] = {normalize_title(p["title"]): p for p in db["publications"]}

    new_count = 0
    update_count = 0
    for s in scholar["publications"]:
        if not s["title"]:
            continue
        key = normalize_title(s["title"])
        existing = by_title.get(key)
        if existing:
            # Refresh citation count + scholar URL; do NOT overwrite curated fields
            existing["citations"] = s["citations"]
            existing["scholar_id"] = s["scholar_id"]
            existing["scholar_url"] = s["scholar_url"]
            if not existing.get("link") and s["scholar_url"]:
                existing["link"] = s["scholar_url"]
            update_count += 1
        else:
            db["publications"].append({
                "title": s["title"],
                "authors": s["authors"],
                "venue": s["venue"],
                "year": s["year"] or "",
                "type": "Other",
                "featured": False,
                "tags": [],
                "link": s["scholar_url"] or db["scholar_profile_url"],
                "doi": None,
                "citations": s["citations"],
                "abstract": None,
                "scholar_id": s["scholar_id"],
                "scholar_url": s["scholar_url"],
            })
            new_count += 1

    # --- top-level stats ---
    db["total_citations"] = scholar["total_citations"] or db.get("total_citations", 0)
    db["h_index"] = scholar["h_index"]
    db["i10_index"] = scholar["i10_index"]

    # --- abstract enrichment via OpenAlex (only for entries with DOI + missing abstract) ---
    print("\nEnriching abstracts from OpenAlex …", file=sys.stderr)
    enriched = 0
    for p in db["publications"]:
        if p.get("doi") and not p.get("abstract"):
            abs_text = fetch_openalex_abstract(p["doi"])
            if abs_text:
                p["abstract"] = abs_text
                enriched += 1
            time.sleep(0.2)  # courtesy throttle

    # --- sort by year desc, then citations desc ---
    def sort_key(p):
        try:
            year = int(p.get("year") or 0)
        except ValueError:
            year = 0
        return (-year, -(p.get("citations") or 0))

    db["publications"].sort(key=sort_key)

    db["last_refreshed"] = date.today().isoformat()
    db["last_refresh_status"] = (
        f"ok — {update_count} updated, {new_count} new, {enriched} abstracts enriched"
    )

    DATA_FILE.write_text(json.dumps(db, indent=2, ensure_ascii=False))
    print(
        f"\nDone. {update_count} updated, {new_count} new, {enriched} abstracts. "
        f"Citations: {db['total_citations']}, h={db['h_index']}, i10={db['i10_index']}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
