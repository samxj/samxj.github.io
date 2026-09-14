import type { CSSProperties } from 'react';
import type { Block, Inline, Project } from '../../content/projects';
import { MediaSlot } from './MediaSlot';
import { VideoSlot } from './VideoSlot';

function InlineText({ content }: { content: Inline[] }) {
  return (
    <>
      {content.map((part, i) =>
        typeof part === 'string' ? (
          part
        ) : (
          <a key={i} className="panel__link" href={part.href}>
            {part.text}
          </a>
        ),
      )}
    </>
  );
}

function PanelBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case 'heading':
      return <h4 className="panel__h4">{block.text}</h4>;
    case 'paragraph':
      return (
        <p className="panel__p">
          <InlineText content={block.content} />
        </p>
      );
    case 'list':
      return (
        <ul className="panel__list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'pullquote':
      return <p className="panel__pullquote">{block.text}</p>;
    case 'note':
      return <div className={`panel__note panel__note--${block.tone}`}>{block.text}</div>;
    case 'excerpt':
      return (
        <div className="panel__excerpt">
          <div className="panel__excerpt-eyebrow mono">{block.eyebrow}</div>
          <h5 className="panel__excerpt-title">{block.title}</h5>
          {block.paragraphs.map((paragraph, i) => (
            <p key={i} className="panel__excerpt-p">
              {paragraph}
            </p>
          ))}
        </div>
      );
    case 'media':
      return (
        <div
          className="panel__media"
          /* Set as a custom property so the mobile breakpoint can override it. */
          style={{ '--panel-media-columns': block.columns, gap: block.gap } as CSSProperties}
        >
          {block.items.map((item, i) =>
            item.type === 'video' ? (
              <VideoSlot key={i} src={item.src} alt={item.alt} aspect={item.aspect} size="sm" />
            ) : (
              <MediaSlot
                key={i}
                src={item.src}
                alt={item.alt}
                aspect={item.aspect}
                background="#161513"
              />
            ),
          )}
        </div>
      );
  }
}

/** The body of one detail panel. Every panel follows the same template. */
export function ProjectPanel({ project, titleId }: { project: Project; titleId: string }) {
  return (
    <article className="panel">
      <div className={`panel__eyebrow panel__eyebrow--${project.accent} mono`}>{project.eyebrow}</div>
      <h3 id={titleId} className="panel__title">
        {project.title}
      </h3>
      <div className="panel__facts mono">
        {project.facts.map((fact) => (
          <div key={fact.label}>
            {fact.label}
            <span className={fact.highlight ? 'panel__fact-value acid' : 'panel__fact-value'}>
              {fact.value}
            </span>
          </div>
        ))}
      </div>
      {project.blocks.map((block, i) => (
        <PanelBlock key={i} block={block} />
      ))}
    </article>
  );
}
