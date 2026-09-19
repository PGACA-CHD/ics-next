import ClientPage from './client';

export const metadata = {
  title: 'GST HSN Code & SAC Code Finder',
  description: 'Find the correct HSN code for goods or SAC code for services under India GST. Search by description or code number. Browse all 99 HSN chapters and major SAC categories. Data from CBIC.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/hsn-sac-finder' },
  openGraph: {
    title: 'GST HSN Code & SAC Code Finder',
    description: 'Search HSN codes for goods and SAC codes for services under India GST. Browse all 99 HSN chapters and major service categories.',
    url: 'https://www.indiacompanysetup.com/tools/hsn-sac-finder',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'GST HSN SAC Finder' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST HSN Code & SAC Code Finder',
    description: 'Find HSN and SAC codes for GST compliance.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GST HSN Code & SAC Code Finder",
  "description": "Search and find HSN codes for goods and SAC codes for services under India GST.",
  "url": "https://www.indiacompanysetup.com/tools/hsn-sac-finder",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "provider": { "@type": "Organization", "@id": "https://www.indiacompanysetup.com/#organization", "name": "India Company Setup" },
}, {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.indiacompanysetup.com" },
    { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://www.indiacompanysetup.com/tools" },
    { "@type": "ListItem", "position": 3, "name": "HSN / SAC Code Finder", "item": "https://www.indiacompanysetup.com/tools/hsn-sac-finder" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is an HSN code under GST in India?", "acceptedAnswer": { "@type": "Answer", "text": "HSN (Harmonised System of Nomenclature) is an internationally standardised system for classifying goods. Under GST, businesses must mention the HSN code on their invoices. Taxpayers with annual turnover up to ₹5 crore use 4-digit codes; those above ₹5 crore must use 6-digit codes. Exporters must use 8-digit codes." } },
    { "@type": "Question", "name": "What is a SAC code under GST?", "acceptedAnswer": { "@type": "Answer", "text": "SAC (Services Accounting Code) is a classification system for services under GST, developed by India's CBIC. Unlike HSN for goods, SAC codes are unique to India. Each SAC code has an associated GST rate. Service providers must mention the SAC code on their invoices." } },
    { "@type": "Question", "name": "Is it mandatory to mention HSN code on GST invoices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Since April 2021, HSN codes are mandatory on B2B invoices for all registered taxpayers (except those with turnover below ₹5 crore for B2C transactions). The number of digits required depends on turnover: 4 digits for turnover up to ₹5 crore; 6 digits for above ₹5 crore." } },
    { "@type": "Question", "name": "What is the HSN code for IT software services?", "acceptedAnswer": { "@type": "Answer", "text": "IT software development and related services fall under SAC code 998314 (IT design and development services) or 998315 (IT infrastructure provisioning services). Software products supplied on media are classified under HSN 8523. Cloud-based software (SaaS) is a service under SAC 998315." } },
    { "@type": "Question", "name": "How do I find the correct GST rate for a product using its HSN code?", "acceptedAnswer": { "@type": "Answer", "text": "The GST rate for a product is determined by its HSN code under the GST tariff schedule. Use the HSN/SAC Finder tool to search by product description or code. The GST Council periodically revises rates — always cross-check against the latest CBIC notification for the applicable rate." } },
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
