import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';
import { MediaSlot } from '../ui/MediaSlot';
import { DetailButton } from '../ui/DetailButton';
import type { OpenProject } from '../../types';

const languages: Array<{ name: string; level: string; tone: 'flame' | 'acid' | 'grey' }> = [
  { name: 'Italian', level: 'C1', tone: 'flame' },
  { name: 'French', level: 'B2 · DELF', tone: 'flame' },
  { name: 'Latin GCSE', level: 'Grade 9, a year early', tone: 'acid' },
  { name: 'Italian GCSE', level: 'Grade 9, a year early', tone: 'acid' },
  { name: 'Classical Greek', level: 'Predicted 9', tone: 'grey' },
];

export function Writing({ onOpen }: { onOpen: OpenProject }) {
  return (
    <Section index={5} className="section section--dark writing" aria-labelledby="writing-title">
      <div className="writing__head">
        <div className="eyebrow eyebrow--flame mono">05 — WORDS, AND THE LANGUAGES THEY SIT IN</div>
        <SlideHeading id="writing-title" distance={200} className="h2--writing">
          WRITING
        </SlideHeading>
      </div>

      <Reveal className="writing__florentine">
        <div className="writing__label mono">NATIONAL SHORTLIST</div>
        <h3 className="h3 h3--writing">Florentine Skies</h3>
        <p className="body body--42">
          Shortlisted in a national writing competition two years ago. My pieces also appear
          regularly in the Lion Print, my school’s annual collection of its best writing and art.
        </p>
        <DetailButton project="florentine" onOpen={onOpen} on="dark-teal" label="Florentine Skies" />
      </Reveal>

      <Reveal className="writing__journals">
        <div className="writing__meta mono">2023–24 · DESIGN, PRINT, SALE</div>
        <h3 className="h3 h3--sub">Christian Youth Journals, from scratch</h3>
        <p className="body body--46">
          A set of journals for my church’s youth group, taken from vision and planning through
          design, sale and distribution.
        </p>
        <DetailButton project="journals" onOpen={onOpen} label="Christian Youth Journals" />
      </Reveal>

      <Reveal className="writing__languages">
        <div className="writing__meta mono">LANGUAGES</div>
        <div className="writing__language-list">
          {languages.map((language) => (
            <div key={language.name} className="writing__language">
              <span>{language.name}</span>
              <span className={`writing__level writing__level--${language.tone}`}>
                {language.level}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="writing__media">
        <MediaSlot
          src="/assets/castlemotif.jpg"
          alt="Placeholder image"
          aspect="3 / 2"
          caption="SLOT · FLORENTINE SKIES, SPREAD"
          background="#161513"
        />
        <MediaSlot
          src="/assets/torre.jpg"
          alt="Placeholder image"
          aspect="3 / 4"
          caption="SLOT · YOUTH JOURNAL, COVER"
          background="#161513"
        />
        <MediaSlot
          className="writing__media-end"
          src="/assets/auracat.jpg"
          alt="Placeholder image"
          aspect="1 / 1"
          caption="SLOT · LION PRINT PAGE"
          background="#161513"
        />
      </Reveal>
    </Section>
  );
}
