'use client';
// src/app/NewHeroSection.jsx
// Hero — photographic background, glass panels throughout, and an
// animated "Live Status" incorporation tracker on the right: a progress
// ring plus a checklist that ticks off milestones on its own. Concrete
// and easy to read at a glance, unlike an abstract diagram.

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const FONT_HEADING = "var(--font-cormorant),'Cormorant Garamond',serif";
const FONT_BODY = "var(--font-cardo),'Cardo',Georgia,serif";
const FONT_UI = "var(--font-poppins),'Poppins',sans-serif";

const MILESTONES = [
    { label: 'Entity structure finalized', tag: 'Day 1–3' },
    { label: 'MCA incorporation filed', tag: 'Day 4–10' },
    { label: 'Certificate of Incorporation issued', tag: 'Day 11–14' },
    { label: 'RBI FCGPR filing complete', tag: 'Day 15–20' },
    { label: 'Compliance calendar active', tag: 'Day 21+' },
];

const STEP_DURATION = 1900; // ms to fill one milestone
const HOLD_DURATION = 2000; // ms to pause once all are complete, before looping

export default function NewHeroSection({ T, ROUTES = {} }) {
    const router = useRouter();
    const go = (path) => router.push(path || '/');

    const [index, setIndex] = useState(0); // 0..MILESTONES.length ; === length means "all done"
    const [pct, setPct] = useState(0);     // progress within the current milestone, 0-100
    const startRef = useRef(null);

    useEffect(() => {
        let raf;
        startRef.current = performance.now();

        function frame(now) {
            const elapsed = now - startRef.current;
            const duration = index >= MILESTONES.length ? HOLD_DURATION : STEP_DURATION;
            const p = Math.min((elapsed / duration) * 100, 100);

            if (index < MILESTONES.length) setPct(p);

            if (elapsed >= duration) {
                startRef.current = now;
                if (index >= MILESTONES.length) {
                    setIndex(0);
                    setPct(0);
                } else {
                    setIndex((i) => i + 1);
                    setPct(0);
                }
            }
            raf = requestAnimationFrame(frame);
        }
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
    }, [index]);

    const done = Math.min(index, MILESTONES.length);
    const overallPct = index >= MILESTONES.length ? 100 : ((index + pct / 100) / MILESTONES.length) * 100;

    return (
        <section className="nhero" aria-label="Introduction">
            <style dangerouslySetInnerHTML={{
                __html: `
        .nhero {
          position: relative;
          overflow: hidden;
          padding: clamp(84px, 11vw, 148px) clamp(18px, 5vw, 56px) clamp(56px, 7vw, 92px);
          background: ${T.f};
        }
        .nhero-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=70');
          background-size: cover; background-position: center 38%;
        }
        .nhero-bg-tint {
          position: absolute; inset: 0;
          background:
            linear-gradient(100deg, rgba(5,15,12,.95) 4%, rgba(8,32,24,.86) 42%, rgba(8,32,24,.58) 78%),
            linear-gradient(0deg, rgba(4,12,9,.55) 0%, transparent 40%);
        }
        .nhero-wrap {
          position: relative; z-index: 2;
          max-width: 1360px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 440px; gap: 64px; align-items: center;
        }

        .nhero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.16);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          color: rgba(255,255,255,.75); padding: 7px 18px 7px 14px; border-radius: 50px;
          font-family: ${FONT_UI}; font-size: 10.5px; font-weight: 600;
          letter-spacing: 1.6px; text-transform: uppercase; margin-bottom: 28px;
        }
        .nhero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: #F5A828; flex-shrink: 0; }

        .nhero-h1 {
          font-family: ${FONT_HEADING};
          font-size: clamp(32px, 4.6vw, 60px); font-weight: 600; color: #fff;
          line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 22px; max-width: 620px;
        }
        .nhero-h1 em { font-style: italic; font-weight: 500; color: #F5A828; }
        .nhero-sub {
          font-family: ${FONT_BODY};
          font-size: 17px; line-height: 1.85; font-weight: 400;
          color: rgba(255,255,255,.68); max-width: 540px; margin-bottom: 36px;
        }

        .nhero-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
        .nhero-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #F5A828, #C17D2A); color: #17170F;
          border: none; padding: 15px 28px; border-radius: 10px;
          font-family: ${FONT_UI}; font-size: 14px; font-weight: 600; cursor: pointer;
          box-shadow: 0 10px 30px rgba(232,144,10,.28);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .nhero-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(232,144,10,.36); }
        .nhero-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.2);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          color: rgba(255,255,255,.85); padding: 15px 26px; border-radius: 10px;
          font-family: ${FONT_UI}; font-size: 14px; font-weight: 600; cursor: pointer;
          transition: background .18s ease, border-color .18s ease;
        }
        .nhero-btn-ghost:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.34); }

        .nhero-trust {
          display: flex; flex-wrap: wrap; gap: 0;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-radius: 14px; padding: 16px 22px; width: fit-content; max-width: 100%;
        }
        .nhero-trust-item { padding: 0 24px; border-right: 1px solid rgba(255,255,255,.13); }
        .nhero-trust-item:first-child { padding-left: 0; }
        .nhero-trust-item:last-child { border-right: none; padding-right: 0; }
        .nhero-trust-label {
          font-family: ${FONT_UI}; font-size: 9px; color: rgba(255,255,255,.4);
          letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 4px;
        }
        .nhero-trust-value { font-family: ${FONT_UI}; font-size: 14px; color: #fff; font-weight: 600; }

        /* ── Live Status tracker — glass panel, right column ── */
        .nhero-track {
          position: relative;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.18);
          backdrop-filter: blur(26px); -webkit-backdrop-filter: blur(26px);
          border-radius: 22px;
          box-shadow: 0 24px 70px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1);
          padding: 28px 26px 24px;
        }
        .nhero-track-head { display: flex; align-items: center; gap: 18px; margin-bottom: 22px; }
        .nhero-track-ring {
          flex-shrink: 0; width: 68px; height: 68px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; padding: 5px;
        }
        .nhero-track-ring-inner {
          width: 100%; height: 100%; border-radius: 50%;
          background: rgba(6,16,13,.92);
          display: flex; align-items: center; justify-content: center;
          font-family: ${FONT_UI}; font-size: 16px; font-weight: 700; color: #fff;
        }
        .nhero-track-headline { flex: 1; min-width: 0; }
        .nhero-track-label {
          font-family: ${FONT_UI}; font-size: 10px; letter-spacing: 1.8px;
          text-transform: uppercase; color: #F5A828; font-weight: 700; margin-bottom: 5px;
        }
        .nhero-track-status {
          font-family: ${FONT_HEADING}; font-size: 17px; font-weight: 600; color: #fff;
          line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .nhero-track-list { display: flex; flex-direction: column; gap: 3px; }
        .nhero-track-item {
          display: flex; align-items: center; gap: 12px;
          padding: 9px 8px; border-radius: 10px;
          transition: background .2s ease;
        }
        .nhero-track-item.is-active { background: rgba(245,168,40,.1); }
        .nhero-track-dot {
          flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
        }
        .nhero-track-dot.is-done { background: #F5A828; color: #17170F; }
        .nhero-track-dot.is-active { background: rgba(245,168,40,.18); border: 2px solid #F5A828; }
        .nhero-track-dot.is-pending { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.16); }
        .nhero-track-dot-pulse { width: 7px; height: 7px; border-radius: 50%; background: #F5A828; }
        .nhero-track-item-label {
          flex: 1; font-family: ${FONT_UI}; font-size: 13px; line-height: 1.4;
          transition: color .2s ease;
        }
        .nhero-track-item-label.is-done { color: rgba(255,255,255,.5); }
        .nhero-track-item-label.is-active { color: #fff; font-weight: 600; }
        .nhero-track-item-label.is-pending { color: rgba(255,255,255,.38); }
        .nhero-track-item-tag {
          flex-shrink: 0; font-family: ${FONT_UI}; font-size: 10.5px;
          color: rgba(255,255,255,.35);
        }

        @media (prefers-reduced-motion: no-preference) {
          .nhero-track-dot-pulse { animation: nheroPulse 1.3s ease-in-out infinite; }
        }
        @keyframes nheroPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: .4; } }

        @media (max-width: 1024px) {
          .nhero-wrap { grid-template-columns: 1fr; }
          .nhero-track { max-width: 460px; }
        }
        @media (max-width: 560px) {
          .nhero-trust { padding: 14px 16px; }
          .nhero-trust-item { padding: 0 14px; }
          .nhero-cta-row .nhero-btn-primary, .nhero-cta-row .nhero-btn-ghost { flex: 1 1 auto; justify-content: center; }
          .nhero-track { max-width: 100%; padding: 22px 18px 18px; }
          .nhero-track-ring { width: 56px; height: 56px; }
          .nhero-track-ring-inner { font-size: 14px; }
          .nhero-track-status { font-size: 15px; }
        }
        @media (max-width: 420px) {
          .nhero-trust { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 0; padding: 14px; }
          .nhero-trust-item { border-right: none; padding: 0; }
        }
      ` }} />

            <div className="nhero-bg" />
            <div className="nhero-bg-tint" />

            <div className="nhero-wrap">
                {/* Left: copy */}
                <div>
                    <div className="nhero-eyebrow">
                        <span className="nhero-eyebrow-dot" />
                        Foreign Companies &middot; NRIs &middot; Global Investors
                    </div>

                    <h1 className="nhero-h1">
                        India, entered <em>correctly.</em>
                    </h1>

                    <p className="nhero-sub">
                        Senior, ex&ndash;Big Four chartered accountants and lawyers who incorporate,
                        structure, and keep foreign companies compliant in India &mdash; for founders
                        and investors who don&rsquo;t get a second attempt at the first filing.
                    </p>

                    <div className="nhero-cta-row">
                        <button className="nhero-btn-primary" onClick={() => go(ROUTES.contact)}>
                            Book Free 30-min Strategy Call →
                        </button>
                        <button
                            className="nhero-btn-ghost"
                            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            How It Works ↓
                        </button>
                    </div>

                    <div className="nhero-trust">
                        {[
                            { label: 'Clients from', value: '🇺🇸 🇬🇧 🇦🇪 🇸🇬 🇦🇺 +' },
                            { label: 'Experience', value: '18+ years' },
                            { label: 'Incorporated', value: '100+ companies' },
                            { label: 'TP audits lost', value: 'Zero' },
                        ].map((t) => (
                            <div key={t.label} className="nhero-trust-item">
                                <div className="nhero-trust-label">{t.label}</div>
                                <div className="nhero-trust-value">{t.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: animated Live Status tracker */}
                <div className="nhero-track">
                    <div className="nhero-track-head">
                        <div
                            className="nhero-track-ring"
                            style={{ background: `conic-gradient(#F5A828 ${overallPct * 3.6}deg, rgba(255,255,255,.16) 0deg)` }}
                        >
                            <div className="nhero-track-ring-inner">{Math.round(overallPct)}%</div>
                        </div>
                        <div className="nhero-track-headline">
                            <div className="nhero-track-label">Live Status</div>
                            <div className="nhero-track-status">
                                {index >= MILESTONES.length ? 'Fully operational' : MILESTONES[index].label}
                            </div>
                        </div>
                    </div>

                    <div className="nhero-track-list">
                        {MILESTONES.map((m, i) => {
                            const state = i < done || index >= MILESTONES.length ? 'done' : i === index ? 'active' : 'pending';
                            return (
                                <div key={m.label} className={`nhero-track-item ${state === 'active' ? 'is-active' : ''}`}>
                                    <div className={`nhero-track-dot is-${state}`}>
                                        {state === 'done' && '✓'}
                                        {state === 'active' && <span className="nhero-track-dot-pulse" />}
                                    </div>
                                    <span className={`nhero-track-item-label is-${state}`}>{m.label}</span>
                                    <span className="nhero-track-item-tag">{m.tag}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}