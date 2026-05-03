# Ashutosh Ghimire Portfolio

Static multi-page research portfolio for GitHub Pages.

## Structure

- `index.html` - home page
- `research.html` - research themes and projects
- `publications.html` - selected publications with filters/search
- `experience.html` - timeline, education, skills, awards
- `contact.html` - contact links and mailto form
- `assets/js/data.js` - portfolio content data
- `assets/js/app.js` - rendering, filters, theme toggle, contact draft
- `assets/css/styles.css` - visual system and responsive layout

## Hosting on GitHub Pages

1. Create a GitHub repository, for example `portfolio` or `aashutoshghimire.github.io`.
2. Put these files at the repository root.
3. In GitHub, go to Settings > Pages.
4. Choose "Deploy from a branch", select the `main` branch, and use the root folder.
5. Save. GitHub will publish the site after the Pages build finishes.

No Node, build command, database, or paid service is required.

## Updating Content

Most website content lives in `assets/js/data.js`. Update the arrays there for projects, publications, experience, skills, awards, and links.

The CV button points to `assets/docs/Ashutosh_Ghimire_CV.pdf`. Replace that file with the latest CV when needed.

If the published GitHub Pages URL is not `https://aashutoshghimire.github.io/portfolio/`, update the URLs in `sitemap.xml`.
