---
title: Selectors, Specificity, and Inheritance
---

# Selectors, Specificity, and Inheritance

In Week 1 you met three selectors and a rough rule for what happens when they conflict: more specific beats less specific, and later beats earlier. That rough rule carries you a long way. This week replaces it with the real mechanism, adds the selectors that respond to what a visitor is doing, and explains why some properties pass down to child elements while others don't.

This is the chapter that turns "my CSS isn't working" from a mystery into a diagnosis.

## Pseudo-classes: selecting by state

A **pseudo-class** selects an element based on its state rather than its markup. It's written as a selector followed by a colon and the state name. The states you'll use constantly relate to what the visitor is doing right now.

`:hover` matches while the pointer is over an element. `:focus` matches while an element is selected for keyboard input, which happens when a user tabs to it. `:active` matches during the moment of a click.

<CssDemo>

```html
<p><a href="#" class="demo-link">Hover me, or tab to me</a></p>
```

```css
.demo-link {
  color: #1d4ed8;
  padding: 6px 10px;
  border-radius: 4px;
  text-decoration: underline;
}
.demo-link:hover {
  background-color: #dbeafe;
  color: #1e3a8a;
}
.demo-link:focus {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}
```

</CssDemo>

**Never style `:hover` without also styling `:focus`.** Hover only exists for people using a pointer. A keyboard user, or someone using assistive technology, navigates with Tab and sees focus states instead. Styling one and not the other builds a page that works for mouse users and quietly fails for everyone else. This comes back in depth in the Accessible Styling week, but the habit starts now.

Two more pseudo-classes matter for links specifically. `:visited` matches a link the visitor has already been to, and `:link` matches one they haven't.

### Structural pseudo-classes

Another group selects elements by their position among their siblings, with no class or ID needed.

`:first-child` and `:last-child` match an element that is the first or last among its siblings. `:nth-child()` is the flexible one: it takes a number, a keyword such as `odd` or `even`, or a formula.

<CssDemo>

```html
<ul class="rows">
  <li>First row</li>
  <li>Second row</li>
  <li>Third row</li>
  <li>Fourth row</li>
  <li>Fifth row</li>
</ul>
```

```css
.rows {
  list-style: none;
  padding: 0;
  font-family: system-ui, sans-serif;
}
.rows li {
  padding: 8px 12px;
}
.rows li:nth-child(odd) {
  background-color: #f1f5f9;
}
.rows li:first-child {
  font-weight: 700;
  border-bottom: 2px solid #94a3b8;
}
```

</CssDemo>

Striped table rows, a first item styled as a header, a last item with no bottom border: all of it without adding a single class to the HTML. That's the point of structural pseudo-classes. The styling survives when the content changes, because it's based on position rather than on labels somebody has to remember to apply.

## Pseudo-elements: styling parts of an element

A **pseudo-element** styles a portion of an element, or inserts content that isn't in the HTML at all. It's written with two colons.

`::before` and `::after` insert generated content at the start or end of an element. Both require a `content` property, even if it's an empty string, or nothing appears.

<CssDemo>

```html
<p class="note">This paragraph has a marker added by CSS.</p>
<blockquote class="quoted">Design is not just what it looks like. Design is how it works.</blockquote>
```

```css
.note {
  font-family: system-ui, sans-serif;
}
.note::before {
  content: "Note: ";
  font-weight: 700;
  color: #b45309;
}
.quoted {
  font-family: Georgia, serif;
  font-style: italic;
  margin: 0;
  padding-left: 1.5rem;
  border-left: 4px solid #cbd5e1;
}
.quoted::before {
  content: open-quote;
  font-size: 2rem;
  line-height: 0;
  vertical-align: -0.4rem;
  color: #94a3b8;
}
```

</CssDemo>

There's an important limit. Content inserted with `::before` and `::after` is **decorative from the point of view of assistive technology**, and support for reading it varies. Never put information a visitor needs into generated content. Use it for quote marks, icons, decorative separators, and visual flourishes, and keep real content in the HTML where it belongs.

Two more pseudo-elements are worth knowing: `::first-line` and `::first-letter`, which style exactly what their names say, and are how you get a drop cap without wrapping the letter in a `<span>`.

## Combinators: selecting by relationship

So far every selector has matched elements on their own. **Combinators** match elements by their relationship to another element, which lets you write rules like "links inside the navigation" without giving each of those links a class.

**Descendant** (a space) matches an element anywhere inside another, at any depth.

**Child** (`>`) matches only direct children, one level down.

**Adjacent sibling** (`+`) matches the element immediately following another at the same level.

<CssDemo>

```html
<div class="box">
  <p>A direct child paragraph.</p>
  <div><p>A paragraph nested one level deeper.</p></div>
  <h3>A heading</h3>
  <p>The paragraph right after the heading.</p>
</div>
```

```css
.box {
  font-family: system-ui, sans-serif;
}
.box p {
  color: #0f766e;
}
.box > p {
  font-weight: 700;
}
h3 + p {
  border-left: 3px solid #db2777;
  padding-left: 8px;
}
```

</CssDemo>

Read the results carefully. Every paragraph inside `.box` turned teal, including the nested one, because the descendant combinator reaches any depth. Only the two direct children went bold, because `>` stops at one level. And only the paragraph immediately following the `h3` got the pink border.

The descendant combinator is the one you'll use most, and it's also the easiest to overuse. A selector like `.page .content .article .body p` works, but it's fragile: it breaks the moment somebody moves an element, and as you're about to see, it's also unnecessarily specific.

## Specificity, calculated properly

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

Note the last two. `#lead` beats `#lead .intro p span em`? No, read again: they tie on A at 1, so B decides, and the long selector wins with 1 versus 0. But a single `#lead` at 1-0-0 beats *any* selector with no ID, no matter how long. Ten classes still lose to one ID, because the columns never carry over.

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

### Why this argues for classes

Specificity explains a piece of professional practice that otherwise looks like arbitrary taste. **Prefer classes; avoid IDs for styling.**

An ID sets specificity at 1-0-0, and the only way to override it later is with another ID or something worse. Build a stylesheet on IDs and every override becomes an escalation, with selectors growing longer and more entangled as the term goes on. Build it on single classes, all at 0-1-0, and overriding is simply a matter of order, which you control easily.

The same logic argues against long descendant chains. `.card .body p` at 0-2-1 is harder to override than `.card-text` at 0-1-0, and it's tied to a structure that might change.

### The `!important` escape hatch

Adding `!important` to a declaration makes it beat everything, regardless of specificity:

```css
p {
  color: red !important;
}
```

You will see this in other people's code and you'll be tempted by it when a rule refuses to apply. Resist it. `!important` doesn't solve the conflict, it hides it, and the only way to override an `!important` is another `!important`, so a stylesheet with a few of them tends to acquire more. When a rule won't apply, inspect the element, find what's beating it, and fix the specificity properly. In this course, treat `!important` as a sign that something upstream needs fixing.

## The cascade, in full

Specificity is one of several tie-breakers, and they're applied in order. The full sequence the browser runs is:

1. **Origin and importance.** Your author stylesheet beats the browser's defaults. Declarations marked `!important` jump ahead.
2. **Specificity.** The A-B-C calculation above.
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

## Debugging with all of this

Put it together into a routine. When a rule doesn't apply:

1. **Inspect the element.** Developer tools list every rule affecting it, winner at the top, losers with their declarations struck through.
2. **Look for the strike-through.** If your declaration is crossed out, something more specific or later beat it, and the panel shows you what.
3. **Check whether the selector matches at all.** If your rule isn't in the list, the selector is wrong, not the property. A typo in a class name, a missing dot, or a `>` where you needed a space.
4. **Check whether the property inherits.** If you expected a child to pick something up and it didn't, the property may simply not be inheritable.
5. **Compute the specificity of both rules** before changing anything. Then fix it by adjusting the selector, not by reaching for `!important`.

## Common mistakes to avoid

- **Styling `:hover` without `:focus`.** Keyboard users get nothing, and it's an accessibility failure, not a nicety.
- **Using IDs for styling.** They win at 1-0-0 and make every future override worse.
- **Reaching for `!important`.** It hides the conflict instead of resolving it, and it spreads.
- **Long descendant chains.** Fragile, hard to override, and usually replaceable by one class.
- **A `::before` with no `content` property.** Nothing renders, and there's no error to tell you why.
- **Putting real information in generated content.** It isn't reliably available to assistive technology.
- **Expecting `padding` or `border` to inherit.** They don't, and no amount of retyping will change that.

## Keep learning

- [MDN: CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors). The complete list, including everything this chapter didn't cover.
- [MDN: Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity). The full rules, with the A-B-C model explained in more detail.
- [Specificity Calculator](https://specificity.keegan.st/). Paste in a selector and see its score, useful for checking your own arithmetic.
- [MDN: Handling conflicts](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts). Cascade, specificity, and inheritance together, from the beginner path.
- [Video: CSS Specificity Explained, by Kevin Powell](https://www.youtube.com/watch?v=CHyPGSpIhSs). A clear walkthrough with worked examples.

## Try it yourself

Add interactive states to your project. Give every link a `:hover` style and a clearly visible `:focus` style, then put your mouse away and navigate the whole page with the Tab key alone. If you ever lose track of where you are, the focus styling isn't strong enough.

Use `:nth-child(odd)` to stripe a list or table on your page, and `:first-child` to distinguish its first item, without adding any classes to the HTML.

Add a decorative `::before` to one element, and write a comment explaining why the content you put there is safe to hide from assistive technology.

Then run a specificity experiment. Write three rules targeting the same element, one with an element selector, one with a class, and one with an ID, each setting a different colour. Predict which wins before you save. Open developer tools, confirm your prediction, and find the struck-through declarations. Then rewrite the whole thing using only single classes so that source order alone decides the winner, and note how much easier the second version is to reason about.
