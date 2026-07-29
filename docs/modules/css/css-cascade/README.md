---
title: The Cascade
prerequisites:
  - css/css-precedence
---

# How the Browser Decides: The Cascade

A page can easily have more than one rule matching the same element, which raises an obvious question. What happens when two rules both apply and they disagree?

That's what the "cascading" in Cascading Style Sheets means. The browser gathers every rule that matches an element and resolves the conflicts with a set of tie-breakers.

**Later beats earlier.** When two rules are equally specific, the one further down the stylesheet wins:

<CssDemo>

```html
<p>Which colour wins?</p>
```

```css
p {
  color: #006969;
}
p {
  color: crimson;
}
```

</CssDemo>

Both rules match, both are equally specific, so the last one read is the one that applies. This is why the order of rules in your file matters, and why a rule that "isn't working" is often being overridden by something further down.

**More specific beats less specific.** An ID selector beats a class selector, which beats an element selector, regardless of order:

<CssDemo>

```html
<p class="intro" id="lead">Which colour wins here?</p>
```

```css
#lead {
  color: crimson;
}
.intro {
  color: goldenrod;
}
p {
  color: #006969;
}
```

</CssDemo>

The ID wins even though it's written first, because it's the most specific of the three. That ordering, ID over class over element, is the practical version of a rule you calculate exactly in [Specificity, Calculated Properly](/modules/css/css-precedence/README.md). The useful takeaway here is a debugging instinct: when a rule seems to be ignored, something more specific is probably beating it.

## Going deeper: a third way to win, and why to avoid it

Later wins and more specific wins are not the whole story. CSS has a third tool that overrides both: adding `!important` to a declaration.

```css
p {
  color: crimson !important;
}
```

A declaration marked `!important` beats an ordinary declaration regardless of specificity or source order. You'll see it in code you didn't write, and the first time one of your own rules refuses to apply, reaching for it can look like a quick fix.

It isn't. `!important` doesn't resolve the conflict between two rules, it forces a winner and buries the reason underneath. The only way to override an `!important` declaration is another `!important` declaration, so once a stylesheet has one, it tends to collect more, until nobody can tell which rule actually controls anything. When a rule you wrote doesn't seem to apply, the fix is to find what's beating it in developer tools and adjust the selector, not to reach for `!important`.

## The cascade, in full

Specificity is one of several tie-breakers, and they're applied in order, each one only breaking a tie the previous one left standing:

<div class="diagram">
<svg viewBox="0 0 560 150" role="img" aria-label="A three-step sequence. Step one, origin and importance, resolved by whether a declaration is marked important. Step two, specificity, resolved by the A-B-C calculation. Step three, source order, resolved by which declaration appears last. The third circle is filled solid, showing that whichever step actually resolves the tie is the winner.">
  <circle cx="70" cy="55" r="26" class="d-surface d-accent-stroke" stroke-width="2"/>
  <text x="70" y="61" text-anchor="middle" class="d-lbl" fill="var(--vp-c-text-accent, #3b82f6)" font-size="15">1</text>
  <text x="70" y="100" text-anchor="middle" class="d-lbl">Origin &amp;</text>
  <text x="70" y="114" text-anchor="middle" class="d-lbl">importance</text>
  <text x="70" y="130" text-anchor="middle" class="d-lbl-muted">!important wins</text>

  <path d="M105 55 L200 55" class="d-muted-stroke" stroke-width="1.5" marker-end="url(#tb-arrow)"/>

  <circle cx="235" cy="55" r="26" class="d-surface d-accent-stroke" stroke-width="2"/>
  <text x="235" y="61" text-anchor="middle" class="d-lbl" fill="var(--vp-c-text-accent, #3b82f6)" font-size="15">2</text>
  <text x="235" y="100" text-anchor="middle" class="d-lbl">Specificity</text>
  <text x="235" y="130" text-anchor="middle" class="d-lbl-muted">the A-B-C score</text>

  <path d="M270 55 L365 55" class="d-muted-stroke" stroke-width="1.5" marker-end="url(#tb-arrow)"/>

  <circle cx="400" cy="55" r="26" class="d-accent"/>
  <text x="400" y="61" text-anchor="middle" class="d-lbl" fill="#ffffff" font-size="15">3</text>
  <text x="400" y="100" text-anchor="middle" class="d-lbl">Source order</text>
  <text x="400" y="130" text-anchor="middle" class="d-lbl-muted">last one written wins</text>

  <defs>
    <marker id="tb-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" class="d-muted-stroke" fill="var(--vp-c-text-2, #5c6773)"/>
    </marker>
  </defs>
</svg>
</div>

Read it left to right, and stop at the first step that actually resolves the tie. If neither rule is `!important`, step one settles nothing and step two takes over. If the two rules also tie on specificity, step three is what actually decides, which is why it's drawn as the filled circle above: for two ordinary, equally-specific rules, source order is the one that matters in practice.

1. **Origin and importance.** Your author stylesheet beats the browser's defaults. Declarations marked `!important` jump ahead.
2. **Specificity.** The A-B-C calculation covered in [Specificity, Calculated Properly](/modules/css/css-precedence/README.md).
3. **Source order.** Among everything still tied, the declaration that appears last wins.

This is why the `<link>` to your stylesheet coming after a web font's stylesheet matters, and why the order of rules within your own file matters. It's also why a rule you wrote at the top of the file can be silently overridden by one you wrote at the bottom without noticing.

## Inheritance

Some properties pass automatically from a parent element to its children. Others don't. This isn't random, and knowing the pattern saves you from writing rules you don't need.

**Text-related properties inherit.** `color`, `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, and `text-align` all pass down.

**Box-related properties don't.** `margin`, `padding`, `border`, `background`, `width`, and `height` apply only to the element you set them on.

<CssDemo>

```html
<div class="parent">
  This text is in the parent.
  <p>This paragraph is a child. It inherited the font and colour, but not the border.</p>
</div>
```

```css
.parent {
  font-family: Georgia, serif;
  color: #7c2d12;
  border: 2px dashed #ea580c;
  padding: 12px;
}
```

</CssDemo>

The reasoning behind the split is practical. Text settings almost always should flow down, or you'd be repeating your font family on every element in the document. Box settings almost never should, or every nested element would inherit its parent's border and the page would be a stack of frames.

This is why setting typography on `body` works so well as a starting point. One rule establishes the baseline for the whole document, and you only write further rules where you want an exception.

You can also control inheritance explicitly. The value `inherit` forces a property to take its parent's value even when it wouldn't normally, and `initial` resets a property to its CSS default:

```css
.reset-border {
  border: initial;
}
.match-parent {
  color: inherit;
}
```

`color: inherit` is genuinely useful on links inside a coloured block, where you want the link to match the surrounding text rather than the browser's blue.

## Common mistakes to avoid

- **Reaching for `!important`.** It hides the conflict instead of resolving it, and it spreads.
- **Expecting `padding` or `border` to inherit.** They don't, and no amount of retyping will change that.

## The checklist

Run this over your stylesheet before you move on:

- You can predict which of two conflicting rules wins, using source order and specificity
- `!important` does not appear anywhere in your stylesheet, with one narrow, deliberate exception you'll meet in [Reduced Motion](/modules/accessibility/reduced-motion/README.md) (the `prefers-reduced-motion` guard, which has to override anything else on the page)
- The cascade order, origin and importance, then specificity, then source order, can explain why any rule on the page won or lost
- Text properties are set once on a parent and left to inherit, rather than repeated on every child
- Box properties are set directly on the element that needs them, since they don't inherit

## Keep learning

- [MDN: Cascade, specificity, and inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade). The full mechanism, straight from the reference.
- [MDN: Handling conflicts](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts). Cascade, specificity, and inheritance together, from the beginner path.
- [Chrome DevTools: View and change CSS](https://developer.chrome.com/docs/devtools/css). How to read the winning and losing rules in the Styles panel.
- [Video: The C in CSS Means Cascading, by Steve Griffith](https://www.youtube.com/watch?v=PigxOyVDIQg). A short, direct walkthrough of why later or more specific rules win.
