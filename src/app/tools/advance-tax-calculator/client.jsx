'use client';
import { useState } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

const HV = "Helvetica, Arial, sans-serif";

const INST = [
  { label: '1st', due: '15 June 2026', cumPct: 15, ts: new Date('2026-06-15').getTime() },
  { label: '2nd', due: '15 September 2026', cumPct: 45, ts: new Date('2026-09-15').getTime() },
  { label: '3rd', due: '15 December 2026', cumPct: 75, ts: new Date('2026-12-15').getTime() },
  { label: '4th', due: '15 March 2027', cumPct: 100, ts: new Date('2027-03-15').getTime() },
];
const NEW_SLABS = [
  { from: 0, to: 400000, r: 0 }, { from: 400000, to: 800000, r: .05 }, { from: 800000, to: 1200000, r: .10 },
  { from: 1200000, to: 1600000, r: .15 }, { from: 1600000, to: 2000000, r: .20 }, { from: 2000000, to: 2400000, r: .25 },
  { from: 2400000, to: Infinity, r: .30 },
];
const slabTax = (inc, slabs) => slabs.reduce((t, s) => {
  if (inc <= s.from) return t;
  return t + (Math.min(inc, s.to === Infinity ? inc : s.to) - s.from) * s.r;
}, 0);
const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');
const parse = s => parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0;
const TODAY = new Date('2026-06-01').getTime();
const inp = { width: '100%', padding: '10px 14px', fontSize: 14, border: `1.5px solid ${T.bdr}`, borderRadius: 8, background: '#fff', color: T.ch, fontFamily: HV };

export default function Page() {
  const [tab, setTab] = useState('individual');
  const [income, setIncome] = useState('');
  const [tds, setTds] = useState('');
  const [senior, setSenior] = useState(false);
  const [presumptive, setPresumptive] = useState(false);
  const [res, setRes] = useState(null);

  function calc() {
    const gross = parse(income); if (!gross) return;
    const tdsAmt = parse(tds);
    let base = 0;
    if (tab === 'individual') {
      if (senior) { setRes({ exempt: true }); return; }
      base = slabTax(gross, NEW_SLABS);
      if (gross <= 1200000) base = 0;
    } else {
      base = gross * 0.30;
    }
    const tax = base * 1.04;
    const net = Math.max(0, tax - tdsAmt);
    if (net < 10000) { setRes({ low: true, net }); return; }
    const insts = INST.map((inst, i) => {
      const prev = i === 0 ? 0 : INST[i - 1].cumPct;
      const pct = inst.cumPct - prev;
      return { ...inst, pct, cumAmt: Math.round(net * inst.cumPct / 100), thisAmt: Math.round(net * pct / 100) };
    });
    setRes({ tax, tdsAmt, net, insts, pre: presumptive && tab === 'individual' });
  }

  const Chk = ({ val, set, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: T.stone, borderRadius: 8, cursor: 'pointer', marginBottom: 14, fontFamily: HV }} onClick={() => { set(!val); setRes(null); }}>
      <div style={{ width: 18, height: 18, border: `2px solid ${val ? T.f : T.bdr}`, borderRadius: 4, background: val ? T.f : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {val && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
      </div>
      <span style={{ fontSize: 13, color: T.ink, fontFamily: HV }}>{children}</span>
    </div>
  );

  return (
    <div style={{ fontFamily: HV }}>
      {/* Global font override */}
      <style>{`
        .adv-tax-page, .adv-tax-page * { font-family: Helvetica, Arial, sans-serif !important; }
      `}</style>

      <section className="adv-tax-page" style={{ backgroundImage: "url('/banners and logos/Advance Tax Calculator.png')", backgroundSize: "cover", backgroundPosition: "center", padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block', fontFamily: HV }}>← Back to Tools</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20, fontFamily: HV }}>FY 2026-27</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, marginBottom: 14, fontFamily: HV }}>Advance Tax Calculator</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 620, fontFamily: HV }}>
            Quarterly instalments for FY 2026-27. Due: 15 Jun · 15 Sep · 15 Dec · 15 Mar.
          </p>
        </div>
      </section>

      {/* ── SEO INTRO ─────────────────────────────────────────────────────── */}
      <section className="adv-tax-page" style={{ background: '#fff', padding: '52px 40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 700, color: T.ch, marginBottom: 20, lineHeight: 1.2, fontFamily: HV }}>
            Advance Tax Calculator India — Quarterly Instalments FY 2026-27
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18, fontFamily: HV }}>
                Advance tax is India's mechanism for collecting income tax in instalments throughout the financial year rather than in a lump sum at year-end. Any taxpayer — individual, company, or LLP — whose estimated total tax liability for the year exceeds ₹10,000 (after deducting TDS credit) is required to pay advance tax in four quarterly instalments under the Income Tax Act 1961. Failure to pay on time triggers interest under Section 234C at 1% per month on the shortfall, while failure to pay 90% of total tax by year-end attracts additional interest under Section 234B.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, fontFamily: HV }}>
                For FY 2026-27, the four advance tax due dates are: 15 June 2026 (15% of total advance tax payable), 15 September 2026 (cumulative 45%), 15 December 2026 (cumulative 75%), and 15 March 2027 (100%). Missing any instalment — or underpaying relative to the cumulative percentage — triggers interest from the due date regardless of whether the full tax is paid by March 31.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18, fontFamily: HV }}>
                There are two important exceptions. Senior citizens aged 75 or above who earn only pension and interest income from specified banks are fully exempt from advance tax under Section 207 — their tax is collected by the bank itself. Taxpayers opting for presumptive taxation under Section 44AD or 44ADA must pay their entire advance tax liability in a single instalment by 15 March 2027, not spread across four instalments.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, fontFamily: HV }}>
                This calculator takes your estimated annual income and expected TDS credits, computes net advance tax payable, and splits it across all four instalments with exact rupee amounts and due dates. Dates that have already passed are clearly marked. If your net liability falls below ₹10,000, the calculator confirms no advance tax is required. For an accurate base tax figure, use this alongside our Income Tax Calculator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ─────────────────────────────────────────────────────── */}
      {/* FIX: background changed from `white` (undefined var) to '#fff' */}
      <section className="adv-tax-page" style={{ background: '#fff', padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="tools-calc-grid">
            <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '28px 26px' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: T.ch, marginBottom: 20, fontFamily: HV }}>Inputs</h2>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.mid, marginBottom: 6, fontFamily: HV }}>Taxpayer Type</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['individual', 'company'].map(t => (
                    <button key={t} onClick={() => { setTab(t); setRes(null); }} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, borderRadius: 7, border: 'none', cursor: 'pointer', background: tab === t ? T.f : T.stone, color: tab === t ? '#fff' : T.mid, fontFamily: HV }}>
                      {t === 'individual' ? 'Individual / HUF' : 'Company / LLP'}
                    </button>
                  ))}
                </div>
              </div>
              {tab === 'individual' && <Chk val={senior} set={setSenior}>Senior citizen (75+) with only pension/interest — exempt from advance tax</Chk>}
              {tab === 'individual' && <Chk val={presumptive} set={setPresumptive}>Presumptive taxation (Sec 44AD/44ADA) — entire tax due by 15 March 2027</Chk>}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.mid, marginBottom: 6, fontFamily: HV }}>Estimated Total Income FY 2026-27 (₹)</div>
                <input style={inp} type="text" placeholder="e.g. 1500000" value={income} onChange={e => { setIncome(e.target.value); setRes(null); }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.mid, marginBottom: 6, fontFamily: HV }}>Expected TDS / TCS for the year (₹) — optional</div>
                <input style={inp} type="text" placeholder="e.g. 50000" value={tds} onChange={e => { setTds(e.target.value); setRes(null); }} />
              </div>
              <div style={{ background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 8, padding: '10px 14px', marginBottom: 18, fontSize: 12, color: '#7A5C1E', fontFamily: HV }}>
                For accurate tax computation, use the <Link href="/tools/income-tax-calculator" style={{ color: T.f, fontWeight: 600, fontFamily: HV }}>Income Tax Calculator ↗</Link>
              </div>
              <button onClick={calc} style={{ width: '100%', padding: '13px', fontSize: 14, fontWeight: 700, background: T.f, color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: HV }}>
                Calculate Instalments →
              </button>
            </div>

            <div>
              {!res ? (
                <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '48px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>📅</div>
                  <div style={{ fontSize: 14, color: T.mid, fontFamily: HV }}>Enter details and click Calculate.</div>
                </div>
              ) : res.exempt ? (
                <div style={{ background: '#E4F0EB', border: `1px solid ${T.f}`, borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.f, marginBottom: 8, fontFamily: HV }}>Advance Tax Exempt</div>
                  <p style={{ fontSize: 13, color: T.mid, fontFamily: HV }}>Senior citizens (75+) with only pension/interest income from specified banks are exempt from advance tax under Sec 207.</p>
                </div>
              ) : res.low ? (
                <div style={{ background: '#E4F0EB', border: `1px solid ${T.f}`, borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.f, marginBottom: 8, fontFamily: HV }}>No Advance Tax Required</div>
                  <p style={{ fontSize: 13, color: T.mid, fontFamily: HV }}>Net advance tax payable is <strong>{fmt(res.net)}</strong> — below the ₹10,000 threshold. No advance tax is needed.</p>
                </div>
              ) : (
                <div>
                  <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '18px 20px', marginBottom: 14 }}>
                    {[['Estimated total tax (inc. cess)', fmt(res.tax)], res.tdsAmt > 0 && ['Less: TDS/TCS credit', `(${fmt(res.tdsAmt)})`], ['Net Advance Tax Payable', fmt(res.net)]].filter(Boolean).map(([l, v], i, a) => (
                      <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < a.length - 1 ? `1px solid ${T.bdr}` : 'none', fontWeight: i === a.length - 1 ? 700 : 400, fontSize: i === a.length - 1 ? 15 : 13.5, fontFamily: HV }}>
                        <span style={{ color: i === a.length - 1 ? T.ch : T.mid }}>{l}</span>
                        <span style={{ color: i === a.length - 1 ? T.f : T.ch }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  {res.pre ? (
                    <div style={{ background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 12, padding: '18px 20px' }}>
                      <div style={{ fontWeight: 700, color: '#7A5C1E', marginBottom: 6, fontFamily: HV }}>Presumptive Taxation</div>
                      <p style={{ fontSize: 13, color: '#7A5C1E', margin: 0, fontFamily: HV }}>Entire advance tax of <strong>{fmt(res.net)}</strong> is due in one instalment by <strong>15 March 2027</strong>.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {res.insts.map((inst, i) => {
                        const isPast = inst.ts < TODAY;
                        const isNext = !isPast && (i === 0 || res.insts[i - 1].ts < TODAY);
                        return (
                          <div key={i} style={{ background: '#fff', border: `1.5px solid ${isNext ? T.f : T.bdr}`, borderRadius: 12, padding: '14px 18px', position: 'relative' }}>
                            {isNext && <div style={{ position: 'absolute', top: -1, right: 12, background: T.f, color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: '0 0 6px 6px', fontFamily: HV }}>NEXT DUE</div>}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: T.ch, fontFamily: HV }}>{inst.label} Instalment</div>
                                <div style={{ fontSize: 12, color: T.lt, fontFamily: HV }}>Due: {inst.due} · Cumulative {inst.cumPct}%</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 17, fontWeight: 700, color: isPast ? T.lt : T.f, fontFamily: HV }}>{fmt(inst.cumAmt)}</div>
                                <div style={{ fontSize: 11.5, color: T.s, fontWeight: 600, fontFamily: HV }}>Pay now: {fmt(inst.thisAmt)}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div style={{ marginTop: 12, fontSize: 12, color: '#7A5C1E', padding: '10px 14px', background: '#FFF8ED', borderRadius: 8, border: '1px solid #F5E2B8', fontFamily: HV }}>
                    ⚠️ Interest u/s 234B/234C at 1%/month applies if advance tax is short or late.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}