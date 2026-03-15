import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Private Limited Company Registration in India | CA-Led, FDI-Ready',
  description: 'Register a Private Limited Company in India. SPICe+ filing, MOA/AOA, PAN, TAN, GST, post-incorporation compliance. CA-led. FDI-ready from day one. 7–12 working days.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/private-limited-company-registration-india' },
  openGraph: {
    title: 'Private Limited Company Registration in India | CA-Led, FDI-Ready',
    description: 'Register a Private Limited Company in India. SPICe+ filing, MOA/AOA, PAN, TAN, GST, post-incorporation compliance. CA-led. FDI-ready from day one. 7–12 working days.',
    url: 'https://www.indiacompanysetup.com/private-limited-company-registration-india',
  },
};

export default function Page() {
  return <ClientPage />;
}
