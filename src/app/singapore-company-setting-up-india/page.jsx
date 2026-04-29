import CountryClientPage from '@/components/seo/CountryClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Singapore Company Setting Up in India | DTAA, GAAR, GCC Setup Guide 2026',
  description: "Singapore companies setting up in India — WOS incorporation, India-Singapore DTAA, GAAR & Tiger Global ruling impact, GCC setup, ESOP structures, FEMA compliance. Ex-Big 4 CA team. Free consultation.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/singapore-company-setting-up-india' },
  openGraph: {
    title: 'Singapore Company Setting Up in India | DTAA, GAAR, GCC Setup Guide 2026',
    description: "Singapore companies setting up in India — WOS incorporation, India-Singapore DTAA, GAAR & Tiger Global ruling impact, GCC setup, ESOP structures, FEMA compliance. Ex-Big 4 CA team.",
    url: 'https://www.indiacompanysetup.com/singapore-company-setting-up-india',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'Singapore Company Setting Up in India' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singapore Company Setting Up in India | DTAA, GAAR, GCC Setup Guide 2026',
    description: "Singapore companies setting up in India — WOS incorporation, India-Singapore DTAA, GAAR & Tiger Global ruling impact, GCC setup, ESOP structures, FEMA compliance.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Singapore Company Setting Up in India — India Entry Advisory",
  "description": "End-to-end India entry for Singapore companies — WOS incorporation, DTAA planning, GCC setup, ESOP structures, transfer pricing, and FEMA compliance. Ex-Big 4 led CA team.",
  "url": "https://www.indiacompanysetup.com/singapore-company-setting-up-india",
  "provider": {
    "@type": "Organization",
    "@id": "https://www.indiacompanysetup.com/#organization",
    "name": "India Company Setup"
  },
  "areaServed": ["SG", "US", "GB", "AE", "AU"],
  "serviceType": "India Entry Advisory",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "India Entry Services for Singapore Companies",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "WOS / Private Limited Company Incorporation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GCC Setup — Entity, Payroll, ESOP, Transfer Pricing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "India-Singapore DTAA Planning & GAAR Substance Advisory" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FEMA & RBI Compliance — FCGPR, Annual Returns" } }
    ]
  }
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
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "SCO 18, Top Floor, Sector 20-D",
    "addressLocality": "Chandigarh",
    "postalCode": "160020",
    "addressCountry": "IN"
  },
  "areaServed": ["SG", "US", "GB", "AE", "AU", "IN"],
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
      "name": "Is Singapore still a good holding structure for India after the Tiger Global ruling in January 2026?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — but substance is now mandatory. The Supreme Court's January 2026 Tiger Global ruling confirmed that a Tax Residency Certificate alone is not sufficient protection under GAAR. Your Singapore entity must demonstrate genuine economic substance: real employees, board meetings held in Singapore, management decisions made there, and commercial purpose beyond tax planning. If your Singapore entity has genuine operations, the DTAA continues to provide material benefits on dividends (10-15%), interest (10-15%), and royalties (10%). Pure conduit structures face denial of treaty benefits." }
    },
    {
      "@type": "Question",
      "name": "What changed under GAAR for Singapore-India structures?",
      "acceptedAnswer": { "@type": "Answer", "text": "GAAR (General Anti-Avoidance Rules) became effective in April 2017. It allows Indian tax authorities to reclassify or disregard an arrangement if its main purpose is to obtain a tax benefit and it lacks commercial substance. The Tiger Global ruling in January 2026 applied GAAR to deny treaty benefits to a Singapore structure the court found was primarily tax-motivated. The ruling does not affect Singapore structures with genuine business substance — but it has significantly raised the documentation bar. We advise all Singapore clients to maintain a substance file from day one." }
    },
    {
      "@type": "Question",
      "name": "Does Press Note 3 apply to Singapore companies investing in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Press Note 3 (2020) restricts FDI from countries sharing a land border with India — China, Pakistan, Bangladesh, Nepal, Bhutan, and Myanmar — requiring prior government approval. Singapore is not on this list. Singapore companies can invest in India under the Automatic Route in all sectors permitting 100% FDI, without any prior government approval. This is a significant structural advantage compared to China-linked holding companies." }
    },
    {
      "@type": "Question",
      "name": "How is a GCC's intercompany pricing structured and documented?",
      "acceptedAnswer": { "@type": "Answer", "text": "An India GCC providing services to its Singapore parent is compensated using a cost-plus model under TNMM (Transactional Net Margin Method). The India entity charges its total costs plus a mark-up of 8-15%, benchmarked against comparable Indian service companies. A formal intercompany services agreement must be executed before any services begin. Form 3CEB (India TP certificate signed by a Chartered Accountant) is filed annually by October 31. Backdated agreements are treated adversely by Transfer Pricing Officers." }
    },
    {
      "@type": "Question",
      "name": "Can Indian employees of the India GCC receive ESOPs from the Singapore parent?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this is common in Singapore-India GCC structures. Indian employees receiving ESOPs from the Singapore parent must comply with FEMA Schedule VI regulations. Perquisite tax applies in India at exercise on the spread between fair market value and exercise price. The Singapore parent must also comply with MAS regulations for cross-border employee share schemes. This structure must be designed correctly at setup — retrospective regularisation is complex and costly." }
    },
    {
      "@type": "Question",
      "name": "What bank account does an India subsidiary of a Singapore company need?",
      "acceptedAnswer": { "@type": "Answer", "text": "The India subsidiary needs a Current Account with an AD Category-I bank — HDFC, ICICI, Axis, SBI, or Kotak are commonly used for foreign-owned companies. The account is required for receiving FDI from Singapore, paying salaries, GST, TDS, and vendor payments. Bank account opening typically takes 2-4 weeks and requires apostilled KYC documents from the Singapore parent including Certificate of Incorporation, M&A, and Board Resolution. This is often the critical path — not the incorporation itself." }
    },
    {
      "@type": "Question",
      "name": "Which Indian cities are best for a Singapore company setting up a GCC?",
      "acceptedAnswer": { "@type": "Answer", "text": "Bengaluru dominates for tech, AI, and product engineering with the deepest talent pool and strongest Singapore PE/VC network familiarity. Pune is strong for engineering and manufacturing-adjacent tech at lower costs. Hyderabad is growing fast for fintech, healthcare tech, and analytics with competitive real estate and strong government support. Chennai suits logistics-tech, automotive, and hardware. For most Singapore SaaS and tech companies, Bengaluru or Pune is the right starting point." }
    },
    {
      "@type": "Question",
      "name": "How long does a full GCC setup take from Singapore?",
      "acceptedAnswer": { "@type": "Answer", "text": "A realistic timeline: entity incorporated in 7-12 working days. Singapore parent documents require apostilling — allow 3-5 additional days. Bank account open in weeks 3-4. GST registration in week 4. First payroll run in week 6. Transfer pricing policy and intercompany agreement by week 6-8. Full operational readiness including ESOP trust in 8 weeks total. The critical path is the bank account, not the incorporation." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, orgSchema]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CountryClientPage country="sg" />
    </>
  );
}
 
