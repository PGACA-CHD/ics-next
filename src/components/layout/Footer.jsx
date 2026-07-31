'use client';
import { useState } from 'react';
import Link from 'next/link';
import { T, FOOTER_COLS, PHONE, EMAIL, SITE_NAME } from '@/lib/config';
import Logo from '@/components/shared/Logo';

const GOLD = '#c8870a';

export default function Footer() {
  const year = new Date().getFullYear();
  const [openCols, setOpenCols] = useState({});

  const toggleCol = (title) => {
    setOpenCols(prev => ({ ...prev, [title]: !prev[title] }));
  };

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
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .footer-brand {
            margin-bottom: 24px;
            max-width: 100%;
          }
          .footer-col {
            border-bottom: 1px solid rgba(0,0,0,0.06);
          }
          .footer-col:last-child {
            border-bottom: none;
          }
          .footer-col-header {
            font-size: 11.5px !important;
            letter-spacing: 1.5px;
            cursor: pointer;
            padding: 18px 0;
            margin-bottom: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .footer-col-links {
            display: none;
            padding: 4px 0 16px;
          }
          .footer-col-links.open {
            display: flex;
          }
          .footer-col-toggle-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${GOLD};
            transition: transform 0.3s ease;
          }
          .footer-bottom-row {
            flex-direction: column;
            justify-content: center;
            margin-top: 24px;
          }
        }
        @media (max-width: 480px) {
          .footer-container {
            padding: 40px 16px 24px;
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
          {FOOTER_COLS.map(col => {
            const isOpen = openCols[col.title];
            return (
              <div key={col.title} className="footer-col">
                <h5 className="footer-col-header" onClick={() => toggleCol(col.title)}>
                  {col.title}
                  <span className="footer-col-toggle-icon" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
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

