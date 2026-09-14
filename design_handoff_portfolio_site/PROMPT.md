# Prompt for Claude Code

Paste this into Claude Code from inside an empty directory that also contains this handoff
folder. It assumes `README.md`, `design-reference/`, `assets/` and `design-system/` are
present.

---

I'm building my personal portfolio site as a React + Vite app. In this directory is a design
handoff package. Read `README.md` in full first — it is the spec, and it is detailed. Then
open `design-reference/Samuel Field.dc.html` and read it as a source of exact values and
exact copy.

Important: that HTML file is a **design prototype**, not production code. It's written in a
custom component format (`<x-dc>` + a `DCLogic` class hydrated by `support.js`) that only
exists in the tool it was designed in. Do not port that runtime, do not copy its imperative
`element.style` scroll code, and do not try to make `support.js` work. Rebuild the design
properly in React.

## Stack

- Vite + React 19 + TypeScript
- Plain CSS with CSS custom properties (CSS Modules if you want scoping)
- **No Tailwind, no CSS-in-JS, no UI component library.** The README explains why: the
  design is a small token set plus bespoke 12-column layouts, and utility classes would
  bury the offsets and `clamp()` type scale that carry the whole look.
- A motion library is optional. Everything needed is `IntersectionObserver` plus one
  scroll listener.

## What to build

A single-page scrolling site, nine sections, no top nav. Fixed chrome: an "SF" mark
top-left, a nine-item index rail on the right edge, a scroll-progress readout bottom-left —
all three using `mix-blend-mode: difference` so they stay legible over every block colour.
A pointer-following circle with `backdrop-filter: invert(1)` on desktop. Eleven long-form
project detail panels behind a single overlay.

Work in this order:

1. **Scaffold + tokens.** Vite app, copy `design-system/tokens/*.css` into
   `src/styles/`, copy the fonts into `public/fonts/` and fix the `@font-face` `src:` paths.
   Ship only Archivo 700/900, Inter 400/500/600, Space Mono 400 — Caveat and Playfair are in
   the folder but unused. Add the body reset, `::selection`, link colours and the four
   keyframes (`sf-marquee`, `sf-marquee-rev`, `sf-blink`, `sf-bob`) from the reference's
   `<helmet>` block.
2. **Content data.** Before any JSX, extract the content into typed modules:
   `src/content/workExperience.ts` (the nine rows, table in the README) and
   `src/content/projects.ts` (the eleven detail panels). This is the bulk of the work and
   doing it first stops the components turning into walls of hard-coded prose.
3. **Motion hooks.** `useReveal`, `useScrollMotion`, `useActiveSection`,
   `usePrefersReducedMotion`. One shared scroll listener — `{ passive: true }`,
   rAF-throttled — not one per element. The README's "Interactions & behaviour" section has
   the exact formulas for the three parallax modes.
4. **Chrome components**, then **sections** top to bottom, then the **overlay**.

## Non-negotiables

**The copy is verbatim.** Every word on this site is mine. Do not rewrite, paraphrase,
shorten, expand or "improve" any of it — including the long project write-ups, which run to
several hundred words each. Copy the strings out of the reference HTML exactly, preserving
curly quotes, en and em dashes, the non-breaking hyphens (U+2011, in things like
"seed‑dropping" and "A‑Levels"), and accents (`Leúraciu`, `Okraän`).

**The exact values matter.** Hex codes, `clamp()` expressions, easing curves, durations and
grid column spans in the README are final. Particularly:

- `cubic-bezier(0.16, 1, 0.3, 1)` everywhere, `1100ms` reveals, `320ms` popup.
- Section padding `clamp(72px,11vw,150px) 78px clamp(72px,11vw,150px) 24px` — the
  asymmetric right padding clears the index rail and is deliberate.
- Sections start at different grid columns (1/9, 2/7, 3/13). That irregularity is the
  layout's signature, not an accident. Keep it.
- `FIELD` and `WRITING` are outlined type (`-webkit-text-stroke: 2px #F6F1E7` over a
  `#0A0A0A` fill), not solid.
- The hero's two name lines drift in **opposite** horizontal directions on scroll and
  reverse exactly on scroll-up, because the transform is purely a function of `scrollY`.

**Keep the 4-second reveal failsafe** — a timeout that force-shows every reveal element
regardless of the observer. Content must never be stranded invisible.

## Things to fix while you're in there

These are known gaps in the prototype. Do them as part of the build:

1. **Mobile.** The prototype is desktop-only below about 900px. Add a breakpoint: collapse
   every 12-column grid to one column in source order, drop the deliberate offsets, reduce
   section padding to about `56px 20px`, hide or relocate the index rail, and stack the work
   experience rows (year → title → note). The README has the full suggestion.
2. **Overlay accessibility.** Add `role="dialog"`, `aria-modal="true"`, an
   `aria-labelledby` pointing at the panel title, and a proper focus trap with focus
   restored to the triggering button on close. Escape-to-close, scrim-click-to-close, the X
   button and the body scroll lock all already exist in the prototype — keep them.
3. **Reduced motion.** The prototype disables the JS motion but not the CSS ones. Also
   pause the two marquees and the blinking dot under `prefers-reduced-motion: reduce`.
4. **Media components.** Build `MediaSlot` and `VideoSlot` so that swapping a placeholder
   for a real photo, or a poster for an embedded player, is a one-line change in the content
   data. Every slot has a caption naming what belongs there — keep those strings, they're my
   shot list.

## Don't

- Don't drop or "consolidate" the placeholder image slots because they're currently
  repeating the same five photos. The repetition is intentional — it shows scale. Real media
  is coming.
- Don't fix the two content inconsistencies the README flags (the spelling of the conlang,
  and 4M+ vs 3.6M Unsplash views). Leave them and list them for me at the end.
- Don't add sections, projects, filler copy or stock imagery.
- Don't restyle anything toward a more conventional portfolio look.

## When you're done

Give me: `npm run dev` working, a short note on anything in the README you couldn't
reproduce faithfully and why, and the list of open content questions (the two
inconsistencies above, the placeholder GitHub link in the Lexitecht panel, and the missing
Leuiraciu font download).
