'use client';
import { useState } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

const HV = "Helvetica, Arial, sans-serif";

const PROHIBITED = ['Bank', 'Insurance', 'Stock Exchange', 'National', 'Prime Minister', 'President', 'Rashtrapati', 'Government', 'Parliament', 'State', 'Authority', 'Commission', 'Board', 'Reserve', 'Trust', 'Municipal', 'Corporation', 'Co-operative', 'Society'];
const REQUIRED_SUFFIXES = [
  { type: 'Private Limited Company', suffix: 'Private Limited / Pvt. Ltd.', note: 'Most common for foreign-owned entities' },
  { type: 'Public Limited Company', suffix: 'Limited / Ltd.', note: 'For listed or larger companies' },
  { type: 'One Person Company', suffix: 'OPC Private Limited', note: 'For single-promoter companies' },
  { type: 'Limited Liability Partnership', suffix: 'LLP', note: 'For professional services or partnerships' },
];
const TIPS = [
  { icon: '✓', title: 'Make it distinctive', desc: 'Avoid generic words like "India", "Services", "Solutions" as the primary word. Combine with a unique word.' },
  { icon: '✓', title: 'Not identical to existing', desc: 'MCA checks similarity with existing registered company names and trademarks. Run a search first.' },
  { icon: '✓', title: 'Avoid abbreviations', desc: 'Names like "ABC Pvt Ltd" are typically rejected. Use full meaningful words.' },
  { icon: '✓', title: 'Not offensive or misleading', desc: 'Names that imply government connection, mislead customers, or are offensive will be rejected.' },
  { icon: '✓', title: 'Check trademark conflict', desc: 'Even if MCA approves, a name similar to a registered trademark can lead to legal challenges later.' },
];

export default function Page() {
  const [name, setName] = useState('');

  const hasProhibited = PROHIBITED.filter(w => name.toLowerCase().includes(w.toLowerCase()));
  const hasSuffix = ['private limited', 'pvt ltd', 'pvt. ltd.', 'limited', 'ltd', 'llp', 'opc'].some(s => name.toLowerCase().includes(s));
  const isGeneric = name.trim().split(/\s+/).length <= 1 && name.trim().length > 0;

  return (
    <div style={{ fontFamily: HV }}>
      <style>{`
        .cnc-page, .cnc-page * { font-family: Helvetica, Arial, sans-serif !important; }
      `}</style>

      {/* ── HERO ── */}
      <section className="cnc-page" style={{ backgroundImage: "url('/banners and logos/Company name check (2).png')", backgroundSize: "cover", backgroundPosition: "center", padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block', fontFamily: HV }}>← Back to Tools</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20, fontFamily: HV }}>MCA · Name Guidelines</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, marginBottom: 14, fontFamily: HV }}>Company Name Check</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 620, fontFamily: HV }}>
            Name availability guide and rules for India company registration. Check your proposed name before filing.
          </p>
        </div>
      </section>

      {/* ── SEO INTRO ── */}
      <section className="cnc-page" style={{ background: '#fff', padding: '48px 40px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18, fontFamily: HV }}>
                Choosing the right name is one of the first and most critical steps in registering a company in India. The Ministry of Corporate Affairs (MCA) scrutinises every proposed company name against a strict set of rules before approving incorporation. A rejected name delays your entire incorporation timeline — typically by 3–7 working days — and requires a fresh application with revised choices. Understanding the rules upfront prevents avoidable rejections and wasted professional fees.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, fontFamily: HV }}>
                The most common reasons for name rejection are: the proposed name being identical or too similar to an already registered company or LLP; use of words that imply government connection or require special approval (such as "National", "Bank", "Insurance", "Reserve", or "Parliament"); use of a word that is a registered trademark owned by a third party; a name that is purely generic or consists only of common words like "India Services Solutions"; and names that are offensive or misleading. The MCA system performs phonetic similarity checks — not just exact-match — so minor spelling variations on existing names are typically rejected.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18, fontFamily: HV }}>
                Every company type in India must carry a mandatory suffix. Private Limited Companies must end with "Private Limited" or "Pvt. Ltd." Public Limited Companies must end with "Limited" or "Ltd." One Person Companies must carry "OPC Private Limited." Limited Liability Partnerships must end with "LLP." These suffixes cannot be omitted, abbreviated differently, or placed mid-name. Name approval also does not grant trademark protection — a separately registered trademark provides stronger, enforceable rights against third-party use.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, fontFamily: HV }}>
                Once a name is approved, companies can reserve it for 20 days through the MCA's Reserve Unique Name (RUN) service, filed by a registered CA or CS. Alternatively, name reservation can be done as part of the SPICe+ all-in-one incorporation form. This tool lets you run a quick pre-check on your proposed name — identifying prohibited words, missing suffixes, and single-word issues — before you engage a professional and incur filing fees. For final verification, always search the official MCA company name database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOL SECTION — FIX: bg white instead of T.stone ── */}
      <section className="cnc-page" style={{ background: '#fff', padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Name checker */}
          <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '28px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.ch, marginBottom: 6, fontFamily: HV }}>Quick Name Check</h2>
            <p style={{ fontSize: 13.5, color: T.mid, marginBottom: 20, fontFamily: HV }}>Enter your proposed name to check for common issues, then verify on MCA portal.</p>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Acme Technologies Private Limited"
              style={{ width: '100%', padding: '12px 16px', fontSize: 15, border: `1.5px solid ${T.bdr}`, borderRadius: 10, color: T.ch, fontFamily: HV, marginBottom: 16, boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: name.trim() ? 20 : 0 }}>
              <a href="https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/company-llp-name-search.html" target="_blank" rel="noopener noreferrer"
                className="ics-btn ics-btn-primary" style={{ fontSize: 13.5, fontFamily: HV }}>Search Existing Companies on MCA ↗</a>
              <a href="https://tmrsearch.ipindia.gov.in/tmrpublicsearch/" target="_blank" rel="noopener noreferrer"
                className="ics-btn ics-btn-outline" style={{ fontSize: 13.5, fontFamily: HV }}>Trademark Search ↗</a>
            </div>
            {name.trim() && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {hasProhibited.length > 0 && (
                  <div style={{ background: '#FDE8E8', border: '1px solid #E57373', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#C62828', fontFamily: HV }}>
                    ⚠️ Contains potentially prohibited word(s): <strong>{hasProhibited.join(', ')}</strong>. Approval may be difficult without government connection proof.
                  </div>
                )}
                {!hasSuffix && (
                  <div style={{ background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7A5C1E', fontFamily: HV }}>
                    ℹ️ Name should end with the required suffix (e.g. "Private Limited", "LLP"). See suffix rules below.
                  </div>
                )}
                {isGeneric && (
                  <div style={{ background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7A5C1E', fontFamily: HV }}>
                    ℹ️ Single-word names are typically rejected. Add a distinctive element (e.g. your brand name or a unique combination).
                  </div>
                )}
                {hasProhibited.length === 0 && hasSuffix && !isGeneric && (
                  <div style={{ background: '#E4F0EB', border: `1px solid ${T.f}`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: T.f, fontFamily: HV }}>
                    ✓ No obvious issues detected. Proceed to verify on MCA portal for availability and similarity check.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rules grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>

            {/* Suffixes */}
            <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '22px' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ch, marginBottom: 14, fontFamily: HV }}>Required Name Suffix</div>
              {REQUIRED_SUFFIXES.map(s => (
                <div key={s.type} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${T.bdr}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.ch, fontFamily: HV }}>{s.type}</div>
                  <div style={{ fontSize: 12.5, color: T.f, fontWeight: 600, marginTop: 2, fontFamily: HV }}>{s.suffix}</div>
                  <div style={{ fontSize: 12, color: T.lt, marginTop: 2, fontFamily: HV }}>{s.note}</div>
                </div>
              ))}
            </div>

            {/* Prohibited words */}
            <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '22px' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ch, marginBottom: 14, fontFamily: HV }}>Prohibited / Restricted Words</div>
              <p style={{ fontSize: 13, color: T.mid, marginBottom: 12, fontFamily: HV }}>These words require prior approval or proof of connection:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {PROHIBITED.map(w => (
                  <span key={w} style={{ fontSize: 11.5, background: '#FDE8E8', color: '#C62828', borderRadius: 20, padding: '3px 10px', fontWeight: 500, fontFamily: HV }}>{w}</span>
                ))}
              </div>
            </div>

            {/* RUN process */}
            <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '22px' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ch, marginBottom: 14, fontFamily: HV }}>Name Reservation &amp; Incorporation</div>
              {[
                ['RUN Service', 'Reserve Unique Name (RUN) — standalone name reservation, valid for 20 days. Up to 2 name preferences. Filed by a registered CA/CS via MCA portal (login required).'],
                ['SPICe+ Form', 'All-in-one incorporation form that includes name reservation as part of the process. Filed by a registered professional via MCA login.'],
                ['Approval Time', 'Name approval typically takes 1–3 working days. Rejected names can be re-submitted with modifications.'],
                ['Name Change', 'Post-incorporation name change requires special resolution + MCA approval (Form INC-24). Involves additional fees and ROC processing time.'],
              ].map(([t, d]) => (
                <div key={t} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ch, fontFamily: HV }}>{t}</div>
                  <div style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.6, fontFamily: HV }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '24px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ch, marginBottom: 16, fontFamily: HV }}>Tips for Getting Your Name Approved</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
              {TIPS.map(tip => (
                <div key={tip.title} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: T.f, fontWeight: 700, fontSize: 15, flexShrink: 0, fontFamily: HV }}>{tip.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.ch, marginBottom: 3, fontFamily: HV }}>{tip.title}</div>
                    <div style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.6, fontFamily: HV }}>{tip.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* External links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {[
              { icon: '🏛️', title: 'MCA Company Name Search ↗', desc: 'Search all registered company and LLP names in India', href: 'https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/company-llp-name-search.html' },
              { icon: '™️', title: 'Trademark Search (IP India) ↗', desc: 'Check if your proposed name conflicts with a registered trademark', href: 'https://tmrsearch.ipindia.gov.in/tmrpublicsearch/' },
            ].map(l => (
              <a key={l.title} href={l.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="card-lift" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{l.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.ch, marginBottom: 4, fontFamily: HV }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: T.mid, fontFamily: HV }}>{l.desc}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{ fontSize: 12.5, color: T.mid, background: '#f5f5f0', border: `1px solid ${T.bdr}`, borderRadius: 10, padding: '14px 18px', fontFamily: HV }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> MCA name approval is discretionary. The quick check above identifies common issues only — final approval depends on MCA's assessment. Consult our team for name selection guidance.
          </div>

        </div>
      </section>
    </div>
  );
}