// Compiles cv/cv.tex (LaTeX, needs pdflatex — MiKTeX or TeX Live) into:
//   public/daniel-borges-cv.pdf               → published on the site, no phone number
//   private/daniel-borges-cv-with-phone.pdf   → local only (gitignored), phone from CV_PHONE in .env
//   private/daniel-borges-cv-internship.pdf   → same, header shows only the summer 2027 internship
//   private/daniel-borges-cv-part-time.pdf    → same, header shows only "available now, up to 20 h/week"
//
// Usage: npm run cv
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
if (existsSync(join(root, '.env'))) process.loadEnvFile(join(root, '.env'));

// hide: header availability items to leave out ('now' and/or 'internship').
function compile(outFile, phone, hide = []) {
  const build = mkdtempSync(join(tmpdir(), 'cv-'));
  // \cvphone is only defined for the private builds; cv.tex checks \ifdefined\cvphone.
  let preamble = phone ? `\\def\\cvphone{${phone.replace(/[\\{}]/g, '')}}` : '';
  if (hide.includes('now')) preamble += '\\def\\cvhidenow{}';
  if (hide.includes('internship')) preamble += '\\def\\cvhideinternship{}';
  try {
    execFileSync(
      'pdflatex',
      ['-interaction=nonstopmode', '-halt-on-error', `-output-directory=${build}`, '-jobname=cv', `${preamble}\\input{cv.tex}`],
      { cwd: join(root, 'cv'), stdio: 'pipe' },
    );
  } catch (err) {
    console.error(err.stdout?.toString().split('\n').slice(-30).join('\n'));
    throw new Error('pdflatex failed (log above)');
  }
  mkdirSync(dirname(outFile), { recursive: true });
  copyFileSync(join(build, 'cv.pdf'), outFile);
  rmSync(build, { recursive: true, force: true });
  console.log(`✓ ${outFile.replace(root, '.')}`);
}

compile(join(root, 'public', 'daniel-borges-cv.pdf'));

const phone = process.env.CV_PHONE;
if (phone) {
  compile(join(root, 'private', 'daniel-borges-cv-with-phone.pdf'), phone);
  // Targeted variants: only the summer 2027 internship, or only the part-time "available now" line.
  compile(join(root, 'private', 'daniel-borges-cv-internship.pdf'), phone, ['now']);
  compile(join(root, 'private', 'daniel-borges-cv-part-time.pdf'), phone, ['internship']);
} else console.warn('! CV_PHONE not set in .env, so the private CV with phone number was skipped.');
