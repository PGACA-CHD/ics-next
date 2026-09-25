'use client';
import { useState } from 'react';
import Link from 'next/link';
import { T, PHONE_RAW } from '@/lib/config';
import { submitToZoho, trackConsultationRequest } from '@/lib/utils';
import GovernmentDisclosure from '@/components/shared/GovernmentDisclosure';

const CURRENCIES = [
  { code: 'USD', symbol: '$',   rate: 90,  flag: '🇺🇸' },
  { code: 'GBP', symbol: '£',   rate: 114, flag: '🇬🇧' },
  { code: 'EUR', symbol: '€',   rate: 98,  flag: '🇪🇺' },
  { code: 'SGD', symbol: 'S$',  rate: 67,  flag: '🇸🇬' },
  { code: 'AED', symbol: 'AED', rate: 25,  flag: '🇦🇪' },
  { code: 'CAD', symbol: 'CA$', rate: 66,  flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$',  rate: 58,  flag: '🇦🇺' },
];

const fmtPrice = (inr, currency) => {
  const c = CURRENCIES.find(x => x.code === currency) || CURRENCIES[0];
  const val = Math.round(inr / c.rate);
  const formatted = val.toLocaleString('en-US');
  return c.code === 'AED' ? `AED ${formatted}` : `${c.symbol}${formatted}`;
};

const Check = ({ children, light }) => (
  <li style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
    <span style={{ color: light ? T.sl : T.f, fontWeight: 700, flexShrink: 0, fontSize: 13, marginTop: 1 }}>✓</span>
    <span style={{ fontSize: 13, color: light ? 'rgba(255,255,255,.75)' : T.mid, lineHeight: 1.55 }}>{children}</span>
  </li>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.s, fontWeight: 600, marginBottom: 12 }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   REGISTRATION TIERS — 4 entity types, 3 packages each
   ═══════════════════════════════════════════════════════════════════════════ */

const ENTITY_TABS = [
  { id: 'nri', label: 'NRI Setup', short: 'NRI' },
  { id: 'wos', label: 'Foreign / WOS', short: 'WOS' },
  { id: 'brlo', label: 'Branch & Liaison', short: 'Branch/LO' },
  { id: 'domestic', label: 'Domestic Pvt Ltd', short: 'Domestic' },
];

const DOMESTIC = {
  intro: 'Your Private Limited Company, incorporated correctly from day one — not just an Incorporation document forms filing. We review your share capital structure, objects clause, GST readiness, and first-year compliance path before a single document is filed.',
  tiers: [
    {
      name: 'Essential', inr: 9999,timeline: '7–12 working days',
      best: 'Founders who need a clean incorporation and will handle GST and post-setup filings separately.',
      items: [
        'Name reservation (RUN)',
        'MOA & AOA drafting',
        'Incorporation document forms integrated filing',
        'Directors Identification Number / DSC for 2 directors',
        'incorporation certificate',
        'Tax registration numbers',
        'PF / ESI registration',
      ],
    },
    {
      name: 'Launch', inr: 14900, timeline: '7–12 working days',
      badge: 'Most Popular', highlight: false,
      best: 'Most founders — incorporation plus immediate post-setup essentials in one engagement.',
      items: [
        'Everything in Essential',
        'GST registration filing',
        'MSME registration',
        'INC-20A filing',
        'Share certificate issuance',
        'First board resolution pack',
        '90-day compliance calendar',
      ],
    },
    {
      name: 'Ultimate One Year', inr: 49900, timeline: '7–12 days + full Year 1',
      best: 'Companies that want their entire first year of compliance covered — incorporation through first annual return.',
      items: [
        'Everything in Launch',
        'First-year directors\' report',
        'First-year regulatory filing (AOC-4 / MGT-7)',
        'First-year ITR filing',
        'First-year TDS returns filing',
      ],
    },
  ],
  govFees: 'Government fees (Ministry of Corporate Affairs filing, stamp duty) billed at actual — typically $35–$90. DSC included in all packages.',
};

const NRI = {
  intro: 'Starting a company as an NRI is not a standard domestic incorporation. The investment route, funding mechanism, bank account type, and repatriation structure must be correct from the first filing — or you risk FEMA complications that are expensive to fix later.',
  tiers: [
    {
      name: 'Starter', inr: 16200, timeline: '10–18 working days',
      best: 'NRIs who need correct NRI route identification upfront and will handle post-setup steps separately.',
      items: [
        'NRI route check (Schedule 4 FEMA)',
        'Name reservation (RUN)',
        'MOA & AOA drafting',
        'Incorporation document forms integrated filing',
        'Directors Identification Number / DSC for 2 directors',
        'incorporation certificate + tax registration numbers',
        'PF / ESI registration',
      ],
    },
    {
      name: 'Growth', inr: 43200, timeline: '18–25 working days',
      badge: 'Most Popular',
      best: 'Most NRI founders — incorporation plus FCGPR, banking, and the post-setup steps NRI companies specifically need.',
      items: [
        'Everything in Starter',
        'GST + MSME registration',
        'INC-20A + share certificates',
        'FCGPR filing with RBI',
        'Bank account opening support',
        'Board resolution pack',
        '90-day compliance calendar',
      ],
    },
    {
      name: 'Repatriation-Ready', inr: 81000, timeline: '18–25 days + full Year 1',
      best: 'NRIs who need first-year setup with repatriation planning and DTAA awareness built in.',
      items: [
        'Everything in Growth',
        'Repatriation / dividend note',
        'Residency-transition checklist',
        'Basic DTAA orientation',
        'One strategy call (30 min)',
        'First-year regulatory + ITR + TDS filing',
      ],
    },
  ],
  govFees: 'Government fees, stamp duty, notarisation/apostille, and third-party costs billed at actual. DSC included.',
};

const WOS = {
  intro: 'Setting up an India subsidiary is not an incorporation exercise — it is an India-entry project. Entity structure, FDI route, RBI reporting, banking, transfer pricing model, and compliance calendar must be designed together before a single document is filed.',
  tiers: [
    {
      name: 'Starter', inr: 43200, timeline: '7–12 working days',
      best: 'Foreign companies with an India-based finance resource or existing advisor for post-setup work.',
      items: [
        'FDI route and sector check',
        'Subsidiary structure note',
        'Name reservation (RUN)',
        'MOA & AOA drafting',
        'Incorporation document forms integrated filing',
        'Directors Identification Number / DSC for 2 directors',
        'incorporation certificate + tax registration numbers + PF/ESI',
      ],
    },
    {
      name: 'Market Entry', inr: 108000, timeline: '4–6 weeks',
      badge: 'Recommended',
      best: 'Most foreign companies — complete setup including bank account, GST, FCGPR, FIRMS, and 1-month compliance.',
      items: [
        'Everything in Starter',
        'GST + INC-20A + share certs',
        'Bank account opening support',
        'FIRMS portal registration',
        'FCGPR filing with RBI',
        'Board resolution pack + 90-day calendar',
        '1-month compliance support',
      ],
    },
    {
      name: 'CFO Desk', inr: 162000, timeline: '4–6 weeks',
      featured: true,
      best: 'CFOs who want 90-day operating readiness — not just an incorporated entity. Full handover to parent\'s finance team.',
      items: [
        'Everything in Market Entry',
        'Intercompany agreements starter pack',
        'Transfer pricing kickoff memo',
        'Basic withholding tax note',
        'FLA year-one checklist',
        'Structured finance handover session',
      ],
    },
  ],
  govFees: 'Government fees, stamp duty, notarisation/apostille, courier, and third-party costs billed at actual. DSC included.',
};

const BRLO = {
  intro: 'Branch and Liaison Offices are governed by FEMA and require RBI approval, AD-bank coordination, and Ministry of Corporate Affairs registration under a different compliance framework than a Pvt Ltd. Getting it wrong creates FEMA exposure for the foreign parent.',
  tiers: [
    {
      name: 'Liaison Office', inr: 162000, timeline: '6–8 weeks',
      prefix: 'From', best: 'Foreign parent needing India presence for representation, market development, or coordination — no revenue in India.',
      items: [
        'Route suitability review',
        'FNC support',
        'AD-bank coordination',
        'RBI application pack',
        'Tax registration numbers',
        'First-year compliance checklist',
      ],
    },
    {
      name: 'Branch Office', inr: 243000, timeline: '6–8 weeks',
      prefix: 'From', badge: 'Full Setup',
      best: 'Foreign companies executing contracts, providing services, or conducting research in India without a separate subsidiary.',
      items: [
        'Everything in Liaison Office',
        'FC-1 / Ministry of Corporate Affairs support',
        'Tax registration pack',
        'Banking setup pack',
        'First-year compliance roadmap',
      ],
    },
    {
      name: 'Special Situations', inr: 405000, timeline: '8–14 weeks',
      prefix: 'From', best: 'Regulated sectors, government-route applications, or conversions from one structure to another.',
      items: [
        'Everything in Branch Office',
        'Complex activity review',
        'Restructuring support',
        'Regulatory coordination assistance',
        'Detailed handover document',
        'Senior review on all deliverables',
      ],
    },
  ],
  govFees: 'Pricing is on a "from" basis — actual fee depends on jurisdiction, activity description, and AD-bank requirements. Specific estimate after scoping consultation.',
};

/* ═══════════════════════════════════════════════════════════════════════════
   COMPLIANCE RETAINERS
   ═══════════════════════════════════════════════════════════════════════════ */

const RETAINERS = [
  {
    name: 'Lite', inr: 13500, suffix: '/mo',
    best: 'Newly incorporated entities in their first 6 months — bridge to a full retainer.',
    items: [
      'Monthly bookkeeping (up to 20 invoices, Zoho Books)',
      'GST filing (quarterly composition or monthly regular)',
      'TDS filing (if statutory)',
      'Payroll support (up to 10 employees)',
      'Email / WhatsApp advisory (48-hr response)',
    ],
    note: 'Auto-converts to Core at Month 7 unless mutually agreed otherwise.',
  },
  {
    name: 'Core', inr: 27000, suffix: '/mo',
    min: '6-month minimum',
    best: 'Small or early-stage India entities with light transaction volume and a lean team.',
    items: [
      'Monthly bookkeeping (up to 50 invoices)',
      'GST/TDS filings',
      'Payroll support (up to 20 employees)',
      'Annual regulatory filing',
      'WhatsApp advisory (same-day response)',
      'Quarterly review call',
    ],
  },
  {
    name: 'Plus', inr: 63000, suffix: '/mo',
    min: '6-month minimum', badge: 'Most Popular',
    best: 'Operating subsidiaries — up to 200 invoices/mo, 40 employees, with monthly MIS and audit support.',
    items: [
      'Everything in Core',
      'Monthly bookkeeping (up to 200 invoices)',
      'Payroll support (up to 40 employees)',
      'Monthly MIS pack',
      'Audit support coordination',
      'Monthly PF / ESI filing',
    ],
  },
  {
    name: 'Controller Desk', inr: 162000, suffix: '/mo',
    min: '6-month minimum',
    best: 'Foreign groups needing an outsourced India finance function — fractional controller equivalent.',
    items: [
      'Everything in Plus',
      'Unlimited bookkeeping volume',
      'Payroll (up to 100 employees)',
      'Board / HQ reporting support',
      'Controller close checklist',
      'Expanded process support',
      'Priority SLA',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ADD-ON SERVICES
   ═══════════════════════════════════════════════════════════════════════════ */

const ADDONS = [
  { name: 'FC-GPR filing (standalone)', inr: 35000, note: 'Included in Market Entry / CFO Desk / NRI Growth' },
  { name: 'FLA return filing', inr: 15000, note: 'Best bundled into a retainer' },
  { name: 'GST registration (standalone)', inr: 8000, note: 'Only where not in a setup package' },
  { name: 'INC-20A filing support', inr: 5000, note: 'Included in Launch+ tiers' },
  { name: 'Bank account opening pack', inr: 10000,note: 'Document prep and coordination' },
  { name: 'Entity structure strategy memo', inr: 25000, note: 'Standalone advisory' },
  { name: 'MSME registration', inr: 5000, note: 'Included in Launch+ tiers' },
  { name: 'Share certificate issuance', inr: 5000, note: 'Included in Growth+ / Market Entry+' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════════ */

const STEPS = [
  { num: '01', title: 'Free Consultation', desc: 'We review your business model, shareholding pattern, and advise on structure, FDI route, objects clause, and GST timing.' },
  { num: '02', title: 'Document Collection', desc: 'We coordinate digital signatures, Directors Identification Number processing, and collect identity, address, and registered-office proofs. Apostille support for foreign/NRI documents.' },
  { num: '03', title: 'Incorporation document forms / RBI Filing', desc: 'Integrated filing covers incorporation, tax registration numbers, GSTIN, EPFO, and ESIC. For Branch/LO, we file the RBI application and coordinate with the AD bank.' },
  { num: '04', title: 'Operational Handover', desc: 'You receive your incorporation certificate, tax registration numbers, compliance calendar, and (for higher packages) bank account setup, FCGPR, and transfer pricing readiness.' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FAQs
   ═══════════════════════════════════════════════════════════════════════════ */

const FAQS = [
  { q: 'What does the NRI Starter package fee cover?', a: 'The fee covers professional services — NRI route check, incorporation filing, MOA/AOA drafting, Directors Identification Number / DSC, and all statutory registrations. Government fees (Ministry of Corporate Affairs filing, stamp duty) and applicable taxes are billed at actual and disclosed upfront before you commit. DSC is included.' },
  { q: 'How long does Private Limited Company registration take in India?', a: 'For a standard case with complete documents, expect 7–12 working days from Incorporation document forms filing to incorporation certificate. Total timeline from first consultation to a fully operational entity (including tax registration numbers and bank account) is typically 3–4 weeks.' },
  { q: 'Is NRI investment treated the same as FDI?', a: 'Not always. NRI investment under Schedule 4 of FEMA follows a different compliance path from corporate FDI under Schedule 1. The route, reporting, and repatriation rules differ. We confirm the correct route during the NRI route check included in every NRI package.' },
  { q: 'Do I need to travel to India to register the company?', a: 'Usually not. If your identity and address documents are in order, the digital signature, document legalisation, and filing process can be completed remotely. We coordinate the entire process without requiring physical presence.' },
  { q: 'Why is foreign subsidiary setup priced above commodity platforms?', a: 'A foreign-owned subsidiary involves FDI route verification, parent-country document legalisation, RBI reporting (FC-GPR within 30 days), cross-border banking coordination, and transfer pricing exposure from day one. The cost of getting the structure wrong — FEMA penalties, PE risk, TP adjustments — dwarfs any saving on incorporation fees.' },
  { q: 'Does the Market Entry package include FC-GPR filing?', a: 'Yes. FC-GPR filing with RBI is included in both the Market Entry and CFO Desk packages. It is the mandatory post-allotment reporting when a foreign company invests in an Indian entity, and must be filed within 30 days.' },
  { q: 'When is a Liaison Office better than a subsidiary?', a: 'When the foreign parent only needs representation, market research, or coordination activity in India and does not intend to earn revenue, execute contracts, or hire a large team. Liaison Offices have zero income tax exposure but are restricted in what they can do.' },
  { q: 'How long does Branch or Liaison Office approval take?', a: 'RBI processing times vary. Budget 6–8 weeks for the full process including AD-bank coordination, RBI approval, Ministry of Corporate Affairs registration, and tax registration numbers. Complex or government-route cases can take longer.' },
  { q: 'Is the compliance retainer only for foreign-owned entities?', a: 'Primarily designed for foreign-owned subsidiaries, NRI companies, and GCCs where GST, TDS, payroll, FEMA, and parent-company reporting are interconnected. Domestic companies with simpler compliance needs may not require the full scope of these retainers.' },
  { q: 'Is there a lock-in period for retainers?', a: 'The minimum term is 6 months, which allows us to complete at least one full compliance cycle. After the minimum term, the retainer continues month-to-month with 30 days\' notice.' },
  { q: 'Can I split payment?', a: 'Yes. Standard payment is 50% on engagement, 50% on incorporation certificate. For retainers, monthly billing on the 1st.' },
  { q: 'Do you offer a refund if you can\'t deliver?', a: 'Yes. If we cannot complete your incorporation within the published timeline due to our delay (not government processing time or document delays from your side), we refund 100% of professional fees. Government fees are non-refundable.' },
  { q: 'What payment methods do you accept?', a: 'Wire transfer (all currencies). For India-based payments: bank transfer, UPI, and Razorpay.' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

const ALL_PACKAGES = [
  { entity: 'NRI Setup', name: 'Starter', inr: 16200 },
  { entity: 'NRI Setup', name: 'Growth', inr: 43200 },
  { entity: 'NRI Setup', name: 'Repatriation-Ready', inr: 81000 },
  { entity: 'Foreign / WOS', name: 'Starter', inr: 43200 },
  { entity: 'Foreign / WOS', name: 'Market Entry', inr: 108000 },
  { entity: 'Foreign / WOS', name: 'CFO Desk', inr: 162000 },
  { entity: 'Branch & Liaison', name: 'Liaison Office', inr: 162000, prefix: 'From' },
  { entity: 'Branch & Liaison', name: 'Branch Office', inr: 243000, prefix: 'From' },
  { entity: 'Branch & Liaison', name: 'Special Situations', inr: 405000, prefix: 'From' },
  { entity: 'Domestic Pvt Ltd', name: 'Essential', inr: 9999 },
  { entity: 'Domestic Pvt Ltd', name: 'Launch', inr: 14900 },
  { entity: 'Domestic Pvt Ltd', name: 'Ultimate One Year', inr: 49900 },
  { entity: 'Compliance Retainer', name: 'Lite', inr: 13500, suffix: '/mo' },
  { entity: 'Compliance Retainer', name: 'Core', inr: 27000, suffix: '/mo' },
  { entity: 'Compliance Retainer', name: 'Plus', inr: 63000, suffix: '/mo' },
  { entity: 'Compliance Retainer', name: 'Controller Desk', inr: 162000, suffix: '/mo' },
];

const WA_URL = `https://wa.me/${PHONE_RAW}?text=`;

function QuoteModal({ pkg, currency, onClose }) {
  const [f, setF] = useState({ firstName: '', lastName: '', email: '', mobile: '', company: '', country: '' });
  const [selectedPkg, setSelectedPkg] = useState(pkg ? `${pkg.entity} — ${pkg.name}` : '');
  const [status, setStatus] = useState('idle');
  const set = key => e => setF(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!f.firstName.trim() || !f.email.trim() || !selectedPkg) { setStatus('error'); return; }
    setStatus('submitting');
    try {
      const chosen = ALL_PACKAGES.find(p => `${p.entity} — ${p.name}` === selectedPkg);
      const priceStr = chosen ? fmtPrice(chosen.inr, currency) + (chosen.suffix || '') : '';
      const desc = [
        `Package: ${selectedPkg}`,
        priceStr ? `Published fee: ${priceStr} (${currency})` : '',
        'Request includes: professional fees + government fees & stamp duty estimate',
      ].filter(Boolean).join('\n');
      await submitToZoho({ ...f, service: selectedPkg, description: desc, source: 'Pricing Page Quote' });
      setStatus('success');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'generate_lead', lead_source: 'pricing_quote', lead_package: selectedPkg, lead_email: f.email });
      trackConsultationRequest('Pricing Quote Modal');
    } catch { setStatus('error'); }
  };

  const waText = encodeURIComponent(
    `Hi, I'd like a detailed quote for the ${selectedPkg || 'India company setup'} package, including government fees and stamp duty.`
  );

  const inp = (extra = {}) => ({
    width: '100%', padding: '11px 14px', border: `1.5px solid ${T.bdr}`, borderRadius: 8,
    fontFamily: "Helvetica, Arial, sans-serif", fontSize: 13.5, color: T.ch, background: '#fff',
    outline: 'none', boxSizing: 'border-box', marginBottom: 12, display: 'block',
    transition: 'border-color .18s', ...extra,
  });

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520,
        maxHeight: '90vh', overflow: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,.25)' }}>

        {/* Header */}
        <div style={{ background: T.f, padding: '24px 28px', borderRadius: '20px 20px 0 0', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none',
            color: 'rgba(255,255,255,.5)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
          <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
            Request a Detailed Quote
          </h3>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.5)', lineHeight: 1.5 }}>
            Professional fees + government fees & stamp duty — all in one quote.
          </p>
          <GovernmentDisclosure />
    </div>

        <div style={{ padding: '24px 28px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
              <h4 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: T.f, marginBottom: 8 }}>
                Quote request received!
              </h4>
              <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.7, marginBottom: 24 }}>
                Our CA team will send you a detailed quote — including government fees and stamp duty — within 24 business hours.
              </p>
              <a href={`${WA_URL}${waText}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#25D366', color: '#fff', padding: '13px 28px', borderRadius: 9,
                  fontSize: 14, fontWeight: 600, textDecoration: 'none', marginBottom: 12 }}>
                💬 Follow up on WhatsApp
              </a>
              <div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: T.lt,
                  fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
                  Close this window
                </button>
                <GovernmentDisclosure />
    </div>
              <GovernmentDisclosure />
    </div>
          ) : (
            <>
              {/* Package selector */}
              <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: T.lt, marginBottom: 10 }}>
                Package
                <GovernmentDisclosure />
    </div>
              <div style={{ position: 'relative', marginBottom: 16 }}>
                <select value={selectedPkg} onChange={e => setSelectedPkg(e.target.value)}
                  style={inp({ marginBottom: 0, paddingRight: 36, cursor: 'pointer',
                    borderColor: status === 'error' && !selectedPkg ? '#E74C3C' : T.bdr, fontWeight: 600 })}>
                  <option value="">Select a package…</option>
                  {(() => {
                    let lastEntity = '';
                    return ALL_PACKAGES.map(p => {
                      const label = `${p.entity} — ${p.name}`;
                      const showGroup = p.entity !== lastEntity;
                      lastEntity = p.entity;
                      return (
                        <option key={label} value={label}
                          style={showGroup ? { fontWeight: 700 } : {}}>
                          {label} ({fmtPrice(p.inr, currency)}{p.suffix || ''})
                        </option>
                      );
                    });
                  })()}
                </select>
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: T.lt, pointerEvents: 'none', fontSize: 10 }}>▼</span>
                <GovernmentDisclosure />
    </div>

              {/* Gov fees note */}
              <div style={{ background: '#FDF9F3', border: '1px solid #F0E6D2', borderRadius: 10,
                padding: '12px 14px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>📋</span>
                <div style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.55 }}>
                  Your quote will include a <strong style={{ color: T.ch }}>separate line-item estimate</strong> for government fees (Ministry of Corporate Affairs filing, stamp duty, notarisation) based on your specific situation.
                  <GovernmentDisclosure />
    </div>
                <GovernmentDisclosure />
    </div>

              {/* Contact details */}
              <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: T.lt, marginBottom: 10 }}>
                Your Details
                <GovernmentDisclosure />
    </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input placeholder="First name *" type="text" value={f.firstName} onChange={set('firstName')}
                  style={inp({ borderColor: status === 'error' && !f.firstName.trim() ? '#E74C3C' : T.bdr })}
                  onFocus={e => e.target.style.borderColor = T.f}
                  onBlur={e => e.target.style.borderColor = (status === 'error' && !f.firstName.trim()) ? '#E74C3C' : T.bdr} />
                <input placeholder="Last name" type="text" value={f.lastName} onChange={set('lastName')}
                  style={inp()} onFocus={e => e.target.style.borderColor = T.f} onBlur={e => e.target.style.borderColor = T.bdr} />
                <GovernmentDisclosure />
    </div>

              <input placeholder="Work email *" type="email" value={f.email} onChange={set('email')}
                style={inp({ borderColor: status === 'error' && !f.email.trim() ? '#E74C3C' : T.bdr })}
                onFocus={e => e.target.style.borderColor = T.f}
                onBlur={e => e.target.style.borderColor = (status === 'error' && !f.email.trim()) ? '#E74C3C' : T.bdr} />

              <input placeholder="Mobile / WhatsApp (with country code)" type="tel" value={f.mobile} onChange={set('mobile')}
                style={inp()} onFocus={e => e.target.style.borderColor = T.f} onBlur={e => e.target.style.borderColor = T.bdr} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input placeholder="Company name" type="text" value={f.company} onChange={set('company')}
                  style={inp()} onFocus={e => e.target.style.borderColor = T.f} onBlur={e => e.target.style.borderColor = T.bdr} />
                <input placeholder="Country" type="text" value={f.country} onChange={set('country')}
                  style={inp()} onFocus={e => e.target.style.borderColor = T.f} onBlur={e => e.target.style.borderColor = T.bdr} />
                <GovernmentDisclosure />
    </div>

              {status === 'error' && (
                <div style={{ background: '#FFF0F0', border: '1px solid #FFCCCC', borderRadius: 8,
                  padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#C0392B' }}>
                  Please fill in your name, email, and select a package.
                  <GovernmentDisclosure />
    </div>
              )}

              <button onClick={handleSubmit} disabled={status === 'submitting'}
                className="ics-btn ics-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 14.5,
                  marginTop: 4, borderRadius: 9, opacity: status === 'submitting' ? 0.7 : 1,
                  cursor: status === 'submitting' ? 'wait' : 'pointer' }}>
                {status === 'submitting' ? 'Sending…' : 'Request Detailed Quote →'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
                {['Includes gov fees estimate', '24hr response', 'No obligation'].map(t => (
                  <span key={t} style={{ fontSize: 11.5, color: T.lt, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {t}
                  </span>
                ))}
                <GovernmentDisclosure />
    </div>
            </>
          )}
          <GovernmentDisclosure />
    </div>
        <GovernmentDisclosure />
    </div>
      <GovernmentDisclosure />
    </div>
  );
}

export default function PricingPage() {
  const [currency, setCurrency] = useState('USD');
  const [activeTab, setActiveTab] = useState('nri');
  const [openFaq, setOpenFaq] = useState(null);
  const [quotePkg, setQuotePkg] = useState(null);

  const p = (inr) => fmtPrice(inr, currency);

  const entityData = { domestic: DOMESTIC, nri: NRI, wos: WOS, brlo: BRLO }[activeTab];

  const thS = { padding: '11px 16px', fontSize: 12, fontWeight: 600, color: T.mid, textAlign: 'left', borderBottom: `2px solid ${T.bdr}`, background: T.stone, whiteSpace: 'nowrap' };
  const tdS = { padding: '11px 16px', fontSize: 13.5, color: T.ink, borderBottom: `1px solid ${T.bdr}`, verticalAlign: 'top' };

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ background: T.f, padding: '70px 56px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 70% at 105% 40%,rgba(232,144,10,.1) 0%,transparent 55%)' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 36 }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,.1)', borderRadius: 30, padding: 4, gap: 4, flexWrap: 'wrap' }}>
              {CURRENCIES.map(c => (
                <button key={c.code} onClick={() => setCurrency(c.code)}
                  style={{ padding: '6px 14px', borderRadius: 24, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
                    background: currency === c.code ? '#fff' : 'transparent',
                    color: currency === c.code ? T.f : 'rgba(255,255,255,.65)',
                    transition: 'all .2s', whiteSpace: 'nowrap' }}>
                  {c.flag} {c.code}
                </button>
              ))}
              <GovernmentDisclosure />
    </div>
            <GovernmentDisclosure />
    </div>

          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', marginBottom: 20, lineHeight: 1.6 }}>
            For founders, CFOs & NRIs setting up or running a company in India — priced in your currency.
            <GovernmentDisclosure />
    </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(40px,5vw,70px)', fontWeight: 600, color: '#fff', lineHeight: 1.04, marginBottom: 22, letterSpacing: '-.01em' }}>
            Transparent pricing.<br />
            <span style={{ fontStyle: 'italic', color: T.sl }}>Built for global founders.</span>
          </h1>

          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.58)', lineHeight: 1.78, fontWeight: 300, maxWidth: 680, marginBottom: 40 }}>
            Published professional fees for every service — incorporation, compliance, transfer pricing, FEMA, and GCC setup. Ex-Big 4 CA team at boutique pricing.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
            <Link href="/contact" className="ics-btn ics-btn-primary ics-btn-lg">
              Book Free 30-min Strategy Call →
            </Link>
            <GovernmentDisclosure />
    </div>

          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,.09)', paddingTop: 24 }}>
            {[
              'Big 4 quality (Ex-KPMG)',
              '100+ foreign companies served',
              '0 transfer-pricing audits lost',
              'Professional fees — clearly disclosed',
            ].map((item, i, arr) => (
              <div key={item} style={{ paddingRight: 28, marginRight: 28, paddingTop: 4,
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,.09)' : 'none', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', fontWeight: 500 }}>
                  <span style={{ color: T.sl, marginRight: 6 }}>✓</span>{item}
                </span>
                <GovernmentDisclosure />
    </div>
            ))}
            <GovernmentDisclosure />
    </div>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── COMPANY REGISTRATION — TABBED ─────────────────────────────────── */}
      <section id="registration" style={{ background: '#fff', padding: '80px 56px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <SectionLabel>Company Incorporation — Fixed Fees</SectionLabel>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 14 }}>
              Choose based on who you are.
            </h2>
            <p style={{ fontSize: 16, color: T.mid, maxWidth: 620, margin: '0 auto', marginBottom: 32 }}>
              Foreign company, NRI, or Indian founder — different needs, different prices, transparent for all.
            </p>

            {/* Entity type tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 40 }}>
              {ENTITY_TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '10px 24px', borderRadius: 30, border: `1.5px solid ${activeTab === tab.id ? T.f : T.bdr}`,
                    background: activeTab === tab.id ? T.f : '#fff',
                    color: activeTab === tab.id ? '#fff' : T.mid,
                    fontSize: 13.5, fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                    fontFamily: 'inherit',
                  }}>
                  {tab.label}
                </button>
              ))}
              <GovernmentDisclosure />
    </div>
            <GovernmentDisclosure />
    </div>

          {/* Intro */}
          <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.75, maxWidth: 800, margin: '0 auto 36px', textAlign: 'center', fontWeight: 300 }}>
            {entityData.intro}
          </p>

          {/* 3 tier cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 20 }} className="service-cards-grid">
            {entityData.tiers.map((tier, idx) => {
              const isFeatured = tier.featured || (idx === 1 && !entityData.tiers.some(t => t.featured));
              return (
                <div key={tier.name} style={{
                  background: isFeatured ? T.f : '#fff',
                  border: isFeatured ? `2px solid ${T.f}` : `1px solid #000`,
                  borderRadius: 20, padding: '32px 28px',
                  display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
                  ...(isFeatured ? { transform: 'scale(1.02)', boxShadow: '0 24px 64px rgba(11,61,46,.22)' } : {}),
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: isFeatured ? T.s : T.f, borderRadius: '20px 20px 0 0' }} />

                  {/* Badge */}
                  {tier.badge && (
                    <div style={{ display: 'inline-block', background: isFeatured ? T.s : '#E4F0EB', color: isFeatured ? '#fff' : T.f, fontSize: 11.5, fontWeight: 700, padding: '3px 12px', borderRadius: 20, marginBottom: 12, width: 'fit-content' }}>
                      ⭐ {tier.badge}
                      <GovernmentDisclosure />
    </div>
                  )}

                  {/* Name + Price */}
                  <h3 className="font-display" style={{ fontSize: 21, fontWeight: 600, color: isFeatured ? '#fff' : T.ch, lineHeight: 1.2, marginBottom: 8 }}>
                    {tier.name}
                  </h3>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 14, color: isFeatured ? 'rgba(255,255,255,.5)' : T.lt }}>{tier.prefix ? `${tier.prefix} ` : ''}</span>
                    <span style={{ fontSize: 36, fontWeight: 700, color: isFeatured ? T.sl : T.f, fontFamily: "Helvetica, Arial, sans-serif", lineHeight: 1 }}>
                      {p(tier.inr)}
                    </span>
                    {tier.suffix && <span style={{ fontSize: 15, fontWeight: 500, color: isFeatured ? 'rgba(255,255,255,.5)' : T.lt }}>{tier.suffix}</span>}
                    <GovernmentDisclosure />
    </div>
                  <div style={{ fontSize: 12, color: isFeatured ? 'rgba(255,255,255,.45)' : T.lt, marginBottom: 18 }}>
                    ⏱ {tier.timeline}
                    <GovernmentDisclosure />
    </div>

                  {/* Best for */}
                  <div style={{ fontSize: 12.5, color: isFeatured ? 'rgba(255,255,255,.55)' : T.mid, lineHeight: 1.55, marginBottom: 18, padding: '10px 12px', background: isFeatured ? 'rgba(255,255,255,.07)' : T.stone, borderRadius: 10 }}>
                    <strong style={{ color: isFeatured ? 'rgba(255,255,255,.75)' : T.ch }}>Best for:</strong> {tier.best}
                    <GovernmentDisclosure />
    </div>

                  {/* Features */}
                  <ul style={{ listStyle: 'none', padding: 0, flex: 1, marginBottom: 24 }}>
                    {tier.items.map(item => (
                      <Check key={item} light={isFeatured}>{item}</Check>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button onClick={() => {
                    const entityLabel = ENTITY_TABS.find(t => t.id === activeTab)?.label || '';
                    setQuotePkg({ entity: entityLabel, name: tier.name, inr: tier.inr });
                  }} className="ics-btn" style={{
                    textAlign: 'center', justifyContent: 'center', fontSize: 13, marginTop: 'auto',
                    background: isFeatured ? T.s : '#fff',
                    color: isFeatured ? '#fff' : T.f,
                    border: isFeatured ? 'none' : `1.5px solid ${T.f}`,
                    cursor: 'pointer', fontFamily: 'inherit', width: '100%',
                  }}>
                    Get Quote →
                  </button>
                  <GovernmentDisclosure />
    </div>
              );
            })}
            <GovernmentDisclosure />
    </div>

          {/* Gov fees note */}
          <p style={{ fontSize: 12.5, color: T.lt, textAlign: 'center', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
            {entityData.govFees}
          </p>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── COMPLIANCE RETAINERS ──────────────────────────────────────────── */}
      <section id="retainers" style={{ background: '#fff', padding: '80px 56px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Monthly Compliance Retainers</SectionLabel>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 14 }}>
              One firm, one invoice, zero handoffs.
            </h2>
            <p style={{ fontSize: 16, color: T.mid, maxWidth: 680, margin: '0 auto' }}>
              India has 200+ compliance deadlines a year. One coordinated team on a fixed monthly retainer means your books are audit-ready every month, not scrambled at year-end.
            </p>
            <GovernmentDisclosure />
    </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="retainer-cards-grid">
            {RETAINERS.map((plan, idx) => {
              const star = idx === 2;
              return (
                <div key={plan.name} style={{
                  background: star ? T.f : '#fff', border: `1px solid ${star ? T.f : '#000'}`,
                  borderRadius: 20, padding: '32px 28px', display: 'flex', flexDirection: 'column',
                  position: 'relative', overflow: 'hidden',
                  ...(star ? { transform: 'scale(1.02)', boxShadow: '0 24px 64px rgba(11,61,46,.22)' } : {}),
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: star ? T.s : T.f, borderRadius: '20px 20px 0 0' }} />

                  {plan.badge && (
                    <div style={{ display: 'inline-block', background: star ? T.s : '#E4F0EB', color: star ? '#fff' : T.f, fontSize: 11.5, fontWeight: 700, padding: '3px 12px', borderRadius: 20, marginBottom: 12, width: 'fit-content' }}>
                      ⭐ {plan.badge}
                      <GovernmentDisclosure />
    </div>
                  )}

                  <h3 className="font-display" style={{ fontSize: 21, fontWeight: 600, color: star ? '#fff' : T.ch, lineHeight: 1.2, marginBottom: 8 }}>{plan.name}</h3>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 700, color: star ? T.sl : T.f, fontFamily: "Helvetica, Arial, sans-serif", lineHeight: 1 }}>{p(plan.inr)}</span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: star ? 'rgba(255,255,255,.5)' : T.lt }}>/mo</span>
                    <GovernmentDisclosure />
    </div>
                  <div style={{ fontSize: 12, color: star ? 'rgba(255,255,255,.45)' : T.lt, marginBottom: 18 }}>{plan.min}</div>

                  <div style={{ fontSize: 12.5, color: star ? 'rgba(255,255,255,.55)' : T.mid, lineHeight: 1.55, marginBottom: 18, padding: '10px 12px', background: star ? 'rgba(255,255,255,.07)' : T.stone, borderRadius: 10 }}>
                    <strong style={{ color: star ? 'rgba(255,255,255,.75)' : T.ch }}>Best for:</strong> {plan.best}
                    <GovernmentDisclosure />
    </div>

                  <ul style={{ listStyle: 'none', padding: 0, flex: 1, marginBottom: plan.note ? 12 : 24 }}>
                    {plan.items.map(item => (
                      <Check key={item} light={star}>{item}</Check>
                    ))}
                  </ul>

                  {plan.note && (
                    <div style={{ fontSize: 11.5, color: star ? 'rgba(255,255,255,.45)' : T.lt, lineHeight: 1.5, marginBottom: 16, padding: '8px 10px', background: star ? 'rgba(255,255,255,.05)' : '#FDF9F3', borderRadius: 8, fontStyle: 'italic' }}>
                      {plan.note}
                      <GovernmentDisclosure />
    </div>
                  )}

                  <button onClick={() => setQuotePkg({ entity: 'Compliance Retainer', name: plan.name, inr: plan.inr })}
                    className="ics-btn" style={{
                    justifyContent: 'center', textAlign: 'center', fontSize: 13, marginTop: 'auto',
                    background: star ? T.s : '#fff', color: star ? '#fff' : T.f,
                    border: star ? 'none' : `1.5px solid ${T.f}`,
                    cursor: 'pointer', fontFamily: 'inherit', width: '100%',
                  }}>
                    Get a Retainer Quote →
                  </button>
                  <GovernmentDisclosure />
    </div>
              );
            })}
            <GovernmentDisclosure />
    </div>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── ADD-ON SERVICES ───────────────────────────────────────────────── */}
      <section id="addons" style={{ background: T.stone, padding: '80px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <SectionLabel>Add-On Services</SectionLabel>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 600, color: T.ch, lineHeight: 1.1, marginBottom: 14 }}>
              Standalone services, fixed prices.
            </h2>
            <p style={{ fontSize: 15, color: T.mid, maxWidth: 580, margin: '0 auto' }}>
              Add to any package or engage standalone. Government and third-party costs are additional.
            </p>
            <GovernmentDisclosure />
    </div>

          <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thS}>Service</th>
                  <th style={{ ...thS, textAlign: 'right' }}>Professional Fee</th>
                  <th style={thS}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {ADDONS.map((addon, i) => (
                  <tr key={addon.name} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF5' }}>
                    <td style={{ ...tdS, fontWeight: 600, color: T.ch }}>{addon.name}</td>
                    <td style={{ ...tdS, textAlign: 'right', fontWeight: 700, color: T.f, whiteSpace: 'nowrap' }}>{p(addon.inr)}</td>
                    <td style={{ ...tdS, fontSize: 12.5, color: T.lt }}>{addon.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <GovernmentDisclosure />
    </div>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '80px 56px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 600, color: T.ch, lineHeight: 1.1 }}>
              From first call to operational entity.
            </h2>
            <GovernmentDisclosure />
    </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="service-cards-grid">
            {STEPS.map(step => (
              <div key={step.num} style={{ padding: '28px 24px', background: T.stone, borderRadius: 16, borderTop: `4px solid ${T.f}` }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: T.f, fontFamily: "Helvetica, Arial, sans-serif", marginBottom: 8, opacity: 0.5 }}>{step.num}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.ch, marginBottom: 10 }}>{step.title}</div>
                <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.65, fontWeight: 300 }}>{step.desc}</p>
                <GovernmentDisclosure />
    </div>
            ))}
            <GovernmentDisclosure />
    </div>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── WHAT'S NOT INCLUDED ────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '60px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 16, padding: '28px 32px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ch, marginBottom: 12 }}>Transparency Disclosure — What's Not Included</div>
            <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.75, marginBottom: 0 }}>
              Government fees (Ministry of Corporate Affairs filing fees, stamp duty), taxes, notarisation/apostille, translations, courier, banking charges, and third-party costs are billed at actual unless expressly included. DSC is included in all packages. Statutory audit fees are engaged separately. Transfer pricing benchmarking studies, legal opinions, and one-time project work outside package scope require separate engagement with written approval. No hidden markups.
            </p>
            <GovernmentDisclosure />
    </div>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section style={{ background: T.stone, padding: '80px 56px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 600, color: T.ch, lineHeight: 1.1 }}>
              Common questions, straight answers.
            </h2>
            <GovernmentDisclosure />
    </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: '#fff', border: `1.5px solid ${openFaq === i ? T.f : T.bdr}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color .2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: 'inherit' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: T.ch, lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: T.f, fontSize: 22, fontWeight: 300, flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 20px', fontSize: 14.5, color: T.mid, lineHeight: 1.78, fontWeight: 300 }}>
                    {faq.a}
                    <GovernmentDisclosure />
    </div>
                )}
                <GovernmentDisclosure />
    </div>
            ))}
            <GovernmentDisclosure />
    </div>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── SOCIAL PROOF ───────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '60px 56px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: T.stone, border: `1px solid ${T.bdr}`, borderRadius: 20, padding: '40px 48px', position: 'relative' }}>
            <div style={{ fontSize: 56, color: T.f, lineHeight: 1, marginBottom: 20, fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 300 }}>"</div>
            <p style={{ fontSize: 18, color: T.ch, lineHeight: 1.75, fontStyle: 'italic', fontFamily: "Helvetica, Arial, sans-serif", marginBottom: 24, fontWeight: 500 }}>
              We were quoted $5,000 for our India subsidiary setup. ICS delivered the same scope — entity, FCGPR, TP policy — for $1,500 in 19 business days. The structure passed our auditor's review on first look.
            </p>
            <div style={{ fontSize: 13, color: T.lt, fontWeight: 600 }}>— Finance Director, UK Technology Company (anonymised)</div>
            <GovernmentDisclosure />
    </div>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: T.f, padding: '96px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 70% at 50% 0%,rgba(232,144,10,.09) 0%,transparent 60%)' }} />
        <div style={{ maxWidth: 660, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="font-display" style={{ fontSize: 'clamp(30px,4vw,50px)', fontWeight: 600, color: '#fff', lineHeight: 1.06, marginBottom: 16 }}>
            Not sure which package fits?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, fontWeight: 300, marginBottom: 40 }}>
            Book a free 30-minute strategy call. We'll review your situation, recommend the right package — or tell you if a custom scope is needed — and email you a written summary before any commitment.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <Link href="/contact" className="ics-btn ics-btn-primary ics-btn-lg">
              Book Free 30-min Strategy Call →
            </Link>
            <a href={`https://wa.me/${PHONE_RAW}?text=Hi%2C%20I%27d%20like%20to%20discuss%20pricing%20for%20my%20India%20company%20setup.`}
              target="_blank" rel="noopener noreferrer" className="ics-btn ics-btn-ghost ics-btn-lg">
              WhatsApp Us
            </a>
            <GovernmentDisclosure />
    </div>
          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['No retainer to start', 'Written quote within 24 hrs', 'Fixed, transparent fees'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,.38)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: T.sl }}>✓</span> {t}
              </span>
            ))}
            <GovernmentDisclosure />
    </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.25)', marginTop: 28, lineHeight: 1.6 }}>
            Confidentiality maintained. A CA-led team reviews every enquiry. No spam. No obligation. Response within 24 business hours.
            <GovernmentDisclosure />
    </div>
          <GovernmentDisclosure />
    </div>
      </section>

      {/* ── QUOTE MODAL ────────────────────────────────────────────────── */}
      {quotePkg && (
        <QuoteModal pkg={quotePkg} currency={currency} onClose={() => setQuotePkg(null)} />
      )}

      <GovernmentDisclosure />
    </div>
  );
}
