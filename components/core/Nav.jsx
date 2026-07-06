import React from 'react';
import { Button } from './Button.jsx';

export function Nav({ active = 'home', links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Resume', href: '#resume' },
], onNavigate }) {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px var(--gutter)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'rgba(10,10,10,0.7)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      borderBottom: '1px solid var(--border-hairline)',
    }}>
      <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }} style={{
        font: 'var(--text-display-3)', fontSize: '1.25rem', color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: 'var(--tracking-tight)',
      }}>Sam Field</a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
        {links.map((l) => {
          const key = l.href.replace('#', '');
          const isActive = key === active;
          return (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(key); }}
              style={{
                font: 'var(--text-label)',
                textDecoration: 'none',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                paddingBottom: '4px',
                transition: 'color var(--duration-fast) var(--ease-standard)',
              }}
            >{l.label}</a>
          );
        })}
        <Button size="sm" variant="primary" href="#contact" onClick={() => onNavigate && onNavigate('contact')}>Contact</Button>
      </div>
    </nav>
  );
}
