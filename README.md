# Platinum Development Website

This repository now contains a static marketing site for Platinum Development powered by [Decap CMS](https://decapcms.org/). All homepage content is stored in version-controlled JSON (`content/site.json`) and can be managed through the Decap CMS admin UI located at `/admin/`.

## Key features

- **Decap CMS integration** – Edit navigation, hero copy, about highlights, portfolio projects, partner logos, investor messaging, contact details, and footer text without touching code.
- **Git-based content** – All updates are committed back to the repository, providing a full audit trail of content changes.
- **Image management** – Assets uploaded through Decap are stored in the `uploads/` folder and referenced directly from the JSON content file.
- **No build step required** – Serve the `index.html` file with any static file server to preview the latest content.

## Prerequisites

- A Git-based hosting provider (for example Netlify, Vercel, or GitHub Pages).
- Optional: Node.js 18+ or Python 3.8+ if you want to run a local static file server.

## Local development

1. Clone the repository.
2. Start any static file server from the project root:

   ```bash
   # Option 1: use npx (downloads the `serve` package on demand)
   npx serve .

   # Option 2: use the built-in Python HTTP server
   python -m http.server 3000
   ```

3. Open the reported URL and browse to `/admin/` to sign in to Decap CMS (see "Configuring authentication" below).

## Managing content with Decap CMS

- The CMS configuration lives at `admin/config.yml`. By default it targets the `main` branch of this repository using the `git-gateway` backend, which is compatible with Netlify Identity + Git Gateway.
- Content is stored in the single file `content/site.json`. Fields in the CMS map directly to sections of the homepage, including nested lists for highlights, stats, projects, partner logos, and investor messaging.
- Uploaded media is saved in the `uploads/` directory and automatically referenced from the JSON file.

### Configuring authentication

To use Decap CMS in production you need an authentication provider. Common options include:

- **Netlify Identity + Git Gateway** – Enable both services on your Netlify site and invite editors. This works out of the box with the existing `config.yml` settings.
- **GitHub backend** – Replace the `backend` section of `admin/config.yml` with your GitHub repo settings if you prefer direct OAuth via GitHub Apps.

Refer to the [Decap CMS documentation](https://decapcms.org/docs/intro/) for detailed setup guides on different backends.

## Content structure

The `content/site.json` file powers every editable section on the homepage:

- `navigationLinks` – Primary navigation items and the call-to-action button label.
- `hero` – Headline, subheadline, CTA, and background image information.
- `about` – Paragraph content, highlight cards, and stats.
- `projects` – Portfolio cards with optional metrics for each property.
- `partners` – Logos or text badges for tenant/partner showcases.
- `investor` – Messaging and CTA for investor outreach.
- `contact` – Email, address, office hours, and optional map embed HTML.
- `footer` – Company name, copyright, and credits.

You can also edit the `content/site.json` file manually if desired—Decap CMS simply provides a friendly UI on top of the same data.

## Deployment notes

- Ensure the `admin/` directory and `content/` data file are deployed alongside `index.html` so the CMS and the frontend share the same data source.
- If you change the default branch name or host the CMS separately, update the `backend` section in `admin/config.yml` accordingly.
- Because the site is static, any CDN or static hosting provider can serve it without a build step once the repository content is published.

## Repository structure

```
.
├── admin/                 # Decap CMS admin app and configuration
├── content/site.json      # Git-based content consumed by the homepage
├── index.html             # Tailwind-powered marketing page
├── uploads/               # Media uploaded via Decap CMS
└── README.md
```

With Sanity dependencies removed, the project is streamlined for a Git-based Decap CMS workflow.
