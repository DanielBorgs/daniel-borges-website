// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are injected by the GitHub Actions deploy workflow
// (.github/workflows/deploy.yml), so the same code works on
//   https://danielborgs.github.io/My-website/   (project page, base "/My-website")
//   https://danielborgs.github.io/              (repo renamed to DanielBorgs.github.io)
//   https://daniel-borges.com/                  (custom domain)
// Locally they're unset and the site is served from "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://daniel-borges.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
