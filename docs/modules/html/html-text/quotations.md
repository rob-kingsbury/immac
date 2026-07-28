---
title: Quotations
prerequisites:
  - html/html-text
---

# Quotations

Two elements mark quoted content. Use `<blockquote>` for a longer quote that stands on its own, and `<q>` for a short inline quote inside a sentence.

```html
<blockquote>
  <p>The web does not just connect machines, it connects people.</p>
</blockquote>

<p>She called it <q>the great equalizer</q> and moved on.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<blockquote>
  <p>The web does not just connect machines, it connects people.</p>
</blockquote>

<p>She called it <q>the great equalizer</q> and moved on.</p>
</div>
</details>

Marking quotes with the right element matters beyond looks. It tells assistive technology and search engines that the text is borrowed rather than your own words. Most browsers add quotation marks around `<q>` content automatically, which is one reason not to type your own quotation marks inside it.

## Going deeper: character entities and escaping reserved symbols

*Optional, about 5 minutes.*

Three characters mean something special to <abbr title="HyperText Markup Language">HTML</abbr>: `<`, `>`, and `&`. The browser uses them to find tags and attributes, which creates a problem the moment you actually want to type one of them as ordinary text.

```html
<p>Compare the two values with < and check the total.</p>
```

The browser reads that `<` and starts looking for a tag name. It finds "and," fails to make sense of it, and the rest of the sentence can render unpredictably or vanish depending on the browser. The fix is a **character entity**: a short, reserved piece of text that stands in for the character you actually want, so the browser reads it as content instead of markup.

```html
<p>Compare the two values with &lt; and check the total.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p>Compare the two values with &lt; and check the total.</p>
</div>
</details>

The entities you'll actually reach for, almost all of the time:

| Entity | Renders as | When you need it |
|---|---|---|
| `&lt;` | &lt; | A literal less-than sign |
| `&gt;` | &gt; | A literal greater-than sign |
| `&amp;` | &amp; | An ampersand, e.g. "Fish &amp; Chips" |
| `&quot;` | &quot; | A straight double quote inside text where it might be misread |
| `&copy;` | &copy; | A copyright symbol |
| `&nbsp;` | *(a space that won't line-break)* | Rare. Covered below. |

`&amp;` is the one you'll type most, because an ampersand shows up constantly in ordinary writing ("Sales &amp; Marketing," "the lakeside loop &amp; the summit climb") and, unlike `<`, it doesn't look dangerous the way a stray bracket does, so it's the easiest one to forget.

```html
<h2>Routes &amp; Difficulty</h2>
<p>Easy, moderate, then steep. &copy; Mountain Trail Guide.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<h2>Routes &amp; Difficulty</h2>
<p>Easy, moderate, then steep. &copy; Mountain Trail Guide.</p>
</div>
</details>

`&nbsp;` works differently from the rest. It doesn't stand in for a character you can't type, it changes behaviour. A regular space lets the browser break a line between two words. `&nbsp;` is a space that refuses that break, which is useful for keeping something like "10&nbsp;km" from splitting across two lines with the number stranded at the end of one and the unit at the start of the next. Reach for it rarely and on purpose. Most spacing is a <abbr title="Cascading Style Sheets">CSS</abbr> decision rather than an HTML one.

One more thing worth knowing: every named entity, including `&copy;`, also has a numeric form (`&#169;` for the copyright symbol). Numeric forms exist because they work even in older or unusual systems that don't recognize every named entity. For the handful of entities in the table above, the named form is what you'll see in almost all real code, and it's what this course expects.

## The checklist

Run this over your page before you move on:

- `<blockquote>` marks a standalone quote, `<q>` marks a short one inline

## Keep learning

- [W3Schools: HTML Quotation Elements](https://www.w3schools.com/html/html_quotation_elements.asp). Covers `<blockquote>`, `<q>`, and related elements like `<cite>` and `<abbr>`.
- [W3Schools: HTML Entities](https://www.w3schools.com/html/html_entities.asp). A fuller list than the table above, including the numeric forms.
