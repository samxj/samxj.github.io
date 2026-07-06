import React from 'react';

export interface ProjectCardProps {
  title: string;
  year: string;
  role?: string;
  tags?: string[];
  /** Image URL; omit to show the placeholder treatment */
  image?: string;
  onClick?: () => void;
}

export function ProjectCard(props: ProjectCardProps): JSX.Element;
