import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';
import { MediaSlot } from '../ui/MediaSlot';
import { DetailButton } from '../ui/DetailButton';
import type { OpenProject } from '../../types';

const specs = [
  ['DRUMS', 'ABOUT TO SIT GRADE 8'],
  ['PIANO', 'GRADE 3', 'note'],
  ['CHURCH BAND', 'SINCE 2021'],
  ['ROCK CONCERT', 'JUL & DEC 2026'],
];

export function Music({ onOpen }: { onOpen: OpenProject }) {
  return (
    <Section index={4} className="section section--acid music" aria-labelledby="music-title">
      <div className="music__left">
        <div className="eyebrow mono">04 — SINCE BEFORE THE PANDEMIC</div>
        <SlideHeading id="music-title" distance={200} className="h2--music">
          DRUMS
        </SlideHeading>
        <Reveal as="p" className="music__lead">
          Grade 8 drums, 8 years&rsquo; experience. I have drummed for my local church every few Sundays
          since 2021 and played my school&rsquo;s Rock Concert this year, so I know both the band side and
          the theory side. Some piano as of the last few years too.
        </Reveal>
        <DetailButton project="drums" onOpen={onOpen} on="yellow" label="Drums" />
      </div>

      <div className="music__right">
        {specs.map(([name, value, note]) => (
          <div key={name} className="music__spec mono">
            <span>{name}</span>
            <span>
              {value}
              {note ? <sup className="music__marker">*</sup> : null}
            </span>
          </div>
        ))}

        <p className="music__footnote mono">
          <span className="music__marker" aria-hidden="true">
            *
          </span>
          I have not sat the grade but play songs between grades 3 and 5.
        </p>
        <MediaSlot
          className="music__portrait"
          src="/assets/Drumming.jpg"
          alt="Placeholder image"
          aspect="1 / 1"
          rotate="rotate(3deg)"
          parallax={0.14}
          caption="JULY 2026 · ROCK CONCERT"
          captionAlign="right"
          tone="ink"
        />
      </div>

      <Reveal className="music__grid">
        <MediaSlot
          src="/assets/carols.jpeg"
          alt="Church youth band"
          aspect="16 / 11"
          caption="CHURCH YOUTH BAND · CONTEMPORARY CAROLS"
          tone="ink"
        />
      </Reveal>
    </Section>
  );
}
