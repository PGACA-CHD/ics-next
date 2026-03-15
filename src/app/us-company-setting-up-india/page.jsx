import CountryClientPage from '@/components/seo/CountryClient';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'US Company Setting Up in India — Complete Guide',
  description: 'How US companies incorporate in India. Delaware-India structure, Section 482 transfer pricing, India-US DTAA, FCGPR filing. Ex-KPMG CA team. 30+ US companies advised.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/us-company-setting-up-india' },
  openGraph: { title: 'US Company Setting Up in India — Complete Guide', description: 'How US companies incorporate in India. Delaware-India structure, Section 482 transfer pricing, India-US DTAA, FCGPR filing. Ex-KPMG CA team. 30+ US companies advised.', url: 'https://www.indiacompanysetup.com/us-company-setting-up-india' },
};

export default function Page() {
  return <CountryClientPage country="us" />;
}
