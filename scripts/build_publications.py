#!/usr/bin/env python3
"""
Regenerate publications.html from data/publications.json and refresh citation
markers in index.html.

The generated page intentionally uses the original portfolio theme classes.
The publication data can be refreshed by scripts/update_from_scholar.py, while
this script keeps the visible page static and ATS-friendly.
"""
from __future__ import annotations

import json
import re
from datetime import date
from html import escape
from pathlib import Path


REPO = Path(__file__).resolve().parent.parent
DATA = REPO / "data" / "publications.json"


def external_attrs(url: str) -> str:
    return ' target="_blank" rel="noreferrer"' if url.startswith(("http://", "https://")) else ""


def tag_html(tags: list[str]) -> str:
    return '<div class="tag-row">' + "".join(f'<span class="tag">{escape(tag)}</span>' for tag in tags) + "</div>"


def author_html(authors: str) -> str:
    return re.sub(r"\bAshutosh Ghimire\b", "<em>Ashutosh Ghimire</em>", escape(authors or ""))


def publication_card(pub: dict, profile_url: str) -> str:
    link = pub.get("link") or pub.get("scholar_url") or profile_url
    tags = pub.get("tags") or []
    tag_data = "|".join(tag.lower() for tag in tags)
    search_text = " ".join(
        [
            pub.get("title", ""),
            pub.get("authors", ""),
            pub.get("venue", ""),
            str(pub.get("year", "")),
            pub.get("type", ""),
            pub.get("abstract") or "",
            " ".join(tags),
        ]
    ).lower()
    citation = ""
    if pub.get("citations") is not None:
        count = int(pub["citations"])
        citation = f'<span class="cite-count">{count} citation{"s" if count != 1 else ""}</span>'
    abstract = ""
    if pub.get("abstract"):
        abstract = (
            '<details class="publication-abstract">'
            "<summary>Abstract</summary>"
            f"<p>{escape(pub['abstract'])}</p>"
            "</details>"
        )
    badge = '<span class="publication-badge">Featured</span>' if pub.get("featured") else ""

    return f"""            <article class="publication-card" data-tags="{escape(tag_data)}" data-search="{escape(search_text)}">
              <div>
                <div class="publication-meta">
                  <span>{escape(str(pub.get("year", "")))}</span>
                  <span>{escape(pub.get("type", ""))}</span>
                  <span>{escape(pub.get("venue", ""))}</span>
                </div>
                <h3><a href="{escape(link)}"{external_attrs(link)}>{escape(pub.get("title", ""))}</a></h3>
                <p>{author_html(pub.get("authors", ""))}</p>
                {tag_html(tags)}
                {abstract}
              </div>
              <div class="publication-links">
                {badge}
                {citation}
                <a class="mini-link" href="{escape(link)}"{external_attrs(link)}>Open</a>
              </div>
            </article>"""


def filter_buttons(publications: list[dict]) -> str:
    preferred = [
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
    present = {tag for pub in publications for tag in pub.get("tags", [])}
    values = [tag for tag in preferred if tag in present]
    return "\n                ".join(
        (
            f'<button class="chip" type="button" data-filter-chip-for="pub-search" '
            f'data-filter-tag="{escape(value.lower())}">{escape(value)}</button>'
        )
        for value in values
    )


def footer_links(profile_url: str) -> str:
    links = [
        ("Google Scholar", profile_url),
        ("ORCID", "https://orcid.org/0000-0001-6210-1219"),
        ("LinkedIn", "https://www.linkedin.com/in/ashutoshghimire"),
        ("GitHub", "https://github.com/aashutoshghimire"),
        ("Wright State", "https://people.wright.edu/ashutosh.ghimire"),
    ]
    return "".join(f'<li><a href="{escape(url)}"{external_attrs(url)}>{escape(label)}</a></li>' for label, url in links)


def render_publications_page(db: dict) -> str:
    publications = db["publications"]
    profile_url = db.get("scholar_profile_url", "https://scholar.google.com/citations?user=mhTDRysAAAAJ&hl=en")
    total_papers = len(publications)
    citations = db.get("total_citations", 0)
    updated = db.get("last_refreshed", date.today().isoformat())
    status = db.get("last_refresh_status", "seeded from existing data")
    items = "\n".join(publication_card(pub, profile_url) for pub in publications)

    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Publications | Ashutosh Ghimire</title>
    <meta name="description" content="{total_papers} peer-reviewed publications by Ashutosh Ghimire in trustworthy AI, hardware security, side-channel analysis, reverse engineering, HDC, LLM-assisted IoT security, and drug discovery.">
    <meta name="author" content="Ashutosh Ghimire">
    <meta name="keywords" content="Ashutosh Ghimire, AI ML PhD, machine learning engineer, applied scientist intern, trustworthy AI, hardware security, adversarial machine learning, LLM systems, Python, PyTorch, Wright State University">
    <meta property="og:title" content="Publications | Ashutosh Ghimire">
    <meta property="og:description" content="{total_papers} peer-reviewed publications by Ashutosh Ghimire in trustworthy AI, hardware security, side-channel analysis, reverse engineering, HDC, LLM-assisted IoT security, and drug discovery.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="assets/images/hdc-anomaly.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Publications | Ashutosh Ghimire">
    <meta name="twitter:description" content="{total_papers} peer-reviewed publications by Ashutosh Ghimire in trustworthy AI, hardware security, side-channel analysis, reverse engineering, HDC, LLM-assisted IoT security, and drug discovery.">
    <link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="assets/css/styles.css?v=5">
    <script defer src="assets/js/app.js?v=5"></script>
  </head>
  <body data-page="publications">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <nav class="nav-shell" aria-label="Main navigation">
        <a class="brand" href="index.html" aria-label="Ashutosh Ghimire home">
          <span class="brand-mark">AG</span>
          <span>
            <strong>Ashutosh Ghimire</strong>
            <small>AI/ML PhD Candidate</small>
          </span>
        </a>
        <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-menu">Menu</button>
        <div class="nav-menu" id="site-menu" data-nav-menu>
          <a href="index.html">Home</a>
          <a href="projects.html">Projects</a>
          <a href="experience.html">Experience</a>
          <a href="publications.html" class="is-active" aria-current="page">Publications</a>
          <a href="research.html">Research</a>
          <a href="contact.html">Contact</a>
        </div>
      </nav>
    </header>

    <main id="main">
      <section class="page-hero publications-hero">
        <div class="container page-hero-content">
          <p class="eyebrow">Publications</p>
          <h1>Peer-reviewed work.</h1>
          <p><!--AUTO:PAPERS-->{total_papers}<!--/AUTO:PAPERS--> papers across hardware security, trustworthy AI, LLM-assisted systems, drug discovery, and applied ML - <!--AUTO:CITATIONS-->{citations}<!--/AUTO:CITATIONS-->+ Google Scholar citations as of <!--AUTO:UPDATED-->{escape(updated)}<!--/AUTO:UPDATED-->.</p>
          <div class="hero-actions">
            <a class="button button-secondary" href="{escape(profile_url)}" target="_blank" rel="noreferrer">View Google Scholar</a>
            <a class="button button-ghost" href="https://orcid.org/0000-0001-6210-1219" target="_blank" rel="noreferrer">ORCID</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="publication-controls claude-project-search">
            <div class="search-bar">
              <input type="search" id="pub-search" placeholder="Search by title, venue, method, year..." data-filter-target=".publication-card" data-count-target="[data-publication-count]" aria-label="Search publications">
            </div>
            <div class="filter-chips" aria-label="Publication filters">
              {filter_buttons(publications)}
            </div>
          </div>
          <p class="result-count" data-publication-count data-noun="publication" aria-live="polite"></p>
          <div class="publication-list">
{items}
          </div>
          <p class="section-note publication-refresh-note">Auto-refreshed weekly from Google Scholar and OpenAlex when GitHub Actions can access Scholar. Last refresh: <strong>{escape(updated)}</strong> - {escape(status)}.</p>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <strong>Ashutosh Ghimire</strong>
            <p>AI / ML PhD candidate at Wright State University. Open to research internships and full-time roles in AI research, ML engineering, and applied science.</p>
            <p class="footer-email"><a href="mailto:ashutosh.ghimire@wright.edu">ashutosh.ghimire@wright.edu</a></p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul><li><a href="index.html">Home</a></li><li><a href="projects.html">Projects</a></li><li><a href="experience.html">Experience</a></li><li><a href="publications.html">Publications</a></li><li><a href="research.html">Research</a></li><li><a href="contact.html">Contact</a></li></ul>
          </div>
          <div>
            <h4>Profiles</h4>
            <ul>{footer_links(profile_url)}</ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; <span data-year></span> Ashutosh Ghimire</span>
          <span>Last updated May 2026</span>
        </div>
      </div>
    </footer>
  </body>
</html>
"""


def replace_marker(text: str, marker: str, value: str) -> str:
    return re.sub(
        rf"<!--AUTO:{marker}-->.*?<!--/AUTO:{marker}-->",
        f"<!--AUTO:{marker}-->{value}<!--/AUTO:{marker}-->",
        text,
        flags=re.DOTALL,
    )


def update_markers(path: Path, db: dict) -> bool:
    if not path.exists():
        return False
    original = path.read_text(encoding="utf-8")
    text = original
    text = replace_marker(text, "CITATIONS", str(db.get("total_citations", 0)))
    text = replace_marker(text, "PAPERS", str(len(db["publications"])))
    text = replace_marker(text, "UPDATED", db.get("last_refreshed", date.today().isoformat()))
    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> int:
    db = json.loads(DATA.read_text(encoding="utf-8"))
    (REPO / "publications.html").write_text(render_publications_page(db), encoding="utf-8")
    update_markers(REPO / "index.html", db)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
