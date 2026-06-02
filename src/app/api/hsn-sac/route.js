// ─── CBIC / GSTN HSN-SAC Proxy ───────────────────────────────────────────────
// Proxies to services.gst.gov.in to avoid CORS from the browser.
// Falls back to HSN_HEADINGS (4/6-digit codes) on any upstream error.

export const runtime = 'nodejs';

import { HSN_HEADINGS } from '../../../app/tools/hsn-sac-finder/hsn-data.js';

const CBIC_URL = 'https://services.gst.gov.in/services/api/search/hsnsac';


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim();
  const type = (searchParams.get('type') || 'HSN').toUpperCase(); // HSN or SAC

  if (!query || query.length < 2) {
    return Response.json({ results: [], error: null });
  }

  // ── Try CBIC API ────────────────────────────────────────────────────────────
  try {
    const cbicRes = await fetch(
      `${CBIC_URL}?searchValue=${encodeURIComponent(query)}&type=${type}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; IndiaCompanySetup/1.0)',
          'Referer': 'https://services.gst.gov.in/services/searchhsnsac',
        },
        signal: AbortSignal.timeout(6000),
      }
    );

    if (cbicRes.ok) {
      const raw = await cbicRes.json();
      // CBIC returns varying shapes — normalise
      const list = Array.isArray(raw) ? raw : (raw?.data || raw?.results || []);
      if (list.length > 0) {
        const results = list.slice(0, 50).map(item => ({
          code: item.hsnsacCode || item.code || item.hsnCode || item.sacCode || '',
          desc: item.hsnsacDescription || item.description || item.desc || '',
          chapter: (item.hsnsacCode || item.code || '').slice(0, 2),
          gst: item.cgstRate !== undefined
            ? `CGST ${item.cgstRate}% + SGST ${item.sgstRate}%`
            : (item.gstRate || item.taxRate || undefined),
        })).filter(r => r.code || r.desc);
        return Response.json({ results, source: 'cbic' });
      }
    }
  } catch {
    // Fall through to local fallback
  }

  // ── Local fallback — search 4/6-digit HSN headings ─────────────────────────
  const lq = query.toLowerCase();

  if (type === 'HSN') {
    const local = HSN_HEADINGS.filter(r =>
      r.code.startsWith(query) ||
      r.desc.toLowerCase().includes(lq)
    ).slice(0, 50).map(r => ({ code: r.code, desc: r.desc, chapter: r.ch }));
    return Response.json({ results: local, source: 'local' });
  }

  // SAC fallback
  const SAC_FALLBACK = [
    { code: '995411', desc: 'Construction of buildings (residential)', gst: '5% / 12%' },
    { code: '995412', desc: 'Construction of buildings (commercial)', gst: '12% / 18%' },
    { code: '996311', desc: 'Room or unit accommodation services — hotels, inns, guest houses', gst: '12% / 18%' },
    { code: '996421', desc: 'Taxi services including radio taxi', gst: '5%' },
    { code: '996511', desc: 'Road transport services of goods (GTA)', gst: '5% / 12%' },
    { code: '997113', desc: 'Banking and related services', gst: '18%' },
    { code: '997211', desc: 'Rental or leasing of residential property', gst: 'Nil / 18%' },
    { code: '997212', desc: 'Rental or leasing of non-residential property', gst: '18%' },
    { code: '998211', desc: 'Legal advisory and representation services', gst: '18%' },
    { code: '998221', desc: 'Accounting and bookkeeping services', gst: '18%' },
    { code: '998222', desc: 'Auditing services', gst: '18%' },
    { code: '998231', desc: 'Tax advisory and representation services', gst: '18%' },
    { code: '998313', desc: 'IT consulting services', gst: '18%' },
    { code: '998314', desc: 'IT design and development services', gst: '18%' },
    { code: '998315', desc: 'Hosting and IT infrastructure management services', gst: '18%' },
    { code: '998321', desc: 'Advertising services', gst: '18%' },
    { code: '998363', desc: 'Human resources management (HR) services', gst: '18%' },
    { code: '998512', desc: 'Contract staffing / manpower supply services', gst: '18%' },
    { code: '999211', desc: 'Pre-primary education services', gst: 'Exempt' },
    { code: '999293', desc: 'Commercial training and coaching services', gst: '18%' },
    { code: '999311', desc: 'Hospital services', gst: 'Exempt' },
  ];
  const sacLocal = SAC_FALLBACK.filter(r =>
    r.code.startsWith(query) || r.desc.toLowerCase().includes(lq)
  ).slice(0, 30);
  return Response.json({ results: sacLocal, source: 'local' });
}
