import { Section } from './Section';
import { MediaSlot } from '../ui/MediaSlot';
import { useDrift } from '../../hooks/useDrift';

export function Hero() {
  const samuel = useDrift<HTMLSpanElement>(0.34);
  const field = useDrift<HTMLSpanElement>(-0.34);

  return (
    <Section index={0} className="section hero" aria-label="Hello">
      <div className="hero__meta mono">
        TEDDINGTON · LONDON
        <br />
        A‑LEVELS 2026–28
      </div>

      <p className="hero__intro">
        Technical problems need creative solutions.
      </p>

      <div className="hero__stage">
        <h1 className="hero__name">
          <span ref={samuel} className="hero__line hero__line--solid">
            SAMUEL
          </span>
          <span ref={field} className="hero__line hero__line--outline">
            FIELD
          </span>
        </h1>
        <MediaSlot
          className="hero__image"
          src="/assets/wideisa.jpg"
          alt="Sunlit Italian wall, Tuscany"
          aspect="3 / 2"
          rotate="rotate(-3deg)"
          parallax={0.34}
        />
      </div>

      <div className="hero__foot">
        <div className="hero__keep mono">
          <span className="bob" aria-hidden="true">
            ↓
          </span>{' '}
          
        </div>
        <div className="hero__count mono"></div>
      </div>
    </Section>
  );
}
