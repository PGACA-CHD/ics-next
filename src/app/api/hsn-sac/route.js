// ─── CBIC / GSTN HSN-SAC Proxy ───────────────────────────────────────────────
// Proxies to services.gst.gov.in to avoid CORS from the browser.
// Falls back to a local keyword-match dataset on any upstream error.

export const runtime = 'nodejs';

const CBIC_URL = 'https://services.gst.gov.in/services/api/search/hsnsac';

// Minimal fallback dataset — covers the most-queried goods/services
const FALLBACK = {
  HSN: [
    { code: '0101', desc: 'Live horses, asses, mules and hinnies' },
    { code: '0201', desc: 'Meat of bovine animals, fresh or chilled' },
    { code: '0301', desc: 'Live fish' },
    { code: '0401', desc: 'Milk and cream, not concentrated nor sweetened' },
    { code: '0901', desc: 'Coffee, whether or not roasted or decaffeinated' },
    { code: '1001', desc: 'Wheat and meslin' },
    { code: '1006', desc: 'Rice' },
    { code: '1701', desc: 'Cane or beet sugar and chemically pure sucrose, in solid form' },
    { code: '2701', desc: 'Coal; briquettes, ovoids and similar solid fuels manufactured from coal' },
    { code: '2710', desc: 'Petroleum oils and oils obtained from bituminous minerals' },
    { code: '3004', desc: 'Medicaments (pharmaceutical products)' },
    { code: '3901', desc: 'Polymers of ethylene, in primary forms' },
    { code: '4011', desc: 'New pneumatic tyres, of rubber' },
    { code: '4901', desc: 'Printed books, brochures, leaflets' },
    { code: '5201', desc: 'Cotton, not carded or combed' },
    { code: '5208', desc: 'Woven fabrics of cotton' },
    { code: '6109', desc: 'T-shirts, singlets and other vests, knitted or crocheted' },
    { code: '6203', desc: 'Men\'s suits, ensembles, jackets, blazers, trousers' },
    { code: '6402', desc: 'Other footwear with outer soles and uppers of rubber or plastics' },
    { code: '7208', desc: 'Flat-rolled products of iron or non-alloy steel' },
    { code: '7308', desc: 'Structures (bridges, doors, windows, columns, etc.) of iron or steel' },
    { code: '8414', desc: 'Air or vacuum pumps; air or gas compressors; fans; ventilating hoods' },
    { code: '8471', desc: 'Automatic data processing machines (computers)' },
    { code: '8517', desc: 'Telephone sets; smartphones and other phones' },
    { code: '8703', desc: 'Motor cars and other motor vehicles principally for persons' },
    { code: '9403', desc: 'Other furniture and parts thereof' },
    { code: '9503', desc: 'Tricycles, scooters, pedal cars and similar wheeled toys; dolls' },
  ],
  SAC: [
    { code: '995411', desc: 'Construction of buildings (residential)', gst: '5% / 12%' },
    { code: '995412', desc: 'Construction of buildings (commercial)', gst: '12% / 18%' },
    { code: '996311', desc: 'Room or unit accommodation services provided by hotels, inns, guest houses', gst: '12% / 18%' },
    { code: '996312', desc: 'Camp site services', gst: '18%' },
    { code: '996411', desc: 'Local bus and metro rail transport services', gst: 'Nil' },
    { code: '996421', desc: 'Taxi services including radio taxi', gst: '5%' },
    { code: '996511', desc: 'Road transport services of goods', gst: '5% / 12%' },
    { code: '996601', desc: 'Rental services of road vehicles with operator', gst: '5% / 12% / 18%' },
    { code: '997111', desc: 'Financial leasing services', gst: '18%' },
    { code: '997113', desc: 'Banking and related services', gst: '18%' },
    { code: '997211', desc: 'Rental or leasing of residential property', gst: 'Nil / 18%' },
    { code: '997212', desc: 'Rental or leasing of non-residential property', gst: '18%' },
    { code: '998211', desc: 'Legal advisory and representation services', gst: '18%' },
    { code: '998212', desc: 'Arbitration and conciliation services', gst: '18%' },
    { code: '998221', desc: 'Accounting and bookkeeping services', gst: '18%' },
    { code: '998222', desc: 'Auditing services', gst: '18%' },
    { code: '998231', desc: 'Tax advisory and representation services', gst: '18%' },
    { code: '998313', desc: 'Information technology (IT) consulting services', gst: '18%' },
    { code: '998314', desc: 'Information technology (IT) design and development services', gst: '18%' },
    { code: '998315', desc: 'Hosting and information technology (IT) infrastructure management', gst: '18%' },
    { code: '998321', desc: 'Advertising services', gst: '18%' },
    { code: '998363', desc: 'Human resources management (HR) services', gst: '18%' },
    { code: '998411', desc: 'Investigation services', gst: '18%' },
    { code: '998512', desc: 'Contract staffing services', gst: '18%' },
    { code: '998592', desc: 'Other support services', gst: '18%' },
    { code: '999211', desc: 'Pre-primary education services', gst: 'Exempt' },
    { code: '999212', desc: 'Primary education services', gst: '18%' },
    { code: '999293', desc: 'Commercial training and coaching services', gst: '18%' },
    { code: '999311', desc: 'Hospital services', gst: 'Exempt' },
    { code: '999631', desc: 'Services of performing arts', gst: 'Nil / 18%' },
  ],
};

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

  // ── Local keyword fallback ──────────────────────────────────────────────────
  const lq = query.toLowerCase();
  const pool = FALLBACK[type] || [];
  const local = pool.filter(r =>
    r.code.startsWith(query) ||
    r.desc.toLowerCase().includes(lq)
  ).slice(0, 20).map(r => ({ ...r, chapter: r.code.slice(0, 2) }));

  if (local.length > 0) {
    return Response.json({ results: local, source: 'local' });
  }

  return Response.json({ results: [], source: 'local' });
}
