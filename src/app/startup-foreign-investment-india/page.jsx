import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Indian Startup Receiving Foreign Investment — FEMA, Angel Tax, CCPS',
  description: 'FEMA compliance, angel tax, valuation, CCPS vs SAFE — everything an Indian startup needs when receiving first foreign investment. FC-GPR filing, DPIIT recognition.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/startup-foreign-investment-india' },
  openGraph: {
    title: 'Indian Startup Receiving Foreign Investment — FEMA, Angel Tax, CCPS',
    description: 'FEMA compliance, angel tax, valuation, CCPS vs SAFE — everything an Indian startup needs when receiving first foreign investment. FC-GPR filing, DPIIT recognition.',
    url: 'https://www.indiacompanysetup.com/startup-foreign-investment-india',
  },
};

export default function Page() {
  return <ClientPage />;
}
