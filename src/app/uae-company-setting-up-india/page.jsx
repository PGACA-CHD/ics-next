import CountryClientPage from '@/components/seo/CountryClient';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'UAE Company Setting Up in India — Complete Guide',
  description: 'How UAE companies incorporate in India. India-UAE DTAA, NRI promoter structures, DIFC entities, FEMA compliance. Ex-KPMG CA team. 15+ UAE companies advised.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/uae-company-setting-up-india' },
  openGraph: { title: 'UAE Company Setting Up in India — Complete Guide', description: 'How UAE companies incorporate in India. India-UAE DTAA, NRI promoter structures, DIFC entities, FEMA compliance. Ex-KPMG CA team. 15+ UAE companies advised.', url: 'https://www.indiacompanysetup.com/uae-company-setting-up-india' },
};

export default function Page() {
  return <CountryClientPage country="uae" />;
}
