'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';

// Today for "upcoming" / "overdue" logic
const TODAY = new Date('2026-06-01');

// ─── DUE DATE DATA ─ FY 2026-27 ─────────────────────────────────────────────

const MONTHS_FY = ['Apr 2026','May 2026','Jun 2026','Jul 2026','Aug 2026','Sep 2026','Oct 2026','Nov 2026','Dec 2026','Jan 2027','Feb 2027','Mar 2027'];

function d(dateStr) { return new Date(dateStr); }

const RAW_DATES = [
  // ── MONTHLY FILERS: GSTR-1 (11th of following month) ──────────────────────
  { type: 'GSTR-1',  period: 'Apr 2026', due: d('2026-05-11'), filer: 'Monthly',    desc: 'Details of outward supplies for April 2026' },
  { type: 'GSTR-1',  period: 'May 2026', due: d('2026-06-11'), filer: 'Monthly',    desc: 'Details of outward supplies for May 2026' },
  { type: 'GSTR-1',  period: 'Jun 2026', due: d('2026-07-11'), filer: 'Monthly',    desc: 'Details of outward supplies for June 2026' },
  { type: 'GSTR-1',  period: 'Jul 2026', due: d('2026-08-11'), filer: 'Monthly',    desc: 'Details of outward supplies for July 2026' },
  { type: 'GSTR-1',  period: 'Aug 2026', due: d('2026-09-11'), filer: 'Monthly',    desc: 'Details of outward supplies for August 2026' },
  { type: 'GSTR-1',  period: 'Sep 2026', due: d('2026-10-11'), filer: 'Monthly',    desc: 'Details of outward supplies for September 2026' },
  { type: 'GSTR-1',  period: 'Oct 2026', due: d('2026-11-11'), filer: 'Monthly',    desc: 'Details of outward supplies for October 2026' },
  { type: 'GSTR-1',  period: 'Nov 2026', due: d('2026-12-11'), filer: 'Monthly',    desc: 'Details of outward supplies for November 2026' },
  { type: 'GSTR-1',  period: 'Dec 2026', due: d('2027-01-11'), filer: 'Monthly',    desc: 'Details of outward supplies for December 2026' },
  { type: 'GSTR-1',  period: 'Jan 2027', due: d('2027-02-11'), filer: 'Monthly',    desc: 'Details of outward supplies for January 2027' },
  { type: 'GSTR-1',  period: 'Feb 2027', due: d('2027-03-11'), filer: 'Monthly',    desc: 'Details of outward supplies for February 2027' },
  { type: 'GSTR-1',  period: 'Mar 2027', due: d('2027-04-11'), filer: 'Monthly',    desc: 'Details of outward supplies for March 2027' },

  // ── MONTHLY FILERS: GSTR-3B (20th of following month) ─────────────────────
  { type: 'GSTR-3B', period: 'Apr 2026', due: d('2026-05-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for April 2026' },
  { type: 'GSTR-3B', period: 'May 2026', due: d('2026-06-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for May 2026' },
  { type: 'GSTR-3B', period: 'Jun 2026', due: d('2026-07-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for June 2026' },
  { type: 'GSTR-3B', period: 'Jul 2026', due: d('2026-08-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for July 2026' },
  { type: 'GSTR-3B', period: 'Aug 2026', due: d('2026-09-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for August 2026' },
  { type: 'GSTR-3B', period: 'Sep 2026', due: d('2026-10-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for September 2026' },
  { type: 'GSTR-3B', period: 'Oct 2026', due: d('2026-11-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for October 2026' },
  { type: 'GSTR-3B', period: 'Nov 2026', due: d('2026-12-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for November 2026' },
  { type: 'GSTR-3B', period: 'Dec 2026', due: d('2027-01-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for December 2026' },
  { type: 'GSTR-3B', period: 'Jan 2027', due: d('2027-02-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for January 2027' },
  { type: 'GSTR-3B', period: 'Feb 2027', due: d('2027-03-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for February 2027' },
  { type: 'GSTR-3B', period: 'Mar 2027', due: d('2027-04-20'), filer: 'Monthly',    desc: 'Monthly summary return and tax payment for March 2027' },

  // ── QRMP: GSTR-1 Quarterly (last day of month after quarter end) ──────────
  { type: 'GSTR-1',  period: 'Q1 Apr–Jun 2026', due: d('2026-07-31'), filer: 'QRMP',      desc: 'Quarterly GSTR-1 for Q1 FY 2026-27 (April–June 2026)' },
  { type: 'GSTR-1',  period: 'Q2 Jul–Sep 2026', due: d('2026-10-31'), filer: 'QRMP',      desc: 'Quarterly GSTR-1 for Q2 FY 2026-27 (July–September 2026)' },
  { type: 'GSTR-1',  period: 'Q3 Oct–Dec 2026', due: d('2027-01-31'), filer: 'QRMP',      desc: 'Quarterly GSTR-1 for Q3 FY 2026-27 (October–December 2026)' },
  { type: 'GSTR-1',  period: 'Q4 Jan–Mar 2027', due: d('2027-04-30'), filer: 'QRMP',      desc: 'Quarterly GSTR-1 for Q4 FY 2026-27 (January–March 2027)' },

  // ── QRMP: IFF (optional, months 1 and 2 of each quarter) ─────────────────
  { type: 'IFF',     period: 'Apr 2026 (Q1 M1)', due: d('2026-05-13'), filer: 'QRMP',    desc: 'Invoice Furnishing Facility — optional, for Q1 Month 1 (April 2026)' },
  { type: 'IFF',     period: 'May 2026 (Q1 M2)', due: d('2026-06-13'), filer: 'QRMP',    desc: 'Invoice Furnishing Facility — optional, for Q1 Month 2 (May 2026)' },
  { type: 'IFF',     period: 'Jul 2026 (Q2 M1)', due: d('2026-08-13'), filer: 'QRMP',    desc: 'Invoice Furnishing Facility — optional, for Q2 Month 1 (July 2026)' },
  { type: 'IFF',     period: 'Aug 2026 (Q2 M2)', due: d('2026-09-13'), filer: 'QRMP',    desc: 'Invoice Furnishing Facility — optional, for Q2 Month 2 (August 2026)' },
  { type: 'IFF',     period: 'Oct 2026 (Q3 M1)', due: d('2026-11-13'), filer: 'QRMP',    desc: 'Invoice Furnishing Facility — optional, for Q3 Month 1 (October 2026)' },
  { type: 'IFF',     period: 'Nov 2026 (Q3 M2)', due: d('2026-12-13'), filer: 'QRMP',    desc: 'Invoice Furnishing Facility — optional, for Q3 Month 2 (November 2026)' },
  { type: 'IFF',     period: 'Jan 2027 (Q4 M1)', due: d('2027-02-13'), filer: 'QRMP',    desc: 'Invoice Furnishing Facility — optional, for Q4 Month 1 (January 2027)' },
  { type: 'IFF',     period: 'Feb 2027 (Q4 M2)', due: d('2027-03-13'), filer: 'QRMP',    desc: 'Invoice Furnishing Facility — optional, for Q4 Month 2 (February 2027)' },

  // ── QRMP: GSTR-3B Quarterly — Category I states (22nd) ───────────────────
  { type: 'GSTR-3B', period: 'Q1 Apr–Jun 2026 (Cat I)', due: d('2026-07-22'), filer: 'QRMP',  desc: 'Quarterly GSTR-3B for Q1 — Category I states (22nd). States: Chhattisgarh, MP, Gujarat, Maharashtra, etc.' },
  { type: 'GSTR-3B', period: 'Q2 Jul–Sep 2026 (Cat I)', due: d('2026-10-22'), filer: 'QRMP',  desc: 'Quarterly GSTR-3B for Q2 — Category I states (22nd)' },
  { type: 'GSTR-3B', period: 'Q3 Oct–Dec 2026 (Cat I)', due: d('2027-01-22'), filer: 'QRMP',  desc: 'Quarterly GSTR-3B for Q3 — Category I states (22nd)' },
  { type: 'GSTR-3B', period: 'Q4 Jan–Mar 2027 (Cat I)', due: d('2027-04-22'), filer: 'QRMP',  desc: 'Quarterly GSTR-3B for Q4 — Category I states (22nd)' },

  // ── QRMP: GSTR-3B Quarterly — Category II states (24th) ──────────────────
  { type: 'GSTR-3B', period: 'Q1 Apr–Jun 2026 (Cat II)', due: d('2026-07-24'), filer: 'QRMP', desc: 'Quarterly GSTR-3B for Q1 — Category II states (24th). States: HP, Punjab, UT of J&K, Uttarakhand, etc.' },
  { type: 'GSTR-3B', period: 'Q2 Jul–Sep 2026 (Cat II)', due: d('2026-10-24'), filer: 'QRMP', desc: 'Quarterly GSTR-3B for Q2 — Category II states (24th)' },
  { type: 'GSTR-3B', period: 'Q3 Oct–Dec 2026 (Cat II)', due: d('2027-01-24'), filer: 'QRMP', desc: 'Quarterly GSTR-3B for Q3 — Category II states (24th)' },
  { type: 'GSTR-3B', period: 'Q4 Jan–Mar 2027 (Cat II)', due: d('2027-04-24'), filer: 'QRMP', desc: 'Quarterly GSTR-3B for Q4 — Category II states (24th)' },

  // ── ANNUAL ────────────────────────────────────────────────────────────────
  { type: 'GSTR-9',  period: 'FY 2025-26 (Annual)',       due: d('2026-12-31'), filer: 'Annual',     desc: 'Annual return for FY 2025-26 — all regular taxpayers (turnover above prescribed limit)' },
  { type: 'GSTR-9C', period: 'FY 2025-26 (Reconciliation)',due: d('2026-12-31'), filer: 'Annual',   desc: 'Reconciliation statement (self-certified) for FY 2025-26 — taxpayers with turnover >₹5 Cr' },

  // ── COMPOSITION DEALERS ───────────────────────────────────────────────────
  { type: 'CMP-08',  period: 'Q1 Apr–Jun 2026',            due: d('2026-07-18'), filer: 'Composition', desc: 'Quarterly statement-cum-challan for Q1 FY 2026-27 (Composition dealer)' },
  { type: 'CMP-08',  period: 'Q2 Jul–Sep 2026',            due: d('2026-10-18'), filer: 'Composition', desc: 'Quarterly statement-cum-challan for Q2 FY 2026-27 (Composition dealer)' },
  { type: 'CMP-08',  period: 'Q3 Oct–Dec 2026',            due: d('2027-01-18'), filer: 'Composition', desc: 'Quarterly statement-cum-challan for Q3 FY 2026-27 (Composition dealer)' },
  { type: 'CMP-08',  period: 'Q4 Jan–Mar 2027',            due: d('2027-04-18'), filer: 'Composition', desc: 'Quarterly statement-cum-challan for Q4 FY 2026-27 (Composition dealer)' },
  { type: 'GSTR-4',  period: 'FY 2026-27 (Annual)',        due: d('2027-04-30'), filer: 'Composition', desc: 'Annual return for Composition taxpayers for FY 2026-27' },
];

const FILER_TYPES = ['All', 'Monthly', 'QRMP', 'Annual', 'Composition'];
const RETURN_TYPES = ['All', 'GSTR-1', 'GSTR-3B', 'GSTR-9', 'GSTR-9C', 'GSTR-4', 'CMP-08', 'IFF'];

const TYPE_COLORS = {
  'GSTR-1':  { bg: '#E8F0FE', color: '#1A56DB', border: '#B3C8FA' },
  'GSTR-3B': { bg: '#E6F4EA', color: '#1A6B3A', border: '#A8D5B5' },
  'GSTR-9':  { bg: '#FFF0E0', color: '#8A5500', border: '#F5D4A0' },
  'GSTR-9C': { bg: '#FFF0E0', color: '#8A5500', border: '#F5D4A0' },
  'GSTR-4':  { bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE' },
  'CMP-08':  { bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE' },
  'IFF':     { bg: '#F0F9FF', color: '#0C4A6E', border: '#BAE6FD' },
};

function formatDate(d) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getStatus(due) {
  const diff = due - TODAY;
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return 'overdue';
  if (days <= 30) return 'upcoming';
  return 'future';
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function GSTDueDates() {
  const [filerType, setFilerType] = useState('All');
  const [returnType, setReturnType] = useState('All');

  const filtered = useMemo(() => {
    return RAW_DATES
      .filter(e => {
        const matchFiler = filerType === 'All' || e.filer === filerType;
        const matchType = returnType === 'All' || e.type === returnType;
        return matchFiler && matchType;
      })
      .sort((a, b) => a.due - b.due);
  }, [filerType, returnType]);

  // Group by month-year label
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(e => {
      const key = e.due.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      if (!map[key]) map[key] = [];
      map[key].push(e);
    });
    return Object.entries(map);
  }, [filtered]);

  const stats = {
    total: RAW_DATES.length,
    monthly: RAW_DATES.filter(e => e.filer === 'Monthly').length,
    quarterly: RAW_DATES.filter(e => e.filer === 'QRMP').length,
    annual: RAW_DATES.filter(e => e.filer === 'Annual').length,
    composition: RAW_DATES.filter(e => e.filer === 'Composition').length,
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ background: T.f, padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block', textDecoration: 'none' }}>← Back to Tools</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>
            FY 2026-27 · April 2026 – March 2027
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            GST Due Date Calendar
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
            All GST return due dates for FY 2026-27 — Monthly, QRMP, Composition &amp; Annual filers in one place.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              [stats.total, 'Total Returns'],
              [stats.monthly, 'Monthly Filer Returns'],
              [stats.quarterly, 'QRMP Returns'],
              [stats.annual + stats.composition, 'Annual / Composition'],
            ].map(([val, lbl]) => (
              <div key={lbl} style={{ background: 'rgba(255,255,255,.08)', borderRadius: 12, padding: '12px 18px', borderLeft: `3px solid ${T.sl}` }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section style={{ background: T.stone, padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Filters */}
          <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '20px 24px', marginBottom: 28 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Taxpayer Type</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {FILER_TYPES.map(f => (
                  <button key={f} onClick={() => setFilerType(f)}
                    style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer',
                      background: filerType === f ? T.f : T.stone, color: filerType === f ? '#fff' : T.mid, transition: 'all .15s' }}>
                    {f === 'Monthly' ? 'Monthly (>₹5 Cr)' : f === 'QRMP' ? 'QRMP (≤₹5 Cr)' : f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.mid, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Return Type</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {RETURN_TYPES.map(r => {
                  const c = TYPE_COLORS[r];
                  return (
                    <button key={r} onClick={() => setReturnType(r)}
                      style={{ padding: '7px 14px', fontSize: 12.5, fontWeight: 600, borderRadius: 8, border: `1.5px solid ${returnType === r ? (c ? c.border : T.f) : T.bdr}`, cursor: 'pointer',
                        background: returnType === r ? (c ? c.bg : '#E4F0EB') : '#fff',
                        color: returnType === r ? (c ? c.color : T.f) : T.mid, transition: 'all .15s' }}>
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: T.lt }}>
              Showing <strong style={{ color: T.ch }}>{filtered.length}</strong> due dates
              &nbsp;·&nbsp;
              <span style={{ color: '#9B2020' }}>Red = Overdue</span> &nbsp;·&nbsp;
              <span style={{ color: '#8A5500' }}>Orange = Due within 30 days</span>
            </div>
          </div>

          {/* QRMP state note */}
          {(filerType === 'All' || filerType === 'QRMP') && (
            <div style={{ background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: 12.5, color: '#7A5C1E' }}>
              <strong>QRMP State Categories:</strong> Category I states (22nd): Chhattisgarh, Madhya Pradesh, Gujarat, Maharashtra, Karnataka, Goa, Kerala, Tamil Nadu, Telangana, Andhra Pradesh, Daman &amp; Diu, Dadra &amp; Nagar Haveli, Puducherry, Andaman &amp; Nicobar Islands, Lakshadweep. &nbsp;
              Category II states (24th): Himachal Pradesh, Punjab, Uttarakhand, Haryana, Rajasthan, UP, Bihar, Sikkim, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, Assam, West Bengal, Jharkhand, Odisha, J&amp;K, Ladakh, Delhi, Chandigarh.
            </div>
          )}

          {/* Grouped list */}
          {grouped.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: T.mid, background: '#fff', borderRadius: 14, border: `1px solid ${T.bdr}` }}>
              No due dates found for the selected filters.
            </div>
          ) : (
            grouped.map(([monthLabel, entries]) => (
              <div key={monthLabel} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.mid, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12, paddingLeft: 4, borderLeft: `3px solid ${T.sl}`, paddingBottom: 2 }}>
                  {monthLabel}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {entries.map((e, i) => {
                    const status = getStatus(e.due);
                    const tc = TYPE_COLORS[e.type] || { bg: T.stone, color: T.mid, border: T.bdr };
                    const daysLeft = Math.round((e.due - TODAY) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={i} style={{
                        background: '#fff',
                        border: `1px solid ${status === 'overdue' ? '#FCA5A5' : status === 'upcoming' ? '#FDE68A' : T.bdr}`,
                        borderLeft: `4px solid ${status === 'overdue' ? '#DC2626' : status === 'upcoming' ? '#D97706' : tc.color}`,
                        borderRadius: 10,
                        padding: '14px 18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 12,
                      }}>
                        <div style={{ flex: '1 1 300px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11.5, fontWeight: 700, background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>
                              {e.type}
                            </span>
                            <span style={{ fontSize: 12.5, fontWeight: 600, color: T.ch }}>{e.period}</span>
                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: T.stone, color: T.mid }}>{e.filer}</span>
                          </div>
                          <div style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.5 }}>{e.desc}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: 16, fontWeight: 700, color: status === 'overdue' ? '#DC2626' : status === 'upcoming' ? '#D97706' : T.ch }}>
                            {formatDate(e.due)}
                          </div>
                          <div style={{ fontSize: 11.5, fontWeight: 600, marginTop: 3,
                            color: status === 'overdue' ? '#DC2626' : status === 'upcoming' ? '#D97706' : T.lt }}>
                            {status === 'overdue'
                              ? `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''}`
                              : status === 'upcoming'
                                ? `Due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
                                : `${daysLeft} days away`
                            }
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          <div style={{ marginTop: 32, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 24px', fontSize: 12.5, color: T.mid, lineHeight: 1.65 }}>
            <strong style={{ color: T.ch }}>Note:</strong> Due dates may be extended by GSTN/CBIC notifications. Late filing attracts interest @ 18% p.a. and late fees (₹50/day general; ₹20/day for NIL returns). "Upcoming" status shown for dates within 30 days of 1 June 2026. Always check the official GSTN portal (gst.gov.in) for the latest notifications.
          </div>
        </div>
      </section>
    </div>
  );
}
