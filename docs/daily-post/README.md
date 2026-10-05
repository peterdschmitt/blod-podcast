# Daily post playbook

A routine runs every morning and writes one new post for the blog. This file is the instructions it follows. Edit it to change how posts are made; the routine reads it fresh each day.

## Schedule and sign-off

- One post a day, every day. The run starts at 5:52am US Eastern so the draft is ready by 7am.
- Each post lands as its own pull request on a branch named `claude/daily-YYYY-MM-DD`, with a Vercel preview link. Nothing goes to `main` until Peter replies "publish" in the project thread "Daily blog process" (or on the PR). Peter is the sign-off editor until he names someone else.
- Posts Peter hasn't published yet stay open. Never stack a new day's post onto an older day's branch.

## Headline lead (every post)

Every daily post opens with a lead built from current news (Peter, 2026-10-05). The first two or three paragraphs weave in at least two real headlines from different major, well-respected national outlets (AP, Reuters, NYT, WSJ, Washington Post, NPR, KFF Health News, Bloomberg, CNBC, NBC, CBS, ABC), each named with its outlet and linked to the article, then turn to what those stories mean for someone choosing DPC, value-added benefits and an insurance plan.

- Use stories from roughly the last 7 days. If the news is thin, stretch to 14 days and say "this month" or "recently", never "today".
- Quote each headline exactly, or describe the story without quotation marks. Every headline and every fact taken from a story is checked against the publisher's page (for paywalled pieces, against search results showing the headline).
- The headlines set up the topic; they don't replace the explainer. Get from the news to the reader's decision within the first three paragraphs.
- This is in addition to the "In the news" section at the end. Don't repeat the same articles there; use it for further reading.
- If two qualifying, verified headlines can't be found, don't publish a weaker post. Say so in the thread and ask whether to run without a lead that day.

## Picking the day's topic

1. Check the news first (last 72 hours) for a timely hook that fits the site: ACA premiums and enrollment, subsidies, HSA and IRS guidance, CMS rules, court rulings, DPC, health sharing ministries, fixed indemnity, short-term plans, ICHRA, employer benefits. A strong, verifiable hook beats the queue.
2. Otherwise take the top `queued` topic in [topics.md](topics.md).
3. Don't repeat a published or open-PR post. Check `src/content/guides/` and open PRs first.
4. Mark the topic `drafted YYYY-MM-DD (PR #N)` in topics.md in the same PR. Add new ideas you find to the bottom of the queue.

## Writing the post (every step, every day)

1. **Research** from primary sources first: IRS, Treasury, CMS, HealthCare.gov, state insurance departments, court filings, KFF, Peterson-KFF, peer-reviewed studies. Vendor sources only when labeled `Vendor-funded` or `Vendor-reported`.
2. **Draft** a Markdown file in `src/content/guides/<slug>.md` using the schema in `src/content.config.ts` and the six existing posts as models. Daily posts run 700 to 1,200 words (`readMinutes` 4 to 7). Include `summary` bullets, an `evidence` block, and a graded `sources` list. Use `featured: false`.
3. **Citation check.** Open every link. Confirm it resolves and says what the post claims. Fix or cut anything unconfirmed. Footnotes link to `#src-N`.
4. **Headline lead** as described above, then a **"## In the news"** section near the end with 2 to 4 further real headlines from major national outlets (AP, Reuters, NYT, WSJ, Washington Post, NPR, KFF Health News, Bloomberg, CNBC, NBC, CBS, ABC). Use the exact headline, outlet and date, each verified against the publisher's page (for paywalled pieces, verify from search results). Never invent or paraphrase a headline. One line on why each matters to the reader.
5. **Voice pass.** Read it as a person would. No em-dashes, no stock AI phrasing ("delve", "navigate the landscape", "in today's world", "it's important to note"), short sentences, concrete examples, plain words.
6. **Compliance pass.** Educational only. Conversely and Peter hold no insurance producer license: no plan recommendations, no "you should buy", no quotes, no enrollment help. Set `namesProducts: true` when a specific product, carrier, DPC network or vendor is named. Never claim a review that didn't happen.
7. **Link** to at least one earlier post and to the [calculator](/calculator/) when money is involved.
8. **Build.** `npm ci && npm run build` must pass. Quote YAML values containing ": ". Wrap Markdown tables in `<div style="overflow-x: auto">` with blank lines around the table.

## Fixed facts

- Byline: `author: Sophia Cranbrook`. No `reviewer` or `mathReviewer` field, no physician or "math checked by" line.
- Corrections email: info@converselyai.com.
- Reuse the editor-verified 2027 figures already in the posts rather than re-deriving them: HSA limits $4,500 self / $9,000 family (+$1,000 catch-up at 55+); out-of-pocket max $12,000 / $24,000; open enrollment Nov 1, 2026 to Jan 15, 2027 on HealthCare.gov (Dec 15 for Jan 1 coverage); a federal court in Maryland paused the 2027 rule expanding catastrophic-plan eligibility, so people 30+ still need a hardship or affordability exemption; the DPC HSA cap is $150 / $300 a month in 2027 (Rev. Proc. 2026-24); a DPC practice can bill insurance for care outside the membership and still qualify (Notice 2026-5). If news changes one of these, say so in the PR and flag which live posts need an update.

## The PR

- Title: `Daily post: <post title>`.
- Body: what the post covers in two sentences, the headlines used in the lead, the list of sources checked, and anything the editor should look at closely.
- Then reply in the project thread with the preview link and ask for "publish".
