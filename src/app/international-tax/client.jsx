'use client';
import { useState } from 'react';
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

const SERVICES = [
  {
    title: "DTAA Planning",
    badge: "Core Service",
    subtitle: "Eligibility, TRC & withholding optimisation",
    desc: "India has DTAAs with 90+ countries. Applied correctly, DTAA reduces withholding tax on dividends from 20% to 0–15%, and on royalties from 10% or below. We ensure the correct rate is applied to every cross-border payment.",
    points: ["DTAA eligibility assessment", "Tax Residency Certificate (TRC) advice", "Principal Purpose Test (BEPS Action 6)", "Withholding tax optimisation"],
  },
  {
    title: "Transfer Pricing",
    badge: "Core Service",
    subtitle: "Model design, benchmarking & Form 3CEB",
    desc: "India's TP enforcement is among the world's most aggressive. All intercompany transactions must be at arm's length, documented annually. We design the TP model before incorporation and maintain it every year.",
    points: ["Intercompany pricing model design", "MSA and agreement drafting", "Annual benchmarking study", "Form 3CEB filing + APA advisory"],
  },
  {
    title: "Withholding Tax",
    badge: null,
    subtitle: "TDS analysis, Form 27Q, 15CA/15CB",
    desc: "Every payment from India to a foreign company is subject to TDS. DTAA rates are often significantly lower than domestic law. We ensure the correct rate is applied and all TDS returns are filed.",
    points: ["TDS rate analysis — domestic vs DTAA", "Form 27Q quarterly returns", "Section 197 lower TDS certificates", "Form 15CA/15CB for all payments"],
  },
  {
    title: "PE Risk Management",
    badge: null,
    subtitle: "Agency PE, Service PE & safeguards",
    desc: "A PE triggers 40% tax on the parent's India-attributable profits. PE risk is subtle and often missed — until the audit notice arrives. We assess and manage PE risk from day one.",
    points: ["PE risk assessment", "Agency PE and Service PE analysis", "PE management plan", "Operational safeguards"],
  },
  {
    title: "FEMA Compliance",
    badge: null,
    subtitle: "FCGPR, FLA return, ECB structuring",
    desc: "FEMA violations attract penalties up to 3× the transaction value. We manage all FEMA filings as part of every ongoing engagement — FCGPR, FCTRS, FLA, ECB, and compounding.",
    points: ["FCGPR within 30 days of FDI", "Annual FLA return — 15 July", "Form 15CA/15CB for foreign payments", "ECB structuring and reporting"],
  },
  {
    title: "Cross-border Restructuring",
    badge: null,
    subtitle: "LO/Branch conversion, IP migration, M&A",
    desc: "Converting a liaison office to a subsidiary, moving IP, consolidating group entities — cross-border restructuring in India triggers multiple tax events that must be planned carefully.",
    points: ["LO/Branch to subsidiary conversion", "IP migration tax planning", "M&A due diligence — India tax", "Exit planning and winding up"],
  },
];

const DTAA_RATES = [
  { flag: "🇮🇳", country: "India (domestic law)", div: "20%", roy: "10%", fts: "10%", int: "20%", domestic: true },
  { flag: "🇺🇸", country: "United States", div: "15–25%", roy: "10–15%", fts: "10–15%", int: "10–15%", domestic: false },
  { flag: "🇬🇧", country: "United Kingdom", div: "15%", roy: "10–15%", fts: "10%", int: "10–15%", domestic: false },
  { flag: "🇦🇪", country: "UAE", div: "10%", roy: "10%", fts: "Nil–10%", int: "Nil–12.5%", domestic: false },
  { flag: "🇸🇬", country: "Singapore", div: "10–15%", roy: "10%", fts: "10%", int: "10–15%", domestic: false },
  { flag: "🇦🇺", country: "Australia", div: "15%", roy: "10–15%", fts: "10–15%", int: "15%", domestic: false },
  { flag: "🇩🇪", country: "Germany", div: "10–15%", roy: "10%", fts: "10%", int: "10%", domestic: false },
  { flag: "🇯🇵", country: "Japan", div: "10%", roy: "10%", fts: "10%", int: "10%", domestic: false },
];

const GUIDES = [
  { label: "Transfer pricing in India", sub: "Complete guide to TP compliance", page: "seo_tp" },
  { label: "FDI rules & FEMA compliance", sub: "Sector limits, filings & penalties", page: "seo_fdi" },
  { label: "Foreign company registration", sub: "Branch, LO, or subsidiary in India", page: "seo_fcri" },
];

export default function Page() {
  const router = useRouter();

  return (
    <div style={{ fontFamily: HV, color: "#111", background: "#fff" }}>
      <style>{`
        .svc-card {
          background: rgba(255,255,255,0.30);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0,0,0,0.55);
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .svc-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.55);
          box-shadow: 0 12px 36px rgba(0,0,0,0.10);
        }
        .svc-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 17px 0;
          border-bottom: 1px solid #e5e5e5;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .svc-row:hover { opacity: 0.6; }
        .pill-cell {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #fff;
          text-align: center;
          padding: 10px 6px;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${HV};
        }
        .guide-card {
          border: 1px solid rgba(0,0,0,0.55);
          border-radius: 14px;
          background: rgba(255,255,255,0.28);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 22px 22px 18px;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .guide-card:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.55);
          box-shadow: 0 8px 28px rgba(0,0,0,0.09);
        }
        @media(max-width:860px){
          .svc-grid { grid-template-columns: 1fr !important; }
          .guide-grid { grid-template-columns: 1fr !important; }
          .dtaa-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr !important; }
        }
        @media(max-width:600px){
          .hero-pad { padding: 64px 20px 72px !important; }
          .sec-pad  { padding: 64px 20px !important; }
          .dtaa-wrap { padding: 20px 14px 16px !important; }
          .dtaa-grid { grid-template-columns: 1fr !important; }
          .dtaa-head { display: none !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-pad" style={{ background: "#f5f5f0", padding: "100px 56px 96px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, color: "#777", marginBottom: 28, fontFamily: HV }}>
            Advisory Service
          </div>
          <h1 style={{ fontSize: "clamp(42px,6.5vw,88px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-0.035em", color: "#111", margin: "0 0 28px", fontFamily: HV }}>
            Not a generic CA firm.{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              The full India
              <span style={{ position: "absolute", left: 0, bottom: "-4px", width: "100%", height: "5px", background: "#b3e000", borderRadius: 2 }} />
            </span>{" "}
            tax stack.
          </h1>
          <p style={{ fontSize: 17, color: "#555", lineHeight: 1.75, maxWidth: 620, margin: "0 0 40px", fontFamily: HV, fontWeight: 400 }}>
            DTAA structuring, transfer pricing, withholding tax, FEMA compliance, and PE risk management — designed before your India entity opens its doors.
          </p>
          <button
            onClick={() => router.push(ROUTES.contact)}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#b3e000", color: "#111", fontFamily: HV, fontSize: 16, fontWeight: 700, padding: "16px 28px", borderRadius: 6, border: "none", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.background = "#c8f000"}
            onMouseLeave={e => e.currentTarget.style.background = "#b3e000"}
          >
            Book a Tax Consultation &rarr;
          </button>
        </div>
      </section>

      {/* ── SERVICES — 2-col glassmorphism cards, list rows inside ── */}
      <section className="sec-pad" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 10.5, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: "#aaa", marginBottom: 12, fontFamily: HV }}>Our Services</div>
          <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#111", margin: "0 0 52px", fontFamily: HV }}>
            International tax services for foreign companies in India
          </h2>

          {/* 2-col grid */}
          <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {SERVICES.map(svc => (
              <div key={svc.title} className="svc-card">
                {/* Card heading like "Foundation" */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <h3 style={{ fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 800, color: "#111", margin: 0, letterSpacing: "-0.02em", fontFamily: HV, lineHeight: 1.1 }}>
                      {svc.title}
                    </h3>
                    {svc.badge && (
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: "#111", color: "#fff", padding: "3px 9px", borderRadius: 4, flexShrink: 0, fontFamily: HV }}>
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12.5, color: "#777", fontFamily: HV }}>{svc.subtitle}</div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.75, margin: "0 0 20px", fontFamily: HV }}>
                  {svc.desc}
                </p>

                {/* Divider then list rows */}
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }} />
                {svc.points.map((pt, i) => (
                  <div key={pt} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: i < svc.points.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#222", fontFamily: HV }}>{pt}</span>
                    <span style={{ color: "#bbb", fontSize: 18, flexShrink: 0, marginLeft: 12, fontWeight: 300 }}>→</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED GUIDES — 3-col glassmorphism cards ── */}
      <section className="sec-pad" style={{ padding: "0 56px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ borderTop: "1px solid #e8e8e8", paddingTop: 48 }}>
            <div style={{ fontSize: 10.5, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: "#aaa", marginBottom: 12, fontFamily: HV }}>Detailed Guides</div>
            <h2 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", margin: "0 0 32px", fontFamily: HV }}>
              Go deeper on any topic
            </h2>
            <div className="guide-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {GUIDES.map(g => (
                <div key={g.label} className="guide-card" onClick={() => router.push(ROUTES[g.page] || '/')}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 6, fontFamily: HV, lineHeight: 1.25 }}>{g.label}</div>
                  <div style={{ fontSize: 12.5, color: "#888", marginBottom: 18, fontFamily: HV }}>{g.sub}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111", fontFamily: HV }}>Read guide →</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DTAA TABLE — screenshot 2 exact style ── */}
      <section className="sec-pad" style={{ padding: "88px 56px 96px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Centred heading */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,54px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.06, margin: "0 0 16px", fontFamily: HV, color: "#111" }}>
              India DTAA withholding rates
            </h2>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.75, maxWidth: 580, margin: "0 auto", fontFamily: HV }}>
              India's domestic rates: 20% dividends, 10% royalties, 10% FTS, 20% interest. DTAA rates are almost always lower — often significantly.
            </p>
          </div>

          {/* White rounded card — exact screenshot 2 */}
          <div className="dtaa-wrap" style={{ background: "#fff", borderRadius: 20, padding: "36px 36px 28px", boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.07)" }}>
            {/* Card sub-label */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#111", fontFamily: HV, marginBottom: 4 }}>DTAA Quick Reference</div>
              <div style={{ fontSize: 13.5, color: "#888", fontFamily: HV }}>Key treaty countries — indicative withholding rates</div>
            </div>

            {/* Column headers */}
            <div className="dtaa-grid dtaa-head" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "8px 12px", marginBottom: 10, padding: "0 2px" }}>
              {["Country", "Dividends", "Royalties", "FTS", "Interest"].map((h, i) => (
                <div key={h} style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#bbb", textAlign: i === 0 ? "left" : "center", fontFamily: HV, paddingBottom: 4 }}>{h}</div>
              ))}
            </div>

            {/* Rows */}
            {DTAA_RATES.map((row, ri) => (
              <div
                key={row.country}
                className="dtaa-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  gap: "8px 12px",
                  marginBottom: 8,
                  padding: row.domestic ? "10px 10px" : "4px 2px",
                  background: row.domestic ? "#f7f7f5" : "transparent",
                  borderRadius: row.domestic ? 12 : 0,
                }}
              >
                {/* Country */}
                <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, fontWeight: row.domestic ? 700 : 600, color: "#111", fontFamily: HV, padding: "8px 0" }}>
                  <span style={{ fontSize: 20 }}>{row.flag}</span>{row.country}
                </div>
                {/* Value pill cells */}
                {[row.div, row.roy, row.fts, row.int].map((v, ci) => (
                  <div key={ci} className="pill-cell" style={{
                    border: row.domestic ? "none" : "1px solid #e8e8e8",
                    borderRadius: 8,
                    background: row.domestic ? "transparent" : "#fff",
                    textAlign: "center",
                    padding: "10px 6px",
                    fontSize: 13,
                    fontWeight: row.domestic ? 700 : 500,
                    color: row.domestic ? "#b3700a" : "#333",
                    fontFamily: HV,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Note */}
          <p style={{ marginTop: 14, fontSize: 12.5, color: "#999", lineHeight: 1.65, fontFamily: HV }}>
            <strong style={{ color: "#666" }}>Note:</strong> Rates shown are indicative. Actual rates depend on shareholding %, nature of income, beneficial ownership, and Principal Purpose Test. Contact us for a precise analysis.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#111", padding: "80px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 16, letterSpacing: "-0.03em", fontFamily: HV }}>
            Ready to get your India tax structure right?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 32, fontFamily: HV }}>
            Book a free 30-minute consultation. We'll review your structure, identify key risks and savings, and give you a clear action plan.
          </p>
          <button
            onClick={() => router.push(ROUTES.contact)}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#b3e000", color: "#111", fontFamily: HV, fontSize: 15, fontWeight: 700, padding: "15px 28px", borderRadius: 6, border: "none", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.background = "#c8f000"}
            onMouseLeave={e => e.currentTarget.style.background = "#b3e000"}
          >
            Book Tax Consultation &rarr;
          </button>
        </div>
      </section>

    </div>
  );
}