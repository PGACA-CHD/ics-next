'use client';
import { useRouter } from 'next/navigation';

const FONT = "Helvetica, Arial, sans-serif";
const GREEN = '#0b3d2e';
const GOLD = '#e8900a';
const BLACK = '#000000';
const WHITE = '#ffffff';

const PLANS = [
    {
        tier: 'Core',
        price: '$300',
        unit: '/ month',
        minTerm: '6-month minimum term',
        popular: false,
        description: 'For lean entities with light monthly transaction volume.',
        includedLabel: "What's included",
        features: [
            'Monthly bookkeeping — up to 50 invoices/month',
            'GST/TDS for light volume — up to 50 invoices/month',
            'Payroll support — up to 20 employees',
            'ROC annual filing',
            'Quarterly review call',
        ],
    },
    {
        tier: 'Plus',
        price: '$600',
        unit: '/ month',
        minTerm: '6-month minimum term',
        popular: true,
        description: 'For growing entities that need monthly reporting and audit support.',
        includedLabel: 'Everything in Core, plus',
        features: [
            'Monthly bookkeeping — up to 200 invoices/month',
            'GST/TDS for volume — up to 200 invoices/month',
            'Payroll support — up to 40 employees',
            'Monthly MIS pack',
            'Audit support',
            'Monthly PF/ESI filing',
        ],
    },
    {
        tier: 'Controller Desk',
        price: '$1,800',
        unit: '/ month',
        minTerm: '6-month minimum term',
        popular: false,
        description: 'Full controller-level coverage with board reporting and priority turnaround.',
        includedLabel: 'Everything in Plus, plus',
        features: [
            'Complete monthly bookkeeping',
            'GST/TDS filings',
            'Payroll support — up to 100 employees',
            'Board/HQ reporting support',
            'Controller close checklist',
            'Expanded process support',
            'Priority SLA',
        ],
    },
];

export default function RetainerPricing({ contactUrl = '/contact' }) {
    const router = useRouter();
    const go = () => router.push(contactUrl);

    return (
        <>
            <style>{`
        .rp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: stretch;
          font-family: ${FONT};
        }
        .rp-card {
          border-radius: 20px;
          padding: 36px 32px;
          border: 1px solid ${BLACK};
          background: ${WHITE};
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: visible;
          box-shadow: none;
          transition: box-shadow .28s ease, transform .28s ease;
        }
        .rp-card:hover {
          box-shadow: 0 14px 40px rgba(11,61,46,0.13);
          transform: translateY(-3px);
        }
        .rp-card.pop {
          background: ${GREEN};
          box-shadow: 0 24px 64px rgba(11,61,46,0.22);
        }
        .rp-card.pop:hover {
          box-shadow: 0 28px 72px rgba(11,61,46,0.30);
          transform: translateY(-4px);
        }
        .rp-badge {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: ${GOLD};
          color: ${WHITE};
          font-size: 11px;
          font-weight: 700;
          padding: 5px 18px;
          border-radius: 50px;
          white-space: nowrap;
          letter-spacing: 0.5px;
          font-family: ${FONT};
          z-index: 3;
        }
 .rp-cta {
  width: 100%;
  padding: 13px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  margin-bottom: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT};
  border: none;
  outline: none;
  box-shadow: none;
  transition: all .25s ease;
}

.rp-cta:hover {
  opacity: 0.92;
  transform: translateY(-2px);
}

.rp-cta:focus,
.rp-cta:active,
.rp-cta:focus-visible {
  outline: none;
  border: none;
  box-shadow: none;
}
        .rp-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
          flex: 1;
        }
        .rp-features li {
          display: flex;
          gap: 10px;
          font-size: 13.5px;
          line-height: 1.5;
          font-family: ${FONT};
        }
        .rp-note-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-size: 13px;
          color: ${GREEN};
          font-weight: 700;
          font-family: ${FONT};
        }
        @media (max-width: 900px) {
          .rp-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) {
          .rp-card { padding: 26px 20px; }
        }
      `}</style>

            <div className="rp-grid">
                {PLANS.map(plan => {
                    const pop = plan.popular;
                    const tc = pop ? WHITE : BLACK;
                    return (
                        <div key={plan.tier} className={`rp-card${pop ? ' pop' : ''}`}>
                            {pop && <div className="rp-badge">Most Popular</div>}

                            {/* Tier */}
                            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, color: tc, marginBottom: 16, fontFamily: FONT }}>
                                {plan.tier}
                            </div>

                            {/* Price label */}
                            <div style={{ marginBottom: 8 }}>
                                <span style={{ fontSize: 11, color: tc, fontFamily: FONT }}>Starts at</span>
                            </div>

                            {/* Price */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: pop ? 52 : 40, lineHeight: 1, color: pop ? GOLD : GREEN }}>
                                    {plan.price}
                                </span>
                                <span style={{ fontSize: 13, color: tc, paddingBottom: 6, fontFamily: FONT }}>{plan.unit}</span>
                            </div>

                            {/* Min term */}
                            <div style={{ fontSize: 11.5, color: tc, marginBottom: 12, fontFamily: FONT }}>
                                {plan.minTerm}
                            </div>

                            {/* Description */}
                            <p style={{ fontSize: 13.5, lineHeight: 1.75, marginBottom: 28, fontWeight: 400, color: tc, fontFamily: FONT }}>
                                {plan.description}
                            </p>

                            {/* CTA */}
                            <button className="rp-cta" style={{ background: pop ? GOLD : GREEN, color: WHITE }} onClick={go}>
                                Contact Us →
                            </button>

                            {/* Included label */}
                            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600, color: tc, marginBottom: 16, fontFamily: FONT }}>
                                {plan.includedLabel}
                            </div>

                            {/* Features */}
                            <ul className="rp-features">
                                {plan.features.map(f => (
                                    <li key={f} style={{ color: tc }}>
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
                    <button className="rp-note-btn" onClick={go}>
                        Book a free call to get your custom quote →
                    </button>
                </p>
            </div>
        </>
    );
}