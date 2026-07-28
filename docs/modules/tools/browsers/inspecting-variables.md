---
title: Inspecting Variables
prerequisites:
  - tools/browsers/devtools
  - css/css-custom-properties
---

# Inspecting Variables

In developer tools, a rule using `var()` shows the variable name, and hovering it reveals the resolved value. The Computed tab shows the final value after resolution, which is where you check whether a variable actually resolved or silently fell through.

If a property seems to have no value at all, a misspelled variable name is the first thing to suspect, since there's no error message for one.
