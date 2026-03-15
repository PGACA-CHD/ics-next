import { T } from '@/lib/config';

export default function Logo({ size = 36, inverted = false }) {
  const bg   = inverted ? 'rgba(255,255,255,0.1)' : T.f;
  const fill = '#fff';
  const gold = T.s;

  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill={bg} />
      {/* Pillar top cap */}
      <rect x="9" y="8" width="18" height="3" rx="1.5" fill={fill} />
      {/* Pillar column */}
      <rect x="15" y="11" width="6" height="12" fill={fill} />
      {/* Pillar bottom cap */}
      <rect x="9" y="23" width="18" height="3" rx="1.5" fill={fill} />
      {/* Gold arrow */}
      <path d="M18 28 L15 32 L18 31 L21 32 Z" fill={gold} />
    </svg>
  );
}
