'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T, CALENDLY_URL, PHONE_RAW } from '@/lib/config';
import { submitToZoho, trackConsultationRequest, trackCalendlyBooking, trackGuideDownload, trackWhatsApp } from '@/lib/utils';

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


const WASvg = () => (
  <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
    <path d="M13 1C6.373 1 1 6.373 1 13c0 2.278.618 4.41 1.695 6.238L1 25l5.95-1.56A11.94 11.94 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z" fill="#fff"/>
    <path d="M13 3.182c-5.42 0-9.818 4.398-9.818 9.818 0 2.149.694 4.136 1.864 5.758l-1.22 3.597 3.72-1.196a9.76 9.76 0 005.454 1.659c5.42 0 9.818-4.398 9.818-9.818S18.42 3.182 13 3.182zm4.863 13.044c-.202.57-1.188 1.093-1.634 1.12-.41.024-.793.195-2.674-.557-2.25-.9-3.688-3.19-3.8-3.34-.11-.148-.91-1.21-.91-2.31 0-1.098.575-1.638.778-1.858.203-.22.44-.275.587-.275l.42.008c.135.005.316-.051.495.378.184.44.624 1.52.678 1.63.055.11.09.238.017.386-.073.148-.11.24-.22.37l-.33.386c-.11.12-.225.25-.097.49.128.24.572.944 1.228 1.529.844.752 1.556.985 1.776 1.095.22.11.348.092.477-.055.128-.147.55-.641.697-.861.147-.22.293-.184.495-.11.202.073 1.284.606 1.504.716.22.11.367.165.422.256.054.091.054.527-.148 1.097z" fill="#25D366"/>
  </svg>
);

export default function Page() {
  const [f, setF] = useState({
    firstName: "", lastName: "", email: "", mobile: "",
    company: "", country: "", service: "", teamSize: "", timeline: "", description: "",
  });
  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("form"); // "form" | "calendar"
  const set = key => e => setF(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!f.firstName.trim() || !f.email.trim()) { setStatus("error"); return; }
    setStatus("submitting");
    try {
      const desc = [
        f.service     ? `Service: ${f.service}`       : "",
        f.teamSize    ? `Team size: ${f.teamSize}`     : "",
        f.timeline    ? `Timeline: ${f.timeline}`      : "",
        f.description ? `Details: ${f.description}`   : "",
      ].filter(Boolean).join("\n\n");
      await submitToZoho({ ...f, description: desc, source: "Website Contact Form" });
      setStatus("success");
      trackConsultationRequest("Contact Page Form");
    } catch { setStatus("error"); }
  };

  const inp = (extra = {}) => ({
    width: "100%", padding: "11px 14px", border: `1.5px solid ${T.bdr}`, borderRadius: 8,
    fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: T.ch, background: "#fff",
    outline: "none", boxSizing: "border-box", marginBottom: 12, display: "block",
    transition: "border-color .18s", ...extra,
  });

  const WA_URL = "https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20my%20company%20in%20India.";
  const CAL_URL = "https://calendly.com/indiacompanysetup";

  return (
    <div>

      {/* ── HERO ── */}
      <section style={{ background:T.f, padding:"100px 56px 72px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0,
          backgroundImage:`linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`,
          backgroundSize:"64px 64px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse 50% 80% at 95% 50%,rgba(232,144,10,.07) 0%,transparent 55%)" }}/>
        <div style={{ maxWidth:1400, margin:"0 auto", position:"relative", zIndex:2 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7,
            background:"rgba(232,144,10,.13)", border:"1px solid rgba(232,144,10,.28)",
            color:T.sl, padding:"5px 13px", borderRadius:50, fontSize:10.5,
            fontWeight:600, letterSpacing:".6px", textTransform:"uppercase", marginBottom:20 }}>
            Free 30-Min Consultation
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(36px,4vw,58px)", fontWeight:600,
            color:"#fff", lineHeight:1.06, marginBottom:16, maxWidth:680 }}>
            Let's talk about your<br/>
            <span style={{ fontStyle:"italic", color:T.sl }}>India plans.</span>
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.5)", lineHeight:1.82,
            fontWeight:300, maxWidth:520, marginBottom:32 }}>
            Book a slot directly, or fill the form and our senior CA responds within 24 hours.
            No commitment, no jargon, no sales pressure.
          </p>

          {/* Response promise strip */}
          <div style={{ display:"flex", gap:0, flexWrap:"wrap" }}>
            {[
              { icon:"⏱️", text:"Response within 24 hours" },
              { icon:"🔒", text:"Confidential — no spam" },
              { icon:"🎯", text:"Senior CA — not a junior" },
              { icon:"🌍", text:"All time zones welcome" },
            ].map((item, i) => (
              <div key={item.text} style={{
                display:"flex", alignItems:"center", gap:7,
                padding:"8px 20px 8px 0", marginRight:20,
                borderRight: i < 3 ? "1px solid rgba(255,255,255,.1)" : "none",
                marginBottom:8,
              }}>
                <span style={{ fontSize:15 }}>{item.icon}</span>
                <span style={{ fontSize:12.5, color:"rgba(255,255,255,.52)", fontWeight:400 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding:"60px 56px 80px", background:T.stone }}>
        <div style={{ maxWidth:1400, margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr 500px", gap:48, alignItems:"start" }} className="contact-grid">

          {/* ── LEFT COLUMN — info ── */}
          <div>

            {/* What happens next */}
            <div style={{ marginBottom:32 }}>
              <div style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                letterSpacing:1.5, color:T.f, marginBottom:16 }}>What Happens Next</div>
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {[
                  { n:"1", title:"Book or submit a form", desc:"Takes 2 minutes. Choose a calendar slot directly or fill the form below — whichever works best for your time zone." },
                  { n:"2", title:"We confirm within 24 hours", desc:"Our senior CA reviews your submission and sends a short prep note on what to bring to the call." },
                  { n:"3", title:"30-minute consultation", desc:"We review your business, recommend a structure, and give you a clear India entry plan — no charge." },
                  { n:"4", title:"You decide", desc:"No obligation. Most clients engage after the call because the advice is immediately useful." },
                ].map((step, i) => (
                  <div key={step.n} style={{ display:"grid", gridTemplateColumns:"32px 1fr",
                    gap:14, padding:"16px 0",
                    borderTop: i === 0 ? `1px solid ${T.bdr}` : "none",
                    borderBottom:`1px solid ${T.bdr}` }}>
                    <div style={{ width:28, height:28, background:T.f, borderRadius:"50%",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#fff", fontSize:12, fontWeight:700, flexShrink:0, marginTop:2 }}>{step.n}</div>
                    <div>
                      <div style={{ fontSize:13.5, fontWeight:600, color:T.ch, marginBottom:4 }}>{step.title}</div>
                      <p style={{ fontSize:13, color:T.mid, lineHeight:1.65, fontWeight:300 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* India Entry Starter Guide download */}
            <div style={{ background:`linear-gradient(135deg,${T.f} 0%,${T.f3} 100%)`,
              borderRadius:14, padding:"24px 22px", marginBottom:24,
              display:"flex", alignItems:"center", gap:18 }}>
              <div style={{ width:48, height:48, background:"rgba(255,255,255,.1)", borderRadius:10,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:24, flexShrink:0 }}>📋</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, letterSpacing:1.5, textTransform:"uppercase",
                  color:"rgba(255,255,255,.4)", fontWeight:600, marginBottom:4 }}>Free Download</div>
                <div style={{ fontSize:15, fontWeight:600, color:"#fff",
                  marginBottom:4, lineHeight:1.3 }}>India Entry Starter Guide</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", lineHeight:1.5 }}>
                  Entity types · FDI routes · DTAA basics · Compliance calendar.
                  Plain English. 5 pages.
                </div>
              </div>
              <a href="/India-Entry-Starter-Guide.pdf" target="_blank" rel="noopener noreferrer"
                onClick={() => trackGuideDownload()}
                style={{ display:"flex", alignItems:"center", gap:6, background:T.s,
                  color:"#fff", padding:"10px 18px", borderRadius:8, fontSize:13,
                  fontWeight:600, textDecoration:"none", whiteSpace:"nowrap", flexShrink:0 }}>
                Download ↓
              </a>
            </div>

            {/* Direct contact */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                letterSpacing:1.5, color:T.f, marginBottom:14 }}>Direct Contact</div>
              {[
                { ico:"📞", val:"+91 99157 31447", href:"tel:+919915731447", sub:"+91 86998 87200 (alternate)" },
                { ico:"✉️", val:"info@indiacompanysetup.com", href:"mailto:info@indiacompanysetup.com", sub:"Response within 24 hours" },
                { ico:"📍", val:"SCO 18, Top Floor, Sector 20-D", href:"#", sub:"Chandigarh 160020, India" },
              ].map(c => (
                <div key={c.val} style={{ display:"flex", gap:13, alignItems:"flex-start",
                  marginBottom:10, padding:"14px", background:"#fff",
                  border:`1px solid ${T.bdr}`, borderRadius:11 }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:"#E4F0EB",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:16, flexShrink:0 }}>{c.ico}</div>
                  <div>
                    <a href={c.href} style={{ fontSize:13.5, fontWeight:600,
                      color:T.ch, display:"block", textDecoration:"none", marginBottom:2 }}>{c.val}</a>
                    <div style={{ fontSize:11.5, color:T.lt }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>


            {/* PGA knowledge partner */}
            <div style={{ background:T.ch, borderRadius:12, padding:"18px 20px" }}>
              <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase",
                color:T.sl, fontWeight:600, marginBottom:6 }}>Knowledge Partner</div>
              <div className="font-display" style={{ fontSize:16, fontWeight:600,
                color:"#fff", marginBottom:4 }}>PGA & Co. Chartered Accountants</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.38)", marginBottom:10, lineHeight:1.5 }}>
                Indian businesses · NRIs · HNIs · Domestic compliance
              </div>
              <a href="https://pgaca.in" target="_blank" rel="noreferrer"
                style={{ fontSize:12.5, color:T.sl, fontWeight:600, textDecoration:"none" }}>
                Visit pgaca.in →
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN — booking + form ── */}
          <div className="contact-sticky" style={{ position:"sticky", top:90 }}>

            {/* Tab switcher */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
              background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:14,
              padding:6, marginBottom:16, gap:4 }}>
              {[
                { id:"calendar", label:"📅  Book a Slot", sub:"Pick a time instantly" },
                { id:"form",     label:"✉️  Send a Request", sub:"We'll confirm within 24hrs" },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  background: activeTab === tab.id ? T.f : "transparent",
                  border:"none", borderRadius:10, padding:"12px 10px",
                  cursor:"pointer", transition:"background .2s",
                  textAlign:"center",
                }}>
                  <div style={{ fontSize:13, fontWeight:600,
                    color: activeTab === tab.id ? "#fff" : T.mid,
                    fontFamily:"'DM Sans',sans-serif", marginBottom:2 }}>{tab.label}</div>
                  <div style={{ fontSize:11, color: activeTab === tab.id ? "rgba(255,255,255,.55)" : T.lt,
                    fontFamily:"'DM Sans',sans-serif" }}>{tab.sub}</div>
                </button>
              ))}
            </div>

            {/* Calendar panel */}
            {activeTab === "calendar" && (
              <div style={{ background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:20,
                overflow:"hidden", boxShadow:"0 4px 40px rgba(11,61,46,.07)" }}>
                <div style={{ background:T.f, padding:"22px 28px" }}>
                  <h2 className="font-display" style={{ fontSize:22, fontWeight:600,
                    color:"#fff", marginBottom:4 }}>Book a Slot</h2>
                  <p style={{ fontSize:12.5, color:"rgba(255,255,255,.45)", lineHeight:1.5 }}>
                    30-minute consultation · Free · Any time zone
                  </p>
                </div>
                <div style={{ padding:"32px 28px" }}>
                  {/* Calendar embed / redirect */}
                  <div style={{ background:T.stone, borderRadius:12, padding:"28px 24px",
                    textAlign:"center", marginBottom:20 }}>
                    <div style={{ fontSize:44, marginBottom:14 }}>📅</div>
                    <div className="font-display" style={{ fontSize:20, fontWeight:600,
                      color:T.ch, marginBottom:10 }}>
                      Pick a time that works for you
                    </div>
                    <p style={{ fontSize:13, color:T.mid, lineHeight:1.65,
                      marginBottom:20, maxWidth:300, margin:"0 auto 20px" }}>
                      Slots available across IST, EST, GMT, GST, and SGT.
                      Typically available within 2 business days.
                    </p>
                    <a href={CAL_URL} target="_blank" rel="noopener noreferrer"
                      className="ics-btn ics-btn-primary"
                      onClick={() => trackCalendlyBooking()}
                      style={{ display:"inline-flex", fontSize:14, padding:"13px 28px",
                        borderRadius:9, textDecoration:"none", margin:"0 auto" }}>
                      Open Booking Calendar →
                    </a>
                  </div>

                  {/* Alternative: WhatsApp to schedule */}
                  <div style={{ display:"flex", alignItems:"center", gap:10,
                    margin:"16px 0", color:T.lt }}>
                    <div style={{ flex:1, height:1, background:T.bdr }}/>
                    <span style={{ fontSize:12, fontWeight:500 }}>or schedule via WhatsApp</span>
                    <div style={{ flex:1, height:1, background:T.bdr }}/>
                  </div>

                  <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", justifyContent:"center",
                      gap:10, width:"100%", padding:"13px 0",
                      background:"#25D366", color:"#fff", borderRadius:9,
                      fontSize:14, fontWeight:600, textDecoration:"none" }}>
                    <WASvg/> WhatsApp to book a time
                  </a>

                  <p style={{ fontSize:11.5, color:T.lt, textAlign:"center", marginTop:12, lineHeight:1.6 }}>
                    Prefer email? Write to{" "}
                    <a href="mailto:info@indiacompanysetup.com"
                      style={{ color:T.f, fontWeight:600, textDecoration:"none" }}>
                      info@indiacompanysetup.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Form panel */}
            {activeTab === "form" && (
              <div style={{ background:"#fff", border:`1px solid ${T.bdr}`, borderRadius:20,
                overflow:"hidden", boxShadow:"0 4px 40px rgba(11,61,46,.07)" }}>

                <div style={{ background:T.f, padding:"22px 28px" }}>
                  <h2 className="font-display" style={{ fontSize:22, fontWeight:600,
                    color:"#fff", marginBottom:4 }}>Request a Consultation</h2>
                  <p style={{ fontSize:12.5, color:"rgba(255,255,255,.45)", lineHeight:1.5, marginBottom:14 }}>
                    CA, CS & accountant team · Confidential · Response within 24 hrs
                  </p>
                  <div style={{ background:"rgba(255,255,255,.08)", borderRadius:9, padding:"12px 14px" }}>
                    <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase", color:"rgba(255,255,255,.5)", fontWeight:700, marginBottom:8 }}>After the call you receive</div>
                    {[["Structure recommendation","Right entity, FDI route & tax setup for your model"],["Written summary","Short memo you can share with your legal/finance team"],["Clear next steps","Timeline, documents needed, and fixed-fee quote"]].map(([t,d])=>(
                      <div key={t} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                        <span style={{ color:T.sl, fontWeight:700, flexShrink:0, fontSize:11 }}>✓</span>
                        <span style={{ fontSize:11.5, color:"rgba(255,255,255,.65)", lineHeight:1.5 }}><strong style={{ color:"rgba(255,255,255,.88)" }}>{t}</strong> — {d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding:"24px 28px" }}>
                  {status === "success" ? (
                    <div style={{ textAlign:"center", padding:"28px 0 20px" }}>
                      <div style={{ fontSize:52, marginBottom:16 }}>🎉</div>
                      <h3 className="font-display" style={{ fontSize:24, fontWeight:600,
                        color:T.f, marginBottom:10 }}>We'll be in touch!</h3>
                      <p style={{ fontSize:13.5, color:T.mid, lineHeight:1.7,
                        marginBottom:24, maxWidth:320, margin:"0 auto 24px" }}>
                        Our senior CA will respond within 24 hours to confirm your consultation slot.
                      </p>
                      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                        <a href={CAL_URL} target="_blank" rel="noopener noreferrer"
                          style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
                            gap:8, background:T.f, color:"#fff", padding:"13px 24px",
                            borderRadius:9, fontSize:14, fontWeight:600, textDecoration:"none" }}>
                          📅 Book a slot now
                        </a>
                        <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                          style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
                            gap:8, background:"#25D366", color:"#fff", padding:"13px 24px",
                            borderRadius:9, fontSize:14, fontWeight:600, textDecoration:"none" }}>
                          <WASvg/> Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* YOUR DETAILS */}
                      <div style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                        letterSpacing:1.5, color:T.lt, marginBottom:12 }}>Your Details</div>

                      <div className="form-pair" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                        <input placeholder="First name *" type="text"
                          value={f.firstName} onChange={set("firstName")}
                          style={inp({ borderColor: status==="error" && !f.firstName.trim() ? "#E74C3C" : T.bdr })}
                          onFocus={e => e.target.style.borderColor=T.f}
                          onBlur={e => e.target.style.borderColor=(status==="error"&&!f.firstName.trim())?"#E74C3C":T.bdr}
                        />
                        <input placeholder="Last name" type="text"
                          value={f.lastName} onChange={set("lastName")}
                          style={inp()}
                          onFocus={e => e.target.style.borderColor=T.f}
                          onBlur={e => e.target.style.borderColor=T.bdr}
                        />
                      </div>

                      <input placeholder="Work email address *" type="email"
                        value={f.email} onChange={set("email")}
                        style={inp({ borderColor: status==="error" && !f.email.trim() ? "#E74C3C" : T.bdr })}
                        onFocus={e => e.target.style.borderColor=T.f}
                        onBlur={e => e.target.style.borderColor=(status==="error"&&!f.email.trim())?"#E74C3C":T.bdr}
                      />

                      <input placeholder="Mobile / WhatsApp (with country code)" type="tel"
                        value={f.mobile} onChange={set("mobile")}
                        style={inp()}
                        onFocus={e => e.target.style.borderColor=T.f}
                        onBlur={e => e.target.style.borderColor=T.bdr}
                      />

                      {/* COMPANY DETAILS */}
                      <div style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                        letterSpacing:1.5, color:T.lt, marginBottom:12, marginTop:4 }}>Company Details</div>

                      <div className="form-pair" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                        <input placeholder="Company name" type="text"
                          value={f.company} onChange={set("company")}
                          style={inp()}
                          onFocus={e => e.target.style.borderColor=T.f}
                          onBlur={e => e.target.style.borderColor=T.bdr}
                        />
                        <input placeholder="Country of HQ" type="text"
                          value={f.country} onChange={set("country")}
                          style={inp()}
                          onFocus={e => e.target.style.borderColor=T.f}
                          onBlur={e => e.target.style.borderColor=T.bdr}
                        />
                      </div>

                      {/* REQUIREMENTS */}
                      <div style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                        letterSpacing:1.5, color:T.lt, marginBottom:12, marginTop:4 }}>Your Requirements</div>

                      <div style={{ position:"relative", marginBottom:12 }}>
                        <select value={f.service} onChange={set("service")}
                          style={inp({ marginBottom:0, paddingRight:36, cursor:"pointer" })}>
                          <option value="">Primary need...</option>
                          <option>Foreign Company Incorporation</option>
                          <option>GCC / Captive Centre Setup</option>
                          <option>International Tax / DTAA Planning</option>
                          <option>Transfer Pricing Documentation</option>
                          <option>FEMA Compliance</option>
                          <option>Ongoing Compliance Retainer</option>
                          <option>General advisory / Not sure yet</option>
                        </select>
                        <span style={{ position:"absolute", right:14, top:"50%",
                          transform:"translateY(-50%)", color:T.lt, pointerEvents:"none", fontSize:10 }}>▼</span>
                      </div>

                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                        <div style={{ position:"relative" }}>
                          <select value={f.teamSize} onChange={set("teamSize")}
                            style={inp({ marginBottom:0, paddingRight:36, cursor:"pointer" })}>
                            <option value="">India team size...</option>
                            <option>1–5 people</option>
                            <option>6–20 people</option>
                            <option>21–100 people</option>
                            <option>100+ people</option>
                            <option>Not sure yet</option>
                          </select>
                          <span style={{ position:"absolute", right:14, top:"50%",
                            transform:"translateY(-50%)", color:T.lt, pointerEvents:"none", fontSize:10 }}>▼</span>
                        </div>
                        <div style={{ position:"relative" }}>
                          <select value={f.timeline} onChange={set("timeline")}
                            style={inp({ marginBottom:0, paddingRight:36, cursor:"pointer" })}>
                            <option value="">Timeline...</option>
                            <option>ASAP (within 30 days)</option>
                            <option>1–3 months</option>
                            <option>3–6 months</option>
                            <option>Exploratory / planning</option>
                          </select>
                          <span style={{ position:"absolute", right:14, top:"50%",
                            transform:"translateY(-50%)", color:T.lt, pointerEvents:"none", fontSize:10 }}>▼</span>
                        </div>
                      </div>

                      <textarea placeholder="Anything else we should know? (optional)"
                        rows={2} value={f.description} onChange={set("description")}
                        style={{ ...inp(), resize:"vertical", marginTop:2 }}
                        onFocus={e => e.target.style.borderColor=T.f}
                        onBlur={e => e.target.style.borderColor=T.bdr}
                      />

                      {status === "error" && (
                        <div style={{ background:"#FFF0F0", border:"1px solid #FFCCCC",
                          borderRadius:8, padding:"10px 14px", marginBottom:12,
                          fontSize:13, color:"#C0392B" }}>
                          Please enter your first name and email address.
                        </div>
                      )}

                      <button onClick={handleSubmit} disabled={status==="submitting"}
                        className="ics-btn ics-btn-primary"
                        style={{ width:"100%", justifyContent:"center", padding:"14px 0",
                          fontSize:14.5, marginTop:4, borderRadius:9,
                          opacity:status==="submitting"?0.7:1,
                          cursor:status==="submitting"?"wait":"pointer" }}>
                        {status === "submitting" ? "Sending…" : "Request Free Consultation →"}
                      </button>

                      <div style={{ display:"flex", alignItems:"center", gap:10, margin:"14px 0", color:T.lt }}>
                        <div style={{ flex:1, height:1, background:T.bdr }}/>
                        <span style={{ fontSize:12, fontWeight:500 }}>or</span>
                        <div style={{ flex:1, height:1, background:T.bdr }}/>
                      </div>

                      <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                        style={{ display:"flex", alignItems:"center", justifyContent:"center",
                          gap:10, width:"100%", padding:"13px 0",
                          background:"#25D366", color:"#fff", borderRadius:9,
                          fontSize:14.5, fontWeight:600, textDecoration:"none" }}>
                        <WASvg/> Chat on WhatsApp
                      </a>

                      <div style={{ display:"flex", justifyContent:"center", gap:16,
                        marginTop:12, flexWrap:"wrap" }}>
                        {["Confidential", "No spam", "24hr response", "Senior CA"].map(t => (
                          <span key={t} style={{ fontSize:11.5, color:T.lt,
                            display:"flex", alignItems:"center", gap:4 }}>
                            <span style={{ color:"#22c55e" }}>✓</span> {t}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}



// ─── KNOWLEDGE HUB PAGE ───────────────────────────────────────────────────────
const SPACE_ID = 'qjo3cpray5h2' || "qjo3cpray5h2";
const CF_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN || 'Me3wAoh5C8R-voHvn3buH1R3nWLM9f4QrT6jKVaWDtY' || "Me3wAoh5C8R-voHvn3buH1R3nWLM9f4QrT6jKVaWDtY";
const CF_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries`;

// ── Rich text renderer (handles Contentful document nodes) ──
function renderRichText(node) {
  if (!node) return null;
  if (node.nodeType === "document") {
    return <div style={{ textAlign: "left" }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</div>;
  }
  if (node.nodeType === "paragraph") {
    return <p key={Math.random()} style={{ fontSize: 16, color: "#3C3C32", lineHeight: 1.9, marginBottom: 22, textAlign: "left" }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</p>;
  }
  if (node.nodeType === "heading-2") {
    return <h2 key={Math.random()} className="font-display" style={{ fontSize: 28, fontWeight: 600, color: "#17170F", marginTop: 48, marginBottom: 14, lineHeight: 1.2, textAlign: "left", borderBottom: "2px solid #E0DDD4", paddingBottom: 10 }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</h2>;
  }
  if (node.nodeType === "heading-3") {
    return <h3 key={Math.random()} className="font-display" style={{ fontSize: 21, fontWeight: 600, color: "#17170F", marginTop: 32, marginBottom: 10, textAlign: "left" }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</h3>;
  }
  if (node.nodeType === "unordered-list") {
    return <ul key={Math.random()} style={{ paddingLeft: 24, marginBottom: 22, textAlign: "left" }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</ul>;
  }
  if (node.nodeType === "ordered-list") {
    return <ol key={Math.random()} style={{ paddingLeft: 24, marginBottom: 22, textAlign: "left" }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</ol>;
  }
  if (node.nodeType === "list-item") {
    return <li key={Math.random()} style={{ fontSize: 15.5, color: "#3C3C32", lineHeight: 1.8, marginBottom: 8, textAlign: "left" }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</li>;
  }
  if (node.nodeType === "blockquote") {
    return <blockquote key={Math.random()} style={{ borderLeft: "4px solid #E8900A", paddingLeft: 20, margin: "28px 0", color: "#5C5C52", fontStyle: "italic", background: "#FDF9F3", borderRadius: "0 8px 8px 0", padding: "16px 20px", textAlign: "left" }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</blockquote>;
  }
  if (node.nodeType === "hr") {
    return <hr key={Math.random()} style={{ border: "none", borderTop: "1px solid #E0DDD4", margin: "32px 0" }}/>;
  }
  if (node.nodeType === "text") {
    let text = node.value;
    if (!node.marks || node.marks.length === 0) return text;
    return node.marks.reduce((el, mark) => {
      if (mark.type === "bold") return <strong style={{ fontWeight: 700, color: "#17170F" }}>{el}</strong>;
      if (mark.type === "italic") return <em>{el}</em>;
      if (mark.type === "code") return <code style={{ background: "#F2EFE8", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontFamily: "monospace" }}>{el}</code>;
      return el;
    }, text);
  }
  if (node.nodeType === "hyperlink") {
    return <a href={node.data.uri} target="_blank" rel="noreferrer" style={{ color: "#0B3D2E", fontWeight: 600, textDecoration: "underline" }}>{node.content.map((n, i) => <React.Fragment key={i}>{renderRichText(n)}</React.Fragment>)}</a>;
  }
  return null;
}
