import React from 'react';
import { Tag } from './Tag.jsx';

const CYCLE_INTERVAL_MS = 900;
const IMAGE_EXT_RE = /\.(jpe?g|png|gif|webp|avif|svg)$/i;

// All project images, eagerly resolved so a directory path can be expanded into its file list.
const imageModules = import.meta.glob('/assets/**/*.{jpg,jpeg,png,gif,webp,avif,svg,JPG,JPEG,PNG,GIF,WEBP,AVIF,SVG}', { eager: true, import: 'default' });

export function resolveImages(image) {
  if (!image) return [];
  if (IMAGE_EXT_RE.test(image)) return [image];
  const prefix = (image.startsWith('/') ? image : `/${image}`).replace(/\/?$/, '/');
  return Object.keys(imageModules)
    .filter((path) => path.startsWith(prefix))
    .sort()
    .map((path) => imageModules[path]);
}

export function ProjectCard({ title, year, role, tags = [], image, onClick }) {
  const [hover, setHover] = React.useState(false);
  const images = React.useMemo(() => resolveImages(image), [image]);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!hover || images.length <= 1) {
      setIndex(0);
      return undefined;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), CYCLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [hover, images.length]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      <div style={{
        aspectRatio: '4 / 3',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: images.length ? undefined : 'linear-gradient(160deg, #1D1B17, #0A0A0A)',
        border: '1px solid var(--border-hairline)',
        position: 'relative',
      }}>
        {images.length === 0 && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', font: 'var(--text-mono)', letterSpacing: 'var(--tracking-wide)',
          }}>IMAGE</div>
        )}
        {images.map((src, i) => (
          <div key={src} style={{
            position: 'absolute', inset: 0,
            background: `center/cover no-repeat url(${src})`,
            opacity: i === index ? 1 : 0,
            transition: 'opacity var(--duration-slow) var(--ease-cinematic)',
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.35), transparent 40%)',
          opacity: hover ? 1 : 0, transition: 'opacity var(--duration-base) var(--ease-cinematic)',
        }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-3)' }}>
          <h3 style={{
            font: 'var(--text-display-3)', color: 'var(--text-primary)', margin: 0,
            transition: 'color var(--duration-fast) var(--ease-standard)',
            ...(hover ? { color: 'var(--accent)' } : {}),
          }}>{title}</h3>
          <span style={{ font: 'var(--text-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{year}</span>
        </div>
        {role && <p style={{ font: 'var(--text-body-sm)', color: 'var(--text-secondary)', margin: 0 }}>{role}</p>}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
            {tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
      </div>
    </div>
  );
}
