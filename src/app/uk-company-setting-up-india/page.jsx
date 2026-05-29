import CountryClientPage from '@/components/seo/CountryClient';

export const revalidate = 3600;

export const metadata = {
  title: 'UK Company Setting Up in India | India Subsidiary for UK Firms',
  description: "How UK companies set up in India. WOS incorporation, DTAA UK-India, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/uk-company-setting-up-india' },
  openGraph: {
    title: 'UK Company Setting Up in India | India Subsidiary for UK Firms',
    description: "How UK companies set up in India. WOS incorporation, DTAA UK-India, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
    url: 'https://www.indiacompanysetup.com/uk-company-setting-up-india',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Company Setting Up in India | India Subsidiary for UK Firms',
    description: "How UK companies set up in India. WOS incorporation, DTAA UK-India, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "UK Company Setting Up in India | India Subsidiary for UK Firms",
  "description": "How UK companies set up in India. WOS incorporation, DTAA UK-India, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
  "url": "https://www.indiacompanysetup.com/uk-company-setting-up-india",
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
    { "@type": "ListItem", "position": 3, "name": "UK Company Setting Up in India", "item": "https://www.indiacompanysetup.com/uk-company-setting-up-india" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can a UK company own 100% of an Indian subsidiary?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Under India's FDI policy, a UK company can hold 100% equity in an Indian Private Limited Company under the Automatic Route in most sectors. The UK parent is treated as a foreign investor for FEMA purposes. Share allotment must be reported to the RBI within 30 days via the FC-GPR form on the FIRMS portal." }
    },
    {
      "@type": "Question",
      "name": "Does the India-UK DTAA apply after Brexit?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The India-UK DTAA is a bilateral treaty and was not affected by Brexit. UK companies continue to benefit from reduced withholding tax rates - dividends at 10-15%, interest at 10-15%, and royalties at 10-15% - compared to the 20% domestic Indian rate. Post-Brexit, UK companies can no longer rely on EU parent-subsidiary directive benefits; direct India-UK DTAA planning is now essential." }
    },
    {
      "@type": "Question",
      "name": "What are the PE risks for UK companies with Indian operations?",
      "acceptedAnswer": { "@type": "Answer", "text": "A Permanent Establishment (PE) can arise if UK employees habitually work from India, if the Indian entity concludes contracts on behalf of the UK parent, or if UK personnel exercise authority over Indian operations. PE triggers full Indian corporate tax liability at 40% on attributable profits. FCA-regulated entities face additional risk - any PE notice typically triggers FCA reporting obligations." }
    },
    {
      "@type": "Question",
      "name": "How does UK group reporting work with an Indian subsidiary?",
      "acceptedAnswer": { "@type": "Answer", "text": "Indian Accounting Standards (Ind AS) are substantially converged with IFRS, making consolidation into UK group accounts straightforward with minimal reconciliation. The Indian subsidiary prepares statutory financials under Ind AS, audited by an ICAI-registered Chartered Accountant. UK CFC rules may apply if the Indian subsidiary has passive income - early structuring avoids unwanted UK tax charges." }
    },
    {
      "@type": "Question",
      "name": "Is Indian transfer pricing documentation different from the UK's?",
      "acceptedAnswer": { "@type": "Answer", "text": "The arm's length standard under Indian Section 92 is equivalent to HMRC's arm's length principle. An annual Form 3CEB certified by an Indian Chartered Accountant is mandatory for all international transactions, regardless of value. A Master File and Local File are required if aggregate international transactions exceed INR 50 crore. HMRC's Country-by-Country Reporting obligations also apply to the UK group." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, orgSchema]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CountryClientPage country="uk" />
    </>
  );
}
