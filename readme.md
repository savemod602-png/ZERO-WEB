# ZERO — Icy Bio Site

A single-page, icy-blue/frost themed personal bio site for **ZERO**, a Minecraft Server Developer, Web Developer, and Discord Bot Developer. Owner of the **Alpha MC Network** and creator of the **Alpha Cinema Bot**.

## What this is

A static HTML/CSS/JS site (no framework, no build step) featuring:

- Light/dark "frost" theme toggle with a smooth cross-fade transition, persisted in `localStorage`.
- An animated icy-blue/cyan gradient treatment on the "ZERO" name.
- A glassmorphism profile card with a pulsing ring around the avatar, bio, "About Me," and "Best Friends" list.
- A full-screen looping background video hook (`./video.mp4`) with a seamless-loop fix and an animated frost-gradient + canvas snowfall fallback so the page still looks complete if no video file is present.
- Social/community link cards for TikTok (main + backup), Instagram, the Alpha MC Discord server, and the Alpha Cinema dashboard.
- Scroll-triggered entrance animations and a fully responsive mobile/desktop layout.

## Technologies

- Plain HTML5, CSS3 (custom properties, backdrop-filter glassmorphism, keyframe animations), and vanilla JavaScript — no build tooling required.
- [Font Awesome](https://fontawesome.com/) (via CDN) for brand icons.
- [Google Fonts – Poppins](https://fonts.google.com/specimen/Poppins) rendered in small-caps site-wide.
- `avatar.png`, `alpha.png`, and `cinema.png` were generated with Google Gemini image generation through Netlify's AI Gateway and committed as static assets.

## Running locally

No install or build step is required — it's static files. From the project root:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed local URL in a browser.

## Adding the background video

Drop a file named `video.mp4` in the project root (same folder as `index.html`). The page already references `./video.mp4`; until that file exists, an animated icy gradient background is shown instead so the page never shows a black screen.

## Deploying

This is a static site — `netlify.toml` publishes the project root directly with no build command, so it deploys as-is to Netlify (and is also GitHub Pages compatible, since every asset reference uses relative `./` paths).
