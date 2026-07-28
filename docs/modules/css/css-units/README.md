---
title: CSS Units
prerequisites:
  - css/css-box-model
---

# Units: Absolute Versus Relative

Every size in CSS needs a unit. Before writing much spacing, it's worth knowing what the alternatives actually mean, because the choice affects whether your layout holds together when the page changes.

An **absolute** unit always means the same physical size, no matter what's around it. `px` is the one you'll use most, and one pixel is one pixel whether it's inside a tiny card or a full-width banner.

A **relative** unit is measured against something else: the size of the parent, the size of the root, or the size of the viewport. Change that something else, and the relative value changes with it automatically.

`%` is the relative unit you'll meet constantly, and it needs care, because **a percentage doesn't mean the same thing on every property.** It always resolves against a base, and the base depends on which property you're setting.

<CssDemo>

```html
<div class="parent">
  Parent: 300px wide, 150px tall
  <p class="p-width">width: 50%</p>
  <p class="p-padding">padding: 10%</p>
</div>
```

```css
.parent {
  width: 300px;
  height: 150px;
  background-color: #f1f5f9;
  border: 2px dashed #94a3b8;
  padding: 8px;
  font-family: system-ui, sans-serif;
  font-size: 0.85rem;
}
.p-width {
  width: 50%;
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  margin: 6px 0;
}
.p-padding {
  padding: 10%;
  background-color: #fef3c7;
  border: 1px solid #fbbf24;
  margin: 6px 0;
}
```

</CssDemo>

`width: 50%` resolves against the **parent's width**, so it's 150px here. That one is intuitive. `padding: 10%` is the one that catches people, because padding's percentage, on every side including top and bottom, resolves against the parent's **width** too, never its height. Set `padding: 10%` on a wide box and you get noticeably more vertical padding than you probably expected.

<div class="diagram">
<svg viewBox="0 0 640 190" role="img" aria-label="Three labelled boxes showing percentage resolving against different bases. Width at 50% measures against the parent's width. Padding at 10% also measures against the parent's width, even for top and bottom. Line-height at 150% measures against the element's own font size, not its parent.">
  <rect x="10" y="10" width="190" height="170" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="24" y="32" class="d-lbl-muted">WIDTH: 50%</text>
  <rect x="24" y="44" width="162" height="52" rx="4" fill="none" class="d-muted-stroke" stroke-dasharray="3 2"/>
  <rect x="24" y="44" width="81" height="52" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="64" y="74" text-anchor="middle" class="d-lbl-mono">50%</text>
  <line x1="24" y1="110" x2="186" y2="110" class="d-muted-stroke" stroke-width="1"/>
  <line x1="24" y1="107" x2="24" y2="113" class="d-muted-stroke" stroke-width="1"/>
  <line x1="186" y1="107" x2="186" y2="113" class="d-muted-stroke" stroke-width="1"/>
  <text x="105" y="128" text-anchor="middle" class="d-lbl-muted">parent's width</text>

  <rect x="225" y="10" width="190" height="170" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="239" y="32" class="d-lbl-muted">PADDING: 10%</text>
  <rect x="239" y="44" width="162" height="52" rx="4" fill="none" class="d-muted-stroke" stroke-dasharray="3 2"/>
  <rect x="239" y="58" width="162" height="24" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="320" y="74" text-anchor="middle" class="d-lbl-mono">10%</text>
  <text x="239" y="118" class="d-lbl-muted">top and bottom too,</text>
  <text x="239" y="131" class="d-lbl-muted">measured against width</text>

  <rect x="440" y="10" width="190" height="170" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="454" y="32" class="d-lbl-muted">LINE-HEIGHT: 150%</text>
  <text x="454" y="70" class="d-lbl-mono" font-size="18">Aa</text>
  <line x1="600" y1="46" x2="600" y2="80" class="d-accent-stroke" stroke-width="2"/>
  <text x="454" y="118" class="d-lbl-muted">of its own font size,</text>
  <text x="454" y="131" class="d-lbl-muted">not the parent at all</text>
</svg>
</div>

`line-height` at `150%` is different again: it resolves against the element's **own font size**, not its parent. Three properties, three different bases, one symbol. That's the reason [Typography](/modules/css/css-typography/README.md) prefers `rem` over `%` for font-related sizing, and it's why `%` is worth understanding precisely rather than by feel.

Two more relative units are common enough to name here, and you'll see both properly elsewhere. `rem` measures against the root font size. `vw` and `vh` measure against the viewport. Both are covered in depth when they matter: `rem` in [Typography](/modules/css/css-typography/README.md), viewport units in [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

## Going deeper: min-width, max-width, min-height, and max-height

`width` sets one exact value. `min-width`, `max-width`, `min-height`, and `max-height` set boundaries instead, limits a flexible size isn't allowed to cross.

`max-width` caps how large a box can grow. `width: 100%` alone means the box always fills its container exactly, on a phone and on a wide desktop monitor alike. Add `max-width: 320px` and the box still fills its container up to 320 pixels, but stops growing past that even if the container keeps getting wider.

<CssDemo>

```html
<div class="capped">width: 100%, max-width: 280px. I stop growing past 280px no matter how wide the container gets.</div>
```

```css
.capped {
  width: 100%;
  max-width: 280px;
  padding: 14px;
  background-color: #ecfccb;
  border: 2px solid #65a30d;
}
```

</CssDemo>

`min-width` is the opposite guarantee, a floor instead of a ceiling. A box with `width: 30%` shrinks along with its container, which is usually fine, until the container gets narrow enough that 30% is only 60 pixels and the text inside stops fitting comfortably. `min-width: 150px` stops the shrinking at 150 pixels, even when 30% of the container would be less.

`min-height` and `max-height` do the same job on the vertical axis, but you'll reach for them less often, because a box's height is normally decided by its content and its padding, not by a number you set. `min-height` is worth knowing for something like a card that should look consistent even when one has a short caption and another has three lines: set a `min-height` and the short card still occupies the same space, without forcing every card to that exact height the way a fixed `height` would.

None of this changes what `box-sizing: border-box`, covered in [Box Sizing](/modules/css/css-box-sizing/README.md), already does. If padding and border are counted inside `width`, they're counted inside `max-width` and `min-width` the same way, because it's the same box-sizing rule for the whole element.

## Common mistakes to avoid

- **Assuming `%` always means "of my own size."** It resolves against different bases depending on the property. Padding's percentage is always relative to the parent's width.

## The checklist

Run this over your stylesheet before you move on:

- You know which base a `%` value resolves against for the property you're using, padding especially
- You reach for `min-width` or `max-width` instead of a fixed value when a box needs a floor or a ceiling, not an exact size

## Keep learning

- [MDN: Values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units). The full reference for absolute and relative units.
