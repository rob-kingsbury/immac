---
title: Putting It Together
prerequisites:
  - html/image-optimization
  - html/responsive-images
---

# Putting It Together

A single image with every technique from image optimization and responsive images applied, of the kind you would write for a real project:

```html
<picture>
  <source type="image/webp"
          srcset="storefront-400.webp   400w,
                  storefront-800.webp   800w,
                  storefront-1600.webp 1600w"
          sizes="(max-width: 600px) 100vw, 800px">
  <img src="storefront-800.jpg"
       srcset="storefront-400.jpg   400w,
               storefront-800.jpg   800w,
               storefront-1600.jpg 1600w"
       sizes="(max-width: 600px) 100vw, 800px"
       alt="Maplebrook Bakery at sunrise, with bread visible in the window"
       width="1600" height="900"
       loading="lazy">
</picture>
```

Every piece is doing a job. The WebP source serves the smaller format to browsers that support it. The `srcset` and `sizes` pair picks an appropriate size for the device. The dimensions reserve the layout space. The `loading` attribute defers a below-the-fold image. The `alt` text describes the picture for anyone who cannot see it.
