# Ashutosh Ghimire — Portfolio (rebuilt)

A static rebuild of [aashutoshghimire.github.io](https://aashutoshghimire.github.io). All content now lives in the HTML directly so search engines, link-preview cards, and ATS/recruiter scrapers see everything. No build step — just push and deploy.

## What changed (and why)

| Before | After |
|---|---|
| Content rendered by `data.js` + `app.js` after JavaScript loaded | All content in the HTML at request time |
| Inner pages looked empty to scrapers and link previews | Every page is fully readable without JS |
| Inter font + 4 accent colors (teal, purple, green, dark) | Fraunces (display) + IBM Plex Sans/Mono, single ink-blue accent |
| No availability signal | Visible "Available for Summer 2026 / 2027" pill above the fold |
| Stats shown as bare numbers | Numbers in context: "231+ citations across 33 papers" |
| Generic favicon | AG monogram favicon SVG |
| No 404 page | Custom branded 404 |
| Same content across pages | Distinct page heads with unique meta descriptions |

JavaScript is now ~30 lines doing only progressive enhancement: mobile nav toggle, search/filter on the projects and publications pages, and a `mailto:` builder on the contact form. If JS fails, every page still works.

## Deploy to GitHub Pages

This is your existing repo at `aashutoshghimire/aashutoshghimire.github.io`. To replace the current site:

```bash
# from the unzipped folder
cd aashutoshghimire.github.io

# (optional) back up your current files first
git checkout -b backup-old-site
git add -A && git commit -m "Snapshot before rebuild"
git push origin backup-old-site

# switch back and replace
git checkout main
# ... copy the files from this zip over the existing ones ...
git add -A
git commit -m "Rebuild site as static HTML, refresh design"
git push origin main
```

GitHub Pages will serve the new site within a minute or two. Your URL stays the same: <https://aashutoshghimire.github.io>.

The `.nojekyll` file is included so GitHub Pages skips Jekyll processing — important because Fraunces uses underscores in some places that Jekyll would otherwise mangle.

## File layout

```
.
├── index.html              ← Home
├── projects.html           ← All 11 projects, searchable + filterable
├── experience.html         ← Roles, education, skills, awards
├── publications.html       ← All 33 papers, searchable + filterable
├── research.html           ← Research themes
├── contact.html            ← Contact form (opens mail client)
├── 404.html                ← Custom not-found page
├── robots.txt
├── sitemap.xml
├── .nojekyll               ← Tells GitHub Pages to skip Jekyll
└── assets/
    ├── favicon.svg
    ├── css/styles.css
    ├── js/main.js
    ├── images/             ← All your originals, untouched
    └── docs/Ashutosh_Ghimire_CV.pdf
```

## Auto-updating publications from Google Scholar

The publications page is **automatically refreshed weekly** from your Google Scholar profile via a GitHub Action. You don't have to do anything — it just runs.

### What gets updated

- Total citation count, h-index, i10-index (shown on home and publications pages)
- Citation count badge on each paper
- New papers added to your Scholar profile show up automatically
- Abstracts are pulled from [OpenAlex](https://openalex.org) for any paper that has a DOI (free, no auth, public API)
- The "as of" date in the hero/lead text

### What stays under your control

These fields are **never** overwritten by the action — edit them in `data/publications.json`:

- `featured`: which papers show on the home page (top 5)
- `tags`: the keyword chips on each paper
- `link`: the URL the paper title links to (DOIs preferred)
- `doi`: used to fetch abstracts
- Manually-curated `abstract`: if you write your own, it sticks

If Scholar is unreachable on a given run (CAPTCHA, blocked IP), the action keeps your existing data and tries again next week. Your site never breaks.

### How it works under the hood

```
.github/workflows/refresh-publications.yml   ← runs weekly + on manual trigger
scripts/update_from_scholar.py               ← scrapes Scholar via `scholarly` lib
                                               + enriches abstracts via OpenAlex
scripts/build_publications.py                ← regenerates publications.html
                                               + updates citation markers in index.html
data/publications.json                       ← single source of truth (edit me!)
requirements.txt                             ← Python deps for the action
```

### Triggering a refresh manually

Two ways:

1. **From GitHub web UI:** Actions tab → "Refresh publications from Google Scholar" → "Run workflow" → choose `main` → Run.
2. **Locally:**
   ```bash
   pip install -r requirements.txt
   python scripts/update_from_scholar.py
   python scripts/build_publications.py
   git add data/publications.json publications.html index.html
   git commit -m "Refresh publications"
   git push
   ```

### One-time setup (after pushing this code)

Go to your repo → **Settings** → **Actions** → **General** → under "Workflow permissions" select **"Read and write permissions"** and save. This lets the workflow commit the refreshed files back to your repo. (If you skip this, the workflow will run but fail silently at the commit step.)

### Editing publications by hand

Open `data/publications.json`. Each entry looks like:

```json
{
  "title": "Paper title here",
  "authors": "Ashutosh Ghimire, Other Author",
  "venue": "Journal name 12(3), 100-110",
  "year": "2026",
  "type": "Journal",
  "featured": true,
  "tags": ["Hardware Security", "Adversarial ML"],
  "link": "https://doi.org/10.xxxx/yyyy",
  "doi": "10.xxxx/yyyy",
  "citations": 5,
  "abstract": null
}
```

Set `featured: true` to surface it on the home page. After editing, run `python scripts/build_publications.py` to regenerate the HTML, then commit and push.

## Browser & accessibility notes

- Works in all current browsers (Chrome, Firefox, Safari, Edge).
- Respects `prefers-color-scheme: dark` — automatic dark mode.
- Respects `prefers-reduced-motion`.
- Skip-link, focus styles, and `aria-current` on nav are wired up.
- Mobile menu collapses below 760px viewport.
- Lighthouse scores should be 95+ across the board (fonts come from Google Fonts CDN; everything else is local).

## Customization quick reference

Open `assets/css/styles.css`. The top of the file has CSS variables:

```css
--bg: #faf7f2;        /* page background */
--ink: #1a1814;       /* main text */
--accent: #1e3a5f;    /* ink blue — links, accents */
--display: 'Fraunces', ...  /* headings */
--body: 'IBM Plex Sans', ...  /* body */
```

Change those four lines and the whole site re-themes.
