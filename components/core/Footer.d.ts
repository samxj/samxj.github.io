import React from 'react';

/**
 * @startingPoint section="Components" subtitle="Closing footer: big mailto link, socials, meta line" viewport="1200x220"
 */
export interface FooterSocial {
  label: string;
  href: string;
}
export interface FooterProps {
  email?: string;
  socials?: FooterSocial[];
}

export function Footer(props: FooterProps): JSX.Element;
