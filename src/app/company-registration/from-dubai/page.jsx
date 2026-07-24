'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const HV = "Helvetica, Arial, sans-serif";
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const [ref, vis] = useReveal();

  if (isMobile) {
    return <div>{children}</div>;
  }

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
  /* 5 seconds auto-advance */
  useEffect(() => {
    if (!vis) return;
    const id = setInterval(() => setActive(c => (c + 1) % steps.length), 5000);
    return () => clearInterval(id);
  }, [vis, steps.length]);
  const cur = steps[active];
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 300px', gap: 0, alignItems: 'stretch', border: '1px solid rgba(0,0,0,0.14)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 32px rgba(9,48,36,0.10)' }} className="proc-3col">

      {/* LEFT — deep green */}
      <div style={{ background: 'linear-gradient(160deg, #0a3d2c 0%, #072b1f 60%, #041a12 100%)', padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(76,175,130,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: -40, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(76,175,130,0.10) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', fontFamily: HV, marginBottom: 20 }}>Step-by-Step</div>
          <div key={'num-' + active} style={{ fontSize: 56, fontWeight: 800, lineHeight: 1, fontFamily: HV, letterSpacing: '-0.04em', animation: 'stepIn 0.4s ease both', background: 'linear-gradient(135deg, #a8e6c0 0%, #4caf82 50%, #2e7d55 100%)', backgroundSize: '300% 300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{cur.n}</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: HV, marginTop: 8 }}>{cur.time}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 2 }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === active ? '#4caf82' : 'rgba(255,255,255,0.22)', flexShrink: 0, transition: 'all 0.3s', transform: i === active ? 'scale(1.5)' : 'scale(1)', boxShadow: i === active ? '0 0 6px rgba(76,175,130,0.7)' : 'none' }} />
              <span style={{ fontSize: i === active ? 12.5 : 12, fontFamily: HV, color: i === active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.32)', fontWeight: i === active ? 700 : 400, transition: 'all 0.3s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MIDDLE — all steps fully visible, no opacity blur */}
      <div style={{ borderLeft: '1px solid rgba(0,0,0,0.07)', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 0, overflowY: 'auto', background: '#fff' }}>
        {steps.map((s, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 0', borderBottom: i < steps.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', cursor: 'pointer', opacity: 1 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: i === active ? 'linear-gradient(135deg, #093024 0%, #165c3a 100%)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 800, color: i === active ? '#fff' : '#bbb', flexShrink: 0, transition: 'all 0.35s ease', fontFamily: HV, boxShadow: i === active ? '0 4px 14px rgba(9,48,36,0.28)' : 'none' }}>{s.n}</div>
            <div style={{ paddingTop: 6 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: i === active ? '#111' : '#555', fontFamily: HV, lineHeight: 1.25, marginBottom: 3, transition: 'color 0.3s' }}>{s.title}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: i === active ? GREEN : '#bbb', fontFamily: HV, textTransform: 'uppercase', letterSpacing: '0.8px', transition: 'color 0.3s' }}>{s.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div style={{ padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f7f8f7', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
        <div key={'detail-' + active} style={{ animation: 'stepIn 0.4s ease both', flex: 1 }}>
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #093024 0%, #165c3a 100%)', color: '#fff', fontSize: 9.5, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: HV, padding: '4px 10px', borderRadius: 4, marginBottom: 16 }}>{cur.time}</div>
          <h3 style={{ fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 800, color: '#111', margin: '0 0 14px', letterSpacing: '-0.02em', fontFamily: HV, lineHeight: 1.2 }}>{cur.title}</h3>
          <p style={{ fontSize: 13.5, color: '#666', lineHeight: 1.78, margin: 0, fontFamily: HV }}>{cur.desc}</p>
        </div>
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 10.5, color: '#bbb', fontFamily: HV }}>Progress</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: GREEN, fontFamily: HV }}>{active + 1} / {steps.length}</span>
          </div>
          <div style={{ height: 3, background: 'rgba(0,0,0,0.07)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #093024 0%, #165c3a 100%)', width: `${((active + 1) / steps.length) * 100}%`, transition: 'width 0.5s ease', borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── DUBAI / UAE-SPECIFIC DATA ── */
const steps = [
  { n: '01', title: 'Choose Your Business Structure', time: 'Day 1', desc: 'Dubai-based NRIs and UAE residents most commonly register a Private Limited Company or a Wholly Owned Subsidiary. We advise on the best structure based on your sector and FDI requirements.' },
  { n: '02', title: 'Attestation of UAE Documents', time: 'Week 1', desc: 'UAE documents must be attested by the UAE Ministry of Foreign Affairs (MOFA) and then by the Indian Embassy/Consulate in the UAE. We provide a complete step-by-step attestation guide.' },
  { n: '03', title: 'Obtain DSC', time: 'Week 1–2', desc: 'All directors need a Class 3 Digital Signature Certificate from an Indian certifying authority. The process is handled remotely — no India visit required.' },
  { n: '04', title: 'Name Reservation — MCA RUN', time: 'Week 2', desc: 'We file your preferred company name through the MCA21 Reserve Unique Name (RUN) portal and confirm availability before proceeding.' },
  { n: '05', title: 'File SPICe+ Incorporation Form', time: 'Week 2–3', desc: 'The SPICe+ (INC-32) form is a combined online application for company incorporation, DIN, PAN, TAN, and GSTIN — submitted in one go to the MCA.' },
  { n: '06', title: 'Certificate of Incorporation', time: 'Week 3–4', desc: 'Upon ROC approval, you receive the Certificate of Incorporation, PAN, and TAN. Your Indian company is now officially registered.' },
];

const whyPoints = [
  ["India-UAE DTAA", "India and the UAE have a Double Taxation Avoidance Agreement. NRIs in Dubai earning from their Indian company are protected against double taxation on the same income."],
  ["3.5 million NRIs in UAE", "The UAE hosts one of the world's largest Indian diaspora communities — a natural bridge for business between the two countries."],
  ["Lower operational costs", "Run an India team at a fraction of Gulf staffing costs without compromising quality — particularly valuable for tech, finance, and back-office functions."],
  ["Accept INR payments freely", "Open Indian bank accounts, invoice local clients in INR, and manage India-sourced revenue with a properly structured entity."],
  ["Startup India tax benefits", "Qualify for DPIIT recognition, income tax exemption for 3 years, and fast-track IP registration through the Startup India programme."],
  ["100% FDI in most sectors", "Automatic Route FDI permitted in IT, consulting, manufacturing, and e-commerce. No government approval needed in most cases."],
];

const documents = [
  { label: 'Passport', detail: 'Attested by UAE MOFA + Indian Embassy/Consulate in UAE' },
  { label: 'UAE Address Proof', detail: 'UAE utility bill or bank statement (attested), dated within 2 months' },
  { label: 'PAN Card (Form 49AA)', detail: 'For foreign nationals — we assist with the application' },
  { label: 'DSC (Class 3)', detail: 'Digital Signature Certificate — obtained remotely' },
  { label: 'DIN', detail: 'Director Identification Number — allotted through the SPICe+ filing' },
  { label: 'Registered Office Proof', detail: 'Virtual registered office in India available through us' },
];

const structures = [
  ['Private Limited', 'Startups, funded ventures, subsidiaries', '2 (1 resident)', 'Yes — Automatic Route'],
  ['LLP', 'Consulting, professional services, small teams', '2 (1 resident)', 'Yes — with restrictions'],
  ['WOS', 'UAE companies expanding to India', '2 (1 resident)', 'Yes — 100% ownership'],
];

const faqs = [
  { q: 'Can I register a company in India from Dubai without visiting India?', a: 'Yes. The entire process is completed online via the MCA21 portal. You only need to get your UAE documents attested through the UAE Ministry of Foreign Affairs and the Indian Embassy in Dubai — no India visit required.' },
  { q: 'How do I attest documents in the UAE for India company registration?', a: 'UAE documents follow a two-step process: first attestation by the UAE Ministry of Foreign Affairs (MOFA), then attestation by the Indian Embassy or Consulate in Abu Dhabi or Dubai. Note: The UAE is not part of the Hague Apostille Convention, so MOFA + Indian Embassy attestation is required instead of apostille.' },
  { q: 'Can a UAE resident own 100% of an Indian company?', a: 'Yes, in most sectors. India allows 100% FDI under the Automatic Route in sectors like IT, consulting, manufacturing, and e-commerce marketplace models. Sectors like defence, media, and banking may require prior government approval.' },
  { q: 'How long does it take to register a company in India from Dubai?', a: 'Typically 15–25 working days once attested documents are ready. The MOFA + Indian Embassy attestation in the UAE takes approximately 5–10 working days.' },
  { q: 'Is there a double taxation agreement between India and the UAE?', a: 'Yes. India and the UAE have a Double Taxation Avoidance Agreement (DTAA). This is highly relevant for NRIs in Dubai who earn income from their Indian company — it prevents the same income from being taxed in both countries.' },
  { q: 'Can I run my Indian company remotely from Dubai?', a: 'Yes. With a registered office address in India (we provide virtual office services), a resident director, and proper compliance filings, you can manage your Indian company entirely from Dubai.' },
];

const countries = [
  { label: 'From the USA', href: '/company-registration/from-usa' },
  { label: 'From the UK', href: '/company-registration/from-uk' },
  { label: 'From Singapore', href: '/company-registration/from-singapore' },
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
        .sec { padding:56px 56px; }
        .lbl { font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; font-weight:600; color:#000000; font-family:Helvetica, Arial, sans-serif; display:block; margin-bottom:12px; }
        .g-btn { display:inline-flex; align-items:center; gap:8px; background:#093024; color:#fff; font-family:Helvetica, Arial, sans-serif; font-size:14.5px; font-weight:700; padding:13px 26px; border-radius:6px; border:none; cursor:pointer; text-decoration:none; transition:background .2s,transform .15s; }
        .g-btn:hover { background:#0a3d2c; transform:translateY(-1px); }
        .sec-div { border-top:none; }
        .why-eq-grid { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:1fr; gap:18px; }
        .why-eq-grid > div { display:flex; }
        .why-anim-card {
          flex:1; border-radius:22px; border:1.5px solid rgba(9,48,36,0.14);
          padding:36px 32px; position:relative; overflow:hidden; cursor:default;
          background: linear-gradient(160deg,#EAF4EF 0%,#FCF3E1 100%);
          box-shadow: 0 4px 18px rgba(9,48,36,0.07);
          transition:box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
        }
        .why-anim-card:hover { box-shadow:0 16px 48px rgba(9,48,36,0.13); transform:translateY(-5px); border-color:rgba(9,48,36,0.25); }
        .why-anim-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#093024 0%,#e69819 100%); }
        .stbl { width:100%; border-collapse:collapse; font-family:Helvetica, Arial, sans-serif; }
        .stbl th { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:#aaa; padding:0 20px 12px; text-align:left; border-bottom:2px solid rgba(0,0,0,0.12); }
        .stbl td { font-size:14px; color:#444; padding:18px 20px; border-bottom:1px solid rgba(0,0,0,0.07); font-family:Helvetica, Arial, sans-serif; vertical-align:top; }
        .stbl tr:last-child td { border-bottom:none; }
        .stbl td:first-child { font-weight:700; color:#111; }
        .stbl tr:hover td { background:rgba(9,48,36,0.03); }
        @media(max-width:860px){
          .proc-3col { grid-template-columns:1fr !important; }
          .proc-3col > div:nth-child(1) { padding:28px 24px; }
          .proc-3col > div:nth-child(2) { border-left:none !important; border-right:none !important; border-top:1px solid rgba(0,0,0,0.08); border-bottom:1px solid rgba(0,0,0,0.08); }
          .proc-3col > div:nth-child(3) { padding:28px 24px; }
          .why-eq-grid { grid-template-columns:1fr 1fr !important; grid-auto-rows:auto; }
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
          .why-eq-grid { grid-template-columns:1fr !important; grid-auto-rows:auto !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="sec" style={{ backgroundImage: "url('/banners%20and%20logos/UAE.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 56px 92px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Link href="/setup" style={{ fontFamily: HV, fontSize: 12.5, color: '#888', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>← All Services</Link>
          <div className="hero-g" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 64, alignItems: 'start' }}>
            <Fade>
              <span className="lbl">Company Registration · From Dubai / UAE</span>
              <h1 style={{ fontSize: 'clamp(36px,5vw,66px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.033em', marginBottom: 22, fontFamily: HV }}>
                <span style={{ color: GREEN }}>Register a Company<br />in India from</span>{' '}
                <span style={{ position: 'relative', display: 'inline-block', color: '#c8870a' }}>
                  Dubai / UAE
                  <span style={{ position: 'absolute', left: 0, bottom: '-4px', width: '100%', height: '5px', background: '#c8870a', borderRadius: 2 }} />
                </span>
              </h1>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.78, maxWidth: 480, marginBottom: 36, fontFamily: HV }}>
                100% online. No India visit required. Expert CA support for UAE-based NRIs, Dubai residents, and Gulf-based businesses expanding into India.
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
                  { label: 'India-UAE', text: 'DTAA in force' },
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
              <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', marginBottom: 8, fontFamily: HV }}>Why Dubai-Based NRIs <span style={{ fontStyle: 'italic', color: '#e69819' }}>Are Setting Up in India.</span></h2>
              <p style={{ fontSize: 15, color: '#666', fontFamily: HV }}>Six real commercial advantages — not marketing copy.</p>
            </div>
          </Fade>
          <div className="why-eq-grid">
            {whyPoints.map(([heading, body], i) => (
              <Fade key={i} delay={i * 55}>
                <div className="why-anim-card">
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(9,48,36,0.35)', fontFamily: HV, marginBottom: 16 }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 style={{ fontSize: 'clamp(17px,1.8vw,20px)', fontWeight: 800, color: '#111', margin: '0 0 12px', fontFamily: HV, letterSpacing: '-0.02em', lineHeight: 1.25 }}>{heading}</h3>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.72, margin: 0, fontFamily: HV }}>{body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="sec sec-div" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="lbl">Step-by-Step Process</span>
              <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', marginBottom: 8, fontFamily: HV }}>From Dubai to your <span style={{ fontStyle: 'italic', color: '#e69819' }}>Certificate of Incorporation.</span></h2>
              <p style={{ fontSize: 15, color: '#666', fontFamily: HV }}>Auto-advances every 2.6 s — click any step to jump.</p>
            </div>
          </Fade>
          <Fade delay={80}><ProcessLayout steps={steps} /></Fade>
          {/* UAE-specific attestation notice */}
          <Fade delay={100}>
            <div style={{ marginTop: 28, background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 14, padding: '18px 24px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#7A5C1E', marginBottom: 5, fontFamily: HV }}>Important: UAE is not part of the Apostille Convention</div>
              <p style={{ fontSize: 13, color: '#7A5C1E', margin: 0, lineHeight: 1.65, fontFamily: HV }}>Unlike the USA, UK, Singapore, and Australia, the UAE has not signed the Hague Apostille Convention. UAE documents require a two-step attestation: UAE MOFA first, followed by the Indian Embassy or Consulate in Dubai or Abu Dhabi.</p>
            </div>
          </Fade>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="sec sec-div" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="lbl">Documents Required</span>
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', marginBottom: 14, fontFamily: HV }}>What you'll need <span style={{ fontStyle: 'italic', color: '#e69819' }}>from the UAE.</span></h2>
              <p style={{ fontSize: 14.5, color: '#666', lineHeight: 1.75, fontFamily: HV, maxWidth: 560, margin: '0 auto' }}>
                UAE documents require MOFA attestation followed by Indian Embassy/Consulate attestation — not apostille, as the UAE is not part of the Hague Convention.
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
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', fontFamily: HV }}>Which structure is <span style={{ fontStyle: 'italic', color: '#e69819' }}>right for you?</span></h2>
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
      <PricingSection country="dubai" ROUTES={{ contact: '/contact' }} />
      {/* FAQ */}
      <section className="sec sec-div" style={{ background: '#fff', paddingTop: 0 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Fade>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span className="lbl">FAQs</span>
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#111', fontFamily: HV }}>Common questions <span style={{ fontStyle: 'italic', color: '#e69819' }}>answered.</span></h2>
            </div>
          </Fade>
          {faqs.map((f, i) => (
            <Fade key={i} delay={i * 40}>
              <FAQCard q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            </Fade>
          ))}
        </div>
      </section>



      {/* INTERNAL LINKS */}
      <section style={{ padding: '24px 56px 48px', background: '#fff' }}>
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