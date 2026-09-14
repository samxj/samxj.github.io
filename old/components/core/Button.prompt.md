The one bold accent, used deliberately. `primary` is filled flame-orange — reserve for the single most important action on screen. `secondary` is a cream hairline outline for everything else clickable-and-important. `ghost` is bare text, for inline/tertiary actions.

```jsx
<Button variant="primary" icon="arrow">Get in touch</Button>
<Button variant="secondary" href="/cv.pdf">Download CV</Button>
<Button variant="ghost" size="sm">See all work</Button>
```

Sizes: `sm` / `md` (default) / `lg` for hero CTAs. `icon="arrow"` adds a trailing arrow that nudges right on hover — the brand's signature micro-interaction.
