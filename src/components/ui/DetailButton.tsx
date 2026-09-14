import type { ProjectKey } from '../../content/projects';

interface DetailButtonProps {
  project: ProjectKey;
  onOpen: (key: ProjectKey, trigger: HTMLButtonElement) => void;
  /** The button takes its colour from the block it sits on. */
  on?: 'dark' | 'dark-teal' | 'teal' | 'yellow';
  /** Named for the panel it opens, since "FULL DETAIL" alone says nothing out of context. */
  label?: string;
}

/** The site's own "+ FULL DETAIL" control — not from the design system. */
export function DetailButton({ project, onOpen, on = 'dark', label }: DetailButtonProps) {
  return (
    <button
      type="button"
      className={`detail-button detail-button--${on}`}
      aria-haspopup="dialog"
      onClick={(event) => onOpen(project, event.currentTarget)}
    >
      <span className="detail-button__plus" aria-hidden="true">
        +
      </span>
      FULL DETAIL
      {label ? <span className="sr-only">: {label}</span> : null}
    </button>
  );
}
