/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export compatibility
  trailingSlash: false,

  // Image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.ctfassets.net',
    }],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Suppress powered-by header
  poweredByHeader: false,

  // ── 301 Redirects: WordPress to Next.js migration ────────────────────────
  async redirects() {
    return [

      // ── TRAILING SLASH normalisation (fixes 44 x "Page with redirect" in GSC) ──
      // These catch www.indiacompanysetup.com/slug/ and strip the trailing slash
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },

      // ── BLOG POSTS to Knowledge Hub articles ─────────────────────────────
      {
        source: '/company-incorporation-mistakes-india',
        destination: '/knowledge-hub/common-mistakes-incorporating-company-india',
        permanent: true,
      },
      {
        source: '/company-incorporation-nri-india-2025',
        destination: '/knowledge-hub/company-incorporation-nri-foreign-nationals-india',
        permanent: true,
      },
      {
        source: '/company-incorporation-india-2025',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },
      {
        source: '/subsidiary-company-registration-india-2025',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },
      {
        source: '/steps-to-register-a-company-in-india-online',
        destination: '/knowledge-hub/how-to-register-a-private-limited-company-in-india-online',
        permanent: true,
      },
      {
        source: '/how-to-register-a-private-limited-company-in-india-online',
        destination: '/knowledge-hub/how-to-register-a-private-limited-company-in-india-online',
        permanent: true,
      },
      {
        source: '/spice-plus-form-company-incorporation-india',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },
      {
        source: '/private-limited-v-s-llp-v-s-opc-which-one-is-right-for-your-startup',
        destination: '/knowledge-hub/best-company-structure-india-foreign-business',
        permanent: true,
      },
      {
        source: '/private-limited-compliance-checklist-2025',
        destination: '/knowledge-hub/post-incorporation-compliance-private-limited',
        permanent: true,
      },
      {
        source: '/llp-vs-private-limited-in-2025-what-has-changed',
        destination: '/knowledge-hub/best-company-structure-india-foreign-business',
        permanent: true,
      },
      {
        source: '/cost-of-company-registration-in-india-complete-guide-with-fees-charges',
        destination: '/knowledge-hub/best-company-structure-india-foreign-business',
        permanent: true,
      },
      {
        source: '/company-registration-cost-india',
        destination: '/knowledge-hub/best-company-structure-india-foreign-business',
        permanent: true,
      },
      {
        source: '/din-dsc-process-importance-india-2025',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },
      {
        source: '/digital-signature-dsc-din-company-registration-guide',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },
      {
        source: '/fdi-rules-private-limited-company-india-2025',
        destination: '/fdi-rules-india',
        permanent: true,
      },
      // ── NEW: Missing blog redirects (fixes 10 x 404s) ───────────────────
      {
        source: '/blogs',
        destination: '/knowledge-hub',
        permanent: true,
      },
      {
        source: '/company-registration-timeline-india',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },
      {
        source: '/cost-of-private-limited-company-registration-india',
        destination: '/knowledge-hub/best-company-structure-india-foreign-business',
        permanent: true,
      },
      {
        source: '/documents-required-company-incorporation-india',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },
      {
        source: '/e-invoicing-gst-2025',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },
      {
        source: '/llp-form-11-filing',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/online-vs-offline-private-limited-company-registration',
        destination: '/knowledge-hub/how-to-register-a-private-limited-company-in-india-online',
        permanent: true,
      },
      {
        source: '/section-8-company',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/top-10-common-mistakes-to-avoid-during-company-registration-in-india',
        destination: '/knowledge-hub/common-mistakes-incorporating-company-india',
        permanent: true,
      },
      {
        source: '/unique-company-name-mca-naming-rules',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },
      // ── Also covers the long DSC/DIN URL seen in redirect report ─────────
      {
        source: '/digital-signature-certificate-dsc-director-identification-number-din-a-complete-guide-for-company-registration-in-india',
        destination: '/knowledge-hub/register-subsidiary-company-india-foreign-entity',
        permanent: true,
      },

      // ── GST POSTS to Knowledge Hub ────────────────────────────────────────
      {
        source: '/gst-registration',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },
      {
        source: '/gst-revocation',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },
      {
        source: '/gst-reconciliation',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },
      {
        source: '/gst-return-filing-tips-avoid-mistakes-penalties',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },
      {
        source: '/gst-return-filing-gstr-1-and-gstr-3b',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },
      {
        source: '/gst-annual-return-filing-gstr-9',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },
      {
        source: '/itc-reconciliation-avoid-gst-notices-2025',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },
      {
        source: '/claim-gst-refund-india-2025',
        destination: '/knowledge-hub/gst-registration-foreign-company-india',
        permanent: true,
      },

      // ── TAX POSTS to International Tax ───────────────────────────────────
      {
        source: '/income-tax',
        destination: '/international-tax',
        permanent: true,
      },
      {
        source: '/income-tax-return-filing',
        destination: '/international-tax',
        permanent: true,
      },
      {
        source: '/corporate-tax-filing',
        destination: '/international-tax',
        permanent: true,
      },
      {
        source: '/form-15ca-15cb-filing',
        destination: '/international-tax',
        permanent: true,
      },

      // ── SERVICE PAGES to nearest current page ────────────────────────────
      {
        source: '/subsidiary-company',
        destination: '/subsidiary-company-india',
        permanent: true,
      },
      {
        source: '/startup',
        destination: '/startup-foreign-investment-india',
        permanent: true,
      },
      {
        source: '/startup-india',
        destination: '/startup-foreign-investment-india',
        permanent: true,
      },
      {
        source: '/registration',
        destination: '/private-limited-company-registration-india',
        permanent: true,
      },
      {
        source: '/limited-liability-partnership',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/llp-compliance',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/public-limited-company',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/partnership',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/trust-registration',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/digital-signature',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/tan-registration',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/import-export-code',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/registered-office-company-incorporation',
        destination: '/foreign-company-registration-india',
        permanent: true,
      },
      {
        source: '/registered-office-change',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/director-change',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/moa-and-aoa-amendment',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/mca',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/dpt-3-filing',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/dormant-status-filing',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/outsource-accounting-for-company-registration',
        destination: '/post-setup',
        permanent: true,
      },
      {
        source: '/shop-and-establishment-act-registration',
        destination: '/setup',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/contact',
        permanent: true,
      },

      // ── UTILITY / MISC ────────────────────────────────────────────────────
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/',
        permanent: true,
      },
      {
        source: '/faqs',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/uncategorized',
        destination: '/knowledge-hub',
        permanent: true,
      },
      {
        source: '/what-is-education-cess-and-surcharge-in-india',
        destination: '/knowledge-hub',
        permanent: true,
      },

      // ── Knowledge Hub slug case fixes ─────────────────────────────────────
      // Mixed-case slug in URL → canonical lowercase slug in Contentful
      {
        source: '/knowledge-hub/set-up-company-in-India-from-USA',
        destination: '/knowledge-hub/set-up-company-in-india-from-usa',
        permanent: true,
      },
      {
        source: '/knowledge-hub/set-up-company-in-india-from-USA',
        destination: '/knowledge-hub/set-up-company-in-india-from-usa',
        permanent: true,
      },

      // ── MISSING WordPress redirects (added Apr 2026) ──────────────────────
      { source: '/company-compliance', destination: '/post-setup', permanent: true },
      { source: '/company-registration-india-2025-mca-updates', destination: '/foreign-company-registration-india', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/convert-pvt-ltd-to-llp-india-2025', destination: '/knowledge-hub/best-company-structure-india-foreign-business', permanent: true },
      { source: '/corporate-identification-number-cin', destination: '/post-setup', permanent: true },
      { source: '/gst', destination: '/knowledge-hub/gst-registration-foreign-company-india', permanent: true },
      { source: '/gst-amendment', destination: '/knowledge-hub/gst-registration-foreign-company-india', permanent: true },
      { source: '/gst-compliance-calendar-2025', destination: '/knowledge-hub/gst-registration-foreign-company-india', permanent: true },
      { source: '/gstr-9-annual-gst-return-filing-2025', destination: '/knowledge-hub/gst-registration-foreign-company-india', permanent: true },
      { source: '/llp-registration-india-2025', destination: '/knowledge-hub/llp-registration-india-advantages-procedure-2025', permanent: true },
      { source: '/private-limited-company', destination: '/private-limited-company-registration-india', permanent: true },
      { source: '/tds-filing', destination: '/post-setup', permanent: true },
      { source: '/udyam-registration', destination: '/setup', permanent: true },
    ];
  },
};

module.exports = nextConfig;
