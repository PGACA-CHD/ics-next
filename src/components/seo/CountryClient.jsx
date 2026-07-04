'use client';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/config';
import { SEOPageLayout, SEOSection, SEOSteps, SEOClientStory, SEOFAQs, SEOCTAStrip } from '@/components/seo/SEOComponents';

const COUNTRY_DATA = {
  us: {
    flag: "🇺🇸", name: "US Company", region: "USA & Canada",
    title: "US Company Setting Up in India",
    subtitle: "The complete guide for American businesses entering India",
    description: "Over 30 US companies have used our platform to incorporate in India. Here is exactly what US companies face — Delaware vs India structure, Section 482 transfer pricing, and DTAA planning.",
    eyebrow: "USA · India Entry · Ex-Big 4",
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
    eyebrow: "UK · India Entry · Ex-Big 4",
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
    eyebrow: "UAE · India Entry · Ex-Big 4",
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
    subtitle: "Complete guide — DTAA, GAAR, GCC setup, FEMA compliance, and the 2026 Tiger Global ruling",
    description: "Singapore is the #1 source of FDI into India. APAC tech companies, GCCs, and semiconductor firms use Singapore as their India holding structure. Over 20 APAC companies on our platform. We handle entity setup, transfer pricing, ESOP structures, and ongoing compliance.",
    eyebrow: "Singapore · India Entry · Ex-Big 4",
    stats: [["20+", "APAC companies advised"], ["#1", "Singapore → India FDI source"], ["6–8 weeks", "Full GCC setup"], ["₹0", "FEMA penalties on record"]],
    whySection: "Why Singapore companies choose India",
    whyPoints: [
      { icon:"🔧", title:"India is the GCC capital of the world", desc:"India hosts 1,700+ Global Capability Centres. Singapore-headquartered tech, SaaS, fintech, and semiconductor firms routinely set up engineering and analytics teams of 10–500+ people in Bengaluru, Pune, Hyderabad, and Chennai — using Singapore as the regional holding company above the India GCC." },
      { icon:"💡", title:"IP holding and royalty structuring", desc:"Singapore is the preferred IP holding jurisdiction for APAC companies. Royalty flows from the India operating entity to the Singapore IP holder are governed by the India-Singapore DTAA at 10% WHT — versus 20% under domestic law. Intercompany IP licensing agreements must be in place and arm's length-priced before any royalty flows." },
      { icon:"🤝", title:"DTAA still valuable — but substance is now essential", desc:"The 2017 revision removed capital gains exemption for new investments. The treaty still materially reduces WHT on dividends (10–15%), interest (10–15%), and royalties (10%). Post the Tiger Global Supreme Court ruling (January 2026), Singapore entities must demonstrate genuine economic substance — board meetings, employees, management decisions in Singapore — to claim treaty benefits." },
      { icon:"🏭", title:"Press Note 3 does not apply to Singapore", desc:"Press Note 3 (2020) restricts FDI from countries sharing a land border with India and requires government approval. Singapore is explicitly exempt. Singapore companies can invest under the Automatic Route across all eligible sectors — no prior government approval required. A major advantage over China-linked structures." },
      { icon:"📊", title:"Temasek and Singapore institutional capital", desc:"Singapore's sovereign wealth fund Temasek has committed USD 10 billion+ additionally to India, on top of an existing USD 40 billion portfolio. Institutional co-investment from Singapore-based VCs and PE funds is significantly easier when your India entity is correctly structured from day one." },
      { icon:"🌏", title:"APAC hub with India engineering depth", desc:"Singapore provides APAC headquarters, investor relations, and global contracts; India provides engineering, analytics, and operations at scale. Cost-plus service agreements between Singapore parent and India GCC are the standard intercompany structure — benchmarked and documented annually under Indian transfer pricing law." },
    ],
    taxPoints: [
      "India-Singapore DTAA (Third Protocol, effective April 2017): dividends at 10–15% WHT, interest at 10–15%, royalties and FTS at 10% — all significantly below the 20% domestic WHT rate",
      "Capital gains: The DTAA capital gains exemption was removed in 2017. Post-April 2017 share acquisitions are taxable in India under domestic law. Pre-April 2017 positions are grandfathered. Shares acquired April 2017–March 2019 may qualify for a reduced rate subject to the SGD 200,000 annual expenditure condition",
      "GAAR + Tiger Global (2026): The Supreme Court's January 2026 Tiger Global ruling confirmed a Tax Residency Certificate alone is insufficient. Singapore entities must show genuine economic substance and commercial purpose. Pure conduit structures face DTAA denial under GAAR and the MLI Principal Purpose Test",
      "Press Note 3 exemption: Singapore is not a land-border country — investments via Singapore qualify for Automatic Route FDI in all eligible sectors without prior government approval",
      "GCC cost-plus transfer pricing: India GCC charges Singapore parent at cost + 8–15% mark-up (TNMM — Transactional Net Margin Method). Formal intercompany services agreement must pre-date transactions. Form 3CEB transfer pricing certificate required annually by October 31",
      "ESOP structures: Indian employees receiving ESOPs from Singapore parent must comply with FEMA Schedule VI. Perquisite tax applies in India at exercise on the spread between FMV and exercise price. Must be structured at setup — retrospective regularisation is expensive and complex",
      "Withholding tax on technical services: DTAA reduces FTS (Fees for Technical Services) rate to 10% vs domestic rate. Subject to substance requirements and MLI Principal Purpose Test",
    ],
    caseStudy: {
      headline: "Singapore SaaS company built a 40-person India GCC in 8 weeks",
      challenge: "Singapore-headquartered Series B SaaS company needed to move from 0 to 40 engineers in Pune. Entity setup, payroll, ESOP trust structure, cost-plus pricing model, transfer pricing documentation, and ongoing compliance were all required simultaneously — with a hard deadline tied to a Singapore board commitment.",
      outcome: "Private limited company incorporated in 11 working days, RBI FCGPR filed within 30 days, payroll running by week 6, ESOP trust structure in place, cost-plus intercompany agreement documented with full TP benchmarking, compliance retainer active from month 2.",
      proof: "40-person team fully compliant from hire #1. Zero payroll, FEMA, or TDS gaps. ESOP plan approved by India board. Passed first transfer pricing scrutiny with zero adjustment.",
    },
    faqs: [
      { q:"Is Singapore still a good holding structure for India after the Tiger Global ruling in January 2026?", a:"Yes — but substance is now mandatory. The Supreme Court's January 2026 Tiger Global ruling confirmed that a Tax Residency Certificate alone is not sufficient protection under GAAR. Your Singapore entity must demonstrate genuine economic substance: real employees, board meetings held in Singapore, management decisions made there, and commercial purpose beyond tax planning. If your Singapore entity has genuine operations, the DTAA continues to provide material benefits on dividends (10–15%), interest (10–15%), and royalties (10%). Pure conduit structures face denial of treaty benefits." },
      { q:"What changed under GAAR for Singapore-India structures?", a:"GAAR (General Anti-Avoidance Rules) became effective in April 2017. It allows Indian tax authorities to reclassify or disregard an arrangement if its main purpose is to obtain a tax benefit and it lacks commercial substance. The Tiger Global ruling in January 2026 applied GAAR to deny treaty benefits to a Singapore structure the court found was primarily tax-motivated. The ruling does not affect Singapore structures with genuine business substance — but it has significantly raised the documentation bar. We advise all Singapore clients to maintain a substance file from day one." },
      { q:"Does Press Note 3 apply to Singapore companies investing in India?", a:"No. Press Note 3 (2020) restricts FDI from countries sharing a land border with India — China, Pakistan, Bangladesh, Nepal, Bhutan, and Myanmar — requiring prior government approval. Singapore is not on this list. Singapore companies can invest in India under the Automatic Route in all sectors permitting 100% FDI, without any prior government approval. This is a significant structural advantage compared to China-linked holding companies." },
      { q:"How is a GCC's intercompany pricing structured and documented?", a:"An India GCC providing services to its Singapore parent is compensated using a cost-plus model under TNMM (Transactional Net Margin Method). The India entity charges its total costs — payroll, rent, infrastructure, overheads — plus a mark-up of 8–15%, benchmarked against comparable Indian service companies. A formal intercompany services agreement must be executed before any services begin. Form 3CEB (India TP certificate signed by a Chartered Accountant) is filed annually by October 31. Backdated agreements are treated adversely by Transfer Pricing Officers." },
      { q:"Can Indian employees of the India GCC receive ESOPs from the Singapore parent?", a:"Yes — this is common in Singapore-India GCC structures. Indian employees receiving ESOPs from the Singapore parent must comply with FEMA Schedule VI regulations. Perquisite tax applies in India at exercise on the spread between fair market value and exercise price. The Singapore parent must also comply with MAS regulations for cross-border employee share schemes. This structure must be designed correctly at setup — retrospective regularisation is complex and costly." },
      { q:"What bank account does an India subsidiary of a Singapore company need?", a:"The India subsidiary needs a Current Account with an AD Category-I bank — HDFC, ICICI, Axis, SBI, or Kotak are commonly used for foreign-owned companies. The account is required for receiving FDI from Singapore, paying salaries, GST, TDS, and vendor payments. Bank account opening typically takes 2–4 weeks and requires apostilled KYC documents from the Singapore parent including Certificate of Incorporation, M&A, and Board Resolution. This is often the critical path — not the incorporation itself." },
      { q:"Which Indian cities are best for a Singapore company setting up a GCC?", a:"Bengaluru dominates for tech, AI, and product engineering with the deepest talent pool and strongest Singapore PE/VC network familiarity. Pune is strong for engineering and manufacturing-adjacent tech at lower costs. Hyderabad is growing fast for fintech, healthcare tech, and analytics with competitive real estate and strong government support. Chennai suits logistics-tech, automotive, and hardware. For most Singapore SaaS and tech companies, Bengaluru or Pune is the right starting point." },
      { q:"How long does a full GCC setup take from Singapore?", a:"A realistic timeline: entity incorporated in 7–12 working days. Singapore parent documents require apostilling — allow 3–5 additional days. Bank account open in weeks 3–4. GST registration in week 4. First payroll run in week 6. Transfer pricing policy and intercompany agreement by week 6–8. Full operational readiness including ESOP trust in 8 weeks total. The critical path is the bank account, not the incorporation." },
    ],
  }};

function SEOCountryPage({ country, setPage }) {
  const d = COUNTRY_DATA[country];
  if (!d) return null;

  const WA_URL = "https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20my%20" + d.name.replace(' ', '%20') + "%20in%20India.";

  return (
    <SEOPageLayout eyebrow={d.eyebrow} setPage={setPage}
      title={<>{d.flag} {d.title.split(' Setting')[0]}<br/><span style={{ fontStyle:"italic", color:T.sl }}>Setting Up in India</span></>}
      description={d.description}>

      <SEOSection label="Quick Facts" title={`India entry snapshot for ${d.name.replace('Company', 'Companies')}`}>
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

      <SEOSection label="The Process" title={`How ${d.name.replace('Company', 'Companies')} incorporate in India`}>
        <SEOSteps steps={[
          { title:"Structure decision & DTAA analysis", time:"Day 1", desc:"We assess your sector, FDI route, and applicable DTAA to recommend the right entity type. For " + d.region + " companies, this includes reviewing intercompany pricing implications from day one." },
          { title:"Document preparation", time:"Days 2–5", desc:"Parent company documents need apostilling or equivalent authentication in " + d.region + ". For foreign director KYC, this adds 3–5 days. We advise on exactly which documents are needed." },
          { title:"MCA incorporation", time:"Days 6–19", desc:"SPICe+ filing — company name, directors, registered office, PAN, TAN, GSTIN. Certificate of Incorporation typically in 7–12 working days after document submission." },
          { title:"RBI FCGPR filing", time:"Within 30 days", desc:"Foreign Currency Gross Provisional Return — mandatory FEMA filing after share allotment. For " + d.region + " companies, the valuation methodology and exchange rate documentation must align with your home jurisdiction requirements." },
          { title:"Post-incorporation setup", time:"Weeks 4–6", desc:"Bank account, GST registration, TDS, payroll, transfer pricing policy, and compliance calendar. Full operational readiness." },
        ]}/>
      </SEOSection>

      <SEOSection label="Tax Considerations" title={`Key tax points for ${d.name.replace('Company', 'Companies')} in India`}>
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

      <SEOSection label="FAQ" title={`Common questions from ${d.name.replace('Company', 'Companies')}`}>
        <SEOFAQs items={d.faqs}/>
      </SEOSection>

      <SEOCTAStrip setPage={setPage}/>
    </SEOPageLayout>
  );
}

export default function CountryClientPage({ country }) {
  const router = useRouter();
  const setPage = (key) => {
    const ROUTES = {
      home:'/',services:'/setup',gcc:'/post-setup',tax:'/international-tax',
      hub:'/knowledge-hub',about:'/about',contact:'/contact',
    };
    router.push(ROUTES[key] || '/');
  };
  return <SEOCountryPage country={country} setPage={setPage} />;
}
 
