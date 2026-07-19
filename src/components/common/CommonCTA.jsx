'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T } from '@/lib/config';

const GREEN = '#0B3D2E';
const GOLD = '#c8870a';
const GOLD_HOVER = '#e09a10';
const HV = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const CTA_MAP = {
  '/setup': {
    title: 'Ready to set up your India entity the right way?',
    desc: "Book a free 30-minute structure review. We'll assess your business, recommend the right entity type and FDI route, and give you a clear week-by-week plan.",
    btnText: 'Book Free Structure Review →'
  },
  '/post-setup': {
    title: 'Ready to manage your post-setup compliance in India?',
    desc: 'Get senior-level support for RBI, FEMA, GST, income tax, and monthly bookkeeping.',
    btnText: 'Talk to Our Expert Team →'
  },
  '/international-tax': {
    title: 'Need expert international tax advice for your Indian operations?',
    desc: 'DTAA planning, transfer pricing benchmarking, and withholding tax optimization by Ex-Big 4 CA team.',
    btnText: 'Book Tax Consultation →'
  },
  '/transfer-pricing-india': {
    title: 'Need expert transfer pricing benchmarking & compliance in India?',
    desc: 'Local file documentation, Form 3CEB certification, and DTAA planning from Ex-Big 4 CAs.',
    btnText: 'Book Transfer Pricing Review →'
  },
  '/fdi-rules-india': {
    title: 'Ready to navigate FDI rules & FEMA compliance in India?',
    desc: 'Structure your foreign investment correctly. Automatic route vs. Government approval support.',
    btnText: 'Book Free Consultation →'
  },
  '/foreign-company-registration-india': {
    title: 'Ready to register your foreign company in India?',
    desc: 'Liaison Office, Project Office, or Branch Office setup with RBI and MCA approvals.',
    btnText: 'Book Free Consultation →'
  },
  '/subsidiary-company-india': {
    title: 'Ready to establish your wholly-owned subsidiary in India?',
    desc: 'Complete SPICe+ filing, PAN/TAN, bank account opening, and post-incorporation compliance.',
    btnText: 'Book Free Consultation →'
  },
  '/nri-company-registration-india': {
    title: 'Ready to register your Indian company as an NRI?',
    desc: 'Directorship, FEMA compliance, and end-to-end incorporation by expert Ex-Big 4 CAs.',
    btnText: 'Book Free Consultation →'
  },
  '/startup-foreign-investment-india': {
    title: 'Looking for startup foreign investment compliance in India?',
    desc: 'FDI documentation, FCGPR filings, valuation certificates, and FEMA advisory.',
    btnText: 'Book Free Consultation →'
  },
  '/company-registration/from-usa': {
    title: 'Ready to register your Indian company from the USA?',
    desc: 'Apostille guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/company-registration/from-uk': {
    title: 'Ready to register your Indian company from the UK?',
    desc: 'FCDO apostille guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/company-registration/from-dubai': {
    title: 'Ready to register your Indian company from Dubai?',
    desc: 'Consulate attestation guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/company-registration/from-singapore': {
    title: 'Ready to register your Indian company from Singapore?',
    desc: 'Apostille guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/company-registration/from-canada': {
    title: 'Ready to register your Indian company from Canada?',
    desc: 'GAC apostille guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/company-registration/from-australia': {
    title: 'Ready to register your Indian company from Australia?',
    desc: 'DFAT apostille guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/us-company-setting-up-india': {
    title: 'Ready to set up your US company in India?',
    desc: 'Apostille guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/uk-company-setting-up-india': {
    title: 'Ready to set up your UK company in India?',
    desc: 'FCDO apostille guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/uae-company-setting-up-india': {
    title: 'Ready to set up your UAE company in India?',
    desc: 'Consulate attestation guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/singapore-company-setting-up-india': {
    title: 'Ready to set up your Singapore company in India?',
    desc: 'Apostille guidance to Certificate of Incorporation — we handle everything.',
    btnText: 'Book a Free Consultation →'
  },
  '/gcc-setup-india': {
    title: 'Ready to set up your GCC in India?',
    desc: 'Comprehensive structuring, talent hiring setups, transfer pricing, and compliance.',
    btnText: 'Book a Free Consultation →'
  },
  '/india-market-entry-advisory': {
    title: 'Ready to enter the Indian market?',
    desc: 'Detailed structuring, entity comparisons, FEMA advice, and end-to-end setup.',
    btnText: 'Book a Free Consultation →'
  },
  '/about': {
    title: 'Ready to partner with an Ex-Big 4 led CA team?',
    desc: 'Expert, senior-level attention for all your India entry, tax, and compliance needs.',
    btnText: 'Book Free Consultation →'
  },
  '/industries': {
    title: 'Ready to set up your industry-specific entity in India?',
    desc: 'From software services to manufacturing, we structure your business for success.',
    btnText: 'Book Free Consultation →'
  },
  '/tools': {
    title: 'Ready to start your company incorporation journey?',
    desc: 'Calculate costs, explore rules, and book a consultation with our Ex-Big 4 CA team.',
    btnText: 'Book Free Consultation →'
  },
  '/knowledge-hub': {
    title: 'Ready to get started on your Indian business setup?',
    desc: 'Get in touch for a free structure review and compliance roadmap with our experts.',
    btnText: 'Book Free Consultation →'
  }
};

const DEFAULT_CTA = {
  title: 'Ready to get started? Book a free 30-minute consultation.',
  desc: 'Expert team reviews your situation and gives you a clear structure recommendation. No commitment. Written summary after the call.',
  btnText: 'Book Free Consultation →'
};

export default function CommonCTA() {
  const pathname = usePathname();

  // Exclude homepage, contact page, thank you page, tools page, or API routes
  if (
    pathname === '/' ||
    pathname === '/contact' ||
    pathname === '/thank-you' ||
    pathname === '/tools' ||
    pathname.startsWith('/api/')
  ) {
    return null;
  }

  const content = CTA_MAP[pathname] || DEFAULT_CTA;

  return (
    <section className="common-cta-section" style={{ background: '#ffffff', padding: '16px 56px 48px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{
          background: GREEN,
          borderRadius: 20,
          padding: '44px 52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Grid pattern lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
            pointerEvents: 'none'
          }} />
          
          <div style={{ flex: 1, minWidth: 260, position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              fontWeight: 500,
              color: '#fff',
              lineHeight: 1.25,
              marginBottom: 10,
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              letterSpacing: '-0.01em'
            }}>
              {content.title}
            </h2>
            <p style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              margin: 0,
              fontFamily: "var(--font-cardo), 'Cardo', Georgia, serif"
            }}>
              {content.desc}
            </p>
          </div>
          
          <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <Link href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: GOLD,
                color: '#fff',
                fontFamily: HV,
                fontSize: 14,
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: 8,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background .2s, transform .15s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = GOLD_HOVER;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = GOLD;
                e.currentTarget.style.transform = 'none';
              }}>
              {content.btnText}
            </Link>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          .common-cta-section {
            padding: 12px 24px 32px !important;
          }
          .common-cta-section > div > div {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 32px 28px !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
