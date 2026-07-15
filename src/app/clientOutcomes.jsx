'use client';

import { useEffect, useRef, useState } from 'react';

const HV = "Helvetica, Arial, sans-serif";
const G = "#0B3D2E";
const GOLD = "#e69819";
const HS = "clamp(28px, 3vw, 42px)";

// Wave gradient themes per card (cycles through 4)
const WAVE_THEMES = [
    { from: "rgba(9,48,36,0.10)", to: "rgba(9,48,36,0.02)", acc: "#093024", bar: G },
    { from: "rgba(245,168,40,0.12)", to: "rgba(245,168,40,0.02)", acc: "#7a4e00", bar: GOLD },
    { from: "rgba(26,92,154,0.10)", to: "rgba(26,92,154,0.02)", acc: "#1a5c9a", bar: "#1a5c9a" },
    { from: "rgba(74,58,138,0.10)", to: "rgba(74,58,138,0.02)", acc: "#3a2d72", bar: "#3a2d72" },
];

const OUTCOMES = [
    {
        metric: "19",
        metricSub: "days, entity to bank account",
        title: "SaaS company enters India",
        description: "Needed a fully India-compliant entity live before an engineering hire could start — incorporation, GST, and bank account opening ran in parallel rather than in sequence.",
        tags: ["SaaS", "Europe HQ"],
    },
    {
        metric: "$340k",
        metricSub: "saved through structure correction",
        title: "London fintech restructures a mistaken entry",
        description: "An FDI compliance gap was flagged before it triggered penalty exposure; the entry structure was corrected within a fiscal year rather than compounding across multiple audit cycles.",
        tags: ["Fintech", "UK HQ"],
    },
    {
        metric: "12",
        metricSub: "weeks, entity to first payroll run",
        title: "Dubai group opens a 12-person GCC",
        description: "Registered office identification, entity structuring, and staged hiring compliance were sequenced together so the team could onboard before every filing had cleared.",
        tags: ["GCC", "UAE HQ"],
    },
    {
        metric: "Zero",
        metricSub: "transfer-pricing disputes in 5 years",
        title: "APAC SaaS scales to a 40-person India team",
        description: "A defensible transfer-pricing model, benchmarked and documented from incorporation, has cleared every annual audit cycle without a single adjustment.",
        tags: ["SaaS", "Singapore HQ"],
    },
];

function OutcomeCard({ item, index }) {
    const [vis, setVis] = useState(false);
    const [hov, setHov] = useState(false);
    const ref = useRef(null);
    const theme = WAVE_THEMES[index % WAVE_THEMES.length];

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), index * 120); obs.disconnect(); } },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [index]);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                /* wave gradient background */
                background: `radial-gradient(ellipse at 20% 80%, ${theme.from} 0%, ${theme.to} 50%, #fff 72%)`,
                backgroundSize: "300% 300%",
                animation: vis ? `waveShift 10s ease infinite` : "none",
                animationDelay: `${index * 0.8}s`,

                borderRadius: 18,
                border: "1px solid rgba(0,0,0,0.07)",
                padding: "28px 26px 24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",

                /* entry animation */
                opacity: vis ? 1 : 0,
                transform: vis
                    ? hov ? "translateY(-6px)" : "translateY(0)"
                    : "translateY(28px)",
                transition: vis
                    ? "transform 0.28s ease, box-shadow 0.28s ease, opacity 0.5s ease"
                    : `opacity 0.5s ease ${index * 120}ms, transform 0.55s ease ${index * 120}ms`,
                boxShadow: hov
                    ? "0 18px 48px rgba(0,0,0,0.10)"
                    : "0 2px 12px rgba(0,0,0,0.04)",
                cursor: "default",
                fontFamily: HV,
            }}
        >
            {/* Top accent bar */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: theme.bar,
                borderRadius: "18px 18px 0 0",
            }} />

            {/* Metric + tags row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
                <div>
                    {/* Metric number — reduced size */}
                    <p style={{
                        fontFamily: HV,
                        fontSize: "clamp(32px, 4vw, 48px)",
                        fontWeight: 700,
                        color: G,
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        margin: 0,
                    }}>
                        {item.metric}
                    </p>
                    <p style={{
                        fontFamily: HV,
                        fontSize: 12,
                        color: "#666",
                        lineHeight: 1.45,
                        margin: "7px 0 0",
                        letterSpacing: "0.01em",
                    }}>
                        {item.metricSub}
                    </p>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end", paddingTop: 2 }}>
                    <span style={{
                        fontFamily: HV, fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        padding: "3px 10px", borderRadius: 4,
                        background: "rgba(245,168,40,0.12)", color: "#7a4e00",
                        border: "1px solid rgba(245,168,40,0.30)", whiteSpace: "nowrap",
                    }}>{item.tags[0]}</span>
                    <span style={{
                        fontFamily: HV, fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        padding: "3px 10px", borderRadius: 4,
                        background: "rgba(11,61,46,0.07)", color: G,
                        border: "1px solid rgba(11,61,46,0.18)", whiteSpace: "nowrap",
                    }}>{item.tags[1]}</span>
                </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginBottom: 16 }} />

            {/* Title */}
            <h3 style={{
                fontFamily: HV,
                fontSize: "clamp(15px, 1.6vw, 18px)",
                fontWeight: 700,
                color: "#000",
                margin: "0 0 10px",
                lineHeight: 1.3,
            }}>
                {item.title}
            </h3>

            {/* Description */}
            <p style={{
                fontFamily: HV,
                fontSize: 13.5,
                color: "#555",
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 400,
            }}>
                {item.description}
            </p>
        </div>
    );
}

export default function ClientOutcomes() {
    return (
        <section style={{ background: "#fff", padding: "80px 56px 96px", fontFamily: HV }}>
            <style>{`
        @keyframes waveShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @media (max-width: 768px) {
          .co-grid { grid-template-columns: 1fr !important; }
          .co-section { padding: 60px 20px 72px !important; }
        }
      `}</style>

            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* ── Heading — same pattern as every other section ── */}
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p style={{
                        fontSize: 10, letterSpacing: "0.42em", textTransform: "uppercase",
                        color: G, fontWeight: 700, marginBottom: 14,
                        fontFamily: HV, margin: "0 0 14px",
                    }}>
                        Track Record
                    </p>
                    <h2 style={{ fontSize: HS, fontWeight: 700, lineHeight: 1.1, margin: 0, fontFamily: HV }}>
                        <span style={{ color: G }}>What clients actually</span>{" "}
                        <em style={{ color: GOLD, fontStyle: "italic" }}>got done.</em>
                    </h2>
                    <p style={{
                        fontFamily: HV, fontSize: 14, color: "#666",
                        margin: "16px auto 0", lineHeight: 1.65, maxWidth: 480,
                    }}>
                        Anonymized at client request. All outcomes independently verifiable.
                    </p>
                </div>

                {/* Card grid */}
                <div
                    className="co-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
                        gap: 20,
                    }}
                >
                    {OUTCOMES.map((item, i) => (
                        <OutcomeCard key={item.title} item={item} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}