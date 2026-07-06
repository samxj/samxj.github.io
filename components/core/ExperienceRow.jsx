import React from 'react';

export function ExperienceRow({ title, org, period, description }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      gap: 'var(--space-6)',
      padding: 'var(--space-5) 0',
      borderBottom: '1px solid var(--border-hairline)',
    }}>
      <div style={{ font: 'var(--text-mono)', color: 'var(--text-muted)' }}>{period}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h3 style={{ font: 'var(--text-display-3)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
        {org && <div style={{ font: 'var(--text-body-sm)', color: 'var(--accent)' }}>{org}</div>}
        {description && <p style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', margin: 0, maxWidth: '60ch' }}>{description}</p>}
      </div>
    </div>
  );
}
