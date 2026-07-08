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
};

const HV = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BDR = "1px solid rgba(0,0,0,0.52)";
const GLASS = "rgba(255,255,255,0.28)";
const BLUR = "blur(16px)";

const ENTITIES = {
  pvtltd: {
    icon: "🏢", title: "Private Limited Company", badge: "Most Common",
    tax: "25.17%", fdi: "Automatic Route", rbi: "Not required", timeline: "2–3 weeks",
    desc: "The most common structure for businesses in India. A Private Limited Company offers limited liability, separate legal existence, and the ability to raise funding. Ideal for startups, domestic businesses, joint ventures, and foreign-owned entities alike.",
    points: ["Separate legal entity — limited liability for shareholders", "Minimum 2 directors and 2 shareholders required", "At least one director must be an Indian resident", "No minimum paid-up capital requirement", "Corporate tax at 25.17% (22% base + surcharge + cess)", "Can accept FDI under Automatic Route (most sectors)", "SPICe+ e-filing: Certificate of Incorporation in 7–12 days", "Easily convertible to public company for future fundraising"],
    docs: ["PAN & Aadhaar of all directors and shareholders", "Address proof (utility bill / bank statement)", "Passport-size photographs of all directors", "Proposed registered office address proof", "DSC (Digital Signature Certificate) for all directors"],
    bestFor: "Startups, domestic businesses, joint ventures, foreign companies wanting full commercial operations in India",
  },
  llp: {
    icon: "🤝", title: "Limited Liability Partnership", badge: null,
    tax: "30%", fdi: "Approval Route only", rbi: "Not required", timeline: "2–3 weeks",
    desc: "An LLP combines the flexibility of a partnership with the protection of limited liability. Popular with professional services firms, small businesses, and joint ventures. Simpler compliance than a Pvt Ltd but less suitable for raising equity funding.",
    points: ["Partners have limited liability — personal assets protected", "Minimum 2 designated partners required", "At least one designated partner must be an Indian resident", "No minimum capital contribution required", "Taxed at 30% flat (no surcharge below ₹1 crore turnover)", "FDI permitted only via Government Approval Route", "Lower compliance burden vs. Pvt Ltd", "Cannot issue equity shares — not suitable for VC/PE funding"],
    docs: ["PAN & Aadhaar of all designated partners", "Address proof of all designated partners", "Passport-size photographs", "Registered office address proof", "LLP Agreement (drafted and notarised)"],
    bestFor: "Professional services firms, consulting businesses, small domestic businesses, joint ventures not seeking equity funding",
  },
  subsidiary: {
    icon: "🏗️", title: "Wholly Owned Subsidiary", badge: "Foreign Co. Choice",
    tax: "25.17%", fdi: "Automatic Route", rbi: "Not required", timeline: "3–4 weeks",
    desc: "A Private Limited Company where 100% shares are held by a foreign parent. The gold standard for foreign companies entering India — full commercial operations, complete ownership, and no Indian partner required.",
    points: ["100% foreign ownership — no Indian partner needed", "Full FDI via Automatic Route (most sectors)", "Complete control over operations and management", "Can earn, invoice, and repatriate profits freely", "Preferred structure for GCC, SaaS, manufacturing", "Corporate tax at 25.17% (new manufacturing: 17%)", "SPICe+ e-filing: Certificate of Incorporation in 7–12 days", "Intercompany transactions require transfer pricing documentation"],
    docs: ["Certificate of Incorporation of parent company", "Memorandum & Articles of Association of parent", "Board resolution authorising India subsidiary", "KYC of directors: passport, address proof", "Proposed registered office address in India"],
    bestFor: "GCC / Captive Centres, SaaS & Tech companies, Manufacturing, Any foreign company wanting 100% control",
  },
  branch: {
    icon: "🏛️", title: "Branch Office", badge: null,
    tax: "40%", fdi: "RBI Approval Route", rbi: "Required", timeline: "6–8 weeks",
    desc: "A branch office is an extension of the foreign parent in India — not a separate legal entity. It can undertake specific permitted activities but is taxed at 40% on India-sourced profits, making it expensive for most businesses.",
    points: ["Not a separate legal entity — parent is fully liable", "Requires prior RBI approval (Form FNC)", "Taxed at 40% on India-attributable profits", "Permitted: manufacturing, trading, professional services, R&D", "Cannot undertake retail trading or agriculture", "Profits can be repatriated after tax", "Annual Activity Certificate required from CA", "Good for specific project execution or export operations"],
    docs: ["Latest audited financials of parent (last 5 years)", "Certificate of Incorporation of parent", "Memorandum & Articles of Association", "Board resolution for branch opening", "Banker's report from parent's bank"],
    bestFor: "Project-based operations, Export/import businesses, Professional service firms with specific India engagements",
  },
  liaison: {
    icon: "📡", title: "Liaison Office", badge: null,
    tax: "None", fdi: "RBI Approval Route", rbi: "Required", timeline: "6–8 weeks",
    desc: "A liaison office cannot undertake commercial activity or earn revenue. Its sole purpose is market research, promoting the parent's products, and facilitating communication. All expenses must be funded by the parent via inward remittance.",
    points: ["Cannot earn any revenue in India", "No corporate tax — but no deductions either", "Requires RBI prior approval", "All expenses funded by parent remittances only", "Permitted: market research, promoting parent's products", "Not permitted: signing contracts, negotiating on parent's behalf", "Must file Annual Activity Certificate with RBI annually", "Best used as a stepping stone before full incorporation"],
    docs: ["Latest audited financials of parent (last 3 years)", "Certificate of Incorporation of parent", "Board resolution for LO opening", "Banker's report from parent's bank", "Brief on proposed activities in India"],
    bestFor: "Market assessment before committing to full setup, Companies exploring India before incorporation",
  },
};

const ENTITY_TABS = [
  ["pvtltd", "🏢", "Pvt Ltd Company"],
  ["llp", "🤝", "LLP"],
  ["subsidiary", "🏗️", "WOS (Foreign)"],
  ["branch", "🏛️", "Branch Office"],
  ["liaison", "📡", "Liaison Office"],
];

const COMPARISON = [
  ["Tax Rate", "25.17%", "30%", "25.17%", "40%", "Nil"],
  ["Earn Revenue", "✅", "✅", "✅", "⚠️", "❌"],
  ["Foreign Owner", "Auto", "Gov.Appr", "Auto", "RBI Appr", "RBI Appr"],
  ["Timeline", "2–3 wks", "2–3 wks", "3–4 wks", "6–8 wks", "6–8 wks"],
  ["Liability", "Limited", "Limited", "Limited", "Unlimited", "Unlimited"],
];

const PROCESS = [
  { n: "01", icon: "💬", title: "Structure Consultation", time: "Day 1", desc: "Free 30-minute call to understand your business, India objectives, sector, and scale. We recommend the right entity type, FDI route, and tax structure before any filing begins." },
  { n: "02", icon: "📐", title: "Pre-Incorporation Planning", time: "Week 1", desc: "Transfer pricing model design, DTAA analysis, intercompany agreement framework, and registered office identification. Everything decided on paper before the first filing." },
  { n: "03", icon: "📋", title: "SPICe+ Filing (MCA)", time: "Week 2", desc: "Company name reservation (RUN), SPICe+ integrated form covering incorporation, PAN, TAN, GSTIN, EPFO, ESIC, and opening bank account — all in one MCA submission." },
  { n: "04", icon: "🎯", title: "Certificate of Incorporation", time: "Week 2–3", desc: "Ministry of Corporate Affairs issues Certificate of Incorporation (CIN). The company legally exists. PAN, TAN issued simultaneously. Typical time: 7–12 working days from filing." },
  { n: "05", icon: "🏦", title: "RBI & FEMA Compliance", time: "Week 3–4", desc: "FCGPR filing with RBI within 30 days of receiving FDI. GST registration. Bank account opening. Payroll and TDS registration. First compliance calendar issued to client." },
  { n: "06", icon: "🔄", title: "Ongoing Compliance Retainer", time: "Month 2+", desc: "Monthly GST, TDS, and payroll filings. Quarterly advance tax. Annual TP benchmarking study, Form 3CEB, statutory audit, corporate tax return, and MCA annual filing." },
];

const INCLUDED = [
  { cat: "Incorporation", items: ["Company name reservation (RUN)", "SPICe+ integrated filing", "Certificate of Incorporation", "PAN & TAN registration", "GST registration", "EPFO & ESIC registration"] },
  { cat: "Tax & FEMA", items: ["FCGPR filing with RBI", "Transfer pricing model design", "Intercompany MSA drafting", "DTAA analysis & TRC advice", "Form 15CA / 15CB", "Bank account opening support"] },
  { cat: "Ongoing (Retainer)", items: ["Monthly GST return filing", "Monthly TDS / payroll filing", "Quarterly advance tax", "Annual Form 3CEB (TP)", "Statutory audit coordination", "Annual corporate tax return"] },
];

const FAQS = [
  { q: "Do I need a local Indian director?", a: "Yes — at least one director must be an Indian resident (someone who has stayed in India for 182+ days in the preceding calendar year). We help you identify a suitable nominee director if needed, or your Indian hire can serve in this role." },
  { q: "How long does incorporation actually take?", a: "For a Wholly Owned Subsidiary via SPICe+, typically 7–12 working days from filing to Certificate of Incorporation. Total time from engagement start to a fully operational entity (including GST, bank account, FCGPR) is 4–6 weeks." },
  { q: "What is the minimum paid-up capital required?", a: "There is no statutory minimum paid-up capital for a private limited company in India. However, the initial share capital must be sufficient to cover first-year operations and must reflect the arm's length pricing in your transfer pricing structure." },
  { q: "Can a 100% foreign-owned company repatriate profits?", a: "Yes — dividends can be repatriated freely after applicable withholding tax under the relevant DTAA. There is no cap on profit repatriation." },
  { q: "Which sectors require government approval for FDI?", a: "Most sectors operate under the Automatic Route with no RBI or government approval required. Sectors requiring approval include defence (beyond 74%), print media, satellites, and certain financial services. We assess your specific sector before filing." },
  { q: "Do I need transfer pricing documentation from day one?", a: "Yes — the moment your India entity transacts with its foreign parent (management fees, IT services, royalties), those transactions must be priced at arm's length. We design the TP model before incorporation, not as an afterthought when the audit notice arrives." },
];

const HANDLE = [
  ["📋", "Incorporation", "MCA SPICe+ filing, CIN, PAN, TAN, GSTIN"],
  ["🏦", "RBI / FEMA", "FCGPR within 30 days, FLA, ECB, compounding"],
  ["⚖️", "Transfer Pricing", "TP model, MSA, Form 3CEB, APA advisory"],
  ["📊", "DTAA Planning", "Withholding tax optimisation, TRC, PPT analysis"],
  ["💼", "Payroll & HR", "TDS, PF, ESI, professional tax setup"],
  ["🔄", "Ongoing Compliance", "Monthly GST, TDS, quarterly advance tax, annual audit"],
];

export default function Page() {
  const router = useRouter();
  const [active, setActive] = useState("pvtltd");
  const ent = ENTITIES[active];
  const activeIdx = ENTITY_TABS.findIndex(([k]) => k === active);

  return (
    <div style={{ fontFamily: HV, color: "#111", background: "#fff" }}>
      <style>{`
        * { box-sizing: border-box; }
        .gc {
          background: ${GLASS};
          backdrop-filter: ${BLUR};
          -webkit-backdrop-filter: ${BLUR};
          border: ${BDR};
          border-radius: 16px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .gc:hover { transform: translateY(-4px); background: rgba(255,255,255,0.52); box-shadow: 0 12px 36px rgba(0,0,0,0.09); }
        .gc-static { background: ${GLASS}; backdrop-filter: ${BLUR}; -webkit-backdrop-filter: ${BLUR}; border: ${BDR}; border-radius: 16px; }
        .tab-off { background:#fff; border:${BDR}; color:#444; padding:10px 18px; border-radius:8px; cursor:pointer; font-family:${HV}; font-size:13px; font-weight:600; display:inline-flex; align-items:center; gap:7px; transition:all 0.2s; }
        .tab-off:hover { background:#f5f5f5; }
        .tab-on  { background:#111; border:1px solid #111; color:#fff; padding:10px 18px; border-radius:8px; cursor:pointer; font-family:${HV}; font-size:13px; font-weight:600; display:inline-flex; align-items:center; gap:7px; }
        .row-div { border-bottom: 1px solid rgba(0,0,0,0.08); }
        .row-div:last-child { border-bottom: none; }
        .lbl { font-size:10.5px; letter-spacing:2px; text-transform:uppercase; font-weight:600; color:#aaa; font-family:${HV}; }
        .lime-btn { display:inline-flex; align-items:center; gap:8px; background:#b3e000; color:#111; font-family:${HV}; font-size:15px; font-weight:700; padding:14px 28px; border-radius:6px; border:none; cursor:pointer; transition:background 0.2s ease,transform 0.15s ease; text-decoration:none; }
        .lime-btn:hover { background:#c8f000; transform:translateY(-1px); }
        .ghost-btn { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#111; font-family:${HV}; font-size:15px; font-weight:600; padding:14px 28px; border-radius:6px; border:${BDR}; cursor:pointer; transition:all 0.2s; text-decoration:none; }
        .ghost-btn:hover { background:#111; color:#fff; }
        .ghost-dark { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#fff; font-family:${HV}; font-size:15px; font-weight:600; padding:14px 28px; border-radius:6px; border:1px solid rgba(255,255,255,0.25); cursor:pointer; transition:all 0.2s; }
        .ghost-dark:hover { background:rgba(255,255,255,0.08); }
        .cal-pill { background:rgba(0,0,0,0.06); border:1px solid rgba(0,0,0,0.14); color:#333; padding:5px 13px; border-radius:50px; font-size:12px; font-weight:500; font-family:${HV}; display:inline-block; }
        @media(max-width:900px){ .two-col{grid-template-columns:1fr!important;} .three-col{grid-template-columns:1fr 1fr!important;} .hero-g{grid-template-columns:1fr!important;} }
        @media(max-width:540px){ .three-col{grid-template-columns:1fr!important;} .sec{padding:56px 18px!important;} }
      `}</style>

      {/* ── HERO ── */}
      <section className="sec" style={{ background: "#f5f5f0", padding: "96px 56px 88px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="hero-g" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 64, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div className="lbl" style={{ marginBottom: 24 }}>Company Incorporation &amp; Setup</div>
              <h1 style={{ fontSize: "clamp(40px,5.5vw,72px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.033em", color: "#111", margin: "0 0 24px", fontFamily: HV }}>
                Set up your India{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  entity
                  <span style={{ position: "absolute", left: 0, bottom: "-4px", width: "100%", height: "5px", background: "#b3e000", borderRadius: 2 }} />
                </span>{" "}
                — structured correctly from day one.
              </h1>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.78, maxWidth: 520, margin: "0 0 36px", fontFamily: HV }}>
                India entry is not just an incorporation exercise. The legal structure, FDI route, transfer pricing model, and DTAA analysis must be decided <em style={{ color: "#333" }}>before</em> the first filing. We design the full picture first — then we file.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
                <button className="lime-btn" onClick={() => router.push(ROUTES.contact)}>Get Free Structure Review →</button>
                <button className="ghost-btn" onClick={() => router.push(ROUTES.gcc)}>Post Setup →</button>
              </div>
              {/* Stats strip */}
              <div style={{ display: "flex", gap: 0, flexWrap: "wrap", borderLeft: "1px solid rgba(0,0,0,0.12)" }}>
                {[["100+", "Companies incorporated"], ["7–12", "Days to incorporate"], ["18+", "Years of experience"], ["4 wks", "End-to-end setup"]].map(([n, l]) => (
                  <div key={n} style={{ padding: "14px 24px", borderRight: "1px solid rgba(0,0,0,0.12)", textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#111", lineHeight: 1, fontFamily: HV }}>{n}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4, fontFamily: HV }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — glass card */}
            <div className="gc-static" style={{ padding: "26px 24px" }}>
              <div className="lbl" style={{ marginBottom: 20 }}>What We Handle — End to End</div>
              {HANDLE.map(([ico, title, sub]) => (
                <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{ico}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 1, fontFamily: HV }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#777", lineHeight: 1.5, fontFamily: HV }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTITY SELECTOR ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="lbl" style={{ marginBottom: 10 }}>Entity Types</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#111", margin: "0 0 10px", fontFamily: HV }}>Which India entity is right for you?</h2>
          <p style={{ fontSize: 15, color: "#666", margin: "0 0 36px", fontFamily: HV }}>Your entity choice determines tax rate, activity scope, compliance burden, and FDI route. Select each to explore in detail.</p>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
            {ENTITY_TABS.map(([key, ico, label]) => (
              <button key={key} className={active === key ? "tab-on" : "tab-off"} onClick={() => setActive(key)}>{ico} {label}</button>
            ))}
          </div>

          {/* 2-col detail */}
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* Left — overview */}
            <div className="gc-static" style={{ padding: "28px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 30 }}>{ent.icon}</span>
                <div>
                  <h3 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: "#111", margin: 0, letterSpacing: "-0.02em", fontFamily: HV }}>{ent.title}</h3>
                  {ent.badge && <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: "#111", color: "#fff", padding: "3px 9px", borderRadius: 4, marginTop: 4, fontFamily: HV }}>{ent.badge}</span>}
                </div>
              </div>

              {/* Metrics row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "14px 0", borderTop: "1px solid rgba(0,0,0,0.10)", borderBottom: "1px solid rgba(0,0,0,0.10)", marginBottom: 18 }}>
                {[["Tax Rate", ent.tax], ["FDI Route", ent.fdi], ["RBI Approval", ent.rbi], ["Timeline", ent.timeline]].map(([l, v]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 3, fontFamily: HV }}>{v}</div>
                    <div style={{ fontSize: 9.5, color: "#aaa", fontWeight: 600, textTransform: "uppercase", letterSpacing: .5, fontFamily: HV }}>{l}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.75, margin: "0 0 18px", fontFamily: HV }}>{ent.desc}</p>

              <div className="lbl" style={{ marginBottom: 12 }}>Key Features</div>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.09)" }} />
              {ent.points.map((pt, i) => (
                <div key={i} className="row-div" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0" }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: "#222", fontFamily: HV }}>{pt}</span>
                  <span style={{ color: "#ccc", fontSize: 16, flexShrink: 0, marginLeft: 12 }}>→</span>
                </div>
              ))}

              <div style={{ marginTop: 18, background: "rgba(179,224,0,0.12)", border: "1px solid rgba(179,224,0,0.4)", borderRadius: 10, padding: "12px 16px" }}>
                <div className="lbl" style={{ color: "#5a7000", marginBottom: 5 }}>Best For</div>
                <div style={{ fontSize: 12.5, color: "#4a5c00", lineHeight: 1.6, fontFamily: HV }}>{ent.bestFor}</div>
              </div>
            </div>

            {/* Right — docs + comparison */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Docs */}
              <div className="gc-static" style={{ padding: "24px 22px" }}>
                <div className="lbl" style={{ marginBottom: 14 }}>Documents Required</div>
                {ent.docs.map((doc, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#444", marginBottom: 12, fontFamily: HV }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#f0f0f0", border: "1px solid rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#111", flexShrink: 0, fontFamily: HV }}>{i + 1}</div>
                    {doc}
                  </div>
                ))}
              </div>

              {/* Comparison table */}
              <div className="gc-static" style={{ padding: "24px 22px" }}>
                <div className="lbl" style={{ marginBottom: 16 }}>Quick Comparison</div>
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr 1fr", gap: 0 }}>
                  {["", "Pvt Ltd", "LLP", "WOS", "Branch", "Liaison"].map((h, i) => (
                    <div key={i} style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, color: i === 0 ? "#aaa" : (i - 1 === activeIdx ? "#111" : "#999"), padding: "6px 6px", borderBottom: "2px solid rgba(0,0,0,0.12)", textAlign: i === 0 ? "left" : "center", background: i - 1 === activeIdx ? "rgba(179,224,0,0.15)" : "transparent", borderRadius: i - 1 === activeIdx ? "6px 6px 0 0" : 0, fontFamily: HV }}>{h}</div>
                  ))}
                  {COMPARISON.map(([label, ...vals]) => (
                    [
                      <div key={label} style={{ fontSize: 11, fontWeight: 500, color: "#777", padding: "9px 4px", borderBottom: "1px solid rgba(0,0,0,0.07)", fontFamily: HV }}>{label}</div>,
                      ...vals.map((v, j) => (
                        <div key={j} style={{ fontSize: 11.5, fontWeight: 700, color: "#111", padding: "9px 4px", textAlign: "center", borderBottom: "1px solid rgba(0,0,0,0.07)", background: j === activeIdx ? "rgba(179,224,0,0.10)" : "transparent", fontFamily: HV }}>{v}</div>
                      ))
                    ]
                  ))}
                </div>
              </div>

              <button className="lime-btn" style={{ width: "100%", justifyContent: "center", padding: "14px" }} onClick={() => router.push(ROUTES.contact)}>
                Discuss {ent.title} Setup →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS — 2-col glass cards ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="lbl" style={{ marginBottom: 10 }}>Step-by-Step Process</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#111", margin: "0 0 10px", fontFamily: HV }}>
            From decision to fully operational — exactly what happens.
          </h2>
          <p style={{ fontSize: 15, color: "#666", margin: "0 0 44px", fontFamily: HV }}>No surprises, no hidden steps. Here is the complete journey, week by week.</p>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {PROCESS.map((step, i) => (
              <div key={step.n} className="gc" style={{ padding: "24px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: i === 0 ? "#111" : "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: i === 0 ? "#fff" : "#555", flexShrink: 0, fontFamily: HV }}>{step.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 16 }}>{step.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#111", fontFamily: HV }}>{step.title}</span>
                    <span style={{ marginLeft: "auto", background: "rgba(179,224,0,0.20)", border: "1px solid rgba(179,224,0,0.5)", color: "#5a7000", padding: "2px 10px", borderRadius: 50, fontSize: 10, fontWeight: 700, fontFamily: HV, flexShrink: 0 }}>{step.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0, fontFamily: HV }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED — 3-col glass cards ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="lbl" style={{ marginBottom: 10 }}>Scope of Work</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#111", margin: "0 0 10px", fontFamily: HV }}>Everything that's included</h2>
          <p style={{ fontSize: 15, color: "#666", margin: "0 0 44px", fontFamily: HV }}>No hidden deliverables, no surprises. Exactly what we cover — from day one through ongoing compliance.</p>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {INCLUDED.map((cat) => (
              <div key={cat.cat} className="gc" style={{ padding: "26px 22px" }}>
                <div className="lbl" style={{ marginBottom: 16, color: "#111" }}>{cat.cat}</div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.09)" }} />
                {cat.items.map((item, i) => (
                  <div key={i} className="row-div" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0" }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#222", fontFamily: HV }}>{item}</span>
                    <span style={{ color: "#ccc", fontSize: 16, flexShrink: 0, marginLeft: 10 }}>→</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ — 2-col glass cards ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="lbl" style={{ marginBottom: 10 }}>Common Questions</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#111", margin: "0 0 44px", fontFamily: HV }}>Questions we get every time</h2>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="gc" style={{ padding: "24px 22px" }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: "#111", marginBottom: 10, lineHeight: 1.35, fontFamily: HV }}>Q: {faq.q}</div>
                <div style={{ fontSize: 13.5, color: "#555", lineHeight: 1.75, fontFamily: HV }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec" style={{ background: "#111", padding: "80px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div className="lbl" style={{ color: "#555", marginBottom: 16 }}>Get Started</div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 16, letterSpacing: "-0.03em", fontFamily: HV }}>
            Ready to set up your India entity the right way?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", lineHeight: 1.8, marginBottom: 32, fontFamily: HV }}>
            Book a free 30-minute structure review. We'll assess your business, recommend the right entity type and FDI route, and give you a clear week-by-week plan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
            <button className="lime-btn" onClick={() => router.push(ROUTES.contact)}>Book Free Structure Review →</button>
            <a href="tel:+919915731447" className="ghost-dark">Call +91 99157 31447</a>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["Free 30-min consultation", "CA, CS & accountant team", "Response within 24 hours"].map(t => (
              <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.30)", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: HV }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}