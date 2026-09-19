'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T } from '@/lib/config';
import { DTAA_COUNTRIES } from './dtaa-data';

const REGIONS = ['All', 'Asia-Pacific', 'Europe', 'Americas', 'Middle East & Africa'];

const helvetica = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

export default function Page() {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState('All');
  const [sel, setSel] = useState(null);

  const filtered = useMemo(() => {
    const lq = q.toLowerCase();
    return DTAA_COUNTRIES.filter(c =>
      (region === 'All' || c.region === region) &&
      (!lq || c.country.toLowerCase().includes(lq))
    );
  }, [q, region]);

  const thS = { ...helvetica, padding: '10px 14px', fontSize: 11.5, fontWeight: 600, color: T.mid, textAlign: 'left', borderBottom: `2px solid ${T.bdr}`, background: '#fff', whiteSpace: 'nowrap' };
  const tdS = { ...helvetica, padding: '10px 14px', fontSize: 13, color: T.ink, borderBottom: `1px solid ${T.bdr}`, verticalAlign: 'middle' };
  const rateCell = (r) => <span style={{ fontWeight: 700, color: r === 'N/A' ? T.lt : T.f }}>{r}</span>;

  return (
    <div style={helvetica}>
      {/* Hero — unchanged */}
      <section style={{ backgroundImage: "url('/banners and logos/DTAA RATE FINDER.png')", backgroundSize: "cover", backgroundPosition: "center", padding: '100px 40px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link href="/tools" style={{ ...helvetica, fontSize: 12.5, color: 'rgba(255,255,255,.45)', marginBottom: 18, display: 'inline-block' }}>← Back to Tools</Link>
          <div style={{ ...helvetica, display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: T.sl, fontWeight: 600, marginBottom: 16, padding: '4px 12px', border: '1px solid rgba(245,168,40,.25)', borderRadius: 20 }}>90+ Countries</div>
          <h1 className="font-display" style={{ ...helvetica, fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: 14 }}>DTAA Rate Finder</h1>
          <p style={{ ...helvetica, fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, maxWidth: 680 }}>
            India's Double Tax Avoidance Agreement withholding tax rates — dividends, interest, royalties and FTS with {DTAA_COUNTRIES.length}+ treaty countries.
          </p>
        </div>
      </section>

      {/* SEO / intro — white bg */}
      <section style={{ background: '#fff', padding: '48px 40px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="seo-2col">
            <div>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                When a foreign company or individual receives income from India — dividends, interest, royalties, or fees for technical services — they are ordinarily subject to Indian withholding tax (TDS) at domestic rates, which can be as high as 40% for foreign companies. India's network of Double Tax Avoidance Agreements (DTAAs) with over 90 countries allows qualifying non-residents to reduce this withholding tax to treaty-specified rates — often 10–15% on dividends and interest, and 10% on royalties — provided the correct documentation is in place.
              </p>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                To claim treaty benefits, a non-resident must hold a valid Tax Residency Certificate (TRC) issued by the tax authority of their home country. They must also file Form 10F with the Indian payer before the payment is made. Without these documents, the Indian payer is required to deduct TDS at the higher domestic rate under Section 206AA. The treaty rate applies only if the non-resident is the "beneficial owner" of the income — conduit arrangements or pass-through structures may be challenged by Indian tax authorities under General Anti-Avoidance Rules (GAAR).
              </p>
            </div>
            <div>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}>
                DTAA rates vary significantly by country and income type. For example, India's treaty with Singapore provides a 10% rate on dividends for substantial holdings, while the treaty with Mauritius offers different rates depending on the payment type. Some treaties also provide a "Most Favoured Nation" (MFN) clause, which may entitle the non-resident to rates lower than those explicitly listed in the treaty if India signs a more favourable treaty with another OECD country. The MFN clause requires careful analysis and has been subject to recent judicial controversy in India.
              </p>
              <p style={{ ...helvetica, fontSize: 15, color: T.mid, lineHeight: 1.85, fontWeight: 300 }}>
                This DTAA Rate Finder covers withholding tax rates for four income categories — dividends, interest, royalties, and fees for technical services (FTS) — across all major treaty countries, with notes on specific conditions and TRC requirements. For non-resident payments under Section 195, use this tool alongside our TDS Rate Chart to compare treaty rates against domestic rates and determine the applicable deduction rate. Built by our Ex-Big 4 CA team based on current India DTAA schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool section — white bg */}
      <section style={{ background: '#fff', padding: '48px 40px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* How to use */}
          <div style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, padding: '20px 24px', marginBottom: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {[['1. Get TRC', 'Obtain a Tax Residency Certificate from the treaty country\'s tax authority.'], ['2. File Form 10F', 'Submit Form 10F with the Indian payer before payment is made.'], ['3. Claim Lower Rate', 'Payer deducts TDS at the treaty rate instead of the domestic rate.']].map(([t, d]) => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, background: T.f, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ ...helvetica, color: '#fff', fontSize: 11, fontWeight: 700 }}>{t[0]}</span>
                </div>
                <div>
                  <div style={{ ...helvetica, fontSize: 12.5, fontWeight: 700, color: T.ch }}>{t}</div>
                  <div style={{ ...helvetica, fontSize: 12, color: T.mid, lineHeight: 1.55 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search & filter */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flexGrow: 1, minWidth: 200 }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.lt }}>🔍</span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search country…"
                style={{ ...helvetica, width: '100%', padding: '9px 14px 9px 34px', fontSize: 14, border: `1.5px solid ${T.bdr}`, borderRadius: 8, background: '#fff', color: T.ch }} />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {REGIONS.map(r => (
                <button key={r} onClick={() => setRegion(r)}
                  style={{ ...helvetica, padding: '7px 14px', fontSize: 12.5, fontWeight: 600, borderRadius: 7, border: 'none', cursor: 'pointer', background: region === r ? T.f : '#f5f5f5', color: region === r ? '#fff' : T.mid, transition: 'all .15s' }}>
                  {r}
                </button>
              ))}
            </div>
            <div style={{ ...helvetica, fontSize: 12.5, color: T.lt, whiteSpace: 'nowrap' }}>{filtered.length} countr{filtered.length !== 1 ? 'ies' : 'y'}</div>
          </div>

          {/* Table */}
          <div className="comparison-table-wrap" style={{ background: '#fff', border: `1px solid ${T.bdr}`, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
              <thead>
                <tr>
                  <th style={{ ...thS, width: 180 }}>Country</th>
                  <th style={{ ...thS, width: 110 }}>Dividend</th>
                  <th style={{ ...thS, width: 110 }}>Interest</th>
                  <th style={{ ...thS, width: 110 }}>Royalties</th>
                  <th style={{ ...thS, width: 110 }}>FTS</th>
                  <th style={{ ...thS, width: 80 }}>TRC Reqd</th>
                  <th style={thS}>Key Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ ...tdS, textAlign: 'center', padding: 32, color: T.lt }}>No countries found.</td></tr>
                ) : filtered.map((c, i) => (
                  <tr key={c.country} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA', cursor: 'pointer' }}
                    onClick={() => setSel(sel?.country === c.country ? null : c)}>
                    <td style={tdS}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{c.flag}</span>
                        <div>
                          <div style={{ ...helvetica, fontWeight: 600, color: T.ch, fontSize: 13.5 }}>{c.country}</div>
                          <div style={{ ...helvetica, fontSize: 11, color: T.lt }}>{c.region}</div>
                        </div>
                      </div>
                    </td>
                    <td style={tdS}>{rateCell(c.div)}</td>
                    <td style={tdS}>{rateCell(c.int)}</td>
                    <td style={tdS}>{rateCell(c.roy)}</td>
                    <td style={tdS}>{rateCell(c.fts)}</td>
                    <td style={tdS}>
                      <span style={{ ...helvetica, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: c.trc ? '#E4F0EB' : '#f0f0f0', color: c.trc ? T.f : T.mid }}>
                        {c.trc ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td style={{ ...tdS, fontSize: 12, color: T.mid, lineHeight: 1.55 }}>{c.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Expanded detail */}
          {sel && (
            <div style={{ background: '#fff', border: `2px solid ${T.f}`, borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{sel.flag}</span>
                  <div>
                    <div style={{ ...helvetica, fontSize: 17, fontWeight: 700, color: T.ch }}>{sel.country}</div>
                    <div style={{ ...helvetica, fontSize: 12, color: T.lt }}>{sel.region}</div>
                  </div>
                </div>
                <button onClick={() => setSel(null)} style={{ ...helvetica, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: T.lt }}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 14 }}>
                {[['Dividend', sel.div], ['Interest', sel.int], ['Royalties', sel.roy], ['FTS', sel.fts]].map(([l, v]) => (
                  <div key={l} style={{ background: '#f9f9f9', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ ...helvetica, fontSize: 11, color: T.lt, marginBottom: 4 }}>{l}</div>
                    <div style={{ ...helvetica, fontSize: 20, fontWeight: 700, color: v === 'N/A' ? T.lt : T.f }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...helvetica, fontSize: 13, color: T.mid, lineHeight: 1.65 }}>{sel.notes}</div>
              {sel.trc && <div style={{ ...helvetica, marginTop: 10, fontSize: 12.5, color: '#00695C', fontWeight: 600 }}>✓ Tax Residency Certificate (TRC) + Form 10F required to claim treaty rates.</div>}
            </div>
          )}

          {/* Disclaimer */}
          <div style={{ ...helvetica, fontSize: 12.5, color: T.mid, background: '#f9f9f9', border: `1px solid ${T.bdr}`, borderRadius: 10, padding: '14px 18px' }}>
            <strong style={{ color: T.ch }}>Disclaimer:</strong> Rates shown are treaty rates and may not reflect recent amendments or MLI modifications. Domestic withholding rates apply if higher or if TRC is not furnished. Always consult a CA for specific transactions.
          </div>
        </div>
      </section>
    </div>
  );
}