---
title: HTML Input
prerequisites:
  - html/html-form
---

# <abbr title="HyperText Markup Language">HTML</abbr> Input

## Inputs and input types

The `<input>` element is the workhorse, and its `type` attribute changes both how it behaves and what keyboard a phone shows. Choosing the right type is a real usability and accessibility decision, not a detail.

```html
<input type="text">      <!-- a single line of text -->
<input type="email">     <!-- expects an email, validates format -->
<input type="tel">       <!-- phone number, numeric keypad on mobile -->
<input type="url">       <!-- expects a web address -->
<input type="number">    <!-- numeric input with steppers -->
<input type="date">      <!-- a date picker -->
<input type="password">  <!-- masked text -->
<input type="checkbox">  <!-- an on/off choice -->
<input type="radio">     <!-- one choice from a group -->
```

Put a few of those types to work in labelled fields, each connected with `for` and `id`, the pattern [HTML Form](/modules/html/html-form/README.md) explains in full:

```html
<label for="demo-email">Email</label>
<input type="email" id="demo-email">

<label for="demo-qty">Quantity</label>
<input type="number" id="demo-qty" min="0" max="10">

<label for="demo-date">Date</label>
<input type="date" id="demo-date">

<label for="demo-sub">Subscribe</label>
<input type="checkbox" id="demo-sub">
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<label for="demo-email">Email</label>
<input type="email" id="demo-email">

<label for="demo-qty">Quantity</label>
<input type="number" id="demo-qty" min="0" max="10">

<label for="demo-date">Date</label>
<input type="date" id="demo-date">

<label for="demo-sub">Subscribe</label>
<input type="checkbox" id="demo-sub">
</div>
</details>

The number field shows steppers and the date field opens a picker. Same markup, different built-in behaviour per type.

You may also see a label written by wrapping the input inside it, with no `for` or `id` at all:

```html
<label>Email <input type="email"></label>
```

This is valid HTML, called implicit association, and browsers do connect the two. It's used less in this course because not every screen reader supports it reliably, where the explicit `for`/`id` pattern above is universally supported. Recognizing both is worth knowing, since you'll see the implicit form in other people's code.

Using `type="email"` instead of `type="text"` means the browser can check the format and mobile users get an email-optimized keyboard, all for free.

For longer text use `<textarea>`, and for a list of options use `<select>`:

```html
<textarea name="message" rows="4"></textarea>

<select name="topic">
  <option value="general">General enquiry</option>
  <option value="support">Support</option>
</select>
```

### Going deeper: autocomplete

Optional, not needed for the in-class build, but worth knowing the first time a form fills in your address before you've typed a letter.

`autocomplete` tells the browser what kind of value a field expects, using a fixed set of keywords from the <abbr title="HyperText Markup Language">HTML</abbr> spec: `name`, `email`, `tel`, `street-address`, `postal-code`, `cc-number`, and dozens more. The browser and the operating system's password manager use that hint to fill the field from data already saved elsewhere.

```html
<label for="full-name">Full name</label>
<input type="text" id="full-name" name="name" autocomplete="name">

<label for="contact-email">Email</label>
<input type="email" id="contact-email" name="email" autocomplete="email">
```

One attribute, and it's an accessibility win as much as a convenience one: some visitors rely on autofill because typing is slow or difficult for them. It's also how you satisfy WCAG Success Criterion 1.3.5, Identify Input Purpose, the AA-level requirement named back in [Web Accessibility Fundamentals](/modules/accessibility/web-accessibility-fundamentals.md): `autocomplete`'s token vocabulary is the HTML-level technique for meeting it. Reserve `autocomplete="off"` for a field that should never be autofilled, such as a one-time code.

### Going deeper: inputmode, a hint for the keyboard only

Optional. `type` and `inputmode` sound like they do the same job, but they don't. `type` changes what the browser validates and, for several values, which keyboard shows. `inputmode` changes only the on-screen keyboard. It adds no validation of its own.

That difference matters most on a field that's digit-heavy but not actually a number, a credit card field or a phone number typed with spaces or dashes:

```html
<!-- Wrong tool: type="number" adds spinner arrows nobody wants here, and
     rejects the spaces most people type between groups of digits -->
<input type="number" id="cc" name="cc-number">

<!-- Right: type="text" keeps spaces and dashes legal, inputmode="numeric"
     still gives mobile users a number pad instead of a full keyboard -->
<input type="text" inputmode="numeric" id="cc" name="cc-number"
       pattern="[\d ]*" autocomplete="cc-number">
```

A field with its own dedicated type, `type="email"` or `type="tel"`, already gets the right keyboard and the right validation together, so `inputmode` rarely comes up there. Reach for `type="text"` plus `inputmode` only when nothing built into `type` fits the data, the same situation `pattern` covers in [Built-in Form Validation](/modules/html/html-form-validation/README.md).

## Buttons

A form isn't complete without a way to submit it. Three distinct button behaviours exist, and confusing them is a common source of bugs.

`<button type="submit">` submits the form. This is the default type for a `<button>` inside a `<form>`, so leaving off `type` entirely also submits, which is exactly why explicit typing matters: a button meant only to do something with JavaScript, if left untyped inside a form, will submit the form by accident.

`<button type="reset">` clears every field in the form back to its original value. Use it rarely. Clearing a form a user has spent time filling in is more often a frustration than a convenience.

`<button type="button">` does nothing on its own. It exists purely as a hook for JavaScript, for things like "show password" toggles or adding another row to a list. You won't wire up the behaviour until a later course, but the type belongs in your markup now, whenever a button isn't meant to submit.

```html
<button type="submit">Send message</button>
<button type="reset">Clear form</button>
<button type="button">Show password</button>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<button type="submit">Send message</button>
<button type="reset">Clear form</button>
<button type="button">Show password</button>
</div>
</details>

You'll sometimes see `<input type="submit" value="Send">` instead of `<button type="submit">Send</button>`. Both submit the form. `<button>` is the better default, because its content can include an icon or nested markup, where an `<input>`'s label is limited to its plain-text `value`.

A form needs exactly one primary submit action. If a form has both a submit and a reset button, make the submit button visually and structurally the primary one, since it's the action nearly every user wants and the reset is the rare exception.

## The checklist

Run this over your inputs before you submit:

- Every input has a real `type`, chosen for what it collects, not left as `type="text"` by default
- Exactly one primary submit action; any reset button is visually secondary
- `<button>` elements are explicitly typed (`submit`, `reset`, or `button`), never left to fall back on the default

## Keep learning

- [W3Schools: HTML Forms](https://www.w3schools.com/html/html_forms.asp). A full reference for input types and attributes.
