---
title: Custom Properties versus Preprocessor Variables
prerequisites:
  - css/css-custom-properties
---

# Custom Properties versus Preprocessor Variables

You may see variables in Sass or Less written with a dollar sign, `$brand: #2563eb;`. They look similar to a custom property. They are not the same thing, and the difference is worth understanding.

Preprocessor variables are resolved **before** the CSS is written, in a separate build step, so by the time a browser sees the file they're gone, replaced by plain, flattened CSS. Preprocessor variables can't change at runtime and don't respond to the cascade.

Custom properties are **understood by the browser itself**. They cascade, inherit, can be redefined per selector the way [CSS Custom Properties and Variables](/modules/css/css-custom-properties/README.md) showed, and can differ between two elements on the same page, which is why scoping and theming work at all.

This course uses native custom properties rather than a preprocessor's. Nothing needs to be compiled, and everything here runs directly in every current browser. The same distinction, build-step versus browser-native, applies to nesting: see [CSS Nesting](/modules/css/css-nesting/README.md) for that comparison.
