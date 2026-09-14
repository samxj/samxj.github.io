import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';
import { workExperience, workExperienceMeta } from '../../content/workExperience';

export function WorkExperience() {
  return (
    <Section index={6} className="section section--cream work" aria-labelledby="work-title">
      <div className="work__header grid12">
        <div className="work__header-left">
          <div className="eyebrow eyebrow--rust mono">06 — WHAT I’VE ACTUALLY DONE, IN ORDER</div>
          <SlideHeading id="work-title" distance={180} className="h2--work">
            WORK
            <br />
            EXPERIENCE
          </SlideHeading>
        </div>
        <div className="work__readout mono">
          {workExperienceMeta.count}
          <br />
          {workExperienceMeta.span}
        </div>
      </div>

      <div className="work__ledger">
        {workExperience.map((row) => (
          <Reveal key={`${row.year}-${row.title}`} className="work__row">
            <div className="work__year mono">{row.year}</div>
            <div>
              <div className="work__title">{row.title}</div>
              <div className="work__org mono">{row.org}</div>
            </div>
            <p className="work__note">{row.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
