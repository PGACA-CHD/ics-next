import ClientPage from './client';

export const metadata = {
  title: 'India Capital Gains Tax Calculator FY 2025-26 | LTCG & STCG',
  description: 'Calculate LTCG and STCG tax on equity shares, property, debt funds and other assets. Updated for Budget 2025 rates.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/capital-gains-calculator' },
  openGraph: {
    title: 'India Capital Gains Tax Calculator FY 2025-26 | India Company Setup',
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
}]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
