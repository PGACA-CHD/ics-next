import Link from 'next/link';
import { T, FOOTER_COLS, PHONE, EMAIL, SITE_NAME } from '@/lib/config';
import Logo from '@/components/shared/Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#111108', padding: '72px 56px 40px', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Main grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '280px repeat(6, 1fr)', gap: 32, marginBottom: 44, alignItems: 'start' }}>

          {/* Brand column */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <Logo size="sm" />
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.38)', lineHeight: 1.75, maxWidth: 260, marginBottom: 20 }}>
              Your end-to-end partner for India market entry — incorporation, transfer pricing, FEMA, and ongoing compliance. A team of CAs, CS & accountants. Ex-Big 4 led. 18+ years setting up foreign entities in India.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a href={`tel:${PHONE.replace(/\s/g,'')}`} style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`} style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>{EMAIL}</a>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,.25)', lineHeight: 1.5 }}>SCO 18, Top Floor, Sector 20-D<br />Chandigarh 160020</span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h5 style={{ fontSize: 9.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', fontWeight: 600, marginBottom: 14, whiteSpace: 'nowrap' }}>
                {col.title}
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map(link => (
                  link.external ? (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', textDecoration: 'none', transition: 'color .18s' }}>
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} href={link.href}
                      style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', textDecoration: 'none', transition: 'color .18s' }}>
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.25)' }}>
            © {year} {SITE_NAME} · A Venture of Divsam Consultants LLP · Chandigarh, India
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>
            Confidentiality maintained
          </span>
        </div>

      </div>
    </footer>
  );
}
