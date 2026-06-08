import Link from 'next/link';
import { T } from '@/lib/config';

export const metadata = {
  title: 'Register a Company in India from Canada | India Company Setup',
  description: 'Guide for Canada-based NRIs and Canadian businesses to register a Private Limited Company or LLP in India — 100% online, no India visit required.',
  keywords: ['register company in India from Canada', 'company registration India from Canada', 'NRI company registration India from Canada', 'how to start business in India from Canada', 'India company setup Canada'],
  alternates: { canonical: 'https://www.indiacompanysetup.com/company-registration/from-canada' },
  openGraph: {
    title: 'Register a Company in India from Canada | India Company Setup',
    description: 'Canada-based NRIs and Canadian businesses can register an Indian company fully online. No India visit needed. End-to-end support from India Company Setup.',
    url: 'https://www.indiacompanysetup.com/company-registration/from-canada',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'Register a Company in India from Canada' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register a Company in India from Canada | India Company Setup',
    description: 'Canada-based NRIs and Canadian businesses can register an Indian company fully online. No India visit needed.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const steps = [
  { number: '01', title: 'Choose Your Business Structure', description: 'Canada-based founders typically register a Private Limited Company, LLP, or Wholly Owned Subsidiary. We advise on the best fit based on your sector, FDI policy, and ownership plans.' },
  { number: '02', title: 'Apostille Canadian Documents', description: 'Canada joined the Hague Apostille Convention in January 2024. Documents can now be apostilled through Global Affairs Canada or provincial authorities, eliminating the need for Indian Embassy attestation.' },
  { number: '03', title: 'Obtain DSC (Digital Signature Certificate)', description: 'All directors need a Class 3 DSC from an Indian certifying authority. The process is completed remotely — no India visit required.' },
  { number: '04', title: 'Reserve Company Name via MCA RUN', description: 'We file your preferred company name through the MCA21 Reserve Unique Name (RUN) portal and confirm availability before proceeding.' },
  { number: '05', title: 'File SPICe+ Incorporation Form', description: 'The SPICe+ (INC-32) form consolidates company incorporation, DIN, PAN, TAN, and GSTIN applications into a single submission to the Ministry of Corporate Affairs.' },
  { number: '06', title: 'Receive Certificate of Incorporation', description: 'Once the ROC approves your application, you receive the Certificate of Incorporation, PAN, and TAN. Your Indian company is officially in business.' },
];

const documents = [
  { label: 'Passport', detail: 'Apostilled through Global Affairs Canada or provincial authority (since Jan 2024)' },
  { label: 'Canadian Address Proof', detail: 'Utility bill or bank statement (apostilled), dated within 2 months' },
  { label: 'PAN Card (Form 49AA)', detail: 'For foreign nationals — we assist with the application' },
  { label: 'DSC (Class 3)', detail: 'Digital Signature Certificate — obtained remotely' },
  { label: 'Director Identification Number (DIN)', detail: 'Allotted through the SPICe+ filing' },
  { label: 'Registered Office Proof', detail: 'Virtual registered office in India available through us' },
];

const faqs = [
  { q: 'Can I register a company in India from Canada without visiting India?', a: 'Yes. The entire process is done online via the MCA21 portal. Since Canada joined the Hague Apostille Convention in January 2024, your Canadian documents can be apostilled locally — no Indian Embassy attestation needed, and no India visit required.' },
  { q: 'When did Canada join the Hague Apostille Convention?', a: 'Canada acceded to the Hague Apostille Convention and it came into force on January 11, 2024. This significantly simplified the document authentication process for Canadians registering businesses in India, as apostilled Canadian documents are now directly accepted by Indian authorities.' },
  { q: 'Is there a tax treaty between India and Canada?', a: 'Yes. India and Canada have a Double Taxation Avoidance Agreement (DTAA) which prevents the same income from being taxed twice. This is relevant when income flows between your Canadian residence and Indian company.' },
  { q: 'Can a Canadian citizen own 100% of an Indian company?', a: 'Yes, in most sectors. India allows 100% FDI under the Automatic Route in sectors including IT, consulting, manufacturing, and e-commerce (marketplace model). Some sectors require prior government approval.' },
  { q: 'How long does it take to register a company in India from Canada?', a: 'Typically 15–25 working days once apostilled documents are ready. The apostille process in Canada varies by province but generally takes 5–10 working days.' },
  { q: 'My documents are in both English and French — is that an issue?', a: 'No. Documents in French need to be accompanied by a certified English translation for submission to Indian authorities. We can guide you on obtaining certified translations from Canada.' },
];

const structured = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Register a Company in India from Canada', url: 'https://www.indiacompanysetup.com/company-registration/from-canada', description: 'Complete guide for Canada-based NRIs and Canadian businesses to register a company in India online — no India visit required.' },
    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'HowTo', name: 'How to Register a Company in India from Canada', step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.description })) },
    { '@type': 'BreadcrumbList', 'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.indiacompanysetup.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Company Registration', 'item': 'https://www.indiacompanysetup.com/setup' },
      { '@type': 'ListItem', 'position': 3, 'name': 'From Canada', 'item': 'https://www.indiacompanysetup.com/company-registration/from-canada' },
    ] },
  ],
};

const otherCountries = [
  { label: 'From the USA', href: '/company-registration/from-usa' },
  { label: 'From the UK', href: '/company-registration/from-uk' },
  { label: 'From Dubai / UAE', href: '/company-registration/from-dubai' },
  { label: 'From Singapore', href: '/company-registration/from-singapore' },
  { label: 'From Australia', href: '/company-registration/from-australia' },
];

export default function FromCanadaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />

      {/* HERO */}
      <section style={{ background: T.f, padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Link href="/setup" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block', textDecoration: 'none' }}>← Back to Services</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>Company Registration · From Canada</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 16 }}>Register a Company in India<br />from Canada</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 32px' }}>100% online. No India visit required. Expert support for Canada-based NRIs, Canadian businesses, and founders expanding into India.</p>
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
            { value: 'Since Jan 2024', label: 'Canada in Apostille Convention' },
            { value: '100% FDI', label: 'Allowed in Most Sectors' },
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
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 12 }}>Why Canada-Based NRIs Are Setting Up in India</h2>
          <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.8, marginBottom: 28, maxWidth: 720 }}>Canada has one of the fastest-growing South Asian diaspora communities. Many Canada-based NRIs are establishing Indian entities to access talent, serve the Indian market, or maintain business ties. Canada's accession to the Hague Apostille Convention in January 2024 has made the registration process significantly simpler compared to before.</p>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
            {["Canada now in Apostille Convention — simpler document process", "India-Canada DTAA prevents double taxation", "Access India's deep tech and engineering talent", "100% FDI under Automatic Route in most sectors", "Startup India recognition and tax holiday benefits", "Lower operational costs vs Canada"].map(point => (
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
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 36 }}>From Canadian apostille to your Certificate of Incorporation.</p>
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
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 8 }}>Documents Required from Canada</h2>
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 28 }}>Since January 2024, Canada is part of the Hague Apostille Convention. Canadian documents apostilled through Global Affairs Canada or provincial authorities are accepted directly by Indian authorities.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
            {documents.map(doc => (
              <div key={doc.label} style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', border: `1px solid ${T.bdr}` }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ch, marginBottom: 4 }}>{doc.label}</div>
                <div style={{ fontSize: 13, color: T.mid, lineHeight: 1.6 }}>{doc.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS STRUCTURES */}
      <section style={{ background: '#fff', padding: '64px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 8 }}>Which Business Structure is Right for You?</h2>
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 28 }}>Canada-based founders typically choose one of three structures.</p>
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
                  ['Wholly Owned Subsidiary', 'Canadian companies expanding to India', '2 (1 resident)', 'Yes — 100% ownership'],
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
          <h2 className="font-display" style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 600, color: '#fff', marginBottom: 14 }}>Ready to Register Your Indian Company from Canada?</h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, marginBottom: 32 }}>We handle everything — apostille guidance, DSC, SPICe+ filing, and ongoing compliance. Book a free consultation today.</p>
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
