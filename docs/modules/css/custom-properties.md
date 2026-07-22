---
title: CSS Custom Properties and Variables
---

# CSS Custom Properties and Variables

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

## Building a design system

The real payoff comes from declaring a whole set at the top of your stylesheet, so the file opens with the design decisions rather than burying them.

```css
:root {
  /* Colour */
  --colour-brand: hsl(190, 80%, 30%);
  --colour-brand-light: hsl(190, 80%, 92%);
  --colour-text: hsl(215, 25%, 20%);
  --colour-muted: hsl(215, 15%, 45%);
  --colour-surface: hsl(0, 0%, 100%);

  /* Type */
  --font-body: system-ui, sans-serif;
  --font-heading: Georgia, serif;
  --size-small: 0.875rem;
  --size-body: 1rem;
  --size-large: 1.5rem;

  /* Spacing, on a consistent scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;

  /* Other */
  --radius: 8px;
  --border: 1px solid hsl(215, 15%, 85%);
}
```

That block is worth building carefully, because it becomes the vocabulary for the rest of the file. Three habits make it work.

**Name for meaning, not appearance.** `--colour-brand` survives a rebrand. `--colour-blue` becomes a lie the day the brand turns green, and you end up with `--colour-blue: red;` which is how stylesheets become unreadable.

**Use a scale rather than arbitrary numbers.** Four or five spacing values used consistently produce a page that looks deliberate. Twenty ad-hoc pixel values produce one that looks approximate, and the difference is visible even to people who can't name it.

**Pair custom properties with HSL.** Week 3 showed how changing one lightness value generates a matched palette. Doing that inside variables means your whole colour system is a few numbers you can adjust together.

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

## Theming

Scoping leads directly to themes. Declare an alternative set of values under a selector, and everything inside it switches.

<CssDemo>

```html
<div class="theme-light">
  <h4>Light</h4>
  <p>Surface and text from variables.</p>
</div>
<div class="theme-dark">
  <h4>Dark</h4>
  <p>Identical rules, different variables.</p>
</div>
```

```css
.theme-light, .theme-dark {
  font-family: system-ui, sans-serif;
  background-color: var(--surface);
  color: var(--text);
  padding: 14px 18px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.theme-light h4, .theme-dark h4 {
  color: var(--heading);
  margin: 0 0 4px 0;
}
.theme-light {
  --surface: #ffffff;
  --text: #1e293b;
  --heading: #0e7490;
}
.theme-dark {
  --surface: #0f172a;
  --text: #cbd5e1;
  --heading: #67e8f9;
}
```

</CssDemo>

The styling rules are written once and shared. Only the values differ.

The same approach handles a system dark mode preference, using a media query in the same family as `prefers-reduced-motion` from last week:

```css
:root {
  --surface: #ffffff;
  --text: #1e293b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface: #0f172a;
    --text: #cbd5e1;
  }
}
```

Every rule in your stylesheet stays exactly as it was. Only the variable block changes, and the whole page follows.

One requirement carries over from Week 3: **check contrast in both themes.** A palette that passes on white frequently fails on dark, and vice versa. A dark theme is not an excuse to skip the contrast checker; it's a second set of pairs to run through it.

## Custom properties versus preprocessor variables

You may see variables in Sass or Less written with a dollar sign. They are not the same thing, and the difference is worth understanding.

Preprocessor variables are resolved **before** the CSS is written, so by the time a browser sees the file they're gone, replaced by their values. They can't change at runtime and they don't respond to the cascade.

Custom properties are **live in the browser**. They cascade, they inherit, they can be redefined per selector as you did above, they can be changed by JavaScript, and they can differ between two elements on the same page. That's why scoping and theming work at all.

This course uses custom properties. Nothing needs to be compiled, and everything in this chapter runs natively in every current browser.

## Inspecting variables

In developer tools, a rule using `var()` shows the variable name, and hovering it reveals the resolved value. The Computed tab shows the final value after resolution, which is where you check whether a variable actually resolved or silently fell through.

If a property seems to have no value at all, a misspelled variable name is the first thing to suspect, since there's no error message for one.

## Common mistakes to avoid

- **Forgetting the double hyphen.** `-brand` and `brand` are not custom properties, and neither produces an error.
- **Naming for appearance.** `--blue` outlives its accuracy. `--brand` doesn't.
- **Declaring everything on `:root` when a variable is component-specific.** Scoping it to the component keeps the global block meaningful.
- **A typo in a `var()` name.** The declaration silently becomes invalid. Check the Computed tab.
- **Expecting `var()` to work in a media query condition.** Custom properties can't be used in `@media` feature tests, only in declarations.
- **Building a dark theme without rechecking contrast.** Different pairs, different ratios.
- **Twenty spacing variables.** A scale of four or five used consistently beats a long list used approximately.

## Keep learning

- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties). The complete guide, including inheritance and fallback behaviour.
- [MDN: var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var). The function reference, with fallback syntax.
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme). Reading the visitor's light or dark preference.
- [Video: CSS Custom Properties, by Kevin Powell](https://www.youtube.com/watch?v=PHO6TBq_auI). A practical walkthrough including scoping and theming.

## Try it yourself

Refactor your existing stylesheet. Go through it and find every value you've typed more than once, colours especially, then hoist each into a custom property declared on `:root`. Name them for meaning. When you're done, the top of your file should read as a summary of your design decisions.

Build a spacing scale of four or five values and replace every ad-hoc padding and margin number with one of them. Some spacing will change slightly. That's the point, and the page should look more deliberate afterwards.

Then use scoping. Create a variant of an existing component, a highlighted card or a warning panel, by overriding only its variables rather than redeclaring its properties. Confirm the original rules are doing all the work.

Add a dark theme with `prefers-color-scheme`, changing nothing but the variable block. Switch your operating system to dark mode and confirm the page follows. Then run every text and background pair in the dark theme through the WebAIM contrast checker, because the light-mode ratios tell you nothing about it.
