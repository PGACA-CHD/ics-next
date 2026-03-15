'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { T, CALENDLY_URL, WA_BASE, PHONE } from '@/lib/config';

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
