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

Two more relative units are common enough to name here, and you'll see both properly below. `rem` measures against the root font size, and is covered in depth in [Typography](/modules/css/css-typography/README.md). `vw` and `vh` measure against the viewport, and that's the pair worth understanding precisely, because one of them has a real bug on phones.

## Viewport units, and the mobile browser bug they fix

**Viewport units** measure against the browser's viewport rather than a parent. `1vw` is 1% of the viewport's width, `1vh` is 1% of its height. A box set to `width: 100vw; height: 100vh;` fills the screen, full stop, no matter what its parent is doing.

That's exactly the tool for a full-screen hero section, and for years `100vh` was the standard way to build one. It has a real bug on phones, though, and it's common enough to be worth understanding precisely rather than working around by accident.

**A phone's browser chrome, the address bar and toolbar, can show or hide as you scroll.** When it's showing, it takes up real screen space. When it hides, the page gets taller. `100vh` was defined against the *larger* of those two states, the one with the chrome hidden. So the moment the chrome is actually showing, which is most of the time, a `100vh` box is taller than what's genuinely visible, and its bottom portion sits behind the browser's own <abbr title="User Interface">UI</abbr> or pushes the page into an unwanted scroll.

<div class="diagram">
<svg viewBox="0 0 520 340" role="img" aria-label="Two identical phones, both with the browser address bar visible. On the left, a box sized with 100vh is calculated for the larger viewport the chrome would allow, so it extends past the visible screen and is cut off at the bottom. On the right, the same box sized with 100dvh matches the actual current visible area exactly, with no overflow.">
  <text x="115" y="24" text-anchor="middle" class="d-lbl-muted">100vh</text>
  <rect x="20" y="34" width="190" height="290" rx="20" class="d-surface d-border" stroke-width="2"/>
  <rect x="34" y="50" width="162" height="26" rx="4" class="d-muted-stroke" fill="var(--vp-c-bg-soft, #f6f6f7)" stroke-width="1"/>
  <circle cx="46" cy="63" r="3" class="d-muted-stroke" fill="var(--vp-c-text-2, #5c6773)"/>
  <text x="58" y="67" class="d-lbl-mono" font-size="9">example.com</text>
  <text x="34" y="90" class="d-lbl-muted" font-size="9">address bar, visible</text>
  <rect x="34" y="98" width="162" height="256" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <line x1="34" y1="300" x2="196" y2="300" class="d-border" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="115" y="290" text-anchor="middle" class="d-lbl-mono" font-size="10">box continues,</text>
  <text x="115" y="316" text-anchor="middle" class="d-lbl-muted" font-size="9">hidden below the fold</text>

  <path d="M225 170 L295 170" class="d-accent-stroke" stroke-width="2" marker-end="url(#vh-arrow)"/>

  <text x="405" y="24" text-anchor="middle" class="d-lbl-muted">100dvh</text>
  <rect x="310" y="34" width="190" height="290" rx="20" class="d-surface d-accent-stroke" stroke-width="2"/>
  <rect x="324" y="50" width="162" height="26" rx="4" class="d-muted-stroke" fill="var(--vp-c-bg-soft, #f6f6f7)" stroke-width="1"/>
  <circle cx="336" cy="63" r="3" class="d-muted-stroke" fill="var(--vp-c-text-2, #5c6773)"/>
  <text x="348" y="67" class="d-lbl-mono" font-size="9">example.com</text>
  <text x="324" y="90" class="d-lbl-muted" font-size="9">address bar, visible</text>
  <rect x="324" y="98" width="162" height="212" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="405" y="210" text-anchor="middle" class="d-lbl-mono" font-size="10">fits exactly</text>

  <defs>
    <marker id="vh-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="var(--vp-c-text-accent, #3b82f6)"/>
    </marker>
  </defs>
</svg>
</div>

**`dvh`, the dynamic viewport height unit, fixes this by tracking whatever is actually visible right now.** As the chrome shows and hides, `100dvh` updates to match, so the box never overflows and never leaves an unexpected gap.

```css
.hero {
  height: 100dvh;
}
```

Two related units round out the family, and you'll see them named in other people's code even if you reach for `dvh` most often yourself. `svh`, the small viewport height, is always calculated as if the chrome is fully showing, the smallest the visible area ever gets. `lvh`, the large viewport height, is calculated as if the chrome is fully hidden, which is the same number the old, buggy `100vh` used. `dvh` is the one that actually tracks reality as it changes, and it's the one to default to for anything meant to fill the screen.

`vw` doesn't have the same chrome-related bug, since browser chrome eats vertical space, not horizontal. It has a different one worth knowing instead: on a desktop browser with a visible scrollbar, `100vw` includes the scrollbar's own width, which `100%` does not. An element set to `width: 100vw` can end up slightly wider than the actual visible page, causing a faint horizontal scroll that's easy to miss until you notice it. `width: 100%` is the safer default for full-width elements; reach for `100vw` only when you deliberately need to measure the true viewport, scrollbar included.

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
- **Using `100vh` for a full-screen mobile section.** Use `100dvh` instead, so it doesn't overflow behind the browser's address bar.
- **Using `100vw` for a full-width element.** On desktop, it includes the scrollbar's width, which `100%` doesn't, so it can cause the exact faint horizontal scroll it looks like it should prevent.

## The checklist

Run this over your stylesheet before you move on:

- You know which base a `%` value resolves against for the property you're using, padding especially
- You reach for `min-width` or `max-width` instead of a fixed value when a box needs a floor or a ceiling, not an exact size
- `dvh` used instead of `100vh` for anything meant to fill the screen

## Keep learning

- [MDN: Values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units). The full reference for absolute and relative units.
- [MDN: Viewport concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_viewport_units). The full explanation of `vh`, `dvh`, `svh`, and `lvh`.
