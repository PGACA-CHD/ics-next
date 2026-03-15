'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { T, CALENDLY_URL, WA_BASE, PHONE_RAW } from '@/lib/config';
import { trackConsultationRequest, trackGuideDownload, trackWhatsApp } from '@/lib/utils';

// ROUTES map for setPage compatibility
const ROUTES = {
  home: '/', services: '/setup', gcc: '/post-setup',
  tax: '/international-tax', hub: '/knowledge-hub',
  about: '/about', contact: '/contact', industries: '/industries',
  seo_fcri: '/foreign-company-registration-india',
  seo_sub: '/subsidiary-company-india',
  seo_tp: '/transfer-pricing-india',
  seo_fdi: '/fdi-rules-india',
  seo_us: '/us-company-setting-up-india',
  seo_uk: '/uk-company-setting-up-india',
  seo_uae: '/uae-company-setting-up-india',
  seo_sg: '/singapore-company-setting-up-india',
  seo_gcc: '/gcc-setup-india',
  seo_entry: '/india-market-entry-advisory',
  seo_pvtltd: '/private-limited-company-registration-india',
  seo_nri: '/nri-company-registration-india',
  seo_startup: '/startup-foreign-investment-india',
};

// WASvg component
function WASvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
      <path d="M13 1C6.373 1 1 6.373 1 13c0 2.278.618 4.41 1.695 6.238L1 25l5.95-1.56A11.94 11.94 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z" fill="#fff"/>
      <path d="M13 3.182c-5.42 0-9.818 4.398-9.818 9.818 0 2.149.694 4.136 1.864 5.758l-1.22 3.597 3.72-1.196a9.76 9.76 0 005.454 1.659c5.42 0 9.818-4.398 9.818-9.818S18.42 3.182 13 3.182zm4.863 13.044c-.202.57-1.188 1.093-1.634 1.12-.41.024-.793.195-2.674-.557-2.25-.9-3.688-3.19-3.8-3.34-.11-.148-.91-1.21-.91-2.31 0-1.098.575-1.638.778-1.858.203-.22.44-.275.587-.275l.42.008c.135.005.316-.051.495.378.184.44.624 1.52.678 1.63.055.11.09.238.017.386-.073.148-.11.24-.22.37l-.33.386c-.11.12-.225.25-.097.49.128.24.572.944 1.228 1.529.844.752 1.556.985 1.776 1.095.22.11.348.092.477-.055.128-.147.55-.641.697-.861.147-.22.293-.184.495-.11.202.073 1.284.606 1.504.716.22.11.367.165.422.256.054.091.054.527-.148 1.097z" fill="#25D366"/>
    </svg>
  );
}

function SEOPageLayout({ children, title, description, eyebrow, setPage }) {
  return (
    <div ref={pageRef}>
      {/* Hero */}
      
      {/* ── SEO Resource Links ── */}
      <section style={{ padding:"0 56px 56px", background:T.ivory }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <div style={{ background:T.stone, borderRadius:14, padding:"24px 28px", border:`1px solid ${T.bdr}` }}>
            <div style={{ fontSize:10, letterSpacing:2.5, textTransform:"uppercase", color:T.s, fontWeight:600, marginBottom:12 }}>Detailed Guides</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {[
                { label:"Foreign company registration in India →", page:"seo_fcri" },
                { label:"Wholly owned subsidiary setup →", page:"seo_sub" },
                { label:"FDI rules & automatic route →", page:"seo_fdi" },
                { label:"Transfer pricing requirements →", page:"seo_tp" },
              ].map(l => (
                <button key={l.label} onClick={() => setPage(l.page)} style={{
                  background:"#fff", border:`1px solid ${T.bdr}`, color:T.f,
                  padding:"8px 14px", borderRadius:50, fontSize:12.5, fontWeight:600,
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background=T.f; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.f; }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
<section style={{ background: T.f, padding: "110px 56px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 80% at 95% 50%,rgba(232,144,10,.07) 0%,transparent 55%)" }}/>
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(232,144,10,.13)", border: "1px solid rgba(232,144,10,.28)", color: T.sl, padding: "5px 13px", borderRadius: 50, fontSize: 10.5, fontWeight: 600, letterSpacing: ".6px", textTransform: "uppercase", marginBottom: 20 }}>
            {eyebrow}
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 600, color: "#fff", lineHeight: 1.06, marginBottom: 18 }}>
            {title}
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.55)", lineHeight: 1.78, fontWeight: 300, maxWidth: 620, marginBottom: 36 }}>
            {description}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => (() => { if(typeof window !== "undefined") window.location.href = ROUTES["contact"] || "/"; })()}>Book Free Consultation →</button>
            <button className="ics-btn ics-btn-ghost ics-btn-lg" onClick={() => (() => { if(typeof window !== "undefined") window.location.href = ROUTES["services"] || "/"; })()}>View Entity Types →</button>
          </div>
        </div>
      </section>
      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 56px 80px" }} className="seo-content">
        {children}
      </div>
    </div>
  );
}

function SEOSection({ label, title, children }) {
  return (
    <div className="reveal" style={{ marginBottom: 56 }}>
      {label && <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 10 }}>{label}</div>}
      {title && <h2 className="font-display" style={{ fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 600, color: T.ch, lineHeight: 1.15, marginBottom: 20 }}>{title}</h2>}
      {children}
    </div>
  );
}

function SEOProseP({ children }) {
  return <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.88, fontWeight: 300, marginBottom: 16 }}>{children}</p>;
}

function SEOSteps({ steps }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 18, padding: "20px 0", borderBottom: `1px solid ${T.bdr}`, borderTop: i === 0 ? `1px solid ${T.bdr}` : "none" }}>
          <div style={{ width: 28, height: 28, background: T.f, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: T.ch, marginBottom: 5 }}>{s.title} {s.time && <span style={{ background: T.stone, color: T.s, fontSize: 10.5, fontWeight: 700, padding: "2px 10px", borderRadius: 50, marginLeft: 8 }}>{s.time}</span>}</div>
            <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.72, fontWeight: 300 }}>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SEOMistakes({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((m, i) => (
        <div key={i} style={{ background: "#FFF8F0", border: "1px solid #FFE0B2", borderRadius: 12, padding: "18px 20px", display: "grid", gridTemplateColumns: "24px 1fr", gap: 14 }}>
          <span style={{ fontSize: 16, marginTop: 1 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#B45309", marginBottom: 5 }}>{m.title}</div>
            <p style={{ fontSize: 13, color: "#78350F", lineHeight: 1.65, fontWeight: 300 }}>{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SEOFAQs({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {items.map((faq, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${T.bdr}`, borderTop: i === 0 ? `1px solid ${T.bdr}` : "none" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'DM Sans',sans-serif", textAlign: "left", gap: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: T.ch, lineHeight: 1.4 }}>{faq.q}</span>
            <span style={{ fontSize: 18, color: T.s, flexShrink: 0, transition: "transform .2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
          </button>
          {open === i && <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.78, fontWeight: 300, paddingBottom: 18, marginTop: -4 }}>{faq.a}</p>}
        </div>
      ))}
    </div>
  );
}

function SEOClientStory({ flag, region, headline, challenge, outcome, proof }) {
  return (
    <div style={{ background: T.stone, borderRadius: 16, padding: "28px 30px", border: `1px solid ${T.bdr}`, marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 24 }}>{flag}</span>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: T.mid }}>{region}</div>
      </div>
      <h3 className="font-display" style={{ fontSize: 19, fontWeight: 600, color: T.ch, marginBottom: 12 }}>{headline}</h3>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 9.5, letterSpacing: 1.5, textTransform: "uppercase", color: T.lt, fontWeight: 600, marginBottom: 5 }}>The challenge</div>
        <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.72, fontWeight: 300 }}>{challenge}</p>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9.5, letterSpacing: 1.5, textTransform: "uppercase", color: T.lt, fontWeight: 600, marginBottom: 5 }}>What we delivered</div>
        <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.72, fontWeight: 300 }}>{outcome}</p>
      </div>
      <div style={{ background: "#E4F0EB", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 8 }}>
        <span style={{ color: T.f, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>✓</span>
        <p style={{ fontSize: 12.5, color: T.f, lineHeight: 1.6, fontWeight: 500 }}>{proof}</p>
      </div>
    </div>
  );
}

function SEOCTAStrip({ setPage }) {
  return (
    <div className="reveal seo-cta-strip" style={{ background: `linear-gradient(135deg,${T.f} 0%,${T.f3} 100%)`, borderRadius: 18, padding: "40px 44px", marginTop: 56, display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
      <div>
        <h3 className="font-display" style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 600, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
          Ready to get started? Book a free 30-minute consultation.
        </h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
          Senior CA reviews your situation and gives you a clear structure recommendation. No commitment. Written summary after the call.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
        <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => (() => { if(typeof window !== "undefined") window.location.href = ROUTES["contact"] || "/"; })()}>Book Free Consultation →</button>
        <a href="https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20my%20company%20in%20India." target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 22px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>
          <WASvg/> WhatsApp us
        </a>
      </div>
    </div>
  );
}

// ─── SEO PAGE 1: FOREIGN COMPANY REGISTRATION INDIA ──────────────────────────



function SEOFDIRulesPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="FDI & FEMA Compliance · India Entry" setPage={setPage}
      title={<>FDI Rules in India —<br/><span style={{ fontStyle:"italic", color:T.sl }}>What Foreign Investors Must Know</span></>}
      description="India's FDI policy governs how foreign companies can invest in India. Here is a plain-English guide to FDI routes, sector caps, prohibited sectors, and FEMA compliance — with what actually matters in practice.">

      <SEOSection label="Overview" title="India's FDI framework — how it works">
        <SEOProseP>Foreign Direct Investment (FDI) in India is regulated under the Foreign Exchange Management Act (FEMA), administered by the Reserve Bank of India (RBI), with sector-specific policy issued by the Department for Promotion of Industry and Internal Trade (DPIIT). India received USD 70.97 billion in FDI in FY 2023–24, making it one of the world's top FDI destinations.</SEOProseP>
        <SEOProseP>For a foreign company setting up in India, the FDI rules determine: (1) whether investment is permitted in your sector, (2) the maximum percentage of foreign ownership allowed, (3) whether Government approval is required before investing, and (4) what filings must be made with the RBI after investment.</SEOProseP>
        <SEOProseP>Getting FDI compliance wrong creates serious exposure. Investments made without proper authorisation, incorrect route classification, or missed FEMA filings attract penalties up to three times the transaction value — with RBI having power to compel regularisation.</SEOProseP>
      </SEOSection>

      <SEOSection label="The Two Routes" title="Automatic Route vs. Government Route — the critical distinction">
        <div className="seo-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[
            { route: "Automatic Route", color: T.f, light: "#E4F0EB", title: "No prior approval needed", points: ["Investment can proceed immediately", "FCGPR filing required within 30 days of share allotment", "Covers most manufacturing, IT, services, e-commerce", "Most foreign companies use this route"], warning: null },
            { route: "Government Route", color: "#B45309", light: "#FFF8F0", title: "Prior FIPB/Cabinet approval required", points: ["Application filed through DPIIT portal", "Timeline: 8–12 weeks for approval", "Required for defence, insurance, broadcasting, telecom, multi-brand retail", "Some sectors have mandatory conditions (e.g., local sourcing)"], warning: "Investment before approval is a FEMA violation" },
          ].map(r => (
            <div key={r.route} style={{ background: r.light, border: `1px solid ${r.color}30`, borderRadius: 14, padding: "22px 20px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: r.color, fontWeight: 700, marginBottom: 8 }}>{r.route}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.ch, marginBottom: 12 }}>{r.title}</div>
              {r.points.map(p => (
                <div key={p} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: r.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: T.mid, lineHeight: 1.55 }}>{p}</span>
                </div>
              ))}
              {r.warning && <div style={{ marginTop: 12, background: "#FEF3C7", borderRadius: 7, padding: "8px 12px", fontSize: 12, color: "#92400E", fontWeight: 600 }}>⚠️ {r.warning}</div>}
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="Sector Caps" title="Key sector FDI limits at a glance">
        <div className="comparison-table-wrap" style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", background: T.f, padding: "10px 16px" }}>
            {["Sector", "FDI Cap", "Route"].map(h => <div key={h} style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: 1 }}>{h}</div>)}
          </div>
          {[
            ["Manufacturing", "100%", "Automatic"],
            ["IT / Software Services", "100%", "Automatic"],
            ["E-commerce (marketplace)", "100%", "Automatic"],
            ["Construction & real estate", "100%", "Automatic"],
            ["Insurance", "74%", "Automatic up to 49%, Government above"],
            ["Telecom", "100%", "Automatic up to 49%, Government above 49%"],
            ["Defence", "74%", "Automatic up to 74%, Government above"],
            ["Multi-brand retail", "51%", "Government Route"],
            ["Banking (private sector)", "74%", "Automatic up to 49%"],
            ["Print media", "26%", "Government Route"],
            ["Lottery, gambling, casino", "0%", "Prohibited"],
            ["Real estate business (speculation)", "0%", "Prohibited"],
          ].map((row, i) => (
            <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", padding: "11px 16px", background: i % 2 === 0 ? "#fff" : T.stone, borderTop: `1px solid ${T.bdr}` }}>
              <span style={{ fontSize: 13, color: T.ch, fontWeight: 500 }}>{row[0]}</span>
              <span style={{ fontSize: 13, color: row[1] === "0%" ? "#DC2626" : T.f, fontWeight: 700 }}>{row[1]}</span>
              <span style={{ fontSize: 12.5, color: T.mid }}>{row[2]}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12.5, color: T.lt }}>This is a simplified summary. FDI policy changes periodically — always verify current rules before proceeding.</p>
      </SEOSection>

      <SEOSection label="FEMA Compliance" title="Mandatory FEMA filings after FDI">
        <SEOSteps steps={[
          { title: "FC-GPR (Foreign Currency — Gross Provisional Return)", time: "Within 30 days", desc: "Filed with the RBI through the FIRMS portal after shares are allotted to the foreign investor. Declares the amount of FDI received, the number of shares allotted, and the valuation basis. This is the most important FEMA filing — missing the 30-day deadline requires compounding." },
          { title: "Valuation certificate", time: "Before share allotment", desc: "Shares issued to foreign investors must be valued by a SEBI-registered merchant banker or a Chartered Accountant using internationally accepted pricing methodology. For private companies, DCF or NAV basis is typically used." },
          { title: "Annual Return on Foreign Liabilities and Assets (FLA)", time: "By 15 July each year", desc: "Every Indian company with FDI must file the FLA Return with RBI annually. Covers outstanding FDI, foreign borrowings, and overseas investments. Non-filing attracts compounding charges." },
          { title: "FC-TRS (for share transfers)", time: "Within 60 days", desc: "If shares are subsequently transferred between a resident and non-resident (or vice versa), FC-TRS must be filed with RBI within 60 days of the transfer. Applies to secondary transactions as well as buybacks." },
          { title: "ODI filing for outbound investment", time: "As applicable", desc: "If the India subsidiary later invests overseas (e.g., sets up a subsidiary in another country), Overseas Direct Investment (ODI) forms must be filed with RBI." },
        ]}/>
      </SEOSection>

      <SEOSection label="Real Client Example" title="FDI compliance in practice">
        <SEOClientStory flag="🇺🇦" region="Europe · Manufacturing Group · Long-established India entity"
          headline="European manufacturer regularised 3 years of missed FLA Returns"
          challenge="The India subsidiary had been filing its tax returns correctly but had missed FLA Returns for three consecutive years — the finance team in Europe was unaware of this RBI requirement."
          outcome="We filed all three years of outstanding FLA Returns, prepared the compounding application for the missed deadlines, and set up an automated compliance calendar to prevent future misses."
          proof="RBI compounding accepted. Zero impact on ongoing operations. FLA now filed on time every year via our retainer."/>
      </SEOSection>

      <SEOSection label="Common Mistakes" title="FDI and FEMA mistakes foreign companies make">
        <SEOMistakes items={[
          { title: "Investing before confirming the FDI route", desc: "Sending funds to India and allotting shares before confirming the sector is under Automatic Route (or before Government approval for restricted sectors) is a FEMA violation. The penalty is up to 3× the amount of the violation — which can be the entire investment amount." },
          { title: "Using the wrong valuation methodology", desc: "Shares issued to foreign investors at below fair market value are treated as a deemed FDI violation. The valuation certificate must be from a qualified professional and must precede share allotment." },
          { title: "Missing the FC-GPR 30-day window", desc: "This is the most common FEMA violation we encounter. Many companies complete incorporation correctly but miss the FC-GPR filing deadline because they are unaware of it. A compounding application must then be filed — adding months of delay and regulatory cost." },
          { title: "Not filing FLA Returns annually", desc: "The Annual FLA Return is not filed through MCA — it is filed directly with RBI and is separate from all other annual compliances. Many companies are unaware of it until they receive a notice." },
        ]}/>
      </SEOSection>

      <SEOSection label="FAQ" title="FDI and FEMA questions">
        <SEOFAQs items={[
          { q: "Can a foreign company own 100% of an Indian company?", a: "Yes — in most sectors. 100% FDI under the Automatic Route is permitted in manufacturing, IT, most services, and e-commerce (marketplace model). Restricted sectors such as insurance (74% cap), defence (74%), and multi-brand retail (51%) have lower limits." },
          { q: "What is the difference between FEMA and FDI policy?", a: "FDI policy (issued by DPIIT) determines what foreign investment is permitted in which sectors and at what ownership levels. FEMA (administered by RBI) governs how the investment is executed — the forms, timelines, and compliance obligations. Both apply simultaneously and must be complied with." },
          { q: "What is compounding under FEMA?", a: "Compounding is the process by which a FEMA violation is regularised with the RBI. It involves admitting the violation, paying a compounding fee, and obtaining an order regularising the breach. Most missed FC-GPR and FLA filings are resolved through compounding. The fee varies — typically ranging from the interest amount to a fixed penalty depending on the nature and duration of the violation." },
          { q: "Is prior RBI approval needed to open a subsidiary?", a: "For sectors under the Automatic Route, no prior RBI approval is needed. The FCGPR is filed after the investment, not before. For sectors under the Government Route, FIPB/Cabinet Committee approval must be obtained before the investment is made." },
          { q: "How is FDI different from FPI (portfolio investment)?", a: "FDI involves a strategic investment with the intention of long-term business interest — typically 10% or more of equity. FPI is portfolio investment in listed securities. Foreign companies setting up subsidiaries in India are making FDI, regulated under FEMA's FDI regulations." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}



// ─── ARTICLE PAGE (individual Knowledge Hub articles) ─────────────────────────

function SEOForeignCompanyPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="India Market Entry · Ex-KPMG Advisory" setPage={setPage}
      title={<>Foreign Company Registration<br/><span style={{ fontStyle:"italic", color:T.sl }}>in India — Complete Guide</span></>}
      description="How to register a foreign company in India — entity types, FDI routes, RBI filings, and compliance timelines. Ex-KPMG CA team. 100+ foreign companies registered.">

      <SEOSection label="What It Means" title="Foreign company registration in India — what it actually involves">
        <SEOProseP>Registering a foreign company in India is not a single form — it is a multi-step process involving the Ministry of Corporate Affairs (MCA), the Reserve Bank of India (RBI), and in most cases, the GST department and income tax authorities. The process differs significantly depending on the entity type you choose and the FDI route applicable to your sector.</SEOProseP>
        <SEOProseP>The right structure must be decided before any filing begins. Choosing incorrectly — for example, setting up a branch office in a sector that requires a subsidiary — creates expensive restructuring work later. Getting the transfer pricing model wrong at incorporation means years of audit exposure.</SEOProseP>
        <SEOProseP>India has four main options for foreign companies entering the market: a Private Limited Company (wholly owned subsidiary), a Limited Liability Partnership, a Branch Office, or a Liaison Office. Each has different tax rates, FDI conditions, revenue permissions, and compliance obligations.</SEOProseP>
      </SEOSection>

      <SEOSection label="Your Options" title="Four ways a foreign company can be registered in India">
        <div className="seo-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 8 }}>
          {[
            { type: "Private Limited Company (WOS)", tax: "25.17%", fdi: "Automatic in most sectors", revenue: "Full commercial", best: "Most foreign companies — full operations, fundraising, hiring" },
            { type: "Limited Liability Partnership", tax: "30%", fdi: "Government approval required", revenue: "Full commercial", best: "Professional services firms, JVs with Indian partners" },
            { type: "Branch Office", tax: "40%", fdi: "RBI approval required", revenue: "Limited — only parent's activities", best: "Exporting goods/services, research only" },
            { type: "Liaison Office", tax: "Nil", fdi: "RBI approval required", revenue: "None — no commercial activity", best: "Market research, promoting parent company only" },
          ].map(e => (
            <div key={e.type} style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 12, padding: "20px 18px" }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ch, marginBottom: 10 }}>{e.type}</div>
              {[["Tax rate", e.tax], ["FDI route", e.fdi], ["Revenue", e.revenue]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: T.mid, marginBottom: 5, gap: 8 }}>
                  <span style={{ color: T.lt }}>{k}</span><span style={{ fontWeight: 500, color: T.ch, textAlign: "right" }}>{v}</span>
                </div>
              ))}
              <div style={{ fontSize: 11.5, color: T.s, fontWeight: 600, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.bdr}` }}>Best for: {e.best}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: T.lt, marginTop: 8 }}>* Most foreign companies choose a Private Limited Company (WOS). Branch and Liaison offices are rarely the right choice without a specific reason.</p>
      </SEOSection>

      <SEOSection label="The Process" title="Step-by-step: how foreign company registration works in India">
        <SEOSteps steps={[
          { title: "Structure decision & FDI analysis", time: "Day 1", desc: "We assess your business model, sector, and India objectives to recommend the right entity type and FDI route. This includes DTAA analysis, PE risk assessment, and an initial transfer pricing framework. This step is free as part of the initial consultation." },
          { title: "Digital Signature Certificates (DSC)", time: "Days 2–3", desc: "All proposed directors require DSCs. For foreign nationals, this requires passport copy, address proof, and notarisation. We handle the filing." },
          { title: "Director Identification Number (DIN)", time: "Days 3–5", desc: "Each director requires a DIN from MCA. For foreign directors, we file Form DIR-3 with apostilled documents." },
          { title: "Name reservation via RUN", time: "Days 4–6", desc: "Company name is reserved through MCA's RUN (Reserve Unique Name) system. We check trademark conflicts and regulatory restrictions before submission." },
          { title: "SPICe+ filing with MCA", time: "Days 6–14", desc: "The main incorporation form — includes MOA, AOA, registered office, PAN, TAN, and GSTIN application. Certificate of Incorporation typically issues within 7–12 working days of document submission." },
          { title: "RBI FCGPR filing", time: "Within 30 days of share allotment", desc: "Foreign Currency Gross Provisional Return — mandatory for all foreign investment under FEMA. We file via the RBI's FIRMS portal." },
          { title: "Bank account & post-setup", time: "Weeks 3–5", desc: "Current account with an Indian bank, GST registration, TDS registration, payroll setup, and a compliance calendar handed over ready to use." },
        ]}/>
      </SEOSection>

      <SEOSection label="Real Client Example" title="How it works in practice">
        <SEOClientStory flag="🇺🇸" region="USA · SaaS Company · Series B"
          headline="Cloud analytics platform registered in India in 19 days"
          challenge="The company needed an India entity before their first engineering hire arrived in Bangalore. Time pressure was significant — payroll had to be live within the month."
          outcome="Private limited company incorporated, FCGPR filing completed, transfer pricing policy documented, first payroll run — all within 30 days of engagement."
          proof="TP documentation completed in week 2, before a single hire was made. No audit exposure from day one."/>
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What foreign companies get wrong">
        <SEOMistakes items={[
          { title: "Choosing the wrong entity type", desc: "Many foreign companies default to a branch office because it sounds simpler. In practice, a branch pays 40% tax, has restricted revenue activities, and requires RBI approval. A Private Limited Company is almost always better." },
          { title: "Not setting up transfer pricing before the first intercompany transaction", desc: "Transfer pricing documentation is legally required from the first payment between the India entity and its foreign parent. Companies that get this wrong at incorporation face back-audits and penalties up to 2× the underpaid tax." },
          { title: "Missing the FCGPR 30-day filing window", desc: "FEMA requires the FCGPR to be filed within 30 days of share allotment. Missing this deadline requires a compounding application — a formal RBI regularisation process that takes months and attracts penalties." },
          { title: "Registering in a sector with FDI restrictions without checking", desc: "Some sectors require Government approval route FDI. Registering under the automatic route in a restricted sector voids the investment and requires a costly restructuring." },
        ]}/>
      </SEOSection>

      <SEOSection label="Cost & Timeline" title="What does foreign company registration in India cost?">
        <div style={{ background: T.stone, borderRadius: 14, padding: "28px 30px", border: `1px solid ${T.bdr}`, marginBottom: 16 }}>
          {[
            { item: "Government filing fees (MCA + RBI)", range: "₹5,000 – ₹15,000", note: "Depends on authorised share capital" },
            { item: "Professional fees — incorporation", range: "₹50,000 – ₹1,50,000", note: "Varies by complexity, foreign director requirements" },
            { item: "FCGPR + FEMA filing", range: "₹25,000 – ₹50,000", note: "Included in our engagement" },
            { item: "Transfer pricing policy", range: "₹40,000 – ₹80,000", note: "Strongly recommended at incorporation" },
            { item: "Typical total (standard case)", range: "₹1.5 – 3 lakhs", note: "All-in, including TP documentation" },
          ].map(r => (
            <div key={r.item} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "12px 0", borderBottom: `1px solid ${T.bdr}`, alignItems: "start" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ch }}>{r.item}</div>
                <div style={{ fontSize: 12, color: T.lt, marginTop: 2 }}>{r.note}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.f, whiteSpace: "nowrap" }}>{r.range}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: T.lt }}>Timeline: 19–30 working days for a standard case. Sectors requiring Government approval take 6–12 weeks longer.</p>
      </SEOSection>

      <SEOSection label="FAQ" title="Frequently asked questions">
        <SEOFAQs items={[
          { q: "Can a foreign company own 100% of an Indian company?", a: "Yes — in most sectors, 100% FDI is permitted under the Automatic Route. This means no prior Government approval is needed. Restricted sectors (defence, insurance, media) have lower caps. We check FDI eligibility as the first step of every engagement." },
          { q: "Does the company need an Indian director?", a: "Yes. At least one director of the Indian company must be a resident of India (present in India for at least 182 days in the previous calendar year). This can be a nominee director — we can help arrange one if needed." },
          { q: "What is the minimum paid-up capital required?", a: "There is no minimum paid-up capital requirement for a Private Limited Company in India. In practice, most foreign companies subscribe between ₹1 lakh and ₹10 lakhs to demonstrate commitment to the Indian subsidiary." },
          { q: "How long does registration take?", a: "For a straightforward Private Limited Company with Indian directors and no restricted sector issues, incorporation typically takes 14–21 working days from document submission. The Certificate of Incorporation from MCA issues in 7–12 working days once the SPICe+ is filed." },
          { q: "What documents does the foreign parent company need to provide?", a: "Certificate of Incorporation of the parent, Memorandum & Articles of Association, Board Resolution authorising India incorporation, KYC documents (passport, address proof) for all proposed directors, and apostilled copies where required by MCA." },
          { q: "Do we need a physical office in India?", a: "Yes — a registered office address in India is mandatory for incorporation. This can be a virtual/registered address initially. Many clients start with a virtual office and upgrade to physical space once the team grows." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}

// ─── SEO PAGE 2: SUBSIDIARY COMPANY IN INDIA ─────────────────────────────────

function SEOGCCSetupPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="GCC & Captive Centres · India Advisory" setPage={setPage}
      title={<>GCC Setup in India —<br/><span style={{ fontStyle:"italic", color:T.sl }}>End-to-End Advisory</span></>}
      description="Setting up a Global Capability Centre in India requires more than incorporation. Entity structure, cost-plus pricing, ESOP design, payroll, and ongoing compliance — all from one firm.">

      <SEOSection label="What Is a GCC" title="Global Capability Centres in India — what's involved">
        <SEOProseP>A Global Capability Centre (GCC) — also called a captive centre or shared services centre — is an India entity wholly owned by a foreign company that provides services back to the parent. Unlike a branch or liaison office, a GCC is a full private limited company with its own employees, payroll, compliance calendar, and intercompany service agreement with the foreign parent.</SEOProseP>
        <SEOProseP>India hosts over 1,700 GCCs employing more than 1.7 million professionals. The most common functions: software engineering, data analytics, finance & accounting shared services, and legal/compliance operations. The average GCC takes 6–8 weeks to become fully operational from first engagement.</SEOProseP>
        <SEOProseP>The commercial model is typically cost-plus: the India GCC invoices the foreign parent for all its costs plus a mark-up (typically 8–15%). This mark-up is the taxable profit in India. Getting the cost-plus model and transfer pricing documentation right at setup is critical — it determines your India tax liability for the life of the entity.</SEOProseP>
      </SEOSection>

      <SEOSection label="What We Handle" title="Full GCC setup — what's included">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }} className="seo-2col">
          {[
            { icon:"🏢", title:"Entity incorporation", desc:"Private Limited Company — SPICe+ filing, MOA/AOA, registered office, PAN, TAN, GSTIN. Typically 14–21 days." },
            { icon:"💰", title:"Cost-plus pricing model", desc:"Intercompany service agreement, cost allocation methodology, benchmarked mark-up, and annual TP documentation." },
            { icon:"👥", title:"HR & payroll setup", desc:"Payroll structure, PF, ESI, professional tax, TDS on salary — compliant from hire #1." },
            { icon:"📋", title:"ESOP structuring", desc:"Employee stock option plan design, FEMA compliance for foreign parent ESOPs, tax optimisation for employees." },
            { icon:"🔄", title:"Ongoing compliance retainer", desc:"Monthly GST, TDS, payroll processing. Annual audit, ITR, Form 3CEB, FLA Return. Fixed fee." },
            { icon:"📊", title:"Transfer pricing documentation", desc:"Annual TP study, benchmarking analysis, Form 3CEB certification. Defensible against scrutiny." },
          ].map(s => (
            <div key={s.title} style={{ background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:12, padding:"20px 18px", display:"flex", gap:14 }}>
              <span style={{ fontSize:24, flexShrink:0 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:T.ch, marginBottom:6 }}>{s.title}</div>
                <p style={{ fontSize:13, color:T.mid, lineHeight:1.7, fontWeight:300 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="The Process" title="GCC setup timeline — week by week">
        <SEOSteps steps={[
          { title:"Structure & pricing design", time:"Week 1", desc:"Entity type, FDI route, cost-plus mark-up methodology, DTAA analysis. Intercompany service agreement drafted. This is the most important step — getting the commercial model right before incorporation." },
          { title:"Incorporation", time:"Weeks 1–3", desc:"SPICe+ filing, Certificate of Incorporation, PAN, TAN, GSTIN. Registered office established. Bank account initiation." },
          { title:"FEMA & RBI filing", time:"Week 4", desc:"FC-GPR filed within 30 days of share allotment. Share valuation certificate from CA. Equity allotment to foreign parent confirmed." },
          { title:"HR & payroll infrastructure", time:"Weeks 3–5", desc:"PF registration, ESI (if applicable), professional tax, TDS on salary. Payroll software setup. Offer letter templates aligned with India employment law." },
          { title:"ESOP plan (if applicable)", time:"Weeks 4–6", desc:"Board resolution, ESOP trust deed (for trust structure) or direct grant, FEMA compliance for foreign parent options. Employee communication plan." },
          { title:"Operational handover", time:"Week 6+", desc:"Full compliance calendar, monthly reporting pack template, vendor onboarding, accounting software. Retainer goes live." },
        ]}/>
      </SEOSection>

      <SEOSection label="Real Client Example" title="GCC setup in practice">
        <SEOClientStory flag="🇸🇬" region="Singapore · APAC SaaS · Series C"
          headline="APAC SaaS company scaled to a 40-person GCC in 8 weeks"
          challenge="Company needed to move from 0 to 40 engineers in Pune. Entity, payroll, ESOP trust, cost-plus pricing, and compliance all required simultaneously — with a hard deadline driven by an upcoming fundraising round."
          outcome="Entity incorporated in 19 days. Payroll running by week 6. ESOP trust structure in place. Cost-plus model benchmarked and documented. Compliance retainer active from month 2."
          proof="40-person team fully compliant from hire #1. ESOP plan approved. Zero payroll or FEMA gaps on first audit."/>
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What GCC setups get wrong">
        <SEOMistakes items={[
          { title:"Cost-plus mark-up set without benchmarking", desc:"Setting a 10% mark-up without a formal benchmarking study exposes the GCC to transfer pricing adjustment. The mark-up must be comparable to what unrelated parties earn for equivalent services. TNMM benchmarking using CMIE Prowess data is required annually." },
          { title:"ESOP documentation gaps", desc:"Foreign parent ESOPs for Indian employees require FEMA compliance at every stage — grant, vesting, exercise, and remittance. Missing FEMA filings at exercise create compounding liability that can be costly to regularise." },
          { title:"No intercompany service agreement at inception", desc:"The service agreement between the GCC and the foreign parent must be in place before the first invoice is raised. Backdated agreements are a red flag in TP audits. We draft and execute the agreement as part of incorporation." },
          { title:"Under-capitalisation at setup", desc:"GCCs frequently start with minimal share capital and fund operations through interest-free loans or cost-sharing arrangements. These have specific FEMA and TP implications. Capital structure should be planned before incorporation." },
        ]}/>
      </SEOSection>

      <SEOSection label="FAQ" title="GCC setup questions">
        <SEOFAQs items={[
          { q:"What is the typical cost-plus mark-up for a GCC in India?", a:"For technology and analytics GCCs, the arm's length mark-up (operating profit / total costs) typically ranges from 8–15% based on benchmarking studies using CMIE Prowess or TP Catalyst databases. The appropriate mark-up depends on the functions performed, assets used, and risks borne by the India entity." },
          { q:"Can a GCC have employees on the payroll of the India entity and also receive secondees from the foreign parent?", a:"Yes. Many GCCs have a mix of direct India hires and secondees from the foreign parent. Secondees have different tax and FEMA treatment — their costs must be handled separately in the intercompany service agreement and TP documentation." },
          { q:"Does a GCC need to be incorporated as a separate entity or can it operate as a branch?", a:"For commercial GCCs providing services to the foreign parent, a Private Limited Company is strongly preferred. A branch pays 40% tax (vs 25.17% for a company), has restricted activities, and requires RBI approval. The added compliance burden of a branch is rarely justified." },
          { q:"What is the FLA Return and does a GCC need to file it?", a:"Yes. The Annual Return on Foreign Liabilities and Assets (FLA) must be filed with the RBI by 15 July each year by every Indian company with FDI. A GCC that has received share capital from its foreign parent must file the FLA. Non-filing attracts compounding charges." },
          { q:"Can a GCC invoice its foreign parent in USD or must it invoice in INR?", a:"A GCC providing services to its foreign parent can invoice in USD or another foreign currency. The foreign exchange received must be converted to INR within the timelines prescribed by FEMA and reported through the authorised dealer bank. GST applies at 0% (export of services) on GCC invoices to the foreign parent." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}

// ─── INDIA MARKET ENTRY ADVISORY PAGE ────────────────────────────────────────

function SEOMarketEntryPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="India Market Entry · Strategic Advisory" setPage={setPage}
      title={<>India Market Entry<br/><span style={{ fontStyle:"italic", color:T.sl }}>Advisory Services</span></>}
      description="India market entry is a strategic decision before it is a compliance exercise. We help global companies design the right structure, choose the right route, and avoid the mistakes that create years of audit exposure.">

      <SEOSection label="What Is India Market Entry Advisory" title="More than incorporation — a strategic starting point">
        <SEOProseP>India market entry advisory covers everything that happens before the first document is filed. The entity type, FDI route, transfer pricing model, DTAA structure, and intercompany framework must be decided in the right sequence — because getting any one of them wrong creates restructuring work that typically costs 3–5× more than getting it right at inception.</SEOProseP>
        <SEOProseP>Most CA firms start with incorporation. We start with strategy. A 45-minute conversation about your business model, sector, headcount plans, and intercompany flows determines whether you need a WOS, a branch, a GCC, or a combination. The incorporation follows once the structure is clear.</SEOProseP>
        <SEOProseP>Our advisory work is led by ex-KPMG International Tax professionals — the same people who advise large multinationals on India entry. The difference is that we work with mid-market companies at fees that match mid-market reality.</SEOProseP>
      </SEOSection>

      <SEOSection label="What We Advise On" title="The full scope of India market entry advisory">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:8 }} className="seo-2col">
          {[
            { icon:"🏛️", title:"Entity structure selection", desc:"WOS, Branch, Liaison, LLP, JV — the right choice depends on your sector, FDI route, tax objective, and long-term India plans. We model all options before recommending one." },
            { icon:"🛣️", title:"FDI route & FEMA compliance", desc:"Automatic vs Government Route, sector eligibility, investment caps, FEMA filing obligations. Getting the route wrong invalidates the entire investment." },
            { icon:"⚖️", title:"DTAA planning & treaty benefits", desc:"Which DTAA applies, what rates apply to your specific payment flows, how to structure intercompany transactions to legitimately minimise WHT." },
            { icon:"📊", title:"Transfer pricing framework", desc:"Designing the intercompany pricing model before the first transaction — management fees, royalties, cost allocations. This is the highest-value intervention in the entire entry process." },
            { icon:"🔒", title:"PE risk assessment", desc:"Permanent Establishment risk analysis — what activities in India create a tax liability for the foreign parent. Particularly critical for companies with Indian sales staff, advisory relationships, or contract-signing authority in India." },
            { icon:"📋", title:"Compliance architecture", desc:"What filings are required, at what frequencies, by which deadlines. Building the compliance calendar before the entity is operational so nothing is missed from month one." },
          ].map(s => (
            <div key={s.title} style={{ background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:12, padding:"20px 18px", display:"flex", gap:14 }}>
              <span style={{ fontSize:24, flexShrink:0 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:T.ch, marginBottom:6 }}>{s.title}</div>
                <p style={{ fontSize:13, color:T.mid, lineHeight:1.7, fontWeight:300 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="Who This Is For" title="The companies we work with">
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {[
            { audience:"Foreign companies entering India for the first time", desc:"You've decided to enter India. You need to know which entity to form, which FDI route applies to you, and what your transfer pricing obligations will be. We give you this picture in the first consultation — before any money is committed." },
            { audience:"Companies already in India with compliance gaps", desc:"Your India entity is operational but the structure was set up without proper advice. Transfer pricing is undocumented, FEMA filings are missed, or the entity type is wrong. We assess, fix, and maintain." },
            { audience:"PE-risk situations", desc:"Your sales or advisory team is operating in India without a formal entity. You have staff making decisions, signing contracts, or managing relationships in India. PE risk is building. We assess the exposure and design a structure that manages it." },
            { audience:"GCC / captive centre buildout", desc:"You're setting up a 10–500 person India team to provide services to your global operations. The pricing model, entity structure, ESOP design, and compliance framework all need to be right from the start." },
          ].map((item, i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:24, padding:"20px 0", borderTop: i===0 ? `1px solid ${T.bdr}` : "none", borderBottom:`1px solid ${T.bdr}` }} className="seo-2col">
              <div style={{ fontSize:14.5, fontWeight:600, color:T.ch, lineHeight:1.4 }}>{item.audience}</div>
              <p style={{ fontSize:13.5, color:T.mid, lineHeight:1.75, fontWeight:300 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="Our Approach" title="How we work — structure before filing">
        <SEOSteps steps={[
          { title:"Free 30-minute strategy call", time:"Day 1", desc:"We ask about your business model, sector, headcount plans, and intercompany flows. You receive a preliminary structure recommendation and a list of key questions to resolve before incorporation." },
          { title:"Written structure memo", time:"After the call", desc:"A short written summary of our recommendations — entity type, FDI route, DTAA considerations, transfer pricing approach, and next steps. This memo costs nothing. It's the deliverable from the free consultation." },
          { title:"Detailed advisory engagement", time:"Week 1–2", desc:"If you proceed, we produce a full India entry advisory report — entity comparison, FDI route analysis, TP methodology recommendation, DTAA analysis, compliance obligations schedule, and fee proposal for implementation." },
          { title:"Implementation", time:"Weeks 2–6", desc:"We handle incorporation, FEMA filings, transfer pricing documentation, GST registration, payroll setup, and everything required to make the entity operational." },
          { title:"Ongoing retainer", time:"Month 2+", desc:"Monthly compliance (GST, TDS, payroll), annual filings (ITR, Form 3CEB, FLA Return), and advisory support for new transactions and regulatory questions." },
        ]}/>
      </SEOSection>

      <SEOSection label="FAQ" title="India market entry questions">
        <SEOFAQs items={[
          { q:"When should I start the India market entry advisory process?", a:"Ideally 3–6 months before you plan to have your first India employee or generate your first India revenue. The structural decisions take time to document and execute correctly. Starting late forces shortcuts that create compliance exposure." },
          { q:"What does India market entry advisory cost?", a:"The initial 30-minute consultation is free. A full India entry advisory report — structure, FDI route, DTAA analysis, TP framework, compliance calendar — typically costs ₹75,000–₹1,50,000 depending on complexity. Implementation (incorporation + FEMA + TP documentation) is additional and separately quoted." },
          { q:"Can you advise on India entry if we already have an entity that was set up incorrectly?", a:"Yes — this is a significant part of our work. We assess existing structures for FDI compliance, transfer pricing gaps, FEMA violations, and entity type mismatch. Where issues are found, we design and implement a remediation plan including any necessary RBI compounding applications." },
          { q:"Do you only handle the Indian side or can you coordinate with our home country advisors?", a:"We handle the Indian side comprehensively. We regularly coordinate with US CPAs (on Form 5471 and GILTI), UK accountants (on UK TP documentation and CFC rules), and Singapore advisors (on substance requirements and DTAA claims). We provide an India advisory memo that your home country advisor can incorporate into their advice." },
          { q:"What makes your India market entry advisory different from a Big 4 firm?", a:"The depth of analysis is equivalent — our lead advisor spent 8 years doing exactly this work at KPMG. The difference is fees and accessibility. Big 4 India market entry engagements for mid-market companies typically cost ₹5–15 lakhs. Our equivalent engagement costs ₹1–3 lakhs. And every engagement is led by a senior CA, not staffed to a junior team." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}



// ─── PRIVATE LIMITED COMPANY REGISTRATION ─────────────────────────────────────

function SEONRIPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="NRI · India Business Setup · FEMA Advisory" setPage={setPage}
      title={<>NRI Company Registration<br/><span style={{ fontStyle:"italic", color:T.sl }}>in India — Complete Guide</span></>}
      description="NRIs can incorporate a company in India or invest in an existing one. Two routes, different compliance. FEMA Schedule 4, repatriation rules, and residency transition — explained plainly.">

      <SEOSection label="Two Types of NRI Clients" title="Which situation applies to you?">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:8 }} className="seo-2col">
          {[
            {
              icon:"✈️", type:"NRI investing from abroad",
              desc:"You live and work outside India. You want to invest in or incorporate a company in India — for a business you'll manage remotely or through a local team.",
              points:["Investment under Schedule 4 of FEMA (NRI route)", "No RBI FCGPR required — different from FDI route", "Can repatriate dividends freely after tax", "Can be director of an India company while residing abroad"],
              color: T.stone,
            },
            {
              icon:"🏡", type:"NRI returning to India",
              desc:"You are returning to India to start or run a business. Your residency status is changing — from NRI to Resident. This triggers specific FEMA obligations.",
              points:["Residency transition — NRI → Resident Indian", "Existing foreign assets must be declared under FEMA", "India income now fully taxable from year of return", "Bank accounts: NRE/FCNR → Resident accounts within required timeframe"],
              color:"#fff",
            },
          ].map(c => (
            <div key={c.type} style={{ background:c.color, border:`1px solid ${T.bdr}`, borderRadius:14, padding:"24px 22px" }}>
              <div style={{ fontSize:24, marginBottom:10 }}>{c.icon}</div>
              <div style={{ fontSize:15, fontWeight:700, color:T.ch, marginBottom:10 }}>{c.type}</div>
              <p style={{ fontSize:13, color:T.mid, lineHeight:1.7, fontWeight:300, marginBottom:14 }}>{c.desc}</p>
              {c.points.map(p => (
                <div key={p} style={{ display:"flex", gap:8, marginBottom:7 }}>
                  <span style={{ color:T.s, fontWeight:700, flexShrink:0, fontSize:12 }}>✓</span>
                  <span style={{ fontSize:12.5, color:T.mid, lineHeight:1.55 }}>{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="NRI Investment Route" title="How NRI investment in India works — Schedule 4 FEMA">
        <SEOProseP>NRI investment in Indian companies is governed by Schedule 4 of the Foreign Exchange Management (Non-Debt Instruments) Rules, 2019 — not the FDI regulations that apply to foreign companies. This is a separate and simpler route: no RBI FCGPR filing, no valuation certificate requirement, and no sectoral cap complications in most cases.</SEOProseP>
        <SEOProseP>An NRI can invest in an Indian Private Limited Company by subscribing to shares at incorporation or purchasing shares from existing shareholders. The investment must be made from an NRE (Non-Resident External) or FCNR (Foreign Currency Non-Resident) account — not from an NRO account (unless specific conditions are met).</SEOProseP>
        <SEOSteps steps={[
          { title:"Confirm NRI status and applicable route", time:"Day 1", desc:"NRI investment follows Schedule 4 FEMA. We confirm your residency status, investment amount, sector eligibility, and source of funds before any filing." },
          { title:"Company incorporation or share acquisition", time:"Days 2–14", desc:"For a new company: SPICe+ filing with NRI as shareholder. For investment in an existing company: share transfer or fresh allotment, updated share register, Form SH-4 or MGT-7 as applicable." },
          { title:"Bank account and fund remittance", time:"Days 10–20", desc:"Investment must be received from NRE/FCNR account or inward remittance. Bank account opened in company name. Share capital deposited." },
          { title:"Post-investment compliance", time:"Within 30–60 days", desc:"For certain NRI investments, intimation to authorised dealer bank is required. We handle the documentation and ensure the investment is properly recorded under the correct FEMA schedule." },
        ]}/>
      </SEOSection>

      <SEOSection label="NRI Returning to India" title="FEMA transition — what changes when you return">
        <div style={{ background:T.stone, borderRadius:14, padding:"28px 30px", border:`1px solid ${T.bdr}`, marginBottom:8 }}>
          <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:T.s, fontWeight:700, marginBottom:16 }}>Key obligations when NRI status changes to Resident</div>
          {[
            { title:"NRE and FCNR bank accounts", desc:"Must be re-designated as Resident Foreign Currency (RFC) accounts or converted to regular resident savings accounts within a reasonable period (typically within 3 months of becoming a resident)." },
            { title:"Foreign assets declaration", desc:"Existing foreign assets (bank accounts, investments, property) held as an NRI can generally be retained as a resident. However, income from those assets becomes taxable in India from the year of return." },
            { title:"Overseas investments", desc:"Investments made as an NRI in foreign stocks, mutual funds, or property can be retained. However, fresh overseas investment after becoming a resident requires RBI approval or falls under the LRS (Liberalised Remittance Scheme)." },
            { title:"Tax residency change", desc:"In the year of return, you may be 'Resident but Not Ordinarily Resident' (RNOR) — a transitional status that provides a 2-year window where foreign income may not be taxable in India. Proper tax planning before return is essential." },
          ].map((item, i) => (
            <div key={i} style={{ paddingBottom:14, marginBottom:14, borderBottom: i < 3 ? `1px solid ${T.bdr}` : "none" }}>
              <div style={{ fontSize:13.5, fontWeight:600, color:T.ch, marginBottom:5 }}>{item.title}</div>
              <p style={{ fontSize:13, color:T.mid, lineHeight:1.7, fontWeight:300 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="Real Client Example" title="NRI setup in practice">
        <SEOClientStory flag="🇺🇸" region="USA · NRI Entrepreneur · Returning to India"
          headline="US-based NRI incorporated an India company while still residing abroad"
          challenge="NRI based in the US wanted to start a technology business in India, with 60% shareholding from his US savings (NRE account) and 40% held by his India-based co-founder. Needed correct FEMA route, proper share structure, and US FBAR/PFIC implications considered."
          outcome="Private limited company incorporated with NRI holding via Schedule 4 FEMA route. Investment received from NRE account. Share structure set up to be VC-friendly. US CA coordinated for FBAR disclosure."
          proof="Company operational within 3 weeks. Zero FEMA compliance issues. First angel round closed 6 months later with no structural complications."/>
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What NRIs get wrong">
        <SEOMistakes items={[
          { title:"Investing through an NRO account instead of NRE/FCNR", desc:"NRI investment in Indian companies must typically come from an NRE (repatriable) account or via inward remittance. Using an NRO account for share subscription requires specific conditions to be met. Getting the source of funds wrong creates a FEMA violation at the point of investment." },
          { title:"Not planning residency transition before returning", desc:"NRIs who return to India without planning the transition often convert NRE accounts too early, lose RNOR tax status benefit, or fail to properly declare foreign assets. The planning should happen 3–6 months before physical return." },
          { title:"Mixing NRI investment route with FDI route documentation", desc:"NRI investment under Schedule 4 does not require RBI FCGPR filing. But many NRIs and their advisors prepare FDI documentation unnecessarily — creating confusion at future funding rounds about the nature of the investment." },
          { title:"Ignoring overseas shareholding in Indian company tax filings", desc:"Indian companies with NRI shareholders must correctly disclose NRI ownership in annual returns. Misclassification of an NRI shareholder as a resident in MCA filings creates compliance gaps." },
        ]}/>
      </SEOSection>

      <SEOSection label="FAQ" title="NRI company registration questions">
        <SEOFAQs items={[
          { q:"Can an NRI be a director of an Indian company while living abroad?", a:"Yes. There is no residency requirement for being a director — only one director needs to be an Indian resident. An NRI can be a director of an Indian company while continuing to reside abroad. They will need a DIN (Director Identification Number) from MCA and a DSC." },
          { q:"What is the difference between NRI investment and FDI in an Indian company?", a:"NRI investment in India follows Schedule 4 of FEMA (Non-Debt Instruments) Rules. It is treated differently from FDI by foreign companies — no RBI FCGPR filing is required, different repatriation rules apply, and no valuation certificate is needed for new incorporations. The distinction matters significantly at future fundraising rounds." },
          { q:"Can an NRI repatriate dividends from an Indian company?", a:"Yes. Dividends paid by an Indian company to an NRI shareholder (from NRE account investment) are freely repatriable after payment of applicable withholding tax (typically 20% under domestic law, reduced under DTAA if applicable). Dividends from NRO account investments have repatriation limits." },
          { q:"What happens to my NRE account when I return to India?", a:"When you become a Resident Indian, NRE accounts must be re-designated as RFC (Resident Foreign Currency) accounts or converted to regular resident savings accounts. The funds in the NRE account at the time of conversion can be retained freely — there is no requirement to repatriate them." },
          { q:"If I return to India, will my US/UK income be taxed in India?", a:"In the year of return and potentially the following year, you may qualify as 'Resident but Not Ordinarily Resident' (RNOR). Under RNOR status, foreign income (income from sources outside India) that is not derived from a business controlled in India is generally not taxable in India. Proper planning before return can optimise this significantly." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}

// ─── STARTUP FOREIGN INVESTMENT ────────────────────────────────────────────────

function SEOPvtLtdPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="Company Formation · India · CA-Led" setPage={setPage}
      title={<>Private Limited Company<br/><span style={{ fontStyle:"italic", color:T.sl }}>Registration in India</span></>}
      description="Register a Private Limited Company in India — SPICe+ filing, MOA/AOA, PAN, TAN, GST, and post-incorporation compliance. CA-led. FDI-ready from day one. 7–12 working days.">

      <SEOSection label="What It Is" title="Private Limited Company — India's most versatile business structure">
        <SEOProseP>A Private Limited Company is the most widely used business structure in India. Governed by the Companies Act, 2013 and regulated by the Ministry of Corporate Affairs (MCA), it provides limited liability, separate legal identity, and the ability to raise funding — making it the default choice for startups, growing businesses, and foreign-owned Indian entities alike.</SEOProseP>
        <SEOProseP>A Pvt Ltd can have 2 to 200 shareholders. At least one director must be an Indian resident. There is no minimum paid-up capital requirement. It can accept FDI under the Automatic Route in most sectors, issue ESOPs, and raise angel or VC funding. For any business that intends to grow, raise capital, or eventually receive foreign investment, a Private Limited Company is almost always the right structure.</SEOProseP>
        <SEOProseP>Our difference from low-cost incorporation platforms: we are a CA firm. We don't just file the MCA forms — we advise on the right MOA objects clause, share capital structure, director appointments, and post-incorporation compliance calendar before the Certificate of Incorporation is issued. Getting this right at inception saves months of amendment work later.</SEOProseP>
      </SEOSection>

      <SEOSection label="Key Advantages" title="Why a Private Limited Company is the right choice">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }} className="seo-2col">
          {[
            { icon:"🛡️", title:"Limited liability", desc:"Shareholders are liable only for the unpaid amount on their shares. Personal assets are protected from company debts." },
            { icon:"💰", title:"FDI and fundraising ready", desc:"Accepts foreign investment under Automatic Route in most sectors. Can issue equity to angel investors and VCs without restriction." },
            { icon:"📋", title:"ESOP capability", desc:"Can issue Employee Stock Options to build and retain a team. ESOPs require a board resolution — we set this up at incorporation if needed." },
            { icon:"🔄", title:"Perpetual succession", desc:"The company continues to exist regardless of changes in shareholders or directors. Not dependent on any individual." },
            { icon:"🏦", title:"Credibility with banks and vendors", desc:"Corporate customers, banks, and government agencies prefer dealing with a Pvt Ltd over a proprietorship or partnership." },
            { icon:"📊", title:"Tax efficiency", desc:"Corporate tax rate of 25.17% (22% base + surcharge + cess) for domestic companies. Lower than partnership tax in many cases." },
          ].map(b => (
            <div key={b.title} style={{ background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:12, padding:"18px 18px", display:"flex", gap:12 }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:T.ch, marginBottom:5 }}>{b.title}</div>
                <p style={{ fontSize:13, color:T.mid, lineHeight:1.68, fontWeight:300 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="The Process" title="How Private Limited Company registration works">
        <SEOSteps steps={[
          { title:"Name reservation via RUN", time:"Days 1–2", desc:"We check trademark conflicts, MCA name availability, and regulatory restrictions. Name reserved through MCA's RUN (Reserve Unique Name) system. We advise on the MOA objects clause — getting this right determines what your company can legally do." },
          { title:"Digital Signature Certificates (DSC)", time:"Days 2–3", desc:"All proposed directors require DSCs. For Indian nationals, this takes 1–2 working days. For foreign nationals, apostilled documents are required." },
          { title:"Director Identification Number (DIN)", time:"Days 3–4", desc:"Each director requires a DIN from MCA. For new directors with no existing DIN, we apply through SPICe+ simultaneously." },
          { title:"SPICe+ filing with MCA", time:"Days 4–12", desc:"The main incorporation form — MOA, AOA, registered office address, PAN, TAN, and GSTIN applied simultaneously. Certificate of Incorporation (CIN) issued in 7–12 working days of document submission." },
          { title:"Bank account & post-incorporation setup", time:"Days 12–20", desc:"Current account opened. Share capital deposited. GST registration completed. Auditor appointed. Compliance calendar handed over." },
        ]}/>
      </SEOSection>

      <SEOSection label="What We Handle" title="Complete incorporation — not just MCA filing">
        <div style={{ background:T.stone, borderRadius:14, padding:"28px 30px", border:`1px solid ${T.bdr}` }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }} className="seo-2col">
            {[
              ["MOA & AOA drafting", "Objects clause, shareholding structure, governance rules"],
              ["DSC for all directors", "Indian and foreign nationals — we handle apostille coordination"],
              ["SPICe+ filing", "MCA incorporation form — PAN, TAN, GSTIN in one shot"],
              ["Share capital structure", "Authorised vs paid-up, share certificate preparation"],
              ["GST registration", "Within 30 days of incorporation if applicable"],
              ["Auditor appointment", "Form ADT-1 within 30 days — statutory requirement"],
              ["Bank account setup", "Current account documentation, signatories, internet banking"],
              ["Compliance calendar", "Every filing deadline for the first 12 months, handed over at close"],
            ].map(([t, d], i) => (
              <div key={t} style={{ padding:"14px 0", borderBottom:`1px solid ${T.bdr}`, paddingRight:24 }}>
                <div style={{ fontSize:13.5, fontWeight:600, color:T.ch, marginBottom:3 }}>{t}</div>
                <div style={{ fontSize:12.5, color:T.mid }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </SEOSection>

      <SEOSection label="Cost & Timeline" title="What Private Limited Company registration costs">
        <div style={{ background:T.stone, borderRadius:14, padding:"28px 30px", border:`1px solid ${T.bdr}`, marginBottom:16 }}>
          {[
            { item:"Government fees (MCA + stamp duty)", range:"₹2,000 – ₹15,000", note:"Based on authorised share capital and state" },
            { item:"Professional fees — incorporation", range:"₹15,000 – ₹40,000", note:"Name approval, DSC, SPICe+, MOA/AOA, bank account" },
            { item:"GST registration", range:"₹3,000 – ₹6,000", note:"If applicable — included in our standard package" },
            { item:"Auditor appointment", range:"₹3,000 – ₹5,000", note:"ADT-1 filing — mandatory within 30 days" },
            { item:"Total all-in (standard case)", range:"₹25,000 – ₹60,000", note:"Domestic founders, two directors, standard sector" },
          ].map(r => (
            <div key={r.item} style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:16, padding:"12px 0", borderBottom:`1px solid ${T.bdr}`, alignItems:"start" }}>
              <div>
                <div style={{ fontSize:13.5, fontWeight:600, color:T.ch }}>{r.item}</div>
                <div style={{ fontSize:12, color:T.lt, marginTop:2 }}>{r.note}</div>
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:T.f, whiteSpace:"nowrap" }}>{r.range}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize:13, color:T.lt }}>Timeline: 7–12 working days for standard cases. Cases involving foreign shareholders or restricted sectors take longer.</p>
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What founders get wrong at incorporation">
        <SEOMistakes items={[
          { title:"Wrong objects clause in MOA", desc:"The MOA objects clause determines what your company can legally do. Founders often choose a generic clause and then find it doesn't cover their actual business activity — requiring a costly MGT-14 amendment. We advise on the objects clause before filing." },
          { title:"Under-capitalising at setup", desc:"Authorised share capital affects stamp duty — many founders minimise it to save ₹2,000 in stamp duty, then face problems when raising the first investor round because the authorised capital is too low to issue shares." },
          { title:"Not setting up the compliance calendar", desc:"Within 30 days of incorporation: auditor appointment (ADT-1), bank account opened. Within 60 days: registered office confirmation (INC-22A). Miss these and your company goes non-compliant before it has done a single transaction." },
          { title:"Ignoring FDI-readiness even for domestic companies", desc:"If there's any chance of a foreign investor or co-founder joining later, the initial structure should be FDI-ready — right sector classification, clear shareholding pattern, no issue that would create complications under FEMA at a later stage." },
        ]}/>
      </SEOSection>

      <SEOSection label="FAQ" title="Private Limited Company registration — common questions">
        <SEOFAQs items={[
          { q:"What is the minimum number of directors and shareholders required?", a:"A minimum of 2 directors and 2 shareholders are required. The same person can be both a director and a shareholder. At least one director must be a resident of India (present in India for at least 182 days in the previous calendar year)." },
          { q:"Is there a minimum paid-up capital requirement?", a:"No. A Private Limited Company can be incorporated with any amount of paid-up capital — even ₹10,000. Authorised share capital of ₹1 lakh divided into 10,000 shares of ₹10 each is the standard starting point. Paid-up capital is the amount actually invested by shareholders." },
          { q:"Can a foreign national be a director or shareholder?", a:"Yes. Foreign nationals can be directors and shareholders. At least one director must be an Indian resident. Foreign shareholders investing in the company must comply with FEMA's FDI regulations — share allotment triggers an RBI FCGPR filing requirement." },
          { q:"How long does registration take?", a:"7–12 working days from the date of document submission with MCA. Name approval takes 2–3 working days. DSC procurement for foreign nationals can add 5–7 days if apostille is required." },
          { q:"What is the difference between authorised and paid-up capital?", a:"Authorised capital is the maximum shares the company can issue, as declared in the MOA. Paid-up capital is the amount actually received from shareholders for shares already issued. You can always issue shares up to the authorised limit without amending the MOA." },
          { q:"Do I need a physical office address at the time of incorporation?", a:"Yes — a registered office address is mandatory. It can be a residential address with a No-Objection Certificate from the property owner. Many founders use a virtual office or co-working address initially and upgrade to a commercial space later." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}

// ─── NRI COMPANY REGISTRATION ─────────────────────────────────────────────────

function SEOStartupFDIPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="Indian Startups · Foreign Funding · FEMA Advisory" setPage={setPage}
      title={<>Indian Startup Receiving<br/><span style={{ fontStyle:"italic", color:T.sl }}>Foreign Investment</span></>}
      description="FEMA compliance, angel tax, valuation, convertible instruments — everything an Indian startup needs to handle when receiving its first foreign investment. CA advisory from term sheet to allotment.">

      <SEOSection label="What This Covers" title="Foreign investment in Indian startups — the full picture">
        <SEOProseP>When an Indian startup receives investment from a foreign investor — angel, VC, strategic — it triggers FEMA compliance obligations that most founders are unprepared for. The investment is foreign direct investment (FDI) regardless of the amount, and must be structured, valued, and reported correctly.</SEOProseP>
        <SEOProseP>The instruments used in startup funding have added complexity. SAFEs (Simple Agreements for Future Equity), Compulsorily Convertible Debentures (CCDs), Compulsorily Convertible Preference Shares (CCPS), and Optionally Convertible instruments each have different FEMA treatments, different RBI reporting requirements, and different implications for angel tax and future fundraising.</SEOProseP>
        <SEOProseP>Getting the first foreign round right matters disproportionately — because downstream rounds build on the structure established at the first. Mistakes at the seed or pre-Series A stage create expensive cleanup work at Series A or beyond, often discovered during investor due diligence at the worst possible time.</SEOProseP>
      </SEOSection>

      <SEOSection label="Instruments Explained" title="Which instrument should your startup use?">
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            {
              name:"CCPS (Compulsorily Convertible Preference Shares)", badge:"Most Common for Foreign Investors", color:T.f,
              desc:"The standard instrument for foreign VC investment in Indian startups. Preference shares that mandatorily convert to equity at a future date. FEMA compliant — treated as FDI from day one. Allows for liquidation preference, anti-dilution, and investor rights. Must be valued by a CA using DCF or NAV methodology before allotment.",
              fema:"FCGPR required within 30 days of allotment", tax:"Angel tax applicable if price exceeds fair market value"
            },
            {
              name:"CCD (Compulsorily Convertible Debentures)", badge:"Common for Bridge Rounds", color:"#4A6FA5",
              desc:"Debt instrument that mandatorily converts to equity. Treated as FDI under FEMA. Interest payment to foreign holder requires RBI approval or falls under permitted rates. Useful for bridge financing where immediate equity dilution is to be avoided.",
              fema:"FCGPR on conversion. ECB compliance during debenture period", tax:"Interest income taxable; WHT applicable on interest paid abroad"
            },
            {
              name:"SAFE (Simple Agreement for Future Equity)", badge:"Complex FEMA Treatment", color:"#C17D2A",
              desc:"Popular in US startup ecosystem but has uncertain FEMA status in India. A SAFE is not equity and not debt — RBI has not issued clear guidance. Most advisors recommend converting SAFEs to CCPS before any FEMA reporting obligation arises. We advise on the correct treatment for your specific situation.",
              fema:"Uncertain — typically treat as debt (ECB) until conversion", tax:"Angel tax risk on conversion — valuation must be documented"
            },
            {
              name:"Equity Shares (Straight)", badge:"Simplest Structure", color:"#5C7A4A",
              desc:"Direct issue of equity shares to foreign investor. Simplest FEMA treatment. FCGPR required within 30 days. Valuation by CA required. No future conversion complexity. Preferred by angels investing small amounts without complex term sheets.",
              fema:"FCGPR within 30 days of allotment. Valuation certificate required", tax:"Angel tax applicable on issue above fair market value"
            },
          ].map(inst => (
            <div key={inst.name} style={{ background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:14, padding:"22px 22px", overflow:"hidden", position:"relative" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8, marginBottom:12 }}>
                <div style={{ fontSize:14.5, fontWeight:700, color:T.ch }}>{inst.name}</div>
                <div style={{ background:inst.color, color:"#fff", padding:"3px 12px", borderRadius:50, fontSize:10.5, fontWeight:700, whiteSpace:"nowrap" }}>{inst.badge}</div>
              </div>
              <p style={{ fontSize:13.5, color:T.mid, lineHeight:1.75, fontWeight:300, marginBottom:14 }}>{inst.desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }} className="seo-2col">
                <div style={{ background:T.stone, borderRadius:8, padding:"10px 14px" }}>
                  <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase", color:T.s, fontWeight:700, marginBottom:4 }}>FEMA</div>
                  <div style={{ fontSize:12.5, color:T.mid }}>{inst.fema}</div>
                </div>
                <div style={{ background:T.stone, borderRadius:8, padding:"10px 14px" }}>
                  <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase", color:T.s, fontWeight:700, marginBottom:4 }}>Tax</div>
                  <div style={{ fontSize:12.5, color:T.mid }}>{inst.tax}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="Angel Tax" title="Angel tax — what startups must know in 2025–26">
        <SEOProseP>Angel tax (Section 56(2)(viib) of the Income Tax Act) applies when a private company issues shares to a resident investor at a price exceeding the fair market value (FMV) of those shares. The excess is treated as income of the company and taxed at 30%+. A 2023 amendment extended angel tax to foreign investors — creating compliance obligations for Indian startups raising from foreign angels.</SEOProseP>
        <SEOProseP>The Finance Act 2024 has provided significant relief — angel tax does not apply to investments from DPIIT-recognised startups, and certain foreign investor categories (SEBI-registered VCs, Category I/II AIFs, and certain specified entities) are exempt. For founders not covered by an exemption, valuation documentation is critical.</SEOProseP>
        <div style={{ background:"#FFF8F0", border:"1px solid #FFE0B2", borderRadius:12, padding:"20px 22px", marginTop:16 }}>
          <div style={{ fontSize:13.5, fontWeight:600, color:"#B45309", marginBottom:10 }}>How to manage angel tax risk</div>
          {[
            "Get DPIIT startup recognition — this is the most complete exemption",
            "Obtain a Rule 11UA valuation (DCF method) before share allotment — if shares are issued at or below FMV, no angel tax",
            "Foreign investors who are VCs, AIFs, or from CBDT-notified countries are exempt",
            "Issue CCPS rather than equity where possible — preference shares have different FMV calculation methods",
            "Document the valuation methodology contemporaneously — don't reconstruct it later",
          ].map((p, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:8 }}>
              <span style={{ color:"#B45309", fontWeight:700, flexShrink:0 }}>✓</span>
              <span style={{ fontSize:13, color:"#78350F", lineHeight:1.65 }}>{p}</span>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="The Process" title="From term sheet to share allotment — step by step">
        <SEOSteps steps={[
          { title:"Term sheet review and structure advice", time:"Before signing", desc:"We review the term sheet for FEMA compliance, instrument selection, valuation methodology, and angel tax exposure. The term sheet stage is when structural changes are easiest — before legal documentation is drafted." },
          { title:"DPIIT recognition (if not already obtained)", time:"2–4 weeks", desc:"DPIIT startup recognition provides complete angel tax exemption and simplifies future regulatory filings. We advise on eligibility and help with the application." },
          { title:"Valuation certificate (Rule 11UA)", time:"Before allotment", desc:"A registered CA must certify the FMV of shares using DCF methodology before shares are allotted to foreign investors. This valuation must be contemporaneous — cannot be backdated." },
          { title:"Board and shareholder resolutions", time:"Before allotment", desc:"Board resolution approving allotment, passing of shareholder resolution if required by Articles, updated register of members. We draft all corporate governance documents." },
          { title:"Share allotment and share certificates", time:"Day of close", desc:"Shares allotted, share certificates issued. The clock starts for FCGPR filing — 30 days from allotment date." },
          { title:"RBI FCGPR filing", time:"Within 30 days", desc:"Form FC-GPR filed through the RBI FIRMS portal. Includes valuation certificate, board resolution, and investment details. Missing this deadline requires compounding. We file on your behalf." },
          { title:"Form FC-GPR acknowledgement + return filing", time:"Annually", desc:"Annual FLA Return filed with RBI by 15 July. ITR filed with correct disclosure of foreign shareholding. Form 3CEB if intercompany transactions exist." },
        ]}/>
      </SEOSection>

      <SEOSection label="Real Client Example" title="Startup foreign funding in practice">
        <SEOClientStory flag="🇮🇳" region="India · B2B SaaS Startup · Seed Round"
          headline="Indian SaaS startup structured a $500K seed round from US angels — FEMA compliant, angel tax nil"
          challenge="Two US-based angels wanted to invest $500K combined via SAFEs (standard YC structure). The founders were unaware that SAFEs have uncertain FEMA treatment in India and could not be reported as FDI. Angel tax was also a concern since the startup was not DPIIT-registered."
          outcome="SAFEs restructured to CCPS with equivalent economic terms. DPIIT startup recognition obtained in 3 weeks. Rule 11UA valuation completed. FCGPR filed within 30 days of allotment. All documentation in order for Series A due diligence."
          proof="Series A investor due diligence found zero FEMA or angel tax issues. Clean cap table from day one of foreign investment."/>
      </SEOSection>

      <SEOSection label="FAQ" title="Foreign investment in startups — questions">
        <SEOFAQs items={[
          { q:"Does my startup need to be DPIIT registered to receive foreign investment?", a:"No — DPIIT registration is not required to receive foreign investment. However, DPIIT recognition provides complete exemption from angel tax under Section 56(2)(viib), which is a significant benefit. For startups raising from foreign angels or investors not covered by the angel tax exemption, DPIIT recognition is strongly recommended." },
          { q:"Can Indian startups use the US-standard SAFE agreement for foreign investment?", a:"SAFEs have uncertain FEMA treatment in India. A SAFE is neither debt nor equity, and RBI's framework does not clearly accommodate it. Most India-experienced counsel recommend using CCPS (Compulsorily Convertible Preference Shares) with equivalent economic terms instead of a SAFE. We convert YC SAFEs and similar instruments to CCPS-equivalent structures regularly." },
          { q:"What is the FC-GPR and when must it be filed?", a:"Form Foreign Currency — Gross Provisional Return (FC-GPR) is the mandatory RBI filing for foreign investment in Indian companies. It must be filed through the RBI FIRMS portal within 30 days of share allotment. Missing this deadline requires a compounding application with the RBI. We file FC-GPR as part of every foreign investment transaction." },
          { q:"How is the valuation determined for angel tax purposes?", a:"For angel tax under Section 56(2)(viib), shares must be issued at or below fair market value as determined under Rule 11UA of the Income Tax Rules. For unlisted companies, FMV is typically calculated using the Discounted Cash Flow (DCF) method or Net Asset Value method. A Chartered Accountant must certify this valuation contemporaneously — before share allotment." },
          { q:"Can a foreign investor hold preference shares in an Indian startup?", a:"Yes. CCPS (Compulsorily Convertible Preference Shares) is the most common instrument for foreign VC investment in Indian startups. They are treated as FDI from the date of allotment. FCGPR must be filed within 30 days. On conversion to equity (at a later fundraising round or IPO), no separate FCGPR is required but the conversion must be recorded in the annual FLA Return." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}



// ─── APP SHELL ────────────────────────────────────────────────────────────────

function SEOSubsidiaryPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="Entity Structure · India Entry" setPage={setPage}
      title={<>Setting Up a Subsidiary<br/><span style={{ fontStyle:"italic", color:T.sl }}>Company in India</span></>}
      description="A wholly owned subsidiary (WOS) is the most common structure for foreign companies entering India. Here is exactly how to set one up correctly — legal structure, FDI route, RBI compliance, and transfer pricing.">

      <SEOSection label="What Is a Subsidiary" title="Subsidiary vs. branch office vs. liaison office — what's the difference?">
        <SEOProseP>A subsidiary company in India is a separate Indian legal entity — typically a Private Limited Company — where the foreign parent holds 100% (or majority) of the shares. It is the most common structure for foreign companies entering India for full commercial operations.</SEOProseP>
        <SEOProseP>Unlike a branch office, a subsidiary is a distinct legal person. It can enter contracts, hire employees, open bank accounts, raise funding, and hold assets in its own name. The parent's liability is limited to its investment in the subsidiary.</SEOProseP>
        <SEOProseP>A wholly owned subsidiary (WOS) is a subsidiary where the foreign parent holds 100% of shares — the standard for most foreign companies entering India.</SEOProseP>
      </SEOSection>

      <SEOSection label="Why a Subsidiary" title="Why most foreign companies choose a subsidiary over other structures">
        <div className="seo-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { icon:"✅", title:"Full commercial operations", desc:"Can earn revenue, sign contracts, hire employees across all functions." },
            { icon:"✅", title:"Lower tax rate", desc:"25.17% corporate tax vs 40% for a branch office. Significant savings at scale." },
            { icon:"✅", title:"Automatic FDI route", desc:"In most sectors — no prior Government approval needed to incorporate." },
            { icon:"✅", title:"Limited liability", desc:"Parent is not liable for the subsidiary's debts beyond its share subscription." },
            { icon:"✅", title:"Fundraising capability", desc:"Can issue equity to investors, employees (ESOPs), and strategic partners." },
            { icon:"✅", title:"Repatriation of profits", desc:"Dividends can be repatriated to the parent subject to withholding tax and DTAA." },
          ].map(b => (
            <div key={b.title} style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 10, padding: "16px 18px", display: "flex", gap: 12 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ch, marginBottom: 4 }}>{b.title}</div>
                <p style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.6, fontWeight: 300 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="The Process" title="How to set up a wholly owned subsidiary in India">
        <SEOSteps steps={[
          { title: "FDI eligibility & sector check", time: "Day 1", desc: "Confirm your sector permits 100% FDI under the Automatic Route. Restricted sectors (insurance, telecom, media, defence) require Government approval and have investment caps." },
          { title: "Decide share capital & structure", time: "Days 1–2", desc: "Determine authorised and paid-up share capital. For most subsidiaries, ₹1–10 lakh is sufficient to start. Capital structure affects stamp duty and future fundraising." },
          { title: "Appoint Indian resident director", time: "Days 1–5", desc: "At least one director must be an Indian resident. This can be a nominee director if your team is entirely overseas. We help arrange nominees where needed." },
          { title: "Document preparation & DSC", time: "Days 3–7", desc: "Draft MOA and AOA, obtain Digital Signature Certificates for all directors, prepare apostilled parent company documents." },
          { title: "SPICe+ filing & Certificate of Incorporation", time: "Days 7–19", desc: "The consolidated MCA filing — covers company name, directors, registered office, PAN, TAN, and GSTIN. Certificate of Incorporation typically issues within 7–12 working days." },
          { title: "FEMA & RBI compliance", time: "Within 30 days of share allotment", desc: "File FC-GPR (Form Foreign Currency — Gross Provisional Return) with RBI through the FIRMS portal. Mandatory for all foreign investment. Missing this 30-day window requires a penalty compounding application." },
          { title: "Post-incorporation setup", time: "Weeks 4–6", desc: "Bank account, GST registration, TDS registration, payroll setup, compliance calendar. Full operational readiness." },
        ]}/>
      </SEOSection>

      <SEOSection label="Real Client Example" title="Subsidiary setup in practice">
        <SEOClientStory flag="🇬🇧" region="UK · Fintech Company · FCA Regulated"
          headline="London fintech set up a regulated India subsidiary in 24 days"
          challenge="FCA-regulated company needed India presence with zero risk of PE exposure or RBI non-compliance flagging their UK auditors. Any misstep would trigger a reporting obligation to the FCA."
          outcome="Wholly owned subsidiary incorporated, RBI FCGPR filed within 30 days, GST registration complete, compliance calendar aligned to their UK reporting cycle."
          proof="Zero RBI or FEMA notices in 2 years of operation. Clean records for the FCA-regulated parent."/>
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What goes wrong with subsidiary setups">
        <SEOMistakes items={[
          { title: "No transfer pricing policy at incorporation", desc: "Every intercompany transaction between the subsidiary and parent — management fees, royalties, service charges — requires transfer pricing documentation under Indian law. Most companies set this up a year later, after transactions have already occurred, creating back-audit exposure." },
          { title: "Wrong FDI route for the sector", desc: "Some sectors look unrestricted but have hidden caps or approval requirements. Fintech, pharma, e-commerce, and multi-brand retail all have sector-specific conditions. We check this before any filing." },
          { title: "Missing nominee director requirement", desc: "Forgetting the Indian resident director requirement stalls incorporation. Many foreign companies discover this late and have to find a nominee urgently, delaying the entire process." },
          { title: "Treating subsidiary and parent as the same entity", desc: "A subsidiary is a separate Indian company. It needs its own bank account, its own contracts, its own compliance filings. Sharing infrastructure with the parent without proper intercompany agreements creates PE risk." },
        ]}/>
      </SEOSection>

      <SEOSection label="Cost & Timeline" title="Cost of setting up a subsidiary in India">
        <div style={{ background: T.stone, borderRadius: 14, padding: "28px 30px", border: `1px solid ${T.bdr}`, marginBottom: 16 }}>
          {[
            { item: "MCA incorporation fees", range: "₹2,000 – ₹10,000", note: "Based on authorised capital" },
            { item: "Professional fees — incorporation", range: "₹50,000 – ₹1,20,000", note: "Including MOA/AOA drafting, DSC, DIN, SPICe+" },
            { item: "FEMA/FCGPR filing", range: "₹25,000 – ₹40,000", note: "Included in our standard engagement" },
            { item: "Transfer pricing policy", range: "₹40,000 – ₹75,000", note: "Highly recommended at incorporation stage" },
            { item: "Nominee director (first year)", range: "₹20,000 – ₹40,000", note: "If required" },
            { item: "Total all-in (standard case)", range: "₹1.5 – 2.5 lakhs", note: "Typical end-to-end including TP" },
          ].map(r => (
            <div key={r.item} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "12px 0", borderBottom: `1px solid ${T.bdr}`, alignItems: "start" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ch }}>{r.item}</div>
                <div style={{ fontSize: 12, color: T.lt, marginTop: 2 }}>{r.note}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.f, whiteSpace: "nowrap" }}>{r.range}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: T.lt }}>Timeline: 19–25 working days for a standard case. Sectors needing Government approval take 8–12 weeks longer.</p>
      </SEOSection>

      <SEOSection label="FAQ" title="Frequently asked questions about subsidiary setup">
        <SEOFAQs items={[
          { q: "What is the difference between a subsidiary and a wholly owned subsidiary?", a: "A subsidiary is any company where the foreign parent holds more than 50% of shares. A wholly owned subsidiary (WOS) is where the foreign parent holds 100%. In India, most foreign companies set up a WOS to retain full control and simplify governance." },
          { q: "Can the subsidiary hire employees immediately after incorporation?", a: "Yes — once incorporation is complete and a bank account is opened, the subsidiary can hire employees and run payroll. GST registration and TDS registration should be in place before the first payment cycle." },
          { q: "What is an FCGPR and when does it need to be filed?", a: "FC-GPR (Foreign Currency Gross Provisional Return) is the mandatory RBI filing for foreign investment. It must be filed within 30 days of share allotment. Missing this deadline requires a compounding application with the RBI — a formal regularisation process with penalties." },
          { q: "Can the subsidiary pay dividends to the foreign parent?", a: "Yes. After paying corporate tax and complying with Companies Act distribution requirements, a subsidiary can declare dividends to the foreign parent. Dividends are subject to withholding tax — typically 20% under Indian domestic law, reduced under applicable DTAA." },
          { q: "Does the subsidiary need to file transfer pricing documentation?", a: "Yes, if there are any international transactions with the foreign parent or other related parties. Transfer pricing documentation (Form 3CEB and TP study) is required for every financial year in which such transactions occur. We recommend setting this up at incorporation." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}

// ─── SEO PAGE 3: TRANSFER PRICING INDIA ──────────────────────────────────────

function SEOTransferPricingPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="International Tax · Transfer Pricing" setPage={setPage}
      title={<>Transfer Pricing in India —<br/><span style={{ fontStyle:"italic", color:T.sl }}>A Practical Guide</span></>}
      description="Transfer pricing rules apply to every intercompany transaction between your India entity and its foreign parent. Here is what is required, what gets audited, and how to stay compliant.">

      <SEOSection label="What Is Transfer Pricing" title="Transfer pricing in India — what it means for foreign companies">
        <SEOProseP>Transfer pricing is the set of rules governing how prices are set for transactions between related companies — for example, between your India subsidiary and its foreign parent. The Indian Income Tax Act (Section 92–92F) requires that all such transactions be priced at arm's length — i.e., at the same price two unrelated parties would agree on.</SEOProseP>
        <SEOProseP>Regulated transactions include: management fees, royalties, software licence fees, IT services, technical services, loans, guarantees, and any sale or purchase of goods or intellectual property between related parties.</SEOProseP>
        <SEOProseP>For foreign companies with India subsidiaries, transfer pricing is not optional. Every year, if your India entity has international transactions with related parties exceeding ₹1 crore, a formal transfer pricing study and Form 3CEB (a certificate from a Chartered Accountant) must be filed with the income tax return.</SEOProseP>
      </SEOSection>

      <SEOSection label="Compliance Requirements" title="What transfer pricing compliance looks like in practice">
        <SEOSteps steps={[
          { title: "Identify all related party transactions", time: "Before year-end", desc: "Document every payment flowing between the India entity and related parties — management charges, royalties, IT services, cost recharges, loans. Many foreign companies underestimate the breadth of what qualifies." },
          { title: "Select the right pricing methodology", time: "At setup", desc: "India recognises five OECD-accepted methods: CUP, RPM, CPM, TNMM, and PSM. For GCCs and service entities, TNMM (Transactional Net Margin Method) is most common. We select and document the method before any transactions occur." },
          { title: "Benchmark analysis", time: "Annually", desc: "A comparability analysis using CMIE ProwessIQ or TP Catalyst databases — comparing your entity's margins against industry benchmarks. This is the core of the TP study and requires specialist expertise." },
          { title: "Transfer pricing study (documentation)", time: "Before filing ITR", desc: "A formal TP study documenting the entity profile, transaction analysis, methodology, benchmark, and arm's length conclusion. Required by law and must be maintained for 8 years." },
          { title: "Form 3CEB certification", time: "By 31 October", desc: "A report certified by a Chartered Accountant confirming the TP study and declaring that transactions are at arm's length. Filed along with the income tax return." },
          { title: "ITR filing with TP disclosure", time: "By 31 October", desc: "The income tax return for a company with international transactions is due by 31 October (not 31 July). Late filing attracts interest and penalties." },
        ]}/>
      </SEOSection>

      <SEOSection label="Real Client Example" title="Transfer pricing done right — and wrong">
        <SEOClientStory flag="🇦🇪" region="UAE · Manufacturing Group · 12-Year-Old India Entity"
          headline="Dubai group fixed 12 years of undocumented transfer pricing"
          challenge="The India branch office had been paying management fees to the UAE parent without any transfer pricing documentation for over a decade. When a TP audit was initiated, the company had no defensible position."
          outcome="We converted the branch to a private limited company, reconstructed a defensible TP policy, filed Form 3CEB for current and prior years, and appeared before the Transfer Pricing Officer."
          proof="Passed the TP scrutiny assessment with no adjustment made. Zero additional tax demand."/>
      </SEOSection>

      <SEOSection label="Common Mistakes" title="Transfer pricing mistakes Indian subsidiaries make">
        <SEOMistakes items={[
          { title: "Setting up transfer pricing after transactions have already occurred", desc: "The most common and costly mistake. TP documentation must be in place before the first intercompany payment. Reconstructing it retroactively is possible but creates risk — auditors give less weight to documentation prepared after the fact." },
          { title: "Underpaying or overpaying on management fees without benchmarking", desc: "Management fees charged by the parent to the subsidiary must be benchmarked against what an unrelated party would pay for equivalent services. Rates that are too high (over-charging the India entity) reduce taxable income in India — exactly what TP auditors look for." },
          { title: "Treating GCC entities as cost centres without proper cost-plus documentation", desc: "GCCs providing services to the foreign parent at cost are still subject to TP rules. A cost-plus methodology with a mark-up (typically 8–15%) must be documented, benchmarked, and defended." },
          { title: "Missing the Form 3CEB deadline", desc: "Form 3CEB must be filed by 31 October. Missing this deadline attracts a penalty of ₹1 lakh under Section 271BA, regardless of whether the TP position is correct." },
        ]}/>
      </SEOSection>

      <SEOSection label="Audit Risk" title="How India's transfer pricing audit system works">
        <SEOProseP>India has one of the most active transfer pricing audit regimes in Asia. Cases are selected for TP scrutiny based on risk parameters set by the Central Board of Direct Taxes (CBDT) — typically companies with large international transactions, significant adjustments in prior years, or sectors known for TP disputes (IT services, pharma, financial services).</SEOProseP>
        <SEOProseP>A TP adjustment — where the tax officer determines that your intercompany pricing was not at arm's length — attracts tax on the adjustment plus interest (12% per annum) plus penalty (up to 300% of the tax on adjustment in some cases). Advance Pricing Agreements (APAs) are available for companies wanting certainty — we have experience in both unilateral and bilateral APAs.</SEOProseP>
        <SEOProseP>Our track record: zero TP adjustments upheld across all client engagements where we prepared the documentation before the transactions occurred.</SEOProseP>
      </SEOSection>

      <SEOSection label="Cost & Fees" title="What transfer pricing compliance costs in India">
        <div style={{ background: T.stone, borderRadius: 14, padding: "28px 30px", border: `1px solid ${T.bdr}`, marginBottom: 16 }}>
          {[
            { item: "TP study + Form 3CEB (simple)", range: "₹40,000 – ₹75,000", note: "Single transaction type, TNMM methodology" },
            { item: "TP study (multi-transaction)", range: "₹75,000 – ₹1,50,000", note: "Multiple transaction types, complex benchmarking" },
            { item: "Annual TP retainer", range: "₹60,000 – ₹1,20,000/year", note: "Study + 3CEB + ongoing monitoring" },
            { item: "TP audit representation", range: "₹1,00,000 – ₹3,00,000", note: "Responding to scrutiny notices, DRP filings" },
            { item: "APA application", range: "₹3,00,000 – ₹8,00,000", note: "Unilateral APA — 5-year pricing certainty" },
          ].map(r => (
            <div key={r.item} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "12px 0", borderBottom: `1px solid ${T.bdr}`, alignItems: "start" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ch }}>{r.item}</div>
                <div style={{ fontSize: 12, color: T.lt, marginTop: 2 }}>{r.note}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.f, whiteSpace: "nowrap" }}>{r.range}</div>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="FAQ" title="Transfer pricing questions">
        <SEOFAQs items={[
          { q: "At what transaction value is transfer pricing documentation required?", a: "Transfer pricing documentation is required when the aggregate value of international transactions with related parties exceeds ₹1 crore in a financial year. Form 3CEB is additionally required. Below this threshold, documentation is still best practice but not legally mandated." },
          { q: "What is the penalty for non-compliance with transfer pricing rules?", a: "Penalties range from 2% of the transaction value (for failure to maintain documentation) to 100–300% of the tax on any adjustment. Form 3CEB non-filing attracts ₹1 lakh flat penalty. In practice, the larger risk is the adjustment itself — which then attracts tax + interest + penalty." },
          { q: "How is transfer pricing different for a GCC?", a: "A GCC (Global Capability Centre) providing services to its foreign parent is subject to TP rules on those services. The standard approach is a cost-plus methodology — the GCC charges the parent its total costs plus a mark-up (typically 8–15%). This mark-up and the methodology must be benchmarked and documented annually." },
          { q: "What is an Advance Pricing Agreement (APA)?", a: "An APA is a formal agreement between a taxpayer and the CBDT fixing the transfer pricing methodology and pricing for a period of 5 years. It provides complete certainty — no TP audit risk during the APA period. Available as unilateral (India only) or bilateral (India + treaty partner country)." },
          { q: "Can transfer pricing apply to a loan from the foreign parent?", a: "Yes. If the Indian subsidiary has received a loan from its foreign parent, the interest rate on that loan must be at arm's length. LIBOR-based or SBI MCLR-based benchmarks are typically used. RBI also imposes all-in cost ceilings on external commercial borrowings." },
        ]}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}

// ─── SEO PAGE 4: FDI RULES INDIA ─────────────────────────────────────────────

export { SEOPageLayout, SEOSection, SEOProseP, SEOSteps, SEOMistakes, SEOFAQs, SEOClientStory, SEOCTAStrip, ROUTES, WASvg, SEOFDIRulesPage, SEOForeignCompanyPage, SEOGCCSetupPage, SEOMarketEntryPage, SEONRIPage, SEOPvtLtdPage, SEOStartupFDIPage, SEOSubsidiaryPage, SEOTransferPricingPage };
