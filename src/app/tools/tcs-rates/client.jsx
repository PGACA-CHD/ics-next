'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

// ─── TCS DATA — IT Act 1961 section → IT Act 2025 new section ───────────────
// All TCS provisions are under Section 206C of IT Act 1961
// Under IT Act 2025 (in force from 1 Apr 2026): TCS provisions move to Section 394
// f27eq = Nature of collection code used in Form 27EQ (TCS return)
// Rate is uniform (no ind/HUF vs company distinction for TCS)

const TCS = [
  // ── GOODS u/s 206C(1) ─────────────────────────────────────────────────────
  { sec: '206C(1)(i)',    newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CA', collector: 'Seller',              desc: 'Scrap',                                                           threshold: 'Nil',                            rate: '1%',     notes: 'TCS on every sale of scrap. No minimum threshold — applies to all transactions.' },
  { sec: '206C(1)(ii)',   newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CE', collector: 'Seller',              desc: 'Alcoholic liquor for human consumption',                          threshold: 'Nil',                            rate: '1%',     notes: 'Collected by licensed seller of alcoholic liquor from the buyer.' },
  { sec: '206C(1)(iii)',  newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CM', collector: 'Seller',              desc: 'Minerals — coal, lignite, iron ore',                              threshold: 'Nil',                            rate: '1%',     notes: 'Applies to sale of coal, lignite, and iron ore. No threshold.' },
  { sec: '206C(1)(iv)',   newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CI', collector: 'Seller',              desc: 'Tendu leaves',                                                    threshold: 'Nil',                            rate: '5%',     notes: 'Collected by seller of tendu leaves from each buyer. No threshold.' },
  { sec: '206C(1)(v)',    newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CB', collector: 'Seller / Lessee',     desc: 'Timber obtained under a forest lease',                            threshold: 'Nil',                            rate: '2.5%',   notes: 'Collected by lessee at the time of debiting the buyer\'s account or receiving payment, whichever is earlier.' },
  { sec: '206C(1)(vi)',   newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CC', collector: 'Seller',              desc: 'Timber obtained by any mode other than a forest lease',           threshold: 'Nil',                            rate: '2.5%',   notes: 'Applies to all other modes of timber acquisition — auction, private sale, etc.' },
  { sec: '206C(1)(vii)',  newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CD', collector: 'Seller',              desc: 'Any other forest produce (not timber or tendu leaves)',           threshold: 'Nil',                            rate: '2.5%',   notes: 'Covers all forest produce not already covered under other sub-clauses. No threshold.' },
  // ── LEASE / LICENCE u/s 206C(1C) ─────────────────────────────────────────
  { sec: '206C(1C)',      newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CF / 6CG / 6CH', collector: 'Grantor', desc: 'Lease / sub-lease / licence for parking lot, toll plaza, mine or quarry', threshold: 'Nil',                    rate: '2%',     notes: 'TCS at 2% on the amount received or debited. Separate Form 27EQ codes: 6CF = parking lot, 6CG = toll plaza, 6CH = mine / quarry.' },
  // ── MOTOR VEHICLE u/s 206C(1F) ────────────────────────────────────────────
  { sec: '206C(1F)',      newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CJ', collector: 'Seller',              desc: 'Sale of motor vehicle',                                           threshold: '₹10,00,000 per vehicle',         rate: '1%',     notes: 'Applies to every sale of a motor vehicle exceeding ₹10 lakh. Collected by dealer at time of receipt of sale consideration.' },
  // ── FOREIGN REMITTANCE / LRS u/s 206C(1G) ────────────────────────────────
  { sec: '206C(1G)(i)',   newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CK', collector: 'Authorised Dealer',   desc: 'LRS remittance — overseas tour programme package',               threshold: 'Nil (full amount)',               rate: '20%',    notes: 'TCS at 20% on full amount w.e.f. 1 Jul 2023 — no ₹7 lakh threshold exemption for tour packages. Collected by authorised forex dealer.' },
  { sec: '206C(1G)(ii)',  newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CK', collector: 'Authorised Dealer',   desc: 'LRS remittance — education financed by loan from approved financial institution', threshold: '₹7,00,000 per FY (on excess)', rate: '0.5%',   notes: 'Rate 0.5% on amount exceeding ₹7 lakh. Loan must be from a financial institution u/s 80E. Lower rate due to education incentive.' },
  { sec: '206C(1G)(iii)', newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CK', collector: 'Authorised Dealer',   desc: 'LRS remittance — medical treatment or education (not funded by loan)',    threshold: '₹7,00,000 per FY (on excess)', rate: '5%',     notes: 'Rate 5% on LRS amount exceeding ₹7 lakh per FY for medical treatment or self-funded education abroad.' },
  { sec: '206C(1G)(iv)',  newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CK', collector: 'Authorised Dealer',   desc: 'LRS remittance — all other purposes (investments, gifts, maintenance, travel, etc.)', threshold: '₹7,00,000 per FY (on excess)', rate: '20%', notes: 'Rate 20% on aggregate LRS remittance in excess of ₹7 lakh per FY. Does not apply to education / medical / tour packages (covered above).' },
  // ── SALE OF GOODS u/s 206C(1H) ───────────────────────────────────────────
  { sec: '206C(1H)',      newSec: 'Sec. 394',  tableRef: '',                     f27eq: '6CL', collector: 'Seller',              desc: 'Sale of goods — seller with turnover exceeding ₹10 Cr in preceding FY', threshold: '₹50,00,000 per buyer per FY (on excess)', rate: '0.1%', notes: 'Not applicable if TDS u/s 194Q has already been deducted on the same transaction. Seller collects at time of receipt of sale consideration.' },
];

const COLLECTORS = ['All', 'Seller', 'Authorised Dealer', 'Grantor'];

export default function TCSPage() {
  const [q, setQ] = useState('');
  const [collector, setCollector] = useState('All');

  const filtered = useMemo(() => {
    const lq = q.toLowerCase();
    return TCS.filter(r => {
      const matchQ = !lq ||
        r.sec.toLowerCase().includes(lq) ||
        r.newSec.toLowerCase().includes(lq) ||
        r.f27eq.toLowerCase().includes(lq) ||
        r.desc.toLowerCase().includes(lq) ||
        r.notes.toLowerCase().includes(lq) ||
        r.rate.toLowerCase().includes(lq) ||
        r.threshold.toLowerCase().includes(lq) ||
        r.collector.toLowerCase().includes(lq);
      const matchCollector = collector === 'All' || r.collector.includes(collector);
      return matchQ && matchCollector;
    });
  }, [q, collector]);

  const thStyle = { padding: '11px 14px', fontSize: 12, fontWeight: 600, color: T.mid, textAlign: 'left', letterSpacing: 0.2, whiteSpace: 'nowrap', borderBottom: `2px solid ${T.bdr}`, background: T.stone };
  const tdStyle = { padding: '11px 14px', fontSize: 13, color: T.ink, verticalAlign: 'top', borderBottom: `1px solid ${T.bdr}` };

  const heroColor = '#1B4F72';

  const collectorBadge = (c) => {
    const map = {
      'Seller':            { bg: '#E4F0EB', color: T.f },
      'Authorised Dealer': { bg: '#FDE8CC', color: '#8B4F00' },
      'Grantor':           { bg: '#E8EAF0', color: '#3A4066' },
    };
    const base = Object.keys(map).find(k => c.includes(k)) || 'Seller';
    const { bg, color } = map[base] || { bg: T.stone, color: T.mid };
    return <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 12, background: bg, color }}>{c}</span>;
  };

  const newSecCell = (newSec) => (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: '#E8F4EA', color: '#1B5E35', fontFamily: 'monospace', letterSpacing: 0.2, whiteSpace: 'nowrap', display: 'inline-block' }}>{newSec}</span>
  );

  const f27eqCell = (code) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {code.split(' / ').map(c => (
        <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 6, background: '#F5F0E8', color: T.mid, fontFamily: 'monospace', whiteSpace: 'nowrap', display: 'inline-block', width: 'fit-content' }}>{c.trim()}</span>
      ))}
    </div>
  );

  return (
    <div>
      {/* HERO */}
      <section style={{ background: heroColor, padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block' }}>← Back to Tools</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#A3D9B1', fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(163,217,177,.25)', borderRadius: 20 }}>
            IT Act 2025 · FY 2026-27 / AY 2027-28
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            TCS Rate Chart
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 680 }}>
            Tax Collected at Source — all Section 206C sub-sections with old IT Act 1961 section vs new IT Act 2025 section mapping · Form 27EQ codes · FY 2026-27 rates.
          </p>
        </div>
      </section>

      {/* ── SEO INTRO ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '52px 40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 600, color: T.ch, marginBottom: 20, lineHeight: 1.2 }}>
            TCS Rate Chart FY 2026-27 — IT Act 1961 vs IT Act 2025 Section Comparison
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Tax Collected at Source (TCS) is governed by Section 206C of the Income Tax Act 1961, covering a wide range of transactions — from sale of scrap, timber, minerals and alcoholic liquor to lease of parking lots and mines, sale of motor vehicles above ₹10 lakh, and foreign remittances under the Liberalised Remittance Scheme (LRS). Unlike TDS (which is deducted by the payer), TCS is collected by the seller, lessor, or authorised dealer and deposited with the government.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                From 1 April 2026, the Income Tax Act 2025 replaced the IT Act 1961, renumbering TCS provisions from Section 206C to Section 394. Every collector now needs to know both the old section number (used in prior returns and TRACES) and the new IT Act 2025 reference. Section 394 of the IT Act 2025 consolidates all TCS provisions previously under 206C.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Key FY 2026-27 TCS provisions include: LRS remittances for overseas tour packages at 20% on the full amount (no ₹7 lakh threshold); other LRS remittances above ₹7 lakh at 20% (with carve-outs for education and medical at 5% and 0.5%); sale of goods by sellers with turnover exceeding ₹10 crore at 0.1% on amounts over ₹50 lakh per buyer; and sale of motor vehicles above ₹10 lakh at 1%.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                This TCS rate chart covers all major provisions for FY 2026-27 (AY 2027-28), with Form 27EQ nature of collection codes, threshold limits, collector type, and practical compliance notes. For TDS rate reference, see our <Link href="/tools/tds-rates" style={{ color: T.f, textDecoration: 'underline' }}>TDS Rate Chart</Link>. For DTAA treaty withholding tax rates on NR payments, see our <Link href="/tools/dtaa-rate-finder" style={{ color: T.f, textDecoration: 'underline' }}>DTAA Rate Finder</Link>. Built by our Ex-Big 4 CA team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE SECTION */}
      <section style={{ background: T.ivory, padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1500, margin: '0 auto' }}>

          {/* IT Act 2025 mapping banner */}
          <div style={{ marginBottom: 24, background: '#EAF4EE', border: '1px solid #B8D9C4', borderRadius: 12, padding: '14px 20px', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1B5E35' }}>IT Act 2025 Section Map:</span>
            {[
              ['Sec. 394',    'All TCS provisions (old: Section 206C)'],
              ['Sec. 394(1)', 'Goods, lease, motor vehicle (old: 206C(1), 206C(1C), 206C(1F))'],
              ['Sec. 394(2)', 'LRS / overseas remittance (old: 206C(1G))'],
              ['Sec. 394(3)', 'Sale of goods by large seller (old: 206C(1H))'],
              ['Sec. 397(2)', 'Higher rate — no PAN (old: 206CC / 206AA)'],
            ].map(([sec, desc]) => (
              <div key={sec} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: '#1B4F72', color: '#fff', fontFamily: 'monospace' }}>{sec}</span>
                <span style={{ fontSize: 11.5, color: '#1B5E35' }}>{desc}</span>
              </div>
            ))}
          </div>

          {/* Search & filter */}
          <div style={{ display: 'flex', gap: 14, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flexGrow: 1, minWidth: 260 }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: T.lt }}>🔍</span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by section (206C), new section (Sec. 394), Form 27EQ code (6CA), description or keyword…"
                style={{ width: '100%', padding: '10px 14px 10px 38px', fontSize: 14, border: `1.5px solid ${T.bdr}`, borderRadius: 8, background: '#fff', color: T.ch, fontFamily: 'inherit' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {COLLECTORS.map(c => (
                <button key={c} onClick={() => setCollector(c)}
                  style={{ padding: '8px 16px', fontSize: 12.5, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: collector === c ? '#1B4F72' : T.stone, color: collector === c ? '#fff' : T.mid, transition: 'all .15s' }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 12.5, color: T.lt, whiteSpace: 'nowrap' }}>{filtered.length} section{filtered.length !== 1 ? 's' : ''}</div>
          </div>

          {/* Table */}
          <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 110 }}>Old Sec<br />(IT 1961)</th>
                  <th style={{ ...thStyle, width: 100 }}>New Sec<br />(IT 2025)</th>
                  <th style={{ ...thStyle, width: 90 }}>Form 27EQ<br />Code</th>
                  <th style={{ ...thStyle, width: 120 }}>Collector</th>
                  <th style={thStyle}>Nature of Collection</th>
                  <th style={{ ...thStyle, width: 190 }}>Threshold</th>
                  <th style={{ ...thStyle, width: 70 }}>Rate</th>
                  <th style={{ ...thStyle, width: 230 }}>Key Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ ...tdStyle, textAlign: 'center', padding: 40, color: T.lt }}>No matching sections found.</td></tr>
                ) : filtered.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF5' }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: '#1B4F72', fontSize: 13.5 }}>{row.sec}</td>
                    <td style={tdStyle}>{newSecCell(row.newSec)}</td>
                    <td style={tdStyle}>{f27eqCell(row.f27eq)}</td>
                    <td style={tdStyle}>{collectorBadge(row.collector)}</td>
                    <td style={{ ...tdStyle, maxWidth: 240 }}>{row.desc}</td>
                    <td style={{ ...tdStyle, fontSize: 12.5, color: T.mid }}>{row.threshold}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: T.f, fontSize: 15 }}>{row.rate}</td>
                    <td style={{ ...tdStyle, fontSize: 12, color: T.mid, lineHeight: 1.55 }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              ['TCS vs TDS', 'TCS is collected by the seller/lessor from the buyer at the point of transaction. TDS is deducted by the payer before making a payment. Both are deposited via ITNS 281 (TCS under Minor Head 200). If both TCS and TDS apply to the same transaction, typically only one applies — e.g., 206C(1H) TCS is not applicable if 194Q TDS has already been deducted.'],
              ['Higher Rate — No PAN / Aadhaar', 'If the buyer / remitter does not furnish PAN or Aadhaar, TCS must be collected at twice the applicable rate or 5%, whichever is higher, under Sec. 397(2) of IT Act 2025 (old: Sec 206CC of IT Act 1961).'],
              ['LRS TCS — When Collected', 'For LRS remittances (206C(1G)), TCS is collected by the authorised dealer at the time of remittance. The buyer can claim credit for TCS against their income tax liability for the year in which the TCS is collected.'],
              ['TCS Credit for Buyer', 'TCS paid is reflected in Form 26AS of the buyer/remitter and can be claimed as a credit against their income tax liability. Buyers should verify Form 26AS to ensure the TCS is correctly reported.'],
            ].map(([title, text]) => (
              <div key={title} style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ch, marginBottom: 7 }}>{title}</div>
                <p style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '16px 22px', fontSize: 12.5, color: T.mid }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> TCS rates and section references shown are for FY 2026-27 (AY 2027-28) under the Income Tax Act 2025 (in force from 1 April 2026). Section 394 of IT Act 2025 replaces Section 206C of IT Act 1961. Form 27EQ codes are nature of collection codes used in TCS return filing. IT Act 2025 table references for Sec. 394 sub-provisions are subject to official CBDT notification. This table is for reference only. Consult a qualified CA for TCS compliance advice.
          </div>
        </div>
      </section>
    </div>
  );
}
