import ClientPage from './client';

export const metadata = {
  title: 'Company Name Availability Check India | MCA Name Search Guide',
  description: 'Check company name availability in India. Rules for company names, prohibited words, MCA RUN service guide.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/company-name-check' },
  openGraph: {
    title: 'Company Name Availability Check India | MCA Name Search | India Company Setup',
    description: 'Check company name availability in India. Rules for company names, prohibited words, MCA RUN service guide.',
    url: 'https://www.indiacompanysetup.com/tools/company-name-check',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'Company Name Availability Check India' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Name Availability Check India | MCA Name Search',
    description: 'Rules for company names, prohibited words, and MCA RUN service guide.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Company Name Availability Check India",
  "description": "Check company name availability in India. Rules for company names, prohibited words, MCA RUN service guide.",
  "url": "https://www.indiacompanysetup.com/tools/company-name-check",
  "applicationCategory": "BusinessApplication",
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
