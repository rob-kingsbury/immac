---
title: Introduction to CSS
---

# Introduction to CSS

In MTM1511 earlier this week you set up your development environment and published a page to the web. This class finishes that setup from the styling side and gets a real stylesheet running.

By the end of today you'll have a `css` folder, a `styles.css` file linked to a page, a way to confirm the connection actually works, and enough CSS to write your first rules. Nothing here is throwaway. This is the file you'll add to every week for the rest of the term. Next week the real CSS work starts.

## What CSS is

CSS stands for Cascading Style Sheets. It is a language whose only job is to describe how HTML should look: the colours, the spacing, the fonts, the sizes, and eventually the whole layout of the page. Like HTML, it is plain text you type into a file, and you will spend this entire course writing it by hand.

The important idea, and the one worth holding onto from day one, is that HTML and CSS have separate jobs. HTML describes what content *is*, a heading, a paragraph, a list. CSS describes how that content should *appear*. Keeping those two jobs in two separate places is not an accident or a limitation. It is the whole point, and it buys you two things that matter enormously as your sites grow. You can completely restyle a page without touching a word of its content, and you can control the look of many pages from one place, so changing a colour once updates it everywhere.

Here is what that separation looks like in practice. Below is a small piece of HTML, the kind of thing you'll write in MTM1511. First the browser shows it with no CSS at all, then with a stylesheet applied. The HTML is identical in both. Only the CSS is different.

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

The words did not change. The heading is still a heading and the paragraph is still a paragraph. CSS, and nothing else, created the difference in appearance. You will be able to write every line of that styling yourself before this course is done.

**A note on the Result panels in this course.** They are not screenshots. Each one runs real CSS in your browser, live, and each is kept separate from the others so the many examples on one page never accidentally style each other. Wherever the code is shown above a Result, that code is exactly what the panel renders. Type it into your own stylesheet and you get the same thing.

## Confirming your setup

Before writing any CSS, confirm the tools from Monday actually work. Run through this list now, because every remaining week of this course assumes all five are true.

1. **VS Code opens** and the Extensions view lists Live Server as installed.
2. **Git is recognized.** Open a terminal in VS Code and run `git --version`. You should get a version number, not an error.
3. **You have a repository cloned locally**, open in VS Code as a folder rather than a single loose file.
4. **You can push.** Make a trivial change, stage it, commit it, and sync. The change appears on GitHub when you refresh.
5. **Pages is on** for that repository, and the live URL loads in a browser.

If any one of those fails, fix it now, before the rest of this class. A broken step here blocks every assignment in both courses, and it does not get easier to fix next week.

## The starter page

You haven't covered enough HTML yet to build a page from scratch, that starts next week in MTM1511, so this week you're given one to style. Create a file called `index.html` at the top level of your repository and paste this in:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mountain Trail Guide</title>
  </head>
  <body>
    <h1>Mountain Trail Guide</h1>
    <p class="intro">Three routes, from an easy lakeside loop to a steep summit climb.</p>

    <h2>Lakeside Loop</h2>
    <p>Four kilometres, almost flat, and shaded most of the way.</p>

    <h2>Ridge Trail</h2>
    <p>Nine kilometres with a steady climb and a view worth the effort.</p>

    <h2 id="summit">Summit Climb</h2>
    <p>Fourteen kilometres, steep in places, and the only route that needs a full day.</p>
  </body>
</html>
```

Right-click the file in VS Code and choose **Open with Live Server**. Your browser opens the page, unstyled, and will refresh automatically every time you save from now on. Leave that browser tab open beside VS Code for the rest of the class.

Two details in that markup will matter shortly. One paragraph carries `class="intro"` and one heading carries `id="summit"`. You'll use both later in this chapter.

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

The third is an **external stylesheet**, where your CSS lives in its own separate file and the HTML page links to it. You write your rules in a file ending in `.css`, commonly named `styles.css` and kept in a `css` folder so your project stays organized as it grows. You connect it to the page with a `<link>` element in the `<head>`:

```html
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
```

The `<link>` element needs two attributes to do its job. `rel="stylesheet"` tells the browser what kind of file it is connecting to, and `href` gives the path to that file. The value `css/styles.css` means the file `styles.css` inside a folder named `css`. With that one line in the `<head>`, every rule in your stylesheet applies to the page.

### Why external is the one to use

All three of these work. The browser will happily apply any of them. So why does this course, and the industry, reach for external stylesheets almost every time? The answer comes down to two questions you should ask of any approach: how much do I have to repeat myself, and how hard is it to make a change later?

An **inline style** styles exactly one element and nothing else. It cannot be reused. If you want ten paragraphs to share the same look, you copy the same `style` attribute onto all ten, and the day you want to adjust that look you are editing ten separate tags and hoping you catch every one. It also jams appearance right into the middle of your structure, so your HTML becomes a tangle of content and styling that is genuinely hard to read. Inline styles break the separation of structure and presentation completely.

An **internal stylesheet** is a real step up. The rules are collected in one `<style>` block instead of scattered across tags, and a single rule there can style every matching element on the page at once. The problem is the phrase "on the page." That `<style>` block belongs to one HTML file. A second page cannot use it. Build a ten page site this way and you are copying the same block of CSS into all ten pages, and a change to your site's colours means editing that block ten times, in ten files, identically.

An **external stylesheet** removes both problems at once. The rules live in one `.css` file, and every page on the site links to that same file. Write a rule once and it applies everywhere the file is linked. Change a colour in that one file and every page updates together. Your HTML files stay clean, holding only structure, while all of the appearance lives in the stylesheet, exactly the separation of jobs this chapter opened with.

There is a single principle underneath all three. The further you pull styling out of individual tags and into a shared file, the less you repeat yourself and the easier the whole site is to change. Inline is the extreme of repetition, external is the opposite, and internal sits in between. That is why, from here on, this course uses external stylesheets, and why "write some CSS" always means "add a rule to your linked stylesheet."

## Creating and linking your stylesheet

Now do it for real, in your own repository.

1. In VS Code's Explorer, create a new folder at the top level of your project called `css`.
2. Inside it, create a new file called `styles.css`. Your project now has `index.html` at the top and `css/styles.css` beneath it.
3. In `index.html`, add the link inside the `<head>`, on the line after the `<title>`:

```html
<link rel="stylesheet" href="css/styles.css">
```

4. In `styles.css`, add one obvious rule so you can see whether the connection works at all:

```css
body {
  background-color: whitesmoke;
}
```

5. Save both files. Your Live Server tab should refresh on its own and the page background should go pale grey.

**If nothing changed,** the connection is broken and this is worth fixing carefully now, because it's the single most common problem in the first weeks of this course. Check three things, in this order. Is the `<link>` inside the `<head>`, not the `<body>`? Is the path exactly `css/styles.css`, matching your real folder and file names including their capitalisation? And did you actually save both files, since Live Server only reloads on save?

## The anatomy of a rule

Everything you write this term is made of one small pattern. CSS is a list of **rules**. Each rule picks out the elements it applies to and then lists the changes to make. Every rule has the same shape:

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

## Choosing what to style

The selector is the part of a rule that decides what gets styled. Three kinds of selector cover almost everything you'll do in your first weeks, and they differ in how *specific* they are.

### The element selector

The **element selector**, also called a type selector, targets every element of a given kind by its tag name. This rule finds every paragraph on the page and styles all of them at once:

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

That one rule sets the colour on every `h2` and every `p` together. Grouping is just a shortcut. It behaves exactly as if you had written two identical rules.

### The class selector

Sooner or later you'll want to style *some* paragraphs differently from the rest, and an element selector has no way to single them out. A **class** is a label you put on any elements you choose, using the `class` attribute in the HTML, and then target in CSS with a dot in front of the name:

<CssDemo>

```html
<p class="intro">This paragraph is the introduction.</p>
<p>This one is ordinary body text.</p>
<p class="intro">This one is an introduction too.</p>
```

```css
.intro {
  font-size: 1.3rem;
  font-weight: 600;
  color: teal;
}
```

</CssDemo>

The dot in `.intro` is what tells CSS "this is a class name, not a tag name." Two things make classes the workhorse of CSS. You can put the same class on as many elements as you like, so one rule styles all of them. And one element can carry several classes at once, separated by spaces, as in `class="intro featured"`, picking up the styling from each.

Name classes for what the content *is* rather than what it currently looks like. `.intro` and `.warning` stay accurate forever. `.big-red-text` becomes a lie the day you change the colour.

### The ID selector

An **ID** is a label meant to identify one single element on the page. You set it with the `id` attribute and target it in CSS with a hash:

<CssDemo>

```html
<h2 id="summit">Summit Climb</h2>
<h2>Ridge Trail</h2>
```

```css
#summit {
  color: crimson;
  border-left: 4px solid crimson;
  padding-left: 0.6rem;
}
```

</CssDemo>

The rule is strict: **an ID must be unique within a page.** No two elements may share one. That's not a style preference, it's a requirement of valid HTML, and it's why IDs are used far less than classes for styling. If a look might ever apply to a second element, it should have been a class.

IDs earn their keep elsewhere. They're the target of a link that jumps to a section of a page, `href="#summit"`, and they connect a form label to its input, which you'll meet later in MTM1511. For styling, reach for a class first and an ID only when you genuinely mean this one element and no other.

## How the browser decides: the cascade

You now have three ways to select the same element, which raises an obvious question. What happens when two rules both apply and they disagree?

That's what the "cascading" in Cascading Style Sheets means. The browser gathers every rule that matches an element and resolves the conflicts with a set of tie-breakers. Two of them are enough for this week.

**Later beats earlier.** When two rules are equally specific, the one further down the stylesheet wins:

<CssDemo>

```html
<p>Which colour wins?</p>
```

```css
p {
  color: teal;
}
p {
  color: crimson;
}
```

</CssDemo>

Both rules match, both are equally specific, so the last one read is the one that applies. This is why the order of rules in your file matters, and why a rule that "isn't working" is often being overridden by something further down.

**More specific beats less specific.** An ID selector beats a class selector, which beats an element selector, regardless of order:

<CssDemo>

```html
<p class="intro" id="lead">Which colour wins here?</p>
```

```css
#lead {
  color: crimson;
}
.intro {
  color: goldenrod;
}
p {
  color: teal;
}
```

</CssDemo>

The ID wins even though it's written first, because it's the most specific of the three. That ordering, ID over class over element, is the practical version of a rule you'll learn to calculate exactly in the Selectors, Specificity, and Inheritance week later this term. For now, the useful takeaway is a debugging instinct: when a rule seems to be ignored, something more specific is probably beating it.

## Checking your work in developer tools

Guessing why a style didn't apply wastes a lot of time when the browser will simply tell you. Right-click any element on your page and choose **Inspect**. Developer tools open with that element selected and a Styles panel showing every rule affecting it.

Three things in that panel are worth knowing today. Rules are listed with the winning one at the top. Declarations that lost a conflict appear with a line struck through them, which shows you exactly what overrode what. And if your stylesheet doesn't appear in the list at all, the file isn't connected, which sends you back to the `<link>` and the file path rather than to your CSS.

Get in the habit of inspecting rather than guessing. It's the fastest debugging tool you have, and you'll use it every week of this course.

## Publishing what you built

Finish by getting today's work onto the live site, using the workflow from MTM1511 earlier this week.

Stage your changed files in the Source Control panel, write a commit message describing what you did, commit, then sync to push. Give GitHub a minute, then open your Pages URL in a browser. Your styled page should be there, publicly, at a real address.

That round trip, edit locally, push, see it live, is how every assignment in this course is submitted. Doing it once today while the stakes are zero means it's routine by the time it counts.

## Keep learning

- [MDN: CSS first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics). Mozilla's own beginner path through exactly the concepts in this chapter, and a reference you will come back to all term.
- [MDN: CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference). The full list of properties. Bookmark it now and look properties up as you meet them, rather than trying to memorize them.
- [W3Schools: CSS Introduction](https://www.w3schools.com/css/css_intro.asp). A second, plain-language explanation of these same basics, with small editable examples if a concept has not clicked yet.
- [Chrome DevTools: View and change CSS](https://developer.chrome.com/docs/devtools/css). A short guide to the Styles panel used above.
- [Video: CSS in 100 Seconds, by Fireship](https://www.youtube.com/watch?v=OEV8gMkCHXQ). A fast, high-level overview of what CSS is and where it fits, useful before the detail.

## Try it yourself

Start from the starter page and stylesheet you built during class. Confirm the link works by changing the `background-color` on `body` and watching the page update on save.

Then write real rules. Give all your paragraphs a colour and a comfortable `line-height` with an element selector. Give every `h2` a colour of its own. Group two element types into one rule to see grouping work. Style the `.intro` paragraph differently from the others with a class selector, and the `#summit` heading with an ID selector. Add a comment above each rule saying what it does.

Now test the cascade deliberately. Write a second `p` rule further down your file that sets a different colour, save, and confirm the later rule wins. Then add a class to one of those paragraphs with a third colour and confirm the class beats the element rule. Open developer tools, inspect that paragraph, and find the struck-through declarations that lost.

When it looks the way you want, stage, commit, push, and confirm the live Pages URL shows your styling.
