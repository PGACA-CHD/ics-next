'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackCalendlyBooking } from '@/lib/utils';

export default function Analytics() {
  const pathname = usePathname();

  // Track page views on route change
  useEffect(() => {
    trackPageView(pathname);
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
