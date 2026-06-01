import ClientPage from './client';

export const metadata = {
  title: 'Free India Tax & GST Tools | Income Tax Calculator, TDS Rates, HSN SAC Finder',
  description: 'Free online tools for India taxation: Income Tax Calculator for companies, LLP and individuals; TDS rates FY 2026-27; GST HSN/SAC code finder. Built by Ex-Big 4 CAs.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools' },
  openGraph: {
    title: 'Free India Tax & GST Tools | India Company Setup',
    description: 'Free online tools for India taxation: Income Tax Calculator for companies, LLP and individuals; TDS rates FY 2026-27; GST HSN/SAC code finder.',
    url: 'https://www.indiacompanysetup.com/tools',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Tax Tools' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free India Tax & GST Tools | India Company Setup',
    description: 'Income Tax Calculator, TDS Rates FY 2026-27, and GST HSN/SAC Finder — free tools by Ex-Big 4 CAs.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Free India Tax & GST Tools",
  "description": "Free online tools for India taxation — Income Tax Calculator, TDS Rates, and GST HSN/SAC Finder.",
  "url": "https://www.indiacompanysetup.com/tools",
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
