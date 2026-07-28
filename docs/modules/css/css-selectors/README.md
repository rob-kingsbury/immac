---
title: CSS Selectors
prerequisites:
  - css/css-basics
---

# Choosing What to Style

The selector is the part of a rule that decides what gets styled. Three kinds of selector cover almost everything you'll do early on, and they differ in how *specific* they are.

## The element selector

The **element selector**, also called a type selector, targets every element of a given kind by its tag name. This rule finds every paragraph on the page and styles all of them at once:

<CssDemo>

```html
<p>Every paragraph gets this style.</p>
<p>Including this one, automatically.</p>
```

```css
p {
  color: #006969;
  line-height: 1.6;
}
```

</CssDemo>

Element selectors are deliberately broad. You did not tag anything or single any paragraph out. Every `p` on the page is affected, which makes this the right tool for setting a baseline, the default look of all your paragraphs, or all your headings, or all your links, before you start making exceptions to it.

When you want the same rule to apply to more than one kind of element, you can list several selectors in front of a single block, separated by commas. This is called **grouping**, and it saves you writing the same declarations twice:

<CssDemo>

```html
<h2>Coffee</h2>
<h2>Tea</h2>
<p>Both are served all day.</p>
```

```css
h2, p {
  color: #006969;
}
```

</CssDemo>

That one rule sets the colour on every `h2` and every `p` together. Grouping is just a shortcut. It behaves exactly as if you had written two identical rules.

## The class selector

Sooner or later you'll want to style *some* paragraphs differently from the rest, and an element selector has no way to single them out. A CSS **class** is a label you put on any elements you choose, using the `class` attribute in the HTML, and then target in CSS with a dot in front of the name:

<CssDemo>

```html
<p class="intro">This paragraph is the introduction.</p>
<p>This one is ordinary body text.</p>
<p class="intro">This one is an introduction too.</p>
```

```css
.intro {
  font-size: 1.3rem;
  font-weight: 600;
  color: #006969;
}
```

</CssDemo>

The dot in `.intro` is what tells CSS "this is a class name, not a tag name." Two things make classes the workhorse of CSS. You can put the same class on as many elements as you like, so one rule styles all of them. And one element can carry several classes at once, separated by spaces, as in `class="intro featured"`, picking up the styling from each.

Name classes for what the content *is* rather than what it currently looks like. `.intro` and `.warning` stay accurate forever. `.big-red-text` becomes a lie the day you change the colour.

## The ID selector

An **ID** is a label meant to identify one single element on the page. You set it with the `id` attribute and target it in CSS with a hash:

<CssDemo>

```html
<h2 id="summit">Summit Climb</h2>
<h2>Ridge Trail</h2>
```

```css
#summit {
  color: crimson;
  border-left: 4px solid crimson;
  padding-left: 0.6rem;
}
```

</CssDemo>

The rule is strict: **an ID must be unique within a page.** No two elements may share one. That's not a style preference, it's a requirement of valid HTML, and it's why IDs are used far less than classes for styling. If a look might ever apply to a second element, it should have been a class.

IDs are still genuinely useful elsewhere. They're the target of a link that jumps to a section of a page, `href="#summit"`, and they connect a form label to its input. For styling, reach for a class first and an ID only when you genuinely mean this one element and no other.

## The checklist

Run through this before you move on:

- You can choose between an element, class, or ID selector for a given job, and say why that one and not the other two
- Classes are named for what the content is, not what it currently looks like
- You know why an ID selector is reserved for one unique element, never reused

## Keep learning

- [MDN: CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors). The complete list, including what comes after these three.
- [W3Schools: CSS Selectors](https://www.w3schools.com/css/css_selectors.asp). A reference with more worked examples of each kind.
