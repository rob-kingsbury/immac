---
title: The DOM and CSS Targeting
---

# The DOM and CSS Targeting

You've been writing selectors since Week 1 without a precise picture of what they're selecting *from*. This week supplies it. The browser doesn't apply your CSS to a text file. It applies it to a structure it built in memory called the **DOM**, and once you can see that structure, targeting stops being trial and error.

This is the diagnostic week. By the end of it you should be able to work out why any rule on your page is or isn't applying, without changing anything at random to find out.

## What the DOM is

**DOM** stands for Document Object Model. When a browser receives your HTML, it doesn't keep the text. It parses it and builds a tree of objects in memory, one for each element, nested exactly as your tags were nested. That tree is the DOM, and it's what your CSS actually styles.

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

Two consequences matter. First, **the DOM is the live structure, not your source file.** Fix a typo in your HTML and save, and the browser rebuilds the tree. Second, **the browser repairs broken markup while building it.** Forget a closing tag and the browser will guess where it should have gone, which means the tree it built may not be the tree you intended. That's a common cause of a selector that should match and doesn't, and the inspector is where you catch it.

## Reading the DOM in developer tools

The Elements panel of developer tools shows the DOM tree, not your source. That difference is the whole reason to look at it.

Open it and you can expand and collapse branches, hover any node to highlight it on the page, and see exactly how the browser understood your markup. When a rule isn't matching, the first question is always "is the element where I think it is in the tree," and this panel answers it in seconds.

Below the tree, the Styles panel shows every rule affecting the selected element. Three things there earn their keep:

- **Rules are listed most-specific first,** with the winner at the top.
- **Overridden declarations are struck through,** so you can see precisely what beat what.
- **The Computed tab** shows the final value of every property after the cascade, inheritance, and the browser's defaults have all been resolved.

That last one deserves attention. **Computed style** is the answer to "what is this element's font size, actually," including values it inherited and values the browser supplied that you never wrote. When a value surprises you, Computed tells you where it came from, usually with a link to the rule responsible.

## Descendant and child selectors, precisely

You met combinators in Week 4. Now they have a structure to refer to.

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
  color: #64748b;
}
a[href$=".pdf"]::after {
  content: " (PDF)";
  font-size: 0.85em;
  color: #b45309;
}
```

</CssDemo>

The syntax is a set of matching operators inside square brackets. `[href^="https"]` matches when the value **starts with** that string. `[href$=".pdf"]` matches when it **ends with** it. `[href*="example"]` matches when it **contains** it. And plain `[type="email"]` matches an exact value.

Marking external links and file downloads automatically, with no classes to maintain, is exactly what attribute selectors are for. Note that the marker above is decorative, so per Week 4's rule about generated content, the same information should also be conveyed in the link text itself for anything a visitor genuinely needs to know.

## Diagnosing rendering problems

Put the whole chapter into a routine. When something on your page looks wrong, work through this in order rather than editing hopefully.

**1. Is the element where you think it is?** Inspect it and read the DOM tree around it. Unclosed tags and misplaced nesting change the tree, and a selector written for the intended structure won't match the actual one.

**2. Does your rule appear in the Styles panel at all?** If it doesn't, the selector never matched. Check for a missing dot or hash, a typo in a class name, a `>` that should be a space, or a capitalisation mismatch, since class names are case sensitive.

**3. If it appears but is struck through, what beat it?** The panel shows the winning rule above. Compare specificity using the A-B-C method from Week 4, then fix the selector rather than reaching for `!important`.

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
- **Putting essential information in an attribute selector's generated content.** Same rule as Week 4: decorative only.

## Keep learning

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). What the tree is and how the browser builds it.
- [MDN: Combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators). The full reference for the four combinators in this chapter.
- [MDN: Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors). Every matching operator, including a few not covered here.
- [Chrome DevTools: Get started with the DOM](https://developer.chrome.com/docs/devtools/dom). A guided tour of the Elements panel.
- [Video: Chrome DevTools Crash Course, by Traversy Media](https://www.youtube.com/watch?v=x4q86IjJFag). A broad walkthrough of the panels used in this chapter.

## Try it yourself

Open your project in developer tools and sketch its DOM tree on paper, down three levels from `body`. Then check your sketch against the Elements panel. Anywhere the browser's tree differs from what you drew, work out why, because that difference is usually a markup mistake worth fixing.

Write one rule using a child combinator and one using a descendant combinator on the same ancestor, and confirm in the inspector that they match different sets of elements.

Style the first paragraph after each `h2` on your page with `h2 + p`, with no classes added to the HTML.

Add an attribute selector that marks every external link on your site, using `[href^="https"]`.

Finally, break something on purpose. Introduce a deliberate typo in a class name so a rule stops applying, then use the six-step routine above to find it without looking at your own edit. Time yourself. Do it again with a specificity conflict instead of a typo. The point is to make the routine automatic before you need it under pressure in the project weeks.
