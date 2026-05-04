# Ashutosh Ghimire Portfolio

Static multi-page research portfolio for GitHub Pages.

## Structure

- `index.html` - home page
- `research.html` - research themes and projects
- `projects.html` - project portfolio with filters and paper figures
- `publications.html` - static publication list with filters/search
- `experience.html` - timeline, education, skills, awards
- `contact.html` - contact links and mailto form
- `data/publications.json` - publication data refreshed from Google Scholar/OpenAlex
- `scripts/update_from_scholar.py` - refreshes `data/publications.json`
- `scripts/build_publications.py` - rebuilds `publications.html` and homepage citation markers
- `.github/workflows/refresh-publications.yml` - weekly publication refresh workflow
- `assets/js/data.js` - archived structured portfolio data used as the content source for this static pass
- `assets/js/app.js` - progressive enhancement for navigation, search filters, and contact draft
- `assets/css/styles.css` - visual system and responsive layout


## Updating Content

Update the relevant HTML page for project, experience, research, and contact copy.

Publications are managed separately:

1. Edit `data/publications.json` for manual publication fixes.
2. Run `python scripts/build_publications.py` to regenerate `publications.html` and homepage citation markers.
3. The GitHub Action can run weekly or manually from the Actions tab to refresh Scholar/OpenAlex data.

The CV button points to `assets/docs/Ashutosh_Ghimire_CV.pdf`. 

If the published GitHub Pages URL is not `https://aashutoshghimire.github.io/`, update the URLs in `sitemap.xml`.
