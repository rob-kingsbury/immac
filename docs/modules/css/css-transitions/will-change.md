---
title: will-change
prerequisites:
  - css/css-transitions
  - css/css-transforms
---

# Going Deeper: will-change

*Optional, and skipping it costs you nothing.*

[Transforms](/modules/css/css-transforms/README.md) explains why `transform` and `opacity` are cheap to animate: the browser handles them late in rendering, separately from the rest of the page, so nothing else has to be recalculated. `will-change` is a property that tries to buy the browser even more lead time, by naming which properties on an element are about to change so it can prepare ahead of the change itself, rather than reacting to it.

```css
.trail:hover,
.trail:focus-visible {
  will-change: transform, box-shadow;
  transform: translateY(-4px);
}
```

It reads like a free upgrade, and MDN is direct about why it isn't. The browser is already trying to optimize everything on the page. Applying `will-change` to a lot of elements, or leaving it in place permanently, works against that: it reserves memory and rendering resources for changes that aren't actually happening most of the time, which can slow a page down instead of speeding it up. MDN's own guidance treats it as a response to a performance problem you've actually measured, not something to add in advance in case you need it.

The other half of the guidance is timing. The ideal pattern is to apply `will-change` shortly before a change starts and remove it once the change finishes, which MDN's example does with JavaScript: a `mouseenter` listener sets it, and the transition's end event clears it back to `auto`. That's outside what this course covers. The CSS-only approximation is what the example above does: scope `will-change` to the same `:hover` and `:focus-visible` rule that triggers the animation, rather than declaring it on the base rule where it would sit on the element for the entire life of the page. It's less precise than the scripted version, but it's a long way from the actual mistake, which is treating `will-change` as a default you add to every animated element.

For a hover state on a handful of cards, none of this is likely to matter, because `transform` and `opacity` are already handled efficiently on their own. `will-change` earns its place on something animating often, at scale, or on a device where you've actually watched the interface stutter. Reach for it when you've measured a problem, not as a habit.

## Keep learning

- [MDN: will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change). The full property reference, including the performance guidance summarized above.
