# Straight Talk on Healthcare Options

Independent, educational guides to direct primary care, HSAs, bronze and catastrophic plans, and value-added benefits. Published by Conversely. Built with [Astro](https://astro.build), design direction C ("Bento") in the Paper palette and type from Natrex (Instrument Serif, IBM Plex Sans and Mono).

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Deploy

Vercel or Netlify both work with zero config: import the repo, framework "Astro", build `npm run build`, output `dist`.

## Writing a guide

Add a Markdown file to `src/content/guides/`. The frontmatter schema is in `src/content.config.ts`; every guide needs a last-reviewed date, author, sources with an evidence grade, and an evidence level. Set `namesProducts: true` (and optionally `disclosure`) whenever a guide names a specific product, carrier, DPC network or vendor, so the page-level disclosure shows on the first screen.

Reusable blocks you can drop into Markdown: `<div class="figs">` stat cards, `<div class="split">` counts/doesn't-count lists. Footnotes link to `#src-N`.

## Placeholders to fill

Search for `[` in `src/`: `[SERVICES]`, reviewers, `[EDITOR NAME]`, `[PARTNER LIST]`, `[CONTACT EMAIL]`, `[CORRECTIONS EMAIL]`, and the agency services. Site-wide strings live in `src/site.ts`. Set `site` in `astro.config.mjs` once a domain is chosen. The newsletter form is a placeholder until a provider is connected.
