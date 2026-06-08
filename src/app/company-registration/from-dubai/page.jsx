import Link from 'next/link';
import { T } from '@/lib/config';

export const metadata = {
  title: 'Register a Company in India from Dubai / UAE | India Company Setup',
  description: 'Guide for UAE-based NRIs and Dubai residents to register a Private Limited Company or LLP in India — 100% online, no India visit required.',
  keywords: ['register company in India from Dubai', 'company registration India from UAE', 'NRI company registration India from Dubai', 'how to start business in India from UAE', 'India company setup from Dubai'],
  alternates: { canonical: 'https://www.indiacompanysetup.com/company-registration/from-dubai' },
  openGraph: {
    title: 'Register a Company in India from Dubai / UAE | India Company Setup',
    description: 'Dubai and UAE-based NRIs can register an Indian company fully online. No India visit needed. End-to-end support from India Company Setup.',
    url: 'https://www.indiacompanysetup.com/company-registration/from-dubai',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'Register a Company in India from Dubai' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register a Company in India from Dubai / UAE | India Company Setup',
    description: 'Dubai and UAE-based NRIs can register an Indian company fully online. No India visit needed.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const steps = [
  { number: '01', title: 'Choose Your Business Structure', description: 'Dubai-based NRIs and UAE residents most commonly register a Private Limited Company or a Wholly Owned Subsidiary. We advise on the best structure based on your sector and FDI requirements.' },
  { number: '02', title: 'Attestation of UAE Documents', description: 'UAE documents must be attested by the UAE Ministry of Foreign Affairs (MOFA) and then by the Indian Embassy/Consulate in the UAE. We provide a complete step-by-step attestation guide.' },
  { number: '03', title: 'Obtain DSC (Digital Signature Certificate)', description: 'All directors need a Class 3 DSC from an Indian certifying authority. The process is handled remotely — no India visit required.' },
  { number: '04', title: 'Reserve Company Name via MCA RUN', description: 'We file your preferred company name through the MCA21 Reserve Unique Name (RUN) portal and confirm availability before proceeding.' },
  { number: '05', title: 'File SPICe+ Incorporation Form', description: 'The SPICe+ (INC-32) form is a combined online application for company incorporation, DIN, PAN, TAN, and GSTIN — submitted in one go to the MCA.' },
  { number: '06', title: 'Receive Certificate of Incorporation', description: 'Upon ROC approval, you receive the Certificate of Incorporation, PAN, and TAN. Your Indian company is now officially registered.' },
];

const documents = [
  { label: 'Passport', detail: 'Attested by UAE MOFA + Indian Embassy/Consulate in UAE' },
  { label: 'UAE Address Proof', detail: 'UAE utility bill or bank statement (attested), dated within 2 months' },
  { label: 'PAN Card (Form 49AA)', detail: 'For foreign nationals — we assist with the application' },
  { label: 'DSC (Class 3)', detail: 'Digital Signature Certificate — obtained remotely' },
  { label: 'Director Identification Number (DIN)', detail: 'Allotted through the SPICe+ filing' },
  { label: 'Registered Office Proof', detail: 'Virtual registered office in India available through us' },
];

const faqs = [
  { q: 'Can I register a company in India from Dubai without visiting India?', a: 'Yes. The entire process is completed online via the MCA21 portal. You only need to get your UAE documents attested through the UAE Ministry of Foreign Affairs and the Indian Embassy in Dubai — no India visit required.' },
  { q: 'How do I attest documents in the UAE for India company registration?', a: 'UAE documents follow a two-step process: first attestation by the UAE Ministry of Foreign Affairs (MOFA), then attestation by the Indian Embassy or Consulate in Abu Dhabi or Dubai. Note: The UAE is not part of the Hague Apostille Convention, so MOFA + Indian Embassy attestation is required instead of apostille.' },
  { q: 'Can a UAE resident own 100% of an Indian company?', a: 'Yes, in most sectors. India allows 100% FDI under the Automatic Route in sectors like IT, consulting, manufacturing, and e-commerce marketplace models. Sectors like defence, media, and banking may require prior government approval.' },
  { q: 'How long does it take to register a company in India from Dubai?', a: 'Typically 15–25 working days once attested documents are ready. The MOFA + Indian Embassy attestation in the UAE takes approximately 5–10 working days.' },
  { q: 'Is there a double taxation agreement between India and the UAE?', a: 'Yes. India and the UAE have a Double Taxation Avoidance Agreement (DTAA). This is highly relevant for NRIs in Dubai who earn income from their Indian company — it prevents the same income from being taxed in both countries.' },
  { q: 'Can I run my Indian company remotely from Dubai?', a: 'Yes. With a registered office address in India (we provide virtual office services), a resident director, and proper compliance filings, you can manage your Indian company entirely from Dubai.' },
];

const structured = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Register a Company in India from Dubai / UAE', url: 'https://www.indiacompanysetup.com/company-registration/from-dubai', description: 'Complete guide for UAE-based NRIs and Dubai residents to register a company in India online — no India visit required.' },
    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'HowTo', name: 'How to Register a Company in India from Dubai / UAE', step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.description })) },
    { '@type': 'BreadcrumbList', 'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.indiacompanysetup.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Company Registration', 'item': 'https://www.indiacompanysetup.com/setup' },
      { '@type': 'ListItem', 'position': 3, 'name': 'From Dubai / UAE', 'item': 'https://www.indiacompanysetup.com/company-registration/from-dubai' },
    ] },
  ],
};

const otherCountries = [
  { label: 'From the USA', href: '/company-registration/from-usa' },
  { label: 'From the UK', href: '/company-registration/from-uk' },
  { label: 'From Singapore', href: '/company-registration/from-singapore' },
  { label: 'From Canada', href: '/company-registration/from-canada' },
  { label: 'From Australia', href: '/company-registration/from-australia' },
];

export default function FromDubaiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />

      {/* HERO */}
      <section style={{ background: T.f, padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Link href="/setup" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block', textDecoration: 'none' }}>← Back to Services</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>Company Registration · From Dubai / UAE</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 16 }}>Register a Company in India<br />from Dubai / UAE</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 32px' }}>100% online. No India visit required. Expert support for UAE-based NRIs, Dubai residents, and Gulf-based businesses expanding into India.</p>
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
            { value: 'DTAA', label: 'India-UAE Tax Treaty' },
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
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 12 }}>Why Dubai-Based NRIs Are Setting Up in India</h2>
          <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.8, marginBottom: 28, maxWidth: 720 }}>The UAE is home to over 3.5 million Indians — one of the largest NRI communities in the world. Many Dubai-based NRIs maintain business interests in India or are looking to leverage India's growth story. With the India-UAE DTAA and a simplified online incorporation process, setting up an Indian company from Dubai has never been easier.</p>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
            {["Access India's 1.4 billion consumer market", "Leverage India-UAE Double Tax Avoidance Agreement (DTAA)", "Benefit from lower operational and staffing costs vs Gulf", "Qualify for Startup India recognition and tax benefits", "Open Indian bank accounts and accept INR payments", "100% FDI permitted under Automatic Route in most sectors"].map(point => (
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
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 36 }}>From MOFA attestation in Dubai to your Certificate of Incorporation.</p>
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
          <div style={{ marginTop: 24, background: '#FFF8ED', border: '1px solid #F5E2B8', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7A5C1E', marginBottom: 4 }}>Important: UAE is not part of the Apostille Convention</div>
            <p style={{ fontSize: 13, color: '#7A5C1E', margin: 0, lineHeight: 1.65 }}>Unlike the USA, UK, Singapore, and Australia, the UAE has not signed the Hague Apostille Convention. UAE documents require a two-step attestation: UAE MOFA first, followed by the Indian Embassy or Consulate in Dubai or Abu Dhabi.</p>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section style={{ background: T.ivory, padding: '64px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600, color: T.ch, marginBottom: 8 }}>Documents Required from the UAE</h2>
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 28 }}>UAE documents require MOFA attestation followed by Indian Embassy/Consulate attestation — not apostille, as the UAE is not part of the Hague Convention.</p>
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
          <p style={{ fontSize: 14, color: T.mid, marginBottom: 28 }}>Dubai-based NRIs typically choose one of three structures.</p>
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
                  ['Wholly Owned Subsidiary', 'UAE companies expanding to India', '2 (1 resident)', 'Yes — 100% ownership'],
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
          <h2 className="font-display" style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 600, color: '#fff', marginBottom: 14 }}>Ready to Register Your Indian Company from Dubai?</h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, marginBottom: 32 }}>We handle the full process — UAE attestation guidance, DSC, incorporation, and post-registration compliance. Get started with a free consultation.</p>
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
