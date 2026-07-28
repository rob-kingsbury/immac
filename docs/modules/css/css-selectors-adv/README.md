---
title: Descendant, Child, Sibling, and Attribute Selectors
prerequisites:
  - css/css-dom
  - css/css-complex-selectors
---

# Targeting by Structure: Descendant, Child, Sibling, and Attribute Selectors

## Descendant and child selectors, precisely

You met combinators in [Combinators](/modules/css/css-complex-selectors/README.md). Now they have a structure to refer to.

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

Marking external links and file downloads automatically, with no classes to maintain, is exactly what attribute selectors are for. Note that the marker above is decorative, so per the rule about generated content in [Pseudo-Elements](/modules/css/css-pseudo-elements/README.md), the same information should also be conveyed in the link text itself for anything a visitor genuinely needs to know.

One caveat on `[href^="https"]` specifically: it doesn't actually mean "external," it means "starts with https." That happens to sort external from internal links correctly on a site like the one you're building, where every internal link is written as a relative path (`about.html`, not `https://yoursite.com/about.html`). Write even one internal link as a full `https://` <abbr title="Uniform Resource Locator">URL</abbr> instead of a relative one, and this selector marks it external too. On a real site large enough to have more than one author, that's a real, confusing bug, not a hypothetical one.

## Common mistakes to avoid

- **Using a descendant selector where you needed a child selector.** It reaches into nested structures you meant to leave alone, and nested navigation is where this bites.
- **Expecting a sibling selector to look backwards.** They only match forward.
- **Mismatched case in class names.** `.mainNav` and `.mainnav` are different selectors.
- **Putting essential information in an attribute selector's generated content.** Same rule as [Pseudo-Elements](/modules/css/css-pseudo-elements/README.md): decorative only.

## The checklist

Run this over your own diagnosis before you move on.

- Knows the difference between a descendant selector and a child selector, and when each reaches too far
- Knows that sibling combinators only match forward, never backward
- Uses attribute selectors correctly, including their real meaning: `[href^="https"]` means "starts with," not "is external"

## Keep learning

- [MDN: Combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators). The full reference for the four combinators in this module.
- [MDN: Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors). Every matching operator, including a few not covered here.
