import React from 'react';

/**
 * @startingPoint section="Components" subtitle="Sticky top nav: wordmark, links, contact CTA" viewport="1200x90"
 */
export interface NavLink {
  label: string;
  href: string;
}
export interface NavProps {
  active?: string;
  links?: NavLink[];
  onNavigate?: (key: string) => void;
}

export function Nav(props: NavProps): JSX.Element;
