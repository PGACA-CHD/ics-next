import ClientPage from './home-client';


export const metadata = {
  title: 'Company Incorporation in India for Foreign Companies',
  description: "One CA-led team handles incorporation, FEMA, transfer pricing, GST, payroll and ongoing compliance for 100+ foreign companies entering India. Ex-Big 4 (KPMG). Median time to operational entity: 22 business days. Free 30-min strategy call.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/' },
  openGraph: {
    title: 'Company Incorporation in India for Foreign Companies',
    description: "One CA-led team handles incorporation, FEMA, transfer pricing, GST, payroll and ongoing compliance for 100+ foreign companies entering India. Ex-Big 4 (KPMG). Median time to operational entity: 22 business days.",
    url: 'https://www.indiacompanysetup.com/',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Incorporation in India for Foreign Companies',
    description: "One CA-led team handles incorporation, FEMA, transfer pricing, GST, payroll and ongoing compliance for 100+ foreign companies entering India. Ex-Big 4 (KPMG). Median time to operational entity: 22 business days.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.indiacompanysetup.com/#organization",
      "name": "India Company Setup",
      "url": "https://www.indiacompanysetup.com",
      "logo": "https://www.indiacompanysetup.com/og-image.jpg",
      "image": "https://www.indiacompanysetup.com/og-image.jpg",
      "description": "One CA-led team handles incorporation, FEMA, transfer pricing, GST, payroll and ongoing compliance for 100+ foreign companies entering India. Ex-Big 4 (KPMG). Median time to operational entity: 22 business days.",
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
