// src/app/sitemap.js
// Dynamic sitemap — fetches all Contentful article slugs at build time

const CF_SPACE_ID = 'qjo3cpray5h2';
const CF_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;
const CF_URL = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;

const SITE = 'https://www.indiacompanysetup.com';

// Static routes with their priorities and change frequencies
const STATIC_ROUTES = [
  { url: '/',                                        priority: 1.0,  changeFrequency: 'monthly' },
  { url: '/setup',                                   priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/post-setup',                              priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/international-tax',                       priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/knowledge-hub',                           priority: 0.8,  changeFrequency: 'weekly'  },
  { url: '/about',                                   priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/contact',                                 priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/industries',                              priority: 0.7,  changeFrequency: 'monthly' },
  // High-value SEO pages
  { url: '/foreign-company-registration-india',      priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/subsidiary-company-india',                priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/transfer-pricing-india',                  priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/fdi-rules-india',                         priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/us-company-setting-up-india',             priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/uk-company-setting-up-india',             priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/uae-company-setting-up-india',            priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/singapore-company-setting-up-india',      priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/gcc-setup-india',                         priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/india-market-entry-advisory',             priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/private-limited-company-registration-india', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/nri-company-registration-india',          priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/startup-foreign-investment-india',        priority: 0.9,  changeFrequency: 'monthly' },
  // Country-specific registration pages
  { url: '/company-registration/from-usa',           priority: 0.85, changeFrequency: 'monthly' },
  { url: '/company-registration/from-uk',            priority: 0.85, changeFrequency: 'monthly' },
  { url: '/company-registration/from-dubai',         priority: 0.85, changeFrequency: 'monthly' },
  { url: '/company-registration/from-singapore',     priority: 0.85, changeFrequency: 'monthly' },
  { url: '/company-registration/from-canada',        priority: 0.85, changeFrequency: 'monthly' },
  { url: '/company-registration/from-australia',     priority: 0.85, changeFrequency: 'monthly' },
  // Free tools
  { url: '/tools',                                   priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/tools/income-tax-calculator',             priority: 0.75, changeFrequency: 'monthly' },
  { url: '/tools/payroll-calculator',                priority: 0.75, changeFrequency: 'monthly' },
  { url: '/tools/capital-gains-calculator',          priority: 0.75, changeFrequency: 'monthly' },
  { url: '/tools/tds-rates',                         priority: 0.75, changeFrequency: 'monthly' },
  { url: '/tools/tcs-rates',                         priority: 0.75, changeFrequency: 'monthly' },
  { url: '/tools/advance-tax-calculator',            priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/tools/dtaa-rate-finder',                  priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/tools/fdi-sector-checker',                priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/tools/gst-due-dates',                     priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/tools/company-name-check',                priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/tools/hsn-sac-finder',                    priority: 0.7,  changeFrequency: 'monthly' },
];

async function getArticleSlugs() {
  try {
    const res = await fetch(
      `${CF_URL}?content_type=article&select=fields.slug,sys.updatedAt&limit=200&access_token=${CF_TOKEN}`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item) => ({
      slug: item.fields.slug,
      lastModified: item.sys.updatedAt,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date().toISOString();

  // Static routes
  const staticEntries = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${SITE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Dynamic article routes from Contentful
  const articles = await getArticleSlugs();
  const articleEntries = articles
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${SITE}/knowledge-hub/${a.slug}`,
      lastModified: a.lastModified || now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // Deduplicate by URL (prevents duplicate Knowledge Hub entries)
  const allEntries = [...staticEntries, ...articleEntries];
  const seen = new Set();
  const deduped = allEntries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });

  return deduped;
}
 
