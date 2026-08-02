---
title: Styling a Navigation Bar
prerequisites:
  - css/css-flexbox
  - css/css-pseudo-classes
---

# A Real Navigation Bar

The properties covered in [Flexbox Layouts](/modules/css/css-flexbox/README.md) come together in the single most common Flexbox pattern on the web:

<CssDemo>

```html
<header class="site-header">
  <div class="logo">TrailGuide</div>
  <nav class="nav">
    <a href="#">Routes</a>
    <a href="#">Conditions</a>
    <a href="#">About</a>
  </nav>
</header>
```

```css
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background-color: #0f172a;
  font-family: system-ui, sans-serif;
}
.logo {
  color: #ffffff;
  font-weight: 700;
  font-size: 1.2rem;
}
.nav {
  display: flex;
  gap: 22px;
}
.nav a {
  color: #cbd5e1;
  text-decoration: none;
}
.nav a:hover, .nav a:focus {
  color: #ffffff;
  text-decoration: underline;
}
```

</CssDemo>

Note that there are **two** flex containers here, nested. The header is a flex container pushing the logo and the nav to opposite ends. The nav is itself a flex container spacing the links evenly. Nesting flex containers like this is normal and is how most real layouts are built.

## The checklist

Run this over your own navigation bar before you move on:

- The header is a flex container using `justify-content: space-between` and `align-items: center` to pin the logo and the nav to opposite ends, vertically centred
- The nav itself is a second, nested flex container spacing its links with `gap`
- Links have both a `:hover` and a `:focus` style, not just one

## Keep learning

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox). Covers this pattern alongside the rest of Flexbox.
- [Video: Replacing Float with Flexbox in Nav Menus, by Steve Griffith](https://www.youtube.com/watch?v=9bGuiBw4sTE). Builds the same pattern this module does, starting from the older float approach.
