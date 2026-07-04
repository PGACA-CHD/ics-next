'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T, CALENDLY_URL, PHONE, PHONE_RAW } from '@/lib/config';
import { submitToZoho, trackConsultationRequest, trackGuideDownload, trackWhatsApp } from '@/lib/utils';
import PricingTabsSection from './pricing';

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

// ── Inline SVG icons for Industries & Global Reach ───────────────────────────
const iconWrap = (path, bg) => (
  <div style={{ width:56, height:56, borderRadius:"50%", background:bg,
    display:"flex", alignItems:"center", justifyContent:"center" }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  </div>
);
const LaptopIcon  = () => iconWrap(<><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M0 21h24"/></>, "#E8F3EE");
const BuildingIcon= () => iconWrap(<><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V11h6v10"/></>, "#FBF0DD");
const BankIcon    = () => iconWrap(<><path d="M3 9l9-7 9 7v11H3z"/><path d="M9 22V12h6v10"/></>, "#EDE8F6");
const FactoryIcon = () => iconWrap(<><path d="M2 20V10l6-4v4l6-4v4l6-4v14H2z"/></>, "#E8F0F5");
const MedicalIcon = () => iconWrap(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></>, "#F0EBE8");
const CartIcon    = () => iconWrap(<><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>, "#E8F3EE");
const ClientsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const GlobeIcon   = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const MarketIcon  = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
  </svg>
);
const StarIcon    = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);

// ─── HERO GLOBE (amCharts 4 — rotating orthographic globe with city dots) ────
function HeroGlobe() {
  const divRef = useRef(null);

  useEffect(() => {
    const ids = [
      { id: "am4-core",     src: "https://www.amcharts.com/lib/4/core.js" },
      { id: "am4-maps",     src: "https://www.amcharts.com/lib/4/maps.js" },
      { id: "am4-geodata",  src: "https://www.amcharts.com/lib/4/geodata/worldLow.js" },
      { id: "am4-animated", src: "https://www.amcharts.com/lib/4/themes/animated.js" },
    ];

    let loaded = 0;
    let chart = null;

    function initChart() {
      const am4core  = window.am4core;
      const am4maps  = window.am4maps;
      const am4themes_animated = window.am4themes_animated;
      const am4geodata_worldLow = window.am4geodata_worldLow;
      if (!am4core || !am4maps || !am4themes_animated || !am4geodata_worldLow) return;
      if (!divRef.current) return;

      am4core.useTheme(am4themes_animated);

      chart = am4core.create(divRef.current, am4maps.MapChart);
      chart.geodata = am4geodata_worldLow;
      chart.projection = new am4maps.projections.Orthographic();
      chart.panBehavior = "rotateLongLat";
      chart.deltaLatitude = -20;
      chart.padding(20, 20, 20, 20);
      chart.logo.disabled = true;

      // Disable zoom completely
      chart.seriesContainer.draggable = false;
      chart.seriesContainer.resizable = false;
      chart.maxZoomLevel = 1;
      chart.minZoomLevel = 1;

      // Countries
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      const pt = polygonSeries.mapPolygons.template;
      pt.tooltipText = "";
      pt.fill        = am4core.color("#acacacff");
      pt.stroke      = am4core.color("#000000ff");
      pt.strokeWidth = 0.4;
      pt.cursorOverStyle = am4core.MouseCursorStyle.default;

      // Hover — subtle only
      const hs = pt.states.create("hover");
      hs.properties.fill = am4core.color("#f0f0f0");

      // Graticule lines
      const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
      graticuleSeries.mapLines.template.line.stroke        = am4core.color("#ffffff");
      graticuleSeries.mapLines.template.line.strokeOpacity = 0.05;
      graticuleSeries.fitExtent = false;

      // Ocean
      chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
      chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#06120D");

      // Connection city dots — India hub + 6 client cities
      const cities = [
        { title:"India (Hub)", latitude:20.5937, longitude:78.9629, hub:true  },
        { title:"New York",    latitude:40.7128, longitude:-74.006, hub:false },
        { title:"London",      latitude:51.5074, longitude:-0.1278, hub:false },
        { title:"Dubai",       latitude:25.2048, longitude:55.2708, hub:false },
        { title:"Singapore",   latitude:1.3521,  longitude:103.8198,hub:false },
        { title:"Sydney",      latitude:-33.8688,longitude:151.2093,hub:false },
        { title:"Frankfurt",   latitude:50.1109, longitude:8.6821,  hub:false },
      ];

      // Connecting lines from India hub to each city
      const lineSeries = chart.series.push(new am4maps.MapLineSeries());
      lineSeries.mapLines.template.line.strokeWidth = 1;
      lineSeries.mapLines.template.line.stroke      = am4core.color("#ff0000ff");
      lineSeries.mapLines.template.line.strokeOpacity = 0.55;
      lineSeries.mapLines.template.line.strokeDasharray = "3,3";
      lineSeries.mapLines.template.shortestDistance = true;

      const hub = cities[0];
      lineSeries.data = cities.slice(1).map(c => ({
        multiGeoLine: [[
          { latitude: hub.latitude, longitude: hub.longitude },
          { latitude: c.latitude,   longitude: c.longitude   },
        ]],
      }));

      const imageSeries = chart.series.push(new am4maps.MapImageSeries());
      const imageTemplate = imageSeries.mapImages.template;
      imageTemplate.propertyFields.longitude = "longitude";
      imageTemplate.propertyFields.latitude  = "latitude";
      imageTemplate.nonScaling = true;
      imageTemplate.tooltipText = "{title}";

      // Outer glow circle
      const circle2 = imageTemplate.createChild(am4core.Circle);
      circle2.radius   = 10;
      circle2.fill     = am4core.color("#fb0000ff");
      circle2.fillOpacity = 0.15;
      circle2.strokeWidth = 0;
      circle2.propertyFields.fillOpacity = "pulseOpacity";

      // Main dot
      const circle = imageTemplate.createChild(am4core.Circle);
      circle.radius   = 4;
      circle.fill     = am4core.color("#ff0000ff");
      circle.stroke   = am4core.color("#ffffff");
      circle.strokeWidth = 1.5;
      circle.propertyFields.radius = "dotRadius";
      circle.propertyFields.fill   = "dotColor";

      imageSeries.data = cities.map(c => ({
        ...c,
        dotRadius: c.hub ? 6 : 4,
        dotColor:  c.hub ? "#f60000ff" : "#ff0000ff",
        pulseOpacity: c.hub ? 0.25 : 0.12,
      }));

      // Slow continuous rotation
      setTimeout(() => {
        chart.animate({ property:"deltaLongitude", to:100000 }, 20000000);
      }, 2000);
    }

    function onScriptLoad() {
      loaded++;
      if (loaded === ids.length) initChart();
    }

    ids.forEach(({ id, src }) => {
      if (document.getElementById(id)) { loaded++; if (loaded === ids.length) initChart(); return; }
      const s = document.createElement("script");
      s.id = id; s.src = src; s.async = false; s.onload = onScriptLoad;
      document.head.appendChild(s);
    });

    return () => { if (chart) chart.dispose(); };
  }, []);

  return (
    <div ref={divRef} style={{ width:"100%", height:"420px", borderRadius:12, overflow:"hidden" }}/>
  );
}

// ─── PROCESS STEP (animated on scroll, original layout) ──────────────────────
function ProcessStep({ step, i, total }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display:"grid", gridTemplateColumns:"64px 1fr",
      gap:24, position:"relative",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-20px)",
      transition:`opacity 0.45s ease ${i * 120}ms, transform 0.45s ease ${i * 120}ms`,
    }}>
      {/* Connector line */}
      {i < total - 1 && (
        <div style={{
          position:"absolute", left:31, top:52, bottom:-1,
          width:2,
          background: visible
            ? `linear-gradient(${T.f}66, ${T.bdr})`
            : T.bdr,
          transition:`background 0.5s ease ${i * 120 + 300}ms`,
        }}/>
      )}

      {/* Number bubble */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:4 }}>
        <div style={{
          width:48, height:48, background: visible ? T.f : "#fff",
          borderRadius:"50%", border:`2px solid ${visible ? T.f : T.bdr}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          flexShrink:0,
          boxShadow: visible ? `0 0 0 5px ${T.stone}, 0 0 0 7px ${T.f}33` : "none",
          transition:`background 0.35s ease ${i * 120 + 150}ms, border-color 0.35s ease ${i * 120 + 150}ms, box-shadow 0.35s ease ${i * 120 + 150}ms`,
        }}>
          <span className="font-number" style={{
            fontSize:14, color: visible ? "#fff" : T.lt, fontWeight:600,
            transition:`color 0.3s ease ${i * 120 + 200}ms`,
          }}>{step.n}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingBottom: i < total - 1 ? 40 : 0, textAlign:"left" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <h3 style={{ fontSize:16.5, fontWeight:600, color:T.ch }}>{step.title}</h3>
          <span style={{ fontSize:11, background:T.s, color:"#fff",
            padding:"2px 10px", borderRadius:50, fontWeight:600,
            letterSpacing:.3, flexShrink:0 }}>{step.time}</span>
        </div>
        <p style={{ fontSize:14, color:T.mid, lineHeight:1.78, fontWeight:300, margin:0 }}>{step.desc}</p>
      </div>
    </div>
  );
}

// ─── STATS RIBBON ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, suffix = "") {
  const [display, setDisplay] = useState("0" + suffix);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const isNum = typeof target === "number";
      if (!isNum) { setDisplay(target); return; }
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(ease * target) + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);
  return [display, ref];
}

function StatCell({ target, suffix = "", label }) {
  const [display, ref] = useCountUp(target, 1600, suffix);
  return (
    <div ref={ref}>
      {/* Number */}
      <div className="font-number" style={{
        fontSize:"clamp(28px,3vw,42px)",
        fontWeight:400,
        color:"#fff",
        lineHeight:1,
        letterSpacing:"-.02em",
        marginBottom:10,
      }}>
        {display}
      </div>
      {/* Label */}
      <div style={{
        fontSize:10,
        letterSpacing:"0.12em",
        textTransform:"uppercase",
        color:"rgba(255,255,255,.38)",
        fontWeight:500,
        lineHeight:1.6,
        whiteSpace:"pre-line",
      }}>
        {label}
      </div>
    </div>
  );
}

function StatsRibbon() {
  return (
    <section style={{
      background: T.f,
      padding: "80px 56px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle grid texture */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),
          linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)`,
        backgroundSize:"48px 48px" }}/>

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>

        {/* Eyebrow */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:56 }}>
          <div style={{ width:24, height:1, background:T.sl, opacity:.7 }}/>
          <span style={{ fontSize:10, letterSpacing:"0.42em", textTransform:"uppercase",
            color:T.sl, fontWeight:700, opacity:.8 }}>Track Record</span>
        </div>

        {/* Stats — 5 columns, clean dividers */}
        <div className="stats-grid">
          {[
            { target:100, suffix:"+",     label:"Entities\nIncorporated" },
            { target:18,  suffix:" yrs",  label:"In Continuous\nPractice" },
            { target:22,  suffix:" days", label:"Median Time to\nOperational Entity" },
            { target:0,   suffix:"",      label:"Transfer Pricing\nAudits Lost" },
            { target:90,  suffix:"+",     label:"Treaty Jurisdictions\nCovered" },
          ].map((s, i) => (
            <div key={s.label} className="stat-cell" style={{
              paddingLeft:  i > 0 ? 40 : 0,
              paddingRight: i < 4 ? 40 : 0,
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,.10)" : "none",
            }}>
              <StatCell target={s.target} suffix={s.suffix} label={s.label}/>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

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
    { icon: "🏭", name: "Manufacturing & Engineering", proof: "15+ companies",  detail: "UAE, Germany, Japan" },
    { icon: "🏥", name: "Healthcare & Pharma",         proof: "10+ companies",  detail: "Research, devices, distribution" },
    { icon: "🏪", name: "E-commerce & Retail",         proof: "10+ companies",  detail: "D2C, marketplace, omnichannel" },
  ];

  const regions = [
    { flag: "🇺🇸", name: "USA & Canada",       count: "30+", industries: "SaaS · Fintech · GCC · EdTech" },
    { flag: "🇬🇧", name: "UK & Europe",         count: "20+", industries: "Financial Services · Manufacturing · Tech" },
    { flag: "🇦🇪", name: "UAE & Middle East",   count: "15+", industries: "Trading · Tech · Shared Services" },
    { flag: "🇸🇬", name: "Singapore & APAC",    count: "20+", industries: "SaaS · GCC · Semiconductors" },
    { flag: "🇦🇺", name: "Australia & NZ",      count: "10+", industries: "Resources · Professional Services" },
    { flag: "🌍",  name: "Other Markets",        count: "5+",  industries: "Japan · Germany · Other Regions" },
  ];

  const inp = (extra = {}) => ({
    width: "100%", padding: "12px 15px",
    border: `1.5px solid ${T.bdr}`, borderRadius: 7,
    fontFamily: "var(--font-cardo),'Cardo',Georgia,serif", fontSize: 13.5,
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
        {/* Warm glow */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:`radial-gradient(ellipse 55% 70% at 105% 40%,rgba(232,144,10,.11) 0%,transparent 55%),
                      radial-gradient(ellipse 40% 60% at -5% 110%,rgba(0,0,0,.25) 0%,transparent 50%)` }}/>

        <div className="hero-grid" style={{ maxWidth:1360, margin:"0 auto", width:"100%",
          display:"grid", gridTemplateColumns:"1fr 420px", gap:72,
          alignItems:"center", position:"relative", zIndex:2 }}>

          {/* ── Left copy ── */}
          <div className="stagger in" style={{ textAlign:"left" }}>
            <div className="hero-eyebrow" style={{ display:"inline-flex", alignItems:"center", gap:8,
              background:"rgba(232,144,10,.13)", border:"1px solid rgba(232,144,10,.28)",
              color:T.sl, padding:"5px 16px", borderRadius:50, fontSize:10.5,
              fontWeight:600, letterSpacing:".8px", textTransform:"uppercase", marginBottom:28 }}>
              Foreign Companies · NRIs · Global Investors
            </div>
            <h1 className="font-display hero-h1" style={{
              fontSize:"clamp(36px,4.5vw,62px)", fontWeight:600,
              lineHeight:1.08, color:"#fff", marginBottom:24, letterSpacing:"-.02em",
            }}>
              India, entered{" "}
              <em style={{ fontStyle:"italic", color:T.sl }}>correctly.</em>
            </h1>
            <p style={{ fontSize:17, color:"rgba(255,255,255,.72)", lineHeight:1.85,
              fontWeight:300, maxWidth:540, marginBottom:40 }}>
              Senior, ex–Big Four chartered accountants and lawyers who incorporate, structure,
              and keep foreign companies compliant in India — for founders and investors who
              don't get a second attempt at the first filing.
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:36 }}>
              {[
                { label:"Setting up an India subsidiary", icon:"🏢", page:"seo_fcri" },
                { label:"Building a GCC or captive team", icon:"🏗️", page:"gcc" },
                { label:"Already in India, need a fix",   icon:"🔧", page:"contact" },
              ].map(p => (
                <button key={p.label} onClick={()=>{ window.location.href=ROUTES[p.page]||"/"; }} style={{
                  display:"inline-flex", alignItems:"center", gap:6,
                  background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.14)",
                  color:"rgba(255,255,255,.75)", padding:"7px 14px", borderRadius:50,
                  fontSize:12.5, fontWeight:500, cursor:"pointer",
                  fontFamily:"var(--font-poppins),sans-serif", transition:"all .2s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.14)";e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="rgba(255,255,255,.14)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.color="rgba(255,255,255,.75)";e.currentTarget.style.borderColor="rgba(255,255,255,.14)";}}>
                  <span>{p.icon}</span> {p.label}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:52 }}>
              <button className="ics-btn ics-btn-primary ics-btn-lg"
                onClick={()=>{ window.location.href=ROUTES["contact"]||"/"; }}>
                Book Free 30-min Strategy Call →
              </button>
              <button className="ics-btn ics-btn-ghost ics-btn-lg"
                onClick={()=>document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})}>
                How It Works ↓
              </button>
            </div>
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

          {/* ── Right — globe only, no border, no caption ── */}
          <div className="hero-right-col">
            <HeroGlobe/>
          </div>
        </div>
      </section>
      {/* ══ CLIENT LOGOS MARQUEE ══════════════════════════════════════════════ */}
      <section style={{ padding:"44px 0", background:T.ivory }}>

        <div style={{ textAlign:"center", marginBottom:28 }}>
          <p style={{ fontFamily:"var(--font-montserrat),'Montserrat',sans-serif",
            fontSize:"clamp(11px,1.1vw,14px)", fontWeight:700,
            letterSpacing:"0.2em", textTransform:"uppercase",
            color:T.mid, margin:0 }}>
            Trusted by 100+ companies worldwide
          </p>
          <div style={{ width:32, height:2, background:T.s, borderRadius:2, margin:"8px auto 0" }}/>
        </div>

        <div style={{ position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"8%", zIndex:2,
            pointerEvents:"none", background:`linear-gradient(90deg,${T.ivory},transparent)` }}/>
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"8%", zIndex:2,
            pointerEvents:"none", background:`linear-gradient(270deg,${T.ivory},transparent)` }}/>

          <div className="logo-row-left" style={{ display:"flex", width:"max-content", alignItems:"center" }}>
            {[...Array(2)].map((_, di) => (
              <div key={di} style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
                {[
                  "Protiviti India","Mahindra Defence Systems","Saregama India",
                  "Ethos Limited","Polyplex Corporation Limited (Listed)",
                  "Kuantom Papers Limited","Tube Investment of India",
                  "Vibracoustic India Private Limited","Newtech Filter (BOSCH group Company)",
                  "Godrej, UAE entities","Ognibene power","Cloud EQ",
                  "Defacto Infotech India, AU, US","CrimsonInsights","Alleshealth",
                  "Foodjam","Grid advertising","Talink","Mcube capital",
                  "SML Mahindra Limited","Cheema Boilers Limited","AWFIS India Private Limited",
                  "Skin elements","Vyra Life (Modebencura)",
                ].map(name => (
                  <div key={`${di}-${name}`} style={{
                    flexShrink:0, width:150, height:72,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    padding:"0 20px",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/${encodeURIComponent(name)}.png`}
                      alt={name}
                      style={{ maxWidth:"110px", maxHeight:"40px",
                        width:"auto", height:"auto", objectFit:"contain" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS RIBBON ══════════════════════════════════════════════════════ */}
      <StatsRibbon />

      {/* ══ AUDIENCE PATHS ════════════════════════════════════════════════════ */}
      {/* <section style={{ padding:"72px 56px 0", background:T.ivory }}>
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
                  fontFamily:"var(--font-poppins),'Poppins',sans-serif", textAlign:"left",
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
      </section> */}

      {/* ══ WHAT WE DO — 3 pillars, plain language ════════════════════════════ */}
      <section style={{ padding:"100px 56px", background:T.ivory }}>
        <div style={{ maxWidth:1260, margin:"0 auto" }}>

          {/* Eyebrow with lines */}
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
              gap:16, marginBottom:24 }}>
              <div style={{ flex:1, maxWidth:72, height:1, background:T.s, opacity:.6 }}/>
              <span style={{ fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase",
                color:T.s, fontWeight:600 }}>What We Do</span>
              <div style={{ flex:1, maxWidth:72, height:1, background:T.s, opacity:.6 }}/>
            </div>
            <h2 className="font-display" style={{ fontSize:"clamp(30px,4vw,56px)",
              fontWeight:600, lineHeight:1.1, color:T.ch, maxWidth:680, margin:"0 auto 16px" }}>
              We help global companies{" "}
              <em style={{ fontStyle:"italic", color:T.f }}>enter India</em>{" "}
              the right way<span style={{ color:T.s }}>.</span>
            </h2>
            <p style={{ fontSize:15, color:T.mid, lineHeight:1.8, fontWeight:300,
              maxWidth:460, margin:"0 auto" }}>
              Not just paper-filing. Strategy first.<br/>
              Structure designed before a single document is touched.
            </p>
          </div>

          {/* 6 cards */}
          <div className="wwd-cards" style={{ display:"grid",
            gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:16 }}>
            {[
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V11h6v10"/></svg>,
                label:"Company Entry",
                headline:"Incorporated in India. Done properly.",
                desc:"Private limited company, wholly owned subsidiary, branch office, or LLP — we advise on the right structure for your model, then handle every filing from MCA to RBI.",
                cta:"Subsidiary setup guide →", link:"seo_sub",
              },
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                label:"International Tax",
                headline:"No surprises. No penalties.",
                desc:"Transfer pricing documentation, DTAA planning, PE risk assessment, and FEMA compliance — built into your structure from day one, not bolted on after.",
                cta:"Transfer pricing guide →", link:"seo_tp",
              },
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 1 4 0"/><path d="M12 12v4m-2-2h4"/></svg>,
                label:"GCC & Captive Centres",
                headline:"Your India capability centre, built right.",
                desc:"Full advisory for Global Capability Centres — entity, HR compliance, ESOP design, cost-plus pricing, and a compliance retainer that scales with your headcount.",
                cta:"GCC advisory →", link:"gcc",
              },
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
                label:"Post-Incorporation Compliance",
                headline:"Stay compliant. Zero penalties.",
                desc:"Monthly GST, TDS, payroll, quarterly advance tax, annual audit, ITR, and FLA Return — all handled on a fixed-fee retainer so your team focuses on the business.",
                cta:"Compliance retainer →", link:"gcc",
              },
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                label:"NRI & Startup Advisory",
                headline:"Complex structures. Handled properly.",
                desc:"NRI investing or returning to India, Indian startups raising foreign rounds — Schedule 4 FEMA, CCPS structuring, angel tax, DPIIT recognition, FCGPR filing.",
                cta:"NRI & startup guide →", link:"seo_nri",
              },
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
                label:"India Market Entry Advisory",
                headline:"Strategy before paperwork.",
                desc:"Structure design, FDI route, DTAA planning, PE risk assessment — the decisions that must be made before the first filing. We design the full picture first.",
                cta:"Market entry advisory →", link:"seo_entry",
              },
            ].map(s => (
              <div key={s.label} style={{
                background:"#fff", border:`1px solid ${T.bdr}`,
                borderRadius:18, padding:"32px 28px",
                display:"flex", flexDirection:"column",
                transition:"transform .2s, box-shadow .2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.08)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                {/* Icon circle */}
                <div style={{ width:52, height:52, borderRadius:"50%",
                  background:`${T.f}12`, display:"flex", alignItems:"center",
                  justifyContent:"center", marginBottom:20, flexShrink:0 }}>
                  {s.icon}
                </div>
                <div style={{ fontSize:10, letterSpacing:"0.35em", textTransform:"uppercase",
                  color:T.s, fontWeight:600, marginBottom:10 }}>{s.label}</div>
                <h3 className="font-display" style={{ fontSize:"clamp(17px,1.6vw,22px)",
                  fontWeight:600, color:T.ch, lineHeight:1.25, marginBottom:12 }}>
                  {s.headline}
                </h3>
                <p style={{ fontSize:13, color:T.mid, lineHeight:1.78,
                  fontWeight:300, flex:1, marginBottom:20 }}>{s.desc}</p>
                <button onClick={()=>{window.location.href=ROUTES[s.link]||"/";}} style={{
                  background:"none", border:"none", cursor:"pointer", padding:0,
                  fontSize:13, fontWeight:600, color:T.f,
                  fontFamily:"var(--font-poppins),'Poppins',sans-serif",
                  display:"flex", alignItems:"center", gap:5,
                  transition:"gap .18s",
                }}
                onMouseEnter={e=>e.currentTarget.style.gap="9px"}
                onMouseLeave={e=>e.currentTarget.style.gap="5px"}>
                  {s.cta}
                </button>
              </div>
            ))}
          </div>

          {/* 4-feature strip */}
          <div className="wwd-strip" style={{ display:"grid",
            gridTemplateColumns:"repeat(4,1fr)", gap:0,
            border:`1px solid ${T.bdr}`, borderRadius:14,
            background:"#fff", overflow:"hidden" }}>
            {[
              { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label:"Strategy first",     desc:"Structure designed before you file." },
              { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, label:"Compliance always",  desc:"Every detail handled, every time." },
              { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label:"Time zone aligned",  desc:"Responsive support across the globe." },
              { icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label:"Senior led",         desc:"Direct access to experienced advisors." },
            ].map(({ icon, label, desc }, i) => (
              <div key={label} style={{
                padding:"24px 20px", display:"flex", alignItems:"flex-start", gap:12,
                borderLeft: i > 0 ? `1px solid ${T.bdr}` : "none",
              }}>
                <div style={{ width:36, height:36, borderRadius:"50%",
                  background:`${T.f}10`, display:"flex", alignItems:"center",
                  justifyContent:"center", flexShrink:0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:T.ch, marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:12, color:T.lt, lineHeight:1.55 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding:"108px 56px", background:T.stone }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          <div className="process-grid" style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:72, alignItems:"start" }}>

            {/* Left — sticky */}
            <div className="process-sticky" style={{ position:"sticky", top:100 }}>
              <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase",
                color:T.s, fontWeight:600, marginBottom:14 }}>The Process</div>
              <h2 className="font-display" style={{ fontSize:"clamp(32px,3.5vw,48px)",
                fontWeight:600, lineHeight:1.08, color:T.ch, marginBottom:18 }}>
                What happens after you contact us.
              </h2>
              <p style={{ fontSize:15, color:T.mid, lineHeight:1.82, fontWeight:300, marginBottom:28 }}>
                No black box. You know exactly what we're doing, when, and why.
                Most companies are operational within 30 days of first contact.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {["Free 30-min strategy call","No retainer to start","One point of contact","Fixed, transparent fees"].map(item => (
                  <div key={item} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ width:20, height:20, background:T.f, borderRadius:"50%",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#fff", fontSize:11, flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:13.5, color:T.mid }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — animated steps */}
            <div style={{ display:"flex", flexDirection:"column" }}>
              {process.map((step, i) => (
                <ProcessStep key={step.n} step={step} i={i} total={process.length}/>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ CASE STUDIES ══════════════════════════════════════════════════════ */}
      {/* <section style={{ padding:"108px 56px", background:T.ivory }}>
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

                <h3 className="font-display" style={{ fontSize:19, fontWeight:600,
                  color:T.ch, lineHeight:1.3, marginBottom:14 }}>{c.headline}</h3>

                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase",
                    color:T.lt, fontWeight:600, marginBottom:5 }}>The challenge</div>
                  <p style={{ fontSize:13, color:T.mid, lineHeight:1.72,
                    fontWeight:300 }}>{c.challenge}</p>
                </div>

                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:9.5, letterSpacing:1.5, textTransform:"uppercase",
                    color:T.lt, fontWeight:600, marginBottom:5 }}>What we delivered</div>
                  <p style={{ fontSize:13, color:T.mid, lineHeight:1.72,
                    fontWeight:300 }}>{c.outcome}</p>
                </div>

            
                <div style={{ background:"#E4F0EB", borderRadius:9, padding:"10px 14px",
                  marginBottom:18, display:"flex", gap:8, alignItems:"flex-start" }}>
                  <span style={{ color:T.f, fontWeight:700, fontSize:13, flexShrink:0 }}>✓</span>
                  <p style={{ fontSize:12.5, color:T.f, lineHeight:1.6,
                    fontWeight:500 }}>{c.proof}</p>
                </div>

               
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
      </section> */}

      {/* ══ CLIENT REVIEWS ═══════════════════════════════════════════════════ */}
      <section style={{
        background: "#0a6055",
        padding: "0 56px", overflow: "hidden",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", width: "100%",
          display: "flex", alignItems: "stretch", gap: 80, flexWrap: "wrap",
        }}>

          {/* ── Left: heading + quote ── */}
          <div style={{
            flex: "1 1 340px", display: "flex", flexDirection: "column",
            gap: 20, padding: "80px 0", justifyContent: "center",
          }}>
            <h2 className="font-display" style={{
              fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600,
              lineHeight: 1.15, color: "#fff",
            }}>
              Your success is our priority
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#DBEEFF", fontWeight: 300 }}>
              "We combine deep regulatory expertise with a personal advisory approach.
              Every foreign company gets one senior CA, full accountability, and a structure
              built to last — not just to file.
              <br/><br/>
              We don't retrofit compliance at audit time. We get your India entry right
              the first time, because fixing it later costs 2–3× more."
            </p>
            <div style={{ marginTop: 8 }}>
              <p style={{ fontWeight: 700, fontSize: 16, color: "#DBEEFF" }}>P.G., FCA</p>
              <p style={{ fontSize: 14, color: "#DBEEFF", opacity: 0.7 }}>Founder · Ex-Big 4 · Diploma in International Taxation</p>
            </div>
          </div>

          {/* ── Right: two auto-scrolling columns ── */}
          <div style={{
            flex: "1 1 380px", display: "flex", gap: 14,
            height: 560, overflow: "hidden", padding: "24px 0",
          }}>
            {/* Column 1 — scrolls up */}
            <div className="scrollbar-hidden" style={{ flex: 1, overflow: "hidden" }}>
              <div className="animate-marquee-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { text: "The team handled our incorporation end-to-end — FCGPR, transfer pricing policy, first payroll — all within 30 days. No gaps, no surprises.", name: "A.K.", sub: "CFO · 🇺🇸 USA", av: "A" },
                  { text: "Our parent company's auditors had raised PE risk concerns. ICS restructured the intercompany setup and documented everything properly. Clean audit since.", name: "N.R.", sub: "Finance Head · 🇬🇧 UK", av: "N" },
                  { text: "We had been operating a branch for over a decade with no TP documentation. ICS converted it, filed 3CEB, and built a defensible policy. Passed scrutiny without a single adjustment.", name: "F.A.", sub: "Group Director · 🇦🇪 UAE", av: "F" },
                  { text: "Went from zero to a 40-person GCC in Pune. Entity, payroll, ESOP, cost-plus pricing — all handled in parallel. Fully compliant from the first hire.", name: "L.W.", sub: "CEO · 🇸🇬 Singapore", av: "L" },
                  { text: "A previous firm set us up with the wrong entity structure. ICS identified the issue immediately, managed the restructure, and fixed the compliance gaps.", name: "R.D.", sub: "Founder · 🇦🇺 Australia", av: "R" },
                  /* duplicated for seamless loop */
                  { text: "The team handled our incorporation end-to-end — FCGPR, transfer pricing policy, first payroll — all within 30 days. No gaps, no surprises.", name: "A.K.", sub: "CFO · 🇺🇸 USA", av: "A" },
                  { text: "Our parent company's auditors had raised PE risk concerns. ICS restructured the intercompany setup and documented everything properly. Clean audit since.", name: "N.R.", sub: "Finance Head · 🇬🇧 UK", av: "N" },
                  { text: "We had been operating a branch for over a decade with no TP documentation. ICS converted it, filed 3CEB, and built a defensible policy. Passed scrutiny without a single adjustment.", name: "F.A.", sub: "Group Director · 🇦🇪 UAE", av: "F" },
                  { text: "Went from zero to a 40-person GCC in Pune. Entity, payroll, ESOP, cost-plus pricing — all handled in parallel. Fully compliant from the first hire.", name: "L.W.", sub: "CEO · 🇸🇬 Singapore", av: "L" },
                  { text: "A previous firm set us up with the wrong entity structure. ICS identified the issue immediately, managed the restructure, and fixed the compliance gaps.", name: "R.D.", sub: "Founder · 🇦🇺 Australia", av: "R" },
                ].map((r, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", flexShrink: 0 }}>
                    <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                      {[...Array(5)].map((_, s) => <span key={s} style={{ color: "#F59E0B", fontSize: 13 }}>★</span>)}
                    </div>
                    <p style={{ fontSize: 12.5, color: "#606162", lineHeight: 1.7, marginBottom: 14 }}>"{r.text}"</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid #f0f0f0", paddingTop: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#0a6055,#1aaa99)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{r.av}</div>
                      <div>
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: "#231F20", lineHeight: 1.3 }}>{r.name}</p>
                        <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{r.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 — scrolls down */}
            <div className="scrollbar-hidden" style={{ flex: 1, overflow: "hidden" }}>
              <div className="animate-marquee-down" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { text: "We were raising a foreign round and had no idea how to structure it. ICS handled DPIIT recognition, FEMA valuation, and FC-GPR filing. Cap table is clean going into Series A.", name: "S.V.", sub: "Co-founder · 🇮🇳 India", av: "S" },
                  { text: "They aligned our India compliance calendar to our UK group reporting cycle. No year-end surprises. That level of commercial thinking is rare from an Indian CA firm.", name: "P.H.", sub: "Finance Director · 🇬🇧 UK", av: "P" },
                  { text: "The fixed-fee retainer removed all uncertainty. GST, TDS, payroll, annual audit — one number, full coverage. No invoice surprises mid-year.", name: "M.B.", sub: "COO · 🇩🇪 Germany", av: "M" },
                  { text: "WOS incorporated in 11 working days. Bank account open by week three. Their DTAA analysis upfront reduced our withholding tax exposure significantly.", name: "C.W.", sub: "CFO · 🇸🇬 Singapore", av: "C" },
                  { text: "Three other firms gave us conflicting FDI route advice. ICS gave one clear recommendation with the reasoning behind it. That confidence was worth the engagement alone.", name: "T.A.", sub: "Managing Director · 🇦🇪 UAE", av: "T" },
                  /* duplicated for seamless loop */
                  { text: "We were raising a foreign round and had no idea how to structure it. ICS handled DPIIT recognition, FEMA valuation, and FC-GPR filing. Cap table is clean going into Series A.", name: "S.V.", sub: "Co-founder · 🇮🇳 India", av: "S" },
                  { text: "They aligned our India compliance calendar to our UK group reporting cycle. No year-end surprises. That level of commercial thinking is rare from an Indian CA firm.", name: "P.H.", sub: "Finance Director · 🇬🇧 UK", av: "P" },
                  { text: "The fixed-fee retainer removed all uncertainty. GST, TDS, payroll, annual audit — one number, full coverage. No invoice surprises mid-year.", name: "M.B.", sub: "COO · 🇩🇪 Germany", av: "M" },
                  { text: "WOS incorporated in 11 working days. Bank account open by week three. Their DTAA analysis upfront reduced our withholding tax exposure significantly.", name: "C.W.", sub: "CFO · 🇸🇬 Singapore", av: "C" },
                  { text: "Three other firms gave us conflicting FDI route advice. ICS gave one clear recommendation with the reasoning behind it. That confidence was worth the engagement alone.", name: "T.A.", sub: "Managing Director · 🇦🇪 UAE", av: "T" },
                ].map((r, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", flexShrink: 0 }}>
                    <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                      {[...Array(5)].map((_, s) => <span key={s} style={{ color: "#F59E0B", fontSize: 13 }}>★</span>)}
                    </div>
                    <p style={{ fontSize: 12.5, color: "#606162", lineHeight: 1.7, marginBottom: 14 }}>"{r.text}"</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid #f0f0f0", paddingTop: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#0a6055,#1aaa99)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{r.av}</div>
                      <div>
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: "#231F20", lineHeight: 1.3 }}>{r.name}</p>
                        <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{r.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ PRICING / PACKAGES ═══════════════════════════════════════════════ */}
      <PricingTabsSection T={T} ROUTES={ROUTES} />

      {/* ══ INDUSTRIES ════════════════════════════════════════════════════════ */}
      <section style={{ padding:"40px 64px 80px", background:"#FAF8F4" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>

          {/* Heading */}
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <p style={{ fontSize:10, letterSpacing:"0.45em", textTransform:"uppercase",
              color:T.s, fontWeight:600, marginBottom:20 }}>Industries We Serve</p>
            <h2 className="font-display" style={{ fontSize:"clamp(34px,4vw,58px)",
              fontWeight:600, lineHeight:1.06, color:T.ch, margin:0 }}>
              Sectors we know{" "}
              <em style={{ color:T.f, fontStyle:"italic" }}>deeply.</em>
            </h2>
          </div>

          {/* Cards row */}
          <div className="ind-cards" style={{ display:"grid",
            gridTemplateColumns:"repeat(6,1fr)", gap:16 }}>
            {[
              { Icon:LaptopIcon,   name:"SaaS &\nTechnology",          proof:"30+ companies",  detail:"USA, Singapore & UK" },
              { Icon:BuildingIcon, name:"GCC / Captive\nCentres",      proof:"15+ setups",     detail:"10–200 person teams" },
              { Icon:BankIcon,     name:"Financial\nServices",         proof:"20+ companies",  detail:"Fintech, funds, wealth" },
              { Icon:FactoryIcon,  name:"Manufacturing\n& Engineering",proof:"15+ companies",  detail:"UAE, Germany, Japan" },
              { Icon:MedicalIcon,  name:"Healthcare\n& Pharma",        proof:"10+ companies",  detail:"Research, devices" },
              { Icon:CartIcon,     name:"E-commerce\n& Retail",        proof:"10+ companies",  detail:"D2C, marketplace" },
            ].map(({ Icon, name, proof, detail }) => (
              <div key={name} className="ind-card" style={{
                background:"#fff", borderRadius:22, padding:"36px 24px 32px",
                border:"1px solid #ECE7E1", textAlign:"center",
                display:"flex", flexDirection:"column", alignItems:"center",
                boxShadow:"0 12px 35px rgba(0,0,0,.05)",
                transition:"transform .22s ease, box-shadow .22s ease",
                cursor:"default", minHeight:260,
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 56px rgba(0,0,0,.10)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 12px 35px rgba(0,0,0,.05)";}}>
                <div style={{ marginBottom:24 }}><Icon/></div>
                <div style={{ fontSize:13.5, fontWeight:650, color:T.ch,
                  lineHeight:1.4, marginBottom:8, whiteSpace:"pre-line" }}>{name}</div>
                <div style={{ fontSize:12, color:T.s, fontWeight:700,
                  marginBottom:6 }}>{proof}</div>
                <div style={{ fontSize:11.5, color:T.lt, lineHeight:1.6 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GLOBAL REACH ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"0 64px 72px", background:"#FAF8F4" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <div className="gr-wrap" style={{
            background:"#fff", borderRadius:30,
            boxShadow:"0 2px 40px rgba(0,0,0,.06)",
            border:"1px solid #ECE7E1",
            display:"grid", gridTemplateColumns:"38% 62%",
            alignItems:"stretch", overflow:"hidden",
          }}>

            {/* ── Left ── */}
            <div className="gr-left" style={{
              padding:"48px 40px", borderRight:"1px solid #ECE7E1",
              display:"flex", flexDirection:"column", gap:24,
            }}>
              {/* Heading */}
              <div>
                <p style={{ fontSize:10, letterSpacing:"0.45em", textTransform:"uppercase",
                  color:T.s, fontWeight:600, margin:"0 0 12px" }}>Global Reach</p>
                <h2 className="font-display" style={{ fontSize:"clamp(24px,2.4vw,38px)",
                  fontWeight:600, lineHeight:1.12, color:T.ch, margin:"0 0 16px" }}>
                  Clients from every{" "}
                  <em style={{ color:T.f, fontStyle:"italic" }}>major market.</em>
                </h2>
                <div style={{ width:36, height:3, background:T.f, borderRadius:3 }}/>
              </div>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
                border:"1px solid #ECE7E1", borderRadius:12, overflow:"hidden" }}>
                {[
                  { Icon:ClientsIcon, num:"200+", label:"Clients\nWorldwide" },
                  { Icon:GlobeIcon,   num:"90+",  label:"Countries\nCovered" },
                  { Icon:MarketIcon,  num:"10+",  label:"Markets\nOperate" },
                  { Icon:StarIcon,    num:"98%",  label:"Client\nSatisfaction" },
                ].map(({ Icon, num, label }, i) => (
                  <div key={label} style={{
                    padding:"14px 8px", textAlign:"center",
                    borderLeft: i > 0 ? "1px solid #ECE7E1" : "none",
                  }}>
                    <div style={{ display:"flex", justifyContent:"center", marginBottom:6 }}>
                      <Icon/>
                    </div>
                    <div className="font-number" style={{ fontSize:19, color:T.ch,
                      lineHeight:1, marginBottom:3 }}>{num}</div>
                    <div style={{ fontSize:10, color:T.lt, lineHeight:1.4,
                      whiteSpace:"pre-line" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Region pills — 2-col grid */}
              <div className="region-pills" style={{
                display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:6,
              }}>
                {[
                  { dot:"#E8900A", label:"USA & Canada" },
                  { dot:T.f,       label:"UK & Europe" },
                  { dot:"#F5A828", label:"UAE & Middle East" },
                  { dot:"#1B78CB", label:"Singapore & APAC" },
                  { dot:"#6B7280", label:"Australia & NZ" },
                  { dot:"#9A9A8E", label:"Other Markets" },
                ].map(p => (
                  <div key={p.label} style={{
                    display:"flex", alignItems:"center", gap:5,
                    border:"1px solid #ECE7E1", borderRadius:50,
                    padding:"5px 12px", fontSize:11, color:T.mid,
                    cursor:"default", transition:"border-color .15s",
                    whiteSpace:"nowrap", overflow:"hidden",
                  }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=T.f}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#ECE7E1"}>
                    <div style={{ width:6, height:6, borderRadius:"50%",
                      background:p.dot, flexShrink:0 }}/>
                    <span style={{ overflow:"hidden", textOverflow:"ellipsis" }}>{p.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:"auto" }}>
                <button className="ics-btn ics-btn-primary"
                  onClick={() => { window.location.href = ROUTES["contact"]; }}>
                  Explore Global Presence →
                </button>
                <button className="ics-btn ics-btn-outline"
                  onClick={() => { window.location.href = ROUTES["hub"]; }}>
                  View Success Stories
                </button>
              </div>
            </div>

            {/* ── Right — map fills full height ── */}
            <div className="gr-map" style={{ overflow:"hidden", minHeight:320 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/worldmap.png" alt="World map"
                style={{ width:"100%", height:"100%", objectFit:"cover",
                  objectPosition:"center 40%", display:"block",
                  filter:"saturate(0.18) brightness(1.08) sepia(0.06)",
                  opacity:0.6 }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"100px 56px", background:T.stone }}>
        <div style={{ maxWidth:1360, margin:"0 auto" }}>

          {/* Heading */}
          <div style={{ marginBottom:52 }}>
            <div style={{ fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase",
              color:T.s, fontWeight:600, marginBottom:14 }}>Why Us</div>
            <h2 className="font-display" style={{ fontSize:"clamp(28px,3.5vw,50px)",
              fontWeight:600, lineHeight:1.1, color:T.ch, maxWidth:580 }}>
              Compared honestly,{" "}
              <em style={{ fontStyle:"italic", color:T.f }}>not just favourably.</em>
            </h2>
          </div>

          {/* ── Comparison table — desktop ── */}
          <div className="whyus-table-wrap">
            <table style={{ width:"100%", borderCollapse:"separate",
              borderSpacing:0, minWidth:680 }}>
              <thead>
                <tr>
                  <th style={{ padding:"12px 20px", textAlign:"left",
                    fontSize:10.5, letterSpacing:".1em", textTransform:"uppercase",
                    color:T.lt, fontWeight:600,
                    borderBottom:`1px solid ${T.bdr}`,
                    background:T.stone }}/>
                  {[
                    { label:"India Company Setup", hl:true  },
                    { label:"Big Four Firm",        hl:false },
                    { label:"Generic Local CA",     hl:false },
                    { label:"DIY / Self-filed",     hl:false },
                  ].map(({ label, hl }) => (
                    <th key={label} style={{
                      padding:"14px 18px", textAlign:"left",
                      fontSize:11, letterSpacing:".08em", textTransform:"uppercase",
                      fontWeight:700,
                      color: hl ? "#fff" : T.lt,
                      background: hl ? T.f : T.stone,
                      borderBottom: hl ? "none" : `1px solid ${T.bdr}`,
                      borderRadius: hl ? "10px 10px 0 0" : 0,
                    }}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature:"Senior attention",
                    ics:"✓ Partner-led throughout",  big4:"Delegated to junior staff",
                    local:"Varies, often solo",       diy:"—" },
                  { feature:"Tax + legal + filing, integrated",
                    ics:"✓ One accountable team",    big4:"✓ Yes, at premium pricing",
                    local:"Usually one discipline",   diy:"—" },
                  { feature:"Cross-border / DTAA depth",
                    ics:"✓ Core specialism",          big4:"✓ Yes",
                    local:"Limited exposure",          diy:"—" },
                  { feature:"Cost position",
                    ics:"Mid-market, fixed-scope",    big4:"Premium retainer",
                    local:"Lowest cost",              diy:"Lowest cost, highest risk" },
                  { feature:"Response time",
                    ics:"< 24 hrs, named contact",   big4:"Varies by account tier",
                    local:"Varies",                   diy:"N/A" },
                  { feature:"Transfer pricing record",
                    ics:"✓ Zero audits lost",         big4:"Varies",
                    local:"Rarely documented",        diy:"—" },
                ].map((row, ri) => (
                  <tr key={row.feature} className="whyus-row"
                    style={{ animationDelay:`${ri * 80}ms` }}>
                    <td style={{
                      padding:"16px 20px", fontSize:13.5, fontWeight:600,
                      color:T.ch, borderBottom:`1px solid ${T.bdr}`,
                      background:T.stone,
                    }}>{row.feature}</td>

                    {/* ICS column — highlighted */}
                    <td style={{
                      padding:"16px 18px", fontSize:13, lineHeight:1.55,
                      background:"rgba(11,61,46,.06)",
                      borderBottom:`1px solid rgba(11,61,46,.1)`,
                      color: row.ics.startsWith("✓") ? T.f : T.ch,
                      fontWeight: row.ics.startsWith("✓") ? 600 : 400,
                    }}>
                      {row.ics.startsWith("✓") && (
                        <span style={{ display:"inline-flex", alignItems:"center",
                          justifyContent:"center", width:18, height:18,
                          background:T.f, borderRadius:"50%",
                          color:"#fff", fontSize:10, fontWeight:700,
                          marginRight:8, flexShrink:0 }}>✓</span>
                      )}
                      {row.ics.startsWith("✓") ? row.ics.slice(2) : row.ics}
                    </td>

                    {/* Other columns */}
                    {[row.big4, row.local, row.diy].map((val, ci) => (
                      <td key={ci} style={{
                        padding:"16px 18px", fontSize:13, lineHeight:1.55,
                        color: val === "—" ? T.bdr : T.mid,
                        borderBottom:`1px solid ${T.bdr}`,
                        background:T.stone,
                      }}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards — visible only on small screens ── */}
          <div className="whyus-cards">
            {[
              { icon:"🏆", title:"Partner-led throughout",       desc:"Every engagement handled by a senior CA — no hand-off to juniors." },
              { icon:"🔗", title:"One team, full picture",       desc:"Tax, legal, filings, payroll, audit — one firm, zero gaps." },
              { icon:"🌐", title:"Cross-border specialists",     desc:"DTAA planning, PE risk, FEMA — our core, not a side service." },
              { icon:"💰", title:"Mid-market fixed fees",        desc:"Big 4 rigour without Big 4 retainer pricing." },
              { icon:"⚡", title:"< 24 hr response",            desc:"Named contact who knows your file. Always." },
              { icon:"✅", title:"Zero TP audits lost",          desc:"Transfer pricing record across all client engagements." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background:"#fff", border:`1px solid ${T.bdr}`,
                borderRadius:14, padding:"20px 18px",
                display:"flex", gap:14, alignItems:"flex-start",
              }}>
                <div style={{ fontSize:22, flexShrink:0, marginTop:2 }}>{icon}</div>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:600, color:T.ch, marginBottom:4 }}>{title}</div>
                  <div style={{ fontSize:12.5, color:T.mid, lineHeight:1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats + CTAs */}
          <div className="whyus-bottom" style={{ display:"grid",
            gridTemplateColumns:"repeat(4,1fr) auto", gap:20,
            alignItems:"center", marginTop:48,
            paddingTop:36, borderTop:`1px solid ${T.bdr}` }}>
            {[
              { n:"8+",   label:"Years Ex-Big 4" },
              { n:"100+", label:"Companies incorporated" },
              { n:"0",    label:"TP audits lost" },
              { n:"FCA",  label:"+ Diploma Int'l Tax" },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="font-number" style={{ fontSize:30, color:T.f,
                  lineHeight:1, marginBottom:4 }}>{n}</div>
                <div style={{ fontSize:12, color:T.lt }}>{label}</div>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"flex-end" }}>
              <button className="ics-btn ics-btn-primary"
                onClick={() => { window.location.href = ROUTES["contact"]; }}>
                Talk to Our Team →
              </button>
              <button className="ics-btn ics-btn-outline"
                onClick={() => { window.location.href = ROUTES["about"]; }}>
                About Us
              </button>
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
                  fontFamily:"var(--font-cormorant),'Cormorant Garamond',serif" }}>
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
                fontFamily:"var(--font-poppins),'Poppins',sans-serif", transition:"all .2s",
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
            {["No retainer to start", "Expert team responds within 24 hrs", "Fixed transparent fees"].map(t => (
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
