---
title: Container Queries
prerequisites:
  - css/css-media-queries
  - css/css-fluid-sizing
---

# Container Queries: Responding to a Component's Own Space, Not the Screen

Media queries react to one thing: **the size of the whole browser window.** That's the right question for a page's overall structure. It's the wrong question for a single reusable piece of it.

Picture a card component you intend to use in two places on the same page: full width in the main column, and narrow inside a sidebar. A media query can't tell those two spots apart. It only knows the viewport is, say, 1200 pixels wide, and it applies the same rule to the card everywhere that card appears, regardless of which column it landed in.

**A container query answers a different question: how much space does *this component itself* actually have, right now, in whatever it's sitting inside?** The viewport can be exactly the same size in both cases:

<div class="diagram">
<svg viewBox="0 0 520 260" role="img" aria-label="Two browser windows of identical width. In the left window, a card sits inside a narrow sidebar and stacks its content vertically. In the right window, the same card sits inside a wide main column and lays its content out horizontally. The viewport width is the same in both; only the card's own container width differs.">
  <text x="130" y="18" text-anchor="middle" class="d-lbl-muted">SAME VIEWPORT WIDTH</text>
  <text x="390" y="18" text-anchor="middle" class="d-lbl-muted">SAME VIEWPORT WIDTH</text>

  <rect x="20" y="28" width="220" height="210" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <circle cx="34" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <circle cx="44" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <circle cx="54" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <line x1="20" y1="52" x2="240" y2="52" class="d-border" stroke-width="1"/>
  <rect x="34" y="66" width="70" height="150" class="d-border" fill="none" stroke-dasharray="3 2"/>
  <text x="69" y="80" text-anchor="middle" class="d-lbl-muted" font-size="9">narrow</text>
  <text x="69" y="92" text-anchor="middle" class="d-lbl-muted" font-size="9">container</text>
  <rect x="40" y="102" width="58" height="100" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="48" y="110" width="42" height="30" rx="3" fill="var(--vp-c-text-accent, #3b82f6)" opacity="0.5"/>
  <text x="69" y="158" text-anchor="middle" class="d-lbl-mono" font-size="9">title</text>
  <text x="69" y="172" text-anchor="middle" class="d-lbl-mono" font-size="9">text</text>
  <text x="69" y="186" text-anchor="middle" class="d-lbl-mono" font-size="9">stacked</text>

  <rect x="280" y="28" width="220" height="210" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <circle cx="294" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <circle cx="304" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <circle cx="314" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <line x1="280" y1="52" x2="500" y2="52" class="d-border" stroke-width="1"/>
  <rect x="294" y="66" width="192" height="150" class="d-border" fill="none" stroke-dasharray="3 2"/>
  <text x="390" y="80" text-anchor="middle" class="d-lbl-muted" font-size="9">wide container</text>
  <rect x="304" y="100" width="172" height="70" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="312" y="108" width="54" height="54" rx="3" fill="var(--vp-c-text-accent, #3b82f6)" opacity="0.5"/>
  <text x="420" y="126" class="d-lbl-mono" font-size="9">title</text>
  <text x="420" y="140" class="d-lbl-mono" font-size="9">text, side</text>
  <text x="420" y="154" class="d-lbl-mono" font-size="9">by side</text>
</svg>
</div>

Same card, same rule written once, two different results, because the rule asked about the container, not the window.

## Setting it up

Container queries need two steps: mark an element as a **container** for its descendants to query, then write a query that targets that container.

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: 16px;
  }
}
```

`container-type: inline-size` tells the browser to track this element's width and let descendants query it. `container-name` is optional, a label so a query can target a specific ancestor when more than one container might otherwise apply. The `@container` block reads almost exactly like `@media`, `min-width` and all, except the width it's measuring is the named container's, not the viewport's.

Browser support for this is solid. The W3C CSS Validator has not caught up yet and will report an error here. That is the tool lagging the specification, not a problem with your code.

<CssDemo>

```html
<div class="wrapper narrow">
  <div class="card">
    <div class="thumb"></div>
    <div class="body">
      <strong>Lakeside Loop</strong>
      <p>4 km, easy</p>
    </div>
  </div>
</div>
<div class="wrapper wide">
  <div class="card">
    <div class="thumb"></div>
    <div class="body">
      <strong>Lakeside Loop</strong>
      <p>4 km, easy</p>
    </div>
  </div>
</div>
```

```css
.wrapper {
  container-type: inline-size;
  border: 1px dashed #94a3b8;
  padding: 10px;
  margin-bottom: 10px;
  font-family: system-ui, sans-serif;
}
.narrow { width: 160px; }
.wide { width: 100%; }
.card {
  background-color: #f1f5f9;
  border-radius: 6px;
  padding: 10px;
}
.thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #cbd5e1;
  border-radius: 4px;
}
@container (min-width: 320px) {
  .card {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .thumb {
    width: 90px;
    flex-shrink: 0;
  }
}
```

</CssDemo>

Same card markup, same CSS, and it lays out differently depending on which wrapper it's inside. Resize your browser and nothing changes, because neither wrapper's width depends on the viewport. That's the point.

## Container query units

Just as `vw` and `vh` measure against the viewport, `cqw` and `cqi` measure against the nearest container. `cqi` matches the container's **inline size**, which is its width in the normal left-to-right, top-to-bottom writing direction this course uses. A heading that should scale with its own container, not the whole page, can use it exactly like `clamp()` used `vw` in [Fluid Sizing Without a Query](/modules/css/css-fluid-sizing/README.md):

```css
.card h3 {
  font-size: clamp(1rem, 4cqi, 1.5rem);
}
```

That heading grows and shrinks with the *card's* width, whichever container the card happens to be sitting in, completely independent of the browser window.

## Media queries or container queries?

You now have two tools that look similar and answer different questions. The rule that separates them:

**Use media queries for your page's overall structure. Use container queries for the components inside it.**

| Property | Media queries | Container queries |
|---|---|---|
| Reacts to | the viewport | the nearest container |
| Best for | page-level layout, navigation, global grid changes | reusable components: cards, sidebars, anything used in more than one spot |
| Example | collapse a three-column page into one column on a phone | a card that switches from stacked to side-by-side once *it* has enough room, wherever it's placed |

Container queries don't replace media queries, and there's a specific, permanent reason for that: **some questions are viewport questions and cannot be asked any other way.** A container has no idea what device it's on, whether the visitor prefers reduced motion, or whether the page is being printed. Those live only at the level of the whole browser and the user's system, so media queries stay essential for:

- **User and system preferences.** `prefers-color-scheme`, covered in [CSS Custom Properties and Variables](/modules/css/custom-properties.md), and `prefers-reduced-motion`, covered in [Reduced Motion](/modules/accessibility/reduced-motion/README.md), only exist as media features.
- **Orientation and device characteristics.** Portrait versus landscape, or a `print` stylesheet for a page heading to a printer, are viewport-level questions by definition.
- **Global layout decisions.** The page's own header, primary navigation, and outermost grid respond to the screen the visitor actually has, not to a container, because at that level the container *is* the viewport.

So the practical habit: reach for a media query when you're deciding how the *page* is arranged, and a container query when you're deciding how one *reusable piece* of it behaves, wherever it ends up living.

## Common mistakes to avoid

- **Reaching for a container query when a media query was the right tool.** A page's own header and primary navigation are viewport-level decisions. Save container queries for reusable components.

## The checklist

Run this over your components before you move on:

- Can explain when a container query is the right tool and when a media query is
- Used a container query on at least one reusable component, with `container-type` set on its wrapper

## Keep learning

- [MDN: CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries). The complete guide, including container types beyond `inline-size`.
