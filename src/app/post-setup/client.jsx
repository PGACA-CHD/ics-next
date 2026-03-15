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
    const [activeService, setActiveService] = useState("compliance");

  const services = {
    compliance: {
      icon: "📋", title: "Regulatory Compliance",
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
      badge: "Monthly retainer",
    },
    payroll: {
      icon: "💼", title: "Payroll & HR Compliance",
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
      badge: "Monthly retainer",
    },
    accounting: {
      icon: "📊", title: "Accounting & Bookkeeping",
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
      badge: "Monthly retainer",
    },
    audit: {
      icon: "🔍", title: "Statutory & Tax Audit",
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
      badge: "Annual engagement",
    },
    fema: {
      icon: "🏦", title: "FEMA & RBI Compliance",
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
      badge: "Ongoing retainer",
    },
    transfer_pricing: {
      icon: "⚖️", title: "Transfer Pricing — Ongoing",
      tagline: "Annual documentation. Audit defence. APA advisory.",
      desc: "Transfer pricing is not a one-time exercise at incorporation. Every year, all intercompany transactions must be benchmarked, documented, and certified by a CA. India's TPO (Transfer Pricing Officer) is among the world's most active. We provide ongoing TP compliance and defence.",
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
      badge: "Annual engagement",
    },
  };

  const activeData = services[activeService];

  const serviceList = [
    ["compliance", "📋", "Regulatory Compliance"],
    ["payroll", "💼", "Payroll & HR"],
    ["accounting", "📊", "Accounting & Bookkeeping"],
    ["audit", "🔍", "Statutory & Tax Audit"],
    ["fema", "🏦", "FEMA & RBI"],
    ["transfer_pricing", "⚖️", "Transfer Pricing"],
  ];

  const complianceCalendar = [
    { month: "Monthly", color: T.f, items: ["GSTR-1 (11th)", "GSTR-3B (20th)", "TDS challan (7th)", "PF & ESI (15th)", "Payroll processing"] },
    { month: "Quarterly", color: T.s, items: ["Advance tax (15th Jun/Sep/Dec/Mar)", "TDS returns (24Q, 26Q)", "GSTR-9 reconciliation", "MIS review"] },
    { month: "Annual", color: "#4A6FA5", items: ["ITR-6 (Oct 31)", "Form 3CEB (Oct 31)", "AOC-4 & MGT-7 (Nov/Dec)", "FLA Return (Jul 15)", "DIR-3 KYC"] },
  ];

  return (
    <div>

      {/* ── HERO ── */}
      <section style={{ background: T.f, padding: "100px 56px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 80% at 95% 50%,rgba(232,144,10,.09) 0%,transparent 55%)" }}/>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="hero-grid">
          <div style={{ textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(232,144,10,.13)", border: "1px solid rgba(232,144,10,.28)", color: T.sl, padding: "5px 13px", borderRadius: 50, fontSize: 10.5, fontWeight: 600, letterSpacing: ".6px", textTransform: "uppercase", marginBottom: 20 }}>
              Post Setup Services
            </div>
            <h1 className="font-display" style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 600, color: "#fff", lineHeight: 1.06, marginBottom: 18 }}>
              Your company is set up.<br/><span style={{ fontStyle: "italic", color: T.sl, fontWeight: 400 }}>Now keep it running<br/>compliantly.</span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.82, fontWeight: 300, maxWidth: 480, marginBottom: 32 }}>
              Incorporation is day one. Your India compliance calendar starts immediately — tax filings, payroll, FEMA returns, annual audit. We manage all of it so your team stays focused on the business.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => router.push(ROUTES["contact"] || "/")}>Get Compliance Retainer Quote →</button>
              <button className="ics-btn ics-btn-ghost ics-btn-lg" onClick={() => router.push(ROUTES["tax"] || "/")}>Int'l Tax Advisory →</button>
            </div>
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap", borderLeft: "1px solid rgba(255,255,255,.09)" }}>
              {[["100+", "Companies on retainer"], ["0", "Penalties incurred"], ["18+", "Years compliance experience"], ["6", "Service areas"]].map(([n, l]) => (
                <div key={n} style={{ padding: "14px 24px", borderRight: "1px solid rgba(255,255,255,.09)", textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 4, letterSpacing: .3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — compliance calendar preview */}
          <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "28px 26px", textAlign: "left" }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,.55)", fontWeight: 700, marginBottom: 20 }}>Compliance Calendar — What We Manage</div>
            {complianceCalendar.map(({ month, color, items }) => (
              <div key={month} style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }}/>
                  {month}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map(item => (
                    <span key={item} style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.82)", padding: "5px 12px", borderRadius: 50, fontSize: 11.5, fontWeight: 500 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE SELECTOR ── */}
      <section style={{ padding: "80px 56px", background: T.ivory }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ maxWidth: 580, marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 12 }}>Our Post Setup Services</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 12 }}>
              Everything your India entity<br/><span style={{ fontStyle: "italic", color: T.f }}>needs to stay compliant.</span>
            </h2>
            <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.8, fontWeight: 300 }}>Select each service to see exactly what's covered — monthly and annual.</p>
          </div>

          {/* Service pill tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {serviceList.map(([key, ico, label]) => (
              <button key={key} onClick={() => setActiveService(key)} style={{
                padding: "10px 18px", border: `1px solid ${activeService === key ? T.f : T.bdr}`,
                borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 7,
                background: activeService === key ? T.f : "#fff",
                color: activeService === key ? "#fff" : T.mid,
                transition: "all .2s",
              }}>
                {ico} {label}
              </button>
            ))}
          </div>

          {/* Active service detail — two columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="inner-page-layout">

            {/* Left — overview */}
            <div style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 16, padding: "32px 28px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${T.f}, ${T.s})` }}/>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{activeData.icon}</span>
                <div>
                  <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: T.ch }}>{activeData.title}</h3>
                  <span style={{ background: "#E4F0EB", color: T.f, padding: "2px 9px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{activeData.badge}</span>
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.f, fontStyle: "italic", marginBottom: 10, textAlign: "left" }}>{activeData.tagline}</div>
              <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.75, marginBottom: 24, textAlign: "left" }}>{activeData.desc}</p>

              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: T.lt, marginBottom: 14, textAlign: "left" }}>Annual Deliverables</div>
              {activeData.annual.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: T.mid, marginBottom: 9, lineHeight: 1.5, textAlign: "left" }}>
                  <span style={{ color: T.s, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                </div>
              ))}
            </div>

            {/* Right — monthly tasks */}
            <div style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 16, padding: "32px 28px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: T.lt, marginBottom: 20, textAlign: "left" }}>Monthly / Ongoing Tasks</div>
              {activeData.monthly.map(([title, desc], i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18, paddingBottom: 18, borderBottom: i < activeData.monthly.length - 1 ? `1px solid ${T.bdr}` : "none" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#E4F0EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: T.f, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ch, marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </div>
              ))}

              <div style={{ background: "#E4F0EB", borderRadius: 10, padding: "16px 18px", marginTop: 8 }}>
                <div style={{ fontSize: 12.5, color: T.f, fontWeight: 700, marginBottom: 5, textAlign: "left" }}>💡 Why this matters</div>
                <div style={{ fontSize: 12.5, color: T.f, lineHeight: 1.65, opacity: .85, textAlign: "left" }}>
                  Missing deadlines in India triggers automatic penalties and interest. A compliance retainer means you never have to track these dates yourself.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY RETAINER ── */}
      <section style={{ background: T.stone, padding: "80px 56px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ maxWidth: 580, marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 12 }}>Why a Retainer</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,42px)", fontWeight: 600, color: T.ch, lineHeight: 1.1 }}>
              Why foreign companies use a<br/><span style={{ fontStyle: "italic", color: T.f }}>compliance retainer in India</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="inner-service-cards">
            {[
              ["📅", "India has 200+ compliance deadlines a year", "Between GST, TDS, advance tax, MCA filings, RBI returns, and labour law — a new company faces hundreds of deadlines in year one. Missing any of them triggers penalties."],
              ["🌏", "Your finance team is overseas", "Most foreign companies set up a lean India team with no local finance expertise. Having a CA firm on retainer means your India entity always has professional cover — without a full-time CFO hire."],
              ["⚖️", "Penalties are automatic and compounding", "India's tax system imposes interest (12–18% p.a.) and late fees automatically. There is no grace period for GST and TDS. Errors compound quickly if not corrected early."],
              ["🔗", "Compliance and tax are interlinked", "Your GST returns feed into your income tax filing. Your TDS workings affect your transfer pricing. Your FEMA filings affect your repatriation. A single firm that handles all of it prevents gaps."],
              ["📈", "Audit readiness throughout the year", "India requires an annual statutory audit. If your books are maintained properly month by month, the audit is straightforward. If not, you face year-end pressure, restatements, and delays."],
              ["🛡️", "One point of contact — always", "Rather than managing a payroll vendor, a GST consultant, an FEMA specialist, and an auditor separately, you have one team that handles everything and one senior CA who knows your full picture."],
            ].map(([ico, title, desc]) => (
              <div key={title} style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 13, padding: "26px 24px" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{ico}</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: T.ch, marginBottom: 8, lineHeight: 1.35, textAlign: "left" }}>{title}</div>
                <div style={{ fontSize: 13, color: T.mid, lineHeight: 1.75, textAlign: "left" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: T.f, padding: "80px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 70% at 50% 0%,rgba(232,144,10,.08) 0%,transparent 60%)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.sl, fontWeight: 600, marginBottom: 14 }}>Get Started</div>
          <h2 className="font-display" style={{ fontSize: "clamp(30px,3.5vw,46px)", fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            Need a compliance retainer<br/><span style={{ fontStyle: "italic", color: T.sl }}>for your India entity?</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
            Tell us which services you need and we'll put together a tailored retainer proposal within 24 hours.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => router.push(ROUTES["contact"] || "/")}>Request Retainer Proposal →</button>
            <button className="ics-btn ics-btn-ghost ics-btn-lg" onClick={() => router.push(ROUTES["services"] || "/")}>Company Setup →</button>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["No lock-in contracts", "CA, CS & accountant team", "Response within 24 hours"].map(t => (
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

// ─── TAX PAGE ────────────────────────────────────────────────────────────────
