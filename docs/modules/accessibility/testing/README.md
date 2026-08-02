---
title: Testing for Accessibility
prerequisites:
  - accessibility/keyboard-access
  - accessibility/colour-contrast
---

# Testing What You Build

You can catch a large share of issues yourself, before anyone else sees the page.

**Try to use your page with the keyboard alone.** Can you reach and activate every link and control with Tab and Enter, and can you always see where focus is? This is the single most revealing test available, because it's the one automated tools can't fully do for you.

**Run an automated audit.** Lighthouse, built into Chrome and Edge's developer tools, flags missing alt text, poor contrast, and unlabelled fields in seconds. Open developer tools, choose the Lighthouse panel, tick the Accessibility category, and run it against your page. Then work the itemized list, since every flagged item comes with a link explaining what it wants and why. The [axe DevTools extension](https://www.deque.com/axe/devtools/) is more thorough again. Both are worth running every time.

**Zoom text to 200%** and look for clipping, overlap, or horizontal scrolling.

**Turn on reduce motion** in your operating system and reload. Your animations should stop.

## Going deeper: what your testing tools can't see

Lighthouse and tools like it catch real, common mistakes in seconds. They also cannot see most of what actually makes a page accessible.

Deque, one of the companies that builds these testing tools, analyzed roughly 300,000 accessibility issues across more than 13,000 audited pages and found that automated testing caught about 57 percent of the individual issues, counted by volume, and that's the generous figure. Measured a different way, by how many of the distinct WCAG success criteria can even be checked automatically at all, the commonly cited figure is closer to 20 to 30 percent. WebAIM makes the same point without attaching a number to it: automated tools have real limitations, "not all conformance failures can be automatically detected," and "absence of detected errors does not indicate that a page is accessible or conformant."

The gap isn't a tooling problem that a better tool will close. It's structural. A script can confirm that an `alt` attribute exists. It cannot tell you whether the words inside it actually describe the image:

```html
<!-- Passes every automated check: alt is present and non-empty -->
<img src="team-photo.jpg" alt="image1">

<!-- Actually accessible: alt describes what's in the photo -->
<img src="team-photo.jpg" alt="The five-person web team standing outside the campus library">
```

Both of those pass Lighthouse. Only one of them tells a screen reader user anything true. The same gap shows up anywhere a tool can check that a thing exists but not whether it's right: focus order that's technically reachable but makes no sense, an ARIA label that's present but wrong, a heading that exists but doesn't describe its section.

This is why the manual keyboard test above isn't a lesser, optional backup to the automated one. It catches a different, and often larger, category of problem. Run both every time, and don't let a clean Lighthouse score stand in for a page you've actually tried to use yourself.

## The checklist

Run this before you consider a page finished:

- Tested by keyboard alone: every control reachable, focus always visible
- Zoomed to 200%, with no clipping, overlap, or unreachable content
- Tested with an automated tool such as Lighthouse or axe, every flagged item addressed
- Reduce motion enabled once, to confirm animation actually stops
- Anything the manual test caught that the automated tools missed noted, not just fixed and forgotten

## Keep learning

- [Deque: Automated Accessibility Coverage Report](https://www.deque.com/automated-accessibility-coverage-report/). The data behind the automated-testing coverage figures above.
- [MDN: Accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name). A short glossary explanation of how an accessible name gets computed.
- [The a11y project checklist](https://www.a11yproject.com/checklist/). A practical list to work through on a real project.
- [axe DevTools](https://www.deque.com/axe/devtools/). A browser extension that audits a page against WCAG.
