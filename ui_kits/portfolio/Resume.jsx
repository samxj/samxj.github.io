import React from 'react';
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

export function Resume() {
  return (
    <div style={{ padding: 'var(--space-9) var(--gutter)', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <SectionHeading index="03" eyebrow="Resume" title="Experience" />
        <Button variant="secondary" href="/Sam Field - CV.pdf">Download CV (PDF)</Button>
      </div>
      <div>
        {rows.map((r, i) => <ExperienceRow key={i} {...r} />)}
      </div>
    </div>
  );
}
