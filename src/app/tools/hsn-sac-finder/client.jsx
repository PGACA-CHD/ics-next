'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';
import { HSN_HEADINGS } from './hsn-data';

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const HSN_CHAPTERS = [
  { ch: '01', desc: 'Live animals' },
  { ch: '02', desc: 'Meat and edible meat offal' },
  { ch: '03', desc: 'Fish and crustaceans, molluscs and other aquatic invertebrates' },
  { ch: '04', desc: 'Dairy produce; birds\' eggs; natural honey; edible products of animal origin' },
  { ch: '05', desc: 'Products of animal origin, not elsewhere specified' },
  { ch: '06', desc: 'Live trees and other plants; bulbs, roots; cut flowers and ornamental foliage' },
  { ch: '07', desc: 'Edible vegetables and certain roots and tubers' },
  { ch: '08', desc: 'Edible fruit and nuts; peel of citrus fruit or melons' },
  { ch: '09', desc: 'Coffee, tea, maté and spices' },
  { ch: '10', desc: 'Cereals' },
  { ch: '11', desc: 'Products of the milling industry; malt; starches; inulin; wheat gluten' },
  { ch: '12', desc: 'Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit' },
  { ch: '13', desc: 'Lac; gums, resins and other vegetable saps and extracts' },
  { ch: '14', desc: 'Vegetable plaiting materials; vegetable products not elsewhere specified' },
  { ch: '15', desc: 'Animal or vegetable fats and oils and their cleavage products' },
  { ch: '16', desc: 'Preparations of meat, of fish or of crustaceans, molluscs or other aquatic invertebrates' },
  { ch: '17', desc: 'Sugars and sugar confectionery' },
  { ch: '18', desc: 'Cocoa and cocoa preparations' },
  { ch: '19', desc: 'Preparations of cereals, flour, starch or milk; pastrycooks\' products' },
  { ch: '20', desc: 'Preparations of vegetables, fruit, nuts or other parts of plants' },
  { ch: '21', desc: 'Miscellaneous edible preparations' },
  { ch: '22', desc: 'Beverages, spirits and vinegar' },
  { ch: '23', desc: 'Residues and waste from the food industries; prepared animal fodder' },
  { ch: '24', desc: 'Tobacco and manufactured tobacco substitutes' },
  { ch: '25', desc: 'Salt; sulphur; earths and stone; plastering materials, lime and cement' },
  { ch: '26', desc: 'Ores, slag and ash' },
  { ch: '27', desc: 'Mineral fuels, mineral oils and products of their distillation' },
  { ch: '28', desc: 'Inorganic chemicals; organic or inorganic compounds of precious metals' },
  { ch: '29', desc: 'Organic chemicals' },
  { ch: '30', desc: 'Pharmaceutical products' },
  { ch: '31', desc: 'Fertilisers' },
  { ch: '32', desc: 'Tanning or dyeing extracts; tannins; dyes, pigments, paints, varnishes, inks' },
  { ch: '33', desc: 'Essential oils and resinoids; perfumery, cosmetic or toilet preparations' },
  { ch: '34', desc: 'Soap, organic surface-active agents, washing preparations, lubricating preparations' },
  { ch: '35', desc: 'Albuminoidal substances; modified starches; glues; enzymes' },
  { ch: '36', desc: 'Explosives; pyrotechnic products; matches; pyrophoric alloys' },
  { ch: '37', desc: 'Photographic or cinematographic goods' },
  { ch: '38', desc: 'Miscellaneous chemical products' },
  { ch: '39', desc: 'Plastics and articles thereof' },
  { ch: '40', desc: 'Rubber and articles thereof' },
  { ch: '41', desc: 'Raw hides and skins (other than furskins) and leather' },
  { ch: '42', desc: 'Articles of leather; saddlery and harness; travel goods; handbags; articles of animal gut' },
  { ch: '43', desc: 'Furskins and artificial fur; manufactures thereof' },
  { ch: '44', desc: 'Wood and articles of wood; wood charcoal' },
  { ch: '45', desc: 'Cork and articles of cork' },
  { ch: '46', desc: 'Manufactures of straw, of esparto or of other plaiting materials; basketware' },
  { ch: '47', desc: 'Pulp of wood or of other fibrous cellulosic material; recovered (waste and scrap) paper' },
  { ch: '48', desc: 'Paper and paperboard; articles of paper pulp, of paper or of paperboard' },
  { ch: '49', desc: 'Printed books, newspapers, pictures and other products of the printing industry' },
  { ch: '50', desc: 'Silk' },
  { ch: '51', desc: 'Wool, fine or coarse animal hair; horsehair yarn and woven fabric' },
  { ch: '52', desc: 'Cotton' },
  { ch: '53', desc: 'Other vegetable textile fibres; paper yarn and woven fabrics of paper yarn' },
  { ch: '54', desc: 'Man-made filaments; strip and the like of man-made textile materials' },
  { ch: '55', desc: 'Man-made staple fibres' },
  { ch: '56', desc: 'Wadding, felt and nonwovens; special yarns; twine, cordage, ropes and cables' },
  { ch: '57', desc: 'Carpets and other textile floor coverings' },
  { ch: '58', desc: 'Special woven fabrics; tufted textile fabrics; lace; tapestries; trimmings; embroidery' },
  { ch: '59', desc: 'Impregnated, coated, covered or laminated textile fabrics; textile articles for industrial use' },
  { ch: '60', desc: 'Knitted or crocheted fabrics' },
  { ch: '61', desc: 'Articles of apparel and clothing accessories, knitted or crocheted' },
  { ch: '62', desc: 'Articles of apparel and clothing accessories, not knitted or crocheted' },
  { ch: '63', desc: 'Other made-up textile articles; sets; worn clothing and worn textile articles; rags' },
  { ch: '64', desc: 'Footwear, gaiters and the like; parts of such articles' },
  { ch: '65', desc: 'Headgear and parts thereof' },
  { ch: '66', desc: 'Umbrellas, sun umbrellas, walking-sticks, seat-sticks, whips, riding-crops' },
  { ch: '67', desc: 'Prepared feathers and down; artificial flowers; articles of human hair' },
  { ch: '68', desc: 'Articles of stone, plaster, cement, asbestos, mica or similar materials' },
  { ch: '69', desc: 'Ceramic products' },
  { ch: '70', desc: 'Glass and glassware' },
  { ch: '71', desc: 'Natural or cultured pearls, precious or semi-precious stones, precious metals, jewellery' },
  { ch: '72', desc: 'Iron and steel' },
  { ch: '73', desc: 'Articles of iron or steel' },
  { ch: '74', desc: 'Copper and articles thereof' },
  { ch: '75', desc: 'Nickel and articles thereof' },
  { ch: '76', desc: 'Aluminium and articles thereof' },
  { ch: '77', desc: 'Reserved for possible future use in the harmonized system' },
  { ch: '78', desc: 'Lead and articles thereof' },
  { ch: '79', desc: 'Zinc and articles thereof' },
  { ch: '80', desc: 'Tin and articles thereof' },
  { ch: '81', desc: 'Other base metals; cermets; articles thereof' },
  { ch: '82', desc: 'Tools, implements, cutlery, spoons and forks, of base metal' },
  { ch: '83', desc: 'Miscellaneous articles of base metal' },
  { ch: '84', desc: 'Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof' },
  { ch: '85', desc: 'Electrical machinery and equipment; sound recorders and reproducers; TV image and sound recorders' },
  { ch: '86', desc: 'Railway or tramway locomotives, rolling-stock and parts thereof' },
  { ch: '87', desc: 'Vehicles other than railway or tramway rolling-stock, and parts and accessories thereof' },
  { ch: '88', desc: 'Aircraft, spacecraft, and parts thereof' },
  { ch: '89', desc: 'Ships, boats and floating structures' },
  { ch: '90', desc: 'Optical, photographic, cinematographic, measuring, checking, precision, medical or surgical instruments' },
  { ch: '91', desc: 'Clocks and watches and parts thereof' },
  { ch: '92', desc: 'Musical instruments; parts and accessories of such articles' },
  { ch: '93', desc: 'Arms and ammunition; parts and accessories thereof' },
  { ch: '94', desc: 'Furniture; bedding, mattresses, mattress supports; lamps and lighting fittings; prefabricated buildings' },
  { ch: '95', desc: 'Toys, games and sports requisites; parts and accessories thereof' },
  { ch: '96', desc: 'Miscellaneous manufactured articles' },
  { ch: '97', desc: 'Works of art, collectors\' pieces and antiques' },
  { ch: '98', desc: 'Project imports, laboratory chemicals, passenger baggage, personal imports (India-specific)' },
  { ch: '99', desc: 'Miscellaneous; services (India-specific GST provisions)' },
];

const SAC_CODES = [
  { code: '9954', desc: 'Construction services', gst: '5% / 12% / 18% (varies by type)' },
  { code: '9961', desc: 'Services in wholesale trade (commission agents, brokers)', gst: '18%' },
  { code: '9962', desc: 'Services in retail trade', gst: '18%' },
  { code: '9963', desc: 'Accommodation, food and beverage services', gst: 'Nil / 5% / 12% / 18%' },
  { code: '9964', desc: 'Passenger transport services', gst: 'Nil / 5% / 12% / 18%' },
  { code: '9965', desc: 'Goods transport services (GTA, courier, etc.)', gst: 'Nil / 5% / 12%' },
  { code: '9966', desc: 'Rental services of transport vehicles with operators', gst: '5% / 12% / 18%' },
  { code: '9967', desc: 'Supporting services in transport (loading, warehousing, etc.)', gst: '18%' },
  { code: '9968', desc: 'Postal and courier services', gst: 'Nil / 18%' },
  { code: '9969', desc: 'Electricity, gas, water and other distribution services', gst: '18%' },
  { code: '9971', desc: 'Financial and related services (banking, investment, insurance)', gst: '18% (banking); 18% (non-life insurance); Exempt (life insurance — partial)' },
  { code: '9972', desc: 'Real estate services (sale, rental, property management)', gst: '5% / 12% / 18%' },
  { code: '9973', desc: 'Leasing or rental services without operator', gst: '18%' },
  { code: '9981', desc: 'Research and development services', gst: '18%' },
  { code: '9982', desc: 'Legal and accounting / auditing services', gst: '18%' },
  { code: '9983', desc: 'Other professional, technical and business services (consulting, engineering, advertising)', gst: '18%' },
  { code: '9984', desc: 'Telecommunications, broadcasting and information supply services', gst: '18%' },
  { code: '9985', desc: 'Support services (cleaning, security, staffing / manpower supply)', gst: '18%' },
  { code: '9986', desc: 'Support services to agriculture, forestry, fishing and animal husbandry', gst: 'Nil / 18%' },
  { code: '9987', desc: 'Maintenance, repair and installation (except construction)', gst: '18%' },
  { code: '9988', desc: 'Manufacturing services on physical inputs owned by others (job work)', gst: '5% / 12% / 18%' },
  { code: '9989', desc: 'Other manufacturing services; publishing, printing and reproduction services', gst: '18%' },
  { code: '9991', desc: 'Public administration and other government services (exempt)', gst: 'Exempt' },
  { code: '9992', desc: 'Education services', gst: 'Exempt / 18%' },
  { code: '9993', desc: 'Human health and social care services', gst: 'Exempt / 5% / 12% / 18%' },
  { code: '9994', desc: 'Sewage and waste collection, treatment and disposal services', gst: 'Nil / 18%' },
  { code: '9995', desc: 'Services of membership organisations', gst: '18%' },
  { code: '9996', desc: 'Recreational, cultural and sporting services', gst: '18% / 28%' },
  { code: '9997', desc: 'Other services (laundry, beauty, funeral, domestic, etc.)', gst: '18%' },
  { code: '9998', desc: 'Domestic services', gst: 'Exempt' },
  { code: '9999', desc: 'Services provided by extraterritorial organisations and bodies', gst: 'Exempt' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Page() {
  const [mode, setMode] = useState('hsn');      // hsn | sac
  const [view, setView] = useState('search');   // search | browse
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const debounceRef = useRef(null);

  // Browse mode filters
  const lq = q.trim().toLowerCase();

  // HSN: search through 4/6-digit headings; fall back to chapters if no match
  const hsnHeadingFilter = lq
    ? HSN_HEADINGS.filter(c => c.code.startsWith(q.trim()) || c.desc.toLowerCase().includes(lq))
    : HSN_HEADINGS;

  // Chapter-level (2-digit) browse used as an overview/index when no filter
  const chapterFilter = lq
    ? HSN_CHAPTERS.filter(c => c.ch.startsWith(q.trim()) || c.desc.toLowerCase().includes(lq))
    : HSN_CHAPTERS;

  const sacFilter = lq
    ? SAC_CODES.filter(c => c.code.startsWith(q.trim()) || c.desc.toLowerCase().includes(lq))
    : SAC_CODES;

  // Code level badge helper
  const codeLevelBadge = (code) => {
    const len = code.replace(/\s/g, '').length;
    const label = len <= 2 ? 'Chapter' : len <= 4 ? 'Heading' : 'Subheading';
    const bg = len <= 2 ? '#E8EAF0' : len <= 4 ? '#E4F0EB' : '#FDE8CC';
    const color = len <= 2 ? '#3A4066' : len <= 4 ? T.f : '#8B4F00';
    return <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10, background: bg, color, marginLeft: 6, whiteSpace: 'nowrap' }}>{label}</span>;
  };

  async function doSearch(query, type) {
    if (!query || query.length < 2) { setResults(null); return; }
    setLoading(true);
    setApiError(false);
    try {
      const res = await fetch(`/api/hsn-sac?q=${encodeURIComponent(query)}&type=${type}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.results || []);
    } catch {
      setApiError(true);
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (view !== 'search') return;
    clearTimeout(debounceRef.current);
    if (!q.trim() || q.length < 2) { setResults(null); return; }
    debounceRef.current = setTimeout(() => doSearch(q, mode.toUpperCase()), 600);
    return () => clearTimeout(debounceRef.current);
  }, [q, mode, view]);

  const inputStyle = { width: '100%', padding: '12px 14px 12px 42px', fontSize: 15, border: `1.5px solid ${T.bdr}`, borderRadius: 10, background: '#fff', color: T.ch, fontFamily: 'inherit' };
  const thStyle = { padding: '11px 16px', fontSize: 11.5, fontWeight: 700, color: T.lt, textAlign: 'left', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: `2px solid ${T.bdr}`, background: T.stone };
  const tdStyle = { padding: '11px 16px', fontSize: 13, color: T.ink, verticalAlign: 'top', borderBottom: `1px solid ${T.bdr}` };

  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#6B3A2E', padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 90% 50%, rgba(232,144,10,.09) 0%, transparent 55%)' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block' }}>← Back to Tools</Link>
          <div style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>
            GST · CBIC Data
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>
            HSN / SAC Code Finder
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 680 }}>
            Find the correct HSN code for goods or SAC code for services. Search by description or code — results include <strong style={{ color: 'rgba(255,255,255,.8)' }}>4-digit headings and 6-digit subheadings</strong> across all 99 chapters. For 8-digit codes, live CBIC search is available.
          </p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '48px 40px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                Every GST invoice in India must carry either an HSN (Harmonised System of Nomenclature) code for goods or a SAC (Services Accounting Code) for services. The CBIC mandates HSN code usage based on annual turnover: businesses with turnover above ₹5 crore must use 8-digit HSN codes, those with ₹1.5–5 crore turnover must use 6-digit codes, and those below ₹1.5 crore must use 4-digit codes. Using an incorrect HSN or SAC code on an invoice can lead to mismatches in GST returns, disputes during audits, and denial of input tax credit to the recipient.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                The HSN system is an internationally standardised commodity classification framework developed by the World Customs Organisation, adopted by over 200 countries. In India, the GST Council has mapped all goods to their respective HSN codes and assigned applicable GST rates — 0%, 5%, 12%, 18%, or 28% — at the 4-digit, 6-digit, and 8-digit levels. The same good may carry different GST rates depending on its specific 8-digit classification, so selecting the most precise code available for your product is important for correct tax computation.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                SAC codes, by contrast, are India-specific and always begin with "99". They classify services into categories such as IT services (998), legal services (9982), construction (9954), health (9993), and education (9992), among others. Unlike HSN codes, SAC codes use a 6-digit structure. Every service supplied under GST must be classified under an SAC code, and the applicable GST rate depends on the specific SAC category — for example, most IT and software services attract 18% GST, while certain health and education services may be exempt.
              </p>
              <p style={{ fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                This HSN/SAC finder lets you search by description or code number across all 99 HSN chapters (4-digit headings and 6-digit subheadings) and major SAC categories. Results include the applicable GST rate where standardised. For 8-digit HSN codes with product-specific rates, the tool links directly to the official CBIC search portal. Switch between HSN and SAC modes using the tab selector above the search. Built using CBIC classification data by our Ex-Big 4 CA team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section style={{ background: T.stone, padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>

          {/* Type selector */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: 6, width: 'fit-content' }}>
            {[['hsn', '📦 HSN Codes (Goods)'], ['sac', '🛠️ SAC Codes (Services)']].map(([v, l]) => (
              <button key={v} onClick={() => { setMode(v); setResults(null); setQ(''); }}
                style={{ padding: '9px 22px', fontSize: 13.5, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: mode === v ? T.f : 'transparent', color: mode === v ? '#fff' : T.mid, transition: 'all .18s' }}>
                {l}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[['search', '🔍 Live Search'], ['browse', '📂 Browse All']].map(([v, l]) => (
              <button key={v} onClick={() => { setView(v); setResults(null); }}
                style={{ padding: '7px 16px', fontSize: 12.5, fontWeight: 600, borderRadius: 8, border: `1.5px solid ${view === v ? T.f : T.bdr}`, cursor: 'pointer',
                  background: view === v ? '#E4F0EB' : '#fff', color: view === v ? T.f : T.mid }}>
                {l}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div style={{ position: 'relative', marginBottom: 28 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: T.lt }}>🔍</span>
            <input value={q} onChange={e => setQ(e.target.value)}
              placeholder={view === 'search' ? `Search ${mode === 'hsn' ? 'HSN by code or description (e.g. "cotton" or "5201")' : 'SAC by service or code (e.g. "legal" or "9982")'}…` : `Filter ${mode === 'hsn' ? 'chapters' : 'SAC categories'}…`}
              style={inputStyle} />
            {loading && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: T.lt }}>Searching…</span>}
          </div>

          {/* ── SEARCH MODE ── */}
          {view === 'search' && (
            <div>
              {apiError && (
                <div style={{ background: '#FFF3E0', border: '1px solid #FFB74D', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: '#7A4100', marginBottom: 6 }}>⚠️ Live search unavailable</div>
                  <p style={{ fontSize: 13, color: '#7A4100', margin: 0, lineHeight: 1.6 }}>
                    Could not connect to the CBIC search API. Please use the <button onClick={() => setView('browse')} style={{ background: 'none', border: 'none', color: '#C84B00', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 13 }}>Browse All</button> view, or visit the official <a href="https://services.gst.gov.in/services/searchhsnsac" target="_blank" rel="noopener noreferrer" style={{ color: '#C84B00', fontWeight: 600 }}>GSTN HSN/SAC search portal ↗</a>.
                  </p>
                </div>
              )}

              {!q || q.length < 2 ? (
                <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '48px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>🔍</div>
                  <div style={{ fontSize: 15, color: T.mid }}>Type at least 2 characters to search</div>
                  <div style={{ fontSize: 13, color: T.lt, marginTop: 8 }}>E.g. "cotton fabric", "0601", "legal services", "9982"</div>
                  <div style={{ marginTop: 24 }}>
                    <button onClick={() => setView('browse')} style={{ padding: '10px 22px', fontSize: 13.5, fontWeight: 600, background: T.stone, color: T.ink, border: `1px solid ${T.bdr}`, borderRadius: 8, cursor: 'pointer' }}>
                      Browse all {mode === 'hsn' ? 'HSN chapters' : 'SAC categories'} →
                    </button>
                  </div>
                </div>
              ) : results && results.length === 0 ? (
                <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '40px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, color: T.mid, marginBottom: 12 }}>No results found for <strong>"{q}"</strong></div>
                  <a href="https://services.gst.gov.in/services/searchhsnsac" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, color: T.f, fontWeight: 600 }}>
                    Try the official CBIC search portal ↗
                  </a>
                </div>
              ) : results && results.length > 0 ? (
                <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                    <thead>
                      <tr>
                        <th style={{ ...thStyle, width: 120 }}>{mode === 'hsn' ? 'HSN Code' : 'SAC Code'}</th>
                        <th style={thStyle}>Description</th>
                        {mode === 'hsn' && <th style={{ ...thStyle, width: 120 }}>Chapter</th>}
                        {results[0]?.gst && <th style={{ ...thStyle, width: 140 }}>GST Rate</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF5' }}>
                          <td style={{ ...tdStyle, fontWeight: 700, color: '#6B3A2E', fontSize: 14, fontFamily: 'monospace' }}>{r.code}</td>
                          <td style={tdStyle}>{r.desc || r.description}</td>
                          {mode === 'hsn' && <td style={{ ...tdStyle, color: T.mid, fontSize: 12.5 }}>{r.chapter || r.code?.slice(0, 2)}</td>}
                          {r.gst && <td style={{ ...tdStyle, fontWeight: 600, color: T.f }}>{r.gst}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          )}

          {/* ── BROWSE MODE ── */}
          {view === 'browse' && mode === 'hsn' && (
            <div>
              {!lq ? (
                // No filter — show chapter index as navigation
                <div>
                  <div style={{ fontSize: 13, color: T.mid, marginBottom: 16 }}>
                    Showing all <strong>99 chapters</strong> (2-digit). Type a keyword, description, or code prefix above to browse <strong>4-digit headings</strong> and <strong>6-digit subheadings</strong> (500+ codes available).
                  </div>
                  <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 440 }}>
                      <thead>
                        <tr>
                          <th style={{ ...thStyle, width: 100 }}>Chapter</th>
                          <th style={thStyle}>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {HSN_CHAPTERS.map((c, i) => (
                          <tr key={c.ch} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF5', cursor: 'pointer' }}
                            onClick={() => setQ(c.ch)}>
                            <td style={{ ...tdStyle, fontWeight: 700, color: '#6B3A2E', fontSize: 14, fontFamily: 'monospace' }}>
                              {c.ch}
                              {codeLevelBadge(c.ch)}
                            </td>
                            <td style={{ ...tdStyle, color: T.mid }}>{c.desc}
                              <span style={{ fontSize: 11.5, color: T.f, marginLeft: 8 }}>→ click to expand</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : hsnHeadingFilter.length > 0 ? (
                // Filtered — show 4/6-digit headings
                <div>
                  <div style={{ fontSize: 13, color: T.mid, marginBottom: 16 }}>
                    <strong>{hsnHeadingFilter.length}</strong> code{hsnHeadingFilter.length !== 1 ? 's' : ''} matching <em>"{q}"</em> — showing 4-digit headings and 6-digit subheadings.
                    {hsnHeadingFilter.length === 0 && <> No matches. Try the <a href="https://services.gst.gov.in/services/searchhsnsac" target="_blank" rel="noopener noreferrer" style={{ color: T.f, fontWeight: 600 }}>CBIC portal ↗</a> for full 8-digit codes.</>}
                  </div>
                  <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
                      <thead>
                        <tr>
                          <th style={{ ...thStyle, width: 160 }}>HSN Code</th>
                          <th style={{ ...thStyle, width: 80 }}>Chapter</th>
                          <th style={thStyle}>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hsnHeadingFilter.slice(0, 200).map((c, i) => (
                          <tr key={`${c.code}-${i}`} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF5' }}>
                            <td style={{ ...tdStyle, fontWeight: 700, color: '#6B3A2E', fontSize: 14, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                              {c.code}
                              {codeLevelBadge(c.code)}
                            </td>
                            <td style={{ ...tdStyle, color: T.mid, fontSize: 12.5 }}>{c.ch}</td>
                            <td style={tdStyle}>{c.desc}</td>
                          </tr>
                        ))}
                        {hsnHeadingFilter.length > 200 && (
                          <tr><td colSpan={3} style={{ ...tdStyle, textAlign: 'center', color: T.lt, fontSize: 12.5 }}>
                            Showing first 200 of {hsnHeadingFilter.length} results. Refine your search.
                          </td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '36px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, color: T.mid, marginBottom: 10 }}>No codes found for <strong>"{q}"</strong></div>
                  <a href="https://services.gst.gov.in/services/searchhsnsac" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, color: T.f, fontWeight: 600 }}>Search the CBIC portal for 8-digit codes ↗</a>
                </div>
              )}
            </div>
          )}

          {view === 'browse' && mode === 'sac' && (
            <div>
              <div style={{ fontSize: 13, color: T.mid, marginBottom: 16 }}>Showing {sacFilter.length} major SAC categories. For detailed 6-digit SAC codes, use the Search tab or visit the <a href="https://services.gst.gov.in/services/searchhsnsac" target="_blank" rel="noopener noreferrer" style={{ color: T.f, fontWeight: 600 }}>official CBIC portal ↗</a>.</div>
              <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
                  <thead>
                    <tr>
                      <th style={{ ...thStyle, width: 110 }}>SAC Code</th>
                      <th style={thStyle}>Service Description</th>
                      <th style={{ ...thStyle, width: 200 }}>Applicable GST Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sacFilter.map((c, i) => (
                      <tr key={c.code} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF5' }}>
                        <td style={{ ...tdStyle, fontWeight: 700, color: '#6B3A2E', fontSize: 14, fontFamily: 'monospace' }}>{c.code}</td>
                        <td style={tdStyle}>{c.desc}</td>
                        <td style={{ ...tdStyle, fontSize: 12.5, color: T.f, fontWeight: 600 }}>{c.gst}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Info cards */}
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              ['What is HSN?', 'Harmonised System of Nomenclature (HSN) is an internationally standardised system for classifying traded goods. In India, HSN codes are mandatory on GST invoices for businesses with turnover above ₹5 crore (8 digits); ₹1.5–5 crore (4 digits).'],
              ['What is SAC?', 'Services Accounting Code (SAC) is used to classify services under GST. Every service supplied must carry a 6-digit SAC code on the GST invoice. SAC codes always start with 99.'],
              ['Official Source', 'For authoritative and up-to-date HSN/SAC codes including GST rates, visit the CBIC GST portal at services.gst.gov.in. This tool uses CBIC data and a static reference for common codes.'],
            ].map(([title, text]) => (
              <div key={title} style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ch, marginBottom: 7 }}>{title}</div>
                <p style={{ fontSize: 12.5, color: T.mid, lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <a href="https://services.gst.gov.in/services/searchhsnsac" target="_blank" rel="noopener noreferrer"
              className="ics-btn ics-btn-outline" style={{ display: 'inline-flex' }}>
              Open Official CBIC HSN/SAC Search ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
