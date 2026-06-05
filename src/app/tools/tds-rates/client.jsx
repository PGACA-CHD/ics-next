'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

const TDS = [
  { sec: '192',    cat: 'Resident',     desc: 'Salary',                                                               threshold: 'Taxable limit',                    indRate: 'Per slab',    othRate: 'Per slab',  notes: 'Deductor must estimate total income for year. No TDS if income below basic exemption.' },
  { sec: '192A',   cat: 'Resident',     desc: 'PF withdrawal before 5 years of service',                              threshold: '₹50,000',                          indRate: '10%',         othRate: '10%',       notes: 'If PAN not furnished: 20%. Exempt if withdrawn after 5 years.' },
  { sec: '193',    cat: 'Resident',     desc: 'Interest on securities (debentures, listed bonds)',                     threshold: '₹10,000 (listed); ₹5,000 (others)', indRate: '10%',        othRate: '10%',       notes: 'No TDS on interest on government securities in certain cases.' },
  { sec: '194',    cat: 'Resident',     desc: 'Dividend from domestic company',                                       threshold: '₹5,000',                           indRate: '10%',         othRate: '10%',       notes: 'Includes deemed dividend. No TDS on dividends paid to LIC, GIC, etc.' },
  { sec: '194A',   cat: 'Resident',     desc: 'Interest other than on securities (banks)',                            threshold: '₹50,000 (senior citizens); ₹40,000 (others)', indRate: '10%', othRate: '10%', notes: 'Senior citizen threshold ₹50,000 p.a. per bank/branch.' },
  { sec: '194A',   cat: 'Resident',     desc: 'Interest other than on securities (non-banks)',                        threshold: '₹5,000',                           indRate: '10%',         othRate: '10%',       notes: 'Applies to co-op societies, companies, firms etc. paying interest.' },
  { sec: '194B',   cat: 'Any',          desc: 'Winnings from lottery, crossword puzzle, card games or other games',   threshold: '₹10,000 per transaction',          indRate: '30%',         othRate: '30%',       notes: 'No threshold aggregation; each transaction evaluated separately.' },
  { sec: '194BA',  cat: 'Any',          desc: 'Winnings from online games',                                           threshold: 'Nil (net winnings at year-end / withdrawal)', indRate: '30%', othRate: '30%',    notes: 'TDS on net winnings computed at end of year or on withdrawal.' },
  { sec: '194BB',  cat: 'Any',          desc: 'Winnings from horse races',                                            threshold: '₹10,000 per transaction',          indRate: '30%',         othRate: '30%',       notes: 'Applies to licensed bookmakers and race course operators.' },
  { sec: '194C',   cat: 'Resident',     desc: 'Payment to contractors / sub-contractors',                             threshold: '₹30,000 (single); ₹1,00,000 (aggregate in FY)', indRate: '1%', othRate: '2%',  notes: 'Lower 1% for individual/HUF payees. 2% for companies/firms.' },
  { sec: '194D',   cat: 'Resident',     desc: 'Insurance commission',                                                 threshold: '₹15,000',                          indRate: '5%',          othRate: '10%',       notes: 'Applies to commission paid by insurance company to agents.' },
  { sec: '194DA',  cat: 'Resident',     desc: 'Payment on maturity of life insurance policy (taxable portion)',       threshold: '₹1,00,000',                        indRate: '5%',          othRate: '5%',        notes: 'TDS on income (difference) component, not entire proceeds.' },
  { sec: '194E',   cat: 'Non-Resident', desc: 'Payment to non-resident sportsman / sports association / entertainer', threshold: 'Nil',                              indRate: '20%',         othRate: '20%',       notes: 'Plus applicable surcharge and H&E Cess.' },
  { sec: '194EE',  cat: 'Resident',     desc: 'Payments from National Savings Scheme (NSS) on withdrawal',           threshold: '₹2,500',                           indRate: '10%',         othRate: '10%',       notes: '' },
  { sec: '194G',   cat: 'Resident',     desc: 'Commission on sale of lottery tickets',                                threshold: '₹15,000',                          indRate: '5%',          othRate: '5%',        notes: '' },
  { sec: '194H',   cat: 'Resident',     desc: 'Commission or brokerage (other than insurance commission)',            threshold: '₹15,000',                          indRate: '5%',          othRate: '5%',        notes: 'Excludes commission covered under Sec 194D.' },
  { sec: '194I(a)', cat: 'Resident',    desc: 'Rent — Plant, machinery or equipment',                                threshold: '₹2,40,000 per year',               indRate: '2%',          othRate: '2%',        notes: 'Applies to all payers (individual/HUF only if liable to tax audit).' },
  { sec: '194I(b)', cat: 'Resident',    desc: 'Rent — Land, building, furniture or fittings',                        threshold: '₹2,40,000 per year',               indRate: '10%',         othRate: '10%',       notes: 'For residential / commercial property rent paid to resident.' },
  { sec: '194IA',  cat: 'Resident',     desc: 'Payment on transfer of immovable property (buyer deducts)',           threshold: '₹50,00,000',                       indRate: '1%',          othRate: '1%',        notes: 'Buyer deducts TDS. Applies to agricultural land in rural area? No.' },
  { sec: '194IB',  cat: 'Resident',     desc: 'Rent paid by individual / HUF (not subject to tax audit)',            threshold: '₹50,000 per month',                indRate: '5%',          othRate: '—',         notes: 'Deducted once a year (March) or when property is vacated. Not for companies.' },
  { sec: '194IC',  cat: 'Resident',     desc: 'Monetary consideration under Joint Development Agreement (JDA)',       threshold: 'Nil',                              indRate: '10%',         othRate: '10%',       notes: 'Paid to individual / HUF only. Part of JDA where landowner gets consideration.' },
  { sec: '194J(a)', cat: 'Resident',    desc: 'Fees for technical services / royalty for software sale/distribution', threshold: '₹30,000',                         indRate: '2%',          othRate: '2%',        notes: 'Reduced rate of 2% for technical services (not professional). Software royalty: 2%.' },
  { sec: '194J(b)', cat: 'Resident',    desc: 'Professional services fees / royalties / non-compete fees / director remuneration', threshold: '₹30,000',           indRate: '10%',         othRate: '10%',       notes: 'Applies to lawyers, doctors, architects, CAs, etc. Also directors\' non-salary remuneration.' },
  { sec: '194K',   cat: 'Resident',     desc: 'Income from mutual fund units (dividend)',                             threshold: '₹5,000',                           indRate: '10%',         othRate: '10%',       notes: '' },
  { sec: '194LA',  cat: 'Resident',     desc: 'Compensation on compulsory acquisition of immovable property',        threshold: '₹2,50,000',                        indRate: '10%',         othRate: '10%',       notes: 'Exempted: agricultural land in rural area. No TDS on such payments.' },
  { sec: '194LB',  cat: 'Non-Resident', desc: 'Interest income from infrastructure bonds to non-resident / foreign company', threshold: 'Nil',                      indRate: '5%',          othRate: '5%',        notes: 'Plus surcharge and cess.' },
  { sec: '194LC',  cat: 'Non-Resident', desc: 'Interest on ECB / long-term bonds in foreign currency',               threshold: 'Nil',                              indRate: '4%',          othRate: '4%',        notes: 'Reduced rate; subject to conditions. Plus surcharge and cess.' },
  { sec: '194LD',  cat: 'Non-Resident', desc: 'Interest on government securities / rupee-denominated bonds (FPI)',   threshold: 'Nil',                              indRate: '5%',          othRate: '5%',        notes: 'Applies to FPIs. Plus surcharge and cess.' },
  { sec: '194M',   cat: 'Resident',     desc: 'Professional/technical or contractor payments by individual/HUF (not audit-liable)', threshold: '₹50,00,000 in FY', indRate: '5%',         othRate: '—',         notes: 'Only for individual/HUF deductors not subject to tax audit. Sec 194C/194J don\'t apply then.' },
  { sec: '194N',   cat: 'Any',          desc: 'Cash withdrawal from bank / post office / co-op bank',                threshold: '₹1 Cr (ITR filer); ₹20 lakh (non-filer)', indRate: '2%/5%', othRate: '2%/5%',  notes: '2% for ITR filers (on excess over ₹1 Cr); 5% for non-filers (on excess over ₹20 lakh).' },
  { sec: '194O',   cat: 'Resident',     desc: 'Payments to e-commerce participants through digital platform',        threshold: '₹5,00,000 (individual/HUF only)',  indRate: '1%',          othRate: '1%',        notes: 'E-commerce operator deducts. Nil threshold for companies/firms.' },
  { sec: '194Q',   cat: 'Resident',     desc: 'Purchase of goods (buyer with turnover > ₹10 Cr deducts)',           threshold: '₹50,00,000 per seller per FY',     indRate: '0.1%',        othRate: '0.1%',      notes: 'Not applicable if TCS u/s 206C(1H) or TDS u/s 194O applies to the same transaction.' },
  { sec: '194R',   cat: 'Resident',     desc: 'Benefit or perquisite arising from business or profession',          threshold: '₹20,000 per recipient per FY',     indRate: '10%',         othRate: '10%',       notes: 'If benefit is in kind, payer must bear the TDS or ensure deductee pays it.' },
  { sec: '194S',   cat: 'Any',          desc: 'Payment for Virtual Digital Assets (crypto, NFTs, etc.)',             threshold: '₹10,000 (specified persons); ₹50,000 (others)', indRate: '1%', othRate: '1%',  notes: '"Specified persons" = those with turnover > ₹1 Cr (business) or ₹50L (profession).' },
  { sec: '195',    cat: 'Non-Resident', desc: 'All payments / remittances to non-residents (various income types)',  threshold: 'Nil (if income is chargeable to tax)', indRate: '30%+',      othRate: '40%+',      notes: 'Rate varies by income type. DTAA may provide lower rate with Form 10F/Tax Residency Certificate.' },
  { sec: '196A',   cat: 'Non-Resident', desc: 'Income from units of mutual fund / UTI to non-resident',             threshold: 'Nil',                              indRate: '20%',         othRate: '20%',       notes: 'Plus surcharge and cess.' },
  { sec: '196B',   cat: 'Non-Resident', desc: 'Income (incl. LTCG) from units of offshore funds',                   threshold: 'Nil',                              indRate: '10%',         othRate: '10%',       notes: 'Plus surcharge and cess.' },
  { sec: '196C',   cat: 'Non-Resident', desc: 'Income from foreign currency bonds / GDR / shares (incl. LTCG/STCG)', threshold: 'Nil',                            indRate: '20%',         othRate: '20%',       notes: 'Plus surcharge and cess.' },
  { sec: '196D',   cat: 'Non-Resident', desc: 'Income of Foreign Portfolio Investor (FPI) from securities',         threshold: 'Nil',                              indRate: '20%',         othRate: '20%',       notes: 'Excludes LTCG/STCG covered under Sec 112A / 111A. Plus surcharge and cess.' },
];

const CATS = ['All', 'Resident', 'Non-Resident', 'Any'];

export default function Page() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = useMemo(() => {
    const lq = q.toLowerCase();
    return TDS.filter(r => {
      const matchQ = !lq || r.sec.toLowerCase().includes(lq) || r.desc.toLowerCase().includes(lq) || r.notes.toLowerCase().includes(lq) || r.indRate.toLowerCase().includes(lq) || r.threshold.toLowerCase().includes(lq);
      const matchCat = cat === 'All' || r.cat === cat;
      return matchQ && matchCat;
    });
  }, [q, cat]);

  const thStyle = { padding: '11px 14px', fontSize: 12, fontWeight: 600, color: T.mid, textAlign: 'left', letterSpacing: 0.2, whiteSpace: 'nowrap', borderBottom: `2px solid ${T.bdr}`, background: T.stone };
  const tdStyle = { padding: '11px 14px', fontSize: 13, color: T.ink, verticalAlign: 'top', borderBottom: `1px solid ${T.bdr}` };
  const catBadge = (c) => {
    const colors = { Resident: { bg: '#E4F0EB', color: T.f }, 'Non-Resident': { bg: '#FDE8CC', color: '#8B4F00' }, Any: { bg: '#E8EAF0', color: '#3A4066' } }[c] || {};
    return <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 12, background: colors.bg, color: colors.color }}>{c}</span>;
  };

  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#2C3E6B', padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block' }}>← Back to Tools</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#90CAF9', fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(144,202,249,.25)', borderRadius: 20 }}>
            Finance Act 2025 · FY 2026-27
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            TDS Rate Chart
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 680 }}>
            All major TDS sections — 192 to 196D — with threshold limits, individual/HUF rates, company/other rates, and practical notes. Search by section number, payment type, or keyword.
          </p>
        </div>
      </section>

      {/* ── SEO INTRO ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '52px 40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 600, color: T.ch, marginBottom: 20, lineHeight: 1.2 }}>
            TDS Rate Chart FY 2026-27 — All Sections 192 to 196D
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Tax Deducted at Source (TDS) is one of the most operationally demanding aspects of India tax compliance. Under the Income Tax Act, any specified person making a payment above a prescribed threshold — to a resident or non-resident — is required to deduct tax at source, deposit it with the government within the prescribed time, and file quarterly TDS returns. Failure to deduct, short deduction, or late deposit attracts interest at 1–1.5% per month and disqualifies the payer from claiming the expense as a deduction.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                The TDS framework spans over 40 sections, each covering a specific payment category: salaries (Section 192), bank interest (Section 194A), contractor payments (Section 194C), professional fees (Section 194J), rent (Section 194I), e-commerce operator payments (Section 194O), purchase of goods (Section 194Q), crypto and virtual digital assets (Section 194S), and all payments to non-residents (Section 195). Each section has its own threshold, rate, and conditions — with many sections carrying separate rates for Individual/HUF payees versus companies.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                This TDS rate chart covers all major sections from Section 192 to Section 196D for FY 2026-27. Key features include separate columns for Individual/HUF rates versus Company/Other rates, threshold limits above which TDS becomes mandatory, and practical notes on critical rules — including the higher 20% rate under Section 206AA when the deductee's PAN is not furnished, the Form 15G/15H submission process for nil TDS in eligible cases, and the option to obtain a lower deduction certificate from the Assessing Officer under Section 197.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                For cross-border payments to non-residents under Section 195, the domestic TDS rate is the starting point — but applicable DTAA treaty rates can reduce this significantly, provided the non-resident holds a Tax Residency Certificate and files Form 10F. Use this chart alongside our DTAA Rate Finder for a complete picture of non-resident withholding obligations. Built by our Ex-Big 4 CA team, searchable and filterable by section, payee type, or keyword.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE SECTION */}
      <section style={{ background: T.ivory, padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Search & filter */}
          <div style={{ display: 'flex', gap: 14, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flexGrow: 1, minWidth: 260 }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: T.lt }}>🔍</span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by section, description or keyword…"
                style={{ width: '100%', padding: '10px 14px 10px 38px', fontSize: 14, border: `1.5px solid ${T.bdr}`, borderRadius: 8, background: '#fff', color: T.ch, fontFamily: 'inherit' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={{ padding: '8px 16px', fontSize: 12.5, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: cat === c ? '#2C3E6B' : T.stone, color: cat === c ? '#fff' : T.mid, transition: 'all .15s' }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 12.5, color: T.lt, whiteSpace: 'nowrap' }}>{filtered.length} section{filtered.length !== 1 ? 's' : ''}</div>
          </div>

          {/* Table */}
          <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 90 }}>Section</th>
                  <th style={{ ...thStyle, width: 90 }}>Payee</th>
                  <th style={thStyle}>Nature of Payment</th>
                  <th style={{ ...thStyle, width: 180 }}>Threshold</th>
                  <th style={{ ...thStyle, width: 110 }}>Ind / HUF Rate</th>
                  <th style={{ ...thStyle, width: 110 }}>Co / Other Rate</th>
                  <th style={{ ...thStyle, width: 240 }}>Key Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ ...tdStyle, textAlign: 'center', padding: 40, color: T.lt }}>No matching sections found.</td></tr>
                ) : filtered.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF5' }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: '#2C3E6B', fontSize: 13.5 }}>Sec {row.sec}</td>
                    <td style={tdStyle}>{catBadge(row.cat)}</td>
                    <td style={{ ...tdStyle, maxWidth: 280 }}>{row.desc}</td>
                    <td style={{ ...tdStyle, fontSize: 12.5, color: T.mid }}>{row.threshold}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: T.f, fontSize: 14 }}>{row.indRate}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: row.othRate === '—' ? T.lt : '#2C3E6B', fontSize: 14 }}>{row.othRate}</td>
                    <td style={{ ...tdStyle, fontSize: 12, color: T.mid, lineHeight: 1.55 }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              ['Surcharge & Cess', 'For resident payments, TDS is deducted at base rate only (no surcharge/cess). For non-resident payments (Sec 195 onwards), surcharge and 4% H&E Cess are added.'],
              ['Higher Rate — No PAN', 'If deductee does not furnish PAN, TDS is deducted at the higher of: (a) prescribed rate, or (b) 20% (Sec 206AA).'],
              ['Lower Deduction Certificate', 'Deductees can apply to AO for a certificate allowing lower/nil TDS deduction under Sec 197 of the Income Tax Act.'],
              ['Form 15G / 15H', 'Individuals/HUFs can submit Form 15G (below 60) or Form 15H (senior citizens) for nil TDS if income is below taxable limit.'],
            ].map(([title, text]) => (
              <div key={title} style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ch, marginBottom: 7 }}>{title}</div>
                <p style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '16px 22px', fontSize: 12.5, color: T.mid }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> TDS rates shown are as per Finance Act 2025 (FY 2025-26). Rates for FY 2026-27 should be verified against Finance Act 2026. This table is for reference only. Consult a qualified CA for TDS compliance advice.
          </div>
        </div>
      </section>
    </div>
  );
}
