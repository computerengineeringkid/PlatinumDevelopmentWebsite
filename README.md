# Platinum Development Website

This repository contains the marketing site for Platinum Development along with a Sanity Studio for managing hero, about, portfolio, and contact content.

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A Sanity project with an existing dataset

Copy `.env.example` to `.env` and set the following environment variables:

```bash
SANITY_STUDIO_PROJECT_ID=yourProjectId
SANITY_STUDIO_DATASET=yourDataset
```

## Installation

Install dependencies (the Sanity CLI is included as a dev dependency):

```bash
npm install
```

> If installation fails because the Sanity packages cannot be downloaded, double-check your network access or npm registry configuration.

## Sanity Studio

The Studio is located in the `sanity/` directory and is configured with custom document types and desk structure for:

- Homepage hero content
- About section content
- Portfolio projects
- Contact information

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

## Project structure

```
.
├── index.html
├── sanity/
│   ├── env.d.ts
│   ├── sanity.cli.ts
│   ├── sanity.config.ts
│   ├── schemaTypes/
│   │   ├── about.ts
│   │   ├── contact.ts
│   │   ├── hero.ts
│   │   └── portfolio.ts
│   └── structure/
│       └── deskStructure.ts
└── vegas2.jpg
```

## Deployment

Refer to the Sanity documentation for configuring hosting and connecting the Studio to your preferred deployment platform.
