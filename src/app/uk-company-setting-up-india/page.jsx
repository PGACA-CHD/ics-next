import CountryClientPage from '@/components/seo/CountryClient';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'UK Company Setting Up in India — Complete Guide',
  description: 'How UK companies incorporate in India. India-UK DTAA, FCA-regulated entities, post-Brexit structuring, transfer pricing. Ex-KPMG CA team. 20+ UK companies advised.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/uk-company-setting-up-india' },
  openGraph: { title: 'UK Company Setting Up in India — Complete Guide', description: 'How UK companies incorporate in India. India-UK DTAA, FCA-regulated entities, post-Brexit structuring, transfer pricing. Ex-KPMG CA team. 20+ UK companies advised.', url: 'https://www.indiacompanysetup.com/uk-company-setting-up-india' },
};

export default function Page() {
  return <CountryClientPage country="uk" />;
}
