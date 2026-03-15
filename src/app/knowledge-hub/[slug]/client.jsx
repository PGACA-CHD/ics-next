'use client';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T } from '@/lib/config';
import { trackConsultationRequest, trackGuideDownload } from '@/lib/utils';

const CF_SPACE_ID = 'qjo3cpray5h2';
const CF_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN || 'Me3wAoh5C8R-voHvn3buH1R3nWLM9f4QrT6jKVaWDtY';
const CF_URL = `https://cdn.contentful.com/spaces/${CF_SPACE_ID}/environments/master/entries`;


const WASvg = () => (
  <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
    <path d="M13 1C6.373 1 1 6.373 1 13c0 2.278.618 4.41 1.695 6.238L1 25l5.95-1.56A11.94 11.94 0 0013 25c6.627 0 12-5.373 12-12S19.627 1 13 1z" fill="#fff"/>
    <path d="M13 3.182c-5.42 0-9.818 4.398-9.818 9.818 0 2.149.694 4.136 1.864 5.758l-1.22 3.597 3.72-1.196a9.76 9.76 0 005.454 1.659c5.42 0 9.818-4.398 9.818-9.818S18.42 3.182 13 3.182zm4.863 13.044c-.202.57-1.188 1.093-1.634 1.12-.41.024-.793.195-2.674-.557-2.25-.9-3.688-3.19-3.8-3.34-.11-.148-.91-1.21-.91-2.31 0-1.098.575-1.638.778-1.858.203-.22.44-.275.587-.275l.42.008c.135.005.316-.051.495.378.184.44.624 1.52.678 1.63.055.11.09.238.017.386-.073.148-.11.24-.22.37l-.33.386c-.11.12-.225.25-.097.49.128.24.572.944 1.228 1.529.844.752 1.556.985 1.776 1.095.22.11.348.092.477-.055.128-.147.55-.641.697-.861.147-.22.293-.184.495-.11.202.073 1.284.606 1.504.716.22.11.367.165.422.256.054.091.054.527-.148 1.097z" fill="#25D366"/>
  </svg>
);
export default function ArticlePage({ params }) {
  const { slug } = params;
  const router = useRouter();
  const pageRef = useRef();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  const tagColors = { "Guide":"#0B3D2E","Deep Dive":"#4A6FA5","Compliance":"#C17D2A","Tax Planning":"#5C7A4A","How-To":"#5C5C52","Update":"#7B4A9A" };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        // Fetch by slug
        const res = await fetch(
          `${CF_URL}?content_type=article&fields.slug=${slug}&limit=1`,
          { headers: { Authorization: `Bearer ${CF_TOKEN}` } }
        );
        const data = await res.json();
        if (!data.items?.length) { router.push("/knowledge-hub"); return; }
        const item = data.items[0];
        setArticle({
          id: item.sys.id,
          title: item.fields.title || "",
          slug: item.fields.slug || item.sys.id,
          category: item.fields.category || "General",
          summary: item.fields.summary || "",
          body: item.fields.body || null,
          date: item.fields.publishedDate ? new Date(item.fields.publishedDate).toLocaleDateString("en-IN",{month:"short",year:"numeric"}) : "",
          readTime: item.fields.readTime || "5 min read",
          tag: item.fields.tag || "Guide",
          author: item.fields.author || "Pankaj Gupta, FCA",
        });
        // Fetch related (same category)
        const cat = item.fields.category || "General";
        const res2 = await fetch(
          `${CF_URL}?content_type=article&fields.category=${cat}&limit=4`,
          { headers: { Authorization: `Bearer ${CF_TOKEN}` } }
        );
        const data2 = await res2.json();
        setRelated((data2.items || [])
          .filter(i => i.sys.id !== item.sys.id)
          .slice(0,3)
          .map(i => ({
            id: i.sys.id, title: i.fields.title, slug: i.fields.slug || i.sys.id,
            summary: i.fields.summary, tag: i.fields.tag || "Guide",
            date: i.fields.publishedDate ? new Date(i.fields.publishedDate).toLocaleDateString("en-IN",{month:"short",year:"numeric"}) : "",
          }))
        );
      } catch(e) { router.push("/knowledge-hub"); }
      finally { setLoading(false); }
    }
    load();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:T.ivory }}>
      <div style={{ fontSize:14, color:T.lt }}>Loading article…</div>
    </div>
  );
  if (!article) return null;

  // Render Contentful rich text body
  function renderBody(body) {
    if (!body) return <p style={{ color:T.mid }}>No content available.</p>;
    if (typeof body === "string") return <div dangerouslySetInnerHTML={{ __html: body }}/>;
    // Contentful rich text document
    if (body.nodeType === "document" && body.content) {
      return body.content.map((node, i) => {
        if (node.nodeType === "paragraph") {
          const text = node.content?.map(n => n.value || "").join("") || "";
          return <p key={i} style={{ fontSize:16, color:T.mid, lineHeight:1.88, marginBottom:20, fontWeight:300 }}>{text}</p>;
        }
        if (node.nodeType === "heading-2") {
          const text = node.content?.map(n => n.value || "").join("") || "";
          return <h2 key={i} className="font-display" style={{ fontSize:26, fontWeight:600, color:T.ch, marginTop:40, marginBottom:14, lineHeight:1.2 }}>{text}</h2>;
        }
        if (node.nodeType === "heading-3") {
          const text = node.content?.map(n => n.value || "").join("") || "";
          return <h3 key={i} className="font-display" style={{ fontSize:20, fontWeight:600, color:T.ch, marginTop:32, marginBottom:10 }}>{text}</h3>;
        }
        if (node.nodeType === "unordered-list") {
          return <ul key={i} style={{ paddingLeft:0, listStyle:"none", marginBottom:20 }}>
            {node.content?.map((li, j) => (
              <li key={j} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
                <span style={{ color:T.s, fontWeight:700, flexShrink:0, fontSize:14 }}>✓</span>
                <span style={{ fontSize:15, color:T.mid, lineHeight:1.72, fontWeight:300 }}>
                  {li.content?.[0]?.content?.map(n => n.value || "").join("") || ""}
                </span>
              </li>
            ))}
          </ul>;
        }
        if (node.nodeType === "ordered-list") {
          return <ol key={i} style={{ paddingLeft:0, listStyle:"none", marginBottom:20, counterReset:"item" }}>
            {node.content?.map((li, j) => (
              <li key={j} style={{ display:"flex", gap:12, marginBottom:12, alignItems:"flex-start" }}>
                <span style={{ background:T.f, color:"#fff", width:24, height:24, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, flexShrink:0 }}>{j+1}</span>
                <span style={{ fontSize:15, color:T.mid, lineHeight:1.72, fontWeight:300 }}>
                  {li.content?.[0]?.content?.map(n => n.value || "").join("") || ""}
                </span>
              </li>
            ))}
          </ol>;
        }
        if (node.nodeType === "blockquote") {
          const text = node.content?.[0]?.content?.map(n => n.value || "").join("") || "";
          return <blockquote key={i} style={{ borderLeft:`4px solid ${T.s}`, paddingLeft:20, marginLeft:0, marginBottom:20 }}>
            <p style={{ fontSize:16, color:T.mid, lineHeight:1.8, fontStyle:"italic", fontWeight:300 }}>{text}</p>
          </blockquote>;
        }
        return null;
      });
    }
    return <p style={{ color:T.mid }}>Content loading…</p>;
  }

  const WA_URL = "https://wa.me/919915731447?text=Hi%2C%20I%20read%20your%20article%20on%20" + encodeURIComponent(article.title) + "%20and%20have%20a%20question.";

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section style={{ background:T.f, padding:"100px 56px 52px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`, backgroundSize:"64px 64px" }}/>
        <div style={{ maxWidth:900, margin:"0 auto", position:"relative", zIndex:2 }}>
          <button onClick={() => router.push("/knowledge-hub")} style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", color:"rgba(255,255,255,.7)", padding:"7px 16px", borderRadius:50, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", marginBottom:32, display:"inline-flex", alignItems:"center", gap:6 }}>
            ← Knowledge Hub
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <span style={{ background:tagColors[article.tag] || T.f, color:"#fff", padding:"4px 14px", borderRadius:50, fontSize:11, fontWeight:700 }}>{article.tag}</span>
            <span style={{ fontSize:12, color:"rgba(255,255,255,.45)" }}>{article.category}</span>
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(28px,3.5vw,50px)", fontWeight:600, color:"#fff", lineHeight:1.08, marginBottom:18, textAlign:"left" }}>{article.title}</h1>
          <p style={{ fontSize:16, color:"rgba(255,255,255,.52)", lineHeight:1.8, marginBottom:24, maxWidth:700, textAlign:"left" }}>{article.summary}</p>
          <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
            {[`By ${article.author}`, article.date, article.readTime].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ fontSize:11, color:"rgba(255,255,255,.2)" }}>·</span>}
                <span style={{ fontSize:13, color:"rgba(255,255,255,.38)" }}>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Article body + sidebar */}
      <section style={{ padding:"52px 56px 80px", background:T.ivory }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 320px", gap:56, alignItems:"start" }} className="inner-page-layout">

          {/* Article body */}
          <div style={{ background:"#fff", borderRadius:16, padding:"44px 48px", border:`1px solid ${T.bdr}` }} className="article-body">
            {renderBody(article.body)}

            {/* Article footer CTA */}
            <div style={{ marginTop:48, paddingTop:32, borderTop:`1px solid ${T.bdr}` }}>
              <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:T.s, fontWeight:700, marginBottom:12 }}>Have a question about this topic?</div>
              <p style={{ fontSize:14, color:T.mid, lineHeight:1.7, marginBottom:20 }}>
                Our CA team advises foreign companies on {article.category.toLowerCase()} every day. Book a free 30-minute consultation.
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button className="ics-btn ics-btn-primary" onClick={() => router.push({ contact:"/contact" }["contact"] || "/")}>Book Free Consultation →</button>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#25D366", color:"#fff", padding:"10px 18px", borderRadius:8, fontSize:13.5, fontWeight:600, textDecoration:"none" }}>
                  <WASvg/> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="inner-sticky" style={{ position:"sticky", top:90, display:"flex", flexDirection:"column", gap:20 }}>
            {/* About author */}
            <div style={{ background:"#fff", borderRadius:14, padding:"24px 22px", border:`1px solid ${T.bdr}` }}>
              <div style={{ fontSize:9.5, letterSpacing:2, textTransform:"uppercase", color:T.s, fontWeight:700, marginBottom:12 }}>Written by</div>
              <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:14 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg,${T.f},#155C46)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span className="font-display" style={{ fontSize:18, fontWeight:700, color:"#fff" }}>PG</span>
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:T.ch }}>Pankaj Gupta, FCA</div>
                  <div style={{ fontSize:12, color:T.lt, lineHeight:1.5 }}>Managing Partner, PGA & Co.<br/>Diploma in International Taxation</div>
                </div>
              </div>
              <p style={{ fontSize:12.5, color:T.mid, lineHeight:1.65 }}>8 years at KPMG International Tax & Advisory. 100+ foreign companies incorporated in India.</p>
            </div>

            {/* CTA card */}
            <div style={{ background:T.f, borderRadius:14, padding:"24px 22px" }}>
              <div style={{ fontSize:15, fontWeight:600, color:"#fff", marginBottom:10, lineHeight:1.3 }}>Need advice on this topic?</div>
              <p style={{ fontSize:12.5, color:"rgba(255,255,255,.55)", lineHeight:1.65, marginBottom:16 }}>Free 30-minute consultation. Senior CA responds within 24 hours.</p>
              <button className="ics-btn ics-btn-primary" onClick={() => router.push({ contact:"/contact" }["contact"] || "/")} style={{ width:"100%", justifyContent:"center", fontSize:13 }}>Book Free Consultation →</button>
              <div style={{ marginTop:12, fontSize:11.5, color:"rgba(255,255,255,.4)", textAlign:"center" }}>No commitment · Confidential · 24hr response</div>
            </div>

            {/* Guide download */}
            <div style={{ background:T.stone, borderRadius:14, padding:"20px 20px", border:`1px solid ${T.bdr}`, display:"flex", gap:14, alignItems:"center" }}>
              <span style={{ fontSize:24 }}>📋</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:T.ch, marginBottom:3 }}>India Entry Guide</div>
                <div style={{ fontSize:11.5, color:T.lt }}>Free · 8 pages · Plain English</div>
              </div>
              <a href="/India-Entry-Checklist-IndiaCompanySetup.pdf" target="_blank" rel="noopener noreferrer"
                onClick={() => trackGuideDownload()}
                style={{ fontSize:12, fontWeight:600, color:T.f, textDecoration:"none", whiteSpace:"nowrap" }}>
                Download ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ padding:"56px 56px 80px", background:"#fff" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:T.s, fontWeight:600, marginBottom:20 }}>Related Articles</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }} className="inner-service-cards">
              {related.map(r => (
                <div key={r.id} className="card-lift" onClick={() => router.push("/knowledge-hub/" + r.slug)}
                  style={{ background:T.ivory, border:`1px solid ${T.bdr}`, borderRadius:14, padding:"24px 22px", cursor:"pointer" }}>
                  <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:T.s, marginBottom:8 }}>{r.tag}</div>
                  <h3 className="font-display" style={{ fontSize:17, fontWeight:600, color:T.ch, lineHeight:1.3, marginBottom:8 }}>{r.title}</h3>
                  <p style={{ fontSize:13, color:T.mid, lineHeight:1.65, fontWeight:300, marginBottom:12 }}>{r.summary?.substring(0,120)}…</p>
                  <div style={{ fontSize:12, color:T.lt }}>{r.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
