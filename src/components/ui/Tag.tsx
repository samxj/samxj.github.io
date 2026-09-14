import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  /** The first tag in a group is set in the accent. */
  variant?: 'default' | 'accent';
}

/** Mono pill from the design system. */
export function Tag({ children, variant = 'default' }: TagProps) {
  return <span className={`tag tag--${variant}`}>{children}</span>;
}
