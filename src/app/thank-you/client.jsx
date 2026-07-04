'use client';
import Link from 'next/link';
import { T } from '@/lib/config';
export default function ThankYouPage() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAF5' }}>
      <div style={{ textAlign: 'center', padding: '60px 40px', maxWidth: 560 }}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>✓</div>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: T.ch, marginBottom: 16 }}>Request received</h1>
        <p style={{ fontSize: 16, color: T.mid, lineHeight: 1.8, marginBottom: 32 }}>Our CA team will respond within 24 hours. In the meantime, explore our guides.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/knowledge-hub" style={{ background: T.f, color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Knowledge Hub →</Link>
          <Link href="/" style={{ background: '#fff', border: `1px solid ${T.bdr}`, color: T.f, padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Back to Home →</Link>
        </div>
      </div>
    </div>
  );
}
