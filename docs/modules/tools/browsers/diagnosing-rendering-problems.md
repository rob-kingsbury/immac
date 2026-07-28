---
title: Diagnosing Rendering Problems
prerequisites:
  - tools/browsers/devtools
  - css/css-dom
  - css/css-precedence
---

# Diagnosing Rendering Problems

When something on your page looks wrong, work through this in order rather than editing hopefully. Editing CSS at random sometimes works and teaches you nothing; diagnose first.

**1. Is the element where you think it is?** Inspect it and read the DOM tree around it. Unclosed tags and misplaced nesting change the tree, and a selector written for the intended structure won't match the actual one.

**2. Does your rule appear in the Styles panel at all?** If it doesn't, the selector never matched. Check for a missing dot or hash, a typo in a class name, a `>` that should be a space, or a capitalisation mismatch, since class names are case sensitive.

**3. If it appears but is struck through, what beat it?** The panel shows the winning rule above. Compare specificity using the A-B-C method from [Specificity, Calculated Properly](/modules/css/css-precedence/README.md), then fix the selector rather than reaching for `!important`.

**4. Is the value inherited from somewhere you forgot?** Check the Computed tab, which names the source of an inherited value.

**5. Is the box where you think it is?** Switch to the box model diagram. A gap you can't explain is a margin or padding on some element in the chain, and hovering the diagram highlights it on the page.

**6. Is the element even visible?** An element with zero height, `display: none`, or a colour matching its background is there in the DOM and invisible on screen. The tree tells you it exists; the Computed tab tells you why you can't see it.

Working the list beats guessing, and it gets faster with practice until it's automatic.
