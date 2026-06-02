'use client';
import { useState } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

// ─── HELPERS ────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function parseNum(str) {
  return parseFloat(String(str).replace(/[^0-9.]/g, '')) || 0;
}

const NEW_SLABS = [
  { from: 0,        to: 400000,   rate: 0    },
  { from: 400000,   to: 800000,   rate: 0.05 },
  { from: 800000,   to: 1200000,  rate: 0.10 },
  { from: 1200000,  to: 1600000,  rate: 0.15 },
  { from: 1600000,  to: 2000000,  rate: 0.20 },
  { from: 2000000,  to: 2400000,  rate: 0.25 },
  { from: 2400000,  to: Infinity, rate: 0.30 },
];

const OLD_SLABS = [
  { from: 0,        to: 250000,   rate: 0    },
  { from: 250000,   to: 500000,   rate: 0.05 },
  { from: 500000,   to: 1000000,  rate: 0.20 },
  { from: 1000000,  to: Infinity, rate: 0.30 },
];

function slabTax(income, slabs) {
  let total = 0;
  for (const s of slabs) {
    if (income <= s.from) break;
    const upper = s.to === Infinity ? income : Math.min(income, s.to);
    total += (upper - s.from) * s.rate;
  }
  return total;
}

function computeIncomeTax(taxableIncome, regime, resident, employeePF) {
  let deductions = 0;
  let stdDed = 0;

  if (regime === 'new') {
    stdDed = 75000;
    const taxable = Math.max(0, taxableIncome - stdDed);
    let base = slabTax(taxable, NEW_SLABS);
    // 87A rebate: NIL if taxable ≤ ₹12L
    const rebate = taxable <= 1200000 ? Math.min(base, 60000) : 0;
    const afterRebate = Math.max(0, base - rebate);
    return afterRebate * 1.04; // +4% cess
  } else {
    stdDed = 50000;
    const pf80C = Math.min(employeePF, 150000);
    deductions = pf80C;
    const taxable = Math.max(0, taxableIncome - stdDed - deductions);
    let base = slabTax(taxable, OLD_SLABS);
    const rebate = taxable <= 500000 ? Math.min(base, 12500) : 0;
    const afterRebate = Math.max(0, base - rebate);
    return afterRebate * 1.04;
  }
}

const PT_MAP = {
  none: { label: 'None', annual: 0 },
  mh:   { label: 'Maharashtra — ₹2,400/yr', annual: 2400 },
  ka:   { label: 'Karnataka — ₹2,400/yr', annual: 2400 },
  wb:   { label: 'West Bengal — ₹2,400/yr', annual: 2400 },
  ts:   { label: 'Telangana — ₹2,400/yr', annual: 2400 },
  ap:   { label: 'Andhra Pradesh — ₹2,400/yr', annual: 2400 },
  other: { label: 'Other State — ₹2,400/yr', annual: 2400 },
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function PayrollCalculator() {
  const [ctc, setCtc] = useState('');
  const [basicPct, setBasicPct] = useState(40);
  const [hraPct, setHraPct] = useState(50);
  const [cityType, setCityType] = useState('metro');
  const [rentPaid, setRentPaid] = useState('');
  const [regime, setRegime] = useState('new');
  const [ptState, setPtState] = useState('none');
  const [result, setResult] = useState(null);

  function calculate() {
    const annualCTC = parseNum(ctc);
    if (annualCTC <= 0) return;

    // ── CTC BREAKDOWN ────────────────────────────────────────────────────
    const basicAnnual = annualCTC * (basicPct / 100);
    const hraAnnual = basicAnnual * (hraPct / 100);

    // Employer PF: 12% of basic, max ₹21,600/yr
    const employerPF = Math.min(basicAnnual * 0.12, 21600);
    // Gratuity: 4.81% of basic
    const gratuity = basicAnnual * 0.0481;

    // Gross Salary = CTC - employer PF - gratuity
    const grossAnnual = annualCTC - employerPF - gratuity;
    const grossMonthly = grossAnnual / 12;

    // Special allowance = Gross - Basic - HRA
    const specialAllowance = grossAnnual - basicAnnual - hraAnnual;

    // ── DEDUCTIONS ───────────────────────────────────────────────────────
    // Employee PF: 12% of basic, max ₹21,600/yr
    const employeePF = Math.min(basicAnnual * 0.12, 21600);

    // ESI: 0.75% of gross if gross monthly ≤ ₹21,000
    const esiApplicable = grossMonthly <= 21000;
    const esiEmployee = esiApplicable ? grossAnnual * 0.0075 : 0;

    // Professional tax
    const ptAnnual = PT_MAP[ptState].annual;

    // HRA Exemption (old regime only)
    let hraExempt = 0;
    if (regime === 'old') {
      const rentAnnual = parseNum(rentPaid) * 12;
      const metroLimit = cityType === 'metro' ? basicAnnual * 0.50 : basicAnnual * 0.40;
      const rentMinusBasic10 = Math.max(0, rentAnnual - basicAnnual * 0.10);
      hraExempt = Math.min(hraAnnual, metroLimit, rentMinusBasic10);
    }

    // Taxable income (for income tax)
    // New regime: gross salary (no HRA exemption, no special deductions)
    // Old regime: gross - HRA exempt
    const taxableForIT = regime === 'new' ? grossAnnual : Math.max(0, grossAnnual - hraExempt);
    const incomeTax = computeIncomeTax(taxableForIT, regime, true, employeePF);

    // Total deductions
    const totalDeductions = employeePF + esiEmployee + ptAnnual + incomeTax;

    // Net take-home
    const netAnnual = grossAnnual - totalDeductions;
    const netMonthly = netAnnual / 12;

    setResult({
      annualCTC, basicAnnual, hraAnnual, specialAllowance, employerPF, gratuity,
      grossAnnual, grossMonthly,
      employeePF, esiEmployee, esiApplicable, ptAnnual, incomeTax, hraExempt,
      totalDeductions, netAnnual, netMonthly,
      taxableForIT,
    });
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', fontSize: 14, border: `1.5px solid ${T.bdr}`,
    borderRadius: 8, background: '#fff', color: T.ch, fontFamily: 'inherit', boxSizing: 'border-box',
  };
  const labelStyle = { fontSize: 12.5, fontWeight: 600, color: T.mid, marginBottom: 6, display: 'block' };

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ background: T.f, padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block', textDecoration: 'none' }}>← Back to Tools</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>
            FY 2025-26 · New &amp; Old Tax Regime
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            Payroll Calculator
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 620 }}>
            CTC to Take-Home Salary · India · PF, ESI, Professional Tax &amp; Income Tax
          </p>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section style={{ background: T.stone, padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="tools-calc-grid">

            {/* ── INPUTS ── */}
            <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '32px 28px' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: T.ch, marginBottom: 24 }}>Salary Inputs</h2>

              {/* CTC */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Annual CTC (₹)</label>
                <input type="text" placeholder="e.g. 1200000" value={ctc}
                  onChange={e => { setCtc(e.target.value); setResult(null); }} style={inputStyle} />
              </div>

              {/* Basic % */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Basic Salary as % of CTC: <strong style={{ color: T.ch }}>{basicPct}%</strong></label>
                <input type="range" min="30" max="60" step="5" value={basicPct}
                  onChange={e => { setBasicPct(Number(e.target.value)); setResult(null); }}
                  style={{ width: '100%', accentColor: T.f }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.lt, marginTop: 4 }}>
                  <span>30%</span><span>40% (typical)</span><span>60%</span>
                </div>
              </div>

              {/* HRA % */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>HRA as % of Basic: <strong style={{ color: T.ch }}>{hraPct}%</strong></label>
                <input type="range" min="30" max="60" step="5" value={hraPct}
                  onChange={e => { setHraPct(Number(e.target.value)); setResult(null); }}
                  style={{ width: '100%', accentColor: T.f }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.lt, marginTop: 4 }}>
                  <span>30%</span><span>50% (metro)</span><span>60%</span>
                </div>
              </div>

              {/* City type */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>City Type (for HRA exemption)</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['metro', 'Metro (Delhi/Mumbai/Chennai/Kolkata)'], ['nonmetro', 'Non-Metro']].map(([v, l]) => (
                    <button key={v} onClick={() => { setCityType(v); setResult(null); }}
                      style={{ flex: 1, padding: '9px 10px', fontSize: 12.5, fontWeight: 600, borderRadius: 8,
                        border: `1.5px solid ${cityType === v ? T.f : T.bdr}`, cursor: 'pointer',
                        background: cityType === v ? '#E4F0EB' : '#fff', color: cityType === v ? T.f : T.mid, textAlign: 'center' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rent paid */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Actual Rent Paid / Month (₹) <span style={{ fontWeight: 400, color: T.lt }}>— for HRA exemption in Old Regime</span></label>
                <input type="text" placeholder="e.g. 25000" value={rentPaid}
                  onChange={e => { setRentPaid(e.target.value); setResult(null); }} style={inputStyle} />
              </div>

              {/* Tax regime */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Tax Regime</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['new', 'New Regime (Default FY 2025-26)'], ['old', 'Old Regime']].map(([v, l]) => (
                    <button key={v} onClick={() => { setRegime(v); setResult(null); }}
                      style={{ flex: 1, padding: '9px 10px', fontSize: 12.5, fontWeight: 600, borderRadius: 8,
                        border: `1.5px solid ${regime === v ? T.f : T.bdr}`, cursor: 'pointer',
                        background: regime === v ? '#E4F0EB' : '#fff', color: regime === v ? T.f : T.mid, textAlign: 'center' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Professional tax */}
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Professional Tax State</label>
                <select value={ptState} onChange={e => { setPtState(e.target.value); setResult(null); }} style={inputStyle}>
                  {Object.entries(PT_MAP).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>

              <button onClick={calculate}
                style={{ width: '100%', padding: '13px', fontSize: 14, fontWeight: 700, background: T.f, color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>
                Calculate Take-Home Salary →
              </button>
            </div>

            {/* ── RESULTS ── */}
            <div>
              {!result ? (
                <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '48px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>💼</div>
                  <div style={{ fontSize: 15, color: T.mid }}>Enter CTC details and click<br /><strong style={{ color: T.ch }}>"Calculate Take-Home Salary"</strong></div>
                </div>
              ) : (
                <PayrollResult result={result} regime={regime} />
              )}
            </div>
          </div>

          <div style={{ marginTop: 40, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 24px', fontSize: 12.5, color: T.mid, lineHeight: 1.65 }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> This calculator provides indicative take-home salary estimates. Actual payroll depends on your employer's salary structure, applicable state PT rates, actual PF wages, ESI applicability, and tax planning. Income tax computation here uses standard deduction and PF (80C) only — other deductions (HRA, 80D, home loan, etc.) are not fully modelled. Surcharge and cess are included in income tax estimate. Consult your HR department or a qualified CA for exact figures.
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── RESULT CARD ─────────────────────────────────────────────────────────────

function PayrollResult({ result, regime }) {
  const {
    annualCTC, basicAnnual, hraAnnual, specialAllowance, employerPF, gratuity,
    grossAnnual, grossMonthly,
    employeePF, esiEmployee, esiApplicable, ptAnnual, incomeTax, hraExempt,
    totalDeductions, netAnnual, netMonthly,
  } = result;

  const tableRow = (label, annual, note) => (
    <tr style={{ borderBottom: `1px solid ${T.bdr}` }}>
      <td style={{ padding: '9px 14px', fontSize: 13, color: T.mid }}>{label}{note && <div style={{ fontSize: 11, color: T.lt, marginTop: 2 }}>{note}</div>}</td>
      <td style={{ padding: '9px 14px', fontSize: 13, fontWeight: 500, color: T.ch, textAlign: 'right' }}>{fmt(annual)}</td>
      <td style={{ padding: '9px 14px', fontSize: 13, color: T.mid, textAlign: 'right' }}>{fmt(annual / 12)}</td>
    </tr>
  );

  const pct = annualCTC > 0 ? Math.round((netAnnual / annualCTC) * 100) : 0;
  const components = [
    { label: 'Basic', val: basicAnnual, color: '#4CAF50' },
    { label: 'HRA', val: hraAnnual, color: '#2196F3' },
    { label: 'Special', val: Math.max(specialAllowance, 0), color: '#FF9800' },
    { label: 'Empl. PF', val: employerPF, color: '#9C27B0' },
    { label: 'Gratuity', val: gratuity, color: '#F44336' },
  ];
  const totalBar = components.reduce((s, c) => s + c.val, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Take-home highlight */}
      <div style={{ background: T.f, borderRadius: 16, padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Net Take-Home (Monthly)</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>{fmt(netMonthly)}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>{fmt(netAnnual)} / year · {pct}% of CTC</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>Gross Monthly</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>{fmt(grossMonthly)}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 4 }}>Gross Annual: {fmt(grossAnnual)}</div>
        </div>
      </div>

      {/* CTC Breakdown */}
      <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ background: '#F5F9F7', padding: '12px 16px', borderBottom: `1px solid ${T.bdr}` }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.ch }}>CTC Breakdown</span>
          <span style={{ float: 'right', fontSize: 12, color: T.lt }}>Annual &nbsp;|&nbsp; Monthly</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: T.stone }}>
              <th style={{ padding: '8px 14px', fontSize: 11.5, fontWeight: 700, color: T.lt, textAlign: 'left', textTransform: 'uppercase', letterSpacing: 0.8 }}>Component</th>
              <th style={{ padding: '8px 14px', fontSize: 11.5, fontWeight: 700, color: T.lt, textAlign: 'right', textTransform: 'uppercase', letterSpacing: 0.8 }}>Annual</th>
              <th style={{ padding: '8px 14px', fontSize: 11.5, fontWeight: 700, color: T.lt, textAlign: 'right', textTransform: 'uppercase', letterSpacing: 0.8 }}>Monthly</th>
            </tr>
          </thead>
          <tbody>
            {tableRow('Basic Salary', basicAnnual)}
            {tableRow('HRA (House Rent Allowance)', hraAnnual)}
            {tableRow('Special Allowance', Math.max(specialAllowance, 0), 'CTC − Basic − HRA − Employer PF − Gratuity')}
            {tableRow('Employer PF', employerPF, '12% of Basic, max ₹21,600/yr')}
            {tableRow('Gratuity (employer)', gratuity, '4.81% of Basic')}
            <tr style={{ background: '#F5F9F7', borderTop: `2px solid ${T.f}` }}>
              <td style={{ padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: T.ch }}>Gross Salary</td>
              <td style={{ padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: T.f, textAlign: 'right' }}>{fmt(grossAnnual)}</td>
              <td style={{ padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: T.f, textAlign: 'right' }}>{fmt(grossMonthly)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deductions */}
      <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ background: '#F5F9F7', padding: '12px 16px', borderBottom: `1px solid ${T.bdr}` }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.ch }}>Deductions</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {tableRow('Employee PF', employeePF, '12% of Basic, max ₹21,600/yr')}
            {esiApplicable
              ? tableRow('ESI (Employee)', esiEmployee, '0.75% of Gross — applicable (gross ≤ ₹21,000/month)')
              : <tr style={{ borderBottom: `1px solid ${T.bdr}` }}>
                  <td style={{ padding: '9px 14px', fontSize: 13, color: T.lt }}>ESI (Employee)<div style={{ fontSize: 11, marginTop: 2 }}>Not applicable — gross monthly &gt; ₹21,000</div></td>
                  <td style={{ padding: '9px 14px', fontSize: 13, color: T.lt, textAlign: 'right' }}>N/A</td>
                  <td style={{ padding: '9px 14px', fontSize: 13, color: T.lt, textAlign: 'right' }}>N/A</td>
                </tr>
            }
            {tableRow('Professional Tax', ptAnnual)}
            {regime === 'old' && hraExempt > 0 && (
              <tr style={{ borderBottom: `1px solid ${T.bdr}` }}>
                <td style={{ padding: '9px 14px', fontSize: 13, color: '#2E7D32' }}>HRA Exemption (−ve, reduces taxable income)<div style={{ fontSize: 11, color: '#4CAF50', marginTop: 2 }}>Min of: Actual HRA, Rent − 10% Basic, {hraPct >= 50 ? '50% Basic (metro)' : '40% Basic (non-metro)'}</div></td>
                <td style={{ padding: '9px 14px', fontSize: 13, fontWeight: 500, color: '#2E7D32', textAlign: 'right' }}>({fmt(hraExempt)})</td>
                <td style={{ padding: '9px 14px', fontSize: 13, color: '#2E7D32', textAlign: 'right' }}>({fmt(hraExempt / 12)})</td>
              </tr>
            )}
            {tableRow('Income Tax (incl. 4% cess)', incomeTax, `${regime === 'new' ? 'New Regime, std. ded. ₹75,000' : 'Old Regime, std. ded. ₹50,000, 80C ₹' + Math.round(Math.min(employeePF, 150000)).toLocaleString('en-IN')}`)}
            <tr style={{ background: '#FFF0F0', borderTop: `2px solid #DC2626` }}>
              <td style={{ padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: '#DC2626' }}>Total Deductions</td>
              <td style={{ padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: '#DC2626', textAlign: 'right' }}>{fmt(totalDeductions)}</td>
              <td style={{ padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: '#DC2626', textAlign: 'right' }}>{fmt(totalDeductions / 12)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual bar */}
      <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '18px 22px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.ch, marginBottom: 14 }}>CTC Composition</div>
        <div style={{ display: 'flex', height: 20, borderRadius: 10, overflow: 'hidden', marginBottom: 14 }}>
          {components.map(c => (
            c.val > 0 && (
              <div key={c.label} title={c.label + ': ' + fmt(c.val)}
                style={{ width: `${(c.val / totalBar) * 100}%`, background: c.color, transition: 'width .3s' }} />
            )
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {components.map(c => (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color, flexShrink: 0 }} />
              <span style={{ color: T.mid }}>{c.label}</span>
              <span style={{ fontWeight: 600, color: T.ch }}>{fmt(c.val / 12)}/mo</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.bdr}`, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ color: T.mid }}>CTC Utilisation (take-home / CTC)</span>
          <span style={{ fontWeight: 700, color: T.ch }}>{pct}%</span>
        </div>
      </div>
    </div>
  );
}
