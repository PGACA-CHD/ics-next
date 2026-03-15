'use client';
import { WA_BASE } from '@/lib/config';
import { trackWhatsApp } from '@/lib/utils';

export default function WhatsAppFloat() {
  return (
    <a
      href={`${WA_BASE}?text=Hi%2C%20I%27d%20like%20to%20discuss%20setting%20up%20a%20company%20in%20India.`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp('float_button')}
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 500,
        width: 52, height: 52, borderRadius: '50%',
        background: '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37,211,102,.4)',
        transition: 'transform .2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 1C6.373 1 1 6.373 1 13c0 2.278.618 4.41 1.695 6.238L1 25l5.95-1.56A11.94 11.94 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z" fill="#fff"/>
        <path d="M13 3.182c-5.42 0-9.818 4.398-9.818 9.818 0 2.149.694 4.136 1.864 5.758l-1.22 3.597 3.72-1.196a9.76 9.76 0 005.454 1.659c5.42 0 9.818-4.398 9.818-9.818S18.42 3.182 13 3.182zm4.863 13.044c-.202.57-1.188 1.093-1.634 1.12-.41.024-.793.195-2.674-.557-2.25-.9-3.688-3.19-3.8-3.34-.11-.148-.91-1.21-.91-2.31 0-1.098.575-1.638.778-1.858.203-.22.44-.275.587-.275l.42.008c.135.005.316-.051.495.378.184.44.624 1.52.678 1.63.055.11.09.238.017.386-.073.148-.11.24-.22.37l-.33.386c-.11.12-.225.25-.097.49.128.24.572.944 1.228 1.529.844.752 1.556.985 1.776 1.095.22.11.348.092.477-.055.128-.147.55-.641.697-.861.147-.22.293-.184.495-.11.202.073 1.284.606 1.504.716.22.11.367.165.422.256.054.091.054.527-.148 1.097z" fill="#25D366"/>
      </svg>
    </a>
  );
}
