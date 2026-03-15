import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'NRI Company Registration in India — Schedule 4 FEMA, Residency Transition',
  description: 'NRI investing from abroad or returning to India — both routes covered. Schedule 4 FEMA, NRE account investment, RNOR tax planning, residency transition advisory.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/nri-company-registration-india' },
  openGraph: {
    title: 'NRI Company Registration in India — Schedule 4 FEMA, Residency Transition',
    description: 'NRI investing from abroad or returning to India — both routes covered. Schedule 4 FEMA, NRE account investment, RNOR tax planning, residency transition advisory.',
    url: 'https://www.indiacompanysetup.com/nri-company-registration-india',
  },
};

export default function Page() {
  return <ClientPage />;
}
