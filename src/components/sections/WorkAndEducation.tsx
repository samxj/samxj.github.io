import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';
import {
  education,
  gcseMeta,
  gcses,
  paidWork,
  type LedgerRow,
} from '../../content/workAndEducation';

const NUMBER_WORDS = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN'];
const inWords = (n: number) => NUMBER_WORDS[n] ?? String(n);

function Ledger({ rows }: { rows: LedgerRow[] }) {
  return (
    <div className="work__ledger">
      {rows.map((row) => (
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
  );
}

function SubHead({ id, label, aside }: { id: string; label: string; aside?: string }) {
  return (
    <div className="work__subhead">
      <h3 id={id} className="work__subhead-label mono">
        {label}
      </h3>
      {aside ? <span className="work__subhead-aside mono">{aside}</span> : null}
    </div>
  );
}

export function WorkAndEducation() {
  return (
    <Section index={6} className="section section--cream work" aria-labelledby="work-title">
      <div className="work__header grid12">
        <div className="work__header-left">
          <div className="eyebrow eyebrow--rust mono">06 — SCHOOLWORK AND PAID WORK</div>
          <SlideHeading id="work-title" distance={180} className="h2--work">
            WORK AND
            <br />
            EDUCATION
          </SlideHeading>
        </div>
        <div className="work__readout mono">
          {inWords(gcses.length)} GCSES
          <br />
          FOUR A-LEVELS
        </div>
      </div>

      <div className="work__group" aria-labelledby="work-now">
        <SubHead id="work-now" label="EDUCATION · RIGHT NOW" />
        <Ledger rows={education} />
      </div>

      <div className="work__group" aria-labelledby="work-gcse">
        <SubHead id="work-gcse" label="GCSE RESULTS" aside={`${gcseMeta.school.toUpperCase()} · ${gcseMeta.span}`} />
        <Reveal as="ul" className="gcse">
          {gcses.map((g, i) => (
            <li key={`${g.subject}-${i}`} className="gcse__cell">
              <div className="gcse__subject">{g.subject}</div>
              <div className="gcse__scores">
                <span className="gcse__grade">{g.grade}</span>
                <span className="gcse__percent mono">{g.percent ? `${g.percent}%` : '—%'}</span>
              </div>
              {g.note ? <div className="gcse__note mono">{g.note}</div> : null}
            </li>
          ))}
        </Reveal>
      </div>

      <div className="work__group" aria-labelledby="work-paid">
        <SubHead id="work-paid" label="PAID WORK" />
        <Ledger rows={paidWork} />
      </div>
    </Section>
  );
}
