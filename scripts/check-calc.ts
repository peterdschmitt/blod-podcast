// Checks the calculator against the totals published in "DPC plus a bronze plan, with worked numbers".
import { calculate, DEFAULTS, PRESETS } from '../src/lib/calc.ts';

const expected = {
  light: [9220, 7142, 7306],
  typical: [11080, 9116, 7922],
  bad: [17640, 17310, 18510],
};
let failed = 0;
for (const [preset, want] of Object.entries(expected)) {
  const got = calculate({ ...DEFAULTS, usage: PRESETS[preset as keyof typeof PRESETS] }).map((r) => Math.round(r.total));
  const ok = got.every((g, k) => Math.abs(g - want[k]) <= 1);
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${preset}: got ${got.join(', ')} want ${want.join(', ')}`);
}
process.exit(failed ? 1 : 0);
