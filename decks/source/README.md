# Deck source

Scripts that build the three draft decks in `decks/` with pptxgenjs, in the
Sous-bois core palette, Raleway and the master logo.

- `build.js`: shared style, layouts and helpers, and the core brand story
- `common.js`: slides shared by the partner packs (brand, trust)
- `event.js`: Event Mode pack
- `partner.js`: Partner Mode pack
- `logo.png`: master logo, taken from the October deck at low resolution.
  Replace it with the original artwork when available.

Build (needs Node and `pptxgenjs`; `build.js` uses the pptx skill's
`apply_theme.js` to write the theme colours):

    node build.js core.pptx event.pptx partner.pptx

Content must stay traceable to the Brand Brain. Blush-bordered boxes on the
slides are review flags, to be removed before sharing.
