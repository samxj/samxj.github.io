import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { registerSection } from '../../hooks/scrollMotion';

interface SectionProps {
  /** 0–8. Also fixes the element id the rail anchors to. */
  index: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export function Section({ index, children, className, style, ...aria }: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return registerSection(index, ref.current);
  }, [index]);

  return (
    <section ref={ref} id={`sec-${index}`} className={className} style={style} {...aria}>
      {children}
    </section>
  );
}
