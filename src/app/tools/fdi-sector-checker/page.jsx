import ClientPage from './client';

export const metadata = {
  title: 'India FDI Sector Limit Checker | Automatic vs Government Approval Route',
  description: 'Check FDI limits for any sector in India — automatic route vs government approval route. Based on DPIIT Consolidated FDI Policy.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/fdi-sector-checker' },
  openGraph: {
    title: 'India FDI Sector Limit Checker',
    description: 'Check FDI limits for any sector in India — automatic route vs government approval route. Based on DPIIT Consolidated FDI Policy.',
    url: 'https://www.indiacompanysetup.com/tools/fdi-sector-checker',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India FDI Sector Limit Checker' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India FDI Sector Limit Checker',
    description: 'Check FDI limits for any sector — automatic route vs government approval. Based on DPIIT Consolidated FDI Policy.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "India FDI Sector Limit Checker",
  "description": "Check FDI limits for any sector in India — automatic route vs government approval route. Based on DPIIT Consolidated FDI Policy.",
  "url": "https://www.indiacompanysetup.com/tools/fdi-sector-checker",
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
    { "@type": "ListItem", "position": 3, "name": "FDI Sector Checker", "item": "https://www.indiacompanysetup.com/tools/fdi-sector-checker" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What sectors allow 100% FDI under the automatic route in India?", "acceptedAnswer": { "@type": "Answer", "text": "100% FDI under the automatic route (no government approval needed) is permitted in most sectors including IT and software, manufacturing, e-commerce marketplace model, construction development, infrastructure, most trading activities, and professional services. Sectoral caps apply in banking, insurance, media, telecom, and defence." } },
    { "@type": "Question", "name": "What is the difference between the automatic route and government route for FDI in India?", "acceptedAnswer": { "@type": "Answer", "text": "Under the automatic route, no prior approval from the Reserve Bank of India (RBI) or the Government is required — the investment can be made directly and reported to RBI within 30 days. Under the government route, prior approval from the relevant ministry or the Foreign Investment Facilitation Portal (FIFP) is required before investment can be made." } },
    { "@type": "Question", "name": "Which sectors are prohibited for FDI in India?", "acceptedAnswer": { "@type": "Answer", "text": "FDI is prohibited in: lottery businesses (including online lotteries), gambling and betting (including casinos), chit funds, Nidhi companies, trading in Transferable Development Rights (TDRs), real estate business or construction of farm houses, manufacturing of cigars/cigarettes, and activities reserved for the government (atomic energy, railway operations except permitted activities)." } },
    { "@type": "Question", "name": "What is the FDI limit for the insurance sector in India?", "acceptedAnswer": { "@type": "Answer", "text": "The FDI limit in the insurance sector is 74% under the automatic route (for insurance companies). FDI up to 100% is allowed for insurance intermediaries. Previously capped at 49%, the limit was raised to 74% in 2021, and Budget 2021 allowed 100% for intermediaries." } },
    { "@type": "Question", "name": "Can a foreign company own 100% of an Indian private limited company?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, in most sectors under the automatic route. A foreign company can set up a Wholly Owned Subsidiary (WOS) in India with 100% foreign ownership. The subsidiary is an Indian company incorporated under the Companies Act, 2013, and must comply with Indian corporate law and FEMA regulations." } },
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
