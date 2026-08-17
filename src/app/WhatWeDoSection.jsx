import { useState, useEffect, useRef } from 'react';
import styles from './WhatWeDoSection.module.css';

const FONT_HEADING = "var(--font-cormorant),'Cormorant Garamond',serif";
const FONT_BODY = "var(--font-cardo),'Cardo',Georgia,serif";
const FONT = "Helvetica, Arial, sans-serif";
const BLACK = "#000000";
const GOLD = "#e8900a";
const G = "#0B3D2E";

// Card — light gradient, matches the Stats "SPEED" card palette
function WhatWeDoCard({ item, index, T, ROUTES }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

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
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                /* ── TARGET COLOUR ── light green→warm cream gradient */
                background: "linear-gradient(160deg,#EAF4EF 0%,#FCF3E1 100%)",
                border: `1.5px solid rgba(9,48,36,0.14)`,
                borderRadius: 22,
                boxShadow: hovered
                    ? "0 16px 48px rgba(9,48,36,0.13)"
                    : "0 4px 18px rgba(9,48,36,0.07)",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible
                    ? (hovered ? "translateY(-5px)" : "translateY(0)")
                    : "translateY(18px)",
                transition: `opacity 0.55s ease ${index * 90}ms,
                             transform 0.55s ease ${index * 90}ms,
                             box-shadow 0.25s ease`,
            }}
        >
            {/* Subtle top accent line — forest green */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${G}, ${GOLD})`,
                borderRadius: "22px 22px 0 0",
                opacity: hovered ? 1 : 0.5,
                transition: "opacity 0.3s ease",
            }} />

            {/* Card number — top right, muted */}
            <div style={{
                position: "absolute", top: 20, right: 24,
                fontFamily: FONT_HEADING, fontSize: 28, fontWeight: 300,
                color: "rgba(9,48,36,0.15)", lineHeight: 1,
            }}>
                {String(index + 1).padStart(2, "0")}
            </div>

            {/* Label */}
            <div style={{
                fontFamily: FONT_BODY, fontSize: 10.5, letterSpacing: "0.18em",
                textTransform: "uppercase", color: G, fontWeight: 700,
                marginBottom: 12,
            }}>
                {item.label}
            </div>

            {/* Headline */}
            <h3 style={{
                fontFamily: FONT_HEADING, fontSize: 23.5,
                fontWeight: 600, color: BLACK, lineHeight: 1.3,
                margin: "0 0 14px",
            }}>
                {item.headline}
            </h3>

            {/* Description */}
            <p style={{
                fontFamily: FONT_BODY, fontSize: 13.5,
                color: "#444", lineHeight: 1.78,
                fontWeight: 300, flex: 1, marginBottom: 24,
            }}>
                {item.desc}
            </p>

            {/* CTA */}
            <button
                className="wwd-cta"
                onClick={() => { window.location.href = ROUTES[item.link] || "/"; }}
                style={{
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700,
                    color: G,
                    display: "flex", alignItems: "center", gap: 6,
                    alignSelf: "flex-start",
                }}
            >
                <span>{item.cta}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        transform: hovered ? "translateX(3px)" : "translateX(0)",
                        transition: "transform 0.25s ease",
                    }}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </button>
        </div>
    );
}

// Feature pill — unchanged
function FeaturePill({ icon, label, desc, index }) {
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
                border: "1px solid rgba(255,255,255,.7)",
                boxShadow: "0 8px 28px rgba(0,0,0,.05)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(.96)",
                transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
            }}
        >
            <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "#fff", border: "1px solid #000",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
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
        { icon: <img src="/banners and logos/Strategy First.png" alt="Strategy first" style={{ width: 22, height: 22, objectFit: 'contain' }} loading="lazy" />, label: "Strategy first", desc: "Structure designed before you file." },
        { icon: <img src="/banners and logos/Complaince always.png" alt="Compliance always" style={{ width: 22, height: 22, objectFit: 'contain' }} loading="lazy" />, label: "Compliance always", desc: "Every detail handled, every time." },
        { icon: <img src="/banners and logos/Time Zone alligned.png" alt="Time zone aligned" style={{ width: 22, height: 22, objectFit: 'contain' }} loading="lazy" />, label: "Time zone aligned", desc: "Responsive support across the globe." },
        { icon: <img src="/banners and logos/Senior Led.png" alt="Senior led" style={{ width: 22, height: 22, objectFit: 'contain' }} loading="lazy" />, label: "Senior led", desc: "Direct access to experienced advisors." },
    ];

    return (
        <section className={styles.section} style={{ background: "#fff" }}>
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
                        margin: "0 auto 56px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 26, height: 1.5, background: G, flexShrink: 0 }} />
                        <span style={{
                            fontFamily: FONT, fontSize: 11, fontWeight: 700,
                            letterSpacing: "0.32em", textTransform: "uppercase", color: BLACK,
                        }}>What We Do</span>
                    </div>

                    <h2 style={{
                        fontFamily: FONT,
                        fontSize: "clamp(30px, 5vw, 52px)",
                        fontWeight: 700, color: BLACK,
                        lineHeight: 1.06, letterSpacing: "-0.02em",
                        margin: "0 0 14px", textAlign: "center",
                    }}>
                        We help global companies{" "}
                        <span style={{ fontFamily: FONT, fontStyle: "italic", fontWeight: 700, color: GOLD }}>
                            enter India
                        </span>{" "}
                        the right way.
                    </h2>

                    <p style={{
                        fontFamily: FONT, fontSize: 15, color: BLACK,
                        lineHeight: 1.6, textAlign: "center",
                        maxWidth: 520, margin: "0 auto",
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