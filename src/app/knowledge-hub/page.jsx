import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'India Entry Knowledge Hub | Incorporation, Tax & Compliance Guides',
  description: 'Free guides on company incorporation, FEMA compliance, transfer pricing, and international tax for foreign businesses entering India.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/knowledge-hub' },
};

export default function Page() {
  return <ClientPage />;
}
