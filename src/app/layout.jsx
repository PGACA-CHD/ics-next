import './globals.css';
import { SITE_NAME, SITE_URL } from '@/lib/config';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import Analytics from '@/components/shared/Analytics';
import Script from 'next/script';

export const viewport = { };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Company Incorporation in India for Foreign Companies | India Company Setup',
    template: '%s | India Company Setup',
  },
  description: 'End-to-end company setup in India for foreign businesses. Wholly owned subsidiary, branch office, LLP. Ex-Big 4 led CA team. 100+ companies incorporated. Free consultation.',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
};

const GA4_ID  = 'G-VFH7W7VQ44';
const GTM_ID  = 'GT-WKRW9GQZ';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* GTM dataLayer init — must be before gtm.js loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window._icsTrack = function(event, params) {
                window.dataLayer.push({ event: event, ...(params || {}) });
              };
            `,
          }}
        />
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />

        {/* GTM — afterInteractive so it doesn't block render */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />

        {/* Direct GA4 — afterInteractive, fires independently of GTM */}
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', {
                send_page_view: false,
                transport_type: 'beacon',
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
