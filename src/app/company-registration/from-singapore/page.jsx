'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const HV = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const GREEN = "#093024";
import PricingSection from '@/app/PricingSection';
import LightPillar from '@/components/shared/LightPillar';
import ColorBends from '@/components/shared/ColorBends';

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

function CountUp({ end, suffix = '', prefix = '', delay = 0 }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useReveal(0.3);
  const done = useRef(false);
  useEffect(() => {
    if (!vis || done.current) return;
    done.current = true;
    let i = 0; const steps = 44;
    setTimeout(() => {
      const id = setInterval(() => {
        i++; const p = 1 - Math.pow(1 - i / steps, 3);
        setVal(Math.round(end * p));
        if (i >= steps) clearInterval(id);
      }, 1300 / steps);
    }, delay);
  }, [vis]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

function FAQCard({ q, a, open, onToggle }) {
  const body = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => { if (body.current) setH(body.current.scrollHeight); }, [open]);
  return (
    <div
      onClick={onToggle}
      style={{
        border: open ? `1.5px solid ${GREEN}` : '1px solid rgba(0,0,0,0.12)',
        borderRadius: 14,
        background: open ? 'rgba(9,48,36,0.03)' : '#fff',
        cursor: 'pointer',
        marginBottom: 14,
        padding: '0 24px',
        transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
        boxShadow: open ? '0 8px 24px rgba(9,48,36,0.08)' : '0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', gap: 20 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: open ? GREEN : '#111', fontFamily: HV, lineHeight: 1.35, transition: 'color 0.3s' }}>{q}</span>
        <div style={{ width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${open ? GREEN : 'rgba(0,0,0,0.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s', transform: open ? 'rotate(45deg)' : 'none', background: open ? GREEN : 'transparent' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" stroke={open ? '#fff' : '#888'} strokeWidth="2.5" fill="none" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </div>
      </div>
      <div style={{ maxHeight: open ? h + 'px' : 0, overflow: 'hidden', transition: 'max-height 0.42s cubic-bezier(0.4,0,0.2,1)' }}>
        <div ref={body}>
          <p style={{ margin: '0 0 22px', fontSize: 14, color: '#555', lineHeight: 1.8, fontFamily: HV, maxWidth: 640 }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

const docIcons = [
  <svg key="i0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8870a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2.5" width="14" height="19" rx="2" /><circle cx="12" cy="9.5" r="2.6" /><line x1="8.5" y1="16" x2="15.5" y2="16" /><line x1="9.5" y1="18.6" x2="14.5" y2="18.6" /></svg>,
  <svg key="i1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8870a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5" /><line x1="9" y1="14" x2="15" y2="14" /><line x1="9" y1="17" x2="13.5" y2="17" /></svg>,
  <svg key="i2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8870a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><line x1="2.5" y1="10" x2="21.5" y2="10" /><line x1="6" y1="14.5" x2="11" y2="14.5" /></svg>,
  <svg key="i3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8870a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7a2.1 2.1 0 0 0-3-3l-7 7-1.5 4.5L12 19z" /><path d="M3 21h18" /></svg>,
  <svg key="i4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8870a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></svg>,
  <svg key="i5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8870a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="3" width="15" height="18" rx="1.5" /><line x1="8.5" y1="7.5" x2="10.5" y2="7.5" /><line x1="13.5" y1="7.5" x2="15.5" y2="7.5" /><line x1="8.5" y1="11.5" x2="10.5" y2="11.5" /><line x1="13.5" y1="11.5" x2="15.5" y2="11.5" /><path d="M10 21v-4h4v4" /></svg>,
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = e => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', fn) : mq.removeListener(fn); };
  }, []);
  return reduced;
}

function useIsMobile(bp = 860) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= bp);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [bp]);
  return mobile;
}

function DocRow({ doc, i, isMobile, reduced }) {
  const [ref, vis] = useReveal(0.25);
  const left = i % 2 === 0;
  const show = reduced ? true : vis;
  const slideFrom = isMobile ? -36 : (left ? -44 : 44);
  const contentStyle = {
    opacity: show ? 1 : 0,
    transform: show ? 'translateX(0)' : `translateX(${slideFrom}px)`,
    transition: reduced ? 'none' : 'opacity .6s ease .15s, transform .6s cubic-bezier(0.22,1,0.36,1) .15s',
    willChange: 'transform, opacity',
  };
  const nodeStyle = {
    opacity: show ? 1 : 0,
    transform: show ? 'scale(1)' : 'scale(0.4)',
    transition: reduced ? 'none' : 'opacity .45s ease, transform .55s cubic-bezier(0.34,1.56,0.64,1)',
    willChange: 'transform, opacity',
  };
  const eyebrow = <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#c8870a', fontFamily: HV, marginBottom: 6 }}>{String(i + 1).padStart(2, '0')}</div>;
  const title = <h3 style={{ fontSize: 20.5, fontWeight: 800, color: '#111', margin: '0 0 6px', fontFamily: HV, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{doc.label}</h3>;
  return (
    <div ref={ref} className={`doc-tl-row ${left ? 'tl-left' : 'tl-right'}`} style={{ display: 'grid', gridTemplateColumns: '1fr 88px 1fr', alignItems: 'center', minHeight: 118 }}>
      <div className="doc-tl-content-l" style={{ textAlign: 'right', paddingRight: 28, visibility: left ? 'visible' : 'hidden', ...(left ? contentStyle : {}) }}>
        {left && (<>{eyebrow}{title}<p style={{ fontSize: 15.5, color: '#666', lineHeight: 1.65, margin: 0, fontFamily: HV, maxWidth: 320, marginLeft: 'auto' }}>{doc.detail}</p></>)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', border: `1.5px solid ${show ? 'rgba(200,135,10,0.45)' : 'rgba(200,135,10,0.28)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: show ? '0 8px 22px rgba(200,135,10,0.16)' : '0 6px 18px rgba(200,135,10,0.10)', position: 'relative', zIndex: 1, ...nodeStyle }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(200,135,10,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{docIcons[i % docIcons.length]}</div>
        </div>
      </div>
      <div className="doc-tl-content-r" style={{ textAlign: 'left', paddingLeft: 28, visibility: left ? 'hidden' : 'visible', ...(!left ? contentStyle : {}) }}>
        {!left && (<>{eyebrow}{title}<p style={{ fontSize: 15.5, color: '#666', lineHeight: 1.65, margin: 0, fontFamily: HV, maxWidth: 320 }}>{doc.detail}</p></>)}
      </div>
    </div>
  );
}

function DocTimeline({ items }) {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { setProgress(1); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const target = vh * 0.7;
      const p = (target - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);
  return (
    <div ref={wrapRef} className="doc-tl" style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '10px 0' }}>
      <div className="doc-tl-line" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'rgba(9,48,36,0.12)', transform: 'translateX(-1px)' }} />
      <div className="doc-tl-line" style={{ position: 'absolute', top: 0, left: '50%', width: 2, height: `${progress * 100}%`, background: GREEN, transform: 'translateX(-1px)', transition: 'height 0.15s linear', borderRadius: 2 }} />
      <div className="doc-tl-cap" style={{ position: 'absolute', top: -4, left: '50%', width: 10, height: 10, borderRadius: '50%', background: GREEN, transform: 'translateX(-5px)' }} />
      <div className="doc-tl-cap" style={{ position: 'absolute', bottom: -4, left: '50%', width: 10, height: 10, borderRadius: '50%', background: progress > 0.98 ? GREEN : 'rgba(9,48,36,0.18)', transform: 'translateX(-5px)', transition: 'background 0.3s ease' }} />
      {items.map((doc, i) => (<DocRow key={i} doc={doc} i={i} isMobile={isMobile} reduced={reduced} />))}
    </div>
  );
}

function ProcessLayout({ steps }) {
  const [active, setActive] = useState(0);
  const [ref, vis] = useReveal(0.05);
  useEffect(() => {
    if (!vis) return;
    const id = setInterval(() => setActive(c => (c + 1) % steps.length), 2600);
    return () => clearInterval(id);
  }, [vis, steps.length]);
  const cur = steps[active];
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 300px', gap: 0, alignItems: 'stretch', border: '1px solid rgba(0,0,0,0.14)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 32px rgba(9,48,36,0.10)' }} className="proc-3col">

      {/* LEFT */}
      <div style={{
        background: '#093024',
        padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.38 }}>
          <LightPillar
            topColor="#ffe082"
            bottomColor="#c8870a"
            intensity={0.65}
            rotationSpeed={0.25}
            glowAmount={0.008}
            pillarWidth={2.4}
            pillarHeight={0.35}
            noiseIntensity={0.12}
            pillarRotation={15}
            interactive={false}
            mixBlendMode="screen"
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: -60, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,135,10,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', fontFamily: HV, marginBottom: 20 }}>Step-by-Step</div>

          {/* ✦ LIVE ANIMATED GRADIENT STEP NUMBER */}
          <div
            key={'num-' + active}
            style={{
              fontSize: 72, fontWeight: 800, lineHeight: 1,
              fontFamily: HV, letterSpacing: '-0.04em',
              animation: 'stepIn 0.4s ease both, gradMove 3s ease infinite',
              background: 'linear-gradient(135deg, #ffe082 0%, #ffb300 50%, #ff8f00 100%)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >{cur.n}</div>

          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: HV, marginTop: 8 }}>{cur.time}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 2 }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === active ? 'linear-gradient(135deg,#ffd54f,#ffb300)' : 'rgba(255,255,255,0.22)', flexShrink: 0, transition: 'all 0.3s', transform: i === active ? 'scale(1.5)' : 'scale(1)', boxShadow: i === active ? '0 0 6px rgba(255,213,79,0.6)' : 'none' }} />
              <span style={{ fontSize: 11, fontFamily: HV, color: i === active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.32)', fontWeight: i === active ? 700 : 400, transition: 'all 0.3s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 }}>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MIDDLE */}
      <div style={{ borderLeft: '1px solid rgba(0,0,0,0.07)', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 0, overflowY: 'auto', background: '#fff' }}>
        {steps.map((s, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 0', borderBottom: i < steps.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', cursor: 'pointer', transition: 'opacity 0.3s', opacity: i === active ? 1 : 0.38 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: i === active ? 'linear-gradient(135deg, #c8870a 0%, #e09a10 100%)' : 'rgba(0,0,0,0.05)', border: i === active ? 'none' : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 800, color: i === active ? '#fff' : '#bbb', flexShrink: 0, transition: 'all 0.35s ease', fontFamily: HV, boxShadow: i === active ? '0 4px 14px rgba(200,135,10,0.28)' : 'none' }}>{s.n}</div>
            <div style={{ paddingTop: 6 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: i === active ? '#111' : '#999', fontFamily: HV, lineHeight: 1.25, marginBottom: 3, transition: 'color 0.3s' }}>{s.title}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: i === active ? '#c8870a' : '#ddd', fontFamily: HV, textTransform: 'uppercase', letterSpacing: '0.8px', transition: 'color 0.3s' }}>{s.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div style={{ padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f7f8f7', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
        <div key={'detail-' + active} style={{ animation: 'stepIn 0.4s ease both', flex: 1 }}>
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #c8870a 0%, #e09a10 100%)', color: '#fff', fontSize: 9.5, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: HV, padding: '4px 10px', borderRadius: 4, marginBottom: 16 }}>{cur.time}</div>

          {/* ✦ INCREASED TITLE SIZE */}
          <h3 style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 800, color: '#111', margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: HV, lineHeight: 1.2 }}>{cur.title}</h3>

          <p style={{ fontSize: 13.5, color: '#666', lineHeight: 1.78, margin: 0, fontFamily: HV }}>{cur.desc}</p>
        </div>
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 10.5, color: '#bbb', fontFamily: HV }}>Progress</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#c8870a', fontFamily: HV }}>{active + 1} / {steps.length}</span>
          </div>
          <div style={{ height: 3, background: 'rgba(0,0,0,0.07)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #c8870a 0%, #e09a10 100%)', width: `${((active + 1) / steps.length) * 100}%`, transition: 'width 0.5s ease', borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SINGAPORE-SPECIFIC DATA ── */
const steps = [
  { n: '01', title: 'Choose Your Business Structure', time: 'Day 1', desc: 'Singapore-based founders commonly register a Private Limited Company or Wholly Owned Subsidiary in India. For professional services, an LLP may be preferred. We advise on the right fit for your goals, sector, and FDI requirements.' },
  { n: '02', title: 'Apostille Singapore Documents', time: 'Week 1', desc: 'Singapore is a member of the Hague Apostille Convention. Documents (passport, address proof) must be apostilled through the Singapore Academy of Law (SAL) or the relevant Singapore authority before submission to Indian authorities.' },
  { n: '03', title: 'Obtain DSC', time: 'Week 1–2', desc: 'All directors need a Class 3 Digital Signature Certificate from an Indian certifying authority. We coordinate the application remotely — no India visit required.' },
  { n: '04', title: 'Name Reservation — MCA RUN', time: 'Week 2', desc: 'We file your preferred company name through the MCA21 Reserve Unique Name (RUN) service and confirm availability before proceeding with incorporation.' },
  { n: '05', title: 'File SPICe+ Incorporation Form', time: 'Week 2–3', desc: 'The SPICe+ (INC-32) form bundles company incorporation, DIN allotment, PAN, TAN, and GSTIN applications in one submission. We handle the complete filing.' },
  { n: '06', title: 'Certificate of Incorporation', time: 'Week 3–4', desc: 'ROC approves your application and issues the Certificate of Incorporation, PAN, and TAN — your company is officially registered in India.' },
];

const whyPoints = [
  ["India-Singapore DTAA", "The India-Singapore Double Taxation Avoidance Agreement (in force since 1994, revised 2016) prevents double taxation on income flowing between the two countries — a key advantage for Singapore-based founders."],
  ["Apostille in 3–5 days", "Singapore is a Hague Apostille Convention member. Documents apostilled via SAL are accepted directly by Indian authorities — no Embassy attestation needed."],
  ["Access India's tech talent", "Tap one of the world's largest pools of software engineers, CAs, and technical professionals at a fraction of Singapore costs."],
  ["100% FDI in most sectors", "Automatic Route FDI permitted in IT, consulting, manufacturing, e-commerce, and more. A Singapore entity can hold 100% of an Indian subsidiary."],
  ["Startup India benefits", "Qualify for DPIIT recognition, income tax exemption for 3 years, and fast-track IP registration through Startup India."],
  ["Repatriate profits freely", "Dividends and profits can be repatriated to Singapore under FEMA/RBI guidelines, with treaty protection against double taxation."],
];

const documents = [
  { label: 'Passport', detail: 'Apostilled through Singapore Academy of Law (SAL) or relevant authority' },
  { label: 'Singapore Address Proof', detail: 'Utility bill or bank statement (apostilled), dated within 2 months' },
  { label: 'PAN Card (Form 49AA)', detail: 'For foreign nationals — we assist with the application' },
  { label: 'DSC (Class 3)', detail: 'Digital Signature Certificate — obtained remotely' },
  { label: 'DIN', detail: 'Director Identification Number — allotted via SPICe+ filing' },
  { label: 'Registered Office Proof', detail: 'We provide a virtual registered office address if needed' },
];

const structures = [
  ['Private Limited', 'Startups, funded ventures, subsidiaries', '2 (1 resident)', 'Yes — Automatic Route'],
  ['LLP', 'Consulting, professional services, small teams', '2 (1 resident)', 'Yes — with restrictions'],
  ['WOS', 'Singapore companies expanding to India', '2 (1 resident)', 'Yes — 100% ownership'],
];

const faqs = [
  { q: 'Can I register a company in India from Singapore without visiting India?', a: 'Yes. The entire process is completed online via the MCA21 portal. Singapore documents are apostilled through the Singapore Academy of Law — no India visit required.' },
  { q: 'Does Singapore have an Apostille arrangement with India?', a: 'Yes. Singapore is a member of the Hague Apostille Convention, so apostilled Singapore documents are directly accepted by Indian authorities — no Indian Embassy attestation needed.' },
  { q: 'Is there a tax treaty between India and Singapore?', a: 'Yes. The India-Singapore Double Taxation Avoidance Agreement (DTAA) has been in place since 1994 (revised in 2016). This prevents double taxation on income flowing between the two countries, which is a key advantage for Singapore-based founders with Indian entities.' },
  { q: 'Can a Singapore company own 100% of an Indian company?', a: 'Yes, in most sectors. 100% FDI is permitted under the Automatic Route in sectors like IT, e-commerce (marketplace model), consulting, and manufacturing. A Singapore-registered entity can be the holding company for an Indian subsidiary.' },
  { q: 'How long does it take to register a company in India from Singapore?', a: 'Typically 15–25 working days once apostilled documents are ready. The apostille process in Singapore typically takes 3–5 working days.' },
  { q: 'What are the ongoing compliance requirements for my Indian company?', a: 'Indian companies must file annual returns with the MCA, income tax returns, GST returns (if applicable), and maintain audited accounts. We offer end-to-end compliance management so you can focus on running your business.' },
];

const countries = [
  { label: 'From the USA', href: '/company-registration/from-usa' },
  { label: 'From the UK', href: '/company-registration/from-uk' },
  { label: 'From Dubai / UAE', href: '/company-registration/from-dubai' },
  { label: 'From Canada', href: '/company-registration/from-canada' },
  { label: 'From Australia', href: '/company-registration/from-australia' },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{`
        @keyframes stepIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes gradMove {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        * { box-sizing:border-box; margin:0; }
        .sec { padding:88px 56px; }
        .lbl { font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; font-weight:600; color:#aaa; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; display:block; margin-bottom:12px; }
        .g-btn { display:inline-flex; align-items:center; gap:8px; background:#093024; color:#fff; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14.5px; font-weight:700; padding:13px 26px; border-radius:6px; border:none; cursor:pointer; text-decoration:none; transition:background .2s,transform .15s; }
        .g-btn:hover { background:#0a3d2c; transform:translateY(-1px); }
        .sec-div { border-top:1px solid rgba(0,0,0,0.08); }
        .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border:1px solid rgba(0,0,0,0.15); border-radius:18px; overflow:hidden; }
        .why-card { padding:36px 32px; border-right:1px solid rgba(0,0,0,0.13); cursor:default; position:relative; overflow:hidden; background:#fff; }
        .why-card.no-right { border-right:none; }
        .why-row-divider { grid-column:1/-1; height:1px; background:rgba(0,0,0,0.13); }
        .stbl { width:100%; border-collapse:collapse; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; }
        .stbl th { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:#aaa; padding:0 20px 12px; text-align:left; border-bottom:2px solid rgba(0,0,0,0.12); }
        .stbl td { font-size:14px; color:#444; padding:18px 20px; border-bottom:1px solid rgba(0,0,0,0.07); font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; vertical-align:top; }
        .stbl tr:last-child td { border-bottom:none; }
        .stbl td:first-child { font-weight:700; color:#111; }
        .stbl tr:hover td { background:rgba(9,48,36,0.03); }
        @media(max-width:860px){
          .proc-3col { grid-template-columns:1fr !important; }
          .proc-3col > div:nth-child(1) { padding:28px 24px; }
          .proc-3col > div:nth-child(2) { border-left:none !important; border-right:none !important; border-top:1px solid rgba(0,0,0,0.08); border-bottom:1px solid rgba(0,0,0,0.08); }
          .proc-3col > div:nth-child(3) { padding:28px 24px; }
          .why-grid { grid-template-columns:1fr !important; border-radius:14px; }
          .why-card { border-right:none !important; padding:26px 22px; border-bottom:1px solid rgba(0,0,0,0.13); }
          .why-card:last-child { border-bottom:none !important; }
          .hero-g { grid-template-columns:1fr !important; gap:44px !important; }
          .doc-tl-line { left:32px !important; }
          .doc-tl-cap { left:32px !important; transform:translateX(-4px) !important; }
          .doc-tl-row { grid-template-columns:64px 1fr !important; min-height:auto !important; padding:16px 0; }
          .doc-tl-row > div:nth-child(2) { grid-column:1; grid-row:1; justify-content:flex-start !important; }
          .doc-tl-row > div:nth-child(2) > div { width:52px !important; height:52px !important; }
          .doc-tl-row > div:nth-child(2) > div > div { width:40px !important; height:40px !important; }
          .doc-tl-content-l, .doc-tl-content-r { grid-column:2 !important; grid-row:1 !important; visibility:visible !important; text-align:left !important; padding:0 0 0 20px !important; }
          .doc-tl-content-l p { margin-left:0 !important; }
          .tl-left .doc-tl-content-r, .tl-right .doc-tl-content-l { display:none; }
        }
        @media(max-width:580px){
          .sec { padding:56px 20px !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="sec" style={{ background: '#f5f5f0', padding: '100px 56px 92px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Link href="/setup" style={{ fontFamily: HV, fontSize: 12.5, color: '#888', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>← All Services</Link>
          <div className="hero-g" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 64, alignItems: 'start' }}>
            <Fade>
              <span className="lbl">Company Registration · From Singapore</span>
              <h1 style={{ fontSize: 'clamp(36px,5vw,66px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.033em', marginBottom: 22, fontFamily: HV }}>
                <span style={{ color: GREEN }}>Register a Company<br />in India from</span>{' '}
                <span style={{ position: 'relative', display: 'inline-block', color: '#c8870a' }}>
                  Singapore
                  <span style={{ position: 'absolute', left: 0, bottom: '-4px', width: '100%', height: '5px', background: '#c8870a', borderRadius: 2 }} />
                </span>
              </h1>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.78, maxWidth: 480, marginBottom: 36, fontFamily: HV }}>
                100% online. No India visit required. Expert CA support for Singapore-based NRIs, Singaporean businesses, and founders expanding into India.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="g-btn">Get a Free Consultation →</Link>
                <a href="#process" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: HV, fontSize: 14, fontWeight: 600, color: '#111', textDecoration: 'none', padding: '13px 0', borderBottom: '2px solid #111', lineHeight: 1 }}>See the Process</a>
              </div>
            </Fade>
            <Fade delay={100}>
              <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.48)', borderRadius: 16 }}>
                <div style={{ background: GREEN, borderRadius: '15px 15px 0 0', padding: '14px 22px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontFamily: HV }}>At a Glance</span>
                </div>
                {[
                  { label: 'Avg. registration time', val: 20, suffix: ' days' },
                  { label: 'Process', text: '100% online — no India visit' },
                  { label: 'FDI — most sectors', val: 100, suffix: '% permitted' },
                  { label: 'India-Singapore', text: 'DTAA in force since 1994' },
                ].map((row, i, arr) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 22px', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none', gap: 16 }}>
                    <span style={{ fontSize: 13, color: '#777', fontFamily: HV }}>{row.label}</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: GREEN, fontFamily: HV, textAlign: 'right' }}>
                      {row.text ?? <CountUp end={row.val} suffix={row.suffix} prefix={row.prefix || ''} delay={i * 150} />}
                    </span>
                  </div>
                ))}
                <div style={{ padding: '13px 22px', background: 'rgba(9,48,36,0.05)', borderRadius: '0 0 15px 15px', borderTop: '1px solid rgba(9,48,36,0.10)' }}>
                  <p style={{ fontSize: 12, color: '#444', margin: 0, lineHeight: 1.6, fontFamily: HV }}>Ex-Big 4 CA team — end to end, from structure advice to Certificate of Incorporation.</p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* WHY INDIA */}
      <section className="sec sec-div" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="lbl">Why India</span>
              <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', marginBottom: 8, fontFamily: HV }}>Why Singapore Founders Are Setting Up in India</h2>
              <p style={{ fontSize: 15, color: '#666', fontFamily: HV }}>Six real commercial advantages — not marketing copy.</p>
            </div>
          </Fade>
          <Fade delay={60}>
            <div className="why-grid">
              {whyPoints.slice(0, 3).map(([heading, body], i) => (
                <div key={i} className={`why-card${i === 2 ? ' no-right' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.45 }}>
                    <ColorBends
                      colors={["#ffe082", "#c8870a", "#eefaf4"]}
                      rotation={90}
                      speed={0.4}
                      scale={1.4}
                      frequency={1}
                      warpStrength={0.6}
                      mouseInfluence={0.2}
                      noise={0.06}
                      parallax={0.25}
                      iterations={1}
                      intensity={1.1}
                      bandWidth={5}
                      transparent
                    />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(0,0,0,0.28)', fontFamily: HV, marginBottom: 18 }}>{String(i + 1).padStart(2, '0')}</div>
                    <h3 style={{ fontSize: 'clamp(18px,2vw,22px)', fontWeight: 800, color: '#111', margin: '0 0 14px', fontFamily: HV, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{heading}</h3>
                    <p style={{ fontSize: 14, color: '#666', lineHeight: 1.72, margin: 0, fontFamily: HV }}>{body}</p>
                  </div>
                </div>
              ))}
              <div className="why-row-divider" />
              {whyPoints.slice(3).map(([heading, body], i) => (
                <div key={i + 3} className={`why-card${i === 2 ? ' no-right' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.45 }}>
                    <ColorBends
                      colors={["#ffe082", "#c8870a", "#eefaf4"]}
                      rotation={90}
                      speed={0.4}
                      scale={1.4}
                      frequency={1}
                      warpStrength={0.6}
                      mouseInfluence={0.2}
                      noise={0.06}
                      parallax={0.25}
                      iterations={1}
                      intensity={1.1}
                      bandWidth={5}
                      transparent
                    />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(0,0,0,0.28)', fontFamily: HV, marginBottom: 18 }}>{String(i + 4).padStart(2, '0')}</div>
                    <h3 style={{ fontSize: 'clamp(18px,2vw,22px)', fontWeight: 800, color: '#111', margin: '0 0 14px', fontFamily: HV, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{heading}</h3>
                    <p style={{ fontSize: 14, color: '#666', lineHeight: 1.72, margin: 0, fontFamily: HV }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="sec sec-div" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="lbl">Step-by-Step Process</span>
              <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', marginBottom: 8, fontFamily: HV }}>From Singapore to your Certificate of Incorporation.</h2>
              <p style={{ fontSize: 15, color: '#666', fontFamily: HV }}>Auto-advances every 2.6 s — click any step to jump.</p>
            </div>
          </Fade>
          <Fade delay={80}><ProcessLayout steps={steps} /></Fade>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="sec sec-div" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="lbl">Documents Required</span>
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', marginBottom: 14, fontFamily: HV }}>What you'll need from Singapore</h2>
              <p style={{ fontSize: 14.5, color: '#666', lineHeight: 1.75, fontFamily: HV, maxWidth: 560, margin: '0 auto' }}>
                Singapore is part of the Hague Apostille Convention. Documents apostilled through SAL are accepted directly by Indian authorities — no Embassy attestation needed.
              </p>
            </div>
          </Fade>
          <DocTimeline items={documents} />
        </div>
      </section>

      {/* STRUCTURES */}
      <section className="sec sec-div" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span className="lbl">Entity Types</span>
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', fontFamily: HV }}>Which structure is right for you?</h2>
            </div>
          </Fade>
          <Fade delay={60}>
            <table className="stbl">
              <thead><tr><th>Structure</th><th>Best For</th><th>Min. Directors</th><th>FDI Route</th></tr></thead>
              <tbody>
                {structures.map(([s, b, d, f], i) => (
                  <tr key={i}><td>{s}</td><td style={{ color: '#555' }}>{b}</td><td style={{ color: '#555' }}>{d}</td><td style={{ color: '#555' }}>{f}</td></tr>
                ))}
              </tbody>
            </table>
          </Fade>
        </div>
      </section>
      <PricingSection country="singapore" ROUTES={{ contact: '/contact' }} />
      {/* FAQ */}
      <section className="sec sec-div" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span className="lbl">FAQs</span>
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', fontFamily: HV }}>Common questions answered</h2>
            </div>
          </Fade>
          {faqs.map((f, i) => (
            <Fade key={i} delay={i * 40}>
              <FAQCard q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            </Fade>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: '#f5f5f0', padding: '48px 56px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ background: GREEN, borderRadius: 18, padding: '44px 52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
            <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
              <h2 style={{ fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 8, fontFamily: HV }}>Ready to register your Indian company from Singapore?</h2>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0, fontFamily: HV }}>Apostille guidance to Certificate of Incorporation — we handle everything.</p>
            </div>
            <div style={{ position: 'relative', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Link href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#c8870a', color: '#fff', fontFamily: HV, fontSize: 14.5, fontWeight: 700, padding: '14px 26px', borderRadius: 7, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background .2s,transform .15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e09a10'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#c8870a'; e.currentTarget.style.transform = 'none'; }}>
                Book a Free Consultation →
              </Link>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: HV }}>Response within 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section style={{ padding: '36px 56px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, color: '#aaa', fontFamily: HV }}>Also available:</span>
          {countries.map(l => (
            <Link key={l.href} href={l.href}
              style={{ fontSize: 13, fontWeight: 600, color: '#444', textDecoration: 'none', padding: '6px 16px', border: '1px solid rgba(0,0,0,0.20)', borderRadius: 50, fontFamily: HV, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.color = GREEN; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.20)'; e.currentTarget.style.color = '#444'; }}>
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}