import { useCallback, useEffect, useRef, useState } from 'react';
import { Mark } from './components/chrome/Mark';
import { IndexRail } from './components/chrome/IndexRail';
import { ProgressReadout } from './components/chrome/ProgressReadout';
import { InvertCursor } from './components/chrome/InvertCursor';
import { Hero } from './components/sections/Hero';
import { HabitOfMind } from './components/sections/HabitOfMind';
import { Technical } from './components/sections/Technical';
import { FilmPhoto } from './components/sections/FilmPhoto';
import { Music } from './components/sections/Music';
import { Writing } from './components/sections/Writing';
import { WorkExperience } from './components/sections/WorkExperience';
import { RightNow } from './components/sections/RightNow';
import { Contact } from './components/sections/Contact';
import { Marquee } from './components/ui/Marquee';
import { ProjectDetailOverlay } from './components/ui/ProjectDetailOverlay';
import { useScrollState } from './hooks/useScrollState';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { setMotionAmount } from './hooks/scrollMotion';
import type { ProjectKey } from './content/projects';

const NBSP = ' ';
const SLASH = `${NBSP}${NBSP}/${NBSP}${NBSP}`;

const MARQUEE_A = [
  'CAD',
  'PYTHON',
  'AUTOPILOT',
  'PREMIERE PRO',
  'AFTER EFFECTS',
  'LIGHTROOM',
  'GRADE 8 DRUMS',
  'C1 ITALIANO',
  'CONLANGS',
].join(SLASH) + SLASH;

const MARQUEE_B =
  'PREMIERE PRO · AFTER EFFECTS · PHOTOSHOP · LIGHTROOM · DRONE · COLOUR GRADE · SHOT PLANNING · ';

export default function App() {
  const reduced = usePrefersReducedMotion();
  const { active, progress } = useScrollState();
  const [openProject, setOpenProject] = useState<ProjectKey | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMotionAmount(reduced ? 0 : 1);
  }, [reduced]);

  const open = useCallback((key: ProjectKey, button: HTMLButtonElement) => {
    trigger.current = button;
    setOpenProject(key);
  }, []);

  // Focus goes back to the button that opened the panel.
  const close = useCallback(() => {
    setOpenProject(null);
    trigger.current?.focus();
    trigger.current = null;
  }, []);

  return (
    <div className="sf-root">
      <a className="sf-skip mono" href="#sec-1">
        SKIP TO CONTENT
      </a>

      <Mark />
      <IndexRail active={active} />
      <ProgressReadout active={active} progress={progress} />
      <InvertCursor enabled={!reduced} />

      <Hero />
      <Marquee className="marquee--a" text={MARQUEE_A} duration="34s" />
      <HabitOfMind />
      <Technical onOpen={open} />
      <FilmPhoto onOpen={open} />
      <Marquee className="marquee--b" text={MARQUEE_B} direction="reverse" duration="28s" />
      <Music onOpen={open} />
      <Writing onOpen={open} />
      <WorkExperience />
      <RightNow />
      <Contact />

      <ProjectDetailOverlay openKey={openProject} onClose={close} />
    </div>
  );
}
