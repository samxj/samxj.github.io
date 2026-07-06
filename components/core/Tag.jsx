import React from 'react';

export function Tag({ children, variant = 'default' }) {
  const variants = {
    default: {
      color: 'var(--text-secondary)',
      borderColor: 'var(--border-strong)',
      background: 'transparent',
    },
    accent: {
      color: 'var(--accent)',
      borderColor: 'var(--accent)',
      background: 'transparent',
    },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        lineHeight: 1,
        padding: '7px 12px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid',
        ...variants[variant],
      }}
    >
      {children}
    </span>
  );
}
