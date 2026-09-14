import React from 'react';

export interface TagProps {
  /** Label text, e.g. "Adobe Premiere", "C1 Italian", "2025" */
  children: React.ReactNode;
  /** Visual weight */
  variant?: 'default' | 'accent';
}

export function Tag(props: TagProps): JSX.Element;
