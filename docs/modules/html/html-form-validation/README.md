---
title: Built-in Form Validation
prerequisites:
  - html/html-input
---

# Built-in Form Validation

## Built-in validation

HTML can enforce basic rules before anything is submitted, with no scripting. `required` makes a field mandatory, and attributes like `minlength`, `maxlength`, `min`, `max`, and `pattern` constrain the value.

```html
<label for="user-email">Email</label>
<input type="email" id="user-email" name="email" required>

<label for="age">Age</label>
<input type="number" id="age" name="age" min="16" max="120">
```

The browser shows its own error messages and blocks submission until the rules are met. This is a first line of defence and a usability aid. It is not security. A real application also validates on the server, because anything in the browser can be bypassed. You'll cover that side later; here, know that client-side validation is for helping honest users, not for trusting them.

### Going deeper: pattern for a specific format

Optional, a light touch only. `type="email"` and `min`/`max` cover most validation this course needs, but sometimes a field has a specific format none of the built-in types check, like a postal code. `pattern` takes a regular expression and blocks submission until the value matches. This course doesn't teach regular expressions, so treat the syntax below as a fact worth recognizing, not something to write from scratch yet:

```html
<label for="postal">Postal code</label>
<input type="text" id="postal" name="postal"
       pattern="[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d"
       title="A Canadian postal code, like A1A 1A1">
```

That matches the letter-digit-letter, space, digit-letter-digit shape of a Canadian postal code, space optional. The `title` attribute is worth adding here: many browsers show its text in the validation tooltip when a value doesn't match, instead of a generic "please match the requested format" with no clue what the format actually is. That helps a sighted user in a browser that shows the tooltip, but it's not a substitute for a real accessibility fix. As covered in [ARIA](/modules/accessibility/aria/README.md#going-deeper-how-a-screen-reader-names-a-control-with-no-visible-label), `title` isn't announced consistently across screen readers, so a student who genuinely needs this format explained to everyone should also state the pattern in visible text near the field, not rely on `title` alone.

`pattern` works on `text`, `search`, `url`, `tel`, `email`, and `password`. Types like `number` and `date` already carry their own constraints (`min`, `max`, `step`) and ignore `pattern` if you add it.

## The checklist

Run this over your form before you submit:

- Validation attributes (`required` and similar) sit only on fields that need them
- A `pattern` field carries a `title` describing the expected format, and the format is also stated in visible text nearby
- Zero errors in the [W3C Markup Validation Service](https://validator.w3.org/)

## Keep learning

- [W3Schools: HTML Forms](https://www.w3schools.com/html/html_forms.asp). Covers the full set of built-in validation attributes.
