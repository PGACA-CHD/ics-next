'use client';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/config';
import { SEOPvtLtdPage } from '@/components/seo/SEOComponents';


export default function ClientPage() {
  const router = useRouter();
  const setPage = (key) => {
    const ROUTES = {
      home:'/',services:'/setup',gcc:'/post-setup',tax:'/international-tax',
      hub:'/knowledge-hub',about:'/about',contact:'/contact',
      seo_fcri:'/foreign-company-registration-india',
      seo_sub:'/subsidiary-company-india',seo_tp:'/transfer-pricing-india',
      seo_fdi:'/fdi-rules-india',seo_us:'/us-company-setting-up-india',
      seo_uk:'/uk-company-setting-up-india',seo_uae:'/uae-company-setting-up-india',
      seo_sg:'/singapore-company-setting-up-india',seo_gcc:'/gcc-setup-india',
      seo_entry:'/india-market-entry-advisory',
      seo_pvtltd:'/private-limited-company-registration-india',
      seo_nri:'/nri-company-registration-india',
      seo_startup:'/startup-foreign-investment-india',
    };
    router.push(ROUTES[key] || '/');
  };
  return <SEOPvtLtdPage setPage={setPage} />;
}
