'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackCalendlyBooking } from '@/lib/utils';

export default function Analytics() {
  const pathname = usePathname();

  // Push page_view to dataLayer on every route change
  // This works for both GTM (GT-WKRW9GQZ) and direct gtag (G-VFH7W7VQ44)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Push to dataLayer for GTM to pick up
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // Also fire via gtag directly as fallback
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);

  // Calendly booking confirmation via postMessage
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
