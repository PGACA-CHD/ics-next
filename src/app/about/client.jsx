'use client';
import Link from 'next/link';
import { T } from '@/lib/config';

export default function Page() {
  const teamDisciplines = [
    { icon: '📋', role: 'International Tax & Advisory', creds: 'FCA · ICAI Diploma in International Taxation · Ex-KPMG ITA',
      skills: ['DTAA structuring & TRC advisory', 'Transfer pricing — design, benchmarking, 3CEB', 'PE risk assessment & FEMA compliance', 'Withholding tax optimisation', 'Form 15CA/15CB for foreign payments'], accent: '#0B3D2E' },
    { icon: '🏢', role: 'Company Secretary & MCA', creds: 'CS · ICSI Qualified',
      skills: ['Company incorporation & SPICe+ filing', 'FCGPR & FLA — RBI filings', 'Board resolutions & statutory registers', 'Annual ROC filings (MGT-7, AOC-4)', 'Share issuance & FCTRS'], accent: '#4A6FA5' },
    { icon: '📊', role: 'Accounts, GST & Payroll', creds: 'CA · B.Com',
      skills: ['Monthly bookkeeping & MIS reports', 'GST registration, returns & reconciliation', 'TDS computation & 26Q / 27Q returns', 'Payroll — PF, ESI, professional tax', 'Advance tax & ITR filing'], accent: '#5C7A4A' },
    { icon: '⚖️', role: 'Legal & Contracts', creds: 'LLB',
      skills: ['Shareholder & subscription agreements', 'Intercompany service agreements (MSA)', 'Employment contracts & ESOP plans', 'Regulatory advisory — SEBI, RBI, DPIIT', 'Contractual risk review'], accent: '#7B5EA7' },
  ];

  const principles = [
    ['🎯','Structure Before Filing','We design the tax and legal structure before a single document is filed. Transfer pricing model before incorporation. DTAA analysis before the first intercompany payment.'],
    ['🔗','Integrated Advisory','DTAA, transfer pricing, and FEMA are treated as one picture — not three separate workstreams. Getting one wrong affects the others.'],
    ['🛡️','Documentation That Defends','Every document is written to survive audit scrutiny — not to meet a minimum compliance threshold.'],
    ['💬','Plain English — Always','CEOs and CFOs should understand their India tax position without jargon. We translate technical positions into clear commercial language.'],
    ['👥','Senior Attention — Always','Every engagement is led by our senior CA, supported by the full team — CS, accountants, and legal. Full depth, senior attention, every time.'],
    ['🔄','Long-term Partnership','Most clients start with an incorporation engagement and stay on retainer for years. We are built for the full India journey.'],
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#0B3D2E', padding: '120px 56px 88px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 80% at 95% 50%, rgba(232,144,10,.06) 0%, transparent 55%)' }}/>
        <div className="about-hero-grid" style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 420px', gap: 80, alignItems: 'center' }}>
          <div className="reveal">
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#F5A828', fontWeight: 600, marginBottom: 14 }}>About India Company Setup</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(36px,4.5vw,60px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: 20 }}>
              Big 4 expertise.<br/>
              <span style={{ fontStyle: 'italic', color: '#F5A828', fontWeight: 400 }}>Independent firm.</span><br/>
              Built for your scale.
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.82, fontWeight: 300, maxWidth: 500, marginBottom: 36 }}>
              India Company Setup was built on a simple premise: the best international tax advisory should not be reserved for companies that can afford Big 4 fees. We are a team of Chartered Accountants, Company Secretaries, accountants, and lawyers — Ex-KPMG led — serving mid-market foreign companies entering India.
            </p>
            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', borderLeft: '1px solid rgba(255,255,255,.09)' }}>
              {[['18+','Years of experience'],['100+','Companies incorporated'],['5','Continents'],['0','TP audits lost']].map(([n,l]) => (
                <div key={n} style={{ padding: '14px 24px', borderRight: '1px solid rgba(255,255,255,.09)', textAlign: 'center' }}>
                  <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.42)', marginTop: 4, letterSpacing: .3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Team composition card */}
          <div className="reveal" style={{ background: '#fff', borderRadius: 16, padding: '30px 28px', boxShadow: '0 24px 64px rgba(0,0,0,.22)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #0B3D2E, #E8900A)', borderRadius: '16px 16px 0 0' }}/>
            <div style={{ fontSize: 9.5, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9A9A8E', fontWeight: 600, marginBottom: 4 }}>The Team</div>
            <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: '#17170F', marginBottom: 4 }}>CA &middot; CS &middot; Accountants &middot; Legal</h3>
            <p style={{ fontSize: 12.5, color: '#9A9A8E', marginBottom: 20, lineHeight: 1.5 }}>A full-service advisory team for every stage of your India journey.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {[['🎓','FCA — ICAI'],['🎓',"ICAI Int'l Tax Diploma"],['🏛️','Ex-KPMG ITA'],['📋','CS — ICSI'],['⚖️','LLB'],['🌍','100+ Foreign Companies']].map(([ico, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#E4F0EB', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, color: '#0B3D2E' }}>
                  <span style={{ fontSize: 11 }}>{ico}</span> {label}
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #E0DDD4', paddingTop: 16 }}>
              <div style={{ fontSize: 12, color: '#5C5C52', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, color: '#17170F' }}>Clients from: </span>
                🇺🇸 USA &nbsp;&middot;&nbsp; 🇬🇧 UK &nbsp;&middot;&nbsp; 🇦🇪 UAE &nbsp;&middot;&nbsp; 🇸🇬 Singapore &nbsp;&middot;&nbsp; 🇦🇺 Australia
              </div>
              <div style={{ background: '#E4F0EB', borderRadius: 9, padding: '11px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>🏛️</span>
                <p style={{ fontSize: 12, color: '#0B3D2E', fontWeight: 500, lineHeight: 1.55, margin: 0 }}>
                  Ex-KPMG International Tax & Advisory practice. Specialists in India entry, transfer pricing, DTAA, and FEMA for foreign companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY + TEAM CAPABILITIES */}
      <section style={{ padding: '88px 56px', background: '#FAFAF5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="reveal about-story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 88 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#E8900A', fontWeight: 600, marginBottom: 13 }}>Our Story</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 600, color: '#17170F', lineHeight: 1.1, marginBottom: 24 }}>
                Why we built <span style={{ fontStyle: 'italic', color: '#0B3D2E' }}>India Company Setup</span>
              </h2>
              {[
                'After building a team with 18+ years of combined experience — CAs, Company Secretaries, and accountants — and having set up 100+ companies in India including foreign companies, one pattern became impossible to ignore: <strong>the mid-market was being failed.</strong>',
                'Foreign companies with 50-500 employees trying to set up in India had two choices: pay Big 4 fees their business case could not justify, or rely on local CA firms with no meaningful international tax experience. Neither was good enough.',
                'Getting the transfer pricing structure wrong creates years of audit exposure. Getting FEMA wrong creates penalties up to 3x the transaction value. Getting the DTAA analysis wrong means overpaying withholding tax on every dividend — often indefinitely.',
                'India Company Setup was built to serve the foreign companies that <strong>cannot afford Big 4 fees but cannot afford Big 4 mistakes either.</strong>',
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 15, color: '#5C5C52', lineHeight: 1.85, fontWeight: 300, marginBottom: 18 }}
                  dangerouslySetInnerHTML={{ __html: text.replace(/<strong>/g, '<strong style="color:#17170F;font-weight:600">').replace(/<\/strong>/g, '</strong>') }}/>
              ))}
              <div style={{ background: '#0B3D2E', borderRadius: 13, padding: '26px 28px', marginTop: 10, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -10, left: 16, fontSize: 80, fontFamily: 'Cormorant Garamond, serif', color: 'rgba(255,255,255,.07)', lineHeight: 1 }}>"</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontStyle: 'italic', color: 'rgba(255,255,255,.8)', lineHeight: 1.55, marginBottom: 8, position: 'relative' }}>
                  "The companies that get India right do not necessarily have the biggest budgets. They have the right advisor at the right moment."
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,.38)', margin: 0 }}>India Company Setup — firm philosophy</p>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#E8900A', fontWeight: 600, marginBottom: 13 }}>The Team</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 600, color: '#17170F', lineHeight: 1.1, marginBottom: 28 }}>
                Four disciplines.<br/><span style={{ fontStyle: 'italic', color: '#0B3D2E' }}>One integrated team.</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {teamDisciplines.map((d) => (
                  <div key={d.role} style={{ background: '#fff', border: '1px solid #E0DDD4', borderRadius: 12, padding: '18px 20px', borderLeft: '4px solid ' + d.accent }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 20 }}>{d.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#17170F', lineHeight: 1.2 }}>{d.role}</div>
                        <div style={{ fontSize: 11, color: '#9A9A8E', marginTop: 1 }}>{d.creds}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 0' }}>
                      {d.skills.map(s => (
                        <div key={s} style={{ fontSize: 11.5, color: '#5C5C52', width: '50%', display: 'flex', alignItems: 'flex-start', gap: 5, paddingRight: 4, marginBottom: 3 }}>
                          <span style={{ color: d.accent, fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}>›</span> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section style={{ padding: '88px 56px', background: '#F2EFE8' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="reveal" style={{ maxWidth: 560, marginBottom: 52 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#E8900A', fontWeight: 600, marginBottom: 13 }}>How We Work</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, color: '#17170F', lineHeight: 1.1 }}>
              Principles that define <span style={{ fontStyle: 'italic', color: '#0B3D2E' }}>every engagement</span>
            </h2>
          </div>
          <div className="stagger about-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {principles.map(([ico, title, desc]) => (
              <div key={title} className="card-lift" style={{ background: '#fff', border: '1px solid #E0DDD4', borderRadius: 14, padding: '30px 26px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: '#E0DDD4' }}/>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{ico}</div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: '#17170F', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: '#5C5C52', lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PGA & CO */}
      <section style={{ background: '#0B3D2E', padding: '80px 56px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="reveal hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#F5A828', fontWeight: 600, marginBottom: 14 }}>Knowledge Partner</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                The domestic CA firm behind <span style={{ fontStyle: 'italic', color: '#F5A828' }}>India Company Setup</span>
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.62)', lineHeight: 1.82, fontWeight: 300, marginBottom: 24 }}>
                India Company Setup is powered by PGA &amp; Co. Chartered Accountants — a full-service CA firm based in Chandigarh. While ICS handles the international layer, PGA &amp; Co. manages the domestic compliance engine.
              </p>
              <a href="https://pgaca.in" target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#F5A828', borderBottom: '1px solid rgba(245,168,40,.3)', paddingBottom: 3 }}>Visit pgaca.in →</a>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '30px 28px' }}>
              <div style={{ fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9A9A8E', fontWeight: 600, marginBottom: 10 }}>Knowledge Partner</div>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: '#17170F', marginBottom: 4 }}>PGA &amp; Co.</h3>
              <p style={{ fontSize: 12.5, color: '#9A9A8E', marginBottom: 18 }}>Chartered Accountants · Chandigarh · Pan-India</p>
              {['GST registration, filing, audit & advisory','Income & corporate tax — ITR, advance tax','Statutory audit & assurance','Company incorporation & MCA compliance','Payroll — TDS, PF, ESI, professional tax','NRI & HNI tax advisory','Transfer pricing — Form 3CEB','Startup services — DPIIT, ESOP'].map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#5C5C52', marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8900A', flexShrink: 0 }}/> {s}
                </div>
              ))}
              <div style={{ borderTop: '1px solid #E0DDD4', marginTop: 16, paddingTop: 14, fontSize: 12, color: '#9A9A8E', lineHeight: 1.7 }}>
                SCO 18, Top Floor, Sector 20-D, Chandigarh 160020<br/>
                <a href="tel:+918699887200" style={{ color: '#0B3D2E', fontWeight: 500 }}>+91 86998 87200</a> · <a href="mailto:info@pgaca.in" style={{ color: '#0B3D2E', fontWeight: 500 }}>info@pgaca.in</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}