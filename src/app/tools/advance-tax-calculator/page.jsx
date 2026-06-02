import ClientPage from './client';

export const metadata = {
  title: 'Advance Tax Calculator India FY 2026-27 | Quarterly Instalment Dates',
  description: 'Calculate quarterly advance tax instalments for FY 2026-27. Due dates: 15 June, 15 September, 15 December, 15 March.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/advance-tax-calculator' },
  openGraph: {
    title: 'Advance Tax Calculator India FY 2026-27 | India Company Setup',
    description: 'Calculate quarterly advance tax instalments for FY 2026-27. Due dates: 15 June, 15 September, 15 December, 15 March.',
    url: 'https://www.indiacompanysetup.com/tools/advance-tax-calculator',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'Advance Tax Calculator India FY 2026-27' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advance Tax Calculator India FY 2026-27',
    description: 'Calculate quarterly advance tax instalments. Due dates: 15 June, 15 September, 15 December, 15 March.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Advance Tax Calculator India FY 2026-27",
  "description": "Calculate quarterly advance tax instalments for FY 2026-27. Due dates: 15 June, 15 September, 15 December, 15 March.",
  "url": "https://www.indiacompanysetup.com/tools/advance-tax-calculator",
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
