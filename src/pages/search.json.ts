// Static search index for the header search (all content, built at deploy time).
import { getCollection } from 'astro:content';
import { CALLS, TOPICS } from '../data/calls';
import { EXAMPLES } from '../data/examples';

const plain = (s = '') => s
  .replace(/<[^>]+>/g, ' ')
  .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/\[\^?\d+\]/g, '')
  .replace(/[#*_`>|]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const PAGES = [
  { t: 'All blog posts', u: '/blog/all/', d: 'Every blog post on one page, newest first, with a short summary of each.' },
  { t: 'Blog', u: '/blog/', d: 'Every guide on direct primary care, HSAs, overlay plans and value-added benefits.' },
  { t: 'Podcast', u: '/podcast/', d: 'Plain talk about the new way to cover yourself. Episodes and show notes.' },
  { t: 'Real examples', u: '/real-examples/', d: 'Example households that show why DPC plus overlay coverage can make sense, and when it does not.' },
  { t: 'Q&A: questions from the phone lines', u: '/questions/', d: 'Illustrative call transcripts answering common questions about DPC, HSAs, subsidies and overlay plans.' },
  { t: 'Stack calculator', u: '/calculator/', d: 'Compare the expected and worst-case yearly cost of different coverage stacks, with every formula published.' },
  { t: 'Bronze + DPC vs silver vs gold', u: '/compare/', d: 'Side-by-side yearly cost of a bronze plan with direct primary care and an HSA, a silver plan and a gold plan, in a light, typical and bad year.' },
  { t: 'Methodology and disclosures', u: '/methodology/', d: 'How we grade evidence, who writes the guides, editorial independence, disclosures and corrections.' },
  { t: 'About', u: '/about/', d: 'Why the site exists, who is behind it, and how it is paid for. Not an insurance agency.' },
  { t: 'For agencies', u: '/for-agencies/', d: 'What Conversely offers insurance agencies and brokers. Clearly labeled commercial page.' },
];

export async function GET() {
  const guides = await getCollection('guides', (g) => !g.data.draft);
  const episodes = await getCollection('episodes');
  const topic = (k: string) => TOPICS.find((t) => t.key === k)?.label ?? 'Q&A';
  const items = [
    ...guides.map((g) => ({ s: 'Blog', t: g.data.title, u: `/blog/${g.id}/`, d: g.data.dek, x: plain([g.data.summary.join(' '), g.body].join(' ')) })),
    ...CALLS.map((c) => ({ s: `Q&A · ${topic(c.topic)}`, t: c.question, u: `/questions/#${c.id}`, d: c.takeaway, x: plain(c.turns.map((t) => t.t).join(' ')) })),
    ...EXAMPLES.map((e) => ({ s: 'Real example', t: e.who, u: `/real-examples/#${e.slug}`, d: e.situation, x: plain([e.tag, e.stack.join(' '), e.why.join(' '), e.watch.join(' ')].join(' ')) })),
    ...episodes.map((e) => ({ s: `Podcast · Episode ${e.data.number}`, t: e.data.title, u: '/podcast/', d: e.data.summary, x: '' })),
    ...PAGES.map((p) => ({ s: 'Page', t: p.t, u: p.u, d: p.d, x: '' })),
  ];
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
