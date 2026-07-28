---
title: Accessible Forms, in Brief
prerequisites:
  - html/html-form
---

# Accessible Forms, in Brief

Forms are where accessibility most often breaks. The core rule, every input needs a real `<label>` tied to it, is covered in [The Form Element](/modules/html/html-form/README.md#labels-are-not-optional). This page covers the second, related requirement.

WCAG Success Criterion 1.3.5, Identify Input Purpose, is an <abbr title="WCAG Level AA conformance">AA</abbr>-level criterion. It asks that a field's purpose, "this collects an email address," "this collects a postal code," be identifiable in code, not just implied by a visible label. A `<label>` tells a screen reader user what a field is for. It doesn't, on its own, tell a browser or an assistive technology what *kind* of data the field expects, which matters for autofill and for some assistive tools that adapt their input method to the field's purpose.

The HTML-level way to meet it is the `autocomplete` attribute, using its fixed vocabulary of tokens like `name`, `email`, and `street-address`:

```html
<label for="email">Email address</label>
<input type="email" id="email" name="email" autocomplete="email">
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<label for="demo-a11y-email">Email address</label>
<input type="email" id="demo-a11y-email" name="email" autocomplete="email">
</div>
</details>

[HTML Input](/modules/html/html-input/README.md) covers `autocomplete` in full; the connection to SC 1.3.5 belongs here, since accessibility standards are this page's home turf.

## The checklist

Run this over your form before you submit:

- Every input that collects a recognized kind of data (name, email, address, and similar) carries the matching `autocomplete` token

## Keep learning

- [MDN: autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete). The full token vocabulary.
- [WCAG: Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html). The success criterion this page implements.
