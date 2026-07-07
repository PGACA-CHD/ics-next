'use client';

/**
 * IMPORTANT — add these two fonts in your layout.jsx / _app.jsx:
 *
 * import { Cormorant_Garamond, Cardo } from 'next/font/google'
 *
 * const cormorant = Cormorant_Garamond({
 *   subsets: ['latin'],
 *   weight: ['400','500','600','700'],
 *   style: ['normal','italic'],
 *   variable: '--font-cormorant',
 * })
 * const cardo = Cardo({
 *   subsets: ['latin'],
 *   weight: ['400','700'],
 *   style: ['normal','italic'],
 *   variable: '--font-cardo',
 * })
 *
 * Then on your root <html> tag:
 * <html className={`${cormorant.variable} ${cardo.variable}`}>
 *
 * The CSS variables --font-cormorant and --font-cardo will then be
 * available everywhere including this component.
 */

const FH = "var(--font-cormorant,'Cormorant Garamond',Georgia,serif)";
const FB = "var(--font-cardo,'Cardo',Georgia,serif)";

const OUTCOMES = [
    {
        metric: "19",
        metricSub: "days, entity to bank account",
        title: "SaaS company enters India",
        description:
            "Needed a fully India-compliant entity live before an engineering hire could start — incorporation, GST, and bank account opening ran in parallel rather than in sequence.",
        tags: ["SaaS", "Europe HQ"],
        accentGreen: false,
    },
    {
        metric: "£340k",
        metricSub: "saved through structure correction",
        title: "London fintech restructures a mistaken entry",
        description:
            "An FDI compliance gap was flagged before it triggered penalty exposure; the entry structure was corrected within a fiscal year rather than compounding across multiple audit cycles.",
        tags: ["Fintech", "UK HQ"],
        accentGreen: true,
    },
    {
        metric: "12",
        metricSub: "weeks, entity to first payroll run",
        title: "Dubai group opens a 12-person GCC",
        description:
            "Registered office identification, entity structuring, and staged hiring compliance were sequenced together so the team could onboard before every filing had cleared.",
        tags: ["GCC", "UAE HQ"],
        accentGreen: false,
    },
    {
        metric: "Zero",
        metricSub: "transfer-pricing disputes in 5 years",
        title: "APAC SaaS scales to a 40-person India team",
        description:
            "A defensible transfer-pricing model, benchmarked and documented from incorporation, has cleared every annual audit cycle without a single adjustment.",
        tags: ["SaaS", "Singapore HQ"],
        accentGreen: true,
    },
];

export default function ClientOutcomes() {
    return (
        <section style={{ background: "#FAFAF5", padding: "80px 40px 96px", fontFamily: FB }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* Eyebrow */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 26, height: 1.5, background: "#F5A828", flexShrink: 0 }} />
                    <span style={{
                        fontFamily: FB, fontSize: 11, fontWeight: 700,
                        letterSpacing: "0.32em", textTransform: "uppercase", color: "#F5A828",
                    }}>
                        Track record
                    </span>
                </div>

                {/* Heading */}
                <h2 style={{
                    fontFamily: FH,
                    fontSize: "clamp(30px, 5vw, 52px)",
                    fontWeight: 600,
                    color: "#0B3D2E",
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    margin: "0 0 14px",
                    textAlign: "center",
                }}>
                    What clients actually{" "}
                    <em style={{ fontStyle: "italic", fontWeight: 400, color: "#5C5C54" }}>
                        got done.
                    </em>
                </h2>

                <p style={{ fontFamily: FB, fontSize: 15, color: "#7a7060", margin: "0 auto 56px", lineHeight: 1.6, textAlign: "center", maxWidth: 520 }}>
                    Anonymized at client request. All outcomes independently verifiable.
                </p>

                {/* 2-col card grid — collapses to 1 col on mobile automatically */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
                    gap: 20,
                }}>
                    {OUTCOMES.map((item) => (
                        <div
                            key={item.title}
                            style={{
                                background: "#ffffff",
                                borderRadius: 18,
                                padding: "32px 28px 28px",
                                border: "1px solid rgba(11,61,46,0.10)",
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Top accent bar */}
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                                background: item.accentGreen ? "#0B3D2E" : "#F5A828",
                            }} />

                            {/* Metric + tags row */}
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 20 }}>
                                <div>
                                    {/* BIG NUMBER — Cormorant Garamond */}
                                    <p style={{
                                        fontFamily: FH,
                                        fontSize: "clamp(48px, 6vw, 72px)",
                                        fontWeight: 600,
                                        color: "#0B3D2E",
                                        lineHeight: 0.9,
                                        letterSpacing: "-0.03em",
                                        margin: 0,
                                    }}>
                                        {item.metric}
                                    </p>
                                    {/* Sub label — Cardo */}
                                    <p style={{
                                        fontFamily: FB,
                                        fontSize: 12,
                                        color: "#5C5C54",
                                        lineHeight: 1.4,
                                        margin: "8px 0 0",
                                        letterSpacing: "0.01em",
                                    }}>
                                        {item.metricSub}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", paddingTop: 4 }}>
                                    <span style={{
                                        fontFamily: FB, fontSize: 10.5, fontWeight: 700,
                                        letterSpacing: "0.14em", textTransform: "uppercase",
                                        padding: "3px 10px", borderRadius: 4,
                                        background: "rgba(245,168,40,0.12)", color: "#7a4e00",
                                        border: "1px solid rgba(245,168,40,0.35)", whiteSpace: "nowrap",
                                    }}>
                                        {item.tags[0]}
                                    </span>
                                    <span style={{
                                        fontFamily: FB, fontSize: 10.5, fontWeight: 700,
                                        letterSpacing: "0.14em", textTransform: "uppercase",
                                        padding: "3px 10px", borderRadius: 4,
                                        background: "rgba(11,61,46,0.06)", color: "#0B3D2E",
                                        border: "1px solid rgba(11,61,46,0.18)", whiteSpace: "nowrap",
                                    }}>
                                        {item.tags[1]}
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div style={{ height: 1, background: "rgba(11,61,46,0.10)", marginBottom: 18 }} />

                            {/* Title — Cormorant Garamond */}
                            <h3 style={{
                                fontFamily: FH,
                                fontSize: "clamp(18px, 2vw, 23px)",
                                fontWeight: 600,
                                color: "#0B3D2E",
                                margin: "0 0 10px",
                                lineHeight: 1.2,
                                letterSpacing: "-0.01em",
                            }}>
                                {item.title}
                            </h3>

                            {/* Description — Cardo */}
                            <p style={{
                                fontFamily: FB,
                                fontSize: 15,
                                color: "#5C5C54",
                                lineHeight: 1.72,
                                margin: 0,
                            }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}