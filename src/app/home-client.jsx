'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T, CALENDLY_URL, PHONE, PHONE_RAW } from '@/lib/config';
import { submitToZoho, trackConsultationRequest, trackGuideDownload, trackWhatsApp } from '@/lib/utils';

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

export default function HomePage() {
  const [hf, setHf] = useState({ nameTitle: "", email: "", companyCountry: "", service: "" });
  const [hStatus, setHStatus] = useState("idle");
  const setH = key => e => setHf(prev => ({ ...prev, [key]: e.target.value }));

  const handleHeroSubmit = async () => {
    if (!hf.nameTitle.trim() || !hf.email.trim()) { setHStatus("error"); return; }
    setHStatus("submitting");
    try {
      const parts = hf.nameTitle.trim().split(" ");
      const firstName = parts[0];
      const lastName = parts.slice(1).join(" ") || "-";
      const ccParts = hf.companyCountry.split(",");
      const company = ccParts[0]?.trim() || hf.companyCountry;
      const country = ccParts.slice(1).join(",").trim() || "";
      await submitToZoho({ firstName, lastName, email: hf.email, mobile: "", company, country, service: hf.service, description: "", source: "Website Hero Form" });
      setHStatus("success");
      trackConsultationRequest("Hero Form");
    } catch { setHStatus("error"); }
  };

  const cases = [
    {
      flag: "🇺🇸", region: "USA · SaaS · Series B", timeline: "19 days",
      headline: "Cloud analytics company entered India in 19 days",
      challenge: "Needed an India entity before their first engineering hire arrived in Bangalore. No time to get the structure wrong.",
      outcome: "Private limited company incorporated, FCGPR filing completed, transfer pricing policy documented, and first payroll run — all before day 30.",
      proof: "TP documentation: completed in week 2, not retrofitted at year-end.",
      tags: ["Private Limited", "TP Policy", "FCGPR", "Payroll"],
    },
    {
      flag: "🇬🇧", region: "UK · Fintech · Regulated", timeline: "24 days",
      headline: "London fintech set up a regulated India entity",
      challenge: "FCA-regulated company needed India presence with zero risk of PE exposure or RBI non-compliance flagging their UK auditors.",
      outcome: "WOS incorporated, RBI FCGPR filed within 30 days, GST registration complete, compliance calendar aligned to UK reporting cycle — clean for first audit.",
      proof: "Zero RBI or FEMA notices in 2 years of operation.",
      tags: ["WOS", "RBI Compliance", "GST + TDS", "PE Risk"],
    },
    {
      flag: "🇦🇪", region: "UAE · Manufacturing · 12-year-old entity", timeline: "6 weeks",
      headline: "Dubai group fixed a 12-year-old India structure",
      challenge: "Branch office had been operating without transfer pricing documentation for over a decade. Audit risk was significant.",
      outcome: "Converted branch to private limited company, renegotiated intercompany pricing, filed Form 3CEB, and established a defensible TP policy going forward.",
      proof: "Passed subsequent transfer pricing scrutiny with no adjustment.",
      tags: ["Restructuring", "Transfer Pricing", "3CEB", "Branch Conversion"],
    },
    {
      flag: "🇸🇬", region: "Singapore · Tech · GCC", timeline: "8 weeks",
      headline: "APAC SaaS company scaled to a 40-person GCC",
      challenge: "Needed to move fast from 0 to 40 engineers in Pune — entity, payroll, ESOP, cost-plus pricing model, and ongoing compliance all at once.",
      outcome: "End-to-end GCC setup — entity incorporated, payroll running by week 6, ESOP trust structure in place, cost-plus pricing documented, compliance retainer active from month 2.",
      proof: "40-person team fully compliant from hire #1. No payroll or FEMA gaps.",
      tags: ["GCC Setup", "ESOP", "Cost-Plus Pricing", "Payroll"],
    },
  ];

  const process = [
    { n: "01", title: "Free Consultation", time: "Day 1",
      desc: "30 minutes. We understand your business model, India objectives, and team plan — then give you a clear structure recommendation before any engagement begins." },
    { n: "02", title: "Structure Design", time: "Week 1",
      desc: "Entity type, FDI route, transfer pricing model, DTAA analysis, PE risk check. Designed before any filing — never retrofitted after.",
      link: "seo_sub" },
    { n: "03", title: "Incorporation", time: "Weeks 2–3",
      desc: "MCA SPICe+ filing, DIN, DSC, PAN, TAN, Certificate of Incorporation. Typical timeline: 7–12 working days after document submission." },
    { n: "04", title: "Post-Incorporation Setup", time: "Week 4",
      desc: "RBI FCGPR filing, GST registration, bank account, payroll setup, and your complete compliance calendar — handed over ready to use." },
    { n: "05", title: "Ongoing Compliance", time: "Month 2+",
      desc: "Monthly retainer: GST, TDS, payroll, MCA filings, annual audit, corporate tax return. One firm, full coverage, fixed fee." },
  ];

  const verticals = [
    { icon: "💻", name: "SaaS & Technology",          proof: "30+ companies",  detail: "Primarily from USA, Singapore & UK" },
    { icon: "🏗️", name: "GCC / Captive Centres",      proof: "15+ setups",     detail: "10–200 person teams across sectors" },
    { icon: "🏦", name: "Financial Services",          proof: "20+ companies",  detail: "Fintech, funds, wealth management" },
    { icon: "🏭", name: "Manufacturing & Engineering", proof: "15+ companies",  detail: "UAE, Germany, Japan, South Korea" },
    { icon: "🏥", name: "Healthcare & Pharma",         proof: "10+ companies",  detail: "Research, devices, distribution" },
    { icon: "🏪", name: "E-commerce & Retail",         proof: "10+ companies",  detail: "D2C, marketplace, omnichannel" },
  ];

  const regions = [
    { flag: "🇺🇸", name: "USA & Canada",       count: "30+", industries: "SaaS · Fintech · GCC · EdTech" },
    { flag: "🇬🇧", name: "UK & Europe",         count: "20+", industries: "Financial Services · Manufacturing · Tech" },
    { flag: "🇦🇪", name: "UAE & Middle East",   count: "15+", industries: "Trading · Tech · Shared Services" },
    { flag: "🇸🇬", name: "Singapore & APAC",    count: "20+", industries: "SaaS · GCC · Semiconductors" },
    { flag: "🇦🇺", name: "Australia & NZ",      count: "10+", industries: "Resources · Professional Services" },
    { flag: "🌍",  name: "Other Markets",        count: "5+",  industries: "Japan · Germany · South Korea · Israel" },
  ];

  const inp = (extra = {}) => ({
    width: "100%", padding: "12px 15px",
    border: `1.5px solid ${T.bdr}`, borderRadius: 7,
    fontFamily: "'DM Sans',sans-serif", fontSize: 13.5,
    color: T.ch, background: "#fff", outline: "none",
    marginBottom: 10, boxSizing: "border-box",
    transition: "border-color .18s",
    ...extra,
  });

  return (
    <div>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="hero-section" style={{
        background: T.f, minHeight: "100vh", display: "flex",
        alignItems: "center", padding: "130px 56px 90px", position: "relative", overflow: "hidden",
      }}>
        {/* Grid texture */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`,
          backgroundSize:"64px 64px" }}/>
        {/* Warm glow top-right */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:`radial-gradient(ellipse 55% 70% at 105% 40%,rgba(232,144,10,.11) 0%,transparent 55%),
                      radial-gradient(ellipse 40% 60% at -5% 110%,rgba(0,0,0,.25) 0%,transparent 50%)` }}/>

        <div className="hero-grid" style={{ maxWidth:1360, margin:"0 auto", width:"100%", display:"grid",
          gridTemplateColumns:"1fr 420px", gap:72, alignItems:"center", position:"relative", zIndex:2 }}>

          {/* ── Left copy ── */}
          <div className="stagger in" style={{ textAlign:"left" }}>
            {/* Eyebrow */}
            <div className="hero-eyebrow" style={{ display:"inline-flex", alignItems:"center", gap:8,
              background:"rgba(232,144,10,.13)", border:"1px solid rgba(232,144,10,.28)",
              color:T.sl, padding:"5px 16px", borderRadius:50, fontSize:10.5,
              fontWeight:600, letterSpacing:".8px", textTransform:"uppercase", marginBottom:28 }}>
              🇮🇳 &nbsp;India Market Entry · Ex-KPMG Advisory
            </div>

            {/* H1 */}
            <h1 className="font-display hero-h1" style={{
              fontSize:"clamp(46px,5.5vw,74px)", fontWeight:600,
              lineHeight:1.0, color:"#fff", marginBottom:24, letterSpacing:"-.02em",
            }}>
              Set up your India<br/>
              business in{" "}
              <span style={{ fontStyle:"italic", color:T.sl }}>30 days.</span>
            </h1>

            {/* Subhead — outcome-first, no jargon */}
            <p style={{ fontSize:17.5, color:"rgba(255,255,255,.58)", lineHeight:1.75,
              fontWeight:300, maxWidth:500, marginBottom:36 }}>
              Your India subsidiary, up and running.
              Structure designed, entity incorporated, bank account open, compliance sorted.
              One firm handles it all.
            </p>

            {/* Audience path pills */}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:28 }}>
              {[
                { label:"Setting up an India subsidiary", icon:"🏢", page:"seo_fcri" },
                { label:"Building a GCC or captive team", icon:"🏗️", page:"gcc" },
                { label:"Already in India, need a fix", icon:"🔧", page:"contact" },
              ].map(p => (
                <button key={p.label} onClick={() => { window.location.href = ROUTES[p.page] || "/"; }} style={{
                  display:"inline-flex", alignItems:"center", gap:6,
                  background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.14)",
                  color:"rgba(255,255,255,.75)", padding:"7px 14px", borderRadius:50,
                  fontSize:12.5, fontWeight:500, cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif", transition:"all .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.14)"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.07)"; e.currentTarget.style.color="rgba(255,255,255,.75)"; }}>
                  <span>{p.icon}</span> {p.label}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:52 }}>
              <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => { window.location.href = ROUTES["contact"] || "/"; }}>
                Book Free Consultation →
              </button>
              <button className="ics-btn ics-btn-ghost ics-btn-lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})}>
                How It Works ↓
              </button>
            </div>

            {/* Trust bar */}
            <div className="hero-trust-bar" style={{ display:"flex", flexWrap:"wrap", gap:0,
              borderTop:"1px solid rgba(255,255,255,.09)", paddingTop:26 }}>
              {[
                { label:"Clients from",   value:"🇺🇸 🇬🇧 🇦🇪 🇸🇬 🇦🇺 🇩🇪 +" },
                { label:"Experience",     value:"18+ years" },
                { label:"Incorporated",   value:"100+ companies" },
                { label:"TP audits lost", value:"Zero" },
              ].map(({ label, value }) => (
                <div key={label} style={{ paddingRight:28, marginRight:28,
                  borderRight:"1px solid rgba(255,255,255,.09)", marginBottom:6 }}>
                  <div style={{ fontSize:9.5, color:"rgba(255,255,255,.28)", letterSpacing:1,
                    textTransform:"uppercase", marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:13.5, color:"rgba(255,255,255,.72)", fontWeight:500 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — consultation card ── */}
          <div className="reveal in hero-card" style={{
            background:"#fff", borderRadius:20, padding:"36px 32px",
            boxShadow:"0 40px 100px rgba(0,0,0,.32)", position:"relative",
          }}>
            {/* Top accent */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:4,
              background:`linear-gradient(90deg,${T.f},${T.s})`, borderRadius:"20px 20px 0 0" }}/>

            {hStatus === "success" ? (
              <div style={{ textAlign:"center", padding:"28px 0" }}>
                <div style={{ fontSize:52, marginBottom:16 }}>🎉</div>
                <h3 className="font-display" style={{ fontSize:24, fontWeight:600, color:T.f, marginBottom:10 }}>We'll be in touch!</h3>
                <p style={{ fontSize:13.5, color:T.mid, lineHeight:1.7, marginBottom:22 }}>
                  Our senior CA responds within 24 hours. In the meantime, reach us directly on WhatsApp.
                </p>
                <a href="https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20my%20company%20in%20India."
                  target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8,
                    background:"#25D366", color:"#fff", padding:"12px 24px",
                    borderRadius:9, fontSize:14, fontWeight:600 }}>
                  <WASvg/> Chat on WhatsApp
                </a>
              </div>
            ) : (
              <>
                <h3 className="font-display" style={{ fontSize:22, fontWeight:600, color:T.ch, marginBottom:4 }}>
                  Book Free Consultation
                </h3>
                <p style={{ fontSize:12.5, color:T.lt, lineHeight:1.5, marginBottom:16 }}>
                  Senior CA responds within 24 hours. No commitment.
                </p>

                {/* What you get block */}
                <div style={{ background:T.stone, borderRadius:10, padding:"14px 16px",
                  marginBottom:18, border:`1px solid ${T.bdr}` }}>
                  <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase",
                    color:T.f, fontWeight:700, marginBottom:10 }}>What happens after you submit</div>
                  {[
                    { step:"Within 24 hrs", text:"Senior CA reviews your submission and confirms a 30-min slot" },
                    { step:"On the call", text:"We review your structure, flag risks, and recommend the right entity & tax setup" },
                    { step:"After the call", text:"You receive a short written summary — structure recommendation, FDI route, next steps" },
                  ].map((s, i) => (
                    <div key={i} style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:10,
                      paddingBottom: i < 2 ? 10 : 0,
                      borderBottom: i < 2 ? `1px solid ${T.bdr}` : "none",
                      marginBottom: i < 2 ? 10 : 0 }}>
                      <div style={{ fontSize:10.5, fontWeight:700, color:T.s,
                        lineHeight:1.4 }}>{s.step}</div>
                      <div style={{ fontSize:12, color:T.mid, lineHeight:1.55 }}>{s.text}</div>
                    </div>
                  ))}
                </div>

                <input type="text" placeholder="Your full name *"
                  value={hf.nameTitle} onChange={setH("nameTitle")}
                  style={inp({ borderColor: hStatus==="error" && !hf.nameTitle.trim() ? "#E74C3C" : T.bdr })}
                  onFocus={e => e.target.style.borderColor = T.f}
                  onBlur={e => e.target.style.borderColor = (hStatus==="error"&&!hf.nameTitle.trim())?"#E74C3C":T.bdr}
                />
                <input type="email" placeholder="Work email address *"
                  value={hf.email} onChange={setH("email")}
                  style={inp({ borderColor: hStatus==="error" && !hf.email.trim() ? "#E74C3C" : T.bdr })}
                  onFocus={e => e.target.style.borderColor = T.f}
                  onBlur={e => e.target.style.borderColor = (hStatus==="error"&&!hf.email.trim())?"#E74C3C":T.bdr}
                />
                <input type="text" placeholder="Company name, Country"
                  value={hf.companyCountry} onChange={setH("companyCountry")}
                  style={inp()}
                  onFocus={e => e.target.style.borderColor = T.f}
                  onBlur={e => e.target.style.borderColor = T.bdr}
                />
                <select value={hf.service} onChange={setH("service")}
                  style={inp({ cursor:"pointer" })}>
                  <option value="">What do you need help with?</option>
                  <option>Foreign Company Incorporation</option>
                  <option>GCC / Captive Centre Setup</option>
                  <option>International Tax & DTAA</option>
                  <option>Transfer Pricing</option>
                  <option>FEMA Compliance</option>
                  <option>Ongoing Compliance Retainer</option>
                </select>

                {hStatus === "error" && (
                  <div style={{ background:"#FFF0F0", border:"1px solid #FFCCCC",
                    borderRadius:7, padding:"9px 14px", marginBottom:10, fontSize:12.5, color:"#C0392B" }}>
                    Please enter your name and email address.
                  </div>
                )}

                <button onClick={handleHeroSubmit} disabled={hStatus==="submitting"}
                  className="ics-btn ics-btn-primary"
                  style={{ width:"100%", justifyContent:"center", padding:"14px 20px", fontSize:14.5,
                    opacity:hStatus==="submitting"?0.7:1, borderRadius:9, marginTop:4, letterSpacing:.2 }}>
                  {hStatus === "submitting" ? "Sending…" : "Request Free Consultation →"}
                </button>

                <div style={{ display:"flex", justifyContent:"center", gap:18, marginTop:14 }}>
                  {["No commitment", "Confidential", "24hr response"].map(t => (
                    <span key={t} style={{ fontSize:11.5, color:T.lt, display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ color:"#22c55e" }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══ STATS RIBBON ══════════════════════════════════════════════════════ */}
      <div className="stats-ribbon" style={{ background:"#09100D", borderTop:"1px solid rgba(255,255,255,.04)",
        display:"grid", gridTemplateColumns:"repeat(5,1fr)" }}>
        {[
          ["100+", "Foreign companies\nincorporated"],
          ["18+",  "Years of advisory\nexperience"],
          ["5",    "Continents\nserved"],
          ["90+",  "DTAA treaty\ncountries"],
          ["0",    "Transfer pricing\naudits lost"],
        ].map(([num, label]) => (
          <div key={num} style={{ padding:"28px 20px", textAlign:"center",
            borderRight:"1px solid rgba(255,255,255,.05)" }}>
            <div className="font-display" style={{ fontSize:40, fontWeight:700,
              color:"#fff", lineHeight:1 }}>{num}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.28)", marginTop:7,
              lineHeight:1.5, letterSpacing:.3, whiteSpace:"pre-line" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ══ AUDIENCE PATHS ════════════════════════════════════════════════════ */}
      <section style={{ padding:"72px 56px 0", background:T.ivory }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="reveal" style={{ textAlign:"center", marginBottom:44 }}>
            <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
              color:T.s, fontWeight:600, marginBottom:12 }}>Who We Work With</div>
            <h2 className="font-display" style={{ fontSize:"clamp(28px,3vw,42px)",
              fontWeight:600, lineHeight:1.1, color:T.ch }}>
              Where do you{" "}
              <span style={{ fontStyle:"italic", color:T.f }}>fit in?</span>
            </h2>
          </div>

          <div className="stagger service-cards-grid" style={{ display:"grid",
            gridTemplateColumns:"repeat(3,1fr)", gap:16, paddingBottom:72 }}>
            {[
              {
                icon: "🏢",
                audience: "Foreign Parent Company",
                headline: "Setting up an India subsidiary",
                desc: "You're a CFO, legal counsel, or finance director at a foreign company that needs an India presence. You need the right structure, compliant FDI filings, and a team that handles the full picture — not just the paperwork.",
                bullets: ["WOS or Branch Office structure", "FDI route & RBI compliance", "Transfer pricing from day one", "Full post-incorporation handover"],
                cta: "Foreign company guide →", page: "seo_fcri",
              },
              {
                icon: "🏗️",
                audience: "GCC & Captive Centres",
                headline: "Building a team in India",
                desc: "You're setting up a Global Capability Centre — 10 to 200+ people. You need entity setup, payroll, ESOP structuring, cost-plus pricing, and a compliance retainer that scales as you hire.",
                bullets: ["End-to-end GCC advisory", "Payroll & HR compliance", "ESOP & incentive structuring", "Ongoing compliance retainer"],
                cta: "GCC advisory →", page: "gcc",
              },
              {
                icon: "🔧",
                audience: "Already in India",
                headline: "Something isn't right",
                desc: "Your India entity is live but the structure was set up quickly, the transfer pricing is undocumented, or your compliance is behind. We assess, fix, and maintain — without starting over.",
                bullets: ["Structure & TP health check", "FEMA & RBI regularisation", "Back-filing & penalty mitigation", "Ongoing compliance takeover"],
                cta: "Get a review →", page: "contact",
              },
              {
                icon: "🌏",
                audience: "NRI",
                headline: "NRI investing or returning to India",
                desc: "You live abroad and want to invest in or start a business in India — or you're returning to India and your FEMA and tax status is changing. Two situations, one advisory team.",
                bullets: ["Schedule 4 FEMA — NRI investment route", "Residency transition planning", "NRE/FCNR account handling", "RNOR tax optimisation"],
                cta: "NRI guide →", page: "seo_nri",
              },
              {
                icon: "🚀",
                audience: "Indian Startup",
                headline: "Raising your first foreign round",
                desc: "Your startup is raising from foreign angels or VCs. CCPS, CCD, SAFE — getting the instrument, valuation, and FCGPR right determines how clean your cap table looks at Series A.",
                bullets: ["CCPS / CCD structuring", "Angel tax — DPIIT recognition", "FEMA valuation compliance", "FC-GPR within 30 days"],
                cta: "Startup funding guide →", page: "seo_startup",
              },
              {
                icon: "🏭",
                audience: "Indian Promoter",
                headline: "Incorporating a Pvt Ltd in India",
                desc: "You're an Indian founder, entrepreneur, or promoter incorporating a Private Limited Company. You want it done right — right objects clause, right share structure, FDI-ready if investors come later.",
                bullets: ["MOA objects clause advice", "Share capital structure", "FDI-ready from day one", "Post-incorporation compliance"],
                cta: "Pvt Ltd registration guide →", page: "seo_pvtltd",
              },
            ].map(a => (
              <div key={a.audience} className="card-lift" style={{
                background:"#fff", border:`1px solid ${T.bdr}`,
                borderRadius:18, padding:"32px 28px",
                display:"flex", flexDirection:"column", textAlign:"left",
              }}>
                <div style={{ fontSize:32, marginBottom:14 }}>{a.icon}</div>
                <div style={{ fontSize:9.5, letterSpacing:2.5, textTransform:"uppercase",
                  color:T.s, fontWeight:600, marginBottom:8 }}>{a.audience}</div>
                <h3 className="font-display" style={{ fontSize:21, fontWeight:600,
                  color:T.ch, lineHeight:1.25, marginBottom:12 }}>{a.headline}</h3>
                <p style={{ fontSize:13.5, color:T.mid, lineHeight:1.75, fontWeight:300,
                  marginBottom:20 }}>{a.desc}</p>
                <ul style={{ listStyle:"none", marginBottom:24, flex:1, padding:0 }}>
                  {a.bullets.map(b => (
                    <li key={b} style={{ display:"flex", alignItems:"flex-start", gap:8,
                      fontSize:13, color:T.mid, marginBottom:8, lineHeight:1.55 }}>
                      <span style={{ color:T.s, fontWeight:700, flexShrink:0 }}>✓</span>{b}
                    </li>
                  ))}
                </ul>
                <button onClick={() => { window.location.href = ROUTES[a.page] || "/"; }} style={{
                  background:"none", border:"none", cursor:"pointer", padding:0,
                  fontSize:13.5, fontWeight:700, color:T.f,
                  fontFamily:"'DM Sans',sans-serif", textAlign:"left",
                  display:"flex", alignItems:"center", gap:4, transition:"gap .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.gap="8px"}
                onMouseLeave={e => e.currentTarget.style.gap="4px"}>
                  {a.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO — 3 pillars, plain language ════════════════════════════ */}
      <section style={{ padding:"108px 56px", background:T.ivory }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="reveal" style={{ textAlign:"center", marginBottom:60 }}>
            <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
              color:T.s, fontWeight:600, marginBottom:14 }}>What We Do</div>
            <h2 className="font-display" style={{ fontSize:"clamp(34px,3.8vw,54px)",
              fontWeight:600, lineHeight:1.06, color:T.ch, maxWidth:680, margin:"0 auto" }}>
              We help global companies{" "}
              <span style={{ fontStyle:"italic", color:T.f }}>enter India the right way.</span>
            </h2>
            <p style={{ fontSize:16, color:T.mid, lineHeight:1.82, fontWeight:300,
              maxWidth:560, margin:"18px auto 0" }}>
              Not just paper-filing. Strategy first. Structure designed before a single document is touched.
            </p>
          </div>

          <div className="stagger service-cards-grid" style={{ display:"grid",
            gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:20 }}>
            {[
              { icon:"🏢", title:"Company Entry",
                headline:"Incorporated in India. Done properly.",
                desc:"Private limited company, wholly owned subsidiary, branch office, or LLP — we advise on the right structure for your model, then handle every filing from MCA to RBI.",
                link:"seo_sub", cta:"Subsidiary setup guide →" },
              { icon:"🌐", title:"International Tax",
                headline:"No surprises. No penalties.",
                desc:"Transfer pricing documentation, DTAA planning, PE risk assessment, and FEMA compliance — built into your structure from day one, not bolted on after.",
                link:"seo_tp", cta:"Transfer pricing guide →" },
              { icon:"🏗️", title:"GCC & Captive Centres",
                headline:"Your India capability centre, built right.",
                desc:"Full advisory for Global Capability Centres — entity, HR compliance, ESOP design, cost-plus pricing, and a compliance retainer that scales with your headcount.",
                link:"gcc", cta:"GCC advisory →" },
              { icon:"📋", title:"Post-Incorporation Compliance",
                headline:"Stay compliant. Zero penalties.",
                desc:"Monthly GST, TDS, payroll, quarterly advance tax, annual audit, ITR, and FLA Return — all handled on a fixed-fee retainer so your team focuses on the business.",
                link:"gcc", cta:"Compliance retainer →" },
              { icon:"🌏", title:"NRI & Startup Advisory",
                headline:"Complex structures. Handled properly.",
                desc:"NRI investing or returning to India, Indian startups raising foreign rounds — Schedule 4 FEMA, CCPS structuring, angel tax, DPIIT recognition, FCGPR filing.",
                link:"seo_nri", cta:"NRI & startup guide →" },
              { icon:"🗺️", title:"India Market Entry Advisory",
                headline:"Strategy before paperwork.",
                desc:"Structure design, FDI route, DTAA planning, PE risk assessment — the decisions that must be made before the first filing. We design the full picture first.",
                link:"seo_entry", cta:"Market entry advisory →" },
            ].map(s => (
              <div key={s.title} className="card-lift" style={{
                background:"#fff", border:`1px solid ${T.bdr}`,
                borderRadius:18, padding:"34px 30px", display:"flex", flexDirection:"column", textAlign:"left",
              }}>
                <div style={{ fontSize:32, marginBottom:16 }}>{s.icon}</div>
                <div style={{ fontSize:9.5, letterSpacing:2.5, textTransform:"uppercase",
                  color:T.s, fontWeight:600, marginBottom:10 }}>{s.title}</div>
                <h3 className="font-display" style={{ fontSize:22, fontWeight:600,
                  color:T.ch, lineHeight:1.25, marginBottom:14 }}>{s.headline}</h3>
                <p style={{ fontSize:13.5, color:T.mid, lineHeight:1.78, fontWeight:300,
                  flex:1, marginBottom:22 }}>{s.desc}</p>
                <button onClick={() => { window.location.href = ROUTES[s.link] || "/"; }} style={{
                  background:"none", border:"none", cursor:"pointer", padding:0,
                  fontSize:13, fontWeight:600, color:T.f,
                  fontFamily:"'DM Sans',sans-serif", textAlign:"left",
                  display:"flex", alignItems:"center", gap:4,
                  transition:"gap .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.gap="8px"}
                onMouseLeave={e => e.currentTarget.style.gap="4px"}>
                  {s.cta}
                </button>
              </div>
            ))}
          </div>

          {/* "Most companies get it wrong" callout */}
          <div className="reveal quote-callout" style={{
            background:`linear-gradient(135deg,${T.f} 0%,${T.f3} 100%)`,
            borderRadius:18, padding:"38px 44px",
            display:"grid", gridTemplateColumns:"1fr auto", gap:32, alignItems:"center",
          }}>
            <div>
              <p style={{ fontSize:19, color:"rgba(255,255,255,.95)", lineHeight:1.65,
                fontWeight:400, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", textAlign:"left" }}>
                "Most foreign companies enter India with the wrong structure and fix it at audit time.
                We design it right the first time — saving you 2–3× the cost in corrections."
              </p>
              <p style={{ fontSize:12.5, color:"rgba(255,255,255,.4)", marginTop:12, textAlign:"left" }}>
                — Pankaj Gupta, FCA · Diploma in International Taxation · 8 yrs KPMG Int'l Tax
              </p>
            </div>
            <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => { window.location.href = ROUTES["contact"] || "/"; }}>
              Talk to a CA →
            </button>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding:"108px 56px", background:T.stone }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="reveal process-grid" style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:72, alignItems:"start" }}>
            <div className="process-sticky" style={{ position:"sticky", top:100, textAlign:"left" }}>
              <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
                color:T.s, fontWeight:600, marginBottom:14 }}>The Process</div>
              <h2 className="font-display" style={{ fontSize:"clamp(32px,3.5vw,48px)",
                fontWeight:600, lineHeight:1.08, color:T.ch, marginBottom:18 }}>
                What happens after you contact us.
              </h2>
              <p style={{ fontSize:15, color:T.mid, lineHeight:1.82, fontWeight:300, marginBottom:28 }}>
                No black box. You know exactly what we're doing, when, and why. Most companies are operational within 30 days of first contact.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  "Free 30-min strategy call",
                  "No retainer to start",
                  "One point of contact",
                  "Fixed, transparent fees",
                ].map(item => (
                  <div key={item} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ width:20, height:20, background:T.f, borderRadius:"50%",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#fff", fontSize:11, flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:13.5, color:T.mid }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {process.map((step, i) => (
                <div key={step.n} style={{
                  display:"grid", gridTemplateColumns:"64px 1fr",
                  gap:24, paddingBottom: i < process.length-1 ? 0 : 0,
                  position:"relative",
                }}>
                  {/* Line connector */}
                  {i < process.length-1 && (
                    <div style={{ position:"absolute", left:31, top:60, bottom:-1,
                      width:2, background:`linear-gradient(${T.bdr},transparent)` }}/>
                  )}

                  {/* Step number bubble */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:4 }}>
                    <div style={{ width:48, height:48, background:T.f, borderRadius:"50%",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexShrink:0, boxShadow:`0 0 0 6px ${T.stone}` }}>
                      <span className="font-display" style={{ fontSize:15, fontWeight:700, color:"#fff" }}>{step.n}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ paddingBottom:40, textAlign:"left" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                      <h3 style={{ fontSize:16.5, fontWeight:600, color:T.ch }}>{step.title}</h3>
                      <span style={{ fontSize:11, background:T.s, color:"#fff",
                        padding:"2px 10px", borderRadius:50, fontWeight:600,
                        letterSpacing:.3 }}>{step.time}</span>
                    </div>
                    <p style={{ fontSize:14, color:T.mid, lineHeight:1.78, fontWeight:300, textAlign:"left" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CASE STUDIES ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"108px 56px", background:T.ivory }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="reveal" style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
              color:T.s, fontWeight:600, marginBottom:14 }}>Client Stories</div>
            <h2 className="font-display" style={{ fontSize:"clamp(32px,3.5vw,50px)",
              fontWeight:600, lineHeight:1.08, color:T.ch }}>
              What our clients actually{" "}
              <span style={{ fontStyle:"italic", color:T.f }}>got done.</span>
            </h2>
            <p style={{ fontSize:15, color:T.mid, marginTop:14, fontWeight:300 }}>
              Anonymous to protect client confidentiality. All outcomes verified.
            </p>
          </div>

          <div className="stagger cases-grid" style={{ display:"grid",
            gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
            {cases.map(c => (
              <div key={c.headline} className="card-lift" style={{
                background:"#fff", border:`1px solid ${T.bdr}`,
                borderRadius:18, padding:"32px 30px", textAlign:"left",
                display:"flex", flexDirection:"column",
              }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center",
                  justifyContent:"space-between", marginBottom:18 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:26 }}>{c.flag}</span>
                    <div style={{ fontSize:11.5, fontWeight:600, color:T.mid,
                      letterSpacing:.3, lineHeight:1.4 }}>{c.region}</div>
                  </div>
                  <div style={{ background:T.f, color:"#fff", padding:"4px 12px",
                    borderRadius:50, fontSize:11, fontWeight:700, whiteSpace:"nowrap",
                    flexShrink:0 }}>
                    ⚡ {c.timeline}
                  </div>
                </div>

                {/* Headline */}
                <h3 className="font-display" style={{ fontSize:19, fontWeight:600,
                  color:T.ch, lineHeight:1.3, marginBottom:14 }}>{c.headline}</h3>

                {/* Challenge */}
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase",
                    color:T.lt, fontWeight:600, marginBottom:5 }}>The challenge</div>
                  <p style={{ fontSize:13, color:T.mid, lineHeight:1.72,
                    fontWeight:300 }}>{c.challenge}</p>
                </div>

                {/* Outcome */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase",
                    color:T.lt, fontWeight:600, marginBottom:5 }}>What we delivered</div>
                  <p style={{ fontSize:13, color:T.mid, lineHeight:1.72,
                    fontWeight:300 }}>{c.outcome}</p>
                </div>

                {/* Proof point */}
                <div style={{ background:"#E4F0EB", borderRadius:9, padding:"10px 14px",
                  marginBottom:18, display:"flex", gap:8, alignItems:"flex-start" }}>
                  <span style={{ color:T.f, fontWeight:700, fontSize:13, flexShrink:0 }}>✓</span>
                  <p style={{ fontSize:12.5, color:T.f, lineHeight:1.6,
                    fontWeight:500 }}>{c.proof}</p>
                </div>

                {/* Tags */}
                <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginTop:"auto" }}>
                  {c.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize:11, fontWeight:600, padding:"4px 11px",
                      background:T.stone, borderRadius:50, color:T.ink, letterSpacing:.3,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ════════════════════════════════════════════════════════ */}
      <section style={{ padding:"108px 56px", background:T.stone }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="reveal" style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
              color:T.s, fontWeight:600, marginBottom:14 }}>Industries</div>
            <h2 className="font-display" style={{ fontSize:"clamp(32px,3.5vw,48px)",
              fontWeight:600, lineHeight:1.08, color:T.ch }}>
              Sectors we know{" "}
              <span style={{ fontStyle:"italic", color:T.f }}>deeply.</span>
            </h2>
          </div>

          <div className="stagger industries-grid" style={{ display:"grid",
            gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
            {verticals.map(v => (
              <div key={v.name} className="card-lift" style={{
                background:"#fff", border:`1px solid ${T.bdr}`,
                borderRadius:14, padding:"26px 24px", display:"flex",
                alignItems:"flex-start", gap:16, textAlign:"left",
              }}>
                <span style={{ fontSize:28, flexShrink:0, marginTop:2 }}>{v.icon}</span>
                <div>
                  <div style={{ fontSize:14.5, fontWeight:600, color:T.ch,
                    marginBottom:4 }}>{v.name}</div>
                  <div style={{ fontSize:12, color:T.s, fontWeight:700,
                    marginBottom:5 }}>{v.proof}</div>
                  <div style={{ fontSize:12, color:T.lt, lineHeight:1.6 }}>{v.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GLOBAL REACH — flag grid ══════════════════════════════════════════ */}
      <section style={{ padding:"108px 56px", background:T.ivory }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="reveal" style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
              color:T.s, fontWeight:600, marginBottom:14 }}>Global Reach</div>
            <h2 className="font-display" style={{ fontSize:"clamp(32px,3.5vw,48px)",
              fontWeight:600, lineHeight:1.08, color:T.ch }}>
              Clients from every{" "}
              <span style={{ fontStyle:"italic", color:T.f }}>major market.</span>
            </h2>
          </div>

          <div className="stagger regions-grid" style={{ display:"grid",
            gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:28 }}>
            {regions.map(r => (
              <div key={r.name} className="card-lift" style={{
                background:"#fff", border:`1px solid ${T.bdr}`,
                borderRadius:14, padding:"26px 22px", textAlign:"left",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
                  <span style={{ fontSize:30 }}>{r.flag}</span>
                  <div>
                    <div className="font-display" style={{ fontSize:18, fontWeight:600,
                      color:T.ch, lineHeight:1.2 }}>{r.name}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:T.s, marginTop:2 }}>
                      {r.count} companies
                    </div>
                  </div>
                </div>
                <div style={{ fontSize:12, color:T.mid, lineHeight:1.6 }}>{r.industries}</div>
              </div>
            ))}
          </div>

          {/* DTAA callout */}
          <div className="reveal dtaa-callout" style={{
            background:T.f, borderRadius:16, padding:"34px 40px",
            display:"grid", gridTemplateColumns:"1fr auto", gap:28, alignItems:"center",
          }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
                color:T.sl, fontWeight:600, marginBottom:10 }}>Tax Advantage</div>
              <div className="font-display" style={{ fontSize:22, fontWeight:600,
                color:"#fff", lineHeight:1.25 }}>
                India's DTAA network covers 90+ countries — most companies we onboard are overpaying.
              </div>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,.42)", marginTop:10, lineHeight:1.65 }}>
                Proper treaty planning reduces withholding tax on dividends, royalties, and fees.
                We identify the savings before you commit to a structure.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <button className="ics-btn ics-btn-primary" onClick={() => { window.location.href = ROUTES["tax"] || "/"; }}>
                International Tax →
              </button>
              <button className="ics-btn ics-btn-ghost" onClick={() => { window.location.href = ROUTES["seo_fdi"] || "/"; }}
                style={{ fontSize:12.5, padding:"9px 16px" }}>
                FDI Rules Guide →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"108px 56px", background:T.stone }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="reveal whyus-grid" style={{ display:"grid",
            gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>

            {/* Left — four differentiators */}
            <div>
              <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
                color:T.s, fontWeight:600, marginBottom:14 }}>Why Us</div>
              <h2 className="font-display" style={{ fontSize:"clamp(32px,3.5vw,48px)",
                fontWeight:600, lineHeight:1.08, color:T.ch, marginBottom:32, textAlign:"left" }}>
                Big 4 quality.<br/>
                <span style={{ fontStyle:"italic", color:T.f }}>Without the Big 4 cost.</span>
              </h2>

              <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:36 }}>
                {[
                  {
                    icon: "💷",
                    title: "Big 4 quality without Big 4 cost",
                    desc: "8 years at KPMG International Tax. The same depth of analysis, structured advice, and documentation rigour — at fees that work for mid-market companies.",
                  },
                  {
                    icon: "🔗",
                    title: "One team for legal, tax & compliance",
                    desc: "Legal structure, FDI filings, transfer pricing, GST, payroll, audit — coordinated by one firm. No handoffs between advisors, no gaps in accountability.",
                  },
                  {
                    icon: "🌍",
                    title: "Designed for overseas decision-makers",
                    desc: "We work with CFOs and founders in different time zones. Clear written advice, structured updates, and no assumption you know Indian regulatory language.",
                  },
                  {
                    icon: "📊",
                    title: "Commercial advice, not just filings",
                    desc: "We tell you what structure saves tax, what triggers PE risk, and what your intercompany pricing should look like — before documents are filed, not after.",
                  },
                ].map((pt, i) => (
                  <div key={pt.title} style={{
                    display:"grid", gridTemplateColumns:"44px 1fr", gap:16,
                    padding:"22px 0",
                    borderTop: i === 0 ? `1px solid ${T.bdr}` : "none",
                    borderBottom:`1px solid ${T.bdr}`,
                  }}>
                    <div style={{ fontSize:24, paddingTop:2 }}>{pt.icon}</div>
                    <div>
                      <div style={{ fontSize:14.5, fontWeight:600, color:T.ch,
                        marginBottom:6, lineHeight:1.3 }}>{pt.title}</div>
                      <p style={{ fontSize:13.5, color:T.mid, lineHeight:1.75,
                        fontWeight:300 }}>{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => { window.location.href = ROUTES["contact"] || "/"; }}>
                  Talk to a CA →
                </button>
                <button className="ics-btn ics-btn-outline ics-btn-lg" onClick={() => { window.location.href = ROUTES["about"] || "/"; }}>
                  About Us
                </button>
              </div>
            </div>

            {/* Right — credential stat cards */}
            <div className="credentials-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { n:"8+", label:"Years at KPMG Int'l Tax", sub:"Lead advisor background" },
                { n:"100+", label:"Companies incorporated", sub:"Foreign & domestic clients" },
                { n:"0", label:"Transfer pricing audits lost", sub:"Across all client engagements" },
                { n:"FCA", label:"+ Diploma Int'l Tax", sub:"ICAI qualified, both credentials" },
              ].map(({ n, label, sub }) => (
                <div key={label} style={{
                  background:"#fff", border:`1px solid ${T.bdr}`,
                  borderRadius:14, padding:"26px 22px",
                }}>
                  <div className="font-display" style={{ fontSize:36, fontWeight:700,
                    color:T.f, lineHeight:1, marginBottom:10 }}>{n}</div>
                  <div style={{ fontSize:13.5, fontWeight:600, color:T.ch, marginBottom:5 }}>{label}</div>
                  <div style={{ fontSize:12, color:T.lt }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PGA KNOWLEDGE PARTNER ═════════════════════════════════════════════ */}
      <section style={{ padding:"70px 56px", background:"#06100D" }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="reveal pga-grid" style={{ display:"grid",
            gridTemplateColumns:"1fr auto", gap:40, alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:28, flexWrap:"wrap" }}>
              <div style={{ width:56, height:56, background:"rgba(255,255,255,.06)",
                borderRadius:14, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:26, flexShrink:0 }}>⚖️</div>
              <div>
                <div style={{ fontSize:10, letterSpacing:2.5, textTransform:"uppercase",
                  color:"rgba(255,255,255,.3)", marginBottom:6 }}>Knowledge Partner</div>
                <div style={{ fontSize:18, fontWeight:600, color:"#fff",
                  fontFamily:"'Cormorant Garamond',serif" }}>
                  PGA & Co. Chartered Accountants, Chandigarh
                </div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,.35)", marginTop:4 }}>
                  GST advisory · NRI/HNI tax · Domestic audit & assurance · Transfer pricing
                </div>
              </div>
            </div>
            <a href="https://pgaca.in" target="_blank" rel="noopener noreferrer"
              className="ics-btn" style={{
                background:"rgba(255,255,255,.07)", color:"rgba(255,255,255,.7)",
                border:"1px solid rgba(255,255,255,.12)", borderRadius:8,
                fontSize:13, fontWeight:500, whiteSpace:"nowrap",
              }}>
              Visit pgaca.in →
            </a>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════════════ */}
      <section style={{ background:T.f, padding:"108px 56px",
        textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse 50% 70% at 50% 0%,rgba(232,144,10,.09) 0%,transparent 60%)" }}/>
        <div className="reveal" style={{ maxWidth:620, margin:"0 auto", position:"relative" }}>
          <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
            color:T.sl, fontWeight:600, marginBottom:18 }}>Get Started</div>
          <h2 className="font-display" style={{ fontSize:"clamp(36px,4.5vw,58px)",
            fontWeight:600, color:"#fff", lineHeight:1.04, marginBottom:18 }}>
            Ready to enter India<br/>
            <span style={{ fontStyle:"italic", color:T.sl }}>the right way?</span>
          </h2>
          <p style={{ fontSize:16, color:"rgba(255,255,255,.4)", lineHeight:1.82,
            fontWeight:300, marginBottom:38 }}>
            Book a free 30-minute consultation. We'll review your India objectives
            and give you a clear structure recommendation — no commitment, no jargon.
          </p>
          {/* SEO resource links */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:9, marginBottom:22 }}>
            {[
              { label:"Foreign company registration →", page:"seo_fcri" },
              { label:"Subsidiary company setup →", page:"seo_sub" },
              { label:"Transfer pricing guide →", page:"seo_tp" },
              { label:"FDI rules India →", page:"seo_fdi" },
            ].map(l => (
              <button key={l.label} onClick={() => { window.location.href = ROUTES[l.page] || "/"; }} style={{
                background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.14)",
                color:"rgba(255,255,255,.65)", padding:"6px 13px", borderRadius:50,
                fontSize:12, fontWeight:500, cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", transition:"all .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.13)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.07)"; e.currentTarget.style.color="rgba(255,255,255,.65)"; }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", gap:14, justifyContent:"center",
            flexWrap:"wrap", marginBottom:28 }}>
            <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => { window.location.href = ROUTES["contact"] || "/"; }}>
              Book Free Consultation →
            </button>
            <a href="tel:+919915731447" className="ics-btn ics-btn-ghost ics-btn-lg">
              +91 99157 31447
            </a>
          </div>
          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
            {["No retainer to start", "Senior CA responds within 24 hrs", "Fixed transparent fees"].map(t => (
              <span key={t} style={{ fontSize:12, color:"rgba(255,255,255,.3)",
                display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ color:T.sl }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}



// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
