/**
 * One scroll listener for the whole site.
 *
 * Everything scroll-linked registers itself here — vertical parallax, the hero's
 * horizontal drift, the section-heading slide-ins, the index rail and the progress
 * readout — and a single `{ passive: true }` listener, throttled to one
 * requestAnimationFrame, drives all of it. Per-element listeners would be the
 * wrong shape at this scale.
 */

/** Vertical parallax is never allowed past this many pixels either way. */
const MAX_OFFSET = 110;
/** The hero drift stops accumulating after 1.35 viewports of scroll. */
const HERO_LIMIT = 1.35;
/** A section becomes "current" once its top passes this fraction of the viewport. */
const ACTIVE_LINE = 0.42;
/** Slide-ins complete over this fraction of a viewport of travel. */
const SLIDE_SPAN = 0.62;

export interface ScrollState {
  /** Index of the section the reader is in, 0–8. */
  active: number;
  /** Whole-document scroll progress, 0–1. */
  progress: number;
}

interface ParallaxEntry {
  /** Untransformed, so measuring it never compounds frame to frame. */
  wrapper: HTMLElement;
  /** The element that actually moves. */
  inner: HTMLElement;
  coefficient: number;
  /** A rotation the element already carries, which the translate composes with. */
  base: string;
}

interface DriftEntry {
  el: HTMLElement;
  coefficient: number;
}

interface SlideEntry {
  el: HTMLElement;
  distance: number;
}

const parallaxes = new Set<ParallaxEntry>();
const drifts = new Set<DriftEntry>();
const slides = new Set<SlideEntry>();
const sections = new Map<number, HTMLElement>();
const subscribers = new Set<(state: ScrollState) => void>();

let motionAmount = 1;
let listening = false;
let frame = 0;
let state: ScrollState = { active: 0, progress: 0 };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function measure(): void {
  frame = 0;
  const vh = window.innerHeight;
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - vh;
  const progress = clamp(max > 0 ? y / max : 0, 0, 1);

  if (motionAmount > 0) {
    const hero = Math.min(y, vh * HERO_LIMIT);

    drifts.forEach(({ el, coefficient }) => {
      const k = coefficient * motionAmount;
      el.style.transform = `translate3d(${(hero * k).toFixed(1)}px,0,0)`;
    });

    slides.forEach(({ el, distance }) => {
      const p = clamp((vh - el.getBoundingClientRect().top) / (vh * SLIDE_SPAN), 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const travel = distance * motionAmount * (1 - eased);
      el.style.transform = `translate3d(${(-travel).toFixed(1)}px,0,0)`;
      el.style.opacity = (0.25 + 0.75 * eased).toFixed(3);
    });

    parallaxes.forEach(({ wrapper, inner, coefficient, base }) => {
      const k = coefficient * motionAmount;
      const rect = wrapper.getBoundingClientRect();
      const fromCentre = rect.top + rect.height / 2 - vh / 2;
      const offset = clamp(-fromCentre * k, -MAX_OFFSET, MAX_OFFSET);
      inner.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)${base ? ` ${base}` : ''}`;
    });
  }

  let active = 0;
  sections.forEach((el, index) => {
    if (el.getBoundingClientRect().top <= vh * ACTIVE_LINE && index > active) active = index;
  });

  if (active !== state.active || progress !== state.progress) {
    state = { active, progress };
    subscribers.forEach((fn) => fn(state));
  }
}

export function requestTick(): void {
  if (typeof window === 'undefined') return;
  if (frame) return;
  frame = window.requestAnimationFrame(measure);
}

function attach(): void {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  measure();
}

function detach(): void {
  if (!listening) return;
  listening = false;
  window.removeEventListener('scroll', requestTick);
  window.removeEventListener('resize', requestTick);
  if (frame) {
    window.cancelAnimationFrame(frame);
    frame = 0;
  }
}

/** 0 disables every scroll-linked transform; 1 is the design's intended amount. */
export function setMotionAmount(amount: number): void {
  motionAmount = amount;
  if (amount === 0) {
    drifts.forEach(({ el }) => {
      el.style.transform = '';
    });
    slides.forEach(({ el }) => {
      el.style.transform = '';
      el.style.opacity = '';
    });
    parallaxes.forEach(({ inner, base }) => {
      inner.style.transform = base;
    });
  }
  requestTick();
}

export function registerParallax(entry: ParallaxEntry): () => void {
  parallaxes.add(entry);
  requestTick();
  return () => {
    parallaxes.delete(entry);
  };
}

export function registerDrift(entry: DriftEntry): () => void {
  drifts.add(entry);
  requestTick();
  return () => {
    drifts.delete(entry);
  };
}

export function registerSlide(entry: SlideEntry): () => void {
  entry.el.style.willChange = 'transform';
  slides.add(entry);
  requestTick();
  return () => {
    slides.delete(entry);
  };
}

export function registerSection(index: number, el: HTMLElement): () => void {
  sections.set(index, el);
  requestTick();
  return () => {
    if (sections.get(index) === el) sections.delete(index);
  };
}

export function subscribe(fn: (state: ScrollState) => void): () => void {
  subscribers.add(fn);
  attach();
  fn(state);
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) detach();
  };
}
