# Post outline and writing process (DPC)

The DPC copy of Decision Layer's `docs/post-outline.md`, rewritten for this site. The rules behind it are in [post-brief.md](post-brief.md). Use [post-template.md](post-template.md) for the frontmatter.

## Part 1: the outline (17 sections, in order; one real case per post)

| # | Section | Job | Must contain | Fails if |
| --- | --- | --- | --- | --- |
| 1 | Headline (`title`) | Stop a reader | The shift first, proof with a number, DPC named, the yearly payoff; long is fine, filler is not | Describes instead of provokes; per-visit or monthly price as the hook |
| 2 | Dek (`dek`) | The whole argument in a paragraph | The trap (a deductible before care, a bill you can't predict), the pairing, this case's result, what the reader gets | Repeats the headline |
| 3 | Byline (`author`, `audience`) | Who it's for | Sophia Cranbrook; "For people who buy their own coverage, families, the self-employed, and the agents who help them" (adjust per post) | Any reviewer line |
| 4 | Stat strip (`stats`, `statsNote`) | Proof at a glance | 2 to 4 numbers: yearly dollars and percent, with a source note | Numbers not sourced in the body |
| 5 | Snapshot (`snapshot`) | A busy reader can stop here | Why it matters / Where the money is / Why insurance alone hasn't fixed it / What to do / What we haven't checked | Vague lines; repeats the dek |
| 6 | Why this matters today (`respondingTo`, optional) | News hook, only when one fits | Fresh story, verified quote, what it means for the reader | Unverified quote; a stretched story |
| 7 | The old way is the problem | Name the trap | What leaning on the plan alone costs in this case: the deductible, the unknown bill, skipped care | Reads as "insurance is bad" instead of "insurance alone is the wrong tool for everyday care" |
| 8 | The new way: pair them | Show the change | Side-by-side table for this case: plan alone vs DPC + benefits + plan, with a risk row | Generic table; implies DPC is insurance |
| 9 | The case, in full | Prove it | Who and where; before; what changed; the numbers; who published them | Unsourced numbers; a hypothetical presented as real |
| 10 | Why it matters | Money, care, risk | The year's cost each way (arithmetic labeled), access and time with a doctor, the risk that's left (hospital, specialists) | Savings overstated; risk left out |
| 11 | What DPC is | Teach once | What it is, how it's paid, what it isn't (not insurance), switching doctors, HSA rules; link the explainer instead of re-explaining in depth | Contradicts a fixed fact |
| 12 | We show you how | Let the reader act | Before/after table for this case + six steps: add up last year, list the care DPC would cover, pick the plan to pair, vet the practice, run the calculator, review in a year | Generic steps that fit any post unchanged |
| 13 | Other households | Widen the lens | 4 to 6 other situations (family, self-employed, 60-plus, chronic condition, rural, small employer), with real cases linked where they exist | Invented examples presented as real |
| 14 | Which kind of DPC | Cover the category | Independent practice, network program, hybrid, concierge, value-added benefits; what we haven't checked | Reads as an ad for one practice or vendor |
| 15 | Questions you'll ask | Handle objections | Is it proven? Does it replace insurance? What if I need the ER? Can I keep my doctor? How fast can I switch? | Dodges |
| 16 | The fine print | Uncertainty, once | Who published each number; self-reported; small samples; arithmetic vs forecast | Caveats sprinkled through the post |
| 17 | Run your own numbers | Let the reader check | Links to the [calculator](/calculator/) and Compare plans (only once that section is live); `## In the news` follows with 2 to 4 verified headlines | Long |

## Part 2: the process (ten stages, each with a gate and a written record)

1. **Pick the case** from [post-queue.md](post-queue.md). Gate: a real, sourced case with numbers exists.
2. **Full research**, parallel searches across: IRS, Treasury, CMS, HealthCare.gov, state insurance departments and state DPC laws, KFF and Peterson-KFF, Society of Actuaries and other independent studies, employer and public-program DPC reports, DPC Alliance and DPC Frontier, practice price lists, court filings, news (household names and trade press), Reddit, YouTube and patient stories. Open every source. Record a fact sheet (number, link, exact wording, label). Gate: every number the post will use is on it; never "nothing exists" after one search. Add every new case to [case-catalog.md](case-catalog.md), labeled; keep thin items in with their label.
3. **Write the point** in one sentence: with the plan alone, this case's year costs X with an unknown bill; paired with DPC (and benefits), it costs Y, a Z% difference. Gate: shift first, DPC named, a dollar number.
4. **Headline**: 10+ candidates scored (post-brief.md section 4). Record the top three.
5. **Draft to the outline** from the fact sheet only. Gate: every section passes its "Fails if".
6. **Seven lenses**, one separate pass each (post-brief.md section 5). Record one line per lens.
7. **Fact check** every number and quote against the fact sheet. Gate: nothing unsourced.
8. **Build and check**: `npm ci && npm run build`; screenshot the post at phone and desktop width; no sideways scroll; tables, stat strip and snapshot read on a phone.
9. **Deliver**:
   - Branch `claude/daily-YYYY-MM-DD` from `origin/main`, PR titled `Daily post: <short title>`, assign peterdschmitt, Vercel preview, and a Vercel share link (`get_access_to_vercel_url`) for that exact build.
   - A Claude Doc "Straight Talk draft, <date>: <short title>" with the post text, the preview link, the headline runners-up and a short what-to-check list. Peter edits or comments there.
   - Email the whole post: `node scripts/post-email.mjs src/content/guides/<slug>.md "<preview share URL>" "<doc URL>" > email.html`, screenshot it at phone width, write body.txt (title, runners-up, both links, "Nothing goes live until you reply publish"), then `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node scripts/send-draft-email.mjs "Straight Talk draft for <date>: <short title>" body.txt email.html`. Needs `RESEND_API_KEY` and `RESEND_FROM` in the cloud environment and api.resend.com allowed. Never print the key. If it fails, say so with the error.
   - Reply in the "Daily blog process" thread: title, two runners-up, doc and preview links, one line per lens, how many cases research added to the catalog.
10. **Fold in feedback**: every note from Peter into post-brief.md the same day. Gate: the next draft is checked against the updated brief.

## Final checklist (all ticked before sending)

- [ ] Headline opens on the shift, names DPC, states the yearly payoff
- [ ] Never implies DPC or value-added benefits are insurance
- [ ] A real, sourced case carries the post; every number labeled
- [ ] Yearly dollars and percentages lead; per-visit prices only in the math
- [ ] Says who the pairing doesn't fit
- [ ] Side-by-side table with a risk row
- [ ] "We show you how" written for this case
- [ ] At least four other households
- [ ] Fixed facts hold (switching doctors, HSA rules, 2027 dates)
- [ ] Full research done and recorded; catalog updated
- [ ] All seven lenses ran, logged
- [ ] News quote verified, or no news box because no story fits
- [ ] Educational only; Sophia Cranbrook byline; no reviewer lines
- [ ] Page and email checked at phone width; preview opens the current build
- [ ] Every note from Peter is in the brief and this draft passes it
- [ ] Nothing goes live until Peter says "publish"
