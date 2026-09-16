import { useRef, useState, type CSSProperties } from 'react';

const VIDEO_FILE = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;

export interface VideoSlotProps {
  /** An image shows as a poster placeholder; a video file (.mp4, .webm, .mov) becomes the player. */
  src: string;
  /** Optional still shown before a video file plays. */
  poster?: string;
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
  poster,
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isVideo = VIDEO_FILE.test(src);

  const frame = isVideo ? (
    <div className="videoslot__frame" style={{ aspectRatio: aspect, background }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="videoslot__video"
        preload="metadata"
        playsInline
        controls={playing}
        aria-label={alt}
        onPlay={() => setPlaying(true)}
      />
      {playing ? null : (
        <>
          <button
            type="button"
            className={`videoslot__play videoslot__play--${size} videoslot__play--button`}
            aria-label={`Play ${caption ?? 'video'}`}
            onClick={() => void videoRef.current?.play()}
          >
            &#9654;
          </button>
          {label ? <span className="videoslot__label">{label}</span> : null}
        </>
      )}
    </div>
  ) : (
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
