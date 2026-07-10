Work-sample card for the Work grid. 4:3 image (or placeholder) over a title/year/role/tags block. Title turns flame-orange on hover.

```jsx
<ProjectCard
  title="St John's Hampton Wick"
  year="2025"
  role="Director, camera, edit"
  tags={['Premiere Pro', 'Promo Film']}
  onClick={() => openProject('sjhw')}
/>
```

Omit `image` to render the mono "IMAGE" placeholder tile — never fake a photo with an SVG.

`image` can also be a directory path (e.g. `assets/images/project-x`) instead of a single file. At rest, the alphabetically-first image in that directory is shown; on hover, the card cycles through every image found there. Single-file and no-image behavior is unchanged.
