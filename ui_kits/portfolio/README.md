# Portfolio UI kit

Sam Field's personal site: Home, About, Work, Resume, Contact — one click-through `index.html`.

Composes `components/core/*` (Button, Tag, SectionHeading, ProjectCard, ExperienceRow, Nav, Footer). No new visual patterns are invented here beyond what's in the tokens/components — this kit is the assembly, not a redesign.

`Home.jsx` / `About.jsx` / `Work.jsx` / `Resume.jsx` / `Contact.jsx` are real ES-module React source, meant to be copied into a codebase with a bundler. `index.html` is a self-contained browser demo of the same pages (no bundler available in-browser, so it composes them inline against the compiled design-system bundle rather than importing those files directly) — the reusable, editable version of this site lives in `templates/portfolio-site/`.

Work/Resume content is drawn directly from Sam's CV text (see root readme.md sources note). Photography is placeholder tiles throughout — swap in real images via `ProjectCard`'s `image` prop once supplied.
