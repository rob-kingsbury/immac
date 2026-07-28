---
title: Debugging CSS Conflicts
prerequisites:
  - tools/browsers/devtools
  - css/css-cascade
  - css/css-precedence
---

# Debugging with the Cascade, Specificity, and Inheritance

Put it together into a routine. When a rule doesn't apply:

1. **Inspect the element.** Developer tools list every rule affecting it, winner at the top, losers with their declarations struck through.
2. **Look for the strike-through.** If your declaration is crossed out, something more specific or later beat it, and the panel shows you what.
3. **Check whether the selector matches at all.** If your rule isn't in the list, the selector is wrong, not the property. A typo in a class name, a missing dot, or a `>` where you needed a space.
4. **Check whether the property inherits.** If you expected a child to pick something up and it didn't, the property may simply not be inheritable.
5. **Compute the specificity of both rules** before changing anything. Then fix it by adjusting the selector, not by reaching for `!important`.
