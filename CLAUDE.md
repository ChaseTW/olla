# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static event landing site — 順事·芒種 (Sūn-sī · Mangzhong), an invitation for the
"PUREMOSA 順事琴酒 × NO6 Wagyu Formula" wagyu-and-gin pairing dinner on 2026-06-05.
No framework, no build system, no package manager, no tests. Deployed as a
Cloudflare Pages static site under the domain `penfungo.com`.

## Layout

```
0605/                            ← Cloudflare Pages deploy root
  events/mangzhong-2026-0605/        ← serves at penfungo.com/events/mangzhong-2026-0605/
    index.html  styles.css  app.js  assets/
    index.original.html          ← pre-SEO backup (not deployed)
  robots.txt  sitemap.xml        ← must stay at the deploy root
  _headers  _redirects           ← Cloudflare Pages config
  .assetsignore                  ← excludes img/ fonnts/ + dev files from deploy
  img/  fonnts/                  ← source-only assets, never deployed
  puremosa_final.html  font-preview.html   ← dev-only, never deployed
infra/                           ← Terraform: Cloudflare Pages project, domain, DNS
```

## Running it

No build step. Serve the event folder:

```sh
python3 -m http.server 8000 --directory 0605/events/mangzhong-2026-0605
```

`_headers` / `_redirects` only take effect on Cloudflare Pages, not on a plain
HTTP server.

## Deploying

`infra/` provisions the Cloudflare Pages project + custom domain + DNS as code
(see `infra/README.md`). Terraform does **not** upload files — content is pushed
separately:

```sh
npx wrangler pages deploy 0605 --project-name=penfungo-web
```

`.assetsignore` keeps source files (`img/`, `fonnts/`, the dev-only HTML) out of
the deployment.

## Architecture

### The port lineage (read this first)

`0605/puremosa_final.html` is a ~512KB self-contained React/Babel prototype (a
"bundler" export). The shipped site — `index.html` + `styles.css` + `app.js` — is a
hand-port of that prototype to dependency-free vanilla HTML/CSS/JS. Comments in
`styles.css` and `app.js` reference "the React prototype" / specific JSX components
(`<SectionDivider />`, `<MapSVG />`). Treat `puremosa_final.html` as the historical
source of design intent; edit only the three vanilla files in `events/mangzhong-2026-0605/`.

### `app.js` — behaviour layer

One IIFE with six independent `init*()` functions: `initBackground`, `initLeaves`,
`initTermsWheel`, `initCountdown`, `initNav`, `initNotes`. Each begins with a
`getElementById`/`querySelector` null-guard and early `return` — so a section can be
removed without breaking the script. `initNotes` drives every `.note-card`, including
the FAQ accordion. Preserve this pattern when adding code.

### `styles.css` — theming

`<body data-theme data-time data-bg-mode>` drives CSS-variable swaps via attribute
selectors. `data-theme` supports `jade` (default), `gold`, `dusk`. Note: `app.js`
hardcodes the canvas blob palette to the jade·noon defaults, so changing `data-theme`
recolors CSS but **not** the animated background.

### Fonts & assets

- `assets/fonts/*.woff2` — production: character-subset WOFF2, generated from the
  full source faces in `0605/fonnts/` (`pyftsubset` + brotli; see CSS header comments).
- `assets/*.webp` — production images, converted from raw sources in `0605/img/`
  (`cwebp`). `img/` and `fonnts/` are source-only; the site never references them.
- BC Novatica has no italic cut: its italic `@font-face` rules deliberately reuse the
  upright WOFF2 files. Do not "fix" this — it prevents faux-slanted text.

### SEO / GEO structure

`index.html` carries an 8-node JSON-LD `@graph` (before `</body>`), a FAQ section and
an "audience" section. The FAQ reuses `.note-card` markup. The `<h1>` carries
keyword text in a `.sr-only` span. Canonical / Open Graph / schema URLs are absolute
`penfungo.com` URLs — keep them consistent with the real deployed path.

## When editing, keep these in sync

- **Event date/time**: display text in `index.html`, the countdown string
  `"2026-06-05T19:00:00+08:00"` in `app.js` (`initCountdown`), the JSON-LD
  `startDate`/`endDate`, and the `<time datetime>` in the info section.
- The **surveycake CTA** `https://www.surveycake.com/s/9MA81` appears in nav, hero,
  reservation section, and JSON-LD `offers.url`.
- The **domain `penfungo.com`** is hardcoded in `index.html` (canonical/OG/schema),
  `robots.txt`, `sitemap.xml`, and is a Terraform variable in `infra/`.
