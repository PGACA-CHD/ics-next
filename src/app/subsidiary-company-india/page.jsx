import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Setting Up a Subsidiary Company in India | Wholly Owned Subsidiary Guide',
  description: 'Complete guide to setting up a wholly owned subsidiary (WOS) in India. Structure, FDI route, RBI compliance, transfer pricing, costs and timelines.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/subsidiary-company-india' },
  openGraph: {
    title: 'Setting Up a Subsidiary Company in India | Wholly Owned Subsidiary Guide',
    description: 'Complete guide to setting up a wholly owned subsidiary (WOS) in India. Structure, FDI route, RBI compliance, transfer pricing, costs and timelines.',
    url: 'https://www.indiacompanysetup.com/subsidiary-company-india',
  },
};

export default function Page() {
  return <ClientPage />;
}
