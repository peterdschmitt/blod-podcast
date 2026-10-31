// Renders a DPC post as a full HTML email (ported from Decision Layer's scripts/post-email.mjs).
// Posts live in src/content/guides/.
// Usage: node scripts/post-email.mjs <post.md> <preview-url-of-post> <doc-url> > email.html
// Relative links (/blog/...) point at the preview's host, with the same share token.
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import { marked } from 'marked';

const [postPath, previewUrl, docUrl] = process.argv.slice(2);
if (!postPath || !previewUrl || !docUrl) {
  console.error('Usage: node scripts/post-email.mjs <post.md> <preview-url> <doc-url>');
  process.exit(2);
}

const raw = readFileSync(postPath, 'utf8');
const [, fm, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const meta = yaml.load(fm);
const preview = new URL(previewUrl);
const share = preview.searchParams.get('_vercel_share');

const C = { // Straight Talk's paper look: warm paper, white cards, navy ink, butter accent
  bg: '#F4EFE6', surface: '#FFFFFF', ink: '#1A2440', ink2: '#3E4660', muted: '#6B6457',
  line: '#D8D2C4', navy: '#1F2A44', navy2: '#ECE6D9', navyInk: '#F3EDE4', navyMuted: '#6B6457',
  orange: '#1F2A44', orangeInk: '#1F2A44', orangeWash: '#F6F0DC', wash: '#F0EAE0',
};
const font = "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif";
const serif = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const mono = "'JetBrains Mono', Menlo, Consolas, monospace";
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function absolute(href) {
  if (!href.startsWith('/')) return href;
  const u = new URL(href, preview.origin);
  if (share) u.searchParams.set('_vercel_share', share);
  return u.toString();
}

const renderer = {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    if (depth === 2) {
      return `<h2 style="font-family:${serif};font-weight:normal;font-size:26px;line-height:1.25;color:${C.navy};margin:32px 0 10px;padding-top:14px;border-top:3px solid ${C.orange};">${text}</h2>`;
    }
    return `<h3 style="font-family:${font};font-size:18px;color:${C.navy};margin:24px 0 8px;">${text}</h3>`;
  },
  paragraph({ tokens }) {
    return `<p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:${C.ink};">${this.parser.parseInline(tokens)}</p>`;
  },
  link({ href, tokens }) {
    return `<a href="${esc(absolute(href))}" style="color:${C.orangeInk};text-decoration:underline;">${this.parser.parseInline(tokens)}</a>`;
  },
  strong({ tokens }) {
    return `<strong style="color:${C.navy};">${this.parser.parseInline(tokens)}</strong>`;
  },
  codespan({ text }) {
    return `<code style="font-family:${mono};font-size:14px;background:${C.wash};padding:1px 4px;border-radius:3px;">${text}</code>`;
  },
  code({ text }) {
    return `<pre style="font-family:${mono};font-size:13px;line-height:1.5;background:${C.navy};color:${C.navyInk};padding:14px 16px;border-radius:6px;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;margin:0 0 16px;">${esc(text)}</pre>`;
  },
  blockquote({ tokens }) {
    const inner = this.parser.parse(tokens);
    return `<div style="margin:0 0 16px;padding:12px 16px;background:${C.orangeWash};border-left:4px solid ${C.orange};border-radius:4px;">${inner}</div>`;
  },
  list(token) {
    const tag = token.ordered ? 'ol' : 'ul';
    const items = token.items.map((it) => `<li style="margin:0 0 8px;font-size:16px;line-height:1.6;color:${C.ink};">${this.parser.parseInline(it.tokens[0]?.tokens ?? it.tokens)}${it.tokens.slice(1).map((t) => this.parser.parse([t])).join('')}</li>`).join('');
    return `<${tag} style="margin:0 0 16px;padding-left:22px;">${items}</${tag}>`;
  },
  table(token) {
    const th = token.header.map((c) => `<th style="text-align:left;padding:8px 10px;background:${C.navy};color:${C.navyInk};font-size:14px;">${this.parser.parseInline(c.tokens)}</th>`).join('');
    const rows = token.rows.map((r, i) => `<tr style="background:${i % 2 ? C.surface : '#FFFFFF'};">${r.map((c) => `<td style="padding:8px 10px;border-bottom:1px solid ${C.line};font-size:14px;line-height:1.5;color:${C.ink};vertical-align:top;">${this.parser.parseInline(c.tokens)}</td>`).join('')}</tr>`).join('');
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 18px;"><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`;
  },
  hr() {
    return `<hr style="border:0;border-top:1px solid ${C.line};margin:24px 0;">`;
  },
};
marked.use({ renderer });

const r = meta.respondingTo;
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const news = (meta.inTheNews ?? []).map((n) => `<li style="margin:0 0 8px;font-size:15px;line-height:1.5;"><a href="${esc(n.url)}" style="color:${C.orangeInk};">${esc(n.headline)}</a> <span style="color:${C.muted};">${esc(n.outlet)}, ${fmtDate(n.date)}</span></li>`).join('');
const sources = (meta.sources ?? []).map((s) => `<li style="margin:0 0 6px;font-size:14px;"><a href="${esc(s.url)}" style="color:${C.orangeInk};">${esc(s.title)}</a> <span style="color:${C.muted};">(${esc(s.grade)})</span></li>`).join('');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(meta.title)}</title></head>
<body style="margin:0;padding:0;background:${C.bg};font-family:${font};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};"><tr><td align="center" style="padding:20px 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#FFFFFF;border-radius:8px;overflow:hidden;">
  <tr><td style="background:${C.navy};padding:10px 24px;font-size:14px;color:#FFFFFF;">
    <strong>Draft for your review.</strong> Nothing goes live until you reply “publish”.
    <a href="${esc(previewUrl)}" style="color:#FFFFFF;">Open the preview</a> · <a href="${esc(docUrl)}" style="color:#FFFFFF;">Edit the doc</a>
  </td></tr>
  <tr><td style="background:${C.bg};padding:22px 24px 26px;border-bottom:1px solid ${C.line};">
    <div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${C.orange};font-weight:bold;">Straight Talk on Healthcare Options</div>
    <div style="font-size:12px;color:${C.navyMuted};margin:2px 0 18px;">General information, not advice about your situation.</div>
    <div style="font-size:13px;color:${C.navyMuted};text-transform:uppercase;letter-spacing:1px;">${esc(meta.category ?? 'Post')} · ${meta.readMinutes ?? ''} min read</div>
    <h1 style="font-family:${serif};font-weight:normal;font-size:34px;line-height:1.1;color:${C.ink};margin:8px 0 12px;">${esc(meta.title)}</h1>
    <p style="font-size:17px;line-height:1.55;color:${C.ink2};margin:0 0 16px;">${esc(meta.dek ?? '')}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.navy2};padding-top:12px;width:100%;"><tr>
      <td style="width:40px;padding:12px 12px 0 0;vertical-align:top;"><div style="width:40px;height:40px;line-height:40px;text-align:center;background:${C.orange};color:#FFFFFF;font-weight:bold;font-size:15px;">ST</div></td>
      <td style="padding-top:12px;font-size:14px;line-height:1.45;color:${C.ink2};">By <strong style="color:${C.ink};">${esc(meta.author ?? '')}</strong>${meta.audience ? ` · ${esc(meta.audience)}` : ''}<br><span style="font-size:13px;color:${C.navyMuted};">Last reviewed ${fmtDate(meta.lastReviewed)}</span></td>
    </tr></table>
  </td></tr>
  ${(meta.stats ?? []).length ? `<tr><td style="background:${C.navy2};padding:16px 24px 12px;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;"><tr>${meta.stats.map((s, i) => `${i && i % 2 === 0 ? '</tr><tr>' : ''}<td style="vertical-align:top;width:50%;padding:0 8px 12px 0;"><div style="border-left:3px solid ${C.orange};padding-left:10px;"><div style="font-size:30px;font-weight:bold;line-height:1.05;color:${C.ink};">${esc(s.value)}</div><div style="font-size:13px;line-height:1.35;color:${C.ink2};margin-top:4px;">${esc(s.label)}</div></div></td>`).join('')}</tr></table>
    ${meta.statsNote ? `<div style="font-size:12px;color:${C.navyMuted};margin-top:6px;">${esc(meta.statsNote)}</div>` : ''}
  </td></tr>` : ''}
  <tr><td style="padding:24px 24px 8px;">
    ${(meta.snapshot ?? []).length ? `<div style="border:1px solid ${C.line};border-top:4px solid ${C.orange};background:${C.surface};padding:12px 16px 4px;margin:0 0 20px;"><div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:bold;margin:0 0 6px;">Snapshot</div>${meta.snapshot.map((s, i) => `<div style="padding:8px 0;${i ? `border-top:1px solid ${C.line};` : ''}"><div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:${C.navy};font-weight:bold;margin:0 0 3px;">${esc(s.label)}</div><div style="font-size:15px;line-height:1.5;color:${C.ink};">${esc(s.text)}</div></div>`).join('')}</div>`
      : (meta.summary ?? []).length ? `<div style="background:${C.wash};border-radius:6px;padding:14px 16px;margin:0 0 20px;"><div style="font-weight:bold;color:${C.navy};margin:0 0 8px;font-size:15px;">In short</div><ul style="margin:0;padding-left:20px;">${meta.summary.map((s) => `<li style="margin:0 0 6px;font-size:15px;line-height:1.5;color:${C.ink2};">${esc(s)}</li>`).join('')}</ul></div>` : ''}
    ${r ? `<div style="background:${C.wash};padding:14px 16px 2px;margin:0 0 20px;"><div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:bold;margin:0 0 8px;">Why this matters today · <a href="${esc(r.url)}" style="color:${C.orangeInk};">${esc(r.outlet)}, ${fmtDate(r.date)}</a></div>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:${C.ink};">${esc(r.lede)}</p>
      <div style="border-left:3px solid ${C.orange};background:${C.orangeWash};padding:8px 12px;margin:0 0 12px;font-size:15px;color:#4A2205;">“${esc(r.quote)}”${r.quoteBy ? `<div style="font-size:12px;color:${C.muted};margin-top:4px;">${esc(r.quoteBy)}</div>` : ''}</div>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:${C.ink};">${esc(r.impact)}</p></div>` : ''}
    ${marked.parse(body)}
    ${news ? `<h2 style="font-family:${serif};font-weight:normal;font-size:26px;color:${C.navy};margin:32px 0 10px;padding-top:14px;border-top:3px solid ${C.orange};">In the news</h2><ul style="margin:0 0 16px;padding-left:20px;">${news}</ul>` : ''}
    ${sources ? `<h3 style="font-family:${font};font-size:16px;color:${C.navy};margin:20px 0 8px;">Sources</h3><ul style="margin:0 0 16px;padding-left:20px;">${sources}</ul>` : ''}
  </td></tr>
  <tr><td style="background:${C.navy2};padding:18px 24px;font-size:14px;line-height:1.6;color:${C.ink2};">
    <strong style="color:${C.ink};">To publish, reply “publish”.</strong> To change something, reply with what to change, or edit the shared doc.<br>
    <a href="${esc(previewUrl)}" style="color:${C.orange};">Open the preview</a> · <a href="${esc(docUrl)}" style="color:${C.orange};">Edit the doc</a>
  </td></tr>
</table></td></tr></table></body></html>`;

process.stdout.write(html);
