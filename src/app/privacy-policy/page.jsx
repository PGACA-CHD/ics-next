import { SITE_NAME, SITE_URL, EMAIL, PHONE } from '@/lib/config';

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_NAME} — how we collect, use, and protect your personal information.`,
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

const FONT = 'Helvetica, Arial, sans-serif';
const GREEN = '#0B3D2E';
const GOLD = '#E8900A';

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 36 }}>
    <h2 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: GREEN, marginBottom: 12 }}>{title}</h2>
    <div style={{ fontFamily: FONT, fontSize: 14.5, lineHeight: 1.85, color: '#333' }}>{children}</div>
  </div>
);

export default function PrivacyPolicyPage() {
  return (
    <main style={{ fontFamily: FONT, background: '#fff' }}>
      <section style={{ background: GREEN, padding: '70px 40px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontFamily: FONT, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>Last updated: 22 September 2025</p>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '56px 24px 80px' }}>

        <Section title="1. Who We Are">
          <p>
            <strong>{SITE_NAME}</strong> (<a href={SITE_URL} style={{ color: GOLD }}>{SITE_URL}</a>) is operated by <strong>Divsam Consultants LLP</strong> (LLPIN: AAF-8044, GSTIN: 04ADAFS0612F1ZS), a firm of Chartered Accountants and corporate advisors based in Chandigarh, India. References to "we", "us", or "our" mean Divsam Consultants LLP.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p><strong>Information you provide directly:</strong></p>
          <ul style={{ paddingLeft: 20, margin: '8px 0 16px' }}>
            <li>Name, email address, phone number, and company details submitted through our contact forms, consultation booking, or chat widget.</li>
            <li>Messages, documents, or financial data shared during the course of an engagement.</li>
          </ul>
          <p><strong>Information collected automatically:</strong></p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>IP address, browser type, device type, operating system, and referring URL.</li>
            <li>Pages visited, time spent, and interactions on our website, collected via Google Analytics 4 (GA4) and Google Tag Manager.</li>
            <li>Cookies and similar tracking technologies (see Section 7 below).</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use personal information to:</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>Respond to enquiries and provide requested consultancy services.</li>
            <li>Schedule strategy calls and follow up on engagement proposals.</li>
            <li>Send relevant updates about regulatory changes, if you have opted in.</li>
            <li>Improve our website, services, and user experience.</li>
            <li>Comply with legal and regulatory obligations.</li>
            <li>Run advertising campaigns through Google Ads and measure their effectiveness.</li>
          </ul>
        </Section>

        <Section title="4. Legal Basis for Processing">
          <p>We process personal data on the following grounds:</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li><strong>Consent:</strong> When you submit a form or opt in to communications.</li>
            <li><strong>Contractual necessity:</strong> To deliver services you have engaged us for.</li>
            <li><strong>Legitimate interest:</strong> To improve our website, respond to enquiries, and market our services.</li>
            <li><strong>Legal obligation:</strong> Where required by Indian or applicable international law.</li>
          </ul>
        </Section>

        <Section title="5. Data Sharing & Third Parties">
          <p>We do not sell your personal data. We may share information with:</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li><strong>Google:</strong> Analytics data via GA4, GTM, and Google Ads for website analytics and advertising.</li>
            <li><strong>Zoho:</strong> CRM platform for managing enquiries and client relationships.</li>
            <li><strong>Calendly:</strong> For scheduling consultation calls.</li>
            <li><strong>Government authorities:</strong> Where required by law (e.g., MCA, Income Tax Department, RBI).</li>
            <li><strong>Professional partners:</strong> Lawyers or specialists engaged for your matter, with your knowledge.</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We retain personal data for as long as necessary to fulfil the purposes described above, or as required by law. Enquiry data from forms is retained for up to 3 years. Engagement-related data is retained for the period required by applicable Indian regulations (typically 8 years for financial records). You may request deletion of your data at any time by contacting us.
          </p>
        </Section>

        <Section title="7. Cookies & Tracking">
          <p>Our website uses cookies and similar technologies:</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li><strong>Essential cookies:</strong> Required for basic site functionality.</li>
            <li><strong>Analytics cookies:</strong> Google Analytics 4 to understand visitor behaviour and improve the site.</li>
            <li><strong>Advertising cookies:</strong> Google Ads conversion tracking and remarketing.</li>
          </ul>
          <p>
            You can manage cookie preferences through your browser settings. Disabling certain cookies may affect site functionality.
          </p>
        </Section>

        <Section title="8. Data Security">
          <p>
            We implement reasonable technical and organisational measures to protect your personal data, including encrypted data transmission (SSL/TLS), secure hosting, and access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Withdraw consent at any time.</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href={`mailto:${EMAIL}`} style={{ color: GOLD }}>{EMAIL}</a>.</p>
        </Section>

        <Section title="10. International Data Transfers">
          <p>
            Our servers and third-party services may process data outside India. Where data is transferred internationally, we ensure appropriate safeguards are in place. By using our website, you consent to the transfer of your data as described in this policy.
          </p>
        </Section>

        <Section title="11. Children's Privacy">
          <p>
            Our services are not directed at individuals under 18. We do not knowingly collect personal data from minors. If we become aware of such collection, we will delete the data promptly.
          </p>
        </Section>

        <Section title="12. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Last updated" date. We encourage you to review this page periodically.
          </p>
        </Section>

        <Section title="13. Contact Us">
          <p>
            For privacy-related queries or requests, contact us at:
          </p>
          <div style={{ background: '#F8F7F4', borderRadius: 12, padding: '20px 24px', marginTop: 12 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Divsam Consultants LLP</p>
            <p style={{ margin: '0 0 4px' }}>SCO 18, Top Floor, Sector 20-D, Chandigarh 160020, India</p>
            <p style={{ margin: '0 0 4px' }}>Email: <a href={`mailto:${EMAIL}`} style={{ color: GOLD }}>{EMAIL}</a></p>
            <p style={{ margin: 0 }}>Phone: <a href={`tel:${PHONE.replace(/\s/g, '')}`} style={{ color: GOLD }}>{PHONE}</a></p>
          </div>
        </Section>

      </section>
    </main>
  );
}
