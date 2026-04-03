import CountryClientPage from '@/components/seo/CountryClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'UAE Company Setting Up in India | India Subsidiary for UAE Firms',
  description: "How UAE companies set up in India. WOS incorporation, India-UAE DTAA, transfer pricing, RBI filings. Ex-Big 4 India entry specialists.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/uae-company-setting-up-india' },
  openGraph: {
    title: 'UAE Company Setting Up in India | India Subsidiary for UAE Firms',
    description: "How UAE companies set up in India. WOS incorporation, India-UAE DTAA, transfer pricing, RBI filings. Ex-Big 4 India entry specialists.",
    url: 'https://www.indiacompanysetup.com/uae-company-setting-up-india',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UAE Company Setting Up in India | India Subsidiary for UAE Firms',
    description: "How UAE companies set up in India. WOS incorporation, India-UAE DTAA, transfer pricing, RBI filings. Ex-Big 4 India entry specialists.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "UAE Company Setting Up in India | India Subsidiary for UAE Firms",
  "description": "How UAE companies set up in India. WOS incorporation, India-UAE DTAA, transfer pricing, RBI filings. Ex-Big 4 India entry specialists.",
  "url": "https://www.indiacompanysetup.com/uae-company-setting-up-india",
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
    { "@type": "ListItem", "position": 3, "name": "UAE Company Setting Up in India", "item": "https://www.indiacompanysetup.com/uae-company-setting-up-india" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can a UAE company invest in India under the Automatic Route?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. UAE companies can invest in India under the Automatic Route in most sectors, meaning no prior RBI or government approval is required. The UAE parent must comply with FEMA regulations, and share allotment must be reported via the FC-GPR form on the RBI FIRMS portal within 30 days. UAE documents require apostilling for use in India." }
    },
    {
      "@type": "Question",
      "name": "Is an NRI's UAE investment treated differently from a foreign company's investment?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Investment by an NRI from the UAE is governed by Schedule 4 of FEMA (NRI investment route), while investment by a UAE-incorporated company is governed by Schedule 1 (FDI route). The NRI route has fewer restrictions in some sectors but different pricing and reporting requirements. The choice of route affects repatriation rights, transfer pricing applicability, and FEMA compliance obligations." }
    },
    {
      "@type": "Question",
      "name": "Does the India-UAE DTAA still apply after UAE introduced corporate tax?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The India-UAE DTAA (revised in 2014) continues to apply. The UAE's 9% corporate tax introduced in 2023 does not affect treaty applicability - the DTAA prevents double taxation between the two countries. UAE companies paying Indian withholding tax can credit it against UAE corporate tax liability. BEPS Action 6 substance requirements must be met to claim treaty benefits." }
    },
    {
      "@type": "Question",
      "name": "What is BEPS substance and why does it matter for UAE holding companies?",
      "acceptedAnswer": { "@type": "Answer", "text": "BEPS Action 6 requires that companies claiming DTAA treaty benefits have genuine economic substance in the treaty country. For UAE holding companies, this means real employees, decision-making, and operations in the UAE - not just a registered address. Indian tax authorities can deny DTAA benefits under the Principal Purpose Test (PPT) if the primary purpose of the UAE structure is treaty shopping. DIFC entities require additional analysis as DIFC is treated as a separate jurisdiction within the UAE." }
    },
    {
      "@type": "Question",
      "name": "How long does India incorporation take for a UAE company?",
      "acceptedAnswer": { "@type": "Answer", "text": "Standard incorporation via SPICe+ with the MCA takes 7-12 working days after document submission. UAE parent documents need apostilling or notarisation, adding 3-5 days. For straightforward structures, total timeline is 3-4 weeks. Complex restructures - such as converting an existing branch office to a private limited company or regularising past FEMA non-compliance - typically take 6-8 weeks." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, orgSchema]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CountryClientPage country="uae" />
    </>
  );
}
