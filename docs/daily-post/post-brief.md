# The post brief (DPC)

Peter, 2026-10-31 17:27Z: "can you reuse everything we are doing for the Decision-Layer blog format and structure (prompt) but for this particular topic?"

This file is the DPC copy of Decision Layer's `docs/post-brief.md` (peterdschmitt/decision-layer, newest `claude/post-*` branch), rewritten for this site. The section outline, the ten-stage process and the final checklist are in [post-outline.md](post-outline.md). Every daily post is checked against every line here before it goes to Peter. If a rewrite fixes one point, re-check all the others: a fix must never drop earlier feedback. When Peter gives new direction, add it here the same day, with his words and the date.

Where this file and the older [README.md](README.md) disagree, this file wins.

When Decision Layer's brief changes in a way that isn't specific to Jev (headline process, lenses, page top, delivery), copy the change here and say so in the thread.

## Pending Peter's call (asked 2026-10-31)

Decision Layer retired its news-led headline today (Peter, 14:46Z, "Change all five"). This brief follows it: **the case picks the topic; news is optional.** If Peter instead keeps the DPC news-led headline, the "Header reference" rules in README.md apply again (household-name outlet, 7-day rotation, two headlines in the lead) and section 4 below changes to an outlet-led headline. Until he answers, write to this brief.

## 0. The point every post makes

Every post argues one shift: **stop leaning on an insurance plan alone for everyday care. Pair a DPC membership and value-added benefits with an insurance plan.** (Proposed 2026-10-31; Peter may reword it. When he does, put his words here.)

- **The trap of insurance alone.** For everyday care you pay toward a deductible before the plan pays much, so the bill for a normal year is unknown until it arrives, or you put off care to avoid it. The plan is built for the big, rare bills. Show that cost in the post's own case.
- **What the pairing changes.** DPC turns everyday primary care into a known monthly fee, often with lower cash prices for labs and generic drugs. Value-added benefits fill specific gaps. The insurance plan stays for hospital, specialist and emergency costs. The yearly bill becomes something you can plan around.
- **Neither DPC nor value-added benefits is insurance.** Every post says so where it matters. Never imply DPC replaces a plan.
- **Unbiased, not selling.** The site's goal is honest information that helps people choose. Every post says plainly who the pairing does not fit (for example, someone whose employer plan already covers primary care with low copays, or someone who wants to keep a doctor who isn't in a DPC practice). Name the trade-off; don't pick for the reader.
- **Educational only.** Conversely and Peter hold no insurance producer license: no plan recommendations, no "you should buy", no quotes, no enrollment help.

## 1. Who reads it

People who buy their own coverage (self-employed, early retirees, families priced out of the marketplace), employers weighing DPC, and the agents and agencies who help them. The topic statement: "Become the expert on providing DPC and Value Added Benefit information to consumers and healthcare agencies." Every post answers, with sourced numbers:

- Why does this matter to me this year?
- What will my year cost, all in, each way?
- What happens when I get sick or hurt?
- What do I give up (doctor choice, network, paperwork)?
- How do I check this for my own situation?

## 2. Altitude

- Yearly, all-in dollars and percentages lead ("about $2,100 less a year, 23%"). Monthly fees and per-visit prices appear only inside the math.
- A single price or visit is evidence, never the story.
- Multiply sourced figures out for one realistic household and label it as arithmetic, not a forecast. Link the [calculator](/calculator/) or Compare plans (only once that section is live) when the post does money math.

## 3. Real cases at real scale

Lead with a real, sourced case from [case-catalog.md](case-catalog.md): a published study, an employer or public program that reported results, a state rule, a real practice's posted prices, or a published patient story. Label each one (independent result, self-reported, vendor-reported, published price list, patient story). A hypothetical household can carry the math, labeled hypothetical, with a name and age, but the case evidence comes first. Spread cases across household types and states.

## 4. The headline (the most important line)

Long is fine; filler is not. The headline carries the full arc: the shift first, the problem with a number, DPC (and value-added benefits, where they matter) named, and the payoff for the year. Every phrase carries the problem, the pairing or the payoff.

Shape, not a template: "Stop paying for everyday care through your deductible. A family of four on a bronze plan can spend about $X a year before the plan pays much. Paired with a DPC membership, the same year costs about Y% less, and most doctor visits cost nothing extra." (Placeholders, not facts.)

The process:

1. Write at least 10 candidates.
2. Score each 1 to 5 on four tests: stops a reader, true and scoped, shows the pairing, has a number.
3. Run the top five through the publisher lens: would it earn a front page?
4. Put the top three in the thread and the email with one line each.
5. Use Peter's pick, or the recommended one if he hasn't answered by sending time.

Keep Peter's emotion note from Oct 8 where it fits the line under the headline: one short, honest human beat, no hype, no scare tactics, no exclamation points.

## 5. The lens passes

Real, separate passes, one lens at a time, fixing what each finds. Tell Peter one line per lens on what it changed. Never claim a pass that didn't happen.

| Lens | What it asks |
| --- | --- |
| Household budgeter | Is every dollar sourced? What's the yearly total each way? What's left out? |
| Patient with a chronic condition | What happens when I get sick, need a specialist or a hospital? |
| Licensed agent | Would I hand this to a client? Is anything wrong about plans or enrollment? |
| Compliance reader | Educational only? Any selling, plan pick or claim of a review that didn't happen? |
| Skeptic | Any claim we can't back? Any vendor number shown as a result? |
| Line and copy editor | Clear? Rhythm? No em-dashes, no stock AI phrases, cut the fluff |
| Publisher | Would the headline, angle and opening earn a top outlet's front page? |

## 6. Format

- **Top of the page, in order:** title (the long headline), dek, byline with the audience line, stat strip (2 to 4 numbers, hook number first, with a source note), snapshot (five lines), then "Why this matters today" only when a fitting story exists.
- **Snapshot labels:** Why it matters / Where the money is / Why insurance alone hasn't fixed it / What to do / What we haven't checked.
- **Length:** 10 to 12 minutes (`readMinutes` 10 to 12).
- **Side-by-side table** in every post: an insurance plan alone vs DPC + value-added benefits + a plan, for this case, with a risk row.
- **The category, not one vendor:** independent practices, network DPC programs, hybrid and concierge practices. `namesProducts: true` and a disclosure when a product, carrier, network or vendor is named.

## 7. News (optional)

Use a news hook only when a fresh, relevant story exists, from any credible outlet (household names, business press, trade press, primary sources such as CMS or IRS releases and court filings). Vary outlets where you can. The quote is verbatim and read on a page we actually opened; never from a search snippet. With no fitting story, leave the box out rather than stretch. Fill `respondingTo` only when the box is used.

## 8. Standing rules (unchanged from the DPC site)

- Byline: Sophia Cranbrook. No `reviewer` or `mathReviewer`; never claim a review that didn't happen.
- Every citation opened and checked; quotes verbatim.
- The fixed facts in [README.md](README.md) ("Fixed facts") still hold, including: a DPC membership covers care only from the practice's or program's own clinicians, so joining usually means switching doctors; don't credit the doctor limit for the lower cost.
- Full research on every post (see post-outline.md stage 2). Never say something doesn't exist after one search. Label thin evidence instead of dropping it; drop only what is fabricated or contradicted.
- Email the whole post through Resend, never Gmail.
- Nothing goes live until Peter says "publish". Peter never touches GitHub.

## 9. Final check before sending

Go through every line of sections 0 to 8 and the checklist in post-outline.md. Fix any miss before sending.
