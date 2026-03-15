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
  return (
    <div>
      {/* Hero */}
      <section style={{ background: T.f, padding: "120px 56px 88px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div className="about-hero-grid" style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 380px", gap: 80, alignItems: "center" }}>
          <div className="reveal">
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.sl, fontWeight: 600, marginBottom: 14 }}>About India Company Setup</div>
            <h1 className="font-display" style={{ fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 600, color: "#fff", lineHeight: 1.05, marginBottom: 20, textAlign: "left" }}>
              Big 4 expertise.<br/><span style={{ fontStyle: "italic", color: T.sl, fontWeight: 400 }}>Independent firm.</span><br/>Built for your scale.
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.82, fontWeight: 300, maxWidth: 480, marginBottom: 36, textAlign: "left" }}>
              India Company Setup was built on a simple premise: the best international tax advisory should not be reserved for companies that can afford Big 4 fees. We bring 18+ years of combined experience — a team of Chartered Accountants, Company Secretaries, and accountants, Ex-KPMG led — to mid-market foreign companies entering India.
            </p>
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap", borderLeft: "1px solid rgba(255,255,255,.09)" }}>
              {[["18+","Years of experience"],["100+","Companies incorporated"],["5","Continents"],["0","TP audits lost"]].map(([n,l]) => (
                <div key={n} style={{ padding: "14px 24px", borderRight: "1px solid rgba(255,255,255,.09)", textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.42)", marginTop: 4, letterSpacing: .3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Profile card */}
          <div className="reveal" style={{ background: "#fff", borderRadius: 16, padding: "34px 30px", boxShadow: "0 24px 64px rgba(0,0,0,.22)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${T.f}, ${T.s})`, borderRadius: "16px 16px 0 0" }}/>
            <div style={{ width: 88, height: 88, borderRadius: "50%", background: `linear-gradient(135deg, ${T.f} 0%, #155C46 100%)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, position: "relative", boxShadow: "0 8px 24px rgba(11,61,46,.25)" }}>
              <span className="font-display" style={{ fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: -1 }}>PG</span>
              <div style={{ position: "absolute", bottom: 2, right: 2, width: 26, height: 26, borderRadius: "50%", background: T.s, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>✓</div>
            </div>
            <h3 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: T.ch, marginBottom: 4 }}>Pankaj Gupta</h3>
            <p style={{ fontSize: 12.5, color: T.lt, marginBottom: 18, lineHeight: 1.5 }}>Senior Advisor, India Company Setup<br/>Managing Partner, PGA &amp; Co. CA</p>
            <div style={{ borderBottom: `1px solid ${T.bdr}`, paddingBottom: 18, marginBottom: 18 }}>
              {["Chartered Accountant (CA) — ICAI","Diploma in International Taxation — ICAI","18+ years experience","100+ companies incorporated in India","USA · UK · UAE · Singapore · Australia"].map(q => (
                <div key={q} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: T.mid, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.s, flexShrink: 0 }}/> {q}
                </div>
              ))}
            </div>
            <div style={{ background: "#E4F0EB", borderRadius: 10, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18 }}>🏛️</span>
              <p style={{ fontSize: 12, color: T.f, fontWeight: 500, lineHeight: 1.5 }}>Leads a team of CAs, Company Secretaries, and accountants. Ex-KPMG Chandigarh — International Tax & Advisory practice. 18+ years of experience in India incorporations and international tax.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: "88px 56px", background: T.ivory }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="reveal about-story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 88 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 13 }}>Our Story</div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px,3vw,42px)", fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 24 }}>
                Why we built <span style={{ fontStyle: "italic", color: T.f }}>India Company Setup</span>
              </h2>
              {[
                `After building a team with 18+ years of combined experience — CAs, Company Secretaries, and accountants — and having set up 100+ companies in India including foreign companies, one pattern became impossible to ignore: <strong>the mid-market was being failed.</strong>`,
                `Foreign companies with 50–500 employees trying to set up in India had two choices: pay Big 4 fees their business case couldn't justify, or rely on local CA firms with no meaningful international tax experience. Neither was good enough.`,
                `Getting the transfer pricing structure wrong creates years of audit exposure. Getting FEMA wrong creates penalties up to 3× the transaction value. Getting the DTAA analysis wrong means overpaying withholding tax on every dividend — often indefinitely.`,
                `India Company Setup was built to serve the foreign companies that <strong>can't afford Big 4 fees but can't afford Big 4 mistakes either.</strong>`,
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18, textAlign: "left" }} dangerouslySetInnerHTML={{ __html: text.replace(/<strong>/g, `<strong style="color:${T.ch};font-weight:600">`).replace(/<\/strong>/g, "</strong>") }}/>
              ))}
              {/* Pull quote */}
              <div style={{ background: T.f, borderRadius: 13, padding: "26px 28px", marginTop: 10, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -10, left: 16, fontSize: 80, fontFamily: "Cormorant Garamond, serif", color: "rgba(255,255,255,.07)", lineHeight: 1 }}>"</div>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontStyle: "italic", color: "rgba(255,255,255,.8)", lineHeight: 1.55, marginBottom: 12, position: "relative" }}>
                  "The companies that get India right don't necessarily have the biggest budgets. They have the right advisor at the right moment."
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)" }}>— Pankaj Gupta, Managing Partner</p>
              </div>
            </div>
            {/* Timeline */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 28 }}>Career Timeline</div>
              {[
                { ico: "🎓", title: "CA Qualification — ICAI", desc: "Qualified as a Chartered Accountant from ICAI — the gold standard professional qualification for accounting and tax in India.", badge: "Foundation" },
                { ico: "🏛️", title: "KPMG India — Big 4 Experience", desc: "8 years at KPMG's International Tax & Advisory practice advising large multinationals on India entry, transfer pricing, DTAA, and FEMA across USA, UK, UAE, Singapore, Japan, and Europe.", badge: "Big 4 Experience" },
                { ico: "⚖️", title: "Founded PGA & Co. CA", desc: "Established PGA & Co. Chartered Accountants to serve the domestic Indian market — GST, income tax, audit, and compliance for Indian businesses, HNIs, and NRIs. Concurrently pursued LLB.", badge: "Domestic CA Practice" },
                { ico: "📚", title: "Bachelor of Laws (LLB)", desc: "Completed LLB alongside founding PGA & Co. — bringing legal depth to corporate structuring, contractual advisory, and regulatory compliance work.", badge: "Legal Foundation" },
                { ico: "📜", title: "Diploma in International Taxation", desc: "Post-qualification specialisation from ICAI covering DTAA interpretation, OECD BEPS framework, transfer pricing methodologies, FEMA, and cross-border structuring. Combined with LLB for full legal-tax advisory capability.", badge: "ICAI Specialisation" },
                { ico: "🌍", title: "India Company Setup — Launched", desc: "Dedicated advisory platform for foreign companies entering India. KPMG-trained international tax expertise with deep domestic compliance capability — one firm for the full journey.", badge: "Active · Expanding" },
              ].map((item, i) => (
                <div key={item.title} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 20, position: "relative", paddingBottom: i < 4 ? 28 : 0 }}>
                  {i < 5 && <div style={{ position: "absolute", left: 27, top: 52, bottom: 0, width: 2, background: T.bdr }}/>}
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", border: `2px solid ${T.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, zIndex: 1 }}>{item.ico}</div>
                  <div style={{ paddingTop: 12, textAlign: "left" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: T.ch, marginBottom: 5 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: T.mid, lineHeight: 1.7, marginBottom: 8 }}>{item.desc}</div>
                    <span style={{ background: "#E4F0EB", color: T.f, padding: "3px 10px", borderRadius: 4, fontSize: 10.5, fontWeight: 700 }}>{item.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "88px 56px", background: T.stone }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="reveal" style={{ maxWidth: 560, marginBottom: 52 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 13 }}>How We Work</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 600, color: T.ch, lineHeight: 1.1 }}>
              Principles that define <span style={{ fontStyle: "italic", color: T.f }}>every engagement</span>
            </h2>
          </div>
          <div className="stagger about-values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              ["🎯","Structure Before Filing","We design the tax and legal structure before a single document is filed. Transfer pricing model before incorporation. DTAA analysis before the first intercompany payment."],
              ["🔗","Integrated Advisory","DTAA, transfer pricing, and FEMA are treated as one picture — not three separate workstreams. Getting one wrong affects the others."],
              ["🛡️","Documentation That Defends","Every document is written to survive audit scrutiny — not to meet a minimum compliance threshold."],
              ["💬","Plain English — Always","CEOs and CFOs should understand their India tax position without jargon. We translate technical positions into clear commercial language."],
              ["👤","Senior Attention — Always","Every engagement is led by our senior CA, supported by a dedicated team of CAs, a Company Secretary, and accountants. Full team depth — senior attention always."],
              ["🔄","Long-term Partnership","Most clients start with an incorporation engagement and stay on retainer for years. We are built for the full India journey."],
            ].map(([ico, title, desc]) => (
              <div key={title} className="card-lift" style={{ background: "#fff", border: `1px solid ${T.bdr}`, borderRadius: 14, padding: "30px 26px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: T.bdr, transition: "background .25s" }}/>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{ico}</div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: T.ch, marginBottom: 8, textAlign: "left" }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.75, textAlign: "left" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PGA & Co */}
      <section style={{ background: T.f, padding: "80px 56px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="reveal hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.sl, fontWeight: 600, marginBottom: 14 }}>Knowledge Partner</div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px,3vw,42px)", fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
                The domestic CA firm behind <span style={{ fontStyle: "italic", color: T.sl }}>India Company Setup</span>
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.62)", lineHeight: 1.82, fontWeight: 300, marginBottom: 24, textAlign: "left" }}>
                India Company Setup is powered by PGA &amp; Co. Chartered Accountants — a full-service CA firm based in Chandigarh. While ICS handles the international layer, PGA &amp; Co. manages the domestic compliance engine.
              </p>
              <a href="https://pgaca.in" target="_blank" style={{ fontSize: 13, fontWeight: 600, color: T.sl, borderBottom: `1px solid rgba(245,168,40,.3)`, paddingBottom: 3 }}>Visit pgaca.in →</a>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: "30px 28px" }}>
              <div style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: T.lt, fontWeight: 600, marginBottom: 10 }}>Knowledge Partner</div>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: T.ch, marginBottom: 4 }}>PGA &amp; Co.</h3>
              <p style={{ fontSize: 12.5, color: T.lt, marginBottom: 18 }}>Chartered Accountants · Chandigarh · Pan-India</p>
              {["GST registration, filing, audit & advisory","Income & corporate tax — ITR, advance tax","Statutory audit & assurance","Company incorporation & MCA compliance","Payroll — TDS, PF, ESI, professional tax","NRI & HNI tax advisory","Transfer pricing — Form 3CEB","Startup services — DPIIT, ESOP"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: T.mid, marginBottom: 8, textAlign: "left" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.s, flexShrink: 0 }}/> {s}
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${T.bdr}`, marginTop: 16, paddingTop: 14, fontSize: 12, color: T.lt, lineHeight: 1.7 }}>
                SCO 18, Top Floor, Sector 20-D, Chandigarh 160020<br/>
                <a href="tel:+918699887200" style={{ color: T.f, fontWeight: 500 }}>+91 86998 87200</a> · <a href="mailto:info@pgaca.in" style={{ color: T.f, fontWeight: 500 }}>info@pgaca.in</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
