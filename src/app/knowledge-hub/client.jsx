'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T } from '@/lib/config';

const CF_SPACE_ID = 'qjo3cpray5h2';
const CF_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN || 'Me3wAoh5C8R-voHvn3buH1R3nWLM9f4QrT6jKVaWDtY';
const CF_URL = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;

const ROUTES = {
  home:'/',services:'/setup',gcc:'/post-setup',tax:'/international-tax',
  hub:'/knowledge-hub',about:'/about',contact:'/contact',industries:'/industries',
  seo_fcri:'/foreign-company-registration-india',seo_sub:'/subsidiary-company-india',
  seo_tp:'/transfer-pricing-india',seo_fdi:'/fdi-rules-india',
  seo_us:'/us-company-setting-up-india',seo_uk:'/uk-company-setting-up-india',
  seo_uae:'/uae-company-setting-up-india',seo_sg:'/singapore-company-setting-up-india',
  seo_gcc:'/gcc-setup-india',seo_entry:'/india-market-entry-advisory',
  seo_pvtltd:'/private-limited-company-registration-india',
  seo_nri:'/nri-company-registration-india',
  seo_startup:'/startup-foreign-investment-india',
};

export default function Page() {
  const router = useRouter();
    

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const tagColors = { "Guide": "#0B3D2E", "Deep Dive": "#4A6FA5", "Compliance": "#C17D2A", "Tax Planning": "#5C7A4A", "How-To": "#5C5C52", "Update": "#7B4A9A" };

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const res = await fetch(
          `${CF_URL}?content_type=article&order=-fields.publishedDate&limit=50`,
          { headers: { Authorization: `Bearer ${CF_TOKEN}` } }
        );
        if (!res.ok) throw new Error(`Contentful error: ${res.status}`);
        const data = await res.json();
        const mapped = (data.items || []).map(item => ({
          id: item.sys.id,
          title: item.fields.title || "",
          slug: item.fields.slug || item.sys.id,
          category: item.fields.category || "General",
          summary: item.fields.summary || "",
          body: item.fields.body || null,
          date: item.fields.publishedDate ? new Date(item.fields.publishedDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "",
          readTime: item.fields.readTime || "5 min read",
          tag: item.fields.tag || "Guide",
          author: item.fields.author || "PGA & Co.",
        }));
        setArticles(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const categories = ["All", ...Array.from(new Set(articles.map(a => a.category)))];
  const filtered = activeCategory === "All" ? articles : articles.filter(a => a.category === activeCategory);

  // ── ARTICLE DETAIL VIEW ──
  if (selectedArticle) {
    return (
      <div>
        {/* Article hero */}
        <section style={{ background: "#0B3D2E", padding: "96px 56px 52px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`, backgroundSize: "64px 64px" }}/>
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <button onClick={() => setSelectedArticle(null)} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.7)", padding: "7px 16px", borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", marginBottom: 32, display: "inline-flex", alignItems: "center", gap: 6 }}>
              ← Back to Knowledge Hub
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ background: tagColors[selectedArticle.tag] || "#0B3D2E", color: "#fff", padding: "4px 14px", borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: .3 }}>{selectedArticle.tag}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", fontWeight: 500 }}>{selectedArticle.category}</span>
            </div>
            <h1 className="font-display" style={{ fontSize: "clamp(30px,3.8vw,52px)", fontWeight: 600, color: "#fff", lineHeight: 1.08, marginBottom: 20, maxWidth: 820, textAlign: "left" }}>{selectedArticle.title}</h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.52)", lineHeight: 1.8, marginBottom: 28, maxWidth: 700, textAlign: "left" }}>{selectedArticle.summary}</p>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              {[`By ${selectedArticle.author}`, selectedArticle.date, selectedArticle.readTime].map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)" }}>·</span>}
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.38)", fontWeight: 400 }}>{item}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Article body */}
        <section style={{ padding: "52px 56px 96px", background: "#FAFAF5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 300px", gap: 48, alignItems: "start" }}>

            {/* Main content */}
            <div style={{ background: "#fff", border: "1px solid #E0DDD4", borderRadius: 16, padding: "48px 56px", minWidth: 0 }}>
              {selectedArticle.body
                ? renderRichText(selectedArticle.body)
                : <p style={{ color: "#9A9A8E", fontStyle: "italic", textAlign: "left" }}>Full article content coming soon. Contact us directly for advice on this topic.</p>
              }
              {/* End of article CTA */}
              <div style={{ marginTop: 48, paddingTop: 32, borderTop: "2px solid #E0DDD4", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#17170F", marginBottom: 4 }}>Have questions about this topic?</div>
                  <div style={{ fontSize: 13, color: "#9A9A8E" }}>Our CA team can advise you directly — free 30-minute consultation.</div>
                </div>
                <button className="ics-btn ics-btn-primary" style={{ flexShrink: 0 }} onClick={() => router.push(ROUTES["contact"] || "/")}>Book Free Consultation →</button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="inner-sticky" style={{ position: "sticky", top: 90, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* CTA card */}
              <div style={{ background: "#0B3D2E", borderRadius: 14, padding: "26px 24px" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#F5A828", fontWeight: 700, marginBottom: 12 }}>Need advice on this?</div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.58)", lineHeight: 1.7, marginBottom: 18 }}>Our team of CAs, CS & accountants can advise you directly — free 30-minute consultation.</p>
                <button className="ics-btn ics-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 13 }} onClick={() => router.push(ROUTES["contact"] || "/")}>Book Free Consultation →</button>
              </div>

              {/* Article details */}
              <div style={{ background: "#fff", border: "1px solid #E0DDD4", borderRadius: 14, padding: "22px 20px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#9A9A8E", marginBottom: 14 }}>Article Details</div>
                {[["Category", selectedArticle.category], ["Published", selectedArticle.date], ["Read time", selectedArticle.readTime], ["Author", selectedArticle.author]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #F2EFE8" }}>
                    <span style={{ color: "#9A9A8E" }}>{k}</span>
                    <span style={{ color: "#2C2C22", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Back link */}
              <button onClick={() => setSelectedArticle(null)} style={{ background: "#fff", border: "1px solid #E0DDD4", borderRadius: 12, padding: "14px 20px", fontSize: 13, fontWeight: 600, color: "#0B3D2E", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", textAlign: "center" }}>
                ← All Articles
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ── ARTICLE LIST VIEW ──
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "#0B3D2E", padding: "100px 56px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(232,144,10,.13)", border: "1px solid rgba(232,144,10,.28)", color: "#F5A828", padding: "5px 13px", borderRadius: 50, fontSize: 10.5, fontWeight: 600, letterSpacing: ".6px", textTransform: "uppercase", marginBottom: 20 }}>
            Knowledge Hub
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 600, color: "#fff", lineHeight: 1.06, marginBottom: 16, maxWidth: 680 }}>
            India entry — explained<br/><span style={{ fontStyle: "italic", color: "#F5A828", fontWeight: 400 }}>clearly and in depth.</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.82, fontWeight: 300, maxWidth: 520 }}>
            Practical guides on company incorporation, transfer pricing, FEMA, and international tax — written by CAs, for decision-makers.
          </p>
        </div>
      </section>

      {/* Articles section */}
      <section style={{ padding: "64px 56px 88px", background: "#FAFAF5" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>

          {/* Loading state */}
          {loading && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ width: 40, height: 40, border: "3px solid #E0DDD4", borderTop: "3px solid #0B3D2E", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 1s linear infinite" }}/>
              <p style={{ color: "#9A9A8E", fontSize: 14 }}>Loading articles from Contentful...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div style={{ background: "#FFF3E0", border: "1px solid #F0D9A0", borderRadius: 12, padding: "24px 28px", marginBottom: 40 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#8A6A10", marginBottom: 6 }}>⚠️ Could not load articles</div>
              <div style={{ fontSize: 13, color: "#8A6A10", opacity: .8 }}>Make sure your Contentful Space ID and API token are set correctly in Vercel environment variables, and that your content type is named "article".</div>
              <div style={{ fontSize: 11, color: "#8A6A10", opacity: .6, marginTop: 8, fontFamily: "monospace" }}>{error}</div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && articles.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: "#17170F", marginBottom: 8 }}>No articles published yet</h3>
              <p style={{ fontSize: 14, color: "#9A9A8E", maxWidth: 400, margin: "0 auto 24px" }}>Add articles in your Contentful space and they'll appear here automatically. Make sure your content type is named <code style={{ background: "#F2EFE8", padding: "2px 6px", borderRadius: 4 }}>article</code>.</p>
              <a href="https://app.contentful.com" target="_blank" rel="noreferrer" className="ics-btn ics-btn-primary" style={{ display: "inline-flex" }}>Open Contentful →</a>
            </div>
          )}

          {/* Category filter — only show when articles loaded */}
          {!loading && articles.length > 0 && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                    padding: "8px 16px", borderRadius: 50, border: `1px solid ${activeCategory === cat ? "#0B3D2E" : "#E0DDD4"}`,
                    background: activeCategory === cat ? "#0B3D2E" : "#fff", color: activeCategory === cat ? "#fff" : "#5C5C52",
                    fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .2s",
                  }}>{cat}</button>
                ))}
              </div>

              {/* Article grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {filtered.map((a) => (
                  <div key={a.id} className="card-lift" onClick={() => router.push("/knowledge-hub/" + a.slug)}
                    style={{ background: "#fff", border: "1px solid #E0DDD4", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer" }}>
                    <div style={{ height: 4, background: `linear-gradient(90deg, #0B3D2E, #E8900A)` }}/>
                    <div style={{ padding: "24px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <span style={{ background: tagColors[a.tag] || "#0B3D2E", color: "#fff", padding: "3px 10px", borderRadius: 50, fontSize: 10, fontWeight: 700 }}>{a.tag}</span>
                        <span style={{ fontSize: 11, color: "#9A9A8E" }}>{a.category}</span>
                      </div>
                      <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "#17170F", lineHeight: 1.35, marginBottom: 10, flex: 1 }}>{a.title}</h3>
                      <p style={{ fontSize: 12.5, color: "#5C5C52", lineHeight: 1.7, marginBottom: 16 }}>{a.summary}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #E0DDD4" }}>
                        <span style={{ fontSize: 11, color: "#9A9A8E" }}>{a.date} · {a.readTime}</span>
                        <span style={{ fontSize: 12, color: "#0B3D2E", fontWeight: 600 }}>Read →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Bottom CTA */}
          <div style={{ marginTop: 64, background: "#17170F", borderRadius: 16, padding: "40px", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "#F5A828", fontWeight: 600, marginBottom: 10 }}>Have a question?</div>
              <h3 className="font-display" style={{ fontSize: 26, fontWeight: 600, color: "#fff", marginBottom: 8 }}>
                Rather talk to a CA directly?
              </h3>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.42)", lineHeight: 1.7 }}>
                Our team handles incorporation, transfer pricing, FEMA, GST, payroll, and international tax. Free 30-minute consultation.
              </p>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <button className="ics-btn ics-btn-primary ics-btn-lg" onClick={() => router.push(ROUTES["contact"] || "/")}>Book Free Consultation →</button>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 8 }}>CA, CS & accountant team</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


// ─── PER-PAGE SEO META ────────────────────────────────────────────────────────
const PAGE_META = {
  "/": {
    title: "Company Incorporation in India for Foreign Companies | India Company Setup",
    description: "End-to-end company setup in India for foreign businesses. Wholly owned subsidiary, branch office, LLP. Ex-KPMG led CA team. 100+ companies incorporated. Free consultation."
  },
  "/setup": {
    title: "Company Incorporation & Entity Setup in India | India Company Setup",
    description: "Set up a Private Limited Company, WOS, Branch Office, or LLP in India. Complete incorporation service by KPMG-trained Chartered Accountants. Free structure review."
  },
  "/post-setup": {
    title: "Post-Incorporation Compliance & Retainer Services India | India Company Setup",
    description: "GST, TDS, payroll, FEMA, transfer pricing and statutory audit for your India entity. Monthly compliance retainer by CA firm. 100+ companies on retainer. 0 penalties."
  },
  "/international-tax": {
    title: "International Tax Advisory India — DTAA, Transfer Pricing, FEMA | India Company Setup",
    description: "DTAA planning, transfer pricing documentation, FEMA compliance, PE risk assessment for foreign companies in India. Ex-KPMG international tax team. 18+ years experience."
  },
  "/knowledge-hub": {
    title: "India Business Setup Knowledge Hub — Guides & Articles | India Company Setup",
    description: "Free guides on company incorporation, FEMA compliance, transfer pricing, and international tax for foreign businesses entering India."
  },
  "/about": {
    title: "About India Company Setup — Ex-KPMG CA Firm, Chandigarh | India Company Setup",
    description: "India Company Setup is led by Pankaj Gupta, CA with 18+ years experience including 8 years at KPMG International Tax. 100+ companies incorporated. PGA & Co. CA."
  },
  "/contact": {
    title: "Free Consultation — India Company Setup | India Company Setup",
    description: "Book a free 30-minute consultation on your India entry strategy. CA, CS & accountant team. Response within 24 hours. No commitment, no jargon."
  },
};
