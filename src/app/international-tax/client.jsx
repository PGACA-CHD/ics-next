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
    const services = [
    { icon: "📋", title: "DTAA Planning", badge: "Core Service", desc: "India has DTAAs with 90+ countries. Applied correctly, DTAA reduces withholding tax on dividends from 20% to 0–15%, and on royalties from 10% to 10% or below. We ensure the correct rate is applied to every cross-border payment.", points: ["DTAA eligibility assessment", "Tax Residency Certificate (TRC) advice", "Principal Purpose Test (BEPS Action 6)", "Withholding tax optimisation"] },
    { icon: "⚖️", title: "Transfer Pricing", badge: "Core Service", desc: "India's TP enforcement is among the world's most aggressive. All intercompany transactions must be at arm's length, documented annually. We design the TP model before incorporation and maintain it every year.", points: ["Intercompany pricing model design", "MSA and agreement drafting", "Annual benchmarking study", "Form 3CEB filing + APA advisory"] },
    { icon: "💸", title: "Withholding Tax", badge: null, desc: "Every payment from India to a foreign company is subject to TDS. DTAA rates are often significantly lower than domestic law. We ensure the correct rate is applied and all TDS returns are filed.", points: ["TDS rate analysis — domestic vs DTAA", "Form 27Q quarterly returns", "Section 197 lower TDS certificates", "Form 15CA/15CB for all payments"] },
    { icon: "🛡️", title: "PE Risk Management", badge: null, desc: "A PE triggers 40% tax on the parent's India-attributable profits. PE risk is subtle and often missed — until the audit notice arrives. We assess and manage PE risk from day one.", points: ["PE risk assessment", "Agency PE and Service PE analysis", "PE management plan", "Operational safeguards"] },
    { icon: "🏦", title: "FEMA Compliance", badge: null, desc: "FEMA violations attract penalties up to 3× the transaction value. We manage all FEMA filings as part of every ongoing engagement — FCGPR, FCTRS, FLA, ECB, and compounding.", points: ["FCGPR within 30 days of FDI", "Annual FLA return — 15 July", "Form 15CA/15CB for foreign payments", "ECB structuring and reporting"] },
    { icon: "🔗", title: "Cross-border Restructuring", badge: null, desc: "Converting a liaison office to a subsidiary, moving IP, consolidating group entities — cross-border restructuring in India triggers multiple tax events that must be planned carefully.", points: ["LO/Branch to subsidiary conversion", "IP migration tax planning", "M&A due diligence — India tax", "Exit planning and winding up"] },
  ];

  const dtaaRates = [
    { flag: "🇮🇳", country: "India (domestic law)", div: "20%", roy: "10%", fts: "10%", int: "20%", highlight: false },
    { flag: "🇺🇸", country: "United States", div: "15–25%", roy: "10–15%", fts: "10–15%", int: "10–15%", highlight: false },
    { flag: "🇬🇧", country: "United Kingdom", div: "15%", roy: "10–15%", fts: "10%", int: "10–15%", highlight: false },
    { flag: "🇦🇪", country: "UAE", div: "10%", roy: "10%", fts: "Nil–10%", int: "Nil–12.5%", highlight: true },
    { flag: "🇸🇬", country: "Singapore", div: "10–15%", roy: "10%", fts: "10%", int: "10–15%", highlight: false },
    { flag: "🇦🇺", country: "Australia", div: "15%", roy: "10–15%", fts: "10–15%", int: "15%", highlight: false },
    { flag: "🇩🇪", country: "Germany", div: "10–15%", roy: "10%", fts: "10%", int: "10%", highlight: false },
    { flag: "🇯🇵", country: "Japan", div: "10%", roy: "10%", fts: "10%", int: "10%", highlight: true },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: T.f, padding: "120px 56px 88px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 45% 70% at 90% 50%, rgba(232,144,10,.08) 0%,transparent 55%)` }}/>
        <div className="about-hero-grid inner-page-layout" style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 380px", gap: 80, alignItems: "center" }}>
          <div className="reveal">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,144,10,.13)", border: "1px solid rgba(232,144,10,.28)", color: T.sl, padding: "5px 14px", borderRadius: 50, fontSize: 10.5, fontWeight: 600, letterSpacing: ".7px", textTransform: "uppercase", marginBottom: 22 }}>
              Advisory Service
            </div>
            <h1 className="font-display" style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 600, color: "#fff", lineHeight: 1.05, marginBottom: 18 }}>
              International Tax<br/>Advisory for <span style={{ fontStyle: "italic", color: T.sl, fontWeight: 400 }}>India</span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.8, maxWidth: 490, fontWeight: 300, marginBottom: 32 }}>
              DTAA structuring, transfer pricing, withholding tax, FEMA compliance, and PE risk management — designed before your India entity opens its doors.
            </p>
            {/* Credential strip */}
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
              {[["🏛️","Ex-KPMG Led Team","18+ years — India incorporations"],["📜","CA, CS & Accountants","Full multidisciplinary team"],["🌍","100+ Companies","Including foreign companies"]].map(([ico,h,s]) => (
                <div key={h} style={{ padding: "13px 18px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", borderRight: "none", display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: "rgba(232,144,10,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{ico}</div>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,.72)" }}>{h}</div>
                    <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.32)" }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
            <div style={{ position: "absolute" }}/>
            <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: T.ch, marginBottom: 5 }}>Book a Tax Consultation</h3>
            <p style={{ fontSize: 12.5, color: T.lt, marginBottom: 14, lineHeight: 1.5 }}>CA, CS & accountant team. Response within 24 hours.</p>
            <div style={{ background:T.stone, borderRadius:9, padding:"12px 14px", marginBottom:18, border:`1px solid ${T.bdr}` }}>
              <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase", color:T.f, fontWeight:700, marginBottom:8 }}>After the call you receive</div>
              {[["Tax structure memo","Your DTAA position, PE risk & WHT rates documented"],["TP guidance","Recommended pricing methodology for your model"],["Action list","Exact next steps with owner and timeline"]].map(([t,d])=>(
                <div key={t} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                  <span style={{ color:T.s, fontWeight:700, flexShrink:0, fontSize:11 }}>✓</span>
                  <span style={{ fontSize:11.5, color:T.mid, lineHeight:1.5 }}><strong style={{ color:T.ch }}>{t}</strong> — {d}</span>
                </div>
              ))}
            </div>
            {(() => {
              const [tf, setTf] = React.useState({ name:"", email:"", company:"", concern:"" });
              const [ts, setTs] = React.useState("idle");
              const inpStyle = { width:"100%", padding:"10px 13px", border:`1px solid ${T.bdr}`, borderRadius:6,
                fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ch, background:T.ivory,
                outline:"none", marginBottom:10, boxSizing:"border-box" };
              const handleTaxSubmit = async () => {
                if (!tf.name.trim() || !tf.email.trim()) { setTs("error"); return; }
                setTs("submitting");
                try {
                  const parts = tf.name.trim().split(" ");
                  await submitToZoho({
                    firstName: parts[0], lastName: parts.slice(1).join(" ") || "-",
                    email: tf.email, mobile: "", company: tf.company, country: "",
                    service: tf.concern || "International Tax Advisory",
                    description: `Tax concern: ${tf.concern}`, source: "TaxPage Form"
                  });
                  setTs("success");
                  trackConsultationRequest("Tax Page Form");
                } catch { setTs("error"); }
              };
              if (ts === "success") return (
                <div style={{ textAlign:"center", padding:"20px 0" }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>✓</div>
                  <div style={{ fontSize:14, fontWeight:600, color:T.ch, marginBottom:6 }}>Request received</div>
                  <p style={{ fontSize:13, color:T.mid }}>Our CA team responds within 24 hours.</p>
                  <button className="ics-btn ics-btn-primary" style={{ marginTop:14 }} onClick={() => router.push(ROUTES["contact"] || "/")}>Book a slot →</button>
                </div>
              );
              return (<>
                {ts === "error" && <div style={{ background:"#FEF2F2", border:"1px solid #FCA5A5", borderRadius:7, padding:"9px 14px", marginBottom:10, fontSize:12.5, color:"#C0392B" }}>Please enter your name and email.</div>}
                <input placeholder="Full name & title" value={tf.name} onChange={e=>setTf(p=>({...p,name:e.target.value}))}
                  style={inpStyle} onFocus={e=>e.target.style.borderColor=T.f} onBlur={e=>e.target.style.borderColor=T.bdr}/>
                <input placeholder="Work email" value={tf.email} onChange={e=>setTf(p=>({...p,email:e.target.value}))}
                  style={inpStyle} onFocus={e=>e.target.style.borderColor=T.f} onBlur={e=>e.target.style.borderColor=T.bdr}/>
                <input placeholder="Company & HQ country" value={tf.company} onChange={e=>setTf(p=>({...p,company:e.target.value}))}
                  style={inpStyle} onFocus={e=>e.target.style.borderColor=T.f} onBlur={e=>e.target.style.borderColor=T.bdr}/>
                <select value={tf.concern} onChange={e=>setTf(p=>({...p,concern:e.target.value}))}
                  style={{ ...inpStyle, marginBottom:14, appearance:"none" }}>
                  <option value="">Primary tax concern...</option>
                  <option>DTAA / double taxation planning</option>
                  <option>Transfer pricing — GCC or subsidiary</option>
                  <option>Withholding tax on dividends / royalties</option>
                  <option>Permanent establishment risk</option>
                  <option>FEMA / foreign exchange compliance</option>
                </select>
                <button className="ics-btn ics-btn-primary" onClick={handleTaxSubmit}
                  disabled={ts==="submitting"} style={{ width:"100%", justifyContent:"center", padding:13, opacity:ts==="submitting"?0.7:1 }}>
                  {ts === "submitting" ? "Sending…" : "Request Tax Consultation →"}
                </button>
              </>);
            })()}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding: "88px 56px", background: T.ivory }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="reveal" style={{ maxWidth: 560, marginBottom: 52 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 13 }}>Our Services</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 600, color: T.ch, lineHeight: 1.1 }}>
              International tax services for<br/><span style={{ fontStyle: "italic", color: T.f }}>foreign companies in India</span>
            </h2>
          </div>
          <div className="stagger inner-service-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {services.map(svc => (
              <div key={svc.title} className="card-lift" style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 14, padding: "30px 26px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: svc.badge ? T.f : T.bdr }}/>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: svc.badge ? T.f : "#E4F0EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{svc.icon}</div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 21, fontWeight: 600, color: T.ch, lineHeight: 1.2 }}>{svc.title}</h3>
                    {svc.badge && <span style={{ background: "#E4F0EB", color: T.f, padding: "2px 9px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{svc.badge}</span>}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.7, marginBottom: 16 }}>{svc.desc}</p>
                <div style={{ borderTop: `1px solid ${T.bdr}`, paddingTop: 14 }}>
                  {svc.points.map(pt => (
                    <div key={pt} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: T.mid, marginBottom: 7 }}>
                      <span style={{ color: T.s, fontWeight: 700 }}>›</span> {pt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* ── SEO Resource Links ── */}
      <section style={{ padding:"0 56px 56px", background:T.stone }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <div style={{ background:"#fff", borderRadius:14, padding:"24px 28px", border:`1px solid ${T.bdr}` }}>
            <div style={{ fontSize:10, letterSpacing:2.5, textTransform:"uppercase", color:T.s, fontWeight:600, marginBottom:12 }}>Detailed Guides</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {[
                { label:"Transfer pricing in India — complete guide →", page:"seo_tp" },
                { label:"FDI rules & FEMA compliance →", page:"seo_fdi" },
                { label:"Foreign company registration →", page:"seo_fcri" },
              ].map(l => (
                <button key={l.label} onClick={() => setPage(l.page)} style={{
                  background:T.stone, border:`1px solid ${T.bdr}`, color:T.f,
                  padding:"8px 14px", borderRadius:50, fontSize:12.5, fontWeight:600,
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background=T.f; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background=T.stone; e.currentTarget.style.color=T.f; }}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* DTAA Table */}
      <section style={{ padding: "88px 56px", background: T.stone }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="reveal" style={{ maxWidth: 560, marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 13 }}>DTAA Quick Reference</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 12 }}>
              India DTAA withholding rates —<br/>key <span style={{ fontStyle: "italic", color: T.f }}>treaty countries</span>
            </h2>
            <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.8, fontWeight: 300 }}>India's domestic rates: 20% dividends, 10% royalties, 10% FTS, 20% interest. DTAA rates are almost always lower — often significantly.</p>
          </div>
          <div className="reveal" style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ background: T.f, display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr", padding: "13px 20px" }}>
              {["Country","Dividends","Royalties","FTS","Interest"].map((h,i) => (
                <div key={h} style={{ fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: i===0 ? "rgba(255,255,255,.5)" : "#fff", textAlign: i===0 ? "left" : "center" }}>{h}</div>
              ))}
            </div>
            {dtaaRates.map((row, i) => (
              <div key={row.country} style={{
                display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1fr",
                padding: "12px 20px", borderBottom: i < dtaaRates.length-1 ? `1px solid ${T.bdr}` : "none",
                background: i===0 ? T.stone : (row.highlight ? "#F8FDF9" : "#fff"),
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: T.ch }}>
                  <span style={{ fontSize: 16 }}>{row.flag}</span> {row.country}
                </div>
                {[row.div, row.roy, row.fts, row.int].map((v, j) => (
                  <div key={j} style={{
                    textAlign: "center", fontSize: 13,
                    fontWeight: (row.highlight || i===0) ? 700 : 500,
                    color: i===0 ? "#B8690A" : (row.highlight ? T.f : T.mid),
                  }}>{v}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, background: "#E4F0EB", borderRadius: 10, padding: "12px 18px", fontSize: 12.5, color: T.f, lineHeight: 1.6 }}>
            <strong>Important:</strong> Rates shown are indicative. Actual rates depend on shareholding %, nature of income, beneficial ownership, and Principal Purpose Test. Contact us for a precise analysis for your specific transaction.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: T.ch, padding: "80px 56px", textAlign: "center" }}>
        <div className="reveal" style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontSize: 40, fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            Ready to get your India tax <span style={{ fontStyle: "italic", color: T.sl }}>structure right?</span>
          </h2>
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.42)", lineHeight: 1.8, marginBottom: 28 }}>
            Book a free 30-minute consultation. We'll review your structure, identify key risks and savings, and give you a clear action plan.
          </p>
          <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => router.push(ROUTES["contact"] || "/")}>Book Tax Consultation →</button>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
