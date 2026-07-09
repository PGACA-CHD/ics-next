'use client';
import Link from 'next/link';

const TOOLS = [
  { href: '/tools/income-tax-calculator', icon: 'fas fa-calculator', title: 'Income Tax Calculator', subtitle: 'FY 2025-26 / AY 2026-27', desc: 'Companies, LLP, and Individuals (resident & non-resident) under New & Old Regime. Slab-wise breakdown with surcharge, cess, and MAT/AMT warnings.', tags: ['Companies', 'LLP', 'Individuals', 'New & Old Regime'], cta: 'Open Calculator', color: 'blue', group: 'Tax Calculators' },
  { href: '/tools/advance-tax-calculator', icon: 'fas fa-calendar-alt', title: 'Advance Tax Calculator', subtitle: 'FY 2026-27 · Quarterly Instalments', desc: 'Calculate quarterly advance tax instalments. Due dates: 15 June, 15 September, 15 December, 15 March. Covers individuals, companies and LLPs.', tags: ['Advance Tax', 'Instalments', '234B / 234C', 'Quarterly'], cta: 'Calculate Instalments', color: 'blue', group: 'Tax Calculators' },
  { href: '/tools/capital-gains-calculator', icon: 'fas fa-chart-line', title: 'Capital Gains Calculator', subtitle: 'FY 2025-26 · Budget 2024 Rates', desc: 'LTCG and STCG on listed equity, property, debt funds and other assets. Updated for Budget 2024 rate changes — 12.5% LTCG on equity, property without indexation.', tags: ['LTCG', 'STCG', 'Equity', 'Property'], cta: 'Calculate Capital Gains', color: 'green', group: 'Tax Calculators' },
  { href: '/tools/payroll-calculator', icon: 'fas fa-money-bill-wave', title: 'Payroll / CTC Calculator', subtitle: 'CTC to Take-Home Salary', desc: 'Convert CTC to monthly take-home. Computes PF, ESI, professional tax, and income tax under New or Old Regime. Includes employer PF and gratuity breakdown.', tags: ['CTC', 'Take-Home', 'PF & ESI', 'Income Tax'], cta: 'Calculate Take-Home', color: 'purple', group: 'Tax Calculators' },
  { href: '/tools/tds-rates', icon: 'fas fa-clipboard-list', title: 'TDS Rate Chart', subtitle: 'FY 2026-27 · Sections 192\u2013196D', desc: 'Comprehensive TDS rate reference across all major sections \u2014 192 to 196D. Searchable table with threshold limits, challan codes, IT Act 2025 table references, and individual/HUF vs company rates.', tags: ['Section 194', 'Section 195', 'Non-Residents', 'All Sections'], cta: 'View TDS Rates', color: 'blue', group: 'GST & Compliance' },
  { href: '/tools/tcs-rates', icon: 'fas fa-receipt', title: 'TCS Rate Chart', subtitle: 'FY 2026-27 · Section 206C', desc: 'All TCS sub-sections under Section 206C \u2014 scrap, timber, minerals, LRS remittances (20% / 5% / 0.5%), motor vehicles, and sale of goods. IT Act 2025 mapping and Form 27EQ codes.', tags: ['Section 206C', 'LRS / Remittance', 'Form 27EQ', 'IT Act 2025'], cta: 'View TCS Rates', color: 'blue', group: 'GST & Compliance' },
  { href: '/tools/hsn-sac-finder', icon: 'fas fa-search', title: 'GST HSN / SAC Finder', subtitle: 'Live CBIC Search · 4 & 6-digit codes', desc: 'Find HSN codes for goods or SAC codes for services. Browse 500+ 4-digit and 6-digit codes across all 99 chapters, or search live via CBIC.', tags: ['HSN Codes', 'SAC Codes', '6-digit', 'CBIC'], cta: 'Search HSN / SAC', color: 'green', group: 'GST & Compliance' },
  { href: '/tools/gst-due-dates', icon: 'fas fa-calendar-check', title: 'GST Due Date Calendar', subtitle: 'FY 2026-27 · All Return Types', desc: 'GSTR-1, GSTR-3B, GSTR-9, GSTR-4, CMP-08 due dates for FY 2026-27. Covers monthly filers, QRMP quarterly filers, and composition dealers.', tags: ['GSTR-1', 'GSTR-3B', 'GSTR-9', 'QRMP'], cta: 'View Calendar', color: 'red', group: 'GST & Compliance' },
  { href: '/tools/dtaa-rate-finder', icon: 'fas fa-globe', title: 'DTAA Rate Finder', subtitle: 'India · 90+ Treaty Countries', desc: "Find withholding tax rates under India's DTAA with 90+ countries \u2014 dividends, interest, royalties, and FTS. Covers TRC requirements and MLI impact.", tags: ['DTAA', 'Withholding Tax', 'Treaty', 'Form 10F'], cta: 'Find Treaty Rates', color: 'green', group: 'International Tax' },
  { href: '/tools/fdi-sector-checker', icon: 'fas fa-industry', title: 'FDI Sector Limit Checker', subtitle: 'DPIIT Consolidated FDI Policy', desc: "Check FDI limits for any sector \u2014 automatic route vs government approval route. 65+ sectors covered with conditions. Based on DPIIT's Consolidated FDI Policy.", tags: ['FDI Limits', 'Automatic Route', 'Government Route', 'DPIIT'], cta: 'Check FDI Limits', color: 'blue', group: 'International Tax' },
  { href: '/tools/company-name-check', icon: 'fas fa-building', title: 'Company Name Check', subtitle: 'MCA RUN · Name Availability Guide', desc: 'Guide to checking company name availability in India. Name rules, prohibited words, MCA portal links, and tips for getting your name approved first time.', tags: ['MCA', 'RUN Service', 'Company Name', 'SPICe+'], cta: 'Check Name Rules', color: 'purple', group: 'Incorporation' },
];

const PILL = {
  blue: { bg: 'rgba(0,113,227,0.10)', text: '#004ea8', bdr: 'rgba(0,113,227,0.40)' },
  green: { bg: 'rgba(36,138,61,0.10)', text: '#165c28', bdr: 'rgba(36,138,61,0.40)' },
  red: { bg: 'rgba(215,0,21,0.10)', text: '#a30010', bdr: 'rgba(215,0,21,0.40)' },
  purple: { bg: 'rgba(137,68,171,0.10)', text: '#5e1f80', bdr: 'rgba(137,68,171,0.40)' },
};

/* SpotlightCard effect — color per tool, tied to each card's accent */
const SPOTLIGHT = {
  blue: 'rgba(0,113,227,0.35)',
  green: 'rgba(36,138,61,0.35)',
  red: 'rgba(215,0,21,0.35)',
  purple: 'rgba(137,68,171,0.35)',
};

export default function Page() {
  const handleCardSpotlight = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="lg-page">
      <style>{`
        * { box-sizing: border-box; }
        .lg-page {
          --blue:#0071e3; --green:#248a3d; --red:#d70015; --purple:#8944ab;
          --brand:#093024; --brand-hover:#0f4a35;
          --dark:#1d1d1f; --mid:#3c3c40;
          --bdr:rgba(0,0,0,0.48); --bdr-lt:rgba(0,0,0,0.09);
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
          min-height:100vh; background:#fff; color:var(--dark);
        }

        /* ── HERO ── */
        .lg-hero {
          width:100%;
          background:#f5f5f0;
          padding:96px 56px 88px;
          text-align:center;
        }
        .lg-hero-inner { max-width:860px; margin:0 auto; }
        .lg-label {
          display:inline-block; font-size:11px; letter-spacing:2px;
          text-transform:uppercase; font-weight:600; color:#777;
          margin-bottom:28px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-hero h1 {
          font-size:clamp(40px,6vw,80px); font-weight:800; line-height:1.04;
          letter-spacing:-0.035em; margin:0 0 26px; color:#111;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-hero h1 .ul-wrap {
          position:relative; display:inline-block;
        }
        .lg-hero h1 .ul-line {
          position:absolute; left:0; bottom:-4px;
          width:100%; height:5px; background:var(--brand); border-radius:2px;
        }
        .lg-hero p {
          font-size:17px; color:#555; line-height:1.75;
          max-width:600px; margin:0 auto 40px; font-weight:400;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-hero-btn {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--brand); color:#fff;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
          font-size:15px; font-weight:700;
          padding:14px 28px; border-radius:6px; border:none;
          cursor:pointer; text-decoration:none;
          transition:background 0.2s ease, transform 0.15s ease;
        }
        .lg-hero-btn:hover { background:var(--brand-hover); transform:translateY(-1px); }

        /* ── SECTION ── */
        .lg-section { max-width:1320px; margin:0 auto; padding:48px 28px 80px; }

        /* ── GRID ── */
        .lg-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }

        /* ── CARD (with SpotlightCard hover effect) ── */
        .lg-card {
          position:relative;
          --mouse-x:50%; --mouse-y:50%;
          --spotlight-color: rgba(255,255,255,0.25);
          background:rgba(255,255,255,0.28); backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px); border-radius:16px;
          border:1px solid var(--bdr); box-shadow:0 4px 20px rgba(0,0,0,0.06);
          padding:22px 20px; display:flex; flex-direction:column;
          text-decoration:none; color:inherit; overflow:hidden;
          transition:transform 0.25s ease,box-shadow 0.25s ease,background 0.25s ease;
        }
        .lg-card::before {
          content:''; position:absolute; inset:0; z-index:0;
          background:radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%);
          opacity:0; transition:opacity 0.5s ease; pointer-events:none;
        }
        .lg-card:hover::before, .lg-card:focus-within::before { opacity:1; }
        .lg-card:hover {
          transform:translateY(-4px); background:rgba(255,255,255,0.55);
          box-shadow:0 10px 32px rgba(0,0,0,0.11);
        }
        .lg-card-content {
          position:relative; z-index:1;
          display:flex; flex-direction:column; flex-grow:1;
        }
        .lg-card-head { display:flex; align-items:flex-start; gap:16px; margin-bottom:14px; }
        .lg-icon {
          width:40px; height:40px; border-radius:10px;
          display:flex; align-items:center; justify-content:center; font-size:16px;
          border:1px solid var(--bdr); background:rgba(255,255,255,0.40);
          backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); flex-shrink:0;
        }
        .lg-title-block { display:flex; flex-direction:column; justify-content:center; }
        .lg-card h2 {
          font-size:15px; font-weight:700; margin:0; color:var(--dark);
          letter-spacing:-0.01em; line-height:1.25;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-card .sub {
          font-size:11.5px; font-weight:600; margin-top:3px;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .c-blue{color:var(--blue);} .c-green{color:var(--green);}
        .c-red{color:var(--red);} .c-purple{color:var(--purple);}
        .lg-card p {
          font-size:13.5px; color:var(--mid); line-height:1.68;
          margin:0; flex-grow:1; font-weight:400;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:14px; }
        .lg-tag {
          font-size:11px; font-weight:500; border-radius:20px; padding:3px 10px;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-foot {
          margin-top:16px; padding-top:13px; border-top:1px solid var(--bdr-lt);
          display:flex; justify-content:space-between; align-items:center;
        }
        .lg-cta-label {
          font-size:13px; font-weight:700;
          display:inline-flex; align-items:center; gap:4px;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-group-label {
          font-size:9.5px; font-weight:600; color:#999;
          text-transform:uppercase; letter-spacing:.8px;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }

        /* ── DISCLAIMER ── */
        .lg-disclaimer {
          margin-top:24px; padding:16px 22px; display:flex; gap:12px; align-items:flex-start;
          background:rgba(255,255,255,0.28); backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px); border-radius:14px;
          border:1px solid var(--bdr); box-shadow:0 4px 20px rgba(0,0,0,0.05);
        }
        .lg-disclaimer i { color:var(--blue); font-size:15px; margin-top:2px; flex-shrink:0; }
        .lg-disclaimer p {
          font-size:12px; color:var(--mid); line-height:1.65; margin:0;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-disclaimer strong { color:var(--dark); }

        /* ── CTA BAND (dark card style, matches reference) ── */
        .lg-cta-band {
          width:100%; padding:72px 24px 96px; background:#fff;
        }
        .lg-cta-card {
          max-width:1180px; margin:0 auto;
          background:var(--brand);
          border-radius:24px;
          padding:56px 60px;
          display:flex; align-items:center; justify-content:space-between; gap:40px;
          box-shadow:0 24px 60px rgba(9,48,36,0.28);
        }
        .lg-cta-text { text-align:left; max-width:620px; }
        .lg-cta-card h2 {
          font-size:clamp(22px,2.6vw,30px); font-weight:800; letter-spacing:-0.02em;
          margin:0 0 12px; color:#fff;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-cta-card p {
          color:rgba(255,255,255,0.78); font-size:15px; line-height:1.75;
          margin:0; font-weight:400;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
        }
        .lg-cta-btn {
          display:inline-flex; align-items:center; gap:8px; flex-shrink:0; white-space:nowrap;
          background:#e8983a; color:#1d1d1f;
          font-size:15px; font-weight:700; padding:15px 28px; border-radius:8px;
          border:none; text-decoration:none; cursor:pointer;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
          transition:background 0.2s ease, transform 0.15s ease;
        }
        .lg-cta-btn:hover { background:#f0a94f; transform:translateY(-1px); }

        /* ── RESPONSIVE ── */
        @media(max-width:960px){
          .lg-grid{grid-template-columns:repeat(2,1fr);}
          .lg-section{padding:40px 18px 64px;}
          .lg-hero{padding:72px 28px 64px;}
        }
        @media(max-width:760px){
          .lg-cta-card{flex-direction:column; align-items:flex-start; padding:40px 28px;}
          .lg-cta-text{text-align:left;}
          .lg-cta-btn{width:100%; justify-content:center;}
        }
        @media(max-width:520px){
          .lg-grid{grid-template-columns:1fr;gap:12px;}
          .lg-hero{padding:56px 18px 52px;}
          .lg-section{padding:32px 14px 56px;}
          .lg-cta-band{padding:56px 16px 72px;}
        }
      `}</style>

      {/* ── HERO — full width, off-white, left-aligned, brand-color underline ── */}
      <section className="lg-hero">
        <div className="lg-hero-inner">
          <div className="lg-label">Free Tools</div>
          <h1>
            India Tax, GST &amp;{' '}
            <span className="ul-wrap">
              Corporate
              <span className="ul-line" />
            </span>{' '}
            Reference Tools.
          </h1>
          <p>
            10 free calculators and reference tools built by our Ex-Big 4 CA team — income tax,
            capital gains, advance tax, payroll, TDS, GST, DTAA, FDI limits and more. No sign-up required.
          </p>
          <Link href="/contact" className="lg-hero-btn">
            Talk to our CA team &rarr;
          </Link>
        </div>
      </section>

      {/* ── TOOLS GRID ── */}
      <div className="lg-section">
        <div className="lg-grid">
          {TOOLS.map((tool) => {
            const p = PILL[tool.color];
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="lg-card"
                onMouseMove={handleCardSpotlight}
                style={{ '--spotlight-color': SPOTLIGHT[tool.color] }}
              >
                <div className="lg-card-content">
                  <div className="lg-card-head">
                    <div className={`lg-icon c-${tool.color}`}><i className={tool.icon}></i></div>
                    <div className="lg-title-block">
                      <h2>{tool.title}</h2>
                      <div className={`sub c-${tool.color}`}>{tool.subtitle}</div>
                    </div>
                  </div>
                  <p>{tool.desc}</p>
                  <div className="lg-tags">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="lg-tag" style={{ background: p.bg, color: p.text, border: `1px solid ${p.bdr}` }}>{tag}</span>
                    ))}
                  </div>
                  <div className="lg-foot">
                    <span className={`lg-cta-label c-${tool.color}`}>{tool.cta} &rarr;</span>
                    <span className="lg-group-label">{tool.group}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* DISCLAIMER */}
        <div className="lg-disclaimer">
          <i className="fas fa-info-circle"></i>
          <p><strong>Disclaimer:</strong> These tools are for reference and general information only. Tax rates are based on Finance Act 2025. Always consult a qualified Chartered Accountant for professional tax advice.</p>
        </div>
      </div>

      {/* ── CTA BAND — dark green rounded card, matching reference layout ── */}
      <section className="lg-cta-band">
        <div className="lg-cta-card">
          <div className="lg-cta-text">
            <h2>Need expert tax advice?</h2>
            <p>Our Ex-Big 4 CA team handles international tax, transfer pricing, DTAA structuring, and India incorporation for foreign companies.</p>
          </div>
          <Link href="/contact" className="lg-cta-btn">Book a Free Consultation &rarr;</Link>
        </div>
      </section>
    </div>
  );
}