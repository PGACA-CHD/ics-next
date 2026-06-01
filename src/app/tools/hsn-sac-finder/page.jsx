import ClientPage from './client';

export const metadata = {
  title: 'GST HSN Code & SAC Code Finder | India Company Setup',
  description: 'Find the correct HSN code for goods or SAC code for services under India GST. Search by description or code number. Browse all 99 HSN chapters and major SAC categories. Data from CBIC.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/hsn-sac-finder' },
  openGraph: {
    title: 'GST HSN Code & SAC Code Finder | India Company Setup',
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
}]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
