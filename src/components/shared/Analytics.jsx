'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackCalendlyBooking } from '@/lib/utils';

const GA4_ID = 'G-VFH7W7VQ44';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Small delay ensures gtag script has initialised
    const timer = setTimeout(() => {
      // 1. Push to GTM dataLayer (GTM picks this up and forwards to GA4)
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'page_view',
          page_path: pathname,
          page_location: window.location.href,
          page_title: document.title,
        });
      }

      // 2. Also fire directly via gtag as a fallback
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: pathname,
          page_location: window.location.href,
          page_title: document.title,
          send_to: GA4_ID,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Calendly booking tracking
  useEffect(() => {
    function handleMessage(e) {
      if (e.data?.event === 'calendly.event_scheduled') {
        trackCalendlyBooking();
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return null;
}
