import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';

const now = [
  {
    title: 'Starting A‑Levels',
    body: 'Maths, Physics, Computer Science, and French through the DELF programme.',
  },
  {
    title: 'Filming for St John’s',
    body: 'More youth and Sunday work, plus whatever the church needs next.',
  },
  {
    title: 'Building Lexitecht',
    body: 'Turning the conlang app from a sketch into something usable.',
  },
  {
    title: 'Open to freelance',
    body: 'Photography, video and drone work around London.',
  },
];

const frames = ['/assets/wideisa.jpg', '/assets/lampmoon.jpg', '/assets/castlemotif.jpg', '/assets/auracat.jpg'];

export function RightNow() {
  return (
    <Section index={7} className="section section--flame right-now" aria-labelledby="right-now-title">
      <div className="right-now__head">
        <div className="eyebrow eyebrow--dot mono">
          <span className="blink-dot" aria-hidden="true" />
          07 — RIGHT NOW
        </div>
        <SlideHeading id="right-now-title" distance={160} className="h2--right-now">
          THIS
          <br />
          TERM
        </SlideHeading>
      </div>

      <Reveal className="right-now__grid">
        {now.map((item) => (
          <div key={item.title}>
            <div className="right-now__title">{item.title}</div>
            <p className="body">{item.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="right-now__frames">
        {frames.map((src) => (
          <div key={src} className="right-now__frame">
            <img src={src} alt="Placeholder image" loading="lazy" />
          </div>
        ))}
        <div className="right-now__caption mono">FOUR SLOTS · RECENT FRAMES, UPDATED EACH TERM</div>
      </Reveal>
    </Section>
  );
}
