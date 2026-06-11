import ClientPage from './client';

export const metadata = {
  title: 'TCS Rate Chart FY 2026-27 | Section 206C All Sub-Sections | India Company Setup',
  description: 'Complete TCS rate chart for FY 2026-27 — all Section 206C sub-sections including scrap, timber, minerals, LRS remittances and motor vehicles. IT Act 2025 Section 394(1) table references, challan codes and Form 27EQ codes.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/tools/tcs-rates' },
  openGraph: {
    title: 'TCS Rate Chart FY 2026-27 | Section 206C All Sub-Sections',
    description: 'Complete TCS rate reference — all 206C sub-sections with LRS rates, threshold limits, challan codes, Form 27EQ codes and IT Act 2025 Section 394(1) table references.',
    url: 'https://www.indiacompanysetup.com/tools/tcs-rates',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'TCS Rate Chart FY 2026-27' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCS Rate Chart FY 2026-27 | Section 206C',
    description: 'All TCS sub-sections with rates, thresholds, challan codes, Form 27EQ codes and IT Act 2025 mapping.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const schemaJson = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TCS Rate Chart FY 2026-27 | Section 206C",
    "description": "Complete TCS rate chart for FY 2026-27 covering all Section 206C sub-sections with IT Act 2025 mapping and Form 27EQ codes.",
    "url": "https://www.indiacompanysetup.com/tools/tcs-rates",
    "provider": { "@type": "Organization", "@id": "https://www.indiacompanysetup.com/#organization", "name": "India Company Setup" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",       "item": "https://www.indiacompanysetup.com" },
      { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://www.indiacompanysetup.com/tools" },
      { "@type": "ListItem", "position": 3, "name": "TCS Rate Chart FY 2026-27", "item": "https://www.indiacompanysetup.com/tools/tcs-rates" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the TCS rate on sale of scrap under Section 206C?",
        "acceptedAnswer": { "@type": "Answer", "text": "TCS on sale of scrap under Section 206C(1) is 2% of the sale consideration for FY 2026-27 (Section 394(1), Table Sl. No. 4 of the IT Act 2025). There is no minimum threshold — TCS applies to every sale of scrap regardless of amount. The seller collects TCS from the buyer and deposits it via ITNS 281 (challan code 1073) within the prescribed due date." }
      },
      {
        "@type": "Question",
        "name": "What is the TCS rate on foreign remittance under LRS in FY 2026-27?",
        "acceptedAnswer": { "@type": "Answer", "text": "TCS on LRS remittances for FY 2026-27: (1) Overseas tour packages — 20% on the full amount, no threshold; (2) Medical treatment or education (including self-funded education) — 2% on the amount exceeding ₹10 lakh per FY; (3) All other purposes (investments, gifts, maintenance, travel) — 20% on the amount exceeding ₹10 lakh per FY. TCS on education remittances financed by a loan from an approved financial institution has been removed. The authorised dealer collects TCS at the time of remittance." }
      },
      {
        "@type": "Question",
        "name": "What is the TCS rate on sale of motor vehicles above ₹10 lakh?",
        "acceptedAnswer": { "@type": "Answer", "text": "TCS on sale of motor vehicles under Section 206C(1F) is 1% of the sale consideration for vehicles priced above ₹10 lakh. The dealer (seller) collects TCS from the buyer at the time of receipt of payment. This applies to all types of motor vehicles — cars, SUVs, commercial vehicles — priced above ₹10 lakh." }
      },
      {
        "@type": "Question",
        "name": "Does TCS on sale of goods under Section 206C(1H) still apply?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. The 0.1% TCS on sale of goods by sellers with turnover above ₹10 crore (old Section 206C(1H)) has been removed and does not appear in the Section 394(1) table of the IT Act 2025. Goods transactions remain covered on the deduction side by TDS under Section 194Q where applicable." }
      },
      {
        "@type": "Question",
        "name": "What is the TCS rate when the buyer does not provide PAN or Aadhaar?",
        "acceptedAnswer": { "@type": "Answer", "text": "If the buyer or remitter fails to furnish PAN or Aadhaar, TCS must be collected at twice the applicable rate or 5%, whichever is higher, under Section 206CC of the IT Act 1961 (Section 397(2) under IT Act 2025). For example, if the normal TCS rate is 1%, the rate without PAN would be 5% (since 2×1% = 2% is less than 5%). This ensures higher compliance for unidentified buyers." }
      },
    ],
  },
]);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <ClientPage />
    </>
  );
}
