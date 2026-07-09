'use client';

import { useEffect, useRef, useState } from 'react';

const F = "'Helvetica Neue','Helvetica',Arial,sans-serif";
const BDR = "1px solid rgba(0,0,0,0.52)";
const GLASS = "rgba(255,255,255,0.28)";
const BLUR = "blur(16px)";
const GREEN = "#093024";

const LOGOS_ROW1 = ['Protiviti India', 'Mahindra Defence Systems', 'Saregama India', 'Ethos Limited', 'Polyplex Corporation Limited (Listed)', 'Damco soft', 'Tube Investment of India', 'Vibracoustic India Private Limited', 'Newtech Filter (BOSCH group Company)', 'Godrej, UAE entities', 'Ognibene power', 'Cloud EQ'];
const LOGOS_ROW2 = ['Defacto Infotech India, AU, US', 'CrimsonInsights', 'Alleshealth', 'Foodjam', 'Grid advertising', 'Talink', 'Mcube capital', 'SML Mahindra Limited', 'Cheema Boilers Limited', 'AWFIS India Private Limited', 'Skin elements', 'Vyra Life (Modebencura)'];

/* ── scroll-reveal ── */
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

/* ── LinkedIn icon ── */
const LI = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#0077b5" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ── Spotlight hover effect (same mechanic as the tools-page SpotlightCard) ──
   Tracks the cursor over any element with className "spot-card" and drives
   the --mouse-x / --mouse-y custom properties consumed by the .spot-card::before
   radial-gradient defined in the <style> block below. */
const handleSpotlight = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

/* ── Hero right: animated glass stats ── */
const STATS = [
  { n: '100+', label: 'Companies incorporated', sub: 'Across 5 continents' },
  { n: '18+', label: 'Years in practice', sub: 'Ex-Big 4 led team' },
  { n: '90+', label: 'Treaty jurisdictions', sub: 'DTAA & TP coverage' },
  { n: 'Zero', label: 'Audits lost', sub: '100% clean record' },
];

function HeroStats() {
  const secRef = useRef(null);
  const [secVis, setSecVis] = useState(false);

  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSecVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div ref={secRef} style={{ background: GLASS, backdropFilter: BLUR, WebkitBackdropFilter: BLUR, border: BDR, borderRadius: 20, padding: '10px 10px', fontFamily: F, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {STATS.map((s, i) => (
        <div
          key={s.label}
          style={{
            padding: '26px 22px',
            borderRight: i % 2 === 0 ? '1px solid rgba(0,0,0,0.09)' : 'none',
            borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.09)' : 'none',
            opacity: secVis ? 1 : 0,
            transform: secVis ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity .5s ease ${i * 90}ms, transform .5s ease ${i * 90}ms`,
          }}
        >
          <div style={{ fontSize: 'clamp(30px,3.4vw,42px)', fontWeight: 800, color: GREEN, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 8, fontFamily: F }}>{s.n}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 3, fontFamily: F, lineHeight: 1.3 }}>{s.label}</div>
          <div style={{ fontSize: 11.5, color: '#888', fontFamily: F }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Why chips ── */
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
    <div
      className="spot-card"
      onMouseMove={handleSpotlight}
      style={{ background: GREEN, borderRadius: 24, padding: '40px 36px', position: 'relative', overflow: 'hidden', fontFamily: F, '--spot-color': 'rgba(245,168,40,0.28)' }}
    >
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

/* ── Structure animated ── */
function StructureAnimation() {
  const ITEMS = [
    { letter: 'I', name: 'India Company Setup', role: 'Market-facing brand', detail: 'Your single point of contact for all foreign-entry advisory', accent: '#6d4fd1', bg: 'rgba(109,79,209,0.08)' },
    { letter: 'D', name: 'Divsam Consultants LLP', role: 'Primary contracting entity', detail: 'ICAI-registered · Carries PI insurance · Signs all engagement letters', accent: GREEN, bg: 'rgba(9,48,36,0.08)' },
    { letter: 'P', name: 'PGA & Co., CA', role: 'Knowledge partner', detail: 'Named on deliverables · Statutory audit · High-volume compliance', accent: '#b08d2a', bg: 'rgba(245,168,40,0.08)' },
  ];
  const secRef = useRef(null);
  const [secVis, setSecVis] = useState(false);

  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSecVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div ref={secRef} style={{ fontFamily: F, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {ITEMS.map((item, i) => (
        <div
          key={item.letter}
          className="spot-card"
          onMouseMove={handleSpotlight}
          style={{
            display: 'flex', gap: 16, padding: '22px 22px', borderRadius: 16,
            border: '1px solid ' + item.accent + '30', background: item.bg,
            '--spot-color': item.accent + '30',
            opacity: secVis ? 1 : 0,
            transform: secVis ? 'translateY(0)' : 'translateY(14px)',
            transition: `opacity .5s ease ${i * 100}ms, transform .5s ease ${i * 100}ms`,
          }}
        >
          <div className="spot-card-content" style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: '#fff', border: '2px solid ' + item.accent + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: item.accent, fontFamily: F, flexShrink: 0 }}>
              {item.letter}
            </div>
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

export default function AboutPage({ T = {}, ROUTES = {} }) {
  return (
    <>
      <style>{`
        * { box-sizing:border-box; }
        @keyframes statIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .lbl { font-size:10.5px; letter-spacing:2px; text-transform:uppercase; font-weight:600; color:#aaa; font-family:${F}; display:block; }

        /* logo scroll */
        @keyframes scroll-left  { from{transform:translateX(0)}  to{transform:translateX(-50%)} }
        @keyframes scroll-right { from{transform:translateX(-50%)} to{transform:translateX(0)}  }
        .logo-l { display:flex; width:max-content; animation:scroll-left  38s linear infinite; }
        .logo-r { display:flex; width:max-content; animation:scroll-right 38s linear infinite; }
        .logo-l:hover,.logo-r:hover { animation-play-state:paused; }
        .logo-item { flex-shrink:0; width:155px; height:64px; display:flex; align-items:center; justify-content:center; padding:0 18px; }
        .logo-item img { max-width:125px; max-height:44px; object-fit:contain; }
        .logo-fl { position:absolute; left:0; top:0; bottom:0; width:10%; background:linear-gradient(90deg,#fff,transparent); z-index:2; pointer-events:none; }
        .logo-fr { position:absolute; right:0; top:0; bottom:0; width:10%; background:linear-gradient(270deg,#fff,transparent); z-index:2; pointer-events:none; }

        .lime-btn { display:inline-flex; align-items:center; gap:8px; background:${GREEN}; color:#fff; font-family:${F}; font-size:15px; font-weight:700; padding:14px 28px; border-radius:6px; border:none; cursor:pointer; transition:background .2s,transform .15s; text-decoration:none; }
        .lime-btn:hover { background:#0a3d2c; transform:translateY(-1px); }

        /* wwe / structure */
        .wwe { max-width:1200px; margin:0 auto; padding:88px 56px; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; border-top:1px solid rgba(0,0,0,.07); }
        .wwe-sticky { position:sticky; top:100px; }
        .wwe-num { font-size:10px; font-weight:700; letter-spacing:.32em; text-transform:uppercase; color:#F5A828; display:flex; align-items:center; gap:8px; margin-bottom:16px; font-family:${F}; }
        .wwe-h2  { font-family:${F}; font-size:clamp(24px,3vw,38px); font-weight:800; color:#111; line-height:1.1; letter-spacing:-0.025em; margin:0 0 18px; }
        .wwe-p   { font-family:${F}; font-size:14.5px; color:#555; line-height:1.82; margin:0 0 14px; }

        /* reg */
        .reg-strip { border-radius:16px; border:${BDR}; padding:22px 26px; display:flex; gap:0; align-items:stretch; margin-bottom:14px; }
        .reg-card  { flex:1; padding:0 22px 0 0; margin-right:22px; border-right:1px solid rgba(0,0,0,.10); }
        .reg-card:last-child { border-right:none; padding-right:0; margin-right:0; }
        .reg-card-inner { display:flex; align-items:flex-start; gap:11px; }
        .reg-ico   { width:34px; height:34px; border-radius:9px; background:rgba(9,48,36,0.04); border:1px dashed rgba(9,48,36,0.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:15px; }
        .reg-title { font-family:${F}; font-size:12.5px; font-weight:700; color:#111; margin:0 0 3px; }
        .reg-desc  { font-family:${F}; font-size:11.5px; color:#555; line-height:1.55; margin:0; }

        /* disc */
        .disc-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .disc-card { background:#fff; border-radius:16px; padding:26px; border:${BDR}; }

        /* spotlight hover effect — same mechanic as tools-page SpotlightCard */
        .spot-card { position:relative; overflow:hidden; --mouse-x:50%; --mouse-y:50%; }
        .spot-card::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spot-color, rgba(9,48,36,0.12)), transparent 70%);
          opacity:0; transition:opacity .5s ease;
        }
        .spot-card:hover::before, .spot-card:focus-within::before { opacity:1; }
        .spot-card-content { position:relative; z-index:1; }

        /* team photo row */
        .team-row { display:flex; gap:16px; overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none; }
        .team-row::-webkit-scrollbar { display:none; }

        /* responsive */
        @media(max-width:960px){
          .hero-g,.wwe,.team-g { grid-template-columns:1fr!important; gap:40px!important; }
          .wwe-sticky { position:static!important; }
          .wwe { padding:64px 28px!important; }
          .disc-grid { grid-template-columns:1fr!important; }
        }
        @media(max-width:720px){
          .reg-strip { flex-direction:column; gap:16px; }
          .reg-card  { border-right:none; padding:0 0 14px; margin:0; border-bottom:1px solid rgba(0,0,0,.09); }
          .reg-card:last-child { border-bottom:none; padding-bottom:0; }
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
              <h1 style={{ fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.033em', color: '#111', margin: '0 0 22px', fontFamily: F }}>
                Big 4 expertise.{' '}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  Independent
                  {/* underline in #093024 */}
                  <span style={{ position: 'absolute', left: 0, bottom: '-4px', width: '100%', height: '5px', background: GREEN, borderRadius: 2 }} />
                </span>{' '}
                firm. Built for your scale.
              </h1>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.78, maxWidth: 520, margin: '0 0 36px', fontFamily: F }}>
                India Company Setup, a venture of <strong style={{ color: '#111', fontWeight: 700 }}>Divsam Consultants LLP</strong>, was built on a simple premise: the best international tax advisory should not be reserved for companies that can afford Big 4 fees.
              </p>
              {/* #093024 button */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="lime-btn" onClick={() => window.location.href = (ROUTES.contact || '/contact')}>Talk to our team →</button>
              </div>
            </Fade>

            {/* Right — animated glass stats */}
            <Fade delay={120}><HeroStats /></Fade>
          </div>
        </div>
      </section>

      {/* ══ TRUSTED BY — dual rows ══ */}
      <section style={{ padding: '56px 0', background: '#fff', fontFamily: F }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: 26 }}>
            <span className="lbl" style={{ color: '#bbb' }}>Trusted by 100+ companies worldwide</span>
            <div style={{ width: 32, height: 2, background: '#111', borderRadius: 2, margin: '8px auto 0' }} />
          </div>
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
      <section style={{ padding: '80px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,.07)', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Centred heading */}
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="lbl" style={{ marginBottom: 12, display: 'block' }}>The Pod</span>
              <h2 style={{ fontFamily: F, fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: '#111', lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 12px' }}>The people behind your India entry.</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: '#555', lineHeight: 1.72, margin: '0 auto', maxWidth: 440 }}>CA · CS · Accountants · Legal — one full-service advisory team for every stage of your India journey.</p>
            </div>
          </Fade>

          {/* Single row — all 5 members */}
          <Fade delay={80}>
            <div style={{ display: 'flex', gap: 20, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', justifyContent: 'center', flexWrap: 'wrap' }}>

              {/* Pankaj — big with photo */}
              <div style={{ flexShrink: 0, width: 190 }}>
                <div style={{ width: 190, height: 230, borderRadius: 16, overflow: 'hidden', background: '#EDEFF4', marginBottom: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <img src="/pankajgupta.jpeg" alt="Pankaj Gupta" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                </div>
                <a href="https://www.linkedin.com/in/pankaj-gupta-7199282a/" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#111', display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none', transition: 'color .15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = GREEN} onMouseLeave={e => e.currentTarget.style.color = '#111'}>
                  Pankaj Gupta <LI />
                </a>
                <p style={{ fontFamily: F, fontSize: 11.5, color: '#777', marginTop: 2 }}>Senior Advisor · FCA</p>
              </div>

              {/* Anuradha — big with photo */}
              <div style={{ flexShrink: 0, width: 190 }}>
                <div style={{ width: 190, height: 230, borderRadius: 16, overflow: 'hidden', background: '#EDEFF4', marginBottom: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <img src="/anuradha_gupta.png" alt="Anuradha R." style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                </div>
                <a href="https://www.linkedin.com/in/anuradha-gupta-6673a3142/" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#111', display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none', transition: 'color .15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = GREEN} onMouseLeave={e => e.currentTarget.style.color = '#111'}>
                  Anuradha R. <LI />
                </a>
                <p style={{ fontFamily: F, fontSize: 11.5, color: '#777', marginTop: 2 }}>Senior Advisor · CA</p>
              </div>

              {/* CS, CA, LG — same size, placeholder initials */}
              {[
                ['CS', 'Company Secretary', 'CS · ICSI'],
                ['CA', 'Accounts & GST Lead', 'CA · B.Com'],
                ['LG', 'Legal & Contracts', 'LLB'],
              ].map(([init, name, role]) => (
                <div key={init} style={{ flexShrink: 0, width: 190 }}>
                  <div style={{ width: 190, height: 230, borderRadius: 16, overflow: 'hidden', background: '#EDEFF4', marginBottom: 12 }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg,#EDEFF4,#e0e4ee)', fontFamily: F, fontSize: 30, fontWeight: 800, color: GREEN }}>
                      {init}
                    </div>
                  </div>
                  <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#111', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    {name}
                  </div>
                  <p style={{ fontFamily: F, fontSize: 11.5, color: '#777', marginTop: 2 }}>{role}</p>
                </div>
              ))}

            </div>
          </Fade>
        </div>
      </section>

      {/* ══ WHY WE EXIST ══ */}
      <div style={{ background: '#fff' }}>
        <div className="wwe">
          <div className="wwe-sticky">
            <Fade>
              <div className="wwe-num"><span>01</span><div style={{ width: 18, height: 1.5, background: '#F5A828', borderRadius: 2 }} /><span>Why we exist</span></div>
              <h2 className="wwe-h2">Built because the best advice was being wasted.</h2>
              <p className="wwe-p">For years, the people who now lead this practice sat inside Big Four advisory rooms, watching the same pattern repeat: a foreign company would arrive with real capital and a real deadline, and get routed to whichever associate had a free afternoon.</p>
              <p className="wwe-p">We built India Company Setup to remove that layer entirely. Every engagement — from the first structuring call to the fifth year of GST filings — runs through the same small, senior team.</p>
              <p className="wwe-p" style={{ marginBottom: 0 }}>Today that model has taken more than a hundred companies through incorporation and into steady-state compliance, across five continents and ninety-plus treaty jurisdictions.</p>
            </Fade>
          </div>
          <Fade delay={80}><WhyVisual /></Fade>
        </div>

        {/* ══ OUR STRUCTURE ══ */}
        <div className="wwe">
          <Fade delay={80}><StructureAnimation /></Fade>
          <div className="wwe-sticky">
            <Fade>
              <div className="wwe-num"><span>02</span><div style={{ width: 18, height: 1.5, background: '#F5A828', borderRadius: 2 }} /><span>Our structure</span></div>
              <h2 className="wwe-h2">Who you're actually contracting with.</h2>
              <p className="wwe-p">India Company Setup is the market-facing brand for foreign-entry advisory work. The engagement itself is contracted through Divsam Consultants LLP, the ICAI-registered practice that carries professional liability insurance and signs every engagement letter.</p>
              <p className="wwe-p">For statutory audit and select high-volume compliance work, we engage PGA & Co., Chartered Accountants as a formal knowledge partner — named on the relevant deliverables, never a silent subcontractor.</p>
              <p className="wwe-p" style={{ marginBottom: 0 }}>One point of contact, one engagement letter, full transparency on who signs what.</p>
            </Fade>
          </div>
        </div>
      </div>

      {/* ══ FOUR DISCIPLINES — no "Our Services" heading, just the h2 ══ */}
      <section style={{ padding: '88px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,.07)', fontFamily: F }} className="sec">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Fade>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#111', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 44px' }}>
              Four disciplines.<br />One integrated team.
            </h2>
          </Fade>
          <div className="disc-grid">
            {[
              { num: '01', title: 'International Tax & Advisory', items: ['DTAA structuring & TRC advisory', 'Transfer pricing — design, benchmarking, Form 3CEB', 'PE risk assessment & FEMA compliance', 'Withholding tax optimisation'] },
              { num: '02', title: 'Company Secretary & MCA', items: ['Company incorporation & SPICe+ filing', 'FCGPR & FLA — RBI filings', 'Board resolutions & statutory registers', 'Annual ROC filings (MGT-7, AOC-4)'] },
              { num: '03', title: 'Accounts, GST & Payroll', items: ['Monthly bookkeeping & MIS reports', 'GST registration, returns & reconciliation', 'TDS computation & 26Q / 27Q returns', 'Payroll — PF, ESI, professional tax'] },
              { num: '04', title: 'Legal & Contracts', items: ['Shareholder & subscription agreements', 'Intercompany service agreements (MSA)', 'Employment contracts & ESOP plans', 'Regulatory advisory — SEBI, RBI, DPIIT'] },
            ].map((p, ci) => (
              <Fade key={p.num} delay={ci * 80}>
                <div
                  className="disc-card spot-card"
                  onMouseMove={handleSpotlight}
                  style={{ '--spot-color': 'rgba(9,48,36,0.10)' }}
                >
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
            <h2 style={{ fontFamily: F, fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: '#111', letterSpacing: '-0.025em', margin: '0 0 32px' }}>Registrations &amp; memberships</h2>
          </Fade>
          {[
            [
              { title: 'ICAI Firm Registration', desc: 'Divsam Consultants LLP — Reg. No. [XXXXXXX], Institute of Chartered Accountants of India.' },
              { title: 'MCA / LLP Identification', desc: 'LLPIN [XXXXXXXXXXX], Ministry of Corporate Affairs, Government of India.' },
              { title: 'GST Registration', desc: 'GSTIN [XXXXXXXXXXXXXXX], issued for consulting and advisory services.' },
            ],
            [
              { title: 'ICSI Membership', desc: 'CS team members hold active membership with the Institute of Company Secretaries of India.' },
              { title: 'Data Handling', desc: 'Client documents handled under a written confidentiality policy. Full statement available on request.' },
              { title: 'Professional Indemnity', desc: 'Engagements covered under professional liability insurance. Details available on request.' },
            ],
          ].map((strip, si) => (
            <Fade key={si} delay={si * 80}>
              <div className="reg-strip">
                {strip.map(item => (
                  <div
                    key={item.title}
                    className="reg-card spot-card"
                    onMouseMove={handleSpotlight}
                    style={{ '--spot-color': 'rgba(9,48,36,0.08)' }}
                  >
                    <div className="reg-card-inner spot-card-content">
                      <div className="reg-ico" />
                      <div><p className="reg-title">{item.title}</p><p className="reg-desc">{item.desc}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          ))}
        </div>
      </section>
    </>
  );
}