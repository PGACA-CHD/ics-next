// /src/app/knowledge-hub/page.jsx
// SERVER COMPONENT — fetches Contentful at build time, fully static HTML for Google

import Link from 'next/link';

const CF_SPACE_ID = 'qjo3cpray5h2';
const CF_TOKEN =
  process.env.CONTENTFUL_DELIVERY_TOKEN ||
  process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN ||
  'Me3wAoh5C8R-voHvn3buH1R3nWLM9f4QrT6jKVaWDtY';
const CF_URL = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;

export const metadata = {
  title: 'India Business Setup Knowledge Hub — Guides & Articles',
  description: 'Free guides on company incorporation, FEMA compliance, transfer pricing, and international tax for foreign businesses entering India.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/knowledge-hub' },
  openGraph: {
    title: 'India Business Setup Knowledge Hub — Guides & Articles',
    description: 'Free guides on company incorporation, FEMA compliance, transfer pricing, and international tax for foreign businesses entering India.',
    url: 'https://www.indiacompanysetup.com/knowledge-hub',
    images: [{ url: 'https://www.indiacompanysetup.com/og-image.jpg', width: 1200, height: 630, alt: 'India Company Setup Knowledge Hub' }],
    type: 'website',
    siteName: 'India Company Setup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Business Setup Knowledge Hub — Guides & Articles',
    description: 'Free guides on company incorporation, FEMA compliance, transfer pricing, and international tax for foreign businesses entering India.',
    images: ['https://www.indiacompanysetup.com/og-image.jpg'],
  },
};

export const revalidate = 21600;

const tagColors = {
  "Guide": "#0B3D2E",
  "Deep Dive": "#4A6FA5",
  "Compliance": "#C17D2A",
  "Tax Planning": "#5C7A4A",
  "How-To": "#5C5C52",
  "Update": "#7B4A9A",
};

async function getArticles() {
  try {
    const res = await fetch(
      `${CF_URL}?content_type=article&order=-fields.publishedDate&limit=50&access_token=${CF_TOKEN}`,
      {
        headers: { Authorization: `Bearer ${CF_TOKEN}` },
        next: { revalidate: 21600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item) => ({
      id: item.sys.id,
      slug: item.fields.slug || item.sys.id,
      title: item.fields.title || '',
      summary: item.fields.summary || '',
      category: item.fields.category || 'General',
      readTime: item.fields.readTime || '5 min read',
      tag: item.fields.tag || 'Guide',
      date: item.fields.publishedDate
        ? new Date(item.fields.publishedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
        : '',
      author:
        item.fields.author &&
          item.fields.author !== 'PGA & Co.' &&
          item.fields.author !== 'PGA & Co'
          ? item.fields.author
          : 'Pankaj Gupta, FCA',
    }));
  } catch (e) {
    console.error('Contentful fetch error:', e);
    return [];
  }
}

export default async function KnowledgeHubPage() {
  const articles = await getArticles();
  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];

  return (
    <div>
      <style>{`
        .kh-card { background: #fff; border: 1px solid #E0DDD4; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; cursor: pointer; text-decoration: none; transition: box-shadow 0.2s, transform 0.2s; }
        .kh-card:hover { box-shadow: 0 8px 32px rgba(11,61,46,0.13); transform: translateY(-2px); }
        .kh-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .kh-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .kh-grid { grid-template-columns: 1fr; } }
        .kh-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px); background-size: 64px 64px; }
      `}</style>

      {/* Hero */}
      <section style={{ backgroundImage: "url('/banners and logos/Knowledge Hub.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: 'clamp(72px,8vw,100px) clamp(20px,4vw,56px) clamp(52px,6vw,72px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(232,144,10,.13)', border: '1px solid rgba(232,144,10,.28)', color: '#F5A828', padding: '5px 13px', borderRadius: 50, fontSize: 10.5, fontWeight: 600, letterSpacing: '.6px', textTransform: 'uppercase', marginBottom: 20 }}>
            Knowledge Hub
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 600, color: '#fff', lineHeight: 1.06, marginBottom: 16, maxWidth: 680 }}>
            India entry — explained<br />
            <span style={{ fontStyle: 'italic', color: '#F5A828', fontWeight: 400 }}>clearly and in depth.</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', lineHeight: 1.82, fontWeight: 300, maxWidth: 520 }}>
            Practical guides on company incorporation, transfer pricing, FEMA, and international tax — written by CAs, for decision-makers.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: 'clamp(40px,5vw,64px) clamp(20px,4vw,56px) clamp(60px,7vw,88px)', background: '#FAFAF5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: '#17170F', marginBottom: 8 }}>No articles published yet</h3>
              <p style={{ fontSize: 14, color: '#9A9A8E', maxWidth: 400, margin: '0 auto 24px' }}>
                Add articles in your Contentful space and they'll appear here automatically.
              </p>
            </div>
          ) : (
            <>
              {/* Article grid — server rendered, no category filter (static) */}
              <div className="kh-grid">
                {articles.map((a) => (
                  <Link key={a.id} href={`/knowledge-hub/${a.slug}`} className="kh-card">
                    <div style={{ height: 4, background: 'linear-gradient(90deg, #0B3D2E, #E8900A)' }} />
                    <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <span style={{ background: tagColors[a.tag] || '#0B3D2E', color: '#fff', padding: '3px 10px', borderRadius: 50, fontSize: 10, fontWeight: 700 }}>
                          {a.tag}
                        </span>
                        <span style={{ fontSize: 11, color: '#9A9A8E' }}>{a.category}</span>
                      </div>
                      <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: '#17170F', lineHeight: 1.35, marginBottom: 10, flex: 1 }}>
                        {a.title}
                      </h3>
                      <p style={{ fontSize: 12.5, color: '#5C5C52', lineHeight: 1.7, marginBottom: 16 }}>
                        {a.summary}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #E0DDD4' }}>
                        <span style={{ fontSize: 11, color: '#9A9A8E' }}>{a.date} · {a.readTime}</span>
                        <span style={{ fontSize: 12, color: '#0B3D2E', fontWeight: 600 }}>Read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}



        </div>
      </section>
    </div>
  );
}
