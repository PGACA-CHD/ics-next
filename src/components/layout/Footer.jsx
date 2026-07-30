'use client';
import Link from 'next/link';
import { T, FOOTER_COLS, PHONE, EMAIL, SITE_NAME } from '@/lib/config';
import Logo from '@/components/shared/Logo';

const GOLD = '#c8870a';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <style>{`
        .footer-container {
          background: #ffffff;
          padding: 72px 56px 40px;
          font-family: 'DM Sans', sans-serif;
          border-top: 1px solid rgba(0,0,0,0.10);
        }
        .footer-link { color: #222 !important; text-decoration: none; transition: color .18s; }
        .footer-link:hover { color: ${GOLD} !important; }
        .footer-grid-layout {
          display: grid;
          grid-template-columns: 280px repeat(6, 1fr);
          gap: 32px;
          margin-bottom: 44px;
          align-items: start;
        }
        .footer-bottom-row {
          border-top: 1px solid rgba(0,0,0,0.10);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        @media (max-width: 1024px) {
          .footer-grid-layout {
            grid-template-columns: 280px repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .footer-container {
            padding: 48px 24px 32px;
          }
          .footer-grid-layout {
            grid-template-columns: 1fr 1fr;
            gap: 40px 24px;
          }
          .footer-brand {
            grid-column: 1 / -1;
            max-width: 400px;
          }
          .footer-bottom-row {
            flex-direction: column;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .footer-container {
            padding: 40px 16px 24px;
          }
          .footer-grid-layout {
            grid-template-columns: 1fr 1fr;
            gap: 32px 16px;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Main grid */}
        <div className="footer-grid-layout">

          {/* Brand column */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <Logo size="sm" dark={true} />
            </div>
            <p style={{ fontSize: 13, color: '#444', lineHeight: 1.75, maxWidth: 260, marginBottom: 20 }}>
              Your end-to-end partner for India market entry — incorporation, transfer pricing, FEMA, and ongoing compliance. A team of CAs, CS &amp; accountants. Ex-Big 4 led. 18+ years setting up foreign entities in India.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} style={{ fontSize: 13, color: GOLD, textDecoration: 'none', fontWeight: 600 }}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`} style={{ fontSize: 13, color: GOLD, textDecoration: 'none', fontWeight: 600 }}>{EMAIL}</a>
              <span style={{ fontSize: 12, color: GOLD, lineHeight: 1.5, fontWeight: 600 }}>SCO 18, Top Floor, Sector 20-D<br />Chandigarh 160020</span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h5 style={{ fontSize: 9.5, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: 14, whiteSpace: 'nowrap' }}>
                {col.title}
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map(link => (
                  link.external ? (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="footer-link" style={{ fontSize: 13 }}>
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} href={link.href}
                      className="footer-link" style={{ fontSize: 13 }}>
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-bottom-row">
          <span style={{ fontSize: 12, color: '#555', textAlign: 'center' }}>
            © {year} {SITE_NAME} · A Venture of Divsam Consultants LLP · Chandigarh, India
          </span>
          <span style={{ fontSize: 12, color: '#555' }}>
            Confidentiality maintained
          </span>
        </div>

      </div>
    </footer>
  );
}
