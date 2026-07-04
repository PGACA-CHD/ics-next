'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T } from '@/lib/config';
import { trackConsultationRequest, trackGuideDownload, trackWhatsApp, submitToZoho } from '@/lib/utils';

const ROUTES = {
  home:'/',services:'/setup',gcc:'/post-setup',tax:'/international-tax',
  hub:'/knowledge-hub',about:'/about',contact:'/contact',industries:'/industries',
  seo_fcri:'/foreign-company-registration-india',seo_sub:'/subsidiary-company-india',
  seo_tp:'/transfer-pricing-india',seo_fdi:'/fdi-rules-india',
  seo_us:'/us-company-setting-up-india',seo_uk:'/uk-company-setting-up-india',
  seo_uae:'/uae-company-setting-up-india',seo_sg:'/singapore-company-setting-up-india',
  seo_gcc:'/gcc-setup-india',seo_entry:'/india-market-entry-advisory',
  seo_pvtltd:'/private-limited-company-registration-india',
  seo_nri:'/nri-company-registration-india',
  seo_startup:'/startup-foreign-investment-india',
};

export default function Page() {
  const router = useRouter();
    const [activeEntity, setActiveEntity] = useState("pvtltd");

  const entities = {
    pvtltd: {
      icon: "🏢", title: "Private Limited Company", badge: "Most Common",
      tax: "25.17%", fdi: "As applicable", rbi: "Not required", revenue: "✅ Full", timeline: "2–3 weeks",
      desc: "The most common structure for businesses in India. A Private Limited Company offers limited liability, separate legal existence, and the ability to raise funding. Ideal for startups, domestic businesses, joint ventures, and foreign-owned entities alike.",
      points: [
        "Separate legal entity — limited liability for shareholders",
        "Minimum 2 directors and 2 shareholders required",
        "At least one director must be an Indian resident",
        "No minimum paid-up capital requirement",
        "Corporate tax at 25.17% (22% base + surcharge + cess)",
        "Can accept FDI under Automatic Route (most sectors)",
        "SPICe+ e-filing: Certificate of Incorporation in 7–12 days",
        "Easily convertible to public company for future fundraising",
      ],
      docs: ["PAN & Aadhaar of all directors and shareholders", "Address proof (utility bill / bank statement)", "Passport-size photographs of all directors", "Proposed registered office address proof", "DSC (Digital Signature Certificate) for all directors"],
      bestFor: "Startups, domestic businesses, joint ventures, foreign companies wanting full commercial operations in India",
    },
    llp: {
      icon: "🤝", title: "Limited Liability Partnership (LLP)", badge: null,
      tax: "30%", fdi: "Approval Route only", rbi: "Not required", revenue: "✅ Full", timeline: "2–3 weeks",
      desc: "An LLP combines the flexibility of a partnership with the protection of limited liability. Popular with professional services firms (CA, law, consulting), small businesses, and joint ventures. Simpler compliance than a Pvt Ltd but less suitable for raising equity funding.",
      points: [
        "Partners have limited liability — personal assets protected",
        "Minimum 2 designated partners required",
        "At least one designated partner must be an Indian resident",
        "No minimum capital contribution required",
        "Taxed at 30% flat (no surcharge below ₹1 crore turnover)",
        "FDI permitted only via Government Approval Route",
        "Lower compliance burden vs. Pvt Ltd (no statutory audit below ₹40L turnover)",
        "Cannot issue equity shares — not suitable for VC/PE funding",
      ],
      docs: ["PAN & Aadhaar of all designated partners", "Address proof of all designated partners", "Passport-size photographs", "Registered office address proof", "LLP Agreement (drafted and notarised)"],
      bestFor: "Professional services firms, consulting businesses, small domestic businesses, joint ventures not seeking equity funding",
    },
    subsidiary: {
      icon: "🏗️", title: "Wholly Owned Subsidiary", badge: "Foreign Co. Choice",
      tax: "25.17%", fdi: "Automatic Route", rbi: "Not required", revenue: "✅ Full", timeline: "3–4 weeks",
      desc: "A Private Limited Company where 100% shares are held by a foreign parent. The gold standard for foreign companies entering India — full commercial operations, complete ownership, and no Indian partner required. The default choice for GCCs, SaaS companies, and multinationals.",
      points: [
        "100% foreign ownership — no Indian partner needed",
        "Full FDI via Automatic Route (most sectors)",
        "Complete control over operations and management",
        "Can earn, invoice, and repatriate profits freely",
        "Preferred structure for GCC, SaaS, manufacturing",
        "Corporate tax at 25.17% (new manufacturing: 17%)",
        "SPICe+ e-filing: Certificate of Incorporation in 7–12 days",
        "Intercompany transactions require transfer pricing documentation",
      ],
      docs: ["Certificate of Incorporation of parent company", "Memorandum & Articles of Association of parent", "Board resolution authorising India subsidiary", "KYC of directors: passport, address proof", "Proposed registered office address in India"],
      bestFor: "GCC / Captive Centres, SaaS & Tech companies, Manufacturing, Any foreign company wanting 100% control",
    },
    branch: {
      icon: "🏛️", title: "Branch Office", badge: null,
      tax: "40%", fdi: "RBI Approval Route", rbi: "Required", revenue: "⚠️ Limited", timeline: "6–8 weeks",
      desc: "A branch office is an extension of the foreign parent in India — not a separate legal entity. It can undertake specific permitted activities but is taxed at 40% on India-sourced profits, making it expensive for most businesses.",
      points: [
        "Not a separate legal entity — parent is fully liable",
        "Requires prior RBI approval (Form FNC)",
        "Taxed at 40% on India-attributable profits",
        "Permitted: manufacturing, trading, professional services, R&D",
        "Cannot undertake retail trading or agriculture",
        "Profits can be repatriated after tax",
        "Annual Activity Certificate required from CA",
        "Good for specific project execution or export operations",
      ],
      docs: ["Latest audited financials of parent (last 5 years)", "Certificate of Incorporation of parent", "Memorandum & Articles of Association", "Board resolution for branch opening", "Banker's report from parent's bank"],
      bestFor: "Project-based operations, Export/import businesses, Professional service firms with specific India engagements",
    },
    liaison: {
      icon: "📡", title: "Liaison Office", badge: null,
      tax: "None", fdi: "RBI Approval Route", rbi: "Required", revenue: "❌ No revenue", timeline: "6–8 weeks",
      desc: "A liaison office cannot undertake commercial activity or earn revenue. Its sole purpose is market research, promoting the parent's products, and facilitating communication. All expenses must be funded by the parent via inward remittance.",
      points: [
        "Cannot earn any revenue in India",
        "No corporate tax — but no deductions either",
        "Requires RBI prior approval",
        "All expenses funded by parent remittances only",
        "Permitted: market research, promoting parent's products",
        "Not permitted: signing contracts, negotiating on parent's behalf",
        "Must file Annual Activity Certificate with RBI annually",
        "Best used as a stepping stone before full incorporation",
      ],
      docs: ["Latest audited financials of parent (last 3 years)", "Certificate of Incorporation of parent", "Board resolution for LO opening", "Banker's report from parent's bank", "Brief on proposed activities in India"],
      bestFor: "Market assessment before committing to full setup, Companies exploring India before incorporation",
    },
  };

  const activeData = entities[activeEntity];

  const process = [
    { n: "01", title: "Structure Consultation", time: "Day 1", icon: "💬",
      desc: "Free 30-minute call to understand your business, India objectives, sector, and scale. We recommend the right entity type, FDI route, and tax structure before any filing begins." },
    { n: "02", title: "Pre-Incorporation Planning", time: "Week 1", icon: "📐",
      desc: "Transfer pricing model design, DTAA analysis, intercompany agreement framework, and registered office identification. Everything decided on paper before the first filing." },
    { n: "03", title: "SPICe+ Filing (MCA)", time: "Week 2", icon: "📋",
      desc: "Company name reservation (RUN), SPICe+ integrated form covering incorporation, PAN, TAN, GSTIN, EPFO, ESIC, and opening bank account — all in one MCA submission." },
    { n: "04", title: "Certificate of Incorporation", time: "Week 2–3", icon: "🎯",
      desc: "Ministry of Corporate Affairs issues Certificate of Incorporation (CIN). The company legally exists. PAN, TAN issued simultaneously. Typical time: 7–12 working days from filing." },
    { n: "05", title: "RBI & FEMA Compliance", time: "Week 3–4", icon: "🏦",
      desc: "FCGPR filing with RBI within 30 days of receiving FDI. GST registration. Bank account opening. Payroll and TDS registration. First compliance calendar issued to client." },
    { n: "06", title: "Ongoing Compliance Retainer", time: "Month 2+", icon: "🔄",
      desc: "Monthly GST, TDS, and payroll filings. Quarterly advance tax. Annual TP benchmarking study, Form 3CEB, statutory audit, corporate tax return, and MCA annual filing." },
  ];

  const included = [
    { cat: "Incorporation", items: ["Company name reservation (RUN)", "SPICe+ integrated filing", "Certificate of Incorporation", "PAN & TAN registration", "GST registration", "EPFO & ESIC registration"] },
    { cat: "Tax & FEMA", items: ["FCGPR filing with RBI", "Transfer pricing model design", "Intercompany MSA drafting", "DTAA analysis & TRC advice", "Form 15CA / 15CB", "Bank account opening support"] },
    { cat: "Ongoing (Retainer)", items: ["Monthly GST return filing", "Monthly TDS / payroll filing", "Quarterly advance tax", "Annual Form 3CEB (TP)", "Statutory audit coordination", "Annual corporate tax return"] },
  ];

  const faqs = [
    { q: "Do I need a local Indian director?", a: "Yes — at least one director must be an Indian resident (someone who has stayed in India for 182+ days in the preceding calendar year). We help you identify a suitable nominee director if needed, or your Indian hire can serve in this role." },
    { q: "How long does incorporation actually take?", a: "For a Wholly Owned Subsidiary via SPICe+, typically 7–12 working days from filing to Certificate of Incorporation. Total time from engagement start to a fully operational entity (including GST, bank account, FCGPR) is 4–6 weeks." },
    { q: "What is the minimum paid-up capital required?", a: "There is no statutory minimum paid-up capital for a private limited company in India. However, the initial share capital must be sufficient to cover first-year operations and must reflect the arm's length pricing in your transfer pricing structure." },
    { q: "Can a 100% foreign-owned company repatriate profits?", a: "Yes — dividends can be repatriated freely after payment of Dividend Distribution Tax (now abolished — dividends taxed in hands of shareholder). There is no cap on profit repatriation, subject to applicable withholding tax under the relevant DTAA." },
    { q: "Which sectors require government approval for FDI?", a: "Most sectors operate under the Automatic Route with no RBI or government approval required. Sectors requiring approval include defence (beyond 74%), print media, satellites, and certain financial services. We assess your specific sector before filing." },
    { q: "Do I need transfer pricing documentation from day one?", a: "Yes — the moment your India entity transacts with its foreign parent (management fees, IT services, royalties), those transactions must be priced at arm's length. We design the TP model before incorporation, not as an afterthought when the audit notice arrives." },
  ];

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ background: T.f, padding: "100px 56px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 80% at 95% 50%, rgba(232,144,10,.09) 0%,transparent 55%)` }}/>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="hero-grid">
          <div style={{ textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(232,144,10,.13)", border: "1px solid rgba(232,144,10,.28)", color: T.sl, padding: "5px 13px", borderRadius: 50, fontSize: 10.5, fontWeight: 600, letterSpacing: ".6px", textTransform: "uppercase", marginBottom: 20 }}>
              Company Incorporation & Setup
            </div>
            <h1 className="font-display" style={{ fontSize: "clamp(36px,4vw,58px)", fontWeight: 600, color: "#fff", lineHeight: 1.05, marginBottom: 18 }}>
              Set up your India entity —<br/><span style={{ fontStyle: "italic", color: T.sl, fontWeight: 400 }}>structured correctly<br/>from day one.</span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.82, fontWeight: 300, maxWidth: 480, marginBottom: 32 }}>
              India entry is not just an incorporation exercise. The legal structure, FDI route, transfer pricing model, and DTAA analysis must be decided <em style={{ color: "rgba(255,255,255,.7)" }}>before</em> the first filing. We design the full picture first — then we file.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
              <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => router.push(ROUTES["contact"] || "/")}>Get Free Structure Review →</button>
              <button className="ics-btn ics-btn-ghost ics-btn-lg" onClick={() => router.push(ROUTES["gcc"] || "/")}>Post Setup →</button>
            </div>
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
              {[["100+", "Companies incorporated"], ["7–12", "Days to incorporate"], ["18+", "Years of experience"], ["4 wks", "End-to-end setup"]].map(([n, l]) => (
                <div key={n} style={{ padding: "12px 20px", border: "1px solid rgba(255,255,255,.09)", borderRight: "none", textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.32)", marginTop: 3 }}>{l}</div>
                </div>
              ))}
              <div style={{ padding: "12px 20px", border: "1px solid rgba(255,255,255,.09)" }}/>
            </div>
          </div>
          {/* Right side — quick facts panel */}
          <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "32px 28px", textAlign: "left" }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,.35)", fontWeight: 600, marginBottom: 20, textAlign: "left" }}>What We Handle — End to End</div>
            {[
              ["📋", "Incorporation", "MCA SPICe+ filing, CIN, PAN, TAN, GSTIN"],
              ["🏦", "RBI / FEMA", "FCGPR within 30 days, FLA, ECB, compounding"],
              ["⚖️", "Transfer Pricing", "TP model, MSA, Form 3CEB, APA advisory"],
              ["📊", "DTAA Planning", "Withholding tax optimisation, TRC, PPT analysis"],
              ["💼", "Payroll & HR Compliance", "TDS, PF, ESI, professional tax setup"],
              ["🔄", "Ongoing Compliance", "Monthly GST, TDS, quarterly advance tax, annual audit"],
            ].map(([ico, title, sub]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, textAlign: "left" }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, background: "rgba(232,144,10,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{ico}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 1 }}>{title}</div>
                  <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.38)", lineHeight: 1.5 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTITY SELECTOR ── */}
      <section style={{ padding: "88px 56px", background: T.ivory }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ maxWidth: 600, marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 12 }}>Entity Types</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 12 }}>
              Which India entity is <span style={{ fontStyle: "italic", color: T.f }}>right for you?</span>
            </h2>
            <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.8, fontWeight: 300 }}>
              Your entity choice determines tax rate, activity scope, compliance burden, and FDI route. Select each to explore in detail.
            </p>
          </div>

          {/* Tab switcher — 5 entities */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {[["pvtltd", "🏢", "Pvt Ltd Company"], ["llp", "🤝", "LLP"], ["subsidiary", "🏗️", "WOS (Foreign)"], ["branch", "🏛️", "Branch Office"], ["liaison", "📡", "Liaison Office"]].map(([key, ico, label]) => (
              <button key={key} onClick={() => setActiveEntity(key)} style={{
                padding: "10px 18px", border: `1px solid ${activeEntity === key ? T.f : T.bdr}`,
                borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 7,
                background: activeEntity === key ? T.f : "#fff",
                color: activeEntity === key ? "#fff" : T.mid,
                transition: "all .2s",
              }}>
                {ico} {label}
              </button>
            ))}
          </div>

          {/* Active entity detail */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="inner-page-layout">
            {/* Left — description + points */}
            <div style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 16, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${T.f}, ${T.s})` }}/>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 32 }}>{activeData.icon}</span>
                <div>
                  <h3 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: T.ch }}>{activeData.title}</h3>
                  {activeData.badge && <span style={{ background: "#E4F0EB", color: T.f, padding: "2px 9px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{activeData.badge}</span>}
                </div>
              </div>

              {/* Key metrics row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, margin: "20px 0", padding: "16px 0", borderTop: `1px solid ${T.bdr}`, borderBottom: `1px solid ${T.bdr}` }}>
                {[["Tax Rate", activeData.tax], ["FDI Route", activeData.fdi], ["RBI Approval", activeData.rbi], ["Timeline", activeData.timeline]].map(([label, val]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.f, marginBottom: 3 }}>{val}</div>
                    <div style={{ fontSize: 10, color: T.lt, fontWeight: 600, textTransform: "uppercase", letterSpacing: .5 }}>{label}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.75, marginBottom: 20, textAlign: "left" }}>{activeData.desc}</p>

              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: T.lt, marginBottom: 12, textAlign: "left" }}>Key Features</div>
              {activeData.points.map(pt => (
                <div key={pt} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: T.mid, marginBottom: 9 }}>
                  <span style={{ color: T.s, fontWeight: 700, flexShrink: 0 }}>›</span>{pt}
                </div>
              ))}

              <div style={{ marginTop: 20, background: "#E4F0EB", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: T.f, marginBottom: 5 }}>Best For</div>
                <div style={{ fontSize: 12.5, color: T.f, lineHeight: 1.6 }}>{activeData.bestFor}</div>
              </div>
            </div>

            {/* Right — documents + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: T.lt, marginBottom: 16 }}>Documents Required from Parent</div>
                {activeData.docs.map((doc, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: T.mid, marginBottom: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.stone, border: `1px solid ${T.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: T.f, flexShrink: 0 }}>{i + 1}</div>
                    {doc}
                  </div>
                ))}
              </div>

              {/* Comparison table */}
              <div style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: T.lt, marginBottom: 16 }}>Quick Comparison</div>
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr 1fr", gap: 0 }} className="comparison-table-wrap">
                  {/* Header */}
                  {["", "Pvt Ltd", "LLP", "WOS", "Branch", "Liaison"].map((h, i) => (
                    <div key={h} style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, color: i === 0 ? T.lt : T.f, padding: "6px 6px", borderBottom: `2px solid ${T.bdr}`, textAlign: i === 0 ? "left" : "center", background: i > 0 && activeEntity === ["","pvtltd","llp","subsidiary","branch","liaison"][i] ? "#E4F0EB" : "transparent", borderRadius: i > 0 && activeEntity === ["","pvtltd","llp","subsidiary","branch","liaison"][i] ? "4px 4px 0 0" : 0 }}>{h}</div>
                  ))}
                  {/* Rows */}
                  {[
                    ["Tax Rate", "25.17%", "30%", "25.17%", "40%", "Nil"],
                    ["Earn Revenue", "✅", "✅", "✅", "⚠️", "❌"],
                    ["FDI / Foreign", "✅", "Gov. Appr.", "✅ Auto", "RBI Appr.", "RBI Appr."],
                    ["Timeline", "2–3 wks", "2–3 wks", "3–4 wks", "6–8 wks", "6–8 wks"],
                    ["Liability", "Limited", "Limited", "Limited", "Unlimited", "Unlimited"],
                  ].map(([label, ...vals]) => (
                    vals.map((v, i) => (
                      [
                        <div key={label} style={{ fontSize: 11, fontWeight: 500, color: T.mid, padding: "9px 6px", borderBottom: `1px solid ${T.bdr}` }}>{label}</div>,
                        ...vals.map((v2, j) => (
                          <div key={j} style={{ fontSize: 11, fontWeight: 600, color: T.ch, padding: "9px 6px", textAlign: "center", borderBottom: `1px solid ${T.bdr}`, background: activeEntity === ["pvtltd","llp","subsidiary","branch","liaison"][j] ? "rgba(11,61,46,.03)" : "transparent" }}>{v2}</div>
                        ))
                      ]
                    ))[0]
                  ))}
                </div>
              </div>

              <button className="ics-btn ics-btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 14 }} onClick={() => router.push(ROUTES["contact"] || "/")}>
                Discuss {activeData.title} Setup →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "80px 56px 72px", background: T.stone }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ maxWidth: 580, marginBottom: 56 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 12 }}>Step-by-Step Process</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 12 }}>
              From decision to <span style={{ fontStyle: "italic", color: T.f }}>fully operational</span> — exactly what happens.
            </h2>
            <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.8, fontWeight: 300 }}>No surprises, no hidden steps. Here is the complete journey, week by week.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="entity-detail-grid">
            {process.map((step, i) => (
              <div key={step.n} style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 14, padding: "26px 24px", display: "flex", gap: 18, alignItems: "flex-start", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: i === 0 ? T.s : T.bdr }}/>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: i === 0 ? T.f : T.stone, border: `2px solid ${i === 0 ? T.f : T.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 700, color: i === 0 ? "#fff" : T.mid, flexShrink: 0 }}>
                  {step.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 16 }}>{step.icon}</span>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: T.ch }}>{step.title}</span>
                    <span style={{ background: "#E4F0EB", color: T.f, padding: "2px 9px", borderRadius: 50, fontSize: 10, fontWeight: 600, marginLeft: "auto", flexShrink: 0 }}>{step.time}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{ padding: "72px 56px", background: T.ivory }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ maxWidth: 580, marginBottom: 52 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 12 }}>Scope of Work</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 12 }}>
              Everything that's <span style={{ fontStyle: "italic", color: T.f }}>included</span>
            </h2>
            <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.8, fontWeight: 300 }}>No hidden deliverables, no surprises. Here is exactly what we cover — from day one through ongoing compliance.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="inner-service-cards">
            {included.map((cat, ci) => (
              <div key={cat.cat} style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 14, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ci === 0 ? T.f : ci === 1 ? T.s : T.mid }}/>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: ci === 0 ? T.f : ci === 1 ? T.s : T.mid, marginBottom: 16 }}>{cat.cat}</div>
                {cat.items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: T.mid, marginBottom: 10, lineHeight: 1.5 }}>
                    <span style={{ color: ci === 0 ? T.f : ci === 1 ? T.s : T.mid, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "72px 56px 80px", background: T.ch }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ maxWidth: 580, marginBottom: 52 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.sl, fontWeight: 600, marginBottom: 12 }}>Common Questions</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 600, color: "#fff", lineHeight: 1.1 }}>
              Questions we get <span style={{ fontStyle: "italic", color: T.sl }}>every time</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 13, padding: "24px 22px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 10, lineHeight: 1.4 }}>Q: {faq.q}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.48)", lineHeight: 1.75 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: T.f, padding: "80px 56px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 70% at 50% 0%,rgba(232,144,10,.08) 0%,transparent 60%)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.sl, fontWeight: 600, marginBottom: 14 }}>Get Started</div>
          <h2 className="font-display" style={{ fontSize: "clamp(30px,3.5vw,48px)", fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            Ready to set up your<br/><span style={{ fontStyle: "italic", color: T.sl }}>India entity the right way?</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
            Book a free 30-minute structure review. We'll assess your business, recommend the right entity type and FDI route, and give you a clear week-by-week plan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
            <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => router.push(ROUTES["contact"] || "/")}>Book Free Structure Review →</button>
            <a href="tel:+919915731447" className="ics-btn ics-btn-ghost ics-btn-lg">Call +91 99157 31447</a>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["Free 30-min consultation", "CA, CS & accountant team", "Response within 24 hours"].map(t => (
              <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,.28)", display: "flex", alignItems: "center", gap: 5 }}>
                <span>✓</span>{t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── POST SETUP PAGE ──────────────────────────────────────────────────────────
