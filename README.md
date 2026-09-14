# samfield.co

Samuel Field's personal site: one long scroll, nine colour-blocked sections, twelve
long-form project panels behind a single overlay.

React 19 + Vite + TypeScript, plain CSS with custom properties. No Tailwind, no CSS-in-JS,
no component library, no router — the design is a small token set plus bespoke 12-column
layouts, and utility classes would bury the offsets and `clamp()` type scale that carry the
look.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  ->  dist/
npm run preview
```

## Where things live

```
src/
  content/         projects.ts (the 12 panels), workExperience.ts (the 9 rows), sections.ts
  hooks/           scrollMotion.ts is the single scroll listener; useReveal, useDrift, …
  components/
    chrome/        Mark, IndexRail, ProgressReadout, InvertCursor — all fixed, all difference-blended
    sections/      Hero … Contact, one per section, plus the Section wrapper
    ui/            MediaSlot, VideoSlot, Tag, Button, DetailButton, Marquee, the overlay
  styles/          tokens, fonts, global, chrome, ui, sections, overlay, responsive
public/
  assets/          the five placeholder photographs and the CV
  fonts/           Archivo 700/900, Inter 400/500/600, Space Mono 400
  Okraan*.od[st]   the first conlang's dictionary and grammar, kept at their original URLs
design_handoff_portfolio_site/   the design handoff this was built from — spec, reference, tokens
old/                             the previous version of the site
```

## Things worth knowing before editing

- **The copy is verbatim.** Every string comes from the design reference, including curly
  quotes, en and em dashes, and non-breaking hyphens (U+2011) in "seed‑dropping",
  "A‑Levels", "Imm‑Aroy". `src/content/projects.ts` was transcribed mechanically from
  `design_handoff_portfolio_site/design-reference/Samuel Field.dc.html`; keep it that way.
  Two deliberate corrections have since been made on top of it, so don't "restore" them
  from the reference: the constructed language is **Leuiráciu** everywhere (the prototype
  spelled it four different ways), and the Unsplash figure is **3.5M+** everywhere (the
  prototype said 4M+ in the headline and 3.6M in the panel).
- **Every image is a placeholder.** The same five photographs repeat on purpose, to show
  scale. Each slot's mono caption names what belongs there — that is the shot list. Swapping
  in real media is a one-line change to `src` in the content data or the section.
- **All scroll motion runs through one listener** in `src/hooks/scrollMotion.ts`, throttled
  to one animation frame. Do not add per-element scroll listeners.
- **Reveals have a 4-second failsafe.** If the IntersectionObserver misfires, everything is
  shown anyway. Content must never be stranded invisible.
- **The irregular grid offsets are deliberate.** Sections start at columns 1, 2 and 3 on
  purpose; the 78px right padding clears the index rail. Below 900px all of it collapses to
  one column.

Open work — dead links, the two panels still to be written, the media shot list — is in
[TODO.md](TODO.md).
