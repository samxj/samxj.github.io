import { useEffect, useRef } from 'react';
import { registerDrift } from './scrollMotion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Horizontal, purely scroll-linked drift — used only by the two hero name lines,
 * with opposite coefficients, so scrolling back up reverses it exactly.
 */
export function useDrift<T extends HTMLElement>(coefficient: number) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    return registerDrift({ el: ref.current, coefficient });
  }, [coefficient, reduced]);

  return ref;
}
