# Entre Amis — Brand Brain

The Brand Brain is the **single source of truth** for who Entre Amis is, how it
sounds, and what it will and won't do. Every piece of work in this repository —
code, prompts, agent behaviour, copy, product decisions — is built on top of it.

If something here conflicts with anything else (a ticket, a prompt, a code
comment, a past message, an agent's own judgement), **the Brand Brain wins**.

---

## What the Brand Brain is

- **The master truth.** The canonical definition of the brand's identity,
  positioning, values, founder voice and brand voice.
- **A decision filter.** When a choice is unclear, the answer should be
  traceable back to something written here.
- **Machine-readable context.** The brand agent loads these files as its
  grounding. They are written to be followed literally.
- **Owned by the founder.** Content changes only with founder approval (see
  [Governance](#governance)).
- **Living, but deliberate.** It evolves — through reviewed, logged changes,
  never through drift.

## What the Brand Brain is not

- **Not a content library.** Finished posts, campaigns and assets live
  elsewhere. This holds the rules that produce them.
- **Not consumer copy.** Descriptions here (the idea, positioning, offer,
  behaviours) explain the brand to the people and agents building it. They
  are not written to go directly to consumers — see
  [guardrails](03-guardrails.md#brand-brain-descriptions-are-not-consumer-copy-confirmed).
- **Not a mood board or wish list.** Aspirations that aren't yet true are
  not written as if they are.
- **Not a place for invention.** Nobody — human or agent — adds facts,
  stories, claims, numbers or quotes that the founder hasn't confirmed.
- **Not a style guide for code.** Engineering conventions live in the code
  itself; this governs brand-facing behaviour and output.
- **Not optional or advisory.** "Guidance" here means rules.

---

## Files

| File | Purpose |
| --- | --- |
| [`00-brand-core.md`](00-brand-core.md) | What Entre Amis is and isn't: purpose, audience, positioning, values |
| [`01-founder-voice.md`](01-founder-voice.md) | How the founder sounds, and the guardrails for speaking as them |
| [`02-brand-voice.md`](02-brand-voice.md) | How Entre Amis sounds as a brand, and its guardrails |
| [`03-guardrails.md`](03-guardrails.md) | Hard rules for all output: claims, responsible drinking, Partner Mode data, pre-publish check |
| [`04-visual-identity.md`](04-visual-identity.md) | Master logo and the Sous-bois palette (core and game-only colours) |
| [`samples/`](samples/) | Real reference writing used as voice benchmarks (not content to reuse) |
| [`CHANGELOG.md`](CHANGELOG.md) | Every approved change, dated |

Read them in order. Later files assume the earlier ones.

## Status markers

Every section carries a status. Only `CONFIRMED` content is truth.

| Marker | Meaning | May it be used in output? |
| --- | --- | --- |
| `CONFIRMED` | Approved by the founder | Yes |
| `PROPOSED` | Draft awaiting founder review | No — internal use only |
| `TODO` | Not yet defined | No — flag the gap, don't fill it |

When an agent needs something marked `PROPOSED` or `TODO`, it must stop and
ask rather than guess.

## Order of precedence

1. `03-guardrails.md` — hard rules always apply first
2. `00-brand-core.md` — identity and positioning
3. `01-founder-voice.md` / `02-brand-voice.md` — voice for the relevant speaker
4. `04-visual-identity.md` — logo and colour
5. Everything outside `brand-brain/`

## Governance

- **Owner:** the founder. Only the founder can move content to `CONFIRMED`.
- **Proposing a change:** open a PR that edits the relevant file, marks new
  content `PROPOSED`, and explains the reason in the description.
- **Approving a change:** the founder reviews, flips the status to
  `CONFIRMED`, and an entry is added to `CHANGELOG.md`.
- **Agents never self-edit.** An agent may draft a proposed change for review;
  it may never merge one or treat its own draft as truth.
