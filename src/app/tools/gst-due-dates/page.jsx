import ClientPage from './client';

export const metadata = {
  title: 'GST Return Due Dates Calendar FY 2026-27 | GSTR-1, GSTR-3B, GSTR-9',
  description: 'GST return filing due dates for FY 2026-27 — GSTR-1, GSTR-3B, GSTR-9, GSTR-4. Monthly and quarterly filers.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/gst-due-dates' },
  openGraph: {
    title: 'GST Return Due Dates Calendar FY 2026-27 | India Company Setup',
    description: 'GST return filing due dates for FY 2026-27 — GSTR-1, GSTR-3B, GSTR-9, GSTR-4. Monthly and quarterly filers.',
    url: 'https://www.indiacompanysetup.com/tools/gst-due-dates',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'GST Return Due Dates Calendar FY 2026-27' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST Return Due Dates Calendar FY 2026-27',
    description: 'GST return filing due dates — GSTR-1, GSTR-3B, GSTR-9, GSTR-4. Monthly and quarterly filers.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GST Return Due Dates Calendar FY 2026-27",
  "description": "GST return filing due dates for FY 2026-27 — GSTR-1, GSTR-3B, GSTR-9, GSTR-4. Monthly and quarterly filers.",
  "url": "https://www.indiacompanysetup.com/tools/gst-due-dates",
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
