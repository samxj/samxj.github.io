# Sam Field — Design System

Personal portfolio design system for **Sam Field**: a site to show who he is, what he does (engineering, photography/videography, design, writing, music, languages), and how to reach him.

**Sources:** none were attached — no Figma file, codebase, or existing site. This system was authored from scratch from a short brief and Sam's CV text (pasted into chat, not a linked file), following the brief below. If a real site, Figma file, or brand assets exist later, replace the tokens/assets here rather than starting over — the structure will hold.

**Brief, verbatim intent:** *"Real tech experience meets raw human creativity."* Bold and unique in creative tech, yet natural and human in tone. High-contrast mono palette (black/white) + one accent color. Bold grotesk display type + clean sans body. Cinematic, scroll-driven motion.

---

## Index

- `styles.css` — root stylesheet, imports everything below
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`
- `assets/fonts/` — self-hosted Archivo, Inter, Space Mono (woff2)
- `components/core/` — `Button`, `Tag`, `SectionHeading`, `ProjectCard`, `ExperienceRow`, `Nav`, `Footer`
- `guidelines/` — foundation specimen cards (colors, type, spacing, motion)
- `ui_kits/portfolio/` — the portfolio site itself: Home, About, Work, Resume, Contact
- `SKILL.md` — portable skill file for use in Claude Code

## Intentional additions

No component source existed, so this is a from-scratch standard set sized to a single-person portfolio (not a full app). Chosen set: `Button`, `Tag`, `SectionHeading`, `ProjectCard`, `ExperienceRow`, `Nav`, `Footer` — covers CTA, skill/meta chips, section openers, the Work grid, the Resume timeline, and page chrome. Omitted from the usual app-kit set (Input, Select, Dialog, Toast, etc.) because the portfolio has no forms or app-like flows beyond a mailto contact link.

---

## Content fundamentals

**Voice:** first person, direct, unpretentious. Sam talks about his own work plainly — no third-person "Sam is a passionate creative" bio-speak. Sentences are short and confident, not resume-jargon-inflated. Example line used in the kit: *"Real tech experience meets raw human creativity."*

**Tone:** warm but not soft — matter-of-fact about real, specific things (named clients, named tools, named grades) rather than vague superlatives. Prefers a concrete fact ("Grade 9 in Latin GCSE, a year early") over an abstract claim ("hard-working and driven"). Humility with real substance — he lists what he actually did on a project (shot planning, editing, code) rather than a job title.

**Casing:** sentence case throughout, including headings — no ALL CAPS body copy. Eyebrows/labels (small nav-adjacent text) are the one place for uppercase + wide letter-spacing, kept short (1-3 words).

**Person:** "I" throughout — this is Sam's own site, not a company. Never "we".

**Emoji:** none. The brand's warmth comes from specific, human detail — not emoji or exclamation marks.

**Numbers & specifics:** always concrete — years, grade levels, tool names, client names. "Grade-8 drums", "C1 Italian", "since 2021" — not "years of experience".

---

## Visual foundations

**Color:** near-black background (`--black-1 #0A0A0A`) as the default canvas — this is a dark-first system. Text is warm off-white/cream (`--cream-1 #F6F1E7`), never pure white on pure black (too clinical for a "human" brand). One accent, flame-orange (`--flame-1 #FF5A2E`) — used for the single CTA per screen, active nav state, section eyebrows, hover accents, and link/skill highlights. Everything else is mono: black, near-black surfaces, cream text, grey for muted/secondary. Never a second accent color and never a gradient background — the "high-contrast mono + one pop" rule is load-bearing.

**Type:** bold grotesk display (Archivo, weight 900/800) set very tight (`line-height` ~0.92–1.05, negative tracking) for headlines — this is where "bold and unique" shows up. Body copy is Inter, generous line-height (1.5–1.6), never bold, quiet and legible so the voice reads human rather than shouty. Space Mono appears only for meta/technical flourishes — dates, tags, eyebrow indices ("01", "02") — a nod to the engineering side.

**Spacing:** generous, cinematic — sections breathe (`--space-8`/`--space-9`, 64–96px) rather than packing tight. A single `--gutter` (responsive, 24–64px) drives page margins so the layout stays airy on all breakpoints.

**Backgrounds:** flat near-black by default; occasional subtle diagonal dark gradient (`#1D1B17` → `#0A0A0A`) behind image placeholders, never a colorful or busy background. No repeating patterns, no textures, no hand-drawn illustration. Photography does the decorating, not the chrome.

**Animation:** cinematic — slow, deliberate reveals on scroll (fade + rise, `--duration-reveal` ~1100ms, `--ease-cinematic` cubic-bezier(0.16,1,0.3,1), an "ease out expo" curve: fast start, long soft settle). No bounce, no spring overshoot — motion should feel considered, not playful.

**Hover states:** primary buttons lighten slightly (`--accent` → `--accent-hover`, a touch brighter); secondary/outline buttons fill with a raised dark surface; project titles shift from cream to flame-orange; the Button `icon="arrow"` nudges 3px right. No hover ever changes size.

**Press/active states:** color deepens (`--accent-active`, darker flame) rather than any scale/shrink transform — this system does not use press-scale.

**Borders:** hairline (`1px`, `--border-hairline` on dark surfaces, `--border-strong` for emphasis) — no drop-shadow-heavy cards. Borders do the separating; shadow is reserved for rare elevation (`--shadow-md`) and is always soft/low-contrast, never a hard drop shadow.

**Corner radii:** mostly small/sharp — `--radius-sm` 2px (inputs/small chips edge), `--radius-md` 6px (buttons), `--radius-lg` 14px (image cards) — plus `--radius-pill` for the mono Tag chips only. Nothing is fully rounded except those pills.

**Cards:** no fill, no drop shadow by default — an image, a hairline-bordered frame, and text below it (see `ProjectCard`). The "card" is really an image + typography block, not a boxed container.

**Transparency & blur:** the one blur use is the sticky nav — `rgba(10,10,10,0.7)` + `backdrop-filter: blur(16px)` so content scrolls visibly behind it. Not used elsewhere.

**Imagery color vibe:** warm, filmic — Sam's own photo/video work (once supplied) should read naturally warm/cinematic rather than cool or corporate-blue-toned. Until real photography is dropped in, image slots render as a plain dark-gradient placeholder tile labelled "IMAGE" in mono type — never a fake illustration.

**Layout rules:** content is capped at `--content-max` (1200px) with a responsive gutter; the nav is the one fixed/sticky element; everything else scrolls normally, no fixed sidebars.

---

## Iconography

No icon system, sprite, or icon font was supplied (no source project attached). The kit currently uses exactly one hand-set inline SVG glyph — the arrow inside `Button`'s `icon="arrow"` prop — since a single directional arrow is a UI primitive, not brand iconography, and it is drawn to match stroke weight (1.5px, round caps) rather than borrowed from a mismatched set.

For any future icon need (social links, project meta glyphs, etc.), default to **Lucide** (lucide.dev) via CDN — a neutral, 1.5px-stroke line-icon set that matches the mono/hairline visual language here — and flag it as a substitution until Sam's own icon preference or assets are known. Do not hand-draw additional icons beyond the one arrow above.

Emoji: not used anywhere (see Content Fundamentals).

**No logo exists.** Every source given was text-only (a brief + a CV). The wordmark "Sam Field" is set in Archivo wherever a mark would otherwise go (see `Nav`). If Sam has or wants a logomark, that's a natural next step — flagged below.

---

## Components

- **Button** — primary/secondary/ghost CTA, optional trailing arrow
- **Tag** — mono skill/meta pill
- **SectionHeading** — eyebrow + heavy display title, opens every section
- **ProjectCard** — work-sample card (image, title, role, tags)
- **ExperienceRow** — one CV timeline row
- **Nav** — sticky glass top bar
- **Footer** — closing mailto + socials block

## UI kit

`ui_kits/portfolio/` — the site itself: Home, About, Work, Resume, Contact, stitched into one click-through `index.html`.
