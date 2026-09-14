import type { CSSProperties } from 'react';

export interface VideoSlotProps {
  /** Poster frame today; swap for a real file or an embed and this becomes the player. */
  src: string;
  alt?: string;
  caption?: string;
  aspect: string;
  /** Duration or part count, pinned bottom-right. */
  label?: string;
  size?: 'sm' | 'lg';
  tone?: 'dark' | 'ink';
  background?: string;
  posterOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

export function VideoSlot({
  src,
  alt = 'Video placeholder',
  caption,
  aspect,
  label,
  size = 'lg',
  tone = 'dark',
  background = '#161513',
  posterOpacity = 0.4,
  className,
  style,
}: VideoSlotProps) {
  const frame = (
    <div className="videoslot__frame" style={{ aspectRatio: aspect, background }}>
      <img src={src} alt={alt} className="videoslot__poster" style={{ opacity: posterOpacity }} loading="lazy" />
      <span className={`videoslot__play videoslot__play--${size}`} aria-hidden="true">
        &#9654;
      </span>
      {label ? <span className="videoslot__label">{label}</span> : null}
    </div>
  );

  const classes = ['slot', className].filter(Boolean).join(' ');

  if (!caption) {
    return (
      <div className={classes} style={style}>
        {frame}
      </div>
    );
  }

  return (
    <figure className={classes} style={style}>
      {frame}
      <figcaption className={`slot__caption slot__caption--${tone}`}>{caption}</figcaption>
    </figure>
  );
}
