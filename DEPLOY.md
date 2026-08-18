# DEPLOY.md — Take Syntexia.AI live on Vercel

> Brief for Claude Code. The user wants you to deploy this static site to Vercel under the domain `syntexia.ai`. Follow these steps in order. Confirm with the user before any destructive action. **The user has the GoDaddy CLI/API set up locally** — DNS updates can be automated (see step 9).

---

## 0 · Project context

This is a static brand site:

- **Homepage** uses React + Babel transpiled in the browser (no build step). Loads `src/app.jsx`, `src/sections.jsx`, `src/tweaks-panel.jsx`, `src/styles.css`.
- **About, Blog, Post pages** are plain HTML — they share `src/styles.css` and re-use the same lattice mark inline.
- **SVG logo files** at the project root are share-ready.
- **No package.json, no node_modules, no build pipeline.** Vercel should treat this as a pure static deploy.

Current file names use spaces (`Syntexia Redesign.html`) which are unsuitable for URLs. **Your first job is to rename them.**

---

## 1 · Rename files

Rename these four files. Use `git mv` if the project is a git repo; otherwise plain `mv`.

| Current name                  | New name        |
|-------------------------------|-----------------|
| `Syntexia Redesign.html`      | `index.html`    |
| `Syntexia About.html`         | `about.html`    |
| `Syntexia Team.html`          | `team.html`     |
| `Syntexia Blog.html`          | `blog.html`     |
| `Syntexia Post.html`          | `posts/the-quiet-revolution-coming-to-audit.html` |
| `Syntexia Post Legal.html`    | `posts/precedent-meets-pace.html` |
| `Syntexia Signature Installer.html` | `install-signature.html` |

The other `Syntexia *.html` files (`Syntexia Deployment Guide.html`, `Syntexia Email Signature.html`, `Syntexia Logo.html`, `Syntexia Logo Animated.html`) are **internal references for the user** — do NOT deploy them. Either delete them before deploy, or place them in a `_internal/` folder and add that folder to `.vercelignore`.

---

## 2 · Update internal links

After renaming, the four deployed pages reference each other using the OLD filenames with spaces. Search-and-replace across `index.html`, `about.html`, `blog.html`, `post.html`, and `src/sections.jsx`:

```
"./Syntexia Redesign.html"   →  "/"
"./Syntexia About.html"      →  "/about"
"./Syntexia Team.html"       →  "/team"
"./Syntexia Blog.html"       →  "/blog"
"./Syntexia Post.html"       →  "/posts/the-quiet-revolution-coming-to-audit"
"./Syntexia Post Legal.html" →  "/posts/precedent-meets-pace"
"./Syntexia Signature Installer.html" → "/install-signature"
```

Note the Audit and Legal posts go into a `posts/` subfolder — you'll need to `mkdir -p posts` and move them there before updating links.

Vercel automatically serves `foo.html` at the clean URL `/foo` when `cleanUrls` is enabled (see next step). The replacements above use those clean URLs.

Also check `src/sections.jsx` — the nav and footer link `<a>` tags reference `./Syntexia Blog.html` and `./Syntexia About.html`. Update those too. After updating, the React app re-renders correctly because Babel re-transpiles on each load.

---

## 3 · Add `vercel.json`

Create `vercel.json` at the project root:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)\\.(svg|css|jsx|js)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600, must-revalidate" }
      ]
    },
    {
      "source": "/(.*)\\.html",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    }
  ]
}
```

`cleanUrls: true` lets `/about` resolve to `about.html` automatically. Short cache on HTML keeps content edits fast to propagate; longer cache on assets is fine since we can bust via `?v=N` query params.

---

## 4 · Add a `.vercelignore`

Create `.vercelignore` at the project root to keep internal/scratch files out of the deploy:

```
# Internal scratch / design exploration
Syntexia Logo.html
Syntexia Logo Animated.html
Syntexia Email Signature.html
Syntexia Email Signatures.html
Syntexia Deployment Guide.html
Karim — WhatsApp Avatar.html
DEPLOY.md

# Personal assets (NEVER ship)
avatars/

# Build / dev artefacts
screenshots/
_scripts/
_preview-*
.design-canvas.state.json
*.napkin
.DS_Store
```

---

## 5 · Install Vercel CLI and log in

```bash
npm i -g vercel
vercel login
```

The user already has a Vercel account (they use it for internal dashboards). They will be prompted to authorise via email or GitHub.

---

## 6 · Deploy (preview first)

From the project root:

```bash
vercel deploy
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → choose the user's existing team / personal account
- **Link to existing project?** → No (creating a new one)
- **Project name?** → `syntexia-website` (or whatever the user prefers)
- **Directory with the code?** → `./` (the current directory)
- **Want to override the settings?** → No (defaults are correct for a static site)

You will get a preview URL like `https://syntexia-website-abc123.vercel.app`. **Pause here and ask the user to open it and verify everything looks right** — homepage with animated lattice logo, About page, Blog index, sample Post page, mobile rendering. Do not proceed until they confirm.

---

## 7 · Deploy to production

After user confirms:

```bash
vercel deploy --prod
```

This pushes the verified preview to the project's production URL, something like `syntexia-website.vercel.app`.

---

## 8 · Attach the `syntexia.ai` domain

```bash
vercel domains add syntexia.ai
vercel domains add www.syntexia.ai
```

Vercel will respond with:

- For `syntexia.ai`: requires an **A record** pointing to `76.76.21.21` (or whatever value Vercel currently uses — confirm from CLI output).
- For `www.syntexia.ai`: requires a **CNAME record** pointing to `cname.vercel-dns.com`.

**Copy those exact values from the CLI output.** They are what the user needs to put into GoDaddy.

Then run:

```bash
vercel alias set syntexia-website.vercel.app syntexia.ai
vercel alias set syntexia-website.vercel.app www.syntexia.ai
```

(Replace `syntexia-website.vercel.app` with the actual production URL from step 7.)

---

## 9 · Update DNS at GoDaddy (automated)

The user has the GoDaddy CLI/API available locally. Detect which interface is set up and use it. **Before any change**, list the existing records to verify you only touch the two we need to change.

### 9a · Detect the GoDaddy interface

In order of likelihood, check for:

1. **A wrapper CLI** in PATH — e.g. `godaddy`, `gd`, `godaddy-cli`. Run `which godaddy 2>/dev/null || which gd 2>/dev/null` and inspect.
2. **Environment variables for the GoDaddy REST API** — `GODADDY_API_KEY` and `GODADDY_API_SECRET`. Run `printenv | grep -i godaddy`. If present, use `curl` against `https://api.godaddy.com/v1`.
3. **A `.godaddy` config file** in the user's home directory — `ls -la ~/.godaddy* ~/.config/godaddy* 2>/dev/null`.

Ask the user briefly which one they use if it's ambiguous.

### 9b · List current DNS records (sanity check)

Using the REST API directly (works whether or not a wrapper is installed, assuming env vars are set):

```bash
curl -s -H "Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET" \
     https://api.godaddy.com/v1/domains/syntexia.ai/records \
  | jq '.[] | {type, name, data, ttl}'
```

**Inspect the output. Confirm with the user before proceeding** that:
- There is an existing `A` record at name `@`.
- There is an existing `CNAME` record at name `www`.
- There are `MX` records (these must NOT be touched).
- There are `TXT` records for SPF/DKIM/Google verification (these must NOT be touched).
- There are subdomain `CNAME` records like `tcaintelligence` (these must NOT be touched).

If any of those email or subdomain records are missing, **stop** and surface to the user — something is unexpected.

### 9c · Update the A record for the apex

```bash
curl -s -X PUT \
  -H "Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '[{"data": "76.76.21.21", "ttl": 600}]' \
  https://api.godaddy.com/v1/domains/syntexia.ai/records/A/@
```

Replace `76.76.21.21` with whatever value Vercel returned in step 8. The GoDaddy API returns HTTP 200 with no body on success.

### 9d · Update the CNAME record for `www`

```bash
curl -s -X PUT \
  -H "Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '[{"data": "cname.vercel-dns.com", "ttl": 600}]' \
  https://api.godaddy.com/v1/domains/syntexia.ai/records/CNAME/www
```

### 9e · Re-list and confirm

Run the same `GET` from 9b again. Diff the output against what you saw before. Confirm:
- `A @` now points to the Vercel IP.
- `CNAME www` now points to `cname.vercel-dns.com`.
- **Every other record is identical to before.**

If anything else has changed, tell the user immediately.

---

## 10 · Verify after DNS propagation

DNS changes via the GoDaddy API typically propagate in 5–15 minutes. Wait 5 minutes after step 9e completes, then run:

```bash
# Check DNS propagation
dig syntexia.ai +short
dig www.syntexia.ai +short

# Check the site is serving
curl -I https://syntexia.ai
curl -I https://www.syntexia.ai
```

Expected:
- `dig` returns the Vercel IP (`76.76.21.21`) and the CNAME chain.
- `curl -I` returns `HTTP/2 200` from Vercel (look for the `server: Vercel` header).
- `https://www.syntexia.ai` should `301 → https://syntexia.ai` (Vercel handles this automatically).

If propagation hasn't completed, retry every 5 minutes. Most DNS changes are global within 30 minutes; rarely it takes a few hours.

---

## 11 · Verify SSL

Vercel auto-issues a Let's Encrypt certificate. Confirm:

```bash
curl -vI https://syntexia.ai 2>&1 | grep -i "issuer\|subject"
```

Should show `Let's Encrypt` as the issuer for `CN=syntexia.ai`. If the cert hasn't been issued, wait — Vercel does it automatically within a minute or two of DNS becoming valid.

---

## 12 · Final smoke test (manual, ask user)

Tell the user to test in this order:
1. Open `https://syntexia.ai` in an incognito window. Confirm homepage loads, lattice logo animates, hero log feed scrolls, nav works.
2. Click through to `/about`, `/blog`, `/post`. Confirm each page renders correctly.
3. Open on a phone over cellular data (not wifi — cellular forces a fresh DNS lookup). Confirm mobile layout is clean.
4. Send a test email to themselves to confirm email still works.
5. Visit `https://tcaintelligence.syntexia.ai` (or any other client subdomain) to confirm those still work untouched.

---

## What NOT to do

- **Do not modify any DNS record other than `A @` and `CNAME www`** at GoDaddy.
- **Do not touch `MX` records.** That's the user's Google Workspace email.
- **Do not touch `TXT` records.** Those handle SPF/DKIM/Google Workspace verification.
- **Do not delete subdomain DNS records** (`tcaintelligence.syntexia.ai`, etc.). Those are client dashboards.
- **Do not run `vercel domains remove`** on anything you didn't add in this session.
- **Do not cancel Wix** for the user — they will do that manually after the site has been live for a day or two.
- **Do not modify Google Workspace** or attempt to transfer billing. The user will handle that separately later this week.

---

## File map (reference)

```
/                              ← project root, this is what gets deployed
├── index.html                 ← homepage (React app via Babel)
├── about.html                 ← static
├── blog.html                  ← static (index of posts)
├── posts/
│   ├── the-quiet-revolution-coming-to-audit.html
│   └── precedent-meets-pace.html
├── vercel.json                ← created in step 3
├── .vercelignore              ← created in step 4
├── og-image.svg               ← social link preview (LinkedIn, Twitter, etc.)
├── syntexia-mark.svg          ← logo (transparent)
├── syntexia-mark-dark.svg     ← also used as favicon
├── syntexia-mark-light.svg
├── syntexia-wordmark.svg
└── src/
    ├── styles.css             ← all page styles
    ├── app.jsx                ← React root
    ├── sections.jsx           ← all section components
    └── tweaks-panel.jsx       ← in-page Tweaks UI
```

---

## Notes on the React-in-browser setup

The homepage uses **`@babel/standalone`** to transpile JSX in the browser. This is unusual for production but works perfectly for a low-traffic brand site:

- First load is slightly slower (~500ms extra to download Babel + transpile).
- Caches aggressively after first load.
- Zero build pipeline = zero maintenance.

**If the user later wants production performance** (or starts driving real traffic), the migration path is:
1. Add a Vite or esbuild config to pre-compile the JSX.
2. Switch `<script type="text/babel">` to compiled `<script src="dist/app.js">`.
3. Vercel will run the build automatically.

Don't do this now unless asked. Static + in-browser Babel is fine for the current stage.

---

End of brief.
