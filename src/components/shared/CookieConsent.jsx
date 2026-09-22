'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const FONT = 'Helvetica, Arial, sans-serif';
const GREEN = '#0B3D2E';
const GOLD = '#E8900A';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookie-consent')) setVisible(true);
    } catch { /* private browsing */ }
  }, []);

  const accept = () => {
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch {}
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem('cookie-consent', 'declined'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        .cc-bar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
          background: #fff; border-top: 1px solid #e0ddd4;
          box-shadow: 0 -4px 24px rgba(0,0,0,.08);
          padding: 18px 24px; display: flex; align-items: center;
          justify-content: center; gap: 16px; flex-wrap: wrap;
          font-family: ${FONT}; animation: cc-slide .35s ease;
        }
        @keyframes cc-slide { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .cc-text { font-size: 13.5px; color: #333; line-height: 1.6; max-width: 640px; }
        .cc-text a { color: ${GOLD}; text-decoration: underline; }
        .cc-btn { padding: 10px 22px; border-radius: 8px; font-size: 13px;
          font-weight: 600; cursor: pointer; border: none; font-family: ${FONT};
          transition: opacity .2s; }
        .cc-btn:hover { opacity: .88; }
        .cc-accept { background: ${GREEN}; color: #fff; }
        .cc-decline { background: #f0ede6; color: #333; }
        @media (max-width: 600px) {
          .cc-bar { flex-direction: column; padding: 16px 16px; gap: 12px; text-align: center; }
          .cc-btns { display: flex; gap: 10px; width: 100%; }
          .cc-btn { flex: 1; }
        }
      `}</style>
      <div className="cc-bar">
        <p className="cc-text">
          We use cookies for analytics and to improve your experience. See our{' '}
          <Link href="/privacy-policy">Privacy Policy</Link> for details.
        </p>
        <div className="cc-btns" style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button className="cc-btn cc-decline" onClick={decline}>Decline</button>
          <button className="cc-btn cc-accept" onClick={accept}>Accept</button>
        </div>
      </div>
    </>
  );
}
