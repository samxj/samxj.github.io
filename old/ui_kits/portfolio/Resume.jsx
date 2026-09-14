import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../../components/core/SectionHeading.jsx';
import { ExperienceRow } from '../../components/core/ExperienceRow.jsx';
import { Button } from '../../components/core/Button.jsx';

const rows = [
  { period: '2026', title: 'Runner', org: 'RED-d Awareness Film Shoot', description: 'On-set support for a professional production.' },
  { period: '2025 — present', title: 'Promotional Films', org: "St John's Hampton Wick Church", description: 'Shot planning through edit and delivery, solo.' },
  { period: '2025', title: 'Marketing Photography', org: 'Imm-Aroy, Chinatown London', description: 'Stills for a restaurant\'s menu and social presence.' },
  { period: '2023 — 24', title: 'Christian Youth Journals', org: 'Independent', description: 'Designed and sold a run of youth journals.' },
  { period: '2023', title: 'Promotional Film', org: 'Red Robin Art Studio, London', description: '' },
  { period: '2022', title: 'Promotional Film', org: 'Chanctonbury Church', description: '' },
];

// TODO: replace with your real education entries (period, qualification, institution, optional description)
const education = [
  { period: 'Sep 2026 - Jun 2028', title: 'A-Levels', org: 'Hampton School, London', description: 'Studying A-Level Maths, Physics, French, and Further Maths (as well as Further Physics and Politics enrichment courses)' },
  { period: 'Sep 2023 - Jun 2026', title: 'GCSE Courses', org: 'Hampton School, London', description: 'Sat 13 GCSEs, received a grade 9 in all of them.' },
];

export function Resume() {
  return (
    <div style={{ padding: 'var(--space-9) var(--gutter)', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <SectionHeading index="03" eyebrow="Resume" title="Experience" />
        <Button variant="secondary" href="/Sam Field - CV.pdf">Download CV (PDF)</Button>
      </div>
      <div>
        <p>All the work I have been paid for is listed here - see all my projects, paid or unpaid, on the <Link to="/work">Work</Link> page.</p>
      </div>
      <div>
        {rows.map((r, i) => <ExperienceRow key={i} {...r} />)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <h3 style={{ font: 'var(--text-display-3)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>Education</h3>
        <div>
          {education.map((e, i) => <ExperienceRow key={i} {...e} />)}
        </div>
      </div>
    </div>
  );
}
