import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  icon?: 'arrow';
  /** Saves the file instead of opening it in the browser's PDF viewer. */
  download?: string;
}

/** Design-system button. Used only in the footer, twice. */
export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  download,
}: ButtonProps) {
  return (
    <a className={`button button--${variant} button--${size}`} href={href} download={download}>
      {children}
      {icon === 'arrow' ? (
        <span className="button__icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
    </a>
  );
}
