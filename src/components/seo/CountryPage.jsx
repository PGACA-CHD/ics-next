'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { T, CALENDLY_URL, WA_BASE, PHONE } from '@/lib/config';
import { trackConsultationRequest, trackWhatsApp, trackCalendlyBooking } from '@/lib/utils';

const ROUTE_MAP = {
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

function WASvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 0C4.03 0 0 4.03 0 9c0 1.58.43 3.07 1.18 4.34L0 18l4.77-1.25A8.96 8.96 0 009 18c4.97 0 9-4.03 9-9s-4.03-9-9-9z" fill="#25D366"/>
      <path d="M13.5 11.25c-.27.75-1.35 1.38-2.1 1.5-.54.09-1.26.15-3.66-.78-3.06-1.2-5.04-4.29-5.19-4.5-.15-.21-1.2-1.59-1.2-3.03s.75-2.16 1.02-2.46c.27-.3.57-.36.78-.36h.54c.18 0 .42-.06.66.51.24.57.81 1.98.9 2.13.09.15.12.33.03.51-.09.18-.15.3-.3.48l-.42.51c-.15.15-.3.33-.12.63.18.3.75 1.23 1.62 1.98 1.11.99 2.04 1.29 2.34 1.44.3.15.48.12.66-.06.18-.18.75-.87.96-1.17.21-.3.42-.24.69-.15.27.09 1.71.81 2.01.96.3.15.51.21.57.33.09.12.09.69-.18 1.38z" fill="#fff"/>
    </svg>
  );
}

// ─── SEO SHARED COMPONENTS ────────────────────────────────────────────────────
function SEOPageLayout({ children, title, description, eyebrow, setPage }) {
  const pageRef = useRef();
  useReveal(pageRef);
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
            <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => setPage("contact")}>Book Free Consultation →</button>
            <button className="ics-btn ics-btn-ghost ics-btn-lg" onClick={() => setPage("services")}>View Entity Types →</button>
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
        <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => setPage("contact")}>Book Free Consultation →</button>
        <a href="https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20my%20company%20in%20India." target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", padding: "12px 22px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>
          <WASvg/> WhatsApp us
        </a>
      </div>
    </div>
  );
}

// ─── SEO PAGE 1: FOREIGN COMPANY REGISTRATION INDIA ──────────────────────────

// ─── COUNTRY DATA ─────────────────────────────────────────────────────────────
const COUNTRY_DATA = {
  us: {
    flag: "🇺🇸", name: "US Company", region: "USA & Canada",
    title: "US Company Setting Up in India",
    subtitle: "The complete guide for American businesses entering India",
    description: "Over 30 US companies have used our platform to incorporate in India. Here is exactly what US companies face — Delaware vs India structure, Section 482 transfer pricing, and DTAA planning.",
    eyebrow: "USA · India Entry · Ex-KPMG Advisory",
    stats: [["30+", "US companies advised"], ["$0", "FEMA penalties"], ["22 days", "Avg. incorporation"], ["100%", "FDI permitted (most sectors)"]],
    whySection: "Why US companies choose India",
    whyPoints: [
      { icon:"💰", title:"Cost arbitrage without quality compromise", desc:"Senior engineering and finance talent at 20–30% of US equivalent cost. India's talent pool for SaaS, fintech, and analytics is among the deepest globally." },
      { icon:"🕐", title:"Time zone advantage for global operations", desc:"IST (UTC+5:30) gives US companies a near-24-hour development cycle when combined with US East and West Coast teams." },
      { icon:"📈", title:"India as a growth market, not just a cost centre", desc:"India is the world's fastest-growing major economy. Many US companies start with a GCC and expand into full commercial operations serving the Indian market." },
      { icon:"⚖️", title:"DTAA reduces double taxation", desc:"The India-US DTAA reduces withholding tax on dividends, royalties, and fees. Properly structured, most US companies pay 10–15% WHT instead of 20%." },
    ],
    taxPoints: [
      "India-US DTAA: dividends taxed at 15–25% (vs 20% domestic), royalties at 10–15%",
      "Transfer pricing under Section 92 (India) mirrors US Section 482 — same arm's length standard",
      "Form 3CEB (India TP certificate) equivalent to US Form 5471 disclosure",
      "US GILTI considerations apply to India subsidiary income — structure early to minimise exposure",
      "Delaware parent + India subsidiary is the most common structure — we set both sides up",
    ],
    caseStudy: {
      headline: "US SaaS platform incorporated in India in 19 days",
      challenge: "Series B company needed an India entity before their first Bangalore engineering hire. Delaware parent, India subsidiary, intercompany service agreement, and TP documentation all required simultaneously.",
      outcome: "Private limited company incorporated, FCGPR filed, TP policy aligned with US Section 482 arm's length standard, and first payroll run — all within 30 days.",
      proof: "Clean TP documentation from day one. No FEMA notices. Passed first India transfer pricing scrutiny with zero adjustment.",
    },
    faqs: [
      { q:"Can a US Delaware company own 100% of an Indian subsidiary?", a:"Yes. 100% FDI is permitted under the Automatic Route in most sectors. A Delaware C-Corp can hold 100% of an Indian Private Limited Company. RBI FCGPR must be filed within 30 days of share allotment." },
      { q:"Does the India-US DTAA reduce the tax burden?", a:"Yes. The India-US DTAA reduces withholding tax on dividends from 20% to 15–25%, royalties from 10% to 10–15%, and technical services from 10% to 10–15% depending on the structure. Proper DTAA planning should be done before the first intercompany payment." },
      { q:"Is transfer pricing between a US parent and India subsidiary required?", a:"Yes. Any intercompany transaction — management fees, IP licences, service charges, cost recharges — must be at arm's length and documented in a formal transfer pricing study. India follows OECD guidelines, similar to US Section 482." },
      { q:"How long does it take for a US company to set up in India?", a:"Standard incorporation takes 14–22 working days. If the sector requires Government Route FDI approval, add 8–12 weeks. Full operational setup (bank account, GST, payroll) takes 4–6 weeks total." },
      { q:"Does the Indian subsidiary need to file US tax forms?", a:"The US parent will need to file Form 5471 (Information Return for US Persons with Respect to Certain Foreign Corporations) annually for the India subsidiary. We coordinate with your US CPA on the Indian side of the disclosure." },
    ],
  },
  uk: {
    flag: "🇬🇧", name: "UK Company", region: "UK & Europe",
    title: "UK Company Setting Up in India",
    subtitle: "The complete guide for British businesses entering India",
    description: "India and the UK share a common legal heritage and deep business ties. Over 20 UK companies use our platform. Here is what UK companies face — UK-India DTAA, FCA-regulated entities, and post-Brexit structuring.",
    eyebrow: "UK · India Entry · Ex-KPMG Advisory",
    stats: [["20+", "UK companies advised"], ["24 days", "Avg. incorporation"], ["£0", "FEMA penalties"], ["Strong", "UK-India DTAA"]],
    whySection: "Why UK companies choose India",
    whyPoints: [
      { icon:"⚖️", title:"Common law legal system", desc:"India and the UK share a common law heritage. Indian corporate law, contract law, and courts are broadly familiar to UK-trained legal teams — lower adaptation curve than other jurisdictions." },
      { icon:"🗣️", title:"English as the business language", desc:"India's professional class operates entirely in English. UK companies face no language barrier in legal, financial, or technical communication." },
      { icon:"🏦", title:"Strong UK-India DTAA", desc:"The India-UK DTAA provides favourable withholding tax rates on dividends (10–15%), interest (10–15%), and royalties (10–15%). Well-structured, UK companies pay significantly less than the 20% domestic WHT rate." },
      { icon:"📊", title:"UK GAAP/IFRS alignment", desc:"Indian accounting standards (Ind AS) are substantially converged with IFRS. UK group reporting is straightforward — minimal reconciliation required." },
    ],
    taxPoints: [
      "India-UK DTAA: dividends at 10–15%, interest at 10–15%, royalties at 10–15%",
      "UK CFC rules apply — India subsidiary income may be attributable to UK parent if structure is passive",
      "Transfer pricing: UK HMRC's arm's length standard is equivalent to India's Section 92 — same documentation principles apply",
      "FCA-regulated entities require additional care — PE risk must be assessed before any advisory activities in India",
      "Post-Brexit: UK companies no longer benefit from EU parent-subsidiary directive — direct UK-India DTAA planning is essential",
    ],
    caseStudy: {
      headline: "London fintech set up a regulated India entity in 24 days",
      challenge: "FCA-regulated company needed an India presence for their engineering and operations team. Zero tolerance for RBI or FEMA non-compliance — any notice would trigger FCA reporting obligations.",
      outcome: "WOS incorporated, RBI FCGPR filed within 30 days, GST and TDS registration complete, compliance calendar aligned to UK group reporting cycle.",
      proof: "Zero RBI or FEMA notices in 2 years of operation. Clean records for the FCA-regulated parent.",
    },
    faqs: [
      { q:"Can a UK company own 100% of an Indian subsidiary?", a:"Yes. 100% FDI under the Automatic Route is permitted for most sectors. A UK company (private limited or plc) can hold 100% of an Indian Private Limited Company. FCGPR filing with RBI is required within 30 days of share allotment." },
      { q:"Does the India-UK DTAA apply after Brexit?", a:"Yes. The India-UK DTAA is a bilateral treaty between India and the UK — it is completely unaffected by Brexit. It provides reduced withholding tax rates on dividends, interest, royalties, and fees from India to the UK." },
      { q:"What are the PE risks for UK companies with Indian operations?", a:"If the Indian entity performs activities that constitute a permanent establishment under the India-UK DTAA, the profits attributable to those activities become taxable in India. FCA-regulated firms face particular scrutiny — advisory activities, client-facing staff, and contract signing authority in India can all trigger PE." },
      { q:"How does UK group reporting work with an Indian subsidiary?", a:"Indian subsidiaries prepare accounts under Ind AS (IFRS-converged). For UK group consolidation, minor reconciliation to IFRS is typically required. We prepare Ind AS accounts with IFRS bridge notes where needed." },
      { q:"Is Indian transfer pricing documentation different from the UK's?", a:"The principles are the same — OECD arm's length standard. In India, Form 3CEB (certified by a Chartered Accountant) must be filed by 31 October each year. The Indian TP study is a separate document from HMRC's UK TP documentation requirements — both are needed." },
    ],
  },
  uae: {
    flag: "🇦🇪", name: "UAE Company", region: "UAE & Middle East",
    title: "UAE Company Setting Up in India",
    subtitle: "The complete guide for UAE-based businesses entering India",
    description: "UAE companies have a unique India entry profile — trading groups, NRI promoters, and holding structures via DIFC or mainland UAE. Over 15 UAE companies use our platform.",
    eyebrow: "UAE · India Entry · Ex-KPMG Advisory",
    stats: [["15+", "UAE companies advised"], ["Strong", "India-UAE DTAA"], ["6 weeks", "Complex restructures"], ["NRI", "Specialist advisory"]],
    whySection: "Why UAE-based companies enter India",
    whyPoints: [
      { icon:"🏗️", title:"Manufacturing & infrastructure", desc:"UAE trading and manufacturing groups frequently expand to India for domestic manufacturing, reducing import dependency and accessing India's growing middle-class market." },
      { icon:"👥", title:"NRI promoter structures", desc:"Many UAE businesses are promoted by Non-Resident Indians. India entry requires careful structuring — NRI vs foreign company investment routes have different compliance paths." },
      { icon:"💱", title:"India-UAE DTAA benefits", desc:"The India-UAE DTAA provides 10% WHT on dividends, 12.5% on interest, and 10% on royalties — significantly below the 20% domestic rate. The treaty was comprehensively revised in 2014." },
      { icon:"📦", title:"Supply chain integration", desc:"Dubai's port infrastructure and India's manufacturing base are deeply complementary. UAE holding companies often serve as the regional hub for India + GCC operations." },
    ],
    taxPoints: [
      "India-UAE DTAA (revised 2014): dividends at 10%, interest at 12.5%, royalties at 10%",
      "UAE companies post-2023 corporate tax: UAE CT applies at 9% — India-UAE DTAA prevents double taxation",
      "NRI investment route vs foreign company route: different FEMA rules, different transfer pricing implications",
      "Substance requirements: UAE holding companies must demonstrate economic substance to claim DTAA benefits (BEPS Action 6)",
      "DIFC entities: treaty eligibility requires careful analysis — DIFC is a separate jurisdiction within UAE",
    ],
    caseStudy: {
      headline: "Dubai manufacturing group fixed 12 years of India compliance",
      challenge: "Branch office had operated for over a decade without transfer pricing documentation. Intercompany pricing was undocumented and a TP audit had been initiated.",
      outcome: "Converted branch to private limited company, reconstructed TP policy, filed Form 3CEB for current and back years, represented the company before the Transfer Pricing Officer.",
      proof: "Passed TP scrutiny with zero adjustment. RBI regularisation completed. Entity fully compliant going forward.",
    },
    faqs: [
      { q:"Can a UAE company invest in India under the Automatic Route?", a:"Yes — for most sectors. A UAE mainland company or a DIFC entity can invest in India under the Automatic Route in sectors that permit 100% FDI. However, DIFC entity treaty eligibility for the India-UAE DTAA requires analysis — DIFC is a separate jurisdiction and may not qualify for full treaty benefits." },
      { q:"Is an NRI's UAE investment treated differently from a foreign company's investment?", a:"Yes. NRI investment in India is governed by Schedule 4 of FEMA (Foreign Exchange Management (Non-Debt Instruments) Rules) — different from the FDI route used by foreign companies. NRI investment does not require FCGPR filing, but does require form FC-GPR in certain cases. The tax treatment also differs." },
      { q:"Does the India-UAE DTAA still apply after UAE introduced corporate tax?", a:"Yes. The UAE-India DTAA is not affected by UAE's introduction of 9% corporate tax in 2023. However, UAE CT may apply to the UAE entity's India-sourced income. The DTAA prevents double taxation — credit is available in UAE for Indian taxes paid." },
      { q:"What is BEPS substance and why does it matter for UAE holding companies?", a:"Post-BEPS, UAE holding companies claiming India DTAA benefits must demonstrate genuine economic substance in the UAE — employees, decision-making, assets. Shell companies with no substance face DTAA denial by Indian tax authorities under the Principal Purpose Test (PPT) under MLI." },
      { q:"How long does India incorporation take for a UAE company?", a:"For straightforward cases, 3–4 weeks. UAE company documents require apostilling (or equivalent authentication) — allow an additional 1–2 weeks for document authentication if needed." },
    ],
  },
  sg: {
    flag: "🇸🇬", name: "Singapore Company", region: "Singapore & APAC",
    title: "Singapore Company Setting Up in India",
    subtitle: "The complete guide for Singapore-based businesses entering India",
    description: "Singapore is the #1 source of FDI into India by country. APAC tech companies, GCCs, and semiconductor firms frequently use Singapore as their India holding structure. Over 20 APAC companies use our platform.",
    eyebrow: "Singapore · India Entry · Ex-KPMG Advisory",
    stats: [["20+", "APAC companies advised"], ["#1", "Singapore → India FDI source"], ["8 weeks", "Full GCC setup"], ["Strong", "India-Singapore DTAA"]],
    whySection: "Why Singapore companies enter India",
    whyPoints: [
      { icon:"🔧", title:"GCC & technology hub", desc:"India is the preferred GCC destination for Singapore and APAC technology companies. Engineering, analytics, and shared services teams of 10–500+ people are routinely set up through our platform." },
      { icon:"💡", title:"IP holding and royalty flows", desc:"Singapore is a preferred IP holding location for APAC companies. India-Singapore DTAA provides clear treatment for royalty flows and technology service fees." },
      { icon:"🤝", title:"Strong DTAA — especially post-2017 revision", desc:"The India-Singapore DTAA was revised in 2017 (grandfathering pre-2017 capital gains positions). For new investments, the treaty still provides significant benefits on dividends, interest, and fees." },
      { icon:"🌏", title:"APAC regional hub + India depth", desc:"Singapore-India structures allow APAC-wide operations with India providing the engineering depth. Cost-plus service agreements between the Singapore parent and India GCC are standard." },
    ],
    taxPoints: [
      "India-Singapore DTAA (revised 2017): dividends at 10–15%, interest at 10–15%, royalties at 10%",
      "Capital gains: post-2017 investments are taxable in India under domestic law (DTAA capital gains exemption grandfathered only for pre-April 2017 positions)",
      "GCC cost-plus pricing: Singapore parent → India GCC intercompany pricing must be at arm's length — TNMM with 8–15% mark-up is standard",
      "ESOP structures: Indian employees' ESOPs from Singapore parent company have specific FEMA and tax implications — must be structured correctly at setup",
      "MLI impact: India and Singapore are both MLI signatories — Principal Purpose Test applies to treaty benefit claims",
    ],
    caseStudy: {
      headline: "APAC SaaS company built a 40-person GCC in India in 8 weeks",
      challenge: "Singapore-headquartered company needed to move from 0 to 40 engineers in Pune. Entity setup, payroll, ESOP trust structure, cost-plus pricing model, and ongoing compliance all required simultaneously.",
      outcome: "Private limited company incorporated, payroll running by week 6, ESOP trust structure in place, cost-plus pricing model documented, compliance retainer active from month 2.",
      proof: "40-person team fully compliant from hire #1. Zero payroll or FEMA gaps. ESOP plan approved by India board.",
    },
    faqs: [
      { q:"Is Singapore still a good holding structure for India investment post-2017 DTAA revision?", a:"Yes — for new investments, Singapore remains advantageous for dividends, interest, royalties, and fees. Capital gains benefits were grandfathered only for pre-April 2017 investments. For new investments, India domestic capital gains tax applies. For income-based flows (dividends, fees, royalties), the treaty still provides material benefits." },
      { q:"How is a GCC's intercompany pricing structured?", a:"A GCC providing services to its Singapore parent typically uses a cost-plus methodology — the India GCC charges the parent its total costs plus a mark-up (8–15%, benchmarked). This must be documented annually in a transfer pricing study and certified via Form 3CEB." },
      { q:"Can Singapore employees receive ESOPs from the Indian subsidiary?", a:"Yes, but it requires careful structuring. Indian subsidiary ESOPs require Companies Act compliance (share option plan board approval, FEMA compliance for exercise and remittance). Singapore parent ESOPs for Indian employees require FEMA compliance on the remittance of exercise proceeds." },
      { q:"What is the Principal Purpose Test and does it affect Singapore holding structures?", a:"The MLI's Principal Purpose Test (PPT) denies treaty benefits if one of the principal purposes of an arrangement is to obtain those benefits. Singapore holding structures with genuine business operations (employees, management, decision-making) in Singapore are generally safe. Pure conduit structures with no Singapore substance face risk." },
      { q:"How long does it take to set up a GCC in India from Singapore?", a:"Full GCC setup — entity incorporated, bank account, payroll, ESOP structure, cost-plus agreement — typically takes 6–8 weeks. The first hire can be onboarded in week 4 after incorporation." },
    ],
  },
};

// ─── COUNTRY PAGE ─────────────────────────────────────────────────────────────
export function CountryPageComponent({ country, setPage }) {
  const d = COUNTRY_DATA[country];
  if (!d) return null;

  const WA_URL = "https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20my%20" + d.name.replace(' ', '%20') + "%20in%20India.";

  return (
    <SEOPageLayout eyebrow={d.eyebrow} setPage={setPage}
      title={<>{d.flag} {d.title.split(' Setting')[0]}<br/><span style={{ fontStyle:"italic", color:T.sl }}>Setting Up in India</span></>}
      description={d.description}>

      <SEOSection label="Quick Facts" title={`India entry snapshot for ${d.name}s`}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:8 }} className="seo-2col">
          {d.stats.map(([n,l]) => (
            <div key={l} style={{ background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:12, padding:"20px 16px", textAlign:"center" }}>
              <div className="font-display" style={{ fontSize:28, fontWeight:700, color:T.f, lineHeight:1, marginBottom:6 }}>{n}</div>
              <div style={{ fontSize:12, color:T.lt, lineHeight:1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label={d.whySection} title={d.whySection}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:8 }} className="seo-2col">
          {d.whyPoints.map(p => (
            <div key={p.title} style={{ background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:12, padding:"20px 18px", display:"flex", gap:14 }}>
              <span style={{ fontSize:24, flexShrink:0 }}>{p.icon}</span>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:T.ch, marginBottom:6 }}>{p.title}</div>
                <p style={{ fontSize:13, color:T.mid, lineHeight:1.7, fontWeight:300 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="The Process" title={`How ${d.name}s incorporate in India`}>
        <SEOSteps steps={[
          { title:"Structure decision & DTAA analysis", time:"Day 1", desc:"We assess your sector, FDI route, and applicable DTAA to recommend the right entity type. For " + d.region + " companies, this includes reviewing intercompany pricing implications from day one." },
          { title:"Document preparation", time:"Days 2–5", desc:"Parent company documents need apostilling or equivalent authentication in " + d.region + ". For foreign director KYC, this adds 3–5 days. We advise on exactly which documents are needed." },
          { title:"MCA incorporation", time:"Days 6–19", desc:"SPICe+ filing — company name, directors, registered office, PAN, TAN, GSTIN. Certificate of Incorporation typically in 7–12 working days after document submission." },
          { title:"RBI FCGPR filing", time:"Within 30 days", desc:"Foreign Currency Gross Provisional Return — mandatory FEMA filing after share allotment. For " + d.region + " companies, the valuation methodology and exchange rate documentation must align with your home jurisdiction requirements." },
          { title:"Post-incorporation setup", time:"Weeks 4–6", desc:"Bank account, GST registration, TDS, payroll, transfer pricing policy, and compliance calendar. Full operational readiness." },
        ]}/>
      </SEOSection>

      <SEOSection label="Tax Considerations" title={`Key tax points for ${d.name}s in India`}>
        <div style={{ background:T.stone, borderRadius:14, padding:"24px 28px", border:`1px solid ${T.bdr}`, marginBottom:8 }}>
          {d.taxPoints.map((pt, i) => (
            <div key={i} style={{ display:"flex", gap:12, paddingBottom:12, marginBottom:12, borderBottom: i < d.taxPoints.length-1 ? `1px solid ${T.bdr}` : "none" }}>
              <span style={{ color:T.s, fontWeight:700, flexShrink:0, fontSize:14 }}>✓</span>
              <p style={{ fontSize:13.5, color:T.mid, lineHeight:1.7, fontWeight:300 }}>{pt}</p>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="Real Client Example" title="How it works in practice">
        <SEOClientStory flag={d.flag} region={d.region}
          headline={d.caseStudy.headline}
          challenge={d.caseStudy.challenge}
          outcome={d.caseStudy.outcome}
          proof={d.caseStudy.proof}/>
      </SEOSection>

      <SEOSection label="FAQ" title={`Common questions from ${d.name}s`}>
        <SEOFAQs items={d.faqs}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}

// ─── GCC SETUP PAGE ───────────────────────────────────────────────────────────
