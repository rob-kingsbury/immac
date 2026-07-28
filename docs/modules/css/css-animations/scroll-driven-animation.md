---
title: Scroll-Driven Animation
prerequisites:
  - css/css-animations
---

# Going Deeper: Scroll-Driven Animation

Everything in [Keyframe Animations](/modules/css/css-animations/README.md) and [Transitions](/modules/css/css-transitions/README.md) animates in response to a state change, a hover, a focus, a class toggling on. There's a newer category worth knowing about even though it's not yet something to build a project around: animation tied directly to **scroll position**, with no JavaScript scroll listener involved at all.

```css
@supports (animation-timeline: scroll()) {
  .reveal {
    animation: fade-in linear both;
    animation-timeline: scroll();
    animation-range: entry 0% cover 40%;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```

Instead of a fixed duration, `animation-timeline: scroll()` ties the animation's progress to how far the page has scrolled, so an element fades and rises into place as it enters the viewport, purely in CSS. This used to require a scroll event listener recalculating positions on every frame in JavaScript, which is exactly the kind of thing a "if it needs JavaScript, it's out of scope" line would normally rule out. This is CSS doing a job that used to require a script.

**It's wrapped in `@supports` deliberately, and that's the actual lesson here, not just the animation.** `@supports` checks whether the browser understands a feature before applying rules that use it, so on a browser that doesn't, the block is skipped entirely and the element simply appears without the scroll effect, fully functional either way. That's how you adopt a feature safely before every browser has caught up: the enhancement is additive, and its absence never breaks anything.

And this specific feature genuinely hasn't caught up everywhere yet. Chrome and Edge have supported it since 2023, and Safari since September 2025 (re-verified as of this writing: still behind a flag in Firefox's stable release, on by default only in Firefox's experimental Nightly channel), even though Mozilla's own public position on the feature is favourable and it's a named priority for closer cross-browser alignment. Treat scroll-driven animation as something to experiment with behind `@supports`, not something to depend on or be tested on in a project for this course. Revisit it later in your career: this is exactly the kind of gap that closes within a year or two, so re-check current support before trusting this paragraph's specifics.

## Common mistakes to avoid

- **Depending on scroll-driven animation without `@supports`.** It isn't supported everywhere yet. Treat it as an enhancement, never as something the page needs to function.

## Keep learning

- [MDN: Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations). The full reference, including `view()` timelines for elements entering the viewport.
- [MDN: @supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports). How to check for a feature before depending on it.
