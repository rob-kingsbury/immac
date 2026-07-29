---
title: CSS Basics
prerequisites:
  - html/html-basics
---

# What <abbr title="Cascading Style Sheets">CSS</abbr> Is

CSS stands for Cascading Style Sheets. It is a language whose only job is to describe how <abbr title="HyperText Markup Language">HTML</abbr> should look: the colours, the spacing, the fonts, the sizes, and eventually the whole layout of the page. Like HTML, it is plain text you type into a file, and a real project means writing it by hand.

The important idea, and the one worth holding onto from day one, is that HTML and CSS have separate jobs. HTML describes what content *is*, a heading, a paragraph, a list. CSS describes how that content should *appear*. Keeping those two jobs in two separate places is not an accident or a limitation. It is the whole point, and it buys you two things that matter enormously as your sites grow. You can completely restyle a page without touching a word of its content, and you can control the look of many pages from one place, so changing a colour once updates it everywhere.

Here is what that separation looks like in practice. Below is a small piece of HTML. First the browser shows it with no CSS at all, then with a stylesheet applied. The HTML is identical in both. Only the CSS is different.

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

The words did not change. The heading is still a heading and the paragraph is still a paragraph. CSS, and nothing else, created the difference in appearance.

**A note on the Result panels in this course.** They are not screenshots. Each one runs real CSS in your browser, live, and each is kept separate from the others so the many examples on one page never accidentally style each other. Wherever the code is shown above a Result, that code is exactly what the panel renders. Type it into your own stylesheet and you get the same thing.

## Going deeper: why an unstyled page still looks like something

Look back at the "Without CSS" panel above. No stylesheet was linked, no `style` attribute was written anywhere, and yet the heading is bold and larger than the paragraph, and there's visible space between them. If CSS is the only thing that controls appearance, where did that formatting come from?

Every browser ships with its own built-in stylesheet, called the **user-agent stylesheet**, and it applies to every page automatically, before any CSS you write gets anywhere near it. It's why an `h1` is bold and large by default, why a `p` has space above and below it, why an unordered list gets bullets and indentation, and why a link shows up blue and underlined. None of that is the browser inventing a design. It's the browser applying its own default rules, the same way your own rules will apply once you write them.

This matters for two reasons. First, "no styling" is never really true in a browser, only "no styling from you", so don't be surprised that a bare HTML page already has some shape to it. Second, browsers don't all ship identical defaults, close enough that it rarely matters early on, but different enough that professional projects often start with a small stylesheet that flattens those differences before the site's own styles take over. That's a technique for later, but it's why you'll sometimes see the term "CSS reset" mentioned in other people's projects.

Before writing rules of your own, [Linking a Stylesheet](/modules/css/css-basics/linking-a-stylesheet.md) covers how the browser actually finds your CSS in the first place.

## The anatomy of a rule

Everything you write is made of one small pattern. CSS is a list of **rules**. Each rule picks out the elements it applies to and then lists the changes to make. Every rule has the same shape:

```css
body {
  color: red;
}
```

That tiny rule already holds the vocabulary the whole language depends on. Here is the same rule with every part labelled:

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

That rule makes three changes to every `h1`: its colour, its size, and its alignment. Notice how it is laid out, with the opening brace on the selector line, each declaration indented on its own line, and the closing brace by itself. CSS does not require this. You could write the whole rule on one line and the browser would not care. Every developer formats it this way anyway, because it is far easier to read and to change.

One small piece of punctuation causes more early CSS bugs than any other: the semicolon at the end of each declaration. Leave one out and the browser will usually ignore that declaration and often the one after it too, with no error message to tell you why. Get into the habit of ending every declaration with a semicolon, including the last one in a block. That last semicolon is technically optional, but keeping it means you never break a rule later by adding a line beneath it.

## CSS comments

As your stylesheets grow, you will want to leave notes to yourself, explaining what a group of rules is for or reminding yourself why something is set a certain way. A **comment** is text the browser ignores completely. In CSS, a comment starts with `/*` and ends with `*/`, and anything between them is skipped:

```css
/* Site-wide heading colour */
h1 {
  color: #006969;
}
```

Comments are also useful for temporarily switching a rule off without deleting it. Wrap it in `/* */` and the browser skips it, then remove the comment markers to bring it back. In VS Code you can comment or uncomment the selected lines with `Ctrl` and `/` on Windows, or `Cmd` and `/` on a Mac, rather than typing the markers by hand.

## The checklist

Run through this before you move on:

- You can name every part of a rule on sight: selector, declaration block, property, and value
- Every declaration you write ends with a semicolon, including the last one in a block
- You know what the user-agent stylesheet is, and why "no CSS" never really means "no styling at all"

## Keep learning

- [MDN: CSS first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics). Mozilla's own beginner path through exactly the concepts in this module.
- [MDN: CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference). The full list of properties. Bookmark it now and look properties up as you meet them, rather than trying to memorize them.
- [W3Schools: CSS Introduction](https://www.w3schools.com/css/css_intro.asp). A second, plain-language explanation of these same basics, with small editable examples if a concept has not clicked yet.
- [Video: Introduction to CSS, by Steve Griffith](https://www.youtube.com/watch?v=KFKScNHa-8M). A fellow Algonquin professor's overview of what CSS is and where it fits, useful before the detail.
