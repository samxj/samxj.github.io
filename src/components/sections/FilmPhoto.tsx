import type { ReactNode } from 'react';
import { Section } from './Section';
import { Reveal } from '../ui/Reveal';
import { SlideHeading } from '../ui/SlideHeading';
import { MediaSlot } from '../ui/MediaSlot';
import { VideoSlot } from '../ui/VideoSlot';
import { DetailButton } from '../ui/DetailButton';
import type { ProjectKey } from '../../content/projects';
import type { OpenProject } from '../../types';

interface BlockProps {
  className: string;
  meta: string;
  title: ReactNode;
  body: string;
  bodyWidth: string;
  project: ProjectKey;
  label: string;
  onOpen: OpenProject;
}

/** One of the five staggered blocks under the collage. */
function CameraBlock({ className, meta, title, body, bodyWidth, project, label, onOpen }: BlockProps) {
  return (
    <Reveal className={`camera__block ${className}`}>
      <div className="camera__meta mono">{meta}</div>
      <h3 className="h3 h3--camera">{title}</h3>
      <p className="body" style={{ maxWidth: bodyWidth }}>
        {body}
      </p>
      <DetailButton project={project} onOpen={onOpen} on="teal" label={label} />
    </Reveal>
  );
}

export function FilmPhoto({ onOpen }: { onOpen: OpenProject }) {
  return (
    <Section index={3} className="section section--teal camera" aria-labelledby="camera-title">
      <div className="camera__header grid12">
        <div className="camera__header-inner">
          <div className="eyebrow mono">03 — BEHIND A CAMERA SINCE I COULD HOLD ONE</div>
          <SlideHeading id="camera-title" distance={260} className="h2--camera">
            FILM &amp;
            <br />
            PHOTO
          </SlideHeading>
        </div>
      </div>

      <div className="camera__collage grid12">
        <MediaSlot
          className="camera__collage-left"
          src="/assets/lampmoon.jpg"
          alt="Moon over a wooded hill at dusk"
          aspect="3 / 4"
          rotate="rotate(-2deg)"
          parallax={0.12}
        />
        <Reveal as="p" className="camera__lead">
          All of it produced alone: shot planning, shooting, editing, distribution. I started in
          visual effects and moved into paid promotional work.
        </Reveal>
        <MediaSlot
          className="camera__collage-right"
          src="/assets/castlemotif.jpg"
          alt="Castle wall against a teal sky"
          aspect="16 / 9"
          rotate="rotate(1.5deg)"
          parallax={-0.08}
        />
      </div>

      <div className="camera__blocks grid12">
        <CameraBlock
          className="camera__block--stjohns"
          meta="2025 — PRESENT · ST JOHN’S HAMPTON WICK"
          title="Thirty‑odd films for one church"
          body="Three videos for the Youth, two for Love Local, two for our camp Focus, a seven‑part series called Rise and Reflect, nineteen short sermon clips for social media, and a film of the church’s Easter activities."
          bodyWidth="46ch"
          project="stjohns"
          label="Thirty‑odd films for one church"
          onOpen={onOpen}
        />
        <CameraBlock
          className="camera__block--immaroy"
          meta="2025 · CHINATOWN, LONDON"
          title="Imm‑Aroy"
          body="Menu and social photography for my friend’s restaurant — planning, setting up the shots, grading."
          bodyWidth="40ch"
          project="immaroy"
          label="Imm‑Aroy"
          onOpen={onOpen}
        />
        <CameraBlock
          className="camera__block--redd"
          meta="2026 · RUNNER"
          title="RED‑d awareness shoot"
          body="Helping on a professional shoot on how freelance dancers are treated. Rigging lights and cameras, prepping drinks and meals, some filming. I learnt how a shoot like this is structured, and I loved it."
          bodyWidth="40ch"
          project="redd"
          label="RED‑d awareness shoot"
          onOpen={onOpen}
        />
        <CameraBlock
          className="camera__block--redrobin"
          meta="2023 & 2022"
          title={
            <>
              Red Robin Art Studio
              <br />
              Chanctonbury Church
            </>
          }
          body="A promo film for a London art studio’s site and socials, and a Mission Day film for a church."
          bodyWidth="36ch"
          project="redrobin"
          label="Red Robin Art Studio and Chanctonbury Church"
          onOpen={onOpen}
        />
        <Reveal className="camera__block camera__block--unsplash">
          <div className="camera__stat">3.5M+</div>
          <div className="camera__stat-label mono">VIEWS ON UNSPLASH</div>
          <div className="camera__stat-note mono">+ DRONE WORK FOR CLIENT SITES</div>
          <DetailButton project="unsplash" onOpen={onOpen} on="teal" label="Views on Unsplash" />
        </Reveal>
      </div>

      <Reveal className="camera__videos">
        <VideoSlot
          src="/assets/auracat.jpg"
          aspect="16 / 9"
          label="07 PARTS"
          caption="VIDEO SLOT · RISE AND REFLECT"
          tone="ink"
          background="#0A0A0A"
          posterOpacity={0.45}
        />
        <VideoSlot
          src="/assets/castlemotif.jpg"
          aspect="16 / 9"
          label="01:30"
          caption="VIDEO SLOT · RED ROBIN PROMO"
          tone="ink"
          background="#0A0A0A"
          posterOpacity={0.45}
        />
        <VideoSlot
          src="/assets/wideisa.jpg"
          aspect="16 / 9"
          label="REEL"
          caption="VIDEO SLOT · DRONE WORK"
          tone="ink"
          background="#0A0A0A"
          posterOpacity={0.45}
        />
      </Reveal>

      <Reveal className="camera__grid grid12">
        <MediaSlot
          className="camera__grid-a"
          src="/assets/torre.jpg"
          alt="Placeholder image"
          aspect="4 / 5"
          caption="SLOT · IMM‑AROY, PLATED DISH"
          tone="ink"
        />
        <MediaSlot
          className="camera__grid-b"
          src="/assets/wideisa.jpg"
          alt="Placeholder image"
          aspect="1 / 1"
          caption="SLOT · RISE AND REFLECT, FRAME 01"
          tone="ink"
        />
        <MediaSlot
          className="camera__grid-c"
          src="/assets/auracat.jpg"
          alt="Placeholder image"
          aspect="4 / 5"
          caption="SLOT · RED‑d SHOOT, BEHIND CAMERA"
          tone="ink"
        />
        <MediaSlot
          className="camera__grid-d"
          src="/assets/lampmoon.jpg"
          alt="Placeholder image"
          aspect="21 / 9"
          caption="SLOT · DRONE PASS, WIDE"
          tone="ink"
        />
        <MediaSlot
          className="camera__grid-e"
          src="/assets/castlemotif.jpg"
          alt="Placeholder image"
          aspect="16 / 9"
          caption="SLOT · CHANCTONBURY MISSION DAY"
          tone="ink"
        />
      </Reveal>
    </Section>
  );
}
