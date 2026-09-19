import { useEffect, useRef, useState } from 'react';
import styles from './SmarterDecisionsScroll.module.css';

const FONT_HEADING = "var(--font-cormorant),'Cormorant Garamond',serif";
const FONT_BODY = "var(--font-cardo),'Cardo',Georgia,serif";

// Token system for the two states. Keeping this in one place makes the
// component's palette legible at a glance instead of scattered through JSX.
const TOKENS = {
  before: {
    cardBg: 'rgba(244, 243, 240, 0.8)',
    cardBorder: '#e7e6e2',
    heading: '#14181f',
    body: '#5c5c58',
    marker: '#b5502f',
    statBg: '#ffffff',
    statBorder: '#e7e6e2',
    statValue: '#14181f',
    statLabel: '#8a8a86',
    label: '#14181f',
    dimLabel: '#c7c6c2',
    dot: '#14181f',
  },
  after: {
    cardBg: 'rgba(14, 18, 16, 0.8)',
    cardBorder: '#1f2b26',
    heading: '#ffffff',
    body: 'rgba(255,255,255,0.85)',
    marker: '#3fae82',
    statBg: 'rgba(63,174,130,0.08)',
    statBorder: 'rgba(63,174,130,0.22)',
    statValue: '#f6f6f4',
    statLabel: 'rgba(246,246,244,0.55)',
    label: '#f6f6f4',
    dimLabel: '#3a3a38',
    dot: '#3a7e5d',
  },
};

/**
 * SmarterDecisionsScroll
 * -----------------------
 * Sticky scroll-driven before/after reveal, with a click-to-override toggle.
 *
 * - Scrolling through the wrapper's extra height drives `progress` (0→1),
 *   which flips the state once it crosses the midpoint.
 * - Clicking the toggle sets an explicit `manualAfter` override so the user
 *   can flip state without scrolling. Clicking again releases the override
 *   and hands control back to scroll position.
 */
export default function SmarterDecisionsScroll({
  before = {
    heading: 'Challenges of managing investments today',
    points: [
      'Financial data is spread across platforms and is hard to understand',
      'Lack of clear direction for buy, hold, or sell decisions',
      'Tracking investments manually takes time and effort',
      'Decisions based on incomplete or outdated information',
    ],
    stats: [
      { value: '68%', label: 'Financial data confusion' },
      { value: '55%', label: 'Poor data understanding' },
    ],
  },
  after = {
    heading: 'Smarter way to manage your investments',
    points: [
      'Get clear recommendations based on real-time data',
      'Understand risks before making investment decisions',
      'Monitor your portfolio in real time — no manual effort required',
      'Make consistent and informed investment choices',
    ],
    stats: [
      { value: '3x faster', label: 'Smart decisions' },
      { value: '24/7', label: 'Real-time tracking' },
    ],
  },
  title = ['Smarter decisions', 'start with clear data'],
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
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
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
      raf = requestAnimationFrame(() => {
        computeProgress();
        raf = null;
      });
    }
    computeProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollDistance]);

  const [manualAfter, setManualAfter] = useState(null);

  const isAfter = manualAfter !== null ? manualAfter : progress > 0.5;
  const active = isAfter ? after : before;
  const t = isAfter ? TOKENS.after : TOKENS.before;

  const handleToggleClick = () => {
    // First click pins the state explicitly; second click releases the
    // override and hands control back to scroll position.
    setManualAfter((prev) => (prev === null ? !isAfter : null));
  };

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + ${scrollDistance}px)`, position: 'relative' }}>
      <div className={styles.sdrStickyContainer}>
        <h2 className={styles.sdrTitle} style={{ fontFamily: FONT_HEADING }}>
          {title[0]}
          <br />
          {title[1]}
        </h2>

        {/* Signature toggle — click to override, or let scroll drive it */}
        <div
          className={styles.sdrToggleRow}
          onClick={handleToggleClick}
          role="button"
          tabIndex={0}
          aria-pressed={isAfter}
          aria-label={isAfter ? 'Showing after state, click to view before' : 'Showing before state, click to view after'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleClick();
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          <span
            className={styles.sdrToggleLabel}
            style={{ fontFamily: FONT_BODY, color: isAfter ? t.dimLabel : t.label }}
          >
            Before
          </span>
          <div className={styles.sdrTrack}>
            <div
              className={styles.sdrDot}
              style={{
                transform: isAfter ? 'translateX(34px)' : 'translateX(0)',
                background: t.dot,
              }}
            />
          </div>
          <span
            className={styles.sdrToggleLabel}
            style={{ fontFamily: FONT_BODY, color: isAfter ? t.label : t.dimLabel }}
          >
            After
          </span>
        </div>

        {/* Card */}
        <div
          className={styles.sdrCard}
          style={{ borderColor: t.cardBorder, backgroundColor: t.cardBg }}
        >
          <div className={styles.sdrCardPad}>
            <div className={styles.sdrGrid}>
              <div key={isAfter ? 'after' : 'before'} className={styles.sdrFadeIn}>
                <h3
                  style={{
                    fontFamily: FONT_HEADING,
                    fontSize: 'clamp(19px,2.2vw,25px)',
                    fontWeight: 600,
                    lineHeight: 1.32,
                    color: t.heading,
                    marginTop: 0,
                    marginBottom: 20,
                  }}
                >
                  {active.heading}
                </h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {active.points.map((p, i) => (
                    <li key={i} className={styles.sdrPoint} style={{ fontFamily: FONT_BODY, color: t.body }}>
                      <span className={styles.sdrMarker} style={{ background: t.marker }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {active.stats.map((s, i) => (
                  <div
                    key={i}
                    className={styles.sdrStatCard}
                    style={{ background: t.statBg, borderColor: t.statBorder }}
                  >
                    <div style={{ fontFamily: FONT_HEADING, fontSize: 23, fontWeight: 600, color: t.statValue, marginBottom: 4 }}>
                      {s.value}
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: t.statLabel }}>
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