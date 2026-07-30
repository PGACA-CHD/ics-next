'use client';
import Link from 'next/link';
import { T } from '@/lib/config';

const INDUSTRIES = [
  { icon: <img src="/banners and logos/industries we serve/SAAS.png" alt="SaaS" style={{ width: 42, height: 42, objectFit: 'contain' }} />, name: 'SaaS & Technology', desc: 'GCC setup, IP structuring, ESOP plans, cost-plus pricing for APAC and US tech companies building India engineering teams.', href: '/gcc-setup-india' },
  { icon: <img src="/banners and logos/industries we serve/Manufacturing.png" alt="Manufacturing" style={{ width: 42, height: 42, objectFit: 'contain' }} />, name: 'Manufacturing', desc: 'FDI route advisory, JV structuring, GST on imports, transfer pricing for component procurement from Indian subsidiaries.', href: '/foreign-company-registration-india' },
  { icon: <img src="/banners and logos/industries we serve/Financial Services.png" alt="Fintech" style={{ width: 42, height: 42, objectFit: 'contain' }} />, name: 'Fintech & BFSI', desc: 'RBI-regulated entity structuring, FEMA compliance, FCA parent requirements, PE risk for financial services firms.', href: '/foreign-company-registration-india' },
  { icon: <img src="/banners and logos/industries we serve/Health and Pharma.png" alt="Healthcare" style={{ width: 42, height: 42, objectFit: 'contain' }} />, name: 'Healthcare & Pharma', desc: 'Government Route FDI for pharmacy retail, automatic route for manufacturing, transfer pricing for clinical research operations.', href: '/fdi-rules-india' },
  { icon: <img src="/banners and logos/industries we serve/E commerce.png" alt="E-Commerce" style={{ width: 42, height: 42, objectFit: 'contain' }} />, name: 'E-Commerce & D2C', desc: 'Marketplace vs inventory model FDI rules, GST on cross-border e-commerce, FEMA for payment gateways and cross-border settlements.', href: '/fdi-rules-india' },
  { icon: <img src="/banners and logos/industries we serve/GCCI Captive center.png" alt="Services" style={{ width: 42, height: 42, objectFit: 'contain' }} />, name: 'Professional Services', desc: 'PE risk assessment for consulting firms, LLP vs Pvt Ltd for service operations, branch office compliance for advisory practices.', href: '/india-market-entry-advisory' },
];

export default function IndustriesPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '80vh' }}>
      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '96px 56px 88px',
        backgroundImage: "url('/banners and logos/industries we serve/Industries main banner (1) copy.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: T.s, fontWeight: 700, marginBottom: 16 }}>INDUSTRIES WE SERVE</div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(32px,4vw,56px)',
              fontWeight: 600,
              color: '#111111',
              lineHeight: 1.08,
              marginBottom: 20,
            }}
          >
            Sector-specific India entry —
            <br className="desktop-break" />
            <span style={{ fontStyle: 'italic', color: T.sl }}>
              built for your business model.
            </span>
          </h1>
          <p style={{ fontSize: 16, color: '#000000', lineHeight: 1.8, maxWidth: 640 }}>
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
    </div>
  );
}
