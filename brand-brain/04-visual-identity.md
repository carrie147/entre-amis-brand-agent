# 04 — Visual Identity

The logo and colours. The logo has its own approved route, separate from how
the name is written in copy.

---

## Logo

### Master logo `CONFIRMED`

- **The stacked olive caps with the leaf:** `ENTRE` over `AMIS`, bold
  capitals in olive, with a fine-line leaf/sprig drawn across the letters.
- This is the current logo. It may be updated and formalised later — when it
  is, this section is updated first.

### Not approved `CONFIRMED`

- The script lockups (`ENTRE` with a script `amis` and flourish, with or
  without leaf/vine artwork) are **not correct** and must not be used.

### Name styling in the logo vs copy `CONFIRMED`

- **™:** will appear on the final, formalised logo — **not** on the current
  one. `CONFIRMED`
- The logo may style the name (e.g. `ENTRE AMIS`, `ENTRE amis`) as an approved
  logo route.
- **Written copy always uses "Entre Amis"** — see
  [`00-brand-core.md`](00-brand-core.md#name).

### Small-format mark `TODO`

A separate small mark is planned for formats where the full stacked logo is
too big to read. Until it's approved, don't create or improvise one.

To define when it's ready:

- What it is (e.g. monogram, leaf, initials).
- Where it's used — e.g. app icon, favicon, social avatar, card backs,
  components, stamps.
- The size at which you switch from the full logo to the small mark.
- Approved colour versions.

### Still needed `TODO`

- Master logo artwork files (SVG / PNG) added to the repo.
- Clear space, minimum size, and approved colour versions (olive on cream,
  cream on deep olive, single colour).

## Colour

Palette name: **Sous-bois**.

### Core brand colours `CONFIRMED`

Near-monochrome olive tonal range with a single blush accent. These are the
**only** colours for general brand use — website, app UI, social, articles,
packaging, partner materials.

| Colour | HEX | RGB | CMYK | Use |
| --- | --- | --- | --- | --- |
| Deep olive | `#565A32` | 86, 90, 50 | 4, 0, 44, 65 | |
| Mid olive | `#8B8B5C` | 139, 139, 92 | 0, 0, 34, 45 | |
| Light sage | `#B9BC9A` | 185, 188, 154 | 2, 0, 18, 26 | |
| Cream | `#EFEAE0` | 239, 234, 224 | 0, 2, 6, 6 | |
| Blush (single accent) | `#E3AC9A` | 227, 172, 154 | 0, 24, 32, 11 | The only accent |

### Game card family colours `CONFIRMED`

For the **cards and game only**, to show the different card families. Each
family has a fill colour and a darker text colour.

| Family | Fill | Fill HEX | Fill RGB | Text HEX | Text RGB |
| --- | --- | --- | --- | --- | --- |
| **Savour** | Dusty lavender | `#8D84A6` | 141, 132, 166 | `#5E5677` | 94, 86, 119 |
| **Pour** | Ochre gold | `#C89B3C` | 200, 155, 60 | `#7A5A17` | 122, 90, 23 |
| **Wild** | Brick red | `#A8503F` | 168, 80, 63 | `#813528` | 129, 53, 40 |
| **Mischief** | Terracotta | `#BC6B4A` | 188, 107, 74 | `#9A5234` | 154, 82, 52 |
| **Secret Mission** | Dusty blue | `#6E8B93` | 110, 139, 147 | `#4B6166` | 75, 97, 102 |
| **Word Play** (app only) | Olive | `#7A7F5A` | 122, 127, 90 | `#575B3E` | 87, 91, 62 |
| **Wine Knowledge** (app only) | Deep blush | `#B48A7A` | 180, 138, 122 | `#7A5647` | 122, 86, 71 |
| **Awards** | Deep olive (core colour) | `#565A32` | 86, 90, 50 | White or cream | — |

- **Secret Mission screens** (app) also get a light dusty-blue tint behind them.
- **Awards** use a core brand colour, not a game colour. Deep olive was chosen
  because it's closest in feel to the printed prototype, stays clearly
  distinct from Word Play olive, and carries white (7.2:1) or cream (6.0:1)
  text comfortably. Founder may override.
- CMYK values for print: `TODO` — from the designer.
- The colours on the earlier card-pack prototype are superseded by this table.
- Word Play olive (`#7A7F5A`) is a game colour, not one of the core olives —
  don't swap them.

**Rule:** these colours must **never** be used for general brand purposes.
Outside the game itself (e.g. in an article, social post or the app), a card
family colour may only appear when it is signifying that gameplay family.

### Accessibility check `PROPOSED`

Contrast ratios checked against WCAG AA (4.5:1 for normal text):

- **Text colours on cream or white: all pass** (4.8–8.5:1).
- **Text colour on its own fill: all fail** (1.5–2.5:1). Never set a family's
  text colour on its fill.
- **White text on fills:** only Wild passes for normal text (5.4:1). Word Play
  (4.2), Mischief (3.9), Secret Mission (3.6), Savour (3.5), Wine Knowledge
  (3.1) are OK only for large or bold text (3:1). Pour (2.6) fails — never
  white text on Pour.

## Typography

### Typeface `CONFIRMED`

**Raleway** — in **Light** (300) and **SemiBold / Bold** (600 / 700).

No other typefaces. The logo is artwork, not typed out — never recreate it in
Raleway or any other font.

### How to use the weights `PROPOSED`

| Use | Weight | Notes |
| --- | --- | --- |
| Large headings, display lines, brand line | Light | Airy and premium — as on the deck |
| Short labels, small-caps headings (ANY WINE) | SemiBold | Letter-spaced, as on the deck and How to Play |
| Emphasis, buttons, card family names, cork values | SemiBold / Bold | |
| Body copy | Light, at a comfortable size | Light gets hard to read when small or on dark colours — see below |

**Watch-outs**

- **Light at small sizes.** Light is thin; at small sizes, on screens, or on
  dark or coloured fills (e.g. card families) it can become hard to read.
  Keep Light for larger text and use SemiBold for small text there.
- **Numbers.** Raleway's default numbers are "old-style" (they rise and dip
  like lowercase letters). For scores, cork counts, prices and anything in a
  column, switch on lining figures (`font-variant-numeric: lining-nums`) so
  numbers sit level.
