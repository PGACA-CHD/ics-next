import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Foreign Company Registration in India — Complete Guide',
  description: 'How to register a foreign company in India. Entity types, FDI routes, RBI filings, timelines, and costs. Ex-KPMG CA team. 100+ foreign companies registered.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/foreign-company-registration-india' },
  openGraph: {
    title: 'Foreign Company Registration in India — Complete Guide',
    description: 'How to register a foreign company in India. Entity types, FDI routes, RBI filings, timelines, and costs. Ex-KPMG CA team. 100+ foreign companies registered.',
    url: 'https://www.indiacompanysetup.com/foreign-company-registration-india',
  },
};

export default function Page() {
  return <ClientPage />;
}
