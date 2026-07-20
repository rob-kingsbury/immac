---
title: Introduction to CSS
---

# Introduction to CSS

In MTM1511 you built pages out of HTML: headings, paragraphs, lists, links, all structured and meaningful, but plain. Every one of those pages arrives in the browser looking almost identical, black text on a white background in a default serif font. This course is about changing that. CSS is the language that turns structured HTML into a designed page, and this week covers what it is, how you attach it to your HTML, and the handful of core ideas the rest of the course builds on.

## What CSS is

CSS stands for Cascading Style Sheets. It's a separate language from HTML, with its own syntax, and it has one job: describe how HTML should look. Colour, spacing, fonts, layout, and every visual decision on a page is CSS.

The reason it's a separate language, and not just more HTML, is a principle worth understanding on day one: HTML handles structure and meaning, CSS handles presentation. Keeping them apart means one HTML file can be restyled completely without touching its content, and one stylesheet can style an entire site's worth of pages at once. Change a colour in one place, and every page updates.

Here is the same HTML, once with no CSS and once with a small stylesheet applied. The markup is identical. Only the styling differs.

<CssDemo summary="Result: no CSS">

```html
<div class="profile">
  <h2>Ada Lovelace</h2>
  <p>Mathematician and writer, often called the first programmer.</p>
</div>
```

</CssDemo>

Now the same markup, with a stylesheet added:

<CssDemo summary="Result: with CSS">

```html
<div class="profile">
  <h2>Ada Lovelace</h2>
  <p>Mathematician and writer, often called the first programmer.</p>
</div>
```

```css
.profile {
  background-color: #f1f5f9;
  border-radius: 8px;
  padding: 1rem 1.25rem;
}
.profile h2 {
  color: #6d28d9;
  margin-top: 0;
}
.profile p {
  color: #475569;
  margin-bottom: 0;
}
```

</CssDemo>

You'll be able to write every line of that styling yourself by the end of this course. The point right now is narrower: CSS, and nothing else, created the difference. The words, the heading, and the structure never changed.

**A note on the Result panels in this course.** They render real CSS in your browser, not screenshots. Each Result is an isolated preview, so the many examples on a single page never style each other, and the code shown above each Result is exactly what runs. Type that same code into your own stylesheet and you get the same result.

## Attaching CSS to HTML

There are three ways to apply CSS to a page. This course uses external stylesheets almost exclusively, but you should know all three exist and why that one wins.

The first is an inline style, written directly on an element with the `style` attribute:

```html
<p style="color: crimson;">This paragraph is red.</p>
```

The second is an internal stylesheet, written inside a `<style>` element in the page's `<head>`:

```html
<head>
  <style>
    p { color: crimson; }
  </style>
</head>
```

Both work, and both trap your styles inside a single page. The external stylesheet keeps your CSS in its own file and links it into the HTML. This is what professionals use, because one stylesheet can serve an entire site, and your structure and styling stay in separate files.

You write your CSS in a file with a `.css` extension, commonly named `styles.css`, and connect it with a `<link>` element inside the `<head>` of your HTML:

```html
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
```

The `<link>` element needs two attributes. `rel="stylesheet"` tells the browser what kind of file this is, and `href` gives the path to it, exactly like the `href` on an anchor, pointing at a file instead of a page. With that line in place, every rule in `styles.css` applies to the page. From here on in this course, "write some CSS" means "add rules to your linked stylesheet."

## The anatomy of a rule

CSS is made of rules. A rule says which elements to style and what to do to them. Every rule has the same shape:

```css
h1 {
  color: crimson;
}
```

That single rule has a few named parts, and the whole course leans on this vocabulary:

<div class="css-anatomy">
<code><span class="a-sel">h1</span> { <span class="a-prop">color</span>: <span class="a-val">crimson</span>; }</code>
<ul>
<li><span class="a-dot a-sel-dot"></span><strong>Selector</strong> (h1): which elements this rule targets.</li>
<li><span class="a-dot a-prop-dot"></span><strong>Property</strong> (color): the aspect you're changing.</li>
<li><span class="a-dot a-val-dot"></span><strong>Value</strong> (crimson): the setting you're giving that property.</li>
</ul>
</div>

A property and its value together, `color: crimson;`, are called a **declaration**, and every declaration ends with a semicolon. The curly braces hold a declaration block, and a block can contain as many declarations as you need:

<CssDemo>

```html
<h1>Styled heading</h1>
```

```css
h1 {
  color: crimson;
  font-size: 2.5rem;
  text-align: center;
}
```

</CssDemo>

The semicolon after each declaration matters. Leave one out and the browser often ignores that declaration and the next one too, one of the most common early CSS bugs. Get in the habit of ending every declaration with a semicolon, including the last one in a block, even though the last one is technically optional.

## Selectors: element, class, and ID

The selector is how a rule finds its targets. This week covers the three you'll use constantly. The rest of the selector story has its own week later in the course.

### Element selectors

An element selector targets every element of a given type by its tag name. This rule styles every paragraph on the page:

<CssDemo>

```html
<p>Every paragraph gets this style.</p>
<p>Including this one, automatically.</p>
```

```css
p {
  color: #475569;
  line-height: 1.6;
}
```

</CssDemo>

Element selectors are broad by design. They're the right tool for setting a baseline, the default look of all your paragraphs, headings, or links, before you start making exceptions.

### Class selectors

A class selector targets only the elements you tag with a matching `class` attribute. You write a class selector with a leading dot, and you add the class to elements in your HTML without the dot:

<CssDemo>

```html
<p>A normal sentence with a <span class="highlight">highlighted phrase</span> inside it.</p>
<p class="highlight">This entire paragraph is highlighted.</p>
```

```css
.highlight {
  background-color: #fef08a;
  padding: 0.15rem 0.4rem;
}
```

</CssDemo>

Classes are the workhorse of CSS. The same class can go on as many elements as you like, across as many pages as you like, and one rule styles them all consistently. Most of the CSS you write this term will be class-based.

### ID selectors

An ID selector targets a single, specific element. You write it with a leading hash, and an `id` value must be unique on the page, used once and only once:

<CssDemo>

```html
<header id="site-header">The one and only site header</header>
```

```css
#site-header {
  background-color: #1e293b;
  color: white;
  padding: 1rem;
}
```

</CssDemo>

The practical guideline: reach for classes by default, and use an ID only when you genuinely have one unique element, since a class can do everything an ID can while staying reusable. If you find yourself wanting the same ID on two elements, that's the signal it should have been a class.

## Properties and values

Selectors decide what to style. Properties and values decide how. There are hundreds of CSS properties, and you'll meet them steadily across the course, but a small set covers most of what you need to make a page look intentional. Here are a few you'll use immediately:

<CssDemo>

```html
<div class="card">A styled card, built from seven declarations.</div>
```

```css
.card {
  color: #334155;
  background-color: #f8fafc;
  font-size: 1.1rem;
  text-align: center;
  padding: 1.5rem;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
}
```

</CssDemo>

Two of those values deserve a first note. Colours can be written several ways, and the `#334155` form is a hex code, which the Typography and Colour week covers in full. The `1.1rem` font size uses `rem`, a relative unit that scales with the reader's preferred text size, which is why this course prefers it over fixed pixel sizes for text. You don't need to master every property now. You need to recognize the rule structure, and know that looking a property up, on a reference like MDN, is a normal part of writing CSS at every level.

## The cascade: how conflicts resolve

CSS is short for *Cascading* Style Sheets, and the cascade is the system that decides which rule wins when more than one applies to the same element. This week covers the two parts of it you'll hit first.

The first is inheritance. Some properties, colour and font among them, pass down from an element to the elements nested inside it. Set a colour on a container, and its children take that colour without being targeted directly:

<CssDemo>

```html
<div class="callout">
  <h3>This heading is purple</h3>
  <p>And so is this paragraph, without its own rule.</p>
</div>
```

```css
.callout {
  color: #7c3aed;
}
```

</CssDemo>

The second is source order. When two rules carry the same weight and both apply to an element, the one written later in the stylesheet wins. Here two rules target the same paragraph, and the second overrides the first:

<CssDemo>

```html
<p>This text is green, because the green rule comes second.</p>
```

```css
p {
  color: blue;
}
p {
  color: green;
}
```

</CssDemo>

That is only part of the story. When rules carry different weights, a more specific selector can beat an earlier one regardless of order, and that mechanism, specificity, is involved enough to get its own week later in the course. For now, hold onto two facts: styling flows downward through inheritance, and among equally specific rules, the last one written wins.

## Keep learning

- [MDN: CSS first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics). Mozilla's own beginner path through the concepts in this chapter, and a reference you'll return to all term.
- [MDN: CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference). The full list of properties. Bookmark it now and look properties up as you meet them, rather than memorizing.
- [W3Schools: CSS Introduction](https://www.w3schools.com/css/css_intro.asp). A second explanation of the same basics, with small editable examples if a concept hasn't clicked yet.
- [Video: CSS in 100 Seconds, by Fireship](https://www.youtube.com/watch?v=OEV8gMkCHXQ). A fast, high-level overview of what CSS is and where it fits, useful before the detail.

## Try it yourself

Open the multi-page site you started in MTM1511. Create a `styles.css` file in the same folder, and link it from your page's `<head>` with a `<link>` element. Confirm the connection works by adding one obvious rule, something like `body { background-color: #f1f5f9; }`, and reloading the page. If the background changes, your stylesheet is wired up.

Now practice all three selector types on your own content. Give your paragraphs a colour and a comfortable `line-height` with an element selector. Add a class such as `highlight` to a word or two and style it. Style your single most important unique element, a header or a hero area, with an ID. Reload as you go using Live Server. Then stage, commit, and push, the same workflow from MTM1511, so this week's styling lands in your repository.
