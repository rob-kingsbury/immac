---
title: Translating a Plan into Structure
prerequisites:
  - web-basics/site-maps
  - web-basics/wireframes
---

# Translating a Plan into Structure

Here's the whole workflow in one example. Start with a wireframe region, and write the skeleton it implies:

```html
<body>
  <header>
    <h1>Corner Bakery</h1>
    <nav><!-- main navigation --></nav>
  </header>

  <main>
    <section>
      <h2>Today's specials</h2>
      <article><!-- one special --></article>
      <article><!-- another special --></article>
    </section>
  </main>

  <footer><!-- contact and hours --></footer>
</body>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<header>
  <h1>Corner Bakery</h1>
  <nav><em>(main navigation)</em></nav>
</header>

<section>
  <h2>Today's specials</h2>
  <p><em>(one special)</em></p>
  <p><em>(another special)</em></p>
</section>

<footer><em>(contact and hours)</em></footer>
</div>
</details>

Notice there's no real content yet, and no styling. This is the structural pass: get the regions and their nesting right, matching your plan, and fill in the details afterward. The Result box shows italic placeholder text where the code has HTML comments, since a comment renders as nothing at all, an empty box would be harder to read than a labelled one.

The same regions, drawn as a page layout instead of code, look like this. Each box is labelled with the element that implements it:

<div class="diagram">
<svg viewBox="0 0 480 400" role="img" aria-label="A page wireframe with labelled regions, each annotated with the semantic HTML element that implements it. A header region at the top contains a logo box and a nav box, labelled header and nav. Below it, a main region contains a section with two side by side article boxes, labelled main, section, and article. A footer region spans the bottom, labelled footer.">
  <rect x="10" y="10" width="460" height="380" rx="8" class="d-surface d-border" stroke-width="1.5"/>

  <rect x="26" y="26" width="428" height="62" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="40" y="42" width="90" height="30" rx="3" class="d-surface d-border" stroke-width="1.5"/>
  <text x="85" y="61" text-anchor="middle" class="d-lbl-muted">LOGO</text>
  <rect x="150" y="42" width="290" height="30" rx="3" class="d-surface d-border" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="295" y="61" text-anchor="middle" class="d-lbl-muted">nav links</text>
  <text x="440" y="40" text-anchor="end" class="d-lbl-mono">&lt;header&gt;</text>
  <text x="295" y="37" text-anchor="middle" class="d-lbl-mono">&lt;nav&gt;</text>

  <rect x="26" y="98" width="428" height="222" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="440" y="116" text-anchor="end" class="d-lbl-mono">&lt;main&gt;</text>

  <rect x="40" y="122" width="400" height="184" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="54" y="142" class="d-lbl-muted">Today's specials</text>
  <text x="424" y="142" text-anchor="end" class="d-lbl-mono">&lt;section&gt;</text>

  <rect x="54" y="154" width="180" height="140" rx="4" class="d-surface d-border" stroke-width="1.5"/>
  <line x1="70" y1="176" x2="190" y2="176" class="d-muted-stroke" stroke-width="4"/>
  <line x1="70" y1="194" x2="216" y2="194" class="d-muted-stroke" stroke-width="2.5"/>
  <line x1="70" y1="208" x2="198" y2="208" class="d-muted-stroke" stroke-width="2.5"/>
  <text x="144" y="278" text-anchor="middle" class="d-lbl-mono">&lt;article&gt;</text>

  <rect x="246" y="154" width="180" height="140" rx="4" class="d-surface d-border" stroke-width="1.5"/>
  <line x1="262" y1="176" x2="382" y2="176" class="d-muted-stroke" stroke-width="4"/>
  <line x1="262" y1="194" x2="408" y2="194" class="d-muted-stroke" stroke-width="2.5"/>
  <line x1="262" y1="208" x2="390" y2="208" class="d-muted-stroke" stroke-width="2.5"/>
  <text x="336" y="278" text-anchor="middle" class="d-lbl-mono">&lt;article&gt;</text>

  <rect x="26" y="334" width="428" height="52" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="40" y="365" class="d-lbl-muted">contact + hours</text>
  <text x="440" y="356" text-anchor="end" class="d-lbl-mono">&lt;footer&gt;</text>
</svg>
<figcaption>The same wireframe region can be read two ways: as boxes on a page, or as the nested elements in the code above. Planning the first gives you the second for free.</figcaption>
</div>

Building this way, plan first and structure second, is what separates a site that grows cleanly from one that turns into tangled markup halfway through.

## The checklist

Run this over your page before you move on:

- Wireframe regions translated into the semantic elements that implement them

## Keep learning

- [W3Schools: HTML Layout Elements and Techniques](https://www.w3schools.com/html/html_layout.asp). A refresher on the semantic layout elements this module's plans translate into.
