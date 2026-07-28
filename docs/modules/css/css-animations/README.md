---
title: Keyframe Animations
prerequisites:
  - css/css-transitions
  - accessibility/reduced-motion
---

# Keyframe Animations, Briefly

Transitions move between two states. When you need more than two, `@keyframes` defines a named sequence you can apply with the `animation` property.

<CssDemo>

```html
<p class="pulse">Gently pulsing</p>
```

```css
@keyframes pulse {
  0%   { opacity: 1; }
  50%  { opacity: 0.45; }
  100% { opacity: 1; }
}
.pulse {
  font-family: system-ui, sans-serif;
  font-weight: 700;
  color: #0e7490;
  animation: pulse 2s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .pulse { animation: none; }
}
```

</CssDemo>

Keyframes are worth knowing exist, and loading indicators are their honest use case. For most projects, transitions on interaction, covered in [Transitions](/modules/css/css-transitions/README.md), will cover almost everything, and they're far easier to keep tasteful.

Note the `prefers-reduced-motion: reduce` block in the demo above, turning the animation off entirely rather than just slowing it down. A repeating, indefinite animation like this one is exactly the kind of motion [Reduced Motion](/modules/accessibility/reduced-motion/README.md) exists to guard against, and it needs the same guard as any transition.

A newer, still-emerging category of motion, tying an animation directly to scroll position instead of a state change, is covered in [Going Deeper: Scroll-Driven Animation](/modules/css/css-animations/scroll-driven-animation.md).

## Common mistakes to avoid

- **Reaching for `@keyframes` for something a transition already covers.** Transitions on interaction are simpler and easier to keep tasteful; save keyframes for sequences a two-state transition genuinely can't express, like a loading indicator.

## The checklist

Run this over any keyframe animation before you move on:

- `prefers-reduced-motion` handling turns the animation off, not just slower, covered in [Reduced Motion](/modules/accessibility/reduced-motion/README.md)

## Keep learning

- [MDN: Using CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions). Contrasts transitions with the fuller animation API keyframes belong to.
