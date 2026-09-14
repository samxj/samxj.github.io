# To do

Open items on the site. Grouped roughly by how much they block launch.

## Broken or missing links

- [ ] **Lexitecht GitHub link goes nowhere.** The panel ends "You can see the app on
      GitHub" with `href: "#"`. Needs the real repo URL.
      → `src/content/projects.ts`, the `lexitecht` panel, last paragraph.
- [ ] **Leuiráciu font has no file and no link.** The panel note says "You can download the
      font below", but there is no font file in the repo and nothing to click. Either add
      the Illustrator font as a download or reword the note.
      → `src/content/projects.ts`, the `leuiraciu` panel, the closing note.
- [ ] **Leuiráciu textbook is referenced but not linked.** "I can't explain it here, so
      please read the textbook to find out!" — the 35-page textbook needs to be uploaded to
      `public/` and linked.
      → `src/content/projects.ts`, the `leuiraciu` panel, "Leuiráciu itself".
- [ ] **The Okraän files are served but nothing points at them.** `Okraan.odt`,
      `Okraan.ods` and `Okraan Dict.ods` are back in `public/` and reachable at
      `/Okraan.odt` etc., but no link on the site reaches them. The natural home is the
      Leuiráciu panel, which describes exactly these two spreadsheets ("one being the
      language's dictionary, but the other, larger... containing the language's entire
      grammar structure"). Decide whether to link them there.

## Copy still to write

- [ ] **RED‑d panel is a stub.** It carries the placeholder line "ROOM FOR MORE HERE — WHO
      RAN IT, WHAT YOU TOOK AWAY" and repeats the section blurb. Needs a real write-up.
      → `src/content/projects.ts`, the `redd` panel.
- [ ] **Drums panel is a stub.** Same shape: "ROOM FOR MORE HERE — SET LIST, KIT, WHO YOU
      PLAY WITH".
      → `src/content/projects.ts`, the `drums` panel.

## Media

Every image on the site is one of five placeholder photographs, repeated. Each slot's mono
caption names what belongs there — those captions are the shot list. Swapping one in is a
one-line `src` change in the content data or the section component.

- [ ] Stills: the plane in flight · seed dispenser CAD · Pudding Trolley chassis · wiring
      bench · Leuiráciu script sheet · Lexitecht UI · Imm‑Aroy plated dishes · Rise and
      Reflect frames · RED‑d behind camera · drone passes · Chanctonbury Mission Day · kit
      at the Rock Concert · Florentine Skies spread · youth journal cover · Lion Print page
      · four recent frames for "This term" · five for the contact strip.
- [ ] **Video slots have no player.** They are static posters with a play glyph and a
      duration. Each needs a real file or an embed: plane test flight (00:45), dispenser
      bench test, Rise and Reflect (07 parts), Red Robin promo (01:30), drone reel, Rock
      Concert set (03:12), plus the posters inside the panels.
      → `src/components/ui/VideoSlot.tsx` is where the player would go.

## Polish

- [ ] **No home-screen icon.** The favicon itself is done — `public/favicon.ico`, the SF
      mark in black on flame, at 16/32/48px — but iOS ignores `.ico` for "Add to Home
      Screen" and wants a 180×180 PNG via `apple-touch-icon`. Export one from the same
      artwork if that matters.
- [ ] **No social preview image.** `index.html` has a description but no `og:image` /
      `twitter:card`, so links to the site unfurl bare. The same artwork scaled up, or a
      hero screenshot, would do.
- [ ] **Archivo 800 isn't shipped.** The work-experience row titles ask for weight 800 but
      only 700 and 900 are self-hosted, so the browser synthesises it. Either add
      `archivo-800.woff2` to `public/fonts/` and `src/styles/fonts.css`, or change the rule
      to 900. (The design prototype had the same gap.)
      → `src/styles/sections.css`, `.work__title`.

## Housekeeping

- [ ] **Confirm the deploy target.** The repo is named `samxj.github.io`, which implies
      GitHub Pages serving from the repo root — but this is a Vite app whose build output
      (`dist/`) is gitignored, and `public/_redirects` is a Netlify file. One of these needs
      to change: either a Pages build action, or Netlify pointed at `npm run build` → `dist`.
- [ ] **The old Milestone Analyzer is offline.** `old/public/webapp/` was linked from the
      old site's footer as "Milestone Analyzer →". It isn't published any more. Bring it
      back into `public/webapp/` or let it go.
- [ ] **Decide how long `old/` stays.** The whole previous site is preserved there. Once
      nothing is needed from it, it can come out of the repo — the history keeps it anyway.
