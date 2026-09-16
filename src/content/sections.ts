/** The nine sections, in scroll order. These labels drive the rail and the readout. */
export const sectionIndex = [
  { id: 'sec-0', label: 'HELLO' },
  { id: 'sec-1', label: 'ABOUT ME' },
  { id: 'sec-2', label: 'TECHNICAL' },
  { id: 'sec-3', label: 'FILM & PHOTO' },
  { id: 'sec-4', label: 'MUSIC' },
  { id: 'sec-5', label: 'WRITING' },
  { id: 'sec-6', label: 'WORK & EDUCATION' },
  { id: 'sec-7', label: 'RIGHT NOW' },
  { id: 'sec-8', label: 'SAY HELLO' },
] as const;

export type SectionIndexEntry = (typeof sectionIndex)[number];
