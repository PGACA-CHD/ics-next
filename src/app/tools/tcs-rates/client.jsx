'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

const helvetica = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

// ─── TCS DATA ─────────────────────────────────────────────────────────────────

const TCS = [
  { sec: '206C(1)(i)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 4', f27eq: '6CA', challan: '1073', collector: 'Seller', desc: 'Scrap', threshold: 'Nil', rate: '2%', notes: 'TCS on every sale of scrap. No minimum threshold — applies to all transactions.' },
  { sec: '206C(1)(ii)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 1', f27eq: '6CE', challan: '1068', collector: 'Seller', desc: 'Alcoholic liquor for human consumption', threshold: 'Nil', rate: '2%', notes: 'Collected by licensed seller of alcoholic liquor from the buyer.' },
  { sec: '206C(1)(iii)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 5', f27eq: '6CM', challan: '1074', collector: 'Seller', desc: 'Minerals — coal, lignite, iron ore', threshold: 'Nil', rate: '2%', notes: 'Applies to sale of coal, lignite, and iron ore. No threshold.' },
  { sec: '206C(1)(iv)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 2', f27eq: '6CI', challan: '1069', collector: 'Seller', desc: 'Tendu leaves', threshold: 'Nil', rate: '2%', notes: 'Collected by seller of tendu leaves from each buyer. No threshold.' },
  { sec: '206C(1)(v)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 3', f27eq: '6CB', challan: '1070', collector: 'Seller / Lessee', desc: 'Timber obtained under a forest lease', threshold: 'Nil', rate: '2%', notes: 'Collected by lessee at the time of debiting the buyer\'s account or receiving payment, whichever is earlier.' },
  { sec: '206C(1)(vi)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 3', f27eq: '6CC', challan: '1071', collector: 'Seller', desc: 'Timber obtained by any mode other than a forest lease', threshold: 'Nil', rate: '2%', notes: 'Applies to all other modes of timber acquisition — auction, private sale, etc.' },
  { sec: '206C(1)(vii)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 3', f27eq: '6CD', challan: '1072', collector: 'Seller', desc: 'Any other forest produce (not timber or tendu leaves)', threshold: 'Nil', rate: '2%', notes: 'Covers all forest produce not already covered under other sub-clauses. No threshold.' },
  { sec: '206C(1C)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 9', f27eq: '6CF / 6CG / 6CH', challan: '1090-1092', collector: 'Grantor', desc: 'Lease / sub-lease / licence for parking lot, toll plaza, mine or quarry', threshold: 'Nil', rate: '2%', notes: 'TCS at 2% on the amount received or debited. Separate Form 27EQ codes: 6CF = parking lot, 6CG = toll plaza, 6CH = mine / quarry.' },
  { sec: '206C(1F)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 6.B(a) & (b)', f27eq: '6CJ', challan: '1075 / 1076-1085', collector: 'Seller', desc: 'Sale of motor vehicle', threshold: '₹10,00,000 per vehicle', rate: '1%', notes: 'Applies to every sale of a motor vehicle exceeding ₹10 lakh. Collected by dealer at time of receipt of sale consideration.' },
  { sec: '206C(1G)(i)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 8', f27eq: '6CK', challan: '1088 / 1089', collector: 'Authorised Dealer', desc: 'LRS remittance — overseas tour programme package', threshold: 'Nil (full amount)', rate: '20%', notes: 'TCS at 20% on full amount — no threshold exemption for tour packages. Collected by authorised forex dealer.' },
  { sec: '206C(1G)(iii)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 7.D(a)', f27eq: '6CK', challan: '1086', collector: 'Authorised Dealer', desc: 'LRS remittance — medical treatment or education (including self-funded education)', threshold: '₹10,00,000 per FY (on excess)', rate: '2%', notes: 'Rate 2% on LRS amount exceeding ₹10 lakh per FY for medical treatment or self-funded education abroad. TCS on education remittances financed by a loan from an approved financial institution stands removed.' },
  { sec: '206C(1G)(iv)', newSec: 'Sec. 394(1)', tableRef: 'Table: Sl. No. 7.D(b)', f27eq: '6CK', challan: '1087', collector: 'Authorised Dealer', desc: 'LRS remittance — all other purposes (investments, gifts, maintenance, travel, etc.)', threshold: '₹10,00,000 per FY (on excess)', rate: '20%', notes: 'Rate 20% on aggregate LRS remittance in excess of ₹10 lakh per FY. Does not apply to education / medical / tour packages (covered above).' },
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
        r.challan.toLowerCase().includes(lq) ||
        r.tableRef.toLowerCase().includes(lq) ||
        r.desc.toLowerCase().includes(lq) ||
        r.notes.toLowerCase().includes(lq) ||
        r.rate.toLowerCase().includes(lq) ||
        r.threshold.toLowerCase().includes(lq) ||
        r.collector.toLowerCase().includes(lq);
      const matchCollector = collector === 'All' || r.collector.includes(collector);
      return matchQ && matchCollector;
    });
  }, [q, collector]);

  const thStyle = { ...helvetica, padding: '11px 14px', fontSize: 12, fontWeight: 600, color: T.mid, textAlign: 'left', letterSpacing: 0.2, whiteSpace: 'nowrap', borderBottom: `2px solid ${T.bdr}`, background: '#fff' };
  const tdStyle = { ...helvetica, padding: '11px 14px', fontSize: 13, color: T.ink, verticalAlign: 'top', borderBottom: `1px solid ${T.bdr}` };

  const collectorBadge = (c) => {
    const map = {
      'Seller': { bg: '#E4F0EB', color: T.f },
      'Authorised Dealer': { bg: '#FDE8CC', color: '#8B4F00' },
      'Grantor': { bg: '#E8EAF0', color: '#3A4066' },
    };
    const base = Object.keys(map).find(k => c.includes(k)) || 'Seller';
    const { bg, color } = map[base] || { bg: '#f0f0f0', color: T.mid };
    return <span style={{ ...helvetica, fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 12, background: bg, color }}>{c}</span>;
  };

  const newSecCell = (newSec, tableRef) => (
    <div>
      <span style={{ ...helvetica, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: '#E8F4EA', color: '#1B5E35', letterSpacing: 0.2, whiteSpace: 'nowrap', display: 'inline-block' }}>{newSec}</span>
      {tableRef && (
        <div style={{ ...helvetica, fontSize: 10, color: T.lt, marginTop: 4, lineHeight: 1.4 }}>{tableRef}</div>
      )}
    </div>
  );

  const f27eqCell = (code) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {code.split(' / ').map(c => (
        <span key={c} style={{ ...helvetica, fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 6, background: '#F5F0E8', color: T.mid, whiteSpace: 'nowrap', display: 'inline-block', width: 'fit-content' }}>{c.trim()}</span>
      ))}
    </div>
  );

  return (
    <div style={helvetica}>
      {/* HERO — unchanged */}
      <section style={{ backgroundImage: "url('/banners and logos/TCS Rate Chart.png')", backgroundSize: "cover", backgroundPosition: "center", padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ ...helvetica, fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block' }}>← Back to Tools</Link>
          <div style={{ ...helvetica, display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>
            IT Act 2025 · FY 2026-27 / AY 2027-28
          </div>
          <h1 className="font-display" style={{ ...helvetica, fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            TCS Rate Chart
          </h1>
          <p style={{ ...helvetica, fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 680 }}>
            Tax Collected at Source — all Section 206C sub-sections with old IT Act 1961 section vs new IT Act 2025 section mapping · Form 27EQ codes · FY 2026-27 rates.
          </p>
        </div>
      </section>

      {/* SEO INTRO — white bg */}
      <section style={{ background: '#fff', padding: '52px 40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="font-display" style={{ ...helvetica, fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 600, color: T.ch, marginBottom: 20, lineHeight: 1.2 }}>
            TCS Rate Chart FY 2026-27 — IT Act 1961 vs IT Act 2025 Section Comparison
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Tax Collected at Source (TCS) is governed by Section 206C of the Income Tax Act 1961, covering a wide range of transactions — from sale of scrap, timber, minerals and alcoholic liquor to lease of parking lots and mines, sale of motor vehicles above ₹10 lakh, and foreign remittances under the Liberalised Remittance Scheme (LRS). Unlike TDS (which is deducted by the payer), TCS is collected by the seller, lessor, or authorised dealer and deposited with the government.
              </p>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                From 1 April 2026, the Income Tax Act 2025 replaced the IT Act 1961, renumbering TCS provisions from Section 206C to Section 394(1) — goods, leases, motor vehicles and LRS remittances each sit at their own serial number in the Section 394(1) table, which our chart shows row by row alongside the challan code for deposit. Every collector now needs to know both the old section number (used in prior returns and TRACES) and the new IT Act 2025 reference.
              </p>
            </div>
            <div>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Key FY 2026-27 TCS provisions include: LRS remittances for overseas tour packages at 20% on the full amount (no threshold); other LRS remittances above ₹10 lakh at 20%, with medical treatment and self-funded education at a concessional 2% above the same ₹10 lakh threshold; and sale of motor vehicles above ₹10 lakh at 1%. Two provisions have been dropped altogether — the concessional TCS on education funded by a bank loan (206C(1G)(ii)) and the 0.1% levy on large sellers of goods (206C(1H)) no longer apply.
              </p>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                This TCS rate chart covers all major provisions for FY 2026-27 (AY 2027-28), with Form 27EQ nature of collection codes, threshold limits, collector type, and practical compliance notes. For TDS rate reference, see our <Link href="/tools/tds-rates" style={{ color: T.f, textDecoration: 'underline' }}>TDS Rate Chart</Link>. For DTAA treaty withholding tax rates on NR payments, see our <Link href="/tools/dtaa-rate-finder" style={{ color: T.f, textDecoration: 'underline' }}>DTAA Rate Finder</Link>. Built by our Ex-Big 4 CA team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE SECTION — white bg */}
      <section style={{ background: '#fff', padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1500, margin: '0 auto' }}>

          {/* IT Act 2025 mapping banner */}
          <div style={{ marginBottom: 24, background: '#EAF4EE', border: '1px solid #B8D9C4', borderRadius: 12, padding: '14px 20px', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ ...helvetica, fontSize: 12, fontWeight: 700, color: '#1B5E35' }}>IT Act 2025 Section Map:</span>
            {[
              ['Sec. 394(1)', 'All TCS collections — goods, lease, motor vehicle, LRS (old: Section 206C), each at its Table Sl. No.'],
              ['Sec. 397(2)', 'Higher rate — no PAN (old: 206CC)'],
              ['Removed', 'TCS on education via loan (206C(1G)(ii)) and sale of goods (206C(1H)) no longer apply'],
            ].map(([sec, desc]) => (
              <div key={sec} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ ...helvetica, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: T.f, color: '#fff' }}>{sec}</span>
                <span style={{ ...helvetica, fontSize: 11.5, color: '#1B5E35' }}>{desc}</span>
              </div>
            ))}
          </div>

          {/* Search & filter */}
          <div style={{ display: 'flex', gap: 14, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flexGrow: 1, minWidth: 260 }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: T.lt }}>🔍</span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by section (206C), new section (Sec. 394), Form 27EQ code (6CA), description or keyword…"
                style={{ ...helvetica, width: '100%', padding: '10px 14px 10px 38px', fontSize: 14, border: `1.5px solid ${T.bdr}`, borderRadius: 8, background: '#fff', color: T.ch }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {COLLECTORS.map(c => (
                <button key={c} onClick={() => setCollector(c)}
                  style={{
                    ...helvetica, padding: '8px 16px', fontSize: 12.5, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: collector === c ? T.f : '#f0f0f0', color: collector === c ? '#fff' : T.mid, transition: 'all .15s'
                  }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ ...helvetica, fontSize: 12.5, color: T.lt, whiteSpace: 'nowrap' }}>{filtered.length} section{filtered.length !== 1 ? 's' : ''}</div>
          </div>

          {/* Table */}
          <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 110 }}>Old Sec<br />(IT 1961)</th>
                  <th style={{ ...thStyle, width: 100 }}>New Sec<br />(IT 2025)</th>
                  <th style={{ ...thStyle, width: 90 }}>Form 27EQ<br />Code</th>
                  <th style={{ ...thStyle, width: 95 }}>Challan<br />Code</th>
                  <th style={{ ...thStyle, width: 120 }}>Collector</th>
                  <th style={thStyle}>Nature of Collection</th>
                  <th style={{ ...thStyle, width: 190 }}>Threshold</th>
                  <th style={{ ...thStyle, width: 70 }}>Rate</th>
                  <th style={{ ...thStyle, width: 230 }}>Key Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} style={{ ...tdStyle, textAlign: 'center', padding: 40, color: T.lt }}>No matching sections found.</td></tr>
                ) : filtered.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: T.f, fontSize: 13.5 }}>{row.sec}</td>
                    <td style={tdStyle}>{newSecCell(row.newSec, row.tableRef)}</td>
                    <td style={tdStyle}>{f27eqCell(row.f27eq)}</td>
                    <td style={{ ...tdStyle, fontSize: 12, color: T.mid, whiteSpace: 'nowrap' }}>{row.challan}</td>
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

          {/* Info cards */}
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              ['TCS vs TDS', 'TCS is collected by the seller/lessor from the buyer at the point of transaction. TDS is deducted by the payer before making a payment. Both are deposited via ITNS 281 (TCS under Minor Head 200). Where both could once apply to a goods transaction, TDS u/s 194Q prevailed; the goods-sale TCS (old 206C(1H)) itself now stands removed.'],
              ['Higher Rate — No PAN / Aadhaar', 'If the buyer / remitter does not furnish PAN or Aadhaar, TCS must be collected at twice the applicable rate or 5%, whichever is higher, under Sec. 397(2) of IT Act 2025 (old: Sec 206CC of IT Act 1961).'],
              ['LRS TCS — When Collected', 'For LRS remittances (206C(1G)), TCS is collected by the authorised dealer at the time of remittance. The buyer can claim credit for TCS against their income tax liability for the year in which the TCS is collected.'],
              ['TCS Credit for Buyer', 'TCS paid is reflected in Form 26AS of the buyer/remitter and can be claimed as a credit against their income tax liability. Buyers should verify Form 26AS to ensure the TCS is correctly reported.'],
            ].map(([title, text]) => (
              <div key={title} style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ ...helvetica, fontSize: 12.5, fontWeight: 700, color: T.ch, marginBottom: 7 }}>{title}</div>
                <p style={{ ...helvetica, fontSize: 12.5, color: T.mid, lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{ ...helvetica, marginTop: 24, background: '#f9f9f9', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '16px 22px', fontSize: 12.5, color: T.mid }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> TCS rates and section references shown are for FY 2026-27 (AY 2027-28) under the Income Tax Act 2025 (in force from 1 April 2026). Section 394(1) of IT Act 2025 replaces Section 206C of IT Act 1961, with each collection listed at its own Table Sl. No. Form 27EQ codes are nature of collection codes used in TCS return filing; challan codes shown are for tax deposit. This table is for reference only. Consult a qualified CA for TCS compliance advice.
          </div>
        </div>
      </section>
    </div>
  );
}