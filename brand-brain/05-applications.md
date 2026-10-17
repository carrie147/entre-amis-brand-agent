# 05 — Applications: documents, print and decks

How the visual identity in [`04-visual-identity.md`](04-visual-identity.md)
is applied to company documents, the printed pieces in the game box, and
presentations. Where anything here conflicts with `04`, `04` wins.

> Everything in this file is `PROPOSED` unless marked otherwise. It records
> drafts made on 15–17 October 2026 for founder review. Nothing here may be
> used as final output until the founder confirms it.
>
> Designs: *Entre Amis Stationery* canvas (claude.ai artifact), 17 October 2026.
> Decks: [`decks/source/`](../decks/source/README.md).

---

## Shared styling `PROPOSED`

One look across documents, print and decks, so each piece reads as part of
the same family.

- **The band.** A deep olive band runs across the top edge (about 2.5 mm on
  A4, scaled down on small pieces), with a thin accent rule under it. The
  founder described this as making the pieces feel premium (17 October 2026).
- **The sign-off line.** A thin accent rule near the foot of the page, with
  the small mark at its left end where one is used (see Small mark below).
- **Colours.** Core Sous-bois colours only. Deep olive for headings, labels
  and rules; cream as the ground for print pieces; white as the ground for
  letters and invoices; blush as the single accent (the band rule and
  sign-off rule). Game card family colours are not used on these pieces.
- **Type.** Raleway only (`04`, `CONFIRMED`). Light for large headings;
  SemiBold for labels, small text and numbers in columns, with lining
  figures switched on.
- **Minimum size.** 9 pt for captions, footers and labels. 10.5 pt for
  instructions people read during play. 10 pt for tasting notes, which are
  read in low light with a glass in hand.
- **Body text colour.** Deep olive or near-black only. Pale grey text on
  cream is not used: it fails in print and in low light.

### Corrections still to make to the drafts

- The 17 October drafts set body text in Manrope and a dark aubergine
  (`#3E2A3E`) taken from the app. Neither is in `04`. Before confirmation,
  body text moves to Raleway and deep olive (or near-black).

## Company documents `PROPOSED`

| Piece | Size | Notes |
| --- | --- | --- |
| Letterhead | A4 | White ground. Band at the top; master logo top left; address, phone, email and web top right; sign-off line and company details (registered name, number, VAT) at the foot. |
| Invoice | A4 | Same frame as the letterhead. "Invoice" in Raleway Light; number, date and due date top right; Bill to / From; item table with cream header row; subtotal, VAT at 20% and Total due in a deep olive band; payment details and terms above the footer. Pounds sterling. |
| Business card, printed | 85 × 55 mm | Front: cream, master logo with contact details beside it, deep olive bottom edge. Back: deep olive, small mark in cream, "Entre Amis" in letter-spaced capitals. |
| Business card, embossed | 85 × 55 mm | Front: master logo blind embossed on cream (no ink). Back: printed details under a short band. Needs vector logo artwork for the emboss die. Founder leaning (17 October 2026): embossed as the main card; a gold foil variant is an option if the accent changes. |

Placeholders on the drafts (company number, VAT number, address, bank
details) are filled in only from founder-supplied facts.

## Printed pieces in the game box `PROPOSED`

The box measures **200 × 160 × 80 mm inside** (founder, 17 October 2026).
Every printed piece must lie flat inside it with about 5 mm clearance.

| Piece | Size | Content |
| --- | --- | --- |
| App access card | 95 mm square, rounded corners | Front: master logo, "Your app access is included", QR code, "Scan to play. No download needed.", access code (only if asked). Back: deep olive; Go further with the app (Taste more, Remember more, Play anywhere); 2–8 players · 18+ · Please drink responsibly. |
| How to Play | 190 × 150 mm, rounded corners, both sides | Side 1: objective line, Set up (6 numbered steps), On your turn (Spin, Draw, Play, Win corks; play passes to the left). Side 2: Secret Missions panel, The Final Pour panel (Crown, Award, Count), players and age line. |
| Tasting card ("What you might notice") | A6, 148 × 105 mm, both sides | White and rosé on one side, red and sparkling on the other; five notes per wine including Feel; How to taste row (Look, Swirl, Smell, Sip, Say). |

- **"Included", not "free".** The buyer has already paid for the game, so the
  app access card says access is included.
- **Either side may be seen first.** No piece relies on a front-to-back
  reading order.
- **Rounded corners** need a die-cut; confirm with the printer.
- Splitting the tasting prompts onto their own card changes the box contents
  in `00` (see the proposed update there).

## Small mark `PROPOSED`

`04` keeps the small-format mark as `TODO` and says not to improvise one.
On 17 October 2026 the founder asked for one example of the leaf monogram
from the 16 October logo exploration to be used on the drafts, in deep olive
on cream and cream on deep olive. It appears on the business card back, the
app access card, the How to Play and tasting cards, and as the sign-off mark
on the letterhead and invoice.

This is a preview only. It is not the approved small mark until the founder
confirms it in `04` (what it is, where it is used, the switch-over size and
colour versions).

## Accent colour — open question `PROPOSED`

Blush is the single accent (`04`, `CONFIRMED`). The founder finds it hard to
work with against some of the colours and has asked whether something better
exists (17 October 2026). The drafts include a switch to compare:

- **Blush** `#E3AC9A` — current, confirmed.
- **Light sage** `#B9BC9A` or **mid olive** `#8B8B5C` — already in the core
  palette, so no new colour would be needed.
- **Antique gold** `#B8955A`, **claret** `#7B2D3B` — outside the palette.
  Either would need a designer's check and a founder-confirmed change to `04`.

No change to the accent until the founder decides.

## Presentations `PROPOSED` (records the styling as built in the deck source)

The three draft decks are built from [`decks/source/build.js`](../decks/source/build.js),
which is the reference for deck styling:

- Widescreen 13.33 × 7.5 in; cream background on every slide.
- Theme colours: deep olive (text and dark), white and cream (light), mid
  olive, light sage and blush as accents. Game family colours only on the
  slide that explains the card families.
- Raleway Light for titles (36 pt) and subtitles (18 pt); Raleway SemiBold,
  letter-spaced, for labels.
- Content slides carry the master logo bottom right and a short line bottom
  left at 10 pt, with the slide number.
- Expression markers for each part of the offer follow `04` (`PROPOSED`
  there).
- Blush-bordered boxes are review flags and are removed before sharing.

This section describes the styling already used for the draft decks, so the
documents and print pieces above can match it. Confirming it makes it the
house style for future decks.
