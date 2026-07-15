import { useState, useEffect, useRef } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import styles from './WhatWeDoSection.module.css';

// ============================================================
// FONT_HEADING / FONT_BODY — if already defined elsewhere in
// your file, delete these lines to avoid duplicate-declaration.
// ============================================================
const FONT_HEADING = "var(--font-cormorant),'Cormorant Garamond',serif";
const FONT_BODY = "var(--font-cardo),'Cardo',Georgia,serif";
const FONT = "Helvetica, Arial, sans-serif"; // heading font — Helvetica only
const BLACK = "#000000";
const GOLD = "#e8900a";

// ============================================================
// SideRays — inlined directly (no separate file), from React Bits
// ============================================================
const hexToRgb = hex => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const originToFlip = origin => {
    switch (origin) {
        case 'top-left': return [1, 0];
        case 'bottom-right': return [0, 1];
        case 'bottom-left': return [1, 1];
        default: return [0, 0];
    }
};

function SideRays({
    speed = 2.5,
    rayColor1 = '#EAB308',
    rayColor2 = '#96c8ff',
    intensity = 2,
    spread = 2,
    origin = 'top-right',
    tilt = 0,
    saturation = 1.5,
    blend = 0.75,
    falloff = 1.6,
    opacity = 1.0,
    className = ''
}) {
    const containerRef = useRef(null);
    const uniformsRef = useRef(null);
    const rendererRef = useRef(null);
    const animationIdRef = useRef(null);
    const meshRef = useRef(null);
    const cleanupFunctionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        observerRef.current = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observerRef.current.observe(containerRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible || !containerRef.current) return;

        if (cleanupFunctionRef.current) {
            cleanupFunctionRef.current();
            cleanupFunctionRef.current = null;
        }

        const initializeWebGL = async () => {
            if (!containerRef.current) return;

            await new Promise(resolve => setTimeout(resolve, 10));

            if (!containerRef.current) return;

            const renderer = new Renderer({
                dpr: Math.min(window.devicePixelRatio, 2),
                alpha: true
            });
            rendererRef.current = renderer;

            const gl = renderer.gl;
            gl.canvas.style.width = '100%';
            gl.canvas.style.height = '100%';

            while (containerRef.current.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
            containerRef.current.appendChild(gl.canvas);

            const vert = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

            const frag = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);

  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`;

            const [flipX, flipY] = originToFlip(origin);
            const uniforms = {
                iTime: { value: 0 },
                iResolution: { value: [1, 1] },
                iSpeed: { value: speed },
                iRayColor1: { value: hexToRgb(rayColor1) },
                iRayColor2: { value: hexToRgb(rayColor2) },
                iIntensity: { value: intensity },
                iSpread: { value: spread },
                iFlipX: { value: flipX },
                iFlipY: { value: flipY },
                iTilt: { value: tilt },
                iSaturation: { value: saturation },
                iBlend: { value: blend },
                iFalloff: { value: falloff },
                iOpacity: { value: opacity }
            };
            uniformsRef.current = uniforms;

            const geometry = new Triangle(gl);
            const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
            const mesh = new Mesh(gl, { geometry, program });
            meshRef.current = mesh;

            const updateSize = () => {
                if (!containerRef.current || !renderer) return;
                renderer.dpr = Math.min(window.devicePixelRatio, 2);
                const { clientWidth: w, clientHeight: h } = containerRef.current;
                renderer.setSize(w, h);
                uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr];
            };

            const loop = t => {
                if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
                uniforms.iTime.value = t * 0.001;
                try {
                    renderer.render({ scene: mesh });
                    animationIdRef.current = requestAnimationFrame(loop);
                } catch (e) {
                    return;
                }
            };

            window.addEventListener('resize', updateSize);
            updateSize();
            animationIdRef.current = requestAnimationFrame(loop);

            cleanupFunctionRef.current = () => {
                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current);
                    animationIdRef.current = null;
                }
                window.removeEventListener('resize', updateSize);
                if (renderer) {
                    try {
                        const loseCtx = renderer.gl.getExtension('WEBGL_lose_context');
                        if (loseCtx) loseCtx.loseContext();
                        const canvas = renderer.gl.canvas;
                        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
                    } catch (e) { }
                }
                rendererRef.current = null;
                uniformsRef.current = null;
                meshRef.current = null;
            };
        };

        initializeWebGL();

        return () => {
            if (cleanupFunctionRef.current) {
                cleanupFunctionRef.current();
                cleanupFunctionRef.current = null;
            }
        };
    }, [isVisible, speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity]);

    useEffect(() => {
        if (!uniformsRef.current) return;
        const u = uniformsRef.current;
        u.iSpeed.value = speed;
        u.iRayColor1.value = hexToRgb(rayColor1);
        u.iRayColor2.value = hexToRgb(rayColor2);
        u.iIntensity.value = intensity;
        u.iSpread.value = spread;
        const [flipX, flipY] = originToFlip(origin);
        u.iFlipX.value = flipX;
        u.iFlipY.value = flipY;
        u.iTilt.value = tilt;
        u.iSaturation.value = saturation;
        u.iBlend.value = blend;
        u.iFalloff.value = falloff;
        u.iOpacity.value = opacity;
    }, [speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity]);

    return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} />;
}

// ============================================================
// Single card, animates in on scroll (same IntersectionObserver
// pattern as your existing ProcessStep component)
// ============================================================
function WhatWeDoCard({ item, index, T, ROUTES }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
        }, { threshold: 0.15 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="wwd-card"
            style={{
                background: "rgba(235, 245, 238, 0.65)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: `1.5px solid ${T.bdr}`,
                borderRadius: 22,
                boxShadow: "0 10px 34px rgba(0,0,0,.05)",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 0.55s ease ${index * 90}ms, transform 0.55s ease ${index * 90}ms, box-shadow .3s ease, background .3s ease, border-color .3s ease`,
            }}
        >
            {/* SideRays WebGL background — replaces the old gradient blob effect */}
            <div className="waveContainer" style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                zIndex: 0,
                pointerEvents: "none",
                opacity: 0.85,
                transition: "opacity 0.5s ease",
            }}>
                <SideRays
                    speed={1.6}
                    rayColor1={T.f || "#0f3e06"}
                    rayColor2={"#34a87a"}
                    intensity={1.4}
                    spread={1.6}
                    origin="top-right"
                    tilt={0}
                    saturation={1.3}
                    blend={0.7}
                    falloff={1.8}
                    opacity={0.9}
                />
            </div>

            <div className="wwd-accent" style={{
                position: "absolute", top: 0, left: 22, right: 22, height: 2, width: 0,
                background: T.f, borderRadius: 2, transition: "width .35s ease",
                zIndex: 1,
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14, position: "relative", zIndex: 1 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontFamily: FONT_BODY, fontSize: 10.5, letterSpacing: "0.18em",
                        textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 12
                    }}>
                        {item.label}
                    </div>

                    <h3 className="font-display" style={{
                        fontFamily: FONT_HEADING, fontSize: 23.5,
                        fontWeight: 600, color: T.ch, lineHeight: 1.3, margin: 0
                    }}>
                        {item.headline}
                    </h3>
                </div>

                <div className="wwd-index" style={{
                    fontFamily: FONT_HEADING, fontSize: 30, fontWeight: 300, color: BLACK,
                    opacity: .82, lineHeight: 1, flexShrink: 0,
                    transition: "opacity .3s ease, transform .3s ease",
                }}>
                    {String(index + 1).padStart(2, "0")}
                </div>
            </div>

            <p style={{
                fontFamily: FONT_BODY, fontSize: 13.5, color: BLACK, lineHeight: 1.78,
                fontWeight: 300, flex: 1, marginBottom: 24, position: "relative", zIndex: 1
            }}>
                {item.desc}
            </p>

            <button
                className="wwd-cta"
                onClick={() => { window.location.href = ROUTES[item.link] || "/"; }}
                style={{
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: T.f,
                    display: "flex", alignItems: "center", gap: 6, alignSelf: "flex-start",
                    position: "relative", zIndex: 1
                }}
            >
                <span>{item.cta}</span>
                <svg className="wwd-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: "transform .25s ease" }}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </button>
        </div>
    );
}

// ============================================================
// Single feature pill — frosted glass, animates in on scroll
// ============================================================
function FeaturePill({ icon, label, desc, index, T }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
        }, { threshold: 0.3 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="wwd-pill"
            style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 22px 14px 14px",
                borderRadius: 50,
                background: "rgba(255,255,255,.55)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: `1px solid rgba(255,255,255,.7)`,
                boxShadow: "0 8px 28px rgba(0,0,0,.05)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(.96)",
                transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, box-shadow .25s ease, background .25s ease`,
            }}
        >
            <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: `${T.f}12`, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700, color: BLACK, lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: BLACK, lineHeight: 1.4 }}>{desc}</div>
            </div>
        </div>
    );
}

export default function WhatWeDoSection({ T, ROUTES }) {
    const introRef = useRef(null);
    const [introVisible, setIntroVisible] = useState(false);

    useEffect(() => {
        const el = introRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIntroVisible(true); observer.disconnect(); }
        }, { threshold: 0.2 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const items = [
        {
            label: "Company Entry",
            headline: "Incorporated in India. Done properly.",
            desc: "Private limited company, wholly owned subsidiary, branch office, or LLP — we advise on the right structure for your model, then handle every filing from MCA to RBI.",
            cta: "Subsidiary setup guide", link: "seo_sub",
        },
        {
            label: "International Tax",
            headline: "No surprises. No penalties.",
            desc: "Transfer pricing documentation, DTAA planning, PE risk assessment, and FEMA compliance — built into your structure from day one, not bolted on after.",
            cta: "Transfer pricing guide", link: "seo_tp",
        },
        {
            label: "GCC & Captive Centres",
            headline: "Your India capability centre, built right.",
            desc: "Full advisory for Global Capability Centres — entity, HR compliance, ESOP design, cost-plus pricing, and a compliance retainer that scales with your headcount.",
            cta: "GCC advisory", link: "gcc",
        },
        {
            label: "Post-Incorporation Compliance",
            headline: "Stay compliant. Zero penalties.",
            desc: "Monthly GST, TDS, payroll, quarterly advance tax, annual audit, ITR, and FLA Return — all handled on a fixed-fee retainer so your team focuses on the business.",
            cta: "Compliance retainer", link: "gcc",
        },
        {
            label: "NRI & Startup Advisory",
            headline: "Complex structures. Handled properly.",
            desc: "NRI investing or returning to India, Indian startups raising foreign rounds — Schedule 4 FEMA, CCPS structuring, angel tax, DPIIT recognition, FCGPR filing.",
            cta: "NRI & startup guide", link: "seo_nri",
        },
        {
            label: "India Market Entry Advisory",
            headline: "Strategy before paperwork.",
            desc: "Structure design, FDI route, DTAA planning, PE risk assessment — the decisions that must be made before the first filing. We design the full picture first.",
            cta: "Market entry advisory", link: "seo_entry",
        },
    ];

    const features = [
        { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, label: "Strategy first", desc: "Structure designed before you file." },
        { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>, label: "Compliance always", desc: "Every detail handled, every time." },
        { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, label: "Time zone aligned", desc: "Responsive support across the globe." },
        { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.f} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>, label: "Senior led", desc: "Direct access to experienced advisors." },
    ];

    return (
        <section className={styles.section} style={{ background: "#fff" }}>

            {/* Soft ambient glow behind the pill row, so the blur has something
                to blur against — otherwise frosted glass on a flat background
                barely reads as glass */}
            <div style={{
                position: "absolute", left: "50%", bottom: 40, transform: "translateX(-50%)",
                width: "70%", maxWidth: 900, height: 160,
                background: `radial-gradient(ellipse at center, ${T.f}14 0%, transparent 70%)`,
                pointerEvents: "none", zIndex: 0,
            }} />

            <div style={{ maxWidth: 1260, margin: "0 auto", position: "relative", zIndex: 1 }}>

                <div
                    ref={introRef}
                    className="wwd-intro"
                    style={{
                        opacity: introVisible ? 1 : 0,
                        transform: introVisible ? "translateY(0)" : "translateY(14px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: "100%",
                        margin: "0 auto 56px",
                    }}
                >
                    {/* Eyebrow */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 26, height: 1.5, background: T.sl, flexShrink: 0 }} />
                        <span style={{
                            fontFamily: FONT, fontSize: 11, fontWeight: 700,
                            letterSpacing: "0.32em", textTransform: "uppercase", color: BLACK,
                        }}>
                            What We Do
                        </span>
                    </div>

                    {/* Heading — Helvetica only, black, gold italic accent */}
                    <h2 style={{
                        fontFamily: FONT,
                        fontSize: "clamp(30px, 5vw, 52px)",
                        fontWeight: 700,
                        color: BLACK,
                        lineHeight: 1.06,
                        letterSpacing: "-0.02em",
                        margin: "0 0 14px",
                        textAlign: "center",
                    }}>
                        We help global companies{" "}
                        <span style={{ fontFamily: FONT, fontStyle: "italic", fontWeight: 700, color: GOLD }}>
                            enter India
                        </span>{" "}
                        the right way.
                    </h2>

                    {/* Subtitle */}
                    <p style={{
                        fontFamily: FONT,
                        fontSize: 15,
                        color: BLACK,
                        lineHeight: 1.6,
                        textAlign: "center",
                        maxWidth: 520,
                        margin: "0 auto",
                    }}>
                        Not just paper-filing. Strategy first — the structure is designed
                        before a single document is touched.
                    </p>
                </div>

                <div className="wwd-grid">
                    {items.map((item, i) => (
                        <WhatWeDoCard key={item.label} item={item} index={i} T={T} ROUTES={ROUTES} />
                    ))}
                </div>

                <div className="wwd-pills-row">
                    {features.map((f, i) => (
                        <FeaturePill key={f.label} icon={f.icon} label={f.label} desc={f.desc} index={i} T={T} />
                    ))}
                </div>

            </div>
        </section>
    );
}