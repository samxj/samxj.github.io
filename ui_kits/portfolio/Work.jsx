import React from 'react';
import { SectionHeading } from '../../components/core/SectionHeading.jsx';
import { ProjectCard } from '../../components/core/ProjectCard.jsx';

const projects = [
  { title: "St John's Hampton Wick", image: "assets/images/1.jpg", year: '2025 - present day', role: 'Director, camera, edit', tags: ['Promo Film', 'Premiere Pro'] },
  { title: 'AI Seed-Dropping Plane', year: '2024', role: 'Dispenser design + autopilot code', tags: ['STEM Fair Winner', 'CAD'] },
  { title: 'Imm-Aroy Restaurant', year: '2025', role: 'Marketing photography', tags: ['Photoshop', 'Lightroom'] },
  { title: 'Christian Youth Journals', year: '2023–24', role: 'Design & sale', tags: ['Print Design'] },
  { title: 'Red Robin Art Studio', year: '2023', role: 'Promotional film', tags: ['Videography'] },
  { title: 'Chanctonbury Church', year: '2022', role: 'Promotional film', tags: ['Videography', 'Early Work'] },
];

export function Work({ onOpen }) {
  return (
    <div style={{ padding: 'var(--space-9) var(--gutter)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <SectionHeading index="02" eyebrow="Selected Work" title="Things I've made" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} onClick={() => onOpen && onOpen(p)} />
        ))}
      </div>
    </div>
  );
}
