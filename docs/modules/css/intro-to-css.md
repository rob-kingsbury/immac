---
title: Introduction to CSS
---

# Introduction to CSS

In MTM1511 you build web pages out of HTML: headings, paragraphs, lists, links, all structured and meaningful. Left alone, though, every one of those pages looks the same, black text on a white background in the browser's default font. HTML gives a page its structure. It says nothing about how that structure should look. That second job, the appearance, belongs to a separate language called CSS, and it is what this course is about.

This first chapter starts from zero. It covers what CSS is, the ways you can attach it to your HTML and why one of them is the right habit to build, how a single CSS rule is written, and how to point a rule at the elements you want to style. Every week after this builds on these ideas, so this is the foundation to get solid.

## What CSS is

CSS stands for Cascading Style Sheets. It is a language whose only job is to describe how HTML should look: the colours, the spacing, the fonts, the sizes, and eventually the whole layout of the page. Like HTML, it is plain text you type into a file, and you will spend this entire course writing it by hand.

The important idea, and the one worth holding onto from day one, is that HTML and CSS have separate jobs. HTML describes what content *is*, a heading, a paragraph, a list. CSS describes how that content should *appear*. Keeping those two jobs in two separate places is not an accident or a limitation. It is the whole point, and it buys you two things that matter enormously as your sites grow. You can completely restyle a page without touching a word of its content, and you can control the look of many pages from one place, so changing a colour once updates it everywhere.

Here is what that separation looks like in practice. Below is a small piece of HTML, the kind of thing you already know how to write. First the browser shows it with no CSS at all, then with a stylesheet applied. The HTML is identical in both. Only the CSS is different.

<CssDemo summary="Without CSS">

```html
<h1>Mountain Trail Guide</h1>
<p>Three routes, from an easy lakeside loop to a steep summit climb.</p>
```

</CssDemo>

<CssDemo summary="With CSS" hide-source>

```html
<h1>Mountain Trail Guide</h1>
<p>Three routes, from an easy lakeside loop to a steep summit climb.</p>
```

```css
h1 {
  color: #2563eb;
  font-family: system-ui, sans-serif;
  border-bottom: 3px solid #38bdf8;
  padding-bottom: 0.5rem;
}
p {
  color: #475569;
  font-family: system-ui, sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
}
```

</CssDemo>

The words did not change. The heading is still a heading and the paragraph is still a paragraph. CSS, and nothing else, created the difference in appearance. You will be able to write every line of that styling yourself before this course is done. Right now the only thing to take from it is what CSS is for.

**A note on the Result panels in this course.** They are not screenshots. Each one runs real CSS in your browser, live, and each is kept separate from the others so the many examples on one page never accidentally style each other. Wherever the code is shown above a Result, that code is exactly what the panel renders. Type it into your own stylesheet and you get the same thing.

## Attaching CSS to a page

Writing CSS is only useful once the browser knows to apply it to your HTML. There are three ways to connect the two, and although this course uses one of them almost exclusively, you should understand all three, because you will run into each of them and the differences between them explain a habit that professional developers treat as a rule.

The first way is an **inline style**, written directly on a single element with the `style` attribute:

```html
<p style="color: crimson;">This paragraph is red.</p>
```

The second is an **internal stylesheet**, written once inside a `<style>` element in the page's `<head>`. Every matching element on that page is affected:

```html
<head>
  <style>
    p {
      color: crimson;
    }
  </style>
</head>
```

The third is an **external stylesheet**, where your CSS lives in its own separate file and the HTML page links to it. You write your rules in a file ending in `.css`, commonly named `styles.css`, and connect it with a `<link>` element in the `<head>`:

```html
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
```

The `<link>` element needs two attributes to do its job. `rel="stylesheet"` tells the browser what kind of file it is connecting to, and `href` gives the path to that file, the same way the `href` on an anchor gives the path to a page. With that one line in the `<head>`, every rule in `styles.css` applies to the page.

### Why external is the one to use

All three of these work. The browser will happily apply any of them. So why does this course, and the industry, reach for external stylesheets almost every time? The answer comes down to two questions you should ask of any approach: how much do I have to repeat myself, and how hard is it to make a change later?

An **inline style** styles exactly one element and nothing else. It cannot be reused. If you want ten paragraphs to share the same look, you copy the same `style` attribute onto all ten, and the day you want to adjust that look you are editing ten separate tags and hoping you catch every one. It also jams appearance right into the middle of your structure, so your HTML becomes a tangle of content and styling that is genuinely hard to read. Inline styles break the separation of structure and presentation completely.

An **internal stylesheet** is a real step up. The rules are collected in one `<style>` block instead of scattered across tags, and a single rule there can style every matching element on the page at once. The problem is the phrase "on the page." That `<style>` block belongs to one HTML file. A second page cannot use it. Build a ten page site this way and you are copying the same block of CSS into all ten pages, and a change to your site's colours means editing that block ten times, in ten files, identically.

An **external stylesheet** removes both problems at once. The rules live in one `.css` file, and every page on the site links to that same file. Write a rule once and it applies everywhere the file is linked. Change a colour in that one file and every page updates together. Your HTML files stay clean, holding only structure, while all of the appearance lives in the stylesheet, exactly the separation of jobs this chapter opened with.

There is a single principle underneath all three. The further you pull styling out of individual tags and into a shared file, the less you repeat yourself and the easier the whole site is to change. Inline is the extreme of repetition, external is the opposite, and internal sits in between. That is why, from here on, this course uses external stylesheets, and why "write some CSS" always means "add a rule to your linked stylesheet."

## The anatomy of a rule

Before styling anything, you need to know how a single piece of CSS is written, because everything you do this term is made of this one small pattern. CSS is a list of **rules**. Each rule picks out the elements it applies to and then lists the changes to make. Every rule has the same shape:

```css
body {
  color: red;
}
```

That tiny rule already holds the vocabulary the whole course depends on. Here is the same rule with every part labelled:

![A CSS rule broken into its parts. The selector is "body". Inside the curly braces is a declaration, "color: red". Within that declaration, "color" is labelled the property and "red" is labelled the value. The selector together with its declaration block is labelled the rule set.](/images/css-syntax-basic.png)

Read it one piece at a time. The **selector** (`body`) chooses which elements the rule applies to. Inside the curly braces sits a **declaration**, `color: red`, and every declaration has two halves: the property (`color`) names the aspect you are changing, and the value (`red`) is the setting you give it. A colon separates the property from the value, and a semicolon ends the declaration. The curly braces with everything inside them are the **declaration block**, and the selector together with its block make one complete **rule**, also called a rule set. A block can hold as many declarations as you need, one per line:

<CssDemo>

```html
<h1>Styled heading</h1>
```

```css
h1 {
  color: crimson;
  font-size: 2.5rem;
  text-align: center;
}
```

</CssDemo>

That rule makes three changes to every `h1`: its colour, its size, and its alignment. Notice how it is laid out, with the opening brace on the selector line, each declaration indented on its own line, and the closing brace by itself. CSS does not require this. You could write the whole rule on one line and the browser would not care. Every developer formats it this way anyway, because it is far easier to read and to change, and this course expects you to do the same.

One small piece of punctuation causes more early CSS bugs than any other: the semicolon at the end of each declaration. Leave one out and the browser will usually ignore that declaration and often the one after it too, with no error message to tell you why. Get into the habit of ending every declaration with a semicolon, including the last one in a block. That last semicolon is technically optional, but keeping it means you never break a rule later by adding a line beneath it.

## CSS comments

As your stylesheets grow, you will want to leave notes to yourself, explaining what a group of rules is for or reminding yourself why something is set a certain way. A **comment** is text the browser ignores completely. In CSS, a comment starts with `/*` and ends with `*/`, and anything between them is skipped:

```css
/* Site-wide heading colour */
h1 {
  color: teal;
}
```

Comments are also useful for temporarily switching a rule off without deleting it. Wrap it in `/* */` and the browser skips it, then remove the comment markers to bring it back. In VS Code you can comment or uncomment the selected lines with `Ctrl` and `/` on Windows, or `Cmd` and `/` on a Mac, rather than typing the markers by hand.

## Selecting elements by type

The selector is the part of a rule that decides what gets styled. This week covers the most basic selector, the one you will still be using constantly at the end of the course: the **element selector**, also called a type selector. It targets every element of a given kind by its tag name. This rule finds every paragraph on the page and styles all of them at once:

<CssDemo>

```html
<p>Every paragraph gets this style.</p>
<p>Including this one, automatically.</p>
```

```css
p {
  color: teal;
  line-height: 1.6;
}
```

</CssDemo>

Element selectors are deliberately broad. You did not tag anything or single any paragraph out. Every `p` on the page is affected, which makes this the right tool for setting a baseline, the default look of all your paragraphs, or all your headings, or all your links, before you start making exceptions to it.

When you want the same rule to apply to more than one kind of element, you can list several selectors in front of a single block, separated by commas. This is called **grouping**, and it saves you writing the same declarations twice:

<CssDemo>

```html
<h2>Coffee</h2>
<h2>Tea</h2>
<p>Both are served all day.</p>
```

```css
h2, p {
  color: teal;
}
```

</CssDemo>

That one rule sets the colour on every `h2` and every `p` together. Grouping is just a shortcut. It behaves exactly as if you had written two identical rules, one for `h2` and one for `p`.

Element selectors will only take you so far, because sooner or later you will want to style one specific paragraph differently from all the others, and a type selector has no way to single it out. Targeting individual elements with classes and IDs, and understanding what happens when two rules try to style the same element, are the subjects of the Selectors, Specificity, and Inheritance week later in this course. Writing colours in other ways, such as the hex codes you saw in the very first example, belongs to the Typography and Colour week. For now you have what you need to write real, working CSS: you know what it is, how to attach it, how a rule is built, and how to aim one at the elements you want.

## Keep learning

- [MDN: CSS first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics). Mozilla's own beginner path through exactly the concepts in this chapter, and a reference you will come back to all term.
- [MDN: CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference). The full list of properties. Bookmark it now and look properties up as you meet them, rather than trying to memorize them.
- [W3Schools: CSS Introduction](https://www.w3schools.com/css/css_intro.asp). A second, plain-language explanation of these same basics, with small editable examples if a concept has not clicked yet.
- [Video: CSS in 100 Seconds, by Fireship](https://www.youtube.com/watch?v=OEV8gMkCHXQ). A fast, high-level overview of what CSS is and where it fits, useful before the detail.

## Try it yourself

Open the site folder you started in MTM1511. Create a new file called `styles.css` in the same folder as your HTML, and link it from your page's `<head>` with a `<link rel="stylesheet" href="styles.css">` element. Before styling anything, confirm the connection actually works: add one obvious rule such as `body { background-color: whitesmoke; }`, save, and reload the page with Live Server. If the background changes, your stylesheet is wired up correctly. If nothing happens, check the `href` path and that the `<link>` is inside the `<head>`.

Now write real rules with the element selector. Give all your paragraphs a colour and a comfortable `line-height`. Give your headings a colour of their own. Group two element types into one rule to see grouping work. Add a comment above each rule saying what it does. Save and reload as you go so you see each change land. When it looks the way you want, stage, commit, and push, the same workflow you learned in MTM1511, so this week's styling lands in your repository.
