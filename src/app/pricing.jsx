'use client';
import { useState } from 'react';

const PRICING_TABS = [
  {
    key: 'nri',
    tabLabel: 'NRI Registration',
    heading: 'NRI company registration in India',
    subheading: 'For NRIs investing in or starting a company in India under the FEMA NRI route.',
    plans: [
      {
        tier: 'Starter',
        price: '₹14,900',
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
        price: '₹39,900',
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
        price: '₹74,900',
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
        price: '₹39,900',
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
        price: '₹99,900',
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
        price: '₹1,49,000',
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
        price: '₹1,50,000',
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
        price: '₹2,25,000',
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
        price: '₹3,75,000',
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
        price: '₹25,000',
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
        price: '₹50,000',
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
        price: '₹1,50,000',
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

export default function PricingTabsSection({ T, ROUTES }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = PRICING_TABS[activeTab];

  return (
    <section style={{ padding: '108px 56px', background: T.ivory }}>
      <div style={{ maxWidth: 1260, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
            color: T.s, fontWeight: 600, marginBottom: 14 }}>Engagement Models</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(32px,3.5vw,50px)',
            fontWeight: 600, lineHeight: 1.08, color: T.ch }}>
            Simple, transparent{' '}
            <span style={{ fontStyle: 'italic', color: T.f }}>pricing.</span>
          </h2>
          <p style={{ fontSize: 15, color: T.mid, marginTop: 14, fontWeight: 300,
            maxWidth: 560, margin: '14px auto 0' }}>
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
                padding: '11px 22px',
                borderRadius: 50,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
                border: i === activeTab ? `1px solid ${T.ch}` : `1px solid ${T.bdr}`,
                background: i === activeTab ? T.ch : '#fff',
                color: i === activeTab ? '#fff' : T.mid,
                transition: 'all .18s ease',
              }}
            >
              {t.tabLabel}
            </button>
          ))}
        </div>

        {/* Active tab heading */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h3 className="pt-heading font-display" style={{ fontSize: 22, fontWeight: 600,
            color: T.ch, marginBottom: 8 }}>{tab.heading}</h3>
          <p style={{ fontSize: 13.5, color: T.mid, maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
            {tab.subheading}
          </p>
        </div>

        {/* Cards */}
        <div className="pt-grid">
          {tab.plans.map(plan => {
            const isPopular = !!plan.popular;
            return (
              <div
                key={plan.tier}
                className={isPopular ? 'pt-card-popular' : ''}
                style={{
                  background: isPopular ? T.f : '#fff',
                  borderRadius: 20,
                  padding: '36px 32px',
                  border: `1px solid ${isPopular ? T.f : T.bdr}`,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: isPopular ? '0 24px 64px rgba(11,61,46,.22)' : 'none',
                }}
              >
                {isPopular && (
                  <div style={{
                    position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                    background: T.s, color: '#fff', fontSize: 11, fontWeight: 700,
                    padding: '5px 18px', borderRadius: 50, whiteSpace: 'nowrap', letterSpacing: .5,
                  }}>Most Popular</div>
                )}

                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
                  color: isPopular ? 'rgba(255,255,255,.45)' : T.lt, fontWeight: 600, marginBottom: 16 }}>
                  {plan.tier}
                </div>

                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: isPopular ? 'rgba(255,255,255,.45)' : T.mid }}>
                    {plan.unit === 'onwards' ? 'From' : 'Starts at'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span className="font-number" style={{ fontSize: 44,
                    color: isPopular ? '#fff' : T.ch, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontSize: 13, color: isPopular ? 'rgba(255,255,255,.45)' : T.lt, paddingBottom: 6 }}>
                    {plan.unit === 'onwards' ? '' : plan.unit}
                  </span>
                </div>

                {plan.minTerm && (
                  <div style={{ fontSize: 11.5, color: isPopular ? 'rgba(255,255,255,.5)' : T.lt, marginBottom: 12 }}>
                    {plan.minTerm}
                  </div>
                )}

                <p style={{ fontSize: 13.5, lineHeight: 1.75, marginBottom: 28, fontWeight: 300,
                  color: isPopular ? 'rgba(255,255,255,.72)' : T.mid }}>
                  {plan.description}
                </p>

                <button
                  className={isPopular ? 'ics-btn ics-btn-primary' : 'ics-btn ics-btn-outline'}
                  onClick={() => { window.location.href = ROUTES['contact']; }}
                  style={{
                    width: '100%', justifyContent: 'center', padding: '13px 20px',
                    fontSize: 14, borderRadius: 10, marginBottom: 32,
                    ...(isPopular ? { background: T.s, boxShadow: '0 4px 16px rgba(232,144,10,.4)', border: 'none' } : {}),
                  }}
                >
                  {plan.cta}
                </button>

                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
                  color: isPopular ? 'rgba(255,255,255,.35)' : T.lt, fontWeight: 600, marginBottom: 16 }}>
                  {plan.includedLabel}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.5,
                      color: isPopular ? 'rgba(255,255,255,.78)' : T.mid }}>
                      <span style={{ color: isPopular ? T.sl : T.f, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
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
          <p style={{ fontSize: 13, color: T.lt }}>
            All prices exclude government fees & GST. Final quote provided after the free strategy call.{' '}
            <button onClick={() => { window.location.href = ROUTES['contact']; }} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 13, color: T.f, fontWeight: 600, fontFamily: "'DM Sans',sans-serif",
            }}>Book a free call to get your custom quote →</button>
          </p>
        </div>

      </div>
    </section>
  );
}