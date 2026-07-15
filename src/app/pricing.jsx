'use client';
import { useState } from 'react';

const FONT = "Helvetica, Arial, sans-serif";
const GREEN = '#0b3d2e';   // brand dark green (buttons + popular card bg + selected pill)
const GOLD = '#e8900a';    // "Most Popular" badge + popular card CTA accent
const BLACK = '#000000';
const WHITE = '#ffffff';

const PRICING_TABS = [
  {
    key: 'nri',
    tabLabel: 'NRI Registration',
    heading: 'NRI company registration in India',
    subheading: 'For NRIs investing in or starting a company in India under the FEMA NRI route.',
    plans: [
      {
        tier: 'Starter',
        price: '$180',
        unit: 'one-time',
        description: 'Core incorporation for an NRI-owned entity, filed correctly under the right FEMA route.',
        includedLabel: "What's included",
        features: [
          'NRI route check',
          'Name reservation',
          'MOA/AOA',
          'SPICe+',
          'DIN/DSC for up to 2 directors',
          'Certificate of Incorporation',
          'PAN',
          'TAN',
          'PF/ESI',
        ],
        cta: 'Get Started →',
      },
      {
        tier: 'Growth',
        price: '$480',
        unit: 'one-time',
        description: 'Incorporation plus the registrations and first filings needed to actually start operating.',
        includedLabel: 'Everything in Starter, plus',
        popular: true,
        features: [
          'GST registration filing',
          'MSME',
          'INC-20A filing',
          'Share certificate',
          'First board pack',
          '90-day compliance calendar',
          'FCGPR filing',
          'Bank account opening support',
        ],
        cta: 'Get Started →',
      },
      {
        tier: 'Repatriation-Ready',
        price: '$900',
        unit: 'one-time',
        description: 'Everything you need for a clean first year, plus the repatriation and residency groundwork done early.',
        includedLabel: 'Everything in Growth, plus',
        features: [
          'Repatriation / dividend note',
          'Residency-transition checklist',
          'Basic DTAA orientation',
          'One strategy call',
          "First year directors' report",
          'First-year ROC filing complete',
          'First year ITR filing',
          'First year TDS returns filing',
        ],
        cta: 'Get Started →',
      },
    ],
  },
  {
    key: 'wos',
    tabLabel: 'Foreign Company / WOS',
    heading: 'Foreign company / wholly owned subsidiary setup in India',
    subheading: 'For a foreign parent company setting up a fully-owned Indian entity.',
    plans: [
      {
        tier: 'Starter',
        price: '$480',
        unit: 'one-time',
        description: 'FDI-compliant incorporation for your India subsidiary, structured right from day one.',
        includedLabel: "What's included",
        features: [
          'FDI route check',
          'Subsidiary structure note',
          'Name reservation',
          'MOA/AOA',
          'SPICe+',
          'DIN/DSC for up to 2 directors',
          'Certificate of Incorporation',
          'PAN',
          'TAN',
          'PF/ESI',
        ],
        cta: 'Get Started →',
      },
      {
        tier: 'Market Entry',
        price: '$1,200',
        unit: 'one-time',
        description: 'Full operational setup — registrations, banking, and the first month of compliance support.',
        includedLabel: 'Everything in Starter, plus',
        popular: true,
        features: [
          'GST registration filing',
          'INC-20A filing',
          'Share certificate',
          'First board pack',
          '90-day compliance calendar',
          'Bank account opening support',
          'FIRMS registration',
          'FCGPR filing',
          '1 month compliance support',
        ],
        cta: 'Get Started →',
      },
      {
        tier: 'CFO Desk',
        price: '$1,800',
        unit: 'one-time',
        description: 'Everything above, plus the intercompany and transfer pricing groundwork most companies miss.',
        includedLabel: 'Everything in Market Entry, plus',
        features: [
          'Intercompany starter pack',
          'TP kickoff memo',
          'Basic withholding tax note',
          'FLA year-one checklist',
          'Finance handover session',
        ],
        cta: 'Get Started →',
      },
    ],
  },
  {
    key: 'branch',
    tabLabel: 'Branch & Liaison Office',
    heading: 'Branch office and liaison office setup in India',
    subheading: 'For foreign companies establishing a branch, liaison, or project office instead of a subsidiary.',
    plans: [
      {
        tier: 'Liaison Office',
        price: '$1,800',
        unit: 'onwards',
        description: 'RBI-compliant liaison office setup with full banking and first-year groundwork.',
        includedLabel: "What's included",
        features: [
          'Route suitability review',
          'FNC support',
          'AD-bank coordination',
          'RBI pack',
          'PAN/TAN',
          'First-year checklist',
        ],
        cta: 'Get Started →',
      },
      {
        tier: 'Branch Office',
        price: '$2,700',
        unit: 'onwards',
        description: 'Everything in the liaison scope, extended for a fully operational branch office.',
        includedLabel: 'Everything in Liaison, plus',
        popular: true,
        features: [
          'FC-1 / MCA support',
          'Tax registration pack',
          'Banking pack',
          'First-year roadmap',
        ],
        cta: 'Get Started →',
      },
      {
        tier: 'Special Situations',
        price: '$4,500',
        unit: 'onwards',
        description: 'For complex or restricted activities that need senior-level structuring and regulatory coordination.',
        includedLabel: 'Everything above, plus',
        features: [
          'Complex activity review',
          'Restructuring support',
          'Regulatory coordination assistance',
          'Detailed handover',
          'Senior review',
        ],
        cta: 'Talk to Our Team →',
      },
    ],
  },
  {
    key: 'retainer',
    tabLabel: 'Ongoing Retainers',
    heading: 'Ongoing compliance retainers for India entities',
    subheading: 'Monthly retainers for entities that already exist and need continuous compliance coverage. 6-month minimum term.',
    plans: [
      {
        tier: 'Core',
        price: '$300',
        unit: '/ month',
        description: 'For lean entities with light monthly transaction volume.',
        includedLabel: "What's included",
        minTerm: '6-month minimum term',
        features: [
          'Monthly bookkeeping — up to 50 invoices/month',
          'GST/TDS for light volume — up to 50 invoices/month',
          'Payroll support — up to 20 employees',
          'ROC annual filing',
          'Quarterly review call',
        ],
        cta: 'Contact Us →',
      },
      {
        tier: 'Plus',
        price: '$600',
        unit: '/ month',
        description: 'For growing entities that need monthly reporting and audit support.',
        includedLabel: 'Everything in Core, plus',
        minTerm: '6-month minimum term',
        popular: true,
        features: [
          'Monthly bookkeeping — up to 200 invoices/month',
          'GST/TDS for volume — up to 200 invoices/month',
          'Payroll support — up to 40 employees',
          'Monthly MIS pack',
          'Audit support',
          'Monthly PF/ESI filing',
        ],
        cta: 'Contact Us →',
      },
      {
        tier: 'Controller Desk',
        price: '$1,800',
        unit: '/ month',
        description: 'Full controller-level coverage with board reporting and priority turnaround.',
        includedLabel: 'Everything in Plus, plus',
        minTerm: '6-month minimum term',
        features: [
          'Complete monthly bookkeeping',
          'GST/TDS filings',
          'Payroll support — up to 100 employees',
          'Board/HQ reporting support',
          'Controller close checklist',
          'Expanded process support',
          'Priority SLA',
        ],
        cta: 'Contact Us →',
      },
    ],
  },
];

// Animated GRADIENT wave background used only on non-popular (white) cards
function AnimatedWaves() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 20,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <svg
        className="pt-wave pt-wave-1"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-10%',
          width: '220%',
          height: '55%',
          minHeight: 130,
        }}
      >
        <defs>
          <linearGradient id="ptGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b3d2e" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#1c8f63" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#e8900a" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M0,160 C180,240 360,60 540,140 C720,220 900,40 1080,140 C1260,220 1350,120 1440,150 L1440,300 L0,300 Z"
          fill="url(#ptGrad1)"
        />
      </svg>
      <svg
        className="pt-wave pt-wave-2"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-12%',
          width: '220%',
          height: '42%',
          minHeight: 100,
        }}
      >
        <defs>
          <linearGradient id="ptGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8900a" stopOpacity="0.14" />
            <stop offset="50%" stopColor="#0b3d2e" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#1c8f63" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <path
          d="M0,150 C200,60 400,220 600,140 C800,60 1000,220 1200,140 C1320,96 1380,160 1440,140 L1440,300 L0,300 Z"
          fill="url(#ptGrad2)"
        />
      </svg>
      <svg
        className="pt-wave pt-wave-3"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-14%',
          width: '220%',
          height: '30%',
          minHeight: 70,
        }}
      >
        <defs>
          <linearGradient id="ptGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1c8f63" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#0b3d2e" stopOpacity="0.10" />
          </linearGradient>
        </defs>
        <path
          d="M0,140 C160,200 320,80 480,130 C640,180 800,60 960,130 C1120,200 1280,90 1440,130 L1440,300 L0,300 Z"
          fill="url(#ptGrad3)"
        />
      </svg>
    </div>
  );
}

export default function PricingTabsSection({ ROUTES }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = PRICING_TABS[activeTab];

  return (
    <section style={{ padding: '108px 56px', background: WHITE, fontFamily: FONT }}>
      <style>{`
        @keyframes pt-wave-move-1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-45%); }
        }
        @keyframes pt-wave-move-2 {
          0%   { transform: translateX(-45%); }
          100% { transform: translateX(0); }
        }
        @keyframes pt-wave-move-3 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-30%); }
        }
        .pt-wave-1 { animation: pt-wave-move-1 11s ease-in-out infinite alternate; }
        .pt-wave-2 { animation: pt-wave-move-2 15s ease-in-out infinite alternate; }
        .pt-wave-3 { animation: pt-wave-move-3 8s ease-in-out infinite alternate; }

        .pt-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .pt-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        @media (max-width: 900px) {
          .pt-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .pt-wave-1, .pt-wave-2, .pt-wave-3 { animation-duration: 7s; }
        }
      `}</style>

      <div style={{ maxWidth: 1260, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
            color: BLACK, fontWeight: 600, marginBottom: 14
          }}>Engagement Models</div>
          <h2 style={{
            fontFamily: FONT, fontSize: 'clamp(32px,3.5vw,50px)',
            fontWeight: 700, lineHeight: 1.08, color: BLACK
          }}>
            Simple, transparent{' '}
            <span style={{ fontStyle: 'italic', color: GOLD }}>pricing.</span>
          </h2>
          <p style={{
            fontFamily: FONT, fontSize: 15, color: BLACK, marginTop: 14, fontWeight: 400,
            maxWidth: 560, margin: '14px auto 0'
          }}>
            Fixed fees. No hidden billings. Choose the engagement that matches where you are.
          </p>
        </div>

        {/* Tabs */}
        <div className="pt-tabs" style={{ justifyContent: 'center', marginBottom: 44 }}>
          {PRICING_TABS.map((t, i) => (
            <button
              key={t.key}
              className="pt-tab-btn"
              onClick={() => setActiveTab(i)}
              style={{
                fontFamily: FONT,
                padding: '11px 22px',
                borderRadius: 50,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
                border: `1px solid ${BLACK}`,
                background: i === activeTab ? GREEN : WHITE,
                color: i === activeTab ? WHITE : BLACK,
                transition: 'all .18s ease',
              }}
            >
              {t.tabLabel}
            </button>
          ))}
        </div>

        {/* Active tab heading */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h3 style={{
            fontFamily: FONT, fontSize: 22, fontWeight: 700,
            color: BLACK, marginBottom: 8
          }}>{tab.heading}</h3>
          <p style={{ fontFamily: FONT, fontSize: 13.5, color: BLACK, maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
            {tab.subheading}
          </p>
        </div>

        {/* Cards */}
        <div className="pt-grid">
          {tab.plans.map(plan => {
            const isPopular = !!plan.popular;
            const textColor = isPopular ? WHITE : BLACK;
            return (
              <div
                key={plan.tier}
                style={{
                  fontFamily: FONT,
                  background: isPopular ? GREEN : WHITE,
                  borderRadius: 20,
                  padding: '36px 32px',
                  border: `1px solid ${BLACK}`,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'visible', // don't clip the badge
                  boxShadow: isPopular ? '0 24px 64px rgba(11,61,46,.22)' : 'none',
                }}
              >
                {/* wave layer clips itself only, not the whole card */}
                {!isPopular && <AnimatedWaves />}

                {isPopular && (
                  <div style={{
                    position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                    background: GOLD, color: WHITE, fontSize: 11, fontWeight: 700,
                    padding: '5px 18px', borderRadius: 50, whiteSpace: 'nowrap', letterSpacing: .5,
                    zIndex: 3,
                  }}>Most Popular</div>
                )}

                {/* content wrapper sits above the waves */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>

                  <div style={{
                    fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
                    color: textColor, fontWeight: 600, marginBottom: 16
                  }}>
                    {plan.tier}
                  </div>

                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: textColor }}>
                      {plan.unit === 'onwards' ? 'From' : 'Starts at'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: FONT, fontWeight: 700, fontSize: 44,
                      color: textColor, lineHeight: 1
                    }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: textColor, paddingBottom: 6 }}>
                      {plan.unit === 'onwards' ? '' : plan.unit}
                    </span>
                  </div>

                  {plan.minTerm && (
                    <div style={{ fontSize: 11.5, color: textColor, marginBottom: 12 }}>
                      {plan.minTerm}
                    </div>
                  )}

                  <p style={{
                    fontSize: 13.5, lineHeight: 1.75, marginBottom: 28, fontWeight: 400,
                    color: textColor
                  }}>
                    {plan.description}
                  </p>

                  <button
                    onClick={() => { window.location.href = ROUTES['contact']; }}
                    style={{
                      fontFamily: FONT,
                      width: '100%',
                      justifyContent: 'center',
                      padding: '13px 20px',
                      fontSize: 14,
                      fontWeight: 600,
                      borderRadius: 10,
                      marginBottom: 32,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      border: `1px solid ${BLACK}`,
                      background: isPopular ? GOLD : GREEN,
                      color: WHITE,
                    }}
                  >
                    {plan.cta}
                  </button>

                  <div style={{
                    fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
                    color: textColor, fontWeight: 600, marginBottom: 16
                  }}>
                    {plan.includedLabel}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{
                        display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.5,
                        color: textColor
                      }}>
                        <span style={{ color: isPopular ? GOLD : GREEN, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <p style={{ fontFamily: FONT, fontSize: 13, color: BLACK }}>
            All prices exclude government fees & taxes. Final quote provided after the free strategy call.{' '}
            <button onClick={() => { window.location.href = ROUTES['contact']; }} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 13, color: GREEN, fontWeight: 700, fontFamily: FONT,
            }}>Book a free call to get your custom quote →</button>
          </p>
        </div>

      </div>
    </section>
  );
}