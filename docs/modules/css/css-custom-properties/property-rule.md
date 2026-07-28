---
title: "Giving a Variable a Type with @property"
prerequisites:
  - css/css-custom-properties
---

# Going Deeper: Giving a Variable a Type with @property

Everything in [CSS Custom Properties and Variables](/modules/css/css-custom-properties/README.md) treats a custom property as text. The browser stores whatever's after the colon and hands it to `var()` unchanged, which is exactly why a plain custom property can't be smoothly animated. Try to transition `--accent` from `#0e7490` to `#b45309` and nothing moves: the browser sees two strings, not two colours, and a transition needs values it can interpolate between.

The `@property` at-rule fixes that by registering a custom property with a declared type:

```css
@property --accent {
  syntax: "<color>";
  inherits: false;
  initial-value: #0e7490;
}
```

`syntax` states the type, here a colour. `inherits` controls whether the property behaves like the ones declared on `:root` (`true`) or stays local to wherever it's set (`false`). `initial-value` is required unless `syntax` is the universal `"*"`, since a typed property needs a valid value to fall back to.

Once `--accent` is registered this way, the same variable that could previously only swap now supports a smooth transition:

```css
.card {
  border-color: var(--accent);
  transition: --accent 0.3s ease;
}
.card:hover {
  --accent: #b45309;
}
```

This is a genuine extension past what most projects need. All of the scoping and theming work covered elsewhere needs nothing more than a plain `--variable`. Reach for `@property` specifically when a custom property needs to animate, and not before.

## Keep learning

- [MDN: @property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property). The reference for registering a custom property's type.
