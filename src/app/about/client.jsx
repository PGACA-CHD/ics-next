'use client';

import { useEffect, useRef, useState } from 'react';

const F = "Helvetica, Arial, sans-serif";
const BDR = "1px solid rgba(0,0,0,0.52)";
const GLASS = "rgba(255,255,255,0.28)";
const BLUR = "blur(16px)";
const GREEN = "#0B3D2E";
const GOLD = "#e69819";
const HS = "clamp(28px, 3vw, 42px)";

const LOGOS_ROW1 = ['Protiviti India', 'Mahindra Defence Systems', 'Saregama India', 'Ethos Limited', 'Polyplex Corporation Limited (Listed)', 'Damco soft', 'Tube Investment of India', 'Vibracoustic India Private Limited', 'Newtech Filter (BOSCH group Company)', 'Godrej, UAE entities', 'Ognibene power', 'Cloud EQ'];
const LOGOS_ROW2 = ['Defacto Infotech India, AU, US', 'CrimsonInsights', 'Alleshealth', 'Foodjam', 'Grid advertising', 'Talink', 'Mcube capital', 'SML Mahindra Limited', 'Cheema Boilers Limited', 'AWFIS India Private Limited', 'Skin elements', 'Vyra Life (Modebencura)'];

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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const [ref, vis] = useReveal();

  if (isMobile) {
    return <div>{children}</div>;
  }

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : (up ? 'translateY(22px)' : 'translateY(0)'), transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ end, suffix = '', prefix = '', delay = 0, isText = false }) {
  const [val, setVal] = useState(isText ? end : 0);
  const [ref, vis] = useReveal(0.3);
  const done = useRef(false);
  useEffect(() => {
    if (!vis || done.current || isText) return;
    done.current = true;
    let i = 0; const steps = 50;
    setTimeout(() => {
      const id = setInterval(() => {
        i++;
        const p = 1 - Math.pow(1 - i / steps, 3);
        setVal(Math.round(end * p));
        if (i >= steps) clearInterval(id);
      }, 1200 / steps);
    }, delay);
  }, [vis]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

function SH({ eyebrow, green, gold, center = true, mb = 40 }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: mb, fontFamily: F }}>
      {eyebrow && (
        <p style={{ fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase", color: GREEN, fontWeight: 700, marginBottom: 14, fontFamily: F, margin: "0 0 14px" }}>{eyebrow}</p>
      )}
      <h2 style={{ fontSize: HS, fontWeight: 700, lineHeight: 1.1, margin: 0, fontFamily: F }}>
        <span style={{ color: GREEN }}>{green}</span>
        {gold && <>{" "}<em style={{ color: GOLD, fontStyle: "italic" }}>{gold}</em></>}
      </h2>
    </div>
  );
}

const LI = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#0077b5" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ── spotlight follow mouse ── */
const handleSpotlight = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

const STATS = [
  { n: 100, suffix: '+', label: 'Companies incorporated', sub: 'Across 5 continents' },
  { n: 18, suffix: '+', label: 'Years in practice', sub: 'Ex-Big 4 led team' },
  { n: 90, suffix: '+', label: 'Treaty jurisdictions', sub: 'DTAA & TP coverage' },
  { n: 'Zero', suffix: '', label: 'Audits lost', sub: '100% clean record', isText: true },
];

function HeroStats() {
  const secRef = useRef(null);
  const [secVis, setSecVis] = useState(false);
  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSecVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={secRef} className="about-stats" style={{ background: GLASS, backdropFilter: BLUR, WebkitBackdropFilter: BLUR, border: BDR, borderRadius: 20, padding: '10px', fontFamily: F, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {STATS.map((s, i) => (
        <div key={s.label} style={{ padding: '26px 22px', borderRight: i % 2 === 0 ? '1px solid rgba(0,0,0,0.09)' : 'none', borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.09)' : 'none', opacity: secVis ? 1 : 0, transform: secVis ? 'translateY(0)' : 'translateY(10px)', transition: `opacity .5s ease ${i * 90}ms, transform .5s ease ${i * 90}ms` }}>
          <div style={{ fontSize: 'clamp(30px,3.4vw,42px)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 8, fontFamily: F }}>
            {s.isText ? s.n : <CountUp end={s.n} suffix={s.suffix} delay={i * 150} />}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3, fontFamily: F, lineHeight: 1.3 }}>{s.label}</div>
          <div style={{ fontSize: 11.5, color: '#fff', fontFamily: F }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

function WhyVisual() {
  const CHIPS = ['Partner-led from day one to year five', 'No junior hand-offs mid-engagement', 'Same team for incorporation and Year 5 GST filing'];
  const [visible, setVisible] = useState([false, false, false]);
  const timers = useRef([]);
  const runLoop = () => {
    timers.current.forEach(clearTimeout); timers.current = [];
    setVisible([false, false, false]);
    const t1 = setTimeout(() => setVisible([true, false, false]), 120);
    const t2 = setTimeout(() => setVisible([true, true, false]), 620);
    const t3 = setTimeout(() => setVisible([true, true, true]), 1120);
    const t4 = setTimeout(() => { setVisible([false, false, false]); setTimeout(runLoop, 200); }, 3800);
    timers.current = [t1, t2, t3, t4];
  };
  useEffect(() => { runLoop(); return () => timers.current.forEach(clearTimeout); }, []);
  return (
    /* GOLD spotlight colour */
    <div className="spot-card" onMouseMove={handleSpotlight}
      style={{ background: '#f9f9f6', borderRadius: 24, padding: '40px 36px', position: 'relative', overflow: 'hidden', fontFamily: F, '--spot-color': 'rgba(230,152,25,0.18)', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.05, maskImage: 'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 80%)', WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 80%)' }} />
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(230,152,25,0.14),transparent 70%)', pointerEvents: 'none' }} />
      <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d98200', marginBottom: 22, position: 'relative', zIndex: 1 }}>The founding principle</p>
      <blockquote style={{ fontFamily: F, fontSize: 'clamp(17px,2vw,22px)', fontWeight: 500, fontStyle: 'italic', color: '#111', lineHeight: 1.5, margin: '0 0 32px', position: 'relative', zIndex: 1 }}>
        "The technical answer is rarely the hard part of entering a new market. Staying accountable for it, eighteen months after the invoice is paid, is."
      </blockquote>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
        {CHIPS.map((t, i) => (
          <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, opacity: visible[i] ? 1 : 0, transform: visible[i] ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.42s ease, transform 0.42s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(230,152,25,0.15)', border: '1px solid rgba(230,152,25,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transform: visible[i] ? 'scale(1)' : 'scale(0.5)', transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)', transitionDelay: visible[i] ? '0.05s' : '0s' }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#d98200" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span style={{ fontFamily: F, fontSize: 13, color: '#555', lineHeight: 1.55 }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 0, marginTop: 32, borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, position: 'relative', zIndex: 1 }}>
        {[['100+', 'Companies'], ['5', 'Continents'], ['15+', 'Team Members']].map(([n, l], i) => (
          <div key={n} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none', padding: '0 12px' }}>
            <p style={{ fontFamily: F, fontSize: 28, fontWeight: 800, color: '#111', lineHeight: 1, marginBottom: 4 }}>{n}</p>
            <p style={{ fontFamily: F, fontSize: 10.5, color: '#666', letterSpacing: '0.04em' }}>{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Structure: merged Divsam+India card, PGA separate, GOLD spotlight ── */
function StructureAnimation() {
  const secRef = useRef(null);
  const [secVis, setSecVis] = useState(false);
  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSecVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const cardStyle = (delay) => ({
    borderRadius: 16,
    border: '1px solid rgba(11,61,46,0.14)',
    background: 'rgba(11,61,46,0.04)',
    '--spot-color': 'rgba(230,152,25,0.18)',
    opacity: secVis ? 1 : 0,
    transform: secVis ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms`,
  });

  return (
    <div ref={secRef} style={{ fontFamily: F, display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* MERGED: Divsam + India Company Setup */}
      <div className="spot-card" onMouseMove={handleSpotlight} style={{ padding: '18px', ...cardStyle(0) }}>
        <div className="spot-card-content">
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, marginBottom: 3, fontFamily: F }}>Primary contracting entity</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#111', fontFamily: F, lineHeight: 1.2, letterSpacing: '-0.01em' }}>Divsam Consultants LLP</div>
          </div>
          <div style={{ height: 1, background: 'rgba(11,61,46,0.10)', margin: '0 0 12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(11,61,46,0.07)', border: '1px solid rgba(11,61,46,0.12)', marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, fontFamily: F, marginBottom: 1 }}>Market-facing brand</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: GREEN, fontFamily: F, lineHeight: 1.2 }}>India Company Setup</div>
            </div>
            <div style={{ fontSize: 10, color: '#888', fontFamily: F, fontStyle: 'italic', lineHeight: 1.3, textAlign: 'right', maxWidth: 150 }}>Your single point of contact for all foreign-entry advisory</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {['Carries PI insurance', 'Signs all engagement letters'].map(d => (
              <span key={d} style={{ fontSize: 12, color: '#111', fontFamily: F, display: 'inline-block', padding: '5px 14px', borderRadius: 50, background: 'rgba(11,61,46,0.06)', border: '1px solid rgba(11,61,46,0.18)' }}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* PGA */}
      <div className="spot-card" onMouseMove={handleSpotlight} style={{ display: 'flex', gap: 14, padding: '22px', ...cardStyle(120) }}>
        <div className="spot-card-content" style={{ display: 'flex', gap: 14 }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, marginBottom: 4, fontFamily: F }}>Knowledge partner</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#111', fontFamily: F, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.01em' }}>PGA & Co., CA</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {['Chartered Accountants', 'Named on deliverables', 'Statutory audit', 'High-volume compliance'].map(d => (
                <span key={d} style={{ fontSize: 12, color: '#111', fontFamily: F, display: 'inline-block', padding: '5px 14px', borderRadius: 50, background: 'rgba(11,61,46,0.06)', border: '1px solid rgba(11,61,46,0.18)' }}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── TeamCard: static dark-green bg + GOLD spotlight on hover ── */
function TeamCard({ photo, name, liUrl, role, bio, accent, delay = 0 }) {
  const [ref, vis] = useReveal(0.15);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseMove={handleSpotlight}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      /* GOLD spotlight colour on team card */
      className="spot-card team-card-inner"
      style={{
        display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0,
        borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(230,152,25,0.55)' : 'rgba(0,0,0,0.10)'}`,
        boxShadow: hovered ? '0 12px 40px rgba(230,152,25,0.18)' : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: vis ? (hovered ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(24px)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${delay}ms`,
        '--spot-color': 'rgba(230,152,25,0.18)',
        background: 'rgba(11,61,46,0.04)',
        animationDelay: `${delay * -10}ms`,
      }}
    >
      <div className="team-card-photo" style={{ width: 200, height: '100%', minHeight: 280, background: 'rgba(11,61,46,0.10)', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {photo
          ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(11,61,46,0.18)', fontFamily: F, fontSize: 48, fontWeight: 800, color: GREEN }}>{name.charAt(0)}</div>
        }
        <div className="team-card-overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top,rgba(0,0,0,0.18),transparent)', pointerEvents: 'none' }} />
      </div>
      <div className="spot-card-content" style={{ padding: '32px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 3, background: accent, borderRadius: 2, marginBottom: 16 }} />
        <a href={liUrl} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: '#111', display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none', letterSpacing: '-0.01em', marginBottom: 4, transition: 'color .15s' }}
          onMouseEnter={e => e.currentTarget.style.color = accent}
          onMouseLeave={e => e.currentTarget.style.color = '#111'}
        >{name} <LI /></a>
        <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: accent, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 16px' }}>{role}</p>
        <div style={{ fontFamily: F, fontSize: 14, color: '#555', lineHeight: 1.78, margin: 0 }}>{bio}</div>
      </div>
    </div>
  );
}

export default function AboutPage({ T = {}, ROUTES = {} }) {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes scroll-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes scroll-right { from { transform: translateX(-50%) } to { transform: translateX(0) }    }

        /* ══ GOLD spotlight follow-mouse ══
           Same mechanism as original — radial follows --mouse-x/y.
           Only colour changed from green to gold. */
        @keyframes floatSpotlight {
          0%   { background-position: 50% 50%; }
          25%  { background-position: 80% 20%; }
          50%  { background-position: 20% 80%; }
          75%  { background-position: 80% 80%; }
          100% { background-position: 50% 50%; }
        }
        .spot-card { position: relative; overflow: hidden; --mouse-x: 50%; --mouse-y: 50%; }
        .spot-card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(circle at center, var(--spot-color, rgba(230,152,25,0.15)) 0%, transparent 70%);
          background-size: 200% 200%;
          background-position: 50% 50%;
          opacity: 0.7;
          animation: floatSpotlight 15s ease-in-out infinite;
          transition: opacity .4s ease;
        }
        .spot-card:hover::before, .spot-card:focus-within::before {
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spot-color, rgba(230,152,25,0.15)), transparent 65%);
          background-size: 100% 100%;
          background-position: 0 0;
          animation: none;
          opacity: 1;
        }
        .spot-card-content { position: relative; z-index: 1; }

        .lbl {
          font-size: 10.5px; letter-spacing: 2px; text-transform: uppercase;
          font-weight: 600; color: #aaa;
          font-family: Helvetica, Arial, sans-serif; display: block;
        }
        .logo-l { display: flex; width: max-content; animation: scroll-left  38s linear infinite; }
        .logo-r { display: flex; width: max-content; animation: scroll-right 38s linear infinite; }
        .logo-l:hover, .logo-r:hover { animation-play-state: paused; }
        .logo-item { flex-shrink: 0; width: 155px; height: 64px; display: flex; align-items: center; justify-content: center; padding: 0 18px; }
        .logo-item img { max-width: 125px; max-height: 44px; object-fit: contain; }
        .logo-fl { position: absolute; left: 0; top: 0; bottom: 0; width: 10%; background: linear-gradient(90deg,#fff,transparent); z-index: 2; pointer-events: none; }
        .logo-fr { position: absolute; right: 0; top: 0; bottom: 0; width: 10%; background: linear-gradient(270deg,#fff,transparent); z-index: 2; pointer-events: none; }

        .lime-btn { display: inline-flex; align-items: center; gap: 8px; background: #093024; color: #fff; font-family: Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 6px; border: none; cursor: pointer; transition: background .2s, transform .15s; text-decoration: none; }
        .lime-btn:hover { background: #0a3d2c; transform: translateY(-1px); }

        /* ══ WWE grid — align-items:center so both cols fill equal height ══ */
        .wwe {
          max-width: 1200px; margin: 0 auto;
          padding: 20px 56px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          /* KEY: stretch both columns to same height, content centred inside */
          align-items: center;
        }
        /* sticky col — left aligned */
        .wwe-sticky {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        /* paragraphs — left aligned */
        .wwe-p {
          font-family: Helvetica, Arial, sans-serif;
          font-size: 14.5px; color: #555; line-height: 1.82;
          margin: 0 0 18px;
          text-align: left;
        }
        .wwe-p:last-child { margin-bottom: 0; }

        .reg-strip { border-radius: 16px; border: 1px solid rgba(0,0,0,0.52); padding: 22px 26px; display: flex; gap: 0; align-items: stretch; margin-bottom: 14px; }
        .reg-card  { flex: 1; padding: 0 22px 0 0; margin-right: 22px; border-right: 1px solid rgba(0,0,0,.10); }
        .reg-card:last-child { border-right: none; padding-right: 0; margin-right: 0; }
        .reg-card-inner { display: flex; align-items: flex-start; gap: 11px; }
        .reg-ico   { width: 34px; height: 34px; border-radius: 9px; background: rgba(9,48,36,0.04); border: 1px dashed rgba(9,48,36,0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .reg-title { font-family: Helvetica, Arial, sans-serif; font-size: 12.5px; font-weight: 700; color: #111; margin: 0 0 3px; }
        .reg-desc  { font-family: Helvetica, Arial, sans-serif; font-size: 11.5px; color: #555; line-height: 1.55; margin: 0; }

        /* ══ DISC CARDS — GOLD spotlight ══ */
        .disc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .disc-card {
          background: #fff; border-radius: 16px; padding: 26px;
          border: 1px solid rgba(0,0,0,0.12);
          transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
          /* gold spotlight colour */
          --spot-color: rgba(230,152,25,0.18);
        }
        .disc-card:hover {
          box-shadow: 0 10px 32px rgba(230,152,25,0.16);
          transform: translateY(-3px);
          border-color: rgba(230,152,25,0.45);
        }

        @media(max-width:960px) {
          .hero-g, .wwe, .team-g { grid-template-columns: 1fr !important; gap: 40px !important; }
          .wwe-sticky { position: static !important; }
          .wwe { padding: 20px 28px 0 !important; }
          .disc-grid { grid-template-columns: 1fr !important; }
          .team-card-inner { grid-template-columns: 160px 1fr !important; }
        }
        @media(max-width:720px) {
          .reg-strip { flex-direction: column; gap: 16px; }
          .reg-card  { border-right: none; padding: 0 0 14px; margin: 0; border-bottom: 1px solid rgba(0,0,0,.09); }
          .reg-card:last-child { border-bottom: none; padding-bottom: 0; }
          .team-card-inner { grid-template-columns: 1fr !important; }
          .team-card-inner > .team-card-photo { height: auto !important; width: 100% !important; min-height: unset !important; }
          .team-card-inner > .team-card-photo img { width: 100% !important; height: auto !important; object-fit: contain !important; object-position: top center !important; }
          .team-card-inner > .team-card-overlay { display: none !important; }
          .team-card-inner > .spot-card-content { padding: 24px 20px !important; }
        }
        @media(max-width:540px) {
          .wwe { padding: 20px 18px 0 !important; }
          .sec { padding-left: 18px !important; padding-right: 18px !important; }
          .team-card-inner > .spot-card-content { padding: 20px 16px !important; }
          .wwe-p { max-width: 100%; }
        }
        @media(max-width:420px) {
          .sec { padding-left: 12px !important; padding-right: 12px !important; }
          .team-card-inner > .spot-card-content { padding: 18px 12px !important; }
          .about-stats { padding: 6px !important; border-radius: 14px !important; }
          .about-stats > div { padding: 18px 14px !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{ backgroundImage: "url('/banners and logos/About us main banner-2.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px 56px 0', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="hero-g" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <Fade>
              <span className="lbl" style={{ marginBottom: 22 }}>About India Company Setup</span>
              <h1 style={{ fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.033em', margin: '0 0 22px', fontFamily: F }}>
                <span style={{ color: 'white' }}>Big 4 expertise. Independent firm.</span>{' '}
                <em style={{ color: GOLD, fontStyle: 'italic', fontWeight: 800 }}>Built for your scale.</em>
              </h1>
              <p style={{ fontSize: 16, color: '#ffffffff', lineHeight: 1.78, maxWidth: 520, margin: '0 0 36px', fontFamily: F }}>
                India Company Setup is the market-facing brand for foreign-entry advisory work, operating under <strong style={{ color: '#de9504ff', fontWeight: 700 }}>Divsam Consultants LLP</strong> — the practice that carries professional liability insurance and signs every engagement letter.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="lime-btn" onClick={() => window.open('https://wa.me/919915731447', '_blank')}>Talk to our team →</button>
              </div>
            </Fade>
            <Fade delay={120}><HeroStats /></Fade>
          </div>
        </div>
      </section>

      {/* ══ TRUSTED BY — no border below ══ */}
      <section style={{ padding: '20px 0 0', background: '#fff', fontFamily: F }}>
        <Fade>
          <SH green="Trusted by 100+" gold="companies worldwide." mb={36} />
        </Fade>
        <div style={{ position: 'relative', overflow: 'hidden', marginBottom: 8 }}>
          <div className="logo-fl" /><div className="logo-fr" />
          <div className="logo-l">
            {[0, 1].map(di => (
              <div key={di} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {LOGOS_ROW1.map(name => (
                  <div key={`${di}-${name}`} className="logo-item">
                    <img src={`/logos/${encodeURIComponent(name)}.png`} alt={name}
                      onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = `<span style="font-size:11px;font-weight:600;color:#ccc;font-family:${F}">${name}</span>`; }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="logo-fl" /><div className="logo-fr" />
          <div className="logo-r">
            {[0, 1].map(di => (
              <div key={di} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {LOGOS_ROW2.map(name => (
                  <div key={`${di}-${name}`} className="logo-item">
                    <img src={`/logos/${encodeURIComponent(name)}.png`} alt={name}
                      onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = `<span style="font-size:11px;font-weight:600;color:#ccc;font-family:${F}">${name}</span>`; }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MEET THE TEAM — no border line above ══ */}
      <section style={{ padding: '20px 56px 0', background: '#fff', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SH green="The people behind" gold="your India entry." mb={14} />
              <p style={{ fontFamily: F, fontSize: 14.5, color: '#555', lineHeight: 1.72, margin: '0 auto', maxWidth: 480 }}>
                CA · CS · Accountants · Legal — one full-service advisory team for every stage of your India journey.
              </p>
            </div>
          </Fade>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <TeamCard photo="/pankajgupta.jpeg" name="Pankaj Gupta"
              liUrl="https://www.linkedin.com/in/pankaj-gupta-7199282a/"
              role="Senior Advisor · FCA, LLB, Dip. In Int. Tax" accent={GREEN} delay={0}
              bio={
                <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>18+ years of working experience</li>
                  <li>8+ years of Big 4 experience</li>
                  <li>Specialises in cross-border tax structuring, transfer pricing, FEMA, and NRI/HNI advisory</li>
                  <li>Leads a multi-disciplinary team of CAs, CS, and legal professionals</li>
                </ul>
              } />
            <TeamCard photo="/anuradha_gupta.png" name="Anuradha Gupta"
              liUrl="https://www.linkedin.com/in/anuradha-gupta-6673a3142/"
              role="Partner · FCA, LLB" accent="#c8870a" delay={120}
              bio={
                <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>17+ years of working experience</li>
                  <li>Worked in US Companies like – Xerox, Emerson, Oceaneering</li>
                  <li>Specialises in Accounting, Payroll, Financial Statement, ERP Expertise, Process development and improvements</li>
                  <li>Vast experience working in global companies</li>
                </ul>
              } />
          </div>
        </div>
      </section>

      {/* ══ WHY WE EXIST ══ */}
      <div style={{ background: '#fff', padding: '20px 56px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Fade><SH eyebrow="Why we exist" green="Built because the best advice" gold="was being wasted." mb={0} /></Fade>
        </div>
      </div>
      <div style={{ background: '#fff' }}>
        {/*
        */}
        <div className="wwe">
          <div className="wwe-sticky">
            <Fade>
              <p className="wwe-p">For years, the people who now lead this practice sat inside Big Four advisory rooms, watching the same pattern repeat: a foreign company would arrive with real capital and a real deadline, and get routed to whichever associate had a free afternoon.</p>
              <p className="wwe-p">We built India Company Setup to remove that layer entirely. Every engagement — from the first structuring call to the fifth year of GST filings — runs through the same small, senior team.</p>
              <p className="wwe-p">Today that model has taken more than a hundred companies through incorporation and into steady-state compliance, across five continents and ninety-plus treaty jurisdictions.</p>
            </Fade>
          </div>
          <Fade delay={80}><WhyVisual /></Fade>
        </div>

        {/* ══ OUR STRUCTURE ══ */}
        <div style={{ background: '#fff', padding: '48px 56px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Fade><SH eyebrow="Our structure" green="Who you're actually" gold="contracting with." mb={0} /></Fade>
          </div>
        </div>
        <div className="wwe">
          <Fade delay={80}><StructureAnimation /></Fade>
          <div className="wwe-sticky">
            <Fade>
              <p className="wwe-p">India Company Setup is the market-facing brand for foreign-entry advisory work, operating under <strong style={{ color: '#111' }}>Divsam Consultants LLP</strong> — the practice that carries professional liability insurance and signs every engagement letter.</p>
              <p className="wwe-p">For statutory audit and select high-volume compliance work, we engage PGA & Co., Chartered Accountants as a formal knowledge partner — named on the relevant deliverables, never a silent subcontractor.</p>
              <p className="wwe-p">One point of contact, one engagement letter, full transparency on who signs what.</p>
            </Fade>
          </div>
        </div>
      </div>

      {/* ══ FOUR DISCIPLINES — gold spotlight ══ */}
      <section style={{ padding: '20px 56px 0', background: '#fff', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Fade><SH green="Four disciplines." gold="One integrated team." mb={48} /></Fade>
          <div className="disc-grid">
            {[
              { num: '01', title: 'International Tax & Advisory', items: ['DTAA structuring & TRC advisory', 'Transfer pricing — design, benchmarking, Form 3CEB', 'PE risk assessment & FEMA compliance', 'Withholding tax optimisation'] },
              { num: '02', title: 'Company Secretary & MCA', items: ['Company incorporation & SPICe+ filing', 'FCGPR & FLA — RBI filings', 'Board resolutions & statutory registers', 'Annual ROC filings (MGT-7, AOC-4)'] },
              { num: '03', title: 'Accounts, GST & Payroll', items: ['Monthly bookkeeping & MIS reports', 'GST registration, returns & reconciliation', 'TDS computation & 26Q / 27Q returns', 'Payroll — PF, ESI, professional tax'] },
              { num: '04', title: 'Legal & Contracts', items: ['Shareholder & subscription agreements', 'Intercompany service agreements (MSA)', 'Employment contracts & ESOP plans', 'Regulatory advisory — SEBI, RBI, DPIIT'] },
            ].map((p, ci) => (
              <Fade key={p.num} delay={ci * 80}>
                {/* disc-card has spot-card class so gold spotlight applies */}
                <div className="disc-card spot-card" onMouseMove={handleSpotlight} style={{ animationDelay: `${ci * -3.5}s` }}>
                  <div className="spot-card-content">
                    <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 8 }}>{p.num}</span>
                    <h3 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: GREEN, margin: '0 0 14px', lineHeight: 1.2 }}>{p.title}</h3>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {p.items.map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 9 }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD, flexShrink: 0, marginTop: 7 }} />
                          <span style={{ fontFamily: F, fontSize: 13.5, color: '#4a4438', lineHeight: 1.55 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REGISTRATIONS ══ */}
      <section style={{ padding: '0px 56px 0', background: '#fff', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Fade><SH green="Registrations &amp;" gold="memberships." mb={48} /></Fade>
          <Fade>
            <div className="reg-strip">
              {[
                { title: 'MCA / LLP Identification', desc: 'Divsam Consultants LLP (LLPIN: AAF-8044), incorporated on 26th Feb 2016, Ministry of Corporate Affairs, Government of India.', img: '/banners and logos/MCA_LLP.png' },
                { title: 'Professional Liability', desc: 'Divsam Consultants LLP carries professional liability insurance, providing security and peace of mind for all client engagements.', img: '/banners and logos/Indemnity - About Us.png' },
                { title: 'PGA & Co., CA', desc: 'Knowledge partner PGA & Co., Chartered Accountants, registered with ICAI since 13th August 2013.', img: '/banners and logos/MCA_LLP.png' },
              ].map(item => (
                <div key={item.title} className="reg-card">
                  <div className="reg-card-inner">
                    <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div><p className="reg-title">{item.title}</p><p className="reg-desc">{item.desc}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>
    </>
  );
}