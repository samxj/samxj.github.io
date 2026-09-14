import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { MediaSlot } from '../ui/MediaSlot';

export function HabitOfMind() {
  return (
    <Section index={1} className="section section--cream habit" aria-label="Habit of mind">
      <div className="habit__index">
        <div className="habit__number">01</div>
        <div className="habit__vertical mono">ONE HABIT OF MIND</div>
      </div>

      <Reveal as="p" className="habit__lead">
        I split my time between technical work — code, engineering, computing — and creative work —
        film, photography, music. Both start with a plan, both live or die on the details, and both
        need someone willing to sit with a problem until it’s actually solved. But most importantly,
        both need one another to thrive. Whichever one I’m doing, I bring the other with me; this is
        one habit of mind.
      </Reveal>

      <Reveal className="habit__credentials mono">
        <span>HAMPTON SCHOOL, LONDON</span>
        <span>STEM FAIR CATEGORY WINNER, 2026</span>
        <span>HEADMASTER’S AWARD</span>
      </Reveal>

      <MediaSlot
        className="habit__media"
        src="/assets/torre.jpg"
        alt="Stone tower, low angle"
        aspect="4 / 5"
        rotate="rotate(2deg)"
        parallax={0.1}
        caption="SHOT ON A HILL IN TUSCANY"
        captionAlign="right"
        tone="ink"
      />
    </Section>
  );
}
