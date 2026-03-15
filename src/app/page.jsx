import ClientPage from './home-client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Company Incorporation in India for Foreign Companies | India Company Setup',
  description: 'End-to-end company setup in India for foreign businesses. Wholly owned subsidiary, branch office, LLP. Ex-KPMG led CA team. 100+ companies incorporated. Free consultation.',
  alternates: { canonical: 'https://www.indiacompanysetup.com' },
  openGraph: {
    title: 'Company Incorporation in India for Foreign Companies | India Company Setup',
    description: 'End-to-end company setup in India for foreign businesses. Ex-KPMG led CA team.',
    url: 'https://www.indiacompanysetup.com',
  },
};

export default function Page() {
  return <ClientPage />;
}
