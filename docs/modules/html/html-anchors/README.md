---
title: HTML Anchors
prerequisites:
  - html/html-basics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Anchors

## Links and the anchor element

The anchor element `<a>` creates a link. Its `href` attribute says where the link goes.

```html
<a href="https://algonquincollege.com">Algonquin College</a>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<a href="https://algonquincollege.com">Algonquin College</a>
</div>
</details>

The text between the tags is what the user clicks. Write it so it makes sense on its own. "Read the syllabus" is a good link. "Click here" is not, because screen reader users often pull up a list of just the links on a page, and a list of ten "click here" entries tells them nothing. The same rule applies if you're skimming your own page later, out of context: good link text tells you where it goes before you click it. Search engines read link text the same way, using it as a signal for what the destination page is about, so a vague link is a small SEO cost as well as an accessibility one.

You can also link to a specific spot on the same page using an `id`:

```html
<h2 id="ingredients">Ingredients</h2>
<a href="#ingredients">Jump to ingredients</a>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p><a href="#demo-ingredients-target">Jump to ingredients</a></p>
<h3 id="demo-ingredients-target">Ingredients</h3>
<p>Flour, sugar, butter.</p>
</div>
</details>

Click the link above. The `href` matches the target element's `id` exactly, with a `#` in front, and the browser scrolls straight to it. This same technique, an `id` plus a matching `#` link, is how a page's own table of contents or a "back to top" link works.

### Going deeper: mailto: and tel: links

*Optional, about 6 minutes.*

Not every link points to a web page. Two special values for `href` hand off to a different program entirely.

A `mailto:` link opens the visitor's default email application with a new message already addressed:

```html
<a href="mailto:info@maplebrookbakery.ca">info@maplebrookbakery.ca</a>
```

Showing the actual address as the link text is fine here, unlike "click here". The address is the useful information, and a visitor who'd rather copy it into their own mail client than let the browser pick one can still read it straight off the page.

A `mailto:` link can prefill more than the address. Add a `subject` and a `body`, joined with a `?` and `&`, the same query-string pattern a search results page uses:

```html
<a href="mailto:info@maplebrookbakery.ca?subject=Catering%20Inquiry&body=Hi%2C%20I%27d%20like%20to%20ask%20about%20catering%20options">
  Email us about catering
</a>
```

Spaces and punctuation inside a URL have to be encoded. `%20` is a space, `%2C` is a comma, `%27` is an apostrophe. Get one wrong and most email clients still open, just with a slightly mangled subject or body, so open the link once after writing it and check what actually loads.

A `tel:` link does the same job for phone numbers, and it matters most on a phone, where tapping it hands the number straight to the dialer:

```html
<a href="tel:+16135551234">613-555-1234</a>
```

Write the number in the `href` in full international format: a `+`, the country code, then the digits, no spaces or punctuation. The link text is what the visitor actually reads, so the familiar `613-555-1234` formatting belongs there instead. The two don't need to match, because the browser only ever acts on the `href`.

### Going deeper: opening a link in a new tab safely

*Optional, about 6 minutes.*

The `target` attribute controls where a link opens. Its most common value, `_blank`, opens the link in a new tab instead of navigating away from the page the visitor is already on:

```html
<a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a>
```

Use it sparingly. Pulling a visitor into a tab they didn't ask for is disorienting more often than it's helpful, so it's usually reserved for links that lead off-site, where you want them to keep their place on your page.

There's a real security reason to be careful with it too, not just a style preference. When a link opens in a new tab, the page that opens can get a live reference back to the tab that opened it, through a JavaScript property called `window.opener`. A malicious destination page could use that reference to quietly redirect your original tab to a fake login page while the visitor's attention is on the new one, a trick known as reverse tabnabbing.

The fix is the `rel` attribute:

```html
<!-- Leaves a reference back to this tab -->
<a href="https://example.com" target="_blank">External link</a>

<!-- Cuts that reference -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External link</a>
```

`noopener` is the one doing the security work. It stops `window.opener` from being set at all, so the new page has nothing to reach back with. `noreferrer` does the same thing and also stops the browser from telling the destination site which page sent the visitor there, which is a privacy detail more than a security one.

Current browsers already apply the `noopener` protection automatically the moment they see `target="_blank"`, even with no `rel` written at all. Write it anyway. It costs nothing, it makes the intent obvious to anyone reading your code, and `noreferrer`'s referrer-hiding still isn't automatic. Treat `rel="noopener noreferrer"` as something you type every time you type `target="_blank"`, the same reflex as writing `alt` every time you write `img`.

## The checklist

Run this over your page before you move on:

- Link text describes the destination on its own, never "click here"
- An in-page jump link's `href` matches its target's `id` exactly, with a `#` in front
- `target="_blank"` is paired with `rel="noopener noreferrer"`, on every external link that opens in a new tab

## Keep learning

- [W3Schools: HTML Links](https://www.w3schools.com/html/html_links.asp). A reference page with more worked examples.
- [MDN: Creating hyperlinks](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks). Covers `mailto:` links in more depth, including `cc`, `bcc`, and the URL-encoding rules above.
- [MDN: rel="noopener"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener). The security detail behind opening a link with `target="_blank"`.
- [Video: Lesser Known Features of Anchor Tags, by Steve Griffith](https://www.youtube.com/watch?v=ZSEvm4f-RtM). Covers the same going-deeper territory as this module's `mailto:` and safe-new-tab sections.
