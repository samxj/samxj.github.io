import { useEffect, useRef, useState } from 'react';
import { projectsByKey } from '../../content/projects';
import type { ProjectKey } from '../../content/projects';
import { ProjectPanel } from './ProjectPanel';

/** Matches the sheet's transition, so the overlay is only removed once it has faded. */
const EXIT_MS = 260;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const TITLE_ID = 'project-panel-title';

interface ProjectDetailOverlayProps {
  openKey: ProjectKey | null;
  onClose: () => void;
}

/**
 * One overlay serves all twelve panels. It is the only real application state on
 * the site: a project key, or null.
 */
export function ProjectDetailOverlay({ openKey, onClose }: ProjectDetailOverlayProps) {
  const [rendered, setRendered] = useState<ProjectKey | null>(null);
  const [shown, setShown] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Open: mount, then transition in on the next frame. Close: transition out, then unmount.
  useEffect(() => {
    if (openKey) {
      setRendered(openKey);
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    const timer = window.setTimeout(() => setRendered(null), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [openKey]);

  // Body scroll lock for as long as anything is on screen.
  useEffect(() => {
    if (!rendered) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [rendered]);

  // Escape closes from anywhere.
  useEffect(() => {
    if (!openKey) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openKey, onClose]);

  // Focus lands on the close button; the panel scroll position starts at the top.
  // Waits on `rendered` as well, since the sheet only exists after that commit.
  useEffect(() => {
    if (!openKey || !rendered) return;
    if (sheet.current) sheet.current.scrollTop = 0;
    closeButton.current?.focus();
  }, [openKey, rendered]);

  if (!rendered) return null;

  const project = projectsByKey[rendered];

  const trapFocus = (event: React.KeyboardEvent) => {
    if (event.key !== 'Tab' || !sheet.current) return;
    const focusable = Array.from(sheet.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;

    if (event.shiftKey && (current === first || !sheet.current.contains(current))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className={`overlay${shown ? ' overlay--shown' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
      onKeyDown={trapFocus}
    >
      <div className="overlay__scrim" onClick={onClose} />
      <div className="overlay__sheet" ref={sheet}>
        <button ref={closeButton} type="button" className="overlay__close" aria-label="Close" onClick={onClose}>
          &times;
        </button>
        <div className="overlay__body">
          <ProjectPanel project={project} titleId={TITLE_ID} />
        </div>
      </div>
    </div>
  );
}
