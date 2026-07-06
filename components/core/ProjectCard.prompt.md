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
