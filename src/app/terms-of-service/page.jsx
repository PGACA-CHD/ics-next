import { SITE_NAME, SITE_URL, EMAIL, PHONE } from '@/lib/config';

export const metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${SITE_NAME} — terms governing the use of our website and consultancy services.`,
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
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

export default function TermsOfServicePage() {
  return (
    <main style={{ fontFamily: FONT, background: '#fff' }}>
      <section style={{ background: GREEN, padding: '70px 40px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontFamily: FONT, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>Last updated: 22 September 2025</p>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '56px 24px 80px' }}>

        <Section title="1. Introduction">
          <p>
            These Terms of Service ("Terms") govern your use of the website <a href={SITE_URL} style={{ color: GOLD }}>{SITE_URL}</a> ("Website") and the professional services offered by <strong>Divsam Consultants LLP</strong> (LLPIN: AAF-8044, GSTIN: 04ADAFS0612F1ZS), operating as <strong>{SITE_NAME}</strong>. By accessing or using our Website, you agree to be bound by these Terms. If you do not agree, please discontinue use of the Website.
          </p>
        </Section>

        <Section title="2. Services">
          <p>
            {SITE_NAME} provides professional consultancy services including, but not limited to, company incorporation in India, post-incorporation compliance, international tax advisory, transfer pricing, FEMA compliance, and ongoing accounting and payroll retainers. All services are provided under separate engagement agreements.
          </p>
          <p style={{ marginTop: 12 }}>
            Content on this Website — including articles, calculators, and guides — is for general informational purposes only and does not constitute legal, tax, or financial advice. For advice specific to your situation, please book a consultation.
          </p>
        </Section>

        <Section title="3. Eligibility">
          <p>
            You must be at least 18 years of age and legally capable of entering into binding agreements to use our services. By using the Website, you represent that you meet these requirements.
          </p>
        </Section>

        <Section title="4. User Obligations">
          <p>When using this Website or engaging our services, you agree to:</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>Provide accurate, current, and complete information in all forms and communications.</li>
            <li>Not use the Website for any unlawful purpose or in violation of these Terms.</li>
            <li>Not attempt to interfere with the Website's operation, security, or accessibility.</li>
            <li>Not reproduce, distribute, or create derivative works from our content without written permission.</li>
          </ul>
        </Section>

        <Section title="5. Engagement & Fees">
          <p>
            Service fees, scope, and timelines are outlined in individual engagement proposals or letters of engagement. Fees quoted on the Website (including the Pricing page) are indicative and subject to confirmation after an initial consultation. All prices exclude applicable government fees, stamp duties, and taxes (GST at 18%) unless stated otherwise.
          </p>
          <p style={{ marginTop: 12 }}>
            Payment terms, refund policies, and cancellation conditions are governed by the specific engagement agreement signed between you and Divsam Consultants LLP.
          </p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            All content on this Website — including text, graphics, logos, images, calculators, tools, and software — is the intellectual property of Divsam Consultants LLP or its licensors and is protected by applicable copyright and trademark laws. You may not reproduce, modify, or distribute any content without prior written consent.
          </p>
        </Section>

        <Section title="7. Free Tools & Calculators">
          <p>
            The tax calculators, rate finders, and reference tools on this Website are provided free of charge for informational purposes. While we make reasonable efforts to keep them accurate and up to date, we do not guarantee their accuracy, completeness, or suitability for any specific purpose. These tools are not a substitute for professional advice. Always verify results with a qualified professional before making financial or legal decisions.
          </p>
        </Section>

        <Section title="8. Third-Party Links & Services">
          <p>
            Our Website may contain links to third-party websites or integrate with third-party services (e.g., Calendly for bookings, Zoho for CRM). We are not responsible for the content, privacy practices, or availability of these external services. Your use of third-party services is governed by their own terms and policies.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Divsam Consultants LLP shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Website or reliance on its content. Our total liability for any claim related to the Website shall not exceed the fees paid by you for the specific service giving rise to the claim.
          </p>
        </Section>

        <Section title="10. Disclaimer of Warranties">
          <p>
            The Website and its content are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Website will be uninterrupted, error-free, or free of harmful components.
          </p>
        </Section>

        <Section title="11. Confidentiality">
          <p>
            We treat all client information with the highest level of confidentiality, in accordance with the professional standards of the Institute of Chartered Accountants of India (ICAI) and applicable data protection laws. Details of our data handling practices are described in our <a href="/privacy-policy" style={{ color: GOLD }}>Privacy Policy</a>.
          </p>
        </Section>

        <Section title="12. Governing Law & Jurisdiction">
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts in Chandigarh, India.
          </p>
        </Section>

        <Section title="13. Changes to These Terms">
          <p>
            We may update these Terms from time to time. Changes will be posted on this page with a revised "Last updated" date. Continued use of the Website after changes constitutes your acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p>For questions about these Terms, contact us at:</p>
          <div style={{ background: '#F8F7F4', borderRadius: 12, padding: '20px 24px', marginTop: 12 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Divsam Consultants LLP</p>
            <p style={{ margin: '0 0 4px' }}>LLPIN: AAF-8044 &nbsp;|&nbsp; GSTIN: 04ADAFS0612F1ZS</p>
            <p style={{ margin: '0 0 4px' }}>SCO 18, Top Floor, Sector 20-D, Chandigarh 160020, India</p>
            <p style={{ margin: '0 0 4px' }}>Email: <a href={`mailto:${EMAIL}`} style={{ color: GOLD }}>{EMAIL}</a></p>
            <p style={{ margin: 0 }}>Phone: <a href={`tel:${PHONE.replace(/\s/g, '')}`} style={{ color: GOLD }}>{PHONE}</a></p>
          </div>
        </Section>

      </section>
    </main>
  );
}
