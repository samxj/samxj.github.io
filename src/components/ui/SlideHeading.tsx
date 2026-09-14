import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { registerSlide } from '../../hooks/scrollMotion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface SlideHeadingProps {
  children: ReactNode;
  /** Travel in pixels: Technical 220, Film & Photo 260, Drums 200, Writing 200, Work 180, This Term 160. */
  distance: number;
  className?: string;
  id?: string;
}

/** A section H2 that slides in from the left as it is scrolled towards. */
export function SlideHeading({ children, distance, className, id }: SlideHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    return registerSlide({ el: ref.current, distance });
  }, [distance, reduced]);

  return (
    <h2 ref={ref} id={id} className={className ? `h2 ${className}` : 'h2'}>
      {children}
    </h2>
  );
}
