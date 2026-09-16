/**
 * §06 Work and education — three ledgers.
 *
 * `education` is where I am right now, `gcses` is the results grid, and
 * `paidWork` is only work I was paid for. Everything else I've made lives in
 * the rest of the site. Newest first.
 */

export interface LedgerRow {
  /** Mono year or range shown in the first column. */
  year: string;
  title: string;
  /** Uppercased beneath the title. */
  org: string;
  note: string;
}

export interface GcseResult {
  subject: string;
  /** e.g. "9". */
  grade: string;
  /** Raw mark as a percentage, e.g. "94". Leave empty until known; it renders as a dash. */
  percent: string;
  /** Optional short tag, e.g. "A YEAR EARLY". */
  note?: string;
}

export const education: LedgerRow[] = [
  {
    year: "2026–28",
    title: "A‑Levels: Maths, Physics, French, Further Maths",
    org: "Hampton School, London",
    note: "My favourite subjects. French in there also to keep me linguistically sharp and communicate with clarity.",
  },
];

/** Sat 13, grade 9 in all. Fill in subjects and percentages as they come. */
export const gcses: GcseResult[] = [
  { subject: "Latin", grade: "9", percent: "93", note: "A YEAR EARLY" },
  { subject: "Italian", grade: "9", percent: "96", note: "A YEAR EARLY" },
  { subject: "Classical Greek", grade: "9", percent: "93" },
  { subject: "French", grade: "9", percent: "99" },
  { subject: "Maths", grade: "9", percent: "92" },
  { subject: "Further Maths", grade: "9", percent: "84" },
  { subject: "Religious Studies", grade: "9", percent: "87" },
  { subject: "Computer Science", grade: "9", percent: "87" },
  { subject: "Biology", grade: "9", percent: "91" },
  { subject: "Chemistry", grade: "9", percent: "90" },
  { subject: "Physics", grade: "9", percent: "85" },
  { subject: "English Language", grade: "9", percent: "78" },
  { subject: "English Literature", grade: "9", percent: "81" },
];

export const gcseMeta = {
  school: "Hampton School",
  span: "2023–26",
} as const;

export const paidWork: LedgerRow[] = [
  {
    year: "2025–now",
    title: "Videography and photography for St John’s Hampton Wick",
    org: "Freelance",
    note: "Youth films, Love Local, Focus camp, Rise and Reflect, sermon clips.",
  },
  {
    year: "2026",
    title: "RED-d Awareness Shoot",
    org: "Freelance",
    note: "Helping on a professional shoot on how freelance dancers are treated. Rigging lights and cameras, prepping drinks and meals, some filming.",
  },
  {
    year: "2025",
    title: "Photography for Imm-Aroy",
    org: "Freelance",
    note: "Menu and social media shoot for restaurant in Chinatown.",
  },
  {
    year: "2023",
    title: "Christian Youth Journals",
    org: "Freelance",
    note: "Christian journals for youth, designed and distributed from scratch.",
  },
  {
    year: "2022–23",
    title: "Promotional film for Red Robin Art Studio",
    org: "London",
    note: "My first paid and commissioned film work.",
  },
];
