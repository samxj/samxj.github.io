import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';

const now = [
  {
    title: 'Starting A‑Levels',
    body: 'Maths, Physics, French and Further Maths. My favourite subjects - French in there to keep me linguistically sharp and communicate with clarity.',
  },
  {
    title: 'Running 2 Clubs',
    body: 'Starting an extended physics club with some friends to learn more about the extra-curricular fun stuff. Joint-running the Coding Ninjas club for Y7-8.',
  },
  {
    title: 'French Debating',
    body: 'Attending the French Debating club to eventually compete in the national Joutes Oratoires.',
  },
  {
    title: 'Open to freelance',
    body: 'Photography, video and drone work around London - contact me below.',
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
