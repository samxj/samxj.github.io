import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';

const strip = [
  '/assets/torre.jpg',
  '/assets/castlemotif.jpg',
  '/assets/wideisa.jpg',
  '/assets/lampmoon.jpg',
  '/assets/auracat.jpg',
];

export function Contact() {
  return (
    <Section index={8} className="section section--dark contact" aria-label="Say hello">
      <div className="contact__head grid12">
        <div className="contact__head-left">
          <div className="eyebrow eyebrow--teal mono">08 — SAY HELLO</div>
          <a className="contact__email" href="mailto:hello@samfield.co">
            hello@
            <br />
            samfield.co
          </a>
        </div>
        <div className="contact__details mono">
          <a href="tel:+447460102466">+44 7460 102 466</a>
          <a href="https://samfield.co">samfield.co</a>
          <span>TEDDINGTON, TW11</span>
        </div>
      </div>

      <Reveal className="contact__strip">
        {strip.map((src) => (
          <div key={src} className="contact__strip-item">
            <img src={src} alt="Placeholder image" loading="lazy" />
          </div>
        ))}
      </Reveal>

      <div className="contact__footer">
        <div className="contact__actions">
          <Button
            href="/assets/Samuel-Field-CV.pdf"
            download="Samuel Field - CV.pdf"
            size="lg"
            icon="arrow"
          >
            Download the CV
          </Button>
          <Button href="mailto:hello@samfield.co" variant="secondary" size="lg">
            Email me
          </Button>
        </div>
        <div className="contact__colophon mono">
          MUCH MORE DETAIL IS AVAILABLE ON REQUEST
          <br />
          SAMUEL FIELD · 2026
        </div>
      </div>
    </Section>
  );
}
