import Link from 'next/link';
import { T } from '@/lib/config';

export const metadata = {
  title: 'Register a Company in India from USA | India Company Setup',
  description: 'Step-by-step guide for US-based NRIs and foreign nationals to register a Private Limited Company or LLP in India — 100% online, no India visit required.',
  keywords: ['register company in India from USA', 'company registration India for Americans', 'NRI company registration India from US', 'how to start business in India from USA', 'India company setup from United States'],
  alternates: { canonical: 'https://www.indiacompanysetup.com/company-registration/from-usa' },
  openGraph: {
    title: 'Register a Company in India from USA | India Company Setup',
    description: 'US-based founders and NRIs can register a company in India fully online. No India visit needed. End-to-end support from India Company Setup.',
    url: 'https://www.indiacompanysetup.com/company-registration/from-usa',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'Register a Company in India from USA' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register a Company in India from USA | India Company Setup',
    description: 'US-based founders and NRIs can register a company in India fully online. No India visit needed.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const steps = [
  { number: '01', title: 'Choose Your Business Structure', description: 'US-based founders typically register a Private Limited Company (most common), LLP, or a Wholly Owned Subsidiary. We help you pick the right structure based on your goals, sector, and FDI requirements.' },
  { number: '02', title: 'Prepare & Apostille Documents', description: 'US documents (passport, address proof) must be apostilled via your State Secretary of State before submission to Indian authorities. We provide a precise checklist so nothing is missed.' },
  { number: '03', title: 'Obtain DSC (Digital Signature Certificate)', description: 'All directors need a Class 3 DSC from an Indian certifying authority. We coordinate the application remotely — no India visit required.' },
  { number: '04', title: 'Name Reservation via MCA RUN Portal', description: 'We file your preferred company name through the MCA21 Reserve Unique Name (RUN) service and confirm availability before proceeding.' },
  { number: '05', title: 'File SPICe+ Incorporation Form', description: 'The SPICe+ (INC-32) form bundles company incorporation, DIN allotment, PAN, TAN, and GSTIN applications in one filing. We handle the complete submission.' },
  { number: '06', title: 'Receive Certificate of Incorporation', description: 'Once the ROC approves your application, you receive the Certificate of Incorporation, PAN, and TAN — your company is officially registered in India.' },
];

const documents = [
  { label: 'Passport', detail: 'Notarized + Apostilled by your State Secretary of State' },
  { label: 'US Address Proof', detail: 'Utility bill or bank statement (notarized + apostilled), dated within 2 months' },
  { label: 'PAN Card (Form 49AA)', detail: 'For foreign nationals; we assist with the application' },
  { label: 'DSC (Class 3)', detail: 'Digital Signature Certificate — obtained remotely' },
  { label: 'Director Identification Number (DIN)', detail: 'Allotted through the SPICe+ filing' },
  { label: 'Registered Office Proof', detail: 'We provide a virtual registered office address in India if needed' },
];

const faqs = [
  { q: 'Can I register a company in India from the USA without visiting India?', a: 'Yes. The entire process is online through the MCA21 portal. All documents are submitted digitally. As long as your passport and address proof are apostilled, you do not need to be physically present in India.' },
  { q: 'Does my company need an Indian director?', a: 'Yes. Under the Companies Act, 2013, at least one director must have stayed in India for a minimum of 182 days in the previous calendar year. We can help you identify a nominee resident director if needed.' },
  { q: 'Can a US citizen own 100% of an Indian company?', a: 'Yes, in most sectors under the Automatic Route. 100% FDI is permitted in sectors like IT, consulting, manufacturing, and e-commerce marketplace models. A few sensitive sectors require government approval.' },
  { q: 'How long does the registration process take?', a: 'Typically 15–25 working days from the time all apostilled documents are ready. The apostille process in the US can take 3–7 business days depending on your state.' },
  { q: 'What is the cost of registering a company in India from the USA?', a: 'Government fees typically range from ₹8,000–₹20,000 depending on authorized capital and state stamp duty. Our professional fee is transparent and quoted upfront. Contact us for a detailed estimate.' },
  { q: 'Do I need a physical office address in India?', a: 'Yes, a registered office address in India is mandatory. We offer a virtual registered office service if you do not yet have a physical premises.' },
];

const structured = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Register a Company in India from USA', url: 'https://www.indiacompanysetup.com/company-registration/from-usa', description: 'Complete guide for US-based NRIs and foreign nationals to register a company in India online — no India visit required.' },
    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'HowTo', name: 'How to Register a Company in India from the USA', step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.description })) },
    { '@type': 'BreadcrumbList', 'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.indiacompanysetup.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Company Registration', 'item': 'https://www.indiacompanysetup.com/setup' },
      { '@type': 'ListItem', 'position': 3, 'name': 'From USA', 'item': 'https://www.indiacompanysetup.com/company-registration/from-usa' },
    ] },
  ],
};

const otherCountries = [
  { label: 'From the UK', href: '/company-registration/from-uk' },
  { label: 'From Dubai / UAE', href: '/company-registration/from-dubai' },
  { label: 'From Singapore', href: '/company-registration/from-singapore' },
  { label: 'From Canada', href: '/company-registration/from-canada' },
  { label: 'From Australia', href: '/company-registration/from-australia' },
];

export default function FromUSAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />

      {/* HERO */}
      <section style={{ background: T.f, padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Link href="/setup" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block', textDecoration: 'none' }}>← Back to Services</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>Company Registration · From the United States</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 16 }}>Register a Company in India<br />from the USA</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 32px' }}>100% online. No India visit required. Expert support for US-based NRIs, foreign nationals, and American businesses expanding into India.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="ics-btn ics-btn-primary ics-btn-lg">Get Started — Free Consultation</Link>
            <Link href="#process" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.75)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 8, padding: '10px 22px', textDecoration: 'none' }}>See the Process ↓</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#fff', borderBottom: `1px solid ${T.bdr}`, padding: '32px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 24, textAlign: 'center' }}>
          {[
            { value: '15–25 days', label: 'Registration Timeline' },
            { value: '100% Online', label: 'No India Visit Needed' },
            { value: '100% FDI', label: 'Allowed in Most Sectors' },
            { value: '₹8K–₹20K', label: 'Govt. Fee Range' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: 22, fontWeight: 700, color: T.f }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: T.mid, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY INDIA */}
      <section style={{ background: T.stone, padding: '64px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 12 }}>Why US-Based Founders Are Setting Up in India</h2>
          <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.8, marginBottom: 28, maxWidth: 720 }}>India is the world's fastest-growing major economy and the third-largest startup ecosystem. For US-based NRIs and American companies, registering an Indian entity unlocks access to local talent, government incentives, and a 1.4 billion consumer market.</p>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
            {["Access India's deep engineering and tech talent pool", "Benefit from lower operational costs vs the US", "Qualify for Startup India recognition and tax exemptions", "Open Indian bank accounts and accept INR payments", "Repatriate profits to the US under FEMA guidelines", "100% FDI permitted under Automatic Route in most sectors"].map(point => (
              <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#fff', borderRadius: 10, padding: '14px 16px', border: `1px solid ${T.bdr}` }}>
                <span style={{ color: T.f, fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 13.5, color: T.ch }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ background: '#fff', padding: '64px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 8 }}>Step-by-Step Registration Process</h2>
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 36 }}>From document preparation in the US to receiving your Certificate of Incorporation.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {steps.map(step => (
              <div key={step.number} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: T.f, color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.number}</div>
                <div style={{ background: T.stone, borderRadius: 12, padding: '16px 20px', flex: 1, border: `1px solid ${T.bdr}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.ch, marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.7 }}>{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section style={{ background: T.ivory, padding: '64px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 8 }}>Documents Required from the USA</h2>
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 28 }}>All foreign documents must be apostilled before submission to Indian authorities. India and the USA are both signatories to the Hague Apostille Convention.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
            {documents.map(doc => (
              <div key={doc.label} style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', border: `1px solid ${T.bdr}` }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ch, marginBottom: 4 }}>{doc.label}</div>
                <div style={{ fontSize: 13, color: T.mid, lineHeight: 1.6 }}>{doc.detail}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: T.lt, marginTop: 16 }}>* Apostille from your State Secretary of State is accepted by Indian authorities. We provide a complete state-wise apostille guide on request.</p>
        </div>
      </section>

      {/* BUSINESS STRUCTURES */}
      <section style={{ background: '#fff', padding: '64px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 8 }}>Which Business Structure is Right for You?</h2>
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 28 }}>US founders typically choose one of three structures depending on their goals.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600, fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: T.f, color: '#fff' }}>
                  {['Structure', 'Best For', 'Min. Directors', 'FDI Allowed'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Private Limited Company', 'Startups, funded ventures, subsidiaries', '2 (1 resident)', 'Yes — Automatic Route'],
                  ['LLP', 'Consulting, professional services, small teams', '2 (1 resident)', 'Yes — with restrictions'],
                  ['Wholly Owned Subsidiary', 'US companies expanding to India', '2 (1 resident)', 'Yes — 100% ownership'],
                ].map(([structure, best, directors, fdi], i) => (
                  <tr key={structure} style={{ background: i % 2 === 0 ? T.stone : '#fff', borderBottom: `1px solid ${T.bdr}` }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: T.ch }}>{structure}</td>
                    <td style={{ padding: '12px 16px', color: T.mid }}>{best}</td>
                    <td style={{ padding: '12px 16px', color: T.mid }}>{directors}</td>
                    <td style={{ padding: '12px 16px', color: T.mid }}>{fdi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: T.stone, padding: '64px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 32 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map(faq => (
              <div key={faq.q} style={{ background: '#fff', borderRadius: 12, padding: '20px 22px', border: `1px solid ${T.bdr}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ch, marginBottom: 6 }}>{faq.q}</div>
                <div style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.75 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: T.f, padding: '72px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 600, color: '#fff', marginBottom: 14 }}>Ready to Register Your Indian Company from the USA?</h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, marginBottom: 32 }}>Our team handles everything — from apostille guidance to Certificate of Incorporation. Get a free consultation today.</p>
          <Link href="/contact" className="ics-btn ics-btn-primary ics-btn-lg">Book a Free Consultation</Link>
          <p style={{ color: 'rgba(255,255,255,.35)', fontSize: 12.5, marginTop: 16 }}>Typical response within 24 hours · No commitment required</p>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section style={{ background: '#fff', borderTop: `1px solid ${T.bdr}`, padding: '32px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 11.5, fontWeight: 600, color: T.lt, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Also registering from another country?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {otherCountries.map(link => (
              <Link key={link.href} href={link.href} style={{ fontSize: 13, color: T.f, border: `1px solid ${T.f}`, padding: '6px 16px', borderRadius: 20, textDecoration: 'none', fontWeight: 500 }}>{link.label}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
