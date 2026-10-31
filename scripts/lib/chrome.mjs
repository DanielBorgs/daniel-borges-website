// Tiny wrapper around headless Chrome/Edge for screenshots (used by generate-og.mjs).
// Set CHROME_PATH in .env if your browser isn't found automatically.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

export function findChrome() {
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error('Chrome/Edge not found. Set CHROME_PATH in .env.');
  return found;
}

export function screenshot(url, outFile, width, height) {
  execFileSync(
    findChrome(),
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--window-size=${width},${height}`, `--screenshot=${outFile}`, url],
    { stdio: 'ignore' },
  );
}
