import React from 'react';

export interface SectionHeadingProps {
  /** Small uppercase label above the title, e.g. "Selected Work" */
  eyebrow?: string;
  title: React.ReactNode;
  /** Optional index shown before the eyebrow, e.g. "01" */
  index?: string;
  align?: 'left' | 'center';
}

export function SectionHeading(props: SectionHeadingProps): JSX.Element;
