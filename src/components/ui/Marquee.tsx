interface MarqueeProps {
  /** Rendered twice, back to back, so the loop is seamless. */
  text: string;
  direction?: 'forward' | 'reverse';
  /** e.g. "34s". */
  duration: string;
  className?: string;
}

export function Marquee({ text, direction = 'forward', duration, className }: MarqueeProps) {
  const classes = ['marquee', className].filter(Boolean).join(' ');
  return (
    <div className={classes} aria-hidden="true">
      <div
        className="marquee__track"
        style={{
          animationName: direction === 'reverse' ? 'sf-marquee-rev' : 'sf-marquee',
          animationDuration: duration,
        }}
      >
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
