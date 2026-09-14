import { sectionIndex } from '../../content/sections';

interface ProgressReadoutProps {
  active: number;
  /** Whole-document progress, 0–1. */
  progress: number;
}

/** Fixed bottom-left: section number, a progress bar for the whole document, section label. */
export function ProgressReadout({ active, progress }: ProgressReadoutProps) {
  return (
    <div className="readout" aria-hidden="true">
      <span>{String(active + 1).padStart(2, '0')}</span>
      <span className="readout__track">
        <span className="readout__bar" style={{ width: `${(progress * 100).toFixed(1)}%` }} />
      </span>
      <span>{sectionIndex[active]?.label ?? ''}</span>
    </div>
  );
}
