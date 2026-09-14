import { useEffect, useRef } from 'react';

/** Diameter of the inverting circle. */
const SIZE = 180;

interface InvertCursorProps {
  enabled: boolean;
}

/**
 * A circle that follows the pointer with no lag and inverts whatever is under it.
 * No trail, no distortion — earlier smear and lens versions were removed on purpose.
 * Desktop pointers only; `backdrop-filter` simply no-ops where it is unsupported.
 */
export function InvertCursor({ enabled }: InvertCursorProps) {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = dot.current;
    if (!el) return;

    // Parked off-screen until the pointer is first seen.
    let x = -400;
    let y = -400;
    let frame = 0;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };

    const tick = () => {
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', move, { passive: true });
    tick();

    return () => {
      window.removeEventListener('pointermove', move);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div
        ref={dot}
        className="cursor-dot"
        style={{ width: SIZE, height: SIZE, margin: `${-SIZE / 2}px 0 0 ${-SIZE / 2}px` }}
      />
    </div>
  );
}
