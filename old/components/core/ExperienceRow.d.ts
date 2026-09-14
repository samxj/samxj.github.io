import React from 'react';

export interface ExperienceRowProps {
  title: string;
  org?: string;
  /** e.g. "2025 —" or "2022" */
  period: string;
  description?: string;
}

export function ExperienceRow(props: ExperienceRowProps): JSX.Element;
