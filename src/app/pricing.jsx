'use client';
import { useState } from 'react';

const FONT = "Helvetica, Arial, sans-serif";
const GREEN = '#0b3d2e';
const GOLD = '#e8900a';
const BLACK = '#000000';
const WHITE = '#ffffff';

// ─────────────────────────────────────────────
// CURRENCY CONFIG
// Pass country="australia" | "singapore" | "dubai" | "canada" | "uk" | "usa"
// Prices are hardcoded at mid-2025 rates, rounded to clean numbers.
// ─────────────────────────────────────────────
const CURRENCY = {
  usa: { code: 'USD', prefix: '$', },
  australia: { code: 'AUD', prefix: 'AUD ', note: 'Indicative AUD prices at approx. 1 USD = 1.54 AUD. Final invoice in USD.' },
  singapore: { code: 'SGD', prefix: 'SGD ', note: 'Indicative SGD prices at approx. 1 USD = 1.34 SGD. Final invoice in USD.' },
  dubai: { code: 'AED', prefix: 'AED ', note: 'Indicative AED prices at approx. 1 USD = 3.67 AED. Final invoice in USD.' },
  canada: { code: 'CAD', prefix: 'CAD ', note: 'Indicative CAD prices at approx. 1 USD = 1.36 CAD. Final invoice in USD.' },
  uk: { code: 'GBP', prefix: '£', note: 'Indicative GBP prices at approx. 1 USD = 0.79 GBP. Final invoice in USD.' },
};

// ─────────────────────────────────────────────
// PRICES  [nri_starter, nri_growth, nri_repat,
//          wos_starter, market_entry, cfo_desk,
//          liaison, branch, special,
//          core_mo, plus_mo, controller_mo]
// ─────────────────────────────────────────────
const PRICES = {
  usa: ['$180', '$480', '$900', '$480', '$1,200', '$1,800', '$1,800', '$2,700', '$4,500', '$300', '$600', '$1,800'],
  australia: ['AUD 300', 'AUD 700', 'AUD 1,400', 'AUD 700', 'AUD 1,800', 'AUD 2,800', 'AUD 2,800', 'AUD 4,200', 'AUD 7,000', 'AUD 450', 'AUD 900', 'AUD 2,800'],
  singapore: ['SGD 250', 'SGD 600', 'SGD 1,200', 'SGD 600', 'SGD 1,600', 'SGD 2,400', 'SGD 2,400', 'SGD 3,600', 'SGD 6,000', 'SGD 400', 'SGD 800', 'SGD 2,400'],
  dubai: ['AED 700', 'AED 1,800', 'AED 3,400', 'AED 1,800', 'AED 4,400', 'AED 6,600', 'AED 6,600', 'AED 10,000', 'AED 16,600', 'AED 1,100', 'AED 2,200', 'AED 6,600'],
  canada: ['CAD 250', 'CAD 700', 'CAD 1,200', 'CAD 700', 'CAD 1,600', 'CAD 2,400', 'CAD 2,400', 'CAD 3,600', 'CAD 6,200', 'CAD 400', 'CAD 800', 'CAD 2,400'],
  uk: ['£140', '£380', '£710', '£380', '£950', '£1,420', '£1,420', '£2,130', '£3,560', '£240', '£470', '£1,420'],
};

function buildTabs(p) {
  return [
    {
      key: 'nri', tabLabel: 'NRI Registration',
      heading: 'NRI company registration in India',
      subheading: 'For NRIs investing in or starting a company in India under the FEMA NRI route.',
      plans: [
        {
          tier: 'Starter', price: p[0], unit: 'one-time', includedLabel: "What's included",
          description: 'Core incorporation for an NRI-owned entity, filed correctly under the right FEMA route.',
          features: ['NRI route check', 'Name reservation', 'MOA/AOA', 'SPICe+', 'DIN/DSC for up to 2 directors', 'Certificate of Incorporation', 'PAN', 'TAN', 'PF/ESI'],
          cta: 'Get Started →'
        },
        {
          tier: 'Growth', price: p[1], unit: 'one-time', popular: true, includedLabel: 'Everything in Starter, plus',
          description: 'Incorporation plus the registrations and first filings needed to actually start operating.',
          features: ['GST registration filing', 'MSME', 'INC-20A filing', 'Share certificate', 'First board pack', '90-day compliance calendar', 'FCGPR filing', 'Bank account opening support'],
          cta: 'Get Started →'
        },
        {
          tier: 'Repatriation-Ready', price: p[2], unit: 'one-time', includedLabel: 'Everything in Growth, plus',
          description: 'Everything you need for a clean first year, plus the repatriation and residency groundwork done early.',
          features: ['Repatriation / dividend note', 'Residency-transition checklist', 'Basic DTAA orientation', 'One strategy call', "First year directors' report", 'First-year ROC filing complete', 'First year ITR filing', 'First year TDS returns filing'],
          cta: 'Get Started →'
        },
      ],
    },
    {
      key: 'wos', tabLabel: 'Foreign Company / WOS',
      heading: 'Foreign company / wholly owned subsidiary setup in India',
      subheading: 'For a foreign parent company setting up a fully-owned Indian entity.',
      plans: [
        {
          tier: 'Starter', price: p[3], unit: 'one-time', includedLabel: "What's included",
          description: 'FDI-compliant incorporation for your India subsidiary, structured right from day one.',
          features: ['FDI route check', 'Subsidiary structure note', 'Name reservation', 'MOA/AOA', 'SPICe+', 'DIN/DSC for up to 2 directors', 'Certificate of Incorporation', 'PAN', 'TAN', 'PF/ESI'],
          cta: 'Get Started →'
        },
        {
          tier: 'Market Entry', price: p[4], unit: 'one-time', popular: true, includedLabel: 'Everything in Starter, plus',
          description: 'Full operational setup — registrations, banking, and the first month of compliance support.',
          features: ['GST registration filing', 'INC-20A filing', 'Share certificate', 'First board pack', '90-day compliance calendar', 'Bank account opening support', 'FIRMS registration', 'FCGPR filing', '1 month compliance support'],
          cta: 'Get Started →'
        },
        {
          tier: 'CFO Desk', price: p[5], unit: 'one-time', includedLabel: 'Everything in Market Entry, plus',
          description: 'Everything above, plus the intercompany and transfer pricing groundwork most companies miss.',
          features: ['Intercompany starter pack', 'TP kickoff memo', 'Basic withholding tax note', 'FLA year-one checklist', 'Finance handover session'],
          cta: 'Get Started →'
        },
      ],
    },
    {
      key: 'branch', tabLabel: 'Branch & Liaison Office',
      heading: 'Branch office and liaison office setup in India',
      subheading: 'For foreign companies establishing a branch, liaison, or project office instead of a subsidiary.',
      plans: [
        {
          tier: 'Liaison Office', price: p[6], unit: 'onwards', includedLabel: "What's included",
          description: 'RBI-compliant liaison office setup with full banking and first-year groundwork.',
          features: ['Route suitability review', 'FNC support', 'AD-bank coordination', 'RBI pack', 'PAN/TAN', 'First-year checklist'],
          cta: 'Get Started →'
        },
        {
          tier: 'Branch Office', price: p[7], unit: 'onwards', popular: true, includedLabel: 'Everything in Liaison, plus',
          description: 'Everything in the liaison scope, extended for a fully operational branch office.',
          features: ['FC-1 / MCA support', 'Tax registration pack', 'Banking pack', 'First-year roadmap'],
          cta: 'Get Started →'
        },
        {
          tier: 'Special Situations', price: p[8], unit: 'onwards', includedLabel: 'Everything above, plus',
          description: 'For complex or restricted activities that need senior-level structuring and regulatory coordination.',
          features: ['Complex activity review', 'Restructuring support', 'Regulatory coordination assistance', 'Detailed handover', 'Senior review'],
          cta: 'Talk to Our Team →'
        },
      ],
    },
    {
      key: 'retainer', tabLabel: 'Ongoing Retainers',
      heading: 'Ongoing compliance retainers for India entities',
      subheading: 'Monthly retainers for entities that need continuous compliance coverage. 6-month minimum term.',
      plans: [
        {
          tier: 'Core', price: p[9], unit: '/ month', minTerm: '6-month minimum term', includedLabel: "What's included",
          description: 'For lean entities with light monthly transaction volume.',
          features: ['Monthly bookkeeping — up to 50 invoices/month', 'GST/TDS for light volume — up to 50 invoices/month', 'Payroll support — up to 20 employees', 'ROC annual filing', 'Quarterly review call'],
          cta: 'Contact Us →'
        },
        {
          tier: 'Plus', price: p[10], unit: '/ month', popular: true, minTerm: '6-month minimum term', includedLabel: 'Everything in Core, plus',
          description: 'For growing entities that need monthly reporting and audit support.',
          features: ['Monthly bookkeeping — up to 200 invoices/month', 'GST/TDS for volume — up to 200 invoices/month', 'Payroll support — up to 40 employees', 'Monthly MIS pack', 'Audit support', 'Monthly PF/ESI filing'],
          cta: 'Contact Us →'
        },
        {
          tier: 'Controller Desk', price: p[11], unit: '/ month', minTerm: '6-month minimum term', includedLabel: 'Everything in Plus, plus',
          description: 'Full controller-level coverage with board reporting and priority turnaround.',
          features: ['Complete monthly bookkeeping', 'GST/TDS filings', 'Payroll support — up to 100 employees', 'Board/HQ reporting support', 'Controller close checklist', 'Expanded process support', 'Priority SLA'],
          cta: 'Contact Us →'
        },
      ],
    },
  ];
}

// ─────────────────────────────────────────────
// COMPONENT
// Usage:
//   <PricingSection country="australia" ROUTES={ROUTES} />
//   <PricingSection country="uk"         ROUTES={ROUTES} />
//   <PricingSection country="usa"        ROUTES={ROUTES} />
//   etc.
// ─────────────────────────────────────────────
export default function PricingSection({ country = 'usa', ROUTES }) {
  const key = country.toLowerCase();
  const cur = CURRENCY[key] || CURRENCY.usa;
  const prices = PRICES[key] || PRICES.usa;
  const TABS = buildTabs(prices);

  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  const contactUrl = ROUTES?.contact || '/contact';

  return (
    <section className="ps-section" style={{ padding: '48px 56px', background: WHITE, fontFamily: FONT }}>
      <style>{`
        .ps-tabs {
          display: flex;
          flex-wrap: nowrap;
          gap: 10px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
          justify-content: center;
        }
        .ps-tabs::-webkit-scrollbar { display: none; }
        .ps-tabs button { flex-shrink: 0; }
        .ps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) {
          .ps-section { padding: 32px 20px !important; }
          .ps-grid    { grid-template-columns: 1fr; }
          .ps-tabs    { justify-content: flex-start; padding-bottom: 10px; }
        }
      `}</style>

      <div style={{ maxWidth: 1260, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: BLACK, fontWeight: 600, marginBottom: 14 }}>
            Engagement Models · {cur.code}
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 700, lineHeight: 1.08, color: BLACK }}>
            Simple, transparent{' '}
            <span style={{ fontStyle: 'italic', color: GOLD }}>pricing.</span>
          </h2>
          <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, fontWeight: 400, maxWidth: 560, margin: '14px auto 0' }}>
            Fixed fees. No hidden billings. Choose the engagement that matches where you are.
          </p>
          {/* Currency note — only shown for non-USD */}
          {key !== 'usa' && (
            <p style={{ fontFamily: FONT, fontSize: 11.5, color: '#aaa', margin: '10px auto 0', maxWidth: 520 }}>
              {cur.note}
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="ps-tabs" style={{ marginBottom: 44 }}>
          {TABS.map((t, i) => (
            <button key={t.key} onClick={() => setActiveTab(i)} style={{
              fontFamily: FONT, padding: '11px 22px', borderRadius: 50,
              fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${BLACK}`,
              background: i === activeTab ? GREEN : WHITE,
              color: i === activeTab ? WHITE : BLACK,
              transition: 'all .18s ease',
            }}>{t.tabLabel}</button>
          ))}
        </div>

        {/* Active tab heading */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h3 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 8 }}>{tab.heading}</h3>
          <p style={{ fontFamily: FONT, fontSize: 13.5, color: BLACK, maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>{tab.subheading}</p>
        </div>

        {/* Cards */}
        <div className="ps-grid">
          {tab.plans.map(plan => {
            const pop = !!plan.popular;
            const tc = pop ? WHITE : BLACK;
            return (
              <div key={plan.tier} style={{
                fontFamily: FONT,
                background: pop ? GREEN : WHITE,
                borderRadius: 20,
                padding: '36px 32px',
                border: `1px solid ${BLACK}`,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible',
                boxShadow: pop ? '0 24px 64px rgba(11,61,46,.22)' : 'none',
              }}>
                {pop && (
                  <div style={{
                    position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                    background: GOLD, color: WHITE, fontSize: 11, fontWeight: 700,
                    padding: '5px 18px', borderRadius: 50, whiteSpace: 'nowrap',
                    letterSpacing: 0.5, zIndex: 3,
                  }}>Most Popular</div>
                )}

                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: tc, fontWeight: 600, marginBottom: 16 }}>
                  {plan.tier}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: tc }}>{plan.unit === 'onwards' ? 'From' : 'Starts at'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: pop ? 52 : 40, color: pop ? GOLD : GREEN, lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 13, color: tc, paddingBottom: 6 }}>
                    {plan.unit === 'onwards' ? '' : plan.unit}
                  </span>
                </div>
                {plan.minTerm && <div style={{ fontSize: 11.5, color: tc, marginBottom: 12 }}>{plan.minTerm}</div>}
                <p style={{ fontSize: 13.5, lineHeight: 1.75, marginBottom: 28, fontWeight: 400, color: tc }}>{plan.description}</p>
                <button onClick={() => { window.location.href = contactUrl; }} style={{
                  fontFamily: FONT, width: '100%', justifyContent: 'center',
                  padding: '13px 20px', fontSize: 14, fontWeight: 600,
                  borderRadius: 10, marginBottom: 32, cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  border: `1px solid ${BLACK}`,
                  background: pop ? GOLD : GREEN, color: WHITE,
                }}>{plan.cta}</button>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: tc, fontWeight: 600, marginBottom: 16 }}>
                  {plan.includedLabel}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.5, color: tc }}>
                      <span style={{ color: pop ? GOLD : GREEN, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <p style={{ fontFamily: FONT, fontSize: 13, color: BLACK }}>
            All prices exclude government fees &amp; taxes. Final quote after the free strategy call.{' '}
            <button onClick={() => { window.location.href = contactUrl; }} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 13, color: GREEN, fontWeight: 700, fontFamily: FONT,
            }}>Book a free call to get your custom quote →</button>
          </p>
        </div>

      </div>
    </section>
  );
}