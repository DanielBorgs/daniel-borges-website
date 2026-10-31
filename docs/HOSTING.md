# Hosting & deployment

**Setup:** public GitHub repo → GitHub Actions → GitHub Pages → custom domain **daniel-borges.com**.

| | Cost |
| --- | --- |
| GitHub Pages (hosting, HTTPS, CDN) | **€0** |
| `daniel-borges.com` | **~€10–12 / year** (check the *renewal* price, not just year one) |

Because the site is just static files in `dist/`, it can move to Cloudflare Pages, Netlify or Vercel (also free) in ~10 minutes if you ever want to. There's no lock-in.

---

## 1. First deploy (works before you buy the domain)

The repo `https://github.com/DanielBorgs/My-website` is already set as `origin`.

1. **Check nothing private is staged.** `.env` and `private/` are gitignored; verify with:
   ```bash
   git status --short      # .env and private/ must NOT appear
   ```
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Initial website"
   git push -u origin main
   ```
3. **Make the repo public:** GitHub → repo → Settings → General → Danger Zone → Change visibility.
4. **Enable Pages:** Settings → Pages → *Build and deployment* → Source: **GitHub Actions**.
5. Actions tab → re-run "Deploy to GitHub Pages" if the first run failed before step 4.
   The site goes live at **https://danielborgs.github.io/My-website/** within ~1 minute.

From then on, every `git push` to `main` redeploys automatically.

---

## 2. Buy and connect daniel-borges.com

### Buy

Good registrars (no renewal price tricks, free WHOIS privacy):
- **Cloudflare Registrar:** at-cost pricing, excellent DNS. Recommended.
- **Porkbun:** cheap, simple.

Avoid registrars with cheap first years and expensive renewals.

### DNS records

In the registrar's DNS settings, add:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `danielborgs.github.io` |

These are GitHub's documented Pages addresses. Double-check at https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site.
On Cloudflare, set every record to **DNS only** (grey cloud).

### Tell GitHub

1. **Verify the domain first** (prevents domain takeover): GitHub → your *profile* Settings → Pages → Add a domain → `daniel-borges.com`. Add the TXT record it shows, then click Verify.
2. Repo → Settings → Pages → **Custom domain** → `daniel-borges.com` → Save.
3. When the DNS check passes (minutes to a few hours), tick **Enforce HTTPS**.
4. Actions → "Deploy to GitHub Pages" → **Run workflow**. The build now uses `https://daniel-borges.com` for canonical URLs, sitemap and share image (the workflow detects it automatically).

`www.daniel-borges.com` redirects to `daniel-borges.com` automatically.

### Optional: email at your domain

`daniel@daniel-borges.com` forwarding to Gmail is free with **Cloudflare Email Routing** (if the domain is on Cloudflare) or **ImprovMX**. If you set it up, change `email` in `src/data/cv.ts` and `cv/cv.tex`, then run `npm run cv`.

---

## 3. After launch

- [ ] Open the site on your phone and laptop; toggle dark mode; click Download CV.
- [ ] Paste `https://daniel-borges.com` into a LinkedIn post draft and check the preview image shows (LinkedIn caches previews; use https://www.linkedin.com/post-inspector/ to refresh).
- [ ] Add the URL to: LinkedIn (Contact info → Website, and Featured), GitHub profile, email signature. The generated CVs already include it.
- [ ] **Google Search Console** (https://search.google.com/search-console): add `daniel-borges.com` as a Domain property, submit `https://daniel-borges.com/sitemap-index.xml`.
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse); expect 95–100.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Action fails at "Configure Pages" | Pages source isn't set to **GitHub Actions**. |
| Site loads without styling | Base-path mismatch. Re-run the workflow, and never hard-code `/` paths in new code; use `import.meta.env.BASE_URL`. |
| Custom domain shows 404 / "improperly configured" | DNS not propagated yet, a typo in a record, or the record is proxied (orange cloud) on Cloudflare. Check with `nslookup daniel-borges.com`. |
| HTTPS checkbox greyed out | Wait for the certificate (up to 24 h after DNS is correct). |
| Old share preview on LinkedIn | LinkedIn Post Inspector → re-scrape. |

## Note on the project folder

The project lives inside **OneDrive**, which tries to sync the thousands of files in `node_modules/`. That's slow and can lock files during builds. Consider moving the project to e.g. `C:\dev\my-website` (Git and GitHub are the backup). If you keep it in OneDrive, remember `private/` and `.env` are synced to OneDrive but *not* to GitHub.
