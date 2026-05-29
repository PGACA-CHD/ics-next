import CountryClientPage from '@/components/seo/CountryClient';

export const revalidate = 3600;

export const metadata = {
  title: 'US Company Setting Up in India | India Subsidiary for US Firms',
  description: "How US companies set up in India. WOS incorporation, DTAA USA-India, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/us-company-setting-up-india' },
  openGraph: {
    title: 'US Company Setting Up in India | India Subsidiary for US Firms',
    description: "How US companies set up in India. WOS incorporation, DTAA USA-India, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
    url: 'https://www.indiacompanysetup.com/us-company-setting-up-india',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Company Setting Up in India | India Subsidiary for US Firms',
    description: "How US companies set up in India. WOS incorporation, DTAA USA-India, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "US Company Setting Up in India | India Subsidiary for US Firms",
  "description": "How US companies set up in India. WOS incorporation, DTAA USA-India, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
  "url": "https://www.indiacompanysetup.com/us-company-setting-up-india",
  "provider": { "@type": "Organization", "@id": "https://www.indiacompanysetup.com/#organization", "name": "India Company Setup" },
  "areaServed": ["US", "GB", "AE", "SG", "AU"],
  "serviceType": "Business Advisory"
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://www.indiacompanysetup.com/#organization",
  "name": "India Company Setup",
  "url": "https://www.indiacompanysetup.com",
  "logo": "https://www.indiacompanysetup.com/og-image.jpg",
  "image": "https://www.indiacompanysetup.com/og-image.jpg",
  "description": "End-to-end company setup in India for foreign businesses. Ex-Big 4 led CA team. 100+ foreign companies incorporated.",
  "telephone": "+91-99157-31447",
  "email": "info@indiacompanysetup.com",
  "address": { "@type": "PostalAddress", "streetAddress": "SCO 18, Top Floor, Sector 20-D", "addressLocality": "Chandigarh", "postalCode": "160020", "addressCountry": "IN" },
  "areaServed": ["US", "GB", "AE", "SG", "AU", "IN"],
  "priceRange": "$$"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.indiacompanysetup.com" },
    { "@type": "ListItem", "position": 2, "name": "Setup", "item": "https://www.indiacompanysetup.com/setup" },
    { "@type": "ListItem", "position": 3, "name": "US Company Setting Up in India", "item": "https://www.indiacompanysetup.com/us-company-setting-up-india" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can a US Delaware company own 100% of an Indian subsidiary?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Under India's FDI policy, a US Delaware company can hold 100% equity in an Indian Private Limited Company under the Automatic Route in most sectors. The Delaware parent is treated as a foreign entity for FEMA purposes. Share allotment to the foreign parent must be reported to the RBI within 30 days via the FC-GPR form on the FIRMS portal." }
    },
    {
      "@type": "Question",
      "name": "Does the India-US DTAA reduce the tax burden?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The India-US DTAA reduces withholding tax on dividends to 15-25% (versus the 20% domestic rate), royalties to 10-15%, and Fees for Technical Services to 10-15%. To claim treaty benefits, the US parent must provide a Tax Residency Certificate (TRC) and Form 10F to the Indian subsidiary before each payment." }
    },
    {
      "@type": "Question",
      "name": "Is transfer pricing between a US parent and India subsidiary required?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Any transaction between a US parent and its Indian subsidiary - including services, royalties, loans, and cost-sharing - is subject to Indian transfer pricing rules under Section 92 of the Income Tax Act. An annual Form 3CEB report signed by a Chartered Accountant is mandatory. The arm's length standard under Indian Section 92 mirrors the US Section 482 standard." }
    },
    {
      "@type": "Question",
      "name": "How long does it take for a US company to set up in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "Incorporation typically takes 7-12 working days after document submission via the SPICe+ form with the MCA. US parent company documents need apostilling, which adds 3-5 days. Total timeline from engagement to Certificate of Incorporation is approximately 3-4 weeks. Bank account opening takes a further 2-4 weeks." }
    },
    {
      "@type": "Question",
      "name": "Does the Indian subsidiary need to file US tax forms?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Indian subsidiary itself has no US filing obligation. However, the US parent must file Form 5471 annually with the IRS. US GILTI rules may also apply to the Indian subsidiary's income - early structuring is recommended to minimise GILTI exposure." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, orgSchema]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CountryClientPage country="us" />
    </>
  );
}
