import './globals.css';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-cormorant',
    display: 'swap',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-dm-sans',
    display: 'swap',
});
import { SITE_NAME, SITE_URL } from '@/lib/config';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import ChatWidget from '@/components/shared/ChatWidget';
import Analytics from '@/components/shared/Analytics';
import Script from 'next/script';

export const viewport = { };

export const metadata = {
  metadataBase: new URL('https://www.indiacompanysetup.com'),
  title: {
    default: 'India Company Setup | Ex-Big 4 CA Team for Foreign Companies',
    template: '%s | India Company Setup',
  },
  description: 'End-to-end company setup in India for foreign businesses. Wholly owned subsidiary, branch office, LLP. Ex-Big 4 led CA team. 100+ companies incorporated. Free consultation.',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
};

const GA4_ID = 'G-VFH7W7VQ44';
const GTM_ID = 'GT-WKRW9GQZ';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        {/* GTM dataLayer init */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window._icsTrack = function(event, params) {
            window.dataLayer.push({ event: event, ...(params || {}) });
          };
        ` }} />
      </head>
      <body>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ChatWidget />
        <Analytics />
        <Script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        ` }} />
        <Script id="ga4-script" strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
        <Script id="ga4-config" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { send_page_view: false, transport_type: 'beacon' });
        ` }} />
      </body>
    </html>
  );
} 
