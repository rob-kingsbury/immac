# Comp Spec Sheet: Riverside Print Co.
MTM1544 (Web Styles), fallback comp for Weeks 6 and 7

This is the design to build if you do not have an MTM1537 mockup, because you took that course in a
different term or the file is gone. Using it costs you nothing. The Week 6 fidelity criterion marks
how closely your build matches the design you were given, not how good the design is, so a student
on the fallback and a student on their own mockup are marked the same way.

Every value you need is in this sheet. You do not have to open Figma to build this, though the file
is there if you want to measure something yourself.

Source: [immac, Week 6, CSS Grid Layouts](https://rob-kingsbury.github.io/immac/mtm1544/content/#week-6-css-grid-layouts)

---

## Source

| | |
|---|---|
| Comp name | Riverside Print Co. |
| Drawn at | 1440 wide, 1618 tall |
| Source file | https://www.figma.com/design/8EfiWNFXduWgPjFMWDMyM6 |
| Exported image | `fallback-comp-riverside.png` |
| Photographs | `images/`, five files, listed below |
| Font family | Inter. Regular 400, Medium 500, Semi Bold 600, Bold 700 |
| Fallback stack | `Inter, system-ui, -apple-system, "Segoe UI", sans-serif` |

Inter is on Google Fonts. If you would rather not load a webfont, `system-ui` on its own is a
reasonable substitute and will not cost you fidelity marks.

## Palette

| Token | Hex | Used for |
|---|---|---|
| ink | `#14202E` | Hero and footer background. Headings and body text on light backgrounds |
| paper | `#F6F3EE` | Page background |
| surface | `#FFFFFF` | Header background, card background |
| accent | `#B4451F` | Button fill, card category labels |
| accent-soft | `#F0DCD2` | Sidebar note background, hero eyebrow text |
| line | `#D8D2C8` | Card borders, header bottom rule, body text on ink |
| muted | `#5C6672` | Inactive nav links, card blurb text, sidebar section label |

Two of these do double duty depending on the background behind them. `line` is a border colour on
paper and a text colour on ink. `accent-soft` is a panel fill on paper and a label colour on ink.
That is deliberate and worth noticing when you name your custom properties: name them for the
colour, not for the one place you first used them.

## Type scale

Seven roles across six sizes. The 28 appears twice at different weights, which is why it gets two
rows.

| Role | Size | Line height | Weight | Tracking |
|---|---|---|---|---|
| Hero headline | 40 | 48 | Bold 700 | none |
| Section heading | 28 | 36 | Bold 700 | none |
| Featured card title | 28 | 36 | Semi Bold 600 | none |
| Wordmark | 20 | 28 | Bold 700 | +2% |
| Card title | 20 | 28 | Semi Bold 600 | none |
| Hero lede | 18 | 28 | Regular 400 | none |
| Body, nav, footer, sidebar | 16 | 24 | Regular 400, nav is Medium 500 | none |
| Card blurb | 16 | 26 | Regular 400 | none |
| Eyebrows and labels | 13 | 20 | Semi Bold 600 | +8%, uppercase |

The card blurb is 16/26 while everything else at 16 is 16/24. Two pixels, and it is in the design on
purpose, because the blurbs wrap and the rest of the 16px text does not.

## Spacing scale

Everything is a multiple of 8.

| Step | Value | Typical use |
|---|---|---|
| 8 | 8px | Gap between a label and the text under it, inside cards and footer columns |
| 16 | 16px | Gap between sidebar list items, button vertical padding |
| 24 | 24px | Card internal padding, gallery gutter, hero item gap, sidebar note padding |
| 32 | 32px | Nav link gap, sidebar to main gap, button horizontal padding, main section gap |
| 48 | 48px | Footer vertical padding |
| 64 | 64px | Hero and body vertical padding, footer column gap |

## Photographs

Five photographs ship with this comp in `images/`. They are already cropped to the
right shapes, at twice the displayed size so they stay sharp on a high-density screen.

| File | Shipped | Displayed at | Card |
|---|---|---|---|
| `featured-editions.jpg` | 1200x360 | 600x180 | The Rideau Portfolio |
| `posters-riverfest.jpg` | 576x360 | 288x180 | Riverfest 2026 |
| `packaging-hollow-bean.jpg` | 576x360 | 288x180 | Hollow Bean Roasters |
| `stationery-marsh-and-fen.jpg` | 576x360 | 288x180 | Marsh and Fen |
| `posters-winter-market.jpg` | 576x360 | 288x180 | Winter Market |

The featured image is 10:3 and the other four are 8:5, because the featured card is twice as wide
at the same height. If you swap in your own photographs, match those two shapes or the cards will
not line up.

### Where they came from

All five are from Pexels. The Pexels licence allows free use, commercial and not, and requires no
attribution, so you do not have to credit anyone on your page. The table is here so the provenance
is on record, not because you owe anybody a credit line.

| File | Photographer | Source |
|---|---|---|
| `featured-editions.jpg` | Erik Mclean | https://www.pexels.com/photo/metal-letterpress-on-printing-plate-on-desk-4140916/ |
| `posters-riverfest.jpg` | Wendelin Jacober | https://www.pexels.com/photo/a-wood-plank-clamped-on-a-steel-equipment-1509308/ |
| `packaging-hollow-bean.jpg` | Suzy Hazelwood | https://www.pexels.com/photo/stack-of-cardboards-1813331/ |
| `stationery-marsh-and-fen.jpg` | Sam J | https://www.pexels.com/photo/white-paper-folders-with-black-tie-1764956/ |
| `posters-winter-market.jpg` | Antoni Shkraba | https://www.pexels.com/photo/hand-of-man-working-with-printing-tools-using-machinery-6620998/ |

## Layout

| Measurement | Value |
|---|---|
| Frame width | 1440 |
| Page side margin | 120 |
| Content width | 1200 |
| Sidebar width | 256, fixed |
| Column gap | 32 |
| Main column width | 912 |
| Gallery gutter | 24 |
| Card width | 288 |
| Featured card width | 600 |
| Header height | 88, with a 1px bottom rule in `line` |
| Hero padding | 64 top and bottom, 120 left and right |
| Hero lede max width | 720 |
| Body padding | 64 top and bottom, 120 left and right |
| Footer padding | 48 top and bottom, 120 left and right |
| Corner radius | 2, on cards, the button and the sidebar note |
| Card border | 1px, `line` |

The arithmetic that matters for Week 6: 288 times three, plus two 24px gutters, is 912, which is the
main column exactly. The featured card is 600, which is two card widths plus one gutter. Those
numbers are not decoration, they are what a correct `repeat(auto-fit, minmax(...))` has to land on.
Work out for yourself which `minmax()` floor gives you three columns at 912 and which one gives you
four, because the obvious first guess gives four.

## Repeating component

| | |
|---|---|
| Name | Card |
| Appears | 5 times, one of them stretched |
| Width | 288, or 600 for the featured card |
| Internal padding | 24 on all four sides of the text block |
| Internal gap | 8 between category, title and blurb |
| Image block | Full card width, 180 tall, a photograph cropped to fill |
| What varies between instances | Category label, title, blurb, and therefore height |
| What stays fixed | Width, image height, padding, gap, border, radius, all type sizes except the featured title |

The five cards are 352, 344, 370, 318 and 344 tall, because the blurbs are different lengths. That
is not a mistake in the comp. It is the situation Week 6 step 8 is about: a row of cards whose
content does not match in length, where the internal rows will not line up across the row unless you
do something about it.

The featured card differs from the others in exactly two ways, its width and its title size. Nothing
else about it changes, so if you find yourself writing a separate rule for it beyond the span and the
heading size, you have gone further than the design asked.

## What this comp does not decide

This comp is drawn at one width. Everything below is a decision you make in Week 7, and the
assignment asks you to write down what you chose and why.

- Every width below 1440. There is no tablet or phone version of this design anywhere.
- What the five-item nav becomes when it no longer fits on one line beside the wordmark.
- Whether the sidebar sits above the gallery on a narrow screen or below it.
- What the featured card does once the gallery is one column wide and it can no longer span two.
- Whether the 40px hero headline stays 40px on a 375px screen, and what it becomes if not.
- The hover, focus and active states of the nav links and the button. The comp shows resting states
  only, and focus states in particular are not optional in a browser even though a comp can skip them.
- Alt text. The photographs ship without any, and every one of them needs it written by you.
- What happens to the featured card's 10:3 photograph once that card is one column wide, since a
  crop that works at 600 wide is not the same crop that works at 288.
