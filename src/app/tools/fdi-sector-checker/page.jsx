import ClientPage from './client';

export const metadata = {
  title: 'India FDI Sector Limit Checker | Automatic vs Government Approval Route',
  description: 'Check FDI limits for any sector in India — automatic route vs government approval route. Based on DPIIT Consolidated FDI Policy.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/fdi-sector-checker' },
  openGraph: {
    title: 'India FDI Sector Limit Checker | India Company Setup',
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
}]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
