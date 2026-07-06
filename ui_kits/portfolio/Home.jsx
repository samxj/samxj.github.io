import React from 'react';
import { Button } from '../../components/core/Button.jsx';

const HERO_WORDS = [
  { text: 'creativity', fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'normal', fontSize: '1em' },
  { text: 'boldness', fontFamily: "'Caveat', cursive", fontWeight: 700, fontStyle: 'normal', fontSize: '1.15em' },
  { text: 'communication', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontStyle: 'italic', fontSize: '0.85em' },
  { text: 'leadership', fontFamily: "'Space Mono', monospace", fontWeight: 400, fontStyle: 'normal', fontSize: '0.6em' },
  { text: 'curiosity', fontFamily: "'Caveat', cursive", fontWeight: 700, fontStyle: 'normal', fontSize: '1.15em' },
];

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
      <section style={{
        minHeight: '86vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'var(--space-6)',
        padding: 'var(--space-9) var(--gutter)',
      }}>
        <div style={{ font: 'var(--text-eyebrow)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--accent)' }}>
          Engineering × photography × story
        </div>
        <h1 style={{ font: 'var(--text-display-1)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)', margin: 0, maxWidth: '22ch' }}>
          Real tech, raw{' '}
          <span
            key={wordIndex}
            style={{
              display: 'inline-block',
              color: 'var(--accent)',
              fontFamily: word.fontFamily,
              fontWeight: word.fontWeight,
              fontStyle: word.fontStyle,
              fontSize: word.fontSize,
              lineHeight: 0.92,
              animation: 'heroWordReveal 650ms var(--ease-cinematic)',
            }}
          >
            {word.text}
          </span>.
        </h1>
        <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-secondary)', maxWidth: '52ch', margin: 0 }}>
          I'm Sam Field — I build things (code, machines, film) and I tell stories with them.
          Camera in one hand, CAD file in the other.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          <Button variant="primary" size="lg" icon="arrow" onClick={() => onNavigate('work')}>See my work</Button>
          <Button variant="secondary" size="lg" onClick={() => onNavigate('contact')}>Get in touch</Button>
        </div>
      </section>

      <section style={{ padding: '0 var(--gutter) var(--space-9)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-6)' }}>
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
