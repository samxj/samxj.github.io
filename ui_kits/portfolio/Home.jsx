import React from 'react';
import { Button } from '../../components/core/Button.jsx';

/*const HERO_WORDS = [
  { text: 'creativity', fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'normal', fontSize: '1em' },
  { text: 'storytelling', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontStyle: 'normal', fontSize: '0.85em'},
  { text: 'boldness', fontFamily: "'Roboto Mono', monospace", fontWeight: 700, fontStyle: 'normal', fontSize: '0.85em' },
  { text: 'communication', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontStyle: 'italic', fontSize: '0.85em' },
  { text: 'leadership', fontFamily: "'Roboto Mono', monospace", fontWeight: 700, fontStyle: 'normal', fontSize: '0.95em' },
  { text: 'curiosity', fontFamily: "'Limelight', fantasy", fontWeight: 400, fontStyle: 'normal', fontSize: '0.95em' },
];*/

const HERO_WORDS = [
  { text: 'creativity', fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'normal', fontSize: '1em' },
  { text: 'storytelling', fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'normal', fontSize: '1em'},
  { text: 'boldness', fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'normal', fontSize: '1em' },
  { text: 'communication', fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'normal', fontSize: '1em' },
  { text: 'leadership', fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'normal', fontSize: '1em' },
  { text: 'curiosity', fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'normal', fontSize: '1em' },
];

const BANNER_DURATION_MS = 10000;

function UnfinishedBanner() {
  const [open, setOpen] = React.useState(true);
  const [closing, setClosing] = React.useState(false);

  const dismiss = React.useCallback(() => {
    setClosing(true);
    setTimeout(() => setOpen(false), 300);
  }, []);

  React.useEffect(() => {
    const id = setTimeout(dismiss, BANNER_DURATION_MS);
    return () => clearTimeout(id);
  }, [dismiss]);

  if (!open) return null;

  return (
    <div style={{
      overflow: 'hidden',
      maxHeight: closing ? 0 : '200px',
      opacity: closing ? 0 : 1,
      transition: `max-height var(--duration-base) var(--ease-standard), opacity var(--duration-base) var(--ease-standard)`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-3) var(--gutter)',
        background: '#B3261E',
        color: '#FFFFFF',
      }}>
        <p style={{ font: 'var(--text-body-sm)', margin: 0, textAlign: 'center' }}>
          This site is still under construction — but we're almost there! Full version coming by 4th September.
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss notification"
          style={{
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            padding: 0,
            border: 'none',
            background: 'transparent',
            color: '#FFFFFF',
            cursor: 'pointer',
            opacity: 0.85,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>
    </div>
  );
}

export function Home({ onNavigate }) {
  const [wordIndex, setWordIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const word = HERO_WORDS[wordIndex];

  return (
    <div>
      <UnfinishedBanner />
      <section style={{
        minHeight: '86vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'var(--space-6)',
        padding: 'var(--space-9) var(--gutter)',
      }}>
        <div style={{ font: 'var(--text-eyebrow)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--accent)' }}>
          Engineering × designing × storytelling
        </div>
        <h1 style={{ font: 'var(--text-display-1)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)', margin: 0, maxWidth: '22ch' }}>
          Where tech smooshes with human {' '}
          <span
            key={wordIndex}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              color: 'var(--accent)',
              fontFamily: word.fontFamily,
              fontWeight: word.fontWeight,
              fontStyle: word.fontStyle,
              fontSize: word.fontSize,
              lineHeight: 0.92,
              animation: 'heroWordReveal 650ms var(--ease-cinematic)',
            }}
          >
            {word.text}.
          </span>
        </h1>
        <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-secondary)', maxWidth: '52ch', margin: 0 }}>
          Telling stories.<br></br>
          Sometimes with code, sometimes with films, always with eloquency. <br></br>
          Technical problems, creative solutions, and vice versa - camera in one hand, CAD file in the other.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          <Button variant="primary" size="lg" icon="arrow" onClick={() => onNavigate('work')}>See my work</Button>
          <Button variant="secondary" size="lg" onClick={() => onNavigate('contact')}>Get in touch</Button>
        </div>
      </section>

      <section className="home-features-grid" style={{ padding: '0 var(--gutter) var(--space-9)', display: 'grid', gap: 'var(--space-6)' }}>
        {[
          ['Film & photo', 'Shot planning to grade, solo — Premiere, Photoshop, Lightroom, After Effects'],
          ['Engineering', 'STEM-fair winner: an AI-guided seed-dropping RC plane, built from scratch'],
          ['Languages', 'C1 Italian, B2 French, grade 9 Latin & Classical Greek GCSE'],
          ['Music & writing', 'Grade-8 drums, grade-4 piano, nationally shortlisted short fiction'],
        ].map(([t, d]) => (
          <div key={t} style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <h3 style={{ font: 'var(--text-display-3)', fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>{t}</h3>
            <p style={{ font: 'var(--text-body-sm)', color: 'var(--text-muted)', margin: 0 }}>{d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
