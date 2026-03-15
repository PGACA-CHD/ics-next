import { SITE_URL } from '@/lib/config';
import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'FDI Rules in India — Complete Guide for Foreign Investors',
  description: 'India FDI policy, automatic vs government route, sector caps, FEMA compliance, FC-GPR filings, and common violations. Plain English guide by CA specialists.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/fdi-rules-india' },
  openGraph: {
    title: 'FDI Rules in India — Complete Guide for Foreign Investors',
    description: 'India FDI policy, automatic vs government route, sector caps, FEMA compliance, FC-GPR filings, and common violations. Plain English guide by CA specialists.',
    url: 'https://www.indiacompanysetup.com/fdi-rules-india',
  },
};

export default function Page() {
  return <ClientPage />;
}
