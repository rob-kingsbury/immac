---
title: The DOM and CSS Targeting
prerequisites:
  - css/selectors-specificity-inheritance
---

# The <abbr title="Document Object Model">DOM</abbr> and <abbr title="Cascading Style Sheets">CSS</abbr> Targeting

You've been writing selectors since [Introduction to CSS](/modules/css/intro-to-css.md) without a precise picture of what they're selecting *from*. This chapter supplies it. The browser doesn't apply your CSS to a text file. It applies it to a structure it built in memory called the **DOM**, and once you can see that structure, targeting stops being trial and error.

This is the diagnostic chapter. By the end of it you should be able to work out why any rule on your page is or isn't applying, without changing anything at random to find out.

## How to read this chapter

**The core path runs from "What the DOM is" through the six-step diagnostic routine.** That's the sequence the CLR names for this chapter, and it's worth being able to use with confidence. Budget about 30 minutes to read it, plus the 45 minutes the exercise takes.

**The two "Going deeper" sections, on `:not()` and on `:nth-child()`/`:nth-of-type()`, are optional.** They add two selectors that extend the structural targeting you're already doing, and together they're about 15 minutes of reading. Skip them if you are short on time. Nothing in the core path depends on them.

## What the DOM is

**DOM** stands for Document Object Model. When a browser receives your <abbr title="HyperText Markup Language">HTML</abbr>, it doesn't keep the text. It parses it and builds a tree of objects in memory, one for each element, nested exactly as your tags were nested. That tree is the DOM, and it's what your CSS actually styles.

Take this markup:

```html
<body>
  <header>
    <h1>TrailGuide</h1>
    <nav>
      <a href="#">Routes</a>
      <a href="#">About</a>
    </nav>
  </header>
  <main>
    <p>Three routes to choose from.</p>
  </main>
</body>
```

The browser builds it as a tree:

```
body
├── header
│   ├── h1
│   └── nav
│       ├── a
│       └── a
└── main
    └── p
```

The vocabulary of that tree is the vocabulary of CSS targeting. `header` is the **parent** of `h1` and `nav`. Those two are **children** of `header`, and **siblings** of each other. The two `<a>` elements are **descendants** of `header`, though not its children, because they're two levels down. And `header` is an **ancestor** of everything beneath it.

The tree above shows nesting, but it doesn't show how those relationships change depending on which element you're asking about. The diagram below picks one element, `<nav>`, and colours the rest of the tree relative to it.

<div class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-label="The same DOM tree, coloured relative to the nav element. Body is marked as an ancestor. Header, nav's parent, is also an ancestor. H1 is marked as nav's sibling, because it shares the same parent. The two a elements are marked as nav's children. Main and p are marked unrelated to nav, even though main is a sibling of header, because a sibling relationship only holds between elements that share the same direct parent, and main's parent is body, not header.">
  <line x1="320" y1="56" x2="170" y2="94" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="320" y1="56" x2="470" y2="94" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="170" y1="130" x2="100" y2="168" class="d-accent-stroke" stroke-width="1.5"/>
  <line x1="170" y1="130" x2="240" y2="168" class="d-accent-stroke" stroke-width="2"/>
  <line x1="470" y1="130" x2="470" y2="168" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="240" y1="204" x2="195" y2="242" class="d-accent-stroke" stroke-width="1.5"/>
  <line x1="240" y1="204" x2="300" y2="242" class="d-accent-stroke" stroke-width="1.5"/>

  <rect x="270" y="20" width="100" height="36" rx="6" class="d-surface" stroke="var(--vp-c-text-mute)" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="320" y="43" text-anchor="middle" class="d-lbl-mono">body</text>
  <text x="320" y="14" text-anchor="middle" class="d-lbl-muted">ancestor</text>

  <rect x="120" y="94" width="100" height="36" rx="6" class="d-surface d-accent-stroke" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="170" y="117" text-anchor="middle" class="d-lbl-mono">header</text>
  <text x="170" y="88" text-anchor="middle" class="d-lbl-muted">parent</text>

  <rect x="420" y="94" width="100" height="36" rx="6" class="d-surface d-border" stroke-width="1"/>
  <text x="470" y="117" text-anchor="middle" class="d-lbl-mono">main</text>
  <text x="470" y="88" text-anchor="middle" class="d-lbl-muted">unrelated</text>

  <rect x="50" y="168" width="100" height="36" rx="6" class="d-surface" stroke="var(--vp-c-text-mute)" stroke-width="1.5" stroke-dasharray="2 2"/>
  <text x="100" y="191" text-anchor="middle" class="d-lbl-mono">h1</text>
  <text x="100" y="162" text-anchor="middle" class="d-lbl-muted">sibling</text>

  <rect x="190" y="168" width="100" height="36" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="2"/>
  <text x="240" y="191" text-anchor="middle" class="d-lbl-mono">nav</text>
  <text x="240" y="162" text-anchor="middle" class="d-lbl-muted">this element</text>

  <rect x="420" y="168" width="100" height="36" rx="6" class="d-surface d-border" stroke-width="1"/>
  <text x="470" y="191" text-anchor="middle" class="d-lbl-mono">p</text>
  <text x="470" y="162" text-anchor="middle" class="d-lbl-muted">unrelated</text>

  <rect x="145" y="242" width="100" height="36" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1"/>
  <text x="195" y="265" text-anchor="middle" class="d-lbl-mono">a</text>
  <text x="195" y="236" text-anchor="middle" class="d-lbl-muted">child</text>

  <rect x="250" y="242" width="100" height="36" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1"/>
  <text x="300" y="265" text-anchor="middle" class="d-lbl-mono">a</text>
  <text x="300" y="236" text-anchor="middle" class="d-lbl-muted">child</text>
</svg>
<figcaption>Relationships are always relative to one element, here nav. Notice main: it's a sibling of header, but not of nav, because a sibling relationship only exists between elements sharing the same direct parent.</figcaption>
</div>

That last point is worth sitting with. `header` and `main` are siblings of each other, both children of `body`. But `main` is not a sibling of `nav`, because `nav`'s parent is `header`, not `body`. "Sibling" is always relative to a specific element and a specific parent, never a property an element has on its own. The same goes for "descendant" and "ancestor": they only mean something once you've said descendant *of what*.

Two consequences matter beyond the vocabulary. First, **the DOM is the live structure, not your source file.** Fix a typo in your HTML and save, and the browser rebuilds the tree. Second, **the browser repairs broken markup while building it.** Forget a closing tag and the browser will guess where it should have gone, which means the tree it built may not be the tree you intended. That's a common cause of a selector that should match and doesn't, and the inspector is where you catch it.

## Reading the DOM in developer tools

The Elements panel of developer tools shows the DOM tree, not your source. That difference is the whole reason to look at it.

Open it and you can expand and collapse branches, hover any node to highlight it on the page, and see exactly how the browser understood your markup. When a rule isn't matching, the first question is always "is the element where I think it is in the tree," and this panel answers it in seconds.

Below the tree, the Styles panel shows every rule affecting the selected element. Three things there are worth knowing well:

- **Rules are listed most-specific first,** with the winner at the top.
- **Overridden declarations are struck through,** so you can see precisely what beat what.
- **The Computed tab** shows the final value of every property after the cascade, inheritance, and the browser's defaults have all been resolved.

That last one deserves attention. **Computed style** is the answer to "what is this element's font size, actually," including values it inherited and values the browser supplied that you never wrote. When a value surprises you, Computed tells you where it came from, usually with a link to the rule responsible.

## Descendant and child selectors, precisely

You met combinators in [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md). Now they have a structure to refer to.

The **descendant combinator** is a space, and it matches at any depth beneath an ancestor:

<CssDemo>

```html
<div class="wrap">
  <p>A direct child.</p>
  <section><p>A grandchild, two levels down.</p></section>
</div>
```

```css
.wrap p {
  color: #0f766e;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

Both matched, because both are descendants.

The **child combinator** is `>`, and it stops at one level:

<CssDemo>

```html
<div class="wrap">
  <p>A direct child.</p>
  <section><p>A grandchild, two levels down.</p></section>
</div>
```

```css
.wrap > p {
  color: #be123c;
  font-weight: 700;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

Only the first matched. This distinction matters most for navigation menus with nested lists, where a descendant selector reaches into submenus you meant to leave alone.

## Sibling selectors

Two combinators target elements by what comes before them at the same level.

The **adjacent sibling** combinator, `+`, matches the element immediately after another. The **general sibling** combinator, `~`, matches every following sibling, not just the next one.

<CssDemo>

```html
<div class="wrap">
  <h3>A heading</h3>
  <p>Immediately after the heading.</p>
  <p>A second paragraph after it.</p>
  <p>A third.</p>
</div>
```

```css
.wrap {
  font-family: system-ui, sans-serif;
}
h3 + p {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
}
h3 ~ p {
  border-left: 3px solid #cbd5e1;
  padding-left: 10px;
}
```

</CssDemo>

The first paragraph got both rules: it's the adjacent sibling *and* a general sibling. The other two got only the border.

`h3 + p` is a genuinely useful pattern, because "the paragraph right after a heading" is often a standfirst or lead paragraph that should look different, and this styles it without adding a class.

Note the direction. Sibling combinators only look **forward**. There's no way to select the element *before* another with these, which occasionally forces a rethink of your markup or a class.

## Attribute selectors

You can also target elements by their attributes, which is powerful for forms and links.

<CssDemo>

```html
<p class="links">
  <a href="https://example.com">An external link</a><br>
  <a href="report.pdf">A PDF download</a><br>
  <a href="about.html">An internal page</a>
</p>
```

```css
.links {
  font-family: system-ui, sans-serif;
  line-height: 2;
}
.links a {
  color: #1d4ed8;
}
a[href^="https"]::after {
  content: " ↗";
  color: #5b6b85;
}
a[href$=".pdf"]::after {
  content: " (PDF)";
  font-size: 0.85em;
  color: #b45309;
}
```

</CssDemo>

The syntax is a set of matching operators inside square brackets. `[href^="https"]` matches when the value **starts with** that string. `[href$=".pdf"]` matches when it **ends with** it. `[href*="example"]` matches when it **contains** it. And plain `[type="email"]` matches an exact value.

Marking external links and file downloads automatically, with no classes to maintain, is exactly what attribute selectors are for. Note that the marker above is decorative, so per the rule about generated content in [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md), the same information should also be conveyed in the link text itself for anything a visitor genuinely needs to know.

One caveat on `[href^="https"]` specifically: it doesn't actually mean "external," it means "starts with https." That happens to sort external from internal links correctly on a site like the one you're building, where every internal link is written as a relative path (`about.html`, not `https://yoursite.com/about.html`). Write even one internal link as a full `https://` <abbr title="Uniform Resource Locator">URL</abbr> instead of a relative one, and this selector marks it external too. On a real site large enough to have more than one author, that's a real, confusing bug, not a hypothetical one.

## Going deeper: the `:not()` pseudo-class

This section is optional. Skip it and the diagnostic routine below still works.

`:not()` matches an element that would otherwise match the selector inside its parentheses, but doesn't. Read it as "everything except." It fits this chapter's theme directly, because it targets by structural relationship, the same way the combinators above do, just by exclusion instead of inclusion.

A common case: style every item in a list except the last one, useful for adding a separator between items without leaving a dangling one after the final entry.

<CssDemo>

```html
<nav class="crumbs">
  <a href="#">Routes</a>
  <a href="#">Ridge Loop</a>
  <a href="#">Trail Notes</a>
</nav>
```

```css
.crumbs {
  font-family: system-ui, sans-serif;
}
.crumbs a {
  color: #1d4ed8;
  text-decoration: none;
}
.crumbs a:not(:last-child) {
  margin-right: 6px;
  padding-right: 6px;
  border-right: 1px solid #94a3b8;
}
```

</CssDemo>

Every link except the last one gets a right-hand divider. Without `:not()` you'd need a class on every link except one, and remembering to leave it off the last one is exactly the kind of manual bookkeeping structural selectors exist to avoid.

`:not()` also combines with attribute selectors, which you just met above. A form where every input should look the same except the submit button:

<CssDemo>

```html
<form class="signup">
  <input type="text" placeholder="Name">
  <input type="email" placeholder="Email">
  <input type="submit" value="Sign up">
</form>
```

```css
.signup {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 240px;
  font-family: system-ui, sans-serif;
}
.signup input:not([type="submit"]) {
  border: 1px solid #94a3b8;
  border-radius: 4px;
  padding: 8px;
}
.signup input[type="submit"] {
  background-color: #0f766e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
}
```

</CssDemo>

`input:not([type="submit"])` reads naturally: every input, except the one whose type is submit. That's usually clearer than writing a rule for every input type you happen to be using and hoping you didn't miss one.

One specificity note, since [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md) covered the A-B-C method: `:not()` itself adds nothing to a selector's specificity. What counts is whatever is inside the parentheses. `a:not(:last-child)` scores the same as `a:last-child` would, one pseudo-class, not two.

## Going deeper: `:nth-child()` and `:nth-of-type()`

This section is also optional. Skip it and the diagnostic routine below still works.

[Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md) used `:nth-child(odd)` to stripe a list, without explaining what's actually happening behind that keyword. Here's the formula, and the sibling pseudo-class that chapter didn't cover.

### The `an+b` formula

`:nth-child()` takes an expression in the form `an+b`. CSS starts a counter, `n`, at 0 and counts up forever: 0, 1, 2, 3, and so on. For each value of `n`, it works out `an+b` and matches the child sitting at that position. Positions that don't exist, zero, negative, or past the last child, are simply skipped.

Work through `:nth-child(2n)`: at `n=0` that's position 0, which doesn't exist, so nothing matches yet. At `n=1` it's position 2. At `n=2` it's position 4. The pattern continues: 2, 4, 6, 8. Every even position. That's exactly what the keyword `even` means, and `:nth-child(2n)` and `:nth-child(even)` are the same selector.

<CssDemo>

```html
<ul class="cards">
  <li>Ridge Loop</li>
  <li>Harbour Path</li>
  <li>Meadow Circuit</li>
  <li>Summit Trail</li>
  <li>Creekside Walk</li>
</ul>
```

```css
.cards {
  list-style: none;
  padding: 0;
  font-family: system-ui, sans-serif;
}
.cards li {
  padding: 8px 12px;
}
.cards li:nth-child(2n) {
  background-color: #f1f5f9;
}
```

</CssDemo>

The second and fourth cards are shaded. Run the same formula for `:nth-child(2n+1)` and you'd get positions 1, 3, 5, which is `odd`.

Now a formula with no keyword shorthand: `:nth-child(3n+1)`, which reads as "every third item, starting from the first." At `n=0` that's position 1. At `n=1` it's position 4. At `n=2` it's position 7. At `n=3`, position 10.

<CssDemo>

```html
<ul class="cards">
  <li>Ridge Loop</li>
  <li>Harbour Path</li>
  <li>Meadow Circuit</li>
  <li>Summit Trail</li>
  <li>Creekside Walk</li>
  <li>Overlook Trail</li>
  <li>Marsh Boardwalk</li>
</ul>
```

```css
.cards {
  list-style: none;
  padding: 0;
  font-family: system-ui, sans-serif;
}
.cards li {
  padding: 8px 12px;
}
.cards li:nth-child(3n+1) {
  border-left: 3px solid #0f766e;
  font-weight: 600;
}
```

</CssDemo>

The first, fourth, and seventh cards get the marked border, three apart, starting from the first. A card grid displaying three per row is a real case for this: `:nth-child(3n+1)` marks the start of every row, which is useful for a left-edge style that shouldn't appear mid-row.

A single number with no `n` at all, like `:nth-child(3)`, skips the formula entirely and matches only the third child. No pattern, one position.

### `:nth-child()` versus `:nth-of-type()`

Both count position among siblings, but they count differently, and mixing them up is a common source of a selector that matches the wrong element or nothing at all.

**`:nth-child()` counts every sibling, regardless of what element it is.** **`:nth-of-type()` counts only siblings of the same element type as the one you're selecting.**

Here's where that distinction bites. This markup has a heading followed by two paragraphs, all siblings of each other:

```html
<div class="route">
  <h3>Ridge Loop</h3>
  <p>4.2 km, moderate difficulty.</p>
  <p>Trailhead parking on Birch Street.</p>
</div>
```

A rule meant to bold the first paragraph, written as `.route p:nth-child(1)`, will not match anything. `:nth-child()` counts across all children of `.route`, and the `h3` occupies position 1. The first `p` is at position 2, so `p:nth-child(1)` is asking for an element that is both a `p` and in position 1, and no element satisfies both.

`:nth-of-type()` fixes it, because it only counts among elements of the same type:

<CssDemo>

```html
<div class="route">
  <h3>Ridge Loop</h3>
  <p>4.2 km, moderate difficulty.</p>
  <p>Trailhead parking on Birch Street.</p>
</div>
```

```css
.route {
  font-family: system-ui, sans-serif;
}
.route p:nth-of-type(1) {
  font-weight: 700;
  color: #0f766e;
}
```

</CssDemo>

`p:nth-of-type(1)` means "the first `p` among the `p` siblings," ignoring that an `h3` came before it. It matches the first paragraph exactly as intended.

The rule of thumb: reach for `:nth-of-type()` whenever the element you're counting shares its parent with other kinds of elements, the way a heading sits alongside paragraphs above. Reach for `:nth-child()` when every sibling is the same type anyway, such as the `<li>` elements in the card examples earlier, where the two selectors would have matched identically.

## Diagnosing rendering problems

Put the whole chapter into a routine. When something on your page looks wrong, work through this in order rather than editing hopefully.

**1. Is the element where you think it is?** Inspect it and read the DOM tree around it. Unclosed tags and misplaced nesting change the tree, and a selector written for the intended structure won't match the actual one.

**2. Does your rule appear in the Styles panel at all?** If it doesn't, the selector never matched. Check for a missing dot or hash, a typo in a class name, a `>` that should be a space, or a capitalisation mismatch, since class names are case sensitive.

**3. If it appears but is struck through, what beat it?** The panel shows the winning rule above. Compare specificity using the A-B-C method from [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md), then fix the selector rather than reaching for `!important`.

**4. Is the value inherited from somewhere you forgot?** Check the Computed tab, which names the source of an inherited value.

**5. Is the box where you think it is?** Switch to the box model diagram. A gap you can't explain is a margin or padding on some element in the chain, and hovering the diagram highlights it on the page.

**6. Is the element even visible?** An element with zero height, `display: none`, or a colour matching its background is there in the DOM and invisible on screen. The tree tells you it exists; the Computed tab tells you why you can't see it.

Working the list beats guessing, and it gets faster with practice until it's automatic.

## Common mistakes to avoid

- **Reading the source instead of the DOM.** The browser repairs broken markup, so the tree can differ from your file. Inspect, don't assume.
- **Using a descendant selector where you needed a child selector.** It reaches into nested structures you meant to leave alone, and nested navigation is where this bites.
- **Expecting a sibling selector to look backwards.** They only match forward.
- **Mismatched case in class names.** `.mainNav` and `.mainnav` are different selectors.
- **Editing CSS at random to see what happens.** It sometimes works and teaches you nothing. Diagnose first.
- **Putting essential information in an attribute selector's generated content.** Same rule as [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md): decorative only.
- **Reaching for `:nth-child()` when siblings of mixed types are involved.** If a heading sits among the paragraphs you're counting, `:nth-of-type()` is almost always what you meant.

## The checklist

Run this over your own diagnosis before you move on.

- Understands that the DOM is the live tree the browser built, not the source file you wrote
- Can read the Elements panel and the Styles panel, including what the Computed tab shows
- Knows the difference between a descendant selector and a child selector, and when each reaches too far
- Knows that sibling combinators only match forward, never backward
- Uses attribute selectors correctly, including their real meaning: `[href^="https"]` means "starts with," not "is external"
- Works through the six-step diagnostic routine instead of editing at random
- If you read the optional sections: comfortable with `:not()` for exclusion, and with the difference between `:nth-child()` and `:nth-of-type()`

## Keep learning

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). What the tree is and how the browser builds it.
- [MDN: Combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators). The full reference for the four combinators in this chapter.
- [MDN: Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors). Every matching operator, including a few not covered here.
- [MDN: :not()](https://developer.mozilla.org/en-US/docs/Web/CSS/:not). The negation pseudo-class, with the selector-list form this chapter didn't need.
- [MDN: :nth-child()](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child). The full `an+b` reference, including `of` syntax beyond what this chapter covers.
- [Chrome DevTools: Get started with the DOM](https://developer.chrome.com/docs/devtools/dom). A guided tour of the Elements panel.
- [Video: Chrome DevTools Crash Course, by Traversy Media](https://www.youtube.com/watch?v=x4q86IjJFag). A broad walkthrough of the panels used in this chapter.

## Try it yourself (about 45 minutes)

Open your project in developer tools and sketch its DOM tree on paper, down three levels from `body`. Then check your sketch against the Elements panel. Anywhere the browser's tree differs from what you drew, work out why, because that difference is usually a markup mistake worth fixing.

Write one rule using a child combinator and one using a descendant combinator on the same ancestor, and confirm in the inspector that they match different sets of elements.

Style the first paragraph after each `h2` on your page with `h2 + p`, with no classes added to the HTML.

Add an attribute selector that marks every external link on your site, using `[href^="https"]`.

If you read the `:not()` section, find one place on your page where you can style "everything except the last one" or "everything except one specific type," and write it with `:not()` instead of adding a class to every element but one.

Finally, break something on purpose. Introduce a deliberate typo in a class name so a rule stops applying, then use the six-step routine above to find it without looking at your own edit. Time yourself. Do it again with a specificity conflict instead of a typo. The point is to make the routine automatic before you need it under pressure in the project weeks.

You can now diagnose anything that goes wrong. [Accessible Styling](/modules/css/accessible-styling.md) turns to making sure your page works for everyone, not just the visitor who matches your own screen, browser, and abilities.
