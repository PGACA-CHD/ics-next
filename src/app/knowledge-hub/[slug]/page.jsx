// /src/app/knowledge-hub/[slug]/page.jsx
// SERVER COMPONENT — each article is statically generated at build time

import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';

const CF_SPACE_ID = 'qjo3cpray5h2';
const CF_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;
const CF_URL = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;

export const revalidate = 21600;

async function getAllSlugs() {
  const res = await fetch(
    `${CF_URL}?content_type=knowledgeHubArticle&select=fields.slug&limit=200&access_token=${CF_TOKEN}`,
    { next: { revalidate: 21600 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items || []).map((i) => ({ slug: i.fields.slug }));
}

async function getArticle(slug) {
  const res = await fetch(
    `${CF_URL}?content_type=knowledgeHubArticle&fields.slug=${slug}&limit=1&access_token=${CF_TOKEN}`,
    { next: { revalidate: 21600 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const item = data.items?.[0];
  if (!item) return null;
  return {
    title: item.fields.title || '',
    slug: item.fields.slug || '',
    summary: item.fields.summary || '',
    category: item.fields.category || '',
    readTime: item.fields.readTime || '',
    publishedDate: item.fields.publishedDate
      ? new Date(item.fields.publishedDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '',
    author:
      item.fields.author &&
      item.fields.author !== 'PGA & Co.' &&
      item.fields.author !== 'PGA & Co'
        ? item.fields.author
        : 'Pankaj Gupta, FCA',
    body: item.fields.body || null,
  };
}

// Pre-generate all article pages at build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs;
}

// Dynamic SEO per article
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | India Company Setup`,
    description: article.summary,
    alternates: {
      canonical: `https://www.indiacompanysetup.com/knowledge-hub/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.publishedDate,
    },
  };
}

// Rich text renderer options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p style={{ fontSize: 16, color: '#4A5568', lineHeight: 1.88, marginBottom: 20, fontWeight: 300 }}>
        {children}
      </p>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 style={{ fontSize: 26, fontWeight: 600, color: '#0F1E35', marginTop: 40, marginBottom: 14, lineHeight: 1.2, fontFamily: 'var(--font-display)' }}>
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 style={{ fontSize: 20, fontWeight: 600, color: '#0F1E35', marginTop: 32, marginBottom: 10, fontFamily: 'var(--font-display)' }}>
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 20 }}>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol style={{ paddingLeft: 20, marginBottom: 20 }}>{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
        <span style={{ color: '#B8943F', fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 3 }}>✓</span>
        <span style={{ fontSize: 15, color: '#4A5568', lineHeight: 1.72, fontWeight: 300 }}>{children}</span>
      </li>
    ),
    [BLOCKS.HR]: () => (
      <hr style={{ border: 'none', borderTop: '1px solid #E8E4DC', margin: '32px 0' }} />
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} style={{ color: '#1B4F8A', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  return (
    <main style={{ background: '#FAFAF7', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, #0F1E35 0%, #1B4F8A 100%)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {article.category && (
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8943F', marginBottom: 16, display: 'block' }}>
              {article.category}
            </span>
          )}
          <h1 className="font-display" style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16 }}>
            {article.title}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 20, fontWeight: 300 }}>
            {article.summary}
          </p>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'rgba(255,255,255,0.55)', flexWrap: 'wrap' }}>
            <span>By {article.author}</span>
            {article.publishedDate && <span>{article.publishedDate}</span>}
            {article.readTime && <span>{article.readTime}</span>}
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>
        {article.body
          ? documentToReactComponents(article.body, richTextOptions)
          : <p style={{ color: '#888' }}>Content coming soon.</p>
        }

        {/* Back link + CTA */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid #E8E4DC', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Link href="/knowledge-hub" style={{ fontSize: 14, color: '#1B4F8A', textDecoration: 'none', fontWeight: 500 }}>
            ← Back to Knowledge Hub
          </Link>
          <div style={{ background: '#0F1E35', borderRadius: 12, padding: '28px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
              Have questions? Our CA team can advise on your specific situation.
            </p>
            <Link href="/contact" style={{ display: 'inline-block', background: '#B8943F', color: '#FFF', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Book Free Consultation →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
