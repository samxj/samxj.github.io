import React from 'react';

/**
 * Primary interactive control. One bold accent (flame), used sparingly —
 * most of the page is text/underline links; Button marks the one or two
 * actions that matter per screen (Get in touch, View project, Download CV).
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  icon,
  disabled = false,
  onClick,
  style,
}) {
  const Tag = href ? 'a' : as;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: 'var(--tracking-normal)',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  const sizes = {
    sm: { padding: '8px 14px', fontSize: '0.8125rem' },
    md: { padding: '13px 22px', fontSize: '0.9375rem' },
    lg: { padding: '18px 30px', fontSize: '1.0625rem' },
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      borderColor: 'var(--accent)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'transparent',
      padding: sizes[size].padding.split(' ')[0] + ' 4px',
    },
  };

  const hoverStyle = {
    primary: { background: 'var(--accent-hover)', borderColor: 'var(--accent-hover)' },
    secondary: { background: 'var(--bg-surface-raised)', borderColor: 'var(--text-primary)' },
    ghost: { color: 'var(--accent)' },
  };

  const [hover, setHover] = React.useState(false);

  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        ...sizes[size],
        ...variants[variant],
        ...(hover && !disabled ? hoverStyle[variant] : {}),
        ...style,
      }}
    >
      {children}
      {icon === 'arrow' && (
        <span style={{ transform: hover ? 'translateX(3px)' : 'translateX(0)', transition: 'transform var(--duration-fast) var(--ease-standard)', display: 'inline-flex' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      )}
    </Tag>
  );
}
