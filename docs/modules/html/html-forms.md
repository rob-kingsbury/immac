---
title: HTML Forms and Data Structures
---

# HTML Forms and Data Structures

Forms are how the web listens. A search box, a login, a contact page, a checkout: all forms. This week covers how to build one that's well structured and accessible, plus how to present tabular data correctly. You won't process the submitted data here, since that needs a back end you'll meet in a later course. The focus is the markup, and getting it right.

## The form element

A form wraps a group of controls. Its `action` says where the data goes and its `method` says how it's sent.

```html
<form action="/subscribe" method="post">
  <!-- controls go here -->
</form>
```

For now these can be placeholders, since there's no server to receive the data. What matters is the structure inside.

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

Put a few of those types to work in labelled fields:

```html
<label>Email <input type="email"></label>
<label>Quantity <input type="number" min="0" max="10"></label>
<label>Date <input type="date"></label>
<label>Subscribe <input type="checkbox"></label>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<label>Email <input type="email"></label>
<label>Quantity <input type="number" min="0" max="10"></label>
<label>Date <input type="date"></label>
<label>Subscribe <input type="checkbox"></label>
</div>
</details>

The number field shows steppers and the date field opens a picker. Same markup, different built-in behaviour per type.

Using `type="email"` instead of `type="text"` means the browser can check the format and mobile users get an email-optimized keyboard, all for free.

For longer text use `<textarea>`, and for a list of options use `<select>`:

```html
<textarea name="message" rows="4"></textarea>

<select name="topic">
  <option value="general">General enquiry</option>
  <option value="support">Support</option>
</select>
```

## Labels are not optional

Every control needs a `<label>`, connected by matching the label's `for` to the input's `id`.

```html
<label for="name">Full name</label>
<input type="text" id="name" name="name">
```

This is the same rule from last week's accessibility module, and it's worth repeating because it's the most common thing beginners skip. The label makes a screen reader announce the field correctly, and it makes the label text clickable to focus the input, which is easier for everyone. A greyed-out `placeholder` is a hint, not a label. It disappears as soon as the user types, so it can never replace a real label.

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

## Built-in validation

HTML can enforce basic rules before anything is submitted, with no scripting. `required` makes a field mandatory, and attributes like `minlength`, `maxlength`, `min`, `max`, and `pattern` constrain the value.

```html
<label for="user-email">Email</label>
<input type="email" id="user-email" name="email" required>

<label for="age">Age</label>
<input type="number" id="age" name="age" min="16" max="120">
```

The browser shows its own error messages and blocks submission until the rules are met. This is a first line of defence and a usability aid. It is not security. A real application also validates on the server, because anything in the browser can be bypassed. You'll cover that side later; here, know that client-side validation is for helping honest users, not for trusting them.

## Tables for data

Tables are for tabular data (rows and columns of related values), never for page layout. Using a table to position things visually is an old, broken habit that wrecks accessibility.

A correct data table uses `<th>` for header cells, with a `scope` telling whether each header labels a column or a row:

```html
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
  </tbody>
</table>
```

The `<caption>` names the table, `<thead>` and `<tbody>` separate the header row from the data, and `scope` lets a screen reader read a cell along with the headers that describe it. Those pieces are what make a table understandable when you can't see the grid.

## Try it yourself

Build a contact form with a text input for a name, an email input, a `<select>` for a subject, and a `<textarea>` for a message, each with a proper `<label>`. Make the name and email `required`, and set the email field to `type="email"`. Add a set of radio buttons in a `<fieldset>` for a preferred contact method. Below the form, build a small data table with a `<caption>`, column headers, and `scope` attributes. Submit the form empty and read the validation messages the browser produces.
