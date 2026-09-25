const HV = 'Helvetica, Arial, sans-serif';

export default function GovernmentDisclosure() {
  return (
    <section style={{ background: '#f8f7f4', padding: '28px 56px', borderTop: '1px solid #e8e5dd' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <p style={{ fontFamily: HV, fontSize: 12.5, color: '#666', lineHeight: 1.75, margin: 0 }}>
          <strong style={{ color: '#444' }}>Disclosure:</strong>{' '}
          India Company Setup is operated by Divsam Consultants LLP (LLPIN: AAF-8044), a private professional consultancy firm. We are not a government body and are not affiliated with any government agency. Company incorporation in India is administered by the Ministry of Corporate Affairs (MCA) through its official portal at{' '}
          <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#E8900A', textDecoration: 'underline' }}>mca.gov.in</a>.
          {' '}Our professional fees are for consultancy, advisory, and filing assistance services. Government fees (filing fees, stamp duty) are separate and billed at actual cost. You may file directly with the government at no professional fee.
        </p>
      </div>
    </section>
  );
}
