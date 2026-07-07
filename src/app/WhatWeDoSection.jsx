import { useState, useEffect, useRef } from 'react';
import styles from './WhatWeDoSection.module.css';

// If FONT_HEADING / FONT_BODY are already defined elsewhere in your file,
// delete these two lines to avoid a duplicate-declaration error.
const FONT_HEADING = "var(--font-cormorant),'Cormorant Garamond',serif";
const FONT_BODY = "var(--font-cardo),'Cardo',Georgia,serif";

// ── Single card, animates in on scroll (same IntersectionObserver pattern
//    as your existing ProcessStep component, so behavior stays consistent) ──
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
                background: "rgba(255,255,255,.55)",
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
            <div className="wwd-accent" style={{
                position: "absolute", top: 0, left: 22, right: 22, height: 2, width: 0,
                background: T.f, borderRadius: 2, transition: "width .35s ease",
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontFamily: FONT_BODY, fontSize: 10.5, letterSpacing: "0.18em",
                        textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 12
                    }}>
                        {item.label}
                    </div>

                    <h3 className="font-display" style={{
                        fontFamily: FONT_HEADING, fontSize: 21,
                        fontWeight: 600, color: T.ch, lineHeight: 1.3, margin: 0
                    }}>
                        {item.headline}
                    </h3>
                </div>

                <div className="wwd-index" style={{
                    fontFamily: FONT_HEADING, fontSize: 30, fontWeight: 300, color: T.f,
                    opacity: .3, lineHeight: 1, flexShrink: 0,
                    transition: "opacity .3s ease, transform .3s ease",
                }}>
                    {String(index + 1).padStart(2, "0")}
                </div>
            </div>

            <p style={{
                fontFamily: FONT_BODY, fontSize: 13.5, color: T.mid, lineHeight: 1.78,
                fontWeight: 300, flex: 1, marginBottom: 24
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

// ── Single feature pill — frosted glass, animates in on scroll, staggered ──
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
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700, color: T.ch, lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: T.lt, lineHeight: 1.4 }}>{desc}</div>
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
        <section className={styles.section} style={{ background: T.ivory }}>

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
                        display: "flex", flexDirection: "column", alignItems: "center",
                    }}
                >
                    <div>
                        <div style={{
                            fontFamily: FONT_BODY, fontSize: 11, letterSpacing: "0.28em",
                            textTransform: "uppercase", color: T.s, fontWeight: 600, marginBottom: 16
                        }}>
                            What We Do
                        </div>
                        <h2 className="font-display" style={{
                            fontFamily: FONT_HEADING,
                            fontSize: "clamp(32px,3.8vw,50px)", fontWeight: 600, lineHeight: 1.12, color: T.ch
                        }}>
                            We help global companies{" "}
                            <em style={{ fontStyle: "italic", color: T.f }}>enter India</em> the right way.
                        </h2>
                    </div>
                    <p style={{
                        fontFamily: FONT_BODY, fontSize: 15.5, color: T.mid,
                        lineHeight: 1.85, fontWeight: 300, maxWidth: 520
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