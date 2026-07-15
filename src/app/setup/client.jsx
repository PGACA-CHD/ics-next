'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/config';
import { submitToZoho } from '@/lib/utils';

const ROUTES = {
  home: '/', services: '/setup', gcc: '/post-setup', tax: '/international-tax',
  hub: '/knowledge-hub', about: '/about', contact: '/contact', industries: '/industries',
  seo_fcri: '/foreign-company-registration-india', seo_sub: '/subsidiary-company-india',
  seo_tp: '/transfer-pricing-india', seo_fdi: '/fdi-rules-india',
};

const HV = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BDR = "1px solid #111"; // Thin black border token
const GLASS = "rgba(255,255,255,0.28)";
const BLUR = "blur(16px)";
const GREEN = "#0B3D2E";
const GOLD = "#e69819";
const HS = "clamp(28px, 3vw, 42px)";

// Unique color palette mapping for each entity type
const ENTITY_COLORS = {
  pvtltd: { primary: "#0B3D2E", bg: "rgba(11,61,46,0.05)", border: "1px solid #111" },
  llp: { primary: "#1a5c9a", bg: "rgba(26,92,154,0.05)", border: "1px solid #111" },
  subsidiary: { primary: "#e69819", bg: "rgba(230,152,25,0.05)", border: "1px solid #111" },
  branch: { primary: "#7a5f10", bg: "rgba(122,95,16,0.05)", border: "1px solid #111" },
  liaison: { primary: "#3a2d72", bg: "rgba(58,45,114,0.05)", border: "1px solid #111" },
};

function useReveal(t = 0.12) {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Fade({ children, delay = 0, up = true }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : (up ? 'translateY(22px)' : 'translateY(0)'), transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = '', prefix = '', duration = 1400, delay = 0 }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useReveal(0.3);
  const started = useRef(false);
  useEffect(() => {
    if (!vis || started.current) return;
    started.current = true;
    if (target === 0) { setTimeout(() => setVal(0), delay); return; }
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    setTimeout(() => {
      const id = setInterval(() => {
        step++;
        setVal(Math.round(target * step / steps));
        if (step >= steps) clearInterval(id);
      }, stepTime);
    }, delay);
  }, [vis]);
  return <span ref={ref} style={{ color: "#111" }}>{prefix}{val}{suffix}</span>;
}

// Section heading with green and gold elements
function SH({ eyebrow, green, gold, center = true, mb = 40 }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: mb, fontFamily: HV }}>
      {eyebrow && (
        <p style={{
          fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase",
          color: GREEN, fontWeight: 700, marginBottom: 14, fontFamily: HV, margin: "0 0 14px"
        }}>{eyebrow}</p>
      )}
      <h2 style={{ fontSize: HS, fontWeight: 700, lineHeight: 1.1, margin: 0, fontFamily: HV }}>
        <span style={{ color: GREEN }}>{green}</span>
        {gold && <>{" "}<em style={{ color: GOLD, fontStyle: "italic" }}>{gold}</em></>}
      </h2>
    </div>
  );
}

const handleSpotlight = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

const ENTITIES = {
  pvtltd: {
    letter: "P", title: "Private Limited Company", badge: "Most Common",
    tax: "25.17%", fdi: "Automatic Route", rbi: "Not required", timeline: "2–3 weeks",
    desc: "The most common structure for businesses in India. A Private Limited Company offers limited liability, separate legal existence, and the ability to raise funding. Ideal for startups, domestic businesses, joint ventures, and foreign-owned entities alike.",
    points: [
      "Separate legal entity — limited liability for shareholders",
      "Minimum 2 directors and 2 shareholders required",
      "At least one director must be an Indian resident",
      "No minimum paid-up capital requirement",
      "Corporate tax at 25.17% (22% base + surcharge + cess)",
      "Can accept FDI under Automatic Route (most sectors)",
      "SPICe+ e-filing: Certificate of Incorporation in 7–12 days",
      "Easily convertible to public company for future fundraising"
    ],
    docs: ["PAN & Aadhaar of all directors and shareholders", "Address proof (utility bill / bank statement)", "Passport-size photographs of all directors", "Proposed registered office address proof", "DSC (Digital Signature Certificate) for all directors"],
    bestFor: "Startups, domestic businesses, joint ventures, foreign companies wanting full commercial operations in India",
  },
  llp: {
    letter: "L", title: "Limited Liability Partnership", badge: null,
    tax: "30%", fdi: "Approval Route only", rbi: "Not required", timeline: "2–3 weeks",
    desc: "An LLP combines the flexibility of a partnership with the protection of limited liability. Popular with professional services firms, small businesses, and joint ventures. Simpler compliance than a Pvt Ltd but less suitable for raising equity funding.",
    points: [
      "Partners have limited liability — personal assets protected",
      "Minimum 2 designated partners required",
      "At least one designated partner must be an Indian resident",
      "No minimum capital contribution required",
      "Taxed at 30% flat (no surcharge below ₹1 crore turnover)",
      "FDI permitted only via Government Approval Route",
      "Lower compliance burden vs. Pvt Ltd",
      "Cannot issue equity shares — not suitable for VC/PE funding"
    ],
    docs: ["PAN & Aadhaar of all designated partners", "Address proof of all designated partners", "Passport-size photographs", "Registered office address proof", "LLP Agreement (drafted and notarised)"],
    bestFor: "Professional services firms, consulting businesses, small domestic businesses, joint ventures not seeking equity funding",
  },
  subsidiary: {
    letter: "W", title: "Wholly Owned Subsidiary", badge: "Foreign Co. Choice",
    tax: "25.17%", fdi: "Automatic Route", rbi: "Not required", timeline: "3–4 weeks",
    desc: "A Private Limited Company where 100% shares are held by a foreign parent. The gold standard for foreign companies entering India — full commercial operations, complete ownership, and no Indian partner required.",
    points: [
      "100% foreign ownership — no Indian partner needed",
      "Full FDI via Automatic Route (most sectors)",
      "Complete control over operations and management",
      "Can earn, invoice, and repatriate profits freely",
      "Preferred structure for GCC, SaaS, manufacturing",
      "Corporate tax at 25.17% (new manufacturing: 17%)",
      "SPICe+ e-filing: Certificate of Incorporation in 7–12 days",
      "Intercompany transactions require transfer pricing documentation"
    ],
    docs: ["Certificate of Incorporation of parent company", "Memorandum & Articles of Association of parent", "Board resolution authorising India subsidiary", "KYC of directors: passport, address proof", "Proposed registered office address in India"],
    bestFor: "GCC / Captive Centres, SaaS & Tech companies, Manufacturing, Any foreign company wanting 100% control",
  },
  branch: {
    letter: "B", title: "Branch Office", badge: null,
    tax: "40%", fdi: "RBI Approval Route", rbi: "Required", timeline: "6–8 weeks",
    desc: "A branch office is an extension of the foreign parent in India — not a separate legal entity. It can undertake specific permitted activities but is taxed at 40% on India-sourced profits, making it expensive for most businesses.",
    points: [
      "Not a separate legal entity — parent is fully liable",
      "Requires prior RBI approval (Form FNC)",
      "Taxed at 40% on India-attributable profits",
      "Permitted: manufacturing, trading, professional services, R&D",
      "Cannot undertake retail trading or agriculture",
      "Profits can be repatriated after tax",
      "Annual Activity Certificate required from CA",
      "Good for specific project execution or export operations"
    ],
    docs: ["Latest audited financials of parent (last 5 years)", "Certificate of Incorporation of parent", "Memorandum & Articles of Association", "Board resolution for branch opening", "Banker's report from parent's bank"],
    bestFor: "Project-based operations, Export/import businesses, Professional service firms with specific India engagements",
  },
  liaison: {
    letter: "O", title: "Liaison Office", badge: null,
    tax: "None", fdi: "RBI Approval Route", rbi: "Required", timeline: "6–8 weeks",
    desc: "A liaison office cannot undertake commercial activity or earn revenue. Its sole purpose is market research, promoting the parent's products, and facilitating communication. All expenses must be funded by the parent via inward remittance.",
    points: [
      "Cannot earn any revenue in India",
      "No corporate tax — but no deductions either",
      "Requires RBI prior approval",
      "All expenses funded by parent remittances only",
      "Permitted: market research, promoting parent's products",
      "Not permitted: signing contracts, negotiating on parent's behalf",
      "Must file Annual Activity Certificate with RBI annually",
      "Best used as a stepping stone before full incorporation"
    ],
    docs: ["Latest audited financials of parent (last 3 years)", "Certificate of Incorporation of parent", "Board resolution for LO opening", "Banker's report from parent's bank", "Brief on proposed activities in India"],
    bestFor: "Market assessment before committing to full setup, Companies exploring India before incorporation",
  },
};

const ENTITY_TABS = [
  ["pvtltd", "Pvt Ltd Company"],
  ["llp", "LLP"],
  ["subsidiary", "WOS (Foreign)"],
  ["branch", "Branch Office"],
  ["liaison", "Liaison Office"],
];

const COMPARISON = [
  ["Tax Rate", "25.17%", "30%", "25.17%", "40%", "Nil"],
  ["Earn Revenue", "✔", "✔", "✔", "⚠", "✖"],
  ["Foreign Owner", "Auto", "Gov.Appr", "Auto", "RBI Appr", "RBI Appr"],
  ["Timeline", "2–3 wks", "2–3 wks", "3–4 wks", "6–8 wks", "6–8 wks"],
  ["Liability", "Limited", "Limited", "Limited", "Unlimited", "Unlimited"],
];

const PROCESS = [
  { n: "01", title: "Structure Consultation", time: "Day 1", desc: "Free 30-minute call to understand your business, India objectives, sector, and scale. We recommend the right entity type, FDI route, and tax structure before any filing begins." },
  { n: "02", title: "Pre-Incorporation Planning", time: "Week 1", desc: "Transfer pricing model design, DTAA analysis, intercompany agreement framework, and registered office identification. Everything decided on paper before the first filing." },
  { n: "03", title: "SPICe+ Filing (MCA)", time: "Week 2", desc: "Company name reservation (RUN), SPICe+ integrated form covering incorporation, PAN, TAN, GSTIN, EPFO, ESIC, and opening bank account — all in one MCA submission." },
  { n: "04", title: "Certificate of Incorporation", time: "Week 2–3", desc: "Ministry of Corporate Affairs issues Certificate of Incorporation (CIN). The company legally exists. PAN, TAN issued simultaneously. Typical time: 7–12 working days from filing." },
  { n: "05", title: "RBI & FEMA Compliance", time: "Week 3–4", desc: "FCGPR filing with RBI within 30 days of receiving FDI. GST registration. Bank account opening. Payroll and TDS registration. First compliance calendar issued to client." },
  { n: "06", title: "Ongoing Compliance Retainer", time: "Month 2+", desc: "Monthly GST, TDS, and payroll filings. Quarterly advance tax. Annual TP benchmarking study, Form 3CEB, statutory audit, corporate tax return, and MCA annual filing." },
];

const INCLUDED = [
  { cat: "Incorporation", items: ["Company name reservation (RUN)", "SPICe+ integrated filing", "Certificate of Incorporation", "PAN & TAN registration", "GST registration", "EPFO & ESIC registration"] },
  { cat: "Tax & FEMA", items: ["FCGPR filing with RBI", "Transfer pricing model design", "Intercompany MSA drafting", "DTAA analysis & TRC advice", "Form 15CA / 15CB", "Bank account opening support"] },
  { cat: "Ongoing (Retainer)", items: ["Monthly GST return filing", "Monthly TDS / payroll filing", "Quarterly advance tax", "Annual Form 3CEB (TP)", "Statutory audit coordination", "Annual corporate tax return"] },
];

const PROCESS_ACCENTS = [
  { acc: "#0B3D2E", bg: "rgba(11,61,46,0.06)", bdr: "rgba(11,61,46,0.25)" },
  { acc: "#e69819", bg: "rgba(230,152,25,0.06)", bdr: "rgba(230,152,25,0.25)" },
  { acc: "#1a5c9a", bg: "rgba(26,92,154,0.06)", bdr: "rgba(26,92,154,0.25)" },
  { acc: "#7a5f10", bg: "rgba(122,95,16,0.06)", bdr: "rgba(122,95,16,0.25)" },
  { acc: "#3a2d72", bg: "rgba(58,45,114,0.06)", bdr: "rgba(58,45,114,0.25)" },
  { acc: "#c8371a", bg: "rgba(200,55,26,0.06)", bdr: "rgba(200,55,26,0.25)" },
];

const INCLUDED_ACCENTS = [
  { acc: "#0B3D2E", bg: "rgba(11,61,46,0.06)", bdr: "rgba(11,61,46,0.25)" },
  { acc: "#e69819", bg: "rgba(230,152,25,0.06)", bdr: "rgba(230,152,25,0.25)" },
  { acc: "#1a5c9a", bg: "rgba(26,92,154,0.06)", bdr: "rgba(26,92,154,0.25)" },
];

const FAQS = [
  { q: "What is the minimum number of directors and shareholders required?", a: "For a Private Limited Company, a minimum of 2 directors and 2 shareholders are required. The directors and shareholders can be the same individuals." },
  { q: "Is there a minimum paid-up capital requirement?", a: "There is no statutory minimum paid-up capital required to start a company in India. You can start with as little as ₹10,000 capital." },
  { q: "Can a foreign national be a director or shareholder?", a: "Yes, foreign nationals and foreign corporate bodies can be directors and shareholders. However, at least one director must be a resident of India." },
  { q: "How long does registration take?", a: "Once all documents are submitted and DSC is generated, it typically takes 7 to 12 working days to get the Certificate of Incorporation from the MCA." },
  { q: "What is the difference between authorised and paid-up capital?", a: "Authorised capital is the maximum value of shares a company can issue to shareholders, while paid-up capital is the actual amount paid by shareholders to the company." },
  { q: "Do I need a physical office address at the time of incorporation?", a: "Yes, you must have a physical office address in India to act as the registered office. A utility bill and proof of authorization are required during filing." },
];

const HANDLE = [
  ["01", "Incorporation", "MCA SPICe+ filing, CIN, PAN, TAN, GSTIN"],
  ["02", "RBI / FEMA", "FCGPR within 30 days, FLA, ECB, compounding"],
  ["03", "Transfer Pricing", "TP model, MSA, Form 3CEB, APA advisory"],
  ["04", "DTAA Planning", "Withholding tax optimisation, TRC, PPT analysis"],
  ["05", "Payroll & HR", "TDS, PF, ESI, professional tax setup"],
  ["06", "Ongoing Compliance", "Monthly GST, TDS, quarterly advance tax, annual audit"],
];

export default function Page() {
  const router = useRouter();
  const [active, setActive] = useState("pvtltd");
  const ent = ENTITIES[active];
  const activeIdx = ENTITY_TABS.findIndex(([k]) => k === active);
  const ec = ENTITY_COLORS[active];

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Step-by-Step Auto-cycling State
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS.length);
    }, 3000); // Cycles every 3 seconds smoothly
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ fontFamily: HV, color: "#111", background: "#fff" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes floatSpotlight {
          0%   { background-position: 50% 50%; }
          25%  { background-position: 80% 20%; }
          50%  { background-position: 20% 80%; }
          75%  { background-position: 80% 80%; }
          100% { background-position: 50% 50%; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.94) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popTimelineNode {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .doc-item-anim {
          animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .timeline-node-anim {
          animation: popTimelineNode 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .spot-card { position:relative; overflow:hidden; --mouse-x:50%; --mouse-y:50%; }
        .spot-card::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background: radial-gradient(circle at center, var(--spot-color, rgba(11,61,46,0.08)) 0%, transparent 70%);
          background-size: 200% 200%;
          background-position: 50% 50%;
          opacity: 0.85;
          animation: floatSpotlight 15s ease-in-out infinite;
          animation-delay: inherit;
          transition: opacity .5s ease;
        }
        .spot-card:hover::before, .spot-card:focus-within::before {
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spot-color, rgba(11,61,46,0.08)), transparent 70%);
          background-size: 100% 100%;
          background-position: 0 0;
          animation: none;
          opacity: 1;
        }
        .spot-card-content { position:relative; z-index:1; }

        .gc {
          background: #fff;
          border: ${BDR};
          border-radius: 16px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .gc:hover { transform: translateY(-4px); border-color: rgba(11,61,46,0.3); box-shadow: 0 12px 36px rgba(11,61,46,0.09); }
        .gc-static { background: #fff; border: ${BDR}; border-radius: 16px; }
        .tab-off { background:#fff; border:${BDR}; color:#111; padding:10px 18px; border-radius:8px; cursor:pointer; font-family:${HV}; font-size:13px; font-weight:600; display:inline-flex; align-items:center; gap:7px; transition:all 0.2s; }
        .tab-off:hover { background:#f5f5f5; }
        .tab-on  { background:${GREEN}; border:1px solid ${GREEN}; color:#fff; padding:10px 18px; border-radius:8px; cursor:pointer; font-family:${HV}; font-size:13px; font-weight:600; display:inline-flex; align-items:center; gap:7px; }
        .row-div { border-bottom: 1px solid #111; }
        .row-div:last-child { border-bottom: none; }
        .lbl { font-size:10.5px; letter-spacing:2px; text-transform:uppercase; font-weight:600; color:#111; font-family:${HV}; }
        .lime-btn { display:inline-flex; align-items:center; gap:8px; background:${GREEN}; color:#fff; font-family:${HV}; font-size:15px; font-weight:700; padding:14px 28px; border-radius:6px; border:none; cursor:pointer; transition:background 0.2s ease,transform 0.15s ease; text-decoration:none; }
        .lime-btn:hover { background:#0a3d2c; transform:translateY(-1px); }
        .ghost-btn { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#111; font-family:${HV}; font-size:15px; font-weight:600; padding:14px 28px; border-radius:6px; border:${BDR}; cursor:pointer; transition:all 0.2s; text-decoration:none; }
        .ghost-btn:hover { background:#111; color:#fff; }
        .ghost-dark { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#fff; font-family:${HV}; font-size:15px; font-weight:600; padding:14px 28px; border-radius:6px; border:1px solid rgba(255,255,255,0.25); cursor:pointer; transition:all 0.2s; }
        .ghost-dark:hover { background:rgba(255,255,255,0.08); }
        .cal-pill { background:rgba(0,0,0,0.06); border:1px solid #111; color:#111; padding:5px 13px; border-radius:50px; font-size:12px; font-weight:500; font-family:${HV}; display:inline-block; }
        @media(max-width:900px){ .two-col{grid-template-columns:1fr!important;} .three-col{grid-template-columns:1fr 1fr!important;} .hero-g{grid-template-columns:1fr!important;} }
        @media(max-width:540px){ .three-col{grid-template-columns:1fr!important;} .sec{padding:56px 18px!important;} }
      `}</style>

      {/* ── HERO ── */}
      <section className="sec" style={{ background: "#f5f5f0", padding: "96px 56px 88px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="hero-g" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 64, alignItems: "start" }}>
            {/* Left */}
            <div>
              <div className="lbl" style={{ marginBottom: 24 }}>Company Incorporation &amp; Setup</div>
              <h1 style={{ fontSize: "clamp(40px,5.5vw,72px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.033em", margin: "0 0 24px", fontFamily: HV }}>
                <span style={{ color: GREEN }}>Set up your India entity —</span>{" "}
                <em style={{ color: GOLD, fontStyle: "italic", fontWeight: 800 }}>structured correctly from day one.</em>
              </h1>
              <p style={{ fontSize: 16, color: "#111", lineHeight: 1.78, maxWidth: 520, margin: "0 0 36px", fontFamily: HV }}>
                India entry is not just an incorporation exercise. The legal structure, FDI route, transfer pricing model, and DTAA analysis must be decided <em style={{ color: "#111" }}>before</em> the first filing. We design the full picture first — then we file.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
                <button className="lime-btn" onClick={() => router.push(ROUTES.contact)}>Get Free Structure Review →</button>
                <button className="ghost-btn" onClick={() => router.push(ROUTES.gcc)}>Post Setup →</button>
              </div>
              {/* Stats strip */}
              <div style={{ display: "flex", gap: 0, flexWrap: "wrap", borderLeft: "1.5px solid #111" }}>
                {[
                  { target: 100, suffix: "+", label: "Companies incorporated" },
                  { prefix: "7-", target: 12, suffix: "", label: "Days to incorporate" },
                  { target: 18, suffix: "+", label: "Years of experience" },
                  { target: 4, suffix: " wks", label: "End-to-end setup" }
                ].map((s, i) => (
                  <div key={i} style={{ padding: "14px 24px", borderRight: "1.5px solid #111", textAlign: "center", minWidth: 120 }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: GREEN, lineHeight: 1, fontFamily: HV }}>
                      <CountUp target={s.target} suffix={s.suffix} prefix={s.prefix} delay={i * 200} />
                    </div>
                    <div style={{ fontSize: 11, color: "#111", marginTop: 6, fontFamily: HV, fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — glass card (Left aligned side-by-side content, compact height) */}
            <div className="gc-static" style={{ padding: "26px 24px", border: "1px solid #111" }}>
              <div className="lbl" style={{ marginBottom: 20, fontWeight: 750 }}>What We Handle — End to End</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {HANDLE.map(([val, title, sub], i) => (
                  <Fade key={title} delay={i * 100}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: "rgba(11,61,46,0.06)", border: `1.5px solid #111`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 800, color: GREEN, flexShrink: 0, fontFamily: HV
                      }}>{val}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 2, fontFamily: HV }}>{title}</div>
                        <div style={{ fontSize: 12.5, color: "#111", lineHeight: 1.5, fontFamily: HV }}>{sub}</div>
                      </div>
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTITY SELECTOR ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <SH eyebrow="Entity Types" green="Which India entity is" gold="right for you?" mb={12} />
            <p style={{ fontSize: 15, color: "#111", margin: "0 auto 36px", maxWidth: 680, textAlign: "center", fontFamily: HV, lineHeight: 1.6, fontWeight: 600 }}>Your entity choice determines tax rate, activity scope, compliance burden, and FDI route. Select each to explore in detail.</p>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
              {ENTITY_TABS.map(([key, label]) => (
                <button key={key} className={active === key ? "tab-on" : "tab-off"} onClick={() => setActive(key)}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: active === key ? GOLD : "#111",
                    transition: "all 0.25s ease",
                    transform: active === key ? "scale(1.5)" : "scale(1)"
                  }} />
                  {label}
                </button>
              ))}
            </div>
          </Fade>

          {/* 2-col detail stretch */}
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "stretch" }}>
            {/* Left — overview */}
            <Fade>
              <div className="gc-static" style={{ padding: "28px 24px", height: "100%", border: "1px solid #111", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${ec.bg}`, border: `1.5px dashed #111`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: ec.primary, flexShrink: 0 }}>{ent.letter}</div>
                  <div>
                    <h3 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: ec.primary, margin: 0, letterSpacing: "-0.02em", fontFamily: HV }}>{ent.title}</h3>
                    {ent.badge && <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: ec.primary, color: "#fff", padding: "3px 9px", borderRadius: 4, marginTop: 4, fontFamily: HV }}>{ent.badge}</span>}
                  </div>
                </div>

                {/* Metrics row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "14px 0", borderTop: "1.5px solid #111", borderBottom: "1.5px solid #111", marginBottom: 18 }}>
                  {[["Tax Rate", ent.tax], ["FDI Route", ent.fdi], ["RBI Approval", ent.rbi], ["Timeline", ent.timeline]].map(([l, v]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: ec.primary, marginBottom: 3, fontFamily: HV }}>{v}</div>
                      <div style={{ fontSize: 9.5, color: "#111", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, fontFamily: HV }}>{l}</div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: 13.5, color: "#111", lineHeight: 1.75, margin: "0 0 18px", fontFamily: HV, fontWeight: 500 }}>{ent.desc}</p>

                <div className="lbl" style={{ marginBottom: 14, fontWeight: 700 }}>Key Features</div>
                {/* Dynamically colored point pills for each entity type */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                  {ent.points.map((pt, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center",
                      padding: "10px 14px", borderRadius: 8,
                      background: ec.bg, border: `1px solid #111`
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#111", fontFamily: HV }}>{pt}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "auto", background: "rgba(230,152,25,0.08)", border: `1px solid #111`, borderRadius: 10, padding: "12px 16px" }}>
                  <div className="lbl" style={{ color: GOLD, marginBottom: 5, fontWeight: 750 }}>Best For</div>
                  <div style={{ fontSize: 12.5, color: "#111", lineHeight: 1.6, fontFamily: HV, fontWeight: 600 }}>{ent.bestFor}</div>
                </div>
              </div>
            </Fade>

            {/* Right — docs + comparison matched height */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", justifyContent: "space-between" }}>
              {/* Docs - Premium animated document rows highlighting active entity's accent border */}
              <Fade delay={80}>
                <div className="gc-static" style={{ padding: "28px 24px", border: "1px solid #111" }}>
                  <div className="lbl" style={{ marginBottom: 18, fontWeight: 700 }}>Documents Required</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {ent.docs.map((doc, i) => (
                      <div
                        key={doc}
                        className="doc-item-anim"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          fontSize: 13,
                          color: "#111",
                          padding: "12px 16px",
                          background: "#fff",
                          border: "1px solid #111",
                          borderLeft: `4px solid ${ec.primary}`,
                          borderRadius: 8,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                          fontFamily: HV,
                          animationDelay: `${i * 60}ms`,
                          opacity: 0,
                        }}
                      >
                        <div style={{
                          width: 22, height: 22, borderRadius: 6,
                          background: ec.bg,
                          border: `1.5px solid #111`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 800, color: ec.primary, flexShrink: 0
                        }}>
                          {i + 1}
                        </div>
                        <span style={{ fontWeight: 600 }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>

              {/* Comparison table (Structured table with vertical grid lines) */}
              <Fade delay={120}>
                <div className="gc-static" style={{ padding: "28px 24px", border: "1px solid #111", overflowX: "auto" }}>
                  <div className="lbl" style={{ marginBottom: 18, fontWeight: 700 }}>Quick Comparison</div>
                  <table style={{ width: "100%", borderCollapse: "collapse", border: "1.5px solid #111", fontFamily: HV, minWidth: 420 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#111", padding: "10px 8px", borderBottom: `2.5px solid #111`, borderRight: "1.5px solid #111" }}>Criteria</th>
                        {["Pvt Ltd", "LLP", "WOS", "Branch", "Liaison"].map((h, i) => (
                          <th
                            key={h}
                            style={{
                              fontSize: 10.5,
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              color: i === activeIdx ? "#fff" : GREEN,
                              padding: "10px 4px",
                              textAlign: "center",
                              background: i === activeIdx ? GREEN : "rgba(11,61,46,0.04)",
                              borderBottom: `2.5px solid #111`,
                              borderRight: i < 4 ? "1.5px solid #111" : "none",
                              transition: "all 0.3s ease"
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.map(([label, ...vals]) => (
                        <tr key={label}>
                          <td style={{ fontSize: 11.5, fontWeight: 700, color: "#111", padding: "11px 8px", borderBottom: "1.5px solid #111", borderRight: "1.5px solid #111" }}>{label}</td>
                          {vals.map((v, j) => (
                            <td
                              key={j}
                              style={{
                                fontSize: 12,
                                fontWeight: 800,
                                color: v === "✔" ? GREEN : (v === "✖" ? "#d32f2f" : "#111"),
                                padding: "11px 4px",
                                textAlign: "center",
                                borderBottom: "1.5px solid #111",
                                borderRight: j < 4 ? "1.5px solid #111" : "none",
                                background: j === activeIdx ? "rgba(11,61,46,0.04)" : "transparent",
                                transition: "all 0.3s ease"
                              }}
                            >
                              {v}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <p style={{ fontSize: 11, color: "#111", margin: "0", fontStyle: "italic", fontFamily: HV, fontWeight: 600 }}>
                      *Timeline and specifications vary for regulated sectors like banking and defense.
                    </p>
                  </div>
                </div>
              </Fade>

              {/* Discuss CTA Button */}
              <div style={{ width: "100%" }}>
                <button
                  className="lime-btn"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "14px",
                    background: GREEN,
                    boxShadow: "0 4px 14px rgba(11,61,46,0.15)",
                    border: "1px solid #111",
                    borderRadius: 10,
                  }}
                  onClick={() => router.push(ROUTES.contact)}
                >
                  Discuss {ent.title} Setup →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS (Vertical Timeline with Auto-cycling nodes and smooth transition cards) ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <SH eyebrow="Step-by-Step Process" green="From decision to fully operational —" gold="exactly what happens." mb={12} />
            <p style={{ fontSize: 15, color: "#111", margin: "0 auto 44px", maxWidth: 680, textAlign: "center", fontFamily: HV, lineHeight: 1.6, fontWeight: 600 }}>No surprises, no hidden steps. Here is the complete journey, week by week.</p>
          </Fade>

          {/* Vertical Timeline Stack (Highly responsive) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 850, margin: "0 auto", position: "relative" }}>
            {/* Timeline connector line */}
            <div style={{ position: "absolute", left: 24, top: 24, bottom: 24, width: 2, background: "rgba(11,61,46,0.18)" }} />

            {PROCESS.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div key={step.n} style={{ display: "flex", gap: 20, alignItems: "flex-start", position: "relative", cursor: "pointer" }} onClick={() => setActiveStep(i)}>
                  {/* Timeline node popping scroll animation */}
                  <div
                    className={isActive ? "timeline-node-anim" : ""}
                    style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: isActive ? GREEN : "#fff",
                      border: `2.5px solid ${isActive ? GREEN : "rgba(0,0,0,0.18)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 800, color: isActive ? "#fff" : GREEN,
                      zIndex: 2, flexShrink: 0, fontFamily: HV,
                      transition: "all 0.4s ease"
                    }}
                  >
                    {step.n}
                  </div>
                  {/* Clean Content Card with Smooth Active Transitions */}
                  <div style={{
                    flex: 1, background: "#fff", border: `1px solid ${isActive ? GREEN : "rgba(0,0,0,0.15)"}`,
                    borderRadius: 14, padding: "20px 24px",
                    boxShadow: isActive ? "0 8px 24px rgba(11,61,46,0.06)" : "0 2px 10px rgba(0,0,0,0.02)",
                    transform: isActive ? "translateX(4px)" : "none",
                    transition: "all 0.4s ease"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#111", fontFamily: HV }}>{step.title}</span>
                      <span style={{ marginLeft: "auto", background: "rgba(230,152,25,0.08)", border: `1px solid rgba(230,152,25,0.3)`, color: GOLD, padding: "2px 10px", borderRadius: 50, fontSize: 10, fontWeight: 800, fontFamily: HV, flexShrink: 0 }}>{step.time}</span>
                    </div>
                    <p style={{ fontSize: 13.5, color: "#111", lineHeight: 1.65, margin: 0, fontFamily: HV, fontWeight: 500 }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED (No arrows, clean bullets & black text) ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <SH eyebrow="Scope of Work" green="Everything that's" gold="included." mb={12} />
            <p style={{ fontSize: 15, color: "#111", margin: "0 auto 44px", maxWidth: 680, textAlign: "center", fontFamily: HV, lineHeight: 1.6, fontWeight: 600 }}>No hidden deliverables, no surprises. Exactly what we cover — from day one through ongoing compliance.</p>
          </Fade>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {INCLUDED.map((cat, ci) => {
              const c = INCLUDED_ACCENTS[ci];
              return (
                <Fade key={cat.cat} delay={ci * 80}>
                  <div className="gc spot-card" onMouseMove={handleSpotlight}
                    style={{
                      padding: "26px 22px",
                      animationDelay: `${ci * -3.5}s`,
                      borderTop: `4px solid ${c.acc}`,
                      borderLeft: "1px solid #111",
                      borderRight: "1px solid #111",
                      borderBottom: "1px solid #111",
                      '--spot-color': `${c.acc}15`
                    }}>
                    <div className="spot-card-content">
                      <div className="lbl" style={{ marginBottom: 16, color: c.acc, fontWeight: 800 }}>{cat.cat}</div>
                      <div style={{ borderTop: "1.5px solid #111" }} />
                      {cat.items.map((item, i) => (
                        <div key={i} className="row-div" style={{ display: "flex", alignItems: "center", padding: "11px 0", borderBottom: "1px solid #111" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.acc, marginRight: 10, flexShrink: 0 }} />
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: "#111", fontFamily: HV }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ (Accordion Layout with + / - Toggle & black text) ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <SH eyebrow="Common Questions" green="Questions we get" gold="every time." mb={44} />
          </Fade>
          {/* Vertical Stack Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 1000, margin: "0 auto" }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <Fade key={i} delay={i * 50}>
                  <div
                    onClick={() => toggleFaq(i)}
                    style={{
                      background: "#fff",
                      border: "1.5px solid #111",
                      borderRadius: 12,
                      padding: "20px 24px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: isOpen ? "0 8px 24px rgba(0,0,0,0.04)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                      <span style={{ fontSize: "14.5px", fontWeight: 800, color: "#111", fontFamily: HV }}>
                        {faq.q}
                      </span>
                      {/* + / - Toggle Indicator */}
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: isOpen ? GREEN : "rgba(0,0,0,0.03)",
                        border: "1px solid #111",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, fontWeight: 800, color: isOpen ? "#fff" : GREEN,
                        transition: "all 0.3s ease",
                        flexShrink: 0
                      }}>
                        {isOpen ? "−" : "+"}
                      </div>
                    </div>

                    {/* Collapsible Answer */}
                    <div style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease",
                      marginTop: isOpen ? 16 : 0,
                      borderTop: isOpen ? "1px solid #111" : "none",
                      paddingTop: isOpen ? 16 : 0,
                    }}>
                      <p style={{ fontSize: 13.5, color: "#111", lineHeight: 1.72, margin: 0, fontFamily: HV, fontWeight: 500 }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec" style={{ background: GREEN, borderTop: "1.5px solid #111", padding: "80px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div className="lbl" style={{ color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>Get Started</div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 16, letterSpacing: "-0.03em", fontFamily: HV }}>
            Ready to set up your India entity the right way?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, marginBottom: 32, fontFamily: HV, fontWeight: 500 }}>
            Book a free 30-minute structure review. We'll assess your business, recommend the right entity type and FDI route, and give you a clear week-by-week plan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
            <button className="lime-btn" style={{ background: GOLD, border: "1px solid #111" }} onClick={() => router.push(ROUTES.contact)}>Book Free Structure Review →</button>
            <a href="tel:+919915731447" className="ghost-dark" style={{ border: "1px solid #fff" }}>Call +91 99157 31447</a>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["Free 30-min consultation", "CA, CS & accountant team", "Response within 24 hours"].map(t => (
              <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: HV, fontWeight: 500 }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}