// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are injected by the GitHub Actions deploy workflow
// (.github/workflows/deploy.yml), so the same code works on
//   https://danielborgs.github.io/daniel-borges-website/   (project page, base "/daniel-borges-website")
//   https://danielborgs.github.io/              (repo renamed to DanielBorgs.github.io)
//   https://danielmborges.com/                  (custom domain)
// Locally they're unset and the site is served from "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://danielmborges.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
