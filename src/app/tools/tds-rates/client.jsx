'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

// ─── TDS DATA — IT Act 1961 section → IT Act 2025 new section ───────────────
// Rates and thresholds updated for FY 2026-27 (IT Act 2025 in force from 1 Apr 2026)
// newSec = counterpart section under the Income Tax Act 2025
// All domestic 194-series → §393(1); winnings/games → §393(3);
// foreign/NR payments → §393(2); salary → §392

const TDS = [
  // ── SALARY ────────────────────────────────────────────────────────────────
  { sec: '192',     newSec: '§ 392',      cat: 'Resident',     desc: 'Salary',                                                                threshold: 'Taxable limit',                                      indRate: 'Per slab',   othRate: 'Per slab',  notes: 'Deductor estimates total annual income and deducts TDS monthly. No TDS if income is below basic exemption limit.' },
  { sec: '192A',    newSec: '§ 392(7)',   cat: 'Resident',     desc: 'PF withdrawal before 5 years of service',                               threshold: '₹50,000',                                            indRate: '10%',        othRate: '10%',       notes: 'If PAN not furnished: 20%. Fully exempt if withdrawn after 5 years of continuous service.' },
  // ── INTEREST & SECURITIES ─────────────────────────────────────────────────
  { sec: '193',     newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Interest on securities (debentures, listed bonds)',                      threshold: '₹10,000 (listed); ₹5,000 (others)',                  indRate: '10%',        othRate: '10%',       notes: 'No TDS on certain government security interest. All debenture/bond interest above threshold is covered.' },
  { sec: '194',     newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Dividend from domestic company',                                        threshold: '₹10,000',                                            indRate: '10%',        othRate: '10%',       notes: 'Threshold raised from ₹5,000 to ₹10,000 under IT Act 2025. Includes deemed dividend u/s 2(22)(e).' },
  { sec: '194A',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Interest other than on securities — banks, co-op banks, post office',   threshold: '₹1,00,000 (senior citizens); ₹50,000 (others)',      indRate: '10%',        othRate: '10%',       notes: 'Senior citizen threshold raised to ₹1,00,000 p.a. (Budget 2025). General threshold ₹50,000 p.a. per branch.' },
  { sec: '194A',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Interest other than on securities — non-banking (firms, companies)',     threshold: '₹10,000',                                            indRate: '10%',        othRate: '10%',       notes: 'Threshold raised from ₹5,000 to ₹10,000 under IT Act 2025. Applies to co-op societies, companies, firms.' },
  // ── WINNINGS / GAMES ──────────────────────────────────────────────────────
  { sec: '194B',    newSec: '§ 393(3)',   cat: 'Any',          desc: 'Winnings from lottery, crossword puzzle, card games or gambling',        threshold: '₹10,000 per transaction',                            indRate: '30%',        othRate: '30%',       notes: 'Each transaction evaluated independently; no annual aggregation.' },
  { sec: '194BA',   newSec: '§ 393(3)',   cat: 'Any',          desc: 'Winnings from online games',                                            threshold: 'Nil (net winnings at year-end or on withdrawal)',     indRate: '30%',        othRate: '30%',       notes: 'TDS computed on net winnings at end of FY or on each withdrawal, whichever is earlier.' },
  { sec: '194BB',   newSec: '§ 393(3)',   cat: 'Any',          desc: 'Winnings from horse races',                                             threshold: '₹10,000 per transaction',                            indRate: '30%',        othRate: '30%',       notes: 'Applies to licensed bookmakers and race course operators.' },
  // ── CONTRACTS & PROFESSIONAL ──────────────────────────────────────────────
  { sec: '194C',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Payment to contractors / sub-contractors',                              threshold: '₹30,000 (single); ₹1,00,000 (aggregate in FY)',      indRate: '1%',         othRate: '2%',        notes: '1% for individual/HUF payees; 2% for companies/firms. Sub-contractor payments are included.' },
  { sec: '194J(a)', newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Fees for technical services / software royalty / call-centre operators', threshold: '₹50,000',                                           indRate: '2%',         othRate: '2%',        notes: 'Threshold raised from ₹30,000 to ₹50,000 under IT Act 2025. Rate 2% for technical services (not professional).' },
  { sec: '194J(b)', newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Professional services fees / royalties / non-compete fees / director remuneration', threshold: '₹50,000',                              indRate: '10%',        othRate: '10%',       notes: 'Threshold raised from ₹30,000 to ₹50,000 under IT Act 2025. Lawyers, doctors, architects, CAs, directors.' },
  { sec: '194M',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Professional/technical or contractor payments by individual/HUF (not audit-liable)', threshold: '₹50,00,000 in FY',                     indRate: '5%',         othRate: '—',         notes: 'Only for individual/HUF payers not subject to tax audit. Applies when 194C/194J do not.' },
  // ── COMMISSION / BROKERAGE ────────────────────────────────────────────────
  { sec: '194D',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Insurance commission',                                                  threshold: '₹20,000',                                            indRate: '2%',         othRate: '10%',       notes: 'Rate reduced from 5% to 2% for individuals under IT Act 2025 (FY 2026-27). Threshold raised from ₹15,000.' },
  { sec: '194G',    newSec: '§ 393(3)',   cat: 'Resident',     desc: 'Commission on sale of lottery tickets',                                 threshold: '₹20,000',                                            indRate: '2%',         othRate: '2%',        notes: 'Rate reduced from 5% to 2%; threshold raised from ₹15,000 to ₹20,000 under IT Act 2025.' },
  { sec: '194H',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Commission or brokerage (other than insurance)',                        threshold: '₹20,000',                                            indRate: '2%',         othRate: '2%',        notes: 'Rate reduced from 5% to 2%; threshold raised from ₹15,000 to ₹20,000 under IT Act 2025. Excludes 194D.' },
  // ── RENT ──────────────────────────────────────────────────────────────────
  { sec: '194I(a)', newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Rent — Plant, machinery or equipment',                                  threshold: '₹50,000 per month',                                  indRate: '2%',         othRate: '2%',        notes: 'Threshold restructured to ₹50,000/month under IT Act 2025 (was ₹2,40,000/year under IT Act 1961).' },
  { sec: '194I(b)', newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Rent — Land, building, furniture or fittings',                         threshold: '₹50,000 per month',                                  indRate: '10%',        othRate: '10%',       notes: 'Threshold restructured to ₹50,000/month under IT Act 2025 (was ₹2,40,000/year under IT Act 1961).' },
  { sec: '194IB',   newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Rent paid by individual / HUF (not subject to tax audit)',              threshold: '₹50,000 per month',                                  indRate: '2%',         othRate: '—',         notes: 'Rate reduced from 5% to 2% w.e.f. 1 Oct 2024 (Finance Act 2024). Deducted once a year in March. Not applicable to companies.' },
  // ── IMMOVABLE PROPERTY ────────────────────────────────────────────────────
  { sec: '194IA',   newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Payment on transfer of immovable property (buyer deducts)',             threshold: '₹50,00,000',                                         indRate: '1%',         othRate: '1%',        notes: 'Buyer deducts TDS on purchase price. Does not apply to agricultural land in rural areas.' },
  { sec: '194IC',   newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Monetary consideration under Joint Development Agreement (JDA)',        threshold: 'Nil',                                                indRate: '10%',        othRate: '10%',       notes: 'Paid to individual/HUF landowner. Part of JDA where landowner receives cash/monetary consideration.' },
  { sec: '194LA',   newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Compensation on compulsory acquisition of immovable property',         threshold: '₹5,00,000',                                          indRate: '10%',        othRate: '10%',       notes: 'Threshold raised from ₹2,50,000 to ₹5,00,000 under IT Act 2025. Exempt: agricultural land in rural areas.' },
  // ── INSURANCE / SAVINGS SCHEMES ───────────────────────────────────────────
  { sec: '194DA',   newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Payment on maturity of life insurance policy (taxable portion)',        threshold: '₹1,00,000',                                          indRate: '2%',         othRate: '2%',        notes: 'Rate reduced from 5% to 2% under IT Act 2025. TDS on income (difference) component, not entire proceeds.' },
  { sec: '194EE',   newSec: '§ 393(3)',   cat: 'Resident',     desc: 'Payments from National Savings Scheme (NSS) on withdrawal',            threshold: '₹2,500',                                             indRate: '10%',        othRate: '10%',       notes: 'Applies to NSS deposits under Section 80CCA.' },
  // ── MUTUAL FUNDS / SECURITIES ─────────────────────────────────────────────
  { sec: '194K',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Dividend income from mutual fund units',                               threshold: '₹10,000',                                            indRate: '10%',        othRate: '10%',       notes: 'Threshold raised from ₹5,000 to ₹10,000 under IT Act 2025.' },
  // ── PARTNER PAYMENTS ──────────────────────────────────────────────────────
  { sec: '194T',    newSec: '§ 393(3)',   cat: 'Resident',     desc: 'Payments by partnership firm / LLP to partners (salary, remuneration, interest, bonus, commission)', threshold: '₹20,000 per year', indRate: '10%',        othRate: '10%',       notes: 'NEW — Finance Act 2025, effective 1 April 2025. PAN mandatory; 20% if PAN not furnished (§ 397(2) / old Sec 206AA).' },
  // ── E-COMMERCE / GOODS / BENEFITS ─────────────────────────────────────────
  { sec: '194O',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Payments to e-commerce participants through digital platform',         threshold: '₹5,00,000 (individual/HUF only)',                     indRate: '0.1%',       othRate: '0.1%',      notes: 'Rate reduced from 1% to 0.1% under IT Act 2025. Nil threshold for companies/firms. Operator deducts.' },
  { sec: '194P',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'TDS by specified bank for senior citizens aged 75+ (ITR-exempt cases)',  threshold: 'Income above basic exemption limit',                 indRate: 'Slab rate',  othRate: '—',         notes: 'Finance Act 2021. Senior citizen (75+) with only pension + interest from the same bank — bank computes tax; no ITR required.' },
  { sec: '194Q',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Purchase of goods (buyer with turnover > ₹10 Cr deducts)',             threshold: '₹50,00,000 per seller per FY',                       indRate: '0.1%',       othRate: '0.1%',      notes: 'Not applicable if TCS u/s 206C(1H) or TDS u/s 194O already applies to the same transaction.' },
  { sec: '194R',    newSec: '§ 393(1)',   cat: 'Resident',     desc: 'Benefit or perquisite arising from business or profession',            threshold: '₹20,000 per recipient per FY',                       indRate: '10%',        othRate: '10%',       notes: 'If benefit is in kind, payer must bear the TDS or ensure deductee pays before benefit is released.' },
  // ── VIRTUAL DIGITAL ASSETS ────────────────────────────────────────────────
  { sec: '194S',    newSec: '§ 393(1)',   cat: 'Any',          desc: 'Payment for Virtual Digital Assets (crypto, NFTs, etc.)',              threshold: '₹10,000 (specified persons); ₹50,000 (others)',       indRate: '1%',         othRate: '1%',        notes: '"Specified persons" = those with business turnover > ₹1 Cr or professional receipts > ₹50L.' },
  // ── CASH WITHDRAWALS ──────────────────────────────────────────────────────
  { sec: '194N',    newSec: '§ 393(3)',   cat: 'Any',          desc: 'Cash withdrawal from bank / post office / co-op bank',                 threshold: '₹3 Cr (co-op society, ITR filer); ₹1 Cr (others, ITR filer); ₹20 lakh (non-filer)', indRate: '2%/5%', othRate: '2%/5%', notes: '2% for ITR filers (on excess); 5% for non-filers (on excess over ₹20L). Co-op society threshold raised to ₹3 Cr under IT Act 2025.' },
  // ── NON-RESIDENT (FOREIGN) PAYMENTS ──────────────────────────────────────
  { sec: '194E',    newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'Payment to non-resident sportsman / sports association / entertainer',  threshold: 'Nil',                                                indRate: '20%',        othRate: '20%',       notes: 'Plus applicable surcharge and 4% H&E Cess.' },
  { sec: '194LB',   newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'Interest on infrastructure bonds to non-resident / foreign company',   threshold: 'Nil',                                                indRate: '5%',         othRate: '5%',        notes: 'Plus surcharge and cess. Issued by infrastructure debt fund.' },
  { sec: '194LC',   newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'Interest on ECB / long-term bonds in foreign currency',                threshold: 'Nil',                                                indRate: '4%',         othRate: '4%',        notes: 'Reduced rate; subject to conditions on issue date and purpose. Plus surcharge and cess.' },
  { sec: '194LD',   newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'Interest on government securities / rupee-denominated bonds (FPI)',    threshold: 'Nil',                                                indRate: '5%',         othRate: '5%',        notes: 'Applies to Foreign Portfolio Investors. Plus surcharge and cess.' },
  { sec: '195',     newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'All payments / remittances to non-residents (various income types)',   threshold: 'Nil (if income is chargeable to tax in India)',       indRate: '30%+',       othRate: '40%+',      notes: 'Rate varies by income type. DTAA may provide lower rate — requires Form 10F + Tax Residency Certificate.' },
  { sec: '196A',    newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'Income from units of mutual fund / UTI to non-resident',              threshold: 'Nil',                                                indRate: '20%',        othRate: '20%',       notes: 'Plus surcharge and cess.' },
  { sec: '196B',    newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'Income (incl. LTCG) from units of offshore funds',                    threshold: 'Nil',                                                indRate: '10%',        othRate: '10%',       notes: 'Plus surcharge and cess.' },
  { sec: '196C',    newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'Income from foreign currency bonds / GDR / shares (incl. LTCG/STCG)', threshold: 'Nil',                                               indRate: '20%',        othRate: '20%',       notes: 'Plus surcharge and cess.' },
  { sec: '196D',    newSec: '§ 393(2)',   cat: 'Non-Resident', desc: 'Income of Foreign Portfolio Investor (FPI) from securities',          threshold: 'Nil',                                                indRate: '20%',        othRate: '20%',       notes: 'Excludes LTCG/STCG under § 287 / § 283 (old 112A/111A). Plus surcharge and cess.' },
];

const CATS = ['All', 'Resident', 'Non-Resident', 'Any'];

export default function Page() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = useMemo(() => {
    const lq = q.toLowerCase();
    return TDS.filter(r => {
      const matchQ = !lq ||
        r.sec.toLowerCase().includes(lq) ||
        r.newSec.toLowerCase().includes(lq) ||
        r.desc.toLowerCase().includes(lq) ||
        r.notes.toLowerCase().includes(lq) ||
        r.indRate.toLowerCase().includes(lq) ||
        r.threshold.toLowerCase().includes(lq);
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

  const newSecBadge = (ns) => (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: '#E8ECF5', color: '#2C3E6B', fontFamily: 'monospace', letterSpacing: 0.2, whiteSpace: 'nowrap' }}>{ns}</span>
  );

  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#2C3E6B', padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block' }}>← Back to Tools</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#90CAF9', fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(144,202,249,.25)', borderRadius: 20 }}>
            IT Act 2025 · FY 2026-27 / AY 2027-28
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            TDS Rate Chart
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 680 }}>
            All major TDS sections with old section (IT Act 1961) vs new section (IT Act 2025) comparison · FY 2026-27 rates · Searchable and filterable.
          </p>
        </div>
      </section>

      {/* ── SEO INTRO ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '52px 40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 600, color: T.ch, marginBottom: 20, lineHeight: 1.2 }}>
            TDS Rate Chart FY 2026-27 — IT Act 1961 vs IT Act 2025 Section Comparison
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Tax Deducted at Source (TDS) is one of the most operationally demanding aspects of India tax compliance. From 1 April 2026, the Income Tax Act 2025 replaced the Income Tax Act 1961, consolidating all TDS provisions under new section numbers — primarily Section 392 (salary), Section 393 (other payments), and Section 394 (TCS). Every deductor now needs to know both the old section number (used in historical returns and references) and the new IT Act 2025 section number (used in current filings).
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                The IT Act 2025 also rationalised several TDS rates: commission and brokerage (Sections 194D, 194G, 194H) dropped from 5% to 2%; life insurance policy maturity payments (194DA) dropped from 5% to 2%; e-commerce operator payments (194O) dropped from 1% to 0.1%; and threshold limits for professional fees (194J), dividend income (194), and mutual fund income (194K) were raised to ₹50,000 and ₹10,000 respectively.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                This TDS rate chart covers all major sections for FY 2026-27 (AY 2027-28), displaying both the old IT Act 1961 section number and the corresponding new IT Act 2025 section number side by side. Key features include: separate columns for Individual/HUF and Company/Other rates, updated threshold limits for FY 2026-27, and practical notes on rule changes, higher-rate triggers (no PAN), and Form 15G/15H applicability. The chart also includes Section 194T (new Finance Act 2025 section covering firm-to-partner payments) and Section 194P (senior citizen ITR exemption cases).
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                For cross-border payments under Section 195 (§ 393(2) under IT Act 2025), the domestic rate is the starting point — DTAA treaty rates can reduce this significantly with a Tax Residency Certificate and Form 10F. Use this chart alongside our DTAA Rate Finder for complete non-resident withholding coverage. Built by our Ex-Big 4 CA team, searchable by old section number, new IT Act 2025 reference, payment type, or keyword.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE SECTION */}
      <section style={{ background: T.ivory, padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* IT Act 2025 section mapping quick-reference banner */}
          <div style={{ marginBottom: 24, background: '#EEF2FA', border: '1px solid #C5D0E8', borderRadius: 12, padding: '14px 20px', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#2C3E6B' }}>IT Act 2025 Section Map:</span>
            {[['§ 392', 'Salary (old: 192)'], ['§ 393(1)', 'Domestic payments (old: 193–194T)'], ['§ 393(2)', 'Foreign / NR payments (old: 194E, 195–196D)'], ['§ 393(3)', 'Winnings, lottery, cash, partner (old: 194B–194T selected)'], ['§ 397(2)', 'Higher rate — no PAN (old: 206AA)']].map(([sec, desc]) => (
              <div key={sec} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: '#2C3E6B', color: '#fff', fontFamily: 'monospace' }}>{sec}</span>
                <span style={{ fontSize: 11.5, color: '#3A4A6B' }}>{desc}</span>
              </div>
            ))}
          </div>

          {/* Search & filter */}
          <div style={{ display: 'flex', gap: 14, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flexGrow: 1, minWidth: 260 }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: T.lt }}>🔍</span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by old section, new section (§393), description or keyword…"
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
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1080 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 90 }}>Old Sec<br />(IT 1961)</th>
                  <th style={{ ...thStyle, width: 100 }}>New Sec<br />(IT 2025)</th>
                  <th style={{ ...thStyle, width: 80 }}>Payee</th>
                  <th style={thStyle}>Nature of Payment</th>
                  <th style={{ ...thStyle, width: 170 }}>Threshold</th>
                  <th style={{ ...thStyle, width: 100 }}>Ind / HUF</th>
                  <th style={{ ...thStyle, width: 100 }}>Co / Other</th>
                  <th style={{ ...thStyle, width: 220 }}>Key Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ ...tdStyle, textAlign: 'center', padding: 40, color: T.lt }}>No matching sections found.</td></tr>
                ) : filtered.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF5' }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: '#2C3E6B', fontSize: 13.5 }}>Sec {row.sec}</td>
                    <td style={{ ...tdStyle }}>{newSecBadge(row.newSec)}</td>
                    <td style={tdStyle}>{catBadge(row.cat)}</td>
                    <td style={{ ...tdStyle, maxWidth: 260 }}>{row.desc}</td>
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
              ['Surcharge & Cess', 'For resident payments, TDS is at base rate (no surcharge/cess). For non-resident payments (§ 393(2) / old Sec 195 onwards), applicable surcharge and 4% H&E Cess are added on top.'],
              ['Higher Rate — No PAN', 'If the deductee does not furnish a PAN, TDS is at the higher of: (a) prescribed rate, or (b) 20% under § 397(2) of IT Act 2025 (old: Sec 206AA of IT Act 1961).'],
              ['Lower Deduction Certificate', 'Deductees can apply to the Assessing Officer for a certificate permitting lower/nil TDS deduction under § 351 of IT Act 2025 (old: Sec 197 of IT Act 1961).'],
              ['Form 15G / 15H', 'Individuals/HUFs can submit Form 15G (below 60 yrs) or Form 15H (senior citizens) to the deductor for nil TDS where income is below the basic taxable limit.'],
              ['IT Act 2025 Rate Cuts (FY 2026-27)', 'Sections 194D, 194G, 194H: rate cut from 5% to 2%. Section 194DA: 5% → 2%. Section 194O: 1% → 0.1%. Section 194J thresholds raised to ₹50,000. New Sec 194T: TDS on firm-to-partner payments.'],
            ].map(([title, text]) => (
              <div key={title} style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ch, marginBottom: 7 }}>{title}</div>
                <p style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '16px 22px', fontSize: 12.5, color: T.mid }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> TDS rates and section references shown are for FY 2026-27 (AY 2027-28) under the Income Tax Act 2025, which came into force from 1 April 2026. New section numbers (§ 392, § 393, § 394) replace the old 192–196D numbering of the IT Act 1961. This table is for reference only. Consult a qualified CA for TDS compliance advice.
          </div>
        </div>
      </section>
    </div>
  );
}
