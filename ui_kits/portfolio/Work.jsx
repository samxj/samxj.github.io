import React from 'react';
import { SectionHeading } from '../../components/core/SectionHeading.jsx';
import { ProjectCard, resolveImages } from '../../components/core/ProjectCard.jsx';
import { Tag } from '../../components/core/Tag.jsx';
import { Button } from '../../components/core/Button.jsx';
import { content as sjhwContent } from './work-content/st-johns-hampton-wick.js';
import { content as seedPlaneContent } from './work-content/ai-seed-dropping-plane.js';
import { content as immAroyContent } from './work-content/imm-aroy-restaurant.js';
import { content as journalsContent } from './work-content/christian-youth-journals.js';
import { content as redRobinContent } from './work-content/red-robin-art-studio.js';
import { content as chanctonburyContent } from './work-content/chanctonbury-church.js';
import { content as puddingTrolley } from './work-content/pudding-trolley.js';
import { content as leuiraciu } from './work-content/leuiraciu.js';
import { content as italyDrone } from './work-content/italy-drone.js';
import { content as florentineSKies } from './work-content/florentine-skies.js';
import { content as lexitecht } from './work-content/lexitecht.js';
import { content as unsplash } from './work-content/unsplash.js';

const projects = [
  { title: "St John's Hampton Wick Films", image: "assets/images/sjhw", year: '2025 - present day', role: 'Solo production projects for local church', tags: ['Photography', 'Videography', 'Promo Film', 'Premiere Pro'], content: sjhwContent },
  { title: 'AI Seed-Dropping RC Plane', year: '2025', role: 'Autonomous RC plane powered by AI to drop seeds in fertile ground.', tags: ['STEM Fair Winner', 'Machine Learning', 'CAD'], content: seedPlaneContent },
  { title: 'Imm-Aroy Restaurant', year: '2025', role: 'Marketing photography', tags: ['Photography', 'Lightroom'], content: immAroyContent },
  { title: 'Motorised Pudding Trolley', year: '2025', role: "Full design and assembly of an RC car, calculated in design to bear the load of a trolley", tags: ['3D Printing', 'Electronics'], content: puddingTrolley},
  { title: 'Leúiraciu', year: '2024', role: "Full, detailed construction of a language", tags: ['Linguistics', "Won Headmaster's Award"], content: leuiraciu},
  { title: 'Florentine Skies', year: '2024', role: "Nationally shortlisted short fiction", tags: ['Literature', "Creative Writing"], content: florentineSKies},
  { title: 'Christian Youth Journals', year: '2023–24', role: 'Full planning, design and sale', tags: ['InDesign', 'Illustrator', 'Sales Management'], content: journalsContent },
  { title: 'Red Robin Art Studio', year: '2023', role: 'Promotional film', tags: ['Videography'], content: redRobinContent },
  { title: 'La Torre di Sopra - drone shots', year: '2023', role: 'Operated a DJI Mavic Pro for marketing shots on torredisopra.com', tags: ['Videography', 'Drone'], content: italyDrone },
  { title: 'Lexitecht', year: "2023", role: "Python dektop app to aid language construction", tags: ["Linguistics", "Software"], content: lexitecht},
  { title: 'Chanctonbury Church', year: '2022', role: 'Promotional film', tags: ['Videography', 'Early Work'], content: chanctonburyContent },
  { title: 'Unsplash Account', year: '2021 - present day', role: 'Public photography account with 4M views and 35K+ downloads', tags: ['Photography'], content: unsplash }
];

function ArticleImage({ src, caption }) {
  const images = resolveImages(src);
  if (images.length === 0) return null;
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <div style={{
        aspectRatio: '16 / 9',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-hairline)',
        background: `center/cover no-repeat url(${images[0]})`,
      }} />
      {caption && (
        <figcaption style={{ font: 'var(--text-mono)', color: 'var(--text-muted)' }}>{caption}</figcaption>
      )}
    </figure>
  );
}

// Groups the flat block list into rows of "text accumulated since the last image" + "that image",
// so each image sits beside the text that led up to it (side by side on wide screens, aligned to the same top).
// Rows alternate text-left/image-right and image-left/text-right, resetting to text-left whenever
// a row's text includes a subheading.
function groupIntoRows(content) {
  const rows = [];
  let textRun = [];
  content.forEach((block, i) => {
    if (block.type === 'image') {
      rows.push({ text: textRun, image: { block, i } });
      textRun = [];
    } else {
      textRun.push({ block, i });
    }
  });
  if (textRun.length > 0) rows.push({ text: textRun, image: null });

  let swapped = false;
  rows.forEach((row) => {
    if (row.text.some(({ block }) => block.type === 'heading')) swapped = false;
    row.swapped = swapped;
    swapped = !swapped;
  });
  return rows;
}

function renderTextBlock({ block, i }, content) {
  if (block.type === 'paragraph') {
    return <p key={i} style={{ font: 'var(--text-body)', color: 'var(--text-secondary)', margin: 0 }}>{block.text}</p>;
  }
  if (block.type === 'heading') {
    const precededByParagraph = content[i - 1]?.type === 'paragraph';
    return (
      <h4 key={i} style={{
        font: 'var(--text-display-3)', fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0,
        ...(precededByParagraph ? { marginTop: 'var(--space-6)' } : {}),
      }}>{block.text}</h4>
    );
  }
  return null;
}

function ProjectArticle({ content }) {
  const rows = React.useMemo(() => groupIntoRows(content), [content]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {rows.map((row, ri) => (
        <div key={ri} className={`article-row${row.swapped ? ' article-row--reverse' : ''}`} style={{ gap: 'var(--space-6)' }}>
          {row.text.length > 0 && (
            <div style={{ flex: '1 1 0', minWidth: 0, maxWidth: '68ch', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {row.text.map((entry) => renderTextBlock(entry, content))}
            </div>
          )}
          {row.image && (
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <ArticleImage src={row.image.block.src} caption={row.image.block.caption} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectDetail({ project, onBack }) {
  const heroImages = resolveImages(project.image);
  const hasArticle = project.content && project.content.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingLeft: 'var(--space-6)' }}>
      <Button variant="ghost" onClick={onBack} style={{ alignSelf: 'flex-start' }}>← All work</Button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <h3 style={{ font: 'var(--text-display-2)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)', margin: 0 }}>{project.title}</h3>
        <span style={{ font: 'var(--text-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{project.year}</span>
      </div>
      {project.role && <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-secondary)', margin: 0 }}>{project.role}</p>}
      {project.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {project.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}

      {hasArticle ? (
        <ProjectArticle content={project.content} />
      ) : (
        <div style={{
          aspectRatio: '16 / 9',
          maxWidth: '68ch',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: heroImages.length ? `center/cover no-repeat url(${heroImages[0]})` : 'linear-gradient(160deg, #1D1B17, #0A0A0A)',
          border: '1px solid var(--border-hairline)',
          position: 'relative',
        }}>
          {heroImages.length === 0 && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', font: 'var(--text-mono)', letterSpacing: 'var(--tracking-wide)',
            }}>IMAGE</div>
          )}
        </div>
      )}
    </div>
  );
}

export function Work() {
  const [selected, setSelected] = React.useState(null);
  const [displayed, setDisplayed] = React.useState(null);

  const openProject = (p) => {
    setDisplayed(p);
    setSelected(p);
  };
  const closeProject = () => setSelected(null);

  return (
    <div style={{ padding: 'var(--space-9) var(--gutter)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <SectionHeading index="02" eyebrow="Selected Work" title="Things I've made" />
      <div style={{ height: '2px', background: 'var(--accent)', marginLeft: 'calc(-1 * var(--gutter))', marginRight: 'calc(-1 * var(--gutter))' }} />
      <div style={{ overflow: 'hidden' }}>
        <div
          onTransitionEnd={(e) => { if (e.target === e.currentTarget && !selected) setDisplayed(null); }}
          style={{
            display: 'flex',
            width: '200%',
            transform: selected ? 'translateX(-50%)' : 'translateX(0%)',
            transition: 'transform var(--duration-reveal) var(--ease-cinematic)',
          }}
        >
          <div style={{ width: '50%', flexShrink: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} onClick={() => openProject(p)} />
            ))}
          </div>
          <div style={{ width: '50%', flexShrink: 0 }}>
            {displayed && <ProjectDetail project={displayed} onBack={closeProject} />}
          </div>
        </div>
      </div>
    </div>
  );
}
