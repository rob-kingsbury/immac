---
title: Reduced Motion
prerequisites:
  - accessibility/wcag
---

# Motion and Accessibility

This is the part of working with animation that isn't optional.

For people with vestibular disorders, motion on screen can cause nausea, dizziness, and headaches. Large movements, parallax, and anything that scales or slides across a lot of the viewport are the worst offenders. Operating systems provide a "reduce motion" setting for this, and CSS can read it.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

That block is the widely used blunt version, and it's a reasonable default to keep at the bottom of your stylesheet. It's also one of the very few legitimate uses of `!important`, because it needs to override whatever any other rule set.

A more considered approach reverses the default: write no motion as the base, then add it only for people who haven't asked for less.

```css
.card {
  /* no transition by default */
}
@media (prefers-reduced-motion: no-preference) {
  .card {
    transition: transform 200ms ease;
  }
}
```

Either approach is acceptable. What isn't acceptable is animation with no reduced-motion handling at all.

Three further rules. **Motion must never be the only signal**, so a state change that's communicated by movement also needs a colour, text, or icon change. **Nothing should flash more than three times per second**, because that can trigger seizures. And **never animate something the user didn't initiate** and can't stop, which is why auto-playing carousels are so widely disliked.

## The checklist

Run this over your stylesheet before you move on:

- `prefers-reduced-motion` guard present in the stylesheet, either the blunt override or the reversed-default pattern
- Motion is never the only signal of a state change
- Nothing flashes more than three times per second
- No animation starts automatically without a way for the visitor to stop it

## Keep learning

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). The media feature and how to use it well.
- [WCAG: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). The success criterion behind the reduced-motion requirement.
