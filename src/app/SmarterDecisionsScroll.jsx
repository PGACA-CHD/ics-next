import { useEffect, useRef, useState } from 'react';
import styles from './SmarterDecisionsScroll.module.css';

const FONT_HEADING = "var(--font-cormorant),'Cormorant Garamond',serif";
const FONT_BODY = "var(--font-cardo),'Cardo',Georgia,serif";

/**
 * SmarterDecisionsScroll
 * -----------------------
 * Sticky scroll-driven before/after reveal matching the reference design
 * pixel-for-pixel as closely as CSS/SVG allows:
 * - Knob is a single SVG (flag-shaped cap + glossy sphere + chevron icon)
 *   so the exact silhouette matches, rather than being approximated with
 *   stacked CSS divs.
 * - Card is near-black with a soft photographic glow at the base (a CSS
 *   gradient stand-in for the blurred floral photo in the reference —
 *   pass `bgImage` if you have the actual photo asset to use instead).
 * - Headings use Cormorant Garamond, body text uses Cardo, matching your
 *   site's type system.
 *
 * SCROLL MECHANIC: the outer wrapper is taller than one viewport height.
 * The inner content is `position: sticky; top: 0`, so it stays pinned on
 * screen while you scroll through that extra height. A scroll listener
 * (rAF-throttled) converts how far you've scrolled through that extra
 * distance into a 0→1 `progress` value, which drives the knob's color/
 * rotation and the card's before→after crossfade.
 */
export default function SmarterDecisionsScroll({
  before = {
    heading: "Challenges of managing investments today",
    points: [
      "Financial data is spread across platforms and is hard to understand",
      "Lack of clear direction for buy, hold, or sell decisions",
      "Tracking investments manually takes time and effort",
      "Decisions based on incomplete or outdated information",
    ],
    stats: [
      { value: "68%", label: "Financial data confusion" },
      { value: "55%", label: "Poor data understanding" },
    ],
  },
  after = {
    heading: "Smarter way to manage your investments",
    points: [
      "Get clear recommendations based on real-time data",
      "Understand risks before making investment decisions",
      "Monitor your portfolio in real time — no manual effort required",
      "Make consistent and informed investment choices",
    ],
    stats: [
      { value: "3X Faster", label: "Smart decisions" },
      { value: "24/7", label: "Real-time tracking" },
    ],
  },
  title = ["Smarter decisions", "start with clear data"],
  accentColor = "#22C48D",
  bgImage = null, // optional: pass a photo URL to replace the CSS gradient stand-in
}) {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(900);

  useEffect(() => {
    function updateDistance() {
      const w = window.innerWidth;
      setScrollDistance(w < 480 ? 500 : w < 720 ? 650 : 900);
    }
    updateDistance();
    window.addEventListener("resize", updateDistance);
    return () => window.removeEventListener("resize", updateDistance);
  }, []);

  useEffect(() => {
    let raf = null;
    function computeProgress() {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolledPast = -rect.top;
      const clamped = Math.min(Math.max(scrolledPast, 0), scrollDistance);
      setProgress(scrollDistance > 0 ? clamped / scrollDistance : 0);
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => { computeProgress(); raf = null; });
    }
    computeProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollDistance]);

  const isAfter = progress > 0.5;
  const active = isAfter ? after : before;

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + 900px)`, position: "relative" }}>
      <div className={styles.sdrStickyContainer}>
        {/* Title — Cormorant Garamond */}
        <h2 className={styles.sdrTitle} style={{
          fontFamily: FONT_HEADING,
          fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, textAlign: "center",
          lineHeight: 1.2, color: "#111", margin: "0 0 40px", maxWidth: 600,
        }}>
          {title[0]}<br />{title[1]}
        </h2>

        <div className={styles.sdrHeaderArea}>
          {/* Left Tab */}
          <div className={styles.sdrLabelTab}>
            <span style={{
              fontFamily: FONT_BODY, fontSize: 14, fontWeight: 700,
              color: isAfter ? "#c9c9c9" : "#111",
              transition: "color .35s ease",
            }}>Before FintechX</span>
          </div>

          {/* Knob */}
          <div className={styles.sdrKnobWrap}>
            <svg width="100%" height="100%" viewBox="0 0 96 96" style={{ overflow: "visible" }}>
              {/* Flag / cap shape sitting atop the sphere, tilted like the reference */}
              <path
                d="M28 26 Q34 4 54 6 Q68 8 70 20 L46 30 Z"
                fill={isAfter ? "#0a0a0a" : "#161616"}
                style={{ transition: "fill .35s ease" }}
              />
              <defs>
                <radialGradient id="sdrSphere" cx="35%" cy="28%" r="72%">
                  <stop offset="0%" stopColor={isAfter ? "#6be6bb" : "#fbfbfb"} />
                  <stop offset="55%" stopColor={isAfter ? accentColor : "#cfcfcf"} />
                  <stop offset="100%" stopColor={isAfter ? "#0b3d2e" : "#8f8f8f"} />
                </radialGradient>
                <radialGradient id="sdrCap" cx="40%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#d4d4d4" />
                  <stop offset="100%" stopColor="#9c9c9c" />
                </radialGradient>
              </defs>

              <circle
                cx="48" cy="54" r="34"
                fill="url(#sdrSphere)"
                stroke={isAfter ? "#08251c" : "#2b2b2b"}
                strokeWidth="4"
                style={{ transition: "stroke .35s ease" }}
              />
              <ellipse cx="38" cy="42" rx="10" ry="6" fill="rgba(255,255,255,.4)" />

              {/* "Before" — metallic inner cap button, no icon */}
              <g style={{ opacity: isAfter ? 0 : 1, transition: "opacity .3s ease" }}>
                <circle cx="48" cy="54" r="13" fill="url(#sdrCap)" stroke="#8a8a8a" strokeWidth="1.5" />
                <ellipse cx="44" cy="50" rx="4.5" ry="3" fill="rgba(255,255,255,.6)" />
              </g>

              {/* "After" — double chevron icon */}
              <g style={{ opacity: isAfter ? 1 : 0, transition: "opacity .3s ease" }}>
                <path d="M44 48 L38 54 L44 60 M52 48 L58 54 L52 60" fill="none"
                  stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>

          {/* Right Tab */}
          <div className={styles.sdrLabelTab}>
            <span style={{
              fontFamily: FONT_BODY, fontSize: 14, fontWeight: 700,
              color: isAfter ? "#111" : "#c9c9c9",
              transition: "color .35s ease",
            }}>After FintechX</span>
          </div>
        </div>

        {/* Card */}
        <div className={styles.sdrCardOuter} style={{
          border: isAfter ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
          transition: "border-color .4s ease",
        }}>
          <div className={styles.sdrCardPad} style={{
            position: "relative",
            background: isAfter ? "#0a0a0a" : "#eef0f2",
            transition: "background .4s ease",
          }}>
            {/* Soft photographic glow at the base for the "after" state —
                stand-in for the blurred floral/nature photo in the reference.
                Replace with bgImage for the exact asset. Hidden entirely in
                the "before" state, which is a plain light-gray card. */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: bgImage
                ? `linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,.55) 100%), url(${bgImage})`
                : `radial-gradient(ellipse 70% 50% at 30% 105%, rgba(34,196,141,.16) 0%, transparent 60%),
                   radial-gradient(ellipse 50% 40% at 75% 100%, rgba(120,60,140,.14) 0%, transparent 60%)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: isAfter ? 1 : 0,
              transition: "opacity .4s ease",
            }} />

            <div className="sdr-card-inner" style={{
              position: "relative", display: "grid",
              gridTemplateColumns: "1fr 210px", gap: 30, alignItems: "start",
            }}>
              <div key={isAfter ? "after" : "before"} style={{ animation: "sdrFadeIn .45s ease" }}>
                <h3 style={{
                  fontFamily: FONT_HEADING,
                  fontSize: "clamp(19px,2.2vw,25px)", fontWeight: 700, lineHeight: 1.32,
                  color: isAfter ? "#fff" : "#111",
                  marginBottom: 18,
                  transition: "color .4s ease",
                }}>
                  {active.heading}
                </h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {active.points.map((p, i) => (
                    <li key={i} style={{
                      fontFamily: FONT_BODY,
                      display: "flex", gap: 9, alignItems: "flex-start",
                      fontSize: 13.5, lineHeight: 1.55,
                      color: isAfter ? "rgba(255,255,255,.72)" : "#555",
                      transition: "color .4s ease",
                    }}>
                      <span style={{
                        flexShrink: 0, marginTop: 1, fontSize: 12, fontWeight: 700,
                        color: isAfter ? accentColor : "#e05a5a",
                      }}>
                        {isAfter ? "✓" : "✕"}
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sdr-stats" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {active.stats.map((s, i) => (
                  <div key={i} style={{
                    background: isAfter ? "rgba(10, 40, 25, 0.4)" : "#fff",
                    border: `1px solid ${isAfter ? "rgba(34,196,141,.2)" : "#eaeaea"}`,
                    borderRadius: 16, padding: "20px 24px",
                    transition: "background .4s ease, border-color .4s ease",
                  }}>
                    <div style={{
                      fontFamily: FONT_HEADING, fontSize: 24, fontWeight: 700,
                      color: isAfter ? "#fff" : "#111", marginBottom: 4,
                      transition: "color .4s ease",
                    }}>
                      {s.value}
                    </div>
                    <div style={{
                      fontFamily: FONT_BODY, fontSize: 13,
                      color: isAfter ? "rgba(255,255,255,.6)" : "#8a8a8a",
                      transition: "color .4s ease",
                    }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}