import React from 'react';

export interface ProjectCardProps {
  title: string;
  year: string;
  role?: string;
  tags?: string[];
  /**
   * Image URL, or a directory path (e.g. "assets/images/project-x") containing multiple images.
   * For a directory, the alphabetically-first image is shown at rest, and the card cycles
   * through every image in the directory on hover. Omit for the placeholder treatment.
   */
  image?: string;
  onClick?: () => void;
}

export function ProjectCard(props: ProjectCardProps): JSX.Element;
