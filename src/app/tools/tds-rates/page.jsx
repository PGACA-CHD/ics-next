import ClientPage from './client';

export const metadata = {
  title: 'TDS Rate Chart FY 2026-27 | All Sections 192 to 196D | India Company Setup',
  description: 'Complete TDS rate chart for FY 2026-27 covering all sections — 192 to 196D. Search by section, payment type or keyword. Threshold limits, individual/HUF vs company rates. Built by Ex-Big 4 CAs.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/tds-rates' },
  openGraph: {
    title: 'TDS Rate Chart FY 2026-27 | All Sections 192 to 196D',
    description: 'Complete TDS rate reference covering sections 192–196D with threshold limits and deductee-specific rates.',
    url: 'https://www.indiacompanysetup.com/tools/tds-rates',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'TDS Rate Chart FY 2026-27' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDS Rate Chart FY 2026-27',
    description: 'All TDS sections 192–196D with rates, thresholds and notes.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "TDS Rate Chart FY 2026-27",
  "description": "Complete TDS rate chart for FY 2026-27 covering all major sections 192 to 196D.",
  "url": "https://www.indiacompanysetup.com/tools/tds-rates",
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
