'use client';
import { useState } from 'react';
import Link from 'next/link';
import { T, FOOTER_COLS, PHONE, EMAIL, SITE_NAME } from '@/lib/config';
import Logo from '@/components/shared/Logo';

const GOLD = '#c8870a';

export default function Footer() {
  const year = new Date().getFullYear();
  const [openCol, setOpenCol] = useState(null);

  const toggleCol = (title) => {
    setOpenCol(prev => (prev === title ? null : title));
  };

  return (
    <footer className="footer-container">
      <style>{`
        /* ── DESKTOP ── */
        .footer-container {
          background: #ffffff;
          padding: 72px 56px 40px;
          font-family: Helvetica, Arial, sans-serif;
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
        .footer-col-header {
          font-size: 9.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${GOLD};
          font-weight: 700;
          margin-bottom: 14px;
          white-space: nowrap;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: default;
        }
        .footer-col-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-col-toggle-icon {
          display: none;
        }
        .footer-disclaimer {
          border-top: 1px solid rgba(0,0,0,0.10);
          padding: 16px 0;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .footer-disclaimer-bar {
          width: 3px;
          min-height: 100%;
          flex-shrink: 0;
          background: ${GOLD};
          border-radius: 2px;
          align-self: stretch;
        }
        .footer-disclaimer-text {
          font-size: 11.5px;
          color: #666;
          line-height: 1.7;
          font-style: italic;
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

        /* ── MOBILE — accordion style ── */
        @media (max-width: 768px) {
          /* Full-width dark accordion section for link columns only */
          .footer-container {
            padding: 0;
            border-top: none;
          }

          /* Brand block stays white, normal padding */
          .footer-brand-wrap {
            background: #ffffff;
            padding: 40px 20px 32px;
            border-bottom: 1px solid rgba(0,0,0,0.10);
          }

          /* Grid becomes a full-width column stack */
          .footer-grid-layout {
            display: flex;
            flex-direction: column;
            gap: 0;
            margin-bottom: 0;
            width: 100%;
            padding: 0 !important;
          }

          /* Hide brand inside grid — shown in separate wrap above */
          .footer-brand {
            display: none;
          }

          /* Each link column = accordion row — full width, white bg */
          .footer-col {
            background: #ffffff;
            border-bottom: 1px solid rgba(0,0,0,0.10);
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            box-sizing: border-box;
          }
          .footer-col:last-child {
            border-bottom: none;
          }

          /* Header row — full-width tap target */
          .footer-col-header {
            font-size: 11px !important;
            letter-spacing: 1.8px !important;
            color: #111111 !important;
            font-weight: 700;
            font-family: Helvetica, Arial, sans-serif !important;
            margin-bottom: 0;
            white-space: nowrap;
            cursor: pointer;
            padding: 20px 20px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            border: none;
            background: none;
            text-align: left;
          }

          /* Links panel — smooth slide + fade */
          .footer-col-links {
            display: flex;
            flex-direction: column;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            padding: 0 20px;
            background: #ffffff;
            font-family: Helvetica, Arial, sans-serif;
            transition: max-height 0.42s cubic-bezier(0.4, 0, 0.2, 1),
                        opacity 0.28s ease,
                        padding-bottom 0.42s ease;
            padding-bottom: 0;
          }
          .footer-col-links.open {
            max-height: 600px;
            opacity: 1;
            padding-bottom: 18px;
          }

          /* Each link in the open panel */
          .footer-col-links a,
          .footer-col-links .footer-link {
            font-size: 13.5px !important;
            color: #333333 !important;
            font-family: Helvetica, Arial, sans-serif !important;
            padding: 11px 0;
            border-bottom: 1px solid rgba(0,0,0,0.07);
            text-decoration: none !important;
            transition: color 0.18s;
          }
          .footer-col-links a:last-child,
          .footer-col-links .footer-link:last-child {
            border-bottom: none;
          }
          .footer-col-links a:hover,
          .footer-col-links .footer-link:hover {
            color: ${GOLD} !important;
            text-decoration: none !important;
          }

          /* Chevron icon */
          .footer-col-toggle-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #111111;
            transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
            flex-shrink: 0;
          }

          /* Disclaimer strip */
          .footer-disclaimer {
            background: #ffffff;
            border-top: 1px solid rgba(0,0,0,0.10);
            padding: 16px 20px;
          }
          .footer-disclaimer-text {
            font-size: 11px;
            text-align: center;
          }
          .footer-disclaimer-bar {
            display: none;
          }

          /* Bottom copyright row */
          .footer-bottom-row {
            background: #ffffff;
            border-top: 1px solid rgba(0,0,0,0.10);
            padding: 20px 20px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 6px;
            margin-top: 0;
          }
          .footer-bottom-row span {
            text-align: center;
          }

          /* Inner wrapper — full bleed on mobile */
          .footer-inner {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }

        @media (max-width: 480px) {
          .footer-brand-wrap {
            padding: 32px 16px 28px;
          }
          .footer-col-header {
            padding: 18px 16px !important;
          }
          .footer-col-links {
            padding: 0 16px 14px !important;
          }
          .footer-bottom-row {
            padding: 18px 16px !important;
          }
        }
      `}</style>

      {/* ── MOBILE: brand shown outside the grid ── */}
      <div className="footer-brand-wrap" style={{ display: 'none' }}>
        <style>{`
          @media(max-width:768px) { .footer-brand-wrap { display: block !important; } }
        `}</style>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
          <Logo size="sm" dark={true} />
        </div>
        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.75, maxWidth: '100%', marginBottom: 18 }}>
          Your end-to-end partner for India market entry — incorporation, transfer pricing, FEMA, and ongoing compliance. A team of CAs, CS &amp; accountants. Ex-Big 4 led. 18+ years setting up foreign entities in India.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} style={{ fontSize: 13, color: GOLD, textDecoration: 'none', fontWeight: 600 }}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`} style={{ fontSize: 13, color: GOLD, textDecoration: 'none', fontWeight: 600 }}>{EMAIL}</a>
          <span style={{ fontSize: 12, color: GOLD, lineHeight: 1.5, fontWeight: 600 }}>SCO 18, Top Floor, Sector 20-D<br />Chandigarh 160020</span>
        </div>
      </div>

      <div className="footer-inner" style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Main grid */}
        <div className="footer-grid-layout">

          {/* Brand column — desktop only (hidden on mobile via CSS) */}
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
          {FOOTER_COLS.map(col => {
            const isOpen = openCol === col.title;
            return (
              <div key={col.title} className="footer-col">
                <h5 className="footer-col-header" onClick={() => toggleCol(col.title)}>
                  {col.title}
                  <span
                    className="footer-col-toggle-icon"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </h5>
                <div className={`footer-col-links ${isOpen ? 'open' : ''}`}>
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
            );
          })}
        </div>

        {/* Disclaimer bar */}
        <div className="footer-disclaimer">
          <span className="footer-disclaimer-bar" aria-hidden="true" />
          <p className="footer-disclaimer-text">
            India Company Setup is a private firm and is not affiliated with the Ministry of Corporate Affairs (MCA) or any government entity. We provide professional consultancy services for a fee.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-row">
          <span style={{ fontSize: 12, color: '#555' }}>
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