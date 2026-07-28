---
title: Inspecting CSS Rules
prerequisites:
  - tools/browsers/devtools
  - css/css-cascade
---

# Checking Your Work in Developer Tools

Guessing why a style didn't apply wastes a lot of time when the browser will simply tell you. Right-click any element on your page and choose **Inspect**. Developer tools open with that element selected and a Styles panel showing every rule affecting it.

Several things in that panel are worth knowing. Rules are listed with the winning one at the top. Declarations that lost a cascade conflict appear with a line struck through them, which shows you exactly what overrode what. And if your stylesheet doesn't appear in the list at all, the file isn't connected, which sends you back to the `<link>` and the file path rather than to your CSS.

There's a second reason a declaration can show up struck through, and it's the one worth checking for whenever your own CSS doesn't apply at all: the browser couldn't parse it, and rejected it outright. A misspelled property name, a missing colon or semicolon, or a value that isn't legal for that property all produce this, with no other rule in sight to explain the strikethrough. That's your self-check for hand-written CSS. If a declaration is struck through and nothing else in the panel is winning over it, the browser is telling you it's invalid, not that something beat it.

Get in the habit of inspecting rather than guessing. It's the fastest debugging tool you have.
