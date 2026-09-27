import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { MediaSlot } from '../ui/MediaSlot';

export function HabitOfMind() {
  return (
    <Section index={1} className="section section--cream habit" aria-labelledby="habit-title">
      <div className="habit__index">
        <div className="habit__number">01</div>
        <div className="habit__vertical mono">ONE HABIT OF MIND</div>
      </div>

      <Reveal as="h2" className="habit__title" id="habit-title">
        Hi, I&rsquo;m Sam!
      </Reveal>

      <Reveal as="p" className="habit__lead">
        This is where I put everything I do. At heart, I&rsquo;m an engineer; CAD and coding and
        caffeine are among my favourite things. But that is not all. We don&rsquo;t need human
        computers anymore; AI means almost anyone can build code, iterate designs, make a tech
        project, do the maths, assemble an app &mdash; the list goes on. What we need are people - Leadership, eloquency, and creativity. Yet, those traits
        are empty without that nitty&#8209;gritty understanding of the tech stuff, without good old
        experience of doing it all yourself.
        
      </Reveal>
/*<br />
        And I believe that&rsquo;s where I come in.*/
      <Reveal className="habit__credentials mono">
        <span>SAMUEL GIOVANNI FIELD</span>
        <span>LONDON</span>
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
