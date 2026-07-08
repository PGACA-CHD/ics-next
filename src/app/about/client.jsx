'use client';

import { useEffect, useRef, useState } from 'react';

const F = "'Helvetica Neue','Helvetica',Arial,sans-serif";
const defaultTheme = { ivory: '#f8f8ff', mid: '#333333', s: '#000000' };

/* ── Floating card for hero ── */
function FloatCard({ id, baseRot, amp, speed, phase, isCx, children, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const tick = t => {
      const y = Math.sin(t / speed + phase) * amp;
      const r = baseRot + Math.sin(t / (speed * 1.3) + phase) * 0.6;
      el.style.transform = isCx
        ? `translateX(-50%) translateY(${y}px) rotate(${r}deg)`
        : `translateY(${y}px) rotate(${r}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div ref={ref} id={id} style={{
      position: 'absolute',
      background: 'linear-gradient(145deg,#ffffff 0%,#f6f4ff 100%)',
      borderRadius: 22,
      boxShadow: '0 20px 56px rgba(100,70,200,0.14), 0 4px 14px rgba(100,70,200,0.07)',
      border: '1px solid rgba(255,255,255,0.95)',
      willChange: 'transform', fontFamily: F, ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Why we exist visual — chips reveal one by one, loop ── */
function WhyVisual() {
  const CHIPS = [
    'Partner-led from day one to year five',
    'No junior hand-offs mid-engagement',
    'Same team for incorporation and Year 5 GST filing',
  ];
  const [visible, setVisible] = useState([false, false, false]);
  const timers = useRef([]);

  const runLoop = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setVisible([false, false, false]);
    const t1 = setTimeout(() => setVisible([true, false, false]), 120);
    const t2 = setTimeout(() => setVisible([true, true, false]), 620);
    const t3 = setTimeout(() => setVisible([true, true, true]), 1120);
    // hold 2.5s then reset
    const t4 = setTimeout(() => {
      setVisible([false, false, false]);
      setTimeout(runLoop, 200);
    }, 3800);
    timers.current = [t1, t2, t3, t4];
  };

  useEffect(() => {
    runLoop();
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ background: '#0B3D2E', borderRadius: 24, padding: '40px 36px', position: 'relative', overflow: 'hidden', fontFamily: F }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,168,40,0.14),transparent 70%)', pointerEvents: 'none' }} />
      <p style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#F5A828', marginBottom: 22, position: 'relative', zIndex: 1 }}>The founding principle</p>
      <blockquote style={{ fontFamily: F, fontSize: 'clamp(17px,2vw,22px)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.5, margin: '0 0 32px', position: 'relative', zIndex: 1 }}>
        "The technical answer is rarely the hard part of entering a new market. Staying accountable for it, eighteen months after the invoice is paid, is."
      </blockquote>

      {/* One-by-one animated chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
        {CHIPS.map((t, i) => (
          <div key={t} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? 'translateY(0px)' : 'translateY(10px)',
            transition: 'opacity 0.42s ease, transform 0.42s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', background: 'rgba(245,168,40,0.15)', border: '1px solid rgba(245,168,40,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
              transform: visible[i] ? 'scale(1)' : 'scale(0.5)',
              transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)',
              transitionDelay: visible[i] ? '0.05s' : '0s',
            }}>
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

/* ── Our structure visual ── */
function StructureVisual() {
  const cards = [
    { letter: 'I', name: 'India Company Setup', role: 'Market-facing brand', detail: 'Your single point of contact for all foreign-entry advisory', accent: '#6d4fd1', bg: 'rgba(109,79,209,0.08)' },
    { letter: 'D', name: 'Divsam Consultants LLP', role: 'Primary contracting entity', detail: 'ICAI-registered · Carries PI insurance · Signs all engagement letters', accent: '#0B3D2E', bg: 'rgba(11,61,46,0.07)' },
    { letter: 'P', name: 'PGA & Co., CA', role: 'Knowledge partner', detail: 'Named on deliverables · Statutory audit · High-volume compliance', accent: '#b08d2a', bg: 'rgba(245,168,40,0.08)' },
  ];
  const refs = [useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    let raf;
    const tick = t => { refs.forEach((r, i) => { if (r.current) r.current.style.transform = `translateY(${Math.sin(t / 3000 + i * 1.4) * 5}px)`; }); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, fontFamily: F }}>
      {cards.map((c, i) => (
        <div key={c.name}>
          {i > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px' }}>
              <div style={{ flex: 1, height: 1, background: '#e0dcd4' }} />
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c0b8a8' }}>{i === 1 ? 'contracted through' : 'supported by'}</span>
              <div style={{ flex: 1, height: 1, background: '#e0dcd4' }} />
            </div>
          )}
          <div ref={refs[i]} style={{ background: '#fff', border: '1px solid #1a1510', borderRadius: 16, padding: '20px', display: 'flex', gap: 14, alignItems: 'flex-start', willChange: 'transform', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: c.bg, border: `1.5px solid ${c.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontSize: 18, fontWeight: 800, color: c.accent, flexShrink: 0 }}>{c.letter}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: '#1a1510', marginBottom: 2 }}>{c.name}</p>
              <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9a9082', marginBottom: 6 }}>{c.role}</p>
              <p style={{ fontFamily: F, fontSize: 12.5, color: '#5a5248', lineHeight: 1.55 }}>{c.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Team member card ── */
const TEAM = [
  {
    initials: 'PG',
    name: 'Pankaj Gupta',
    role: 'Senior Advisor',
    hasPhoto: true,
    photoSrc: '/team/pankaj.jpg',
    desc: 'FCA · Diploma in International Taxation · 9 years Ex-Big 4. Leads international tax, transfer pricing, and FEMA compliance.',
    tags: ['FCA', "Int'l Tax Diploma", 'Ex-Big 4'],
    accent: '#0B3D2E',
    accentBg: 'rgba(11,61,46,0.08)',
  },
  {
    initials: 'AR',
    name: 'Anuradha R.',
    role: 'Senior Advisor',
    hasPhoto: true,
    photoSrc: '/team/anuradha.jpg',
    desc: 'CA · Senior advisor handling cross-border structuring, DTAA planning, and inbound investment compliance for foreign entities.',
    tags: ['FCA', 'ICAI', 'DTAA Specialist'],
    accent: '#6d4fd1',
    accentBg: 'rgba(109,79,209,0.08)',
  },
  {
    initials: 'CS',
    name: 'Company Secretary',
    role: 'CS · ICSI Qualified',
    hasPhoto: false,
    desc: 'Handles all MCA filings, RBI/FCGPR submissions, board resolutions, and share issuance documentation.',
    tags: ['CS · ICSI', 'MCA & RBI', 'FEMA Filings'],
    accent: '#b08d2a',
    accentBg: 'rgba(245,168,40,0.08)',
  },
  {
    initials: 'CA',
    name: 'Accounts & GST Lead',
    role: 'CA · B.Com',
    hasPhoto: false,
    desc: 'Manages monthly bookkeeping, GST returns, payroll processing, and statutory audit coordination.',
    tags: ['CA · ICAI', 'GST & TDS', 'Payroll'],
    accent: '#0B3D2E',
    accentBg: 'rgba(11,61,46,0.08)',
  },
  {
    initials: 'LG',
    name: 'Legal & Contracts',
    role: 'LLB',
    hasPhoto: false,
    desc: 'Drafts and reviews shareholder agreements, intercompany MSAs, employment contracts, and ESOP plan documentation.',
    tags: ['LLB', 'Corporate Law', 'ESOP & Contracts'],
    accent: '#6d4fd1',
    accentBg: 'rgba(109,79,209,0.08)',
  },
];

function TeamCard({ member }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid #1a1510',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.10)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'; }}
    >
      {/* Photo / avatar area */}
      <div style={{
        background: member.hasPhoto ? '#f0eee8' : member.accentBg,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {member.hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photoSrc}
            alt={member.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        ) : (
          <>
            {/* Subtle pattern bg */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.04) 1px,transparent 1px)', backgroundSize: '16px 16px' }} />
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: member.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: F, fontSize: 24, fontWeight: 800, color: '#fff',
              position: 'relative', zIndex: 1,
              boxShadow: `0 8px 24px ${member.accent}40`,
            }}>
              {member.initials}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: member.accent, marginBottom: 4 }}>{member.role}</p>
          <p style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: '#1a1510', marginBottom: 0, lineHeight: 1.2 }}>{member.name}</p>
        </div>
        <p style={{ fontFamily: F, fontSize: 12.5, color: '#5a5248', lineHeight: 1.65, flex: 1 }}>{member.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 4 }}>
          {member.tags.map(t => (
            <span key={t} style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', padding: '3px 10px', borderRadius: 99, background: member.accentBg, color: member.accent, border: `1px solid ${member.accent}20` }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutHero({ T = defaultTheme, ROUTES = {} }) {
  return (
    <>
      {/* ═══════════ 1. HERO ═══════════ */}
      <section style={{ background: 'linear-gradient(150deg,#e8e4f7 0%,#dcd6f4 35%,#c8bfed 70%,#b9aee8 100%)', padding: 'clamp(72px,10vw,110px) clamp(20px,5vw,56px) 0', position: 'relative', overflow: 'hidden', fontFamily: F }}>
        <style>{`
          .ah-wrap{max-width:1160px;margin:0 auto;position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
          .ah-stage{position:relative;height:400px;}
          @media(max-width:960px){.ah-wrap{grid-template-columns:1fr;gap:36px;}.ah-stage{height:320px;}}
          @media(max-width:600px){.ah-stage{height:300px;}#ahfc1{width:138px!important;left:4px!important;}#ahfc2{width:190px!important;}#ahfc3{width:138px!important;right:4px!important;bottom:4px!important;}}
          /* why we exist sticky layout */
          .wwe-block{max-width:1160px;margin:0 auto;padding:56px 48px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;border-bottom:1px solid #E8E2D8;}
          .wwe-block:last-child{border-bottom:none;}
          .wwe-sticky{position:sticky;top:88px;}
          .wwe-block.flip{direction:rtl;}
          .wwe-block.flip>*{direction:ltr;}
          /* team grid */
          .team-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;}
          /* logo scroll */
          @keyframes logo-scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
          .logo-row-left{display:flex;width:max-content;align-items:center;animation:logo-scroll 36s linear infinite;}
          .logo-row-left:hover{animation-play-state:paused;}
          @media(max-width:1100px){.team-grid{grid-template-columns:repeat(3,1fr);}}
          @media(max-width:960px){
            .wwe-block{grid-template-columns:1fr;gap:40px;padding:56px 28px;}
            .wwe-sticky{position:static;}
            .wwe-block.flip{direction:ltr;}
          }
          @media(max-width:720px){.team-grid{grid-template-columns:repeat(2,1fr);}}
          @media(max-width:600px){
            .wwe-block{padding:56px 18px;gap:32px;}
            .team-grid{grid-template-columns:1fr 1fr;}
          }
          @media(max-width:420px){.team-grid{grid-template-columns:1fr;}}
        `}</style>

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 65% 55% at 85% 25%,rgba(255,255,255,0.22) 0%,transparent 60%)' }} />
        <div className="ah-wrap">
          <div className="reveal">
            <p style={{ fontFamily: F, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(60,30,120,0.55)', fontWeight: 700, marginBottom: 16 }}>About India Company Setup</p>
            <h1 style={{ fontFamily: F, fontSize: 'clamp(32px,4vw,54px)', fontWeight: 700, color: '#1a0e3d', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Big 4 expertise.<br />
              <span style={{ fontStyle: 'italic', color: '#6d4fd1', fontWeight: 500 }}>Independent firm.</span><br />
              Built for your scale.
            </h1>
            <p style={{ fontFamily: F, fontSize: 15, color: 'rgba(26,14,61,0.58)', lineHeight: 1.82, fontWeight: 400, maxWidth: 460, margin: 0 }}>
              India Company Setup, a venture of <strong style={{ color: '#1a0e3d', fontWeight: 600 }}>Divsam Consultants LLP</strong>, was built on a simple premise: the best international tax advisory should not be reserved for companies that can afford Big 4 fees. We are Chartered Accountants, Company Secretaries, and lawyers — Ex-Big 4 led — serving mid-market foreign companies entering India.
            </p>
          </div>
          <div className="ah-stage reveal">
            <FloatCard id="ahfc1" baseRot={-5} amp={7} speed={3200} phase={0} style={{ width: 158, left: 0, bottom: 24, padding: '20px 18px 22px' }}>
              <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a09ab8', marginBottom: 10 }}>Incorporated</p>
              <p style={{ fontFamily: F, fontSize: 46, fontWeight: 800, color: '#1a0e3d', lineHeight: 0.88, marginBottom: 6 }}>100+</p>
              <p style={{ fontFamily: F, fontSize: 11, color: '#6b6380', marginBottom: 16 }}>Companies formed</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[['#6d4fd1', 'Foreign Co.', '82%'], ['#a78bfa', 'JV / LLP', '18%']].map(([c, t, p]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: c, flexShrink: 0 }} />
                    <span style={{ fontFamily: F, fontSize: 10.5, color: '#4a4260', flex: 1 }}>{t}</span>
                    <span style={{ fontFamily: F, fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'rgba(109,79,209,0.10)', color: '#6d4fd1' }}>{p}</span>
                  </div>
                ))}
              </div>
            </FloatCard>
            <FloatCard id="ahfc2" baseRot={2} amp={5} speed={3900} phase={1.3} isCx style={{ width: 216, left: '50%', top: 10, padding: '20px 20px 18px' }}>
              <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a09ab8', marginBottom: 10 }}>Years in Practice</p>
              <p style={{ fontFamily: F, fontSize: 46, fontWeight: 800, color: '#1a0e3d', lineHeight: 0.88, marginBottom: 5 }}>18+</p>
              <p style={{ fontFamily: F, fontSize: 11, color: '#22c55e', fontWeight: 700, marginBottom: 16 }}>↑ Ex-Big 4 expertise</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 58 }}>
                {[['Tax', 26], ['Corp', 44], ['FEMA', 20], ['TP', 54], ['DTAA', 34], ['FDI', 58]].map(([m, h], i) => (
                  <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', height: h, borderRadius: '4px 4px 0 0', background: i === 5 ? '#6d4fd1' : i % 2 === 0 ? 'rgba(109,79,209,0.14)' : 'rgba(109,79,209,0.32)' }} />
                    <span style={{ fontFamily: F, fontSize: 7.5, color: '#b0a8c8' }}>{m}</span>
                  </div>
                ))}
              </div>
            </FloatCard>
            <FloatCard id="ahfc3" baseRot={4} amp={8} speed={2800} phase={2.5} style={{ width: 158, right: 0, bottom: 8, padding: '18px 16px 20px' }}>
              <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a09ab8', marginBottom: 10 }}>Our Clients</p>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
                {[['US', '#ede9fe'], ['GB', '#f5f3ff'], ['AE', '#eef2ff'], ['SG', '#f0fdf4']].map(([cc, bg]) => (
                  <span key={cc} style={{ fontFamily: F, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: bg, color: '#4a4260', letterSpacing: '0.04em' }}>{cc}</span>
                ))}
              </div>
              <p style={{ fontFamily: F, fontSize: 46, fontWeight: 800, color: '#1a0e3d', lineHeight: 0.88, marginBottom: 5 }}>5</p>
              <p style={{ fontFamily: F, fontSize: 11, color: '#6b6380', marginBottom: 13 }}>Continents served</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,0.10)', borderRadius: 99, padding: '4px 11px', border: '1px solid rgba(34,197,94,0.22)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontFamily: F, fontSize: 9.5, fontWeight: 700, color: '#16a34a' }}>0 audits lost</span>
              </div>
            </FloatCard>
          </div>
        </div>
      </section>

      {/* ── Intro statement ── */}
      {/* <section style={{ padding: '44px 0', background: T.ivory, textAlign: 'center' }}>
        <p style={{ fontFamily: F, fontSize: 'clamp(14px,2vw,18px)', color: '#0B3D2E', marginBottom: 24, maxWidth: 800, margin: '0 auto' }}>
          Most foreign companies enter India with the wrong structure and fix it at audit time. We design it right the first time — saving you 2–3× the cost in corrections.
        </p>
        <button onClick={() => window.location.href='/contact'} style={{ background: '#0B3D2E', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontFamily: F, fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
          Talk to our expert team
        </button>
      </section> */}

      {/* ── Logo strip ── */}
      <section style={{ padding: '44px 0', background: T.ivory }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontFamily: F, fontSize: 'clamp(11px,1.1vw,14px)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.mid, margin: 0 }}>Trusted by 100+ companies worldwide</p>
          <div style={{ width: 32, height: 2, background: T.s, borderRadius: 2, margin: '8px auto 0' }} />
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8%', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(90deg,#ffffff,transparent)' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8%', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(270deg,#ffffff,transparent)' }} />
          <div className="logo-row-left">
            {[...Array(2)].map((_, di) => (
              <div key={di} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {['Protiviti India', 'Mahindra Defence Systems', 'Saregama India', 'Ethos Limited', 'Polyplex Corporation Limited (Listed)', 'Kuantom Papers Limited', 'Tube Investment of India', 'Vibracoustic India Private Limited', 'Newtech Filter (BOSCH group Company)', 'Godrej, UAE entities', 'Ognibene power', 'Cloud EQ', 'Defacto Infotech India, AU, US', 'CrimsonInsights', 'Alleshealth', 'Foodjam', 'Grid advertising', 'Talink', 'Mcube capital', 'SML Mahindra Limited', 'Cheema Boilers Limited', 'AWFIS India Private Limited', 'Skin elements', 'Vyra Life (Modebencura)'].map(name => (
                  <div key={`${di}-${name}`} style={{ flexShrink: 0, width: 150, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/logos/${encodeURIComponent(name)}.png`} alt={name} style={{ maxWidth: 130, maxHeight: 50, width: 'auto', height: 'auto', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 3. WHY WE EXIST ═══════════ */}
      <section style={{ background: '#ffffff', fontFamily: F }}>
        <div className="wwe-block">
          <div className="wwe-sticky">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#F5A828' }}>01</span>
              <div style={{ width: 18, height: 1.5, background: '#F5A828', borderRadius: 2 }} />
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#F5A828' }}>Why we exist</span>
            </div>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(26px,3vw,42px)', fontWeight: 700, color: '#0B3D2E', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 26px' }}>Built because the best advice was being wasted.</h2>
            <p style={{ fontFamily: F, fontSize: 15, color: '#4a4438', lineHeight: 1.82, margin: '0 0 16px' }}>For years, the people who now lead this practice sat inside Big Four advisory rooms, watching the same pattern repeat: a foreign company would arrive with real capital and a real deadline, and get routed to whichever associate had a free afternoon.</p>
            <p style={{ fontFamily: F, fontSize: 15, color: '#4a4438', lineHeight: 1.82, margin: '0 0 16px' }}>We built India Company Setup to remove that layer entirely. Every engagement — from the first structuring call to the fifth year of GST filings — runs through the same small, senior team. No rotating juniors, no re-explaining your structure to someone new every quarter.</p>
            <p style={{ fontFamily: F, fontSize: 15, color: '#4a4438', lineHeight: 1.82, margin: 0 }}>Today that model has taken more than a hundred companies through incorporation and into steady-state compliance, across five continents and ninety-plus treaty jurisdictions.</p>
          </div>
          <WhyVisual />
        </div>

        {/* ═══════════ 4. OUR STRUCTURE ═══════════ */}
        <div className="wwe-block flip">
          <div className="wwe-sticky">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#F5A828' }}>02</span>
              <div style={{ width: 18, height: 1.5, background: '#F5A828', borderRadius: 2 }} />
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#F5A828' }}>Our structure</span>
            </div>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(26px,3vw,42px)', fontWeight: 700, color: '#0B3D2E', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 26px' }}>Who you're actually contracting with.</h2>
            <p style={{ fontFamily: F, fontSize: 15, color: '#4a4438', lineHeight: 1.82, margin: '0 0 16px' }}>India Company Setup is the market-facing brand for foreign-entry advisory work. The engagement itself is contracted through Divsam Consultants LLP, the ICAI-registered practice that carries professional liability insurance and signs every engagement letter.</p>
            <p style={{ fontFamily: F, fontSize: 15, color: '#4a4438', lineHeight: 1.82, margin: '0 0 16px' }}>For statutory audit and select high-volume compliance work, we engage PGA & Co., Chartered Accountants as a formal knowledge partner — named on the relevant deliverables, never a silent subcontractor.</p>
            <p style={{ fontFamily: F, fontSize: 15, color: '#4a4438', lineHeight: 1.82, margin: 0 }}>One point of contact, one engagement letter, full transparency on who signs what.</p>
          </div>
          <StructureVisual />
        </div>
      </section>

      {/* ═══════════ 5. MEET THE TEAM ═══════════ */}
      <section style={{ background: '#ffffff', padding: '56px clamp(20px,5vw,56px)', fontFamily: F }}>
        <style>{`
          .team-layout {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 64px;
            align-items: center;
          }
          .team-photos-row {
            display: flex;
            gap: 14px;
            overflow-x: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .team-photos-row::-webkit-scrollbar { display: none; }
          .team-member { flex: 0 0 auto; width: 170px; }
          .team-photo {
            width: 170px;
            height: 200px;
            border-radius: 14px;
            overflow: hidden;
            background: #EDEFF4;
            margin-bottom: 12px;
            position: relative;
          }
          .team-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
            display: block;
          }
          .team-photo-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(145deg,#EDEFF4,#e0e4ee);
          }
          .team-photo-initials {
            font-family: ${F};
            font-size: 32px;
            font-weight: 800;
            color: #0B3D2E;
          }
          .team-member-name a {
            font-family: ${F};
            font-size: 14px;
            font-weight: 700;
            color: #0B3D2E;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            transition: color 0.15s;
          }
          .team-member-name a:hover { color: #F5A828; }
          .team-member-role {
            font-family: ${F};
            font-size: 12px;
            color: #7a7060;
            margin-top: 3px;
          }
          @media (max-width: 960px) {
            .team-layout { grid-template-columns: 1fr; gap: 40px; }
          }
          @media (max-width: 600px) {
            .team-member { width: 140px; }
            .team-photo { width: 140px; height: 168px; }
          }
        `}</style>

        <div className="team-layout">

          {/* Left: text */}
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#0B3D2E', color: '#fff', borderRadius: 999, padding: '5px 14px', fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              The Pod
            </span>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(26px,3.5vw,46px)', fontWeight: 700, color: '#0B3D2E', lineHeight: 1.08, letterSpacing: '-0.025em', margin: '0 0 20px' }}>
              The people behind your India entry.
            </h2>
            <p style={{ fontFamily: F, fontSize: 15, color: '#5a5248', lineHeight: 1.72, margin: '0 0 32px' }}>
              CA · CS · Accountants · Legal — one full-service advisory team for every stage of your India journey.
            </p>
          </div>

          {/* Right: photos row */}
          <div className="team-photos-row">

            {/* Pankaj — has photo */}
            <div className="team-member">
              <div className="team-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pankajgupta.jpeg" alt="Pankaj Gupta" />
              </div>
              <div className="team-member-name">
                <a href="https://www.linkedin.com/in/pankaj-gupta" target="_blank" rel="noopener noreferrer">
                  Pankaj Gupta
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </a>
              </div>
              <p className="team-member-role">Senior Advisor · FCA</p>
            </div>

            {/* Anuradha — has photo */}
            <div className="team-member">
              <div className="team-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/anuradha_gupta.png" alt="Anuradha R." />
              </div>
              <div className="team-member-name">
                <a href="https://www.linkedin.com/in/anuradha" target="_blank" rel="noopener noreferrer">
                  Anuradha R.
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </a>
              </div>
              <p className="team-member-role">Senior Advisor · CA</p>
            </div>

            {/* CS — placeholder */}
            <div className="team-member">
              <div className="team-photo">
                <div className="team-photo-placeholder">
                  <span className="team-photo-initials">CS</span>
                </div>
              </div>
              <div className="team-member-name">
                <a href="#" style={{ pointerEvents: 'none', opacity: 0.7 }}>
                  Company Secretary
                </a>
              </div>
              <p className="team-member-role">CS · ICSI Qualified</p>
            </div>

            {/* CA — placeholder */}
            <div className="team-member">
              <div className="team-photo">
                <div className="team-photo-placeholder">
                  <span className="team-photo-initials">CA</span>
                </div>
              </div>
              <div className="team-member-name">
                <a href="#" style={{ pointerEvents: 'none', opacity: 0.7 }}>
                  Accounts & GST Lead
                </a>
              </div>
              <p className="team-member-role">CA · B.Com</p>
            </div>

            {/* Legal — placeholder */}
            <div className="team-member">
              <div className="team-photo">
                <div className="team-photo-placeholder">
                  <span className="team-photo-initials">LG</span>
                </div>
              </div>
              <div className="team-member-name">
                <a href="#" style={{ pointerEvents: 'none', opacity: 0.7 }}>
                  Legal & Contracts
                </a>
              </div>
              <p className="team-member-role">LLB</p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ 6. OUR SERVICES ═══════════ */}
      <section style={{ background: '#ffffff', padding: '56px clamp(20px,5vw,56px)', fontFamily: F }}>
        <style>{`
          .dna-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .dna-card {
            background: #ffffff;
            border-radius: 18px;
            padding: 28px 28px;
            border: 1px solid #1a1510;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
            transition: box-shadow 0.25s ease, transform 0.25s ease;
            cursor: default;
          }
          .dna-card:hover {
            box-shadow: 0 8px 32px rgba(11,61,46,0.10);
            transform: translateY(-2px);
          }
          @media (max-width: 720px) { .dna-grid { grid-template-columns: 1fr; } }
          @media (max-width: 480px) { .dna-card { padding: 22px 20px; } }
        `}</style>

        {/* Head */}
        <div style={{ maxWidth: 1200, margin: '0 auto 44px' }}>
          <div style={{ maxWidth: 700 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#0B3D2E', color: '#fff', borderRadius: 999, padding: '5px 14px', fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Our Services
            </span>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 700, color: '#0B3D2E', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
              The full picture,<br />from day one.
            </h2>
          </div>
        </div>

        {/* 2×2 grid */}
        <div className="dna-grid">
          {[
            {
              num: '01',
              title: 'International Tax & Advisory',
              items: ['DTAA structuring & TRC advisory', 'Transfer pricing — design, benchmarking, Form 3CEB', 'PE risk assessment & FEMA compliance', 'Withholding tax optimisation'],
            },
            {
              num: '02',
              title: 'Company Secretary & MCA',
              items: ['Company incorporation & SPICe+ filing', 'FCGPR & FLA — RBI filings', 'Board resolutions & statutory registers', 'Annual ROC filings (MGT-7, AOC-4)'],
            },
            {
              num: '03',
              title: 'Accounts, GST & Payroll',
              items: ['Monthly bookkeeping & MIS reports', 'GST registration, returns & reconciliation', 'TDS computation & 26Q / 27Q returns', 'Payroll — PF, ESI, professional tax'],
            },
            {
              num: '04',
              title: 'Legal & Contracts',
              items: ['Shareholder & subscription agreements', 'Intercompany service agreements (MSA)', 'Employment contracts & ESOP plans', 'Regulatory advisory — SEBI, RBI, DPIIT'],
            },
          ].map(p => (
            <div key={p.num} className="dna-card">
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#F5A828', display: 'block', marginBottom: 8 }}>
                {p.num}
              </span>
              <h3 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: '#0B3D2E', margin: '0 0 16px', lineHeight: 1.2 }}>
                {p.title}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {p.items.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F5A828', flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontFamily: F, fontSize: 13.5, color: '#4a4438', lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 7. REGISTRATIONS & MEMBERSHIPS ═══════════ */}
      <section style={{ background: '#ffffff', padding: '56px clamp(20px,5vw,56px)', fontFamily: F }}>
        <style>{`
          .reg-outer {
            max-width: 1200px;
            margin: 0 auto;
          }
          .reg-label {
            display: inline-flex;
            align-items: center;
            background: #0B3D2E;
            color: #fff;
            border-radius: 999px;
            padding: 5px 14px;
            font-family: ${F};
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          /* Horizontal strip card — like screenshot */
          .reg-strip {
            background: linear-gradient(135deg, #f2f8f4 0%, #eaf4ee 100%);
            border-radius: 20px;
            border: 1px solid #c8e0d0;
            padding: 28px 32px;
            display: flex;
            gap: 0;
            align-items: stretch;
            overflow: hidden;
          }
          .reg-card {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            flex: 1;
            padding: 0 28px 0 0;
            margin-right: 28px;
            border-right: 1px solid rgba(11,61,46,0.12);
          }
          .reg-card:last-child {
            border-right: none;
            padding-right: 0;
            margin-right: 0;
          }
          .reg-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(11,61,46,0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 1px;
          }
          .reg-title {
            font-family: ${F};
            font-size: 12.5px;
            font-weight: 700;
            color: #0B3D2E;
            margin: 0 0 4px;
            line-height: 1.2;
          }
          .reg-desc {
            font-family: ${F};
            font-size: 11.5px;
            color: #4a6a54;
            line-height: 1.55;
            margin: 0;
          }
          /* Second strip */
          .reg-strip2 {
            background: #ffffff;
            border-radius: 20px;
            border: 1px solid #1a1510;
            padding: 28px 32px;
            display: flex;
            gap: 0;
            align-items: stretch;
            margin-top: 16px;
          }
          @media (max-width: 960px) {
            .reg-strip, .reg-strip2 { flex-direction: column; gap: 20px; }
            .reg-card { border-right: none; padding-right: 0; margin-right: 0; border-bottom: 1px solid rgba(11,61,46,0.10); padding-bottom: 16px; }
            .reg-card:last-child { border-bottom: none; padding-bottom: 0; }
          }
          @media (max-width: 520px) {
            .reg-strip, .reg-strip2 { padding: 22px 18px; }
          }
        `}</style>

        <div className="reg-outer">
          <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 700, color: '#0B3D2E', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>Registrations &amp; memberships</h2>

          {/* Strip 1 — green tint — ICAI, MCA, GST */}
          <div className="reg-strip2">
            {[
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
                title: 'ICAI Firm Registration',
                desc: 'Divsam Consultants LLP — Reg. No. [XXXXXXX], Institute of Chartered Accountants of India.',
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
                title: 'MCA / LLP Identification',
                desc: 'LLPIN [XXXXXXXXXXX], Ministry of Corporate Affairs, Government of India.',
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
                title: 'GST Registration',
                desc: 'GSTIN [XXXXXXXXXXXXXXX], issued for consulting and advisory services.',
              },
            ].map(item => (
              <div key={item.title} className="reg-card">
                <div className="reg-icon">{item.icon}</div>
                <div>
                  <p className="reg-title">{item.title}</p>
                  <p className="reg-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Strip 2 — white with black border — ICSI, Data, PI */}
          <div className="reg-strip2">
            {[
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                title: 'ICSI Membership',
                desc: 'CS team members hold active membership with the Institute of Company Secretaries of India.',
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
                title: 'Data Handling',
                desc: 'Client documents handled under a written confidentiality policy. Full statement available on request.',
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                title: 'Professional Indemnity',
                desc: 'Engagements covered under professional liability insurance. Details available on request.',
              },
            ].map((item, i) => (
              <div key={item.title} className="reg-card">
                <div className="reg-icon">{item.icon}</div>
                <div>
                  <p className="reg-title">{item.title}</p>
                  <p className="reg-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}