import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'India Market Entry Advisory — Strategic India Entry Services',
  description: 'India market entry strategy, entity structure, FDI route, DTAA planning, PE risk assessment, transfer pricing framework. Ex-KPMG led advisory for foreign companies.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/india-market-entry-advisory' },
  openGraph: {
    title: 'India Market Entry Advisory — Strategic India Entry Services',
    description: 'India market entry strategy, entity structure, FDI route, DTAA planning, PE risk assessment, transfer pricing framework. Ex-KPMG led advisory for foreign companies.',
    url: 'https://www.indiacompanysetup.com/india-market-entry-advisory',
  },
};

export default function Page() {
  return <ClientPage />;
}
