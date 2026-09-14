import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/** Fades and rises into place the first time it is scrolled into view. */
export function Reveal({ children, as: Tag = 'div', className, style }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useReveal<HTMLDivElement>(reduced);

  return (
    <Tag ref={ref} className={className ? `reveal ${className}` : 'reveal'} style={style}>
      {children}
    </Tag>
  );
}
