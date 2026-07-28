---
title: Testing Responsive Work
prerequisites:
  - tools/browsers/devtools
  - css/css-media-queries
---

# Testing Your Work

Four ways to test, in increasing order of trustworthiness.

**Resize the browser window.** Fast, and fine for finding breakpoints. It won't reveal a missing viewport tag, touch targets that are too small, or how the page actually reads at arm's length.

**Use device emulation in developer tools.** The toggle looks like a phone and tablet icon. It simulates specific device widths and lets you rotate between portrait and landscape. Better than dragging, because you can test exact widths repeatedly.

**Look at it on a real phone.** This is the one that catches what the others miss: actual touch target sizes, actual text legibility, actual rendering. Your project is published to GitHub Pages at a public <abbr title="Uniform Resource Locator">URL</abbr>, so you can open it on your own phone in seconds. Do this before calling any layout finished.

**Look at it in more than one browser.** Everything above tests screen size. It doesn't test whether Chrome, Firefox, and Safari agree on how to render your CSS, and they don't always. A property can be supported in one engine and not another, or supported with a slightly different default. Two habits cover most of what you need: check a feature's support at [caniuse.com](https://caniuse.com/) or [webstatus.dev](https://webstatus.dev/) before depending on it, and open your finished page in at least two real browsers, not just two device-emulation profiles of the same one, before calling a layout done.

## Keep learning

- [Chrome DevTools: Simulate mobile devices](https://developer.chrome.com/docs/devtools/device-mode). How to use the device emulation described above.
