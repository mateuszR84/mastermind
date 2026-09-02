# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing site for **Master Mind Private School** (Polish group-tutoring business), built by StudioDEVS. No build step, no dependencies: `index.html`, `styles.css`, `hero.jpg`, plus the icon set `favicon.svg` / `favicon.ico` / `apple-touch-icon.png`.

All user-facing copy is in **Polish** — write new content in Polish and keep `lang="pl"`.

## Running it

No toolchain. Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
```

There are no tests, linter, or package manager. Changes are verified visually — the client (Mateusz) checks in a real browser himself, so don't spin up a dev server, screenshot tooling, or other scripts to self-verify after an edit unless he asks for it; it's redundant with his own check and wastes time. Just make the change and say what you changed.

**Cache-busting:** every static asset is referenced with a `?v=N` query param (`styles.css?v=5`, `back-to-top.js?v=1`, `contact-form.js?v=1`, `scroll-reveal.js?v=1`) because the production VPS/Cloudflare edge cache has served stale files after deploy before (see git history — a stale `styles.css` once caused both success/error form banners to show at once). **Any edit to `styles.css`, `back-to-top.js`, `contact-form.js`, or `scroll-reveal.js` must bump that file's `?v=N` in `index.html` to the next integer**, even for small changes — otherwise the fix won't actually reach the client's browser after deploy. `index.html` itself isn't versioned (browsers don't long-cache the HTML entry point).

## Structure and conventions

`index.html` is one flow of `<section>` elements in fixed order: hero → `#oferta` → `#cennik` → `#kadra` → `#opinie` → `#faq` → `#kontakt` → footer. Every section id is referenced by both the sticky header nav and (partly) the footer links — adding or renaming a section means updating both nav lists.

`styles.css` is hand-written, organized in blocks that mirror the section order (no header comments — the client wants comments out of the shipped code; see `TODO.md` for anything that used to live in a comment and still matters). Conventions to follow when extending:

- **Design tokens live in `:root`.** Never hardcode a color that already has a variable. `--mint` (#7CE8B4) is the single accent — CTA buttons (`.btn-primary`/`.btn-outline`), nav links, and icon colors all use it; darker mint shades are derived via `color-mix`. `--placeholder` (amber, #E8B45E) marks unfinished bracketed content via `.placeholder-tag`, and is also the hover color for the icon-only Facebook link in `#kontakt` (`.info-row-social a:hover i`) per client preference — mint read as too dark there. It is deliberately **not** used for nav links or buttons. Don't reintroduce amber there without the client asking again — this has been tried and reverted once already.
- **Layout primitives are shared, not per-section:** `.wrap` / `.wrap-narrow` (max-widths), `.section-pad` (padding), `.alt-bg` (alternating background — applied to `#oferta`, `#kadra`, `#faq`), `.card`, `.grid-3` / `.grid-4`, `.btn` variants. Reuse these rather than writing new one-off layout rules.
- **The hexagon + pegs motif** (Mastermind board game reference) recurs as `.logo-mark`/`.teacher-avatar` clip-paths and the `.pegs` dots in every section eyebrow. Keep it consistent.
- **Two icon systems coexist.** Most icons are hand-written inline SVGs stroked with `stroke="var(--mint)"`. A **Font Awesome 6.7 kit** (free tier, CSS/webfont method) is loaded in `<head>`, so `<i class="fa-brands fa-facebook">` also works — used by the four `#kontakt` info-row icons (`fa-location-dot`, `fa-phone`, `fa-envelope`, `fa-facebook`), all mint. Font Awesome icons take color from CSS `color`, not `fill`, so they need a rule like `.info-row i { color: var(--mint) }` rather than the `fill` attribute the inline SVGs use. Only free icons (`fa-solid`, `fa-regular`, `fa-brands`) are available.
- **The favicon duplicates the logo shape.** `favicon.svg` redraws the `.logo-mark` hexagon as a real `<path>` (CSS `clip-path` can't be reused in a standalone file), and `favicon.ico` / `apple-touch-icon.png` are rasterized from it. Changing the logo means editing `favicon.svg` too, then regenerating:
  ```bash
  for s in 16 32 48; do rsvg-convert -w $s -h $s favicon.svg -o /tmp/fav-$s.png; done
  magick /tmp/fav-16.png /tmp/fav-32.png /tmp/fav-48.png favicon.ico
  ```
  The SVG can't load Space Grotesk from Google Fonts, so the monogram falls back to a system sans-serif; `apple-touch-icon.png` gets a solid `--bg` backdrop because iOS handles transparency poorly.
- Two breakpoints only: 900px (nav hides, grids collapse, padding shrinks) and 560px.
- **First-party JavaScript is limited to three files: `back-to-top.js`, `contact-form.js`, and `scroll-reveal.js`.** `back-to-top.js` toggles `.is-visible` on `#back-to-top` past a 600px scroll threshold and smooth-scrolls to top on click — this specific "appear after scrolling" behavior isn't reliably doable in CSS alone across browsers (unlike the FAQ accordion, which uses native `<details>`, or nav scrolling, which uses CSS `scroll-behavior`). `contact-form.js` submits `#kontakt`'s form via `fetch` instead of a native POST — see the Formspree note below for why. `scroll-reveal.js` uses an `IntersectionObserver` to add `.is-revealed` to any `.reveal` element once it scrolls into view (fade-in + translateY, defined in `styles.css`'s "Scroll reveal" block, with `prefers-reduced-motion` respected) — reading scroll-into-view state isn't possible in CSS alone. Section eyebrows/headings/leads and the repeating cards (`.subject-card`, `.price-card`, `.teacher-card`, `.faq-item`, plus `.kontakt-info`/`.contact-form`) carry the `.reveal` class; stagger delays for siblings within `.grid-3`, `.grid-4`, `.faq-list`, and `.kontakt-split` are set via `nth-child` in that same CSS block. Prefer CSS-only for anything new; only reach for JS when the effect genuinely requires reading scroll position or other runtime state.

## Unfinished content (intentional)

The page is a pre-launch draft. Bracketed placeholders like `[ADRES DO UZUPEŁNIENIA]` are deliberate markers for client-supplied data, styled via `.placeholder-tag`. Do not invent real values to fill them — leave them until the client provides content. Currently pending: teacher bios for the two `[Imię Nazwisko]` slots left in `#kadra`, testimonials, trial-lesson terms, `og:url` and `og:image`, and the `AuthUserFile` path in `.htaccess` (see below).

All four `.teacher-avatar` hexagons in `#kadra` currently show `user-placeholder.jpg` — a generic stand-in photo, not a real teacher — so the hexagon reads as "photo" rather than initials while real photos are pending. Swap each `<img>`'s `src` and `alt` for the actual teacher's photo/name as they're supplied; don't invent names or use stock photos as if they were real.

**`.placeholder-tag`'s amber color is no longer a reliable "unfinished" signal** — the address/phone/email in `#kontakt` are real, filled-in values that intentionally keep the `.placeholder-tag` class because the client likes the amber color there (see the link-color convention above). Judge whether content is a real placeholder by the bracketed `[...]` text itself, not by its color.

The phone and email rows are real `<a>` links (`tel:+48512003766`, `mailto:kontakt@szkola-mastermind.pl`), not plain `<span>`s — if the client-supplied phone/email ever changes, update both the visible text and the `href`.

The contact form submits to Formspree (`action="https://formspree.io/f/xyegaqlo"`) — the account and endpoint belong to the client. Field names (`imie`, `telefon`, `email`, `przedmiot`, `wiadomosc`) surface as-is in Formspree's notification email; a hidden `_subject` field sets the email subject line.

Submission goes through `contact-form.js` via `fetch` (`Accept: application/json`), not a native form POST. This is deliberate: Formspree's post-submit redirect (`_next` / the dashboard's "Thank You" URL) is a **paid-plan-only feature** — on the free plan, a native POST always lands the user on Formspree's own hosted confirmation page no matter what `_next` is set to (confirmed against Formspree's docs; an earlier revision tried `_next` and it silently did nothing on the free plan). Submitting via `fetch` sidesteps this entirely: the browser never navigates away, so there's nothing for Formspree to redirect. `contact-form.js` shows `#kontakt-dziekujemy` (`.form-banner-success`) on success or `#kontakt-blad` (`.form-banner-error`, with a `mailto:` fallback) on failure, by toggling `.is-visible` — no `:target`/URL-fragment trickery needed anymore. If the client ever upgrades to a paid Formspree plan, this JS layer could be replaced by a plain POST + `_next` again, but there's no pressing reason to.

A honeypot field (`_gotcha`, Formspree's convention) guards against basic bots without spending JS or quota: it's a real `<input>` off-screen via `.hp-field` (not `display:none`, which more bots skip) — humans never fill it, so a nonempty value tells Formspree to silently drop the submission without counting it against the monthly limit. Formspree's own spam filter runs on top of this and is also exempt from the quota.

`.htaccess` at the repo root Basic-Auth-locks the whole site pre-launch (client's VPS is RunCloud-managed, Nginx+Apache2 hybrid, so `.htaccess` works normally). Its `AuthUserFile` is a bracketed placeholder — the actual `.htpasswd` is generated directly on the server (`htpasswd -c /path/outside/webroot/.htpasswd login`) and **never committed to this repo**, since it holds a password hash. Remove or rename `.htaccess` once the site actually launches and the password gate is no longer wanted.
