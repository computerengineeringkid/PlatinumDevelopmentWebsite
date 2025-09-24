# Platinum Development Website

This repository contains the Platinum Development marketing site and an accompanying Sanity Studio. All homepage content—from navigation and hero copy to portfolio projects, partner logos, investor messaging, and footer details—is editable through Sanity.

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A Sanity project with an existing dataset

Copy `.env.example` to `.env` and set the following environment variables:

```bash
SANITY_STUDIO_PROJECT_ID=yourProjectId
SANITY_STUDIO_DATASET=yourDataset
```

Copy `sanity-client-config.example.json` to `sanity-client-config.json` and update the Sanity project ID and dataset so the marketing site can fetch published content.

> `sanity-client-config.json` is optional at build time because the Studio can also read project details from `SANITY_STUDIO_*` environment variables. Supplying the JSON config makes the static marketing page immediately connect to your dataset when served locally or deployed.

## Installation

Install dependencies (the Sanity CLI is included as a dev dependency):

```bash
npm install
```

> If installation fails because the Sanity packages cannot be downloaded, double-check your network access or npm registry configuration.

## Sanity Studio

The Studio is located in the `sanity/` directory and ships with:

- A `siteSettings` singleton document controlling global homepage content (navigation, hero, about highlights & stats, partner logos, investor messaging, contact details, and footer text).
- A `project` document type used for portfolio projects with hero imagery, property metadata, and optional key metrics.
- A custom desk structure that surfaces the `siteSettings` singleton at the top of the content list.

### Local development

```bash
npm run sanity dev
```

The command starts the Sanity Studio on [http://localhost:3333](http://localhost:3333).

### Deploying the Studio

```bash
npm run sanity deploy
```

Deploying the Studio requires you to be authenticated with Sanity (`npm run sanity login`).

### Additional commands

```bash
npm run sanity login   # Authenticate with Sanity
npm run sanity manage  # Open the Sanity project settings in the browser
```

## Marketing site

- `index.html` loads Sanity content for all homepage sections using the configuration defined in `sanity-client-config.json` (or the inline defaults you provide when deploying).
- Update `sanity-client-config.json` with your project details to let the page render live Sanity data.
- Serve the site locally with any static file server so that ES module imports work as expected, for example:

```bash
npx serve .
# or
python -m http.server 3000
```

Open the reported local URL in your browser to preview the marketing site once the Sanity dataset contains published documents.

## Project structure

```
.
├── .env.example
├── sanity-client-config.example.json
├── index.html
├── package.json
├── sanity/
│   ├── env.d.ts
│   ├── sanity.cli.ts
│   ├── sanity.config.ts
│   ├── schemaTypes/
│   │   ├── index.ts
│   │   ├── project.ts
│   │   └── siteSettings.ts
│   └── structure/
│       └── deskStructure.ts
└── tsconfig.json
```

## Deployment

Refer to the Sanity documentation for configuring hosting and connecting the Studio to your preferred deployment platform.
