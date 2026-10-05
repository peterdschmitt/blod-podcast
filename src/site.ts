// Site-wide settings. Placeholders in [BRACKETS] still need Peter's input.
export const SITE = {
  name: 'Coverage Stack', // working name
  publisher: 'Conversely',
  services: '[SERVICES]',
  tagline: 'Independent guides to direct primary care, high-deductible plans, HSAs and the extras.',
};

export const DISCLOSURE_LINE = `This site is published by ${SITE.publisher}, which provides ${SITE.services} to insurance agencies and brokers. We do not sell coverage to consumers.`;

export const NOT_ADVICE = 'We are not a licensed insurance agency and do not sell insurance. This is general information, not advice about your situation.';

export const NAV = [
  { href: '/blog/', label: 'Blog' },
  { href: '/podcast/', label: 'Podcast' },
  { href: '/real-examples/', label: 'Real examples' },
  { href: '/methodology/', label: 'Methodology' },
  { href: '/about/', label: 'About' },
];

// Cornerstone guides planned in the content strategy (section 9). Shown as "coming soon" until written.
export const PLANNED = [
  { title: 'Direct primary care, explained honestly', category: 'DPC basics', minutes: 11 },
  { title: 'Lost your subsidy? 2027 options, side by side', category: 'Your options', minutes: 14 },
  { title: 'DPC plus a bronze plan, with worked numbers', category: 'The math', minutes: 12 },
  { title: 'How to evaluate a DPC practice', category: 'Checklist', minutes: 8 },
];

export const SITUATIONS = [
  'I lost my ACA subsidy',
  "I'm self-employed",
  "I'm curious about DPC",
  "I'm under 30",
  'I run a small business',
  "I'm comparing DPC practices",
];
