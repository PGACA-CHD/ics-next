'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/config';
import { submitToZoho } from '@/lib/utils';

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

const HV = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BDR = "1px solid #111";
const GREEN = "#0B3D2E";
const GOLD = "#e69819";
const HS = "clamp(28px, 3vw, 42px)";

/* ── Shared hooks / primitives ── */
function useReveal(t = 0.12) {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Fade({ children, delay = 0, up = true }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : (up ? 'translateY(22px)' : 'translateY(0)'), transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = '', prefix = '', duration = 1400, delay = 0 }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useReveal(0.3);
  const started = useRef(false);
  useEffect(() => {
    if (!vis || started.current) return;
    started.current = true;
    if (target === 0) { setTimeout(() => setVal(0), delay); return; }
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    setTimeout(() => {
      const id = setInterval(() => {
        step++;
        setVal(Math.round(target * step / steps));
        if (step >= steps) clearInterval(id);
      }, stepTime);
    }, delay);
  }, [vis]);
  return <span ref={ref} style={{ color: "#111" }}>{prefix}{val}{suffix}</span>;
}

function SH({ eyebrow, green, gold, center = true, mb = 40 }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: mb, fontFamily: HV }}>
      {eyebrow && (
        <p style={{ fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase", color: GREEN, fontWeight: 700, marginBottom: 14, fontFamily: HV, margin: "0 0 14px" }}>{eyebrow}</p>
      )}
      <h2 style={{ fontSize: HS, fontWeight: 700, lineHeight: 1.1, margin: 0, fontFamily: HV }}>
        <span style={{ color: GREEN }}>{green}</span>{gold && <> <em style={{ color: GOLD, fontStyle: "italic" }}>{gold}</em></>}
      </h2>
    </div>
  );
}

const handleSpotlight = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

/* ── Content ── */
const SERVICE_ACCENTS = [
  { acc: "#0B3D2E", bg: "rgba(11,61,46,0.08)" },
  { acc: "#e69819", bg: "rgba(230,152,25,0.08)" },
  { acc: "#1a5c9a", bg: "rgba(26,92,154,0.08)" },
  { acc: "#7a5f10", bg: "rgba(122,95,16,0.08)" },
  { acc: "#3a2d72", bg: "rgba(58,45,114,0.08)" },
  { acc: "#c8371a", bg: "rgba(200,55,26,0.08)" },
];

const SERVICES = [
  {
    title: "DTAA Planning",
    badge: "Core Service",
    subtitle: "Eligibility, TRC & withholding optimisation",
    desc: "India has DTAAs with 90+ countries. Applied correctly, DTAA reduces withholding tax on dividends from 20% to 0–15%, and on royalties from 10% or below. We ensure the correct rate is applied to every cross-border payment.",
    points: ["DTAA eligibility assessment", "TRC advice", "Principal Purpose Test", "Withholding optimisation"],
  },
  {
    title: "Transfer Pricing",
    badge: "Core Service",
    subtitle: "Model design, benchmarking & Form 3CEB",
    desc: "India's TP enforcement is among the world's most aggressive. All intercompany transactions must be at arm's length, documented annually. We design the TP model before incorporation and maintain it every year.",
    points: ["Pricing model design", "MSA drafting", "Benchmarking study", "Form 3CEB + APA"],
  },
  {
    title: "Withholding Tax",
    badge: null,
    subtitle: "TDS analysis, Form 27Q, 15CA/15CB",
    desc: "Every payment from India to a foreign company is subject to TDS. DTAA rates are often significantly lower than domestic law. We ensure the correct rate is applied and all TDS returns are filed.",
    points: ["Domestic vs DTAA rates", "Form 27Q filing", "Section 197 certificates", "Form 15CA/15CB"],
  },
  {
    title: "PE Risk Management",
    badge: null,
    subtitle: "Agency PE, Service PE & safeguards",
    desc: "A PE triggers 40% tax on the parent's India-attributable profits. PE risk is subtle and often missed — until the audit notice arrives. We assess and manage PE risk from day one.",
    points: ["PE risk assessment", "Agency & Service PE", "Management plan", "Operational safeguards"],
  },
  {
    title: "FEMA Compliance",
    badge: null,
    subtitle: "FCGPR, FLA return, ECB structuring",
    desc: "FEMA violations attract penalties up to 3x the transaction value. We manage all FEMA filings as part of every ongoing engagement — FCGPR, FCTRS, FLA, ECB, and compounding.",
    points: ["FCGPR filing", "Annual FLA return", "Form 15CA/15CB", "ECB structuring"],
  },
  {
    title: "Cross-border Restructuring",
    badge: null,
    subtitle: "LO/Branch conversion, IP migration, M&A",
    desc: "Converting a liaison office to a subsidiary, moving IP, consolidating group entities — cross-border restructuring in India triggers multiple tax events that must be planned carefully.",
    points: ["LO to subsidiary", "IP migration", "M&A due diligence", "Exit planning"],
  },
];

const DTAA_RATES = [
  { country: "India (domestic law)", div: "20%", roy: "10%", fts: "10%", int: "20%", domestic: true },
  { country: "United States", div: "15–25%", roy: "10–15%", fts: "10–15%", int: "10–15%", domestic: false },
  { country: "United Kingdom", div: "15%", roy: "10–15%", fts: "10%", int: "10–15%", domestic: false },
  { country: "UAE", div: "10%", roy: "10%", fts: "Nil–10%", int: "Nil–12.5%", domestic: false },
  { country: "Singapore", div: "10–15%", roy: "10%", fts: "10%", int: "10–15%", domestic: false },
  { country: "Australia", div: "15%", roy: "10–15%", fts: "10–15%", int: "15%", domestic: false },
  { country: "Germany", div: "10–15%", roy: "10%", fts: "10%", int: "10%", domestic: false },
  { country: "Japan", div: "10%", roy: "10%", fts: "10%", int: "10%", domestic: false },
];

const GUIDES = [
  { label: "Transfer pricing in India", sub: "Complete guide to TP compliance", page: "seo_tp" },
  { label: "FDI rules & FEMA compliance", sub: "Sector limits, filings & penalties", page: "seo_fdi" },
  { label: "Foreign company registration", sub: "Branch, LO, or subsidiary in India", page: "seo_fcri" },
];

const RATE_CATEGORIES = [
  {
    title: "Domestic Law Rates",
    color: GREEN,
    items: ["Dividends — 20%", "Royalty / FTS — 10%", "Interest — 20%"],
  },
  {
    title: "Under DTAA (Typical)",
    color: GOLD,
    items: ["Dividends — 0–15%", "Royalty / FTS — 10%", "Interest — 10–15%"],
  },
  {
    title: "Risk Exposure",
    color: "#3a2d72",
    items: ["PE tax — 40%", "TP penalty — up to 300%"],
  },
];

const HERO_STATS = [
  { target: 90, suffix: "+", label: "DTAA countries covered", color: GREEN },
  { target: 100, suffix: "+", label: "Companies advised", color: "#1a5c9a" },
  { target: 18, suffix: "+", label: "Years experience", color: GOLD },
  { target: 6, suffix: "", label: "Service areas", color: "#3a2d72" },
];

export default function Page() {
  const router = useRouter();

  return (
    <div style={{ fontFamily: HV, color: "#111", background: "#fff" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes floatSpotlight {
          0%   { background-position: 50% 50%; }
          25%  { background-position: 80% 20%; }
          50%  { background-position: 20% 80%; }
          75%  { background-position: 80% 80%; }
          100% { background-position: 50% 50%; }
        }
        .spot-card { position:relative; overflow:hidden; --mouse-x:50%; --mouse-y:50%; }
        .spot-card::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background: radial-gradient(circle at center, var(--spot-color, rgba(11,61,46,0.08)) 0%, transparent 70%);
          background-size: 200% 200%;
          background-position: 50% 50%;
          opacity: 0.85;
          animation: floatSpotlight 15s ease-in-out infinite;
          transition: opacity .5s ease;
        }
        .spot-card:hover::before, .spot-card:focus-within::before {
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spot-color, rgba(11,61,46,0.08)), transparent 70%);
          background-size: 100% 100%;
          background-position: 0 0;
          animation: none;
          opacity: 1;
        }
        .spot-card-content { position:relative; z-index:1; }

        .gc {
          background: #fff;
          border: ${BDR};
          border-radius: 16px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .gc:hover { transform: translateY(-4px); border-color: rgba(11,61,46,0.3); box-shadow: 0 12px 36px rgba(11,61,46,0.09); }
        .gc-static { background: #fff; border: ${BDR}; border-radius: 16px; }

        .lbl { font-size:10.5px; letter-spacing:2px; text-transform:uppercase; font-weight:600; color:#111; font-family:${HV}; }

        .lime-btn { display:inline-flex; align-items:center; gap:8px; background:${GREEN}; color:#fff; font-family:${HV}; font-size:15px; font-weight:700; padding:14px 28px; border-radius:6px; border:none; cursor:pointer; transition:background 0.2s ease,transform 0.15s ease; text-decoration:none; }
        .lime-btn:hover { background:#0a3d2c; transform:translateY(-1px); }

        .ghost-btn { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#111; font-family:${HV}; font-size:15px; font-weight:600; padding:14px 28px; border-radius:6px; border:${BDR}; cursor:pointer; transition:all 0.2s; text-decoration:none; }
        .ghost-btn:hover { background:#111; color:#fff; }

        .ghost-dark { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#fff; font-family:${HV}; font-size:15px; font-weight:600; padding:14px 28px; border-radius:6px; border:1px solid rgba(255,255,255,0.25); cursor:pointer; transition:all 0.2s; text-decoration:none; }
        .ghost-dark:hover { background:rgba(255,255,255,0.08); }

        .guide-card { border: ${BDR}; border-radius: 14px; background: #fff; padding: 22px 22px 18px; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .guide-card:hover { transform: translateY(-3px); border-color: rgba(11,61,46,0.3); box-shadow: 0 8px 28px rgba(11,61,46,0.09); }

        .pill-cell { border: 1px solid #111; border-radius: 8px; background: #fff; text-align: center; padding: 10px 6px; font-size: 13px; font-weight: 500; color: #111; display: flex; align-items: center; justify-content: center; font-family: ${HV}; }

        .feature-pill {
          display: inline-flex; align-items: center; font-size: 12.5px; font-weight: 700;
          padding: 8px 14px; border-radius: 30px; font-family: ${HV}; white-space: nowrap;
        }

        .cat-pill {
          display: inline-flex; align-items: center; font-size: 13px; font-weight: 700;
          padding: 9px 16px; border-radius: 30px; font-family: ${HV}; white-space: nowrap;
          background: #fff; border: 1.5px solid currentColor;
        }

        .stat-card {
          border: ${BDR}; border-radius: 14px; background: #fff; padding: 22px 20px;
          text-align: center; border-top: 4px solid #111;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          height: 100%; display: flex; flex-direction: column; justify-content: center;
        }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.06); }

        .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
        .hero-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; align-items: stretch; }

        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .guide-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        @media(max-width:1024px){ .svc-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:900px){
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:860px){
          .guide-grid { grid-template-columns: 1fr !important; }
          .dtaa-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr !important; }
        }
        @media(max-width:640px){
          .svc-grid { grid-template-columns: 1fr !important; }
          .hero-pad { padding: 56px 20px 64px !important; }
          .sec-pad  { padding: 56px 20px !important; }
          .dtaa-wrap { padding: 20px 14px 16px !important; }
          .dtaa-grid { grid-template-columns: 1fr !important; }
          .dtaa-head { display: none !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-pad" style={{ 
        position: 'relative',
        padding: "96px 56px 88px",
        backgroundImage: "url('/banners and logos/INTL TAX.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
          <div className="hero-grid">
            {/* Left — headline, copy, CTAs, stats */}
            <div>
              <Fade>
                <div className="lbl" style={{ marginBottom: 24, color: GOLD }}>Advisory Service</div>
                <h1 style={{ fontSize: "clamp(38px,5.5vw,64px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 0 22px", fontFamily: HV }}>
                  <span style={{ color: "#fff" }}>Not a generic CA firm —</span>{" "}
                  <em style={{ color: GOLD, fontStyle: "italic", fontWeight: 800 }}>the full India tax stack.</em>
                </h1>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.78, maxWidth: 520, margin: "0 0 36px", fontFamily: HV }}>
                  DTAA structuring, transfer pricing, withholding tax, FEMA compliance, and PE risk management — designed before your India entity opens its doors.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
                  <button className="lime-btn" onClick={() => router.push(ROUTES.contact)}>Book a Tax Consultation →</button>
                  <button className="ghost-dark" onClick={() => router.push(ROUTES.services)}>Company Setup →</button>
                </div>
              </Fade>

              <div className="hero-stats-grid">
                {HERO_STATS.map((s, i) => (
                  <Fade key={s.label} delay={i * 90}>
                    <div className="stat-card" style={{ borderTopColor: s.color }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1, fontFamily: HV, marginBottom: 8 }}>
                        <CountUp target={s.target} suffix={s.suffix} delay={i * 200} />
                      </div>
                      <div style={{ fontSize: 12, color: "#111", fontFamily: HV, fontWeight: 600 }}>{s.label}</div>
                    </div>
                  </Fade>
                ))}
              </div>
            </div>

            {/* Right — rate reference card, categorized like a compliance calendar */}
            <Fade delay={100}>
              <div className="gc-static" style={{ padding: "28px 28px 24px" }}>
                <div className="lbl" style={{ marginBottom: 22 }}>Withholding Rates — What Applies</div>
                {RATE_CATEGORIES.map((cat, ci) => (
                  <div key={cat.title} style={{ marginBottom: ci < RATE_CATEGORIES.length - 1 ? 26 : 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: cat.color, marginBottom: 12, fontFamily: HV }}>{cat.title}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {cat.items.map((item) => (
                        <span key={item} className="cat-pill" style={{ color: cat.color }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="sec-pad" style={{ padding: "88px 56px", background: "#fff", borderTop: BDR }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <SH eyebrow="Our Services" green="International tax services for" gold="foreign companies in India." mb={44} />
          </Fade>

          <div className="svc-grid">
            {SERVICES.map((svc, si) => {
              const c = SERVICE_ACCENTS[si % 2];
              return (
                <Fade key={svc.title} delay={si * 60}>
                  <div className="gc spot-card" onMouseMove={handleSpotlight}
                    style={{ padding: "26px 22px", display: "flex", flexDirection: "column", borderTop: `4px solid ${c.acc}`, height: "100%", '--spot-color': `${c.acc}15` }}>
                    <div className="spot-card-content" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                          <h3 style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 800, color: "#111", margin: 0, letterSpacing: "-0.02em", fontFamily: HV, lineHeight: 1.15 }}>
                            {svc.title}
                          </h3>
                          {svc.badge && (
                            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: c.acc, color: "#fff", padding: "3px 8px", borderRadius: 4, flexShrink: 0, fontFamily: HV }}>
                              {svc.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: "#111", fontFamily: HV, fontWeight: 600 }}>{svc.subtitle}</div>
                      </div>

                      <p style={{ fontSize: 13, color: "#111", lineHeight: 1.7, margin: "0 0 18px", fontFamily: HV, fontWeight: 500 }}>
                        {svc.desc}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
                        {svc.points.map((pt) => (
                          <span key={pt} className="feature-pill" style={{ background: c.bg, color: c.acc }}>
                            {pt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DETAILED GUIDES ── */}
      <section className="sec-pad" style={{ padding: "0 56px 88px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ borderTop: BDR, paddingTop: 48 }}>
            <Fade>
              <div className="lbl" style={{ marginBottom: 12 }}>Detailed Guides</div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", margin: "0 0 32px", fontFamily: HV }}>
                Go deeper on any topic
              </h2>
            </Fade>
            <div className="guide-grid">
              {GUIDES.map((g, gi) => (
                <Fade key={g.label} delay={gi * 70}>
                  <div className="guide-card" onClick={() => router.push(ROUTES[g.page] || '/')}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 6, fontFamily: HV, lineHeight: 1.25 }}>{g.label}</div>
                    <div style={{ fontSize: 12.5, color: "#111", marginBottom: 18, fontFamily: HV, fontWeight: 500 }}>{g.sub}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: GREEN, fontFamily: HV }}>Read guide →</div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DTAA TABLE ── */}
      <section className="sec-pad" style={{ padding: "88px 56px 96px", background: "#fff", borderTop: BDR }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <SH eyebrow="Withholding Rates" green="India DTAA" gold="withholding rates." mb={16} />
            <p style={{ fontSize: 15, color: "#111", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px", fontFamily: HV, fontWeight: 600, textAlign: "center" }}>
              India's domestic rates: 20% dividends, 10% royalties, 10% FTS, 20% interest. DTAA rates are almost always lower — often significantly.
            </p>
          </Fade>

          <div className="gc-static dtaa-wrap" style={{ padding: "36px 36px 28px" }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#111", fontFamily: HV, marginBottom: 4 }}>DTAA Quick Reference</div>
              <div style={{ fontSize: 13.5, color: "#111", fontFamily: HV, fontWeight: 500 }}>Key treaty countries — indicative withholding rates</div>
            </div>

            <div className="dtaa-grid dtaa-head" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "8px 12px", marginBottom: 10, padding: "0 2px 10px", borderBottom: "1.5px solid #111" }}>
              {["Country", "Dividends", "Royalties", "FTS", "Interest"].map((h, i) => (
                <div key={h} className="lbl" style={{ fontSize: 10.5, letterSpacing: "1.5px", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
              ))}
            </div>

            {DTAA_RATES.map((row) => (
              <div
                key={row.country}
                className="dtaa-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  gap: "8px 12px",
                  marginBottom: 8,
                  padding: row.domestic ? "10px 10px" : "4px 2px",
                  background: row.domestic ? "rgba(230,152,25,0.06)" : "transparent",
                  border: row.domestic ? "1px solid #111" : "none",
                  borderRadius: row.domestic ? 12 : 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", fontSize: 14, fontWeight: row.domestic ? 800 : 700, color: "#111", fontFamily: HV, padding: "8px 0" }}>
                  {row.country}
                </div>
                {[row.div, row.roy, row.fts, row.int].map((v, ci) => (
                  <div key={ci} className="pill-cell" style={{
                    fontWeight: row.domestic ? 800 : 600,
                    color: row.domestic ? GOLD : "#111",
                  }}>
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p style={{ marginTop: 14, fontSize: 12.5, color: "#111", lineHeight: 1.65, fontFamily: HV, fontWeight: 500 }}>
            <strong style={{ color: "#111" }}>Note:</strong> Rates shown are indicative. Actual rates depend on shareholding %, nature of income, beneficial ownership, and the Principal Purpose Test. Contact us for a precise analysis.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: GREEN, borderTop: "1.5px solid #111", padding: "80px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div className="lbl" style={{ color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>Get Started</div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 16, letterSpacing: "-0.03em", fontFamily: HV }}>
            Ready to get your India tax structure right?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, marginBottom: 32, fontFamily: HV, fontWeight: 500 }}>
            Book a free 30-minute consultation. We'll review your structure, identify key risks and savings, and give you a clear action plan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
            <button className="lime-btn" style={{ background: GOLD, border: "1px solid #111" }} onClick={() => router.push(ROUTES.contact)}>Book Tax Consultation →</button>
            <a href="tel:+919915731447" className="ghost-dark" style={{ border: "1px solid #fff" }}>Call +91 99157 31447</a>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["Free 30-min consultation", "CA, CS & tax team", "Response within 24 hours"].map(t => (
              <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: HV, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}