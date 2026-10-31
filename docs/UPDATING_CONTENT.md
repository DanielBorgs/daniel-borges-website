# Updating content

- **Website:** `src/data/cv.ts`
- **CV:** `cv/cv.tex` (LaTeX)

When your experience changes, update **both**.

## Workflow

```bash
npm run dev          # http://localhost:4321, refreshes as you save
# edit src/data/cv.ts and/or cv/cv.tex
npm run cv           # recompile both CV PDFs (if the CV changed)
npm run build        # catches typos/missing fields before you push
git add . && git commit -m "Add <thing>" && git push    # auto-deploys
```

## Common edits

### Add a new job

Add an object at the **top** of `experience` (newest first):

```ts
{
  id: 'some-company',                     // anchor for links
  title: 'Machine Learning Engineer (Student)',
  org: 'Some Company',
  location: 'Copenhagen, Denmark',
  period: 'Jan 2027 – Present',
  bullets: [
    'What you built, with a number if possible.',
    'Second achievement.',
  ],
  tags: ['Python', 'PyTorch'],                       // website only
  links: [{ label: 'Demo', href: 'https://…' }],     // optional
},
```

| Field | Required | Shown as |
| --- | --- | --- |
| `title`, `org`, `period`, `bullets` | yes | Heading, blue org line, date, bullet list |
| `id` | for projects/research | Anchor on /projects/ (home cards link to it) |
| `location` | no | After the org |
| `badge` | no | Yellow pill, e.g. "1st Place" |
| `roles` | no | Several titles + periods at one org (replaces `title`/`period`) |
| `featured` + `summary` | no | Shows the entry as a "Selected work" card on the homepage, with `summary` as the one-liner |
| `summary` (leadership) | yes for leadership | One-liner for the compact entry in the homepage Experience section; full details stay on About |
| `tags` | no | Pills on the website |
| `links` | no | External links on the website |

### Projects, research, leadership, education

Same shape, in the `projects`, `research`, `leadership` or `education` arrays.

### Availability ("open to")

Edit `openTo` in `cv.ts` (hero chips + contact cards) and the header line in `cv.tex`.

### Homepage numbers

Edit `highlights` (keep 4 items).

### Hero text, about text, CV summary

`profile.pitch` (one sentence on the homepage) and `profile.about` (About page, first person). The CV summary is in `cv.tex`.

## CV PDFs

```bash
npm run cv
```

| Output | Contains phone? | Committed? | Linked on the site? |
| --- | --- | --- | --- |
| `public/daniel-borges-cv.pdf` | no | yes | yes (Download CV) |
| `private/daniel-borges-cv-with-phone.pdf` | yes | **no** (gitignored) | no |

The phone number comes from `.env` (`CV_PHONE=…`). On a new computer, copy `.env.example` to `.env` and fill it in.
The CV content and style are in `cv/cv.tex`. The phone number is never in that file: `\ifdefined\cvphone` prints it only in the private build. There, the contact line is set in `\small` with slightly tighter word spacing so the phone, email, website, LinkedIn and GitHub all fit on one line.

The website and the CV differ on purpose in one place: on the website, the JunctionX organizer and TA roles also appear (compact) in Experience; on the CV they stay under Leadership & Teaching.

## Photos and the hero animation

Photos live in `public/images/` as `<name>-480.webp` and `<name>-960.webp` (4:5 portrait crops).
To add or replace one:

1. Crop to 4:5 portrait and export both sizes as WebP (quality ~80). Squoosh (https://squoosh.app) works well.
2. Add it to `stagePhotos` in `cv.ts` with its detection boxes: `[left, top, right, bottom]` in **percent** of the image. Open the image in any editor that shows pixel coordinates and divide by width/height.
3. Optional per box: `kind: 'main'` (teal, the person), `labelAt: 'bottom' | 'right'` if labels overlap.

## Share image

`npm run og` regenerates `public/og.png` (1200×630) from the profile data and `stage-2` photo. Layout is in `scripts/generate-og.mjs`.

## Colours, fonts, layout

`src/styles/global.css`, top of the file. `--accent` is the blue. The dark-theme values are defined twice (OS setting + toggle), so change both.
Page layouts: `src/pages/*.astro`. Navigation: `src/components/Header.astro`.
