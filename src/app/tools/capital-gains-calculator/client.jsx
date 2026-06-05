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

function holdingMonths(purchaseDate, saleDate) {
  if (!purchaseDate || !saleDate) return null;
  const p = new Date(purchaseDate);
  const s = new Date(saleDate);
  if (isNaN(p.getTime()) || isNaN(s.getTime())) return null;
  const months = (s.getFullYear() - p.getFullYear()) * 12 + (s.getMonth() - p.getMonth());
  return months >= 0 ? months : null;
}

function holdingLabel(months) {
  if (months === null) return '—';
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} month${m !== 1 ? 's' : ''}`;
  if (m === 0) return `${y} year${y !== 1 ? 's' : ''}`;
  return `${y} yr ${m} mo`;
}

// Asset type config: { threshold months, stcgRate (null = slab), ltcgRate, ltcgExemption, noIndexation }
const ASSET_CONFIG = {
  equity: {
    label: 'Listed Equity / Equity MF (STT paid)',
    threshold: 12,
    stcgRate: 0.20,
    ltcgRate: 0.125,
    ltcgExemption: 125000,
    indexation: false,
    stcgLabel: '20% (STCG, ≤12 months)',
    ltcgLabel: '12.5% (LTCG, >12 months)',
  },
  property: {
    label: 'Immovable Property (Land / House / Building)',
    threshold: 24,
    stcgRate: null, // slab
    ltcgRate: 0.125,
    ltcgExemption: 0,
    indexation: false,
    stcgLabel: 'Slab Rate (STCG, ≤24 months)',
    ltcgLabel: '12.5% (LTCG, >24 months) — no indexation post-Budget 2024',
  },
  debt: {
    label: 'Debt Mutual Funds (bought after 1 Apr 2023)',
    threshold: null, // always slab
    stcgRate: null,
    ltcgRate: null,
    ltcgExemption: 0,
    indexation: false,
    stcgLabel: 'Slab Rate (no LTCG benefit)',
    ltcgLabel: 'Slab Rate (no LTCG benefit)',
  },
  unlisted: {
    label: 'Unlisted Shares',
    threshold: 24,
    stcgRate: null,
    ltcgRate: 0.125,
    ltcgExemption: 0,
    indexation: false,
    stcgLabel: 'Slab Rate (STCG, ≤24 months)',
    ltcgLabel: '12.5% (LTCG, >24 months)',
  },
  other: {
    label: 'Other Assets (Gold, Bonds, etc.)',
    threshold: 36,
    stcgRate: null,
    ltcgRate: 0.125,
    ltcgExemption: 0,
    indexation: false,
    stcgLabel: 'Slab Rate (STCG, ≤36 months)',
    ltcgLabel: '12.5% (LTCG, >36 months) — indexation removed post-Budget 2024',
  },
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function CapitalGainsCalc() {
  const [assetType, setAssetType] = useState('equity');
  const [resident, setResident] = useState('resident');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [costs, setCosts] = useState('');
  const [result, setResult] = useState(null);

  const cfg = ASSET_CONFIG[assetType];

  function calculate() {
    const pp = parseNum(purchasePrice);
    const sp = parseNum(salePrice);
    const cc = parseNum(costs);

    if (pp <= 0 || sp <= 0) return;

    const months = holdingMonths(purchaseDate, saleDate);
    const netGain = sp - pp - cc;

    let isLTCG = false;
    let taxType = 'slab';
    let taxRate = null;
    let taxAmt = null;
    let exemption = 0;
    let taxableGain = netGain;

    if (assetType === 'debt') {
      // always slab
      isLTCG = false;
      taxType = 'slab';
    } else if (months !== null && cfg.threshold !== null) {
      isLTCG = months > cfg.threshold;
      if (isLTCG) {
        taxRate = cfg.ltcgRate;
        if (taxRate !== null) {
          exemption = Math.min(Math.max(netGain, 0), cfg.ltcgExemption);
          taxableGain = Math.max(netGain - exemption, 0);
          taxAmt = taxableGain * taxRate;
          taxType = 'ltcg';
        } else {
          taxType = 'slab';
        }
      } else {
        taxRate = cfg.stcgRate;
        if (taxRate !== null) {
          taxAmt = Math.max(netGain, 0) * taxRate;
          taxType = 'stcg';
        } else {
          taxType = 'slab';
        }
      }
    }

    setResult({ months, netGain, isLTCG, taxType, taxRate, taxAmt, exemption, taxableGain, pp, sp, cc, assetType });
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
            Budget 2024 Rates · FY 2025-26 / AY 2026-27
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            Capital Gains Tax Calculator
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 620 }}>
            Equity, property, debt MF, unlisted shares &amp; other assets · STCG / LTCG · New Budget 2024 rates
          </p>
        </div>
      </section>

      {/* ── SEO INTRO ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '52px 40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 600, color: T.ch, marginBottom: 20, lineHeight: 1.2 }}>
            India Capital Gains Tax Calculator — LTCG &amp; STCG (Budget 2024 Rates)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Capital gains tax in India underwent significant changes in Budget 2024, making accurate computation more important — and more complex — than ever. Whether you have sold listed equity shares, equity mutual fund units, immovable property, or unlisted shares, the applicable tax rate, holding period threshold, and exemption limit now depend on both the asset type and the date of sale. Errors in classification can lead to material tax underpayment and penalty exposure.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                For listed equity shares and equity mutual funds (where STT is paid), Short-Term Capital Gains (STCG) are now taxed at 20% — increased from 15% effective 23 July 2024. Long-Term Capital Gains (LTCG, held more than 12 months) are taxed at 12.5% with an annual exemption of ₹1.25 lakh, up from the earlier ₹1 lakh. Capital losses on equity can be set off against capital gains and carried forward for eight years.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                For immovable property — land, residential houses, commercial buildings — LTCG (held more than 24 months) is taxed at 12.5% without indexation benefit, following Budget 2024's removal of the indexation option for most property sales. STCG on property is taxed at the seller's applicable income tax slab rate. For debt mutual funds purchased after 1 April 2023, all gains are taxed at slab rates regardless of holding period — LTCG treatment is not available.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                This capital gains tax calculator supports five asset classes: listed equity and equity mutual funds, immovable property, debt mutual funds, unlisted shares, and other assets (gold, bonds, foreign securities). It computes the holding period automatically from your purchase and sale dates, classifies the gain as STCG or LTCG, applies the LTCG exemption threshold where applicable, and shows the final tax amount. Built using Finance Act 2024 / 2025 rates by our Ex-Big 4 CA team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section style={{ background: T.stone, padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="tools-calc-grid">

            {/* ── INPUTS ── */}
            <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '32px 28px' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: T.ch, marginBottom: 24 }}>Asset Details</h2>

              {/* Asset type */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Asset Type</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Object.entries(ASSET_CONFIG).map(([key, val]) => (
                    <button key={key} onClick={() => { setAssetType(key); setResult(null); }}
                      style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: `1.5px solid ${assetType === key ? T.f : T.bdr}`, cursor: 'pointer',
                        background: assetType === key ? '#E4F0EB' : '#fff', color: assetType === key ? T.f : T.mid, textAlign: 'left', transition: 'all .15s' }}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resident toggle */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Taxpayer Status</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['resident', 'Resident'], ['nri', 'Non-Resident (NRI)']].map(([v, l]) => (
                    <button key={v} onClick={() => { setResident(v); setResult(null); }}
                      style={{ flex: 1, padding: '9px 12px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                        border: `1.5px solid ${resident === v ? T.f : T.bdr}`, cursor: 'pointer',
                        background: resident === v ? '#E4F0EB' : '#fff', color: resident === v ? T.f : T.mid }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
                <div>
                  <label style={labelStyle}>Purchase / Acquisition Date</label>
                  <input type="date" value={purchaseDate} onChange={e => { setPurchaseDate(e.target.value); setResult(null); }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Sale / Transfer Date</label>
                  <input type="date" value={saleDate} onChange={e => { setSaleDate(e.target.value); setResult(null); }} style={inputStyle} />
                </div>
              </div>

              {/* Prices */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
                <div>
                  <label style={labelStyle}>Purchase Price (₹)</label>
                  <input type="text" placeholder="e.g. 500000" value={purchasePrice} onChange={e => { setPurchasePrice(e.target.value); setResult(null); }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Sale Price (₹)</label>
                  <input type="text" placeholder="e.g. 800000" value={salePrice} onChange={e => { setSalePrice(e.target.value); setResult(null); }} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Brokerage / Transfer Costs (₹) <span style={{ fontWeight: 400, color: T.lt }}>optional</span></label>
                <input type="text" placeholder="e.g. 5000" value={costs} onChange={e => { setCosts(e.target.value); setResult(null); }} style={inputStyle} />
              </div>

              {/* Property note */}
              {assetType === 'property' && (
                <div style={{ marginBottom: 18, background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 8, padding: '12px 14px', fontSize: 12.5, color: '#7A5C1E' }}>
                  <strong>Budget 2024 Change:</strong> Indexation benefit has been removed for property acquired on or after 23 July 2024. LTCG is taxable at 12.5% without indexation. Property acquired before 23 July 2024 may have options — consult a CA.
                </div>
              )}
              {assetType === 'debt' && (
                <div style={{ marginBottom: 18, background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 8, padding: '12px 14px', fontSize: 12.5, color: '#7A5C1E' }}>
                  <strong>Post 1 Apr 2023:</strong> Debt MF purchased on/after 1 April 2023 are taxed at slab rate regardless of holding period. No LTCG benefit available.
                </div>
              )}

              <button onClick={calculate}
                style={{ width: '100%', padding: '13px', fontSize: 14, fontWeight: 700, background: T.f, color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>
                Calculate Capital Gains →
              </button>
            </div>

            {/* ── RESULTS ── */}
            <div>
              {!result ? (
                <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '48px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>📊</div>
                  <div style={{ fontSize: 15, color: T.mid }}>Fill in asset details and click<br /><strong style={{ color: T.ch }}>"Calculate Capital Gains"</strong></div>
                </div>
              ) : (
                <CGResult result={result} cfg={ASSET_CONFIG[result.assetType]} />
              )}

              {/* Quick rates reference */}
              <div style={{ marginTop: 20, background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ch, marginBottom: 12 }}>Budget 2024 Capital Gains Rates</div>
                {Object.values(ASSET_CONFIG).map(c => (
                  <div key={c.label} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${T.bdr}` }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{c.label}</div>
                    <div style={{ fontSize: 11.5, color: T.mid, marginTop: 2 }}>STCG: {c.stcgLabel}</div>
                    <div style={{ fontSize: 11.5, color: T.mid }}>LTCG: {c.ltcgLabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 24px', fontSize: 12.5, color: T.mid, lineHeight: 1.65 }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> This calculator uses Budget 2024 / Finance Act 2024 rates for FY 2025-26. Surcharge (10%–37% for individuals) and Health &amp; Education Cess @ 4% are additional. Indexation has been removed for property and other assets post-Budget 2024; consult a CA for transitional provisions. NRI rates may differ. Section 54/54EC/54F exemptions for property reinvestment are not reflected. Always consult a qualified CA.
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── RESULT CARD ─────────────────────────────────────────────────────────────

function CGResult({ result, cfg }) {
  const { months, netGain, isLTCG, taxType, taxRate, taxAmt, exemption, taxableGain, pp, sp, cc } = result;
  const row = (label, val, highlight) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${T.bdr}`, fontSize: 13.5 }}>
      <span style={{ color: highlight ? T.ch : T.mid, fontWeight: highlight ? 600 : 400 }}>{label}</span>
      <span style={{ color: highlight ? T.f : T.ch, fontWeight: highlight ? 700 : 500 }}>{val}</span>
    </div>
  );

  const typeLabel = taxType === 'ltcg' ? 'Long-Term Capital Gain (LTCG)'
    : taxType === 'stcg' ? 'Short-Term Capital Gain (STCG)'
    : 'Taxable as per Slab Rate';

  const thresholdText = cfg.threshold ? `Threshold: ${cfg.threshold} months` : 'No threshold — always slab rate';

  return (
    <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ background: T.f, padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Capital Gains Computation</div>
        <div style={{ color: 'rgba(255,255,255,.55)', fontSize: 12 }}>FY 2025-26</div>
      </div>
      <div style={{ padding: '20px 22px' }}>

        {/* Holding period */}
        <div style={{ background: T.stone, borderRadius: 10, padding: '14px 16px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.lt, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Holding Period</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.ch }}>{holdingLabel(months)}</div>
            <div style={{ fontSize: 11.5, color: T.mid, marginTop: 2 }}>{thresholdText}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700,
              background: taxType === 'ltcg' ? '#E4F0EB' : taxType === 'stcg' ? '#FFF0E0' : '#F0F0F0',
              color: taxType === 'ltcg' ? T.f : taxType === 'stcg' ? '#8A5500' : T.mid }}>
              {typeLabel}
            </div>
          </div>
        </div>

        {/* Gain computation */}
        {row('Sale Price', fmt(sp))}
        {row('Less: Purchase Price', `(${fmt(pp)})`)}
        {cc > 0 && row('Less: Transfer Costs', `(${fmt(cc)})`)}
        {row('Net Capital Gain / (Loss)', fmt(netGain), true)}

        {/* Exemption */}
        {exemption > 0 && (
          <>
            {row('Less: LTCG Exemption u/s 112A (up to ₹1.25 lakh/yr)', `(${fmt(exemption)})`)}
            {row('Taxable LTCG', fmt(taxableGain), true)}
          </>
        )}

        {/* Tax */}
        <div style={{ marginTop: 16 }}>
          {taxAmt !== null && taxAmt !== undefined ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#E4F0EB', borderRadius: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.ch }}>
                    Tax @ {taxRate ? (taxRate * 100).toFixed(1) + '%' : 'Slab'}
                  </div>
                  <div style={{ fontSize: 11.5, color: T.mid, marginTop: 2 }}>Before surcharge &amp; cess</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.f }}>{fmt(taxAmt)}</div>
              </div>
              <div style={{ fontSize: 12, color: T.mid, padding: '8px 0', lineHeight: 1.6 }}>
                + Surcharge (10%–25% based on total income) + Health &amp; Education Cess @ 4% on (tax + surcharge) — not included above.
              </div>
            </>
          ) : (
            <div style={{ padding: '16px', background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 10 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#7A5C1E', marginBottom: 4 }}>Taxable at Slab Rate</div>
              <div style={{ fontSize: 12.5, color: '#7A5C1E', lineHeight: 1.6 }}>
                This gain ({fmt(netGain)}) is added to your total income and taxed as per your applicable income tax slab rate. New regime: up to 30%; Old regime: up to 30%. Plus surcharge and 4% cess.
              </div>
            </div>
          )}
        </div>

        {netGain < 0 && (
          <div style={{ marginTop: 14, background: '#F0F8F3', border: `1px solid #C3DFD0`, borderRadius: 8, padding: '12px 14px', fontSize: 12.5, color: T.f }}>
            <strong>Capital Loss:</strong> {fmt(Math.abs(netGain))} — Long-term losses can be set off against LTCG only. Short-term losses can be set off against both STCG and LTCG. Unabsorbed losses can be carried forward for 8 years. File ITR to carry forward losses.
          </div>
        )}
      </div>
    </div>
  );
}
