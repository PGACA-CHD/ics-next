'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/config';
import PricingSection from '@/app/PricingSection';

const ROUTES = {
  home: '/', services: '/setup', gcc: '/post-setup', tax: '/international-tax',
  hub: '/knowledge-hub', about: '/about', contact: '/contact', industries: '/industries',
  seo_fcri: '/foreign-company-registration-india', seo_sub: '/subsidiary-company-india',
  seo_tp: '/transfer-pricing-india', seo_fdi: '/fdi-rules-india',
};

const HV = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BDR = "1px solid #111";
const GREEN = "#0B3D2E";
const GOLD = "#e69819";
const HS = "clamp(22px, 3vw, 42px)";

const ENTITY_COLORS = {
  pvtltd: { primary: "#0B3D2E", bg: "rgba(11,61,46,0.05)", border: "1px solid #111" },
  llp: { primary: "#1a5c9a", bg: "rgba(26,92,154,0.05)", border: "1px solid #111" },
  subsidiary: { primary: "#e69819", bg: "rgba(230,152,25,0.05)", border: "1px solid #111" },
  branch: { primary: "#7a5f10", bg: "rgba(122,95,16,0.05)", border: "1px solid #111" },
  liaison: { primary: "#3a2d72", bg: "rgba(58,45,114,0.05)", border: "1px solid #111" },
};

function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Fade({ children, delay = 0, up = true }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const [ref, vis] = useReveal();

  if (isMobile) {
    return <div>{children}</div>;
  }

  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : (up ? 'translateY(22px)' : 'translateY(0)'),
      transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`
    }}>
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
    const steps = 40, stepTime = duration / steps;
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

function SH({ eyebrow, green, gold, center = true, mb = 40 }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: mb, fontFamily: HV }}>
      {eyebrow && (
        <p style={{ fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase", color: GREEN, fontWeight: 700, margin: "0 0 14px", fontFamily: HV }}>{eyebrow}</p>
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
    tax: "25.17%", fdi: "Automatic", rbi: "Not required", timeline: "2–3 wks",
    desc: "The most common structure for businesses in India. A Private Limited Company offers limited liability, separate legal existence, and the ability to raise funding. Ideal for startups, domestic businesses, joint ventures, and foreign-owned entities alike.",
    points: [
      "Separate legal entity — limited liability for shareholders",
      "Minimum 2 directors and 2 shareholders required",
      "At least one director must be an Indian resident",
      "No minimum paid-up capital requirement",
      "Corporate tax at 25.17% (22% base + surcharge + cess)",
      "Can accept FDI under Automatic Route (most sectors)",
      "SPICe+ e-filing: Certificate of Incorporation in 7–12 days",
      "Easily convertible to public company for future fundraising",
    ],
    docs: [
      "PAN & Aadhaar of all directors and shareholders",
      "Address proof (utility bill / bank statement)",
      "Passport-size photographs of all directors",
      "Proposed registered office address proof",
      "DSC (Digital Signature Certificate) for all directors",
    ],
    bestFor: "Startups, domestic businesses, joint ventures, foreign companies wanting full commercial operations in India",
  },
  llp: {
    letter: "L", title: "Limited Liability Partnership", badge: null,
    tax: "30%", fdi: "Gov. Approval", rbi: "Not required", timeline: "2–3 wks",
    desc: "An LLP combines the flexibility of a partnership with the protection of limited liability. Popular with professional services firms, small businesses, and joint ventures. Simpler compliance than a Pvt Ltd but less suitable for raising equity funding.",
    points: [
      "Partners have limited liability — personal assets protected",
      "Minimum 2 designated partners required",
      "At least one designated partner must be an Indian resident",
      "No minimum capital contribution required",
      "Taxed at 30% flat (no surcharge below ₹1 crore turnover)",
      "FDI permitted only via Government Approval Route",
      "Lower compliance burden vs. Pvt Ltd",
      "Cannot issue equity shares — not suitable for VC/PE funding",
    ],
    docs: [
      "PAN & Aadhaar of all designated partners",
      "Address proof of all designated partners",
      "Passport-size photographs",
      "Registered office address proof",
      "LLP Agreement (drafted and notarised)",
    ],
    bestFor: "Professional services firms, consulting businesses, small domestic businesses, joint ventures not seeking equity funding",
  },
  subsidiary: {
    letter: "W", title: "Wholly Owned Subsidiary", badge: "Foreign Co. Choice",
    tax: "25.17%", fdi: "Automatic", rbi: "Not required", timeline: "3–4 wks",
    desc: "A Private Limited Company where 100% shares are held by a foreign parent. The gold standard for foreign companies entering India — full commercial operations, complete ownership, and no Indian partner required.",
    points: [
      "100% foreign ownership — no Indian partner needed",
      "Full FDI via Automatic Route (most sectors)",
      "Complete control over operations and management",
      "Can earn, invoice, and repatriate profits freely",
      "Preferred structure for GCC, SaaS, manufacturing",
      "Corporate tax at 25.17% (new manufacturing: 17%)",
      "SPICe+ e-filing: Certificate of Incorporation in 7–12 days",
      "Intercompany transactions require transfer pricing documentation",
    ],
    docs: [
      "Certificate of Incorporation of parent company",
      "Memorandum & Articles of Association of parent",
      "Board resolution authorising India subsidiary",
      "KYC of directors: passport, address proof",
      "Proposed registered office address in India",
    ],
    bestFor: "GCC / Captive Centres, SaaS & Tech companies, Manufacturing, Any foreign company wanting 100% control",
  },
  branch: {
    letter: "B", title: "Branch Office", badge: null,
    tax: "40%", fdi: "RBI Approval", rbi: "Required", timeline: "6–8 wks",
    desc: "A branch office is an extension of the foreign parent in India — not a separate legal entity. It can undertake specific permitted activities but is taxed at 40% on India-sourced profits, making it expensive for most businesses.",
    points: [
      "Not a separate legal entity — parent is fully liable",
      "Requires prior RBI approval (Form FNC)",
      "Taxed at 40% on India-attributable profits",
      "Permitted: manufacturing, trading, professional services, R&D",
      "Cannot undertake retail trading or agriculture",
      "Profits can be repatriated after tax",
      "Annual Activity Certificate required from CA",
      "Good for specific project execution or export operations",
    ],
    docs: [
      "Latest audited financials of parent (last 5 years)",
      "Certificate of Incorporation of parent",
      "Memorandum & Articles of Association",
      "Board resolution for branch opening",
      "Banker's report from parent's bank",
    ],
    bestFor: "Project-based operations, Export/import businesses, Professional service firms with specific India engagements",
  },
  liaison: {
    letter: "O", title: "Liaison Office", badge: null,
    tax: "None", fdi: "RBI Approval", rbi: "Required", timeline: "6–8 wks",
    desc: "A liaison office cannot undertake commercial activity or earn revenue. Its sole purpose is market research, promoting the parent's products, and facilitating communication. All expenses must be funded by the parent via inward remittance.",
    points: [
      "Cannot earn any revenue in India",
      "No corporate tax — but no deductions either",
      "Requires RBI prior approval",
      "All expenses funded by parent remittances only",
      "Permitted: market research, promoting parent's products",
      "Not permitted: signing contracts, negotiating on parent's behalf",
      "Must file Annual Activity Certificate with RBI annually",
      "Best used as a stepping stone before full incorporation",
    ],
    docs: [
      "Latest audited financials of parent (last 3 years)",
      "Certificate of Incorporation of parent",
      "Board resolution for LO opening",
      "Banker's report from parent's bank",
      "Brief on proposed activities in India",
    ],
    bestFor: "Market assessment before committing to full setup, Companies exploring India before incorporation",
  },
};

const ENTITY_TABS = [
  ["pvtltd", "Pvt Ltd"],
  ["llp", "LLP"],
  ["subsidiary", "WOS"],
  ["branch", "Branch"],
  ["liaison", "Liaison"],
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
  { n: "04", title: "Certificate of Incorporation", time: "Wk 2–3", desc: "Ministry of Corporate Affairs issues Certificate of Incorporation (CIN). The company legally exists. PAN, TAN issued simultaneously. Typical time: 7–12 working days from filing." },
  { n: "05", title: "RBI & FEMA Compliance", time: "Wk 3–4", desc: "FCGPR filing with RBI within 30 days of receiving FDI. GST registration. Bank account opening. Payroll and TDS registration. First compliance calendar issued to client." },
  { n: "06", title: "Ongoing Compliance Retainer", time: "Month 2+", desc: "Monthly GST, TDS, and payroll filings. Quarterly advance tax. Annual TP benchmarking study, Form 3CEB, statutory audit, corporate tax return, and MCA annual filing." },
];

const INCLUDED = [
  { cat: "Incorporation", acc: "#0B3D2E", bg: "rgba(11,61,46,0.06)", items: ["Company name reservation (RUN)", "SPICe+ integrated filing", "Certificate of Incorporation", "PAN & TAN registration", "GST registration", "EPFO & ESIC registration"] },
  { cat: "Tax & FEMA", acc: "#e69819", bg: "rgba(230,152,25,0.06)", items: ["FCGPR filing with RBI", "Transfer pricing model design", "Intercompany MSA drafting", "DTAA analysis & TRC advice", "Form 15CA / 15CB", "Bank account opening support"] },
  { cat: "Ongoing (Retainer)", acc: "#1a5c9a", bg: "rgba(26,92,154,0.06)", items: ["Monthly GST return filing", "Monthly TDS / payroll filing", "Quarterly advance tax", "Annual Form 3CEB (TP)", "Statutory audit coordination", "Annual corporate tax return"] },
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

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{ fontFamily: HV, color: "#111", background: "#fff", overflowX: "hidden", maxWidth: "100vw" }}>
      <style>{`
        html, body { overflow-x: hidden; max-width: 100%; }
        *, *::before, *::after { box-sizing: border-box; }

        /* ── GLOBAL SECTION PADDING ── */
        .sec { padding: clamp(48px,8vw,96px) clamp(16px,5vw,56px); width: 100%; overflow-x: hidden; }
        .sec-sm { padding: clamp(40px,6vw,80px) clamp(16px,5vw,56px); }
        .inner { max-width: 1200px; margin: 0 auto; width: 100%; }

        /* ── HERO GRID ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 48px;
          align-items: start;
        }
        @media(max-width:900px){
          .hero-grid { grid-template-columns: 1fr; gap: 36px; }
        }

        /* ── STATS STRIP ── */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          overflow: hidden;
        }
        .stat-cell {
          padding: 16px 12px;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.25);
        }
        .stat-cell:last-child { border-right: none; }
        @media(max-width:600px){
          .stats-strip { grid-template-columns: 1fr 1fr; }
          .stat-cell { padding: 14px 8px; border-right: 1px solid rgba(255, 255, 255, 0.25); border-bottom: 1px solid rgba(255, 255, 255, 0.25); }
          .stat-cell:nth-child(2n) { border-right: none; }
          .stat-cell:nth-child(n+3) { border-bottom: none; }
        }

        /* ── ENTITY TABS ── */
        .entity-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          justify-content: center;
          padding-bottom: 4px;
        }
        .entity-tabs::-webkit-scrollbar { display: none; }
        @media(max-width:640px){
          .entity-tabs {
            justify-content: flex-start;
            padding: 4px 8px;
            gap: 6px;
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 12px;
            background: rgba(0,0,0,0.02);
          }
        }

        /* ── TWO COL / THREE COL ── */
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: start;
        }
        .three-col {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 18px;
        }
        @media(max-width:900px){
          .two-col   { grid-template-columns: 1fr; }
          .three-col { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width:540px){
          .three-col { grid-template-columns: 1fr; }
        }

        /* ── HANDLE GRID (hero right panel) ── */
        .handle-panel {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .handle-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        /* ── ENTITY METRICS GRID ── */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 8px;
          padding: 14px 0;
          border-top: 1.5px solid #111;
          border-bottom: 1.5px solid #111;
          margin-bottom: 18px;
        }
        @media(max-width:480px){
          .metrics-grid { grid-template-columns: repeat(2,1fr); gap: 12px; }
        }

        /* ── KEY FEATURES (plain tick list, no boxes) ── */
        .feature-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; min-width: 0; }
        .feature-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 4px 0;
          min-width: 0;
        }
        .feature-tick {
          width: 18px; height: 18px; border-radius: 50%;
          flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: #fff;
        }
        .feature-text {
          font-size: clamp(11px,1.2vw,13px); font-weight: 600; color: #111;
          font-family: ${HV}; line-height: 1.5;
          min-width: 0; overflow-wrap: break-word; word-break: break-word;
        }

        /* ── PROCESS TIMELINE ── */
        .timeline-wrap {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 850px;
          margin: 0 auto;
          position: relative;
          width: 100%;
        }
        .timeline-line {
          position: absolute;
          left: 23px;
          top: 24px;
          bottom: 24px;
          width: 2px;
          background: rgba(11,61,46,0.18);
        }
        .timeline-row {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          position: relative;
          cursor: pointer;
          width: 100%;
        }
        .timeline-node {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          z-index: 2;
          flex-shrink: 0;
          transition: all 0.4s ease;
        }
        @media(max-width:480px){
          .timeline-line { left: 19px; }
          .timeline-node { width: 40px; height: 40px; font-size: 11px; }
        }

        /* ── COMPARISON TABLE (responsive, slightly larger type) ── */
        .table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%; max-width: 100%; }
        .cmp-table { width: 100%; min-width: 460px; border-collapse: collapse; border: 1.5px solid #111; font-family: ${HV}; table-layout: fixed; }
        .cmp-table th, .cmp-table td { word-break: break-word; }
        @media(max-width:600px){
          .cmp-table { min-width: 100%; }
          .cmp-table th, .cmp-table td { font-size: 9px !important; padding: 6px 3px !important; letter-spacing: 0px !important; white-space: normal !important; word-wrap: break-word !important; }
        }
        @media(max-width:480px){
          .cmp-table { min-width: 100%; }
          .cmp-table th, .cmp-table td { font-size: 8px !important; padding: 4px 1px !important; letter-spacing: 0px !important; white-space: normal !important; word-wrap: break-word !important; }
        }

        /* ── CARDS ── */
        .gc {
          background: #fff;
          border: ${BDR};
          border-radius: 16px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .gc:hover { transform: translateY(-4px); border-color: rgba(11,61,46,0.3); box-shadow: 0 12px 36px rgba(11,61,46,0.09); }
        .gc-static { background: #fff; border: ${BDR}; border-radius: 16px; }
        .lbl { font-size: 10px; letter-spacing: 0.42em; text-transform: uppercase; font-weight: 700; color: #111; font-family: ${HV}; }

        /* ── BUTTONS ── */
        .lime-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${GREEN}; color: #fff;
          font-family: ${HV}; font-size: clamp(13px,1.5vw,15px); font-weight: 700;
          padding: 13px 24px; border-radius: 6px; border: none; cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease; text-decoration: none;
          white-space: nowrap;
        }
        .lime-btn:hover { background: #0a3d2c; transform: translateY(-1px); }
        .ghost-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #111;
          font-family: ${HV}; font-size: clamp(13px,1.5vw,15px); font-weight: 600;
          padding: 13px 24px; border-radius: 6px; border: ${BDR}; cursor: pointer;
          transition: all 0.2s; text-decoration: none; white-space: nowrap;
        }
        .ghost-btn:hover { background: #111; color: #fff; }
        .ghost-dark {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff;
          font-family: ${HV}; font-size: clamp(13px,1.5vw,15px); font-weight: 600;
          padding: 13px 24px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.25);
          cursor: pointer; transition: all 0.2s; text-decoration: none; white-space: nowrap;
        }
        .ghost-dark:hover { background: rgba(255,255,255,0.08); }

        /* ── TAB BUTTONS ── */
        .tab-off {
          background: #fff; border: ${BDR}; color: #111;
          padding: 9px 16px; border-radius: 8px; cursor: pointer;
          font-family: ${HV}; font-size: 12px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 6px;
          transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
        }
        .tab-off:hover { background: #f5f5f5; }
        .tab-on {
          background: ${GREEN}; border: 1px solid ${GREEN}; color: #fff;
          padding: 9px 16px; border-radius: 8px; cursor: pointer;
          font-family: ${HV}; font-size: 12px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap; flex-shrink: 0;
        }

        /* ── SPOT CARD ── */
        .spot-card { position: relative; overflow: hidden; --mouse-x: 50%; --mouse-y: 50%; }
        .spot-card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(circle at center, var(--spot-color, rgba(11,61,46,0.08)) 0%, transparent 70%);
          background-size: 200% 200%; background-position: 50% 50%;
          opacity: 0.85; animation: floatSpotlight 15s ease-in-out infinite;
          animation-delay: inherit; transition: opacity .5s ease;
        }
        .spot-card:hover::before, .spot-card:focus-within::before {
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spot-color, rgba(11,61,46,0.08)), transparent 70%);
          background-size: 100% 100%; background-position: 0 0;
          animation: none; opacity: 1;
        }
        .spot-card-content { position: relative; z-index: 1; }
        .row-div { border-bottom: 1px solid #111; }
        .row-div:last-child { border-bottom: none; }

        /* ── DOCUMENTS REQUIRED — plain pill, no animation/hover styling ── */
        .doc-pill {
          display: flex; align-items: center; gap: 10px;
          font-size: clamp(11px,1.2vw,13px); color: #111;
          padding: 10px 14px; background: #fafafa;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 999px; font-family: ${HV};
        }
        .doc-pill span { font-weight: 600; }

        /* ── BTN ROW WRAP ── */
        .btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        @media(max-width:480px){
          .btn-row > * { width: 100%; justify-content: center; }
        }
        .cta-btn-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }
        @media(max-width:480px){
          .cta-btn-row > * { width: 100%; justify-content: center; }
        }

        /* ── FAQ ── */
        .faq-wrap { display: flex; flex-direction: column; gap: 12px; max-width: 1000px; margin: 0 auto; }

        /* ── ANIMATIONS ── */
        @keyframes floatSpotlight {
          0%   { background-position: 50% 50%; }
          25%  { background-position: 80% 20%; }
          50%  { background-position: 20% 80%; }
          75%  { background-position: 80% 80%; }
          100% { background-position: 50% 50%; }
        }
        @keyframes popTimelineNode {
          0%   { transform: scale(0.3); opacity: 0; }
          50%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .timeline-node-anim { animation: popTimelineNode 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        /* ── COMPREHENSIVE MOBILE ── */
        @media(max-width:768px){
          .hero-grid { gap: 28px !important; }
          .timeline-wrap { gap: 12px; }
          .two-col { gap: 16px; }
          .three-col { gap: 14px; }
          .timeline-node-item {
            background: #fff !important;
            border: 2.5px solid rgba(0,0,0,0.18) !important;
            color: #0B3D2E !important;
            transition: none !important;
          }
          .timeline-card-item {
            border: 1px solid rgba(0,0,0,0.15) !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02) !important;
            transform: none !important;
            transition: none !important;
          }
        }
        @media(max-width:600px){
          .sec { padding: clamp(36px,7vw,72px) 16px !important; }
          .sec-sm { padding: clamp(32px,5vw,56px) 16px !important; }
          .hero-grid { gap: 22px !important; }
          .handle-panel { gap: 10px; }
          .handle-row { gap: 10px; }
          .timeline-row { gap: 10px; }
          .faq-wrap { gap: 8px; }
          .btn-row { gap: 10px; margin-bottom: 24px; }
          .cta-btn-row { gap: 10px; }
          .gc-static { padding: 18px 14px !important; }
          .gc { padding: 18px 14px !important; }
          .doc-pill { padding: 9px 12px !important; }
          .feature-row { padding: 3px 0; }
          .feature-text { font-size: 11px !important; line-height: 1.4 !important; }
          .feature-tick { width: 15px !important; height: 15px !important; font-size: 9px !important; }
          .metrics-grid { gap: 6px !important; padding: 10px 0 !important; }
          .cmp-table th, .cmp-table td { padding: 8px 5px !important; font-size: 11px !important; }
          .entity-tabs { gap: 4px; }
          .tab-on, .tab-off { padding: 7px 12px !important; font-size: 11px !important; }
        }
        @media(max-width:420px){
          .sec { padding: clamp(28px,6vw,48px) 12px !important; }
          .entity-tabs { gap: 4px; }
          .tab-on, .tab-off { padding: 7px 9px !important; font-size: 10px !important; }
          .lime-btn { font-size: 12px; padding: 11px 14px; }
          .ghost-btn { font-size: 12px; padding: 11px 14px; }
          .ghost-dark { font-size: 12px; padding: 11px 14px; }
          .handle-panel { gap: 8px; }
          .handle-row { gap: 8px; }
          .timeline-wrap { gap: 8px; }
          .timeline-row { gap: 8px; }
          .faq-wrap { gap: 6px; }
          .gc-static { padding: 14px 10px !important; }
          .gc { padding: 14px 10px !important; }
          .metrics-grid { gap: 6px !important; padding: 8px 0 !important; }
          .doc-pill { padding: 7px 9px !important; font-size: 10px !important; }
          .stat-cell { padding: 10px 5px; }
          .cmp-table th, .cmp-table td { padding: 6px 3px !important; font-size: 9.5px !important; }

          /* Entity overview card — Key Features / labels / heading compaction */
          .feature-text { font-size: 10.5px !important; line-height: 1.4 !important; }
          .feature-tick { width: 14px !important; height: 14px !important; font-size: 8px !important; }
          .feature-row { padding: 2px 0 !important; }
          h3 { font-size: 16px !important; }
          .lbl { font-size: 9px !important; letter-spacing: 0.2em !important; }

        }

        /* ── DIVIDER UTILS ── */
        .border-top { border-top: 1px solid #111; }
      `}</style>


      <section className="sec" style={{ backgroundImage: "url('/banners and logos/private-limited-company-registration (main).png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="inner">
          <div className="hero-grid">

            {/* LEFT */}
            <div>
              <div className="lbl" style={{ color: 'WHITE', letterSpacing: "0.3em", marginBottom: 20 }}>Company Incorporation &amp; Setup</div>
              <h1 style={{
                fontSize: "clamp(32px,5.5vw,72px)", fontWeight: 800,
                lineHeight: 1.04, letterSpacing: "-0.033em",
                margin: "0 0 20px", fontFamily: HV
              }}>
                <span style={{ color: 'WHITE' }}>Set up your India entity —</span>{" "}
                <em style={{ color: GOLD, fontStyle: "italic", fontWeight: 800 }}>structured correctly from day one.</em>
              </h1>
              <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#ffffffff", lineHeight: 1.78, maxWidth: 520, margin: "0 0 28px", fontFamily: HV }}>
                India entry is not just an incorporation exercise. The legal structure, FDI route, transfer pricing model, and DTAA analysis must be decided <em>before</em> the first filing. We design the full picture first — then we file.
              </p>

              <div className="btn-row">
                <button className="lime-btn" onClick={() => router.push(ROUTES.contact)}>Get Free Structure Review →</button>
                <button className="ghost-btn" onClick={() => router.push(ROUTES.gcc)}>Post Setup →</button>
              </div>

              {/* Stats strip */}
              <div className="stats-strip">
                {[
                  { target: 100, suffix: "+", label: "Companies incorporated" },
                  { prefix: "7-", target: 12, suffix: "", label: "Days to incorporate" },
                  { target: 18, suffix: "+", label: "Years of experience" },
                  { target: 4, suffix: " wks", label: "End-to-end setup" },
                ].map((s, i) => (
                  <div key={i} className="stat-cell">
                    <div style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 800, color: "#ffffff", lineHeight: 1, fontFamily: HV }}>
                      <CountUp target={s.target} suffix={s.suffix} prefix={s.prefix || ''} delay={i * 200} />
                    </div>
                    <div style={{ fontSize: 11, color: "#ffffffff", marginTop: 6, fontFamily: HV, fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — what we handle */}
            <div className="gc-static" style={{ padding: "24px 20px" }}>
              <div className="lbl" style={{ letterSpacing: "0.25em", marginBottom: 18 }}>What We Handle — End to End</div>
              <div className="handle-panel">
                {HANDLE.map(([val, title, sub], i) => (
                  <Fade key={title} delay={i * 80}>
                    <div className="handle-row">
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: "rgba(11,61,46,0.06)", border: "1.5px solid #111",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 800, color: GREEN, flexShrink: 0
                      }}>{val}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 2, fontFamily: HV }}>{title}</div>
                        <div style={{ fontSize: 12, color: "#333", lineHeight: 1.5, fontFamily: HV }}>{sub}</div>
                      </div>
                    </div>
                  </Fade>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ENTITY SELECTOR
      ════════════════════════════════════════ */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="inner">
          <Fade>
            <SH eyebrow="Entity Types" green="Which India entity is" gold="right for you?" mb={10} />
            <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "#111", margin: "0 auto 28px", maxWidth: 680, textAlign: "center", fontFamily: HV, lineHeight: 1.6, fontWeight: 600 }}>
              Your entity choice determines tax rate, activity scope, compliance burden, and FDI route. Select each to explore in detail.
            </p>

            {/* Tabs — horizontally scrollable on mobile */}
            <div className="entity-tabs" style={{ marginBottom: 24 }}>
              {ENTITY_TABS.map(([key, label]) => (
                <button key={key} className={active === key ? "tab-on" : "tab-off"} onClick={() => setActive(key)}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: active === key ? GOLD : "#111",
                    transition: "all 0.25s ease",
                    transform: active === key ? "scale(1.5)" : "scale(1)",
                    flexShrink: 0,
                  }} />
                  {label}
                </button>
              ))}
            </div>
          </Fade>

          {/* 2-col detail */}
          <div className="two-col">

            {/* LEFT — overview */}
            <Fade>
              <div className="gc-static" style={{ padding: "24px 20px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 800, color: ec.primary, margin: 0, letterSpacing: "-0.02em", fontFamily: HV }}>{ent.title}</h3>
                    {ent.badge && (
                      <span style={{ display: "inline-block", fontSize: 9, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: ec.primary, color: "#fff", padding: "3px 8px", borderRadius: 4, marginTop: 4, fontFamily: HV }}>{ent.badge}</span>
                    )}
                  </div>
                </div>

                {/* Metrics */}
                <div className="metrics-grid">
                  {[["Tax Rate", ent.tax], ["FDI Route", ent.fdi], ["RBI Approval", ent.rbi], ["Timeline", ent.timeline]].map(([l, v]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "clamp(11px,1.2vw,13px)", fontWeight: 800, color: ec.primary, marginBottom: 3, fontFamily: HV }}>{v}</div>
                      <div style={{ fontSize: 9, color: "#111", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: HV }}>{l}</div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "clamp(12px,1.3vw,13.5px)", color: "#111", lineHeight: 1.75, margin: "0 0 16px", fontFamily: HV, fontWeight: 500 }}>{ent.desc}</p>

                {/* Key Features — plain tick + text, light border removed from box, no box */}
                <div className="lbl" style={{ color: GOLD, letterSpacing: "0.25em", marginBottom: 12 }}>Key Features</div>
                <div className="feature-list">
                  {ent.points.map((pt, i) => (
                    <div key={i} className="feature-row">
                      <span className="feature-tick" style={{ background: ec.primary }}>✓</span>
                      <span className="feature-text">{pt}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "auto", background: "rgba(230,152,25,0.08)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, padding: "12px 14px" }}>
                  <div className="lbl" style={{ color: GOLD, letterSpacing: "0.25em", marginBottom: 5 }}>Best For</div>
                  <div style={{ fontSize: "clamp(11px,1.2vw,12.5px)", color: "#111", lineHeight: 1.6, fontFamily: HV, fontWeight: 600 }}>{ent.bestFor}</div>
                </div>
              </div>
            </Fade>

            {/* RIGHT — docs + comparison + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Docs — plain pills, no animation */}
              <Fade delay={80}>
                <div className="gc-static" style={{ padding: "24px 20px" }}>
                  <div className="lbl" style={{ color: GOLD, letterSpacing: "0.25em", marginBottom: 16 }}>Documents Required</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {ent.docs.map((doc, i) => (
                      <div key={doc} className="doc-pill">
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>

              {/* Comparison table */}
              <Fade delay={120}>
                <div className="gc-static" style={{ padding: "24px 20px" }}>
                  <div className="lbl" style={{ color: GOLD, letterSpacing: "0.25em", marginBottom: 16 }}>Quick Comparison</div>
                  <div className="table-scroll">
                    <table className="cmp-table">
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#111", padding: "10px 8px", borderBottom: "2.5px solid #111", borderRight: "1.5px solid #111" }}>Criteria</th>
                          {["Pvt Ltd", "LLP", "WOS", "Branch", "Liaison"].map((h, i) => (
                            <th key={h} style={{
                              fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px",
                              color: i === activeIdx ? "#fff" : GREEN,
                              padding: "10px 6px", textAlign: "center",
                              background: i === activeIdx ? GREEN : "rgba(11,61,46,0.04)",
                              borderBottom: "2.5px solid #111",
                              borderRight: i < 4 ? "1.5px solid #111" : "none",
                              transition: "all 0.3s ease"
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {COMPARISON.map(([label, ...vals]) => (
                          <tr key={label}>
                            <td style={{ fontSize: 11.5, fontWeight: 700, color: "#111", padding: "11px 8px", borderBottom: "1.5px solid #111", borderRight: "1.5px solid #111", whiteSpace: "nowrap" }}>{label}</td>
                            {vals.map((v, j) => (
                              <td key={j} style={{
                                fontSize: 12, fontWeight: 800,
                                color: v === "✔" ? GREEN : (v === "✖" ? "#d32f2f" : "#111"),
                                padding: "11px 5px", textAlign: "center",
                                borderBottom: "1.5px solid #111",
                                borderRight: j < 4 ? "1.5px solid #111" : "none",
                                background: j === activeIdx ? "rgba(11,61,46,0.04)" : "transparent",
                                transition: "all 0.3s ease"
                              }}>{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: 10.5, color: "#111", margin: "10px 0 0", fontStyle: "italic", fontFamily: HV, fontWeight: 600, textAlign: "center" }}>*Specifications vary for regulated sectors like banking and defense.</p>
                </div>
              </Fade>

              {/* CTA */}
              <button className="lime-btn" style={{ width: "100%", justifyContent: "center", padding: "14px", border: "1px solid #111", borderRadius: 10 }} onClick={() => router.push(ROUTES.contact)}>
                Discuss {ent.title} Setup →
              </button>
            </div>
          </div>
        </div>
      </section>


      <section className="sec" style={{ background: "#fff" }}>
        <div className="inner">
          <Fade>
            <SH eyebrow="Step-by-Step Process" green="From decision to fully operational —" gold="exactly what happens." mb={10} />
            <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "#111", margin: "0 auto 36px", maxWidth: 680, textAlign: "center", fontFamily: HV, lineHeight: 1.6, fontWeight: 600 }}>
              No surprises, no hidden steps. Here is the complete journey, week by week.
            </p>
          </Fade>

          <div className="timeline-wrap">
            <div className="timeline-line" />
            {PROCESS.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div key={step.n} className="timeline-row" onClick={() => setActiveStep(i)}>
                  <div className="timeline-node timeline-node-item" style={{
                    background: isActive ? GREEN : "#fff",
                    border: `2.5px solid ${isActive ? GREEN : "rgba(0,0,0,0.18)"}`,
                    color: isActive ? "#fff" : GREEN,
                    fontFamily: HV,
                  }}>{step.n}</div>
                  <div className="timeline-card-item" style={{
                    flex: 1,
                    minWidth: 0,
                    background: "#fff",
                    border: `1px solid ${isActive ? GREEN : "rgba(0,0,0,0.15)"}`,
                    borderRadius: 14,
                    padding: "16px 18px",
                    boxShadow: isActive ? "0 8px 24px rgba(11,61,46,0.06)" : "0 2px 10px rgba(0,0,0,0.02)",
                    transform: isActive ? "translateX(4px)" : "none",
                    transition: "all 0.4s ease"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 800, color: "#111", fontFamily: HV }}>{step.title}</span>
                      <span style={{ marginLeft: "auto", background: "rgba(230,152,25,0.08)", border: "1px solid rgba(230,152,25,0.3)", color: GOLD, padding: "2px 10px", borderRadius: 50, fontSize: 10, fontWeight: 800, fontFamily: HV, flexShrink: 0 }}>{step.time}</span>
                    </div>
                    <p style={{ fontSize: "clamp(12px,1.3vw,13.5px)", color: "#111", lineHeight: 1.65, margin: 0, fontFamily: HV, fontWeight: 500 }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff" }}>
        <div className="inner">
          <Fade>
            <SH eyebrow="Scope of Work" green="Everything that's" gold="included." mb={10} />
            <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "#111", margin: "0 auto 36px", maxWidth: 680, textAlign: "center", fontFamily: HV, lineHeight: 1.6, fontWeight: 600 }}>
              No hidden deliverables, no surprises. Exactly what we cover — from day one through ongoing compliance.
            </p>
          </Fade>
          <div className="three-col">
            {INCLUDED.map((cat, ci) => (
              <Fade key={cat.cat} delay={ci * 80}>
                <div className="gc spot-card" onMouseMove={handleSpotlight} style={{
                  padding: "22px 18px",
                  animationDelay: `${ci * -3.5}s`,
                  borderTop: `4px solid ${cat.acc}`,
                  borderLeft: "1px solid #111",
                  borderRight: "1px solid #111",
                  borderBottom: "1px solid #111",
                  '--spot-color': `${cat.acc}15`
                }}>
                  <div className="spot-card-content">
                    <div className="lbl" style={{ letterSpacing: "0.25em", marginBottom: 14, color: cat.acc }}>{cat.cat}</div>
                    {cat.items.map((item, i) => (
                      <div key={i} className="row-div" style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i === cat.items.length - 1 ? "none" : "1px solid #111" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: cat.acc, marginRight: 10, flexShrink: 0 }} />
                        <span style={{ fontSize: "clamp(12px,1.3vw,13.5px)", fontWeight: 600, color: "#111", fontFamily: HV }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>
      <PricingSection />

      <section className="sec" style={{ background: "#fff" }}>
        <div className="inner">
          <Fade>
            <SH eyebrow="Common Questions" green="Questions we get" gold="every time." mb={36} />
          </Fade>
          <div className="faq-wrap">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <Fade key={i} delay={i * 40}>
                  <div onClick={() => toggleFaq(i)} style={{
                    background: "#fff", border: "1.5px solid #111", borderRadius: 12,
                    padding: "18px 20px", cursor: "pointer", transition: "all 0.3s ease",
                    boxShadow: isOpen ? "0 8px 24px rgba(0,0,0,0.04)" : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                      <span style={{ fontSize: "clamp(13px,1.4vw,14.5px)", fontWeight: 800, color: "#111", fontFamily: HV, lineHeight: 1.4 }}>{faq.q}</span>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        background: isOpen ? GREEN : "rgba(0,0,0,0.03)",
                        border: "1px solid #111",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, fontWeight: 800, color: isOpen ? "#fff" : GREEN,
                        transition: "all 0.3s ease"
                      }}>{isOpen ? "−" : "+"}</div>
                    </div>
                    <div style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease",
                      marginTop: isOpen ? 14 : 0,
                      borderTop: isOpen ? "1px solid #111" : "none",
                      paddingTop: isOpen ? 14 : 0,
                    }}>
                      <p style={{ fontSize: "clamp(12px,1.3vw,13.5px)", color: "#111", lineHeight: 1.72, margin: 0, fontFamily: HV, fontWeight: 500 }}>{faq.a}</p>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>



    </div>
  );
}
