import ClientPage from './client';

export const metadata = {
  title: 'India Capital Gains Tax Calculator FY 2025-26 | LTCG & STCG',
  description: 'Calculate LTCG and STCG tax on equity shares, property, debt funds and other assets. Updated for Budget 2025 rates.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/capital-gains-calculator' },
  openGraph: {
    title: 'India Capital Gains Tax Calculator FY 2025-26',
    description: 'Calculate LTCG and STCG tax on equity shares, property, debt funds and other assets. Updated for Budget 2025 rates.',
    url: 'https://www.indiacompanysetup.com/tools/capital-gains-calculator',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Capital Gains Tax Calculator FY 2025-26' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Capital Gains Tax Calculator FY 2025-26',
    description: 'Calculate LTCG and STCG tax on equity shares, property, debt funds and other assets. Budget 2025 rates.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "India Capital Gains Tax Calculator FY 2025-26",
  "description": "Calculate LTCG and STCG tax on equity shares, property, debt funds and other assets. Updated for Budget 2025 rates.",
  "url": "https://www.indiacompanysetup.com/tools/capital-gains-calculator",
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
    { "@type": "ListItem", "position": 3, "name": "Capital Gains Calculator", "item": "https://www.indiacompanysetup.com/tools/capital-gains-calculator" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is the LTCG tax rate on equity shares and equity mutual funds in India?", "acceptedAnswer": { "@type": "Answer", "text": "Long-term capital gains (LTCG) on listed equity shares and equity-oriented mutual funds held for more than 12 months are taxed at 12.5% (without indexation) on gains exceeding ₹1.25 lakh per year. Gains up to ₹1.25 lakh per year are exempt. This rate was revised in Budget 2024." } },
    { "@type": "Question", "name": "What is the STCG tax rate on equity shares in India?", "acceptedAnswer": { "@type": "Answer", "text": "Short-term capital gains (STCG) on listed equity shares and equity-oriented mutual funds (held for 12 months or less) are taxed at 20%, as revised in Budget 2024 (previously 15%)." } },
    { "@type": "Question", "name": "What is the LTCG tax rate on property sold in India?", "acceptedAnswer": { "@type": "Answer", "text": "For property sold on or after 23 July 2024, LTCG is taxed at 12.5% without indexation. For property sold before 23 July 2024, taxpayers could choose between 20% with indexation or 12.5% without indexation, whichever was more beneficial." } },
    { "@type": "Question", "name": "What is the holding period for long-term capital gains on property?", "acceptedAnswer": { "@type": "Answer", "text": "For immovable property (land and buildings), the holding period for long-term capital gains is 24 months. If held for more than 24 months, gains qualify as LTCG; otherwise they are STCG taxed at applicable slab rates." } },
    { "@type": "Question", "name": "What is indexation benefit for capital gains in India?", "acceptedAnswer": { "@type": "Answer", "text": "Indexation adjusts the purchase cost of an asset for inflation using the Cost Inflation Index (CII) published by the Income Tax Department. This reduces the taxable capital gain. From 23 July 2024 onwards, indexation is no longer available for property — the flat 12.5% rate applies without indexation." } },
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
