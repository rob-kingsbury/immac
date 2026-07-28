---
title: Visually Hidden
prerequisites:
  - accessibility/skip-navigation
---

# Accessible Hiding

## Accessible hiding

Sometimes you want content available to a screen reader but not shown on screen, most often a label or a heading that would be visually redundant. There's a right way and several wrong ways to do it.

**`display: none` and `visibility: hidden` hide content from everyone**, including assistive technology. That's correct when the content is genuinely irrelevant, and wrong when you meant "visually hidden only."

The pattern that works keeps the element rendered but clipped to nothing:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

It looks like a hack because it is one, but it's the long-standing standard implementation, and it's worth keeping in your stylesheet by name. Use it for things like a "Search" label on a search box whose purpose is obvious visually from an icon, but which a screen reader user needs announced.

<div class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-label="Two views of the same search box compared. On the left, what a sighted visitor sees: a search icon and an input field, with no visible text label. A dashed callout shows that the .visually-hidden label still exists in the layout, clipped to a 1 pixel box rather than deleted. On the right, what a screen reader announces for the same element: the words Search, edit text, spoken aloud, because the label is still present in the accessibility tree even though nothing about it is visible on screen.">
  <text x="10" y="18" class="d-lbl">What a sighted visitor sees</text>
  <rect x="10" y="30" width="290" height="185" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="30" y="55" width="250" height="36" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <circle cx="50" cy="73" r="7" fill="none" class="d-muted-stroke" stroke-width="2"/>
  <line x1="55" y1="78" x2="62" y2="85" class="d-muted-stroke" stroke-width="2"/>
  <text x="68" y="78" class="d-lbl-mono">type to search…</text>
  <circle cx="30" cy="55" r="2.5" class="d-accent"/>
  <line x1="30" y1="55" x2="30" y2="112" stroke-dasharray="3 3" class="d-muted-stroke" stroke-width="1.5"/>
  <rect x="30" y="112" width="250" height="50" rx="6" fill="none" class="d-accent-stroke" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="40" y="132" class="d-lbl-mono">"Search" label</text>
  <text x="40" y="150" class="d-lbl-muted">clipped to 1px, still in the DOM</text>

  <text x="340" y="18" class="d-lbl">What a screen reader announces</text>
  <rect x="340" y="30" width="290" height="185" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="360" y="55" width="250" height="36" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="370" y="78" class="d-lbl-mono">"Search, edit text"</text>
  <path d="M 592 68 q 6 8 0 16" fill="none" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 599 63 q 11 13 0 26" fill="none" class="d-accent-stroke" stroke-width="2"/>
  <text x="360" y="132" class="d-lbl-muted">Same element as the left panel.</text>
  <text x="360" y="150" class="d-lbl-muted">Nothing is visible, but it's still announced.</text>
</svg>
<figcaption>The <code>.visually-hidden</code> label is never deleted, only clipped to a 1 pixel box. A sighted visitor sees the icon and nothing else. A screen reader still finds the label, because the element is still present in the accessibility tree.</figcaption>
</div>

Two related points. Setting `font-size: 0` or `color: transparent` to hide text is not equivalent and causes other problems. And a skip navigation link, which you met in [Skip Navigation](/modules/accessibility/skip-navigation/README.md), is the classic case where content should be visually hidden **until focused**, then appear:

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 100;
  background: #ffffff;
  padding: 8px 16px;
}
.skip-link:focus {
  top: 0;
}
```

The `top: -100px` alone gets it off-screen, but three more properties are what make it actually work on a real page. `left: 0` pins its horizontal position, since a plain `position: absolute` element with no `left` set can drift depending on whatever else is in the layout. `z-index` puts it above a header or hero image that would otherwise sit on top of it the moment it becomes visible. `background` gives the text something solid behind it instead of whatever's on the page underneath, which might make it unreadable or invisible depending on colour. Skip the last three and the link technically exists and even passes an automated audit, but a real keyboard user who tabs to it may not be able to see or read it.

## The checklist

Run this over your stylesheet before you move on:

- `.visually-hidden` used for screen-reader-only content, never `display: none`
- Skip link hidden until focused, with `left`, `z-index`, and `background` set so it's actually visible when it appears

## Keep learning

- [The a11y project checklist](https://www.a11yproject.com/checklist/). A practical list to work through on a real project.
