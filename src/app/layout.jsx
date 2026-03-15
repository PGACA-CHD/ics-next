import './globals.css';
import { GA4_ID, SITE_NAME, SITE_URL } from '@/lib/config';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import Analytics from '@/components/shared/Analytics';

export const viewport = { };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Company Incorporation in India for Foreign Companies | India Company Setup',
    template: '%s | India Company Setup',
  },
  description: 'End-to-end company setup in India for foreign businesses. Wholly owned subsidiary, branch office, LLP. Ex-KPMG led CA team. 100+ companies incorporated. Free consultation.',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: false });
              window._icsTrack = function(event, params) {
                if (window.gtag) gtag('event', event, params || {});
              };
            `,
          }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
