# 07 — Applications: documents, print and decks

How the visual identity in [`04-visual-identity.md`](04-visual-identity.md)
is applied to company documents, the printed pieces in the game box, and
presentations. Where anything here conflicts with `04`, `04` wins.

> Everything in this file is `PROPOSED` unless a section is marked
> `CONFIRMED`. It carries forward the parts of the
> 17 October 2026 drafts (closed PR #7) that still stand after the founder's
> decisions of 5 November 2026. Nothing here may be used as final output
> until the founder confirms it.
>
> Designs: *Entre Amis Stationery* canvas (claude.ai artifact).
> Decks: [`decks/source/`](../decks/source/README.md).

---

## Shared styling `PROPOSED`

One look across documents, print and decks, so each piece reads as part of
the same family.

- **The band.** A deep olive band runs across the top edge (about 2.5 mm on
  A4, scaled down on small pieces), with a thin blush rule under it. The
  founder described this as making the pieces feel premium (17 October 2026).
- **The sign-off line.** A thin blush rule near the foot of the page, with
  the leaf at its left end where a small mark is used.
- **Colours.** Core Sous-bois colours only. Deep olive for headings, labels
  and rules; cream as the ground for print pieces; white as the ground for
  letters and invoices; blush as the accent. Gold only by exception, with
  founder approval (see `04`). Game card family colours are not used on these
  pieces.
- **Type.** Raleway only (`04`, `CONFIRMED`). Light for large headings;
  SemiBold for labels, small text and numbers in columns, with lining
  figures switched on.
- **Minimum size.** 9 pt for captions, footers and labels. 10.5 pt for
  instructions people read during play. 10 pt for tasting notes, which are
  read in low light with a glass in hand.
- **Body text colour.** Deep olive or near-black only. Pale grey text on
  cream is not used: it fails in print and in low light.
- **Small mark.** The leaf, with a small Raleway `ENTRE AMIS` wherever
  possible (see `04`). The monogram is retired and is not used.

## Company documents `PROPOSED`

| Piece | Size | Notes |
| --- | --- | --- |
| Letterhead | A4 | White ground. Band at the top; master logo top left; address, phone, email and web top right; sign-off line and company details (registered name, number, VAT) at the foot. |
| Invoice | A4 | Same frame as the letterhead. "Invoice" in Raleway Light; number, date and due date top right; Bill to / From; item table with cream header row; subtotal, VAT at 20% and Total due in a deep olive band; payment details and terms above the footer. Pounds sterling. |
| Business card, printed | 85 × 55 mm | Front: cream, master logo with contact details beside it, deep olive bottom edge. Back: deep olive, the leaf in cream with a small `ENTRE AMIS`. |
| Business card, embossed | 85 × 55 mm | Front: master logo blind embossed on cream (no ink). Back: printed details under a short band. Needs vector logo artwork for the emboss die. Founder leaning (17 October 2026): embossed as the main card. A gold foil variant would be a gold exception and needs founder approval. |

Placeholders on the drafts (company number, VAT number, address, bank
details) are filled in only from founder-supplied facts.

## Printed pieces in the game box `PROPOSED`

Sizes follow the production brief recorded in `04` (provisional, 5 November
2026). Every printed piece must lie flat inside the box with about 5 mm
clearance.

| Piece | Content |
| --- | --- |
| Activation card | Front: master logo, "Your app access is included", QR code, "Scan to play. No download needed.", access code (only if asked). Back: deep olive; Go further with the app (Taste more, Remember more, Play anywhere); 2–8 players · 18+ · Please drink responsibly. |
| Instruction card (How to Play) | Side 1: objective line, Set up (numbered steps), On your turn (Spin, Draw, Play, Win corks; play passes to the left). Side 2: Secret Missions panel, The Final Pour panel (Crown, Award, Count), players and age line. |
| Guidance cards (four) | One exists in draft: "What you might notice in your wines" (white and rosé on one side, red and sparkling on the other; five notes per wine including Feel; How to taste row: Look, Swirl, Smell, Sip, Say). The other three: `TODO`, content from the founder. |

- **"Included", not "free".** The buyer has already paid for the game, so the
  activation card says app access is included.
- **Either side may be seen first.** No piece relies on a front-to-back
  reading order.
- **Rounded corners** need a die-cut; confirm with the printer.
- Copy on these pieces follows `00`, `02` and `03`: corks, never points; a
  single glass is enough; no fixed time of day.

## PowerPoint template Master v1.0 `CONFIRMED`

Locked in by the founder as Master v1.0 (5 November 2026): *Entre Amis
PowerPoint template - Master v1.0.pptx* in the creative library.

- **Type scale** (founder: "Agree on sizing", checked for reading on a
  laptop and when projected): display 48 pt, slide title 40 pt, subtitle and
  card heading 24 pt, body 20 pt, card text and bullets 18 pt (the smallest
  text people read), labels and chart axes 14 pt, footer and slide number
  12 pt. Titles in Raleway Light, body in Raleway Regular.
- **Arm bars:** see expression colours in `04`.
- Web address on the closing slide: entreamis.co.uk. Other contact details
  are placeholders.

## Presentations `PROPOSED` (records the styling as built in the deck source)

The decks are built from [`decks/source/build.js`](../decks/source/build.js),
which is the reference for deck styling:

- Widescreen 13.33 × 7.5 in; cream background on every slide.
- Theme colours: deep olive (text and dark), white and cream (light), mid
  olive, light sage and blush as accents. Game family colours only on the
  slide that explains the card families.
- Raleway Light for titles (36 pt) and subtitles (18 pt); Raleway SemiBold
  for labels, with no letter spacing (founder, 6 November 2026: Google
  Slides cannot show it; see `04`).
- Content slides carry the master logo (29 October 2026) bottom right and a
  short line bottom left at 10 pt, with the slide number.
- Expression markers for each part of the offer follow `04` (`PROPOSED`
  there).
- Blush-bordered boxes are review flags and are removed before sharing.

Confirming this section makes it the house style for future decks. Where it
differs from the PowerPoint template Master v1.0 above, the template wins.

## Creative library Master v1.0 `CONFIRMED`

Banked by the founder on 5 November 2026. Banked means these are the agreed
design masters to build from. It does not mean production artwork: print
files and specifications follow the production brief, and nothing here is
marked production-ready.

| Set | What it holds |
| --- | --- |
| The game | Card fronts and backs, spinner, table scenes (see `04`) |
| Stationery and in-box print | Letterhead, invoice, printed and embossed business cards, QR card 65 mm, tasting tips card |
| How to Play | 150 × 150 mm card, two sides. Wording is the current draft: "Spin the spinner" |
| PowerPoint template | As above |
| Everyday brand | Compliment slip, email signature, A4 document template, DL envelope, mailing label, A6 note card, three stickers (olive seal, cream line, blush box seal) |
| Digital starter set | Profile icon, app icon (cream leaf on deep olive), favicon, link preview, four social posts, three stories. To evolve once full photography and lifestyle imagery exist |
| Partner and event | Five partner slides, pull-up banner, A1 poster, QR counter sign, table tent, A3 wayfinding sign, 5 × 7 in invitation, A4 one-pager. Placeholder wording on signage is fine for now (founder) |
| Co-brand lockup | Kept as a benchmark (see below) |

- Simplify, but not overly (founder, 5 November 2026): pieces were pared back
  to fewer decorations, and partner and How to Play pieces lost their extra
  watermarks and detail lines.
- The library lives in the project's creative library folder
  (`masters/v1.0/`), with a single overview PDF: *Entre Amis Master v1.0
  creative library - 5 Nov 2026.pdf*. Retired and superseded pieces are kept
  there in their own folders, not deleted.

### Co-brand lockup (benchmark) `PROPOSED`

Kept as a Master v1.0 benchmark by the founder (5 November 2026). The rules
are for confirmation:

- **A, side by side:** both logos at equal visual height, a blush divider,
  clear space equal to the leaf height.
- **B, partner leads:** the partner's logo first; Entre Amis endorses with the
  leaf and `ENTRE AMIS`.
- Logos of any shape are matched by height. On deep olive, use a one-colour
  partner logo, or put a full-colour one on a cream panel. Never recolour a
  partner's logo, and never put it on blush.
- The "with" and "Hosted by" wording is a placeholder.

### Consistency rules from the Master v1.0 review `PROPOSED`

- **One accent, one decoration, one message per surface.** The accent is a
  blush rule, bubble or badge; the decoration is a leaf watermark, scattered
  leaves, a tilted card or the spinner. Leaf watermarks on covers and hero
  pieces only. At most one scattered leaf per social post, none behind text.
- **One small sign-off:** the master logo where it fits, otherwise the leaf
  with `ENTRE AMIS` in a line (`04`); the stacked logo for square spaces only.
- **One top bar:** print uses a 3 mm deep olive bar, with the blush hairline on
  the letterhead family only; slides as the template; digital has none.
- `ENTRE AMIS` letter spacing 0.2 em everywhere.
- **Three corner radii:** small (labels and stickers), medium (cards and
  panels), large (bubbles).
- Short blush rules on covers, dividers and quotes only.

## Website `PROPOSED`

Founder decisions on the website mock-up (6 November 2026), recorded here to
confirm. The mock-up is a draft; none of its copy is approved.

- **Brand line on the home page:** "The setting changes. The spirit never
  does." (see [02](02-brand-voice.md#brand-line-and-supporting-lines)).
- **Age gate:** essential. The website opens with an 18+ screen, as the app
  does.
- **Email sign-up:** yes, "Keep me posted". A privacy notice is to be
  developed first; no email is collected until it exists.
- **Partner page:** a public Partners page (Partner Mode and Event Mode), with
  a gated partner area to follow in time.
- **Prices:** none on the website for now, the £40 RRP included. How the game
  is sold (direct or another way) is to be decided later.
- **Founder note:** Caroline writes the note on the Our story page herself.
- **No Entre Amis stays content** on the website.
- **French:** the founder likes the everyday French touches (e.g. *bientôt*)
  and wants more of them, within the brand voice mechanics in
  [02](02-brand-voice.md#mechanics).

