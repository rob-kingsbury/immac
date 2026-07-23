---
title: HTML Forms and Data Structures
---

# HTML Forms and Data Structures

Forms are how the web listens. A search box, a login, a contact page, a checkout: all forms. This week covers how to build one that's well structured and accessible, plus how to present tabular data correctly. You won't process the submitted data here, since that needs a back end you'll meet in a later course. The focus is the markup, and getting it right.

## The form element

A `<form>` wraps a group of controls into one unit that submits together. Two attributes decide where the data goes and how it travels.

```html
<form action="/subscribe" method="post">
  <!-- controls go here -->
</form>
```

`action` is the URL that receives the submitted data. `method` is the HTTP method used to send it, and the choice between the two available methods, `get` and `post`, is not a style preference. It changes how and where the data travels, and picking the wrong one is a real, gradeable mistake.

### GET versus POST

**`method="get"`** appends the form's data to the `action` URL as a query string, visible right in the address bar: `search.html?query=sourdough&sort=recent`. Because the data lives in the URL, a GET request can be bookmarked, shared as a link, and revisited, and the browser's back button works normally with it. That makes GET the correct method for anything that only retrieves or filters information and changes nothing on the server: a search box, a filter, a "view this page" link built from a form.

**`method="post"`** sends the form's data in the body of the request, invisible in the URL and not stored in browser history. Use POST whenever a submission changes something (creating an account, posting a comment, placing an order) or whenever the data is sensitive (a password, personal information). Because the data isn't in the URL, POST doesn't expose it in bookmarks, browser history, or server logs the way GET would.

One caveat worth being precise about: **POST hides data from those specific places, but it doesn't encrypt anything.** A POST body sent over plain HTTP is just as readable to anyone intercepting the connection as a GET query string would be. The actual protection against that is HTTPS, back from Week 1, encrypting the whole request in transit. Use POST for the reasons above, and rely on HTTPS, which GitHub Pages already gives you automatically, for the reason that matters most: keeping the data unreadable in transit at all.

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

Put a few of those types to work in labelled fields, each connected with `for` and `id`, the pattern the next section explains in full:

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

This is valid HTML, called implicit association, and browsers do connect the two. It's used less in this course because not every screen reader supports it reliably, where the explicit `for`/`id` pattern below is universally supported. Recognizing both is worth knowing, since you'll see the implicit form in other people's code.

Using `type="email"` instead of `type="text"` means the browser can check the format and mobile users get an email-optimized keyboard, all for free.

For longer text use `<textarea>`, and for a list of options use `<select>`:

```html
<textarea name="message" rows="4"></textarea>

<select name="topic">
  <option value="general">General enquiry</option>
  <option value="support">Support</option>
</select>
```

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

## Labels are not optional

Every control needs a `<label>`, connected by matching the label's `for` to the input's `id`.

```html
<label for="name">Full name</label>
<input type="text" id="name" name="name">
```

This is the same rule from the Web Accessibility Fundamentals chapter, and it's worth repeating because it's the most common thing beginners skip. The label makes a screen reader announce the field correctly, and it makes the label text clickable to focus the input, which is easier for everyone. A greyed-out `placeholder` is a hint, not a label. It disappears as soon as the user types, so it can never replace a real label.

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

Tables are for tabular data (rows and columns of related values), never for page layout. Using a table to position things visually is an old, broken habit from before CSS could lay out a page, and it wrecks accessibility, because a screen reader tries to read a layout table as if it were real data and produces nonsense.

A table is built from several elements that nest inside one another. Rather than look at a finished table and try to reverse-engineer it, build one from scratch, one element at a time, the same way you'll build your own.

### The table container

Everything in a table lives between an opening `<table>` and a closing `</table>`. On its own it renders nothing visible yet, but it's the container every other piece goes inside.

```html
<table>
  <!-- everything else goes in here -->
</table>
```

### Adding a caption

`<caption>` names the table. It's the first thing inside `<table>`, right after the opening tag, and it should describe what the table contains.

```html
<table>
  <caption>Store hours</caption>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Store hours</caption>
</table>
</div>
</details>

### Adding the header row

`<thead>` marks the header section of the table. Inside it, `<tr>` starts a table row, and `<th>` marks a heading cell within that row. Give each `<th>` a `scope="col"`, which tells a screen reader this heading labels a column.

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
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
</table>
</div>
</details>

### Adding the data rows

`<tbody>` holds the actual data, as a sibling of `<thead>`, not nested inside it. Each row is another `<tr>`. Inside a data row, the first cell is usually a `<th scope="row">` naming that row, and the rest are `<td>` cells holding the values.

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

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
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
</div>
</details>

One row is rarely the whole story. Add the rest of the week the same way, one more `<tr>` per day:

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
    <tr>
      <th scope="row">Tuesday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>15:00</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
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
    <tr>
      <th scope="row">Tuesday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>15:00</td>
    </tr>
  </tbody>
</table>
</div>
</details>

Every `<th>` and `<td>` in this table so far exists because it's real, distinct data. That's the test for whether something belongs in a table at all: if you're tempted to leave cells empty just to make a layout line up, the content doesn't actually belong in a table.

### Merging cells: colspan and rowspan

Sometimes one value genuinely applies across more than one column. Sunday, this store is simply closed, and repeating "Closed" under both Opens and Closes would be misleading, since there's no separate opening and closing time. `colspan` merges a cell across the given number of columns. Here it's added to the Sunday row from the table you already built:

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
      <th scope="row">Sunday</th>
      <td colspan="2">Closed</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
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
      <th scope="row">Sunday</th>
      <td colspan="2">Closed</td>
    </tr>
  </tbody>
</table>
</div>
</details>

`rowspan` is the same idea turned sideways: it merges a cell down across several rows, used when one label applies to more than one row underneath it, such as a heading that groups two sub-columns:

```html
<table>
  <thead>
    <tr>
      <th rowspan="2">Name</th>
      <th colspan="2">Scores</th>
    </tr>
    <tr>
      <th>Maths</th>
      <th>English</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bob</td>
      <td>10/10</td>
      <td>9/10</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <thead>
    <tr>
      <th rowspan="2">Name</th>
      <th colspan="2">Scores</th>
    </tr>
    <tr>
      <th>Maths</th>
      <th>English</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bob</td>
      <td>10/10</td>
      <td>9/10</td>
    </tr>
  </tbody>
</table>
</div>
</details>

`Name` spans both header rows down, because it labels the whole row below, not just one of the two sub-columns. `Scores` spans across, because it's the shared heading for the Maths and English columns beneath it.

### Adding a summary row

`<tfoot>` holds a row that summarizes the body, most often a total. Like `<tbody>`, it's a sibling of `<thead>`, not nested inside either of the others:

```html
<table>
  <caption>Weekly ingredient cost</caption>
  <thead>
    <tr>
      <th scope="col">Ingredient</th>
      <th scope="col">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Flour</th>
      <td>$12.00</td>
    </tr>
    <tr>
      <th scope="row">Butter</th>
      <td>$18.50</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$30.50</td>
    </tr>
  </tfoot>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Weekly ingredient cost</caption>
  <thead>
    <tr>
      <th scope="col">Ingredient</th>
      <th scope="col">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Flour</th>
      <td>$12.00</td>
    </tr>
    <tr>
      <th scope="row">Butter</th>
      <td>$18.50</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$30.50</td>
    </tr>
  </tfoot>
</table>
</div>
</details>

Keeping `<thead>`, `<tbody>`, and `<tfoot>` distinct isn't just tidy structure. It's also what lets a browser, or a print stylesheet, repeat the header and footer rows if a long table breaks across pages, something a table built from plain `<tr>` elements with no sections can't do.

### The full table, all seven tags together

Here's everything from this section in one table: `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tr>`, `<th>` (with `scope`), and `<td>`.

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
    <tr>
      <th scope="row">Tuesday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>15:00</td>
    </tr>
    <tr>
      <th scope="row">Sunday</th>
      <td colspan="2">Closed</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
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
    <tr>
      <th scope="row">Tuesday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>15:00</td>
    </tr>
    <tr>
      <th scope="row">Sunday</th>
      <td colspan="2">Closed</td>
    </tr>
  </tbody>
</table>
</div>
</details>

## A habit worth starting now: validate your markup

Forms and tables are two of the easiest structures to write invalid HTML in: an unclosed `<td>`, a `<label for>` that doesn't match any `id`, a `<tr>` sitting outside a `<thead>` or `<tbody>`. The browser usually renders something anyway, quietly guessing at what you meant, which means a real mistake can sit in your code for weeks without ever looking wrong on screen.

The [W3C Markup Validation Service](https://validator.w3.org/) checks your HTML against the official rules and reports every error with a line number. Paste in the page you just built and see what it says. The Code Quality and Validation chapter later this semester covers this tool in full, but there's no reason to wait. Running a page through it the same day you build a form or a table, while the structure is still fresh in your mind, catches mistakes when they're a ten-second fix instead of an archaeology project weeks later.

## Keep learning

- [W3Schools: HTML Forms](https://www.w3schools.com/html/html_forms.asp). A full reference for form elements, attributes, and the input types this chapter covers.
- [W3Schools: HTML Tables](https://www.w3schools.com/html/html_tables.asp). Covers the same table structure with more worked examples.
- [W3Schools: Table colspan and rowspan](https://www.w3schools.com/html/html_table_colspan_rowspan.asp). Focused practice on spanning cells across columns and rows.
- [Video: HTTP GET vs. POST, by Hussein Nasser](https://www.youtube.com/watch?v=NEKImNnYB70). A clear explanation of the difference between the two methods and when each is appropriate.

## Try it yourself (about 60 minutes)

Build a contact form with a text input for a name, an email input, a `<select>` for a subject, and a `<textarea>` for a message, each with a proper `<label>`. Make the name and email `required`, and set the email field to `type="email"`. Choose `method="post"` for this form and be ready to explain why GET would be the wrong choice here. Add a set of radio buttons in a `<fieldset>` for a preferred contact method, and a submit button using `<button type="submit">`.

Below the form, build a data table with a `<caption>`, a `<thead>` with column headers using `scope="col"`, a `<tbody>` with row headers using `scope="row"`, and a `<tfoot>` with a summary row. Use `colspan` at least once, where a single value genuinely applies across more than one column. Submit the empty form and read the validation messages the browser produces.

That's the last new form or table element this course introduces, though a couple of specialized elements are still ahead in Week 13. After reading week, the focus shifts from what you write to how well it performs, starting with your images.
