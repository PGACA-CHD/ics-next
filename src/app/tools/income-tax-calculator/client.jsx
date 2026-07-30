'use client';
import { useState } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

const helvetica = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

// ─── TAX DATA ─────────────────────────────────────────────────────────────────

const NEW_SLABS = [
  { from: 0, to: 400000, rate: 0 },
  { from: 400000, to: 800000, rate: 0.05 },
  { from: 800000, to: 1200000, rate: 0.10 },
  { from: 1200000, to: 1600000, rate: 0.15 },
  { from: 1600000, to: 2000000, rate: 0.20 },
  { from: 2000000, to: 2400000, rate: 0.25 },
  { from: 2400000, to: Infinity, rate: 0.30 },
];

const OLD_BELOW60 = [
  { from: 0, to: 250000, rate: 0 },
  { from: 250000, to: 500000, rate: 0.05 },
  { from: 500000, to: 1000000, rate: 0.20 },
  { from: 1000000, to: Infinity, rate: 0.30 },
];

const OLD_SR = [
  { from: 0, to: 300000, rate: 0 },
  { from: 300000, to: 500000, rate: 0.05 },
  { from: 500000, to: 1000000, rate: 0.20 },
  { from: 1000000, to: Infinity, rate: 0.30 },
];

const OLD_SSR = [
  { from: 0, to: 500000, rate: 0 },
  { from: 500000, to: 1000000, rate: 0.20 },
  { from: 1000000, to: Infinity, rate: 0.30 },
];

const IND_SRCH_NEW = [
  { from: 0, rate: 0 },
  { from: 5000000, rate: 0.10 },
  { from: 10000000, rate: 0.15 },
  { from: 20000000, rate: 0.25 },
];

const IND_SRCH_OLD = [
  { from: 0, rate: 0 },
  { from: 5000000, rate: 0.10 },
  { from: 10000000, rate: 0.15 },
  { from: 20000000, rate: 0.25 },
  { from: 50000000, rate: 0.37 },
];

const DOM_SRCH = [
  { from: 0, rate: 0 },
  { from: 10000000, rate: 0.07 },
  { from: 100000000, rate: 0.12 },
];

const FGN_SRCH = [
  { from: 0, rate: 0 },
  { from: 10000000, rate: 0.02 },
  { from: 100000000, rate: 0.05 },
];

const LLP_SRCH = [
  { from: 0, rate: 0 },
  { from: 10000000, rate: 0.12 },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function slabTax(income, slabs) {
  let total = 0;
  const rows = [];
  for (const s of slabs) {
    if (income <= s.from) break;
    const upper = s.to === Infinity ? income : Math.min(income, s.to);
    const amt = upper - s.from;
    const tax = amt * s.rate;
    rows.push({ from: s.from, to: upper, rate: s.rate, amt, tax });
    total += tax;
  }
  return { total, rows };
}

function surchargeRate(income, table) {
  let r = 0;
  for (const row of table) if (income > row.from) r = row.rate;
  return r;
}

function fmt(n) {
  if (n === null || n === undefined) return '—';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function pct(r) { return (r * 100).toFixed(2) + '%'; }

function parseIncome(str) {
  return parseFloat(String(str).replace(/[^0-9.]/g, '')) || 0;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Page() {
  const [tab, setTab] = useState('individual');
  const [regime, setRegime] = useState('new');
  const [resident, setResident] = useState(true);
  const [salaried, setSalaried] = useState(false);
  const [age, setAge] = useState('below60');
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [coType, setCoType] = useState('dom_low');
  const [result, setResult] = useState(null);

  function calculate() {
    const gross = parseIncome(income);
    if (gross <= 0) return;

    let res = {};

    if (tab === 'individual') {
      const stdDed = salaried ? (regime === 'new' ? 75000 : 50000) : 0;
      const addlDed = regime === 'old' ? parseIncome(deductions) : 0;
      const taxable = Math.max(0, gross - stdDed - addlDed);

      let slabs;
      if (regime === 'new') {
        slabs = NEW_SLABS;
      } else {
        slabs = age === 'below60' ? OLD_BELOW60 : age === '60to80' ? OLD_SR : OLD_SSR;
      }

      const { total: baseTax, rows } = slabTax(taxable, slabs);

      let rebate = 0;
      let marginalReliefApplied = false;
      if (resident) {
        if (regime === 'new') {
          if (taxable <= 1200000) {
            rebate = Math.min(baseTax, 60000);
          } else {
            const excess = taxable - 1200000;
            if (baseTax > excess) {
              rebate = baseTax - excess;
              marginalReliefApplied = true;
            }
          }
        } else if (regime === 'old') {
          if (taxable <= 500000) {
            rebate = Math.min(baseTax, 12500);
          } else {
            const excess = taxable - 500000;
            if (baseTax > excess) {
              rebate = baseTax - excess;
              marginalReliefApplied = true;
            }
          }
        }
      }

      const afterRebate = Math.max(0, baseTax - rebate);
      const srchRate = surchargeRate(taxable, regime === 'new' ? IND_SRCH_NEW : IND_SRCH_OLD);
      const srch = afterRebate * srchRate;
      const cess = (afterRebate + srch) * 0.04;
      const total = afterRebate + srch + cess;

      res = {
        type: 'individual', gross, stdDed, addlDed, taxable, rows, baseTax,
        rebate, afterRebate, marginalReliefApplied, srchRate, srch, cess, total,
        effRate: gross > 0 ? total / gross : 0,
      };

    } else if (tab === 'company') {
      const rateMap = { dom_low: 0.25, dom_high: 0.30, baa: 0.22, bab: 0.15, foreign: 0.40 };
      const rate = rateMap[coType];
      const baseTax = gross * rate;

      let srchRate;
      if (coType === 'baa' || coType === 'bab') srchRate = 0.10;
      else if (coType === 'foreign') srchRate = surchargeRate(gross, FGN_SRCH);
      else srchRate = surchargeRate(gross, DOM_SRCH);

      const srch = baseTax * srchRate;
      const cess = (baseTax + srch) * 0.04;
      const total = baseTax + srch + cess;

      const matBase = gross * 0.15;
      const matSrch = matBase * srchRate;
      const matTotal = (matBase + matSrch) * 1.04;
      const matWarning = (coType === 'dom_low' || coType === 'dom_high') && total < matTotal;

      res = {
        type: 'company', coType, gross, taxable: gross, rate, baseTax,
        srchRate, srch, cess, total, effRate: gross > 0 ? total / gross : 0,
        matWarning, matTotal,
      };

    } else {
      const rate = 0.30;
      const baseTax = gross * rate;
      const srchRate = surchargeRate(gross, LLP_SRCH);
      const srch = baseTax * srchRate;
      const cess = (baseTax + srch) * 0.04;
      const total = baseTax + srch + cess;

      const amtBase = gross * 0.185;
      const amtTotal = (amtBase + amtBase * srchRate) * 1.04;
      const amtWarning = total < amtTotal;

      res = {
        type: 'llp', gross, taxable: gross, rate, baseTax,
        srchRate, srch, cess, total, effRate: gross > 0 ? total / gross : 0,
        amtWarning, amtTotal,
      };
    }

    setResult(res);
  }

  const inputStyle = {
    ...helvetica, width: '100%', padding: '10px 14px', fontSize: 14,
    border: `1.5px solid ${T.bdr}`, borderRadius: 8, background: '#fff', color: T.ch,
  };
  const labelStyle = { ...helvetica, fontSize: 12.5, fontWeight: 600, color: T.mid, marginBottom: 6, display: 'block' };

  const tabBtn = (id, label) => (
    <button key={id} onClick={() => { setTab(id); setResult(null); }}
      style={{
        ...helvetica, padding: '9px 20px', fontSize: 13.5, fontWeight: 600, borderRadius: 8, border: 'none',
        cursor: 'pointer', background: tab === id ? T.f : '#f0f0f0', color: tab === id ? '#fff' : T.mid,
        transition: 'all .18s'
      }}>
      {label}
    </button>
  );

  return (
    <div style={helvetica}>
      {/* HERO — unchanged */}
      <section style={{ backgroundImage: "url('/banners and logos/Income Tax Calculator (1).png')", backgroundSize: "cover", backgroundPosition: "center", padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ ...helvetica, fontSize: 12.5, color: '#444', marginBottom: 18, display: 'inline-block' }}>← Back to Tools</Link>
          <div style={{ ...helvetica, display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#111', fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(0,0,0,.15)', borderRadius: 20 }}>
            Finance Act 2025 · FY 2025-26 / AY 2026-27
          </div>
          <h1 className="font-display" style={{ ...helvetica, fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#111', lineHeight: 1.08, marginBottom: 14 }}>
            Income Tax Calculator
          </h1>
          <p style={{ ...helvetica, fontSize: 15, color: '#333', lineHeight: 1.7, maxWidth: 620 }}>
            Companies · LLP · Individuals (resident &amp; non-resident) · New &amp; Old Regime
          </p>
        </div>
      </section>

      {/* SEO INTRO — white bg */}
      <section style={{ background: '#fff', padding: '52px 40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="font-display" style={{ ...helvetica, fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 600, color: T.ch, marginBottom: 20, lineHeight: 1.2 }}>
            India Income Tax Calculator — Companies, LLP &amp; Individuals (FY 2025-26)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                India's income tax system operates across multiple slabs, different rates for different taxpayer categories, and a choice between two distinct regimes — making accurate computation genuinely complex without the right tool. This free income tax calculator covers every major taxpayer category: domestic companies, foreign companies, Limited Liability Partnerships (LLPs), and individuals — including resident and non-resident individuals — under both the New Tax Regime and the Old Tax Regime for FY 2025-26 (Assessment Year 2026-27).
              </p>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                Under the New Regime (Budget 2025), individual tax slabs start at nil for income up to ₹4 lakh and rise to 30% for income above ₹24 lakh. The calculator automatically applies the standard deduction of ₹75,000 for salaried individuals, the Section 87A rebate — which makes income up to ₹12 lakh effectively tax-free under the new regime — and the 4% Health &amp; Education Cess on the final tax liability.
              </p>
            </div>
            <div>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                For companies, the calculator handles four rate structures: the normal domestic company rate (25% for turnover ≤ ₹400 crore, 30% above), the concessional Section 115BAA rate (22%), the new manufacturing company rate under Section 115BAB (15%), and the foreign company flat rate of 40%. Each computation includes the applicable surcharge — which varies between 7% and 12% for domestic companies — and the 4% cess. The calculator also flags potential Minimum Alternate Tax (MAT) and Alternate Minimum Tax (AMT) liability when regular tax falls below the statutory minimum.
              </p>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                LLP and partnership firm tax is calculated at a flat 30% rate with applicable surcharge and cess. Every computation shows a slab-wise breakdown — not just a final number — so you can verify exactly how each portion of income is taxed. Built by our Ex-Big 4 CA team and based on Finance Act 2025 rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN — white bg */}
      <section style={{ background: '#fff', padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div className="tools-calc-grid">

            {/* INPUTS */}
            <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '32px 28px' }}>
              <h2 style={{ ...helvetica, fontSize: 16, fontWeight: 700, color: T.ch, marginBottom: 24 }}>Tax Inputs</h2>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Taxpayer Type</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tabBtn('individual', 'Individual / HUF')}
                  {tabBtn('company', 'Company')}
                  {tabBtn('llp', 'LLP / Firm')}
                </div>
              </div>

              {/* INDIVIDUAL INPUTS */}
              {tab === 'individual' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Tax Regime</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[['new', 'New Regime (Default)'], ['old', 'Old Regime']].map(([v, l]) => (
                        <button key={v} onClick={() => { setRegime(v); setResult(null); }}
                          style={{
                            ...helvetica, flex: 1, padding: '9px 12px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                            border: `1.5px solid ${regime === v ? T.f : T.bdr}`, cursor: 'pointer',
                            background: regime === v ? '#E4F0EB' : '#fff', color: regime === v ? T.f : T.mid
                          }}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Residency</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {[['true', 'Resident'], ['false', 'Non-Resident']].map(([v, l]) => (
                          <button key={v} onClick={() => { setResident(v === 'true'); setResult(null); }}
                            style={{
                              ...helvetica, flex: 1, padding: '8px 10px', fontSize: 12.5, fontWeight: 600, borderRadius: 8,
                              border: `1.5px solid ${(resident ? 'true' : 'false') === v ? T.f : T.bdr}`,
                              cursor: 'pointer', background: (resident ? 'true' : 'false') === v ? '#E4F0EB' : '#fff',
                              color: (resident ? 'true' : 'false') === v ? T.f : T.mid
                            }}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {regime === 'old' && (
                    <div>
                      <label style={labelStyle}>Age Category</label>
                      <select value={age} onChange={e => { setAge(e.target.value); setResult(null); }} style={inputStyle}>
                        <option value="below60">Below 60 years</option>
                        <option value="60to80">Senior Citizen (60–80 years)</option>
                        <option value="above80">Super Senior Citizen (above 80)</option>
                      </select>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#f5f5f5', borderRadius: 8, cursor: 'pointer' }}
                    onClick={() => { setSalaried(!salaried); setResult(null); }}>
                    <div style={{ width: 18, height: 18, border: `2px solid ${salaried ? T.f : T.bdr}`, borderRadius: 4, background: salaried ? T.f : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {salaried && <span style={{ color: '#fff', fontSize: 11, lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{ ...helvetica, fontSize: 13, color: T.ink }}>
                      I am salaried / pensioner — apply standard deduction of {regime === 'new' ? '₹75,000' : '₹50,000'}
                    </span>
                  </div>

                  <div>
                    <label style={labelStyle}>Gross Total Income (₹)</label>
                    <input type="text" placeholder="e.g. 1500000" value={income}
                      onChange={e => { setIncome(e.target.value); setResult(null); }}
                      style={inputStyle} />
                    <div style={{ ...helvetica, fontSize: 11.5, color: T.lt, marginTop: 5 }}>Enter total income before standard deduction. For old regime, include all heads of income.</div>
                  </div>

                  {regime === 'old' && (
                    <div>
                      <label style={labelStyle}>Deductions under Chapter VI-A (₹) <span style={{ fontWeight: 400 }}>— 80C, 80D, 80G, etc.</span></label>
                      <input type="text" placeholder="e.g. 150000" value={deductions}
                        onChange={e => { setDeductions(e.target.value); setResult(null); }}
                        style={inputStyle} />
                      <div style={{ ...helvetica, fontSize: 11.5, color: T.lt, marginTop: 5 }}>Enter total of all deductions (80C max ₹1.5L, 80D, 80G, HRA, etc.)</div>
                    </div>
                  )}
                </div>
              )}

              {/* COMPANY INPUTS */}
              {tab === 'company' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Company Type</label>
                    <select value={coType} onChange={e => { setCoType(e.target.value); setResult(null); }} style={inputStyle}>
                      <option value="dom_low">Domestic Company — Turnover ≤ ₹400 Cr (FY 2021-22) · 25%</option>
                      <option value="dom_high">Domestic Company — Turnover &gt; ₹400 Cr · 30%</option>
                      <option value="baa">Domestic Company — Sec 115BAA (opted) · 22%</option>
                      <option value="bab">New Mfg. Company — Sec 115BAB · 15%</option>
                      <option value="foreign">Foreign Company · 40%</option>
                    </select>
                    <div style={{ ...helvetica, fontSize: 11.5, color: T.lt, marginTop: 5 }}>
                      {coType === 'baa' && 'Sec 115BAA: 22% flat, 10% surcharge, no MAT. No exemptions/deductions allowed (except 80JJAA).'}
                      {coType === 'bab' && 'Sec 115BAB: 15% for new domestic mfg. companies incorporated after Oct 1, 2019. 10% flat surcharge. No MAT.'}
                      {coType === 'dom_low' && 'Normal rate 25% for companies with turnover ≤ ₹400 Cr in FY 2021-22. MAT at 15% of book profit may apply.'}
                      {coType === 'dom_high' && 'Normal rate 30% for companies with turnover > ₹400 Cr. MAT at 15% of book profit may apply.'}
                      {coType === 'foreign' && 'Foreign companies are taxed at 40% on Indian-sourced income. Subject to applicable DTAA.'}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Taxable Income / Assessed Income (₹)</label>
                    <input type="text" placeholder="e.g. 50000000" value={income}
                      onChange={e => { setIncome(e.target.value); setResult(null); }} style={inputStyle} />
                    <div style={{ ...helvetica, fontSize: 11.5, color: T.lt, marginTop: 5 }}>Enter total taxable income (not book profit). MAT is computed separately on book profit.</div>
                  </div>
                </div>
              )}

              {/* LLP INPUTS */}
              {tab === 'llp' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ padding: '12px 14px', background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 8, ...helvetica, fontSize: 13, color: '#7A5C1E' }}>
                    LLP / Partnership Firms are taxed at a flat rate of 30% on their total income.
                  </div>
                  <div>
                    <label style={labelStyle}>Total Income (₹)</label>
                    <input type="text" placeholder="e.g. 5000000" value={income}
                      onChange={e => { setIncome(e.target.value); setResult(null); }} style={inputStyle} />
                  </div>
                </div>
              )}

              <button onClick={calculate} style={{ ...helvetica, marginTop: 28, width: '100%', padding: '13px', fontSize: 14, fontWeight: 700, background: T.f, color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', letterSpacing: 0.3 }}>
                Calculate Tax →
              </button>
            </div>

            {/* RESULTS */}
            <div>
              {!result ? (
                <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '48px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>🧮</div>
                  <div style={{ ...helvetica, fontSize: 15, color: T.mid }}>Enter income details and click<br /><strong style={{ color: T.ch }}>"Calculate Tax"</strong> to see results.</div>
                </div>
              ) : (
                <ResultCard result={result} />
              )}

              <div style={{ marginTop: 20, background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ ...helvetica, fontSize: 12, fontWeight: 700, color: T.ch, marginBottom: 12 }}>Quick Reference</div>
                <div style={{ ...helvetica, fontSize: 12.5, color: T.mid, lineHeight: 1.7 }}>
                  <div style={{ marginBottom: 6 }}><strong>Health &amp; Education Cess:</strong> 4% on (tax + surcharge)</div>
                  <div style={{ marginBottom: 6 }}><strong>New Regime 87A:</strong> NIL tax for taxable income ≤ ₹12L; marginal relief applies for income just above ₹12L</div>
                  <div style={{ marginBottom: 6 }}><strong>Old Regime 87A:</strong> Up to ₹12,500 rebate for income ≤ ₹5L; marginal relief applies for income just above ₹5L</div>
                  <div style={{ marginBottom: 6 }}><strong>MAT (Companies):</strong> 15% of book profit — may apply if regular tax is lower</div>
                  <div><strong>AMT (LLP):</strong> 18.5% of adjusted total income — may apply if regular tax is lower</div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ ...helvetica, marginTop: 40, background: '#f9f9f9', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 24px', fontSize: 12.5, color: T.mid, lineHeight: 1.65 }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> This calculator uses Finance Act 2025 rates (FY 2025-26 / AY 2026-27). Rates for FY 2026-27 should be verified against Finance Act 2026. Rebate u/s 87A with marginal relief is computed. Marginal relief on surcharge is not computed. MAT/AMT is not computed (requires book profit/adjusted income figures). This tool is for indicative purposes only — consult a qualified CA for professional advice.
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── RESULT CARD ──────────────────────────────────────────────────────────────

function ResultCard({ result }) {
  const rowStyle = { ...helvetica, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${T.bdr}`, fontSize: 13.5 };
  const totalRowStyle = { ...rowStyle, borderBottom: 'none', paddingTop: 14, marginTop: 4, borderTop: `2px solid ${T.f}`, fontWeight: 700, fontSize: 15 };

  const typeLabel = {
    individual: 'Individual / HUF',
    company: { dom_low: 'Domestic Co. (25%)', dom_high: 'Domestic Co. (30%)', baa: 'Domestic Co. Sec 115BAA', bab: 'New Mfg. Co. Sec 115BAB', foreign: 'Foreign Company' }[result.coType] || 'Company',
    llp: 'LLP / Partnership Firm',
  }[result.type] || result.type;

  return (
    <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ background: T.f, padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ ...helvetica, color: '#fff', fontSize: 14, fontWeight: 600 }}>Tax Computation</div>
        <div style={{ ...helvetica, color: 'rgba(255,255,255,.55)', fontSize: 12 }}>{typeLabel}</div>
      </div>
      <div style={{ padding: '20px 22px' }}>

        <div style={{ marginBottom: 16 }}>
          <div style={rowStyle}><span style={{ color: T.mid }}>Gross Income</span><span style={{ color: T.ch }}>{fmt(result.gross)}</span></div>
          {result.stdDed > 0 && <div style={rowStyle}><span style={{ color: T.mid }}>Less: Standard Deduction</span><span style={{ color: T.ch }}>({fmt(result.stdDed)})</span></div>}
          {result.addlDed > 0 && <div style={rowStyle}><span style={{ color: T.mid }}>Less: Chapter VI-A Deductions</span><span style={{ color: T.ch }}>({fmt(result.addlDed)})</span></div>}
          <div style={rowStyle}><span style={{ fontWeight: 600, color: T.ch }}>Taxable Income</span><span style={{ fontWeight: 600, color: T.ch }}>{fmt(result.taxable)}</span></div>
        </div>

        {result.rows && result.rows.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ ...helvetica, fontSize: 11.5, fontWeight: 700, color: T.lt, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Slab-wise Tax</div>
            {result.rows.map((row, i) => (
              <div key={i} style={{ ...rowStyle, fontSize: 12.5 }}>
                <span style={{ color: T.mid }}>
                  {fmt(row.from)} – {fmt(row.to)} @ {pct(row.rate)}
                </span>
                <span style={{ color: T.ch }}>{fmt(row.tax)}</span>
              </div>
            ))}
            <div style={rowStyle}><span style={{ fontWeight: 600, color: T.ch }}>Tax on total income</span><span style={{ fontWeight: 600, color: T.ch }}>{fmt(result.baseTax)}</span></div>
          </div>
        )}

        {result.type === 'company' && (
          <div style={{ marginBottom: 16 }}>
            <div style={rowStyle}>
              <span style={{ color: T.mid }}>Tax @ {pct(result.rate)}</span>
              <span style={{ color: T.ch }}>{fmt(result.baseTax)}</span>
            </div>
          </div>
        )}

        {result.type === 'llp' && (
          <div style={{ marginBottom: 16 }}>
            <div style={rowStyle}>
              <span style={{ color: T.mid }}>Tax @ 30%</span>
              <span style={{ color: T.ch }}>{fmt(result.baseTax)}</span>
            </div>
          </div>
        )}

        {result.rebate > 0 && (
          <>
            <div style={rowStyle}>
              <span style={{ color: '#2E7D32' }}>
                Less: {result.marginalReliefApplied ? 'Marginal Relief u/s 87A' : 'Rebate u/s 87A'}
              </span>
              <span style={{ color: '#2E7D32' }}>({fmt(result.rebate)})</span>
            </div>
            {result.marginalReliefApplied && (
              <div style={{ ...helvetica, fontSize: 11.5, color: '#4CAF50', padding: '4px 0 10px', lineHeight: 1.65 }}>
                ℹ️ Marginal relief u/s 87A: your tax is capped at the amount by which your income exceeds the ₹{result.taxable > 1200000 ? '12,00,000' : '5,00,000'} rebate threshold, preventing a tax cliff at the boundary.
              </div>
            )}
            <div style={rowStyle}><span style={{ fontWeight: 600, color: T.ch }}>Tax after Rebate / Relief</span><span style={{ fontWeight: 600, color: T.ch }}>{fmt(result.afterRebate)}</span></div>
          </>
        )}

        {result.srchRate > 0 && (
          <div style={rowStyle}>
            <span style={{ color: T.mid }}>Surcharge @ {pct(result.srchRate)}</span>
            <span style={{ color: T.ch }}>{fmt(result.srch)}</span>
          </div>
        )}

        <div style={rowStyle}>
          <span style={{ color: T.mid }}>Health &amp; Education Cess @ 4%</span>
          <span style={{ color: T.ch }}>{fmt(result.cess)}</span>
        </div>

        <div style={totalRowStyle}>
          <span style={{ color: T.f }}>Total Tax Liability</span>
          <span style={{ color: T.f, fontSize: 18 }}>{fmt(result.total)}</span>
        </div>

        <div style={{ marginTop: 16, background: '#f5f5f5', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...helvetica, fontSize: 13, color: T.mid }}>Effective Tax Rate (on gross income)</span>
          <span style={{ ...helvetica, fontSize: 15, fontWeight: 700, color: T.ch }}>{pct(result.effRate)}</span>
        </div>

        {(result.matWarning || result.amtWarning) && (
          <div style={{ ...helvetica, marginTop: 14, background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 8, padding: '12px 14px', fontSize: 12.5, color: '#7A5C1E' }}>
            ⚠️ <strong>{result.matWarning ? 'MAT' : 'AMT'} may apply.</strong> The {result.matWarning ? 'Minimum Alternate Tax (15% of book profit)' : 'Alternate Minimum Tax (18.5% of adjusted total income)'} may result in a higher tax liability. Indicative {result.matWarning ? 'MAT' : 'AMT'}: <strong>{fmt(result.matWarning ? result.matTotal : result.amtTotal)}</strong>. Consult your CA.
          </div>
        )}
      </div>
    </div>
  );
}