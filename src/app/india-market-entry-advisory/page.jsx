import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'India Market Entry Advisory | Entry Strategy for Foreign Companies',
  description: "India market entry advisory for foreign companies. Entity selection, FDI structuring, transfer pricing, and operational setup. Ex-KPMG CA team.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/india-market-entry-advisory' },
  openGraph: {
    title: 'India Market Entry Advisory | Entry Strategy for Foreign Companies',
    description: "India market entry advisory for foreign companies. Entity selection, FDI structuring, transfer pricing, and operational setup. Ex-KPMG CA team.",
    url: 'https://www.indiacompanysetup.com/india-market-entry-advisory',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Market Entry Advisory | Entry Strategy for Foreign Companies',
    description: "India market entry advisory for foreign companies. Entity selection, FDI structuring, transfer pricing, and operational setup. Ex-KPMG CA team.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "India Market Entry Advisory | Entry Strategy for Foreign Companies",
      "description": "India market entry advisory for foreign companies. Entity selection, FDI structuring, transfer pricing, and operational setup. Ex-KPMG CA team.",
      "url": "https://www.indiacompanysetup.com/india-market-entry-advisory",
      "provider": {"@type": "Organization", "@id": "https://www.indiacompanysetup.com/#organization", "name": "India Company Setup"},
      "areaServed": ["US", "GB", "AE", "SG", "AU"],
      "serviceType": "Business Advisory"
    },{
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.indiacompanysetup.com/#organization",
      "name": "India Company Setup",
      "url": "https://www.indiacompanysetup.com",
      "logo": "https://www.indiacompanysetup.com/og-image.jpg",
      "image": "https://www.indiacompanysetup.com/og-image.jpg",
      "description": "End-to-end company setup in India for foreign businesses. Ex-KPMG led CA team. 100+ foreign companies incorporated.",
      "telephone": "+91-99157-31447",
      "email": "info@indiacompanysetup.com",
      "address": {"@type": "PostalAddress", "streetAddress": "SCO 18, Top Floor, Sector 20-D", "addressLocality": "Chandigarh", "postalCode": "160020", "addressCountry": "IN"},
      "areaServed": ["US", "GB", "AE", "SG", "AU", "IN"],
      "priceRange": "$$"
    }]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
