import { SITE_URL } from '@/lib/config';

export default function sitemap() {
  const now = new Date().toISOString();
  const routes = [
    ['/', 1.0], ['/setup', 0.8], ['/post-setup', 0.8],
    ['/international-tax', 0.8], ['/knowledge-hub', 0.8],
    ['/about', 0.7], ['/contact', 0.7], ['/industries', 0.7],
    ['/foreign-company-registration-india', 0.9],
    ['/subsidiary-company-india', 0.9],
    ['/transfer-pricing-india', 0.9], ['/fdi-rules-india', 0.9],
    ['/us-company-setting-up-india', 0.9], ['/uk-company-setting-up-india', 0.9],
    ['/uae-company-setting-up-india', 0.9], ['/singapore-company-setting-up-india', 0.9],
    ['/gcc-setup-india', 0.9], ['/india-market-entry-advisory', 0.9],
    ['/private-limited-company-registration-india', 0.9],
    ['/nri-company-registration-india', 0.9],
    ['/startup-foreign-investment-india', 0.9],
  ];
  return routes.map(([path, priority]) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now, changeFrequency: 'monthly', priority,
  }));
}
