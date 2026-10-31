# Open questions for Daniel

## Answered (31 Oct 2026)

| Topic | Decision | Done |
| --- | --- | --- |
| Visa note | Remove "EU citizen (no visa needed)" | Removed from the site and both CVs |
| CV & phone | Public CV without phone; phone CV kept locally, not linked | `npm run cv` compiles `cv/cv.tex` → `public/…cv.pdf` + gitignored `private/…-with-phone.pdf` |
| CV | Keep the LaTeX CV exactly as it was, except the header | Header only: Ballerup, no visa note, website link, Summer 2027 internship; two builds (with/without phone) |
| Website experience | Show JunctionX organizer + TA in Experience (website only) | Compact entries on the homepage, full details on About |
| Location | Ballerup | Site, CV, structured data |
| Audience | Recruiters | Short hero with availability + CTA, key numbers, experience first, "Selected work" cards |
| Single page | Not required | Home · Projects · About |
| Hero | Less text, AI-related animation, use the 3 stage photos | Vision-model "detection" animation over the photos |
| Domain | `danielmborges.com` | Default site URL; DNS steps in HOSTING.md |
| Repo | Public, GitHub Pages | Phone number kept out of the repo (`.env`, `private/`) |
| Availability | Part-time: up to 20 h/week, Copenhagen area or remote. Summer 2027: open to any location | Hero chips, contact cards, CV header |

## Still open

### 1. JunctionX Lisbon 2026 photo folder
The Google Drive folder you shared requires sign-in, so it isn't public. Options:
- (a) Make it "Anyone with the link can view" and I'll add an "Event photos" link to the organizer entry.
- (b) Download 4–6 of the best photos (venue, crowd, winners, team) into the repo and I'll build a small gallery on the About page.
- (c) Leave it out.

Get the photographer's/organization's OK before publishing photos with other people in them.

### 2. Check the hero animation wording
The detection labels say `person`, `face`, `microphone`, `logo · JunctionX`, `hand · pointing` with made-up confidence scores, as a stylistic nod to CV models. OK, or would you prefer no scores, or labels like `speaker · Daniel`?

### 3. Project visuals and links
- **JunctionX Lisbon 2025 (Invasive Species Predictor):** repo, Devpost, demo video, or a before/after satellite image?
- **BetterMeeting AR:** repo or video of it running on the Spectacles?
- **HackEurope:** a demo link or video?
- **JunctionX Lisbon 2026 event website** you built: URL?
- **Systems Group** client app/website: can it be named or linked?

### 4. Anything not on the CV?
Course projects (`FP`, `IArt`, `LP`, `Bd proj` folders?), personal side projects, interests for the About page.

### 5. Fake-news paper co-author
Name your teammate (Duarte Cruz?) and link their GitHub?

### 6. Nice-to-haves (yes/no)

| Feature | Current default |
| --- | --- |
| Portuguese version (`/pt/`) | No |
| Privacy-friendly analytics (no cookie banner) | No |
| Blog / write-ups | Not now |
| Email at your domain (`daniel@danielmborges.com`) | No, using Gmail |

### 7. Move the project out of OneDrive?
See HOSTING.md, "Note on the project folder".
