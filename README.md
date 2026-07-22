# Josue Cikanga — Portfolio

A single-page personal site: hero, about, skills, projects, tutoring, and contact.
Plain HTML/CSS/JS — no build step, no framework, so it deploys to Vercel instantly.

## Before you deploy — 2 things to update

1. **LinkedIn / GitHub links.** Open `index.html`, find `id="linkedin-link"` and
   `id="github-link"` in the Contact section, and replace the `href="#"` with your
   real profile URLs.
2. **Resume file (optional).** If you want a "Download résumé" button, drop a
   `resume.pdf` into this folder and add a button back into the hero, e.g.:
   ```html
   <a href="/resume.pdf" class="btn btn-ghost" download>Download résumé</a>
   ```

## Run it locally

No build tools needed. Any of these work:

```bash
# Option A: just open it
open index.html

# Option B: quick local server (recommended, avoids some browser file:// quirks)
npx serve .
# or
python3 -m http.server 5500
```

## Deploy to Vercel

### Option 1 — Vercel CLI (fastest)
```bash
npm install -g vercel
cd portfolio
vercel        # first deploy, follow the prompts
vercel --prod # promote to your production URL
```

### Option 2 — GitHub + Vercel dashboard (recommended long-term)
1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Other** (it's a static site — no build command, no output
   directory needed). Click **Deploy**.
4. Every future push to `main` auto-deploys.

Once deployed, Vercel gives you a URL like `josue-cikanga.vercel.app` — you can
also attach a custom domain later from the project's Settings → Domains.

## File structure

```
portfolio/
├── index.html      # all page content/sections
├── styles.css      # blueprint/schematic design system
├── script.js       # terminal typing effect, mobile nav, scroll reveal
├── vercel.json     # static-site config (clean URLs)
└── README.md
```

## Design notes

The visual concept is a technical blueprint / schematic: deep blueprint-blue
background, dimension lines, figure numbers (FIG. 01, FIG. 02...) instead of
decorative numbering, and a small circuit-style diagram in the hero connecting
the languages/frameworks you use. It's meant to read as "engineer who also
teaches" — precise, legible, a little bit like a math diagram on a chalkboard
in the tutoring section.
