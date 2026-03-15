import ClientPage from './client';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'About India Company Setup | Ex-KPMG CA Team | Pankaj Gupta FCA',
  description: "India Company Setup is led by Pankaj Gupta FCA, with 8 years at KPMG International Tax & Advisory. A team of CAs, CS & accountants. 100+ companies incorporated.",
  alternates: { canonical: 'https://www.indiacompanysetup.com/about' },
  openGraph: { title: 'About India Company Setup | Ex-KPMG CA Team | Pankaj Gupta FCA', description: "India Company Setup is led by Pankaj Gupta FCA, with 8 years at KPMG International Tax & Advisory. A team of CAs, CS & accountants. 100+ companies incorporated.", url: 'https://www.indiacompanysetup.com/about' },
};

export default function Page() {
  return <ClientPage />;
}
