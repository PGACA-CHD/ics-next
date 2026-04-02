// /src/app/knowledge-hub/[slug]/page.jsx
// SERVER COMPONENT — each article statically generated at build time

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const CF_SPACE_ID = 'qjo3cpray5h2';
const CF_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;
const CF_URL = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;

// Design tokens matching original config.js T object
const T = {
  f:"#0B3D2E", s:"#E8900A", ivory:"#FAFAF5", stone:"#F2EFE8",
  ch:"#17170F", mid:"#5C5C52", lt:"#9A9A8E", bdr:"#E0DDD4",
};

const tagColors = {
  "Guide":"#0B3D2E","Deep Dive":"#4A6FA5","Compliance":"#C17D2A",
  "Tax Planning":"#5C7A4A","How-To":"#5C5C52","Update":"#7B4A9A",
};

export const revalidate = 21600;

async function getAllSlugs() {
  try {
    const res = await fetch(
      `${CF_URL}?content_type=article&select=fields.slug&limit=200&access_token=${CF_TOKEN}`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((i) => ({ slug: i.fields.slug }));
  } catch { return []; }
}

async function getArticle(slug) {
  try {
    const res = await fetch(
      `${CF_URL}?content_type=article&fields.slug=${slug}&limit=1&access_token=${CF_TOKEN}`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return null;
    return {
      id: item.sys.id,
      title: item.fields.title || '',
      slug: item.fields.slug || '',
      summary: item.fields.summary || '',
      category: item.fields.category || 'General',
      readTime: item.fields.readTime || '5 min read',
      tag: item.fields.tag || 'Guide',
      body: item.fields.body || null,
      date: item.fields.publishedDate
        ? new Date(item.fields.publishedDate).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })
        : '',
      author: (item.fields.author && item.fields.author !== 'PGA & Co.' && item.fields.author !== 'PGA & Co')
        ? item.fields.author : 'Pankaj Gupta, FCA',
    };
  } catch { return null; }
}

async function getRelated(category, excludeId) {
  try {
    const res = await fetch(
      `${CF_URL}?content_type=article&fields.category=${category}&limit=4&access_token=${CF_TOKEN}`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || [])
      .filter(i => i.sys.id !== excludeId)
      .slice(0, 3)
      .map(i => ({
        id: i.sys.id,
        title: i.fields.title || '',
        slug: i.fields.slug || i.sys.id,
        summary: (i.fields.summary || '').substring(0, 120),
        tag: i.fields.tag || 'Guide',
        date: i.fields.publishedDate
          ? new Date(i.fields.publishedDate).toLocaleDateString('en-IN', { month:'short', year:'numeric' })
          : '',
      }));
  } catch { return []; }
}

export async function generateStaticParams() {
  return await getAllSlugs();
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | India Company Setup`,
    description: article.summary,
    alternates: { canonical: `https://www.indiacompanysetup.com/knowledge-hub/${article.slug}` },
    openGraph: { title: article.title, description: article.summary, type: 'article' },
  };
}

// Rich text renderer — matches original renderBody() exactly
function richTextOptions(article) {
  return {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong style={{ fontWeight: 600, color: T.ch }}>{text}</strong>,
      [MARKS.CODE]: (text) => <code style={{ background: T.stone, padding: '2px 6px', borderRadius: 4, fontSize: 13, fontFamily: 'monospace' }}>{text}</code>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p style={{ fontSize: 16, color: T.mid, lineHeight: 1.88, marginBottom: 20, fontWeight: 300 }}>{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="font-display" style={{ fontSize: 26, fontWeight: 600, color: T.ch, marginTop: 40, marginBottom: 14, lineHeight: 1.2 }}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: T.ch, marginTop: 32, marginBottom: 10 }}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 style={{ fontSize: 16, fontWeight: 600, color: T.ch, marginTop: 24, marginBottom: 8 }}>{children}</h4>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 20 }}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 20 }}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
          <span style={{ color: T.s, fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 3 }}>✓</span>
          <span style={{ fontSize: 15, color: T.mid, lineHeight: 1.72, fontWeight: 300 }}>{children}</span>
        </li>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote style={{ borderLeft: `4px solid ${T.s}`, paddingLeft: 20, marginLeft: 0, marginBottom: 20 }}>
          <p style={{ fontSize: 16, color: T.mid, lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>{children}</p>
        </blockquote>
      ),
      [BLOCKS.HR]: () => (
        <hr style={{ border: 'none', borderTop: `1px solid ${T.bdr}`, margin: '32px 0' }} />
      ),
      [BLOCKS.TABLE]: (node, children) => (
        <div style={{ overflowX: 'auto', marginBottom: 24, border: `1px solid ${T.bdr}`, borderRadius: 12, background: '#fff' }}>
          <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse' }}>
            <tbody>{children}</tbody>
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
        <th style={{ padding: '14px 16px', textAlign: 'left', verticalAlign: 'top', borderRight: `1px solid ${T.bdr}`, borderBottom: `1px solid ${T.bdr}`, background: T.ivory, color: T.mid, fontSize: 14, fontWeight: 600 }}>{children}</th>
      ),
      [BLOCKS.TABLE_CELL]: (node, children) => (
        <td style={{ padding: '14px 16px', textAlign: 'left', verticalAlign: 'top', borderRight: `1px solid ${T.bdr}`, borderBottom: `1px solid ${T.bdr}`, background: '#fff', color: T.mid, fontSize: 14, fontWeight: 300, lineHeight: 1.7 }}>{children}</td>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} style={{ color: T.f, textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">{children}</a>
      ),
    },
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const related = await getRelated(article.category, article.id);
  const WA_URL = `https://wa.me/919915731447?text=Hi%2C%20I%20read%20your%20article%20on%20${encodeURIComponent(article.title)}%20and%20have%20a%20question.`;

  return (
    <div>
      <style>{`
        .article-body p { margin-bottom: 20px; }
        .inner-page-layout { display: grid; grid-template-columns: 1fr 320px; gap: 56px; align-items: start; }
        @media (max-width: 900px) { .inner-page-layout { grid-template-columns: 1fr; } .inner-sticky { position: static !important; } }
        .related-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr; } }
        .kh-hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px); background-size:64px 64px; }
      `}</style>

      {/* Hero — dark green matching original */}
      <section style={{ background: '#0B3D2E', padding: 'clamp(72px,8vw,100px) clamp(20px,4vw,56px) clamp(40px,5vw,52px)', position: 'relative', overflow: 'hidden' }}>
        <div className="kh-hero-grid" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/knowledge-hub" style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.7)', padding: '7px 16px', borderRadius: 50, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, textDecoration: 'none' }}>
            ← Knowledge Hub
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: tagColors[article.tag] || '#0B3D2E', color: '#fff', padding: '4px 14px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>{article.tag}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>{article.category}</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,50px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 18 }}>{article.title}</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.52)', lineHeight: 1.8, marginBottom: 24, maxWidth: 700 }}>{article.summary}</p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.38)' }}>By {article.author}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.2)' }}>·</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.38)' }}>{article.date}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.2)' }}>·</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.38)' }}>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Body + Sidebar */}
      <section style={{ padding: 'clamp(32px,4vw,52px) clamp(20px,4vw,56px) clamp(48px,6vw,80px)', background: '#FAFAF5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className="inner-page-layout">

          {/* Article body */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,48px)', border: '1px solid #E0DDD4' }} className="article-body">
            {article.body
              ? documentToReactComponents(article.body, richTextOptions(article))
              : <p style={{ color: '#9A9A8E', fontStyle: 'italic' }}>Full article content coming soon. Contact us directly for advice on this topic.</p>
            }

            {/* Footer CTA */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #E0DDD4' }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#E8900A', fontWeight: 700, marginBottom: 12 }}>Have a question about this topic?</div>
              <p style={{ fontSize: 14, color: '#5C5C52', lineHeight: 1.7, marginBottom: 20 }}>
                Our CA team advises foreign companies on {article.category.toLowerCase()} every day. Book a free 30-minute consultation.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-block', background: '#0B3D2E', color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}>
                  Book Free Consultation →
                </Link>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '10px 18px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="inner-sticky" style={{ position: 'sticky', top: 90, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Author card */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '24px 22px', border: '1px solid #E0DDD4' }}>
              <div style={{ fontSize: 9.5, letterSpacing: 2, textTransform: 'uppercase', color: '#E8900A', fontWeight: 700, marginBottom: 12 }}>Written by</div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#0B3D2E,#155C46)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>PG</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#17170F' }}>Pankaj Gupta, FCA</div>
                  <div style={{ fontSize: 12, color: '#9A9A8E', lineHeight: 1.5 }}>Senior Advisor, India Company Setup<br />Diploma in International Taxation</div>
                </div>
              </div>
              <p style={{ fontSize: 12.5, color: '#5C5C52', lineHeight: 1.65 }}>8 years at Ex-Big 4. 100+ foreign companies incorporated in India.</p>
            </div>

            {/* CTA card */}
            <div style={{ background: '#0B3D2E', borderRadius: 14, padding: '24px 22px' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>Need advice on this topic?</div>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.65, marginBottom: 16 }}>Free 30-minute consultation. Expert team responds within 24 hours.</p>
              <Link href="/contact" style={{ display: 'block', textAlign: 'center', background: '#E8900A', color: '#fff', padding: '12px 0', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                Book Free Consultation →
              </Link>
              <div style={{ marginTop: 12, fontSize: 11.5, color: 'rgba(255,255,255,.4)', textAlign: 'center' }}>No commitment · Confidential · 24hr response</div>
            </div>

            {/* Guide download */}
            <div style={{ background: '#F2EFE8', borderRadius: 14, padding: '20px', border: '1px solid #E0DDD4', display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>📋</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#17170F', marginBottom: 3 }}>India Entry Guide</div>
                <div style={{ fontSize: 11.5, color: '#9A9A8E' }}>Free · 3 pages · Plain English</div>
              </div>
              <a href="/India-Entry-Starter-Guide.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, color: '#0B3D2E', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Download ↓
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ padding: 'clamp(40px,5vw,56px) clamp(20px,4vw,56px) clamp(48px,6vw,80px)', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#E8900A', fontWeight: 600, marginBottom: 20 }}>Related Articles</div>
            <div className="related-grid">
              {related.map((r) => (
                <Link key={r.id} href={`/knowledge-hub/${r.slug}`} style={{ background: '#FAFAF5', border: '1px solid #E0DDD4', borderRadius: 14, padding: '24px 22px', textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#E8900A', marginBottom: 8 }}>{r.tag}</div>
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: '#17170F', lineHeight: 1.3, marginBottom: 8 }}>{r.title}</h3>
                  <p style={{ fontSize: 13, color: '#5C5C52', lineHeight: 1.65, fontWeight: 300, marginBottom: 12 }}>{r.summary}…</p>
                  <div style={{ fontSize: 12, color: '#9A9A8E' }}>{r.date}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
