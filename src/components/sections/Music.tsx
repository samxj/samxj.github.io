import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';
import { MediaSlot } from '../ui/MediaSlot';
import { VideoSlot } from '../ui/VideoSlot';
import { DetailButton } from '../ui/DetailButton';
import type { OpenProject } from '../../types';

const specs = [
  ['DRUMS', 'GRADE 8'],
  ['PIANO', 'GRADE 4'],
  ['CHURCH BAND', 'SINCE 2021'],
  ['ROCK CONCERT', '2026'],
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
          Grade 8 drums, Grade 4 piano. I have drummed for my local church every few Sundays
          since 2021 and played my school’s Rock Concert this year, so I know both the band side and
          the theory side.
        </Reveal>
        <DetailButton project="drums" onOpen={onOpen} on="yellow" label="Drums" />
      </div>

      <div className="music__right">
        {specs.map(([name, value]) => (
          <div key={name} className="music__spec mono">
            <span>{name}</span>
            <span>{value}</span>
          </div>
        ))}
        <MediaSlot
          className="music__portrait"
          src="/assets/auracat.jpg"
          alt="Placeholder image"
          aspect="1 / 1"
          rotate="rotate(3deg)"
          parallax={0.14}
          caption="SLOT · KIT, ROCK CONCERT"
          captionAlign="right"
          tone="ink"
        />
      </div>

      <Reveal className="music__grid">
        <MediaSlot
          src="/assets/lampmoon.jpg"
          alt="Placeholder image"
          aspect="16 / 9"
          caption="SLOT · CHURCH BAND, SUNDAY"
          tone="ink"
        />
        <MediaSlot
          className="music__grid-offset"
          src="/assets/wideisa.jpg"
          alt="Placeholder image"
          aspect="16 / 9"
          caption="SLOT · PIANO, PRACTICE ROOM"
          tone="ink"
        />
        <VideoSlot
          src="/assets/torre.jpg"
          aspect="16 / 9"
          label="03:12"
          caption="VIDEO SLOT · ROCK CONCERT SET"
          tone="ink"
          background="#0A0A0A"
          posterOpacity={0.45}
        />
      </Reveal>
    </Section>
  );
}
