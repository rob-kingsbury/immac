---
title: Specificity
prerequisites:
  - css/css-pseudo-classes
  - css/css-pseudo-elements
  - css/css-complex-selectors
---

# Specificity, Calculated Properly

When two rules set the same property on the same element, the browser needs a tie-breaker. **Specificity** is that tie-breaker, and it's a real calculation rather than a vague sense of "more specific."

Count three numbers for any selector:

| Column | What counts | Example |
|---|---|---|
| **A: IDs** | Each `#id` in the selector | `#header` |
| **B: Classes** | Each class, pseudo-class, and attribute selector | `.card`, `:hover`, `[type="text"]` |
| **C: Elements** | Each element name and pseudo-element | `p`, `h1`, `::before` |

Write those as three numbers and compare left to right. A higher A always wins regardless of B and C. If A ties, B decides. If A and B tie, C decides.

| Selector | A | B | C | Reads as |
|---|---|---|---|---|
| `p` | 0 | 0 | 1 | 0-0-1 |
| `.intro` | 0 | 1 | 0 | 0-1-0 |
| `p.intro` | 0 | 1 | 1 | 0-1-1 |
| `.card p:hover` | 0 | 2 | 1 | 0-2-1 |
| `#lead` | 1 | 0 | 0 | 1-0-0 |
| `#lead .intro p span em` | 1 | 1 | 3 | 1-1-3 |

Look closely at the last two rows. Both `#lead` and `#lead .intro p span em` contain an ID, so they tie on A at 1, and the tie moves to B. `#lead` alone has no classes, `#lead .intro p span em` has one (`.intro`), so B is 0 versus 1, and the longer selector wins despite looking like the odd one out. Compare `#lead` instead against any selector that has no ID at all, and the result flips completely: A never ties, so `#lead` wins outright regardless of how many classes or elements the other selector piles on. Ten classes still lose to one ID, because the columns never carry over into each other.

<CssDemo>

```html
<p class="intro" id="lead">Three rules target me. Which colour wins?</p>
```

```css
p.intro {
  color: #0f766e;
}
#lead {
  color: #b91c1c;
}
p {
  color: #1d4ed8;
}
```

</CssDemo>

`#lead` wins at 1-0-0, even though it isn't last in the file, because order only breaks a tie between selectors of equal specificity.

## Why this argues for classes

Specificity explains a piece of professional practice that otherwise looks like arbitrary taste. **Prefer classes; avoid IDs for styling.**

An ID sets specificity at 1-0-0, and the only way to override it later is with another ID or something worse. Build a stylesheet on IDs and every override becomes an escalation, with selectors growing longer and more entangled as the project grows. Build it on single classes, all at 0-1-0, and overriding is simply a matter of order, which you control easily.

The same logic argues against long descendant chains. `.card .body p` at 0-2-1 is harder to override than `.card-text` at 0-1-0, and it's tied to a structure that might change.

## Grouping selectors without paying for it: :is() and :where()

You already know how to group selectors with a comma, so several elements can share one block. Two related tools let you group *parts* of a selector instead of the whole thing.

`:is()` takes a list of selectors and matches any element that fits one of them. It's a shorthand for what would otherwise be several separate, longer selectors.

```css
/* Instead of writing this out three times */
article h2, article h3, article h4 {
  color: #0f172a;
}

/* :is() says the same thing once */
article :is(h2, h3, h4) {
  color: #0f172a;
}
```

`:where()` does exactly the same matching, with one difference that matters a great deal: **it always contributes zero to specificity**, no matter what's inside it.

<CssDemo>

```html
<h2 class="section-title">Which colour wins?</h2>
```

```css
:where(.sidebar, .article) h2 {
  color: #0f766e;
}
.section-title {
  color: #b91c1c;
}
```

</CssDemo>

The crimson wins, because `:where(.sidebar, .article) h2` scores as 0-0-1, the class inside `:where()` doesn't count at all, only the plain `h2` outside it does. Swap that same selector to `:is()` instead and the class *would* count, pushing the specificity to 0-1-1, and it would beat `.section-title`'s 0-1-0.

That makes `:where()` the practical answer to the advice above: it lets you write a broad, reach-anywhere selector for a default style, while guaranteeing that a single class anywhere else in your stylesheet can override it without a fight. It's a technique for the "prefer classes, avoid escalation" habit, not just a shortcut for typing less.

## The !important escape hatch

Adding `!important` to a declaration makes it beat everything, regardless of specificity:

```css
p {
  color: red !important;
}
```

You will see this in other people's code and you'll be tempted by it when a rule refuses to apply. Resist it. `!important` doesn't solve the conflict, it hides it, and the only way to override an `!important` is another `!important`, so a stylesheet with a few of them tends to acquire more. When a rule won't apply, inspect the element, find what's beating it, and fix the specificity properly.

## Common mistakes to avoid

- **Using IDs for styling.** They win at 1-0-0 and make every future override worse.
- **Reaching for `!important`.** It hides the conflict instead of resolving it, and it spreads.
- **Reaching for `:is()` when you meant `:where()`.** `:is()` still adds to specificity, based on its most specific argument. If the whole point was a zero-specificity default, use `:where()`.

## The checklist

Run this over your selectors before you move on:

- Any selector's specificity can be read off as three numbers, A-B-C, and two selectors' specificity can be compared correctly
- Classes are used for styling, not IDs or long descendant chains
- `:where()` is used instead of `:is()` when the goal is a selector that adds nothing to specificity
- `!important` does not appear anywhere in the stylesheet without a specific, deliberate reason

## Keep learning

- [MDN: Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity). The full rules, with the A-B-C model explained in more detail.
- [MDN: :is() and :where()](https://developer.mozilla.org/en-US/docs/Web/CSS/:is). The full reference, including how each calculates specificity.
- [Specificity Calculator](https://specificity.keegan.st/). Paste in a selector and see its score, useful for checking your own arithmetic.
- [Video: CSS Specificity Explained, by Kevin Powell](https://www.youtube.com/watch?v=CHyPGSpIhSs). A clear walkthrough with worked examples.
