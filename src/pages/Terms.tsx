export default function Terms() {
  return (
    <div style={{ background: '#f8f9fb', minHeight: '100vh', padding: '64px 40px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '2rem', fontWeight: 600, color: '#1a2e4a', marginBottom: 24 }}>Terms of Use</h1>
        <p style={{ fontSize: '0.86rem', color: '#6e8290', marginBottom: 32, fontFamily: 'Outfit, sans-serif' }}>Last updated: 2025</p>

        {[
          {
            title: '1. Directory Service Only',
            body: 'Zenihand is a free online directory platform. We list independent, self-employed providers of non-medical aging-in-place support services in the Dallas–Fort Worth area. We do not employ, supervise, train, manage, or guarantee any provider listed on this site.',
          },
          {
            title: '2. Independent Contractors',
            body: 'All providers listed on Zenihand are independent contractors. They are not employees or agents of Zenihand. Any arrangement you make with a provider is solely between you and that provider.',
          },
          {
            title: '3. Non-Medical Services Only',
            body: 'Zenihand only lists providers of non-medical support services (such as companionship, housekeeping, errand assistance, and meal preparation). No medical, clinical, or healthcare services are offered or implied.',
          },
          {
            title: '4. No Screening or Vetting',
            body: 'Zenihand does not conduct background checks, verify credentials, or vet any provider. Families are solely responsible for interviewing, screening, and selecting providers. We strongly encourage families to conduct their own due diligence before engaging any provider.',
          },
          {
            title: '5. No Guarantee',
            body: 'Zenihand makes no warranties, representations, or guarantees about the quality, reliability, safety, or suitability of any provider listed on this site. Use of this directory is at your own risk.',
          },
          {
            title: '6. Contact',
            body: 'For questions about these terms, email support@zenihand.com.',
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.1rem', color: '#1a2e4a', marginBottom: 8, fontWeight: 600 }}>{section.title}</h2>
            <p style={{ fontSize: '0.93rem', color: '#4a5c6a', lineHeight: 1.7, fontFamily: 'Outfit, sans-serif' }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
