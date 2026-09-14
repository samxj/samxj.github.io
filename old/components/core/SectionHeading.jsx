import React from 'react';

export function SectionHeading({ eyebrow, title, index, align = 'left' }) {
  return (
    <div style={{ textAlign: align, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: align === 'center' ? 'center' : 'flex-start' }}>
      {eyebrow && (
        <div style={{
          font: 'var(--text-eyebrow)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          {index && <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{index}</span>}
          {eyebrow}
        </div>
      )}
      <h2 style={{ font: 'var(--text-display-2)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)', margin: 0 }}>
        {title}
      </h2>
    </div>
  );
}
