# AI/ML Portfolio Website

A modern single-page portfolio for an AI/ML engineer, built with plain HTML, CSS, and JavaScript for fast loading and easy customization.

## Local preview

Open `index.html` directly in your browser, or run a static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customize content

Update these files:

- `index.html`: profile content, project descriptions, and links.
- `styles.css`: color palette, typography, spacing, and component styles.
- `script.js`: scroll reveals, animated counters, card tilt, and mobile nav behavior.
- `projects/*.html`: individual project case studies linked from the main project cards.
- `projects/project.css`: shared styling for project detail pages.
- `resume/RESUME_SOURCE.md`: editable source content mirrored from your current resume profile.
- `resume/Nimish_Bongale_Resume.pdf`: downloadable resume (copied from your Downloads folder).

## SEO and social metadata

The homepage includes:

- Standard SEO tags (`description`, `keywords`, `canonical`, robots)
- Open Graph and Twitter tags for social sharing
- JSON-LD structured data for your personal profile

Assets used:

- `assets/favicon.svg`
- `assets/og-cover.svg`

## Deploy to GitHub Pages

This repo includes `.github/workflows/deploy.yml` to auto-deploy on pushes to `main`.

1. Push this project to a GitHub repository.
2. In GitHub, open **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or rerun the workflow) and wait for deployment.

Your site will be available at:

`https://<your-username>.github.io/<repo-name>/`

If you are deploying to a user site repo named `<your-username>.github.io`, the URL is:

`https://<your-username>.github.io/`

## Project detail pages

Project cards on the homepage link to dedicated case-study pages:

- `projects/atlas-support-copilot.html`
- `projects/demand-forecasting-engine.html`
- `projects/vision-qa-pipeline.html`
- `projects/experimentation-platform.html`

## Role customization

The site is intentionally written to stay generally applicable while remaining specific about measurable impact.
To retarget for a specific opportunity, update:

- Hero CTA text and headline in `index.html`
- Project ordering and featured outcomes in `index.html`
- Detailed narrative in `projects/*.html`
