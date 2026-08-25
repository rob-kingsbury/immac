---
title: Inspecting CSS Rules
prerequisites:
  - tools/browsers/devtools
  - css/css-cascade
---

# Checking Your Work in Developer Tools

Guessing why a style didn't apply wastes a lot of time when the browser will simply tell you. Right-click any element on your page and choose **Inspect**. Developer tools open with that element selected and a Styles panel showing every rule affecting it.

Several things in that panel are worth knowing. Rules are listed most specific first, with anything written in a `style` attribute pinned above the rest and inherited rules gathered in their own sections lower down. Declarations that lost a cascade conflict appear with a line struck through them, which shows you exactly what overrode what.

Read the strikethroughs rather than the order. Usually the rule at the top is the one that won, but the panel does not account for `!important` when it decides where to put a rule, only when it decides what to cross out. So a rule sitting further down the list can still be the one supplying the value you see on the page. Winning is also per declaration rather than per rule: one rule can supply the winning `color` while a rule above it supplies the winning `width`.

If your stylesheet doesn't appear in the list at all, the usual suspect is that the file isn't connected, which sends you back to the `<link>` and the file path. Check the selector before the path, though. A perfectly connected stylesheet also shows nothing here when none of its rules happen to match the element you inspected, and a typo in a selector is at least as common as a broken path.

There's a second reason a declaration can show up struck through, and it's the one worth checking for whenever your own CSS doesn't apply at all: the browser couldn't parse it, and rejected it outright. A misspelled property name, a missing semicolon, or a value that isn't legal for that property all produce this. Look for the warning icon beside the declaration, because that is what separates "rejected as invalid" from "beaten by another rule", and it is more reliable than checking whether anything else in the panel is competing.

The strikethrough also tells you *which half* is wrong. An unknown or misspelled property name crosses out the whole declaration, property and value together. A valid property with an illegal value crosses out only the value. That saves you looking in the wrong place.

One failure does not appear here at all. A missing colon, as in `color red`, is discarded by the parser before the declaration ever reaches the panel, so there is nothing to strike through and nothing to see. If a declaration you know you wrote is simply absent from the panel rather than crossed out, check your punctuation.

CSS mistakes never reach the Console, so none of this shows up as an error message. The Styles panel is the only place these surface.

Get in the habit of inspecting rather than guessing. It's the fastest debugging tool you have.
