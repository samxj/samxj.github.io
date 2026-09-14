# Handoff: Samuel Field — personal portfolio site

## Overview

A single-page, scroll-driven personal portfolio for Samuel Field, a UK sixth-form student
doing both technical work (engineering, code, computing) and creative work (film,
photography, writing, music). The site is one long vertical scroll of nine colour-blocked
sections with no top navigation — orientation comes from a fixed right-edge index rail, a
fixed "SF" mark top-left, and a fixed progress readout bottom-left. Each project can be
expanded into a long-form detail popup.

The design deliberately avoids conventional portfolio-template conventions: no hero card
grid, no sticky header, no rounded-corner project tiles. Type is very large and tightly
tracked, sections butt directly against each other in flat blocks of colour, and motion is
scroll-linked rather than decorative.

## About the design files

The files in `design-reference/` are **design references created in HTML**. They are a
prototype of the intended look and behaviour — not production code to lift directly.

`Samuel Field.dc.html` is authored in a custom in-house component format (`<x-dc>` template
+ a `DCLogic` class, hydrated by `support.js`). **Do not port that runtime.** Open the file
in a browser to see the design, read it as a spec, and rebuild the design in the target
environment (see "Target stack" below) using that environment's normal patterns.

Notably, the reference does almost all its animation by mutating `element.style` directly
from imperative scroll handlers. That is an artefact of the prototype format. In the real
build this should become idiomatic framework code — hooks/composables, or a small motion
library — not DOM string-mutation inside a `componentDidMount`.

## Fidelity

**High fidelity.** Colours, typography, spacing, layout and interaction timings in the
reference are final and should be matched closely. All hex values, font sizes, `clamp()`
expressions, easing curves and durations listed below are the intended production values.

The one deliberately unfinished area is **media**. Every image in the reference is a
placeholder — the same five photographs are reused throughout purely to show scale and
crop. Slots are labelled in mono caption text with what belongs there (`SLOT · THE PLANE IN
FLIGHT`, `VIDEO SLOT · ROCK CONCERT SET`, etc.). Video slots are static posters with a play
glyph; no player is wired up. See "Assets" below.

---

## Target stack

React 19 + Vite + TypeScript, plain CSS (CSS Modules or vanilla CSS with custom properties).

Deliberately **not** recommended:

- **No Tailwind.** The design is built from a small token set and a handful of bespoke
  layouts; utility classes would bury the 12-column offsets and `clamp()` type scale that
  carry the whole look.
- **No CSS-in-JS runtime.** Tokens are already CSS custom properties.
- **No UI component library.** Nothing here is a standard widget.
- **A motion library is optional.** Everything needed is `IntersectionObserver` plus one
  `scroll` listener; Framer Motion would be convenient for the reveals but is not required.

Suggested structure:

```
src/
  main.tsx
  App.tsx
  styles/
    tokens.css          # from design-system/tokens/*
    fonts.css           # @font-face, fonts copied to public/fonts
    global.css          # body reset, ::selection, keyframes
  hooks/
    useReveal.ts        # IntersectionObserver fade+rise
    useScrollMotion.ts  # one rAF-throttled scroll listener, drives all parallax
    useActiveSection.ts # which section is current
    usePrefersReducedMotion.ts
  components/
    chrome/  Mark.tsx  IndexRail.tsx  ProgressReadout.tsx  InvertCursor.tsx
    sections/ Hero.tsx  HabitOfMind.tsx  Technical.tsx  FilmPhoto.tsx  Music.tsx
              Writing.tsx  WorkExperience.tsx  RightNow.tsx  Contact.tsx
    ui/      Marquee.tsx  Tag.tsx  Button.tsx  MediaSlot.tsx  VideoSlot.tsx
             DetailButton.tsx  ProjectDetailOverlay.tsx
  content/
    projects.ts         # the 11 detail-panel bodies
    workExperience.ts   # the 9 timeline rows
```

---

## Design tokens

Copy `design-system/tokens/*.css` verbatim into the Vite app. The full set is in those
files; these are the values the site actually uses.

### Colour

| Token | Hex | Used for |
|---|---|---|
| `--black-1` | `#0A0A0A` | Page background, dark section blocks, ink on coloured blocks |
| `--black-2` | `#161513` | Image-slot placeholder fill on dark |
| `--black-3` | `#211F1B` | Hairline borders on dark |
| `--cream-1` | `#F6F1E7` | Primary text on dark; background of §01 and §06 |
| `--cream-2` | `#E7DFCE` | Body copy on dark |
| `--grey-1` | `#8C877D` | Muted/meta text on dark |
| `--grey-2` | `#46433D` | Muted borders, faint footer text |
| `--flame-1` | `#FF5A2E` | The accent: eyebrows, `/01` indices, marquee bg, §07 bg |
| `--flame-2` | `#E1481F` | Accent hover/active |

Two additional block colours appear only as full-section backgrounds and are part of the
"colour-blocked scroll" concept:

| Value | Where |
|---|---|
| `#16C7C0` teal | §03 Film & Photo background; accent for creative-side detail buttons |
| `#E4FF3B` acid yellow | §04 Drums background; "award/win" highlight text on dark |

On the cream §06 block the accent is darkened to `#C23F18` for contrast, and secondary
text uses `#56524A` / `#55514A`. Do not use `--flame-1` for small text on cream — it fails
contrast, which is why the darker variant exists.

### Type

Three families, all self-hosted (files in `design-system/fonts/`):

- **Archivo** 700 / 900 — display. `--font-display`
- **Inter** 400 / 500 / 600 — body. `--font-body`
- **Space Mono** 400 — all meta, eyebrows, captions, rail labels. `--font-mono`

Caveat and Playfair are in the font folder but **unused by this design** — do not ship them.

Scale actually used (all `clamp(min, preferred, max)`):

| Role | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Hero name (`SAMUEL` / `FIELD`) | `clamp(72px, 15.5vw, 260px)` | 900 | 0.82 | -0.05em |
| Section H2 | `clamp(52px, 12vw, 210px)` (varies per section, see below) | 900 | 0.80–0.84 | -0.05 to -0.055em |
| Project H3 | `clamp(28px, 3.6vw, 56px)` | 900 | 0.95 | -0.035em |
| Sub-project H3 | `clamp(22–24px, 2.4–2.8vw, 34–42px)` | 900 | 0.98–1 | -0.03 to -0.035em |
| Lead statement | `clamp(19–21px, 2.1–2.5vw, 32–40px)` | 700 | 1.22–1.26 | -0.02 to -0.025em |
| Popup H3 | `clamp(30px, 4.4vw, 54px)` | 900 | 0.94 | -0.04em |
| Popup H4 | `20px` | 900 | — | -0.02em |
| Body | `15px` | 400 | 1.6–1.68 | — |
| Meta / eyebrow | `10–12px` mono | 400 | — | 0.14–0.24em |

Body copy is capped at `max-width: 40–66ch` depending on column; long-form popup prose is
`66ch`.

Per-section H2 sizes: Technical `clamp(54px,11vw,190px)`; Film & Photo
`clamp(52px,12vw,210px)`; Drums `clamp(56px,13vw,220px)`; Writing `clamp(48px,9vw,150px)`;
Work Experience `clamp(42px,8.2vw,136px)`; This Term `clamp(46px,8vw,130px)`.

### Spacing & layout

- Every section is a 12-column grid, `gap: 22px`.
- Section padding: `clamp(72px, 11vw, 150px)` top/bottom, **`78px` right, `24px` left**.
  The asymmetry is intentional — the right padding clears the fixed index rail.
- Media grids use `gap: 14–16px`.
- Content is **not** centred in a max-width container. The grid spans the full viewport
  width; sections instead create rhythm by starting at different columns (`1/9`, `2/7`,
  `3/13`). Preserve those offsets — they are the layout's signature.

### Radii, borders, shadows

- Radii are near-zero. Images `2px` or none. The only pill is the "FULL DETAIL" button
  (`border-radius: 999px`) and the popup close button (circle, 46px).
- Borders are `1px` hairlines: `#211F1B` on dark, `rgba(10,10,10,0.16)` on cream,
  `2px solid #0A0A0A` on the teal and yellow blocks.
- One shadow only: the popup sheet, `0 40px 120px rgba(0,0,0,0.6)`.

### Motion

| Name | Value |
|---|---|
| Cinematic ease | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Reveal duration | `1100ms` |
| Popup transition | `320ms` |
| Rail label expand | `420ms` (max-width) / `260ms` (opacity) |
| Rail dot width | `500ms` |
| Row hover tint | `320ms` |

No bounce, no spring, no scale-on-hover anywhere.

---

## Global chrome (fixed, present on every section)

### 1. Mark — top-left

`position: fixed; top: 22px; left: 24px; z-index: 80; mix-blend-mode: difference;`
"SF" in Archivo 900, 20px, `-0.03em`; beneath it "EST. 2008" in Space Mono 9px,
`letter-spacing: 0.22em`, `margin-top: 5px`. Colour `#FFFFFF` — difference blending makes it
legible over every block colour. Not a link.

### 2. Index rail — right edge

`position: fixed; right: 20px; top: 50%; translateY(-50%); z-index: 80;`
`mix-blend-mode: difference;` flex column, `gap: 13px`, items right-aligned,
`padding: 10px 0 10px 34px` (the left padding widens the hover target).

Nine anchors, one per section, each `<a href="#sec-N">` containing a label span then a dash
span:

| # | href | Label |
|---|---|---|
| 0 | `#sec-0` | HELLO |
| 1 | `#sec-1` | HABIT OF MIND |
| 2 | `#sec-2` | TECHNICAL |
| 3 | `#sec-3` | CAMERA |
| 4 | `#sec-4` | MUSIC |
| 5 | `#sec-5` | WORDS |
| 6 | `#sec-6` | WORK EXPERIENCE |
| 7 | `#sec-7` | RIGHT NOW |
| 8 | `#sec-8` | SAY HELLO |

Behaviour:

- Labels are collapsed by default (`max-width: 0; opacity: 0; overflow: hidden;
  white-space: nowrap`). On `mouseenter` **or `focusin` on the rail as a whole**, every
  label expands to `max-width: 220px; opacity: 1`. On `mouseleave`/`focusout` they all
  collapse. Note it is a single group hover, not per-item.
- Dash is `22px × 2px` white. The **active** section's dash animates to `44px` and its
  anchor to `opacity: 1`; inactive are `18px` at `opacity: 0.4`.
- Active section = the last section whose `getBoundingClientRect().top <= viewportHeight * 0.42`.
- Clicking scrolls — the reference relies on `html { scroll-behavior: smooth }` plus the
  anchor. Keep that; do not hand-roll scroll animation.

### 3. Progress readout — bottom-left

`position: fixed; bottom: 22px; left: 24px; z-index: 80; mix-blend-mode: difference;`
Space Mono 10px, `letter-spacing: 0.18em`, flex row `gap: 10px`, three parts:

1. Zero-padded section index, e.g. `03`.
2. An `84px × 2px` track, `rgba(255,255,255,0.28)`, containing a white fill bar whose width
   is `scrollY / (scrollHeight - innerHeight) * 100%` — whole-document progress, not
   section progress.
3. The active section's label (same strings as the rail).

### 4. Inverting cursor

Desktop only (`matchMedia('(pointer: fine)')`), disabled under `prefers-reduced-motion`.

A fixed full-viewport `pointer-events: none` layer at `z-index: 90` holds one circle,
default `180px` diameter, centred on the pointer via negative margins, styled only with
`backdrop-filter: invert(1)`. It follows the pointer with **no lag** (`lag: 1`) inside a
`requestAnimationFrame` loop, positioned with `translate3d`. Starts off-screen at
`(-400, -400)` until the first `pointermove`.

There is no trail and no distortion — earlier smear/lens versions were explicitly removed.
Keep it exactly this simple.

Browser note: `backdrop-filter: invert(1)` needs the `-webkit-` prefix for Safari and will
no-op on browsers without backdrop-filter support. That degradation is acceptable.

---

## Sections

All nine are direct children of one scrolling root. `id="sec-N"` on each is required by the
rail anchors.

### §00 Hero — `#sec-0`

Background `#0A0A0A`. `min-height: 100svh`, `padding: 96px 78px 60px 24px`, 12-col grid
with `grid-template-rows: auto 1fr auto`, `gap: 18px`, `align-items: start`.

- **Row 1 left** (cols 1–6): mono 11px `#8C877D`, `letter-spacing: 0.2em` —
  `TEDDINGTON · LONDON` / `A‑LEVELS 2026–28`.
- **Row 1 right** (cols 7–13, `padding-right: 165px` to clear the rail): Inter 15px
  `#E7DFCE`, line-height 1.55 — "Engineering, code and computing on one side. Film,
  photography and music on the other. Both hands, always."
- **Row 2** (full width, `align-self: center`): the name, two stacked lines.
  - `SAMUEL` — Archivo 900, solid `#F6F1E7`, left-aligned, `z-index: 3`.
  - `FIELD` — same size, **`color: #0A0A0A` with `-webkit-text-stroke: 2px #F6F1E7`**
    (outlined, not filled), `text-align: right; padding-right: 4%`.
  - Behind them (`z-index: 1`), an image at `right: 5%; bottom: -42%`,
    `width: clamp(150px, 22vw, 300px)`, `aspect-ratio: 3/2`, `rotate(-3deg)`.
- **Row 3**: left, a `↓` glyph bobbing (`sf-bob`, 2.2s, ±10px) + `KEEP GOING`; right,
  `9 SECTIONS · ONE PERSON` in teal `#16C7C0`, both mono 11px `0.2em`.

**Hero motion.** As the page scrolls, `SAMUEL` translates **right** and `FIELD` translates
**left** — opposite directions, reversing on scroll-up. Implemented as
`translate3d(min(scrollY, vh*1.35) * k, 0, 0)` with `k = +0.34` for SAMUEL and `k = -0.34`
for FIELD, multiplied by the global motion amount. The background image uses the vertical
parallax below at `0.34`.

### Marquee A (between §00 and §01)

Full-bleed band, background `#FF5A2E`, ink `#0A0A0A`, `padding: 14px 0`, `overflow: hidden`,
`border-top: 1px solid #0A0A0A`. Inner flex row of `width: max-content` containing the same
span twice, animated `sf-marquee 34s linear infinite` (`translateX(0)` → `translateX(-50%)`).
Archivo 900, `clamp(20px, 3vw, 40px)`, `-0.03em`.

Content: `CAD / PYTHON / AUTOPILOT / PREMIERE PRO / AFTER EFFECTS / LIGHTROOM / GRADE 8
DRUMS / C1 ITALIANO / CONLANGS /` (double-spaced around each slash, `padding-right: 40px`
on each span).

### §01 Habit of mind — `#sec-1`

Background `#F6F1E7`, ink `#0A0A0A`. 12-col grid.

- Cols 1–3: a giant `01` in Archivo 900 `clamp(56px,9vw,130px)` in `#FF5A2E`, and below it
  `ONE HABIT OF MIND` in mono 10px set **vertically** (`writing-mode: vertical-rl;
  text-orientation: mixed`).
- Cols 4–12: the lead paragraph, Archivo **700** `clamp(21px,2.5vw,40px)`, line-height 1.22,
  `text-wrap: pretty`. Reveals on scroll.
- Cols 4–8 beneath: three mono 11px credentials in a wrapping flex row, `gap: 26px`,
  `#46433D` — `HAMPTON SCHOOL, LONDON`, `STEM FAIR CATEGORY WINNER, 2026`,
  `HEADMASTER'S AWARD`.
- Cols 9–13: a `4/5` image, `rotate(2deg)`, parallax `0.1`, with a right-aligned mono
  caption `SHOT ON A HILL IN TUSCANY`.

### §02 Technical — `#sec-2`

Background `#0A0A0A`. Header row: eyebrow `02 — THINGS THAT HAD TO WORK` in `#FF5A2E`,
H2 `TECHNICAL` (cols 1–9, slide-in 220px), and a `#8C877D` 14px note in cols 10–13:
"Built, not just designed. Every one of these had a moment where it did not work and I had
to find out why."

Then four project entries, each a 12-col row with `border-top: 1px solid #211F1B` and
`padding: 34px 0`, each revealing on scroll. The column offsets differ per row on purpose:

1. **AI seed-dropping plane** — index `/01` in flame at col 1; text cols 2–7; media cols
   8–13 (a `16/10` hero slot with parallax `0.06`, then a 2-up of a `1/1` slot and a mono
   stat block reading `2026 / SCHOOL STEM FAIR / CATEGORY WINNER`, the last line in
   `#E4FF3B`). Tags: CAD (accent variant), Autopilot, Computer vision, Mechanism design.
2. **Lexitecht** — indented one column: index `/02` in **teal** at col 2, text cols 3–8,
   media cols 9–13. The whole row carries
   `background: linear-gradient(90deg, rgba(22,199,192,0.07), transparent 60%)`.
   Tags: App design, Data modelling, Linguistics. Media: `4/3` slot, parallax `-0.05`,
   plus a right-aligned `IN PROGRESS`.
3. **Pudding Trolley** (cols 2–6) and **Leuiraciu** (cols 7–11) share one row, with a
   right-aligned `/04` in col 11–13. Tags: Electronics/Fabrication and Phonology/Grammar.
4. A closing media grid: `repeat(3, 1fr)`, `gap: 16px`, `margin-top: 40px`, top border and
   `padding-top: 34px`. Three `3/2` slots (the middle one offset `translateY(28px)`), then
   a `21/9` video slot spanning columns 1–3 and a `3/2` video slot.

### §03 Film & Photo — `#sec-3`

Background `#16C7C0` teal, ink `#0A0A0A`, `overflow: hidden`.

Header starts at **column 3** (not 1): eyebrow `03 — BEHIND A CAMERA SINCE I COULD HOLD ONE`,
H2 `FILM &` / `PHOTO` on two lines, slide-in 260px.

Then a three-part collage row: a `3/4` image at cols 1–5 rotated `-2deg` (parallax `0.12`);
the lead statement at cols 6–12 (Archivo 700, `clamp(19px,2.1vw,32px)`); a `16/9` image at
cols 8–13 rotated `1.5deg` (parallax `-0.08`), overlapping the text column.

Then five project blocks, each with `border-top: 2px solid #0A0A0A` and `padding-top: 18px`,
at staggered column spans — 1–7, 8–13, 2–6, 7–10, 11–13:

| Block | Meta line | Title |
|---|---|---|
| St John's | `2025 — PRESENT · ST JOHN'S HAMPTON WICK` | Thirty‑odd films for one church |
| Imm-Aroy | `2025 · CHINATOWN, LONDON` | Imm‑Aroy |
| RED-d | `2026 · RUNNER` | RED‑d awareness shoot |
| Red Robin / Chanctonbury | `2023 & 2022` | Red Robin Art Studio / Chanctonbury Church |
| Unsplash | — | `4M+` in Archivo 900 `clamp(34px,4vw,62px)`, then `VIEWS ON UNSPLASH`, then `+ DRONE WORK FOR CLIENT SITES` at `opacity: 0.7` |

Then a 3-up of `16/9` video slots (Rise and Reflect `07 PARTS`, Red Robin promo `01:30`,
Drone work `REEL`), then a 12-col mixed media grid: `4/5` at 1–5, `1/1` at 5–9
(`align-self: end`), `4/5` at 9–13, `21/9` at 1–8, `16/9` at 8–13.

### Marquee B (between §03 and §04)

Background `#0A0A0A`, text `#16C7C0`, `padding: 12px 0`, mono 12px `letter-spacing: 0.22em`,
animation `sf-marquee-rev 28s linear infinite` — **scrolls the opposite way** to marquee A.
Content: `PREMIERE PRO · AFTER EFFECTS · PHOTOSHOP · LIGHTROOM · DRONE · COLOUR GRADE ·
SHOT PLANNING ·`.

### §04 Drums — `#sec-4`

Background `#E4FF3B` acid yellow, ink `#0A0A0A`, `align-items: center`.

Cols 1–8: eyebrow `04 — SINCE BEFORE THE PANDEMIC`, H2 `DRUMS` (slide-in 200px), lead
paragraph (Archivo 700, `max-width: 30ch`), FULL DETAIL button.

Cols 9–13: four spec rows, each `border-top: 2px solid #0A0A0A`, `padding-top: 12px`,
`justify-content: space-between`, mono 12px — DRUMS/GRADE 8, PIANO/GRADE 4, CHURCH
BAND/SINCE 2021, ROCK CONCERT/2026. Below them a `1/1` image at 78% width, `rotate(3deg)`,
`align-self: flex-end`, parallax `0.14`.

Full width beneath: 3-up media, two `16/9` images (second offset `translateY(24px)`) and one
`16/9` video slot (`03:12`).

### §05 Writing — `#sec-5`

Background `#0A0A0A`. Content starts at **column 2**.

- Cols 2–7: eyebrow `05 — WORDS, AND THE LANGUAGES THEY SIT IN` in flame; H2 `WRITING`
  rendered **outlined** (`color: #0A0A0A; -webkit-text-stroke: 2px #F6F1E7`), slide-in 200px.
- Cols 8–13 (`align-self: end`): teal `NATIONAL SHORTLIST` label, H3 "Florentine Skies",
  body, teal FULL DETAIL button.
- Cols 2–8: "Christian Youth Journals, from scratch" with `2023–24 · DESIGN, PRINT, SALE`.
- Cols 9–13: a `LANGUAGES` list — Italian C1, French B2 · DELF, Latin GCSE *Grade 9, a year
  early*, Italian GCSE *Grade 9, a year early*, Classical Greek *Predicted 9*. Left side
  Archivo 700 19px; right side flame for levels, `#E4FF3B` for the two Grade 9s, `#8C877D`
  for the prediction.
- Cols 2–13: media row `1.4fr 1fr 1fr` — `3/2`, `3/4`, `1/1` (last `align-self: end`).

### §06 Work experience — `#sec-6`

Background `#F6F1E7`, ink `#0A0A0A`. **This section was redesigned most recently — build it
as specified here, it is the current version.**

Header: 12-col, `align-items: end`. Cols 1–10 carry eyebrow
`06 — WHAT I'VE ACTUALLY DONE, IN ORDER` in `#C23F18` and H2 `WORK` / `EXPERIENCE` on two
lines (slide-in 180px). Cols 10–13 carry a right-aligned mono readout
`NINE ENTRIES` / `2021 → 2028`, `line-height: 1.9`, `#7C776D`.

Below, a ledger: a flex column with `border-bottom: 1px solid rgba(10,10,10,0.16)`, and each
row `border-top` the same. Row grid is **`112px minmax(0,7fr) minmax(0,5fr)`**, `gap: 22px`,
`align-items: start`, padding `clamp(22px,2.6vw,34px) 14px clamp(22px,2.6vw,34px) 6px`.
Row hover tints the background to `rgba(10,10,10,0.045)` over 320ms. Each row reveals.

Columns: year (mono 12px `#C23F18`, `padding-top: 5px`); title (Archivo **800**
`clamp(19px,2.05vw,29px)`, line-height 1.06, `-0.032em`) with an uppercase mono 10px org
line beneath in `#56524A`; note paragraph (Inter 15px `#55514A`, `max-width: 44ch`).

Nine rows, in this order:

| Year | Title | Org | Note |
|---|---|---|---|
| 2026–28 | A‑Levels begin: Maths, Physics, Computer Science, French DELF | Hampton School, London | Four subjects chosen to keep both hands busy. |
| 2026 | Runner on the RED‑d awareness film shoot | Professional shoot, London | Rigging, prep, and some filming on a shoot about how freelance dancers are treated. |
| 2026 | STEM fair category win with the AI seed‑dropping plane | School STEM fair, third consecutive year | Dispenser design, mechanism and code, project management, auto‑stabilisation. |
| 2025– | Photography and film for St John's Hampton Wick and Imm‑Aroy | Freelance | Youth films, Love Local, Focus camp, Rise and Reflect, sermon clips, restaurant menu photography. |
| 2025 | Headmaster's award for Leuiraciu, a constructed language | School project, joint award with three others | A fully comprehensive language: sounds, grammar and lexicon. |
| 2024–25 | Grade 9 in Latin and Italian GCSE, a year early | Hampton School | Classical Greek GCSE predicted a 9. C1 Italian, B2 French. |
| 2023–24 | Christian Youth Journals designed, sold and distributed | Church youth group | From vision and planning to design, sale and distribution. |
| 2022–23 | Promotional films for Red Robin Art Studio and Chanctonbury Church | London and West Sussex | My first paid and commissioned film work. |
| 2021 | Started drumming for the local church | Every few Sundays since | Began before the pandemic; Grade 8 now. |

Drive these from `content/workExperience.ts`, not hand-written JSX.

### §07 This term — `#sec-7`

Background `#FF5A2E`, ink `#0A0A0A`.

Cols 1–5: eyebrow with a leading `8px` black dot that blinks (`sf-blink`, 1.6s,
`steps(1)`, 100%→15% opacity) then `07 — RIGHT NOW`; H2 `THIS` / `TERM` (slide-in 160px).

Cols 6–13: a 2×2 grid, `gap: 30px 26px`, each cell an Archivo 900 24px title plus a 15px
paragraph — Starting A‑Levels / Filming for St John's / Building Lexitecht / Open to
freelance.

Full width: four `1/1` image slots, `gap: 14px`, captioned
`FOUR SLOTS · RECENT FRAMES, UPDATED EACH TERM`.

### §08 Say hello — `#sec-8`

Background `#0A0A0A`, `min-height: 92svh`, flex column, `justify-content: space-between`,
`gap: 60px`, `padding: clamp(80px,12vw,170px) 78px 60px 24px`.

- Cols 1–10: teal eyebrow `08 — SAY HELLO`; then the email as a giant link,
  `mailto:hello@samfield.co`, Archivo 900 `clamp(34px,7.4vw,130px)`, two lines
  (`hello@` / `samfield.co`), `word-break: break-word`, `#F6F1E7` → `#FF5A2E` on hover.
- Cols 10–13, bottom-aligned: `+44 7460 102 466` (`tel:`), `samfield.co`, `TEDDINGTON, TW11`.
- A 5-up strip of `4/3` image slots.
- Footer bar, `border-top: 1px solid #211F1B`, `padding-top: 26px`: two buttons — primary
  "Download the CV" with trailing arrow linking `assets/Samuel-Field-CV.pdf`, secondary
  "Email me" — and right-aligned `#46433D` mono text
  `MUCH MORE DETAIL IS AVAILABLE ON REQUEST` / `SAMUEL FIELD · 2026`.

---

## Shared UI components

### Tag

From the design system (`Tag`): mono pill, small, `border-radius: pill`. `variant="accent"`
for the first tag in a group, default otherwise. Rendered in flex rows, `gap: 8px`, wrapping.

### Button

From the design system (`Button`): `variant` primary/secondary, `size="lg"`,
`icon="arrow"` for a trailing arrow that nudges 3px right on hover. Used only in the footer.

### DetailButton ("FULL DETAIL")

The site's own control, not from the design system. Inline-flex, `gap: 10px`, a `+` glyph at
15px then the label; mono 10px `letter-spacing: 0.18em`; `padding: 10px 15px`;
`border-radius: 999px`; transparent background with a `1px` border.

Its colour follows the block it sits on:

| Context | Border/text | Hover fill → text |
|---|---|---|
| Dark, technical | `#FF5A2E` | `#FF5A2E` → `#0A0A0A` |
| Dark, Lexitecht / Florentine | `#16C7C0` | `#16C7C0` → `#0A0A0A` |
| Teal block | `#0A0A0A` | `#0A0A0A` → `#16C7C0` |
| Yellow block | `#0A0A0A` | `#0A0A0A` → `#E4FF3B` |

### MediaSlot / VideoSlot

Every image on the site is one of these, and each carries a mono 10px caption
(`letter-spacing: 0.16em`, `margin-top: 9px`) in `#8C877D` on dark or inherited ink on
colour blocks.

- **MediaSlot**: `aspect-ratio` prop, `overflow: hidden`, background `#161513`, image
  `width/height 100%; object-fit: cover; display: block`.
- **VideoSlot**: same, plus the image at `opacity: 0.4–0.45`, centred over it a circle
  (`54–62px`, `border: 1px solid rgba(246,241,231,0.75)`, `border-radius: 50%`) containing a
  `▶` glyph in `#F6F1E7`, and optionally a duration/label pinned `bottom: 10px; right: 12px`
  in mono 10px.

Caption text is meaningful — it names what should eventually fill the slot. Keep the strings.

---

## The detail overlay

One overlay serves all projects; only one panel is visible at a time.

### Structure

```
overlay (fixed, inset 0, z-index 200, display:flex, centred,
         padding: clamp(0px, calc((100vw - 720px) * 1000), 40px))
├── scrim   (absolute inset 0, rgba(10,10,10,0.62), backdrop-filter: blur(3px))
└── sheet   (relative, width: min(940px, 100vw), max-height: 100svh,
             min-height: clamp(0px, calc((720px - 100vw) * 1000), 100svh),
             overflow-y: auto, bg #0A0A0A, border 1px #211F1B,
             box-shadow 0 40px 120px rgba(0,0,0,0.6))
    ├── close button (sticky, float right, 46px circle)
    └── panel body (padding: clamp(28px, 4vw, 54px))
```

Those two `clamp(..., calc((X - 100vw) * 1000), ...)` expressions are a container-query-free
trick that switches behaviour at a 720px breakpoint: **below 720px the sheet is full-screen
with no padding; at 720px and above it floats as a centred card with 40px of breathing room
and the coloured section still visible behind the blurred scrim.** In React you may replace
them with a plain media query — the behaviour is what matters.

### Behaviour

- Opening: set the matching panel to `display: block` and all others to `none`, show the
  overlay, reset `sheet.scrollTop = 0`, set `document.body.style.overflow = 'hidden'`, then
  on the next animation frame transition the sheet from `opacity: 0; translateY(22px)
  scale(0.985)` to `opacity: 1; translateY(0) scale(1)` over 320ms with the cinematic ease.
- Focus moves to the close button on open.
- Closing: reverse the transition, restore body overflow, and hide the overlay after 260ms.
- Closes on: the X button, a click on the scrim, or **Escape**.
- The reference uses one delegated click handler on the root looking for `[data-open]` and
  `[data-close]`. In React this becomes `openProject(id)` / `closeProject()` — the only real
  application state in the whole site.

Accessibility gaps to fix in the rebuild: the overlay has no `role="dialog"`,
`aria-modal="true"`, labelled title, or focus trap. Add them.

### Panel anatomy

Every panel follows the same template:

1. Mono 10px eyebrow, `letter-spacing: 0.2em`, in the panel's accent colour —
   `#FF5A2E` for technical, `#16C7C0` for film/photo/writing.
2. H3, Archivo 900 `clamp(30px, 4.4vw, 54px)`.
3. A **fact strip**: `grid-template-columns: repeat(auto-fit, minmax(130px, 1fr))`,
   `gap: 18px`, `padding: 18px 0`, hairline border top and bottom. Each cell is a mono 10px
   `#8C877D` label with the value below it in `#F6F1E7` (`margin-top: 7px`,
   `letter-spacing: 0.1em`). Outcome/award values are `#E4FF3B`.
4. Alternating H4 (Archivo 900 20px, `margin: 30px 0 10px`) and body paragraphs
   (15px/1.68, `#E7DFCE`, `max-width: 66ch`). Some panels use `<ul>` at `padding-left: 20px`.
5. Occasionally a pull-quote: Archivo 700 19px in `#FF5A2E`, `max-width: 40ch`; or a note
   set in mono 11px `#8C877D` with `border-left: 1px solid #211F1B; padding-left: 12px`.
6. A media grid at the end — 2-up, 3-up or 4-up depending on the panel.

### Panels

Eleven keys: `plane`, `lexitecht`, `pudding`, `leuiraciu`, `stjohns`, `immaroy`, `redd`,
`redrobin`, `unsplash`, `drums`, `florentine`, `journals`.

The prose is long — several hundred words each for `plane`, `lexitecht`, `pudding`,
`leuiraciu` and `unsplash` — and it is **Sam's own writing, transcribed verbatim from his
work-content document. Do not rewrite, paraphrase, tighten or "improve" any of it.** Copy
the exact strings out of the reference HTML into `content/projects.ts`, preserving the
typographic characters already in place: curly quotes (`’`), en/em dashes (`–` `—`),
non-breaking hyphens (`‑`, U+2011, used in "seed‑dropping", "A‑Levels", "Imm‑Aroy" etc. to
prevent bad line breaks), and accented forms (`Leúraciu`, `Okraän`).

Two known content inconsistencies in the source, flagged rather than silently fixed —
**ask Sam before changing either**:

- The language is spelled `Leuiraciu`, `Leúraciu`, `Leuiráciu` and `Leúiraciu` in different
  places.
- The Unsplash view count is `4M+` in the section headline but `3.6M` in the panel fact
  strip and body.

One `<a href="#">` placeholder exists in the `lexitecht` panel ("You can see the app on
GitHub") — needs a real URL. The `leuiraciu` panel references a downloadable font that has
no file yet.

---

## Interactions & behaviour

### Reveal on scroll

Elements marked for reveal start at `opacity: 0; transform: translateY(46px)`. An
`IntersectionObserver` (`rootMargin: '0px 0px -12% 0px'`, `threshold: 0.08`) transitions them
to `opacity: 1; translateY(0)` over `1100ms` with `cubic-bezier(0.16,1,0.3,1)`, then
unobserves. Elements entering in the same observer callback are staggered by `i * 90ms`.

A `4000ms` safety timeout force-shows everything, so content can never be stranded invisible
if the observer misfires. **Keep this failsafe** — it matters more in a rebuild than it looks.

### Parallax (vertical) — `data-par`

For each element: `offset = clamp(-110, -(elementCentre - viewportCentre) * k, 110)`, applied
as `translate3d(0, offset, 0)` and **composed with any base transform the element already
has** (several parallax elements are also rotated — the rotation must survive). Coefficients
used: `0.34`, `0.14`, `0.12`, `0.1`, `0.06`, `-0.05`, `-0.08`.

The reference tracks the previously applied offset in a data attribute so the measurement
doesn't compound frame to frame. In React, measure from an untransformed wrapper instead and
translate an inner element — cleaner and less fragile.

### Horizontal hero drift — `data-parx`

Only the two hero name lines. `translate3d(min(scrollY, vh * 1.35) * k, 0, 0)`,
`k = ±0.34`. Purely scroll-linked, so scrolling up reverses it exactly.

### Section-header slide-in — `data-slidex`

Section H2s enter **from the left**. Progress `p = clamp(0, (vh - rect.top) / (vh * 0.62), 1)`,
eased `1 - (1 - p)³`, then `translateX(-distance * (1 - eased))` and
`opacity = 0.25 + 0.75 * eased`. Distance per section: Technical 220, Film & Photo 260,
Drums 200, Writing 200, Work Experience 180, This Term 160.

### Performance note

All of the above runs in **one** `scroll` listener registered `{ passive: true }`, plus the
same function on `resize`, and called once on mount. Do not give each animated element its
own listener. In React, one `useScrollMotion` hook holding a ref array and a
`requestAnimationFrame`-throttled handler is the right shape.

### Reduced motion

If `prefers-reduced-motion: reduce`, the motion amount is set to `0`, which: shows all
reveals immediately, skips all parallax and slide-in maths, and suppresses the custom
cursor. The marquees and the blinking dot are pure CSS animations and are **not** currently
disabled — they should be, in the rebuild.

### Responsive

The reference is desktop-first and largely unaddressed below ~900px: the 12-column offsets
and `78px` right padding hold at all widths, which will be cramped on a phone. Only the
overlay has genuine mobile behaviour (the 720px full-screen switch).

**This is the main gap the rebuild should close.** Suggested approach, to confirm with Sam:

- Below ~900px, collapse every 12-col grid to a single column in source order and drop the
  deliberate offsets; reduce section padding to roughly `56px 20px`.
- Below ~900px, hide the index rail (or move it to a horizontal dot row at the bottom) and
  reduce the right padding to match the left.
- Suppress the custom cursor on touch (already handled by the `pointer: fine` check).
- Keep the marquees — they work well narrow.
- Work experience rows: stack year → title → note.

---

## State management

Minimal. No router, no data fetching, no forms, no backend.

| State | Type | Owner | Trigger |
|---|---|---|---|
| `openProject` | `ProjectKey \| null` | App root | FULL DETAIL click; cleared by X / scrim / Escape |
| `activeSection` | `number` (0–8) | scroll hook | scroll position vs `vh * 0.42` |
| `scrollProgress` | `number` (0–1) | scroll hook | scroll |
| `railExpanded` | `boolean` | IndexRail | pointer/focus enter & leave |
| `prefersReducedMotion` | `boolean` | media query | OS setting |

Body scroll lock while a panel is open. Content (projects, work experience) is static
TypeScript data, not state.

---

## Assets

In `assets/`:

- `Samuel-Field-CV.pdf` — real, linked from the footer button.
- `auracat.jpg`, `castlemotif.jpg`, `lampmoon.jpg`, `torre.jpg`, `wideisa.jpg` — **five
  placeholder photographs**, reused dozens of times across the site. They are Sam's own
  photos but are standing in for project imagery he hasn't supplied yet.

Every slot's caption says what belongs there. Real media still needed: the plane in flight,
the seed dispenser CAD, Pudding Trolley chassis and wiring bench, Leuiraciu script sheet,
Lexitecht UI, Imm-Aroy plated dishes, Rise and Reflect frames, RED-d behind-camera, drone
passes, Chanctonbury Mission Day, kit at the Rock Concert, Florentine Skies spread, youth
journal cover, Lion Print page. Video slots need real files or embeds.

Build the media components so swapping a placeholder for a real file, or a poster for an
embedded player, is a one-line data change.

Fonts are in `design-system/fonts/` — copy to `public/fonts/` and adjust the `src:` URLs in
`fonts.css`. Ship only Archivo 700/900, Inter 400/500/600 and Space Mono 400.

---

## Files in this bundle

```
README.md                          this document
PROMPT.md                          a ready-to-paste prompt for Claude Code
design-reference/
  Samuel Field.dc.html             the design prototype — open in a browser to view
  support.js                       runtime the prototype needs to render; do not port it
assets/                            images + CV (placeholders, see Assets)
design-system/
  design-system-guide.md           the brand's own written guide — voice, tone, visual rules
  styles.css                       design-system root stylesheet
  tokens/                          colors, typography, spacing, effects, fonts (copy these)
  fonts/                           self-hosted woff2 files
```

`design-reference/Samuel Field.dc.html` must sit next to `support.js` and have `assets/` and
the design-system folder resolvable to render fully. Viewing it is recommended but not
required — this README is written to be sufficient on its own.
