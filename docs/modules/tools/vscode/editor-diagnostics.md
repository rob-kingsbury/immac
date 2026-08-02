---
title: Your Editor Catches Some of This Before You Even Save
prerequisites:
  - html/html-validation
---

# Your Editor Catches Some of This Before You Even Save

*(Optional. This adds a checkpoint earlier than either the [validator](/modules/html/html-validation/README.md) or [developer tools](/modules/tools/browsers/devtools.md), not a replacement for either.)*

The validator catches mistakes when you run it, and developer tools show you what actually rendered. Both of those happen after you've saved the file, and usually after you've already moved on to the next thing. VS Code has its own, smaller layer of checking that happens while you're still typing.

Problems VS Code recognizes, a closing tag that doesn't match the tag it was meant to close, a quote that never gets closed, an attribute written twice, get underlined directly in the editor with a red squiggly line, the same convention a spell-checker uses. Hover over the underline and a short description appears in a tooltip, without leaving the file.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
Problems panel: 2 warnings. contact.html: attribute "class" already defined (line 9). contact.html: end tag "div" seen, but there were open elements (line 22).
</div>
</details>

This is narrower than what the W3C validator checks. It's built to catch obvious syntax slips as you make them, not to enforce the full specification the way the validator does, so a clean editor with no squiggly lines is not the same thing as a page that validates. Treat it as an early warning, not a substitute for running the validator before you consider a page done.

Every problem VS Code has flagged across your currently open files also collects in one place: the **Problems panel**, opened from the View menu or with `Ctrl/Cmd+Shift+M`. Instead of hunting through a long file for a stray squiggly line, the panel lists every issue at once, each one a clickable link that jumps straight to the line it's on.

The order this gives you is worth holding onto: your editor catches a slip before you save, the [validator](/modules/html/html-validation/README.md) catches what's left before you publish, and [developer tools](/modules/tools/browsers/devtools.md) catch whatever only shows up once the browser actually renders the page. Three checkpoints, each looking for something the others can't see.

## The checklist

Run this over your workflow before you move on:

- Comfortable opening the Problems panel (`Ctrl/Cmd+Shift+M`) and jumping to a flagged line
