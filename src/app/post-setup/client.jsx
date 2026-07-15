'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

const ROUTES = { home: '/', services: '/setup', gcc: '/post-setup', tax: '/international-tax', hub: '/knowledge-hub', about: '/about', contact: '/contact', industries: '/industries' };
const HV = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BDR = "1px solid rgba(0,0,0,0.52)";
const GLASS = "rgba(255,255,255,0.28)";
const BLUR = "blur(16px)";
const GREEN = "#0B3D2E";
const GOLD = "#e69819";
const HS = "clamp(28px, 3vw, 42px)";

function useReveal(t = 0.12) {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: t }); obs.observe(el); return () => obs.disconnect(); }, []);
  return [ref, vis];
}
function Fade({ children, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (<div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(22px)', transition: `opacity .55s ease ${delay}ms,transform .55s ease ${delay}ms` }}>{children}</div>);
}

function CountUp({ target, suffix = '', duration = 1400, delay = 0 }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useReveal(0.3);
  const started = useRef(false);
  useEffect(() => {
    if (!vis || started.current) return;
    started.current = true;
    if (target === 0) { setTimeout(() => setVal(0), delay); return; }
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    setTimeout(() => {
      const id = setInterval(() => { step++; setVal(Math.round(target * step / steps)); if (step >= steps) clearInterval(id); }, stepTime);
    }, delay);
  }, [vis]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function SH({ eyebrow, green, gold, center = true, mb = 40 }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: mb, fontFamily: HV }}>
      {eyebrow && (
        <p style={{
          fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase",
          color: GREEN, fontWeight: 700, marginBottom: 14, fontFamily: HV, margin: "0 0 14px"
        }}>{eyebrow}</p>
      )}
      <h2 style={{ fontSize: HS, fontWeight: 700, lineHeight: 1.1, margin: 0, fontFamily: HV }}>
        <span style={{ color: GREEN }}>{green}</span>
        {gold && <>{" "}<em style={{ color: GOLD, fontStyle: "italic" }}>{gold}</em></>}
      </h2>
    </div>
  );
}

function RippleGrid({
  enableRainbow = false,
  gridColor = '#ffffff',
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  fadeDistance = 1.5,
  vignetteStrength = 2.0,
  glowIntensity = 0.1,
  opacity = 1.0,
  gridRotation = 0,
  mouseInteraction = true,
  mouseInteractionRadius = 1
}) {
  const containerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluenceRef = useRef(0);
  const uniformsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const hexToRgb = hex => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255] : [1, 1, 1];
    };
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    containerRef.current.appendChild(gl.canvas);
    const vert = `attribute vec2 position;varying vec2 vUv;void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
    const frag = `precision highp float;
uniform float iTime;uniform vec2 iResolution;uniform bool enableRainbow;uniform vec3 gridColor;uniform float rippleIntensity;uniform float gridSize;uniform float gridThickness;uniform float fadeDistance;uniform float vignetteStrength;uniform float glowIntensity;uniform float opacity;uniform float gridRotation;uniform bool mouseInteraction;uniform vec2 mousePosition;uniform float mouseInfluence;uniform float mouseInteractionRadius;varying vec2 vUv;
float pi=3.141592;mat2 rotate(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
void main(){vec2 uv=vUv*2.-1.;uv.x*=iResolution.x/iResolution.y;if(gridRotation!=0.)uv=rotate(gridRotation*pi/180.)*uv;float dist=length(uv);float func=sin(pi*(iTime-dist));vec2 rippleUv=uv+uv*func*rippleIntensity;if(mouseInteraction&&mouseInfluence>0.){vec2 mouseUv=(mousePosition*2.-1.);mouseUv.x*=iResolution.x/iResolution.y;float mouseDist=length(uv-mouseUv);float influence=mouseInfluence*exp(-mouseDist*mouseDist/(mouseInteractionRadius*mouseInteractionRadius));float mouseWave=sin(pi*(iTime*2.-mouseDist*3.))*influence;rippleUv+=normalize(uv-mouseUv)*mouseWave*rippleIntensity*.3;}vec2 a=sin(gridSize*.5*pi*rippleUv-pi/2.);vec2 b=abs(a);float aaWidth=.5;vec2 smoothB=vec2(smoothstep(0.,aaWidth,b.x),smoothstep(0.,aaWidth,b.y));vec3 color=vec3(0.);color+=exp(-gridThickness*smoothB.x*(.8+.5*sin(pi*iTime)));color+=exp(-gridThickness*smoothB.y);color+=.5*exp(-(gridThickness/4.)*sin(smoothB.x));color+=.5*exp(-(gridThickness/3.)*smoothB.y);if(glowIntensity>0.){color+=glowIntensity*exp(-gridThickness*.5*smoothB.x);color+=glowIntensity*exp(-gridThickness*.5*smoothB.y);}float ddd=exp(-2.*clamp(pow(dist,fadeDistance),0.,1.));vec2 vc=vUv-.5;float vd=length(vc);float vignette=clamp(1.-pow(vd*2.,vignetteStrength),0.,1.);vec3 t;if(enableRainbow){t=vec3(uv.x*.5+.5*sin(iTime),uv.y*.5+.5*cos(iTime),pow(cos(iTime),4.))+ .5;}else{t=gridColor;}float finalFade=ddd*vignette;float alpha=length(color)*finalFade*opacity;gl_FragColor=vec4(color*t*finalFade*opacity,alpha);}`;
    const uniforms = { iTime: { value: 0 }, iResolution: { value: [1, 1] }, enableRainbow: { value: enableRainbow }, gridColor: { value: hexToRgb(gridColor) }, rippleIntensity: { value: rippleIntensity }, gridSize: { value: gridSize }, gridThickness: { value: gridThickness }, fadeDistance: { value: fadeDistance }, vignetteStrength: { value: vignetteStrength }, glowIntensity: { value: glowIntensity }, opacity: { value: opacity }, gridRotation: { value: gridRotation }, mouseInteraction: { value: mouseInteraction }, mousePosition: { value: [.5, .5] }, mouseInfluence: { value: 0 }, mouseInteractionRadius: { value: mouseInteractionRadius } };
    uniformsRef.current = uniforms;
    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });
    const resize = () => { const { clientWidth: w, clientHeight: h } = containerRef.current; renderer.setSize(w, h); uniforms.iResolution.value = [w, h]; };
    const handleMouseMove = e => { if (!mouseInteraction || !containerRef.current) return; const rect = containerRef.current.getBoundingClientRect(); targetMouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: 1 - (e.clientY - rect.top) / rect.height }; };
    const handleMouseEnter = () => { if (mouseInteraction) mouseInfluenceRef.current = 1; };
    const handleMouseLeave = () => { if (mouseInteraction) mouseInfluenceRef.current = 0; };
    window.addEventListener('resize', resize);
    if (mouseInteraction) { containerRef.current.addEventListener('mousemove', handleMouseMove); containerRef.current.addEventListener('mouseenter', handleMouseEnter); containerRef.current.addEventListener('mouseleave', handleMouseLeave); }
    resize();
    const render = t => { uniforms.iTime.value = t * .001; const lf = .1; mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lf; mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lf; uniforms.mouseInfluence.value += (mouseInfluenceRef.current - uniforms.mouseInfluence.value) * .05; uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y]; renderer.render({ scene: mesh }); requestAnimationFrame(render); };
    requestAnimationFrame(render);
    const container = containerRef.current;
    return () => { window.removeEventListener('resize', resize); if (mouseInteraction && container) { container.removeEventListener('mousemove', handleMouseMove); container.removeEventListener('mouseenter', handleMouseEnter); container.removeEventListener('mouseleave', handleMouseLeave); } renderer.gl.getExtension('WEBGL_lose_context')?.loseContext(); container?.removeChild(gl.canvas); };
  }, []);

  useEffect(() => {
    if (!uniformsRef.current) return;
    const hexToRgb = hex => { const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return r ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255] : [1, 1, 1]; };
    uniformsRef.current.enableRainbow.value = enableRainbow; uniformsRef.current.gridColor.value = hexToRgb(gridColor); uniformsRef.current.rippleIntensity.value = rippleIntensity; uniformsRef.current.gridSize.value = gridSize; uniformsRef.current.gridThickness.value = gridThickness; uniformsRef.current.fadeDistance.value = fadeDistance; uniformsRef.current.vignetteStrength.value = vignetteStrength; uniformsRef.current.glowIntensity.value = glowIntensity; uniformsRef.current.opacity.value = opacity; uniformsRef.current.gridRotation.value = gridRotation; uniformsRef.current.mouseInteraction.value = mouseInteraction; uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius;
  }, [enableRainbow, gridColor, rippleIntensity, gridSize, gridThickness, fadeDistance, vignetteStrength, glowIntensity, opacity, gridRotation, mouseInteraction, mouseInteractionRadius]);

  return <div ref={containerRef} className="ripple-grid-container" />;
}

const SERVICES = {
  compliance: { title: "Regulatory Compliance", badge: "Monthly retainer", tagline: "Never miss a filing deadline.", desc: "Once your company is incorporated, India's compliance calendar kicks in immediately. GST, TDS, advance tax, MCA filings, ROC returns — each with its own deadline and penalty structure. We manage all of this on a retainer so nothing falls through the cracks.", monthly: [["GSTR-1", "Outward supply statement — 11th of every month"], ["GSTR-3B", "Summary GST return with tax payment — 20th of every month"], ["TDS Returns", "Quarterly TDS filing (24Q, 26Q) with challan payment by 7th"], ["Advance Tax", "Quarterly instalments — June, Sep, Dec, March"]], annual: ["Form ITR-6 — Corporate income tax return", "MCA AOC-4 — Annual financial statements filing", "MCA MGT-7 — Annual return with shareholder details", "DIR-3 KYC — Director KYC renewal every year", "DPT-3 — Return of deposits and loans"] },
  payroll: { title: "Payroll & HR Compliance", badge: "Monthly retainer", tagline: "India's payroll is complex. We handle all of it.", desc: "Indian payroll involves more than just salary processing. PF, ESI, professional tax, TDS on salary (Form 16), gratuity provisions, leave encashment — each with state-specific and sector-specific rules. We run end-to-end payroll for your India team.", monthly: [["PF (EPFO)", "12% employer + 12% employee contribution — due by 15th"], ["ESI", "3.25% employer + 0.75% employee — for salary ≤ ₹21,000/month"], ["Professional Tax", "State-specific slab — varies by state and salary band"], ["TDS on Salary", "Monthly TDS deduction under Section 192 with challan"]], annual: ["Form 24Q — Quarterly TDS return on salary", "Form 16 — TDS certificate issued to each employee by June 15", "PF Annual Return — Form 3A and 6A", "Gratuity provisioning and actuarial valuation (if applicable)", "Labour law compliance — Shops & Establishment Act renewal"] },
  accounting: { title: "Accounting & Bookkeeping", badge: "Monthly retainer", tagline: "Books maintained to Indian GAAP and IFRS standards.", desc: "Your India entity's accounts must be maintained under the Companies Act 2013 and Indian Accounting Standards. We maintain your books on a monthly basis, produce MIS reports, and ensure statutory audit-readiness throughout the year.", monthly: [["Bookkeeping", "Recording of all transactions in Tally / QuickBooks / Zoho"], ["Bank Reconciliation", "Monthly reconciliation of all bank accounts"], ["Accounts Payable / Receivable", "Invoice processing, payment tracking, ageing reports"], ["MIS Report", "Monthly P&L, Balance Sheet, and cash flow summary for management"]], annual: ["Preparation of financial statements under Companies Act 2013", "Coordination with statutory auditor for annual audit", "CARO 2020 compliance for applicable companies", "Fixed asset register maintenance and depreciation schedules", "Year-end provisions — bonus, gratuity, leave encashment"] },
  audit: { title: "Statutory & Tax Audit", badge: "Annual engagement", tagline: "Audit-ready books. Clean reports. No surprises.", desc: "Every Indian company must have its accounts audited by a Chartered Accountant annually. Companies with turnover above ₹1 crore (business) or ₹50 lakh (profession) also require a tax audit under Section 44AB. We handle both.", monthly: [["Audit Preparation", "Ongoing support to maintain audit-ready books throughout the year"], ["Interim Review", "Half-yearly review of financials to flag issues before year-end"], ["ICFR Documentation", "Internal controls documentation for larger companies"], ["Audit Liaison", "Coordination with your statutory auditor on queries"]], annual: ["Statutory audit under Companies Act 2013 — Form AOC-4 filing", "Tax audit under Section 44AB — Form 3CA/3CB + 3CD", "Transfer pricing audit — Form 3CEB (mandatory for intercompany transactions)", "CARO 2020 report (Companies Auditor's Report Order)", "Limited Review for listed entities (quarterly)"] },
  fema: { title: "FEMA & RBI Compliance", badge: "Ongoing retainer", tagline: "Foreign exchange compliance is non-negotiable.", desc: "Once FDI is received, RBI reporting obligations begin immediately. FCGPR within 30 days. Annual FLA return by July 15. ECB reporting if loans are taken from abroad. FEMA violations trigger compounding proceedings. We ensure nothing is missed.", monthly: [["ECB Reporting", "Loan instalment reporting (Form ECB-2) — monthly for ECB borrowings"], ["ODI Monitoring", "Overseas Direct Investment compliance for outbound transactions"], ["AD Bank Coordination", "Liaison with your Authorised Dealer Bank for all forex transactions"], ["FEMA Advisory", "Ongoing advice on repatriation, royalties, and intercompany payments"]], annual: ["Form FCGPR — filed within 30 days of receiving FDI (one-time per allotment)", "FLA Return — Annual return on foreign liabilities and assets (due July 15)", "Form FC-GPR for bonus shares or rights issue to foreign shareholders", "FIRMS portal maintenance — keeping RBI registration current", "Compounding application if any inadvertent FEMA violation occurred"] },
  transfer_pricing: { title: "Transfer Pricing — Ongoing", badge: "Annual engagement", tagline: "Annual documentation. Audit defence. APA advisory.", desc: "Transfer pricing is not a one-time exercise at incorporation. Every year, all intercompany transactions must be benchmarked, documented, and certified by a CA. India's TPO is among the world's most active. We provide ongoing TP compliance and defence.", monthly: [["TP Monitoring", "Quarterly review of intercompany transactions against the TP model"], ["Invoice Review", "Ensuring intercompany invoices align with the agreed pricing model"], ["Margin Monitoring", "Tracking operating margins against benchmarked range throughout the year"], ["TP Advisory", "Advice on new transaction types, service agreements, and royalty structures"]], annual: ["Form 3CEB — Mandatory CA certificate for all international transactions", "TP Study / Benchmarking Report — functional analysis and comparable search", "Master File and Local File (if turnover threshold crossed)", "Country-by-Country Report (CbCR) coordination for large MNCs", "APA (Advance Pricing Agreement) application and negotiation support"] },
};

const SVC_LIST = [["compliance", "Regulatory Compliance"], ["payroll", "Payroll & HR"], ["accounting", "Accounting & Bookkeeping"], ["audit", "Statutory & Tax Audit"], ["fema", "FEMA & RBI"], ["transfer_pricing", "Transfer Pricing"]];

const WHY = [
  ["India has 200+ compliance deadlines a year", "Between GST, TDS, advance tax, MCA filings, RBI returns, and labour law — a new company faces hundreds of deadlines in year one. Missing any triggers penalties."],
  ["Your finance team is overseas", "Most foreign companies set up a lean India team with no local finance expertise. Having a CA firm on retainer means your India entity always has professional cover."],
  ["Penalties are automatic and compounding", "India's tax system imposes interest (12–18% p.a.) and late fees automatically. There is no grace period for GST and TDS. Errors compound quickly if not corrected early."],
  ["Compliance and tax are interlinked", "Your GST returns feed into your income tax filing. Your TDS workings affect your transfer pricing. Your FEMA filings affect your repatriation. One firm prevents gaps."],
  ["Audit readiness throughout the year", "India requires an annual statutory audit. If your books are maintained properly month by month, the audit is straightforward — no year-end pressure or restatements."],
  ["One point of contact — always", "Rather than managing a payroll vendor, a GST consultant, an FEMA specialist, and an auditor separately — one team handles everything with one CA who knows your full picture."],
];

const CAL = [
  { period: "Monthly", items: ["GSTR-1 (11th)", "GSTR-3B (20th)", "TDS challan (7th)", "PF & ESI (15th)", "Payroll processing"], bg: "rgba(9,48,36,0.08)", text: "#093024", bdr: "rgba(9,48,36,0.30)", hdr: "#093024" },
  { period: "Quarterly", items: ["Advance tax (15th Jun/Sep/Dec/Mar)", "TDS returns (24Q, 26Q)", "GSTR-9 reconciliation", "MIS review"], bg: "rgba(176,141,42,0.08)", text: "#7a5f10", bdr: "rgba(176,141,42,0.30)", hdr: "#b08d2a" },
  { period: "Annual", items: ["ITR-6 (Oct 31)", "Form 3CEB (Oct 31)", "AOC-4 & MGT-7 (Nov/Dec)", "FLA Return (Jul 15)", "DIR-3 KYC"], bg: "rgba(74,58,138,0.08)", text: "#3a2d72", bdr: "rgba(74,58,138,0.30)", hdr: "#4a3a8a" },
];

const SVC_COLOR = {
  compliance: { acc: "#093024", bg: "rgba(9,48,36,0.09)", bdr: "rgba(9,48,36,0.30)" },
  payroll: { acc: "#1a5c9a", bg: "rgba(26,92,154,0.09)", bdr: "rgba(26,92,154,0.30)" },
  accounting: { acc: "#7a5f10", bg: "rgba(176,141,42,0.09)", bdr: "rgba(176,141,42,0.30)" },
  audit: { acc: "#3a2d72", bg: "rgba(74,58,138,0.09)", bdr: "rgba(74,58,138,0.30)" },
  fema: { acc: "#093024", bg: "rgba(9,48,36,0.09)", bdr: "rgba(9,48,36,0.30)" },
  transfer_pricing: { acc: "#1a5c9a", bg: "rgba(26,92,154,0.09)", bdr: "rgba(26,92,154,0.30)" },
};

const ACCENTS = Object.values(SVC_COLOR).map(v => ({ acc: v.acc, bg: v.bg, bdr: v.bdr }));

/* ── Wave gradient derived from accent color ── */
/* Each card gets a unique wave keyframe name so they animate independently */
function WaveCard({ acc, bg, bdr, index, title, body }) {
  const animName = `wave${index}`;
  // Parse the accent color into an rgba for the wave layers
  // We derive 3 tinted stops: solid → lighter mid → near-white base
  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0%   { background-position: 0% 60%; }
          25%  { background-position: 60% 40%; }
          50%  { background-position: 100% 60%; }
          75%  { background-position: 40% 80%; }
          100% { background-position: 0% 60%; }
        }
        .wc-${index} {
          background:
            radial-gradient(ellipse 120% 80% at 10% 110%, ${acc}22 0%, transparent 55%),
            radial-gradient(ellipse 90% 120% at 90% -10%, ${acc}18 0%, transparent 50%),
            radial-gradient(ellipse 160% 100% at 50% 50%, ${acc}0d 0%, transparent 70%),
            #ffffff;
          background-size: 300% 300%, 300% 300%, 300% 300%, auto;
          animation: ${animName} 8s ease infinite;
          animation-delay: ${index * -1.4}s;
        }
        .wc-${index}:hover {
          background:
            radial-gradient(ellipse 140% 90% at 15% 105%, ${acc}33 0%, transparent 55%),
            radial-gradient(ellipse 100% 130% at 85% -15%, ${acc}28 0%, transparent 50%),
            radial-gradient(ellipse 180% 110% at 50% 50%, ${acc}18 0%, transparent 70%),
            #ffffff;
          background-size: 300% 300%, 300% 300%, 300% 300%, auto;
        }
      `}</style>
      <div
        className={`flip-wrap wc-${index}`}
        style={{ '--card-acc': acc, borderTop: `3px solid ${acc}`, borderLeft: `1px solid ${bdr}`, borderRight: `1px solid ${bdr}`, borderBottom: `1px solid ${bdr}`, borderRadius: 16, position: 'relative', overflow: 'hidden' }}
      >
        {/* floating blob — extra visual depth */}
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 160, height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${acc}20 0%, transparent 70%)`,
          pointerEvents: 'none',
          animation: `${animName} ${10 + index * 1.2}s ease infinite reverse`,
        }} />
        <div style={{
          position: 'absolute', bottom: -30, left: -20, width: 120, height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${acc}15 0%, transparent 70%)`,
          pointerEvents: 'none',
          animation: `${animName} ${12 + index * 0.8}s ease infinite`,
          animationDelay: `${index * -2}s`,
        }} />

        <div className="flip-inner">
          {/* FRONT */}
          <div className="flip-front" style={{
            background: 'transparent',
            border: 'none',
            borderRadius: 16,
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: bg, border: `1.5px solid ${bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: acc, marginBottom: 14, fontFamily: HV }}>0{index + 1}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#111', lineHeight: 1.3, fontFamily: HV, flex: 1 }}>{title}</div>
            <div className="mob-hide" style={{ paddingTop: 16, fontSize: 11, color: acc, fontFamily: HV, alignItems: 'center', gap: 4, fontWeight: 600 }}>
              <span>Hover to read</span><span style={{ fontSize: 13 }}>→</span>
            </div>
          </div>
          {/* BACK */}
          <div className="flip-back" style={{ background: acc }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12, fontFamily: HV }}>0{index + 1}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 12, fontFamily: HV }}>{title}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, fontFamily: HV, flex: 1 }}>{body}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  const router = useRouter();
  const [active, setActive] = useState("compliance");
  const svc = SERVICES[active];
  const sc = SVC_COLOR[active];

  return (
    <div style={{ fontFamily: HV, color: "#111", background: "#fff" }}>
      <style>{`
        *{box-sizing:border-box;}
        .gc{background:${GLASS};backdrop-filter:${BLUR};-webkit-backdrop-filter:${BLUR};border:${BDR};border-radius:16px;}
        .tab-off{background:#fff;border:${BDR};color:#444;padding:9px 16px;border-radius:8px;cursor:pointer;font-family:${HV};font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;gap:6px;transition:all .2s;}
        .tab-off:hover{background:#f5f5f5;}
        .tab-on{background:#111;border:1px solid #111;color:#fff;padding:9px 16px;border-radius:8px;cursor:pointer;font-family:${HV};font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;gap:6px;}
        .lbl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;font-weight:600;color:#aaa;font-family:${HV};}
        .green-btn{display:inline-flex;align-items:center;gap:8px;background:${GREEN};color:#fff;font-family:${HV};font-size:15px;font-weight:700;padding:14px 28px;border-radius:6px;border:none;cursor:pointer;transition:background .2s,transform .15s;}
        .green-btn:hover{background:#0a3d2c;transform:translateY(-1px);}
        .ghost-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#111;font-family:${HV};font-size:15px;font-weight:600;padding:14px 28px;border-radius:6px;border:${BDR};cursor:pointer;transition:all .2s;}
        .ghost-btn:hover{background:#111;color:#fff;}
        .ghost-dk{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;font-family:${HV};font-size:15px;font-weight:600;padding:14px 28px;border-radius:6px;border:1px solid rgba(255,255,255,.25);cursor:pointer;transition:all .2s;}
        .ghost-dk:hover{background:rgba(255,255,255,.08);}
        .cal-box{border:3px solid ${GREEN};border-radius:22px;padding:28px 24px;background:#fff;}
        .cal-pill{padding:5px 12px;border-radius:50px;font-size:12px;font-weight:600;font-family:${HV};display:inline-block;}
        .ripple-grid-container{width:100%;height:100%;position:relative;}
        .ripple-grid-container canvas{display:block;}

        /* ── flip card: mobile-first ── */
        .flip-wrap{cursor:default;transition:box-shadow .3s;}
        .flip-wrap:hover{box-shadow:0 12px 40px rgba(0,0,0,0.12);}
        .flip-inner{position:relative;display:flex;flex-direction:column;}
        .flip-front,.flip-back{position:relative;border-radius:16px;padding:24px 22px;display:flex;flex-direction:column;}
        .flip-front{border-radius:16px 16px 0 0;border-bottom:none;}
        .flip-back{background:${GREEN};border-radius:0 0 16px 16px;border-top:1px solid rgba(255,255,255,0.15);}
        .mob-hide{display:none;}

        /* ── desktop: hover-to-flip ── */
        @media(min-width:961px){
          .flip-wrap{perspective:1000px;height:240px;cursor:pointer;}
          .flip-inner{width:100%;height:100%;transform-style:preserve-3d;transition:transform .6s ease;}
          .flip-wrap:hover .flip-inner{transform:rotateY(180deg);}
          .flip-front,.flip-back{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:16px;padding:24px 22px;}
          .flip-front{border-bottom:none;}
          .flip-back{background:linear-gradient(135deg,var(--card-acc,#093024) 0%,rgba(255,255,255,0.15) 200%);transform:rotateY(180deg);border-top:none;}
          .mob-hide{display:flex;}
        }

        @media(max-width:960px){
          .hero-g,.svc-g,.two-col{grid-template-columns:1fr!important;}
          .three-col{grid-template-columns:1fr 1fr!important;}
          .stat-grid{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:540px){
          .three-col{grid-template-columns:1fr!important;}
          .sec{padding:56px 18px!important;}
          .stat-grid{grid-template-columns:1fr 1fr!important;}
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="sec" style={{ background: "#f5f5f0", padding: "96px 56px 88px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <RippleGrid enableRainbow={false} gridColor="#093024" rippleIntensity={0} gridSize={15} gridThickness={28} mouseInteraction={true} mouseInteractionRadius={0.2} opacity={0.07} fadeDistance={0.8} vignetteStrength={1.4} glowIntensity={0} />
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="hero-g" style={{ display: "grid", gridTemplateColumns: "1fr 460px", gap: 64, alignItems: "center" }}>
            <Fade>
              <div className="lbl" style={{ marginBottom: 22 }}>Post Setup Services</div>
              <h1 style={{ fontSize: "clamp(40px,5.5vw,68px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.033em", margin: "0 0 22px", fontFamily: HV }}>
                <span style={{ color: GREEN }}>Your company is set up. Now keep it</span>{" "}
                <em style={{ color: GOLD, fontStyle: "italic", fontWeight: 800 }}>running compliantly.</em>
              </h1>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.78, maxWidth: 500, margin: "0 0 36px", fontFamily: HV }}>
                Incorporation is day one. Your India compliance calendar starts immediately — tax filings, payroll, FEMA returns, annual audit. We manage all of it so your team stays focused on the business.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                <button className="green-btn" onClick={() => router.push(ROUTES.contact)}>Get Compliance Retainer Quote →</button>
                <button className="ghost-btn" onClick={() => router.push(ROUTES.tax)}>Int'l Tax Advisory →</button>
              </div>
              <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                {[
                  { target: 100, suffix: "+", label: "Companies on retainer" },
                  { target: 0, suffix: "", label: "Penalties incurred" },
                  { target: 18, suffix: "+", label: "Years experience" },
                  { target: 6, suffix: "", label: "Service areas" },
                ].map((s, i) => {
                  const c = ACCENTS[i];
                  return (
                    <div key={i} style={{ background: "#fff", border: `1px solid ${c.bdr}`, borderTop: `3px solid ${c.acc}`, borderRadius: 14, padding: "16px 12px", textAlign: "center", boxShadow: `0 4px 14px ${c.bg}` }}>
                      <div style={{ fontSize: "clamp(22px,2.5vw,28px)", fontWeight: 800, color: c.acc, lineHeight: 1, fontFamily: HV }}>
                        <CountUp target={s.target} suffix={s.suffix} delay={i * 220} />
                      </div>
                      <div style={{ fontSize: 10.5, color: "#777", marginTop: 5, fontFamily: HV, lineHeight: 1.3 }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </Fade>
            <Fade delay={120}>
              <div className="cal-box">
                <div className="lbl" style={{ marginBottom: 22 }}>Compliance Calendar — What We Manage</div>
                {CAL.map(c => (
                  <div key={c.period} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: c.hdr, marginBottom: 10, fontFamily: HV }}>{c.period}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {c.items.map(item => (
                        <span key={item} className="cal-pill" style={{ background: c.bg, color: c.text, border: `1px solid ${c.bdr}` }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── SERVICE SELECTOR ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <SH eyebrow="Our Post Setup Services" green="Everything your India entity needs" gold="to stay compliant." mb={12} />
              <p style={{ fontSize: 14.5, color: "#555", margin: "0 auto 28px", maxWidth: 640, fontFamily: HV, lineHeight: 1.6 }}>Select each service to see exactly what's covered — monthly and annual.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 0 }}>
                {SVC_LIST.map(([key, label]) => (
                  <button key={key} className={active === key ? "tab-on" : "tab-off"} onClick={() => setActive(key)}>{label}</button>
                ))}
              </div>
            </div>
          </Fade>
          <div className="svc-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div className="gc" style={{ padding: "28px 24px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: "#fff", borderTop: `4px solid ${sc.acc}`, boxShadow: `0 8px 24px ${sc.bg}` }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle,${sc.bg} 1px,transparent 1px)`, backgroundSize: "18px 18px", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ marginBottom: 14 }}>
                  <h3 style={{ fontSize: "clamp(17px,2vw,22px)", fontWeight: 800, color: "#111", margin: "0 0 6px", letterSpacing: "-0.02em", fontFamily: HV }}>{svc.title}</h3>
                  <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: sc.acc, color: "#fff", padding: "3px 9px", borderRadius: 4, fontFamily: HV }}>{svc.badge}</span>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: sc.acc, marginBottom: 8, fontFamily: HV, fontStyle: "italic" }}>{svc.tagline}</div>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.75, margin: "0 0 20px", fontFamily: HV }}>{svc.desc}</p>
                <div style={{ fontSize: 10.5, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, color: "#aaa", fontFamily: HV, marginBottom: 12 }}>Annual Deliverables</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20 }}>
                  {svc.annual.map((item, i) => (
                    <span key={i} style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "6px 13px", borderRadius: 50, background: sc.bg, color: sc.acc, border: `1px solid ${sc.bdr}`, fontFamily: HV, lineHeight: 1.3 }}>{item}</span>
                  ))}
                </div>
                <button
                  onClick={() => router.push(ROUTES.contact)}
                  style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, background: sc.acc, color: "#fff", fontFamily: HV, fontSize: 13, fontWeight: 700, padding: "11px 20px", borderRadius: 7, border: "none", cursor: "pointer", transition: "opacity .2s,transform .15s" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Get a Quote for {svc.title} →
                </button>
              </div>
            </div>
            <div className="gc" style={{ padding: "28px 24px", display: "flex", flexDirection: "column", background: "#fff", borderTop: `4px solid ${sc.acc}`, boxShadow: `0 8px 24px ${sc.bg}` }}>
              <div style={{ fontSize: 10.5, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, color: "#aaa", fontFamily: HV, marginBottom: 18 }}>Monthly / Ongoing Tasks</div>
              {svc.monthly.map(([title, desc], i) => (
                <div key={i} style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 14, paddingBottom: 14, borderBottom: i < svc.monthly.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: sc.bg, border: `1.5px solid ${sc.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: sc.acc, flexShrink: 0, fontFamily: HV }}>{i + 1}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: "#111", fontFamily: HV }}>{title}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: sc.bg, color: sc.acc, border: `1px solid ${sc.bdr}`, fontFamily: HV }}>Monthly</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: "#666", lineHeight: 1.65, fontFamily: HV }}>{desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "auto", background: sc.acc, borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -24, right: -24, width: 96, height: 96, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 7, fontFamily: HV }}>Why this matters</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.88)", lineHeight: 1.72, fontFamily: HV, position: "relative" }}>Missing deadlines in India triggers automatic penalties and interest. A compliance retainer means you never have to track these dates yourself — we own the calendar.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA ── */}
      <section style={{ padding: "0 56px 88px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", background: "#fff", border: `1.5px solid ${sc.bdr}`, borderRadius: 16, padding: "26px 30px", boxShadow: `0 6px 20px ${sc.bg}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: sc.bg, border: `1.5px solid ${sc.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, fontWeight: 800, color: sc.acc, fontFamily: HV }}>?</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#111", fontFamily: HV, marginBottom: 2 }}>Not sure which services you actually need?</div>
                  <div style={{ fontSize: 12.5, color: "#666", fontFamily: HV }}>15-minute call — we map your compliance obligations for free, no commitment.</div>
                </div>
              </div>
              <button
                onClick={() => router.push(ROUTES.contact)}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: sc.acc, color: "#fff", fontFamily: HV, fontSize: 13.5, fontWeight: 700, padding: "12px 24px", borderRadius: 7, border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "opacity .2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Book Free Call →
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── WHY RETAINER — wave gradient front faces ── */}
      <section className="sec" style={{ padding: "88px 56px", background: "#fff", borderTop: "1px solid rgba(0,0,0,.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <SH eyebrow="Why a Retainer" green="Why foreign companies use a" gold="compliance retainer in India." mb={44} />
          </Fade>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {WHY.map(([title, body], i) => {
              const c = ACCENTS[i];
              return (
                <Fade key={i} delay={i * 60}>
                  <WaveCard acc={c.acc} bg={c.bg} bdr={c.bdr} index={i} title={title} body={body} />
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "56px 56px", background: "#f5f5f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <div style={{ background: GREEN, borderRadius: 20, overflow: "hidden", position: "relative" }}>
              <img src="/images/india-compliance-cta.jpg" alt="" aria-hidden="true"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.18, pointerEvents: "none" }}
                onError={e => e.currentTarget.style.display = "none"} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, padding: "44px 52px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <blockquote style={{ fontFamily: HV, fontSize: "clamp(15px,1.8vw,19px)", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.90)", lineHeight: 1.65, margin: "0 0 16px" }}>
                    "Most foreign companies enter India with the wrong structure and fix it at audit time. We design it right the first time — saving you 2–3× the cost in corrections."
                  </blockquote>
                  <div style={{ fontFamily: HV, fontSize: 12.5, color: "rgba(255,255,255,0.45)", letterSpacing: "0.02em" }}>
                    — P.G., FCA · Diploma in International Taxation · 18 yrs Ex-Big 4
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <button
                    onClick={() => router.push(ROUTES.contact)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#c8870a", color: "#fff", fontFamily: HV, fontSize: 14.5, fontWeight: 700, padding: "15px 28px", borderRadius: 8, border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "background .2s,transform .15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#e09a10"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#c8870a"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Talk to Our Expert Team →
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}