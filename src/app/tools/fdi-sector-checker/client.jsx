'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';
import { FDI_SECTORS } from './fdi-data';

const CATEGORIES = ['All', 'Manufacturing', 'Services', 'Financial', 'Infrastructure', 'Media & Entertainment', 'Retail & Commerce', 'Agriculture', 'Defence & Space', 'Technology'];
const ROUTES = ['All', 'Automatic', 'Government', 'Prohibited', 'Mixed'];

function limitColor(limit) {
  if (limit === 0) return '#DC2626';
  if (limit === 100) return '#16A34A';
  return '#D97706';
}

function limitLabel(limit, route) {
  if (limit === 0 || route === 'Prohibited') return '0% – Prohibited';
  return limit + '%';
}

function routeBadge(route) {
  const map = {
    Automatic: { bg: '#D1FAE5', color: '#065F46' },
    Government: { bg: '#DBEAFE', color: '#1E40AF' },
    Prohibited: { bg: '#FEE2E2', color: '#991B1B' },
    Mixed: { bg: '#FEF3C7', color: '#92400E' },
  };
  const s = map[route] || { bg: T.stone, color: T.mid };
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 12, background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
      {route}
    </span>
  );
}

function categoryBadge(cat) {
  return (
    <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: '#E9F0ED', color: T.f, whiteSpace: 'nowrap' }}>
      {cat}
    </span>
  );
}

export default function FDISectorChecker() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [route, setRoute] = useState('All');

  const filtered = useMemo(() => {
    const lq = q.toLowerCase();
    return FDI_SECTORS.filter(s => {
      const matchQ = !lq ||
        s.sector.toLowerCase().includes(lq) ||
        (s.conditions || '').toLowerCase().includes(lq) ||
        (s.category || '').toLowerCase().includes(lq);
      const matchCat = category === 'All' || s.category === category;
      const matchRoute = route === 'All' || s.route === route;
      return matchQ && matchCat && matchRoute;
    });
  }, [q, category, route]);

  const stats = useMemo(() => ({
    auto: FDI_SECTORS.filter(s => s.route === 'Automatic').length,
    govt: FDI_SECTORS.filter(s => s.route === 'Government').length,
    prohibited: FDI_SECTORS.filter(s => s.route === 'Prohibited').length,
    mixed: FDI_SECTORS.filter(s => s.route === 'Mixed').length,
  }), []);

  const thStyle = {
    padding: '11px 14px', fontSize: 12, fontWeight: 600, color: T.mid,
    textAlign: 'left', letterSpacing: 0.2, whiteSpace: 'nowrap',
    borderBottom: `2px solid ${T.bdr}`, background: T.stone,
  };
  const tdStyle = {
    padding: '11px 14px', fontSize: 13, color: T.ink,
    verticalAlign: 'top', borderBottom: `1px solid ${T.bdr}`,
  };

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundImage: "url('/banners and logos/FDI SECTOR LIMIT CHECKER (1).png')", backgroundSize: "cover", backgroundPosition: "center", padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block', textDecoration: 'none' }}>
            ← Back to Tools
          </Link>
          <div style={{
            display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
            color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px',
            border: `1px solid rgba(245,168,40,.25)`, borderRadius: 20,
          }}>
            DPIIT Consolidated FDI Policy
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            FDI Sector Limit Checker
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 680 }}>
            Browse all sectors, FDI caps, and route classifications under the DPIIT Consolidated FDI Policy. Filter by category, route, or keyword to find the rules applicable to your investment.
          </p>

          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 20, marginTop: 36, flexWrap: 'wrap' }}>
            {[
              { label: 'Automatic', count: stats.auto, bg: 'rgba(22,163,74,.18)', color: '#6EE7B7' },
              { label: 'Government', count: stats.govt, bg: 'rgba(37,99,235,.18)', color: '#93C5FD' },
              { label: 'Prohibited', count: stats.prohibited, bg: 'rgba(220,38,38,.18)', color: '#FCA5A5' },
              { label: 'Mixed', count: stats.mixed, bg: 'rgba(217,119,6,.18)', color: '#FCD34D' },
            ].map(({ label, count, bg, color }) => (
              <div key={label} style={{ background: bg, borderRadius: 10, padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color, lineHeight: 1 }}>{count}</span>
                <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>{label} sectors</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '48px 40px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Foreign Direct Investment (FDI) in India is governed by the DPIIT Consolidated FDI Policy and the Foreign Exchange Management Act (FEMA). Before investing, foreign entities must determine whether their target sector is open to FDI, the maximum permissible equity limit, and which approval route applies. Getting this wrong can result in regulatory violations, compounding penalties under FEMA, and delays in receiving RBI approval for downstream operations.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                Most sectors in India are open to 100% FDI under the Automatic Route — meaning no prior government approval is needed, and the investment only needs to be reported to the RBI within 30 days of receipt of funds through the FC-GPR form. However, certain strategically sensitive sectors — including defence, broadcasting, print media, banking (private), and multi-brand retail — require prior approval from the Government of India through the relevant administrative ministry, processed via the Foreign Investment Facilitation Portal (FIFP). A handful of sectors, such as lottery services, gambling, and manufacturing of cigars, are fully prohibited for FDI.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                FDI limits are often sector-specific and come with conditions that go beyond just the equity percentage. Defence manufacturing, for instance, permits 74% FDI under the Automatic Route but requires 100% government approval above that threshold. Similarly, single-brand retail allows 100% FDI with conditions on local sourcing. For certain financial services, the applicable limit depends on whether the entity is regulated by SEBI, RBI, IRDAI, or PFRDA. These conditions must be satisfied continuously — not just at the time of initial investment.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                This FDI Sector Limit Checker covers all major sectors from the DPIIT Consolidated FDI Policy, displaying FDI limits, applicable route (Automatic, Government, Prohibited, or Mixed), and key conditions. You can filter by sector category or approval route, and search by keyword. Use this as a first-pass reference before engaging legal counsel for structuring — sector classifications can be nuanced, and specific conditions often require professional interpretation. Built by our Ex-Big 4 CA team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABLE SECTION ────────────────────────────────────────────────── */}
      <section style={{ background: T.ivory, padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 20, maxWidth: 560 }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: T.lt }}>🔍</span>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search sector name or keywords…"
              style={{
                width: '100%', padding: '11px 14px 11px 40px', fontSize: 14,
                border: `1.5px solid ${T.bdr}`, borderRadius: 8,
                background: '#fff', color: T.ch, fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontSize: 12, color: T.lt, alignSelf: 'center', marginRight: 4, fontWeight: 600 }}>Category:</span>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                padding: '6px 13px', fontSize: 12, fontWeight: 600, borderRadius: 8,
                border: 'none', cursor: 'pointer',
                background: category === c ? T.f : T.stone,
                color: category === c ? '#fff' : T.mid,
                transition: 'all .15s',
              }}>{c}</button>
            ))}
          </div>

          {/* Route filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            <span style={{ fontSize: 12, color: T.lt, alignSelf: 'center', marginRight: 4, fontWeight: 600 }}>Route:</span>
            {ROUTES.map(r => (
              <button key={r} onClick={() => setRoute(r)} style={{
                padding: '6px 13px', fontSize: 12, fontWeight: 600, borderRadius: 8,
                border: 'none', cursor: 'pointer',
                background: route === r ? T.s : T.stone,
                color: route === r ? '#fff' : T.mid,
                transition: 'all .15s',
              }}>{r}</button>
            ))}
            <span style={{ fontSize: 12, color: T.lt, alignSelf: 'center', marginLeft: 8 }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Table */}
          <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, minWidth: 220 }}>Sector</th>
                    <th style={{ ...thStyle, width: 140 }}>Category</th>
                    <th style={{ ...thStyle, width: 130 }}>FDI Limit</th>
                    <th style={{ ...thStyle, width: 120 }}>Route</th>
                    <th style={{ ...thStyle }}>Key Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ ...tdStyle, textAlign: 'center', padding: 48, color: T.lt }}>
                        No matching sectors found. Try adjusting your search or filters.
                      </td>
                    </tr>
                  ) : filtered.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF8' }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: T.ch }}>
                        {row.sector}
                        {row.subsectors && row.subsectors.length > 0 && (
                          <div style={{ fontSize: 11, color: T.lt, marginTop: 4, lineHeight: 1.5 }}>
                            {row.subsectors.slice(0, 3).join(' · ')}{row.subsectors.length > 3 ? ` +${row.subsectors.length - 3} more` : ''}
                          </div>
                        )}
                      </td>
                      <td style={tdStyle}>{categoryBadge(row.category)}</td>
                      <td style={{ ...tdStyle, fontWeight: 700, fontSize: 14, color: limitColor(row.route === 'Prohibited' ? 0 : row.limit) }}>
                        {limitLabel(row.limit, row.route)}
                      </td>
                      <td style={tdStyle}>{routeBadge(row.route)}</td>
                      <td style={{ ...tdStyle, fontSize: 12.5, color: T.mid, lineHeight: 1.6, maxWidth: 380 }}>
                        {row.conditions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 32, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '16px 22px', fontSize: 12.5, color: T.mid, lineHeight: 1.65 }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> FDI limits and routes shown are based on the DPIIT Consolidated FDI Policy and are subject to change via press notes, circulars, and Finance Act amendments. This table is for general reference only. Always consult the latest DPIIT press notes, RBI Master Directions on Foreign Investment in India, and a qualified legal/CA professional before making any investment decisions.
          </div>
        </div>
      </section>
    </div>
  );
}
