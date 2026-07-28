---
title: WCAG
prerequisites:
  - html/html-basics
---

# <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>

Accessibility means building pages that everyone can use, including people who navigate with a keyboard, a screen reader, voice control, or a magnifier. It isn't a separate feature you bolt on at the end. Most of it comes free when you write good <abbr title="HyperText Markup Language">HTML</abbr>, which is why this is one of the earliest topics in this course, not an optional final one.

## What WCAG is

The Web Content Accessibility Guidelines (WCAG) are the international standard for accessible web content. The current version is WCAG 2.2. You don't need to memorize it, but you should know how it's organized, because it's the reference everyone points to.

WCAG is built on four principles, often shortened to <abbr title="Perceivable, Operable, Understandable, Robust">POUR</abbr>:

- **Perceivable.** People can sense the content, so images need text alternatives and video needs captions.
- **Operable.** People can use the interface, so everything works by keyboard, not just a mouse.
- **Understandable.** People can follow it, so language, layout, and behaviour are predictable from page to page.
- **Robust.** It works with assistive technology, both today's and whatever comes next.

Most of the accessibility topics in this course are a practical application of those four ideas.

### Going deeper: what "AA" conformance actually means

WCAG doesn't ask for all-or-nothing compliance. It defines three conformance levels, A, AA, and AAA, each one a stricter tier built on top of the last.

Level A is the floor. Skip it and a page has real, obvious barriers. Level AA adds the requirements that make a page usable for the large majority of people with disabilities, including the 4.5:1 and 3:1 contrast ratios covered in [Colour Contrast](/modules/accessibility/colour-contrast/README.md), both AA requirements. Level AAA is stricter again, for example a 7:1 contrast ratio for normal text instead of 4.5:1, but the W3C itself does not recommend requiring it across an entire site: "it is not recommended that Level AAA conformance be required as a general policy for entire sites because it is not possible to satisfy all Level AAA success criteria for some content."

In practice, AA is the level almost everyone means when they say a site "meets WCAG." It's the level most accessibility laws and procurement standards reference. If a tool says something "passes" or "fails" without naming a level, assume AA.

That has one direct, practical effect: a colour pair that passes at 3:1 but fails at 4.5:1 is not good enough for normal-sized text. Check against 4.5:1 unless the text meets the large-text definition covered in Colour Contrast.

### Going deeper: the `lang` attribute you've been writing since your first skeleton

Every skeleton in this course starts the same way:

```html
<html lang="en">
```

You've typed that line dozens of times without a reason attached to it. Here's the reason. The `lang` attribute tells a screen reader which language's pronunciation rules to use for the text that follows. Without it, or with the wrong value, a screen reader either guesses or falls back to a default voice and mispronounces the page, word by word. This is what WCAG Success Criterion 3.1.1, Language of Page, requires, and it sits at Level A, the most basic tier there is.

`lang="en"` on `<html>` sets the language for the whole document. When one phrase or section is written in a different language than the rest of the page, set `lang` on that specific element too, not just the page:

```html
<!-- Wrong: the French phrase gets read using English pronunciation rules -->
<p>The chef calls it a mise en place, everything in its place before you start cooking.</p>

<!-- Right: the French phrase is marked, so the screen reader switches pronunciation for it -->
<p>The chef calls it a <span lang="fr">mise en place</span>, everything in its place before you start cooking.</p>
```

This second rule is WCAG Success Criterion 3.1.2, Language of Parts. It's a small piece of markup, and it only matters at the moments a page genuinely switches languages: a quoted phrase, a name, a menu item borrowed from another language. At that moment, though, it's the difference between a screen reader saying something intelligible and something that sounds like noise.

## The checklist

Run this over your understanding before you move on:

- Can name the four WCAG principles (POUR) and give one example of each
- Knows that AA, not AAA, is the level this course and most real-world standards target
- `lang` set correctly on `<html>`, and on any part of a page written in a different language

## Keep learning

- [W3C WAI: Understanding Conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance). The source for the A, AA, AAA levels covered above, including the note on why AAA isn't required site-wide.
- [MDN: the lang global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang). Full reference for `lang` and `xml:lang`, with more examples of language tags.
- [W3Schools: Accessibility](https://www.w3schools.com/accessibility/index.php). A structured overview covering the same POUR principles with more examples.
- [WebAIM: Introduction to Web Accessibility](https://webaim.org/intro/). One of the most widely used accessibility education resources on the web, written for beginners.
- [Video: WCAG for Beginners, by Silktide](https://www.youtube.com/watch?v=5H1JGdqLrWo). A clear introduction to the guidelines this chapter is built on.
