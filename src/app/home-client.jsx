'use client';
import React, { useState, useEffect, useRef, useId } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { T, CALENDLY_URL, PHONE, PHONE_RAW } from '@/lib/config';
import { submitToZoho, trackConsultationRequest, trackGuideDownload, trackWhatsApp } from '@/lib/utils';
import PricingTabsSection from './pricing';
import WhatWeDoSection from './WhatWeDoSection';
import SmarterDecisionsScroll from './SmarterDecisionsScroll';
import NewHeroSection from './NewHeroSection';
import ClientStoriesCarousel from './ClientStoriesCarousel';
import ClientOutcomes from './clientOutcomes';
const FONT_HEADING = "var(--font-cormorant),'Cormorant Garamond',serif";
const FONT_BODY = "var(--font-cardo),'Cardo',Georgia,serif";

const ROUTES = {
  home: '/', services: '/setup', gcc: '/post-setup', tax: '/international-tax',
  hub: '/knowledge-hub', about: '/about', contact: '/contact', industries: '/industries',
  seo_fcri: '/foreign-company-registration-india', seo_sub: '/subsidiary-company-india',
  seo_tp: '/transfer-pricing-india', seo_fdi: '/fdi-rules-india',
  seo_us: '/us-company-setting-up-india', seo_uk: '/uk-company-setting-up-india',
  seo_uae: '/uae-company-setting-up-india', seo_sg: '/singapore-company-setting-up-india',
  seo_gcc: '/gcc-setup-india', seo_entry: '/india-market-entry-advisory',
  seo_pvtltd: '/private-limited-company-registration-india',
  seo_nri: '/nri-company-registration-india',
  seo_startup: '/startup-foreign-investment-india',
};

// ── Inline SVG icons for Industries & Global Reach ───────────────────────────
const iconWrap = (path, bg) => (
  <div style={{
    width: 56, height: 56, borderRadius: "50%", background: bg,
    display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  </div>
);
const LaptopIcon = () => iconWrap(<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M0 21h24" /></>, "#E8F3EE");
const BuildingIcon = () => iconWrap(<><path d="M3 21V7l9-4 9 4v14" /><path d="M9 21V11h6v10" /></>, "#FBF0DD");
const BankIcon = () => iconWrap(<><path d="M3 9l9-7 9 7v11H3z" /><path d="M9 22V12h6v10" /></>, "#EDE8F6");
const FactoryIcon = () => iconWrap(<><path d="M2 20V10l6-4v4l6-4v4l6-4v14H2z" /></>, "#E8F0F5");
const MedicalIcon = () => iconWrap(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8M8 12h8" /></>, "#F0EBE8");
const CartIcon = () => iconWrap(<><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>, "#E8F3EE");
const ClientsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const MarketIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
  </svg>
);
const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

// ─── HERO GLOBE (amCharts 4 — rotating orthographic globe with city dots) ────
function HeroGlobe() {
  const divRef = useRef(null);

  useEffect(() => {
    const ids = [
      { id: "am4-core", src: "https://www.amcharts.com/lib/4/core.js" },
      { id: "am4-maps", src: "https://www.amcharts.com/lib/4/maps.js" },
      { id: "am4-geodata", src: "https://www.amcharts.com/lib/4/geodata/worldLow.js" },
      { id: "am4-animated", src: "https://www.amcharts.com/lib/4/themes/animated.js" },
    ];

    let loaded = 0;
    let chart = null;

    function initChart() {
      const am4core = window.am4core;
      const am4maps = window.am4maps;
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
      pt.fill = am4core.color("#acacacff");
      pt.stroke = am4core.color("#000000ff");
      pt.strokeWidth = 0.4;
      pt.cursorOverStyle = am4core.MouseCursorStyle.default;

      // Hover — subtle only
      const hs = pt.states.create("hover");
      hs.properties.fill = am4core.color("#f0f0f0");

      // Graticule lines
      const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
      graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
      graticuleSeries.mapLines.template.line.strokeOpacity = 0.05;
      graticuleSeries.fitExtent = false;

      // Ocean
      chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
      chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#06120D");

      // Connection city dots — India hub + 6 client cities
      const cities = [
        { title: "India (Hub)", latitude: 20.5937, longitude: 78.9629, hub: true },
        { title: "New York", latitude: 40.7128, longitude: -74.006, hub: false },
        { title: "London", latitude: 51.5074, longitude: -0.1278, hub: false },
        { title: "Dubai", latitude: 25.2048, longitude: 55.2708, hub: false },
        { title: "Singapore", latitude: 1.3521, longitude: 103.8198, hub: false },
        { title: "Sydney", latitude: -33.8688, longitude: 151.2093, hub: false },
        { title: "Frankfurt", latitude: 50.1109, longitude: 8.6821, hub: false },
      ];

      // Connecting lines from India hub to each city
      const lineSeries = chart.series.push(new am4maps.MapLineSeries());
      lineSeries.mapLines.template.line.strokeWidth = 1;
      lineSeries.mapLines.template.line.stroke = am4core.color("#ff0000ff");
      lineSeries.mapLines.template.line.strokeOpacity = 0.55;
      lineSeries.mapLines.template.line.strokeDasharray = "3,3";
      lineSeries.mapLines.template.shortestDistance = true;

      const hub = cities[0];
      lineSeries.data = cities.slice(1).map(c => ({
        multiGeoLine: [[
          { latitude: hub.latitude, longitude: hub.longitude },
          { latitude: c.latitude, longitude: c.longitude },
        ]],
      }));

      const imageSeries = chart.series.push(new am4maps.MapImageSeries());
      const imageTemplate = imageSeries.mapImages.template;
      imageTemplate.propertyFields.longitude = "longitude";
      imageTemplate.propertyFields.latitude = "latitude";
      imageTemplate.nonScaling = true;
      imageTemplate.tooltipText = "{title}";

      // Outer glow circle
      const circle2 = imageTemplate.createChild(am4core.Circle);
      circle2.radius = 10;
      circle2.fill = am4core.color("#fb0000ff");
      circle2.fillOpacity = 0.15;
      circle2.strokeWidth = 0;
      circle2.propertyFields.fillOpacity = "pulseOpacity";

      // Main dot
      const circle = imageTemplate.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#ff0000ff");
      circle.stroke = am4core.color("#ffffff");
      circle.strokeWidth = 1.5;
      circle.propertyFields.radius = "dotRadius";
      circle.propertyFields.fill = "dotColor";

      imageSeries.data = cities.map(c => ({
        ...c,
        dotRadius: c.hub ? 6 : 4,
        dotColor: c.hub ? "#f60000ff" : "#ff0000ff",
        pulseOpacity: c.hub ? 0.25 : 0.12,
      }));

      // Slow continuous rotation
      setTimeout(() => {
        chart.animate({ property: "deltaLongitude", to: 100000 }, 20000000);
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
    <div ref={divRef} style={{ width: "100%", height: "560px", borderRadius: 12, overflow: "hidden" }} />
  );
}

// ─── CLOCK ICON ───────────────────────────────────────────────────────────────
function SpeedIcon({ size = 72 }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1500);
    return () => clearInterval(id);
  }, []);
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transition: "transform 0.3s", transform: pulse ? "scale(1.06)" : "scale(1)" }}>
      <defs>
        <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B3D2E" />
          <stop offset="100%" stopColor="#e69819" />
        </linearGradient>
      </defs>
      <circle cx={r} cy={r} r={r - 3} fill="none" stroke="url(#speedGrad)" strokeWidth="2.5" />
      <circle cx={r} cy={r} r={r - 8} fill="none" stroke="#0B3D2E" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
      {/* Gauge needle */}
      <line x1={r} y1={r} x2={r + (r * 0.55)} y2={r - (r * 0.25)} stroke="#e69819" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx={r} cy={r} r="3.5" fill="#0B3D2E" />
      <circle cx={r} cy={r} r="1.8" fill="#e69819" />
      {/* Speed tick marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
        <line key={deg} x1={r} y1={5} x2={r} y2={9} stroke="#0B3D2E" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" transform={`rotate(${deg}, ${r}, ${r})`} />
      ))}
    </svg>
  );
}

// ─── AUDIENCE PATHS — auto-tabs with progress bar ────────────────────────────
const AUTO_TAB_DURATION = 5000;

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    function onResize() { setWidth(window.innerWidth); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

function AudiencePathsSection({ T, ROUTES }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(null);
  const startRef = useRef(null);
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;

  const SITUATIONS = [
    {
      n: "01", tab: "Setting up a subsidiary",
      headline: "Setting up an India subsidiary",
      desc: "You're a CFO, legal counsel, or finance director at a foreign company that needs an India presence. You need the right structure, compliant FDI filings, and a team that handles the full picture — not just the paperwork.",
      bullets: ["WOS or Branch Office structure", "FDI route & RBI compliance", "Transfer pricing from day one", "Full post-incorporation handover"],
      stat: "2–3 Weeks", statLabel: "Typical time from structure sign-off to incorporation certificate.",
      cta: "Foreign company guide", page: "seo_fcri",
    },
    {
      n: "02", tab: "Building from scratch",
      headline: "Building a team in India",
      desc: "You're setting up a Global Capability Centre — 10 to 200+ people. You need entity setup, payroll, ESOP structuring, cost-plus pricing, and a compliance retainer that scales as you hire.",
      bullets: ["End-to-end GCC advisory", "Payroll & HR compliance", "ESOP & incentive structuring", "Ongoing compliance retainer"],
      stat: "6 Weeks", statLabel: "Typical time from engagement to first hire onboarded.",
      cta: "GCC advisory", page: "gcc",
    },
    {
      n: "03", tab: "Something isn't right",
      headline: "Something isn't right",
      desc: "Your India entity is live but the structure was set up quickly, the transfer pricing is undocumented, or your compliance is behind. We assess, fix, and maintain — without starting over.",
      bullets: ["Structure & TP health check", "FEMA & RBI regularisation", "Back-filing & penalty mitigation", "Ongoing compliance takeover"],
      stat: "< 30 days", statLabel: "Typical time to full compliance from first review call.",
      cta: "Get a review", page: "contact",
    },
    {
      n: "04", tab: "NRI investing in India",
      headline: "NRI investing or returning to India",
      desc: "You live abroad and want to invest in or start a business in India — or you're returning to India and your FEMA and tax status is changing. Two situations, one advisory team.",
      bullets: ["Schedule 4 FEMA — NRI investment route", "Residency transition planning", "NRE/FCNR account handling", "RNOR tax optimisation"],
      stat: "1–2 Weeks", statLabel: "Typical time to structure advice and filing readiness.",
      cta: "NRI guide", page: "seo_nri",
    },
    {
      n: "05", tab: "Raising an India round",
      headline: "Raising your first foreign round",
      desc: "Your startup is raising from foreign angels or VCs. CCPS, CCD, SAFE — getting the instrument, valuation, and FCGPR right determines how clean your cap table looks at Series A.",
      bullets: ["CCPS / CCD structuring", "Angel tax — DPIIT recognition", "FEMA valuation compliance", "FC-GPR within 30 days"],
      stat: "30 days", statLabel: "FC-GPR must be filed within 30 days of share allotment.",
      cta: "Startup funding guide", page: "seo_startup",
    },
    {
      n: "06", tab: "Incorporating a Pvt Ltd",
      headline: "Incorporating a Pvt Ltd in India",
      desc: "You're an Indian founder, entrepreneur, or promoter incorporating a Private Limited Company. You want it done right — right objects clause, right share structure, FDI-ready if investors come later.",
      bullets: ["MOA objects clause advice", "Share capital structure", "FDI-ready from day one", "Post-incorporation compliance"],
      stat: "7–10 days", statLabel: "Typical MCA incorporation after document submission.",
      cta: "Pvt Ltd registration guide", page: "seo_pvtltd",
    },
  ];

  useEffect(() => {
    startRef.current = performance.now();
    function tick(now) {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / AUTO_TAB_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= AUTO_TAB_DURATION) {
        setActive(a => (a + 1) % SITUATIONS.length);
        startRef.current = performance.now();
        setProgress(0);
      }
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active]);

  useEffect(() => { setProgress(0); }, [active]);

  const s = SITUATIONS[active];

  // Responsive values
  const secPad = isMobile ? "48px 20px 40px" : isTablet ? "60px 32px 48px" : "80px 56px 48px";
  const tabFontSz = isMobile ? 12 : isTablet ? 13 : 14.5;
  const tabNumSz = isMobile ? 9 : 10;
  const tabPad = isMobile ? "8px 10px" : "9px 14px";
  // On mobile: pills wrap in 2 columns; tablet+: single row stretch
  const pillsRow = isMobile
    ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12, width: "100%" }
    : { display: "flex", gap: 8, marginBottom: 14, width: "100%" };

  // Detail panel layout
  const panelCols = isMobile ? "1fr" : isTablet ? "1fr 220px" : "1fr 280px";
  const leftPad = isMobile ? "20px" : isTablet ? "20px 28px" : "24px 40px";
  const rightPad = isMobile ? "20px" : "28px";
  // Inside left: desc + bullets row on desktop/tablet, stacked on mobile
  const innerCols = isMobile ? "1fr" : "1fr auto";
  const innerGap = isMobile ? 16 : 28;

  return (
    <section style={{ padding: secPad, background: T.ivory }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 24, height: 1, background: T.s }} />
          <span style={{
            fontSize: 10, letterSpacing: "0.38em", textTransform: "uppercase",
            color: T.s, fontWeight: 700
          }}>Where You Fit In</span>
        </div>

        {/* Heading */}
        <h2 className="font-display" style={{
          fontSize: "clamp(26px,3.5vw,50px)",
          fontWeight: 600, lineHeight: 1.08, color: T.ch, marginBottom: 4, textAlign: "center"
        }}>
          Six situations.
        </h2>
        <h2 className="font-display" style={{
          fontSize: "clamp(26px,3.5vw,50px)",
          fontWeight: 600, lineHeight: 1.08, marginBottom: 12, marginTop: 0, textAlign: "center"
        }}>
          <em style={{ fontStyle: "italic", color: T.f }}>One structured conversation.</em>
        </h2>
        {/* <p style={{
          fontSize: isMobile ? 14 : 15, color: T.mid, lineHeight: 1.75, fontWeight: 300,
          maxWidth: 520, marginBottom: isMobile ? 24 : 36, textAlign: "center", margin: "0 auto",
          marginBottom: isMobile ? 24 : 36
        }}>
          Pick the one closest to where you are — we'll show you exactly what
          changes for your structure, your timeline, and your compliance load.
        </p> */}

        {/* Tab pills */}
        <div style={pillsRow}>
          {SITUATIONS.map((sit, i) => (
            <button key={sit.n}
              onClick={() => { setActive(i); setProgress(0); }}
              style={{
                flex: isMobile ? undefined : "1 1 0",
                background: "#fff",
                border: `1.5px solid ${i === active ? T.ch : T.bdr}`,
                borderRadius: 50,
                padding: tabPad,
                cursor: "pointer", fontFamily: "inherit",
                position: "relative", overflow: "hidden",
                transition: "border-color .2s",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}>
              <span style={{
                fontSize: tabNumSz, fontWeight: 700,
                color: i === active ? T.f : T.lt,
                marginRight: 4
              }}>{sit.n}</span>
              <span style={{
                fontSize: tabFontSz, fontWeight: 600,
                color: T.ch
              }}>
                {sit.tab}
              </span>
              {/* Progress bar — subtle track + fill */}
              {i === active && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                  background: T.bdr
                }}>
                  <div style={{
                    height: "100%", background: T.ch,
                    width: `${progress}%`, transition: "none",
                    borderRadius: "0 2px 2px 0"
                  }} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="ap-panel" style={{
          background: "#fff", border: `1px solid ${T.bdr}`,
          borderRadius: 14, overflow: "hidden",
          display: "grid", gridTemplateColumns: panelCols,
          alignItems: "stretch",
        }}>
          {/* Left */}
          <div style={{
            padding: leftPad, borderBottom: isMobile ? `1px solid ${T.bdr}` : "none",
            borderRight: isMobile ? "none" : `1px solid ${T.bdr}`,
            display: "flex", flexDirection: "column", justifyContent: "center"
          }}>

            {/* Single grid: [heading + desc] left | pills right */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
              gridTemplateRows: isMobile ? "auto" : "auto 1fr",
              gap: isMobile ? 12 : `10px ${innerGap}px`,
              alignItems: "start",
            }}>
              {/* Heading — left col, row 1 */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                gridColumn: 1, gridRow: 1
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.f, flexShrink: 0 }}>{s.n}</span>
                <div style={{ width: 20, height: 1, background: T.bdr, flexShrink: 0 }} />
                <h3 className="font-display" style={{
                  fontSize: "clamp(16px,1.7vw,22px)",
                  fontWeight: 600, color: T.ch, margin: 0, lineHeight: 1.3
                }}>{s.headline}</h3>
              </div>

              {/* Description — left col, row 2 */}
              <p style={{
                fontSize: 14, color: T.mid, lineHeight: 1.75,
                fontWeight: 300, margin: 0,
                gridColumn: 1, gridRow: isMobile ? "auto" : 2
              }}>{s.desc}</p>

              {/* Pills — right col, spans both rows */}
              {!isMobile && (
                <div style={{
                  gridColumn: 2, gridRow: "1 / 3",
                  display: "flex", flexDirection: "column",
                  justifyContent: "center", gap: 7,
                  alignSelf: "stretch",
                }}>
                  {s.bullets.map(b => (
                    <span key={b} style={{
                      display: "inline-flex", alignItems: "center",
                      background: T.stone, border: `1px solid ${T.bdr}`,
                      borderRadius: 50, padding: "6px 14px",
                      fontSize: 12.5, color: T.ch, whiteSpace: "nowrap"
                    }}>
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Pills on mobile — below description, wrap */}
              {isMobile && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.bullets.map(b => (
                    <span key={b} style={{
                      display: "inline-flex", alignItems: "center",
                      background: T.stone, border: `1px solid ${T.bdr}`,
                      borderRadius: 50, padding: "5px 12px",
                      fontSize: 12, color: T.ch, whiteSpace: "nowrap"
                    }}>
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — speed icon + stat + CTA */}
          {!isMobile && (
            <div style={{
              padding: rightPad, background: "linear-gradient(160deg, #f0f7f4 0%, #fdf6e8 100%)",
              display: "flex", flexDirection: "column", justifyContent: "center", gap: 14,
              borderLeft: "3px solid #e69819",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <SpeedIcon size={isTablet ? 52 : 64} />
                <div className="font-number" style={{
                  fontSize: "clamp(22px,2.4vw,34px)",
                  color: "#e69819", lineHeight: 1, fontWeight: 700
                }}>{s.stat}</div>
              </div>
              <p style={{ fontSize: 13, color: "#5C5C54", lineHeight: 1.65, margin: 0 }}>{s.statLabel}</p>
              <button style={{
                background: "linear-gradient(135deg, #0B3D2E, #145c42)", color: "#fff", border: "none",
                borderRadius: 7, padding: "12px 18px", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", marginTop: 4,
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 8px rgba(11,61,46,0.2)",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(11,61,46,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(11,61,46,0.2)"; }}
                onClick={() => { window.location.href = ROUTES[s.page] || "/"; }}>
                {s.cta} →
              </button>
            </div>
          )}

          {/* On mobile: stat + CTA stacked below in a compact row */}
          {isMobile && (
            <div style={{
              padding: "20px", background: "linear-gradient(160deg, #f0f7f4 0%, #fdf6e8 100%)",
              display: "flex", alignItems: "center", gap: 16,
              borderTop: "3px solid #e69819",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <SpeedIcon size={44} />
                <div>
                  <div className="font-number" style={{ fontSize: 22, color: "#e69819", lineHeight: 1, fontWeight: 700 }}>{s.stat}</div>
                  <p style={{ fontSize: 12, color: "#5C5C54", lineHeight: 1.5, margin: "4px 0 0" }}>{s.statLabel}</p>
                </div>
              </div>
              <button style={{
                background: "linear-gradient(135deg, #0B3D2E, #145c42)", color: "#fff", border: "none",
                borderRadius: 7, padding: "10px 14px", fontSize: 12.5, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
                boxShadow: "0 2px 8px rgba(11,61,46,0.2)",
              }}
                onClick={() => { window.location.href = ROUTES[s.page] || "/"; }}>
                {s.cta} →
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ─── KNOWLEDGE HUB SECTION ────────────────────────────────────────────────────
const CF_KH_URL = `https://cdn.contentful.com/spaces/qjo3cpray5h2/environments/master/entries`;
const CF_KH_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN || "Me3wAoh5C8R-voHvn3buH1R3nWLM9f4QrT6jKVaWDtY";

function KnowledgeHubSection({ T, ROUTES }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${CF_KH_URL}?content_type=article&order=-fields.publishedDate&limit=4`, {
      headers: { Authorization: `Bearer ${CF_KH_TOKEN}` },
    })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => {
        const mapped = (data.items || []).slice(0, 4).map(item => ({
          slug: item.fields.slug || item.sys.id,
          title: item.fields.title || "",
          summary: item.fields.summary || "",
          date: item.fields.publishedDate
            ? new Date(item.fields.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
            : "",
          tag: item.fields.tag || item.fields.category || "Guide",
          readTime: item.fields.readTime || "5 min read",
        }));
        setPosts(mapped);
      })
      .catch(err => console.warn("KnowledgeHub fetch failed:", err));
  }, []);

  // Tag colours
  const TAG_COLORS = {
    "Guide": "#0B3D2E", "Deep Dive": "#4A6FA5", "Compliance": "#C17D2A",
    "Tax Planning": "#5C7A4A", "How-To": "#5C5C52", "Update": "#7B4A9A", "General": "#888",
  };

  return (
    <section style={{ padding: "80px 56px", background: T.stone }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Header row */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 48
        }}>
          <div>
            <div style={{
              fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase",
              color: T.s, fontWeight: 600, marginBottom: 12
            }}>Knowledge Hub</div>
            <h2 className="font-display" style={{
              fontSize: "clamp(26px,3vw,42px)",
              fontWeight: 600, lineHeight: 1.1, color: T.ch, margin: 0
            }}>
              Insights for global companies{" "}
              <em style={{ fontStyle: "italic", color: T.f }}>entering India.</em>
            </h2>
          </div>
          <button className="ics-btn ics-btn-outline"
            onClick={() => { window.location.href = ROUTES["hub"]; }}>
            View All Articles →
          </button>
        </div>

        {/* Cards grid */}
        {posts.length === 0 ? (
          /* Skeleton */
          <div className="kh-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)", gap: 20
          }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                background: "#fff", borderRadius: 16,
                padding: "28px 24px", border: `1px solid ${T.bdr}`
              }}>
                <div style={{
                  height: 12, background: T.bdr, borderRadius: 4,
                  marginBottom: 12, width: "40%"
                }} />
                <div style={{
                  height: 18, background: T.bdr, borderRadius: 4,
                  marginBottom: 8
                }} />
                <div style={{
                  height: 14, background: T.bdr, borderRadius: 4,
                  width: "80%"
                }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="kh-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)", gap: 20
          }}>
            {posts.map(post => (
              <a key={post.slug}
                href={`/knowledge-hub/${post.slug}`}
                style={{
                  textDecoration: "none", display: "flex", flexDirection: "column",
                  background: "#fff", borderRadius: 16, padding: "28px 24px",
                  border: `1px solid ${T.bdr}`,
                  transition: "transform .2s, box-shadow .2s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,.09)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Tag + date */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: TAG_COLORS[post.tag] || "#888",
                    background: (TAG_COLORS[post.tag] || "#888") + "18",
                    padding: "3px 10px", borderRadius: 50,
                  }}>{post.tag}</span>
                  <span style={{ fontSize: 11, color: T.lt }}>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-display" style={{
                  fontSize: 17, fontWeight: 600,
                  color: T.ch, lineHeight: 1.35, marginBottom: 10, flex: 1
                }}>
                  {post.title}
                </h3>

                {/* Summary */}
                {post.summary && (
                  <p style={{
                    fontSize: 13, color: T.mid, lineHeight: 1.7,
                    fontWeight: 300, marginBottom: 18,
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden"
                  }}>
                    {post.summary}
                  </p>
                )}

                {/* Footer */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", borderTop: `1px solid ${T.bdr}`,
                  paddingTop: 14, marginTop: "auto"
                }}>
                  <span style={{ fontSize: 11.5, color: T.lt }}>{post.readTime}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: T.f }}>
                    Read →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

// ─── MAP LINES OVERLAY (animated SVG connection lines over the world map image)
function MapLinesOverlay() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // City positions as % of container — equirectangular
    // x=(lon+180)/360*100  y=(90-lat)/180*100
    const NODES = [
      { x: 68.0, y: 45.0 },  // India (hub) — shifted slightly inward
      { x: 49.5, y: 22.0 },  // London
      { x: 63.5, y: 37.0 },  // Dubai
      { x: 22.0, y: 31.0 },  // New York — far left
      { x: 79.5, y: 51.0 },  // Singapore — far right
      { x: 86.5, y: 70.0 },  // Sydney — bottom right
    ];
    const EDGES = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

    // One animated pulse per edge, staggered start
    const pulses = EDGES.map(([a, b], i) => ({
      a, b, t: i / EDGES.length,
      speed: 0.004 + Math.random() * 0.002,
    }));

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pt(xPct, yPct) {
      return [
        xPct / 100 * (canvas.width / dpr),
        yPct / 100 * (canvas.height / dpr),
      ];
    }

    function draw() {
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      ctx.clearRect(0, 0, W, H);

      EDGES.forEach(([ai, bi]) => {
        const [ax, ay] = pt(NODES[ai].x, NODES[ai].y);
        const [bx, by] = pt(NODES[bi].x, NODES[bi].y);
        const cpx = (ax + bx) / 2;
        const cpy = Math.min(ay, by) - Math.abs(bx - ax) * 0.32;

        // Static line
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(cpx, cpy, bx, by);
        ctx.strokeStyle = "rgba(11,61,46,0.65)";
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // City dots
      NODES.forEach((node, i) => {
        const [nx, ny] = pt(node.x, node.y);
        const isHub = i === 0;
        // Pulse ring
        ctx.beginPath();
        ctx.arc(nx, ny, isHub ? 10 : 7, 0, Math.PI * 2);
        ctx.strokeStyle = isHub ? "rgba(11,61,46,0.6)" : "rgba(11,61,46,0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Fill dot
        ctx.beginPath();
        ctx.arc(nx, ny, isHub ? 5.5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isHub ? "#0B3D2E" : "#0B3D2E";
        ctx.fill();
        // Orange centre for hub, white for others
        ctx.beginPath();
        ctx.arc(nx, ny, isHub ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isHub ? "#E8900A" : "#fff";
        ctx.fill();
      });

      // Animated travelling dot along each line
      pulses.forEach(pulse => {
        pulse.t = (pulse.t + pulse.speed) % 1;
        const [ax, ay] = pt(NODES[pulse.a].x, NODES[pulse.a].y);
        const [bx, by] = pt(NODES[pulse.b].x, NODES[pulse.b].y);
        const cpx = (ax + bx) / 2;
        const cpy = Math.min(ay, by) - Math.abs(bx - ax) * 0.32;
        const t = pulse.t;
        const qx = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * cpx + t * t * bx;
        const qy = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * cpy + t * t * by;

        // Glow
        const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 10);
        g.addColorStop(0, "rgba(11,61,46,0.8)");
        g.addColorStop(1, "rgba(11,61,46,0)");
        ctx.beginPath();
        ctx.arc(qx, qy, 10, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(qx, qy, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#0B3D2E";
        ctx.fill();
        // Orange centre on travelling dot
        ctx.beginPath();
        ctx.arc(qx, qy, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#E8900A";
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", top: 0, left: 0,
      width: "100%", height: "100%",
      pointerEvents: "none",
    }} />
  );
}

// ─── WORLD MAP CANVAS (dot map + animated connection lines) ──────────────────
function WorldMapCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // City nodes — [x%, y%] on a 800×400 equirectangular map
    // x = (lon+180)/360*100,  y = (90-lat)/180*100
    const NODES = [
      { id: "India", x: 71.7, y: 42.8 },  // Mumbai
      { id: "UK", x: 50.0, y: 21.4 },  // London
      { id: "UAE", x: 65.2, y: 36.0 },  // Dubai
      { id: "USA", x: 26.5, y: 30.0 },  // New York
      { id: "Singapore", x: 78.8, y: 49.3 },  // Singapore
      { id: "Australia", x: 83.7, y: 69.4 },  // Sydney
    ];

    // Connection pairs (from→to index)
    const EDGES = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [3, 1],
    ];

    // Dot grid — continent positions encoded as [x%,y%] rows
    // Simplified Natural Earth coverage
    const DOT_REGIONS = [];
    // North America
    for (let x = 14; x <= 32; x += 1.2) for (let y = 18; y <= 52; y += 1.4) {
      if (x < 18 && y > 45) continue; if (x > 28 && y < 22) continue;
      DOT_REGIONS.push([x, y]);
    }
    // South America
    for (let x = 24; x <= 40; x += 1.2) for (let y = 53; y <= 90; y += 1.4) {
      if (x > 35 && y < 60) continue; if (x < 28 && y > 80) continue;
      DOT_REGIONS.push([x, y]);
    }
    // Europe
    for (let x = 47; x <= 58; x += 1.2) for (let y = 13; y <= 32; y += 1.4) {
      DOT_REGIONS.push([x, y]);
    }
    // Africa
    for (let x = 46; x <= 60; x += 1.2) for (let y = 33; y <= 78; y += 1.4) {
      if (x < 48 && y > 65) continue;
      DOT_REGIONS.push([x, y]);
    }
    // Russia/Asia top
    for (let x = 55; x <= 95; x += 1.2) for (let y = 8; y <= 28; y += 1.4) {
      DOT_REGIONS.push([x, y]);
    }
    // Middle East
    for (let x = 58; x <= 72; x += 1.2) for (let y = 28; y <= 42; y += 1.4) {
      DOT_REGIONS.push([x, y]);
    }
    // South/SE Asia
    for (let x = 63; x <= 90; x += 1.2) for (let y = 28; y <= 55; y += 1.4) {
      if (x > 85 && y < 35) continue;
      DOT_REGIONS.push([x, y]);
    }
    // Australia
    for (let x = 78; x <= 96; x += 1.2) for (let y = 58; y <= 80; y += 1.4) {
      if (x < 82 && y > 72) continue; if (x > 90 && y < 63) continue;
      DOT_REGIONS.push([x, y]);
    }

    // Animated pulses along each edge
    const pulses = EDGES.map(([a, b]) => ({
      a, b,
      t: Math.random(), // 0-1 progress
      speed: 0.003 + Math.random() * 0.002,
    }));

    function resize() {
      const w = canvas.parentElement.offsetWidth;
      const h = canvas.parentElement.offsetHeight || 340;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function px(xPct, yPct) {
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      return [xPct / 100 * W, yPct / 100 * H];
    }

    function draw() {
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#F2F4F0";
      ctx.fillRect(0, 0, W, H);

      // Dots
      DOT_REGIONS.forEach(([x, y]) => {
        const [px2, py2] = px(x, y);
        ctx.beginPath();
        ctx.arc(px2, py2, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(11,61,46,0.22)";
        ctx.fill();
      });

      // Connection lines
      EDGES.forEach(([ai, bi]) => {
        const [ax, ay] = px(NODES[ai].x, NODES[ai].y);
        const [bx, by] = px(NODES[bi].x, NODES[bi].y);
        const cpx = (ax + bx) / 2;
        const cpy = Math.min(ay, by) - Math.abs(bx - ax) * 0.18;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(cpx, cpy, bx, by);
        ctx.strokeStyle = "rgba(11,61,46,0.14)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Animated pulse dots
      pulses.forEach(pulse => {
        pulse.t = (pulse.t + pulse.speed) % 1;
        const [ai, bi] = EDGES[pulses.indexOf(pulse)];
        const [ax, ay] = px(NODES[ai].x, NODES[ai].y);
        const [bx, by] = px(NODES[bi].x, NODES[bi].y);
        const cpx = (ax + bx) / 2;
        const cpy = Math.min(ay, by) - Math.abs(bx - ax) * 0.18;

        const t = pulse.t;
        const qx = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * cpx + t * t * bx;
        const qy = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * cpy + t * t * by;

        // Glow
        const grad = ctx.createRadialGradient(qx, qy, 0, qx, qy, 7);
        grad.addColorStop(0, "rgba(232,144,10,0.6)");
        grad.addColorStop(1, "rgba(232,144,10,0)");
        ctx.beginPath();
        ctx.arc(qx, qy, 7, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(qx, qy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#E8900A";
        ctx.fill();
      });

      // City nodes
      NODES.forEach(node => {
        const [nx, ny] = px(node.x, node.y);
        // Outer ring
        ctx.beginPath();
        ctx.arc(nx, ny, 7, 0, Math.PI * 2);
        ctx.strokeStyle = node.id === "India" ? "rgba(11,61,46,0.5)" : "rgba(11,61,46,0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
        // Fill
        ctx.beginPath();
        ctx.arc(nx, ny, node.id === "India" ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = node.id === "India" ? "#0B3D2E" : "#0B3D2E";
        ctx.fill();
        // Centre dot
        ctx.beginPath();
        ctx.arc(nx, ny, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
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
      display: "grid", gridTemplateColumns: "64px 1fr",
      gap: 24, position: "relative",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-20px)",
      transition: `opacity 0.45s ease ${i * 120}ms, transform 0.45s ease ${i * 120}ms`,
    }}>
      {/* Connector line */}
      {i < total - 1 && (
        <div style={{
          position: "absolute", left: 31, top: 52, bottom: -1,
          width: 2,
          background: visible
            ? `linear-gradient(${T.f}66, ${T.bdr})`
            : T.bdr,
          transition: `background 0.5s ease ${i * 120 + 300}ms`,
        }} />
      )}

      {/* Number bubble */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
        <div style={{
          width: 48, height: 48, background: visible ? T.f : "#fff",
          borderRadius: "50%", border: `2px solid ${visible ? T.f : T.bdr}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: visible ? `0 0 0 5px ${T.stone}, 0 0 0 7px ${T.f}33` : "none",
          transition: `background 0.35s ease ${i * 120 + 150}ms, border-color 0.35s ease ${i * 120 + 150}ms, box-shadow 0.35s ease ${i * 120 + 150}ms`,
        }}>
          <span className="font-number" style={{
            fontSize: 14, color: visible ? "#fff" : T.lt, fontWeight: 600,
            transition: `color 0.3s ease ${i * 120 + 200}ms`,
          }}>{step.n}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingBottom: i < total - 1 ? 40 : 0, textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h3 style={{ fontSize: 16.5, fontWeight: 600, color: T.ch }}>{step.title}</h3>
          <span style={{
            fontSize: 11, background: T.s, color: "#fff",
            padding: "2px 10px", borderRadius: 50, fontWeight: 600,
            letterSpacing: .3, flexShrink: 0
          }}>{step.time}</span>
        </div>
        <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.78, fontWeight: 300, margin: 0 }}>{step.desc}</p>
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

function StatCell({ target, suffix = "", label, subLabel, gradient }) {
  const [display, ref] = useCountUp(target, 1600, suffix);
  return (
    <div ref={ref} style={{
      background: gradient,
      borderRadius: 16,
      padding: "32px 28px",
      display: "flex", flexDirection: "column",
      minWidth: 0,
    }}>
      {/* Title */}
      <span style={{
        fontSize: 10.5, fontWeight: 700, letterSpacing: "0.18em",
        textTransform: "uppercase", color: T.mid,
        display: "block", marginBottom: 24,
      }}>{label}</span>

      {/* Number */}
      <div className="font-number" style={{
        fontSize: "clamp(32px,3.2vw,52px)", fontWeight: 500,
        color: "#06231A", lineHeight: 1, letterSpacing: "-.02em",
        marginBottom: 8, whiteSpace: "nowrap",
      }}>{display}</div>

      {/* Sub label */}
      <span style={{ fontSize: 12.5, color: T.mid, display: "block", marginTop: 4 }}>
        {subLabel}
      </span>
    </div>
  );
}

function StatsRibbon() {
  return (
    <section style={{ background: "#EDEFF4", padding: "80px 56px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Eyebrow + heading + CTA centered */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", marginBottom: 40
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 24, height: 2, background: T.s, borderRadius: 2 }} />
            <span style={{
              fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase",
              color: T.s, fontWeight: 700
            }}>Track Record</span>
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(26px,3vw,40px)",
            fontWeight: 600, color: T.ch, margin: "0 0 16px"
          }}>
            Numbers that speak{" "}
            <em style={{ fontStyle: "italic", color: T.f }}>for themselves.</em>
          </h2>
          <button
            className="ics-btn ics-btn-primary"
            style={{
              background: T.s, flexShrink: 0,
              padding: "13px 28px", borderRadius: 8, whiteSpace: "nowrap"
            }}
            onClick={() => { window.location.href = "/contact"; }}>
            Book Free Consultation →
          </button>
        </div>

        {/* Cards */}
        <div className="stats-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)", gap: 16
        }}>
          {[
            {
              target: 100, suffix: "+", label: "ENTITIES",
              subLabel: "Companies incorporated",
              gradient: "linear-gradient(135deg, rgba(11,61,46,0.2) 0%, rgba(245,168,40,0.2) 100%)",
            },
            {
              target: 18, suffix: " yrs", label: "EXPERIENCE",
              subLabel: "In continuous practice",
              gradient: "linear-gradient(135deg, rgba(245,168,40,0.2) 0%, rgba(92,92,84,0.2) 100%)",
            },
            {
              target: 22, suffix: " days", label: "SPEED",
              subLabel: "Median time to operational entity",
              gradient: "linear-gradient(135deg, rgba(92,92,84,0.2) 0%, rgba(11,61,46,0.2) 100%)",
            },
            {
              target: 0, suffix: "", label: "TP AUDITS",
              subLabel: "Transfer pricing audits lost",
              gradient: "linear-gradient(135deg, rgba(11,61,46,0.2) 0%, rgba(245,168,40,0.2) 100%)",
            },
            {
              target: 90, suffix: "+", label: "TREATIES",
              subLabel: "Jurisdictions covered",
              gradient: "linear-gradient(135deg, rgba(245,168,40,0.2) 0%, rgba(92,92,84,0.2) 100%)",
            },
          ].map((s, i) => (
            <StatCell key={s.label} target={s.target} suffix={s.suffix}
              label={s.label} subLabel={s.subLabel} gradient={s.gradient} />
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
    {
      n: "01", title: "Free Consultation", time: "Day 1",
      desc: "30 minutes. We understand your business model, India objectives, and team plan — then give you a clear structure recommendation before any engagement begins."
    },
    {
      n: "02", title: "Structure Design", time: "Week 1",
      desc: "Entity type, FDI route, transfer pricing model, DTAA analysis, PE risk check. Designed before any filing — never retrofitted after.",
      link: "seo_sub"
    },
    {
      n: "03", title: "Incorporation", time: "Weeks 2–3",
      desc: "MCA SPICe+ filing, DIN, DSC, PAN, TAN, Certificate of Incorporation. Typical timeline: 7–12 working days after document submission."
    },
    {
      n: "04", title: "Post-Incorporation Setup", time: "Week 4",
      desc: "RBI FCGPR filing, GST registration, bank account, payroll setup, and your complete compliance calendar — handed over ready to use."
    },
    {
      n: "05", title: "Ongoing Compliance", time: "Month 2+",
      desc: "Monthly retainer: GST, TDS, payroll, MCA filings, annual audit, corporate tax return. One firm, full coverage, fixed fee."
    },
  ];

  const verticals = [
    { icon: "💻", name: "SaaS & Technology", proof: "30+ companies", detail: "Primarily from USA, Singapore & UK" },
    { icon: "🏗️", name: "GCC / Captive Centres", proof: "15+ setups", detail: "10–200 person teams across sectors" },
    { icon: "🏦", name: "Financial Services", proof: "20+ companies", detail: "Fintech, funds, wealth management" },
    { icon: "🏭", name: "Manufacturing & Engineering", proof: "15+ companies", detail: "UAE, Germany, Japan" },
    { icon: "🏥", name: "Healthcare & Pharma", proof: "10+ companies", detail: "Research, devices, distribution" },
    { icon: "🏪", name: "E-commerce & Retail", proof: "10+ companies", detail: "D2C, marketplace, omnichannel" },
  ];

  const regions = [
    { flag: "🇺🇸", name: "USA & Canada", count: "30+", industries: "SaaS · Fintech · GCC · EdTech" },
    { flag: "🇬🇧", name: "UK & Europe", count: "20+", industries: "Financial Services · Manufacturing · Tech" },
    { flag: "🇦🇪", name: "UAE & Middle East", count: "15+", industries: "Trading · Tech · Shared Services" },
    { flag: "🇸🇬", name: "Singapore & APAC", count: "20+", industries: "SaaS · GCC · Semiconductors" },
    { flag: "🇦🇺", name: "Australia & NZ", count: "10+", industries: "Resources · Professional Services" },
    { flag: "🌍", name: "Other Markets", count: "5+", industries: "Japan · Germany · Other Regions" },
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
    <div style={{ overflowX: "hidden", width: "100%" }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      {/* <section className="hero-section" style={{
        background: T.f, minHeight: "100vh", display: "flex",
        alignItems: "center", padding: "130px 56px 90px", position: "relative", overflow: "hidden",
      }}>
        
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 55% 70% at 105% 40%,rgba(232,144,10,.11) 0%,transparent 55%),
                      radial-gradient(ellipse 40% 60% at -5% 110%,rgba(0,0,0,.25) 0%,transparent 50%)` }} />

        <div className="hero-grid" style={{
          maxWidth: 1360, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 420px", gap: 72,
          alignItems: "center", position: "relative", zIndex: 2
        }}>

         
          <div className="stagger in" style={{ textAlign: "left" }}>
            <div className="hero-eyebrow" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(232,144,10,.13)", border: "1px solid rgba(232,144,10,.28)",
              color: T.sl, padding: "5px 16px", borderRadius: 50, fontSize: 10.5,
              fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 28
            }}>
              Foreign Companies · NRIs · Global Investors
            </div>
            <h1 className="font-display hero-h1" style={{
              fontSize: "clamp(36px,4.5vw,62px)", fontWeight: 600,
              lineHeight: 1.08, color: "#fff", marginBottom: 24, letterSpacing: "-.02em",
            }}>
              India, entered{" "}
              <em style={{ fontStyle: "italic", color: T.sl }}>correctly.</em>
            </h1>
            <p style={{
              fontSize: 17, color: "rgba(255,255,255,.72)", lineHeight: 1.85,
              fontWeight: 300, maxWidth: 540, marginBottom: 40
            }}>
              Senior, ex–Big Four chartered accountants and lawyers who incorporate, structure,
              and keep foreign companies compliant in India — for founders and investors who
              don't get a second attempt at the first filing.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
              {[
                { label: "Setting up an India subsidiary", icon: "🏢", page: "seo_fcri" },
                { label: "Building a GCC or captive team", icon: "🏗️", page: "gcc" },
                { label: "Already in India, need a fix", icon: "🔧", page: "contact" },
              ].map(p => (
                <button key={p.label} onClick={() => { window.location.href = ROUTES[p.page] || "/"; }} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)",
                  color: "rgba(255,255,255,.75)", padding: "7px 14px", borderRadius: 50,
                  fontSize: 12.5, fontWeight: 500, cursor: "pointer",
                  fontFamily: "var(--font-poppins),sans-serif", transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,.14)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "rgba(255,255,255,.75)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.14)"; }}>
                  <span>{p.icon}</span> {p.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
              <button className="ics-btn ics-btn-primary ics-btn-lg"
                onClick={() => { window.location.href = ROUTES["contact"] || "/"; }}>
                Book Free 30-min Strategy Call →
              </button>
              <button className="ics-btn ics-btn-ghost ics-btn-lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                How It Works ↓
              </button>
            </div>
            <div className="hero-trust-bar" style={{
              display: "flex", flexWrap: "wrap", gap: 0,
              borderTop: "1px solid rgba(255,255,255,.09)", paddingTop: 26
            }}>
              {[
                { label: "Clients from", value: "🇺🇸 🇬🇧 🇦🇪 🇸🇬 🇦🇺 🇩🇪 +" },
                { label: "Experience", value: "18+ years" },
                { label: "Incorporated", value: "100+ companies" },
                { label: "TP audits lost", value: "Zero" },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  paddingRight: 28, marginRight: 28,
                  borderRight: "1px solid rgba(255,255,255,.09)", marginBottom: 6
                }}>
                  <div style={{
                    fontSize: 9.5, color: "rgba(255,255,255,.28)", letterSpacing: 1,
                    textTransform: "uppercase", marginBottom: 3
                  }}>{label}</div>
                  <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.72)", fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

        
          <div className="hero-right-col">
            <HeroGlobe />
          </div>
        </div>
      </section> */}
      <NewHeroSection T={T} ROUTES={ROUTES} />
      {/* ══ CLIENT LOGOS MARQUEE ══════════════════════════════════════════════ */}
      <section style={{ padding: "44px 0", background: T.ivory }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{
            fontFamily: "var(--font-montserrat),'Montserrat',sans-serif",
            fontSize: "clamp(11px,1.1vw,14px)", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: T.mid, margin: 0
          }}>
            Trusted by 100+ companies worldwide
          </p>
          <div style={{ width: 32, height: 2, background: T.s, borderRadius: 2, margin: "8px auto 0" }} />
        </div>

        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "8%", zIndex: 2,
            pointerEvents: "none", background: `linear-gradient(90deg,${T.ivory},transparent)`
          }} />
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "8%", zIndex: 2,
            pointerEvents: "none", background: `linear-gradient(270deg,${T.ivory},transparent)`
          }} />

          <div className="logo-row-left" style={{ display: "flex", width: "max-content", alignItems: "center" }}>
            {[...Array(2)].map((_, di) => (
              <div key={di} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {[
                  "Protiviti India", "Mahindra Defence Systems", "Saregama India",
                  "Ethos Limited", "Polyplex Corporation Limited (Listed)",
                  "Kuantom Papers Limited", "Tube Investment of India",
                  "Vibracoustic India Private Limited", "Newtech Filter (BOSCH group Company)",
                  "Godrej, UAE entities", "Ognibene power", "Cloud EQ",
                  "Defacto Infotech India, AU, US", "CrimsonInsights", "Alleshealth",
                  "Foodjam", "Grid advertising", "Talink", "Mcube capital",
                  "SML Mahindra Limited", "Cheema Boilers Limited", "AWFIS India Private Limited",
                  "Skin elements", "Vyra Life (Modebencura)",
                ].map(name => (
                  <div key={`${di}-${name}`} style={{
                    flexShrink: 0, width: 150, height: 72,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "0 20px",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/${encodeURIComponent(name)}.png`}
                      alt={name}
                      style={{
                        maxWidth: "130px", maxHeight: "50px",
                        width: "auto", height: "auto", objectFit: "contain"
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <SmarterDecisionsScroll accentColor={T.f} /> */}
      {/* ══ STATS RIBBON ══════════════════════════════════════════════════════ */}
      <StatsRibbon />

      {/* ══ AUDIENCE PATHS ════════════════════════════════════════════════════ */}
      <AudiencePathsSection T={T} ROUTES={ROUTES} />
      <ClientOutcomes />
      <WhatWeDoSection T={T} ROUTES={ROUTES} />

      {/* ══ QUOTE CALLOUT ═════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 56px 60px", background: T.ivory }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="quote-callout reveal" style={{
            position: "relative", overflow: "hidden",
            backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=60')",
            backgroundSize: "cover", backgroundPosition: "center",
            borderRadius: 18, padding: "38px 44px",
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: 32, alignItems: "center",
          }}>
            {/* Dark green overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg,rgba(11,61,46,0.90) 0%,rgba(21,92,70,0.88) 100%)`,
              borderRadius: 18
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontSize: 19, color: "rgba(255,255,255,.95)", lineHeight: 1.65,
                fontWeight: 400, fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif",
                fontStyle: "italic", textAlign: "left", margin: 0
              }}>
                "Most foreign companies enter India with the wrong structure and fix it at audit time.
                We design it right the first time — saving you 2–3× the cost in corrections."
              </p>
              <p style={{
                fontSize: 12.5, color: "rgba(255,255,255,.4)", marginTop: 12,
                textAlign: "left", margin: "12px 0 0"
              }}>
                — P.G., FCA · Diploma in International Taxation · 8 yrs Ex-Big 4
              </p>
            </div>
            <button className="ics-btn ics-btn-primary ics-btn-lg"
              style={{ flexShrink: 0, position: "relative", zIndex: 1 }}
              onClick={() => { window.location.href = ROUTES["contact"]; }}>
              Talk to Our Expert Team →
            </button>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding: "108px 56px", background: T.stone }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 72, alignItems: "start" }}>

            {/* Left — sticky */}
            <div className="process-sticky" style={{ position: "sticky", top: 100 }}>
              <div style={{
                fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                color: T.s, fontWeight: 600, marginBottom: 14
              }}>The Process</div>
              <h2 className="font-display" style={{
                fontSize: "clamp(32px,3.5vw,48px)",
                fontWeight: 600, lineHeight: 1.08, color: T.ch, marginBottom: 18
              }}>
                What happens after you contact us.
              </h2>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.82, fontWeight: 300, marginBottom: 28 }}>
                No black box. You know exactly what we're doing, when, and why.
                Most companies are operational within 30 days of first contact.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Free 30-min strategy call", "No retainer to start", "One point of contact", "Fixed, transparent fees"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      width: 20, height: 20, background: T.f, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 11, flexShrink: 0
                    }}>✓</span>
                    <span style={{ fontSize: 13.5, color: T.mid }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — animated steps */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {process.map((step, i) => (
                <ProcessStep key={step.n} step={step} i={i} total={process.length} />
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
      {/* <section style={{
        background: "#0a6055",
        padding: "0 56px", overflow: "hidden",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", width: "100%",
          display: "flex", alignItems: "stretch", gap: 80, flexWrap: "wrap",
        }}>
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
              <br /><br />
              We don't retrofit compliance at audit time. We get your India entry right
              the first time, because fixing it later costs 2–3× more."
            </p>
            <div style={{ marginTop: 8 }}>
              <p style={{ fontWeight: 700, fontSize: 16, color: "#DBEEFF" }}>P.G., FCA</p>
              <p style={{ fontSize: 14, color: "#DBEEFF", opacity: 0.7 }}>Founder · Ex-Big 4 · Diploma in International Taxation</p>
            </div>
          </div>

         
          <div style={{
            flex: "1 1 380px", display: "flex", gap: 14,
            height: 560, overflow: "hidden", padding: "24px 0",
          }}>
            
            <div className="scrollbar-hidden" style={{ flex: 1, overflow: "hidden" }}>
              <div className="animate-marquee-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { text: "The team handled our incorporation end-to-end — FCGPR, transfer pricing policy, first payroll — all within 30 days. No gaps, no surprises.", name: "A.K.", sub: "CFO · 🇺🇸 USA", av: "A" },
                  { text: "Our parent company's auditors had raised PE risk concerns. ICS restructured the intercompany setup and documented everything properly. Clean audit since.", name: "N.R.", sub: "Finance Head · 🇬🇧 UK", av: "N" },
                  { text: "We had been operating a branch for over a decade with no TP documentation. ICS converted it, filed 3CEB, and built a defensible policy. Passed scrutiny without a single adjustment.", name: "F.A.", sub: "Group Director · 🇦🇪 UAE", av: "F" },
                  { text: "Went from zero to a 40-person GCC in Pune. Entity, payroll, ESOP, cost-plus pricing — all handled in parallel. Fully compliant from the first hire.", name: "L.W.", sub: "CEO · 🇸🇬 Singapore", av: "L" },
                  { text: "A previous firm set us up with the wrong entity structure. ICS identified the issue immediately, managed the restructure, and fixed the compliance gaps.", name: "R.D.", sub: "Founder · 🇦🇺 Australia", av: "R" },
             
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

           
            <div className="scrollbar-hidden" style={{ flex: 1, overflow: "hidden" }}>
              <div className="animate-marquee-down" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { text: "We were raising a foreign round and had no idea how to structure it. ICS handled DPIIT recognition, FEMA valuation, and FC-GPR filing. Cap table is clean going into Series A.", name: "S.V.", sub: "Co-founder · 🇮🇳 India", av: "S" },
                  { text: "They aligned our India compliance calendar to our UK group reporting cycle. No year-end surprises. That level of commercial thinking is rare from an Indian CA firm.", name: "P.H.", sub: "Finance Director · 🇬🇧 UK", av: "P" },
                  { text: "The fixed-fee retainer removed all uncertainty. GST, TDS, payroll, annual audit — one number, full coverage. No invoice surprises mid-year.", name: "M.B.", sub: "COO · 🇩🇪 Germany", av: "M" },
                  { text: "WOS incorporated in 11 working days. Bank account open by week three. Their DTAA analysis upfront reduced our withholding tax exposure significantly.", name: "C.W.", sub: "CFO · 🇸🇬 Singapore", av: "C" },
                  { text: "Three other firms gave us conflicting FDI route advice. ICS gave one clear recommendation with the reasoning behind it. That confidence was worth the engagement alone.", name: "T.A.", sub: "Managing Director · 🇦🇪 UAE", av: "T" },
                  
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
      </section> */}

      {/* ══ PRICING / PACKAGES ═══════════════════════════════════════════════ */}
      <PricingTabsSection T={T} ROUTES={ROUTES} />

      {/* ══ INDUSTRIES ════════════════════════════════════════════════════════ */}
      <section style={{ padding: "40px 64px 80px", background: "#FAF8F4" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{
              fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase",
              color: T.s, fontWeight: 600, marginBottom: 20
            }}>Industries We Serve</p>
            <h2 className="font-display" style={{
              fontSize: "clamp(34px,4vw,58px)",
              fontWeight: 600, lineHeight: 1.06, color: T.ch, margin: 0
            }}>
              Sectors we know{" "}
              <em style={{ color: T.f, fontStyle: "italic" }}>deeply.</em>
            </h2>
          </div>

          {/* Cards row */}
          <div className="ind-cards" style={{
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)", gap: 16
          }}>
            {[
              { Icon: LaptopIcon, name: "SaaS &\nTechnology", proof: "30+ companies", detail: "USA, Singapore & UK" },
              { Icon: BuildingIcon, name: "GCC / Captive\nCentres", proof: "15+ setups", detail: "10–200 person teams" },
              { Icon: BankIcon, name: "Financial\nServices", proof: "20+ companies", detail: "Fintech, funds, wealth" },
              { Icon: FactoryIcon, name: "Manufacturing\n& Engineering", proof: "15+ companies", detail: "UAE, Germany, Japan" },
              { Icon: MedicalIcon, name: "Healthcare\n& Pharma", proof: "10+ companies", detail: "Research, devices" },
              { Icon: CartIcon, name: "E-commerce\n& Retail", proof: "10+ companies", detail: "D2C, marketplace" },
            ].map(({ Icon, name, proof, detail }) => (
              <div key={name} className="ind-card" style={{
                background: "#fff", borderRadius: 22, padding: "36px 24px 32px",
                border: "1px solid #ECE7E1", textAlign: "center",
                display: "flex", flexDirection: "column", alignItems: "center",
                boxShadow: "0 12px 35px rgba(0,0,0,.05)",
                transition: "transform .22s ease, box-shadow .22s ease",
                cursor: "default", minHeight: 260,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,.05)"; }}>
                <div style={{ marginBottom: 24 }}><Icon /></div>
                <div style={{
                  fontSize: 13.5, fontWeight: 650, color: T.ch,
                  lineHeight: 1.4, marginBottom: 8, whiteSpace: "pre-line"
                }}>{name}</div>
                <div style={{
                  fontSize: 12, color: T.s, fontWeight: 700,
                  marginBottom: 6
                }}>{proof}</div>
                <div style={{ fontSize: 11.5, color: T.lt, lineHeight: 1.6 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Client Stories Carousel */}
      {/* <ClientStoriesCarousel /> */}

      {/* ══ GLOBAL REACH ══════════════════════════════════════════════════════ */}
      <section className="gr-section" style={{ padding: "0 40px 72px", background: "#FAF8F4" }}>
        <style>{`
    .gr-wrap {
      background: #fff;
      border-radius: 24px;
      box-shadow: 0 2px 40px rgba(0,0,0,.06);
      border: 1px solid #ECE7E1;
      display: grid;
      grid-template-columns: 38% 62%;
      align-items: stretch;
      overflow: hidden;
    }
    .gr-left {
      padding: 36px 32px;
      border-right: 1px solid #ECE7E1;
      display: flex;
      flex-direction: column;
      gap: 18px;
      height: fit-content;
    }
    /* Map panel — same height as left, clipped */
    .gr-map {
      position: relative;
      overflow: hidden;
      /* Inner padding so image has breathing room on all sides */
      padding: 20px;
    }
    /* Image fills the padded area, contained — no cropping */
    .gr-map-img {
      position: absolute;
      inset: 20px; /* matches the padding — gap on all 4 sides */
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      object-fit: contain;
      object-position: center center;
      display: block;
      filter: saturate(0.18) brightness(1.08) sepia(0.06);
      opacity: 0.75;
    }
    /* Canvas must match the same inset so dots align with the image */
    .gr-map canvas {
      position: absolute !important;
      inset: 20px !important;
      width: calc(100% - 40px) !important;
      height: calc(100% - 40px) !important;
      pointer-events: none;
    }

    /* ── Tablet ── */
    @media (max-width: 1024px) {
      .gr-wrap { grid-template-columns: 1fr; }
      .gr-left { border-right: none !important; border-bottom: 1px solid #ECE7E1; }
      .gr-map  { height: 320px; padding: 16px; }
      .gr-map-img {
        inset: 16px !important;
        width: calc(100% - 32px) !important;
        height: calc(100% - 32px) !important;
      }
      .gr-map canvas {
        inset: 16px !important;
        width: calc(100% - 32px) !important;
        height: calc(100% - 32px) !important;
      }
    }
    /* ── Mobile ── */
    @media (max-width: 640px) {
      .gr-section  { padding: 0 16px 48px !important; }
      .gr-wrap     { border-radius: 16px; }
      .gr-left     { padding: 24px 18px !important; gap: 14px !important; }
      .gr-map      { height: 240px; padding: 12px; }
      .gr-map-img  {
        inset: 12px !important;
        width: calc(100% - 24px) !important;
        height: calc(100% - 24px) !important;
      }
      .gr-map canvas {
        inset: 12px !important;
        width: calc(100% - 24px) !important;
        height: calc(100% - 24px) !important;
      }
      .gr-stat-num { font-size: 22px !important; }
      .gr-btns     { flex-direction: column !important; }
      .gr-btns button { width: 100%; justify-content: center; }
    }
  `}</style>

        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="gr-wrap">

            {/* ── Left ── */}
            <div className="gr-left">

              <div>
                <p style={{
                  fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase",
                  color: T.s, fontWeight: 600, margin: "0 0 10px",
                }}>Global Reach</p>
                <h2 className="font-display" style={{
                  fontSize: "clamp(20px,2vw,30px)",
                  fontWeight: 600, lineHeight: 1.12, color: T.ch, margin: "0 0 12px",
                }}>
                  Clients from every{" "}
                  <em style={{ color: T.f, fontStyle: "italic" }}>major market.</em>
                </h2>
                <div style={{ width: 28, height: 2.5, background: T.f, borderRadius: 3 }} />
              </div>

              {/* Stats 2×2 */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                border: "1px solid #ECE7E1", borderRadius: 10, overflow: "hidden",
              }}>
                {[
                  { Icon: ClientsIcon, num: "200+", label: "Clients Worldwide" },
                  { Icon: GlobeIcon, num: "90+", label: "Countries Covered" },
                  { Icon: MarketIcon, num: "10+", label: "Markets Operate" },
                  { Icon: StarIcon, num: "98%", label: "Client Satisfaction" },
                ].map(({ Icon, num, label }, i) => (
                  <div key={label} style={{
                    padding: "16px 12px", textAlign: "center",
                    borderLeft: i % 2 !== 0 ? "1px solid #ECE7E1" : "none",
                    borderTop: i >= 2 ? "1px solid #ECE7E1" : "none",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                  }}>
                    <Icon />
                    <div className="gr-stat-num font-number"
                      style={{ fontSize: 26, color: T.ch, lineHeight: 1 }}>
                      {num}
                    </div>
                    <div style={{ fontSize: 11, color: T.lt, lineHeight: 1.35 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Region pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {[
                  { dot: "#E8900A", label: "USA & Canada" },
                  { dot: T.f, label: "UK & Europe" },
                  { dot: "#F5A828", label: "UAE & Middle East" },
                  { dot: "#1B78CB", label: "Singapore & APAC" },
                  { dot: "#6B7280", label: "Australia & NZ" },
                  { dot: "#9A9A8E", label: "Other Markets" },
                ].map(p => (
                  <div key={p.label} style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    border: "1px solid #ECE7E1", borderRadius: 50,
                    padding: "4px 10px", fontSize: 10.5, color: T.mid,
                    cursor: "default", transition: "border-color .15s", whiteSpace: "nowrap",
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = T.f}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#ECE7E1"}
                  >
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: p.dot, flexShrink: 0,
                    }} />
                    {p.label}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="gr-btns" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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

            {/* ── Right: map with padding so image breathes ── */}
            <div className="gr-map">
              <img
                src="/worldmap.png"
                alt="World map"
                className="gr-map-img"
              />
              {/*
          MapLinesOverlay canvas is forced via CSS to match the same
          inset as the image — so dots and lines align perfectly with
          the visible map and never go outside it.
        */}
              <MapLinesOverlay />
            </div>

          </div>
        </div>
      </section>

      {/* ══ DTAA CALLOUT ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 56px 60px", background: T.ivory }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{
            position: "relative", borderRadius: 20, overflow: "hidden",
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=60')",
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            {/* Dark overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(11,61,46,0.82)"
            }} />

            {/* Content */}
            <div className="dtaa-callout" style={{
              position: "relative", zIndex: 1,
              padding: "40px 48px",
              display: "grid", gridTemplateColumns: "1fr auto",
              gap: 28, alignItems: "center",
            }}>
              <div>
                <div style={{
                  fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                  color: T.sl, fontWeight: 600, marginBottom: 10
                }}>Tax Advantage</div>
                <div className="font-display" style={{
                  fontSize: "clamp(18px,2vw,22px)",
                  fontWeight: 600, color: "#fff", lineHeight: 1.3
                }}>
                  India's DTAA network covers 90+ countries — most companies we onboard are overpaying.
                </div>
                <p style={{
                  fontSize: 13.5, color: "rgba(255,255,255,.58)",
                  marginTop: 10, lineHeight: 1.65
                }}>
                  Proper treaty planning reduces withholding tax on dividends, royalties, and fees.
                  We identify the savings before you commit to a structure.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                <button className="ics-btn ics-btn-primary"
                  onClick={() => { window.location.href = ROUTES["tax"]; }}>
                  International Tax →
                </button>
                <button className="ics-btn ics-btn-ghost"
                  style={{ fontSize: 12.5, padding: "9px 16px" }}
                  onClick={() => { window.location.href = ROUTES["seo_fdi"]; }}>
                  FDI Rules Guide →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 56px", background: T.stone }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>

          {/* Heading */}
          <div style={{ marginBottom: 52, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase",
              color: T.s, fontWeight: 600, marginBottom: 14
            }}>Why Us</div>
            <h2 className="font-display" style={{
              fontSize: "clamp(28px,3.5vw,50px)",
              fontWeight: 600, lineHeight: 1.1, color: T.ch, maxWidth: 580
            }}>
              Compared honestly,{" "}
              <em style={{ fontStyle: "italic", color: T.f }}>not just favourably.</em>
            </h2>
          </div>

          {/* ── Comparison Matrix — visible on all devices ── */}
          <div style={{ overflowX: "auto", paddingBottom: 20 }}>
            <div style={{
              minWidth: 860, maxWidth: 1140, margin: "0 auto",
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
              overflow: "hidden"
            }}>
              {/* Header Row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.3fr 1fr 1fr",
                background: "#fafaf5",
              }}>
                <div style={{ padding: "32px 24px", borderBottom: "1px solid #ECE7E1" }}></div>
                <div style={{
                  padding: "28px 24px 24px",
                  background: "#0B3D2E",
                  borderTop: "4px solid #e69819",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e69819" }} />
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>India Company Setup</div>
                  </div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.12em", paddingLeft: 18 }}>One Accountable Team</div>
                </div>
                <div style={{ padding: "32px 24px 24px", display: "flex", alignItems: "flex-end", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "#8b8b80", borderBottom: "1px solid #ECE7E1" }}>Big Four Firm</div>
                <div style={{ padding: "32px 24px 24px", display: "flex", alignItems: "flex-end", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "#8b8b80", borderBottom: "1px solid #ECE7E1" }}>Generic Local CA</div>
              </div>

              {/* Body Rows */}
              {[
                {
                  feature: "Senior attention",
                  ics: "Partner-led throughout", big4: "Delegated to junior staff", local: "Varies, often solo"
                },
                {
                  feature: "Tax + legal + filing",
                  ics: "One integrated team", big4: "Yes, at premium pricing", local: "Usually one discipline"
                },
                {
                  feature: "Cross-border depth",
                  ics: "Core specialism (DTAA/FEMA)", big4: "Yes", local: "Limited exposure"
                },
                {
                  feature: "Cost position",
                  ics: "Mid-market, fixed-scope", big4: "Premium retainer", local: "Lowest cost, highest risk"
                },
                {
                  feature: "Response time",
                  ics: "< 24 hrs, named contact", big4: "Varies by account tier", local: "Varies widely"
                },
                {
                  feature: "Transfer pricing record",
                  ics: "Zero audits lost", big4: "Varies", local: "Rarely documented"
                },
              ].map((row, i, arr) => (
                <div key={row.feature} style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.3fr 1fr 1fr",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafaf5"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    padding: "26px 24px", fontSize: 15, fontWeight: 700, color: "#0B3D2E",
                    display: "flex", alignItems: "center",
                    borderBottom: i === arr.length - 1 ? "none" : "1px solid #ECE7E1"
                  }}>
                    {row.feature}
                  </div>
                  <div style={{
                    padding: "26px 24px",
                    background: "rgba(11,61,46,0.04)",
                    display: "flex", alignItems: "flex-start", gap: 12,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", background: "#0B3D2E",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#0B3D2E", lineHeight: 1.4 }}>{row.ics}</span>
                  </div>
                  <div style={{
                    padding: "26px 24px", fontSize: 14.5, color: "#5C5C54", lineHeight: 1.5,
                    display: "flex", alignItems: "center",
                    borderBottom: i === arr.length - 1 ? "none" : "1px solid #ECE7E1"
                  }}>
                    {row.big4}
                  </div>
                  <div style={{
                    padding: "26px 24px", fontSize: 14.5, color: "#5C5C54", lineHeight: 1.5,
                    display: "flex", alignItems: "center",
                    borderBottom: i === arr.length - 1 ? "none" : "1px solid #ECE7E1"
                  }}>
                    {row.local}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
            <button className="ics-btn ics-btn-primary"
              style={{
                background: "linear-gradient(135deg, #0B3D2E, #145c42)",
                padding: "16px 36px", borderRadius: 8, fontSize: 14.5, fontWeight: 600,
                boxShadow: "0 6px 20px rgba(11,61,46,0.25)", border: "none", color: "#fff", cursor: "pointer"
              }}
              onClick={() => { window.location.href = ROUTES["contact"]; }}>
              Talk to Our Team →
            </button>
            <button className="ics-btn ics-btn-outline"
              style={{ padding: "15px 32px", borderRadius: 8, fontSize: 14.5, fontWeight: 600 }}
              onClick={() => { window.location.href = ROUTES["about"]; }}>
              About Us
            </button>
          </div>

        </div>
      </section>

      {/* ══ KNOWLEDGE HUB ════════════════════════════════════════════════════ */}
      <KnowledgeHubSection T={T} ROUTES={ROUTES} />

      {/* ══ PGA KNOWLEDGE PARTNER ═════════════════════════════════════════════ */}
      <section style={{ padding: "70px 56px", background: "#06100D" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="reveal pga-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              <div style={{
                width: 56, height: 56, background: "rgba(255,255,255,.06)",
                borderRadius: 14, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 26, flexShrink: 0
              }}>⚖️</div>
              <div>
                <div style={{
                  fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
                  color: "rgba(255,255,255,.3)", marginBottom: 6
                }}>Knowledge Partner</div>
                <div style={{
                  fontSize: 18, fontWeight: 600, color: "#fff",
                  fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif"
                }}>
                  PGA & Co. Chartered Accountants, Chandigarh
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginTop: 4 }}>
                  GST advisory · NRI/HNI tax · Domestic audit & assurance · Transfer pricing
                </div>
              </div>
            </div>
            <a href="https://pgaca.in" target="_blank" rel="noopener noreferrer"
              className="ics-btn" style={{
                background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)",
                border: "1px solid rgba(255,255,255,.12)", borderRadius: 8,
                fontSize: 13, fontWeight: 500, whiteSpace: "nowrap",
              }}>
              Visit pgaca.in →
            </a>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "80px 56px",
        position: "relative", overflow: "hidden",
        backgroundImage: "url('/homepage.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center 38%"
      }}>
        {/* Dark overlay for readability */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            linear-gradient(100deg, rgba(5,15,12,.96) 4%, rgba(8,32,24,.88) 42%, rgba(8,32,24,.65) 78%),
            linear-gradient(0deg, rgba(4,12,9,.6) 0%, transparent 40%)
          `
        }} />

        <div style={{
          maxWidth: 1200, margin: "0 auto", position: "relative",
          display: "grid", gridTemplateColumns: "1fr 420px", gap: 64, alignItems: "center"
        }}
          className="final-cta-grid">

          {/* ── Left copy ── */}
          <div>
            <div style={{
              fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase",
              color: T.sl, fontWeight: 700, marginBottom: 18,
              fontFamily: "var(--font-poppins),'Poppins',sans-serif"
            }}>Get Started</div>
            <h2 className="font-display" style={{
              fontSize: "clamp(36px, 4.5vw, 56px)",
              fontWeight: 600, color: "#fff", lineHeight: 1.05, marginBottom: 22
            }}>
              Ready to enter India<br />
              <em style={{ fontStyle: "italic", color: T.sl, fontWeight: 500 }}>the right way?</em>
            </h2>
            <p style={{
              fontSize: 16, color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.75,
              fontWeight: 400, marginBottom: 36, maxWidth: 460
            }}>
              Book a free 30-minute consultation. We'll review your India objectives
              and give you a clear structure recommendation — no commitment, no jargon.
            </p>

            {/* SEO resource links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              {[
                { label: "Foreign company registration", page: "seo_fcri" },
                { label: "Subsidiary company setup", page: "seo_sub" },
                { label: "Transfer pricing guide", page: "seo_tp" },
                { label: "FDI rules India", page: "seo_fdi" },
              ].map(l => (
                <button key={l.label}
                  onClick={() => { window.location.href = ROUTES[l.page] || "/"; }}
                  style={{
                    background: "#fff", border: "none",
                    color: "#082018", padding: "8px 16px", borderRadius: 50,
                    fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                    fontFamily: "var(--font-poppins),'Poppins',sans-serif",
                    transition: "all 0.2s ease",
                    display: "flex", alignItems: "center", gap: 6,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1.5px)"; e.currentTarget.style.background = "#f4f4f4"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#fff"; }}>
                  {l.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              ))}
            </div>

            {/* Checkmark benefits */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["No retainer to start", "Expert team responds within 24 hrs", "Fixed transparent fees"].map(t => (
                <span key={t} style={{
                  fontSize: 13, color: "rgba(255, 255, 255, 0.85)", fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 8,
                  fontFamily: "var(--font-poppins),'Poppins',sans-serif"
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.sl} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* ── Right: consultation form card ── */}
          <div className="reveal in hero-card" style={{
            background: "#fff", borderRadius: 20, padding: "36px 32px",
            boxShadow: "0 40px 100px rgba(0,0,0,.32)", position: "relative",
          }}>

            {/* Top gradient bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg,${T.f},${T.s})`,
              borderRadius: "20px 20px 0 0",
            }} />

            {/* Step animation CSS — injected once */}
            <style>{`
    ._sdot {
      opacity:0; transform:scale(0.3) translateY(10px);
      transition:opacity 0.48s cubic-bezier(0.34,1.56,0.64,1),
                 transform 0.48s cubic-bezier(0.34,1.56,0.64,1);
    }
    ._sdot.s { opacity:1; transform:scale(1) translateY(0); }

    ._sline {
      transform:scaleY(0); opacity:0; transform-origin:top;
      transition:transform 0.36s ease, opacity 0.36s ease;
    }
    ._sline.s { transform:scaleY(1); opacity:1; }

    ._stag {
      opacity:0; transform:translateY(6px);
      transition:opacity 0.28s ease, transform 0.28s ease;
    }
    ._stag.s { opacity:1; transform:translateY(0); }

    ._stxt {
      opacity:0; transform:translateY(5px);
      transition:opacity 0.28s ease, transform 0.28s ease;
    }
    ._stxt.s { opacity:1; transform:translateY(0); }
  `}</style>

            {hStatus === "success" ? (

              /* ── Success state ── */
              <div style={{ textAlign: "center", padding: "28px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(11,61,46,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                    stroke={T.f} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: T.ch, marginBottom: 8 }}>
                  We'll be in touch!
                </h3>
                <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.7, marginBottom: 22 }}>
                  Our expert team responds within 24 hours.
                </p>
                <a href="https://wa.me/919915731447" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#25D366", color: "#fff", padding: "12px 22px",
                    borderRadius: 9, fontSize: 13.5, fontWeight: 600, textDecoration: "none",
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.843L0 24l6.327-1.497A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.375l-.36-.214-3.732.882.898-3.636-.234-.374A9.818 9.818 0 1112 21.818z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

            ) : (

              /* ── Form state ── */
              <>
                <h3 className="font-display" style={{ fontSize: 21, fontWeight: 600, color: T.ch, marginBottom: 4 }}>
                  Book Free 30-min Strategy Call
                </h3>
                <p style={{ fontSize: 12.5, color: T.lt, lineHeight: 1.5, marginBottom: 18 }}>
                  Expert team responds within 24 hours. No commitment.
                </p>

                {/* ── Infinitely looping 1-2-3 steps ── */}
                {(() => {
                  const uid = React.useId().replace(/:/g, '');

                  const SEQ = [
                    [0, `d0${uid}`],
                    [200, `tg0${uid}`],
                    [310, `tx0${uid}`],
                    [560, `l0${uid}`],
                    [740, `d1${uid}`],
                    [940, `tg1${uid}`],
                    [1050, `tx1${uid}`],
                    [1300, `l1${uid}`],
                    [1480, `d2${uid}`],
                    [1680, `tg2${uid}`],
                    [1790, `tx2${uid}`],
                  ];
                  const ALL_IDS = SEQ.map(s => s[1]);
                  const TOTAL_MS = 1790 + 300;
                  const HOLD_MS = 1400;

                  React.useEffect(() => {
                    const timers = [];

                    const show = id => { const e = document.getElementById(id); if (e) e.classList.add('s'); };
                    const hide = id => { const e = document.getElementById(id); if (e) e.classList.remove('s'); };

                    function run() {
                      /* 1. hide all */
                      ALL_IDS.forEach(hide);

                      /* 2. tiny gap so CSS sees the class removal before re-adding */
                      timers.push(setTimeout(() => {
                        /* 3. reveal one by one */
                        SEQ.forEach(([delay, id]) => {
                          timers.push(setTimeout(() => show(id), delay));
                        });

                        /* 4. hold at end, then loop */
                        timers.push(setTimeout(run, TOTAL_MS + HOLD_MS));
                      }, 80));
                    }

                    run();
                    return () => timers.forEach(clearTimeout);
                  }, []);

                  const steps = [
                    { tag: "Within 24 hrs", txt: "Our expert team reviews your submission and confirms a 30-min slot." },
                    { tag: "On the call", txt: "We review your structure, flag risks, and recommend the right entity and tax setup." },
                    { tag: "After the call", txt: "You receive a written summary — structure recommendation, FDI route, next steps." },
                  ];

                  return (
                    <div style={{
                      background: T.stone, borderRadius: 10, padding: "14px 15px 12px",
                      marginBottom: 18, border: `1px solid ${T.bdr}`,
                    }}>
                      <p style={{
                        fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase",
                        color: T.s, fontWeight: 700, marginBottom: 14,
                        fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                      }}>
                        What happens after you submit
                      </p>

                      {steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 13, position: "relative" }}>

                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 28 }}>
                            {/* Dot */}
                            <div id={`d${i}${uid}`} className="_sdot" style={{
                              width: 28, height: 28, borderRadius: "50%", background: T.f,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontFamily: "var(--font-cormorant,'Cormorant Garamond',Georgia,serif)",
                              fontSize: 15, fontWeight: 700, color: "#fff", flexShrink: 0, zIndex: 1,
                            }}>
                              {i + 1}
                            </div>
                            {/* Connector */}
                            {i < 2 && (
                              <div id={`l${i}${uid}`} className="_sline" style={{
                                width: 1.5, flex: 1, minHeight: 12, margin: "4px 0",
                                background: `linear-gradient(to bottom,${T.f}44,${T.bdr})`,
                              }} />
                            )}
                          </div>

                          <div style={{ paddingBottom: i < 2 ? 13 : 0, paddingTop: 3 }}>
                            <p id={`tg${i}${uid}`} className="_stag" style={{
                              fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
                              textTransform: "uppercase", color: T.s, marginBottom: 3,
                              fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                            }}>
                              {step.tag}
                            </p>
                            <p id={`tx${i}${uid}`} className="_stxt" style={{
                              fontSize: 12, color: T.mid, lineHeight: 1.62, margin: 0,
                              fontFamily: "var(--font-cardo,'Cardo',Georgia,serif)",
                            }}>
                              {step.txt}
                            </p>
                          </div>

                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* ── Inputs ── */}
                <input type="text" placeholder="Your full name *"
                  value={hf.nameTitle} onChange={setH("nameTitle")}
                  style={inp({ borderColor: hStatus === "error" && !hf.nameTitle.trim() ? "#E74C3C" : T.bdr })}
                  onFocus={e => e.target.style.borderColor = T.f}
                  onBlur={e => e.target.style.borderColor = (hStatus === "error" && !hf.nameTitle.trim()) ? "#E74C3C" : T.bdr}
                />
                <input type="email" placeholder="Work email address *"
                  value={hf.email} onChange={setH("email")}
                  style={inp({ borderColor: hStatus === "error" && !hf.email.trim() ? "#E74C3C" : T.bdr })}
                  onFocus={e => e.target.style.borderColor = T.f}
                  onBlur={e => e.target.style.borderColor = (hStatus === "error" && !hf.email.trim()) ? "#E74C3C" : T.bdr}
                />
                <input type="text" placeholder="Company name, Country"
                  value={hf.companyCountry} onChange={setH("companyCountry")}
                  style={inp()}
                  onFocus={e => e.target.style.borderColor = T.f}
                  onBlur={e => e.target.style.borderColor = T.bdr}
                />
                <select value={hf.service} onChange={setH("service")} style={inp({ cursor: "pointer" })}>
                  <option value="">What do you need help with?</option>
                  <option>Foreign Company Incorporation</option>
                  <option>GCC / Captive Centre Setup</option>
                  <option>International Tax &amp; DTAA</option>
                  <option>Transfer Pricing</option>
                  <option>FEMA Compliance</option>
                  <option>Ongoing Compliance Retainer</option>
                </select>

                {hStatus === "error" && (
                  <div style={{
                    background: "#FFF0F0", border: "1px solid #FFCCCC",
                    borderRadius: 7, padding: "9px 14px", marginBottom: 10,
                    fontSize: 12.5, color: "#C0392B",
                  }}>
                    Please enter your name and email address.
                  </div>
                )}

                <button onClick={handleHeroSubmit} disabled={hStatus === "submitting"}
                  className="ics-btn ics-btn-primary"
                  style={{
                    width: "100%", justifyContent: "center", padding: "14px 20px",
                    fontSize: 14.5, opacity: hStatus === "submitting" ? 0.7 : 1,
                    borderRadius: 9, marginTop: 4, letterSpacing: 0.2,
                  }}>
                  {hStatus === "submitting" ? "Sending…" : "Request Free Consultation →"}
                </button>

                <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 14 }}>
                  {["No commitment", "Confidential", "24hr response"].map(t => (
                    <span key={t} style={{
                      fontSize: 11, color: T.lt, display: "flex", alignItems: "center", gap: 4,
                      fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}



// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
