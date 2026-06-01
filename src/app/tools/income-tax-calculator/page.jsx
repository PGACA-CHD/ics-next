import ClientPage from './client';

export const metadata = {
  title: 'India Income Tax Calculator FY 2025-26 | Companies, LLP & Individuals',
  description: 'Free India income tax calculator for domestic and foreign companies, LLP, and individuals (resident & non-resident). New & Old Regime with slab-wise breakdown, surcharge, and cess. FY 2025-26.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/income-tax-calculator' },
  openGraph: {
    title: 'India Income Tax Calculator FY 2025-26 | India Company Setup',
    description: 'Calculate income tax for companies, LLP and individuals under New and Old Regime. Slab-wise breakdown with surcharge and cess.',
    url: 'https://www.indiacompanysetup.com/tools/income-tax-calculator',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Income Tax Calculator' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Income Tax Calculator FY 2025-26',
    description: 'Free income tax calculator for companies, LLP and individuals. New & Old Regime.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "India Income Tax Calculator FY 2025-26",
  "description": "Free India income tax calculator for domestic and foreign companies, LLP, and individuals under New and Old Tax Regime.",
  "url": "https://www.indiacompanysetup.com/tools/income-tax-calculator",
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
