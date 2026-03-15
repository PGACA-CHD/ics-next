import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'GCC Setup in India — End-to-End Advisory',
  description: 'Complete GCC and captive centre setup in India. Entity incorporation, cost-plus pricing, ESOP structuring, payroll, transfer pricing documentation. Ex-KPMG CA team.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/gcc-setup-india' },
  openGraph: {
    title: 'GCC Setup in India — End-to-End Advisory',
    description: 'Complete GCC and captive centre setup in India. Entity incorporation, cost-plus pricing, ESOP structuring, payroll, transfer pricing documentation. Ex-KPMG CA team.',
    url: 'https://www.indiacompanysetup.com/gcc-setup-india',
  },
};

export default function Page() {
  return <ClientPage />;
}
