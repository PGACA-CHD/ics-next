'use client';
import { useState } from 'react';

// ── Design tokens (matching brand from source)
const T = {
  f: '#0B3D2E',       // deep forest green - primary
  f3: '#155740',      // mid green
  s: '#1a6648',       // secondary green
  sl: '#E8900A',      // saffron accent
  ch: '#17170F',      // near-black charcoal
  mid: '#5C5C52',     // mid grey-brown
  lt: '#8C8C82',      // light text
  bdr: '#E0DDD4',     // border
  stone: '#F7F6F2',   // light stone (hero only)
};

// ── SVG Icons (no emoji)
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconCheck = ({ color = '#22c55e', size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const WAIcon = () => (
  <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
    <path d="M13 1C6.373 1 1 6.373 1 13c0 2.278.618 4.41 1.695 6.238L1 25l5.95-1.56A11.94 11.94 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z" fill="rgba(255,255,255,0.2)" />
    <path d="M13 3.182c-5.42 0-9.818 4.398-9.818 9.818 0 2.149.694 4.136 1.864 5.758l-1.22 3.597 3.72-1.196a9.76 9.76 0 005.454 1.659c5.42 0 9.818-4.398 9.818-9.818S18.42 3.182 13 3.182zm4.863 13.044c-.202.57-1.188 1.093-1.634 1.12-.41.024-.793.195-2.674-.557-2.25-.9-3.688-3.19-3.8-3.34-.11-.148-.91-1.21-.91-2.31 0-1.098.575-1.638.778-1.858.203-.22.44-.275.587-.275l.42.008c.135.005.316-.051.495.378.184.44.624 1.52.678 1.63.055.11.09.238.017.386-.073.148-.11.24-.22.37l-.33.386c-.11.12-.225.25-.097.49.128.24.572.944 1.228 1.529.844.752 1.556.985 1.776 1.095.22.11.348.092.477-.055.128-.147.55-.641.697-.861.147-.22.293-.184.495-.11.202.073 1.284.606 1.504.716.22.11.367.165.422.256.054.091.054.527-.148 1.097z" fill="#25D366" />
  </svg>
);

const WA_URL = "https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20my%20company%20in%20India.";
const CAL_URL = "https://calendly.com/indiacompanysetup";

const inp = (extra = {}) => ({
  width: "100%",
  padding: "11px 14px",
  border: `1.5px solid ${T.bdr}`,
  borderRadius: 8,
  fontFamily: "inherit",
  fontSize: 14,
  color: T.ch,
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  display: "block",
  transition: "border-color .18s",
  marginBottom: 0,
  ...extra,
});

export default function ContactPage() {
  const [f, setF] = useState({
    firstName: "", lastName: "", email: "", mobile: "",
    company: "", country: "", service: "", teamSize: "", timeline: "", description: "",
  });
  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("form");
  const set = key => e => setF(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!f.firstName.trim() || !f.email.trim()) { setStatus("error"); return; }
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1200); // simulate
  };

  const trustBadges = [
    { icon: <IconClock />, text: "Response within 24 hours" },
    { icon: <IconLock />, text: "Confidentiality maintained" },
    { icon: <IconUsers />, text: "Qualified CA & CS team" },
    { icon: <IconGlobe />, text: "All time zones welcome" },
  ];

  const steps = [
    { n: "1", title: "Book or send a request", desc: "Takes 2 minutes. Pick a calendar slot or fill the form — whichever fits your schedule." },
    { n: "2", title: "We confirm within 24 hours", desc: "Our team reviews your submission and sends a short prep note before the call." },
    { n: "3", title: "30-minute consultation", desc: "We review your business, recommend a structure, and give you a clear India entry plan. No charge." },
    { n: "4", title: "You decide", desc: "No obligation. Most clients engage us after the call because the advice is immediately actionable." },
  ];

  const contacts = [
    { icon: <IconPhone />, val: "+91 99157 31447", href: "tel:+919915731447", sub: "+91 86998 87200 (alternate)" },
    { icon: <IconMail />, val: "info@indiacompanysetup.com", href: "mailto:info@indiacompanysetup.com", sub: "Response within 24 hours" },
    { icon: <IconPin />, val: "SCO 18, Top Floor, Sector 20-D", href: "#", sub: "Chandigarh 160020, India" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .contact-root { color: ${T.ch}; }

        /* ── HERO */
        .hero { background-image: url('/banners and logos/Contact Us.png'); background-size: cover; background-position: center; padding: 72px 48px 56px; position: relative; }
        .hero-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(232,144,10,.12); border: 1px solid rgba(232,144,10,.3);
          color: ${T.sl}; padding: 5px 13px; border-radius: 50px; font-size: 10.5px;
          font-weight: 700; letter-spacing: .8px; text-transform: uppercase; margin-bottom: 22px;
        }
        .hero h1 {
          font-size: clamp(34px, 4.5vw, 56px); font-weight: 600; color: ${T.ch};
          line-height: 1.08; margin-bottom: 18px; max-width: 600px;
        }
        .hero h1 em { font-style: italic; color: ${T.f}; }
        .hero-sub {
          font-size: 15px; color: ${T.mid}; line-height: 1.8; font-weight: 300;
          max-width: 480px; margin-bottom: 36px;
        }
        .trust-strip { display: flex; flex-wrap: wrap; gap: 0; }
        .trust-item {
          display: flex; align-items: center; gap: 8px;
          padding: 0 24px 0 0; margin-right: 8px; margin-bottom: 10px;
          border-right: 1px solid ${T.bdr};
          color: ${T.mid}; font-size: 13px;
        }
        .trust-item:last-child { border-right: none; }
        .trust-item svg { color: ${T.f}; flex-shrink: 0; }

        /* ── MAIN CONTENT */
        .main-section { background: #fff; padding: 64px 48px 80px; }
        .main-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 480px; gap: 56px; align-items: start;
        }

        /* ── LEFT */
        .section-label {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1.8px; color: ${T.f}; margin-bottom: 20px;
        }

        .steps { display: flex; flex-direction: column; margin-bottom: 40px; }
        .step {
          display: grid; grid-template-columns: 36px 1fr;
          gap: 16px; padding: 20px 0;
          border-bottom: 1px solid ${T.bdr};
        }
        .step:first-child { border-top: 1px solid ${T.bdr}; }
        .step-num {
          width: 32px; height: 32px; background: ${T.f}; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 1px;
        }
        .step-title { font-size: 14px; font-weight: 600; color: ${T.ch}; margin-bottom: 5px; }
        .step-desc { font-size: 13px; color: ${T.mid}; line-height: 1.7; font-weight: 300; }

        /* Guide download card */
        .guide-card {
          border: 1px solid ${T.bdr}; border-radius: 12px;
          padding: 22px; margin-bottom: 32px;
          display: flex; align-items: center; gap: 18px;
          background: #fff;
        }
        .guide-icon {
          width: 48px; height: 48px; background: #EDF3F0; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: ${T.f}; flex-shrink: 0;
        }
        .guide-kicker { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: ${T.lt}; font-weight: 700; margin-bottom: 4px; }
        .guide-title { font-size: 15px; font-weight: 600; color: ${T.ch}; margin-bottom: 4px; line-height: 1.3; }
        .guide-desc { font-size: 12px; color: ${T.lt}; line-height: 1.5; }
        .guide-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: ${T.f}; color: #fff; padding: 10px 18px;
          border-radius: 8px; font-size: 13px; font-weight: 600;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
        }

        /* Direct contact */
        .contact-cards { display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px; }
        .contact-card {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 14px 16px; border: 1px solid ${T.bdr}; border-radius: 10px; background: #fff;
        }
        .contact-card-icon {
          width: 38px; height: 38px; background: #EDF3F0; border-radius: 9px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .contact-card a { font-size: 13.5px; font-weight: 600; color: ${T.ch}; text-decoration: none; display: block; margin-bottom: 2px; }
        .contact-card-sub { font-size: 11.5px; color: ${T.lt}; }

        /* PGA card */
        .pga-card { background: ${T.ch}; border-radius: 12px; padding: 20px 22px; }
        .pga-kicker { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${T.sl}; font-weight: 600; margin-bottom: 6px; }
        .pga-name { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 5px; }
        .pga-sub { font-size: 12px; color: rgba(255,255,255,.38); margin-bottom: 12px; line-height: 1.5; }
        .pga-link { font-size: 13px; color: ${T.sl}; font-weight: 600; text-decoration: none; }

        /* ── RIGHT — tabs */
        .tabs-sticky { position: sticky; top: 90px; }
        .tab-switcher {
          display: grid; grid-template-columns: 1fr 1fr;
          background: #fff; border: 1px solid ${T.bdr}; border-radius: 14px;
          padding: 5px; margin-bottom: 14px; gap: 4px;
        }
        .tab-btn {
          border: none; border-radius: 10px; padding: 12px 10px;
          cursor: pointer; transition: background .2s; text-align: center;
          font-family: inherit;
        }
        .tab-btn.active { background: ${T.f}; }
        .tab-btn:not(.active) { background: transparent; }
        .tab-label { font-size: 13px; font-weight: 600; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 2px; }
        .tab-btn.active .tab-label { color: #fff; }
        .tab-btn:not(.active) .tab-label { color: ${T.mid}; }
        .tab-sub { font-size: 11px; font-family: inherit; }
        .tab-btn.active .tab-sub { color: rgba(255,255,255,.5); }
        .tab-btn:not(.active) .tab-sub { color: ${T.lt}; }

        /* Panel */
        .panel {
          background: #fff; border: 1px solid ${T.bdr}; border-radius: 18px;
          overflow: hidden; box-shadow: 0 4px 32px rgba(11,61,46,.06);
        }
        .panel-head { background: ${T.f}; padding: 24px 28px; }
        .panel-head h2 { font-size: 22px; font-weight: 600; color: #fff; margin-bottom: 4px; }
        .panel-head p { font-size: 12.5px; color: rgba(255,255,255,.45); line-height: 1.5; margin-bottom: 14px; }
        .panel-checklist { background: rgba(255,255,255,.08); border-radius: 9px; padding: 14px 16px; }
        .panel-checklist-kicker { font-size: 9.5px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.45); font-weight: 700; margin-bottom: 10px; }
        .panel-checklist-item { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 6px; font-size: 11.5px; color: rgba(255,255,255,.65); line-height: 1.5; }
        .panel-checklist-item strong { color: rgba(255,255,255,.9); }
        .panel-body { padding: 24px 28px; }

        /* Calendar panel */
        .cal-prompt {
          background: ${T.stone}; border-radius: 12px; padding: 28px 24px;
          text-align: center; margin-bottom: 20px;
        }
        .cal-icon-wrap { margin-bottom: 14px; display: flex; align-items: center; justify-content: center; }
        .cal-icon-circle {
          width: 56px; height: 56px; background: #fff; border-radius: 14px;
          border: 1px solid ${T.bdr}; display: flex; align-items: center; justify-content: center;
          color: ${T.f};
        }
        .cal-title { font-size: 20px; font-weight: 600; color: ${T.ch}; margin-bottom: 10px; }
        .cal-desc { font-size: 13px; color: ${T.mid}; line-height: 1.65; margin: 0 auto 20px; max-width: 280px; }
        .cal-main-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${T.f}; color: #fff; padding: 13px 28px;
          border-radius: 9px; font-size: 14px; font-weight: 600;
          text-decoration: none;
        }

        /* Divider */
        .or-divider { display: flex; align-items: center; gap: 10px; margin: 18px 0; color: ${T.lt}; }
        .or-divider div { flex: 1; height: 1px; background: ${T.bdr}; }
        .or-divider span { font-size: 12px; font-weight: 500; }

        /* WA button */
        .wa-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 13px 0; background: #25D366; color: #fff;
          border-radius: 9px; font-size: 14px; font-weight: 600; text-decoration: none;
        }

        /* Form */
        .field-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .field-section { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.8px; color: ${T.lt}; margin-bottom: 10px; margin-top: 4px; }
        .select-wrap { position: relative; }
        .select-arrow { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); color: ${T.lt}; pointer-events: none; }

        .submit-btn {
          width: 100%; padding: 14px 0; background: ${T.f}; color: #fff;
          border: none; border-radius: 9px; font-size: 14.5px; font-weight: 600;
          cursor: pointer; font-family: inherit; display: flex; align-items: center;
          justify-content: center; gap: 8px; transition: opacity .18s;
        }
        .submit-btn:disabled { opacity: .6; cursor: wait; }
        .error-box {
          background: #FFF0F0; border: 1px solid #FFCCCC;
          border-radius: 8px; padding: 10px 14px; margin-bottom: 14px;
          font-size: 13px; color: #C0392B;
        }
        .trust-footer { display: flex; justify-content: center; gap: 18px; margin-top: 14px; flex-wrap: wrap; }
        .trust-footer span { font-size: 11.5px; color: ${T.lt}; display: flex; align-items: center; gap: 5px; }

        /* Success */
        .success-wrap { text-align: center; padding: 28px 8px 20px; }
        .success-icon { width: 56px; height: 56px; background: #EDF3F0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; color: ${T.f}; }
        .success-title { font-size: 24px; font-weight: 600; color: ${T.f}; margin-bottom: 10px; }
        .success-sub { font-size: 13.5px; color: ${T.mid}; line-height: 1.7; max-width: 300px; margin: 0 auto 24px; }
        .success-actions { display: flex; flex-direction: column; gap: 10px; }
        .cal-action-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: ${T.f}; color: #fff; padding: 13px 24px;
          border-radius: 9px; font-size: 14px; font-weight: 600; text-decoration: none;
        }

        /* ── RESPONSIVE */
        @media (max-width: 900px) {
          .hero { padding: 52px 24px 44px; }
          .main-section { padding: 48px 24px 64px; }
          .main-inner { grid-template-columns: 1fr; gap: 40px; }
          .tabs-sticky { position: static; }
          .field-row { grid-template-columns: 1fr; }
          .trust-item { padding-right: 16px; margin-right: 4px; }
        }
        @media (max-width: 560px) {
          .hero { padding: 40px 16px 36px; }
          .main-section { padding: 36px 16px 48px; }
          .guide-card { flex-direction: column; align-items: flex-start; }
          .guide-btn { align-self: flex-start; }
          .panel-head { padding: 20px 20px; }
          .panel-body { padding: 20px 20px; }
          .tab-switcher { gap: 3px; }
        }
      `}</style>

      <div className="contact-root">

        {/* ── HERO */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-badge">Free 30-Min Consultation</div>
            <h1>
              Let's talk about your<br />
              <em>India plans.</em>
            </h1>
            <p className="hero-sub">
              Book a slot directly, or fill the form and our expert team responds within 24 hours.
              No commitment, no jargon.
            </p>
            <div className="trust-strip">
              {trustBadges.map(b => (
                <div key={b.text} className="trust-item">
                  {b.icon}
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN */}
        <section className="main-section">
          <div className="main-inner">

            {/* LEFT */}
            <div>
              {/* What happens next */}
              <div className="section-label">What Happens Next</div>
              <div className="steps" style={{ marginBottom: 40 }}>
                {steps.map(s => (
                  <div key={s.n} className="step">
                    <div className="step-num">{s.n}</div>
                    <div>
                      <div className="step-title">{s.title}</div>
                      <div className="step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guide */}
              <div className="guide-card">
                <div className="guide-icon">
                  <IconDownload />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="guide-kicker">Free Download</div>
                  <div className="guide-title">India Entry Starter Guide</div>
                  <div className="guide-desc">Entity types · FDI routes · DTAA basics · Compliance calendar. Plain English. 5 pages.</div>
                </div>
                <a href="/India-Entry-Starter-Guide.pdf" target="_blank" rel="noopener noreferrer" className="guide-btn">
                  <IconDownload /> Download
                </a>
              </div>

              {/* Direct contact */}
              <div className="section-label">Direct Contact</div>
              <div className="contact-cards">
                {contacts.map(c => (
                  <div key={c.val} className="contact-card">
                    <div className="contact-card-icon">{c.icon}</div>
                    <div>
                      <a href={c.href}>{c.val}</a>
                      <div className="contact-card-sub">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PGA */}
              <div className="pga-card">
                <div className="pga-kicker">Knowledge Partner</div>
                <div className="pga-name">PGA & Co. Chartered Accountants</div>
                <div className="pga-sub">Indian businesses · NRIs · HNIs · Domestic compliance</div>
                <a href="https://pgaca.in" target="_blank" rel="noreferrer" className="pga-link">Visit pgaca.in →</a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="tabs-sticky">

              {/* Tab switcher */}
              <div className="tab-switcher">
                {[
                  { id: "calendar", label: "Book a Slot", icon: <IconCalendar />, sub: "Pick a time instantly" },
                  { id: "form", label: "Send a Request", icon: <IconMail />, sub: "We reply within 24hrs" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className="tab-label">{tab.icon} {tab.label}</div>
                    <div className="tab-sub">{tab.sub}</div>
                  </button>
                ))}
              </div>

              {/* Calendar panel */}
              {activeTab === "calendar" && (
                <div className="panel">
                  <div className="panel-head">
                    <h2>Book a Slot</h2>
                    <p>30-minute consultation · Free · Any time zone</p>
                  </div>
                  <div className="panel-body">
                    <div className="cal-prompt">
                      <div className="cal-icon-wrap">
                        <div className="cal-icon-circle"><IconCalendar /></div>
                      </div>
                      <div className="cal-title">Pick a time that works</div>
                      <p className="cal-desc">
                        Slots available across IST, EST, GMT, GST, and SGT.
                        Typically within 2 business days.
                      </p>
                      <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="cal-main-btn">
                        Open Booking Calendar <IconArrow />
                      </a>
                    </div>

                    <div className="or-divider">
                      <div /><span>or schedule via WhatsApp</span><div />
                    </div>

                    <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="wa-btn">
                      <WAIcon /> WhatsApp to book a time
                    </a>

                    <p style={{ fontSize: 11.5, color: T.lt, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
                      Prefer email?{" "}
                      <a href="mailto:info@indiacompanysetup.com" style={{ color: T.f, fontWeight: 600, textDecoration: "none" }}>
                        info@indiacompanysetup.com
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Form panel */}
              {activeTab === "form" && (
                <div className="panel">
                  <div className="panel-head">
                    <h2>Request a Consultation</h2>
                    <p>CA, CS & accountant team · Confidentiality maintained · Response within 24 hrs</p>
                    <div className="panel-checklist">
                      <div className="panel-checklist-kicker">After the call you receive</div>
                      {[
                        ["Structure recommendation", "Right entity, FDI route & tax setup for your model"],
                        ["Written summary", "Short memo to share with your legal/finance team"],
                        ["Clear next steps", "Timeline, documents needed, and fixed-fee quote"],
                      ].map(([t, d]) => (
                        <div key={t} className="panel-checklist-item">
                          <IconCheck color={T.sl} size={13} />
                          <span><strong>{t}</strong> — {d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="panel-body">
                    {status === "success" ? (
                      <div className="success-wrap">
                        <div className="success-icon">
                          <IconCheck color={T.f} size={26} />
                        </div>
                        <div className="success-title">We'll be in touch!</div>
                        <p className="success-sub">
                          Our expert team will respond within 24 hours to confirm your consultation slot.
                        </p>
                        <div className="success-actions">
                          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="cal-action-btn">
                            <IconCalendar /> Book a slot now
                          </a>
                          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="wa-btn">
                            <WAIcon /> Chat on WhatsApp
                          </a>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="field-section">Your Details</div>
                        <div className="field-group">
                          <div className="field-row">
                            <input placeholder="First name *" type="text" value={f.firstName} onChange={set("firstName")}
                              style={inp({ borderColor: status === "error" && !f.firstName.trim() ? "#E74C3C" : T.bdr })}
                              onFocus={e => e.target.style.borderColor = T.f}
                              onBlur={e => e.target.style.borderColor = (status === "error" && !f.firstName.trim()) ? "#E74C3C" : T.bdr}
                            />
                            <input placeholder="Last name" type="text" value={f.lastName} onChange={set("lastName")}
                              style={inp()}
                              onFocus={e => e.target.style.borderColor = T.f}
                              onBlur={e => e.target.style.borderColor = T.bdr}
                            />
                          </div>
                          <input placeholder="Work email address *" type="email" value={f.email} onChange={set("email")}
                            style={inp({ borderColor: status === "error" && !f.email.trim() ? "#E74C3C" : T.bdr })}
                            onFocus={e => e.target.style.borderColor = T.f}
                            onBlur={e => e.target.style.borderColor = (status === "error" && !f.email.trim()) ? "#E74C3C" : T.bdr}
                          />
                          <input placeholder="Mobile / WhatsApp (with country code)" type="tel" value={f.mobile} onChange={set("mobile")}
                            style={inp()}
                            onFocus={e => e.target.style.borderColor = T.f}
                            onBlur={e => e.target.style.borderColor = T.bdr}
                          />
                        </div>

                        <div className="field-section">Company Details</div>
                        <div className="field-group">
                          <div className="field-row">
                            <input placeholder="Company name" type="text" value={f.company} onChange={set("company")}
                              style={inp()}
                              onFocus={e => e.target.style.borderColor = T.f}
                              onBlur={e => e.target.style.borderColor = T.bdr}
                            />
                            <input placeholder="Country of HQ" type="text" value={f.country} onChange={set("country")}
                              style={inp()}
                              onFocus={e => e.target.style.borderColor = T.f}
                              onBlur={e => e.target.style.borderColor = T.bdr}
                            />
                          </div>
                        </div>

                        <div className="field-section">Your Requirements</div>
                        <div className="field-group">
                          <div className="select-wrap">
                            <select value={f.service} onChange={set("service")}
                              style={inp({ paddingRight: 36, cursor: "pointer", appearance: "none" })}>
                              <option value="">Primary need...</option>
                              <option>Foreign Company Incorporation</option>
                              <option>GCC / Captive Centre Setup</option>
                              <option>International Tax / DTAA Planning</option>
                              <option>Transfer Pricing Documentation</option>
                              <option>FEMA Compliance</option>
                              <option>Ongoing Compliance Retainer</option>
                              <option>General advisory / Not sure yet</option>
                            </select>
                            <span className="select-arrow">
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3.5L5 6.5L8 3.5" /></svg>
                            </span>
                          </div>
                          <div className="field-row">
                            <div className="select-wrap">
                              <select value={f.teamSize} onChange={set("teamSize")}
                                style={inp({ paddingRight: 36, cursor: "pointer", appearance: "none" })}>
                                <option value="">India team size...</option>
                                <option>1–5 people</option>
                                <option>6–20 people</option>
                                <option>21–100 people</option>
                                <option>100+ people</option>
                                <option>Not sure yet</option>
                              </select>
                              <span className="select-arrow">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3.5L5 6.5L8 3.5" /></svg>
                              </span>
                            </div>
                            <div className="select-wrap">
                              <select value={f.timeline} onChange={set("timeline")}
                                style={inp({ paddingRight: 36, cursor: "pointer", appearance: "none" })}>
                                <option value="">Timeline...</option>
                                <option>ASAP (within 30 days)</option>
                                <option>1–3 months</option>
                                <option>3–6 months</option>
                                <option>Exploratory / planning</option>
                              </select>
                              <span className="select-arrow">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3.5L5 6.5L8 3.5" /></svg>
                              </span>
                            </div>
                          </div>
                          <textarea placeholder="Anything else we should know? (optional)"
                            rows={3} value={f.description} onChange={set("description")}
                            style={{ ...inp(), resize: "vertical" }}
                            onFocus={e => e.target.style.borderColor = T.f}
                            onBlur={e => e.target.style.borderColor = T.bdr}
                          />
                        </div>

                        {status === "error" && (
                          <div className="error-box">Please enter your first name and email address.</div>
                        )}

                        <button onClick={handleSubmit} disabled={status === "submitting"} className="submit-btn">
                          {status === "submitting" ? "Sending…" : <><span>Request Free Consultation</span> <IconArrow /></>}
                        </button>

                        <div className="or-divider"><div /><span>or</span><div /></div>

                        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="wa-btn">
                          <WAIcon /> Chat on WhatsApp
                        </a>

                        <div className="trust-footer">
                          {["Confidentiality maintained", "24hr response", "Expert team"].map(t => (
                            <span key={t}><IconCheck size={12} /> {t}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}