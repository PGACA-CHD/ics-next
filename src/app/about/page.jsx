import ClientPage from './client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About India Company Setup | Ex-KPMG CA Team | India Entry Advisory',
  description: 'India Company Setup is an Ex-KPMG-led team of CAs, Company Secretaries, accountants and lawyers. 100+ foreign companies incorporated. 18+ years combined experience.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/about' },
  openGraph: {
    title: 'About India Company Setup | Ex-KPMG CA Team | India Entry Advisory',
    description: 'India Company Setup is an Ex-KPMG-led team of CAs, Company Secretaries, accountants and lawyers. 100+ foreign companies incorporated. 18+ years combined experience.',
    url: 'https://www.indiacompanysetup.com/about'
  },
};

export default function Page() {
  return <ClientPage />;
}