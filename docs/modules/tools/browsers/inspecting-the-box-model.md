---
title: Inspecting the Box Model
prerequisites:
  - tools/browsers/devtools
  - css/css-box-model
---

# Inspecting the Box Model

You do not have to reason about padding, border, and margin from memory. Right-click an element, choose **Inspect**, and look for the box model diagram in developer tools, usually under a Computed or Layout tab. It draws the four layers as nested rectangles with the real pixel value of each side filled in.

This is the fastest way to answer three questions that come up constantly:

- **"Where is this gap coming from?"** Hover the margin and padding regions in the diagram and the browser highlights the matching area on the page in colour.
- **"Why is this box wider than I set?"** The diagram shows content, padding, and border separately, so you can see exactly what's adding up.
- **"Is my rule even applying?"** The values shown are the computed ones actually in effect, not what you hoped you wrote.

You can also edit values directly in that diagram and watch the page respond, which is a much faster way to find the right spacing than saving and reloading.
