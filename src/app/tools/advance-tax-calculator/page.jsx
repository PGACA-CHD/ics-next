import ClientPage from './client';

export const metadata = {
  title: 'Advance Tax Calculator India FY 2026-27 | Quarterly Instalment Dates',
  description: 'Calculate quarterly advance tax instalments for FY 2026-27. Due dates: 15 June, 15 September, 15 December, 15 March.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/advance-tax-calculator' },
  openGraph: {
    title: 'Advance Tax Calculator India FY 2026-27 | India Company Setup',
    description: 'Calculate quarterly advance tax instalments for FY 2026-27. Due dates: 15 June, 15 September, 15 December, 15 March.',
    url: 'https://www.indiacompanysetup.com/tools/advance-tax-calculator',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'Advance Tax Calculator India FY 2026-27' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advance Tax Calculator India FY 2026-27',
    description: 'Calculate quarterly advance tax instalments. Due dates: 15 June, 15 September, 15 December, 15 March.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Advance Tax Calculator India FY 2026-27",
  "description": "Calculate quarterly advance tax instalments for FY 2026-27. Due dates: 15 June, 15 September, 15 December, 15 March.",
  "url": "https://www.indiacompanysetup.com/tools/advance-tax-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "provider": { "@type": "Organization", "@id": "https://www.indiacompanysetup.com/#organization", "name": "India Company Setup" },
}, {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.indiacompanysetup.com" },
    { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://www.indiacompanysetup.com/tools" },
    { "@type": "ListItem", "position": 3, "name": "Advance Tax Calculator", "item": "https://www.indiacompanysetup.com/tools/advance-tax-calculator" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Who is required to pay advance tax in India?", "acceptedAnswer": { "@type": "Answer", "text": "Any taxpayer (individual, firm, company) whose estimated tax liability for the year is ₹10,000 or more after TDS credit is required to pay advance tax. Salaried individuals with only salary income are generally exempt, as TDS is deducted by the employer. Senior citizens (aged 60 or above) not having business income are exempt from advance tax." } },
    { "@type": "Question", "name": "What are the advance tax due dates for FY 2026-27?", "acceptedAnswer": { "@type": "Answer", "text": "Advance tax for FY 2026-27 is payable in four instalments: 15% by 15 June 2026, 45% by 15 September 2026, 75% by 15 December 2026, and 100% by 15 March 2027. For taxpayers under the presumptive taxation scheme (44AD/44ADA), the entire 100% is due by 15 March." } },
    { "@type": "Question", "name": "What is the interest penalty for non-payment of advance tax?", "acceptedAnswer": { "@type": "Answer", "text": "Interest under Section 234B applies at 1% per month if advance tax paid is less than 90% of the assessed tax. Interest under Section 234C applies at 1% per month for short payment of each instalment. These interest charges are computed on the shortfall amount." } },
    { "@type": "Question", "name": "Is advance tax applicable on capital gains?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. If you earn capital gains during the year, the corresponding tax must be included in advance tax calculations from the instalment following the date of the gain. If capital gains arise after 15 December, the entire tax on them can be paid by 15 March without attracting Section 234C interest." } },
    { "@type": "Question", "name": "What is the threshold for advance tax liability in India?", "acceptedAnswer": { "@type": "Answer", "text": "Advance tax is required if total tax liability (after TDS) for the financial year is ₹10,000 or more. If your total tax after TDS is below ₹10,000, no advance tax payment is needed." } },
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
