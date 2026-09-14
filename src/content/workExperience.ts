/**
 * The work-experience ledger in §06 — newest first, exactly as written.
 *
 * Nine entries, 2021 → 2028. Copy is verbatim from the design reference,
 * including the non-breaking hyphens (U+2011) in "A‑Levels", "RED‑d",
 * "seed‑dropping" and "auto‑stabilisation".
 */

export interface WorkExperienceRow {
  /** Mono year or range shown in the first column. */
  year: string;
  title: string;
  /** Uppercased beneath the title. */
  org: string;
  note: string;
}

export const workExperience: WorkExperienceRow[] = [
  {
    year: "2026–28",
    title: "A‑Levels begin: Maths, Physics, Computer Science, French DELF",
    org: "Hampton School, London",
    note: "Four subjects chosen to keep both hands busy.",
  },
  {
    year: "2026",
    title: "Runner on the RED‑d awareness film shoot",
    org: "Professional shoot, London",
    note: "Rigging, prep, and some filming on a shoot about how freelance dancers are treated.",
  },
  {
    year: "2026",
    title: "STEM fair category win with the AI seed‑dropping plane",
    org: "School STEM fair, third consecutive year",
    note: "Dispenser design, mechanism and code, project management, auto‑stabilisation.",
  },
  {
    year: "2025–",
    title: "Photography and film for St John’s Hampton Wick and Imm‑Aroy",
    org: "Freelance",
    note: "Youth films, Love Local, Focus camp, Rise and Reflect, sermon clips, restaurant menu photography.",
  },
  {
    year: "2025",
    title: "Headmaster’s award for Leuiráciu, a constructed language",
    org: "School project, joint award with three others",
    note: "A fully comprehensive language: sounds, grammar and lexicon.",
  },
  {
    year: "2024–25",
    title: "Grade 9 in Latin and Italian GCSE, a year early",
    org: "Hampton School",
    note: "Classical Greek GCSE predicted a 9. C1 Italian, B2 French.",
  },
  {
    year: "2023–24",
    title: "Christian Youth Journals designed, sold and distributed",
    org: "Church youth group",
    note: "From vision and planning to design, sale and distribution.",
  },
  {
    year: "2022–23",
    title: "Promotional films for Red Robin Art Studio and Chanctonbury Church",
    org: "London and West Sussex",
    note: "My first paid and commissioned film work.",
  },
  {
    year: "2021",
    title: "Started drumming for the local church",
    org: "Every few Sundays since",
    note: "Began before the pandemic; Grade 8 now.",
  },
];

/** Readout in the section header. */
export const workExperienceMeta = {
  count: 'NINE ENTRIES',
  span: '2021 → 2028',
} as const;
