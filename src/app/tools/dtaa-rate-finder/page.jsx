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
}]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
