---
title: Transitions and Motion
---

# Transitions and Motion

Motion is the last layer. Used well, it makes an interface feel responsive and explains what just changed. Used carelessly, it makes a page feel slow, and for some people it causes genuine physical symptoms.

This week covers transitions and transforms, which handle nearly all the motion a site like yours needs, and it takes the accessibility constraint from Week 10 seriously rather than as an afterthought.

## What a transition does

By default, a CSS change is instant. A `:hover` rule that changes a background colour switches it in a single frame. The `transition` property tells the browser to move between the two values over time instead.

<CssDemo>

```html
<p class="row">
  <a href="#" class="btn instant">No transition</a>
  <a href="#" class="btn smooth">With transition</a>
</p>
```

```css
.row {
  font-family: system-ui, sans-serif;
  display: flex;
  gap: 12px;
}
.btn {
  background-color: #0e7490;
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
}
.instant:hover, .instant:focus-visible {
  background-color: #f59e0b;
}
.smooth {
  transition: background-color 250ms ease;
}
.smooth:hover, .smooth:focus-visible {
  background-color: #f59e0b;
}
```

</CssDemo>

Hover both. The first snaps, the second eases. Note that the transition is declared on the **base rule**, not on `:hover`. That's deliberate: putting it on the base means the element eases both on the way in and on the way back out. Put it only on `:hover` and it eases in, then snaps back.

## The four parts

The `transition` shorthand takes up to four values:

```css
transition: background-color 250ms ease-out 0ms;
/*          property         duration timing  delay */
```

**Property** names what to animate. You can list several separated by commas, or use `all`, though naming them explicitly is better practice because `all` animates things you didn't intend.

**Duration** is how long it takes, in `ms` or `s`. This is the value that most affects how a page feels.

**Timing function** is how the speed is distributed across the duration.

**Delay** waits before starting, and is usually left at zero.

Multiple properties, each with their own timing, are written as a comma-separated list:

```css
transition: background-color 200ms ease, transform 300ms ease-out;
```

## Duration

Duration is where most beginner motion goes wrong, almost always by being too slow.

| Duration | Feels like |
|---|---|
| Under 100ms | essentially instant, the motion isn't perceived |
| 150 to 250ms | responsive; the right range for hover and focus states |
| 300 to 500ms | deliberate; suits larger elements and panels opening |
| Over 500ms | sluggish; the user is waiting for your animation |

**Small things move fast, large things move slower.** A button changing colour wants 150 to 200ms. A panel sliding open can justify 300 to 400ms because it travels further and the eye needs to follow it.

<CssDemo>

```html
<p class="row">
  <a href="#" class="btn t150">150ms</a>
  <a href="#" class="btn t400">400ms</a>
  <a href="#" class="btn t1200">1200ms</a>
</p>
```

```css
.row { font-family: system-ui, sans-serif; display: flex; gap: 12px; }
.btn {
  background-color: #334155;
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
}
.btn:hover, .btn:focus-visible { background-color: #db2777; }
.t150 { transition: background-color 150ms ease; }
.t400 { transition: background-color 400ms ease; }
.t1200 { transition: background-color 1200ms ease; }
```

</CssDemo>

The third one is the mistake people make when they're pleased with themselves for adding a transition. It makes the interface feel unresponsive, because the user has already moved on.

## Timing functions

The timing function shapes the speed curve. Real objects don't start and stop instantly, and matching that makes motion feel natural.

- `linear` moves at a constant speed. It looks mechanical and is rarely right for interface motion.
- `ease` starts slow, speeds up, slows down. The default, and a reasonable choice for most things.
- `ease-in` starts slow and accelerates. Suits something leaving.
- `ease-out` starts fast and decelerates. Suits something arriving, and it's the best default for interface motion because the response feels immediate.
- `cubic-bezier()` defines your own curve when the keywords aren't enough.

<CssDemo>

```html
<p class="row">
  <a href="#" class="bar linear">linear</a>
  <a href="#" class="bar in">ease-in</a>
  <a href="#" class="bar out">ease-out</a>
</p>
```

```css
.row { font-family: system-ui, sans-serif; }
.bar {
  display: block;
  background-color: #6d28d9;
  color: #ffffff;
  padding: 8px 14px;
  margin-bottom: 8px;
  width: 120px;
  text-decoration: none;
  border-radius: 4px;
}
.bar:hover, .bar:focus-visible { width: 300px; }
.linear { transition: width 600ms linear; }
.in { transition: width 600ms ease-in; }
.out { transition: width 600ms ease-out; }
```

</CssDemo>

**When in doubt, use `ease-out`.** It makes the interface feel like it responded instantly and then settled, which is exactly the impression you want.

## Transforms

`transform` moves, scales, and rotates an element without disturbing anything around it. That last part matters enormously.

`translate()` moves it. `scale()` resizes it. `rotate()` turns it.

<CssDemo>

```html
<div class="row">
  <div class="card lift">Lifts</div>
  <div class="card grow">Grows</div>
  <div class="card tilt">Tilts</div>
</div>
```

```css
.row {
  display: flex;
  gap: 14px;
  font-family: system-ui, sans-serif;
  padding: 14px;
}
.card {
  background-color: #ecfeff;
  border: 1px solid #22d3ee;
  border-radius: 8px;
  padding: 20px 24px;
  transition: transform 250ms ease-out;
}
.lift:hover { transform: translateY(-8px); }
.grow:hover { transform: scale(1.08); }
.tilt:hover { transform: rotate(-3deg); }
```

</CssDemo>

Here's the reason transforms matter beyond the visual effect. Changing an element's `width`, `height`, `margin`, or `top` forces the browser to recalculate the position of everything around it, which is expensive and can stutter. `transform` and `opacity` are handled separately, late in the rendering process, and can be animated smoothly even on a modest device.

**Animate `transform` and `opacity`. Avoid animating layout properties.** If you want a card to appear to grow, `scale()` it rather than changing its width. The visual result is similar and the performance is not comparable.

Transforms combine in one declaration, applied in the order written:

```css
transform: translateY(-8px) scale(1.03);
```

## A complete interactive component

Everything together, on the card pattern you built in Week 5:

<CssDemo>

```html
<div class="row">
  <a href="#" class="trail">
    <span class="name">Ridge Trail</span>
    <span class="meta">9 km, moderate</span>
  </a>
  <a href="#" class="trail">
    <span class="name">Summit Climb</span>
    <span class="meta">14 km, hard</span>
  </a>
</div>
```

```css
.row { display: flex; gap: 14px; font-family: system-ui, sans-serif; padding: 12px; }
.trail {
  display: block;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 18px 22px;
  text-decoration: none;
  box-shadow: 0 1px 2px rgb(15 23 42 / 8%);
  transition: transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out;
}
.trail:hover, .trail:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgb(15 23 42 / 14%);
  border-color: #0e7490;
}
.trail:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
}
.name { display: block; font-weight: 700; color: #0f172a; margin-bottom: 3px; }
.meta { display: block; font-size: 0.85rem; color: #64748b; }
```

</CssDemo>

Three properties transitioning together over 200ms with `ease-out`, a small lift, a deeper shadow, and a border colour change. It's restrained, and restraint is what makes it read as quality rather than as decoration.

Note that `:focus-visible` gets the same treatment as `:hover`, plus a visible outline. That's the Week 10 rule holding.

## Motion and accessibility

This is the part that isn't optional.

For people with vestibular disorders, motion on screen can cause nausea, dizziness, and headaches. Large movements, parallax, and anything that scales or slides across a lot of the viewport are the worst offenders. Operating systems expose a "reduce motion" setting, and honouring it is a WCAG requirement.

You added this block in Week 10. Now it's protecting something real:

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

The better-mannered approach writes motion as the enhancement rather than the default:

```css
.trail {
  /* no transition here */
}

@media (prefers-reduced-motion: no-preference) {
  .trail {
    transition: transform 200ms ease-out, box-shadow 200ms ease-out;
  }
}
```

Either is acceptable in this course. What isn't acceptable is animation with no reduced-motion handling at all.

Three further rules. **Motion must never be the only signal**, so a state change that's communicated by movement also needs a colour, text, or icon change. **Nothing should flash more than three times per second**, because that can trigger seizures. And **never animate something the user didn't initiate** and can't stop, which is why auto-playing carousels are so widely disliked.

## Keyframe animations, briefly

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

Keyframes are worth knowing exist, and loading indicators are their honest use case. For this project, transitions on interaction will cover almost everything, and they're far easier to keep tasteful.

## Future of motion: scroll-driven animation

Everything in this chapter animates in response to a state change, a hover, a focus, a class toggling on. There's a newer category worth knowing about even though it's not yet something to build a project around: animation tied directly to **scroll position**, with no JavaScript scroll listener involved at all.

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

Instead of a fixed duration, `animation-timeline: scroll()` ties the animation's progress to how far the page has scrolled, so an element fades and rises into place as it enters the viewport, purely in CSS. This used to require a scroll event listener recalculating positions on every frame in JavaScript, which is exactly the kind of thing this course's "if it needs JavaScript, it's out of scope" line would normally rule out. This is CSS doing a job that used to require a script.

**It's wrapped in `@supports` deliberately, and that's the actual lesson here, not just the animation.** `@supports` checks whether the browser understands a feature before applying rules that use it, so on a browser that doesn't, the block is skipped entirely and the element simply appears without the scroll effect, fully functional either way. That's how you adopt a feature safely before every browser has caught up: the enhancement is additive, and its absence never breaks anything.

And this specific feature genuinely hasn't caught up everywhere yet. Chrome and Edge have supported it since 2023, and Safari since September 2025, but Firefox ships it behind an experimental flag in its stable release as of writing, even though Mozilla's own public position on the feature is favourable and it's a named priority for closer cross-browser alignment. Treat scroll-driven animation as something to experiment with behind `@supports`, not something to depend on or be tested on in this course. Revisit it later in your career: this is exactly the kind of gap that closes within a year or two.

## Common mistakes to avoid

- **Transitions that are too slow.** Anything over 500ms on an interface element feels broken.
- **Declaring the transition on `:hover` instead of the base rule.** It eases in and snaps back.
- **`transition: all`.** It animates properties you never intended, sometimes expensively.
- **Animating `width`, `height`, `top`, or `margin`.** Use `transform` instead, for a smoother result.
- **Motion with no `prefers-reduced-motion` handling.** A real accessibility failure with real physical consequences.
- **Animating `:hover` but not `:focus-visible`.** Keyboard users get nothing, again.
- **Motion as the only indicator of a state change.** Pair it with something static.
- **Animating everything.** If every element moves, none of the movement means anything.
- **Depending on scroll-driven animation without `@supports`.** It isn't supported everywhere yet. Treat it as an enhancement, never as something the page needs to function.

## Keep learning

- [MDN: Using CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions). The full property reference.
- [MDN: Using CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms). Every transform function, including the 3D ones.
- [MDN: Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations). The full reference, including `view()` timelines for elements entering the viewport.
- [MDN: @supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports). How to check for a feature before depending on it.
- [cubic-bezier.com](https://cubic-bezier.com/). Draw a custom timing curve and preview it.
- [WCAG: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). The success criterion behind the reduced-motion requirement.
- [Video: Learn CSS Transitions, by Kevin Powell](https://www.youtube.com/watch?v=Nloq6uzF8RQ). A practical walkthrough with good taste about restraint.

## Try it yourself

Confirm the `prefers-reduced-motion` block is already at the bottom of your stylesheet before you add anything. It should be there from Week 10.

Then add transitions to every interactive element on your project: links, buttons, and cards. Use 150 to 250ms and `ease-out`, name the properties explicitly rather than using `all`, and declare the transition on the base rule. Make sure every `:hover` treatment is matched by `:focus-visible`.

Build one card hover that combines a `translateY` lift with a deeper `box-shadow`, and deliberately do not animate width or height.

Now test the constraint. Turn on reduce motion in your operating system settings, reload your live page, and confirm the motion stops. Then turn it off and confirm it comes back.

Finally, do a restraint pass. Look at every animation you added and remove any that doesn't communicate something: a state change, a response to input, or where an element went. Whatever survives that cut is the motion your project actually needed.

Optional, and not required: wrap one `animation-timeline: scroll()` experiment in `@supports` on a single element, and check it in two different browsers to see the feature-detection actually working, the effect in one and a plain, unanimated element in the other.

You've now covered everything this course teaches about styling a page. The final two weeks put the whole project, both courses' work together, in front of real eyes.
