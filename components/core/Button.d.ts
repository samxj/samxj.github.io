import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Renders as <a href> instead of <button> */
  href?: string;
  as?: 'button' | 'a';
  /** Trailing icon */
  icon?: 'arrow';
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
