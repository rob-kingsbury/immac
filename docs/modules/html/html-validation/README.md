---
title: HTML Validation
prerequisites:
  - html/html-document-structure
---

# <abbr title="HyperText Markup Language">HTML</abbr> Validation

## Checking your markup with the validator

A browser is remarkably forgiving. Miss a closing tag, misspell an attribute, or nest two elements in the wrong order, and most pages still render close enough to normal that nothing looks obviously broken. The browser is silently guessing at what you meant, and a guess that happens to look fine today can behave differently in a different browser, or once you add more markup around it. That's what makes broken markup dangerous: the mistake can hide indefinitely instead of announcing itself.

The [W3C Markup Validation Service](https://validator.w3.org/) checks your HTML against the actual specification instead of just trying its best to display it. Paste in your page's URL, or upload the file directly, and it reports every place your markup deviates from what's valid, with a line number and a plain description of the problem.

Here's roughly what an error looks like when a closing tag is missing:

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<div style="font-family: monospace; font-size: 0.85rem; border-left: 4px solid #cc0000; background: #fff0f0; padding: 0.6rem 0.9rem;">
<strong>Error:</strong> End tag for "body" seen, but there were open elements.<br>
<span style="opacity: 0.8;">From line 12, column 1; to line 12, column 7</span>
</div>
</div>
</details>

That message is telling you, in validator language, that something inside `<body>` was never closed, so the parser reached the end of the file still waiting for a closing tag. Read validator output carefully, because one real mistake often triggers several cascading errors below it. Fix the first error, revalidate, and the rest frequently disappear. Aim for zero errors on every page you build. It's a concrete, checkable bar, and clean validation is a habit that separates careful work from sloppy work.

Get in the habit of running your page through it before you consider it done, and don't wait for a dedicated review pass to do it. Forms and tables in particular are two of the easiest structures to write invalid HTML in: an unclosed `<td>`, a `<label for>` that doesn't match any `id`, a `<tr>` sitting outside a `<thead>` or `<tbody>`. Running a page through the validator the same day you build one, while the structure is still fresh in your mind, catches mistakes when they're a ten-second fix instead of an archaeology project weeks later.

### A second common error: tags closed out of order

The missing closing tag above is one common failure. The other is closing tags in the wrong order, which is easy to do once elements start nesting three or four deep:

```html
<!-- Wrong: </p> closes after </ul>, so the tags cross instead of nesting cleanly -->
<p>Read the list below.
<ul>
  <li>First item</li>
</ul></p>
```

```html
<!-- Right: each tag closes inside the one it opened inside -->
<p>Read the list below.</p>
<ul>
  <li>First item</li>
</ul>
```

Nesting has a simple rule: whatever you open last, you close first. The validator flags a crossed pair like the one above as an error, usually naming the tag it expected to see closed and the one it found instead. If a page throws a wall of errors that don't seem to relate to anything you actually did wrong, check for a crossed pair like this one first. It is one of the most common causes of a validator report that looks far worse than the actual mistake.

## The validator, your editor, and developer tools: three checkpoints for three different questions

The validator isn't the only place a mistake gets caught, and it's worth being precise about what each checkpoint actually checks, since a clean result from one doesn't guarantee a clean result from another.

The **validator** checks your source code against the HTML specification: is this valid, well-formed markup, independent of how any particular browser happens to render it. It catches mistakes a forgiving browser would otherwise hide, and it's the most complete check of the three.

[Developer tools](/modules/tools/browsers/devtools.md) show you what the browser actually built from your code, the live DOM, right now, in this browser. They catch mistakes in what actually renders, including things a validator can't see, like a `<div>` that ended up empty because a script failed partway through, or an image requesting the wrong path.

Your [editor](/modules/tools/vscode/editor-diagnostics.md) catches a narrower set of obvious slips while you're still typing, before either of the other two ever runs.

None of the three replaces the others. A page can pass every check your editor offers, validate cleanly, and still misbehave once you look at it in developer tools, because rendering behaviour and specification compliance are not the same question. Running all three, in that order, editor while you type, validator before you publish, developer tools once the page is live, is what "professional standards" means in practice.

## The checklist

Run this over your page before you move on:

- Zero errors in the [W3C Markup Validation Service](https://validator.w3.org/)
- Comfortable explaining the difference between what the validator checks and what developer tools show you

## Keep learning

- [W3C Markup Validation Service](https://validator.w3.org/). The tool itself, use it on every page before you consider it finished.
- [W3Schools: HTML5 Syntax](https://www.w3schools.com/html/html5_syntax.asp). A reference for the syntax rules the validator checks against.
- [Video: Validating HTML5, by Steve Griffith](https://www.youtube.com/watch?v=dqZMG75OsTc). A step-by-step walkthrough of using the validator and reading its output.
