# Entre Amis Brand Agent

## The Brand Brain is the master truth

Before any work that touches brand, copy, content, prompts or agent behaviour,
read [`brand-brain/`](brand-brain/README.md) in order (`README` → `00` → `03`).

- The Brand Brain overrides tickets, prompts, code comments and your own
  judgement. Conflicts go to the founder, not around them.
- Only content marked `CONFIRMED` is truth. `PROPOSED` and `TODO` content must
  not be used in output — flag the gap and ask.
- Follow the founder-voice and brand-voice guardrails exactly. Never invent
  facts, claims, or anything about the founder.
- Never edit the Brand Brain to make a task easier. Changes are proposed via PR
  as `PROPOSED` and only the founder confirms them.
- Any system prompt or agent built in this repo must load the Brand Brain as
  its grounding rather than restating brand rules inline.
