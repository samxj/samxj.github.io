import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';
import { MediaSlot } from '../ui/MediaSlot';

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
    title: 'Teaching drums, french mentoring',
    body: 'Weekly paid drum tutoring for a complete beginner and a more experienced drummer, so they can both play at church. Mentoring a Y11 student for GCSE French.',
  },
];

const frames = [
  { src: '/assets/codeninjas.png', alt: 'Placeholder image', aspect: '4 / 3', caption: 'CODE NINJAS CLUB LESSON' },
  { src: '/assets/frenchbooklet.png', alt: 'Placeholder image', aspect: '4 / 3', caption: 'FRENCH SPEAKING PRACTICE' },
];

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
        {frames.map((frame) => (
          <MediaSlot key={frame.src} {...frame} tone="ink" />
        ))}
      </Reveal>
    </Section>
  );
}
