import React from 'react';
import { Tag } from './Tag.jsx';

export function ProjectCard({ title, year, role, tags = [], image, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      <div style={{
        aspectRatio: '4 / 3',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: image ? `center/cover no-repeat url(${image})` : 'linear-gradient(160deg, #1D1B17, #0A0A0A)',
        border: '1px solid var(--border-hairline)',
        position: 'relative',
      }}>
        {!image && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', font: 'var(--text-mono)', letterSpacing: 'var(--tracking-wide)',
          }}>IMAGE</div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.35), transparent 40%)',
          opacity: hover ? 1 : 0, transition: 'opacity var(--duration-base) var(--ease-cinematic)',
        }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-3)' }}>
          <h3 style={{
            font: 'var(--text-display-3)', color: 'var(--text-primary)', margin: 0,
            transition: 'color var(--duration-fast) var(--ease-standard)',
            ...(hover ? { color: 'var(--accent)' } : {}),
          }}>{title}</h3>
          <span style={{ font: 'var(--text-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{year}</span>
        </div>
        {role && <p style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', margin: 0 }}>{role}</p>}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
            {tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
      </div>
    </div>
  );
}
