import ClientPage from './client';

export const metadata = {
  title: 'GST Return Due Dates Calendar FY 2026-27 | GSTR-1, GSTR-3B, GSTR-9',
  description: 'GST return filing due dates for FY 2026-27 — GSTR-1, GSTR-3B, GSTR-9, GSTR-4. Monthly and quarterly filers.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/gst-due-dates' },
  openGraph: {
    title: 'GST Return Due Dates Calendar FY 2026-27',
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
}, {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.indiacompanysetup.com" },
    { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://www.indiacompanysetup.com/tools" },
    { "@type": "ListItem", "position": 3, "name": "GST Return Due Dates", "item": "https://www.indiacompanysetup.com/tools/gst-due-dates" },
  ],
}, {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is the due date for filing GSTR-1 in India?", "acceptedAnswer": { "@type": "Answer", "text": "GSTR-1 (outward supply details) is due on the 11th of the following month for monthly filers (taxpayers with turnover above ₹5 crore). Quarterly filers (QRMP scheme) file GSTR-1 quarterly, due on the 13th of the month following the quarter end (i.e., 13 July, 13 October, 13 January, 13 April)." } },
    { "@type": "Question", "name": "What is the due date for GSTR-3B?", "acceptedAnswer": { "@type": "Answer", "text": "GSTR-3B (monthly summary return and tax payment) is due on the 20th of the following month for monthly filers. QRMP quarterly filers pay tax monthly via PMT-06 by the 25th but file GSTR-3B quarterly by the 22nd or 24th of the month following the quarter end, depending on the state." } },
    { "@type": "Question", "name": "What is the due date for GSTR-9 annual return?", "acceptedAnswer": { "@type": "Answer", "text": "GSTR-9 (annual return) is due on 31 December following the end of the financial year. For FY 2025-26, it is due on 31 December 2026. GSTR-9 is mandatory for taxpayers with turnover above ₹2 crore; below that it is optional." } },
    { "@type": "Question", "name": "What is the late fee and penalty for delayed GST return filing?", "acceptedAnswer": { "@type": "Answer", "text": "Late fee for GSTR-3B and GSTR-1 is ₹50 per day (₹25 CGST + ₹25 SGST) for returns with tax liability, and ₹20 per day (₹10 CGST + ₹10 SGST) for nil returns. Maximum late fee is ₹10,000 per return. Interest at 18% per annum applies on delayed tax payment." } },
    { "@type": "Question", "name": "Who needs to file GSTR-4 under GST?", "acceptedAnswer": { "@type": "Answer", "text": "GSTR-4 is the annual return for taxpayers registered under the Composition Scheme. It is due on 30 April following the financial year end. Composition dealers also file quarterly CMP-08 (summary statement) by the 18th of the month following each quarter for tax payment." } },
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
