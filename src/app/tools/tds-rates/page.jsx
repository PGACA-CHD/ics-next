import ClientPage from './client';

export const metadata = {
  title: 'TDS Rate Chart FY 2026-27 | All Sections 192 to 196D',
  description: 'Complete TDS rate chart for FY 2026-27 covering all sections — 192 to 196D. Search by section, payment type or keyword. Threshold limits, individual/HUF vs company rates. Built by Ex-Big 4 CAs.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/tds-rates' },
  openGraph: {
    title: 'TDS Rate Chart FY 2026-27 | All Sections 192 to 196D',
    description: 'Complete TDS rate reference covering sections 192–196D with threshold limits and deductee-specific rates.',
    url: 'https://www.indiacompanysetup.com/tools/tds-rates',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'TDS Rate Chart FY 2026-27' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDS Rate Chart FY 2026-27',
    description: 'All TDS sections 192–196D with rates, thresholds and notes.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "TDS Rate Chart FY 2026-27",
  "description": "Complete TDS rate chart for FY 2026-27 covering all major sections 192 to 196D.",
  "url": "https://www.indiacompanysetup.com/tools/tds-rates",
  "provider": { "@type": "Organization", "@id": "https://www.indiacompanysetup.com/#organization", "name": "India Company Setup" },
}, {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.indiacompanysetup.com" },
    { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://www.indiacompanysetup.com/tools" },
    { "@type": "ListItem", "position": 3, "name": "TDS Rate Chart FY 2026-27", "item": "https://www.indiacompanysetup.com/tools/tds-rates" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is the TDS rate on salary under Section 192?", "acceptedAnswer": { "@type": "Answer", "text": "TDS on salary under Section 192 is deducted at the applicable income tax slab rate of the employee (new or old regime). There is no fixed percentage — it depends on the employee's estimated annual income, tax regime chosen, and eligible deductions declared to the employer." } },
    { "@type": "Question", "name": "What is the TDS rate on rent under Section 194I?", "acceptedAnswer": { "@type": "Answer", "text": "Under Section 194I, TDS on rent is 2% for plant, machinery, or equipment, and 10% for land, building, or furniture. The threshold is ₹50,000 per month (revised from ₹2,40,000 per year). No TDS is required if the annual rent is below this limit." } },
    { "@type": "Question", "name": "What is the TDS rate on professional fees under Section 194J?", "acceptedAnswer": { "@type": "Answer", "text": "Under Section 194J, TDS is 2% for technical services and 10% for professional services, royalties, and non-compete fees. The threshold is ₹50,000 per year (revised from ₹30,000). Directors' fees have no threshold." } },
    { "@type": "Question", "name": "What is the higher TDS rate if PAN is not submitted?", "acceptedAnswer": { "@type": "Answer", "text": "If a deductee does not provide their PAN (or Aadhaar), TDS must be deducted at 20% or the applicable rate, whichever is higher, under Section 206AA. Under IT Act 2025, this is covered under Section 397(2)." } },
    { "@type": "Question", "name": "What is the TDS rate on interest income from banks under Section 194A?", "acceptedAnswer": { "@type": "Answer", "text": "Under Section 194A, TDS on interest (other than interest on securities) is 10%. The threshold is ₹10,000 per year for bank/post office deposits (₹50,000 for senior citizens) and ₹10,000 for other sources. This threshold was revised upward in Finance Act 2025." } },
  ],
}]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
