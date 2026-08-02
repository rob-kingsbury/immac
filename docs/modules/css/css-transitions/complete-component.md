---
title: A Complete Interactive Component
prerequisites:
  - css/css-transitions
  - css/css-transforms
  - accessibility/keyboard-access
---

# A Complete Interactive Component

Everything together, on a card built from the same Flexbox layout you used in [Flexbox Layouts](/modules/css/css-flexbox/README.md), with the transition and transform work from the last two modules layered on top.

<CssDemo>

```html
<div class="row">
  <a href="#" class="trail">
    <span class="name">Ridge Trail</span>
    <span class="meta">9 km, moderate</span>
  </a>
  <a href="#" class="trail">
    <span class="name">Summit Climb</span>
    <span class="meta">14 km, hard</span>
  </a>
</div>
```

```css
.row { display: flex; gap: 14px; font-family: system-ui, sans-serif; padding: 12px; }
.trail {
  display: block;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 18px 22px;
  text-decoration: none;
  box-shadow: 0 1px 2px rgb(15 23 42 / 8%);
  transition: transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out;
}
.trail:hover, .trail:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgb(15 23 42 / 14%);
  border-color: #0e7490;
}
.trail:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
}
.name { display: block; font-weight: 700; color: #0f172a; margin-bottom: 3px; }
.meta { display: block; font-size: 0.85rem; color: #5b6b85; }
```

</CssDemo>

Three properties transitioning together over 200ms with `ease-out`, a small lift, a deeper shadow, and a border colour change. It's restrained, and restraint is what makes it read as quality rather than as decoration.

Note that `:focus-visible` gets the same treatment as `:hover`, plus a visible outline. That's the rule from [Keyboard Access](/modules/accessibility/keyboard-access/README.md) holding.

This is also the point to confirm the `prefers-reduced-motion` guard from [Reduced Motion](/modules/accessibility/reduced-motion/README.md) is still protecting every transition and transform on the page. If it isn't in your stylesheet yet, add it before you add anything else here: every rule in that module, never the only signal, nothing flashing more than three times a second, nothing that animates without the visitor starting it, applies to a component like this one just as much as it did the first time you met it.
