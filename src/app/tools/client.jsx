'use client';
import Link from 'next/link';
import { T } from '@/lib/config';

const TOOLS = [
  // ── Tax Calculators ───────────────────────────────────────────────────────
  {
    href: '/tools/income-tax-calculator',
    icon: '🧮',
    title: 'Income Tax Calculator',
    subtitle: 'FY 2025-26 / AY 2026-27',
    desc: 'Companies, LLP, and Individuals (resident & non-resident) under New & Old Regime. Slab-wise breakdown with surcharge, cess, and MAT/AMT warnings.',
    tags: ['Companies', 'LLP', 'Individuals', 'New & Old Regime'],
    cta: 'Open Calculator',
    accent: T.f,
    group: 'Tax Calculators',
  },
  {
    href: '/tools/advance-tax-calculator',
    icon: '📅',
    title: 'Advance Tax Calculator',
    subtitle: 'FY 2026-27 · Quarterly Instalments',
    desc: 'Calculate quarterly advance tax instalments. Due dates: 15 June, 15 September, 15 December, 15 March. Covers individuals, companies and LLPs.',
    tags: ['Advance Tax', 'Instalments', '234B / 234C', 'Quarterly'],
    cta: 'Calculate Instalments',
    accent: T.f,
    group: 'Tax Calculators',
  },
  {
    href: '/tools/capital-gains-calculator',
    icon: '📈',
    title: 'Capital Gains Calculator',
    subtitle: 'FY 2025-26 · Budget 2024 Rates',
    desc: 'LTCG and STCG on listed equity, property, debt funds and other assets. Updated for Budget 2024 rate changes — 12.5% LTCG on equity, property without indexation.',
    tags: ['LTCG', 'STCG', 'Equity', 'Property'],
    cta: 'Calculate Capital Gains',
    accent: '#2E7D32',
    group: 'Tax Calculators',
  },
  {
    href: '/tools/payroll-calculator',
    icon: '💰',
    title: 'Payroll / CTC Calculator',
    subtitle: 'CTC to Take-Home Salary',
    desc: 'Convert CTC to monthly take-home. Computes PF, ESI, professional tax, and income tax under New or Old Regime. Includes employer PF and gratuity breakdown.',
    tags: ['CTC', 'Take-Home', 'PF & ESI', 'Income Tax'],
    cta: 'Calculate Take-Home',
    accent: '#5C3D8F',
    group: 'Tax Calculators',
  },
  // ── GST & Compliance ──────────────────────────────────────────────────────
  {
    href: '/tools/tds-rates',
    icon: '📋',
    title: 'TDS Rate Chart',
    subtitle: 'FY 2026-27 · Sections 192–196D',
    desc: 'Comprehensive TDS rate reference across all major sections — 192 to 196D. Searchable table with threshold limits and individual/HUF vs company rates.',
    tags: ['Section 194', 'Section 195', 'Non-Residents', 'All Sections'],
    cta: 'View TDS Rates',
    accent: '#4A6FA5',
    group: 'GST & Compliance',
  },
  {
    href: '/tools/hsn-sac-finder',
    icon: '🔍',
    title: 'GST HSN / SAC Finder',
    subtitle: 'Live CBIC Search · 4 & 6-digit codes',
    desc: 'Find HSN codes for goods or SAC codes for services. Browse 500+ 4-digit and 6-digit codes across all 99 chapters, or search live via CBIC.',
    tags: ['HSN Codes', 'SAC Codes', '6-digit', 'CBIC'],
    cta: 'Search HSN / SAC',
    accent: T.s,
    group: 'GST & Compliance',
  },
  {
    href: '/tools/gst-due-dates',
    icon: '🗓️',
    title: 'GST Due Date Calendar',
    subtitle: 'FY 2026-27 · All Return Types',
    desc: 'GSTR-1, GSTR-3B, GSTR-9, GSTR-4, CMP-08 due dates for FY 2026-27. Covers monthly filers, QRMP quarterly filers, and composition dealers.',
    tags: ['GSTR-1', 'GSTR-3B', 'GSTR-9', 'QRMP'],
    cta: 'View Calendar',
    accent: '#E64A19',
    group: 'GST & Compliance',
  },
  // ── Investment & Structure ─────────────────────────────────────────────────
  {
    href: '/tools/dtaa-rate-finder',
    icon: '🌐',
    title: 'DTAA Rate Finder',
    subtitle: 'India · 90+ Treaty Countries',
    desc: 'Find withholding tax rates under India\'s DTAA with 90+ countries — dividends, interest, royalties, and FTS. Covers TRC requirements and MLI impact.',
    tags: ['DTAA', 'Withholding Tax', 'Treaty', 'Form 10F'],
    cta: 'Find Treaty Rates',
    accent: '#00695C',
    group: 'International Tax',
  },
  {
    href: '/tools/fdi-sector-checker',
    icon: '🏭',
    title: 'FDI Sector Limit Checker',
    subtitle: 'DPIIT Consolidated FDI Policy',
    desc: 'Check FDI limits for any sector — automatic route vs government approval route. 65+ sectors covered with conditions. Based on DPIIT\'s Consolidated FDI Policy.',
    tags: ['FDI Limits', 'Automatic Route', 'Government Route', 'DPIIT'],
    cta: 'Check FDI Limits',
    accent: '#1565C0',
    group: 'International Tax',
  },
  {
    href: '/tools/company-name-check',
    icon: '🏢',
    title: 'Company Name Check',
    subtitle: 'MCA RUN · Name Availability Guide',
    desc: 'Guide to checking company name availability in India. Name rules, prohibited words, MCA portal links, and tips for getting your name approved first time.',
    tags: ['MCA', 'RUN Service', 'Company Name', 'SPICe+'],
    cta: 'Check Name Rules',
    accent: '#6D4C41',
    group: 'Incorporation',
  },
];

export default function Page() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: T.f, padding: '120px 56px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 90% 50%, rgba(232,144,10,.07) 0%, transparent 55%)' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 18, padding: '5px 14px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>
            Free Tools
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 600, color: '#fff', lineHeight: 1.06, marginBottom: 20 }}>
            India Tax, GST &amp; Corporate<br />
            <span style={{ fontStyle: 'italic', color: T.sl, fontWeight: 400 }}>Free Reference Tools</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.55)', lineHeight: 1.75, maxWidth: 640, margin: '0 auto' }}>
            10 free calculators and reference tools built by our Ex-Big 4 CA team — income tax, capital gains, advance tax, payroll, TDS, GST, DTAA, FDI limits and more. No sign-up required.
          </p>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section style={{ background: T.ivory, padding: '72px 56px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {['Tax Calculators', 'GST & Compliance', 'International Tax', 'Incorporation'].map(group => {
            const groupTools = TOOLS.filter(t => t.group === group);
            if (!groupTools.length) return null;
            return (
              <div key={group} style={{ marginBottom: 60 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: T.ch, margin: 0 }}>{group}</h2>
                  <div style={{ flex: 1, height: 1, background: T.bdr }} />
                  <span style={{ fontSize: 12, color: T.lt }}>{groupTools.length} tool{groupTools.length !== 1 ? 's' : ''}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                  {groupTools.map((tool) => (
                    <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                      <div className="card-lift" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '28px 26px', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: tool.accent, borderRadius: '16px 16px 0 0' }} />
                        <div style={{ fontSize: 34, marginBottom: 14 }}>{tool.icon}</div>
                        <div style={{ marginBottom: 4 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: T.ch, margin: 0 }}>{tool.title}</h3>
                          <div style={{ fontSize: 11, color: tool.accent, fontWeight: 600, marginTop: 3 }}>{tool.subtitle}</div>
                        </div>
                        <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.7, marginTop: 10, flexGrow: 1 }}>{tool.desc}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 14 }}>
                          {tool.tags.map((tag) => (
                            <span key={tag} style={{ fontSize: 10.5, background: T.stone, color: T.mid, borderRadius: 20, padding: '3px 9px', fontWeight: 500 }}>{tag}</span>
                          ))}
                        </div>
                        <div style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: tool.accent }}>
                          {tool.cta} →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* disclaimer */}
          <div style={{ marginTop: 16, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 24px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</div>
            <p style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: T.ch }}>Disclaimer:</strong> These tools are for reference and general information only. Tax rates are based on Finance Act 2025. Always consult a qualified Chartered Accountant for professional tax advice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: T.f, padding: '72px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 600, color: '#fff', marginBottom: 14 }}>
            Need expert tax advice?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, marginBottom: 32 }}>
            Our Ex-Big 4 CA team handles international tax, transfer pricing, DTAA structuring, and India incorporation for foreign companies.
          </p>
          <Link href="/contact" className="ics-btn ics-btn-primary ics-btn-lg">Book a Free Consultation</Link>
        </div>
      </section>
    </div>
  );
}
