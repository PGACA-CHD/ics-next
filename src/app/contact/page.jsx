import ClientPage from './client';

export const metadata = {
  title: 'Free 30-Min Consultation — India Entry Advisory',
  description: "Book a free consultation with our Ex-Big 4 CA team. India entry, incorporation, transfer pricing, FEMA, and ongoing compliance. Expert team responds within 24 hours.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/contact' },
  openGraph: {
    title: 'Free 30-Min Consultation — India Entry Advisory',
    description: "Book a free consultation with our Ex-Big 4 CA team. India entry, incorporation, transfer pricing, FEMA, and ongoing compliance. Expert team responds within 24 hours.",
    url: 'https://www.indiacompanysetup.com/contact',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 30-Min Consultation — India Entry Advisory',
    description: "Book a free consultation with our Ex-Big 4 CA team. India entry, incorporation, transfer pricing, FEMA, and ongoing compliance. Expert team responds within 24 hours.",
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Free 30-Min Consultation — India Entry Advisory",
    "description": "Book a free consultation with our Ex-Big 4 CA team. India entry, incorporation, transfer pricing, FEMA, and ongoing compliance. Expert team responds within 24 hours.",
    "url": "https://www.indiacompanysetup.com/contact",
    "provider": { "@type": "Organization", "@id": "https://www.indiacompanysetup.com/#organization", "name": "India Company Setup" },
    "areaServed": ["US", "GB", "AE", "SG", "AU"],
    "serviceType": "Business Advisory"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.indiacompanysetup.com" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.indiacompanysetup.com/contact" }
    ]
  }
];

export default function ContactPage() {
  return (
    <>
      {schemaData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ClientPage />
    </>
  );
}
 
