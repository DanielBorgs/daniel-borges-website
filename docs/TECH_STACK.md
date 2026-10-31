# Tech stack

## Summary

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Astro 7** (static output) | Built for content sites. The output is plain HTML/CSS with almost no JavaScript, so pages load fast and score well on Lighthouse/SEO. |
| Language | **TypeScript** (strict) | The content file is typed, so a typo in a field name fails the build instead of silently breaking the page. |
| Styling | **Plain CSS** + Astro scoped `<style>` blocks | No framework to keep updated. Colours are CSS variables in one file, with light and dark themes. |
| Fonts | **Inter** (body) and **Instrument Serif** (headings), self-hosted via `@fontsource` | Served from your own domain, not Google's servers. This avoids the GDPR concerns EU courts have raised about loading Google Fonts. |
| Images | Pre-cropped **WebP** in two sizes (`480w`, `960w`) with `srcset` | ~15–85 KB per photo instead of 10 MB originals. |
| CV PDFs | **LaTeX** (`cv/cv.tex`, compiled by `scripts/build-cv.mjs` with pdflatex) | Your own CV style, kept as-is. Hyphenation off and `\pdfgentounicode` on, so applicant-tracking systems (ATS) can parse the text. |
| SEO | `@astrojs/sitemap`, canonical URLs, Open Graph/Twitter tags, schema.org `Person` JSON-LD | Better Google results for "Daniel Borges DTU" and good link previews on LinkedIn. |
| Hosting | **GitHub Pages** + custom domain `danielmborges.com` | Free, HTTPS included, deploys from the public repo. |
| CI/CD | **GitHub Actions** (`.github/workflows/deploy.yml`) | Every push to `main` builds and deploys automatically. |

## How it works

```
src/data/cv.ts ──► src/pages/*.astro ──► astro build ──► dist/ ──► GitHub Pages (danielmborges.com)

cv/cv.tex ──► scripts/build-cv.mjs (pdflatex) ──► public/daniel-borges-cv.pdf        (no phone, published)
                  ▲ CV_PHONE from .env       └──► private/…-with-phone.pdf          (gitignored)
```

1. **Content** lives in `src/data/cv.ts`: `profile`, `openTo`, `experience`, `research`, `projects`, `leadership`, `education`, `skills`, `stagePhotos`.
2. **Pages**:
   - `/` (Home): a short hero for recruiters (who, what, availability, CTA), the animation, key numbers, experience, selected work, education, skills, contact.
   - `/projects/`: full research and project write-ups. The home cards link to anchors here.
   - `/about/`: personal introduction, photo, leadership and teaching.
3. **`astro build`** turns everything into static files in `dist/`. No server or database at runtime.
4. **GitHub Actions** runs the build and publishes `dist/` to GitHub Pages.

## The hero animation (`VisionHero.astro`)

The three JunctionX Lisbon 2026 stage photos cycle in a frame styled like a computer-vision annotation canvas. A scan line reveals each photo, then **detection boxes** (person, face, microphone, …) draw in with labels and confidence scores, YOLO/CVAT style. It's a nod to your CVAT contributions and YOLOv8 work.

- The boxes are **hand-annotated** in `cv.ts` → `stagePhotos` (percent coordinates). No model runs in the browser.
- Pure CSS animations plus ~30 lines of JS (to switch photos every 6 s). It pauses when off-screen or when the tab is hidden.
- With `prefers-reduced-motion`, it shows one static annotated photo instead.

## Privacy model (the repo is public)

| Data | Where | Public? |
| --- | --- | --- |
| Email, LinkedIn, GitHub | `cv.ts`, `cv.tex`, website, public CV | Yes |
| Phone number | `.env` (`CV_PHONE`) → passed to pdflatex as `\cvphone` → `private/daniel-borges-cv-with-phone.pdf` | **No.** Both are gitignored, so they never reach GitHub. |

Everything committed to a public repo is public, even files the site doesn't link to. That's why the phone CV is gitignored instead of just "not linked".

## Why not …?

- **React/Next.js:** overkill for a content site. It ships a JS runtime for no benefit, and Astro can still embed React components later (e.g. an interactive ML demo).
- **WordPress / Wix / Squarespace:** needs a server or costs money, and doesn't show engineering skill. A clean public repo is itself a portfolio piece.
- **Generating the CV from `cv.ts`:** avoids keeping two copies in sync, but you prefer your LaTeX CV's style. The trade-off is that experience changes go in both `cv.ts` and `cv.tex`.
- **Running a real detector in the browser** (TF.js/ONNX): several MB of model download for a decorative effect. Hand-annotated boxes look the same and cost nothing.

## Dependencies

Runtime: none (the output is static).
Build-time: `astro`, `@astrojs/check`, `typescript`, `@astrojs/sitemap`, `@fontsource-variable/inter`, `@fontsource/instrument-serif`.
Scripts: Node ≥ 22.18 (runs `cv.ts` directly via built-in type stripping), pdflatex (MiKTeX auto-installs missing packages) and a local Chrome/Edge.

Keep them up to date about twice a year:

```bash
npm outdated
npx @astrojs/upgrade     # upgrades Astro + integrations together
npm run build
```

## Possible future additions

- **Project pages with images/video**, e.g. JunctionX satellite segmentation before/after, or BetterMeeting running on Spectacles.
- **Blog / write-ups** via Astro content collections (Markdown in `src/content/`).
- **Portuguese version** via Astro i18n routing (`/pt/`).
- **Privacy-friendly analytics** (Cloudflare Web Analytics / GoatCounter: no cookies, no banner).
