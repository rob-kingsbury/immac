---
title: HTML Validation
prerequisites:
  - html/html-document-structure
---

# <abbr title="HyperText Markup Language">HTML</abbr> Validation

## Checking your markup with the validator

A browser is remarkably forgiving. Miss a closing tag, misspell an attribute, or nest two elements in the wrong order, and most pages still render close enough to normal that nothing looks obviously broken. The browser is silently guessing at what you meant, and a guess that happens to look fine today can behave differently in a different browser, or once you add more markup around it. That's what makes broken markup dangerous: the mistake can hide indefinitely instead of announcing itself.

The [W3C Markup Validation Service](https://validator.w3.org/) checks your HTML against the actual specification instead of just trying its best to display it. Paste in your page's URL, or upload the file directly, and it reports every place your markup deviates from what's valid, with a line number and a plain description of the problem.

Get in the habit of running your page through it before you consider it done. [Code Quality and Validation](/modules/html/code-quality-validation.md) covers this in full.

## The checklist

Run this over your page before you move on:

- Zero errors in the [W3C Markup Validation Service](https://validator.w3.org/)
