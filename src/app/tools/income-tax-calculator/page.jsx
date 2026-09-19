import ClientPage from './client';

export const metadata = {
  title: 'India Income Tax Calculator FY 2025-26 | Companies, LLP & Individuals',
  description: 'Free India income tax calculator for domestic and foreign companies, LLP, and individuals (resident & non-resident). New & Old Regime with slab-wise breakdown, surcharge, and cess. FY 2025-26.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/income-tax-calculator' },
  openGraph: {
    title: 'India Income Tax Calculator FY 2025-26',
    description: 'Calculate income tax for companies, LLP and individuals under New and Old Regime. Slab-wise breakdown with surcharge and cess.',
    url: 'https://www.indiacompanysetup.com/tools/income-tax-calculator',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Income Tax Calculator' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Income Tax Calculator FY 2025-26',
    description: 'Free income tax calculator for companies, LLP and individuals. New & Old Regime.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "India Income Tax Calculator FY 2025-26",
  "description": "Free India income tax calculator for domestic and foreign companies, LLP, and individuals under New and Old Tax Regime.",
  "url": "https://www.indiacompanysetup.com/tools/income-tax-calculator",
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
    { "@type": "ListItem", "position": 3, "name": "Income Tax Calculator", "item": "https://www.indiacompanysetup.com/tools/income-tax-calculator" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What are the income tax slabs for FY 2025-26 under the new regime?", "acceptedAnswer": { "@type": "Answer", "text": "Under the new regime for FY 2025-26, income up to ₹3 lakh is nil, ₹3–7 lakh at 5%, ₹7–10 lakh at 10%, ₹10–12 lakh at 15%, ₹12–15 lakh at 20%, and above ₹15 lakh at 30%. Income up to ₹12 lakh is effectively tax-free after the rebate u/s 87A." } },
    { "@type": "Question", "name": "What is marginal relief under Section 87A?", "acceptedAnswer": { "@type": "Answer", "text": "Marginal relief u/s 87A ensures that a taxpayer whose income slightly exceeds the rebate threshold (₹12 lakh under the new regime, ₹5 lakh under the old regime) does not pay more tax than the amount by which their income exceeds that threshold. So if income is ₹12.1 lakh, tax payable is capped at ₹10,000 (the excess over ₹12 lakh), not the full slab-computed tax." } },
    { "@type": "Question", "name": "What is the income tax rate for a foreign company in India?", "acceptedAnswer": { "@type": "Answer", "text": "Foreign companies are taxed at a flat 40% on income received or accrued in India. A surcharge of 2% applies if total income exceeds ₹1 crore, and 5% if it exceeds ₹10 crore. Health and Education Cess of 4% applies on the tax and surcharge." } },
    { "@type": "Question", "name": "What is the income tax rate for a domestic company in India?", "acceptedAnswer": { "@type": "Answer", "text": "Domestic companies pay tax at 25% if their total turnover or gross receipts in the previous year does not exceed ₹400 crore; otherwise 30%. New manufacturing companies opting under Section 115BAB pay 15%. A 4% Health and Education Cess applies." } },
    { "@type": "Question", "name": "How is surcharge calculated on income tax in India?", "acceptedAnswer": { "@type": "Answer", "text": "Surcharge is levied on the income tax amount. For individuals: 10% surcharge if income exceeds ₹50 lakh, 15% above ₹1 crore, 25% above ₹2 crore. For domestic companies: 7% if income exceeds ₹1 crore, 12% above ₹10 crore. Marginal relief applies to prevent the surcharge from being disproportionate to the excess income." } },
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
