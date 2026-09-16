import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';
import { Tag } from '../ui/Tag';
import { MediaSlot } from '../ui/MediaSlot';
import { VideoSlot } from '../ui/VideoSlot';
import { DetailButton } from '../ui/DetailButton';
import type { OpenProject } from '../../types';

export function Technical({ onOpen }: { onOpen: OpenProject }) {
  return (
    <Section index={2} className="section section--dark technical" aria-labelledby="technical-title">
      <div className="technical__header grid12">
        <div className="technical__header-left">
          <div className="eyebrow eyebrow--flame mono">02 — ENGINEERING</div>
          <SlideHeading id="technical-title" distance={220} className="h2--technical">
            TECHNICAL
          </SlideHeading>
        </div>
        <p className="technical__note">
          "If debugging is the process of removing bugs from code, then programming must be the process of putting them in" - Sam Redwine
        </p>
      </div>

      <Reveal className="technical__row grid12">
        <div className="technical__idx technical__idx--flame mono">/01</div>
        <div className="technical__body technical__body--plane">
          <h3 className="h3">AI seed‑dropping plane</h3>
          <p className="body body--48">
            Third consecutive year at the school STEM fair, and the year we won our category. A small
            plane, built from scratch apart from the base airframe, which we modified in CAD. An AI
            camera and autopilot fly it to fertile soil and drop seeds there. I was responsible for
            the dispenser’s design, mechanism and code, for the
            autopilot’s auto‑stabilisation, and project management.
          </p>
          <div className="tags">
            <Tag>CAD</Tag>
            <Tag>Autopilot</Tag>
            <Tag>Computer vision</Tag>
            <Tag>Mechanism design</Tag>
          </div>
          <DetailButton project="plane" onOpen={onOpen} label="AI seed‑dropping plane" />
        </div>
        <div className="technical__media technical__media--plane">
          <MediaSlot
            src="/assets/castlemotif.jpg"
            alt="Placeholder image"
            aspect="16 / 10"
            parallax={0.06}
            caption="SLOT · THE PLANE IN FLIGHT"
            background="#161513"
          />
          <div className="technical__media-pair">
            <MediaSlot
              src="/assets/torre.jpg"
              alt="Placeholder image"
              aspect="1 / 1"
              caption="SLOT · SEED DISPENSER, CAD"
              background="#161513"
            />
            <div className="technical__stat mono">
              2026
              <br />
              SCHOOL STEM FAIR
              <br />
              <span className="acid">CATEGORY WINNER</span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="technical__row technical__row--lexitecht grid12">
        <div className="technical__idx technical__idx--teal mono">/02</div>
        <div className="technical__body technical__body--lexitecht">
          <h3 className="h3">Lexitecht</h3>
          <p className="body body--48">
            A conlang designing app: somewhere to hold a constructed language’s sounds, grammar and
            lexicon so they stay consistent as it grows. Built because I wanted it while making one of my conlangs,
            Leuiráciu - see further down for the conlang itself.
          </p>
          <div className="tags">
            <Tag>App design</Tag>
            <Tag>Data modelling</Tag>
            <Tag>Linguistics</Tag>
          </div>
          <DetailButton project="lexitecht" onOpen={onOpen} on="dark-teal" label="Lexitecht" />
        </div>
        <div className="technical__media technical__media--lexitecht">
          <MediaSlot
            src="/assets/lampmoon.jpg"
            alt="Placeholder image"
            aspect="4 / 3"
            parallax={-0.05}
            caption="SLOT · LEXITECHT UI"
            background="#161513"
          />
          <div className="technical__status mono">IN PROGRESS</div>
        </div>
      </Reveal>

      <Reveal className="technical__row grid12">
        <div className="technical__idx technical__idx--flame mono">/03</div>
        <div className="technical__body technical__body--pudding">
          <h3 className="h3">Pudding Trolley</h3>
          <p className="body body--44">
            An RC car built from scratch — chassis, drive, electronics and control.
          </p>
          <div className="tags">
            <Tag>Electronics</Tag>
            <Tag>CAD</Tag>
          </div>
          <DetailButton project="pudding" onOpen={onOpen} label="Pudding Trolley" />
        </div>
        <div className="technical__body technical__body--leuiraciu">
          <h3 className="h3">Leuiráciu</h3>
          <p className="body body--44">
            A fully comprehensive constructed language, built as a school project. It won the
            Headmaster’s award jointly with three others.
          </p>
          <div className="tags">
            <Tag>Phonology</Tag>
            <Tag>Grammar</Tag>
          </div>
          <DetailButton project="leuiraciu" onOpen={onOpen} label="Leuiráciu" />
        </div>
        <div className="technical__idx technical__idx--trailing mono">/04</div>
      </Reveal>

      <Reveal className="technical__grid">
        <MediaSlot
          src="/assets/wideisa.jpg"
          alt="Placeholder image"
          aspect="3 / 2"
          caption="SLOT · PUDDING TROLLEY, CHASSIS"
          background="#161513"
        />
        <MediaSlot
          className="technical__grid-offset"
          src="/assets/auracat.jpg"
          alt="Placeholder image"
          aspect="3 / 2"
          caption="SLOT · WIRING BENCH"
          background="#161513"
        />
        <MediaSlot
          src="/assets/castlemotif.jpg"
          alt="Placeholder image"
          aspect="3 / 2"
          caption="SLOT · LEUIRÁCIU SCRIPT SHEET"
          background="#161513"
        />
        <VideoSlot
          className="technical__grid-wide"
          src="/assets/torre.jpg"
          aspect="21 / 9"
          label="00:45"
          caption="VIDEO SLOT · PLANE TEST FLIGHT"
        />
        <VideoSlot
          src="/assets/lampmoon.jpg"
          aspect="3 / 2"
          size="sm"
          caption="VIDEO SLOT · DISPENSER, BENCH TEST"
        />
      </Reveal>
    </Section>
  );
}
