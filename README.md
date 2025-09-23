# Platinum Development Website

This project hosts the Platinum Development marketing site with content managed in [Sanity](https://www.sanity.io/).

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A Sanity project with published documents for the hero, about, portfolio, and contact sections

## Environment variables

Create a `.env` file in the project root (or configure your shell) with the following variables:

```bash
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=your_dataset
# Optional when querying public content
SANITY_API_TOKEN=your_read_token
```

When using Vite, variables can also be prefixed with `VITE_` (e.g., `VITE_SANITY_PROJECT_ID`).

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the local development server with hot reloading:

```bash
npm run dev
```

The site will be available at the URL printed in the terminal (defaults to `http://localhost:5173`).

## Production build

To generate an optimized build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Content model expectations

The frontend queries the following Sanity document types (first match wins):

- `hero`, `heroSection`, or `landingHero`
- `about`, `aboutSection`, or `companyOverview`
- `portfolio`, `portfolioSection`, or `projectGallery`
- `contact`, `contactSection`, or `contactInfo`

Each document should expose fields similar to the examples below:

```js
// Hero example fields
{
  title: 'Redefining the Las Vegas Landscape',
  subtitle: 'Developing premier properties with excellence and integrity.',
  ctaText: 'Explore Projects',
  ctaUrl: '#portfolio',
  backgroundImage: { /* Sanity image */ }
}

// Portfolio example
{
  title: 'Our Portfolio',
  subtitle: 'A selection of projects in Las Vegas.',
  projects: [
    {
      _key: 'rainbow-commons',
      title: 'Rainbow Commons Retail Plaza',
      location: 'Las Vegas, NV',
      summary: 'A premium retail hub featuring boutique shops and fine dining.',
      image: { /* Sanity image */ }
    }
  ]
}
```

Missing fields gracefully fall back to placeholder copy on the frontend.
