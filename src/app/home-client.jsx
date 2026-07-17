'use client';
import React, { useState, useEffect, useRef } from 'react';
import { T, CALENDLY_URL, PHONE, PHONE_RAW } from '@/lib/config';
import { submitToZoho, trackConsultationRequest, trackGuideDownload, trackWhatsApp } from '@/lib/utils';
import PricingTabsSection from './pricing';
import WhatWeDoSection from './WhatWeDoSection';
import NewHeroSection from './NewHeroSection';
import ClientOutcomes from './clientOutcomes';

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const HV = "Helvetica, Arial, sans-serif";   // single font everywhere
const G = "#0B3D2E";   // brand green
const GOLD = "#e69819";   // brand gold
const HS = "clamp(28px, 3vw, 42px)"; // ALL section headings same size

// ─── UNIVERSAL SECTION HEADING ────────────────────────────────────────────────
// green = first half   |   gold = second half (italic)
function SH({ eyebrow, green, gold, center = true, mb = 40 }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: mb, fontFamily: HV }}>
      {eyebrow && (
        <p style={{
          fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase",
          color: G, fontWeight: 700, marginBottom: 14, fontFamily: HV, margin: "0 0 14px"
        }}>{eyebrow}</p>
      )}
      <h2 style={{ fontSize: HS, fontWeight: 700, lineHeight: 1.1, margin: 0, fontFamily: HV }}>
        <span style={{ color: G }}>{green}</span>
        {gold && <>{" "}<em style={{ color: GOLD, fontStyle: "italic" }}>{gold}</em></>}
      </h2>
    </div>
  );
}

// ─── ROUTES ──────────────────────────────────────────────────────────────────
const ROUTES = {
  home: '/', services: '/setup', gcc: '/post-setup', tax: '/international-tax',
  hub: '/knowledge-hub', about: '/about', contact: '/contact', industries: '/industries',
  seo_fcri: '/foreign-company-registration-india', seo_sub: '/subsidiary-company-india',
  seo_tp: '/transfer-pricing-india', seo_fdi: '/fdi-rules-india',
  seo_us: '/us-company-setting-up-india', seo_uk: '/uk-company-setting-up-india',
  seo_uae: '/uae-company-setting-up-india', seo_sg: '/singapore-company-setting-up-india',
  seo_gcc: '/gcc-setup-india', seo_entry: '/india-market-entry-advisory',
  seo_pvtltd: '/private-limited-company-registration-india',
  seo_nri: '/nri-company-registration-india',
  seo_startup: '/startup-foreign-investment-india',
};

// ─── PILL COLOR THEMES ───────────────────────────────────────────────────────
const PILL_THEMES = [
  { acc: "#093024", bg: "rgba(9,48,36,0.09)", bdr: "rgba(9,48,36,0.30)" },
  { acc: "#1a5c9a", bg: "rgba(26,92,154,0.09)", bdr: "rgba(26,92,154,0.30)" },
  { acc: "#7a5f10", bg: "rgba(176,141,42,0.10)", bdr: "rgba(176,141,42,0.38)" },
  { acc: "#3a2d72", bg: "rgba(74,58,138,0.09)", bdr: "rgba(74,58,138,0.30)" },
];

// ─── ICON HELPERS ────────────────────────────────────────────────────────────
const iconWrap = (path, bg) => (
  <div style={{ width: 56, height: 56, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{path}</svg>
  </div>
);
const LaptopIcon = () => iconWrap(<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M0 21h24" /></>, "#E8F3EE");
const BuildingIcon = () => iconWrap(<><path d="M3 21V7l9-4 9 4v14" /><path d="M9 21V11h6v10" /></>, "#FBF0DD");
const BankIcon = () => iconWrap(<><path d="M3 9l9-7 9 7v11H3z" /><path d="M9 22V12h6v10" /></>, "#EDE8F6");
const FactoryIcon = () => iconWrap(<><path d="M2 20V10l6-4v4l6-4v4l6-4v14H2z" /></>, "#E8F0F5");
const MedicalIcon = () => iconWrap(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8M8 12h8" /></>, "#F0EBE8");
const CartIcon = () => iconWrap(<><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>, "#E8F3EE");

const svgIcon = (d, stroke = T.mid) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const ClientsIcon = () => svgIcon(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);
const GlobeIcon = () => svgIcon(<><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>);
const MarketIcon = () => svgIcon(<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>);
const StarIcon = () => svgIcon(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>);

// ─── SPEED ICON ──────────────────────────────────────────────────────────────
function SpeedIcon({ size = 64 }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => { const id = setInterval(() => setPulse(p => !p), 1500); return () => clearInterval(id); }, []);
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transition: "transform 0.3s", transform: pulse ? "scale(1.06)" : "scale(1)" }}>
      <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={G} /><stop offset="100%" stopColor={GOLD} /></linearGradient></defs>
      <circle cx={r} cy={r} r={r - 3} fill="none" stroke="url(#sg)" strokeWidth="2.5" />
      <line x1={r} y1={r} x2={r + (r * 0.55)} y2={r - (r * 0.25)} stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx={r} cy={r} r="3.5" fill={G} /><circle cx={r} cy={r} r="1.8" fill={GOLD} />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
        <line key={deg} x1={r} y1={5} x2={r} y2={9} stroke={G} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" transform={`rotate(${deg},${r},${r})`} />
      ))}
    </svg>
  );
}

// ─── WINDOW WIDTH HOOK ───────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const fn = () => setW(window.innerWidth); window.addEventListener("resize", fn); return () => window.removeEventListener("resize", fn); }, []);
  return w;
}

// ─── AUDIENCE PATHS ──────────────────────────────────────────────────────────
const AUTO_DUR = 5000;
function AudiencePathsSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(null);
  const startRef = useRef(null);
  const w = useWindowWidth();
  const mob = w < 640, tab = w >= 640 && w < 1024;

  const SITS = [
    {
      n: "01", tab: "Setting up a subsidiary", headline: "Setting up an India subsidiary",
      desc: "You're a CFO, legal counsel, or finance director at a foreign company that needs an India presence. You need the right structure, compliant FDI filings, and a team that handles the full picture — not just the paperwork.",
      bullets: ["WOS or Branch Office structure", "FDI route & RBI compliance", "Transfer pricing from day one", "Full post-incorporation handover"],
      stat: "2–3 Weeks", statLabel: "Typical time from structure sign-off to incorporation certificate.", cta: "Foreign company guide", page: "seo_fcri"
    },
    {
      n: "02", tab: "Building from scratch", headline: "Building a team in India",
      desc: "You're setting up a Global Capability Centre — 10 to 200+ people. You need entity setup, payroll, ESOP structuring, cost-plus pricing, and a compliance retainer that scales as you hire.",
      bullets: ["End-to-end GCC advisory", "Payroll & HR compliance", "ESOP & incentive structuring", "Ongoing compliance retainer"],
      stat: "6 Weeks", statLabel: "Typical time from engagement to first hire onboarded.", cta: "GCC advisory", page: "gcc"
    },
    {
      n: "03", tab: "Something isn't right", headline: "Something isn't right",
      desc: "Your India entity is live but the structure was set up quickly, the transfer pricing is undocumented, or your compliance is behind. We assess, fix, and maintain — without starting over.",
      bullets: ["Structure & TP health check", "FEMA & RBI regularisation", "Back-filing & penalty mitigation", "Ongoing compliance takeover"],
      stat: "< 30 days", statLabel: "Typical time to full compliance from first review call.", cta: "Get a review", page: "contact"
    },
    {
      n: "04", tab: "NRI investing in India", headline: "NRI investing or returning to India",
      desc: "You live abroad and want to invest in or start a business in India — or you're returning to India and your FEMA and tax status is changing. Two situations, one advisory team.",
      bullets: ["Schedule 4 FEMA — NRI investment route", "Residency transition planning", "NRE/FCNR account handling", "RNOR tax optimisation"],
      stat: "1–2 Weeks", statLabel: "Typical time to structure advice and filing readiness.", cta: "NRI guide", page: "seo_nri"
    },
    {
      n: "05", tab: "Raising an India round", headline: "Raising your first foreign round",
      desc: "Your startup is raising from foreign angels or VCs. CCPS, CCD, SAFE — getting the instrument, valuation, and FCGPR right determines how clean your cap table looks at Series A.",
      bullets: ["CCPS / CCD structuring", "Angel tax — DPIIT recognition", "FEMA valuation compliance", "FC-GPR within 30 days"],
      stat: "30 days", statLabel: "FC-GPR must be filed within 30 days of share allotment.", cta: "Startup funding guide", page: "seo_startup"
    },
    {
      n: "06", tab: "Incorporating a Pvt Ltd", headline: "Incorporating a Pvt Ltd in India",
      desc: "You're an Indian founder, entrepreneur, or promoter incorporating a Private Limited Company. You want it done right — right objects clause, right share structure, FDI-ready if investors come later.",
      bullets: ["MOA objects clause advice", "Share capital structure", "FDI-ready from day one", "Post-incorporation compliance"],
      stat: "7–10 days", statLabel: "Typical MCA incorporation after document submission.", cta: "Pvt Ltd registration guide", page: "seo_pvtltd"
    },
  ];

  useEffect(() => {
    startRef.current = performance.now();
    function tick(now) {
      const el = now - startRef.current;
      setProgress(Math.min((el / AUTO_DUR) * 100, 100));
      if (el >= AUTO_DUR) { setActive(a => (a + 1) % SITS.length); startRef.current = performance.now(); setProgress(0); }
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active]);

  const s = SITS[active];

  return (
    <section style={{ padding: mob ? "48px 20px 40px" : tab ? "60px 32px 48px" : "80px 56px 48px", background: "#fff", fontFamily: HV }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SH eyebrow="" green="Six situations." gold="One structured conversation." />

        {/* Tab pills */}
        <div style={{ display: mob ? "grid" : "flex", gridTemplateColumns: mob ? "1fr 1fr" : undefined, gap: 8, marginBottom: 14, flexWrap: "nowrap" }}>
          {SITS.map((sit, i) => (
            <button key={sit.n} onClick={() => { setActive(i); setProgress(0); }} style={{
              flex: mob ? undefined : "1 1 0", background: "#fff",
              border: `1.5px solid ${i === active ? G : T.bdr}`, borderRadius: 50,
              padding: mob ? "9px 10px" : "10px 16px", cursor: "pointer", fontFamily: HV,
              position: "relative", overflow: "hidden", textAlign: "center", whiteSpace: "nowrap",
            }}>
              <span style={{ fontSize: mob ? 10 : 11, fontWeight: 700, color: i === active ? GOLD : T.lt, marginRight: 4, fontFamily: HV }}>{sit.n}</span>
              <span style={{ fontSize: mob ? 13 : 15.5, fontWeight: 600, color: "#000", fontFamily: HV }}>{sit.tab}</span>
              {i === active && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: T.bdr }}>
                  <div style={{ height: "100%", background: G, width: `${progress}%`, transition: "none", borderRadius: "0 2px 2px 0" }} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div style={{
          background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: "hidden",
          display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "1fr 220px" : "1fr 280px", alignItems: "stretch"
        }}>

          {/* Left */}
          <div style={{
            padding: mob ? "20px" : tab ? "20px 28px" : "24px 40px",
            borderBottom: mob ? `1px solid ${T.bdr}` : "none",
            borderRight: mob ? "none" : `1px solid ${T.bdr}`,
            display: "flex", flexDirection: "column", justifyContent: "center"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: mob ? "1fr" : "1fr auto",
              gridTemplateRows: mob ? "auto" : "auto 1fr",
              gap: mob ? 12 : `10px 28px`, alignItems: "start"
            }}>

              <div style={{ display: "flex", alignItems: "center", gap: 10, gridColumn: 1, gridRow: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: GOLD, flexShrink: 0, fontFamily: HV }}>{s.n}</span>
                <div style={{ width: 20, height: 1, background: T.bdr, flexShrink: 0 }} />
                <h3 style={{ fontSize: "clamp(16px,1.7vw,22px)", fontWeight: 700, color: "#000", margin: 0, lineHeight: 1.3, fontFamily: HV }}>{s.headline}</h3>
              </div>

              <p style={{
                fontSize: 14, color: "#444", lineHeight: 1.75, fontWeight: 400, margin: 0, fontFamily: HV,
                gridColumn: 1, gridRow: mob ? "auto" : 2
              }}>{s.desc}</p>

              {/* Colored pills */}
              {!mob && (
                <div style={{ gridColumn: 2, gridRow: "1 / 3", display: "flex", flexDirection: "column", justifyContent: "center", gap: 7, alignSelf: "stretch" }}>
                  {s.bullets.map((b, bi) => {
                    const th = PILL_THEMES[bi % 4]; return (
                      <span key={b} style={{
                        display: "inline-flex", alignItems: "center",
                        background: th.bg, border: `1px solid ${th.bdr}`, borderRadius: 50,
                        padding: "7px 16px", fontSize: 13.5, color: th.acc, whiteSpace: "nowrap",
                        fontWeight: 600, fontFamily: HV
                      }}>{b}</span>
                    );
                  })}
                </div>
              )}
              {mob && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.bullets.map((b, bi) => {
                    const th = PILL_THEMES[bi % 4]; return (
                      <span key={b} style={{
                        display: "inline-flex", alignItems: "center",
                        background: th.bg, border: `1px solid ${th.bdr}`, borderRadius: 50,
                        padding: "6px 13px", fontSize: 13, color: th.acc, whiteSpace: "nowrap",
                        fontWeight: 600, fontFamily: HV
                      }}>{b}</span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          {!mob && (
            <div style={{
              padding: "28px", background: "linear-gradient(160deg,#f0f7f4 0%,#fdf6e8 100%)",
              display: "flex", flexDirection: "column", justifyContent: "center", gap: 14,
              borderLeft: "3px solid #e69819"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <SpeedIcon size={tab ? 52 : 64} />
                <div style={{ fontSize: "clamp(22px,2.4vw,34px)", color: GOLD, lineHeight: 1, fontWeight: 700, fontFamily: HV }}>{s.stat}</div>
              </div>
              <p style={{ fontSize: 13, color: "#5C5C54", lineHeight: 1.65, margin: 0, fontFamily: HV }}>{s.statLabel}</p>
              <button onClick={() => { window.location.href = ROUTES[s.page] || "/"; }} style={{
                background: `linear-gradient(135deg,${G},#145c42)`, color: "#fff", border: "none",
                borderRadius: 7, padding: "12px 18px", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: HV, transition: "transform 0.2s,box-shadow 0.2s",
                boxShadow: "0 2px 8px rgba(11,61,46,0.2)"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(11,61,46,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(11,61,46,0.2)"; }}>
                {s.cta} →
              </button>
            </div>
          )}
          {mob && (
            <div style={{
              padding: "20px", background: "linear-gradient(160deg,#f0f7f4 0%,#fdf6e8 100%)",
              display: "flex", alignItems: "center", gap: 16, borderTop: "3px solid #e69819"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <SpeedIcon size={44} />
                <div>
                  <div style={{ fontSize: 22, color: GOLD, lineHeight: 1, fontWeight: 700, fontFamily: HV }}>{s.stat}</div>
                  <p style={{ fontSize: 12, color: "#5C5C54", lineHeight: 1.5, margin: "4px 0 0", fontFamily: HV }}>{s.statLabel}</p>
                </div>
              </div>
              <button onClick={() => { window.location.href = ROUTES[s.page] || "/"; }} style={{
                background: `linear-gradient(135deg,${G},#145c42)`, color: "#fff", border: "none",
                borderRadius: 7, padding: "10px 14px", fontSize: 12.5, fontWeight: 600,
                cursor: "pointer", fontFamily: HV, flexShrink: 0
              }}>{s.cta} →</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── STATS RIBBON ────────────────────────────────────────────────────────────
function useCountUp(target, dur = 1600, suffix = "") {
  const [val, setVal] = useState("0" + suffix);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      if (typeof target !== "number") { setVal(target); return; }
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * target) + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, dur, suffix]);
  return [val, ref];
}

function StatCard({ target, suffix = "", label, subLabel, gradient, border, valueColor, idx }) {
  const [val, numRef] = useCountUp(target, 1600, suffix);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVis(true), idx * 100); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [idx]);

  return (
    <div ref={el => { cardRef.current = el; numRef.current = el; }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: gradient, borderRadius: 16, padding: "32px 28px",
        display: "flex", flexDirection: "column", minWidth: 0,
        border: `1px solid ${border || "rgba(0,0,0,0.06)"}`,
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-6px)" : "translateY(0)") : "translateY(24px)",
        transition: vis
          ? "transform 0.25s ease, box-shadow 0.25s ease, opacity 0.5s ease"
          : `opacity 0.5s ease ${idx * 100}ms, transform 0.5s ease ${idx * 100}ms`,
        boxShadow: hov ? "0 12px 32px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "default",
      }}>
      <span style={{
        fontSize: 10.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "#777", display: "block", marginBottom: 24, fontFamily: HV
      }}>{label}</span>
      <div style={{
        fontSize: "clamp(32px,3.2vw,52px)", fontWeight: 700, color: valueColor || GOLD, lineHeight: 1,
        letterSpacing: "-.02em", marginBottom: 8, whiteSpace: "nowrap", fontFamily: HV
      }}>{val}</div>
      <span style={{ fontSize: 12.5, color: "#555", display: "block", marginTop: 4, fontFamily: HV }}>{subLabel}</span>
    </div>
  );
}

function StatsRibbon() {
  return (
    <section style={{ background: "#fff", padding: "80px 20px", fontFamily: HV }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 40 }}>
          <SH green="Numbers that speak" gold="for themselves." mb={16} />
        </div>

        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            {
              target: 100, suffix: "+", label: "ENTITIES", subLabel: "Companies incorporated",
              gradient: "linear-gradient(160deg,#EAF4EF 0%,#F5FAF7 100%)", border: "rgba(9,48,36,0.16)", valueColor: G
            },
            {
              target: 18, suffix: " yrs", label: "EXPERIENCE", subLabel: "In continuous practice",
              gradient: "linear-gradient(160deg,#EAF1F8 0%,#F5F9FC 100%)", border: "rgba(26,92,154,0.18)", valueColor: "#1a5c9a"
            },
            {
              target: 22, suffix: " days", label: "SPEED", subLabel: "Median time to operational entity",
              gradient: "linear-gradient(160deg,#FCF3E1 0%,#FEFAF0 100%)", border: "rgba(230,152,25,0.24)", valueColor: GOLD
            },
            {
              target: 90, suffix: "+", label: "TREATIES", subLabel: "Jurisdictions covered",
              gradient: "linear-gradient(160deg,#EAF4EF 0%,#FCF3E1 100%)", border: "rgba(9,48,36,0.14)", valueColor: G
            },
          ].map((s, i) => (
            <StatCard key={s.label} {...s} idx={i} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
          <button onClick={() => { window.location.href = "/contact"; }}
            style={{
              background: G, color: "#fff", border: "none", borderRadius: 8,
              padding: "14px 32px", fontSize: 14.5, fontWeight: 600, cursor: "pointer",
              fontFamily: HV, boxShadow: "0 4px 16px rgba(11,61,46,0.18)"
            }}>
            Get in touch now! →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── MAP LINES OVERLAY ───────────────────────────────────────────────────────
function MapLinesOverlay() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const NODES = [{ x: 71, y: 51 }, { x: 49.5, y: 22 }, { x: 63.5, y: 37 }, { x: 22, y: 31 }, { x: 79.5, y: 51 }, { x: 86.5, y: 70 }];
    const EDGES = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];
    const pulses = EDGES.map(([a, b], i) => ({ a, b, t: i / EDGES.length, speed: 0.004 + Math.random() * 0.002 }));
    function resize() {
      const r = canvas.parentElement.getBoundingClientRect();
      canvas.style.width = r.width + "px"; canvas.style.height = r.height + "px";
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function pt(x, y) { return [x / 100 * (canvas.width / dpr), y / 100 * (canvas.height / dpr)]; }
    function draw() {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      EDGES.forEach(([ai, bi]) => {
        const [ax, ay] = pt(NODES[ai].x, NODES[ai].y), [bx, by] = pt(NODES[bi].x, NODES[bi].y);
        const cpx = (ax + bx) / 2, cpy = Math.min(ay, by) - Math.abs(bx - ax) * 0.32;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(cpx, cpy, bx, by);
        ctx.strokeStyle = "rgba(11,61,46,0.65)"; ctx.lineWidth = 1.8; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);
      });
      NODES.forEach((n, i) => {
        const [nx, ny] = pt(n.x, n.y), hub = i === 0;
        ctx.beginPath(); ctx.arc(nx, ny, hub ? 10 : 7, 0, Math.PI * 2); ctx.strokeStyle = hub ? "rgba(11,61,46,0.6)" : "rgba(11,61,46,0.5)"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(nx, ny, hub ? 5.5 : 4, 0, Math.PI * 2); ctx.fillStyle = G; ctx.fill();
        ctx.beginPath(); ctx.arc(nx, ny, hub ? 2.5 : 1.8, 0, Math.PI * 2); ctx.fillStyle = hub ? GOLD : "#fff"; ctx.fill();
      });
      pulses.forEach(pulse => {
        pulse.t = (pulse.t + pulse.speed) % 1;
        const [ax, ay] = pt(NODES[pulse.a].x, NODES[pulse.a].y), [bx, by] = pt(NODES[pulse.b].x, NODES[pulse.b].y);
        const cpx = (ax + bx) / 2, cpy = Math.min(ay, by) - Math.abs(bx - ax) * 0.32, t = pulse.t;
        const qx = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * cpx + t * t * bx, qy = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * cpy + t * t * by;
        const gr = ctx.createRadialGradient(qx, qy, 0, qx, qy, 10);
        gr.addColorStop(0, "rgba(11,61,46,0.8)"); gr.addColorStop(1, "rgba(11,61,46,0)");
        ctx.beginPath(); ctx.arc(qx, qy, 10, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
        ctx.beginPath(); ctx.arc(qx, qy, 4, 0, Math.PI * 2); ctx.fillStyle = G; ctx.fill();
        ctx.beginPath(); ctx.arc(qx, qy, 1.8, 0, Math.PI * 2); ctx.fillStyle = GOLD; ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    }
    resize(); draw();
    const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

// ─── PROCESS STEP ────────────────────────────────────────────────────────────
function ProcessStep({ step, i, total }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(ref.current); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "64px 1fr", gap: 24, position: "relative",
      opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-20px)",
      transition: `opacity 0.45s ease ${i * 120}ms,transform 0.45s ease ${i * 120}ms`
    }}>
      {i < total - 1 && <div style={{
        position: "absolute", left: 31, top: 52, bottom: -1, width: 2,
        background: vis ? `linear-gradient(${G}66,${T.bdr})` : T.bdr,
        transition: `background 0.5s ease ${i * 120 + 300}ms`
      }} />}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
        <div style={{
          width: 48, height: 48, background: vis ? G : "#fff", borderRadius: "50%",
          border: `2px solid ${vis ? G : T.bdr}`, display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, boxShadow: vis ? `0 0 0 5px #f5f5f0,0 0 0 7px ${G}33` : "none",
          transition: `background 0.35s ease ${i * 120 + 150}ms,border-color 0.35s ease ${i * 120 + 150}ms,box-shadow 0.35s ease ${i * 120 + 150}ms`
        }}>
          <span style={{
            fontSize: 14, color: vis ? "#fff" : T.lt, fontWeight: 700,
            transition: `color 0.3s ease ${i * 120 + 200}ms`, fontFamily: HV
          }}>{step.n}</span>
        </div>
      </div>
      <div style={{ paddingBottom: i < total - 1 ? 40 : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h3 style={{ fontSize: 16.5, fontWeight: 700, color: "#000", fontFamily: HV }}>{step.title}</h3>
          <span style={{
            fontSize: 11, background: G, color: "#fff", padding: "2px 10px", borderRadius: 50,
            fontWeight: 600, letterSpacing: .3, flexShrink: 0, fontFamily: HV
          }}>{step.time}</span>
        </div>
        <p style={{ fontSize: 14, color: "#444", lineHeight: 1.78, fontWeight: 400, margin: 0, fontFamily: HV }}>{step.desc}</p>
      </div>
    </div>
  );
}

// ─── KNOWLEDGE HUB ───────────────────────────────────────────────────────────
const CF_URL = "https://cdn.contentful.com/spaces/qjo3cpray5h2/environments/master/entries";
const CF_TOK = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN || "Me3wAoh5C8R-voHvn3buH1R3nWLM9f4QrT6jKVaWDtY";
const TAG_COL = { "Guide": "#0B3D2E", "Deep Dive": "#4A6FA5", "Compliance": "#C17D2A", "Tax Planning": "#5C7A4A", "How-To": "#5C5C52", "Update": "#7B4A9A", "General": "#888" };

function KnowledgeHubSection() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${CF_URL}?content_type=article&order=-fields.publishedDate&limit=4`, { headers: { Authorization: `Bearer ${CF_TOK}` } })
      .then(r => r.json()).then(d => {
        setPosts((d.items || []).slice(0, 4).map(it => ({
          slug: it.fields.slug || it.sys.id, title: it.fields.title || "",
          summary: it.fields.summary || "",
          date: it.fields.publishedDate ? new Date(it.fields.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "",
          tag: it.fields.tag || it.fields.category || "Guide",
          readTime: it.fields.readTime || "5 min read",
        })));
      }).catch(e => console.warn("KH fetch failed:", e));
  }, []);

  return (
    <section style={{ padding: "80px 56px", background: "#fff", fontFamily: HV }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
          <SH eyebrow="Knowledge Hub" green="Insights for global companies" gold="entering India." center={false} mb={0} />
          <button className="ics-btn ics-btn-outline" onClick={() => { window.location.href = ROUTES.hub; }}>View All Articles →</button>
        </div>
        <div className="kh-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {(posts.length ? posts : [1, 2, 3, 4].map(i => ({ slug: i, title: "", summary: "", date: "", tag: "Guide", readTime: "" }))).map((post, pi) => (
            post.title ? (
              <a key={post.slug} href={`/knowledge-hub/${post.slug}`}
                style={{
                  textDecoration: "none", display: "flex", flexDirection: "column",
                  background: "#fff", borderRadius: 16, padding: "28px 24px", border: `1px solid ${T.bdr}`,
                  transition: "transform .2s,box-shadow .2s", cursor: "pointer", fontFamily: HV
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,.09)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase",
                    color: TAG_COL[post.tag] || "#888", background: (TAG_COL[post.tag] || "#888") + "18",
                    padding: "3px 10px", borderRadius: 50, fontFamily: HV
                  }}>{post.tag}</span>
                  <span style={{ fontSize: 11, color: "#888", fontFamily: HV }}>{post.date}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#000", lineHeight: 1.35, marginBottom: 10, flex: 1, fontFamily: HV }}>{post.title}</h3>
                {post.summary && <p style={{
                  fontSize: 13, color: "#555", lineHeight: 1.7, fontWeight: 400, marginBottom: 18,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontFamily: HV
                }}>{post.summary}</p>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${T.bdr}`, paddingTop: 14, marginTop: "auto" }}>
                  <span style={{ fontSize: 11.5, color: "#888", fontFamily: HV }}>{post.readTime}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: G, fontFamily: HV }}>Read →</span>
                </div>
              </a>
            ) : (
              <div key={pi} style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: `1px solid ${T.bdr}` }}>
                <div style={{ height: 12, background: T.bdr, borderRadius: 4, marginBottom: 12, width: "40%" }} />
                <div style={{ height: 18, background: T.bdr, borderRadius: 4, marginBottom: 8 }} />
                <div style={{ height: 14, background: T.bdr, borderRadius: 4, width: "80%" }} />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN HOME PAGE ──────────────────────────────────────────────────────────
export default function HomePage() {
  const [hf, setHf] = useState({ nameTitle: "", email: "", companyCountry: "", service: "" });
  const [hStatus, setHStatus] = useState("idle");
  const setH = k => e => setHf(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!hf.nameTitle.trim() || !hf.email.trim()) { setHStatus("error"); return; }
    setHStatus("submitting");
    try {
      const parts = hf.nameTitle.trim().split(" ");
      const ccParts = hf.companyCountry.split(",");
      await submitToZoho({
        firstName: parts[0], lastName: parts.slice(1).join(" ") || "-",
        email: hf.email, mobile: "", company: ccParts[0]?.trim() || hf.companyCountry,
        country: ccParts.slice(1).join(",").trim() || "", service: hf.service, description: "", source: "Website Hero Form"
      });
      setHStatus("success"); trackConsultationRequest("Hero Form");
    } catch { setHStatus("error"); }
  };

  const process = [
    { n: "01", title: "Free Consultation", time: "Day 1", desc: "30 minutes. We understand your business model, India objectives, and team plan — then give you a clear structure recommendation before any engagement begins." },
    { n: "02", title: "Structure Design", time: "Week 1", desc: "Entity type, FDI route, transfer pricing model, DTAA analysis, PE risk check. Designed before any filing — never retrofitted after." },
    { n: "03", title: "Incorporation", time: "Weeks 2–3", desc: "MCA SPICe+ filing, DIN, DSC, PAN, TAN, Certificate of Incorporation. Typical timeline: 7–12 working days after document submission." },
    { n: "04", title: "Post-Incorporation Setup", time: "Week 4", desc: "RBI FCGPR filing, GST registration, bank account, payroll setup, and your complete compliance calendar — handed over ready to use." },
    { n: "05", title: "Ongoing Compliance", time: "Month 2+", desc: "Monthly retainer: GST, TDS, payroll, MCA filings, annual audit, corporate tax return. One firm, full coverage, fixed fee." },
  ];

  const inp = (extra = {}) => ({
    width: "100%", padding: "12px 15px", border: `1.5px solid ${T.bdr}`, borderRadius: 7,
    fontFamily: HV, fontSize: 13.5, color: "#000", background: "#fff", outline: "none",
    marginBottom: 10, boxSizing: "border-box", transition: "border-color .18s", ...extra,
  });

  return (
    <div style={{ overflowX: "hidden", width: "100%", fontFamily: HV }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        *,*::before,*::after { font-family: Helvetica, Arial, sans-serif !important; }
        @keyframes waveShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:600px){.stats-grid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important;}}
        @media(max-width:420px){.stats-grid{grid-template-columns:1fr!important;}}
        /* KH grid responsive */
        @media(max-width:900px){.kh-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:600px){.kh-grid{grid-template-columns:1fr!important;}}
        /* Ind cards responsive */
        @media(max-width:900px){.ind-cards{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:600px){.ind-cards{grid-template-columns:repeat(2,1fr)!important;}}
        /* Global reach */
        .gr-wrap{background:#fff;border-radius:24px;box-shadow:0 2px 40px rgba(0,0,0,.06);border:1px solid #ECE7E1;display:grid;grid-template-columns:38% 62%;align-items:stretch;overflow:hidden;}
        .gr-left{padding:36px 32px;border-right:1px solid #ECE7E1;display:flex;flex-direction:column;gap:18px;height:fit-content;}
        .gr-map{position:relative;overflow:hidden;padding:20px;}
        .gr-map-img{position:absolute;inset:20px;width:calc(100% - 40px);height:calc(100% - 40px);object-fit:contain;filter:saturate(0.18) brightness(1.08) sepia(0.06);opacity:0.75;}
        .gr-map canvas{position:absolute!important;inset:20px!important;width:calc(100% - 40px)!important;height:calc(100% - 40px)!important;pointer-events:none;}
        @media(max-width:1024px){.gr-wrap{grid-template-columns:1fr;}.gr-left{border-right:none!important;border-bottom:1px solid #ECE7E1;}.gr-map{height:320px;}}
        @media(max-width:640px){.gr-section{padding:0 16px 48px!important;}.gr-wrap{border-radius:16px;}.gr-left{padding:24px 18px!important;}.gr-map{height:240px;}.gr-btns{flex-direction:column!important;}}
        @media(max-width:480px){.gr-map{height:200px;padding:12px;}.gr-map-img{inset:12px;width:calc(100% - 24px);height:calc(100% - 24px);}.gr-map canvas{inset:12px!important;width:calc(100% - 24px)!important;height:calc(100% - 24px)!important;}.gr-left{gap:14px!important;}}
        /* Pricing — non-featured buttons green */
        .pricing-card:not(.pricing-featured) .pricing-cta-btn{background:#0B3D2E!important;color:#fff!important;border-color:#0B3D2E!important;}
        .pricing-card:not(.pricing-featured) .pricing-cta-btn:hover{background:#145c42!important;border-color:#145c42!important;}
        /* Process grid responsive */
        @media(max-width:900px){.process-grid{grid-template-columns:1fr!important;}.process-sticky{position:relative!important;top:0!important;margin-bottom:32px;}}
        /* Final CTA grid responsive */
        @media(max-width:900px){.final-cta-grid{grid-template-columns:1fr!important;}}
        /* Quote callout ("Talk to Our Expert Team") responsive */
        @media(max-width:768px){
          .quote-callout-sec{padding:0 16px 48px!important;}
          .quote-callout-grid{grid-template-columns:1fr!important;padding:28px 24px!important;gap:20px!important;text-align:center;}
          .quote-callout-grid button{width:100%;justify-content:center;}
        }
        /* DTAA / Tax Advantage section responsive */
        @media(max-width:768px){
          .dtaa-sec{padding:0 16px 48px!important;}
          .dtaa-grid{grid-template-columns:1fr!important;padding:28px 24px!important;gap:20px!important;}
          .dtaa-grid > div:last-child{flex-direction:row!important;flex-wrap:wrap;}
          .dtaa-grid > div:last-child button{flex:1 1 auto;}
        }
        @media(max-width:480px){
          .dtaa-grid > div:last-child{flex-direction:column!important;}
          .dtaa-grid > div:last-child button{width:100%;}
        }
      `}</style>

      {/* ── HERO ── */}
      <NewHeroSection T={T} ROUTES={ROUTES} />

      {/* ── LOGO MARQUEE ── */}
      <section style={{ padding: "44px 0", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          {/* Same heading style — green + gold */}
          <h2 style={{ fontSize: HS, fontWeight: 700, fontFamily: HV, margin: 0 }}>
            <span style={{ color: G }}>Trusted by</span>{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>100+ companies worldwide</em>
          </h2>
          <div style={{ width: 32, height: 2, background: G, borderRadius: 2, margin: "10px auto 0" }} />
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "8%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(90deg,#fff,transparent)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "8%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(270deg,#fff,transparent)" }} />

          {/* Row 1: Scrolls Left */}
          <div className="logo-row-left" style={{ display: "flex", width: "max-content", alignItems: "center" }}>
            {[...Array(2)].map((_, di) => (
              <div key={di} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {["Protiviti India", "Mahindra Defence Systems", "Saregama India", "Ethos Limited",
                  "Polyplex Corporation Limited (Listed)", "Kuantom Papers Limited", "Tube Investment of India",
                  "Vibracoustic India Private Limited", "Newtech Filter (BOSCH group Company)",
                  "Godrej, UAE entities", "Ognibene power", "Cloud EQ"].map(name => (
                    <div key={`${di}-${name}`} style={{ flexShrink: 0, width: 150, height: 72, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
                      <img src={`/logos/${encodeURIComponent(name)}.png`} alt={name}
                        style={{ maxWidth: "130px", maxHeight: "50px", width: "auto", height: "auto", objectFit: "contain" }} />
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Row 2: Scrolls Right */}
          <div className="logo-row-right" style={{ display: "flex", width: "max-content", alignItems: "center", marginTop: 8 }}>
            {[...Array(2)].map((_, di) => (
              <div key={di} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {["Defacto Infotech India, AU, US", "CrimsonInsights", "Alleshealth", "Foodjam",
                  "Grid advertising", "Talink", "Mcube capital", "SML Mahindra Limited",
                  "Cheema Boilers Limited", "AWFIS India Private Limited", "Skin elements",
                  "Vyra Life (Modebencura)"].map(name => (
                    <div key={`${di}-${name}`} style={{ flexShrink: 0, width: 150, height: 72, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
                      <img src={`/logos/${encodeURIComponent(name)}.png`} alt={name}
                        style={{ maxWidth: "130px", maxHeight: "50px", width: "auto", height: "auto", objectFit: "contain" }} />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsRibbon />

      {/* ── AUDIENCE PATHS ── */}
      <AudiencePathsSection />
      {/* WhatWeDoSection — bg white, card numbers black, wave gradient cards */}
      <WhatWeDoSection T={T} ROUTES={ROUTES} />
      <ClientOutcomes />

      <section className="quote-callout-sec" style={{ padding: "0 56px 60px", background: "#fff" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="quote-callout-grid" style={{
            position: "relative", overflow: "hidden",
            backgroundImage: "url('/banners and logos/2.png')",
            backgroundSize: "cover", backgroundPosition: "center",
            borderRadius: 18, padding: "38px 44px",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center"
          }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", borderRadius: 18 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 19, color: "rgba(255,255,255,.95)", lineHeight: 1.65, fontWeight: 400, fontFamily: HV, fontStyle: "italic", margin: 0 }}>
                "Most foreign companies enter India with the wrong structure and fix it at audit time. We design it right the first time — saving you 2–3× the cost in corrections."
              </p>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.4)", margin: "12px 0 0", fontFamily: HV }}>
                — P.G., FCA · Diploma in International Taxation · 8 yrs Ex-Big 4
              </p>
            </div>
            <button className="ics-btn ics-btn-primary ics-btn-lg" style={{ flexShrink: 0, position: "relative", zIndex: 1 }}
              onClick={() => { window.location.href = ROUTES.contact; }}>Talk to Our Expert Team →</button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: "108px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 72, alignItems: "start" }}>
            <div className="process-sticky" style={{ position: "sticky", top: 100 }}>
              <SH eyebrow="The Process" green="What happens after" gold="you contact us." center={false} mb={18} />
              <p style={{ fontSize: 15, color: "#444", lineHeight: 1.82, fontWeight: 400, marginBottom: 28, fontFamily: HV }}>
                No black box. You know exactly what we're doing, when, and why. Most companies are operational within 30 days of first contact.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Free 30-min strategy call", "No retainer to start", "One point of contact", "Fixed, transparent fees"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 20, height: 20, background: G, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: "#444", fontFamily: HV }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {process.map((step, i) => <ProcessStep key={step.n} step={step} i={i} total={process.length} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── note: bg white enforced via global styles below */}
      <PricingTabsSection T={T} ROUTES={ROUTES} />

      {/* ── INDUSTRIES ── */}
      <section style={{ padding: "40px 64px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SH eyebrow="Industries We Serve" green="Sectors we know" gold="deeply." mb={40} />
          <div className="ind-cards" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16 }}>
            {[
              { img: "/banners and logos/SAAS.png", name: "SaaS &\nTechnology", proof: "30+ companies", detail: "USA, Singapore & UK" },
              { img: "/banners and logos/GCCI Captive center.png", name: "GCC / Captive\nCentres", proof: "15+ setups", detail: "10–200 person teams" },
              { img: "/banners and logos/Financial Services.png", name: "Financial\nServices", proof: "20+ companies", detail: "Fintech, funds, wealth" },
              { img: "/banners and logos/Manufacturing.png", name: "Manufacturing\n& Engineering", proof: "15+ companies", detail: "UAE, Germany, Japan" },
              { img: "/banners and logos/Health and Pharma.png", name: "Healthcare\n& Pharma", proof: "10+ companies", detail: "Research, devices" },
              { img: "/banners and logos/E commerce.png", name: "E-commerce\n& Retail", proof: "10+ companies", detail: "D2C, marketplace" },
            ].map(({ img, name, proof, detail }) => (
              <div key={name} style={{
                background: "#fff", borderRadius: 22, padding: "36px 24px 32px", border: "1px solid #ECE7E1",
                textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center",
                boxShadow: "0 12px 35px rgba(0,0,0,.05)", transition: "transform .22s ease,box-shadow .22s ease",
                cursor: "default", minHeight: 260
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,.05)"; }}>
                <div style={{ marginBottom: 24, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={img} alt={name} style={{ maxHeight: "100%", maxWidth: 80, objectFit: "contain" }} />
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#000", lineHeight: 1.4, marginBottom: 8, whiteSpace: "pre-line", fontFamily: HV }}>{name}</div>
                <div style={{ fontSize: 12, color: G, fontWeight: 700, marginBottom: 6, fontFamily: HV }}>{proof}</div>
                <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.6, fontFamily: HV }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL REACH ── */}
      <section className="gr-section" style={{ padding: "0 40px 72px", background: "#fff" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="gr-wrap">
            <div className="gr-left">
              <SH eyebrow="Global Reach" green="Clients from every" gold="major market." center={false} mb={0} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #ECE7E1", borderRadius: 10, overflow: "hidden" }}>
                {[
                  { img: "/banners and logos/Clients WorldWide.png", num: "200+", label: "Clients Worldwide" },
                  { img: "/banners and logos/Countries Covered.png", num: "90+", label: "Countries Covered" },
                  { img: "/banners and logos/Markets operate.png", num: "10+", label: "Markets Operate" },
                  { img: "/banners and logos/Client Satisfaction (2).png", num: "98%", label: "Client Satisfaction" },
                ].map(({ img, num, label }, i) => (
                  <div key={label} style={{
                    padding: "16px 12px", textAlign: "center",
                    borderLeft: i % 2 !== 0 ? "1px solid #ECE7E1" : "none",
                    borderTop: i >= 2 ? "1px solid #ECE7E1" : "none",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 5
                  }}>
                    <img src={img} alt={label} style={{ width: 38, height: 38, objectFit: "contain" }} />
                    <div style={{ fontSize: 26, color: "#000", lineHeight: 1, fontWeight: 700, fontFamily: HV }}>{num}</div>
                    <div style={{ fontSize: 11, color: "#555", lineHeight: 1.35, fontFamily: HV }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px", marginTop: 8, marginBottom: 8 }}>
                {[
                  { code: "us", label: "USA" },
                  { code: "ca", label: "Canada" },
                  { code: "gb", label: "United Kingdom" },
                  { code: "eu", label: "Europe" },
                  { code: "ae", label: "UAE" },
                  { code: "sg", label: "Singapore" },
                  { code: "au", label: "Australia" },
                  { code: "nz", label: "New Zealand" }
                ].map(p => (
                  <img
                    key={p.code}
                    src={`https://flagcdn.com/w40/${p.code}.png`}
                    srcSet={`https://flagcdn.com/w80/${p.code}.png 2x`}
                    alt={p.label}
                    title={p.label}
                    width={26}
                    height={19}
                    style={{
                      borderRadius: 3,
                      objectFit: "cover",
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                      display: "block",
                      flexShrink: 0,
                    }}
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="gr-btns" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="ics-btn ics-btn-primary" onClick={() => { window.location.href = ROUTES.contact; }}>Explore Global Presence →</button>
                <button className="ics-btn ics-btn-outline" onClick={() => { window.location.href = ROUTES.hub; }}>View Success Stories</button>
              </div>
            </div>
            <div className="gr-map">
              <img src="/worldmap.png" alt="World map" className="gr-map-img" />
              <MapLinesOverlay />
            </div>
          </div>
        </div>
      </section>

      {/* ── DTAA ── */}
      <section className="dtaa-sec" style={{ padding: "0 56px 60px", background: "#fff" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{
            position: "relative", borderRadius: 20, overflow: "hidden",
            backgroundImage: "url('/banners and logos/Home pg medium size banner.png')",
            backgroundSize: "cover", backgroundPosition: "center"
          }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
            <div className="dtaa-grid" style={{ position: "relative", zIndex: 1, padding: "40px 48px", display: "grid", gridTemplateColumns: "1fr auto", gap: 28, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: GOLD, fontWeight: 600, marginBottom: 10, fontFamily: HV }}>Tax Advantage</div>
                <div style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 700, color: "#fff", lineHeight: 1.3, fontFamily: HV }}>
                  India's DTAA network covers 90+ countries — most companies we onboard are overpaying.
                </div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.78)", marginTop: 10, lineHeight: 1.65, fontFamily: HV }}>
                  Proper treaty planning reduces withholding tax on dividends, royalties, and fees. We identify the savings before you commit to a structure.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                <button className="ics-btn ics-btn-primary" onClick={() => { window.location.href = ROUTES.tax; }}>International Tax →</button>
                <button className="ics-btn ics-btn-ghost" style={{ fontSize: 12.5, padding: "9px 16px", borderColor: "rgba(255,255,255,0.5)", color: "#fff" }} onClick={() => { window.location.href = ROUTES.seo_fdi; }}>FDI Rules Guide →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding: "100px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <SH eyebrow="Why Us" green="Compared honestly," gold="not just favourably." mb={52} />
          <div style={{ overflowX: "auto", paddingBottom: 20 }}>
            <div style={{ minWidth: 860, maxWidth: 1140, margin: "0 auto", background: "#fff", borderRadius: 20, boxShadow: "0 8px 30px rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.3fr 1fr 1fr", background: "#fafaf5" }}>
                <div style={{ padding: "32px 24px", borderBottom: "1px solid #ECE7E1" }} />
                <div style={{ padding: "28px 24px 24px", background: G, borderTop: `4px solid ${GOLD}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD }} />
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: HV }}>India Company Setup</div>
                  </div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.12em", paddingLeft: 18, fontFamily: HV }}>One Accountable Team</div>
                </div>
                {["Big Four Firm", "Generic Local CA"].map(h => (
                  <div key={h} style={{ padding: "32px 24px 24px", display: "flex", alignItems: "flex-end", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "#8b8b80", borderBottom: "1px solid #ECE7E1", fontFamily: HV }}>{h}</div>
                ))}
              </div>
              {[
                { f: "Senior attention", i: "Partner-led throughout", b: "Delegated to junior staff", l: "Varies, often solo" },
                { f: "Tax + legal + filing", i: "One integrated team", b: "Yes, at premium pricing", l: "Usually one discipline" },
                { f: "Cross-border depth", i: "Core specialism (DTAA/FEMA)", b: "Yes", l: "Limited exposure" },
                { f: "Cost position", i: "Mid-market, fixed-scope", b: "Premium retainer", l: "Lowest cost, highest risk" },
                { f: "Response time", i: "< 24 hrs, named contact", b: "Varies by account tier", l: "Varies widely" },
              ].map((row, i, arr) => (
                <div key={row.f} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.3fr 1fr 1fr", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafaf5"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ padding: "26px 24px", fontSize: 15, fontWeight: 700, color: "#000", display: "flex", alignItems: "center", borderBottom: i === arr.length - 1 ? "none" : "1px solid #ECE7E1", fontFamily: HV }}>{row.f}</div>
                  <div style={{ padding: "26px 24px", background: "rgba(11,61,46,0.04)", display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: G, lineHeight: 1.4, fontFamily: HV }}>{row.i}</span>
                  </div>
                  {[row.b, row.l].map((cell, ci) => (
                    <div key={ci} style={{ padding: "26px 24px", fontSize: 14.5, color: "#000", lineHeight: 1.5, display: "flex", alignItems: "center", borderBottom: i === arr.length - 1 ? "none" : "1px solid #ECE7E1", fontFamily: HV }}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
            <button onClick={() => { window.location.href = ROUTES.contact; }} style={{ background: `linear-gradient(135deg,${G},#145c42)`, padding: "16px 36px", borderRadius: 8, fontSize: 14.5, fontWeight: 600, boxShadow: "0 6px 20px rgba(11,61,46,0.25)", border: "none", color: "#fff", cursor: "pointer", fontFamily: HV }}>Talk to Our Team →</button>
            <button className="ics-btn ics-btn-outline" style={{ padding: "15px 32px", borderRadius: 8, fontSize: 14.5, fontWeight: 600, fontFamily: HV }} onClick={() => { window.location.href = ROUTES.about; }}>About Us</button>
          </div>
        </div>
      </section>

      {/* ── KNOWLEDGE HUB ── */}
      <KnowledgeHubSection />

      {/* ── PGA ── */}
      <section style={{ padding: "70px 56px", background: "#06100D" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              <div style={{ width: 56, height: 56, background: "rgba(255,255,255,.06)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>⚖️</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 6, fontFamily: HV }}>Knowledge Partner</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: HV }}>PGA & Co. Chartered Accountants, Chandigarh</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginTop: 4, fontFamily: HV }}>GST advisory · NRI/HNI tax · Domestic audit & assurance · Transfer pricing</div>
              </div>
            </div>
            <a href="https://pgaca.in" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", padding: "12px 20px", textDecoration: "none", fontFamily: HV }}>Visit pgaca.in →</a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "80px 56px", position: "relative", overflow: "hidden", backgroundImage: "url('/banners and logos/2.png')", backgroundSize: "cover", backgroundPosition: "center 38%" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(100deg, rgba(0,0,0,0.85) 4%, rgba(0,0,0,0.68) 42%, rgba(0,0,0,0.45) 78%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 420px", gap: 64, alignItems: "center" }} className="final-cta-grid">
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: 18, fontFamily: HV }}>Get Started</div>
            <h2 style={{ fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: 22, fontFamily: HV }}>
              Ready to enter India<br />
              <em style={{ fontStyle: "italic", color: GOLD, fontWeight: 500 }}>the right way?</em>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, fontWeight: 400, marginBottom: 36, maxWidth: 460, fontFamily: HV }}>
              Book a free 30-minute consultation. We'll review your India objectives and give you a clear structure recommendation — no commitment, no jargon.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              {[{ l: "Foreign company registration", p: "seo_fcri" }, { l: "Subsidiary company setup", p: "seo_sub" }, { l: "Transfer pricing guide", p: "seo_tp" }, { l: "FDI rules India", p: "seo_fdi" }].map(({ l, p }) => (
                <button key={l} onClick={() => { window.location.href = ROUTES[p] || "/"; }}
                  style={{ background: "#fff", border: "none", color: "#082018", padding: "8px 16px", borderRadius: 50, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: HV, transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1.5px)"; e.currentTarget.style.background = "#f4f4f4"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#fff"; }}>
                  {l}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["No retainer to start", "Expert team responds within 24 hrs", "Fixed transparent fees"].map(t => (
                <span key={t} style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500, display: "flex", alignItems: "center", gap: 8, fontFamily: HV }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 40px 100px rgba(0,0,0,.32)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${G},${GOLD})`, borderRadius: "20px 20px 0 0" }} />
            <style>{`
              ._sdot{opacity:0;transform:scale(0.3) translateY(10px);transition:opacity 0.48s cubic-bezier(0.34,1.56,0.64,1),transform 0.48s cubic-bezier(0.34,1.56,0.64,1);}
              ._sdot.s{opacity:1;transform:scale(1) translateY(0);}
              ._sline{transform:scaleY(0);opacity:0;transform-origin:top;transition:transform 0.36s ease,opacity 0.36s ease;}
              ._sline.s{transform:scaleY(1);opacity:1;}
              ._stag{opacity:0;transform:translateY(6px);transition:opacity 0.28s ease,transform 0.28s ease;}
              ._stag.s{opacity:1;transform:translateY(0);}
              ._stxt{opacity:0;transform:translateY(5px);transition:opacity 0.28s ease,transform 0.28s ease;}
              ._stxt.s{opacity:1;transform:translateY(0);}
            `}</style>
            {hStatus === "success" ? (
              <div style={{ textAlign: "center", padding: "28px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(11,61,46,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#000", marginBottom: 8, fontFamily: HV }}>We'll be in touch!</h3>
                <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7, marginBottom: 22, fontFamily: HV }}>Our expert team responds within 24 hours.</p>
                <a href="https://wa.me/919915731447" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 22px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, textDecoration: "none", fontFamily: HV }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.843L0 24l6.327-1.497A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.375l-.36-.214-3.732.882.898-3.636-.234-.374A9.818 9.818 0 1112 21.818z" /></svg>
                  Chat on WhatsApp
                </a>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 21, fontWeight: 700, color: "#000", marginBottom: 4, fontFamily: HV }}>Book Free 30-min Strategy Call</h3>
                <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.5, marginBottom: 18, fontFamily: HV }}>Expert team responds within 24 hours. No commitment.</p>
                {(() => {
                  const uid = React.useId().replace(/:/g, "");
                  const SEQ = [[0, `d0${uid}`], [200, `tg0${uid}`], [310, `tx0${uid}`], [560, `l0${uid}`], [740, `d1${uid}`], [940, `tg1${uid}`], [1050, `tx1${uid}`], [1300, `l1${uid}`], [1480, `d2${uid}`], [1680, `tg2${uid}`], [1790, `tx2${uid}`]];
                  const ALL = SEQ.map(s => s[1]);
                  React.useEffect(() => {
                    const ts = [];
                    const show = id => { const e = document.getElementById(id); if (e) e.classList.add("s"); };
                    const hide = id => { const e = document.getElementById(id); if (e) e.classList.remove("s"); };
                    function run() { ALL.forEach(hide); ts.push(setTimeout(() => { SEQ.forEach(([d, id]) => ts.push(setTimeout(() => show(id), d))); ts.push(setTimeout(run, 1790 + 300 + 1400)); }, 80)); }
                    run(); return () => ts.forEach(clearTimeout);
                  }, []);
                  return (
                    <div style={{ background: "#f5f5f0", borderRadius: 10, padding: "14px 15px 12px", marginBottom: 18, border: "1px solid #e8e8e2" }}>
                      <p style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: G, fontWeight: 700, marginBottom: 14, fontFamily: HV }}>What happens after you submit</p>
                      {[
                        { tag: "Within 24 hrs", txt: "Our expert team reviews your submission and confirms a 30-min slot." },
                        { tag: "On the call", txt: "We review your structure, flag risks, and recommend the right entity and tax setup." },
                        { tag: "After the call", txt: "You receive a written summary — structure recommendation, FDI route, next steps." },
                      ].map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 13, position: "relative" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 28 }}>
                            <div id={`d${i}${uid}`} className="_sdot" style={{ width: 28, height: 28, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HV, fontSize: 15, fontWeight: 700, color: "#fff", flexShrink: 0, zIndex: 1 }}>{i + 1}</div>
                            {i < 2 && <div id={`l${i}${uid}`} className="_sline" style={{ width: 1.5, flex: 1, minHeight: 12, margin: "4px 0", background: `linear-gradient(to bottom,${G}44,#e0e0da)` }} />}
                          </div>
                          <div style={{ paddingBottom: i < 2 ? 13 : 0, paddingTop: 3 }}>
                            <p id={`tg${i}${uid}`} className="_stag" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: G, marginBottom: 3, fontFamily: HV }}>{step.tag}</p>
                            <p id={`tx${i}${uid}`} className="_stxt" style={{ fontSize: 12, color: "#555", lineHeight: 1.62, margin: 0, fontFamily: HV }}>{step.txt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                <input type="text" placeholder="Your full name *" value={hf.nameTitle} onChange={setH("nameTitle")}
                  style={inp({ borderColor: hStatus === "error" && !hf.nameTitle.trim() ? "#E74C3C" : T.bdr })}
                  onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = T.bdr} />
                <input type="email" placeholder="Work email address *" value={hf.email} onChange={setH("email")}
                  style={inp({ borderColor: hStatus === "error" && !hf.email.trim() ? "#E74C3C" : T.bdr })}
                  onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = T.bdr} />
                <input type="text" placeholder="Company name, Country" value={hf.companyCountry} onChange={setH("companyCountry")}
                  style={inp()} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = T.bdr} />
                <select value={hf.service} onChange={setH("service")} style={inp({ cursor: "pointer" })}>
                  <option value="">What do you need help with?</option>
                  <option>Foreign Company Incorporation</option>
                  <option>GCC / Captive Centre Setup</option>
                  <option>International Tax &amp; DTAA</option>
                  <option>Transfer Pricing</option>
                  <option>FEMA Compliance</option>
                  <option>Ongoing Compliance Retainer</option>
                </select>
                {hStatus === "error" && <div style={{ background: "#FFF0F0", border: "1px solid #FFCCCC", borderRadius: 7, padding: "9px 14px", marginBottom: 10, fontSize: 12.5, color: "#C0392B", fontFamily: HV }}>Please enter your name and email address.</div>}
                <button onClick={handleSubmit} disabled={hStatus === "submitting"} className="ics-btn ics-btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "14px 20px", fontSize: 14.5, opacity: hStatus === "submitting" ? 0.7 : 1, borderRadius: 9, marginTop: 4, fontFamily: HV }}>
                  {hStatus === "submitting" ? "Sending…" : "Request Free Consultation →"}
                </button>
                <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 14 }}>
                  {["No commitment", "Confidential", "24hr response"].map(t => (
                    <span key={t} style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 4, fontFamily: HV }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}