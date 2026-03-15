'use client';
import Link from 'next/link';
import { T } from '@/lib/config';

const INDUSTRIES = [
  { icon:'💻', name:'SaaS & Technology', desc:'GCC setup, IP structuring, ESOP plans, cost-plus pricing for APAC and US tech companies building India engineering teams.', href:'/gcc-setup-india' },
  { icon:'🏭', name:'Manufacturing', desc:'FDI route advisory, JV structuring, GST on imports, transfer pricing for component procurement from Indian subsidiaries.', href:'/foreign-company-registration-india' },
  { icon:'🏦', name:'Fintech & BFSI', desc:'RBI-regulated entity structuring, FEMA compliance, FCA parent requirements, PE risk for financial services firms.', href:'/foreign-company-registration-india' },
  { icon:'🏥', name:'Healthcare & Pharma', desc:'Government Route FDI for pharmacy retail, automatic route for manufacturing, transfer pricing for clinical research operations.', href:'/fdi-rules-india' },
  { icon:'🛒', name:'E-Commerce & D2C', desc:'Marketplace vs inventory model FDI rules, GST on cross-border e-commerce, FEMA for payment gateways and cross-border settlements.', href:'/fdi-rules-india' },
  { icon:'📊', name:'Professional Services', desc:'PE risk assessment for consulting firms, LLP vs Pvt Ltd for service operations, branch office compliance for advisory practices.', href:'/india-market-entry-advisory' },
];

export default function IndustriesPage() {
  return (
    <div style={{ background: '#FAFAF5', minHeight: '80vh' }}>
      {/* Hero */}
      <section style={{ background: T.f, padding: '80px 56px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: T.s, fontWeight: 700, marginBottom: 16 }}>INDUSTRIES WE SERVE</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 20 }}>
            Sector-specific India entry — <span style={{ fontStyle: 'italic', color: T.sl }}>built for your business model.</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.55)', lineHeight: 1.8, maxWidth: 640 }}>
            Every industry has a different India entry profile — different FDI rules, different compliance obligations, different structuring priorities. We advise on all of them.
          </p>
        </div>
      </section>

      {/* Industry cards */}
      <section style={{ padding: '72px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="inner-service-cards">
          {INDUSTRIES.map(ind => (
            <Link key={ind.name} href={ind.href} style={{ textDecoration: 'none' }}>
              <div className="card-lift" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '28px 26px', height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 32, marginBottom: 16 }}>{ind.icon}</span>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: T.s, fontWeight: 700, marginBottom: 10 }}>{ind.name}</div>
                <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.75, fontWeight: 300, flex: 1 }}>{ind.desc}</p>
                <div style={{ fontSize: 13, color: T.f, fontWeight: 600, marginTop: 16 }}>Learn more →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 56px 72px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', background: T.f, borderRadius: 20, padding: '48px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: T.s, fontWeight: 700, marginBottom: 12 }}>YOUR SECTOR</div>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 600, color: '#fff', lineHeight: 1.1 }}>Don't see your industry?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', marginTop: 10 }}>We advise companies in all sectors. Book a free call to discuss your specific situation.</p>
          </div>
          <Link href="/contact" style={{ background: T.s, color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Book Free Consultation →
          </Link>
        </div>
      </section>
    </div>
  );
}
