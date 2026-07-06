import React, { useState, useRef, useEffect } from 'react';

// Case study content, one per numbered slide — same carousel UI, richer content per slide.
const CASES = [
  {
    flag: '🇺🇸',
    meta: 'USA · SaaS · Series B',
    badge: '19 days',
    title: 'Cloud analytics company entered India in 19 days',
    challenge:
      'Needed an India entity before their first engineering hire arrived in Bangalore. No time to get the structure wrong.',
    delivered:
      'Private limited company incorporated, FCGPR filing completed, transfer pricing policy documented, and first payroll run — all before day 30.',
    highlight: 'TP documentation: completed in week 2, not retrofitted at year-end.',
    tags: ['Private Limited', 'TP Policy', 'FCGPR', 'Payroll'],
  },
  {
    flag: '🇬🇧',
    meta: 'UK · Fintech · Regulated',
    badge: '24 days',
    title: 'London fintech set up a regulated India entity',
    challenge:
      'FCA-regulated company needed India presence with zero risk of PE exposure or RBI non-compliance flagging their UK auditors.',
    delivered:
      'WOS incorporated, RBI FCGPR filed within 30 days, GST registration complete, compliance calendar aligned to UK reporting cycle — clean for first audit.',
    highlight: 'Zero RBI or FEMA notices in 2 years of operation.',
    tags: ['WOS', 'RBI Compliance', 'GST + TDS', 'PE Risk'],
  },
  {
    flag: '🇦🇪',
    meta: 'UAE · Manufacturing · 12-year-old entity',
    badge: '6 weeks',
    title: 'Dubai group fixed a 12-year-old India structure',
    challenge:
      'Branch office had been operating without transfer pricing documentation for over a decade. Audit risk was significant.',
    delivered:
      'Converted branch to private limited company, renegotiated intercompany pricing, filed Form 3CEB, and established a defensible TP policy going forward.',
    highlight: 'Passed subsequent transfer pricing scrutiny with no adjustment.',
    tags: ['Restructuring', 'Transfer Pricing', '3CEB', 'Branch Conversion'],
  },
  {
    flag: '🇸🇬',
    meta: 'Singapore · Tech · GCC',
    badge: '8 weeks',
    title: 'APAC SaaS company scaled to a 40-person GCC',
    challenge:
      'Needed to move fast from 0 to 40 engineers in Pune — entity, payroll, ESOP, cost-plus pricing model, and ongoing compliance all at once.',
    delivered:
      'End-to-end GCC setup — entity incorporated, payroll running by week 6, ESOP trust structure in place, cost-plus pricing documented, compliance retainer active from month 2.',
    highlight: '40-person team fully compliant from hire #1. No payroll or FEMA gaps.',
    tags: ['GCC Setup', 'ESOP', 'Cost-Plus Pricing', 'Payroll'],
  },
];

const CHAR_STAGGER = 6;
const BLOCK_STEP = 90;

// Splits text into word groups of per-character spans for the title's rising-text reveal.
function CharText({ text, startIndex, tag: Tag = 'span', className }) {
  let idx = startIndex;
  const words = text.split(' ');
  const nodes = [];

  words.forEach((word, wi) => {
    const chars = [];
    for (const ch of word) {
      chars.push(
        <span
          key={idx}
          className="cst-char"
          style={{ animationDelay: `${idx * CHAR_STAGGER}ms` }}
        >
          {ch}
        </span>
      );
      idx++;
    }
    nodes.push(
      <span className="cst-word" key={`w-${wi}`}>
        {chars}
      </span>
    );
    if (wi < words.length - 1) {
      nodes.push(' ');
      idx++;
    }
  });

  return <Tag className={className}>{nodes}</Tag>;
}

function endIndexOf(text, startIndex) {
  let idx = startIndex;
  const words = text.split(' ');
  words.forEach((word, wi) => {
    idx += word.length;
    if (wi < words.length - 1) idx++;
  });
  return idx;
}

export default function ClientStoriesCarousel() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [colTransition, setColTransition] = useState('none');

  const animatingRef = useRef(false);

  useEffect(() => {
    // Mount initial state without a transition so it doesn't slide in on first paint.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setColTransition('');
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  // Geometry of the middle column: 16 stacked rows (cells + 4 featured tiles),
  // used to compute the exact translateY that centers a given row in the viewport.
  const CELL = 121.33;
  const GAP = 8;
  const ROW = CELL + GAP;
  const TOTAL_ROWS = 16;
  const COLUMN_HEIGHT = TOTAL_ROWS * ROW - GAP;
  const COLUMN_CENTER = COLUMN_HEIGHT / 2;
  const FEATURED_ROWS = [3, 6, 9, 12]; // row indices of featured tiles 1-4

  function centerYForRow(row) {
    const rowCenter = row * ROW + CELL / 2;
    return COLUMN_CENTER - rowCenter;
  }

  const middleY = centerYForRow(FEATURED_ROWS[index]);
  const sideY = -middleY;

  function paginate(dir) {
    if (animatingRef.current) return;
    const next = index + dir;
    if (next < 0 || next >= CASES.length) return;

    animatingRef.current = true;
    setIndex(next);
    setExiting(true);

    setTimeout(() => {
      setDisplayed(next);
      setExiting(false);
    }, 240);

    setTimeout(() => {
      animatingRef.current = false;
    }, 800);
  }

  const current = CASES[displayed];
  const titleCharEnd = endIndexOf(current.title, 0);
  const blockBaseDelay = titleCharEnd * CHAR_STAGGER + 160;

  return (
    <div className="cst-root">
      <style>{`
        .cst-root {
          --grid-bg: #f6f6f6;
          --cell-from: #f3f3f3;
          --cell-to: #fafafa;
          --cell-border: #e8e8e8;
          --text: #4a4a4a;
          --muted: #adacb1;
          --arrow-border: rgba(74, 74, 74, 0.15);
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
          --dur: 800ms;
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #eaeaea;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 48px 32px;
        }
        .cst-root * { box-sizing: border-box; }

        .cst-section-heading {
          margin: 0;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -0.6px;
          color: #1a1a1a;
          text-align: center;
        }
        .cst-section-subheading {
          margin: -12px 0 8px;
          font-size: 15px;
          color: var(--muted);
          text-align: center;
        }

        .cst-carousel {
          width: 1060px;
          max-width: 100%;
          min-height: 320px;
          display: flex;
          align-items: stretch;
          gap: 10px;
          background: var(--grid-bg);
          border: 1px solid var(--cell-border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: inset 0 2px 0 white;
          position: relative;
        }

        .cst-grid-section {
          width: 380px;
          flex-shrink: 0;
          align-self: stretch;
          position: relative;
          overflow: hidden;
          -webkit-mask-image:
            linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image:
            linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-composite: source-in;
          mask-composite: intersect;
        }
        .cst-grid {
          position: absolute; inset: 0;
          display: flex; justify-content: center; align-items: center; gap: 8px;
        }
        .cst-col {
          display: flex; flex-direction: column; gap: 8px; flex-shrink: 0;
          transition: transform var(--dur) var(--ease-inout);
          will-change: transform;
        }
        .cst-cell {
          width: 121.33px; height: 121.33px; border-radius: 12px;
          background: linear-gradient(180deg, var(--cell-from), var(--cell-to));
          border: 1px solid var(--cell-border);
          box-shadow: 0 1px 2px rgba(0,0,0,.05), inset 0 2px 0 white;
          filter: blur(1px);
          flex-shrink: 0;
        }
        .cst-featured {
          width: 121.34px; height: 121.34px; border-radius: 12px;
          overflow: hidden; position: relative;
          background: #d8d8e0;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          box-shadow:
            0 1.008px 0.705px -0.563px rgba(0,0,0,0.18),
            0 2.389px 1.672px -1.125px rgba(0,0,0,0.17),
            0 4.357px 3.05px -1.688px rgba(0,0,0,0.17),
            0 7.244px 5.07px -2.25px rgba(0,0,0,0.16),
            0 11.698px 8.188px -2.813px rgba(0,0,0,0.15),
            0 19.148px 13.404px -3.375px rgba(0,0,0,0.13),
            0 32.972px 23.08px -3.938px rgba(0,0,0,0.09),
            0 60px 42px -4.5px rgba(0,0,0,0.02),
            inset 0 0.5px 0 #e3e3e3, inset 0 1px 0 white, inset 0 -1px 0 black;
        }
        .cst-featured .cst-num {
          font-size: 40px;
          font-weight: 700;
          color: #17170f;
          z-index: 2;
        }
        .cst-featured::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(220.99deg,
            rgba(108, 92, 255, 0) 32%, rgb(108, 92, 255) 41%, rgb(173, 177, 255) 47%,
            rgba(130, 189, 237, 0.57) 54%, rgba(130, 189, 237, 0) 65%);
          filter: blur(6px);
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 1;
        }

        .cst-content {
          flex: 1;
          padding: 36px 32px;
          display: flex; flex-direction: column; justify-content: space-between;
          min-width: 0;
          align-self: stretch;
          gap: 24px;
        }
        .cst-top { display: flex; flex-direction: column; gap: 14px; min-width: 0; }

        .cst-stage {
          position: relative;
          width: 100%;
          min-height: 300px;
          overflow: hidden;
        }
        .cst-case {
          position: absolute; top: 0; left: 0; right: 0;
          display: flex; flex-direction: column;
          will-change: transform, opacity;
        }
        .cst-word { display: inline-block; white-space: nowrap; }
        .cst-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(0.42em);
          animation: cstCharRise 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes cstCharRise { to { opacity: 1; transform: translateY(0); } }

        .cst-case.cst-exit { animation: cstCaseExit 220ms ease-out forwards; }
        .cst-case.cst-exit .cst-char,
        .cst-case.cst-exit .cst-block { animation: none; opacity: 1; transform: none; }
        @keyframes cstCaseExit {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-12px); }
        }

        .cst-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
        }
        .cst-head-meta { display: flex; align-items: center; gap: 9px; min-width: 0; }
        .cst-flag { font-size: 22px; flex-shrink: 0; }
        .cst-meta-text {
          font-size: 11px; font-weight: 600; color: var(--muted);
          letter-spacing: 0.3px; line-height: 1.4;
        }
        .cst-badge {
          background: #17170f; color: #fff; padding: 4px 12px; border-radius: 50px;
          font-size: 11px; font-weight: 700; white-space: nowrap; flex-shrink: 0;
        }

        .cst-title {
          margin: 0; font-size: 21px; font-weight: 600;
          line-height: 1.3; letter-spacing: -0.3px; color: var(--text);
        }

        .cst-block {
          opacity: 0;
          transform: translateY(8px);
          animation: cstBlockRise 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          margin-bottom: 12px;
        }
        @keyframes cstBlockRise { to { opacity: 1; transform: translateY(0); } }

        .cst-label {
          font-size: 9.5px; letter-spacing: 1.4px; text-transform: uppercase;
          color: var(--muted); font-weight: 600; margin-bottom: 5px;
        }
        .cst-text {
          margin: 0; font-size: 13px; color: var(--text); line-height: 1.65; font-weight: 400;
        }

        .cst-highlight {
          background: #eef0ea; border-radius: 9px; padding: 9px 13px;
          display: flex; gap: 8px; align-items: flex-start;
        }
        .cst-highlight-check { color: #17170f; font-weight: 700; font-size: 13px; flex-shrink: 0; }
        .cst-highlight-text { font-size: 12px; color: #2c2c22; line-height: 1.55; font-weight: 500; margin: 0; }

        .cst-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 0; }
        .cst-tag {
          font-size: 10.5px; font-weight: 600; padding: 4px 10px;
          background: #f2efe8; border-radius: 50px; color: #2c2c22; letter-spacing: 0.2px;
        }

        .cst-controls { display: flex; gap: 6px; align-items: center; }
        .cst-nav {
          width: 24px; height: 24px; border-radius: 12px;
          border: 1px solid var(--arrow-border);
          background: transparent; color: var(--text); cursor: pointer;
          display: grid; place-items: center; padding: 0;
          transition: opacity 180ms var(--ease), transform 180ms var(--ease);
        }
        .cst-nav:hover:not(:disabled)  { transform: scale(1.08); }
        .cst-nav:active:not(:disabled) { transform: scale(0.94); }
        .cst-nav:disabled              { opacity: 0.4; cursor: default; }
        .cst-nav svg { width: 12px; height: 12px; opacity: 0.7; }

        @media (max-width: 760px) {
          .cst-carousel { flex-direction: column; }
          .cst-grid-section { width: 100%; height: 180px; }
          .cst-content { padding: 24px 20px; }
        }
      `}</style>

      <h2 className="cst-section-heading">What Our Clients Say</h2>
      <p className="cst-section-subheading">A few words from teams we've worked with</p>

      <div className="cst-carousel">
        {/* Left: sliding grid */}
        <div className="cst-grid-section">
          <div className="cst-grid">
            <div
              className="cst-col"
              style={{ transform: `translateY(${sideY}px)`, transition: colTransition }}
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <div className="cst-cell" key={i} />
              ))}
            </div>

            <div
              className="cst-col"
              style={{ transform: `translateY(${middleY}px)`, transition: colTransition }}
            >
              <div className="cst-cell" />
              <div className="cst-cell" />
              <div className="cst-cell" />
              <div className="cst-featured"><span className="cst-num">1</span></div>
              <div className="cst-cell" />
              <div className="cst-cell" />
              <div className="cst-featured"><span className="cst-num">2</span></div>
              <div className="cst-cell" />
              <div className="cst-cell" />
              <div className="cst-featured"><span className="cst-num">3</span></div>
              <div className="cst-cell" />
              <div className="cst-cell" />
              <div className="cst-featured"><span className="cst-num">4</span></div>
              <div className="cst-cell" />
              <div className="cst-cell" />
              <div className="cst-cell" />
            </div>

            <div
              className="cst-col"
              style={{ transform: `translateY(${sideY}px)`, transition: colTransition }}
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <div className="cst-cell" key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: case study content */}
        <div className="cst-content">
          <div className="cst-top">
            <div className="cst-stage">
              <div
                key={displayed}
                className={`cst-case${exiting ? ' cst-exit' : ''}`}
              >
                <div className="cst-block" style={{ animationDelay: '0ms', marginBottom: 14 }}>
                  <div className="cst-head">
                    <div className="cst-head-meta">
                      <span className="cst-flag">{current.flag}</span>
                      <div className="cst-meta-text">{current.meta}</div>
                    </div>
                    <div className="cst-badge">⚡ {current.badge}</div>
                  </div>
                </div>

                <CharText
                  tag="h3"
                  className="cst-title"
                  text={current.title}
                  startIndex={0}
                />

                <div
                  className="cst-block"
                  style={{ animationDelay: `${blockBaseDelay}ms`, marginTop: 16 }}
                >
                  <div className="cst-label">The challenge</div>
                  <p className="cst-text">{current.challenge}</p>
                </div>

                <div
                  className="cst-block"
                  style={{ animationDelay: `${blockBaseDelay + BLOCK_STEP}ms` }}
                >
                  <div className="cst-label">What we delivered</div>
                  <p className="cst-text">{current.delivered}</p>
                </div>

                <div
                  className="cst-block"
                  style={{ animationDelay: `${blockBaseDelay + BLOCK_STEP * 2}ms` }}
                >
                  <div className="cst-highlight">
                    <span className="cst-highlight-check">✓</span>
                    <p className="cst-highlight-text">{current.highlight}</p>
                  </div>
                </div>

                <div
                  className="cst-block cst-tags"
                  style={{ animationDelay: `${blockBaseDelay + BLOCK_STEP * 3}ms` }}
                >
                  {current.tags.map((tag, ti) => (
                    <span className="cst-tag" key={ti}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="cst-controls">
            <button
              className="cst-nav"
              disabled={index === 0}
              aria-label="Previous"
              onClick={() => paginate(-1)}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.5 2.5 3.5 6l4 3.5" />
              </svg>
            </button>
            <button
              className="cst-nav"
              disabled={index === CASES.length - 1}
              aria-label="Next"
              onClick={() => paginate(1)}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4.5 2.5 4 3.5-4 3.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}