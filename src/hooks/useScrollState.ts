import { useEffect, useState } from 'react';
import { subscribe } from './scrollMotion';
import type { ScrollState } from './scrollMotion';

/** Subscribes to the shared scroll engine: which section is current, and how far down the page we are. */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ active: 0, progress: 0 });
  useEffect(() => subscribe(setState), []);
  return state;
}
