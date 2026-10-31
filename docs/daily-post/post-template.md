# Post template (new format)

Copy this into `src/content/guides/<slug>.md`. A post with a `snapshot` gets the new page top (title as the headline, dek, byline with audience, stat strip, snapshot, optional "Why this matters today" box). Everything in [brackets] is a placeholder. The build fails if a post has neither a `snapshot` nor a `respondingTo`.

```yaml
---
title: "[Long headline: the shift first, the problem with a number, DPC named, the yearly payoff]"
dek: "[Two or three sentences: the trap, the pairing, this case's result, what the reader gets]"
category: "[Building your stack | The money | DPC explained | Value-added benefits | Alternatives | Employers and advisors | Evidence watch]"
categorySlug: "[matching slug]"
readMinutes: 11
author: Sophia Cranbrook
audience: "For people who buy their own coverage, families, the self-employed, and the agents who help them"
lastReviewed: YYYY-MM-DD
heroColor: butter
featured: false
namesProducts: false
stats:
  - value: "[$2,100]"
    label: "[less a year for this household, all in (our arithmetic)]"
  - value: "[23%]"
    label: "[lower yearly cost than the plan alone]"
  - value: "[40.5%]"
    label: "[fewer ER visits in the SOA/Milliman employer study]"
statsNote: "[Where the numbers come from, and what they are not: e.g. 'Arithmetic on published prices, not a forecast. Study figures are from one employer.']"
snapshot:
  - label: Why it matters
    text: "[One or two sentences]"
  - label: Where the money is
    text: "[One or two sentences, yearly dollars and percent]"
  - label: Why insurance alone hasn't fixed it
    text: "[One or two sentences]"
  - label: What to do
    text: "[One or two sentences; educational, no plan pick]"
  - label: What we haven't checked
    text: "[One or two sentences]"
summary:
  - "[Three plain lines for the email fallback and the blog list]"
# Optional: only when a fresh, fitting story with a verified quote exists.
# respondingTo:
#   lede: "[One or two sentences naming the outlet and its news]"
#   outlet: "[Outlet]"
#   headline: "[Exact headline]"
#   url: https://...
#   date: YYYY-MM-DD
#   quote: "[Verbatim sentence from the article body]"
#   impact: "[What it means for the reader]"
evidence:
  level: 3
  label: "[Moderate]"
  note: "[One line on the evidence]"
sources:
  - title: "[Publisher, title (date)]"
    url: https://...
    grade: Independent research
next: "[slug of a related live post]"
---
```

Body: the 17 sections in [post-outline.md](post-outline.md), sections 7 to 17 as `##` headings in plain words, then `## In the news`.
