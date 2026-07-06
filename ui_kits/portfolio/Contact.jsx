import React from 'react';
import { SectionHeading } from '../../components/core/SectionHeading.jsx';
import { Button } from '../../components/core/Button.jsx';

export function Contact() {
  const [sent, setSent] = React.useState(false);
  return (
    <div style={{ padding: 'var(--space-9) var(--gutter)', minHeight: '70vh', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)', justifyContent: 'center' }}>
      <SectionHeading index="04" eyebrow="Contact" title="Let's make something." />
      <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-secondary)', maxWidth: '56ch', margin: 0 }}>
        Whatever it is — a film, a build, a project that needs both — I'd like to hear about it.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Button variant="primary" size="lg" icon="arrow" onClick={() => setSent(true)} href={sent ? undefined : 'mailto:hello@samfield.co'}>
          {sent ? 'Opened your mail app' : 'Email me'}
        </Button>
      </div>
    </div>
  );
}
