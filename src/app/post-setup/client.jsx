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
const BDR = "1px solid rgba(0,0,0,0.52)";
const GLASS = "rgba(255,255,255,0.28)";
const BLUR = "blur(16px)";

const SERVICES = {
  compliance: {
    icon: "📋", title: "Regulatory Compliance", badge: "Monthly retainer",
    tagline: "Never miss a filing deadline.",
    desc: "Once your company is incorporated, India's compliance calendar kicks in immediately. GST, TDS, advance tax, MCA filings, ROC returns — each with its own deadline and penalty structure. We manage all of this on a retainer so nothing falls through the cracks.",
    monthly: [
      ["GSTR-1", "Outward supply statement — 11th of every month"],
      ["GSTR-3B", "Summary GST return with tax payment — 20th of every month"],
      ["TDS Returns", "Quarterly TDS filing (24Q, 26Q) with challan payment by 7th"],
      ["Advance Tax", "Quarterly instalments — June, Sep, Dec, March"],
    ],
    annual: [
      "Form ITR-6 — Corporate income tax return",
      "MCA AOC-4 — Annual financial statements filing",
      "MCA MGT-7 — Annual return with shareholder details",
      "DIR-3 KYC — Director KYC renewal every year",
      "DPT-3 — Return of deposits and loans",
    ],
  },
  payroll: {
    icon: "💼", title: "Payroll & HR Compliance", badge: "Monthly retainer",
    tagline: "India's payroll is complex. We handle all of it.",
    desc: "Indian payroll involves more than just salary processing. PF, ESI, professional tax, TDS on salary (Form 16), gratuity provisions, leave encashment — each with state-specific and sector-specific rules. We run end-to-end payroll for your India team.",
    monthly: [
      ["PF (EPFO)", "12% employer + 12% employee contribution — due by 15th"],
      ["ESI", "3.25% employer + 0.75% employee — for salary ≤ ₹21,000/month"],
      ["Professional Tax", "State-specific slab — varies by state and salary band"],
      ["TDS on Salary", "Monthly TDS deduction under Section 192 with challan"],
    ],
    annual: [
      "Form 24Q — Quarterly TDS return on salary",
      "Form 16 — TDS certificate issued to each employee by June 15",
      "PF Annual Return — Form 3A and 6A",
      "Gratuity provisioning and actuarial valuation (if applicable)",
      "Labour law compliance — Shops & Establishment Act renewal",
    ],
  },
  accounting: {
    icon: "📊", title: "Accounting & Bookkeeping", badge: "Monthly retainer",
    tagline: "Books maintained to Indian GAAP and IFRS standards.",
    desc: "Your India entity's accounts must be maintained under the Companies Act 2013 and Indian Accounting Standards (Ind AS or AS). We maintain your books on a monthly basis, produce MIS reports, and ensure statutory audit-readiness throughout the year.",
    monthly: [
      ["Bookkeeping", "Recording of all transactions in Tally / QuickBooks / Zoho"],
      ["Bank Reconciliation", "Monthly reconciliation of all bank accounts"],
      ["Accounts Payable / Receivable", "Invoice processing, payment tracking, ageing reports"],
      ["MIS Report", "Monthly P&L, Balance Sheet, and cash flow summary for management"],
    ],
    annual: [
      "Preparation of financial statements under Companies Act 2013",
      "Coordination with statutory auditor for annual audit",
      "CARO 2020 compliance for applicable companies",
      "Fixed asset register maintenance and depreciation schedules",
      "Year-end provisions — bonus, gratuity, leave encashment",
    ],
  },
  audit: {
    icon: "🔍", title: "Statutory & Tax Audit", badge: "Annual engagement",
    tagline: "Audit-ready books. Clean reports. No surprises.",
    desc: "Every Indian company must have its accounts audited by a Chartered Accountant annually. Companies with turnover above ₹1 crore (business) or ₹50 lakh (profession) also require a tax audit under Section 44AB. We handle both.",
    monthly: [
      ["Audit Preparation", "Ongoing support to maintain audit-ready books throughout the year"],
      ["Interim Review", "Half-yearly review of financials to flag issues before year-end"],
      ["ICFR Documentation", "Internal controls documentation for larger companies"],
      ["Audit Liaison", "Coordination with your statutory auditor on queries"],
    ],
    annual: [
      "Statutory audit under Companies Act 2013 — Form AOC-4 filing",
      "Tax audit under Section 44AB — Form 3CA/3CB + 3CD",
      "Transfer pricing audit — Form 3CEB (mandatory for intercompany transactions)",
      "CARO 2020 report (Companies Auditor's Report Order)",
      "Limited Review for listed entities (quarterly)",
    ],
  },
  fema: {
    icon: "🏦", title: "FEMA & RBI Compliance", badge: "Ongoing retainer",
    tagline: "Foreign exchange compliance is non-negotiable.",
    desc: "Once FDI is received, RBI reporting obligations begin immediately. FCGPR within 30 days. Annual FLA return by July 15. ECB reporting if loans are taken from abroad. FEMA violations trigger compounding proceedings. We ensure nothing is missed.",
    monthly: [
      ["ECB Reporting", "Loan instalment reporting (Form ECB-2) — monthly for ECB borrowings"],
      ["ODI Monitoring", "Overseas Direct Investment compliance for outbound transactions"],
      ["AD Bank Coordination", "Liaison with your Authorised Dealer Bank for all forex transactions"],
      ["FEMA Advisory", "Ongoing advice on repatriation, royalties, and intercompany payments"],
    ],
    annual: [
      "Form FCGPR — filed within 30 days of receiving FDI (one-time per allotment)",
      "FLA Return — Annual return on foreign liabilities and assets (due July 15)",
      "Form FC-GPR for bonus shares or rights issue to foreign shareholders",
      "FIRMS portal maintenance — keeping RBI registration current",
      "Compounding application if any inadvertent FEMA violation occurred",
    ],
  },
  transfer_pricing: {
    icon: "⚖️", title: "Transfer Pricing — Ongoing", badge: "Annual engagement",
    tagline: "Annual documentation. Audit defence. APA advisory.",
    desc: "Transfer pricing is not a one-time exercise at incorporation. Every year, all intercompany transactions must be benchmarked, documented, and certified by a CA. India's TPO is among the world's most active. We provide ongoing TP compliance and defence.",
    monthly: [
      ["TP Monitoring", "Quarterly review of intercompany transactions against the TP model"],
      ["Invoice Review", "Ensuring intercompany invoices align with the agreed pricing model"],
      ["Margin Monitoring", "Tracking operating margins against benchmarked range throughout the year"],
      ["TP Advisory", "Advice on new transaction types, service agreements, and royalty structures"],
    ],
    annual: [
      "Form 3CEB — Mandatory CA certificate for all international transactions",
      "TP Study / Benchmarking Report — functional analysis and comparable search",
      "Master File and Local File (if turnover threshold crossed)",
      "Country-by-Country Report (CbCR) coordination for large MNCs",
      "APA (Advance Pricing Agreement) application and negotiation support",
    ],
  },
};

const SERVICE_LIST = [
  ["compliance", "📋", "Regulatory Compliance"],
  ["payroll", "💼", "Payroll & HR"],
  ["accounting", "📊", "Accounting & Bookkeeping"],
  ["audit", "🔍", "Statutory & Tax Audit"],
  ["fema", "🏦", "FEMA & RBI"],
  ["transfer_pricing", "⚖️", "Transfer Pricing"],
];

const WHY_RETAINER = [
  ["📅", "India has 200+ compliance deadlines a year", "Between GST, TDS, advance tax, MCA filings, RBI returns, and labour law — a new company faces hundreds of deadlines in year one. Missing any triggers penalties."],
  ["🌏", "Your finance team is overseas", "Most foreign companies set up a lean India team with no local finance expertise. Having a CA firm on retainer means your India entity always has professional cover."],
  ["⚖️", "Penalties are automatic and compounding", "India's tax system imposes interest (12–18% p.a.) and late fees automatically. There is no grace period for GST and TDS. Errors compound quickly if not corrected early."],
  ["🔗", "Compliance and tax are interlinked", "Your GST returns feed into your income tax filing. Your TDS workings affect your transfer pricing. Your FEMA filings affect your repatriation. One firm prevents gaps."],
  ["📈", "Audit readiness throughout the year", "India requires an annual statutory audit. If your books are maintained properly month by month, the audit is straightforward — no year-end pressure or restatements."],
  ["🛡️", "One point of contact — always", "Rather than managing a payroll vendor, a GST consultant, an FEMA specialist, and an auditor separately — one team handles everything with one CA who knows your full picture."],
];

const CALENDAR = [
  { period: "Monthly", items: ["GSTR-1 (11th)", "GSTR-3B (20th)", "TDS challan (7th)", "PF & ESI (15th)", "Payroll processing"] },
  { period: "Quarterly", items: ["Advance tax (15th Jun/Sep/Dec/Mar)", "TDS returns (24Q, 26Q)", "GSTR-9 reconciliation", "MIS review"] },
  { period: "Annual", items: ["ITR-6 (Oct 31)", "Form 3CEB (Oct 31)", "AOC-4 & MGT-7 (Nov/Dec)", "FLA Return (Jul 15)", "DIR-3 KYC"] },
];

export default function Page() {
  const router = useRouter();
  const [active, setActive] = useState("compliance");
  const svc = SERVICES[active];

  return (
    <div style={{ fontFamily: HV, color: "#111", background: "#fff" }}>
      <style>{`
        * { box-sizing: border-box; }

        /* glass card */
        .gc {
          background: ${GLASS};
          backdrop-filter: ${BLUR};
          -webkit-backdrop-filter: ${BLUR};
          border: ${BDR};
          border-radius: 16px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .gc:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.52);
          box-shadow: 0 12px 36px rgba(0,0,0,0.09);
        }

        /* service tab buttons */
        .svc-tab {
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-family: ${HV};
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.2s;
        }
        .svc-tab-off {
          background: #fff;
          border: ${BDR};
          color: #444;
        }
        .svc-tab-off:hover { background: #f5f5f5; }
        .svc-tab-on {
          background: #111;
          border: 1px solid #111;
          color: #fff;
        }

        /* divider rows inside cards */
        .row-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          font-family: ${HV};
        }
        .row-item:last-child { border-bottom: none; }

        /* why card */
        .why-card {
          background: ${GLASS};
          backdrop-filter: ${BLUR};
          -webkit-backdrop-filter: ${BLUR};
          border: ${BDR};
          border-radius: 16px;
          padding: 26px 24px;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .why-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.55);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }

        /* calendar pill */
        .cal-pill {
          background: rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.14);
          color: #333;
          padding: 5px 13px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 500;
          font-family: ${HV};
          display: inline-block;
        }

        @media(max-width:900px){
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr 1fr !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width:540px){
          .three-col { grid-template-columns: 1fr !important; }
          .sec { padding: 56px 18px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ background: "#f5f5f0", padding: "96px 56px 88px" }} className="sec">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 64, alignItems: "center" }}>

            {/* Left */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, color: "#777", marginBottom: 24, fontFamily: HV }}>
                Post Setup Services
              </div>
              <h1 style={{ fontSize: "clamp(38px,5.5vw,72px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: "#111", margin: "0 0 24px", fontFamily: HV }}>
                Your company is set up.{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  Now keep it
                  <span style={{ position: "absolute", left: 0, bottom: "-4px", width: "100%", height: "5px", background: "#b3e000", borderRadius: 2 }} />
                </span>{" "}
                running compliantly.
              </h1>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.78, maxWidth: 520, margin: "0 0 36px", fontFamily: HV, fontWeight: 400 }}>
                Incorporation is day one. Your India compliance calendar starts immediately — tax filings, payroll, FEMA returns, annual audit. We manage all of it so your team stays focused on the business.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
                <button
                  onClick={() => router.push(ROUTES.contact)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#b3e000", color: "#111", fontFamily: HV, fontSize: 15, fontWeight: 700, padding: "14px 26px", borderRadius: 6, border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#c8f000"}
                  onMouseLeave={e => e.currentTarget.style.background = "#b3e000"}
                >
                  Get Compliance Retainer Quote →
                </button>
                <button
                  onClick={() => router.push(ROUTES.tax)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#111", fontFamily: HV, fontSize: 15, fontWeight: 600, padding: "14px 26px", borderRadius: 6, border: BDR, cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#111"; }}
                >
                  Int'l Tax Advisory →
                </button>
              </div>
              {/* Stats strip */}
              <div style={{ display: "flex", gap: 0, flexWrap: "wrap", borderLeft: "1px solid rgba(0,0,0,0.12)" }}>
                {[["100+", "Companies on retainer"], ["0", "Penalties incurred"], ["18+", "Years compliance experience"], ["6", "Service areas"]].map(([n, l]) => (
                  <div key={n} style={{ padding: "14px 24px", borderRight: "1px solid rgba(0,0,0,0.12)", textAlign: "center" }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1, fontFamily: HV }}>{n}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4, fontFamily: HV }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — calendar glass card */}
            <div className="gc" style={{ padding: "28px 26px" }}>
              <div style={{ fontSize: 10.5, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, color: "#888", marginBottom: 22, fontFamily: HV }}>
                Compliance Calendar — What We Manage
              </div>
              {CALENDAR.map(({ period, items }) => (
                <div key={period} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#111", marginBottom: 10, fontFamily: HV }}>{period}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {items.map(item => <span key={item} className="cal-pill">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE SELECTOR ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 10.5, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: "#aaa", marginBottom: 10, fontFamily: HV }}>Our Post Setup Services</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#111", margin: "0 0 10px", fontFamily: HV }}>
            Everything your India entity needs to stay compliant.
          </h2>
          <p style={{ fontSize: 15, color: "#666", margin: "0 0 36px", fontFamily: HV }}>Select each service to see exactly what's covered — monthly and annual.</p>

          {/* Tab pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {SERVICE_LIST.map(([key, ico, label]) => (
              <button key={key} className={`svc-tab ${active === key ? "svc-tab-on" : "svc-tab-off"}`} onClick={() => setActive(key)}>
                {ico} {label}
              </button>
            ))}
          </div>

          {/* Detail — 2 col */}
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* Left — overview */}
            <div className="gc" style={{ padding: "30px 26px" }}>
              {/* Title row */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 28 }}>{svc.icon}</span>
                  <h3 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: "#111", margin: 0, letterSpacing: "-0.02em", fontFamily: HV }}>
                    {svc.title}
                  </h3>
                </div>
                <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: "#111", color: "#fff", padding: "3px 9px", borderRadius: 4, marginTop: 4, fontFamily: HV }}>
                  {svc.badge}
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 10, fontFamily: HV }}>
                {svc.tagline}
              </div>
              <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.75, margin: "0 0 22px", fontFamily: HV }}>{svc.desc}</p>

              {/* Annual divider rows */}
              <div style={{ fontSize: 10.5, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, color: "#aaa", marginBottom: 12, fontFamily: HV }}>Annual Deliverables</div>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.10)" }} />
              {svc.annual.map((item, i) => (
                <div key={i} className="row-item">
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: "#222", fontFamily: HV }}>{item}</span>
                  <span style={{ color: "#ccc", fontSize: 18, flexShrink: 0, marginLeft: 12 }}>→</span>
                </div>
              ))}
            </div>

            {/* Right — monthly */}
            <div className="gc" style={{ padding: "30px 26px" }}>
              <div style={{ fontSize: 10.5, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, color: "#aaa", marginBottom: 20, fontFamily: HV }}>Monthly / Ongoing Tasks</div>
              {svc.monthly.map(([title, desc], i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18, paddingBottom: 18, borderBottom: i < svc.monthly.length - 1 ? "1px solid rgba(0,0,0,0.09)" : "none" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0, fontFamily: HV }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 3, fontFamily: HV }}>{title}</div>
                    <div style={{ fontSize: 13, color: "#666", lineHeight: 1.65, fontFamily: HV }}>{desc}</div>
                  </div>
                </div>
              ))}
              {/* Tip box */}
              <div style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: "14px 16px", marginTop: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 4, fontFamily: HV }}>💡 Why this matters</div>
                <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.65, fontFamily: HV }}>
                  Missing deadlines in India triggers automatic penalties and interest. A compliance retainer means you never have to track these dates yourself.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY RETAINER — 3-col glass cards ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 10.5, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: "#aaa", marginBottom: 10, fontFamily: HV }}>Why a Retainer</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#111", margin: "0 0 48px", fontFamily: HV }}>
            Why foreign companies use a compliance retainer in India
          </h2>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {WHY_RETAINER.map(([ico, title, desc]) => (
              <div key={title} className="why-card">
                <div style={{ fontSize: 28, marginBottom: 14 }}>{ico}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.3, fontFamily: HV }}>{title}</div>
                <div style={{ fontSize: 13.5, color: "#555", lineHeight: 1.75, fontFamily: HV }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec" style={{ background: "#111", padding: "80px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, color: "#666", marginBottom: 16, fontFamily: HV }}>Get Started</div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 16, letterSpacing: "-0.03em", fontFamily: HV }}>
            Need a compliance retainer for your India entity?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", lineHeight: 1.8, marginBottom: 32, fontFamily: HV }}>
            Tell us which services you need and we'll put together a tailored retainer proposal within 24 hours.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
            <button
              onClick={() => router.push(ROUTES.contact)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#b3e000", color: "#111", fontFamily: HV, fontSize: 15, fontWeight: 700, padding: "14px 26px", borderRadius: 6, border: "none", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#c8f000"}
              onMouseLeave={e => e.currentTarget.style.background = "#b3e000"}
            >
              Request Retainer Proposal →
            </button>
            <button
              onClick={() => router.push(ROUTES.services)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", fontFamily: HV, fontSize: 15, fontWeight: 600, padding: "14px 26px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              Company Setup →
            </button>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["No lock-in contracts", "CA, CS & accountant team", "Response within 24 hours"].map(t => (
              <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.30)", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: HV }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}