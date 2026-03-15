'use client';
import { T } from '@/lib/config';

export default function Logo({ dark = false, size = 'md' }) {
  const scale = size === 'sm' ? 0.8 : size === 'lg' ? 1.2 : 1;
  const pillarColor = dark ? T.f : '#fff';
  const textColor   = dark ? T.f : 'rgba(255,255,255,.92)';
  const subColor    = dark ? T.lt : 'rgba(255,255,255,.38)';
  return (
    <svg width={210 * scale} height={44 * scale} viewBox="0 0 210 44" fill="none">
      <rect x="0" y="4" width="16" height="3.2" rx="1.5" fill={pillarColor}/>
      <rect x="0" y="36.8" width="16" height="3.2" rx="1.5" fill={pillarColor}/>
      <rect x="6" y="4" width="4" height="36" rx="1.5" fill={pillarColor}/>
      <polygon points="8,5 3,16 8,13 13,16" fill={T.sl}/>
      <rect x="6.2" y="13" width="3.6" height="11" rx="1" fill={T.sl}/>
      <text x="22" y="29" fontFamily="Cormorant Garamond, serif" fontSize="24" fontWeight="600" fill={textColor} letterSpacing="-0.2">ndia Company</text>
      <text x="22" y="40" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="500" fill={subColor} letterSpacing="3.2">SETUP</text>
    </svg>
  );
}
