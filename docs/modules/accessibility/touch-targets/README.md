---
title: Touch Targets
prerequisites:
  - css/css-box-model
---

# Touch Targets and Spacing

## Touch targets and spacing

An interactive element that's hard to hit is an accessibility problem, not just an annoyance. It affects people with motor impairments and tremors most, and everyone on a phone on a bus.

The guideline is a minimum of **24 by 24 CSS pixels** for any target, with 44 by 44 a better goal for primary actions on touch screens. Padding is how you get there without making the text bigger:

```css
.nav a {
  display: inline-block;
  padding: 12px 16px;
}
```

That `display: inline-block` matters. Vertical padding on a plain inline element doesn't increase its clickable area the way you'd expect, so the target stays small even though it looks bigger.

Also leave space between adjacent targets. Two links directly touching each other are easy to mis-tap.

## The checklist

Run this over your interface before you move on:

- Touch targets at least 24 by 24 pixels, 44 by 44 for primary actions
- Padding applied on a `display: inline-block` or `block` element, not a plain inline one
- Real space left between adjacent targets

## Keep learning

- [The a11y project checklist](https://www.a11yproject.com/checklist/). A practical list to work through on a real project, including touch target sizing.
