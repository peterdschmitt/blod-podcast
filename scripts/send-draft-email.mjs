// Sends the daily DPC draft email to Peter (same as Decision Layer) through Resend.
// Needs RESEND_API_KEY and RESEND_FROM (a sender on a domain verified in Resend) in the environment.
// The key is read from the environment only; it is never printed.
// Usage: node scripts/send-draft-email.mjs "<subject>" <path-to-plain-text-body> [path-to-html-body]
import { readFileSync } from 'node:fs';

const [subject, bodyPath, htmlPath] = process.argv.slice(2);
const key = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM;
const to = process.env.DRAFT_EMAIL_TO || 'peter@converselyai.com';

if (!subject || !bodyPath) {
  console.error('Usage: node scripts/send-draft-email.mjs "<subject>" <body.txt>');
  process.exit(2);
}
if (!key || !from) {
  console.error('Missing RESEND_API_KEY or RESEND_FROM in the environment.');
  process.exit(2);
}

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    from, to: [to], subject,
    text: readFileSync(bodyPath, 'utf8'),
    ...(htmlPath ? { html: readFileSync(htmlPath, 'utf8') } : {}),
  }),
});
const out = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error(`Resend refused the email (HTTP ${res.status}): ${out.message ?? 'no message'}`);
  process.exit(1);
}
console.log(`Sent to ${to}, Resend id ${out.id}`);
