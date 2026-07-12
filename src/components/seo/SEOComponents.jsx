'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { T, CALENDLY_URL, WA_BASE, PHONE_RAW } from '@/lib/config';
import { trackConsultationRequest, trackGuideDownload, trackWhatsApp } from '@/lib/utils';

const ROUTES = {
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
    <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
      <path d="M13 1C6.373 1 1 6.373 1 13c0 2.278.618 4.41 1.695 6.238L1 25l5.95-1.56A11.94 11.94 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z" fill="#fff" />
      <path d="M13 3.182c-5.42 0-9.818 4.398-9.818 9.818 0 2.149.694 4.136 1.864 5.758l-1.22 3.597 3.72-1.196a9.76 9.76 0 005.454 1.659c5.42 0 9.818-4.398 9.818-9.818S18.42 3.182 13 3.182zm4.863 13.044c-.202.57-1.188 1.093-1.634 1.12-.41.024-.793.195-2.674-.557-2.25-.9-3.688-3.19-3.8-3.34-.11-.148-.91-1.21-.91-2.31 0-1.098.575-1.638.778-1.858.203-.22.44-.275.587-.275l.42.008c.135.005.316-.051.495.378.184.44.624 1.52.678 1.63.055.11.09.238.017.386-.073.148-.11.24-.22.37l-.33.386c-.11.12-.225.25-.097.49.128.24.572.944 1.228 1.529.844.752 1.556.985 1.776 1.095.22.11.348.092.477-.055.128-.147.55-.641.697-.861.147-.22.293-.184.495-.11.202.073 1.284.606 1.504.716.22.11.367.165.422.256.054.091.054.527-.148 1.097z" fill="#25D366" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   HERO V2 — shared hook/animation helpers
   ───────────────────────────────────────────── */
function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Fade({ children, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   INLINE ICONS — simple line-style SVGs (no emoji anywhere)
   ───────────────────────────────────────────── */
const Ic = {
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" /><path d="M14 21V10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11" />
      <path d="M2 21h20" /><path d="M7 9h.01M7 12h.01M7 15h.01M11 9h.01M11 12h.01M11 15h.01" />
    </svg>
  ),
  coins: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v6c0 1.66 2.69 3 6 3s6-1.34 6-3V7" />
      <path d="M3 13v3c0 1.66 2.69 3 6 3 .75 0 1.46-.09 2.1-.25" />
      <path d="M15 8.5c3.31 0 6 1.12 6 2.5s-2.69 2.5-6 2.5" /><path d="M15 11v3c0 1.38 2.69 2.5 6 2.5" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-4" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" />
      <path d="M6 17V9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v6" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" /><path d="M5 8l-3 6a4 4 0 0 0 8 0z" /><path d="M19 8l-3 6a4 4 0 0 0 8 0z" />
      <path d="M5 8h14" /><path d="M12 3l3 2" /><path d="M12 3l-3 2" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  ),
  plane: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16v-2l-8-5V4a1.5 1.5 0 0 0-3 0v5l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9v11a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" /><path d="M7 7h10v10" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   SHARED PAGE LAYOUT
   ───────────────────────────────────────────── */
function SEOPageLayout({ children, title, description, eyebrow, setPage, heroVariant = 'dark', ctaLabel, stats, note, backHref, backLabel }) {
  return (
    <div className="seo-page" style={{ background: '#ffffff' }}>
      <style>{`
        /* ══════════════════════════════════════
           GLOBAL — entire page uses Helvetica ONLY
        ══════════════════════════════════════ */
        .seo-page, .seo-page * {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        }

        /* ── Hero ── */
        .seo-hero {
          background: #0d1117;
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .seo-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .seo-hero::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 55%;
          background: radial-gradient(ellipse 70% 80% at 80% 50%, rgba(76,175,80,.09) 0%, transparent 65%);
          pointer-events: none;
        }
        .seo-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 2;
        }
        .seo-btn-primary {
          background: #2e7d32;
          color: #fff;
          padding: 13px 28px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background .2s, transform .15s;
          letter-spacing: .01em;
          text-decoration: none;
          display: inline-block;
        }
        .seo-btn-primary:hover { background: #1b5e20; transform: translateY(-1px); }

        /* ══════════════════════════════════════
           HERO V2 — light beige, big Helvetica title
        ══════════════════════════════════════ */
        .hv2-hero {
          background: #f5f5f0;
          padding: 100px 56px 92px;
          position: relative;
        }
        .hv2-hero-inner {
          max-width: 1160px;
          margin: 0 auto;
        }
        .hv2-back {
          font-size: 12.5px;
          color: #888;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 24px;
        }
        .hv2-hero-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 64px;
          align-items: start;
        }
        .hv2-hero-grid.hv2-single {
          grid-template-columns: 1fr;
          max-width: 760px;
        }
        .hv2-lbl {
          font-size: 10.5px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-weight: 600;
          color: #aaa;
          display: block;
          margin-bottom: 20px;
        }
        .hv2-title {
          font-size: clamp(36px, 5vw, 66px);
          font-weight: 800;
          line-height: 1.04;
          letter-spacing: -0.033em;
          color: #111;
          margin-bottom: 22px;
        }
        .hv2-title em {
          font-style: normal;
          position: relative;
          display: inline-block;
          color: #111;
        }
        .hv2-title em::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 5px;
          background: #093024;
          border-radius: 2px;
        }
        .hv2-desc {
          font-size: 16px;
          color: #555;
          line-height: 1.78;
          max-width: 480px;
          margin-bottom: 36px;
          font-weight: 400;
        }
        .hv2-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .hv2-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #093024;
          color: #fff;
          font-size: 14.5px;
          font-weight: 700;
          padding: 13px 26px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background .2s, transform .15s;
        }
        .hv2-btn:hover { background: #0a3d2c; transform: translateY(-1px); }
        .hv2-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          border-bottom: 2px solid #111;
          padding: 13px 0;
          font-size: 14px;
          font-weight: 600;
          color: #111;
          cursor: pointer;
          line-height: 1;
        }
        .hv2-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.48);
          border-radius: 16px;
          overflow: hidden;
        }
        .hv2-card-head {
          background: #093024;
          padding: 14px 22px;
        }
        .hv2-card-head span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,.55);
        }
        .hv2-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 22px;
          gap: 16px;
        }
        .hv2-card-label {
          font-size: 13px;
          color: #777;
        }
        .hv2-card-val {
          font-size: 16px;
          font-weight: 800;
          color: #093024;
          text-align: right;
        }
        .hv2-card-note {
          padding: 13px 22px;
          background: rgba(9,48,36,0.05);
          border-top: 1px solid rgba(9,48,36,0.10);
        }
        .hv2-card-note p {
          font-size: 12px;
          color: #444;
          margin: 0;
          line-height: 1.6;
        }
        @media (max-width: 860px) {
          .hv2-hero-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
        }
        @media (max-width: 600px) {
          .hv2-hero { padding: 72px 20px 56px !important; }
          .hv2-btns { flex-direction: column; align-items: stretch; }
          .hv2-btn { justify-content: center; }
        }

        /* ── Content wrapper ── */
        .seo-content-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 48px 100px;
          background: #ffffff;
        }

        /* ── Section ── */
        .seo-section {
          margin-bottom: 72px;
          background: #ffffff;
        }
        .seo-section-eyebrow {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #2e7d32;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .seo-section-title {
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 700;
          color: #0d1117;
          line-height: 1.15;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }
        .seo-prose {
          font-size: 15px;
          color: #4a5568;
          line-height: 1.85;
          font-weight: 300;
          margin-bottom: 18px;
        }

        /* ══════════════════════════════════════
           SPECIAL PICKS — auto-rotate + click reveal
           • Right panel slides to align exactly with
             the active row (translateY per row offset).
           • Active row turns dark green (matches ref).
           • Auto-advances every 5 s; click pauses 5 s
             then resumes.
           • No icons anywhere in this section.
        ══════════════════════════════════════ */
        .seo-picks-wrap {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .seo-picks-list {
          background: #f5f5f0;
          border-radius: 20px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .seo-pick-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          border-radius: 14px;
          cursor: pointer;
          background: transparent;
          border: none;
          text-align: left;
          width: 100%;
          transition: background .25s ease;
        }
        .seo-pick-row:hover:not(.is-active) { background: rgba(255,255,255,.55); }
        /* Active row — dark green like screenshot */
        .seo-pick-row.is-active {
          background: #0f3320;
        }
        .seo-pick-main { min-width: 0; }
        .seo-pick-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #2e7d32;
          margin-bottom: 5px;
          transition: color .25s;
        }
        .seo-pick-row.is-active .seo-pick-label { color: rgba(255,255,255,.55); }
        .seo-pick-title {
          font-size: 15px;
          font-weight: 700;
          color: #111;
          line-height: 1.35;
          transition: color .25s;
        }
        .seo-pick-row.is-active .seo-pick-title { color: #fff; }
        /* Arrow circle */
        .seo-pick-arrow {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(0,0,0,0.06);
          color: #2e7d32;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background .25s, color .25s, transform .25s;
        }
        .seo-pick-arrow svg { width: 13px; height: 13px; }
        .seo-pick-row.is-active .seo-pick-arrow {
          background: rgba(255,255,255,.18);
          color: #fff;
          transform: rotate(45deg);
        }
        /* Detail column slides vertically to align with the active row */
        .seo-picks-detail-col {
          position: relative;
          transition: transform .4s cubic-bezier(.4,0,.2,1);
          will-change: transform;
        }
        .seo-picks-detail {
          background: #f0f7f0;
          border: 1px solid #c8dfc8;
          border-radius: 18px;
          padding: 26px 26px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 140px;
        }
        .seo-picks-detail-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: pickFadeIn .3s ease;
        }
        @keyframes pickFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .seo-picks-detail-eyebrow {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #2e7d32;
        }
        .seo-picks-detail-title {
          font-size: 18px;
          font-weight: 700;
          color: #0d1117;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .seo-picks-detail-desc {
          font-size: 13.5px;
          color: #4a5568;
          line-height: 1.75;
          font-weight: 400;
        }
        /* Progress bar auto-advance indicator */
        .seo-picks-progress {
          height: 2px;
          background: rgba(0,0,0,0.08);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 6px;
        }
        .seo-picks-progress-bar {
          height: 100%;
          background: #2e7d32;
          border-radius: 2px;
          transform-origin: left;
          animation: pickProgress 5s linear forwards;
        }
        @keyframes pickProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @media (max-width: 860px) {
          .seo-picks-wrap {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .seo-picks-detail-col { transform: none !important; margin-top: 12px; }
        }

        /* ══════════════════════════════════════
           PYRAMID PROCESS
        ══════════════════════════════════════ */
        .seo-pyramid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .seo-pyramid-row {
          display: grid;
          grid-template-columns: minmax(200px, 52%) 1fr;
          align-items: center;
          gap: 28px;
          transition: opacity .5s ease, transform .5s ease;
        }
        .seo-pyramid-bar {
          width: var(--bar-width, 100%);
          min-width: 180px;
          color: #fff;
          padding: 16px 28px;
          display: flex;
          align-items: center;
          gap: 14px;
          clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
          box-shadow: 0 10px 24px rgba(124, 58, 237, .18);
          transition: filter .2s ease;
        }
        .seo-pyramid-row:hover .seo-pyramid-bar { filter: brightness(1.06); }
        .seo-pyramid-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,.22);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 12.5px;
          flex-shrink: 0;
        }
        .seo-pyramid-title {
          font-weight: 700;
          font-size: 14.5px;
          letter-spacing: .01em;
          line-height: 1.3;
        }
        .seo-pyramid-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.65;
          font-weight: 300;
        }
        .seo-pyramid-desc p { margin: 0; }
        .seo-pyramid-time {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          color: #8854d0;
          background: #f3eefb;
          padding: 3px 11px;
          border-radius: 100px;
          margin-bottom: 7px;
        }
        @media (max-width: 760px) {
          .seo-pyramid-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .seo-pyramid-bar {
            width: 100% !important;
            clip-path: none;
            border-radius: 14px;
            padding: 15px 20px;
          }
          .seo-pyramid-desc {
            padding: 0 4px 6px;
          }
        }

        /* ══════════════════════════════════════
           WHAT IT IS — minimal
        ══════════════════════════════════════ */
        .seo-whatitis {
          padding: 4px 0;
        }
        .seo-whatitis-eyebrow {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .seo-whatitis-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 40px;
          align-items: start;
        }
        .seo-whatitis-title {
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 700;
          color: #0d1117;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .seo-whatitis-body p {
          font-size: 14.5px;
          color: #6b7280;
          line-height: 1.85;
          font-weight: 300;
          margin-bottom: 16px;
        }
        .seo-whatitis-body p:last-child { margin-bottom: 0; }
        @media (max-width: 800px) {
          .seo-whatitis-grid { grid-template-columns: 1fr; gap: 16px; }
        }

        /* ══════════════════════════════════════
           INFO CARDS — "Why Choose Us" ref style.
           No icons. First card dark green (featured),
           remaining cards sage green. Value shown as
           a pill button at the bottom of each card.
           Clean, no-border (except subtle outline).
        ══════════════════════════════════════ */
        .seo-iconcards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .seo-iconcards-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }

        .seo-iconcard {
          background: #dde8d8;
          border: none;
          border-radius: 20px;
          padding: 28px 24px 22px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          opacity: 0;
          transform: translateY(16px);
          animation: stepCardIn .5s ease forwards;
          transition: box-shadow .28s ease, transform .28s ease;
          cursor: default;
        }
        .seo-iconcard:hover {
          box-shadow: 0 14px 32px rgba(13,17,23,.09);
          transform: translateY(-4px);
        }
        /* First card: dark forest green */
        .seo-iconcard.is-featured {
          background: #123524;
        }
        .seo-iconcard-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f2e18;
          line-height: 1.3;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .seo-iconcard.is-featured .seo-iconcard-title { color: #ffffff; }

        .seo-iconcard-desc {
          font-size: 12.5px;
          color: #4a5e44;
          line-height: 1.7;
          font-weight: 400;
          flex: 1;
          margin-bottom: 20px;
        }
        .seo-iconcard.is-featured .seo-iconcard-desc { color: rgba(255,255,255,.68); }

        /* Value pill — dark pill on sage, white pill on dark */
        .seo-iconcard-pill {
          display: inline-block;
          background: #0f2e18;
          color: #ffffff;
          padding: 9px 22px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .03em;
          white-space: nowrap;
          margin-top: auto;
        }
        .seo-iconcard.is-featured .seo-iconcard-pill {
          background: #ffffff;
          color: #0f2e18;
        }
        .seo-iconcard-date {
          display: inline-block;
          background: #0f2e18;
          color: #ffffff;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 11.5px;
          font-weight: 700;
          margin-top: auto;
        }
        .seo-iconcard.is-featured .seo-iconcard-date {
          background: rgba(255,255,255,.18);
          color: #fff;
        }
        @keyframes stepCardIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 960px) {
          .seo-iconcards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .seo-iconcards-grid,
          .seo-iconcards-grid.cols-2 { grid-template-columns: 1fr; }
        }

        /* ── Small stat row ── */
        .seo-stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 8px;
        }
        .seo-stat-card {
          background: #ffffff;
          border: 1px solid #ececec;
          border-radius: 14px;
          padding: 18px 20px;
          text-align: center;
        }
        .seo-stat-num {
          font-size: 26px;
          font-weight: 700;
          color: #0d1117;
          margin-bottom: 4px;
        }
        .seo-stat-label {
          font-size: 11.5px;
          color: #9ca3af;
          font-weight: 500;
        }
        @media (max-width: 620px) {
          .seo-stat-row { grid-template-columns: 1fr; }
        }

        /* ══════════════════════════════════════
           FAQ — separate cards, single-open accordion
        ══════════════════════════════════════ */
        .seo-faqcards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .seo-faqcard {
          background: #ffffff;
          border: 1px solid #ececec;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .seo-faqcard.is-open {
          border-color: #c8e6c9;
          box-shadow: 0 6px 20px rgba(13,17,23,.05);
        }
        .seo-faqcard-btn {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 20px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          text-align: left;
        }
        .seo-faqcard-q {
          font-size: 14.5px;
          font-weight: 600;
          color: #0d1117;
          line-height: 1.45;
        }
        .seo-faqcard-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f0f7f0;
          color: #2e7d32;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform .25s ease, background .2s ease, color .2s ease;
        }
        .seo-faqcard-icon svg { width: 13px; height: 13px; }
        .seo-faqcard.is-open .seo-faqcard-icon {
          background: #2e7d32;
          color: #fff;
          transform: rotate(135deg);
        }
        .seo-faqcard-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .28s ease;
        }
        .seo-faqcard.is-open .seo-faqcard-panel {
          grid-template-rows: 1fr;
        }
        .seo-faqcard-panel-inner {
          overflow: hidden;
        }
        .seo-faqcard-a {
          font-size: 13.5px;
          color: #6b7280;
          line-height: 1.8;
          font-weight: 300;
          padding: 0 22px 20px;
        }

        /* ── Common Mistakes — always red border, accordion ── */
        .seo-mistakes-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .seo-mistake {
          background: #fff;
          border: 1.5px solid #fca5a5;   /* always thin red border */
          border-radius: 14px;
          overflow: hidden;
          transition: border-color .25s, box-shadow .25s, background .25s;
          cursor: pointer;
        }
        .seo-mistake:hover { border-color: #f87171; box-shadow: 0 4px 14px rgba(249,115,22,.08); }
        .seo-mistake.is-open {
          border-color: #ef4444;
          background: #fff8f8;
          box-shadow: 0 8px 24px rgba(239,68,68,.10);
        }
        .seo-mistake-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
        }
        .seo-mistake-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: #fee2e2;
          color: #ef4444;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 800;
          flex-shrink: 0;
          transition: background .25s, color .25s;
        }
        .seo-mistake.is-open .seo-mistake-num {
          background: #ef4444;
          color: #fff;
        }
        .seo-mistake-title {
          font-size: 14px;
          font-weight: 700;
          color: #0d1117;
          line-height: 1.4;
          flex: 1;
          transition: color .25s;
        }
        .seo-mistake.is-open .seo-mistake-title { color: #dc2626; }
        .seo-mistake-chevron {
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 1.5px solid #fca5a5;
          display: flex; align-items: center; justify-content: center;
          color: #f87171;
          flex-shrink: 0;
          transition: transform .28s, border-color .25s, background .25s, color .25s;
        }
        .seo-mistake-chevron svg { width: 12px; height: 12px; }
        .seo-mistake.is-open .seo-mistake-chevron {
          transform: rotate(180deg);
          border-color: #ef4444;
          background: #ef4444;
          color: #fff;
        }
        .seo-mistake-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .32s ease;
        }
        .seo-mistake.is-open .seo-mistake-body {
          grid-template-rows: 1fr;
        }
        .seo-mistake-body-inner { overflow: hidden; }
        .seo-mistake-desc {
          font-size: 13px;
          color: #7f1d1d;
          line-height: 1.75;
          font-weight: 400;
          padding: 0 22px 20px 64px;
          background: #fff8f8;
        }
        @media (max-width: 560px) {
          .seo-mistake-header { padding: 16px 16px; gap: 10px; }
          .seo-mistake-desc { padding: 0 16px 16px 16px; }
        }

        /* ── Client Story — modern card ── */
        .seo-story {
          background: #fff;
          border-radius: 20px;
          padding: 0;
          border: 1px solid #e4e4e4;
          margin-bottom: 32px;
          overflow: hidden;
          transition: box-shadow .3s;
        }
        .seo-story:hover {
          box-shadow: 0 12px 36px rgba(13,17,23,.08);
        }
        .seo-story-top {
          background: #0f3320;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .seo-story-flag {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: rgba(255,255,255,.12);
          color: rgba(255,255,255,.8);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .seo-story-flag svg { width: 15px; height: 15px; }
        .seo-story-region {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,.65);
          text-transform: uppercase;
          letter-spacing: .1em;
        }
        .seo-story-body { padding: 26px 28px; }
        .seo-story-headline {
          font-size: 18px;
          font-weight: 700;
          color: #0d1117;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .seo-story-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 18px;
        }
        .seo-story-block { }
        .seo-story-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #9ca3af;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .seo-story-text {
          font-size: 13px;
          color: #4a5568;
          line-height: 1.72;
          font-weight: 400;
        }
        .seo-story-proof {
          background: #e8f5e9;
          border-radius: 10px;
          padding: 14px 18px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          animation: storyProofIn .5s ease .1s both;
        }
        @keyframes storyProofIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .seo-story-check { color: #2e7d32; flex-shrink: 0; margin-top: 2px; }
        .seo-story-check svg { width: 13px; height: 13px; }
        .seo-story-proof-text {
          font-size: 12.5px;
          color: #1b5e20;
          line-height: 1.6;
          font-weight: 600;
        }
        @media (max-width: 600px) {
          .seo-story-top { padding: 16px 18px; }
          .seo-story-body { padding: 20px 18px; }
          .seo-story-cols { grid-template-columns: 1fr; gap: 14px; }
        }

        /* ── Entity comparison cards — values as pills ── */
        .seo-entity-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 8px;
        }
        .seo-entity-card {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 16px;
          padding: 26px 24px;
          transition: border-color .2s, box-shadow .2s, transform .25s;
        }
        .seo-entity-card:hover {
          border-color: #b8d8b8;
          box-shadow: 0 8px 24px rgba(0,0,0,.07);
          transform: translateY(-3px);
        }
        .seo-entity-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          background: #0f3320;
          display: inline-block;
          padding: 6px 16px;
          border-radius: 8px;
          margin-bottom: 18px;
          letter-spacing: -0.01em;
        }
        .seo-entity-kv {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12.5px;
          margin-bottom: 10px;
          gap: 10px;
        }
        .seo-entity-k { color: #9ca3af; flex-shrink: 0; }
        /* value rendered as a pill */
        .seo-entity-v {
          display: inline-block;
          background: #f0f7f0;
          color: #0f3320;
          border: 1px solid #c8dfc8;
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 11.5px;
          font-weight: 700;
          text-align: center;
          white-space: nowrap;
        }
        .seo-entity-best {
          font-size: 12px;
          color: #2e7d32;
          font-weight: 600;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid #f0f0f0;
          line-height: 1.5;
        }

        /* ── FDI 2-col cards ── */
        .seo-fdi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .seo-fdi-card {
          border-radius: 14px;
          padding: 24px 22px;
        }
        .seo-fdi-route-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .seo-fdi-title {
          font-size: 15px;
          font-weight: 700;
          color: #0d1117;
          margin-bottom: 14px;
        }
        .seo-fdi-point {
          display: flex;
          gap: 9px;
          margin-bottom: 7px;
          align-items: flex-start;
        }
        .seo-fdi-check { flex-shrink: 0; margin-top: 2px; }
        .seo-fdi-check svg { width: 12px; height: 12px; }
        .seo-fdi-point-text { font-size: 13px; color: #4a5568; line-height: 1.55; }
        .seo-fdi-warning {
          margin-top: 12px;
          background: #fef3c7;
          border-radius: 7px;
          padding: 8px 12px;
          font-size: 12px;
          color: #92400e;
          font-weight: 600;
        }

        /* ── Sector table ── */
        .seo-sector-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .seo-sector-table {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 8px;
          min-width: 560px;
        }
        .seo-sector-header {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          background: #0d1117;
          padding: 12px 20px;
        }
        .seo-sector-header-text {
          font-size: 10.5px;
          font-weight: 700;
          color: rgba(255,255,255,.55);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .seo-sector-row {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          padding: 12px 20px;
          border-top: 1px solid #f0f0f0;
          transition: background .18s;
        }
        .seo-sector-row:hover { background: #f9fafb; }
        .seo-sector-name { font-size: 13px; color: #0d1117; font-weight: 500; }
        .seo-sector-cap { font-size: 13px; font-weight: 700; }
        .seo-sector-route { font-size: 12.5px; color: #6b7280; }

        /* ══════════════════════════════════════
           ADVISORY FLIP CARDS — 3-col grid.
           Click any card to flip it and reveal
           the full description on the back.
        ══════════════════════════════════════ */
        .seo-advisory-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .seo-advisory-flipper {
          perspective: 1100px;
          height: 220px;
          cursor: pointer;
        }
        .seo-advisory-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform .5s cubic-bezier(.4,0,.2,1);
        }
        .seo-advisory-flipper.is-flipped .seo-advisory-inner {
          transform: rotateY(180deg);
        }
        .seo-advisory-front,
        .seo-advisory-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 18px;
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
        }
        .seo-advisory-front {
          background: #f5f5f0;
          border: 1.5px solid #e4e0d8;
          justify-content: space-between;
        }
        .seo-advisory-flipper:hover .seo-advisory-front {
          border-color: #2e7d32;
          background: #f0f7f0;
        }
        .seo-advisory-back {
          background: #0f3320;
          border: 1.5px solid #0f3320;
          transform: rotateY(180deg);
          justify-content: space-between;
        }
        .seo-advisory-num {
          font-size: 26px;
          font-weight: 800;
          color: #d0d9c8;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: auto;
        }
        .seo-advisory-front-title {
          font-size: 15px;
          font-weight: 700;
          color: #0d1117;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .seo-advisory-flip-hint {
          font-size: 10.5px;
          color: #9ca3af;
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .seo-advisory-flip-hint svg { width: 11px; height: 11px; }
        .seo-advisory-back-title {
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,.9);
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .seo-advisory-back-desc {
          font-size: 12px;
          color: rgba(255,255,255,.72);
          line-height: 1.72;
          flex: 1;
        }
        .seo-advisory-back-hint {
          font-size: 10.5px;
          color: rgba(255,255,255,.35);
          margin-top: 12px;
        }
        @media (max-width: 860px) {
          .seo-advisory-grid { grid-template-columns: repeat(2, 1fr); }
          .seo-advisory-flipper { height: 200px; }
        }
        @media (max-width: 560px) {
          .seo-advisory-grid { grid-template-columns: 1fr; }
          .seo-advisory-flipper { height: 180px; }
        }

        /* ── Who is it for list ── */
        .seo-audience-item {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
          padding: 22px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .seo-audience-item:first-child { border-top: 1px solid #f0f0f0; }
        .seo-audience-label { font-size: 14.5px; font-weight: 700; color: #0d1117; line-height: 1.4; }
        .seo-audience-desc { font-size: 13.5px; color: #6b7280; line-height: 1.75; font-weight: 300; }

        /* ── NRI comparison table ── */
        .seo-nri-compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 20px rgba(13,17,23,.05);
        }
        .seo-nri-col {
          padding: 32px 28px;
          background: #fff;
        }
        .seo-nri-col:first-child {
          border-right: 1px solid #e8e8e8;
          background: #f7faf7;
        }
        .seo-nri-col-tag {
          display: inline-block;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #2e7d32;
          background: #e8f5e9;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .seo-nri-col-title {
          font-size: 18px;
          font-weight: 700;
          color: #0d1117;
          line-height: 1.25;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .seo-nri-col-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.7;
          font-weight: 400;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .seo-nri-point {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        .seo-nri-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #e8f5e9;
          color: #2e7d32;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .seo-nri-check svg { width: 10px; height: 10px; }
        .seo-nri-point-text {
          font-size: 13px;
          color: #374151;
          line-height: 1.55;
          font-weight: 400;
        }
        @media (max-width: 680px) {
          .seo-nri-compare { grid-template-columns: 1fr; }
          .seo-nri-col:first-child { border-right: none; border-bottom: 1px solid #e8e8e8; }
        }

        /* ══════════════════════════════════════
           INSTRUMENT CARDS — 2-per-row flip cards.
           Front: name + badge. Back: description +
           FEMA/Tax meta. Click to flip.
        ══════════════════════════════════════ */
        .seo-instrument-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 8px;
        }
        .seo-instrument-flipper {
          perspective: 1200px;
          height: 260px;
          cursor: pointer;
        }
        .seo-instrument-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform .55s cubic-bezier(.4,0,.2,1);
        }
        .seo-instrument-flipper.is-flipped .seo-instrument-inner {
          transform: rotateY(180deg);
        }
        .seo-instrument-front,
        .seo-instrument-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 18px;
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
        }
        .seo-instrument-front {
          background: #fff;
          border: 1.5px solid #e4e4e4;
          justify-content: space-between;
          transition: border-color .25s;
        }
        .seo-instrument-flipper:hover .seo-instrument-front {
          border-color: #b8d4b8;
        }
        .seo-instrument-back {
          background: #0f3320;
          border: 1.5px solid #0f3320;
          transform: rotateY(180deg);
          justify-content: space-between;
        }
        .seo-instrument-badge {
          display: inline-block;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 10.5px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 14px;
          align-self: flex-start;
        }
        .seo-instrument-name {
          font-size: 15px;
          font-weight: 700;
          color: #0d1117;
          line-height: 1.3;
          letter-spacing: -0.01em;
          flex: 1;
        }
        .seo-instrument-flip-hint {
          font-size: 11px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 16px;
        }
        .seo-instrument-flip-hint svg { width: 12px; height: 12px; }
        /* Back side */
        .seo-instrument-back-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,.82);
          line-height: 1.7;
          flex: 1;
        }
        .seo-instrument-back-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 16px;
        }
        .seo-instrument-meta {
          background: rgba(255,255,255,.1);
          border-radius: 10px;
          padding: 10px 12px;
        }
        .seo-instrument-meta-label {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,.5);
          font-weight: 700;
          margin-bottom: 4px;
        }
        .seo-instrument-meta-val {
          font-size: 11.5px;
          color: rgba(255,255,255,.9);
          line-height: 1.4;
        }
        .seo-instrument-back-hint {
          font-size: 11px;
          color: rgba(255,255,255,.4);
          text-align: center;
          margin-top: 12px;
        }
        @media (max-width: 680px) {
          .seo-instrument-grid { grid-template-columns: 1fr; }
          .seo-instrument-flipper { height: 280px; }
        }

        /* ── Angel tax box ── */
        .seo-angel-box {
          background: #fffbf5;
          border: 1px solid #fed7aa;
          border-radius: 14px;
          padding: 22px 24px;
          margin-top: 18px;
        }
        .seo-angel-title { font-size: 13.5px; font-weight: 700; color: #92400e; margin-bottom: 12px; }
        .seo-angel-point {
          display: flex;
          gap: 10px;
          margin-bottom: 8px;
          align-items: flex-start;
        }
        .seo-angel-check { color: #b45309; flex-shrink: 0; margin-top: 2px; }
        .seo-angel-check svg { width: 12px; height: 12px; }
        .seo-angel-text { font-size: 13px; color: #78350f; line-height: 1.65; }

        /* ── CTA Strip ── */
        .seo-cta-strip {
          background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
          border-radius: 20px;
          padding: 44px 48px;
          margin-top: 64px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 36px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .seo-cta-strip::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .seo-cta-title {
          font-size: clamp(20px, 2.5vw, 32px);
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          position: relative;
          z-index: 1;
        }
        .seo-cta-desc {
          font-size: 14px;
          color: rgba(255,255,255,.6);
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }
        .seo-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        .seo-wa-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #25D366;
          color: #fff;
          padding: 13px 22px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: background .2s;
        }
        .seo-wa-btn:hover { background: #1da851; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .seo-hero { padding: 100px 0 64px; }
          .seo-hero-inner { padding: 0 24px; }
          .seo-content-wrap { padding: 60px 24px 80px; }
          .seo-entity-grid { grid-template-columns: 1fr; }
          .seo-fdi-grid { grid-template-columns: 1fr; }

          .seo-audience-item { grid-template-columns: 1fr; gap: 8px; }
          .seo-nri-grid { grid-template-columns: 1fr; }
          .seo-cta-strip { grid-template-columns: 1fr; padding: 32px 28px; }
          .seo-cta-actions { flex-direction: row; flex-wrap: wrap; }
          .seo-instrument-meta-grid { grid-template-columns: 1fr; }
          .seo-whatitis-grid { grid-template-columns: 1fr; gap: 16px; }
        }
        @media (max-width: 600px) {
          .seo-content-wrap { padding: 40px 16px 56px; }
          .seo-cta-actions { flex-direction: column; }
          .seo-section { margin-bottom: 44px; }
          .seo-section-title { font-size: 22px; }
          .seo-iconcard { padding: 22px 18px 20px; }
          .seo-cta-strip { padding: 28px 20px; margin-top: 44px; }
          .seo-story { padding: 20px 16px; }
          .seo-faqcard-btn { padding: 16px 16px; }
          .seo-mistake { padding: 16px 16px; grid-template-columns: 24px 1fr; }
          .hv2-hero { padding: 64px 16px 52px !important; }
          .hv2-title { letter-spacing: -0.025em; }
        }
      `}</style>

      {/* ── HERO (v2) ── */}
      <section className="hv2-hero">
        <div className="hv2-hero-inner">
          {backHref && (
            <Link href={backHref} className="hv2-back">← {backLabel || 'All Services'}</Link>
          )}
          <div className={`hv2-hero-grid${stats ? '' : ' hv2-single'}`}>
            <Fade>
              {eyebrow && <span className="hv2-lbl">{eyebrow}</span>}
              <h1 className="hv2-title">{title}</h1>
              <p className="hv2-desc">{description}</p>
              <div className="hv2-btns">
                <button className="hv2-btn" onClick={() => { window.location.href = ROUTES["contact"] || "/"; }}>
                  {ctaLabel || 'Book Free Consultation →'}
                </button>
                <button className="hv2-btn-ghost" onClick={() => { window.location.href = ROUTES["services"] || "/"; }}>
                  View Entity Types →
                </button>
              </div>
            </Fade>
            {stats && (
              <Fade delay={100}>
                <div className="hv2-card">
                  <div className="hv2-card-head"><span>At a Glance</span></div>
                  {stats.map((row, i, arr) => (
                    <div key={i} className="hv2-card-row" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                      <span className="hv2-card-label">{row.label}</span>
                      <span className="hv2-card-val">{row.text || `${row.prefix || ''}${row.val}${row.suffix || ''}`}</span>
                    </div>
                  ))}
                  {note && (
                    <div className="hv2-card-note"><p>{note}</p></div>
                  )}
                </div>
              </Fade>
            )}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="seo-content-wrap">
        {children}
      </div>
    </div>
  );
}

function SEOSection({ label, title, children }) {
  return (
    <div className="seo-section reveal">
      {label && <div className="seo-section-eyebrow">{label}</div>}
      {title && <h2 className="seo-section-title">{title}</h2>}
      {children}
    </div>
  );
}

function SEOProseP({ children }) {
  return <p className="seo-prose">{children}</p>;
}

/* ══════════════════════════════════════════════════════
   Special-picks reveal list.
   The right detail panel now SLIDES to align with the
   row you clicked — click the last row, the panel moves
   down and sits beside it. Content is always derived
   directly from the clicked index (key forces remount),
   so it can never show stale content. No icons in the
   detail panel, thin black border, Helvetica only.
══════════════════════════════════════════════════════ */
function SEOPicksReveal({ items }) {
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [progKey, setProgKey] = useState(0);   // restarts progress bar animation
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const detailRef = useRef(null);
  const timerRef = useRef(null);

  const n = items.length;
  const safeActive = Math.min(active, n - 1);
  const current = items[safeActive];

  /* ── Auto-advance every 5 s ── */
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % n);
      setProgKey(k => k + 1);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [n]);

  /* ── On manual click: jump + restart timer ── */
  const handleClick = (i) => {
    setActive(i);
    setProgKey(k => k + 1);
    startTimer();
  };

  /* ── Align detail panel vertically with active row (desktop only) ── */
  useEffect(() => {
    const align = () => {
      const row = rowRefs.current[safeActive];
      const list = listRef.current;
      const detail = detailRef.current;
      if (!row || !list || !detail) return;
      if (window.innerWidth <= 860) { setOffset(0); return; }
      // row.offsetTop is relative to .seo-picks-list (its offsetParent)
      const rowTop = row.offsetTop;
      const maxShift = Math.max(0, list.scrollHeight - detail.offsetHeight - 16);
      setOffset(Math.min(rowTop, maxShift));
    };
    // run after paint so dimensions are settled
    const raf = requestAnimationFrame(align);
    window.addEventListener('resize', align);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', align); };
  }, [safeActive, n]);

  return (
    <div className="seo-picks-wrap">
      {/* ── Left: list ── */}
      <div className="seo-picks-list" ref={listRef}>
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            ref={el => { rowRefs.current[i] = el; }}
            className={`seo-pick-row${safeActive === i ? ' is-active' : ''}`}
            onClick={() => handleClick(i)}
            aria-expanded={safeActive === i}
          >
            <div className="seo-pick-main">
              <div className="seo-pick-label">{item.label}</div>
              <div className="seo-pick-title">{item.title}</div>
            </div>
            <span className="seo-pick-arrow">{Ic.arrow}</span>
          </button>
        ))}
      </div>

      {/* ── Right: detail panel, slides to align with active row ── */}
      <div
        className="seo-picks-detail-col"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div className="seo-picks-detail" ref={detailRef}>
          {/* key prop forces full remount on every change → correct content always */}
          <div className="seo-picks-detail-content" key={safeActive}>
            <div className="seo-picks-detail-eyebrow">{current.eyebrow || current.label}</div>
            <h3 className="seo-picks-detail-title">{current.title}</h3>
            <p className="seo-picks-detail-desc">{current.description}</p>
          </div>
          {/* progress bar — restarts whenever progKey changes */}
          <div className="seo-picks-progress">
            <div className="seo-picks-progress-bar" key={progKey} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PYRAMID PROCESS
══════════════════════════════════════════════════════ */
function SEOSteps({ steps }) {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const n = steps.length;
  const shades = [
    'linear-gradient(135deg, #7c3aed, #9333ea)',
    'linear-gradient(135deg, #8b3fe0, #a855f7)',
    'linear-gradient(135deg, #9b52ea, #b968f5)',
    'linear-gradient(135deg, #a862ef, #c67cf7)',
  ];
  const minWidth = 42;
  const maxWidth = 100;

  return (
    <div className="seo-pyramid" ref={wrapRef}>
      {steps.map((s, i) => {
        const width = n > 1 ? minWidth + ((maxWidth - minWidth) * i) / (n - 1) : maxWidth;
        return (
          <div
            key={i}
            className="seo-pyramid-row"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transitionDelay: visible ? `${i * 0.09}s` : '0s',
            }}
          >
            <div
              className="seo-pyramid-bar"
              style={{ '--bar-width': `${width}%`, background: shades[i % shades.length] }}
            >
              <span className="seo-pyramid-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="seo-pyramid-title">{s.title}</span>
            </div>
            <div className="seo-pyramid-desc">
              {s.time && <span className="seo-pyramid-time">{s.time}</span>}
              <p>{s.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Minimal "what it is" layout
══════════════════════════════════════════════════════ */
function SEOWhatItIs({ eyebrow, title, paragraphs }) {
  return (
    <div className="seo-whatitis">
      {eyebrow && <div className="seo-whatitis-eyebrow">{eyebrow}</div>}
      <div className="seo-whatitis-grid">
        <h3 className="seo-whatitis-title">{title}</h3>
        <div className="seo-whatitis-body">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Icon info cards — "Why Choose Us" reference style:
   first card dark green (featured), rest sage green,
   outlined icon badge, bold heading, description, and
   the price/value shown as a highlighted PILL at the
   bottom of the card. Page background stays pure white.
   items: [{ icon, title, value, desc, date }]
══════════════════════════════════════════════════════ */
function SEOInfoCards({ items, singleCol, cols }) {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const gridClass = cols === 2 || singleCol ? 'cols-2' : '';

  return (
    <div className={`seo-iconcards-grid ${gridClass}`} ref={wrapRef}>
      {items.map((it, i) => {
        const isSelected = selected === i;
        const isFeatured = i === 0 && selected === null;
        const active = isSelected || isFeatured;
        return (
          <div
            key={i}
            className={`seo-iconcard${active ? ' is-featured' : ''}`}
            style={{
              animationDelay: visible ? `${i * 0.06}s` : '0s',
              animationPlayState: visible ? 'running' : 'paused',
              cursor: 'pointer',
            }}
            onClick={() => setSelected(isSelected ? null : i)}
          >
            <div className="seo-iconcard-title">{it.title}</div>
            {it.desc && <div className="seo-iconcard-desc">{it.desc}</div>}
            {it.value && <span className="seo-iconcard-pill">{it.value}</span>}
            {!it.value && it.date && <span className="seo-iconcard-date">{it.date}</span>}
          </div>
        );
      })}
    </div>
  );
}

/* Small stat strip */
function SEOStatRow({ stats }) {
  return (
    <div className="seo-stat-row">
      {stats.map((s, i) => (
        <div key={i} className="seo-stat-card">
          <div className="seo-stat-num">{s.num}</div>
          <div className="seo-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INSTRUMENT FLIP CARDS — 2×2 grid.
   Front: short name + badge + full name.
   Back (dark green): description + FEMA + Tax.
   Click to flip; click again to flip back.
══════════════════════════════════════════════════════ */
function SEOInstrumentCards({ items }) {
  const [flipped, setFlipped] = useState(null);
  const toggle = (i) => setFlipped(flipped === i ? null : i);
  const FlipHint = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
      <path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
  return (
    <div className="seo-instrument-grid">
      {items.map((inst, i) => (
        <div
          key={i}
          className={`seo-instrument-flipper${flipped === i ? ' is-flipped' : ''}`}
          onClick={() => toggle(i)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && toggle(i)}
          aria-label={`${inst.name} — click to ${flipped === i ? 'hide' : 'show'} details`}
        >
          <div className="seo-instrument-inner">
            {/* Front */}
            <div className="seo-instrument-front">
              <div>
                <span className="seo-instrument-badge" style={{ background: inst.badgeColor }}>{inst.badge}</span>
                <div className="seo-instrument-name">{inst.fullName}</div>
              </div>
              <div className="seo-instrument-flip-hint">{FlipHint} Click for details</div>
            </div>
            {/* Back */}
            <div className="seo-instrument-back">
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{inst.name}</div>
              <div className="seo-instrument-back-desc">{inst.desc}</div>
              <div className="seo-instrument-back-meta">
                <div className="seo-instrument-meta">
                  <div className="seo-instrument-meta-label">FEMA</div>
                  <div className="seo-instrument-meta-val">{inst.fema}</div>
                </div>
                <div className="seo-instrument-meta">
                  <div className="seo-instrument-meta-label">Tax</div>
                  <div className="seo-instrument-meta-val">{inst.tax}</div>
                </div>
              </div>
              <div className="seo-instrument-back-hint">Click to flip back</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ADVISORY FLIP CARDS — click to flip and see description.
   3-col grid, beige front / dark green back.
══════════════════════════════════════════════════════ */
function SEOAdvisoryCarousel({ items }) {
  const [flipped, setFlipped] = useState(null);
  const FlipIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
  const toggle = (i) => setFlipped(flipped === i ? null : i);
  return (
    <div className="seo-advisory-grid">
      {items.map((item, i) => (
        <div
          key={i}
          className={`seo-advisory-flipper${flipped === i ? ' is-flipped' : ''}`}
          onClick={() => toggle(i)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && toggle(i)}
          aria-label={`${item.title} — click to ${flipped === i ? 'hide' : 'show'} details`}
        >
          <div className="seo-advisory-inner">
            {/* Front */}
            <div className="seo-advisory-front">
              <div className="seo-advisory-num">{String(i + 1).padStart(2, '0')}.</div>
              <div>
                <div className="seo-advisory-front-title">{item.title}</div>
                <div className="seo-advisory-flip-hint">{FlipIcon} Click to learn more</div>
              </div>
            </div>
            {/* Back */}
            <div className="seo-advisory-back">
              <div className="seo-advisory-back-title">{item.title}</div>
              <div className="seo-advisory-back-desc">{item.desc}</div>
              <div className="seo-advisory-back-hint">Click to flip back</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MISTAKES — animated accordion, click to expand
══════════════════════════════════════════════════════ */
function SEOMistakes({ items }) {
  const [open, setOpen] = useState(null);
  const ChevronDown = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
  return (
    <div className="seo-mistakes-list">
      {items.map((m, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`seo-mistake${isOpen ? ' is-open' : ''}`} onClick={() => setOpen(isOpen ? null : i)}>
            <div className="seo-mistake-header">
              <div className="seo-mistake-num">{i + 1}</div>
              <div className="seo-mistake-title">{m.title}</div>
              <div className="seo-mistake-chevron">{ChevronDown}</div>
            </div>
            <div className="seo-mistake-body">
              <div className="seo-mistake-body-inner">
                <p className="seo-mistake-desc">{m.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FAQ cards
══════════════════════════════════════════════════════ */
function SEOFAQs({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="seo-faqcards">
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`seo-faqcard${isOpen ? ' is-open' : ''}`}>
            <button onClick={() => setOpen(isOpen ? null : i)} className="seo-faqcard-btn">
              <span className="seo-faqcard-q">{faq.q}</span>
              <span className="seo-faqcard-icon">{Ic.arrow}</span>
            </button>
            <div className="seo-faqcard-panel">
              <div className="seo-faqcard-panel-inner">
                <p className="seo-faqcard-a">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SEOClientStory({ flag, region, headline, challenge, outcome, proof }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="seo-story" style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'opacity .6s ease, transform .6s ease' }}>
      <div className="seo-story-top">
        <span className="seo-story-flag">{Ic.building}</span>
        <div className="seo-story-region">{region}</div>
      </div>
      <div className="seo-story-body">
        <h3 className="seo-story-headline">{headline}</h3>
        <div className="seo-story-cols">
          <div className="seo-story-block">
            <div className="seo-story-label">The Challenge</div>
            <p className="seo-story-text">{challenge}</p>
          </div>
          <div className="seo-story-block">
            <div className="seo-story-label">What We Delivered</div>
            <p className="seo-story-text">{outcome}</p>
          </div>
        </div>
        <div className="seo-story-proof">
          <span className="seo-story-check">{Ic.check}</span>
          <p className="seo-story-proof-text">{proof}</p>
        </div>
      </div>
    </div>
  );
}

function SEOCTAStrip({ setPage }) {
  return (
    <div className="seo-cta-strip reveal">
      <div>
        <h3 className="seo-cta-title">Ready to get started? Book a free 30-minute consultation.</h3>
        <p className="seo-cta-desc">Expert team reviews your situation and gives you a clear structure recommendation. No commitment. Written summary after the call.</p>
      </div>
      <div className="seo-cta-actions">
        <button className="seo-btn-primary" style={{ background: '#fff', color: '#1b5e20' }}
          onClick={() => { window.location.href = ROUTES["contact"] || "/"; }}>
          Book Free Consultation →
        </button>
        <a href="https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20my%20company%20in%20India."
          target="_blank" rel="noopener noreferrer" className="seo-wa-btn">
          <WASvg /> WhatsApp us
        </a>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════
   FDI RULES PAGE
══════════════════════════════════════════════════════ */
function SEOFDIRulesPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="FDI & FEMA Compliance · India Entry" setPage={setPage}
      ctaLabel="Talk to our CA team →"
      title={<>FDI Rules in India —<br /><em>What Foreign Investors</em><br />Must Know</>}
      description="India's FDI policy governs how foreign companies can invest in India. Here is a plain-English guide to FDI routes, sector caps, prohibited sectors, and FEMA compliance – with what actually matters in practice.">

      <SEOSection label="Overview">
        <SEOWhatItIs
          eyebrow="What it is"
          title="India's FDI framework"
          paragraphs={[
            "Foreign Direct Investment (FDI) in India is regulated under the Foreign Exchange Management Act (FEMA), administered by the Reserve Bank of India (RBI), with sector-specific policy issued by the Department for Promotion of Industry and Internal Trade (DPIIT). India received USD 70.97 billion in FDI in FY 2023-24, making it one of the world's top FDI destinations.",
            "For a foreign company setting up in India, the FDI rules determine: (1) whether investment is permitted in your sector, (2) the maximum percentage of foreign ownership allowed, (3) whether Government approval is required before investing, and (4) what filings must be made with the RBI after investment.",
            "Getting FDI compliance wrong creates serious exposure. Investments made without proper authorisation, incorrect route classification, or missed FEMA filings attract penalties up to three times the transaction value – with RBI having power to compel regularisation.",
          ]}
        />
      </SEOSection>

      <SEOSection label="The Two Routes" title="Automatic Route vs. Government Route – the critical distinction">
        <div className="seo-fdi-grid">
          {[
            {
              route: "Automatic Route", color: "#2e7d32", light: "#f0f7f0", border: "#c8e6c9", title: "No prior approval needed",
              points: ["Investment can proceed immediately", "FCGPR filing required within 30 days of share allotment", "Covers most manufacturing, IT, services, e-commerce", "Most foreign companies use this route"],
              warning: null
            },
            {
              route: "Government Route", color: "#b45309", light: "#fffbf5", border: "#fed7aa", title: "Prior FIPB/Cabinet approval required",
              points: ["Application filed through DPIIT portal", "Timeline: 8–12 weeks for approval", "Required for defence, insurance, broadcasting, telecom, multi-brand retail", "Some sectors have mandatory conditions (e.g., local sourcing)"],
              warning: "Investment before approval is a FEMA violation"
            },
          ].map(r => (
            <div key={r.route} className="seo-fdi-card" style={{ background: r.light, border: `1px solid ${r.border}` }}>
              <div className="seo-fdi-route-label" style={{ color: r.color }}>{r.route}</div>
              <div className="seo-fdi-title">{r.title}</div>
              {r.points.map(p => (
                <div key={p} className="seo-fdi-point">
                  <span className="seo-fdi-check" style={{ color: r.color }}>{Ic.check}</span>
                  <span className="seo-fdi-point-text">{p}</span>
                </div>
              ))}
              {r.warning && <div className="seo-fdi-warning">{r.warning}</div>}
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="Sector Caps" title="Key sector FDI limits at a glance">
        <div className="seo-sector-scroll">
          <div className="seo-sector-table">
            <div className="seo-sector-header">
              {["Sector", "FDI Cap", "Route"].map(h => (
                <div key={h} className="seo-sector-header-text">{h}</div>
              ))}
            </div>
            {[
              ["Manufacturing", "100%", "Automatic"],
              ["IT / Software Services", "100%", "Automatic"],
              ["E-commerce (marketplace)", "100%", "Automatic"],
              ["Construction & real estate", "100%", "Automatic"],
              ["Insurance", "74%", "Automatic up to 49%, Government above"],
              ["Telecom", "100%", "Automatic up to 49%, Government above 49%"],
              ["Defence", "74%", "Automatic up to 74%, Government above"],
              ["Multi-brand retail", "51%", "Government Route"],
              ["Banking (private sector)", "74%", "Automatic up to 49%"],
              ["Print media", "26%", "Government Route"],
              ["Lottery, gambling, casino", "0%", "Prohibited"],
              ["Real estate business (speculation)", "0%", "Prohibited"],
            ].map((row, i) => (
              <div key={row[0]} className="seo-sector-row" style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <span className="seo-sector-name">{row[0]}</span>
                <span className="seo-sector-cap" style={{ color: row[1] === "0%" ? "#dc2626" : "#2e7d32" }}>{row[1]}</span>
                <span className="seo-sector-route">{row[2]}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 12.5, color: '#9ca3af', marginTop: 6 }}>This is a simplified summary. FDI policy changes periodically – always verify current rules before proceeding.</p>
      </SEOSection>

      <SEOSection label="FEMA Compliance" title="Mandatory FEMA filings after FDI">
        <SEOSteps steps={[
          { title: "FC-GPR filing", time: "Within 30 days", desc: "Filed with the RBI through the FIRMS portal after shares are allotted to the foreign investor. Declares the FDI amount, shares allotted, and valuation basis." },
          { title: "Valuation certificate", time: "Before allotment", desc: "Shares issued to foreign investors must be valued by a SEBI-registered merchant banker or a Chartered Accountant using accepted pricing methodology." },
          { title: "Annual FLA Return", time: "By 15 July", desc: "Every Indian company with FDI must file the FLA Return with RBI annually. Covers outstanding FDI, foreign borrowings, and overseas investments." },
          { title: "FC-TRS for transfers", time: "Within 60 days", desc: "If shares are subsequently transferred between a resident and non-resident, FC-TRS must be filed with RBI within 60 days of the transfer." },
          { title: "ODI for outbound investment", time: "As applicable", desc: "If the India subsidiary later invests overseas, Overseas Direct Investment (ODI) forms must be filed with RBI." },
        ]} />
      </SEOSection>

      <SEOSection label="Real Client Example" title="FDI compliance in practice">
        <SEOClientStory region="Europe · Manufacturing Group · Long-established India entity"
          headline="European manufacturer regularised 3 years of missed FLA Returns"
          challenge="The India subsidiary had been filing its tax returns correctly but had missed FLA Returns for three consecutive years – the finance team in Europe was unaware of this RBI requirement."
          outcome="We filed all three years of outstanding FLA Returns, prepared the compounding application for the missed deadlines, and set up an automated compliance calendar to prevent future misses."
          proof="RBI compounding accepted. Zero impact on ongoing operations. FLA now filed on time every year via our retainer." />
      </SEOSection>

      <SEOSection label="Common Mistakes" title="FDI and FEMA mistakes foreign companies make">
        <SEOMistakes items={[
          { title: "Investing before confirming the FDI route", desc: "Sending funds to India and allotting shares before confirming the sector is under Automatic Route (or before Government approval for restricted sectors) is a FEMA violation. The penalty is up to 3x the amount of the violation – which can be the entire investment amount." },
          { title: "Using the wrong valuation methodology", desc: "Shares issued to foreign investors at below fair market value are treated as a deemed FDI violation. The valuation certificate must be from a qualified professional and must precede share allotment." },
          { title: "Missing the FC-GPR 30-day window", desc: "This is the most common FEMA violation we encounter. Many companies complete incorporation correctly but miss the FC-GPR filing deadline because they are unaware of it. A compounding application must then be filed – adding months of delay and regulatory cost." },
          { title: "Not filing FLA Returns annually", desc: "The Annual FLA Return is not filed through MCA – it is filed directly with RBI and is separate from all other annual compliances. Many companies are unaware of it until they receive a notice." },
        ]} />
      </SEOSection>

      <SEOSection label="FAQ" title="FDI and FEMA questions">
        <SEOFAQs items={[
          { q: "Can a foreign company own 100% of an Indian company?", a: "Yes – in most sectors. 100% FDI under the Automatic Route is permitted in manufacturing, IT, most services, and e-commerce (marketplace model). Restricted sectors such as insurance (74% cap), defence (74%), and multi-brand retail (51%) have lower limits." },
          { q: "What is the difference between FEMA and FDI policy?", a: "FDI policy (issued by DPIIT) determines what foreign investment is permitted in which sectors and at what ownership levels. FEMA (administered by RBI) governs how the investment is executed – the forms, timelines, and compliance obligations. Both apply simultaneously and must be complied with." },
          { q: "What is compounding under FEMA?", a: "Compounding is the process by which a FEMA violation is regularised with the RBI. It involves admitting the violation, paying a compounding fee, and obtaining an order regularising the breach. Most missed FC-GPR and FLA filings are resolved through compounding. The fee varies – typically ranging from the interest amount to a fixed penalty depending on the nature and duration of the violation." },
          { q: "Is prior RBI approval needed to open a subsidiary?", a: "For sectors under the Automatic Route, no prior RBI approval is needed. The FCGPR is filed after the investment, not before. For sectors under the Government Route, FIPB/Cabinet Committee approval must be obtained before the investment is made." },
          { q: "How is FDI different from FPI (portfolio investment)?", a: "FDI involves a strategic investment with the intention of long-term business interest – typically 10% or more of equity. FPI is portfolio investment in listed securities. Foreign companies setting up subsidiaries in India are making FDI, regulated under FEMA's FDI regulations." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}


/* ══════════════════════════════════════════════════════
   FOREIGN COMPANY REGISTRATION PAGE
══════════════════════════════════════════════════════ */
function SEOForeignCompanyPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="India Market Entry · Ex-Big 4" setPage={setPage}
      title={<>Foreign Company Registration<br /><em>in India – Complete Guide</em></>}
      description="How to register a foreign company in India – entity types, FDI routes, RBI filings, and compliance timelines. Ex-Big 4 CA team. 100+ foreign companies registered.">

      <SEOSection label="What It Means">
        <SEOWhatItIs
          eyebrow="What it is"
          title="Foreign company registration in India"
          paragraphs={[
            "Registering a foreign company in India is not a single form – it is a multi-step process involving the Ministry of Corporate Affairs (MCA), the Reserve Bank of India (RBI), and in most cases, the GST department and income tax authorities. The process differs significantly depending on the entity type you choose and the FDI route applicable to your sector.",
            "The right structure must be decided before any filing begins. Choosing incorrectly – for example, setting up a branch office in a sector that requires a subsidiary – creates expensive restructuring work later. Getting the transfer pricing model wrong at incorporation means years of audit exposure.",
            "India has four main options for foreign companies entering the market: a Private Limited Company (wholly owned subsidiary), a Limited Liability Partnership, a Branch Office, or a Liaison Office. Each has different tax rates, FDI conditions, revenue permissions, and compliance obligations.",
          ]}
        />
      </SEOSection>

      <SEOSection label="Your Options" title="Four ways a foreign company can be registered in India">
        <div className="seo-entity-grid">
          {[
            { type: "Private Limited Company (WOS)", tax: "25.17%", fdi: "Automatic in most sectors", revenue: "Full commercial", best: "Most foreign companies – full operations, fundraising, hiring" },
            { type: "Limited Liability Partnership", tax: "30%", fdi: "Government approval required", revenue: "Full commercial", best: "Professional services firms, JVs with Indian partners" },
            { type: "Branch Office", tax: "40%", fdi: "RBI approval required", revenue: "Limited – only parent's activities", best: "Exporting goods/services, research only" },
            { type: "Liaison Office", tax: "Nil", fdi: "RBI approval required", revenue: "None – no commercial activity", best: "Market research, promoting parent company only" },
          ].map(e => (
            <div key={e.type} className="seo-entity-card">
              <div className="seo-entity-title">{e.type}</div>
              {[["Tax rate", e.tax], ["FDI route", e.fdi], ["Revenue", e.revenue]].map(([k, v]) => (
                <div key={k} className="seo-entity-kv">
                  <span className="seo-entity-k">{k}</span>
                  <span className="seo-entity-v">{v}</span>
                </div>
              ))}
              <div className="seo-entity-best">Best for: {e.best}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>* Most foreign companies choose a Private Limited Company (WOS). Branch and Liaison offices are rarely the right choice without a specific reason.</p>
      </SEOSection>

      <SEOSection label="The Process" title="Step-by-step: how foreign company registration works in India">
        <SEOSteps steps={[
          { title: "Structure & FDI analysis", time: "Day 1", desc: "We assess your business model, sector, and India objectives to recommend the right entity type and FDI route, including DTAA and PE risk analysis. Free as part of the initial consultation." },
          { title: "Digital Signatures (DSC)", time: "Days 2–3", desc: "All proposed directors require DSCs. For foreign nationals, this requires passport copy, address proof, and notarisation. We handle the filing." },
          { title: "Director ID (DIN)", time: "Days 3–5", desc: "Each director requires a DIN from MCA. For foreign directors, we file Form DIR-3 with apostilled documents." },
          { title: "Name reservation", time: "Days 4–6", desc: "Company name is reserved through MCA's RUN system. We check trademark conflicts and regulatory restrictions before submission." },
          { title: "SPICe+ filing", time: "Days 6–14", desc: "The main incorporation form – includes MOA, AOA, registered office, PAN, TAN, and GSTIN application. Certificate typically issues within 7–12 working days." },
          { title: "RBI FCGPR filing", time: "Within 30 days", desc: "Foreign Currency Gross Provisional Return – mandatory for all foreign investment under FEMA. We file via the RBI's FIRMS portal." },
          { title: "Bank & post-setup", time: "Weeks 3–5", desc: "Current account, GST registration, TDS registration, payroll setup, and a compliance calendar handed over ready to use." },
        ]} />
      </SEOSection>

      <SEOSection label="Real Client Example" title="How it works in practice">
        <SEOClientStory region="USA · SaaS Company · Series B"
          headline="Cloud analytics platform registered in India in 19 days"
          challenge="The company needed an India entity before their first engineering hire arrived in Bangalore. Time pressure was significant – payroll had to be live within the month."
          outcome="Private limited company incorporated, FCGPR filing completed, transfer pricing policy documented, first payroll run – all within 30 days of engagement."
          proof="TP documentation completed in week 2, before a single hire was made. No audit exposure from day one." />
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What foreign companies get wrong">
        <SEOMistakes items={[
          { title: "Choosing the wrong entity type", desc: "Many foreign companies default to a branch office because it sounds simpler. In practice, a branch pays 40% tax, has restricted revenue activities, and requires RBI approval. A Private Limited Company is almost always better." },
          { title: "Not setting up transfer pricing before the first intercompany transaction", desc: "Transfer pricing documentation is legally required from the first payment between the India entity and its foreign parent. Companies that get this wrong at incorporation face back-audits and penalties up to 2x the underpaid tax." },
          { title: "Missing the FCGPR 30-day filing window", desc: "FEMA requires the FCGPR to be filed within 30 days of share allotment. Missing this deadline requires a compounding application – a formal RBI regularisation process that takes months and attracts penalties." },
          { title: "Registering in a sector with FDI restrictions without checking", desc: "Some sectors require Government approval route FDI. Registering under the automatic route in a restricted sector voids the investment and requires a costly restructuring." },
        ]} />
      </SEOSection>

      <SEOSection label="Cost & Timeline" title="What does foreign company registration in India cost?">
        <SEOInfoCards items={[
          { icon: Ic.coins, title: "Government filing fees (MCA + RBI)", value: "₹5,000 – ₹15,000", desc: "Depends on authorised share capital" },
          { icon: Ic.clipboard, title: "Professional fees – incorporation", value: "₹50,000 – ₹1,50,000", desc: "Varies by complexity, foreign director requirements" },
          { icon: Ic.shield, title: "FCGPR + FEMA filing", value: "₹25,000 – ₹50,000", desc: "Included in our engagement" },
          { icon: Ic.chart, title: "Transfer pricing policy", value: "₹40,000 – ₹80,000", desc: "Strongly recommended at incorporation" },
          { icon: Ic.building, title: "Typical total (standard case)", value: "₹1.5 – 3 lakhs", desc: "All-in, including TP documentation" },
          { icon: Ic.route, title: "Timeline to completion", value: "19–30 days", desc: "Government-approval sectors add 6–12 weeks" },
        ]} />
      </SEOSection>

      <SEOSection label="FAQ" title="Frequently asked questions">
        <SEOFAQs items={[
          { q: "Can a foreign company own 100% of an Indian company?", a: "Yes – in most sectors, 100% FDI is permitted under the Automatic Route. This means no prior Government approval is needed. Restricted sectors (defence, insurance, media) have lower caps. We check FDI eligibility as the first step of every engagement." },
          { q: "Does the company need an Indian director?", a: "Yes. At least one director of the Indian company must be a resident of India (present in India for at least 182 days in the previous calendar year). This can be a nominee director – we can help arrange one if needed." },
          { q: "What is the minimum paid-up capital required?", a: "There is no minimum paid-up capital requirement for a Private Limited Company in India. In practice, most foreign companies subscribe between ₹1 lakh and ₹10 lakhs to demonstrate commitment to the Indian subsidiary." },
          { q: "How long does registration take?", a: "For a straightforward Private Limited Company with Indian directors and no restricted sector issues, incorporation typically takes 14–21 working days from document submission. The Certificate of Incorporation from MCA issues in 7–12 working days once the SPICe+ is filed." },
          { q: "What documents does the foreign parent company need to provide?", a: "Certificate of Incorporation of the parent, Memorandum & Articles of Association, Board Resolution authorising India incorporation, KYC documents (passport, address proof) for all proposed directors, and apostilled copies where required by MCA." },
          { q: "Do we need a physical office in India?", a: "Yes – a registered office address in India is mandatory for incorporation. This can be a virtual/registered address initially. Many clients start with a virtual office and upgrade to physical space once the team grows." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}


/* ══════════════════════════════════════════════════════
   GCC SETUP PAGE
══════════════════════════════════════════════════════ */
function SEOGCCSetupPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="GCC & Captive Centres · India Advisory" setPage={setPage}
      title={<>GCC Setup in India —<br /><em>End-to-End Advisory</em></>}
      description="Setting up a Global Capability Centre in India requires more than incorporation. Entity structure, cost-plus pricing, ESOP design, payroll, and ongoing compliance – all from one firm.">

      <SEOSection label="What Is a GCC">
        <SEOWhatItIs
          eyebrow="What it is"
          title="Global Capability Centres in India"
          paragraphs={[
            "A Global Capability Centre (GCC) – also called a captive centre or shared services centre – is an India entity wholly owned by a foreign company that provides services back to the parent. Unlike a branch or liaison office, a GCC is a full private limited company with its own employees, payroll, compliance calendar, and intercompany service agreement with the foreign parent.",
            "India hosts over 1,700 GCCs employing more than 1.7 million professionals. The most common functions: software engineering, data analytics, finance & accounting shared services, and legal/compliance operations. The average GCC takes 6–8 weeks to become fully operational from first engagement.",
            "The commercial model is typically cost-plus: the India GCC invoices the foreign parent for all its costs plus a mark-up (typically 8–15%). This mark-up is the taxable profit in India. Getting the cost-plus model and transfer pricing documentation right at setup is critical – it determines your India tax liability for the life of the entity.",
          ]}
        />
      </SEOSection>

      <SEOSection label="What We Handle" title="Full GCC setup – what's included">
        <SEOInfoCards items={[
          { icon: Ic.building, title: "Entity incorporation", desc: "Private Limited Company – SPICe+ filing, MOA/AOA, registered office, PAN, TAN, GSTIN.", value: "14–21 days" },
          { icon: Ic.coins, title: "Cost-plus pricing model", desc: "Intercompany service agreement, cost allocation methodology, benchmarked mark-up, and annual TP documentation.", value: "TP-safe from day one" },
          { icon: Ic.users, title: "HR & payroll setup", desc: "Payroll structure, PF, ESI, professional tax, TDS on salary – compliant from hire #1.", value: "Hire-ready" },
          { icon: Ic.list, title: "ESOP structuring", desc: "Employee stock option plan design, FEMA compliance for foreign parent ESOPs, tax optimisation for employees.", value: "FEMA compliant" },
          { icon: Ic.refresh, title: "Ongoing compliance retainer", desc: "Monthly GST, TDS, payroll processing. Annual audit, ITR, Form 3CEB, FLA Return.", value: "Fixed fee" },
          { icon: Ic.chart, title: "Transfer pricing documentation", desc: "Annual TP study, benchmarking analysis, Form 3CEB certification. Defensible against scrutiny.", value: "Audit-defensible" },
        ]} />
      </SEOSection>

      <SEOSection label="The Process" title="GCC setup timeline – week by week">
        <SEOSteps steps={[
          { title: "Structure & pricing design", time: "Week 1", desc: "Entity type, FDI route, cost-plus mark-up methodology, DTAA analysis. Intercompany service agreement drafted." },
          { title: "Incorporation", time: "Weeks 1–3", desc: "SPICe+ filing, Certificate of Incorporation, PAN, TAN, GSTIN. Registered office established. Bank account initiation." },
          { title: "FEMA & RBI filing", time: "Week 4", desc: "FC-GPR filed within 30 days of share allotment. Share valuation certificate from CA. Equity allotment confirmed." },
          { title: "HR & payroll infra", time: "Weeks 3–5", desc: "PF registration, ESI, professional tax, TDS on salary. Payroll software setup. Offer letter templates." },
          { title: "ESOP plan", time: "Weeks 4–6", desc: "Board resolution, ESOP trust deed or direct grant, FEMA compliance for foreign parent options." },
          { title: "Operational handover", time: "Week 6+", desc: "Full compliance calendar, monthly reporting pack template, vendor onboarding, accounting software. Retainer goes live." },
        ]} />
      </SEOSection>

      <SEOSection label="Real Client Example" title="GCC setup in practice">
        <SEOClientStory region="Singapore · APAC SaaS · Series C"
          headline="APAC SaaS company scaled to a 40-person GCC in 8 weeks"
          challenge="Company needed to move from 0 to 40 engineers in Pune. Entity, payroll, ESOP trust, cost-plus pricing, and compliance all required simultaneously – with a hard deadline driven by an upcoming fundraising round."
          outcome="Entity incorporated in 19 days. Payroll running by week 6. ESOP trust structure in place. Cost-plus model benchmarked and documented. Compliance retainer active from month 2."
          proof="40-person team fully compliant from hire #1. ESOP plan approved. Zero payroll or FEMA gaps on first audit." />
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What GCC setups get wrong">
        <SEOMistakes items={[
          { title: "Cost-plus mark-up set without benchmarking", desc: "Setting a 10% mark-up without a formal benchmarking study exposes the GCC to transfer pricing adjustment. The mark-up must be comparable to what unrelated parties earn for equivalent services. TNMM benchmarking using CMIE Prowess data is required annually." },
          { title: "ESOP documentation gaps", desc: "Foreign parent ESOPs for Indian employees require FEMA compliance at every stage – grant, vesting, exercise, and remittance. Missing FEMA filings at exercise create compounding liability that can be costly to regularise." },
          { title: "No intercompany service agreement at inception", desc: "The service agreement between the GCC and the foreign parent must be in place before the first invoice is raised. Backdated agreements are a red flag in TP audits. We draft and execute the agreement as part of incorporation." },
          { title: "Under-capitalisation at setup", desc: "GCCs frequently start with minimal share capital and fund operations through interest-free loans or cost-sharing arrangements. These have specific FEMA and TP implications. Capital structure should be planned before incorporation." },
        ]} />
      </SEOSection>

      <SEOSection label="FAQ" title="GCC setup questions">
        <SEOFAQs items={[
          { q: "What is the typical cost-plus mark-up for a GCC in India?", a: "For technology and analytics GCCs, the arm's length mark-up (operating profit / total costs) typically ranges from 8–15% based on benchmarking studies using CMIE Prowess or TP Catalyst databases. The appropriate mark-up depends on the functions performed, assets used, and risks borne by the India entity." },
          { q: "Can a GCC have employees on the payroll of the India entity and also receive secondees from the foreign parent?", a: "Yes. Many GCCs have a mix of direct India hires and secondees from the foreign parent. Secondees have different tax and FEMA treatment – their costs must be handled separately in the intercompany service agreement and TP documentation." },
          { q: "Does a GCC need to be incorporated as a separate entity or can it operate as a branch?", a: "For commercial GCCs providing services to the foreign parent, a Private Limited Company is strongly preferred. A branch pays 40% tax (vs 25.17% for a company), has restricted activities, and requires RBI approval. The added compliance burden of a branch is rarely justified." },
          { q: "What is the FLA Return and does a GCC need to file it?", a: "Yes. The Annual Return on Foreign Liabilities and Assets (FLA) must be filed with the RBI by 15 July each year by every Indian company with FDI. A GCC that has received share capital from its foreign parent must file the FLA. Non-filing attracts compounding charges." },
          { q: "Can a GCC invoice its foreign parent in USD or must it invoice in INR?", a: "A GCC providing services to its foreign parent can invoice in USD or another foreign currency. The foreign exchange received must be converted to INR within the timelines prescribed by FEMA and reported through the authorised dealer bank. GST applies at 0% (export of services) on GCC invoices to the foreign parent." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}


/* ══════════════════════════════════════════════════════
   INDIA MARKET ENTRY PAGE
══════════════════════════════════════════════════════ */
function SEOMarketEntryPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="India Market Entry · Strategic Advisory" setPage={setPage}
      title={<>India Market Entry<br /><em>Advisory Services</em></>}
      description="India market entry is a strategic decision before it is a compliance exercise. We help global companies design the right structure, choose the right route, and avoid the mistakes that create years of audit exposure.">

      <SEOSection label="What Is India Market Entry Advisory">
        <SEOWhatItIs
          eyebrow="What it is"
          title="More than incorporation"
          paragraphs={[
            "India market entry advisory covers everything that happens before the first document is filed. The entity type, FDI route, transfer pricing model, DTAA structure, and intercompany framework must be decided in the right sequence – because getting any one of them wrong creates restructuring work that typically costs 3–5x more than getting it right at inception.",
            "Most CA firms start with incorporation. We start with strategy. A 45-minute conversation about your business model, sector, headcount plans, and intercompany flows determines whether you need a WOS, a branch, a GCC, or a combination. The incorporation follows once the structure is clear.",
            "Our advisory work is led by Ex-Big 4 professionals – the same people who advise large multinationals on India entry. The difference is that we work with mid-market companies at fees that match mid-market reality.",
          ]}
        />
      </SEOSection>

      <SEOSection label="What We Advise On" title="The full scope of India market entry advisory">
        <SEOAdvisoryCarousel items={[
          { title: "Entity structure selection", desc: "WOS, Branch, Liaison, LLP, JV – the right choice depends on your sector, FDI route, tax objective, and long-term India plans. We model all options before recommending one." },
          { title: "FDI route & FEMA compliance", desc: "Automatic vs Government Route, sector eligibility, investment caps, FEMA filing obligations. Getting the route wrong invalidates the entire investment." },
          { title: "DTAA planning & treaty benefits", desc: "Which DTAA applies, what rates apply to your specific payment flows, how to structure intercompany transactions to legitimately minimise WHT." },
          { title: "Transfer pricing framework", desc: "Designing the intercompany pricing model before the first transaction – management fees, royalties, cost allocations. This is the highest-value intervention in the entire entry process." },
          { title: "PE risk assessment", desc: "Permanent Establishment risk analysis – what activities in India create a tax liability for the foreign parent. Particularly critical for companies with Indian sales staff, advisory relationships, or contract-signing authority in India." },
          { title: "Compliance architecture", desc: "What filings are required, at what frequencies, by which deadlines. Building the compliance calendar before the entity is operational so nothing is missed from month one." },
        ]} />
      </SEOSection>

      <SEOSection label="Who This Is For" title="The companies we work with">
        <div>
          {[
            { audience: "Foreign companies entering India for the first time", desc: "You've decided to enter India. You need to know which entity to form, which FDI route applies to you, and what your transfer pricing obligations will be. We give you this picture in the first consultation – before any money is committed." },
            { audience: "Companies already in India with compliance gaps", desc: "Your India entity is operational but the structure was set up without proper advice. Transfer pricing is undocumented, FEMA filings are missed, or the entity type is wrong. We assess, fix, and maintain." },
            { audience: "PE-risk situations", desc: "Your sales or advisory team is operating in India without a formal entity. You have staff making decisions, signing contracts, or managing relationships in India. PE risk is building. We assess the exposure and design a structure that manages it." },
            { audience: "GCC / captive centre buildout", desc: "You're setting up a 10–500 person India team to provide services to your global operations. The pricing model, entity structure, ESOP design, and compliance framework all need to be right from the start." },
          ].map((item, i) => (
            <div key={i} className="seo-audience-item">
              <div className="seo-audience-label">{item.audience}</div>
              <p className="seo-audience-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="Our Approach" title="How we work – structure before filing">
        <SEOSteps steps={[
          { title: "Free strategy call", time: "Day 1", desc: "We ask about your business model, sector, headcount plans, and intercompany flows. You receive a preliminary structure recommendation and key questions to resolve before incorporation." },
          { title: "Written structure memo", time: "After the call", desc: "A short written summary of our recommendations – entity type, FDI route, DTAA considerations, transfer pricing approach, and next steps. Costs nothing." },
          { title: "Detailed advisory engagement", time: "Week 1–2", desc: "If you proceed, we produce a full India entry advisory report – entity comparison, FDI route analysis, TP methodology, DTAA analysis, compliance schedule, and fee proposal." },
          { title: "Implementation", time: "Weeks 2–6", desc: "We handle incorporation, FEMA filings, transfer pricing documentation, GST registration, payroll setup, and everything required to make the entity operational." },
          { title: "Ongoing retainer", time: "Month 2+", desc: "Monthly compliance (GST, TDS, payroll), annual filings (ITR, Form 3CEB, FLA Return), and advisory support for new transactions." },
        ]} />
      </SEOSection>

      <SEOSection label="FAQ" title="India market entry questions">
        <SEOFAQs items={[
          { q: "When should I start the India market entry advisory process?", a: "Ideally 3–6 months before you plan to have your first India employee or generate your first India revenue. The structural decisions take time to document and execute correctly. Starting late forces shortcuts that create compliance exposure." },
          { q: "What does India market entry advisory cost?", a: "The initial 30-minute consultation is free. A full India entry advisory report – structure, FDI route, DTAA analysis, TP framework, compliance calendar – typically costs ₹75,000–₹1,50,000 depending on complexity. Implementation (incorporation + FEMA + TP documentation) is additional and separately quoted." },
          { q: "Can you advise on India entry if we already have an entity that was set up incorrectly?", a: "Yes – this is a significant part of our work. We assess existing structures for FDI compliance, transfer pricing gaps, FEMA violations, and entity type mismatch. Where issues are found, we design and implement a remediation plan including any necessary RBI compounding applications." },
          { q: "Do you only handle the Indian side or can you coordinate with our home country advisors?", a: "We handle the Indian side comprehensively. We regularly coordinate with US CPAs (on Form 5471 and GILTI), UK accountants (on UK TP documentation and CFC rules), and Singapore advisors (on substance requirements and DTAA claims). We provide an India advisory memo that your home country advisor can incorporate into their advice." },
          { q: "What makes your India market entry advisory different from a Big 4 firm?", a: "The depth of analysis is equivalent – our lead advisor spent 8 years doing exactly this work at KPMG. The difference is fees and accessibility. Big 4 India market entry engagements for mid-market companies typically cost ₹5–15 lakhs. Our equivalent engagement costs ₹1–3 lakhs. And every engagement is led by a qualified CA, not staffed to a junior team." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}


/* ══════════════════════════════════════════════════════
   NRI PAGE
══════════════════════════════════════════════════════ */
function SEONRIPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="NRI · India Business Setup · FEMA Advisory" setPage={setPage}
      title={<>NRI Company Registration<br /><em>in India – Complete Guide</em></>}
      description="NRIs can incorporate a company in India or invest in an existing one. Two routes, different compliance. FEMA Schedule 4, repatriation rules, and residency transition – explained plainly.">

      <SEOSection label="Two Types of NRI Clients" title="Which situation applies to you?">
        <div className="seo-nri-compare">
          {[
            {
              tag: "Investing from Abroad",
              type: "NRI investing from abroad",
              desc: "You live and work outside India. You want to invest in or incorporate a company in India – for a business you'll manage remotely or through a local team.",
              points: ["Investment under Schedule 4 of FEMA (NRI route)", "No RBI FCGPR required – different from FDI route", "Can repatriate dividends freely after tax", "Can be director of an India company while residing abroad"],
            },
            {
              tag: "Returning to India",
              type: "NRI returning to India",
              desc: "You are returning to India to start or run a business. Your residency status is changing – from NRI to Resident. This triggers specific FEMA obligations.",
              points: ["Residency transition – NRI → Resident Indian", "Existing foreign assets must be declared under FEMA", "India income now fully taxable from year of return", "Bank accounts: NRE/FCNR → Resident accounts within required timeframe"],
            },
          ].map(c => (
            <div key={c.type} className="seo-nri-col">
              <span className="seo-nri-col-tag">{c.tag}</span>
              <div className="seo-nri-col-title">{c.type}</div>
              <p className="seo-nri-col-desc">{c.desc}</p>
              {c.points.map(p => (
                <div key={p} className="seo-nri-point">
                  <span className="seo-nri-check">{Ic.check}</span>
                  <span className="seo-nri-point-text">{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="NRI Investment Route" title="How NRI investment in India works – Schedule 4 FEMA">
        <SEOProseP>NRI investment in Indian companies is governed by Schedule 4 of the Foreign Exchange Management (Non-Debt Instruments) Rules, 2019 – not the FDI regulations that apply to foreign companies. This is a separate and simpler route: no RBI FCGPR filing, no valuation certificate requirement, and no sectoral cap complications in most cases.</SEOProseP>
        <SEOProseP>An NRI can invest in an Indian Private Limited Company by subscribing to shares at incorporation or purchasing shares from existing shareholders. The investment must be made from an NRE (Non-Resident External) or FCNR (Foreign Currency Non-Resident) account – not from an NRO account (unless specific conditions are met).</SEOProseP>
        <SEOSteps steps={[
          { title: "Confirm NRI status & route", time: "Day 1", desc: "NRI investment follows Schedule 4 FEMA. We confirm your residency status, investment amount, sector eligibility, and source of funds before any filing." },
          { title: "Incorporation or acquisition", time: "Days 2–14", desc: "For a new company: SPICe+ filing with NRI as shareholder. For an existing company: share transfer or fresh allotment, updated share register." },
          { title: "Bank account & remittance", time: "Days 10–20", desc: "Investment must be received from NRE/FCNR account or inward remittance. Bank account opened in company name. Share capital deposited." },
          { title: "Post-investment compliance", time: "Within 30–60 days", desc: "For certain NRI investments, intimation to authorised dealer bank is required. We handle the documentation and ensure correct FEMA schedule recording." },
        ]} />
      </SEOSection>

      <SEOSection label="NRI Returning to India" title="FEMA transition – what changes when you return">
        <SEOInfoCards items={[
          { icon: Ic.building, title: "NRE and FCNR bank accounts", desc: "Must be re-designated as Resident Foreign Currency (RFC) accounts or converted to regular resident savings accounts within a reasonable period (typically within 3 months of becoming a resident)." },
          { icon: Ic.file, title: "Foreign assets declaration", desc: "Existing foreign assets (bank accounts, investments, property) held as an NRI can generally be retained as a resident. However, income from those assets becomes taxable in India from the year of return." },
          { icon: Ic.chart, title: "Overseas investments", desc: "Investments made as an NRI in foreign stocks, mutual funds, or property can be retained. However, fresh overseas investment after becoming a resident requires RBI approval or falls under the LRS." },
          { icon: Ic.scale, title: "Tax residency change", desc: "In the year of return, you may be 'Resident but Not Ordinarily Resident' (RNOR) – a transitional status that provides a 2-year window where foreign income may not be taxable in India." },
        ]} cols={2} />
      </SEOSection>

      <SEOSection label="Real Client Example" title="NRI setup in practice">
        <SEOClientStory region="USA · NRI Entrepreneur · Returning to India"
          headline="US-based NRI incorporated an India company while still residing abroad"
          challenge="NRI based in the US wanted to start a technology business in India, with 60% shareholding from his US savings (NRE account) and 40% held by his India-based co-founder. Needed correct FEMA route, proper share structure, and US FBAR/PFIC implications considered."
          outcome="Private limited company incorporated with NRI holding via Schedule 4 FEMA route. Investment received from NRE account. Share structure set up to be VC-friendly. US CA coordinated for FBAR disclosure."
          proof="Company operational within 3 weeks. Zero FEMA compliance issues. First angel round closed 6 months later with no structural complications." />
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What NRIs get wrong">
        <SEOMistakes items={[
          { title: "Investing through an NRO account instead of NRE/FCNR", desc: "NRI investment in Indian companies must typically come from an NRE (repatriable) account or via inward remittance. Using an NRO account for share subscription requires specific conditions to be met. Getting the source of funds wrong creates a FEMA violation at the point of investment." },
          { title: "Not planning residency transition before returning", desc: "NRIs who return to India without planning the transition often convert NRE accounts too early, lose RNOR tax status benefit, or fail to properly declare foreign assets. The planning should happen 3–6 months before physical return." },
          { title: "Mixing NRI investment route with FDI route documentation", desc: "NRI investment under Schedule 4 does not require RBI FCGPR filing. But many NRIs and their advisors prepare FDI documentation unnecessarily – creating confusion at future funding rounds about the nature of the investment." },
          { title: "Ignoring overseas shareholding in Indian company tax filings", desc: "Indian companies with NRI shareholders must correctly disclose NRI ownership in annual returns. Misclassification of an NRI shareholder as a resident in MCA filings creates compliance gaps." },
        ]} />
      </SEOSection>

      <SEOSection label="FAQ" title="NRI company registration questions">
        <SEOFAQs items={[
          { q: "Can an NRI be a director of an Indian company while living abroad?", a: "Yes. There is no residency requirement for being a director – only one director needs to be an Indian resident. An NRI can be a director of an Indian company while continuing to reside abroad. They will need a DIN (Director Identification Number) from MCA and a DSC." },
          { q: "What is the difference between NRI investment and FDI in an Indian company?", a: "NRI investment in India follows Schedule 4 of FEMA (Non-Debt Instruments) Rules. It is treated differently from FDI by foreign companies – no RBI FCGPR filing is required, different repatriation rules apply, and no valuation certificate is needed for new incorporations. The distinction matters significantly at future fundraising rounds." },
          { q: "Can an NRI repatriate dividends from an Indian company?", a: "Yes. Dividends paid by an Indian company to an NRI shareholder (from NRE account investment) are freely repatriable after payment of applicable withholding tax (typically 20% under domestic law, reduced under DTAA if applicable). Dividends from NRO account investments have repatriation limits." },
          { q: "What happens to my NRE account when I return to India?", a: "When you become a Resident Indian, NRE accounts must be re-designated as RFC (Resident Foreign Currency) accounts or converted to regular resident savings accounts. The funds in the NRE account at the time of conversion can be retained freely – there is no requirement to repatriate them." },
          { q: "If I return to India, will my US/UK income be taxed in India?", a: "In the year of return and potentially the following year, you may qualify as 'Resident but Not Ordinarily Resident' (RNOR). Under RNOR status, foreign income that is not derived from a business controlled in India is generally not taxable in India. Proper planning before return can optimise this significantly." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}


/* ══════════════════════════════════════════════════════
   PRIVATE LIMITED COMPANY PAGE
══════════════════════════════════════════════════════ */
function SEOPvtLtdPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="Company Formation · India · CA-Led" setPage={setPage}
      title={<>Private Limited Company<br /><em>Registration in India</em></>}
      description="Register a Private Limited Company in India – SPICe+ filing, MOA/AOA, PAN, TAN, GST, and post-incorporation compliance. CA-led. FDI-ready from day one. 7–12 working days.">

      <SEOSection label="What It Is">
        <SEOWhatItIs
          eyebrow="What it is"
          title="India's most versatile business structure"
          paragraphs={[
            "A Private Limited Company is the most widely used business structure in India. Governed by the Companies Act, 2013 and regulated by the Ministry of Corporate Affairs (MCA), it provides limited liability, separate legal identity, and the ability to raise funding – making it the default choice for startups, growing businesses, and foreign-owned Indian entities alike.",
            "A Pvt Ltd can have 2 to 200 shareholders. At least one director must be an Indian resident. There is no minimum paid-up capital requirement. It can accept FDI under the Automatic Route in most sectors, issue ESOPs, and raise angel or VC funding.",
            "Our difference from low-cost incorporation platforms: we are a CA firm. We advise on the right MOA objects clause, share capital structure, director appointments, and post-incorporation compliance calendar before the Certificate of Incorporation is issued.",
          ]}
        />
      </SEOSection>

      <SEOSection label="Key Advantages" title="Why a Private Limited Company is the right choice">
        <SEOPicksReveal items={[
          { label: "Liability", title: "Limited liability", description: "Shareholders are liable only for the unpaid amount on their shares. Personal assets are protected from company debts." },
          { label: "Capital", title: "FDI and fundraising ready", description: "Accepts foreign investment under Automatic Route in most sectors. Can issue equity to angel investors and VCs without restriction." },
          { label: "Talent", title: "ESOP capability", description: "Can issue Employee Stock Options to build and retain a team. ESOPs require a board resolution – we set this up at incorporation if needed." },
          { label: "Continuity", title: "Perpetual succession", description: "The company continues to exist regardless of changes in shareholders or directors. Not dependent on any individual." },
          { label: "Trust", title: "Credibility with banks and vendors", description: "Corporate customers, banks, and government agencies prefer dealing with a Pvt Ltd over a proprietorship or partnership." },
          { label: "Tax", title: "Tax efficiency", description: "Corporate tax rate of 25.17% (22% base + surcharge + cess) for domestic companies. Lower than partnership tax in many cases." },
        ]} />
      </SEOSection>

      <SEOSection label="The Process" title="How Private Limited Company registration works">
        <SEOSteps steps={[
          { title: "Name reservation", time: "Days 1–2", desc: "We check trademark conflicts, MCA name availability, and regulatory restrictions. Name reserved through RUN. We advise on the MOA objects clause." },
          { title: "Digital Signatures (DSC)", time: "Days 2–3", desc: "All proposed directors require DSCs. For Indian nationals, this takes 1–2 working days. For foreign nationals, apostilled documents are required." },
          { title: "Director ID (DIN)", time: "Days 3–4", desc: "Each director requires a DIN from MCA. For new directors with no existing DIN, we apply through SPICe+ simultaneously." },
          { title: "SPICe+ filing", time: "Days 4–12", desc: "The main incorporation form – MOA, AOA, registered office address, PAN, TAN, and GSTIN applied simultaneously. Certificate issued in 7–12 working days." },
          { title: "Bank & post-incorporation", time: "Days 12–20", desc: "Current account opened. Share capital deposited. GST registration completed. Auditor appointed. Compliance calendar handed over." },
        ]} />
      </SEOSection>

      <SEOSection label="What We Handle" title="Complete incorporation – not just MCA filing">
        <SEOInfoCards items={[
          { icon: Ic.clipboard, title: "MOA & AOA drafting", desc: "Objects clause, shareholding structure, governance rules", value: "Included" },
          { icon: Ic.lock, title: "DSC for all directors", desc: "Indian and foreign nationals – we handle apostille coordination", value: "Included" },
          { icon: Ic.file, title: "SPICe+ filing", desc: "MCA incorporation form – PAN, TAN, GSTIN in one shot", value: "Included" },
          { icon: Ic.coins, title: "Share capital structure", desc: "Authorised vs paid-up, share certificate preparation", value: "Included" },
          { icon: Ic.building, title: "GST registration", desc: "Within 30 days of incorporation if applicable", value: "Included" },
          { icon: Ic.shield, title: "Auditor appointment", desc: "Form ADT-1 within 30 days – statutory requirement", value: "Included" },
          { icon: Ic.route, title: "Bank account setup", desc: "Current account documentation, signatories, internet banking", value: "Included" },
          { icon: Ic.refresh, title: "Compliance calendar", desc: "Every filing deadline for the first 12 months, handed over at close", value: "Included" },
        ]} />
      </SEOSection>

      <SEOSection label="Cost & Timeline" title="What Private Limited Company registration costs">
        <SEOInfoCards items={[
          { icon: Ic.coins, title: "Government fees (MCA + stamp duty)", value: "₹2,000 – ₹15,000", desc: "Based on authorised share capital and state" },
          { icon: Ic.clipboard, title: "Professional fees – incorporation", value: "₹15,000 – ₹40,000", desc: "Name approval, DSC, SPICe+, MOA/AOA, bank account" },
          { icon: Ic.building, title: "GST registration", value: "₹3,000 – ₹6,000", desc: "If applicable – included in our standard package" },
          { icon: Ic.shield, title: "Auditor appointment", value: "₹3,000 – ₹5,000", desc: "ADT-1 filing – mandatory within 30 days" },
          { icon: Ic.chart, title: "Total all-in (standard case)", value: "₹25,000 – ₹60,000", desc: "Domestic founders, two directors, standard sector" },
          { icon: Ic.route, title: "Timeline to completion", value: "7–12 days", desc: "Foreign shareholders or restricted sectors take longer" },
        ]} />
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What founders get wrong at incorporation">
        <SEOMistakes items={[
          { title: "Wrong objects clause in MOA", desc: "The MOA objects clause determines what your company can legally do. Founders often choose a generic clause and then find it doesn't cover their actual business activity – requiring a costly MGT-14 amendment. We advise on the objects clause before filing." },
          { title: "Under-capitalising at setup", desc: "Authorised share capital affects stamp duty – many founders minimise it to save ₹2,000 in stamp duty, then face problems when raising the first investor round because the authorised capital is too low to issue shares." },
          { title: "Not setting up the compliance calendar", desc: "Within 30 days of incorporation: auditor appointment (ADT-1), bank account opened. Within 60 days: registered office confirmation (INC-22A). Miss these and your company goes non-compliant before it has done a single transaction." },
          { title: "Ignoring FDI-readiness even for domestic companies", desc: "If there's any chance of a foreign investor or co-founder joining later, the initial structure should be FDI-ready – right sector classification, clear shareholding pattern, no issue that would create complications under FEMA at a later stage." },
        ]} />
      </SEOSection>

      <SEOSection label="FAQ" title="Private Limited Company registration – common questions">
        <SEOFAQs items={[
          { q: "What is the minimum number of directors and shareholders required?", a: "A minimum of 2 directors and 2 shareholders are required. The same person can be both a director and a shareholder. At least one director must be a resident of India (present in India for at least 182 days in the previous calendar year)." },
          { q: "Is there a minimum paid-up capital requirement?", a: "No. A Private Limited Company can be incorporated with any amount of paid-up capital – even ₹10,000. Authorised share capital of ₹1 lakh divided into 10,000 shares of ₹10 each is the standard starting point. Paid-up capital is the amount actually invested by shareholders." },
          { q: "Can a foreign national be a director or shareholder?", a: "Yes. Foreign nationals can be directors and shareholders. At least one director must be an Indian resident. Foreign shareholders investing in the company must comply with FEMA's FDI regulations – share allotment triggers an RBI FCGPR filing requirement." },
          { q: "How long does registration take?", a: "7–12 working days from the date of document submission with MCA. Name approval takes 2–3 working days. DSC procurement for foreign nationals can add 5–7 days if apostille is required." },
          { q: "What is the difference between authorised and paid-up capital?", a: "Authorised capital is the maximum shares the company can issue, as declared in the MOA. Paid-up capital is the amount actually received from shareholders for shares already issued. You can always issue shares up to the authorised limit without amending the MOA." },
          { q: "Do I need a physical office address at the time of incorporation?", a: "Yes – a registered office address is mandatory. It can be a residential address with a No-Objection Certificate from the property owner. Many founders use a virtual office or co-working address initially and upgrade to a commercial space later." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}


/* ══════════════════════════════════════════════════════
   STARTUP FDI PAGE
══════════════════════════════════════════════════════ */
function SEOStartupFDIPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="Indian Startups · Foreign Funding · FEMA Advisory" setPage={setPage}
      title={<>Indian Startup Receiving<br /><em>Foreign Investment</em></>}
      description="FEMA compliance, angel tax, valuation, convertible instruments – everything an Indian startup needs to handle when receiving its first foreign investment. CA advisory from term sheet to allotment.">

      <SEOSection label="What This Covers">
        <SEOWhatItIs
          eyebrow="What it is"
          title="Foreign investment in Indian startups"
          paragraphs={[
            "When an Indian startup receives investment from a foreign investor – angel, VC, strategic – it triggers FEMA compliance obligations that most founders are unprepared for. The investment is foreign direct investment (FDI) regardless of the amount, and must be structured, valued, and reported correctly.",
            "The instruments used in startup funding have added complexity. SAFEs, Compulsorily Convertible Debentures (CCDs), Compulsorily Convertible Preference Shares (CCPS), and Optionally Convertible instruments each have different FEMA treatments, different RBI reporting requirements, and different implications for angel tax and future fundraising.",
            "Getting the first foreign round right matters disproportionately – because downstream rounds build on the structure established at the first. Mistakes at the seed or pre-Series A stage create expensive cleanup work at Series A or beyond, often discovered during investor due diligence at the worst possible time.",
          ]}
        />
      </SEOSection>

      <SEOSection label="Instruments Explained" title="Which instrument should your startup use?">
        <SEOInstrumentCards items={[
          { name: "CCPS", fullName: "Compulsorily Convertible Preference Shares", badge: "Most Common", badgeColor: "#2e7d32", desc: "The standard instrument for foreign VC investment in Indian startups. Preference shares that mandatorily convert to equity at a future date. FEMA compliant – treated as FDI from day one. Allows for liquidation preference, anti-dilution, and investor rights.", fema: "FCGPR required within 30 days of allotment", tax: "Angel tax applicable if price exceeds fair market value" },
          { name: "CCD", fullName: "Compulsorily Convertible Debentures", badge: "Bridge Rounds", badgeColor: "#4a6fa5", desc: "Debt instrument that mandatorily converts to equity. Treated as FDI under FEMA. Useful for bridge financing where immediate equity dilution is to be avoided.", fema: "FCGPR on conversion. ECB compliance during debenture period", tax: "Interest income taxable; WHT applicable on interest paid abroad" },
          { name: "SAFE", fullName: "Simple Agreement for Future Equity", badge: "Complex FEMA", badgeColor: "#c17d2a", desc: "Popular in US ecosystem but has uncertain FEMA status in India. RBI has not issued clear guidance. Most advisors recommend converting SAFEs to CCPS before any FEMA reporting obligation arises.", fema: "Uncertain – typically treat as debt (ECB) until conversion", tax: "Angel tax risk on conversion – valuation must be documented" },
          { name: "Equity", fullName: "Equity Shares (Straight)", badge: "Simplest", badgeColor: "#5c7a4a", desc: "Direct issue of equity shares to foreign investor. Simplest FEMA treatment. FCGPR required within 30 days. Valuation by CA required. No future conversion complexity.", fema: "FCGPR within 30 days of allotment. Valuation certificate required", tax: "Angel tax applicable on issue above fair market value" },
        ]} />
      </SEOSection>

      <SEOSection label="Angel Tax" title="Angel tax – what startups must know in 2025–26">
        <SEOProseP>Angel tax (Section 56(2)(viib) of the Income Tax Act) applies when a private company issues shares to a resident investor at a price exceeding the fair market value (FMV) of those shares. The excess is treated as income of the company and taxed at 30%+. A 2023 amendment extended angel tax to foreign investors – creating compliance obligations for Indian startups raising from foreign angels.</SEOProseP>
        <SEOProseP>The Finance Act 2024 has provided significant relief – angel tax does not apply to investments from DPIIT-recognised startups, and certain foreign investor categories (SEBI-registered VCs, Category I/II AIFs, and certain specified entities) are exempt. For founders not covered by an exemption, valuation documentation is critical.</SEOProseP>
        <div className="seo-angel-box">
          <div className="seo-angel-title">How to manage angel tax risk</div>
          {[
            "Get DPIIT startup recognition – this is the most complete exemption",
            "Obtain a Rule 11UA valuation (DCF method) before share allotment – if shares are issued at or below FMV, no angel tax",
            "Foreign investors who are VCs, AIFs, or from CBDT-notified countries are exempt",
            "Issue CCPS rather than equity where possible – preference shares have different FMV calculation methods",
            "Document the valuation methodology contemporaneously – don't reconstruct it later",
          ].map((p, i) => (
            <div key={i} className="seo-angel-point">
              <span className="seo-angel-check">{Ic.check}</span>
              <span className="seo-angel-text">{p}</span>
            </div>
          ))}
        </div>
      </SEOSection>

      <SEOSection label="The Process" title="From term sheet to share allotment – step by step">
        <SEOSteps steps={[
          { title: "Term sheet review", time: "Before signing", desc: "We review the term sheet for FEMA compliance, instrument selection, valuation methodology, and angel tax exposure — while structural changes are still easy." },
          { title: "DPIIT recognition", time: "2–4 weeks", desc: "DPIIT startup recognition provides complete angel tax exemption and simplifies future regulatory filings. We advise on eligibility and help with the application." },
          { title: "Valuation (Rule 11UA)", time: "Before allotment", desc: "A registered CA must certify the FMV of shares using DCF methodology before shares are allotted to foreign investors. Must be contemporaneous." },
          { title: "Board resolutions", time: "Before allotment", desc: "Board resolution approving allotment, shareholder resolution if required, updated register of members. We draft all governance documents." },
          { title: "Share allotment", time: "Day of close", desc: "Shares allotted, share certificates issued. The clock starts for FCGPR filing – 30 days from allotment date." },
          { title: "RBI FCGPR filing", time: "Within 30 days", desc: "Filed through the RBI FIRMS portal. Includes valuation certificate, board resolution, and investment details. We file on your behalf." },
          { title: "Annual return filing", time: "Annually", desc: "Annual FLA Return filed with RBI by 15 July. ITR filed with correct disclosure of foreign shareholding. Form 3CEB if applicable." },
        ]} />
      </SEOSection>

      <SEOSection label="Real Client Example" title="Startup foreign funding in practice">
        <SEOClientStory region="India · B2B SaaS Startup · Seed Round"
          headline="Indian SaaS startup structured a $500K seed round from US angels – FEMA compliant, angel tax nil"
          challenge="Two US-based angels wanted to invest $500K combined via SAFEs (standard YC structure). The founders were unaware that SAFEs have uncertain FEMA treatment in India and could not be reported as FDI. Angel tax was also a concern since the startup was not DPIIT-registered."
          outcome="SAFEs restructured to CCPS with equivalent economic terms. DPIIT startup recognition obtained in 3 weeks. Rule 11UA valuation completed. FCGPR filed within 30 days of allotment. All documentation in order for Series A due diligence."
          proof="Series A investor due diligence found zero FEMA or angel tax issues. Clean cap table from day one of foreign investment." />
      </SEOSection>

      <SEOSection label="FAQ" title="Foreign investment in startups – questions">
        <SEOFAQs items={[
          { q: "Does my startup need to be DPIIT registered to receive foreign investment?", a: "No – DPIIT registration is not required to receive foreign investment. However, DPIIT recognition provides complete exemption from angel tax under Section 56(2)(viib), which is a significant benefit. For startups raising from foreign angels or investors not covered by the angel tax exemption, DPIIT recognition is strongly recommended." },
          { q: "Can Indian startups use the US-standard SAFE agreement for foreign investment?", a: "SAFEs have uncertain FEMA treatment in India. A SAFE is neither debt nor equity, and RBI's framework does not clearly accommodate it. Most India-experienced counsel recommend using CCPS with equivalent economic terms instead of a SAFE. We convert YC SAFEs and similar instruments to CCPS-equivalent structures regularly." },
          { q: "What is the FC-GPR and when must it be filed?", a: "Form Foreign Currency – Gross Provisional Return (FC-GPR) is the mandatory RBI filing for foreign investment in Indian companies. It must be filed through the RBI FIRMS portal within 30 days of share allotment. Missing this deadline requires a compounding application with the RBI. We file FC-GPR as part of every foreign investment transaction." },
          { q: "How is the valuation determined for angel tax purposes?", a: "For angel tax under Section 56(2)(viib), shares must be issued at or below fair market value as determined under Rule 11UA of the Income Tax Rules. For unlisted companies, FMV is typically calculated using the Discounted Cash Flow (DCF) method or Net Asset Value method. A Chartered Accountant must certify this valuation contemporaneously – before share allotment." },
          { q: "Can a foreign investor hold preference shares in an Indian startup?", a: "Yes. CCPS is the most common instrument for foreign VC investment in Indian startups. They are treated as FDI from the date of allotment. FCGPR must be filed within 30 days. On conversion to equity, no separate FCGPR is required but the conversion must be recorded in the annual FLA Return." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}


/* ══════════════════════════════════════════════════════
   SUBSIDIARY PAGE
══════════════════════════════════════════════════════ */
function SEOSubsidiaryPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="Entity Structure · India Entry" setPage={setPage}
      title={<>Setting Up a Subsidiary<br /><em>Company in India</em></>}
      description="A wholly owned subsidiary (WOS) is the most common structure for foreign companies entering India. Here is exactly how to set one up correctly – legal structure, FDI route, RBI compliance, and transfer pricing.">

      <SEOSection label="What Is a Subsidiary">
        <SEOWhatItIs
          eyebrow="What it is"
          title="Subsidiary vs. branch vs. liaison office"
          paragraphs={[
            "A subsidiary company in India is a separate Indian legal entity – typically a Private Limited Company – where the foreign parent holds 100% (or majority) of the shares. It is the most common structure for foreign companies entering India for full commercial operations.",
            "Unlike a branch office, a subsidiary is a distinct legal person. It can enter contracts, hire employees, open bank accounts, raise funding, and hold assets in its own name. The parent's liability is limited to its investment in the subsidiary.",
            "A wholly owned subsidiary (WOS) is a subsidiary where the foreign parent holds 100% of shares – the standard for most foreign companies entering India.",
          ]}
        />
      </SEOSection>

      <SEOSection label="Why a Subsidiary" title="Why most foreign companies choose a subsidiary over other structures">
        <SEOPicksReveal items={[
          { label: "Operations", title: "Full commercial operations", description: "Can earn revenue, sign contracts, hire employees across all functions." },
          { label: "Tax", title: "Lower tax rate", description: "25.17% corporate tax vs 40% for a branch office. Significant savings at scale." },
          { label: "FDI", title: "Automatic FDI route", description: "In most sectors – no prior Government approval needed to incorporate." },
          { label: "Liability", title: "Limited liability", description: "Parent is not liable for the subsidiary's debts beyond its share subscription." },
          { label: "Funding", title: "Fundraising capability", description: "Can issue equity to investors, employees (ESOPs), and strategic partners." },
          { label: "Repatriation", title: "Repatriation of profits", description: "Dividends can be repatriated to the parent subject to withholding tax and DTAA." },
        ]} />
      </SEOSection>

      <SEOSection label="The Process" title="How to set up a wholly owned subsidiary in India">
        <SEOSteps steps={[
          { title: "FDI eligibility check", time: "Day 1", desc: "Confirm your sector permits 100% FDI under the Automatic Route. Restricted sectors require Government approval and have investment caps." },
          { title: "Share capital & structure", time: "Days 1–2", desc: "Determine authorised and paid-up share capital. For most subsidiaries, ₹1–10 lakh is sufficient to start." },
          { title: "Resident director", time: "Days 1–5", desc: "At least one director must be an Indian resident. This can be a nominee director if your team is entirely overseas." },
          { title: "Documents & DSC", time: "Days 3–7", desc: "Draft MOA and AOA, obtain Digital Signature Certificates for all directors, prepare apostilled parent company documents." },
          { title: "SPICe+ filing", time: "Days 7–19", desc: "The consolidated MCA filing – covers company name, directors, registered office, PAN, TAN, and GSTIN. Certificate typically issues within 7–12 working days." },
          { title: "FEMA & RBI compliance", time: "Within 30 days", desc: "File FC-GPR with RBI through the FIRMS portal. Mandatory for all foreign investment. Missing this window requires a compounding application." },
          { title: "Post-incorporation setup", time: "Weeks 4–6", desc: "Bank account, GST registration, TDS registration, payroll setup, compliance calendar. Full operational readiness." },
        ]} />
      </SEOSection>

      <SEOSection label="Real Client Example" title="Subsidiary setup in practice">
        <SEOClientStory region="UK · Fintech Company · FCA Regulated"
          headline="London fintech set up a regulated India subsidiary in 24 days"
          challenge="FCA-regulated company needed India presence with zero risk of PE exposure or RBI non-compliance flagging their UK auditors. Any misstep would trigger a reporting obligation to the FCA."
          outcome="Wholly owned subsidiary incorporated, RBI FCGPR filed within 30 days, GST registration complete, compliance calendar aligned to their UK reporting cycle."
          proof="Zero RBI or FEMA notices in 2 years of operation. Clean records for the FCA-regulated parent." />
      </SEOSection>

      <SEOSection label="Common Mistakes" title="What goes wrong with subsidiary setups">
        <SEOMistakes items={[
          { title: "No transfer pricing policy at incorporation", desc: "Every intercompany transaction between the subsidiary and parent – management fees, royalties, service charges – requires transfer pricing documentation under Indian law. Most companies set this up a year later, after transactions have already occurred, creating back-audit exposure." },
          { title: "Wrong FDI route for the sector", desc: "Some sectors look unrestricted but have hidden caps or approval requirements. Fintech, pharma, e-commerce, and multi-brand retail all have sector-specific conditions. We check this before any filing." },
          { title: "Missing nominee director requirement", desc: "Forgetting the Indian resident director requirement stalls incorporation. Many foreign companies discover this late and have to find a nominee urgently, delaying the entire process." },
          { title: "Treating subsidiary and parent as the same entity", desc: "A subsidiary is a separate Indian company. It needs its own bank account, its own contracts, its own compliance filings. Sharing infrastructure with the parent without proper intercompany agreements creates PE risk." },
        ]} />
      </SEOSection>

      <SEOSection label="Cost & Timeline" title="Cost of setting up a subsidiary in India">
        <SEOInfoCards items={[
          { icon: Ic.coins, title: "MCA incorporation fees", value: "₹2,000 – ₹10,000", desc: "Based on authorised capital" },
          { icon: Ic.clipboard, title: "Professional fees – incorporation", value: "₹50,000 – ₹1,20,000", desc: "Including MOA/AOA drafting, DSC, DIN, SPICe+" },
          { icon: Ic.shield, title: "FEMA/FCGPR filing", value: "₹25,000 – ₹40,000", desc: "Included in our standard engagement" },
          { icon: Ic.chart, title: "Transfer pricing policy", value: "₹40,000 – ₹75,000", desc: "Highly recommended at incorporation stage" },
          { icon: Ic.users, title: "Nominee director (first year)", value: "₹20,000 – ₹40,000", desc: "If required" },
          { icon: Ic.building, title: "Total all-in (standard case)", value: "₹1.5 – 2.5 lakhs", desc: "Typical end-to-end including TP, 19–25 days" },
        ]} />
      </SEOSection>

      <SEOSection label="FAQ" title="Frequently asked questions about subsidiary setup">
        <SEOFAQs items={[
          { q: "What is the difference between a subsidiary and a wholly owned subsidiary?", a: "A subsidiary is any company where the foreign parent holds more than 50% of shares. A wholly owned subsidiary (WOS) is where the foreign parent holds 100%. In India, most foreign companies set up a WOS to retain full control and simplify governance." },
          { q: "Can the subsidiary hire employees immediately after incorporation?", a: "Yes – once incorporation is complete and a bank account is opened, the subsidiary can hire employees and run payroll. GST registration and TDS registration should be in place before the first payment cycle." },
          { q: "What is an FCGPR and when does it need to be filed?", a: "FC-GPR (Foreign Currency Gross Provisional Return) is the mandatory RBI filing for foreign investment. It must be filed within 30 days of share allotment. Missing this deadline requires a compounding application with the RBI – a formal regularisation process with penalties." },
          { q: "Can the subsidiary pay dividends to the foreign parent?", a: "Yes. After paying corporate tax and complying with Companies Act distribution requirements, a subsidiary can declare dividends to the foreign parent. Dividends are subject to withholding tax – typically 20% under Indian domestic law, reduced under applicable DTAA." },
          { q: "Does the subsidiary need to file transfer pricing documentation?", a: "Yes, if there are any international transactions with the foreign parent or other related parties. Transfer pricing documentation (Form 3CEB and TP study) is required for every financial year in which such transactions occur. We recommend setting this up at incorporation." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}


/* ══════════════════════════════════════════════════════
   TRANSFER PRICING PAGE
══════════════════════════════════════════════════════ */
function SEOTransferPricingPage({ setPage }) {
  return (
    <SEOPageLayout eyebrow="International Tax · Transfer Pricing" setPage={setPage}
      title={<>Transfer Pricing in India —<br /><em>A Practical Guide</em></>}
      description="Transfer pricing rules apply to every intercompany transaction between your India entity and its foreign parent. Here is what is required, what gets audited, and how to stay compliant.">

      <SEOSection label="What Is Transfer Pricing">
        <SEOWhatItIs
          eyebrow="What it is"
          title="Transfer pricing in India"
          paragraphs={[
            "Transfer pricing is the set of rules governing how prices are set for transactions between related companies – for example, between your India subsidiary and its foreign parent. The Indian Income Tax Act (Section 92–92F) requires that all such transactions be priced at arm's length – i.e., at the same price two unrelated parties would agree on.",
            "Regulated transactions include: management fees, royalties, software licence fees, IT services, technical services, loans, guarantees, and any sale or purchase of goods or intellectual property between related parties.",
            "For foreign companies with India subsidiaries, transfer pricing is not optional. Every year, if your India entity has international transactions with related parties exceeding ₹1 crore, a formal transfer pricing study and Form 3CEB (a certificate from a Chartered Accountant) must be filed with the income tax return.",
          ]}
        />
      </SEOSection>

      <SEOSection label="Compliance Requirements" title="What transfer pricing compliance looks like in practice">
        <SEOSteps steps={[
          { title: "Identify transactions", time: "Before year-end", desc: "Document every payment flowing between the India entity and related parties – management charges, royalties, IT services, cost recharges, loans." },
          { title: "Select methodology", time: "At setup", desc: "India recognises five OECD-accepted methods: CUP, RPM, CPM, TNMM, and PSM. For GCCs and service entities, TNMM is most common." },
          { title: "Benchmark analysis", time: "Annually", desc: "A comparability analysis using CMIE ProwessIQ or TP Catalyst databases – comparing your entity's margins against industry benchmarks." },
          { title: "TP study documentation", time: "Before filing ITR", desc: "A formal TP study documenting the entity profile, transaction analysis, methodology, benchmark, and arm's length conclusion. Maintained for 8 years." },
          { title: "Form 3CEB certification", time: "By 31 October", desc: "A report certified by a Chartered Accountant confirming the TP study and declaring that transactions are at arm's length." },
          { title: "ITR filing with disclosure", time: "By 31 October", desc: "The income tax return for a company with international transactions is due by 31 October. Late filing attracts interest and penalties." },
        ]} />
      </SEOSection>

      <SEOSection label="Real Client Example" title="Transfer pricing done right – and wrong">
        <SEOClientStory region="UAE · Manufacturing Group · 12-Year-Old India Entity"
          headline="Dubai group fixed 12 years of undocumented transfer pricing"
          challenge="The India branch office had been paying management fees to the UAE parent without any transfer pricing documentation for over a decade. When a TP audit was initiated, the company had no defensible position."
          outcome="We converted the branch to a private limited company, reconstructed a defensible TP policy, filed Form 3CEB for current and prior years, and appeared before the Transfer Pricing Officer."
          proof="Passed the TP scrutiny assessment with no adjustment made. Zero additional tax demand." />
      </SEOSection>

      <SEOSection label="Common Mistakes" title="Transfer pricing mistakes Indian subsidiaries make">
        <SEOMistakes items={[
          { title: "Setting up transfer pricing after transactions have already occurred", desc: "The most common and costly mistake. TP documentation must be in place before the first intercompany payment. Reconstructing it retroactively is possible but creates risk – auditors give less weight to documentation prepared after the fact." },
          { title: "Underpaying or overpaying on management fees without benchmarking", desc: "Management fees charged by the parent to the subsidiary must be benchmarked against what an unrelated party would pay for equivalent services. Rates that are too high (over-charging the India entity) reduce taxable income in India – exactly what TP auditors look for." },
          { title: "Treating GCC entities as cost centres without proper cost-plus documentation", desc: "GCCs providing services to the foreign parent at cost are still subject to TP rules. A cost-plus methodology with a mark-up (typically 8–15%) must be documented, benchmarked, and defended." },
          { title: "Missing the Form 3CEB deadline", desc: "Form 3CEB must be filed by 31 October. Missing this deadline attracts a penalty of ₹1 lakh under Section 271BA, regardless of whether the TP position is correct." },
        ]} />
      </SEOSection>

      <SEOSection label="Audit Risk" title="How India's transfer pricing audit system works">
        <SEOProseP>India has one of the most active transfer pricing audit regimes in Asia. Cases are selected for TP scrutiny based on risk parameters set by the Central Board of Direct Taxes (CBDT) – typically companies with large international transactions, significant adjustments in prior years, or sectors known for TP disputes (IT services, pharma, financial services).</SEOProseP>
        <SEOProseP>A TP adjustment – where the tax officer determines that your intercompany pricing was not at arm's length – attracts tax on the adjustment plus interest (12% per annum) plus penalty (up to 300% of the tax on adjustment in some cases). Advance Pricing Agreements (APAs) are available for companies wanting certainty – we have experience in both unilateral and bilateral APAs.</SEOProseP>
        <SEOProseP>Our track record: zero TP adjustments upheld across all client engagements where we prepared the documentation before the transactions occurred.</SEOProseP>
      </SEOSection>

      <SEOSection label="Cost & Fees" title="What transfer pricing compliance costs in India">
        <SEOInfoCards items={[
          { icon: Ic.chart, title: "TP study + Form 3CEB (simple)", value: "₹40,000 – ₹75,000", desc: "Single transaction type, TNMM methodology" },
          { icon: Ic.clipboard, title: "TP study (multi-transaction)", value: "₹75,000 – ₹1,50,000", desc: "Multiple transaction types, complex benchmarking" },
          { icon: Ic.refresh, title: "Annual TP retainer", value: "₹60,000 – ₹1,20,000/yr", desc: "Study + 3CEB + ongoing monitoring" },
          { icon: Ic.shield, title: "TP audit representation", value: "₹1,00,000 – ₹3,00,000", desc: "Responding to scrutiny notices, DRP filings" },
          { icon: Ic.scale, title: "APA application", value: "₹3,00,000 – ₹8,00,000", desc: "Unilateral APA – 5-year pricing certainty" },
        ]} />
      </SEOSection>

      <SEOSection label="FAQ" title="Transfer pricing questions">
        <SEOFAQs items={[
          { q: "At what transaction value is transfer pricing documentation required?", a: "Transfer pricing documentation is required when the aggregate value of international transactions with related parties exceeds ₹1 crore in a financial year. Form 3CEB is additionally required. Below this threshold, documentation is still best practice but not legally mandated." },
          { q: "What is the penalty for non-compliance with transfer pricing rules?", a: "Penalties range from 2% of the transaction value (for failure to maintain documentation) to 100–300% of the tax on any adjustment. Form 3CEB non-filing attracts ₹1 lakh flat penalty. In practice, the larger risk is the adjustment itself – which then attracts tax + interest + penalty." },
          { q: "How is transfer pricing different for a GCC?", a: "A GCC providing services to its foreign parent is subject to TP rules on those services. The standard approach is a cost-plus methodology – the GCC charges the parent its total costs plus a mark-up (typically 8–15%). This mark-up and the methodology must be benchmarked and documented annually." },
          { q: "What is an Advance Pricing Agreement (APA)?", a: "An APA is a formal agreement between a taxpayer and the CBDT fixing the transfer pricing methodology and pricing for a period of 5 years. It provides complete certainty – no TP audit risk during the APA period. Available as unilateral (India only) or bilateral (India + treaty partner country)." },
          { q: "Can transfer pricing apply to a loan from the foreign parent?", a: "Yes. If the Indian subsidiary has received a loan from its foreign parent, the interest rate on that loan must be at arm's length. LIBOR-based or SBI MCLR-based benchmarks are typically used. RBI also imposes all-in cost ceilings on external commercial borrowings." },
        ]} />
      </SEOSection>

      <SEOCTAStrip setPage={setPage} />
    </SEOPageLayout>
  );
}

export {
  SEOPageLayout, SEOSection, SEOProseP, SEOSteps, SEOMistakes, SEOFAQs,
  SEOClientStory, SEOCTAStrip, ROUTES, WASvg,
  SEOPicksReveal, SEOWhatItIs, SEOInfoCards, SEOStatRow,
  SEOFDIRulesPage, SEOForeignCompanyPage, SEOGCCSetupPage, SEOMarketEntryPage,
  SEONRIPage, SEOPvtLtdPage, SEOStartupFDIPage, SEOSubsidiaryPage, SEOTransferPricingPage
};