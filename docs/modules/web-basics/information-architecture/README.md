---
title: Information Architecture
prerequisites:
  - html/semantic-html
---

# Information Architecture

A website is more than a pile of pages. It has a shape: which pages exist, how they connect, and how someone moves through them. Planning that shape before you write a line of markup means the semantic structure you already know how to build has a plan to follow, rather than being invented page by page as you go.

## Information architecture, briefly

**Information architecture** is the overall organization of a site's content: what exists, how it's grouped, and how it relates. A **site map** is one concrete artifact that represents part of that organization, a diagram of pages and their relationships. The two terms get used interchangeably in casual conversation, but it's worth knowing the distinction: information architecture is the thinking, a site map is one drawing that comes out of it.

## Going deeper: content inventory and card sorting

*Optional, about 10 minutes.*

A site map answers "how is this organized." It doesn't answer "what actually belongs in it." Before you draw a single tree, it helps to know what content exists, or needs to exist, without worrying yet about how it's grouped. That flat, unstructured list is a **content inventory**: every page or piece of content the site needs, written down with no hierarchy imposed. For a small bakery site, a content inventory might just be a list: Home, About, Hours and Location, Menu (Food), Menu (Drinks), Catering, Gift Cards, Contact. Nothing about order or grouping yet, just an honest accounting of what's there.

**Card sorting** is the technique that turns that flat list into groups. Write each inventory item on an actual card, a sticky note, or a line in a spreadsheet, then sort the items into piles that feel like they belong together. Do this yourself for a small project, or better, hand the items to two or three people who don't already know the site and watch where they put things. Nielsen Norman Group, the same usability research group behind the site map finding in [Site Maps](/modules/web-basics/site-maps/README.md), describes card sorting as a way to uncover how someone else's mental model of your content differs from your own, which is exactly the gap a site map drawn from assumption alone tends to miss.

You don't need software or a formal study to get value from this. For a five-page site like the kind this course builds, ten minutes with sticky notes on a table is enough. Write out every piece of content, group the notes by hand, and see what categories emerge before committing to a site map:

```text
Loose inventory:
Home, About, Hours and Location, Menu (Food), Menu (Drinks),
Catering, Gift Cards, Contact

Sorted into piles:
Visit Us      -> About, Hours and Location, Contact
Menu          -> Menu (Food), Menu (Drinks)
Order Ahead   -> Catering, Gift Cards
```

If "Hours and Location" keeps landing next to "Contact" every time you sort, that's a stronger signal for how to group your navigation than guessing would have been. That's what card sorting is for: catching a grouping like that before you've drawn a single box, rather than after. Group by how a visitor actually thinks about the content, not by how the pages happen to occur to you.

## The checklist

Run this over your plan before you draw a site map:

- Can distinguish information architecture, the thinking, from a site map, one drawing that comes out of it
- Content inventory written down, flat, before any grouping is imposed

## Keep learning

- [Nielsen Norman Group: Card Sorting, Uncover Users' Mental Models](https://www.nngroup.com/articles/card-sorting-definition/). The research behind the card-sorting technique above.
