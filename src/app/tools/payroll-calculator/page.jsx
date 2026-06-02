import ClientPage from './client';

export const metadata = {
  title: 'India Payroll Calculator | CTC to Take-Home Salary | New & Old Regime',
  description: 'Calculate take-home salary from CTC. PF, ESI, professional tax, income tax deductions. New and old regime.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/payroll-calculator' },
  openGraph: {
    title: 'India Payroll Calculator | CTC to Take-Home Salary | India Company Setup',
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
}]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
