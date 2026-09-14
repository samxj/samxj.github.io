import type { CSSProperties } from 'react';
import { Parallax } from './Parallax';

export interface MediaSlotProps {
  /** Swapping a placeholder for a real photograph is this one line. */
  src: string;
  alt: string;
  /** Mono caption naming what belongs in the slot. These strings are the shot list. */
  caption?: string;
  /** e.g. "16 / 10". */
  aspect: string;
  /** e.g. "rotate(2deg)". */
  rotate?: string;
  parallax?: number;
  captionAlign?: 'left' | 'right';
  /** "dark" is the grey caption used on black; "ink" inherits the block's own ink. */
  tone?: 'dark' | 'ink';
  /** Placeholder fill behind the image. */
  background?: string;
  className?: string;
  style?: CSSProperties;
}

export function MediaSlot({
  src,
  alt,
  caption,
  aspect,
  rotate,
  parallax,
  captionAlign = 'left',
  tone = 'dark',
  background,
  className,
  style,
}: MediaSlotProps) {
  const frame = (
    <div
      className="slot__frame"
      style={{ aspectRatio: aspect, transform: rotate, background }}
    >
      <img src={src} alt={alt} className="slot__img" loading="lazy" />
    </div>
  );

  const body = caption ? (
    <>
      {frame}
      <figcaption className={`slot__caption slot__caption--${tone}`} style={{ textAlign: captionAlign }}>
        {caption}
      </figcaption>
    </>
  ) : (
    frame
  );

  const classes = ['slot', className].filter(Boolean).join(' ');
  const Tag = caption ? 'figure' : 'div';

  if (parallax !== undefined) {
    return (
      <Parallax amount={parallax} as={Tag} className={classes} style={style}>
        {body}
      </Parallax>
    );
  }

  return (
    <Tag className={classes} style={style}>
      {body}
    </Tag>
  );
}
