// Stack calculator engine. Pure functions, no DOM, so the math can be tested
// on its own. Defaults reproduce the "DPC plus a bronze plan, with worked
// numbers" post (hypothetical 40-year-old, no subsidy, 2027).

export type Tier = 'self' | 'family';
export type UsagePreset = 'light' | 'typical' | 'bad' | 'custom';

export interface Usage {
  pcp: number;        // primary care visits
  labs: number;       // lab panels
  rx: number;         // monthly generic fills (one daily drug for a year = 12)
  specialist: number; // specialist visits
  imaging: number;    // MRI or CT scans
  hospital: boolean;  // a hospital stay
}

export interface Prices {
  pcp: number;
  lab: number;
  rx: number;
  specialist: number;
  imaging: number;
  hospital: number;
}

export interface Plan {
  premium: number;    // monthly
  deductible: number;
  oopMax: number;
  coins: number;      // share you pay after the deductible, 0 to 1
}

export interface SilverPlan extends Plan {
  pcpCopay: number;
  specCopay: number;
  rxCopay: number;
}

export interface Inputs {
  tier: Tier;
  bracket: number;        // federal marginal rate, 0 to 1
  catchUp: boolean;       // 55 or older: +$1,000 HSA limit
  credit: number;         // monthly premium tax credit
  preset: UsagePreset;
  usage: Usage;
  prices: Prices;
  silver: SilverPlan;
  bronze: Plan;
  dpc: { fee: number; lab: number; rx: number; imagingCash: number; useCash: boolean };
  hsa: { mode: 'match' | 'fixed'; amount: number };
  extra: { on: boolean; monthly: number; hospitalPays: number };
}

// 2027 federal limits, as cited in the published posts.
export const LIMITS = {
  oopMax: { self: 12000, family: 24000 },     // CMS 2027 maximum annual limitation on cost sharing
  hsa: { self: 4500, family: 9000 },          // IRS Rev. Proc. 2026-24
  hsaCatchUp: 1000,
  dpcFeeCap: { self: 150, family: 300 },      // monthly DPC fee cap for HSA eligibility (Notice 2026-5, Rev. Proc. 2026-24)
};

export const PRESETS: Record<Exclude<UsagePreset, 'custom'>, Usage> = {
  light: { pcp: 4, labs: 2, rx: 12, specialist: 0, imaging: 0, hospital: false },
  typical: { pcp: 8, labs: 4, rx: 24, specialist: 1, imaging: 1, hospital: false },
  bad: { pcp: 0, labs: 0, rx: 0, specialist: 0, imaging: 0, hospital: true },
};

export const DEFAULTS: Inputs = {
  tier: 'self',
  bracket: 0.22,
  catchUp: false,
  credit: 0,
  preset: 'typical',
  usage: { ...PRESETS.typical },
  prices: { pcp: 150, lab: 120, rx: 20, specialist: 250, imaging: 1200, hospital: 60000 },
  silver: { premium: 720, deductible: 5500, oopMax: 9000, coins: 0.2, pcpCopay: 40, specCopay: 80, rxCopay: 15 },
  bronze: { premium: 525, deductible: 7500, oopMax: 12000, coins: 0.4 },
  dpc: { fee: 100, lab: 15, rx: 5, imagingCash: 450, useCash: true },
  hsa: { mode: 'match', amount: 4500 },
  extra: { on: false, monthly: 25, hospitalPays: 0 },
};

export interface StackResult {
  key: 'silver' | 'gold' | 'bronze' | 'stack';
  premiums: number;
  dpcFees: number;
  inPlan: number;      // what you pay inside the insurance plan, capped at its out-of-pocket max
  outside: number;     // care paid outside the plan (DPC-priced labs and drugs, cash imaging)
  extraCost: number;   // value-added benefit premiums
  extraPays: number;   // value-added benefit cash payout
  hsaOk: boolean;
  hsaSavings: number;
  total: number;
  hitCap: boolean;
}

// What you pay inside a plan: copays, then the deductible, then coinsurance, all capped at the out-of-pocket max.
export function planShare(plan: Plan, copays: number, dedCharges: number) {
  const ded = Math.min(dedCharges, plan.deductible);
  const coins = Math.max(0, dedCharges - plan.deductible) * plan.coins;
  const raw = copays + ded + coins;
  return { pay: Math.min(raw, plan.oopMax), hitCap: raw >= plan.oopMax };
}

function hsaLimit(i: Inputs) {
  return LIMITS.hsa[i.tier] + (i.catchUp ? LIMITS.hsaCatchUp : 0);
}

function hsaSavings(i: Inputs, eligibleSpend: number) {
  const limit = hsaLimit(i);
  const contribution = i.hsa.mode === 'match' ? Math.min(eligibleSpend, limit) : Math.min(Math.max(0, i.hsa.amount), limit);
  return contribution * i.bracket;
}

const netPremium = (monthly: number, credit: number) => Math.max(0, monthly - credit) * 12;

// A plan with copays for visits and generics (silver, gold): labs, scans and hospital care go toward the deductible.
// Copays before the deductible make it not HSA-compatible.
function copayPlan(key: 'silver' | 'gold', plan: SilverPlan, i: Inputs, u: Usage): StackResult {
  const p = i.prices;
  const copays = u.pcp * plan.pcpCopay + u.specialist * plan.specCopay + u.rx * plan.rxCopay;
  const ded = u.labs * p.lab + u.imaging * p.imaging + (u.hospital ? p.hospital : 0);
  const share = planShare(plan, copays, ded);
  return {
    key, premiums: netPremium(plan.premium, i.credit), dpcFees: 0, inPlan: share.pay, outside: 0,
    extraCost: 0, extraPays: 0, hsaOk: false, hsaSavings: 0, total: 0, hitCap: share.hitCap,
  };
}

export function calculate(i: Inputs, usage: Usage = i.usage): StackResult[] {
  const p = i.prices;
  const u = usage;
  const hospital = u.hospital ? p.hospital : 0;

  // Silver: copays for visits and generics, everything else toward the deductible. Not HSA-compatible.
  const silver = copayPlan('silver', i.silver, i, u);

  // Bronze alone: everything at full price toward the deductible. HSA-compatible.
  const b = i.bronze;
  const bDed = u.pcp * p.pcp + u.labs * p.lab + u.rx * p.rx + u.specialist * p.specialist + u.imaging * p.imaging + hospital;
  const bShare = planShare(b, 0, bDed);
  const bronze: StackResult = {
    key: 'bronze', premiums: netPremium(b.premium, i.credit), dpcFees: 0, inPlan: bShare.pay, outside: 0,
    extraCost: 0, extraPays: 0, hsaOk: true, hsaSavings: hsaSavings(i, bShare.pay), total: 0, hitCap: bShare.hitCap,
  };

  // Bronze + DPC: primary care included, labs and generics at DPC prices, imaging cash or through the plan.
  const d = i.dpc;
  const outside = u.labs * d.lab + u.rx * d.rx + (d.useCash ? u.imaging * d.imagingCash : 0);
  const stDed = u.specialist * p.specialist + (d.useCash ? 0 : u.imaging * p.imaging) + hospital;
  const stShare = planShare(b, 0, stDed);
  const dpcFees = d.fee * 12;
  const stHsaOk = d.fee <= LIMITS.dpcFeeCap[i.tier];
  const extraCost = i.extra.on ? i.extra.monthly * 12 : 0;
  const extraPays = i.extra.on && u.hospital ? i.extra.hospitalPays : 0;
  const stack: StackResult = {
    key: 'stack', premiums: netPremium(b.premium, i.credit), dpcFees, inPlan: stShare.pay, outside,
    extraCost, extraPays, hsaOk: stHsaOk, hsaSavings: stHsaOk ? hsaSavings(i, dpcFees + stShare.pay + outside) : 0,
    total: 0, hitCap: stShare.hitCap,
  };

  for (const r of [silver, bronze, stack]) total(r);
  return [silver, bronze, stack];
}

const total = (r: StackResult) => {
  r.total = r.premiums + r.dpcFees + r.inPlan + r.outside + r.extraCost - r.extraPays - r.hsaSavings;
  return r;
};

// Gold, for the bronze + DPC vs silver vs gold comparison page (/compare/).
// Premium: 2026 KFF average lowest-cost gold for a 40-year-old ($615) plus the same ~15% used for silver and bronze.
// Deductible: near the 2026 HealthCare.gov average of $1,722 (KFF). Cap and copays are assumptions, shown on the page.
export const GOLD: SilverPlan = { premium: 707, deductible: 1800, oopMax: 7000, coins: 0.2, pcpCopay: 25, specCopay: 50, rxCopay: 10 };

// Bronze + DPC + HSA against silver and gold, for one kind of year.
export function compareTiers(i: Inputs, usage: Usage = i.usage, gold: SilverPlan = GOLD) {
  const [silver, , stack] = calculate(i, usage);
  return { stack, silver, gold: total(copayPlan('gold', gold, i, usage)) };
}

// The bad year: the same routine care plus a hospital stay big enough to hit every plan's cap.
export function worstCase(i: Inputs): StackResult[] {
  const big = { ...i, prices: { ...i.prices, hospital: Math.max(i.prices.hospital, 1e7) } };
  return calculate(big, { ...i.usage, hospital: true });
}
