---
title: HTML Form
prerequisites:
  - html/html-basics
  - accessibility/web-accessibility-fundamentals
---

# The <abbr title="HyperText Markup Language">HTML</abbr> Form Element

Forms are how the web listens. A search box, a login, a contact page, a checkout: all forms. This module covers how to build one that's well structured and accessible. You won't process the submitted data here, since that needs a back end you'll meet in a later course. The focus is the markup, and getting it right.

## The form element

A `<form>` wraps a group of controls into one unit that submits together. Two attributes decide where the data goes and how it travels.

```html
<form action="/subscribe" method="post">
  <!-- controls go here -->
</form>
```

`action` is the <abbr title="Uniform Resource Locator">URL</abbr> that receives the submitted data. `method` is the <abbr title="Hypertext Transfer Protocol">HTTP</abbr> method used to send it, and the choice between the two available methods, `get` and `post`, is not a style preference. It changes how and where the data travels, and picking the wrong one is a real, gradeable mistake.

### <abbr title="HTTP method for retrieving data">GET</abbr> versus <abbr title="HTTP method for submitting data">POST</abbr>

**`method="get"`** appends the form's data to the `action` URL as a query string, visible right in the address bar: `search.html?query=sourdough&sort=recent`. Because the data lives in the URL, a GET request can be bookmarked, shared as a link, and revisited, and the browser's back button works normally with it. That makes GET the correct method for anything that only retrieves or filters information and changes nothing on the server: a search box, a filter, a "view this page" link built from a form.

**`method="post"`** sends the form's data in the body of the request, invisible in the URL and not stored in browser history. Use POST whenever a submission changes something (creating an account, posting a comment, placing an order) or whenever the data is sensitive (a password, personal information). Because the data isn't in the URL, POST doesn't expose it in bookmarks, browser history, or server logs the way GET would.

One caveat worth being precise about: **POST hides data from those specific places, but it doesn't encrypt anything.** A POST body sent over plain HTTP is just as readable to anyone intercepting the connection as a GET query string would be. The actual protection against that is <abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr>, covered in [How the Web Works](/modules/web-basics/how-the-web-works/README.md), encrypting the whole request in transit. Use POST for the reasons above, and rely on HTTPS, which GitHub Pages already gives you automatically, for the reason that matters most: keeping the data unreadable in transit at all.

A rule you can apply without hesitation: if submitting the form twice would create two of something, or if the form carries a password, use `post`. If it only asks a question and gets an answer back, `get` is correct and often better, since the result becomes a shareable, bookmarkable URL.

```html
<!-- Correct: a search form. Retrieval only, and the result is worth bookmarking. -->
<form action="/search" method="get">
  <label for="q">Search</label>
  <input type="search" id="q" name="q">
</form>

<!-- Correct: a signup form. Creates an account and carries a password. -->
<form action="/register" method="post">
  <label for="new-password">Password</label>
  <input type="password" id="new-password" name="password">
</form>
```

For the exercises in this course there's no server to receive the data, so `action` and `method` are placeholders. What matters right now is choosing the method that matches what the form actually does, and building the structure inside correctly.

## Labels are not optional

Every control needs a `<label>`, connected by matching the label's `for` to the input's `id`.

```html
<label for="name">Full name</label>
<input type="text" id="name" name="name">
```

This is the same rule from [Web Accessibility Fundamentals](/modules/accessibility/web-accessibility-fundamentals.md), and it's worth repeating because it's the most common thing beginners skip. The label makes a screen reader announce the field correctly, and it makes the label text clickable to focus the input, which is easier for everyone. A greyed-out `placeholder` is a hint, not a label. It disappears as soon as the user types, so it can never replace a real label.

## Grouping with fieldset and legend

When several controls belong together, such as a set of radio buttons, wrap them in a `<fieldset>` with a `<legend>` that names the group.

```html
<fieldset>
  <legend>Preferred contact method</legend>
  <input type="radio" id="by-email" name="contact" value="email">
  <label for="by-email">Email</label>
  <input type="radio" id="by-phone" name="contact" value="phone">
  <label for="by-phone">Phone</label>
</fieldset>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<fieldset>
  <legend>Preferred contact method</legend>
  <input type="radio" id="by-email" name="contact" value="email">
  <label for="by-email">Email</label>
  <input type="radio" id="by-phone" name="contact" value="phone">
  <label for="by-phone">Phone</label>
</fieldset>
</div>
</details>

Click either option above. Because both radios share the same `name`, choosing one clears the other. That is the live output of the exact code above, rendered on the page.

The `<legend>` gives the whole group a name, so a screen reader announces "Preferred contact method, Email, radio button" rather than a bare "Email" with no context. Radio buttons in a group share the same `name`, which is what makes them mutually exclusive.

### Going deeper: checkboxes for "select all that apply"

Optional, and the natural next question once you've built the radio group above: what if more than one answer should be allowed?

Radio buttons are "choose exactly one." Checkboxes are "choose any number, none or all included." The grouping pattern is identical, a `<fieldset>` with a `<legend>`. Only the input type changes.

```html
<fieldset>
  <legend>Which days can you pick up an order?</legend>
  <input type="checkbox" id="day-mon" name="pickup-days" value="monday">
  <label for="day-mon">Monday</label>
  <input type="checkbox" id="day-wed" name="pickup-days" value="wednesday">
  <label for="day-wed">Wednesday</label>
  <input type="checkbox" id="day-sat" name="pickup-days" value="saturday">
  <label for="day-sat">Saturday</label>
</fieldset>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<fieldset>
  <legend>Which days can you pick up an order?</legend>
  <input type="checkbox" id="day-mon" name="pickup-days" value="monday">
  <label for="day-mon">Monday</label>
  <input type="checkbox" id="day-wed" name="pickup-days" value="wednesday">
  <label for="day-wed">Wednesday</label>
  <input type="checkbox" id="day-sat" name="pickup-days" value="saturday">
  <label for="day-sat">Saturday</label>
</fieldset>
</div>
</details>

Check all three above. Unlike the radios earlier, checking one doesn't clear the others, since each checkbox is independent. The `<legend>` still does the same job: it tells a screen reader what the group is asking, not just what one option says.

## The checklist

Run this over your form before you submit:

- `method` matches what the form does: `get` for retrieval, `post` for anything data-changing or sensitive
- Every control has a connected `<label>` (`for` matching `id`)
- Radio and checkbox groups sit inside a `<fieldset>` with a `<legend>`

## Keep learning

- [W3Schools: HTML Forms](https://www.w3schools.com/html/html_forms.asp). A full reference for form elements and attributes.
- [Video: HTTP GET vs. POST, by Hussein Nasser](https://www.youtube.com/watch?v=NEKImNnYB70). A clear explanation of the difference between the two methods and when each is appropriate.
