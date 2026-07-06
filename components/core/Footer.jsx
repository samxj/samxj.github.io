import React from 'react';

export function Footer({ email = 'hello@samfield.co', socials = [] }) {
  return (
    <footer style={{
      padding: 'var(--space-8) var(--gutter)',
      borderTop: '1px solid var(--border-hairline)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
    }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-6)',
      }}>
        <a href={`mailto:${email}`} style={{
          font: 'var(--text-display-2)', fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: 'var(--tracking-tight)',
        }}>{email}</a>
        <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} style={{ font: 'var(--text-label)', color: 'var(--text-muted)', textDecoration: 'none' }}>{s.label}</a>
          ))}
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', font: 'var(--text-mono)', color: 'var(--text-muted)', fontSize: '0.75rem',
      }}>
        <span>© {new Date().getFullYear()} Sam Field</span>
        <span>Engineering × creativity</span>
      </div>
    </footer>
  );
}
