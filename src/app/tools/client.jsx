'use client';
import Link from 'next/link';
import { T } from '@/lib/config';

const TOOLS = [
  {
    href: '/tools/income-tax-calculator',
    icon: '🧮',
    title: 'Income Tax Calculator',
    subtitle: 'FY 2025-26 / AY 2026-27',
    desc: 'Calculate income tax for Domestic & Foreign Companies, LLP, and Individuals (resident & non-resident) under both New and Old Regime. Slab-wise breakdown with surcharge and cess.',
    tags: ['Companies', 'LLP', 'Individuals', 'New & Old Regime'],
    cta: 'Open Calculator',
    accent: T.f,
  },
  {
    href: '/tools/tds-rates',
    icon: '📋',
    title: 'TDS Rate Chart',
    subtitle: 'FY 2026-27',
    desc: 'Comprehensive TDS/TCS rate reference across all major sections — 192 to 196D. Search by section number, payment type or keyword. Includes threshold limits and deductee-specific rates.',
    tags: ['Section 194', 'Section 195', 'Non-Residents', 'All Sections'],
    cta: 'View TDS Rates',
    accent: '#4A6FA5',
  },
  {
    href: '/tools/hsn-sac-finder',
    icon: '🔍',
    title: 'GST HSN / SAC Finder',
    subtitle: 'Live CBIC Search',
    desc: 'Find the correct HSN code for goods or SAC code for services as per the GST Act. Search by description or code — data sourced from CBIC/GSTN. Browse all 99 HSN chapters and major service categories.',
    tags: ['HSN Codes', 'SAC Codes', 'GST Rates', 'CBIC Data'],
    cta: 'Search HSN / SAC',
    accent: T.s,
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
            India Tax &amp; GST<br />
            <span style={{ fontStyle: 'italic', color: T.sl, fontWeight: 400 }}>Reference Tools</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.55)', lineHeight: 1.75, maxWidth: 600, margin: '0 auto' }}>
            Free calculators and reference tools built by our Ex-Big 4 CA team. No sign-up required — just practical tools for India tax and GST compliance.
          </p>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section style={{ background: T.ivory, padding: '80px 56px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                <div className="card-lift" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '36px 32px', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: tool.accent, borderRadius: '16px 16px 0 0' }} />
                  <div style={{ fontSize: 40, marginBottom: 20 }}>{tool.icon}</div>
                  <div style={{ marginBottom: 4 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: T.ch, margin: 0 }}>{tool.title}</h2>
                    <div style={{ fontSize: 11.5, color: tool.accent, fontWeight: 600, marginTop: 3 }}>{tool.subtitle}</div>
                  </div>
                  <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.7, marginTop: 12, flexGrow: 1 }}>{tool.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
                    {tool.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: 11, background: T.stone, color: T.mid, borderRadius: 20, padding: '3px 10px', fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 600, color: tool.accent }}>
                    {tool.cta} →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* disclaimer */}
          <div style={{ marginTop: 56, background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '20px 28px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 20, flexShrink: 0 }}>ℹ️</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.ch, marginBottom: 4 }}>Disclaimer</div>
              <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.65, margin: 0 }}>
                These tools are for reference and general information only. Tax rates are based on Finance Act 2025 (FY 2025-26). Always consult a qualified Chartered Accountant for professional tax advice. India Company Setup does not accept liability for decisions made solely on the basis of these tools.
              </p>
            </div>
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
