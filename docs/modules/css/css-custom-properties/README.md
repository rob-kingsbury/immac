---
title: CSS Custom Properties and Variables
prerequisites:
  - css/css-cascade
  - css/css-selectors
---

# <abbr title="Cascading Style Sheets">CSS</abbr> Custom Properties and Variables

By now your stylesheet has a few hundred lines in it, and the same brand blue is probably typed in eight places. Change the brand and you're hunting through the file hoping you caught every one.

**Custom properties**, usually called CSS variables, fix that. You name a value once, use the name everywhere, and change it in a single place. They also do something no find-and-replace can: they respond to the cascade, which makes theming possible in a few lines.

## Declaring and using a variable

A custom property is written like a normal declaration, with a name that starts with two hyphens:

```css
:root {
  --brand: #2563eb;
}
```

You then use it with the `var()` function:

```css
.button {
  background-color: var(--brand);
}
```

Two pieces of syntax to get right. The name **must** start with `--`, and it's case sensitive, so `--Brand` and `--brand` are different variables. And the value is used through `var()`, never bare.

The `:root` selector is where you'll declare most of them. It's a pseudo-class matching the document's root element, which for a web page is `<html>`. Declaring there makes a variable available everywhere on the page, because custom properties **inherit** like text properties do.

<CssDemo>

```html
<div class="panel">
  <h3>Trail conditions</h3>
  <p>Everything here draws from three variables.</p>
  <span class="tag">Open</span>
</div>
```

```css
:root {
  --brand: #0e7490;
  --brand-light: #cffafe;
  --space: 16px;
}
.panel {
  font-family: system-ui, sans-serif;
  border: 2px solid var(--brand);
  border-radius: 8px;
  padding: var(--space);
  background-color: var(--brand-light);
}
.panel h3 {
  color: var(--brand);
  margin-top: 0;
}
.tag {
  background-color: var(--brand);
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
}
```

</CssDemo>

Three variables, used seven times. Change `--brand` once and the border, the heading, and the tag all move together.

## Fallback values

`var()` takes a second argument used when the variable isn't defined:

```css
.card {
  padding: var(--card-padding, 1rem);
}
```

If `--card-padding` doesn't exist, the padding is `1rem`. This is useful for building a component that works with sensible defaults but can be customised, and it's a safety net against a typo in a variable name silently producing nothing.

Worth knowing: an undefined variable with no fallback makes the whole declaration invalid, and the property falls back to whatever it inherited or its initial value. A misspelled variable name produces no error, just a value that isn't what you wanted, which makes the Computed tab in developer tools the place to check.

## Scoping and the cascade

Here's what makes custom properties more than find-and-replace. They obey the cascade, so **redeclaring one on a narrower selector changes it for that element and everything inside it.**

<CssDemo>

```html
<div class="card">
  <h4>Default card</h4>
  <p>Uses the root accent colour.</p>
</div>
<div class="card warning">
  <h4>Warning card</h4>
  <p>Same rules. One variable overridden.</p>
</div>
```

```css
:root {
  --accent: #0e7490;
  --accent-bg: #ecfeff;
}
.card {
  font-family: system-ui, sans-serif;
  border-left: 5px solid var(--accent);
  background-color: var(--accent-bg);
  padding: 12px 16px;
  margin-bottom: 10px;
}
.card h4 {
  color: var(--accent);
  margin: 0 0 4px 0;
}
.warning {
  --accent: #b45309;
  --accent-bg: #fffbeb;
}
```

</CssDemo>

Look at what `.warning` contains: two variable declarations and nothing else. No border rule, no background rule, no heading colour. The existing `.card` rules picked up the new values automatically because `var()` is resolved per element, using whatever value is in scope there.

This is a genuinely different way of building variants, and it scales. A card with five colour-dependent properties needs five overrides the old way and one variable the new way.

Scoping is also the foundation for two things covered next: naming a whole vocabulary of variables at once in [CSS Design Tokens](/modules/css/css-design-tokens/README.md), and swapping that vocabulary wholesale in [Theming](/modules/css/css-theming/README.md).

## Common mistakes to avoid

- **Forgetting the double hyphen.** `-brand` and `brand` are not custom properties, and neither produces an error.
- **Declaring everything on `:root` when a variable is component-specific.** Scoping it to the component keeps the global block meaningful.
- **A typo in a `var()` name.** The declaration silently becomes invalid. Check the Computed tab.
- **Expecting `var()` to work in a media query condition.** Custom properties can't be used in `@media` feature tests, only in declarations.

## The checklist

Check your stylesheet against this list before you move on.

- Every variable name starts with `--`, and you've treated it as case sensitive
- `var()` is used with a sensible fallback wherever a value might be missing
- You understand scoping: redeclaring a variable on a narrower selector changes it there and nowhere else

## Keep learning

- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties). The complete guide, including inheritance and fallback behaviour.
- [MDN: var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var). The function reference, with fallback syntax.
- [Video: CSS Custom Properties, by Kevin Powell](https://www.youtube.com/watch?v=PHO6TBq_auI). A practical walkthrough including scoping and theming.
