import CountryClientPage from '@/components/seo/CountryClient';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Singapore Company Setting Up in India — Complete Guide',
  description: 'How Singapore companies incorporate in India. India-Singapore DTAA, GCC setup, cost-plus pricing, ESOP structuring. Ex-KPMG CA team. 20+ APAC companies advised.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/singapore-company-setting-up-india' },
  openGraph: { title: 'Singapore Company Setting Up in India — Complete Guide', description: 'How Singapore companies incorporate in India. India-Singapore DTAA, GCC setup, cost-plus pricing, ESOP structuring. Ex-KPMG CA team. 20+ APAC companies advised.', url: 'https://www.indiacompanysetup.com/singapore-company-setting-up-india' },
};

export default function Page() {
  return <CountryClientPage country="sg" />;
}
