// Hypothetical households used to show why a DPC "stack" can make sense, and when it doesn't.
// Facts cite the sources in FACTS below; no outcome dollar figures are invented.

export const FACTS = {
  practices: { value: '3,600+', label: 'DPC practices in the U.S.', note: 'Growing 19%+ a year since 2022', source: 'DPC Alliance, State of DPC 2026', url: 'https://blog.hint.com/state-of-dpc-2026-key-takeaways-from-the-dpc-alliances-physician-survey' },
  avgFee: { value: '$98.64', label: 'Average DPC fee per month', note: 'West $113, Midwest $80', source: 'DPC Alliance, State of DPC 2026', url: 'https://blog.hint.com/state-of-dpc-2026-key-takeaways-from-the-dpc-alliances-physician-survey' },
  payments: { value: '+58%', label: 'Average marketplace payment, 2025 to 2026', note: '$113 to $178 a month', source: 'KFF', url: 'https://www.kff.org/quick-insights/aca-marketplace-enrollment-is-down-by-3-million-after-big-jump-in-premium-payments/' },
  ichra: { value: '500k+', label: 'People covered through ICHRAs', note: '20,000+ businesses by January 2026', source: 'HRA Council via Take Command (vendor-reported)', url: 'https://www.takecommandhealth.com/blog/2026-hra-data-whats-driving-ichra-growth' },
};

export type Example = {
  slug: string;
  who: string;
  tag: string;
  color: 'butter' | 'sage' | 'lilac' | 'white' | 'navy';
  situation: string;
  stack: string[];
  why: string[];
  watch: string[];
  fits: boolean;
};

export const EXAMPLES: Example[] = [
  {
    slug: 'freelancer',
    who: 'The freelancer who lost her subsidy',
    tag: 'Self-employed, 38',
    color: 'butter',
    situation: 'Her enhanced subsidy ended with 2025 and her marketplace payment jumped. She sees a doctor a few times a year and wants to keep a real safety net.',
    stack: ['Direct primary care', 'Bronze plan', 'HSA'],
    why: [
      'A flat monthly fee covers her primary care visits, so routine care no longer waits on a deductible.',
      'The bronze plan is there for the big, rare bills: hospital stays, surgery, specialists.',
      'Since 2026 every individual-market bronze plan counts as HSA-compatible, and her HSA can pay a qualifying DPC fee (up to $150 a month) with pre-tax money.',
    ],
    watch: [
      'Specialists, imaging and hospital care still hit the bronze deductible, so the HSA needs funding.',
      'Check that the practice meets the IRS definition; some hybrid practices do not.',
      'The membership only pays for that practice’s clinicians, so unless her current doctor is part of it, she switches primary care doctors.',
    ],
    fits: true,
  },
  {
    slug: 'young-family',
    who: 'The family with two young kids',
    tag: 'Family of four',
    color: 'sage',
    situation: 'Ear infections, rashes and late-night fevers mean lots of short visits. Urgent care co-pays and waits add up.',
    stack: ['Family DPC membership', 'HSA-compatible plan', 'HSA'],
    why: [
      'Many DPC practices let members text or call the doctor directly, which can replace some urgent care trips.',
      'A family membership up to $300 a month still keeps them eligible to contribute to an HSA.',
      'Many practices offer labs and generic drugs at close to cost.',
    ],
    watch: [
      'Most practices price by age, so get the family quote in writing.',
      'DPC never covers the ER, hospital stays or surgery. The insurance layer still matters.',
    ],
    fits: true,
  },
  {
    slug: 'under-30',
    who: 'The healthy 27-year-old',
    tag: 'Under 30',
    color: 'lilac',
    situation: 'Rarely sick, wants the lowest monthly cost without going uninsured.',
    stack: ['Direct primary care', 'Catastrophic plan', 'HSA'],
    why: [
      'Catastrophic plans are open to people under 30 and protect against worst-case bills.',
      'Since 2026, individual-market catastrophic plans also count as HSA-compatible.',
      'DPC fills the gap for everyday care that a catastrophic plan barely touches.',
    ],
    watch: [
      'The catastrophic deductible is high. A bad year is still expensive.',
      'Compare against a bronze plan with any subsidy you still qualify for. Free help at HealthCare.gov.',
    ],
    fits: true,
  },
  {
    slug: 'small-employer',
    who: 'The 12-person company',
    tag: 'Small employer',
    color: 'white',
    situation: 'Group premiums keep rising and the owner wants a benefit people actually use.',
    stack: ['Employer-paid DPC', 'ICHRA or group high-deductible plan'],
    why: [
      'An employer-paid DPC fee is excluded from employees’ taxable income.',
      'ICHRAs let employers reimburse individual coverage tax-free, and they are growing fast.',
      'The best independent study found 40.5% fewer ER visits among DPC members.',
    ],
    watch: [
      'That same study found total employer costs rose 1.3% once DPC fees were counted. Savings are not guaranteed.',
      'Employees can’t also reimburse an employer-paid DPC fee from their HSA.',
    ],
    fits: true,
  },
  {
    slug: 'turning-65',
    who: 'The retiree turning 65',
    tag: 'When it usually doesn’t fit',
    color: 'navy',
    situation: 'About to move onto Medicare and wondering whether to keep a DPC doctor.',
    stack: ['Medicare first'],
    why: [
      'Medicare already covers primary care visits.',
    ],
    watch: [
      '81% of surveyed DPC physicians have opted out of Medicare entirely, which limits what they can do for Medicare patients.',
      'Talk to a free State Health Insurance Assistance Program (SHIP) counselor before paying for both.',
    ],
    fits: false,
  },
];

export const EXAMPLE_SOURCES = [
  { title: 'DPC Alliance, State of Direct Primary Care 2026 (summary by Hint)', url: 'https://blog.hint.com/state-of-dpc-2026-key-takeaways-from-the-dpc-alliances-physician-survey', grade: 'Independent research' },
  { title: 'IRS, guidance on new HSA tax benefits (Notice 2026-5)', url: 'https://www.irs.gov/newsroom/treasury-irs-provide-guidance-on-new-tax-benefits-for-health-savings-account-participants-under-the-one-big-beautiful-bill', grade: 'Primary source' },
  { title: 'KFF, Policy Changes Bring Renewed Focus on High-Deductible Health Plans', url: 'https://www.kff.org/patient-consumer-protections/policy-changes-bring-renewed-focus-on-high-deductible-health-plans/', grade: 'Independent research' },
  { title: 'Society of Actuaries / Milliman, Direct Primary Care: Evaluating a New Model (2020)', url: 'https://www.soa.org/globalassets/assets/files/resources/research-report/2020/direct-primary-care-eval-model.pdf', grade: 'Independent actuarial' },
  { title: 'HRA Council data via Take Command, 2026', url: 'https://www.takecommandhealth.com/blog/2026-hra-data-whats-driving-ichra-growth', grade: 'Vendor-reported' },
  { title: 'KFF, ACA marketplace enrollment and premium payments, 2026', url: 'https://www.kff.org/quick-insights/aca-marketplace-enrollment-is-down-by-3-million-after-big-jump-in-premium-payments/', grade: 'Independent research' },
];
