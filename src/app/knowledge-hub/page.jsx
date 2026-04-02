// /src/app/knowledge-hub/page.jsx
// SERVER COMPONENT — fetches Contentful at build time, fully static HTML for Google

import Link from 'next/link';

const CF_SPACE_ID = 'qjo3cpray5h2';
const CF_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;
const CF_URL = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;

export const metadata = {
  title: 'India Entry Knowledge Hub | Incorporation, Tax & Compliance Guides',
  description: 'Practical guides on company incorporation, transfer pricing, FEMA, and international tax — written by CAs for decision-makers expanding into India.',
  alternates: { canonical: 'https://www.indiacompanysetup.com/knowledge-hub' },
};

export const revalidate = 21600;

async function getArticles() {
  try {
    const res = await fetch(
      `${CF_URL}?content_type=article&order=-fields.publishedDate&limit=50&access_token=${CF_TOKEN}`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item) => ({
      slug: item.fields.slug || '',
      title: item.fields.title || '',
      summary: item.fields.summary || '',
      category: item.fields.category || '',
      readTime: item.fields.readTime || '',
      publishedDate: item.fields.publishedDate
        ? new Date(item.fields.publishedDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
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

const categoryColors = {
  'Company Setup': '#1B4F8A',
  'International Tax': '#6B3FA0',
  'Compliance': '#1A5276',
  'Transfer Pricing': '#2E7D5E',
  'FEMA & RBI': '#8B4513',
  'GST': '#B8600F',
};

export default async function KnowledgeHubPage() {
  const articles = await getArticles();

  return (
    <main style={{ background: '#FAFAF7', minHeight: '100vh' }}>
      <style>{`
        .article-card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 28px 28px 24px;
          border: 1px solid #E8E4DC;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .article-card:hover {
          box-shadow: 0 8px 32px rgba(15,30,53,0.12);
          transform: translateY(-2px);
        }
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
      `}</style>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0F1E35 0%, #1B4F8A 100%)',
        padding: '72px 24px 56px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#B8943F', fontWeight: 600, marginBottom: 16,
        }}>
          Knowledge Hub
        </p>
        <h1 className="font-display" style={{
          fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: '#FFFFFF',
          lineHeight: 1.15, maxWidth: 700, margin: '0 auto 20px',
        }}>
          India entry — explained clearly and in depth.
        </h1>
        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 540,
          margin: '0 auto', lineHeight: 1.7, fontWeight: 300,
        }}>
          Practical guides on company incorporation, transfer pricing, FEMA, and
          international tax — written by CAs, for decision-makers.
        </p>
      </section>

      {/* Articles grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px' }}>
        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', fontSize: 15 }}>
            No articles available yet. Check back soon.
          </p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/knowledge-hub/${article.slug}`}
                className="article-card"
              >
                {article.category && (
                  <span style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: categoryColors[article.category] || '#1B4F8A',
                    background: `${categoryColors[article.category] || '#1B4F8A'}18`,
                    borderRadius: 4, padding: '3px 10px', marginBottom: 14, width: 'fit-content',
                  }}>
                    {article.category}
                  </span>
                )}
                <h2 className="font-display" style={{
                  fontSize: 19, fontWeight: 600, color: '#0F1E35',
                  lineHeight: 1.35, marginBottom: 12, flex: 0,
                }}>
                  {article.title}
                </h2>
                <p style={{
                  fontSize: 14, color: '#5A6472', lineHeight: 1.72,
                  fontWeight: 300, flex: 1, marginBottom: 20,
                }}>
                  {article.summary}
                </p>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderTop: '1px solid #F0EDE8', paddingTop: 14,
                  fontSize: 12, color: '#8A8F98',
                }}>
                  <span>{article.author}</span>
                  <span style={{ display: 'flex', gap: 12 }}>
                    {article.readTime && <span>{article.readTime}</span>}
                    {article.publishedDate && <span>{article.publishedDate}</span>}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: 64, background: '#0F1E35', borderRadius: 16,
          padding: '40px 32px', textAlign: 'center',
        }}>
          <h3 className="font-display" style={{
            fontSize: 22, fontWeight: 600, color: '#FFFFFF', marginBottom: 10,
          }}>
            Rather talk to a CA directly?
          </h3>
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24, fontWeight: 300,
          }}>
            Our team handles incorporation, transfer pricing, FEMA, GST, payroll, and
            international tax. Free 30-minute consultation.
          </p>
          <Link href="/contact" style={{
            display: 'inline-block', background: '#B8943F', color: '#FFFFFF',
            borderRadius: 8, padding: '12px 28px', fontSize: 14,
            fontWeight: 600, textDecoration: 'none',
          }}>
            Book Free Consultation →
          </Link>
        </div>
      </section>
    </main>
  );
}
