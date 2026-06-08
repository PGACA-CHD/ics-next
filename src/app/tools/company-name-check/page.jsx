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
}, {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.indiacompanysetup.com" },
    { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://www.indiacompanysetup.com/tools" },
    { "@type": "ListItem", "position": 3, "name": "Company Name Check", "item": "https://www.indiacompanysetup.com/tools/company-name-check" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I check if a company name is available in India?", "acceptedAnswer": { "@type": "Answer", "text": "You can check company name availability through the MCA21 portal at mca.gov.in using the 'Company/LLP Master Data' search. The formal name reservation is done via the RUN (Reserve Unique Name) service under SPICe+. It is advisable to check trademark registers too, as MCA approval does not grant trademark rights." } },
    { "@type": "Question", "name": "What are the rules for choosing a company name in India?", "acceptedAnswer": { "@type": "Answer", "text": "A company name must end with 'Private Limited' (for private companies) or 'Limited' (for public companies). The name must be unique, not identical or too similar to existing companies or LLPs, not offensive or contrary to public policy, and must relate to the company's main objects or indicate the nature of business." } },
    { "@type": "Question", "name": "What words are prohibited or restricted in Indian company names?", "acceptedAnswer": { "@type": "Answer", "text": "Words requiring special approval include: Bank, Insurance, Mutual Fund, Stock Exchange, National, Government, Federal, SEBI, RBI, and names suggesting connection with the government. Words like 'India', 'Bharat', 'International', 'Global', and 'Hindustan' are permitted with certain conditions." } },
    { "@type": "Question", "name": "How long does company name reservation last in India?", "acceptedAnswer": { "@type": "Answer", "text": "A name reserved through the RUN (Reserve Unique Name) service is valid for 20 days from the date of approval. If the SPICe+ incorporation form is not filed within those 20 days, the name reservation lapses and must be applied for again." } },
    { "@type": "Question", "name": "Can I use a foreign company's name for my Indian subsidiary?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, a foreign parent company's name can generally be used for its Indian subsidiary (e.g., 'ABC India Private Limited'). However, it must not be identical to an already registered Indian company, and MCA may require documentation proving the relationship with the foreign parent company." } },
  ],
}]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
