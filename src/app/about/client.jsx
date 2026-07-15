'use client';

import { useEffect, useRef, useState } from 'react';

const F = "'Helvetica Neue','Helvetica',Arial,sans-serif";
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
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : (up ? 'translateY(22px)' : 'translateY(0)'), transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Animated count-up ── */
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
        <p style={{
          fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase",
          color: GREEN, fontWeight: 700, marginBottom: 14, fontFamily: F, margin: "0 0 14px"
        }}>{eyebrow}</p>
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

const handleSpotlight = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

/* ── Hero stats ── */
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
    <div ref={secRef} style={{ background: GLASS, backdropFilter: BLUR, WebkitBackdropFilter: BLUR, border: BDR, borderRadius: 20, padding: '10px', fontFamily: F, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {STATS.map((s, i) => (
        <div key={s.label} style={{ padding: '26px 22px', borderRight: i % 2 === 0 ? '1px solid rgba(0,0,0,0.09)' : 'none', borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.09)' : 'none', opacity: secVis ? 1 : 0, transform: secVis ? 'translateY(0)' : 'translateY(10px)', transition: `opacity .5s ease ${i * 90}ms, transform .5s ease ${i * 90}ms` }}>
          <div style={{ fontSize: 'clamp(30px,3.4vw,42px)', fontWeight: 800, color: GREEN, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 8, fontFamily: F }}>
            {s.isText ? s.n : <CountUp end={s.n} suffix={s.suffix} delay={i * 150} />}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 3, fontFamily: F, lineHeight: 1.3 }}>{s.label}</div>
          <div style={{ fontSize: 11.5, color: '#888', fontFamily: F }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Why visual ── */
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
    <div className="spot-card" onMouseMove={handleSpotlight} style={{ background: GREEN, borderRadius: 24, padding: '40px 36px', position: 'relative', overflow: 'hidden', fontFamily: F, '--spot-color': 'rgba(245,168,40,0.28)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,168,40,0.14),transparent 70%)', pointerEvents: 'none' }} />
      <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#F5A828', marginBottom: 22, position: 'relative', zIndex: 1 }}>The founding principle</p>
      <blockquote style={{ fontFamily: F, fontSize: 'clamp(17px,2vw,22px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.5, margin: '0 0 32px', position: 'relative', zIndex: 1 }}>
        "The technical answer is rarely the hard part of entering a new market. Staying accountable for it, eighteen months after the invoice is paid, is."
      </blockquote>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
        {CHIPS.map((t, i) => (
          <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, opacity: visible[i] ? 1 : 0, transform: visible[i] ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.42s ease, transform 0.42s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(245,168,40,0.15)', border: '1px solid rgba(245,168,40,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transform: visible[i] ? 'scale(1)' : 'scale(0.5)', transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)', transitionDelay: visible[i] ? '0.05s' : '0s' }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#F5A828" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 0, marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, position: 'relative', zIndex: 1 }}>
        {[['100+', 'Companies'], ['5', 'Continents'], ['Zero', 'Audits lost']].map(([n, l], i) => (
          <div key={n} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '0 12px' }}>
            <p style={{ fontFamily: F, fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 4 }}>{n}</p>
            <p style={{ fontFamily: F, fontSize: 10.5, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.04em' }}>{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Structure ── */
function StructureAnimation() {
  const ITEMS = [
    { letter: 'I', name: 'India Company Setup', role: 'Market-facing brand', detail: 'Your single point of contact for all foreign-entry advisory', accent: '#6d4fd1', bg: 'rgba(109,79,209,0.08)' },
    { letter: 'D', name: 'Divsam Consultants LLP', role: 'Primary contracting entity', detail: 'Carries PI insurance · Signs all engagement letters', accent: GREEN, bg: 'rgba(9,48,36,0.08)' },
    { letter: 'P', name: 'PGA & Co., CA', role: 'Knowledge partner', detail: 'ICAI-registered · Chartered Accountants · Named on deliverables · Statutory audit · High-volume compliance', accent: '#b08d2a', bg: 'rgba(245,168,40,0.08)' },
  ];
  const secRef = useRef(null);
  const [secVis, setSecVis] = useState(false);
  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSecVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={secRef} style={{ fontFamily: F, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {ITEMS.map((item, i) => (
        <div key={item.letter} className="spot-card" onMouseMove={handleSpotlight}
          style={{ display: 'flex', gap: 16, padding: '22px 22px', borderRadius: 16, border: '1px solid ' + item.accent + '30', background: item.bg, '--spot-color': item.accent + '30', opacity: secVis ? 1 : 0, transform: secVis ? 'translateY(0)' : 'translateY(14px)', transition: `opacity .5s ease ${i * 100}ms, transform .5s ease ${i * 100}ms`, animationDelay: `${i * -2.5}s` }}>
          <div className="spot-card-content" style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: '#fff', border: '2px solid ' + item.accent + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: item.accent, fontFamily: F, flexShrink: 0 }}>{item.letter}</div>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: item.accent, marginBottom: 5, fontFamily: F }}>{item.role}</div>
              <div style={{ fontSize: 16.5, fontWeight: 800, color: '#111', fontFamily: F, lineHeight: 1.2, marginBottom: 6, letterSpacing: '-0.01em' }}>{item.name}</div>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0, fontFamily: F }}>{item.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Team Member Card — photo left, content right ── */
function TeamCard({ photo, name, liUrl, role, bio, accent, delay = 0 }) {
  const [ref, vis] = useReveal(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseMove={handleSpotlight}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="spot-card"
      style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: 0,
        borderRadius: 20,
        overflow: 'hidden',
        border: `1px solid ${hovered ? accent + '60' : 'rgba(0,0,0,0.10)'}`,
        boxShadow: hovered ? `0 12px 40px ${accent}18` : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: vis ? (hovered ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(24px)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${delay}ms`,
        '--spot-color': accent + '18',
        background: '#fff',
        animationDelay: `${delay * -10}ms`,
      }}
    >
      {/* Left — photo */}
      <div style={{ width: 200, height: '100%', minHeight: 280, background: '#EDEFF4', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {photo ? (
          <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(145deg, ${accent}15, ${accent}30)`, fontFamily: F, fontSize: 48, fontWeight: 800, color: accent }}>
            {name.charAt(0)}
          </div>
        )}
        {/* subtle gradient overlay at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)', pointerEvents: 'none' }} />
      </div>

      {/* Right — content */}
      <div className="spot-card-content" style={{ padding: '32px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* accent top bar */}
        <div style={{ width: 32, height: 3, background: accent, borderRadius: 2, marginBottom: 16 }} />

        <a
          href={liUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: '#111', display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none', letterSpacing: '-0.01em', marginBottom: 4, transition: 'color .15s' }}
          onMouseEnter={e => e.currentTarget.style.color = accent}
          onMouseLeave={e => e.currentTarget.style.color = '#111'}
        >
          {name} <LI />
        </a>

        <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: accent, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 16px' }}>{role}</p>

        <p style={{ fontFamily: F, fontSize: 14, color: '#555', lineHeight: 1.78, margin: 0 }}>{bio}</p>
      </div>
    </div>
  );
}

export default function AboutPage({ T = {}, ROUTES = {} }) {
  return (
    <>
      <style>{`
        * { box-sizing:border-box; }
        @keyframes statIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scroll-left  { from{transform:translateX(0)}  to{transform:translateX(-50%)} }
        @keyframes scroll-right { from{transform:translateX(-50%)} to{transform:translateX(0)}  }

        .lbl {
          font-size:10.5px; letter-spacing:2px; text-transform:uppercase;
          font-weight:600; color:#aaa;
          font-family:'Helvetica Neue','Helvetica',Arial,sans-serif;
          display:block;
        }

        .logo-l { display:flex; width:max-content; animation:scroll-left  38s linear infinite; }
        .logo-r { display:flex; width:max-content; animation:scroll-right 38s linear infinite; }
        .logo-l:hover,.logo-r:hover { animation-play-state:paused; }
        .logo-item { flex-shrink:0; width:155px; height:64px; display:flex; align-items:center; justify-content:center; padding:0 18px; }
        .logo-item img { max-width:125px; max-height:44px; object-fit:contain; }
        .logo-fl { position:absolute; left:0; top:0; bottom:0; width:10%; background:linear-gradient(90deg,#fff,transparent); z-index:2; pointer-events:none; }
        .logo-fr { position:absolute; right:0; top:0; bottom:0; width:10%; background:linear-gradient(270deg,#fff,transparent); z-index:2; pointer-events:none; }

        .lime-btn { display:inline-flex; align-items:center; gap:8px; background:#093024; color:#fff; font-family:'Helvetica Neue','Helvetica',Arial,sans-serif; font-size:15px; font-weight:700; padding:14px 28px; border-radius:6px; border:none; cursor:pointer; transition:background .2s,transform .15s; text-decoration:none; }
        .lime-btn:hover { background:#0a3d2c; transform:translateY(-1px); }

        .wwe { max-width:1200px; margin:0 auto; padding:88px 56px; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; border-top:1px solid rgba(0,0,0,.07); }
        .wwe-sticky { position:sticky; top:100px; }
        .wwe-num { font-size:10px; font-weight:700; letter-spacing:.32em; text-transform:uppercase; color:#F5A828; display:flex; align-items:center; gap:8px; margin-bottom:16px; font-family:'Helvetica Neue','Helvetica',Arial,sans-serif; }
        .wwe-h2  { font-family:'Helvetica Neue','Helvetica',Arial,sans-serif; font-size:clamp(24px,3vw,38px); font-weight:800; color:#111; line-height:1.1; letter-spacing:-0.025em; margin:0 0 18px; }
        .wwe-p   { font-family:'Helvetica Neue','Helvetica',Arial,sans-serif; font-size:14.5px; color:#555; line-height:1.82; margin:0 0 14px; }

        .reg-strip { border-radius:16px; border:1px solid rgba(0,0,0,0.52); padding:22px 26px; display:flex; gap:0; align-items:stretch; margin-bottom:14px; }
        .reg-card  { flex:1; padding:0 22px 0 0; margin-right:22px; border-right:1px solid rgba(0,0,0,.10); }
        .reg-card:last-child { border-right:none; padding-right:0; margin-right:0; }
        .reg-card-inner { display:flex; align-items:flex-start; gap:11px; }
        .reg-ico   { width:34px; height:34px; border-radius:9px; background:rgba(9,48,36,0.04); border:1px dashed rgba(9,48,36,0.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:15px; }
        .reg-title { font-family:'Helvetica Neue','Helvetica',Arial,sans-serif; font-size:12.5px; font-weight:700; color:#111; margin:0 0 3px; }
        .reg-desc  { font-family:'Helvetica Neue','Helvetica',Arial,sans-serif; font-size:11.5px; color:#555; line-height:1.55; margin:0; }

        .disc-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .disc-card { background:#fff; border-radius:16px; padding:26px; border:1px solid rgba(0,0,0,0.52); transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s; }
        .disc-card:hover { box-shadow: 0 10px 32px rgba(9,48,36,0.12); transform: translateY(-3px); border-color: rgba(9,48,36,0.3); }

        @keyframes floatSpotlight {
          0%   { background-position: 50% 50%; }
          25%  { background-position: 80% 20%; }
          50%  { background-position: 20% 80%; }
          75%  { background-position: 80% 80%; }
          100% { background-position: 50% 50%; }
        }
        .spot-card { position:relative; overflow:hidden; --mouse-x:50%; --mouse-y:50%; }
        .spot-card::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background: radial-gradient(circle at center, var(--spot-color, rgba(9,48,36,0.12)) 0%, transparent 70%);
          background-size: 200% 200%;
          background-position: 50% 50%;
          opacity: 0.85;
          animation: floatSpotlight 15s ease-in-out infinite;
          animation-delay: inherit;
          transition: opacity .5s ease;
        }
        .spot-card:hover::before, .spot-card:focus-within::before {
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spot-color, rgba(9,48,36,0.12)), transparent 70%);
          background-size: 100% 100%;
          background-position: 0 0;
          animation: none;
          opacity: 1;
        }
        .spot-card-content { position:relative; z-index:1; }

        /* section heading centering */
        .sec-heading { text-align:center; margin-bottom:48px; }
        .sec-heading .lbl { margin-bottom:12px; }
        .sec-heading h2 {
          font-family:'Helvetica Neue','Helvetica',Arial,sans-serif;
          font-size:clamp(22px,3vw,36px);
          font-weight:800;
          color:#111;
          line-height:1.1;
          letter-spacing:-0.025em;
          margin:0 0 12px;
        }
        .sec-heading p {
          font-family:'Helvetica Neue','Helvetica',Arial,sans-serif;
          font-size:14px;
          color:#555;
          line-height:1.72;
          margin:0 auto;
          max-width:480px;
        }

        @media(max-width:960px){
          .hero-g,.wwe,.team-g { grid-template-columns:1fr!important; gap:40px!important; }
          .wwe-sticky { position:static!important; }
          .wwe { padding:64px 28px!important; }
          .disc-grid { grid-template-columns:1fr!important; }
          .team-card-grid { grid-template-columns:1fr!important; }
          .team-card-inner { grid-template-columns:160px 1fr!important; }
        }
        @media(max-width:720px){
          .reg-strip { flex-direction:column; gap:16px; }
          .reg-card  { border-right:none; padding:0 0 14px; margin:0; border-bottom:1px solid rgba(0,0,0,.09); }
          .reg-card:last-child { border-bottom:none; padding-bottom:0; }
          .team-card-inner { grid-template-columns:1fr!important; }
          .team-card-inner > div:first-child { height:220px!important; width:100%!important; min-height:unset!important; }
        }
        @media(max-width:540px){
          .wwe { padding:56px 18px!important; }
          .sec { padding-left:18px!important; padding-right:18px!important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{ background: '#f5f5f0', padding: '96px 56px 88px', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="hero-g" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <Fade>
              <span className="lbl" style={{ marginBottom: 22 }}>About India Company Setup</span>
              <h1 style={{ fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.033em', margin: '0 0 22px', fontFamily: F }}>
                <span style={{ color: GREEN }}>Big 4 expertise. Independent firm.</span>{' '}
                <em style={{ color: GOLD, fontStyle: 'italic', fontWeight: 800 }}>Built for your scale.</em>
              </h1>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.78, maxWidth: 520, margin: '0 0 36px', fontFamily: F }}>
                India Company Setup, a venture of <strong style={{ color: '#111', fontWeight: 700 }}>Divsam Consultants LLP</strong>, was built on a simple premise: the best international tax advisory should not be reserved for companies that can afford Big 4 fees.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="lime-btn" onClick={() => window.location.href = (ROUTES.contact || '/contact')}>Talk to our team →</button>
              </div>
            </Fade>
            <Fade delay={120}><HeroStats /></Fade>
          </div>
        </div>
      </section>

      {/* ══ TRUSTED BY ══ */}
      <section style={{ padding: '56px 0', background: '#fff', fontFamily: F }}>
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

      {/* ══ MEET THE TEAM ══ */}
      <section style={{ padding: '88px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,.07)', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SH green="The people behind" gold="your India entry." mb={14} />
              <p style={{ fontFamily: F, fontSize: 14.5, color: '#555', lineHeight: 1.72, margin: '0 auto', maxWidth: 480 }}>
                CA · CS · Accountants · Legal — one full-service advisory team for every stage of your India journey.
              </p>
            </div>
          </Fade>

          {/* Two cards stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Pankaj */}
            <TeamCard
              photo="/pankajgupta.jpeg"
              name="Pankaj Gupta"
              liUrl="https://www.linkedin.com/in/pankaj-gupta-7199282a/"
              role="Senior Advisor · FCA"
              accent={GREEN}
              delay={0}
              bio="Over 8 years at a Big-4 practice and more than 18 years of working experience. Specialises in cross-border tax structuring, transfer pricing, FEMA, and NRI/HNI advisory. Leads a multi-disciplinary team of CAs, CS, and legal professionals."
            />

            {/* Anuradha */}
            <TeamCard
              photo="/anuradha_gupta.png"
              name="Anuradha R."
              liUrl="https://www.linkedin.com/in/anuradha-gupta-6673a3142/"
              role="Senior Advisor · CA"
              accent="#c8870a"
              delay={120}
              bio="Placeholder bio — experienced advisor specialising in compliance, GST, and financial reporting. Add Anuradha's details here."
            />

          </div>
        </div>
      </section>

      {/* ══ WHY WE EXIST ══ */}
      <div style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,.07)', padding: '88px 56px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Fade>
            <SH eyebrow="Why we exist" green="Built because the best advice" gold="was being wasted." mb={0} />
          </Fade>
        </div>
      </div>
      <div style={{ background: '#fff' }}>
        <div className="wwe" style={{ borderTop: 'none', paddingTop: 28 }}>
          <div className="wwe-sticky">
            <Fade>
              <p className="wwe-p">For years, the people who now lead this practice sat inside Big Four advisory rooms, watching the same pattern repeat: a foreign company would arrive with real capital and a real deadline, and get routed to whichever associate had a free afternoon.</p>
              <p className="wwe-p">We built India Company Setup to remove that layer entirely. Every engagement — from the first structuring call to the fifth year of GST filings — runs through the same small, senior team.</p>
              <p className="wwe-p" style={{ marginBottom: 0 }}>Today that model has taken more than a hundred companies through incorporation and into steady-state compliance, across five continents and ninety-plus treaty jurisdictions.</p>
            </Fade>
          </div>
          <Fade delay={80}><WhyVisual /></Fade>
        </div>

        {/* ══ OUR STRUCTURE ══ */}
        <div style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,.07)', padding: '88px 56px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Fade>
              <SH eyebrow="Our structure" green="Who you're actually" gold="contracting with." mb={0} />
            </Fade>
          </div>
        </div>
        <div className="wwe" style={{ borderTop: 'none', paddingTop: 28 }}>
          <Fade delay={80}><StructureAnimation /></Fade>
          <div className="wwe-sticky">
            <Fade>
              <p className="wwe-p">India Company Setup is the market-facing brand for foreign-entry advisory work. The engagement itself is contracted through Divsam Consultants LLP, the ICAI-registered practice that carries professional liability insurance and signs every engagement letter.</p>
              <p className="wwe-p">For statutory audit and select high-volume compliance work, we engage PGA & Co., Chartered Accountants as a formal knowledge partner — named on the relevant deliverables, never a silent subcontractor.</p>
              <p className="wwe-p" style={{ marginBottom: 0 }}>One point of contact, one engagement letter, full transparency on who signs what.</p>
            </Fade>
          </div>
        </div>
      </div>

      {/* ══ FOUR DISCIPLINES ══ */}
      <section style={{ padding: '88px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,.07)', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Fade>
            <SH green="Four disciplines." gold="One integrated team." mb={48} />
          </Fade>
          <div className="disc-grid">
            {[
              { num: '01', title: 'International Tax & Advisory', items: ['DTAA structuring & TRC advisory', 'Transfer pricing — design, benchmarking, Form 3CEB', 'PE risk assessment & FEMA compliance', 'Withholding tax optimisation'] },
              { num: '02', title: 'Company Secretary & MCA', items: ['Company incorporation & SPICe+ filing', 'FCGPR & FLA — RBI filings', 'Board resolutions & statutory registers', 'Annual ROC filings (MGT-7, AOC-4)'] },
              { num: '03', title: 'Accounts, GST & Payroll', items: ['Monthly bookkeeping & MIS reports', 'GST registration, returns & reconciliation', 'TDS computation & 26Q / 27Q returns', 'Payroll — PF, ESI, professional tax'] },
              { num: '04', title: 'Legal & Contracts', items: ['Shareholder & subscription agreements', 'Intercompany service agreements (MSA)', 'Employment contracts & ESOP plans', 'Regulatory advisory — SEBI, RBI, DPIIT'] },
            ].map((p, ci) => (
              <Fade key={p.num} delay={ci * 80}>
                <div className="disc-card spot-card" onMouseMove={handleSpotlight} style={{ '--spot-color': 'rgba(9,48,36,0.10)', animationDelay: `${ci * -3.5}s` }}>
                  <div className="spot-card-content">
                    <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#F5A828', display: 'block', marginBottom: 8 }}>{p.num}</span>
                    <h3 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: GREEN, margin: '0 0 14px', lineHeight: 1.2 }}>{p.title}</h3>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {p.items.map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 9 }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F5A828', flexShrink: 0, marginTop: 7 }} />
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
      <section style={{ padding: '88px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,.07)', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Fade>
            <SH green="Registrations &amp;" gold="memberships." mb={48} />
          </Fade>
          <Fade>
            <div className="reg-strip">
              {[
                { title: 'MCA / LLP Identification', desc: 'LLPIN [XXXXXXXXXXX], Ministry of Corporate Affairs, Government of India.' },
                { title: 'ICSI Membership', desc: 'CS team members hold active membership with the Institute of Company Secretaries of India.' },
                { title: 'Data Handling', desc: 'Client documents handled under a written confidentiality policy. Full statement available on request.' },
                { title: 'Professional Indemnity', desc: 'Engagements covered under professional liability insurance. Details available on request.' },
              ].map(item => (
                <div key={item.title} className="reg-card">
                  <div className="reg-card-inner">
                    <div className="reg-ico" />
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