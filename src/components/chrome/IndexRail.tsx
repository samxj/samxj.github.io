import { useState } from 'react';
import { sectionIndex } from '../../content/sections';

interface IndexRailProps {
  active: number;
}

/**
 * The right-edge index. Labels are collapsed until the rail as a whole is hovered
 * or receives focus — one group hover, not nine separate ones.
 */
export function IndexRail({ active }: IndexRailProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav
      className={`rail${expanded ? ' rail--expanded' : ''}`}
      aria-label="Sections"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setExpanded(false);
      }}
    >
      {sectionIndex.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`rail__item${i === active ? ' rail__item--active' : ''}`}
          aria-current={i === active ? 'true' : undefined}
        >
          <span className="rail__label">{section.label}</span>
          <span className="rail__dash" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
