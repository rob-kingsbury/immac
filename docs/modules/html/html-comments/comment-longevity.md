---
title: Comments That Outlive the Code They Describe
prerequisites:
  - html/html-comments
---

# Comments That Outlive the Code They Describe

A comment that restates the next line goes stale the moment that line changes, because nobody remembers to update a sentence sitting next to code they're editing for an unrelated reason. A comment that explains a decision stays useful even after the code around it changes, because the reasoning behind a choice usually outlasts the choice itself:

```html
<!-- Bad: restates what the tag already says, and will drift out of sync -->
<!-- This is a div -->
<div class="card">

<!-- Good: explains a decision that isn't obvious from the markup alone -->
<!-- Card uses a div, not article, because these blocks aren't independently
     syndicated content, they're layout containers for the grid below -->
<div class="card">
```

If you can delete a comment and lose nothing, delete it. If you can delete a comment and lose the reason something is built the way it is, keep it.

## The checklist

Run this over your page before you move on:

- Every comment left in the file would be missed if deleted, either because it labels a region or explains a decision that isn't obvious from the markup alone
