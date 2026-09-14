import { useEffect, useRef } from 'react';

/** Elements entering together are staggered by this much each. */
const STAGGER_MS = 90;
/**
 * Failsafe. If the observer never fires — a browser quirk, a layout that never
 * intersects, an element revealed inside a hidden container — everything is shown
 * anyway. Content must never be stranded invisible.
 */
const FAILSAFE_MS = 4000;

const VISIBLE = 'is-visible';

const watched = new Set<Element>();
let observer: IntersectionObserver | null = null;
let failsafe: number | null = null;

const show = (el: Element) => el.classList.add(VISIBLE);

function ensureObserver(): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        window.setTimeout(() => show(el), i * STAGGER_MS);
        observer?.unobserve(el);
        watched.delete(el);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );

  failsafe = window.setTimeout(() => {
    watched.forEach(show);
  }, FAILSAFE_MS);

  return observer;
}

function teardownIfIdle(): void {
  if (watched.size > 0) return;
  observer?.disconnect();
  observer = null;
  if (failsafe !== null) {
    window.clearTimeout(failsafe);
    failsafe = null;
  }
}

/**
 * Fade-and-rise on first entry. Attach the returned ref to an element carrying the
 * `reveal` class. With reduced motion the element is shown immediately.
 */
export function useReveal<T extends HTMLElement>(disabled = false): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (disabled) {
      show(el);
      return;
    }

    const io = ensureObserver();
    watched.add(el);
    io.observe(el);

    return () => {
      io.unobserve(el);
      watched.delete(el);
      teardownIfIdle();
    };
  }, [disabled]);

  return ref;
}
