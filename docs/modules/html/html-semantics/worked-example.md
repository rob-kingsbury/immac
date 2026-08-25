---
title: A Full Worked Example
prerequisites:
  - html/html-semantics
---

# A Full Worked Example

Here is a realistic article page marked up entirely with semantic elements. Read it as a model for the structure your own pages should follow.

```html
<body>
  <header>
    <h1>Corner Bakery Blog</h1>
    <nav aria-label="Main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>The Case for a Longer Rise</h2>
        <p>Posted <time datetime="2026-02-10">February 10, 2026</time></p>
      </header>

      <section>
        <h3>Flavour</h3>
        <p>A slow fermentation develops...</p>
      </section>

      <section>
        <h3>Texture</h3>
        <figure>
          <img src="crumb.jpg" alt="Open crumb of a slowly fermented loaf">
          <figcaption>Twenty-four hours of cold proofing.</figcaption>
        </figure>
      </section>

      <footer>
        <address>Written by the Corner Bakery team</address>
      </footer>
    </article>

    <aside>
      <h2>Related posts</h2>
      <ul>
        <li><a href="#">Choosing a starter</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Corner Bakery</p>
  </footer>
</body>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<header role="none">
  <h1>Corner Bakery Blog</h1>
  <nav role="none">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </nav>
</header>

<article>
  <header>
    <h2>The Case for a Longer Rise</h2>
    <p>Posted <time datetime="2026-02-10">February 10, 2026</time></p>
  </header>

  <section>
    <h3>Flavour</h3>
    <p>A slow fermentation develops...</p>
  </section>

  <section>
    <h3>Texture</h3>
    <figure>
      <img src="/images/placeholder.svg" alt="Open crumb of a slowly fermented loaf">
      <figcaption>Twenty-four hours of cold proofing.</figcaption>
    </figure>
  </section>

  <footer>
    <address>Written by the Corner Bakery team</address>
  </footer>
</article>

<aside role="none">
  <h2>Related posts</h2>
  <ul>
    <li><a href="#">Choosing a starter</a></li>
  </ul>
</aside>

<footer>
  <p>&copy; 2026 Corner Bakery</p>
</footer>
</div>
</details>

The Result box uses a placeholder graphic in place of a real photo, since a textbook can't ship every image a real project would have. In your own project, `src` points at an actual image file in your folder, and the caption and `alt` text work exactly the same way.

Notice that the `<article>` has its own `<header>` and `<footer>`, separate from the page's. That is legal and correct: those elements describe the nearest section they belong to, whether that's the whole page or a single article. It's also the example from the [ARIA roles going deeper section](/modules/html/html-semantics/document-landmarks.md#going-deeper-the-aria-roles-you-get-for-free), made concrete: the page's outer `<header>` and `<footer>` are landmarks, `banner` and `contentinfo`. The `<header>` and `<footer>` nested inside the `<article>` are not; a screen reader treats them as generic grouping, because the article, not the page, is what they belong to.

Go back to [Semantic HTML](/modules/html/html-semantics/README.md) if you want to trace any one element back to the section that explains it.
