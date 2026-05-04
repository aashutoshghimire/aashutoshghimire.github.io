#!/usr/bin/env python3
"""
Generate publications.html from data/publications.json and update the citation
markers in index.html.

This is intentionally simple: only the publications page and the citation
counters on the home page are auto-managed. Every other page stays
hand-editable.

Markers in HTML files (do not remove):
    <!--AUTO:CITATIONS-->NN<!--/AUTO:CITATIONS-->
    <!--AUTO:PAPERS-->NN<!--/AUTO:PAPERS-->
    <!--AUTO:UPDATED-->Month Year<!--/AUTO:UPDATED-->
"""
from __future__ import annotations

import json
import re
from datetime import date
from html import escape as html_escape
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DATA = REPO / "data" / "publications.json"


def author_html(s: str) -> str:
    if not s:
        return ""
    return re.sub(r"\bAshutosh Ghimire\b", "<em>Ashutosh Ghimire</em>", html_escape(s))


def pub_li(pub: dict) -> str:
    link = pub.get("link") or pub.get("scholar_url") or "#"
    tags = "".join(
        f'<span class="tag">{html_escape(t)}</span>' for t in (pub.get("tags") or [])
    )
    citations_chip = ""
    if pub.get("citations") is not None:
        n = pub["citations"]
        citations_chip = (
            f'<span class="cite-count" title="Google Scholar citations">'
            f'{n} citation{"s" if n != 1 else ""}</span>'
        )
    abstract_block = ""
    if pub.get("abstract"):
        abstract_block = f"""
            <details class="pub-abstract">
              <summary>Abstract</summary>
              <p>{html_escape(pub["abstract"])}</p>
            </details>"""
    search_text = " ".join(
        [
            pub.get("title", ""),
            pub.get("venue", ""),
            pub.get("authors", ""),
            pub.get("type", ""),
            pub.get("abstract", "") or "",
            " ".join(pub.get("tags", [])),
        ]
    ).lower()
    tag_data = " ".join(t.lower() for t in (pub.get("tags") or []))

    return f"""        <li class="pub-item" data-tags="{html_escape(tag_data)}" data-search="{html_escape(search_text)}">
          <div class="pub-year">{html_escape(pub.get("year", ""))}</div>
          <div>
            <h3 class="pub-title"><a href="{html_escape(link)}" target="_blank" rel="noopener">{html_escape(pub["title"])}</a></h3>
            <div class="pub-authors">{author_html(pub.get("authors", ""))}</div>
            <div class="pub-venue">{html_escape(pub.get("venue", ""))}</div>
            <div class="pub-actions">
              <span class="pub-type">{html_escape(pub.get("type", ""))}</span>
              {citations_chip}
              <a href="{html_escape(link)}" target="_blank" rel="noopener">View →</a>
            </div>
            <div class="tag-row" style="margin-top:0.5rem;">{tags}</div>{abstract_block}
          </div>
        </li>"""


def render_publications_page(db: dict) -> str:
    profile_url = db.get("scholar_profile_url", "#")
    total_citations = db.get("total_citations", 0)
    h_index = db.get("h_index")
    i10 = db.get("i10_index")
    n_pubs = len(db["publications"])
    last = db.get("last_refreshed", "")

    chip_set = [
        "Hardware Security",
        "Adversarial ML",
        "Trustworthy AI",
        "LLMs",
        "Drug Discovery",
        "HDC",
        "IoT Security",
        "Survey",
        "Deep Learning",
    ]
    present_tags = {t for p in db["publications"] for t in p.get("tags", [])}
    chips = [t for t in chip_set if t in present_tags]
    chip_html = "\n          ".join(
        f'<button class="chip" data-filter-chip-for="pub-search" data-filter-tag="{html_escape(t.lower())}">{html_escape(t)}</button>'
        for t in chips
    )

    items = "\n".join(pub_li(p) for p in db["publications"])

    indices_line = ""
    if h_index is not None or i10 is not None:
        bits = [f"{total_citations}+ citations"]
        if h_index:
            bits.append(f"h-index {h_index}")
        if i10 is not None:
            bits.append(f"i10-index {i10}")
        indices_line = " · ".join(bits)
    else:
        indices_line = f"{total_citations}+ Google Scholar citations"

    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Publications · Ashutosh Ghimire</title>
  <meta name="description" content="{n_pubs} peer-reviewed publications by Ashutosh Ghimire — hardware security, trustworthy AI, LLM-assisted systems, drug discovery, and applied ML. Auto-refreshed from Google Scholar.">
  <meta name="author" content="Ashutosh Ghimire">
  <meta name="keywords" content="Ashutosh Ghimire publications, hardware security, adversarial ML, LLM systems, drug discovery, applied ML">
  <meta property="og:title" content="Publications · Ashutosh Ghimire">
  <meta property="og:description" content="{n_pubs} peer-reviewed papers in trustworthy AI, hardware security, LLM systems, and applied ML.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="assets/images/hero-research.png">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="assets/css/styles.css">
  <script defer src="assets/js/main.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="index.html" aria-label="Ashutosh Ghimire — home">
        <span class="brand-mark" aria-hidden="true">AG</span>
        <span class="brand-meta">
          <strong>Ashutosh Ghimire</strong>
          <small>AI / ML PhD Candidate</small>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu">
        <span aria-hidden="true">≡</span> Menu
      </button>
      <ul class="nav-list" id="primary-menu">
        <li><a href="index.html">Home</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="experience.html">Experience</a></li>
        <li><a href="publications.html" class="is-active" aria-current="page">Publications</a></li>
        <li><a href="research.html">Research</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Publications</span>
        <h1>Peer-reviewed work.</h1>
        <p class="lead"><!--AUTO:PAPERS-->{n_pubs}<!--/AUTO:PAPERS--> papers across hardware security, trustworthy AI, LLM-assisted systems, drug discovery, and applied ML — {indices_line} as of <!--AUTO:UPDATED-->{last}<!--/AUTO:UPDATED-->.</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="{html_escape(profile_url)}" target="_blank" rel="noopener">Google Scholar</a>
          <a class="btn btn-ghost" href="https://orcid.org/0000-0001-6210-1219" target="_blank" rel="noopener">ORCID</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="search-bar">
          <input type="search" id="pub-search" placeholder="Search by title, venue, method, year…" data-filter-target=".pub-item" aria-label="Search publications">
        </div>
        <div class="filter-chips">
          {chip_html}
        </div>

        <ul class="pub-list">
{items}
        </ul>

        <p class="empty-note" style="margin-top:2rem;">Auto-refreshed weekly from Google Scholar &amp; OpenAlex. Last refresh: <strong>{last}</strong> — {html_escape(db.get("last_refresh_status", ""))}.</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <strong>Ashutosh Ghimire</strong>
          <p style="margin-top:0.5rem;color:var(--ink-muted);font-size:0.92rem;">AI / ML PhD candidate at Wright State University. Open to research internships and full-time roles in AI research, ML engineering, and applied science.</p>
          <p style="font-family:var(--mono);font-size:0.82rem;color:var(--ink-muted);margin-top:0.75rem;"><a href="mailto:ashutosh.ghimire@wright.edu">ashutosh.ghimire@wright.edu</a></p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="experience.html">Experience</a></li>
            <li><a href="publications.html">Publications</a></li>
            <li><a href="research.html">Research</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Profiles</h4>
          <ul>
            <li><a href="{html_escape(profile_url)}" target="_blank" rel="noopener">Google Scholar</a></li>
            <li><a href="https://orcid.org/0000-0001-6210-1219" target="_blank" rel="noopener">ORCID</a></li>
            <li><a href="https://www.linkedin.com/in/ashutoshghimire" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="https://github.com/aashutoshghimire" target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year">{date.today().year}</span> Ashutosh Ghimire</span>
        <span>Last updated {last}</span>
      </div>
    </div>
  </footer>
  <script>document.getElementById('year').textContent = new Date().getFullYear();</script>
</body>
</html>
"""


def update_index_markers(index_path: Path, db: dict) -> bool:
    """Replace the AUTO:* marker contents on the home page. Returns True if changed."""
    if not index_path.exists():
        return False
    text = index_path.read_text()
    original = text

    n_pubs = len(db["publications"])
    citations = db.get("total_citations", 0)
    last = db.get("last_refreshed", "")

    text = re.sub(
        r"<!--AUTO:CITATIONS-->.*?<!--/AUTO:CITATIONS-->",
        f"<!--AUTO:CITATIONS-->{citations}<!--/AUTO:CITATIONS-->",
        text,
        flags=re.DOTALL,
    )
    text = re.sub(
        r"<!--AUTO:PAPERS-->.*?<!--/AUTO:PAPERS-->",
        f"<!--AUTO:PAPERS-->{n_pubs}<!--/AUTO:PAPERS-->",
        text,
        flags=re.DOTALL,
    )
    text = re.sub(
        r"<!--AUTO:UPDATED-->.*?<!--/AUTO:UPDATED-->",
        f"<!--AUTO:UPDATED-->{last}<!--/AUTO:UPDATED-->",
        text,
        flags=re.DOTALL,
    )

    if text != original:
        index_path.write_text(text)
        return True
    return False


def main() -> int:
    db = json.loads(DATA.read_text())
    out = REPO / "publications.html"
    out.write_text(render_publications_page(db))
    print(f"Wrote {out}")

    changed = update_index_markers(REPO / "index.html", db)
    print("Updated markers in index.html" if changed else "No marker changes in index.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
