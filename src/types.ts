import type { ProjectKey } from './content/projects';

/** Opening a panel remembers the button that opened it, so focus can be handed back. */
export type OpenProject = (key: ProjectKey, trigger: HTMLButtonElement) => void;
