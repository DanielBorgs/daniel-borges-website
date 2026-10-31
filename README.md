# Daniel Borges — personal website

Recruiter-facing site showing my experience, research and projects, plus the LaTeX CV (public version without phone number).
A static site built with [Astro](https://astro.build), hosted for free on GitHub Pages at **daniel-borges.com**.

## Quick start

```bash
npm install        # once
npm run dev        # local dev server at http://localhost:4321 (hot reload)
npm run build      # type-check + production build into dist/
npm run preview    # serve the built dist/ locally
npm run cv         # compile cv/cv.tex into the public + private CV PDFs
npm run og         # regenerate the social-share image
```

Requires Node.js ≥ 22.18, `pdflatex` (MiKTeX/TeX Live) for `cv`, and Chrome or Edge for `og`.

## Where things are

| Path | What it is |
| --- | --- |
| `src/data/cv.ts` | **All website content.** |
| `cv/cv.tex` | **The CV** (LaTeX). No phone number in it; it's injected from `.env` for the private build. |
| `src/pages/` | `index` (home), `projects`, `about`, `404`. |
| `src/components/` | `Header`, `Section`, `EntryCard` (one job/project), `VisionHero` (hero animation), `Icon`. |
| `src/layouts/Base.astro` | Shared `<head>` (SEO, share tags), header and footer. |
| `src/styles/global.css` | Colours (light + dark), fonts, buttons. |
| `public/` | Served as-is: public CV, photos (`images/`), favicon, share image, robots.txt. |
| `scripts/` | `build-cv.mjs` (pdflatex), `generate-og.mjs` (share image) and a small headless-Chrome helper. |
| `private/` | **Gitignored.** CV with phone number, never published. |
| `.env` | **Gitignored.** Phone number for the private CV (see `.env.example`). |
| `.github/workflows/deploy.yml` | Auto-deploy to GitHub Pages on push to `main`. |
| `docs/` | Documentation, see below. |

## Documentation

- [docs/TECH_STACK.md](docs/TECH_STACK.md): what the site is built with and why.
- [docs/HOSTING.md](docs/HOSTING.md): putting it online with GitHub Pages and daniel-borges.com.
- [docs/UPDATING_CONTENT.md](docs/UPDATING_CONTENT.md): changing content, CVs, photos.
- [docs/QUESTIONS.md](docs/QUESTIONS.md): remaining open questions.
