import Link from 'next/link';
export default function NotFound() {
  return (
    <div style={{ minHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#FAFAF5' }}>
      <div style={{ textAlign:'center', padding:'60px 40px' }}>
        <div style={{ fontSize:72, fontWeight:700, color:'#0B3D2E', fontFamily:"'Cormorant Garamond',serif" }}>404</div>
        <h1 style={{ fontSize:24, color:'#17170F', marginBottom:12, fontFamily:"'DM Sans',sans-serif" }}>Page not found</h1>
        <p style={{ color:'#5C5C52', marginBottom:28, fontFamily:"'DM Sans',sans-serif" }}>The page you're looking for doesn't exist.</p>
        <Link href="/" style={{ background:'#0B3D2E', color:'#fff', padding:'12px 24px', borderRadius:8, textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
          Back to Home →
        </Link>
      </div>
    </div>
  );
}
