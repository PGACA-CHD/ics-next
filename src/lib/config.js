// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
export const T = {
  f:     "#0B3D2E",
  f2:    "#0F4D3A",
  f3:    "#155C46",
  s:     "#E8900A",
  sl:    "#F5A828",
  ivory: "#FAFAF5",
  stone: "#F2EFE8",
  sdk:   "#E6E1D6",
  ch:    "#17170F",
  ink:   "#2C2C22",
  mid:   "#5C5C52",
  lt:    "#9A9A8E",
  bdr:   "#E0DDD4",
};

// ─── CONTENTFUL ───────────────────────────────────────────────────────────────
export const CF_SPACE_ID   = "qjo3cpray5h2";
export const CF_TOKEN      = process.env.CONTENTFUL_TOKEN || "Me3wAoh5C8R-voHvn3buH1R3nWLM9f4QrT6jKVaWDtY";
export const CF_BASE_URL   = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;

// ─── ZOHO CRM ─────────────────────────────────────────────────────────────────
export const ZOHO_TOKEN    = "609be78d0842fd76e12f34ec79f8792b83f4765206fb892bdc6755435831dcf6";
export const ZOHO_FORM_ID  = "dc5c0a48c320859b9f33c1ed03090faaf2a66f70307636121c8ceedeb8afb66cf1dee7664960a0ba5dc0a4acb5c69308";
export const ZOHO_ENDPOINT = "https://crm.zoho.in/crm/WebToLeadForm";

// ─── SITE INFO ────────────────────────────────────────────────────────────────
export const SITE_URL      = "https://www.indiacompanysetup.com";
export const SITE_NAME     = "India Company Setup";
export const PHONE         = "+91 99157 31447";
export const PHONE_RAW     = "+919915731447";
export const EMAIL         = "info@indiacompanysetup.com";
export const CALENDLY_URL  = "https://calendly.com/indiacompanysetup";
export const WA_BASE       = `https://wa.me/919915731447`;
export const GA4_ID        = "G-VFH7W7VQ44";

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",          href: "/" },
  { label: "Setup",         href: "/setup" },
  { label: "Post Setup",    href: "/post-setup" },
  { label: "Int'l Tax",     href: "/international-tax" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "About",         href: "/about" },
  { label: "Contact",       href: "/contact" },
];

// ─── FOOTER COLUMNS ───────────────────────────────────────────────────────────
export const FOOTER_COLS = [
  {
    title: "Incorporation",
    links: [
      { label: "Pvt Ltd Registration",       href: "/private-limited-company-registration-india" },
      { label: "Foreign Company Setup",       href: "/foreign-company-registration-india" },
      { label: "Subsidiary Company",          href: "/subsidiary-company-india" },
      { label: "NRI Company Setup",           href: "/nri-company-registration-india" },
      { label: "Startup Foreign Funding",     href: "/startup-foreign-investment-india" },
    ],
  },
  {
    title: "Advisory Services",
    links: [
      { label: "India Market Entry",          href: "/india-market-entry-advisory" },
      { label: "GCC Setup India",             href: "/gcc-setup-india" },
      { label: "Setup & Incorporation",       href: "/setup" },
      { label: "Post-Setup Compliance",       href: "/post-setup" },
      { label: "International Tax",           href: "/international-tax" },
    ],
  },
  {
    title: "Tax & Regulatory",
    links: [
      { label: "Transfer Pricing",            href: "/transfer-pricing-india" },
      { label: "FDI Rules India",             href: "/fdi-rules-india" },
      { label: "FEMA Compliance",             href: "/international-tax" },
      { label: "DTAA Planning",               href: "/international-tax" },
    ],
  },
  {
    title: "Country Guides",
    links: [
      { label: "US Company in India",         href: "/us-company-setting-up-india" },
      { label: "UK Company in India",         href: "/uk-company-setting-up-india" },
      { label: "UAE Company in India",        href: "/uae-company-setting-up-india" },
      { label: "Singapore in India",          href: "/singapore-company-setting-up-india" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home",                        href: "/" },
      { label: "About Us",                    href: "/about" },
      { label: "Industries",                  href: "/industries" },
      { label: "Knowledge Hub",               href: "/knowledge-hub" },
      { label: "Contact",                     href: "/contact" },
      { label: "PGA & Co. ↗",                href: "https://pgaca.in", external: true },
    ],
  },
];
