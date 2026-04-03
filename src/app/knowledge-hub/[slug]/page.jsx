// src/app/knowledge-hub/[slug]/page.jsx
// SERVER COMPONENT - each article statically generated at build time
// Fixes: UTF-8 arrows/emoji, og:image, twitter:image, Article schema,
//        title template (no double suffix), FAQPage schema, BreadcrumbList schema

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const CF_SPACE_ID = 'qjo3cpray5h2';
const CF_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;
const CF_URL = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;
const SITE = 'https://www.indiacompanysetup.com';
const OG_DEFAULT_IMAGE = `${SITE}/og-default.png`; // place a 1200x630 image here in /public

// Design tokens
const T = {
  f: '#0B3D2E', s: '#E8900A', ivory: '#FAFAF5', stone: '#F2EFE8',
  ch: '#17170F', mid: '#5C5C52', lt: '#9A9A8E', bdr: '#E0DDD4',
};

const tagColors = {
  'Guide': '#0B3D2E', 'Deep Dive': '#4A6FA5', 'Compliance': '#C17D2A',
  'Tax Planning': '#5C7A4A', 'How-To': '#5C5C52', 'Update': '#7B4A9A',
};

export const revalidate = 21600;

// ── Data fetchers ────────────────────────────────────────────────────────────

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
      faqs: item.fields.faqs || [],   // optional array of {question, answer} from Contentful
      ogImage: item.fields.ogImage?.fields?.file?.url
        ? `https:${item.fields.ogImage.fields.file.url}`
        : OG_DEFAULT_IMAGE,
      publishedDate: item.fields.publishedDate || item.sys.createdAt,
      date: item.fields.publishedDate
        ? new Date(item.fields.publishedDate).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric',
          })
        : '',
      dateISO: item.fields.publishedDate || item.sys.createdAt,
      author: (item.fields.author && !['PGA & Co.', 'PGA & Co'].includes(item.fields.author))
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
      .filter((i) => i.sys.id !== excludeId)
      .slice(0, 3)
      .map((i) => ({
        id: i.sys.id,
        title: i.fields.title || '',
        slug: i.fields.slug || i.sys.id,
        summary: (i.fields.summary || '').substring(0, 120),
        tag: i.fields.tag || 'Guide',
        date: i.fields.publishedDate
          ? new Date(i.fields.publishedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
          : '',
      }));
  } catch { return []; }
}

// ── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return await getAllSlugs();
}

// ── SEO metadata (title template, og:image, twitter:image) ──────────────────

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found' };

  const ogImage = article.ogImage || OG_DEFAULT_IMAGE;
  const canonical = `${SITE}/knowledge-hub/${article.slug}`;

  return {
    // No "| India Company Setup" here — layout.jsx template appends it once
    title: article.title,
    description: article.summary,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: canonical,
      type: 'article',
      publishedTime: article.dateISO,
      authors: [article.author],
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: [ogImage],
    },
  };
}

// ── Rich-text renderer ───────────────────────────────────────────────────────

function getRichTextOptions() {
  return {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <strong style={{ fontWeight: 600, color: T.ch }}>{text}</strong>
      ),
      [MARKS.CODE]: (text) => (
        <code style={{ background: T.stone, padding: '2px 6px', borderRadius: 4, fontSize: 13, fontFamily: 'monospace' }}>
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p style={{ fontSize: 16, color: T.mid, lineHeight: 1.88, marginBottom: 20, fontWeight: 300 }}>
          {children}
        </p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="font-display"
          style={{ fontSize: 26, fontWeight: 600, color: T.ch, marginTop: 40, marginBottom: 14, lineHeight: 1.2 }}>
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="font-display"
          style={{ fontSize: 20, fontWeight: 600, color: T.ch, marginTop: 32, marginBottom: 10 }}>
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 style={{ fontSize: 16, fontWeight: 600, color: T.ch, marginTop: 24, marginBottom: 8 }}>
          {children}
        </h4>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 20 }}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 20, counterReset: 'ol-counter' }}>
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
          <span style={{ color: T.s, fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 4 }}>&#10003;</span>
          <span style={{ fontSize: 15, color: T.mid, lineHeight: 1.72, fontWeight: 300 }}>{children}</span>
        </li>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote style={{ borderLeft: `4px solid ${T.s}`, paddingLeft: 20, marginLeft: 0, marginBottom: 20 }}>
          <div style={{ fontSize: 16, color: T.mid, lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>
            {children}
          </div>
        </blockquote>
      ),
      [BLOCKS.HR]: () => (
        <hr style={{ border: 'none', borderTop: `1px solid ${T.bdr}`, margin: '32px 0' }} />
      ),
      // Tables - fixed: no div wrapper inside th/td, children rendered directly
      [BLOCKS.TABLE]: (node, children) => (
        <div style={{ overflowX: 'auto', marginBottom: 24, border: `1px solid ${T.bdr}`, borderRadius: 12, background: '#fff' }}>
          <table style={{ width: '100%', minWidth: 540, borderCollapse: 'collapse' }}>
            <tbody>{children}</tbody>
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
        <th style={{
          padding: '12px 16px', textAlign: 'left', verticalAlign: 'top',
          borderRight: `1px solid ${T.bdr}`, borderBottom: `1px solid ${T.bdr}`,
          background: T.stone, color: T.ch, fontSize: 13, fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {children}
        </th>
      ),
      [BLOCKS.TABLE_CELL]: (node, children) => (
        <td style={{
          padding: '12px 16px', textAlign: 'left', verticalAlign: 'top',
          borderRight: `1px solid ${T.bdr}`, borderBottom: `1px solid ${T.bdr}`,
          background: '#fff', color: T.mid, fontSize: 14, fontWeight: 300, lineHeight: 1.7,
        }}>
          {children}
        </td>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} style={{ color: T.f, textDecoration: 'underline' }}
          target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };
}

// ── JSON-LD schemas ──────────────────────────────────────────────────────────

function ArticleSchema({ article }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: article.ogImage || OG_DEFAULT_IMAGE,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: {
      '@type': 'Person',
      name: 'Pankaj Gupta, FCA',
      jobTitle: 'Senior Chartered Accountant',
      worksFor: {
        '@type': 'Organization',
        name: 'India Company Setup',
        url: SITE,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'India Company Setup',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/knowledge-hub/${article.slug}` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema({ article }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Knowledge Hub', item: `${SITE}/knowledge-hub` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${SITE}/knowledge-hub/${article.slug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Page component ───────────────────────────────────────────────────────────

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const related = await getRelated(article.category, article.id);
  const WA_URL = `https://wa.me/919915731447?text=Hi%2C%20I%20read%20your%20article%20on%20${encodeURIComponent(article.title)}%20and%20have%20a%20question.`;

  return (
    <div>
      {/* JSON-LD schemas */}
      <ArticleSchema article={article} />
      <BreadcrumbSchema article={article} />
      <FaqSchema faqs={article.faqs} />

      <style>{`
        .article-body p { margin-bottom: 20px; }
        .inner-page-layout { display: grid; grid-template-columns: 1fr 320px; gap: 56px; align-items: start; }
        @media (max-width: 900px) { .inner-page-layout { grid-template-columns: 1fr; } .inner-sticky { position: static !important; } }
        .related-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr; } }
        .kh-hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px); background-size:64px 64px; }
        .article-body table p { margin-bottom: 0; }
      `}</style>

      {/* Breadcrumb nav (visible) */}
      <nav style={{ background: '#F2EFE8', padding: '10px clamp(20px,4vw,56px)', fontSize: 12, color: '#9A9A8E' }}
        aria-label="Breadcrumb">
        <Link href="/" style={{ color: '#9A9A8E', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>&#8250;</span>
        <Link href="/knowledge-hub" style={{ color: '#9A9A8E', textDecoration: 'none' }}>Knowledge Hub</Link>
        <span style={{ margin: '0 8px' }}>&#8250;</span>
        <span style={{ color: '#5C5C52' }}>{article.title.substring(0, 60)}{article.title.length > 60 ? '...' : ''}</span>
      </nav>

      {/* Hero */}
      <section style={{
        background: '#0B3D2E',
        padding: 'clamp(56px,7vw,88px) clamp(20px,4vw,56px) clamp(36px,4vw,52px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="kh-hero-grid" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/knowledge-hub" style={{
            background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
            color: 'rgba(255,255,255,.7)', padding: '7px 16px', borderRadius: 50, fontSize: 12,
            fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6,
            marginBottom: 32, textDecoration: 'none',
          }}>
            &#8592; Knowledge Hub
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              background: tagColors[article.tag] || '#0B3D2E', color: '#fff',
              padding: '4px 14px', borderRadius: 50, fontSize: 11, fontWeight: 700,
            }}>
              {article.tag}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>{article.category}</span>
          </div>
          <h1 className="font-display" style={{
            fontSize: 'clamp(26px,3.5vw,50px)', fontWeight: 600, color: '#fff',
            lineHeight: 1.08, marginBottom: 18,
          }}>
            {article.title}
          </h1>
          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,.52)', lineHeight: 1.8,
            marginBottom: 24, maxWidth: 700,
          }}>
            {article.summary}
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.38)' }}>By {article.author}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.2)' }}>&#183;</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.38)' }}>{article.date}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.2)' }}>&#183;</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,.38)' }}>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Body + Sidebar */}
      <section style={{
        padding: 'clamp(32px,4vw,52px) clamp(20px,4vw,56px) clamp(48px,6vw,80px)',
        background: '#FAFAF5',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className="inner-page-layout">

          {/* Article body */}
          <div style={{
            background: '#fff', borderRadius: 16,
            padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,48px)',
            border: '1px solid #E0DDD4',
          }} className="article-body">
            {article.body
              ? documentToReactComponents(article.body, getRichTextOptions())
              : <p style={{ color: '#9A9A8E', fontStyle: 'italic' }}>Full article content coming soon.</p>
            }

            {/* Footer CTA */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #E0DDD4' }}>
              <div style={{
                fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
                color: '#E8900A', fontWeight: 700, marginBottom: 12,
              }}>
                Have a question about this topic?
              </div>
              <p style={{ fontSize: 14, color: '#5C5C52', lineHeight: 1.7, marginBottom: 20 }}>
                Our CA team advises foreign companies on {article.category.toLowerCase()} every day.
                Book a free 30-minute consultation.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" style={{
                  display: 'inline-block', background: '#0B3D2E', color: '#fff',
                  padding: '10px 20px', borderRadius: 8, fontSize: 13.5,
                  fontWeight: 600, textDecoration: 'none',
                }}>
                  Book Free Consultation &#8594;
                </Link>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#25D366', color: '#fff', padding: '10px 18px',
                  borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: 'none',
                }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="inner-sticky" style={{ position: 'sticky', top: 90, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Author card */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '24px 22px', border: '1px solid #E0DDD4' }}>
              <div style={{ fontSize: 9.5, letterSpacing: 2, textTransform: 'uppercase', color: '#E8900A', fontWeight: 700, marginBottom: 12 }}>
                Written by
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#0B3D2E,#155C46)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>PG</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#17170F' }}>Pankaj Gupta, FCA</div>
                  <div style={{ fontSize: 12, color: '#9A9A8E', lineHeight: 1.5 }}>
                    Senior Advisor, India Company Setup<br />Diploma in International Taxation
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 12.5, color: '#5C5C52', lineHeight: 1.65 }}>
                8 years at Ex-Big 4. 100+ foreign companies incorporated in India.
              </p>
            </div>

            {/* CTA card */}
            <div style={{ background: '#0B3D2E', borderRadius: 14, padding: '24px 22px' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>
                Need advice on this topic?
              </div>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.65, marginBottom: 16 }}>
                Free 30-minute consultation. Expert team responds within 24 hours.
              </p>
              <Link href="/contact" style={{
                display: 'block', textAlign: 'center', background: '#E8900A',
                color: '#fff', padding: '12px 0', borderRadius: 8,
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}>
                Book Free Consultation &#8594;
              </Link>
              <div style={{ marginTop: 12, fontSize: 11.5, color: 'rgba(255,255,255,.4)', textAlign: 'center' }}>
                No commitment &#183; Confidential &#183; 24hr response
              </div>
            </div>

            {/* Guide download */}
            <div style={{
              background: '#F2EFE8', borderRadius: 14, padding: '20px',
              border: '1px solid #E0DDD4', display: 'flex', gap: 14, alignItems: 'center',
            }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>&#128203;</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#17170F', marginBottom: 3 }}>India Entry Guide</div>
                <div style={{ fontSize: 11.5, color: '#9A9A8E' }}>Free &#183; 5 pages &#183; Plain English</div>
              </div>
              <a href="/India-Entry-Starter-Guide.pdf" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, fontWeight: 600, color: '#0B3D2E', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Download &#8595;
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{
          padding: 'clamp(40px,5vw,56px) clamp(20px,4vw,56px) clamp(48px,6vw,80px)',
          background: '#fff',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
              fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
              color: '#E8900A', fontWeight: 600, marginBottom: 20,
            }}>
              Related Articles
            </div>
            <div className="related-grid">
              {related.map((r) => (
                <Link key={r.id} href={`/knowledge-hub/${r.slug}`} style={{
                  background: '#FAFAF5', border: '1px solid #E0DDD4',
                  borderRadius: 14, padding: '24px 22px',
                  textDecoration: 'none', display: 'block',
                }}>
                  <div style={{
                    fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5,
                    textTransform: 'uppercase', color: '#E8900A', marginBottom: 8,
                  }}>
                    {r.tag}
                  </div>
                  <h3 className="font-display" style={{
                    fontSize: 17, fontWeight: 600, color: '#17170F',
                    lineHeight: 1.3, marginBottom: 8,
                  }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#5C5C52', lineHeight: 1.65, fontWeight: 300, marginBottom: 12 }}>
                    {r.summary}&#8230;
                  </p>
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
