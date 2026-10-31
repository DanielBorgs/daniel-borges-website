// Generates public/og.png (1200×630), the preview image shown when the site
// is shared on LinkedIn, Slack, WhatsApp, etc.  Usage: npm run og
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { screenshot } from './lib/chrome.mjs';
import { profile } from '../src/data/cv.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = (...p) => pathToFileURL(join(root, ...p)).href;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: IS; src: url('${file('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2')}'); }
@font-face { font-family: Inter; src: url('${file('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')}'); font-weight: 100 900; }
html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #f7f6f2; color: #1a1b1e; font-family: Inter, sans-serif; }
.wrap { display: flex; height: 100%; }
.text { flex: 1; padding: 0 64px 0 80px; display: flex; flex-direction: column; justify-content: center; border-left: 20px solid #2d5a8c; }
h1 { font: 400 92px/1 IS, serif; margin: 0; letter-spacing: -0.01em; }
.role { font-size: 32px; font-weight: 600; margin-top: 26px; }
.role span { color: #2d5a8c; font-weight: 500; }
.meta { font-size: 24px; color: #5d6068; margin-top: 30px; line-height: 1.5; }
.url { font-size: 22px; color: #2d5a8c; font-weight: 600; margin-top: 34px; }
img { width: 420px; height: 630px; object-fit: cover; object-position: 50% 20%; }
</style></head><body><div class="wrap">
<div class="text">
  <h1>${profile.name}</h1>
  <div class="role">${profile.role} <span>· LLMs &amp; ML</span></div>
  <div class="meta">M.Sc. Human-Centered AI @ DTU · Copenhagen<br>Part-time now · Summer 2027 internship</div>
  <div class="url">${profile.website.replace(/^https?:\/\//, '')}</div>
</div>
<img src="${file('public/images/stage-2-960.webp')}">
</div></body></html>`;

const tmp = join(tmpdir(), `og-${process.pid}.html`);
writeFileSync(tmp, html);
screenshot(pathToFileURL(tmp).href, join(root, 'public', 'og.png'), 1200, 630);
console.log('✓ ./public/og.png');
