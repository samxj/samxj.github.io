import React from 'react';
import { SectionHeading } from '../../components/core/SectionHeading.jsx';
import { Tag } from '../../components/core/Tag.jsx';

const groups = [
  { title: 'Photography & videography', tags: ['Premiere Pro', 'Photoshop', 'Lightroom', 'After Effects', 'Solo production'] },
  { title: 'Engineering', tags: ['CAD', 'Autopilot systems', 'Software development', 'Project management'] },
  { title: 'Linguistics', tags: ['C1 Italian', 'B2 French', 'Latin', 'Classical Greek', 'Constructed languages'] },
  { title: 'Music', tags: ['Grade-8 drums', 'Grade-4 piano', 'Performing since 2021', 'Music theory'] },
  { title: 'Writing', tags: ['Short fiction', 'National shortlist', 'School publication'] },
];

export function About({}) {
  return (
    <div style={{ padding: 'var(--space-9) var(--gutter)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <SectionHeading index="01" eyebrow="About" title="One habit of mind." />
      <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-secondary)', maxWidth: '68ch', margin: 0 }}>
        I split my time between technical work — code, engineering, computing — and creative work — film, photography, music. Both start with a plan, both live or die on the details, and both need someone willing to sit with a problem until it's actually solved. But most importantly, both need one another to thrive. Techincal problems need creative solutions and creative problems need technical ones. Whichever one I'm doing, I bring the other with me; this is one habit of mind.
      </p>
      <div className="about-skills-grid" style={{ display: 'grid', gap: 'var(--space-7)' }}>
        {groups.map((g) => (
          <div key={g.title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h3 style={{ font: 'var(--text-display-3)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>{g.title}</h3>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {g.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
