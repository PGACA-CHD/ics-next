import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Transfer Pricing in India — Compliance Guide for Foreign Companies',
  description: 'Transfer pricing rules, documentation requirements, Form 3CEB, audit risk, and fees for foreign companies with India subsidiaries. Ex-KPMG TP team.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/transfer-pricing-india' },
  openGraph: {
    title: 'Transfer Pricing in India — Compliance Guide for Foreign Companies',
    description: 'Transfer pricing rules, documentation requirements, Form 3CEB, audit risk, and fees for foreign companies with India subsidiaries. Ex-KPMG TP team.',
    url: 'https://www.indiacompanysetup.com/transfer-pricing-india',
  },
};

export default function Page() {
  return <ClientPage />;
}
