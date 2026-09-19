import ClientPage from './client';

export const metadata = {
  title: 'India Payroll Calculator | CTC to Take-Home Salary | New & Old Regime',
  description: 'Calculate take-home salary from CTC. PF, ESI, professional tax, income tax deductions. New and old regime.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/payroll-calculator' },
  openGraph: {
    title: 'India Payroll Calculator | CTC to Take-Home Salary',
    description: 'Calculate take-home salary from CTC. PF, ESI, professional tax, income tax deductions. New and old regime.',
    url: 'https://www.indiacompanysetup.com/tools/payroll-calculator',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Payroll Calculator CTC to Take-Home' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Payroll Calculator | CTC to Take-Home Salary',
    description: 'Calculate take-home salary from CTC. PF, ESI, professional tax, income tax. New and old regime.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "India Payroll Calculator | CTC to Take-Home Salary",
  "description": "Calculate take-home salary from CTC. PF, ESI, professional tax, income tax deductions. New and old regime.",
  "url": "https://www.indiacompanysetup.com/tools/payroll-calculator",
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
    { "@type": "ListItem", "position": 3, "name": "Payroll Calculator", "item": "https://www.indiacompanysetup.com/tools/payroll-calculator" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How is take-home salary calculated from CTC in India?", "acceptedAnswer": { "@type": "Answer", "text": "Take-home salary = CTC minus employer PF (12% of basic, capped at ₹1,800/month), employer ESI (if applicable), minus employee PF (12% of basic), employee ESI, professional tax (varies by state, typically ₹200/month), and income tax (TDS). The remainder after all deductions is the in-hand monthly salary." } },
    { "@type": "Question", "name": "What is the difference between CTC and gross salary?", "acceptedAnswer": { "@type": "Answer", "text": "CTC (Cost to Company) includes gross salary plus employer contributions that are not paid directly to the employee — primarily employer PF (12% of basic) and gratuity provision (4.81% of basic). Gross salary is the total of all salary components paid directly: basic, HRA, and allowances. Gross salary is always lower than CTC." } },
    { "@type": "Question", "name": "What is the employer PF contribution rate in India?", "acceptedAnswer": { "@type": "Answer", "text": "The employer contributes 12% of the employee's basic salary towards PF. Of this, 8.33% goes to EPS (Employee Pension Scheme, capped at ₹1,250/month) and 3.67% goes to the EPF account. PF applies to establishments with 20 or more employees." } },
    { "@type": "Question", "name": "What is professional tax in India?", "acceptedAnswer": { "@type": "Answer", "text": "Professional tax is a state-level tax deducted from salary. It varies by state: Maharashtra charges up to ₹2,500 per year (₹200/month for incomes above ₹10,000), Karnataka charges up to ₹2,400/year, and some states do not levy it at all (e.g., Delhi, Haryana, Rajasthan)." } },
    { "@type": "Question", "name": "How is TDS on salary (Section 192) calculated?", "acceptedAnswer": { "@type": "Answer", "text": "TDS on salary is calculated by estimating the employee's total annual income, applying the applicable slab rates (new or old regime as chosen by the employee), and dividing the annual tax by 12 to get the monthly deduction. The employer must factor in declared deductions (HRA, 80C, etc.) and the chosen tax regime." } },
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
