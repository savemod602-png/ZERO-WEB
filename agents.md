# AGENTS.md

## Project

Single-page static bio site for "ZERO" (Minecraft/Web/Discord bot developer). No framework, no bundler, no server — plain `index.html` + `style.css` + `script.js` served as-is.

## Layout

- `index.html` — all page markup: header/theme toggle, hero with the animated "ZERO" name, the glassmorphism profile card (bio, about-me, best friends), the social link grid, footer.
- `style.css` — all styling. Theme colors are CSS custom properties on `:root` (light) and `body.dark-mode` (dark); everything else references those variables, so retheming means editing the variable block only.
- `script.js` — theme toggle + persistence (`localStorage` key `zero-theme`), the background-video seamless-loop fix, a canvas-based frost/snow particle background, and an `IntersectionObserver`-driven scroll-reveal for `.reveal-up` elements.
- `avatar.png`, `alpha.png`, `cinema.png` — generated art assets (see below). Referenced with strict relative `./` paths per the original spec, so the site stays portable to GitHub Pages or any static host without config.
- `video.mp4` — **not included**. The `<video id="bg-video">` element references `./video.mp4`; if the file is absent, `script.js` hides the (broken) video element and the CSS `.bg-fallback` animated gradient layer shows through instead, so there's never a black screen either way.
- `netlify.toml` — publishes the repo root with no build command (pure static deploy).

## Conventions / non-obvious decisions

- **Global small-caps requirement**: the site brief required small-caps on all text everywhere. This is implemented as `* { font-variant: small-caps; font-feature-settings: "smcp"; }` at the top of `style.css`. Don't scope this differently per-component — it's intentionally universal.
- **Local asset paths are load-bearing**: image/video `src` attributes intentionally use `./relative-path.ext` rather than absolute paths or Netlify's Image CDN rewrite (`/.netlify/images?...`). This was an explicit requirement so the same file tree keeps working unmodified on GitHub Pages. Don't reroute these through the Image CDN.
- **Gradient palette is constrained**: the "ZERO" name gradient (`gradient-text` in `style.css`) must only use icy-blue/cyan/frost-white tones (`#00f2fe`, `#4facfe`, `#a1c4fd`, `#c2e9fb`, `#38ef7d`). No orange/yellow/red/pink — that was an explicit exclusion in the design brief.
- **No backend/database**: this is a static bio page with no forms or persistence, so there's intentionally no Netlify Function, database, or Blobs usage.

## Where to go next

There's no PLAN.md — this was a fully self-contained small site, built end to end in one pass. If someone wants to extend it (e.g. a contact form, a blog, more pages), start by deciding whether it should stay a static site or move to a framework template, since the current architecture has no build step by design.
