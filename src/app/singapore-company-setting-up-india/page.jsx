import CountryClientPage from '@/components/seo/CountryClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Singapore Company Setting Up in India | India Subsidiary for Singapore Firms',
  description: "How Singapore companies set up in India. WOS incorporation, India-Singapore DTAA, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/singapore-company-setting-up-india' },
  openGraph: {
    title: 'Singapore Company Setting Up in India | India Subsidiary for Singapore Firms',
    description: "How Singapore companies set up in India. WOS incorporation, India-Singapore DTAA, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
    url: 'https://www.indiacompanysetup.com/singapore-company-setting-up-india',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singapore Company Setting Up in India | India Subsidiary for Singapore Firms',
    description: "How Singapore companies set up in India. WOS incorporation, India-Singapore DTAA, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Singapore Company Setting Up in India | India Subsidiary for Singapore Firms",
  "description": "How Singapore companies set up in India. WOS incorporation, India-Singapore DTAA, transfer pricing, FEMA compliance. Ex-Big 4 India entry specialists.",
  "url": "https://www.indiacompanysetup.com/singapore-company-setting-up-india",
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
    { "@type": "ListItem", "position": 3, "name": "Singapore Company Setting Up in India", "item": "https://www.indiacompanysetup.com/singapore-company-setting-up-india" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Singapore still a good holding structure for India investment post-2017 DTAA revision?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, with important caveats. The India-Singapore DTAA was revised in 2017, removing the capital gains exemption for investments made after 1 April 2017. Pre-2017 investments retain grandfathered capital gains protection. For new investments, Singapore remains attractive for dividend, interest, and royalty flows - the DTAA provides 10-15% WHT on dividends, 10-15% on interest, and 10% on royalties. The MLI Principal Purpose Test now applies - genuine substance in Singapore is essential." }
    },
    {
      "@type": "Question",
      "name": "How is a GCC's intercompany pricing structured?",
      "acceptedAnswer": { "@type": "Answer", "text": "A Global Capability Centre (GCC) in India typically operates under a cost-plus model: the Indian entity provides services to the Singapore parent and is compensated at cost plus a mark-up of 8-15% (the arm's length range under TNMM - Transactional Net Margin Method). A formal intercompany services agreement must be in place before transactions begin. Transfer pricing documentation (Form 3CEB plus Master File/Local File if thresholds are met) is required annually." }
    },
    {
      "@type": "Question",
      "name": "Can Singapore employees receive ESOPs from the Indian subsidiary?",
      "acceptedAnswer": { "@type": "Answer", "text": "The more common scenario is Indian employees of the India GCC receiving ESOPs from the Singapore parent. Such cross-border ESOPs have specific FEMA implications - Indian employees must comply with Schedule VI of FEMA (Employee Stock Option Scheme regulations). Perquisite tax applies in India on the spread at exercise. These structures must be designed correctly at setup as retrospective regularisation is complex and costly." }
    },
    {
      "@type": "Question",
      "name": "What is the Principal Purpose Test and does it affect Singapore holding structures?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Principal Purpose Test (PPT) is an anti-avoidance measure introduced under the OECD's Multilateral Instrument (MLI), to which both India and Singapore are signatories. It allows Indian tax authorities to deny DTAA treaty benefits if one of the principal purposes of an arrangement is to obtain those benefits. Singapore holding structures with genuine business substance - real employees, board meetings in Singapore, local management decisions - are well-positioned. Pure conduit structures without Singapore substance are at risk." }
    },
    {
      "@type": "Question",
      "name": "How long does it take to set up a GCC in India from Singapore?",
      "acceptedAnswer": { "@type": "Answer", "text": "A standard private limited company can be incorporated in 7-12 working days via SPICe+ after document submission. Singapore parent documents require apostilling (3-5 days). Full operational readiness - including bank account, GST registration, payroll setup, TDS registration, and transfer pricing policy - takes 6-8 weeks from engagement. A 40-person GCC with ESOP trust structure typically requires 8 weeks of parallel workstreams." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, orgSchema]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CountryClientPage country="singapore" />
    </>
  );
}
