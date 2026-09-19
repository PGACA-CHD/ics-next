import ClientPage from './client';

export const metadata = {
  title: 'India Company Setup Pricing: Transparent Fees Published 2026',
  description: 'Published pricing for Private Limited, NRI, foreign subsidiary (WOS), Branch/Liaison Office registration and monthly compliance retainers. Packages from $111. Ex-Big 4 CA team, boutique pricing.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/pricing' },
  openGraph: {
    title: 'Transparent Pricing | India Company Setup',
    description: 'Published fixed fees for incorporation, NRI setup, WOS, Branch/LO, compliance retainers and standalone advisory. Prices in USD, GBP, EUR, SGD, AED, CAD, AUD. Ex-Big 4 CA quality at boutique pricing.',
    url: 'https://www.indiacompanysetup.com/pricing',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup Pricing' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transparent Pricing | India Company Setup',
    description: 'Published fees — NRI from $166, WOS from $443, Branch/LO from $1,667, retainers from $278/mo. 7 currencies. No hidden costs.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const PACKAGES = [
  { name: 'NRI Company Setup — Starter', price: 166, desc: 'NRI route check and clean incorporation with correct FEMA path from day one.' },
  { name: 'NRI Company Setup — Growth', price: 443, desc: 'NRI incorporation plus FCGPR, bank account, GST, and 90-day compliance calendar.' },
  { name: 'NRI Company Setup — Repatriation-Ready', price: 832, desc: 'Complete first-year NRI setup with repatriation planning and DTAA orientation.' },
  { name: 'Foreign Subsidiary WOS — Starter', price: 443, desc: 'FDI route check, subsidiary structure note, and incorporation for foreign companies.' },
  { name: 'Foreign Subsidiary WOS — Market Entry', price: 1110, desc: 'Complete subsidiary setup with FCGPR, banking, FIRMS, GST, and 1-month compliance.' },
  { name: 'Foreign Subsidiary WOS — CFO Desk', price: 1656, desc: 'Full-scope subsidiary setup with TP kickoff, intercompany pack, WHT note, and finance handover.' },
  { name: 'Domestic Pvt Ltd — Essential', price: 111, desc: 'Clean incorporation with Incorporation document forms, tax registration numbers, PF/ESI for Indian founders.' },
  { name: 'Domestic Pvt Ltd — Launch', price: 166, desc: 'Incorporation plus GST, MSME, INC-20A, share certificates, and 90-day compliance calendar.' },
  { name: 'Domestic Pvt Ltd — Ultimate One Year', price: 554, desc: 'Full first-year coverage — incorporation through first annual return, ITR, and TDS.' },
];

const FAQS = [
  { q: 'What does the NRI Starter package fee cover?', a: 'The fee covers professional services — NRI route check, incorporation filing, MOA/AOA drafting, Directors Identification Number / DSC, and all statutory registrations. Government fees and applicable taxes are disclosed upfront. DSC is included.' },
  { q: 'How long does Private Limited Company registration take in India?', a: 'For a standard case with complete documents, expect 7–12 working days from Incorporation document forms filing to Incorporation Certificate.' },
  { q: 'Is NRI investment treated the same as FDI?', a: 'Not always. NRI investment under Schedule 4 of FEMA follows a different compliance path from corporate FDI. Route confirmation is included in every NRI package.' },
  { q: 'Do I need to travel to India to register the company?', a: 'Usually not. The entire process can be completed remotely if documents are in order.' },
  { q: 'Why is foreign subsidiary setup priced above commodity platforms?', a: 'Because it involves FDI route verification, parent-country documents, RBI reporting, cross-border banking, and transfer pricing exposure. The cost of structural errors far exceeds incorporation fees.' },
  { q: 'Does the Market Entry package include FC-GPR?', a: 'Yes. FC-GPR filing with RBI is included in Market Entry and CFO Desk. It must be filed within 30 days of share allotment.' },
  { q: 'When is a Liaison Office better than a subsidiary?', a: 'When the foreign parent only needs representation or coordination activity in India and does not intend to earn revenue or execute contracts.' },
  { q: 'How long does Branch or Liaison Office approval take?', a: 'Budget 6–8 weeks for the full process including RBI approval, AD-bank coordination, and Ministry of Corporate Affairs registration.' },
  { q: 'Is the compliance retainer only for foreign-owned entities?', a: 'Primarily designed for foreign-owned subsidiaries, NRI companies, and GCCs where GST, TDS, payroll, FEMA and parent-company reporting are interconnected.' },
  { q: 'Is there a lock-in period for retainers?', a: 'Minimum 6 months to complete one full compliance cycle. After that, month-to-month with 30 days\' notice.' },
  { q: 'What payment methods do you accept?', a: 'Wire transfer (all currencies), Stripe, and PayPal (for invoices under USD 5,000). For India-based payments: bank transfer, UPI, and Razorpay.' },
  { q: 'Do you offer a refund if you can\'t deliver?', a: 'Yes. If we cannot complete your incorporation within the published timeline due to our delay, we refund 100% of professional fees. Government fees are non-refundable.' },
  { q: 'What is the Controller Desk close checklist?', a: 'A structured month-end process covering bank, intercompany, GST, TDS, payroll reconciliation and management-ready trial balance delivered by a fixed date each month.' },
];

export const schemaJson = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.indiacompanysetup.com' },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.indiacompanysetup.com/pricing' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  ...PACKAGES.map(pkg => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.name,
    description: pkg.desc,
    brand: { '@type': 'Brand', name: 'India Company Setup' },
    offers: {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://www.indiacompanysetup.com/pricing',
      seller: { '@type': 'Organization', name: 'India Company Setup' },
    },
  })),
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'India Company Setup',
    url: 'https://www.indiacompanysetup.com',
    priceRange: '$111 – $1,667/mo',
    description: 'Ex-Big 4 CA-led India company incorporation and compliance advisory for foreign companies, NRIs, and Indian founders.',
    areaServed: ['US', 'GB', 'AE', 'SG', 'AU', 'IN'],
  },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
