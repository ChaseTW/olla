# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

PenFunGo's static multi-page brand site plus preserved campaign pages. The main
site introduces the company, services and approved work; the existing 順事·芒種
event landing page remains available at its stable URL. There is no framework,
build system or package manager. Cloudflare Pages Direct Upload serves the whole
`0605/` tree under `penfungo.com`.

The first brand-site release deliberately excludes 地方筆記. Do not add
`/journal/` links or empty routes until its content and Dokki publication flow
are approved.

## Layout

```
0605/                            ← Cloudflare Pages deploy root and brand homepage
  index.html shared.css shared.js    ← brand site shared shell
  about/ services/ contact/ work/    ← brand routes
  penfungo-assets/                   ← brand visual assets
  events/mangzhong-2026-0605/        ← stable campaign URL
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

No build step. Serve the complete deploy root:

```sh
python3 -m http.server 8000 --directory 0605
```

`make preview-event` remains available when working only on the campaign page.

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

### Brand site

The brand pages share `0605/shared.css` and `0605/shared.js`. Keep navigation,
mobile behavior, reduced-motion handling and static route paths consistent across
all brand pages. The first release is static: a visible contact form must not claim
that data was sent until a real endpoint exists. Do not invent email addresses,
case results, partners or publication permissions.

The approved page-direction split is: C 共作長桌 for the homepage, A 工作桌 for
About, and B 流域索引 for work/case pages. Detailed context and release gates are
in `docs/penfungo-production-plan.md` and
`docs/penfungo-site-architecture-v1.md`.

### Event page port lineage (read before editing the campaign)

`0605/puremosa_final.html` is a ~512KB self-contained React/Babel prototype (a
"bundler" export). The shipped site — `index.html` + `styles.css` + `app.js` — is a
hand-port of that prototype to dependency-free vanilla HTML/CSS/JS. Comments in
`styles.css` and `app.js` reference "the React prototype" / specific JSX components
(`<SectionDivider />`, `<MapSVG />`). Treat `puremosa_final.html` as the historical
source of design intent; edit only the three vanilla files in `events/mangzhong-2026-0605/`.

### Event `app.js` — behaviour layer

One IIFE with six independent `init*()` functions: `initBackground`, `initLeaves`,
`initTermsWheel`, `initCountdown`, `initNav`, `initNotes`. Each begins with a
`getElementById`/`querySelector` null-guard and early `return` — so a section can be
removed without breaking the script. `initNotes` drives every `.note-card`, including
the FAQ accordion. Preserve this pattern when adding code.

### Event `styles.css` — theming

`<body data-theme data-time data-bg-mode>` drives CSS-variable swaps via attribute
selectors. `data-theme` supports `jade` (default), `gold`, `dusk`. Note: `app.js`
hardcodes the canvas blob palette to the jade·noon defaults, so changing `data-theme`
recolors CSS but **not** the animated background.

### Event fonts & assets

- `assets/fonts/*.woff2` — production: character-subset WOFF2, generated from the
  full source faces in `0605/fonnts/` (`pyftsubset` + brotli; see CSS header comments).
- `assets/*.webp` — production images, converted from raw sources in `0605/img/`
  (`cwebp`). `img/` and `fonnts/` are source-only; the site never references them.
- BC Novatica has no italic cut: its italic `@font-face` rules deliberately reuse the
  upright WOFF2 files. Do not "fix" this — it prevents faux-slanted text.

### SEO / GEO structure

The event `index.html` carries an 8-node JSON-LD `@graph` (before `</body>`), a FAQ section and
an "audience" section. The FAQ reuses `.note-card` markup. The `<h1>` carries
keyword text in a `.sr-only` span. Canonical / Open Graph / schema URLs are absolute
`penfungo.com` URLs — keep them consistent with the real deployed path.

## When editing the event, keep these in sync

- **Event date/time**: display text in `index.html`, the countdown string
  `"2026-06-05T19:00:00+08:00"` in `app.js` (`initCountdown`), the JSON-LD
  `startDate`/`endDate`, and the `<time datetime>` in the info section.
- The **surveycake CTA** `https://www.surveycake.com/s/9MA81` appears in nav, hero,
  reservation section, and JSON-LD `offers.url`.
- The **domain `penfungo.com`** is hardcoded in `index.html` (canonical/OG/schema),
  `robots.txt`, `sitemap.xml`, and is a Terraform variable in `infra/`.
