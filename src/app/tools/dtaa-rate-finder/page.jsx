import ClientPage from './client';

export const metadata = {
  title: 'India DTAA Rate Finder | Treaty Withholding Tax Rates for 90+ Countries',
  description: "Find India's DTAA withholding tax rates for dividends, interest, royalties and FTS with 90+ treaty countries. Reduce withholding tax legally.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/dtaa-rate-finder' },
  openGraph: {
    title: 'India DTAA Rate Finder | Treaty Withholding Tax Rates | India Company Setup',
    description: "Find India's DTAA withholding tax rates for dividends, interest, royalties and FTS with 90+ treaty countries. Reduce withholding tax legally.",
    url: 'https://www.indiacompanysetup.com/tools/dtaa-rate-finder',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India DTAA Rate Finder' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India DTAA Rate Finder | Treaty Withholding Tax Rates',
    description: "Find India's DTAA withholding tax rates for dividends, interest, royalties and FTS with 90+ countries.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "India DTAA Rate Finder",
  "description": "Find India's DTAA withholding tax rates for dividends, interest, royalties and FTS with 90+ treaty countries.",
  "url": "https://www.indiacompanysetup.com/tools/dtaa-rate-finder",
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
    { "@type": "ListItem", "position": 3, "name": "DTAA Rate Finder", "item": "https://www.indiacompanysetup.com/tools/dtaa-rate-finder" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is DTAA and how does it benefit taxpayers?", "acceptedAnswer": { "@type": "Answer", "text": "DTAA (Double Tax Avoidance Agreement) is a bilateral treaty between India and another country to prevent the same income from being taxed twice. It specifies reduced withholding tax rates on dividends, interest, royalties, and fees for technical services (FTS). A foreign company receiving income from India can claim DTAA benefits to pay lower withholding tax than the domestic rate." } },
    { "@type": "Question", "name": "What is the DTAA withholding tax rate on dividends between India and the USA?", "acceptedAnswer": { "@type": "Answer", "text": "Under the India–USA DTAA, the withholding tax on dividends is 25% (or 15% if the beneficial owner holds at least 10% of the voting stock). The domestic rate under Indian law is 20% plus surcharge and cess. The lower of the DTAA rate and domestic rate applies." } },
    { "@type": "Question", "name": "How do I claim DTAA benefits in India?", "acceptedAnswer": { "@type": "Answer", "text": "To claim DTAA benefits, the foreign recipient must provide a Tax Residency Certificate (TRC) issued by the tax authority of their home country and Form 10F (self-declaration). Without these documents, the payer must deduct TDS at the higher domestic rate under Section 206AA." } },
    { "@type": "Question", "name": "Does DTAA override domestic tax law in India?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Section 90 of the Income Tax Act allows a taxpayer to apply whichever is more beneficial — the DTAA rate or the domestic tax rate. However, the General Anti-Avoidance Rules (GAAR) can override DTAA benefits if the arrangement is deemed to be primarily for tax avoidance." } },
    { "@type": "Question", "name": "What is the India–Singapore DTAA withholding tax rate on royalties?", "acceptedAnswer": { "@type": "Answer", "text": "Under the India–Singapore DTAA, royalties and fees for technical services (FTS) are taxed at 10%. This is lower than the Indian domestic rate of 20% (plus surcharge and cess), making Singapore a common treaty jurisdiction for IP holding structures." } },
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
