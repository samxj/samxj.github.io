import { useEffect, useRef } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { registerParallax } from '../../hooks/scrollMotion';

interface ParallaxProps {
  /** One of the design's coefficients: 0.34, 0.14, 0.12, 0.1, 0.06, -0.05, -0.08. */
  amount: number;
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Vertical parallax. The outer element is never transformed, so measuring it stays
 * honest frame to frame; the inner element is the one that moves.
 */
export function Parallax({ amount, children, as: Tag = 'div', className, style }: ParallaxProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current || !inner.current) return;
    return registerParallax({
      wrapper: wrapper.current,
      inner: inner.current,
      coefficient: amount,
      base: '',
    });
  }, [amount]);

  return (
    <Tag ref={wrapper} className={className} style={style}>
      <div ref={inner} className="parallax__inner">
        {children}
      </div>
    </Tag>
  );
}
