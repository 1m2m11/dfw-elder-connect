import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#111e2e', color: 'rgba(255,255,255,0.55)', padding: '52px 40px 28px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.3rem', color: 'white', marginBottom: 10 }}>
              Zeni<span style={{ color: '#c4873e' }}>hand</span>
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, maxWidth: 260, color: 'rgba(255,255,255,0.55)', fontFamily: 'Outfit, sans-serif' }}>
              Connecting DFW families with independent, non-medical aging-in-place support providers.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 14, fontFamily: 'Outfit, sans-serif' }}>
              Navigate
            </h4>
            {[
              { to: '/', label: 'Home' },
              { to: '/browse', label: 'Browse Providers' },
              { to: '/join', label: 'Get Listed Free' },
              { to: '/#how-it-works', label: 'How It Works' },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ display: 'block', fontSize: '0.86rem', color: 'rgba(255,255,255,0.52)', textDecoration: 'none', marginBottom: 9, fontFamily: 'Outfit, sans-serif' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 14, fontFamily: 'Outfit, sans-serif' }}>
              Legal
            </h4>
            <Link to="/terms" style={{ display: 'block', fontSize: '0.86rem', color: 'rgba(255,255,255,0.52)', textDecoration: 'none', marginBottom: 9, fontFamily: 'Outfit, sans-serif' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}
            >
              Terms of Use
            </Link>
          </div>
        </div>

        {/* Support box */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '16px 22px', marginBottom: 28, fontSize: '0.82rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', fontFamily: 'Outfit, sans-serif' }}>
          Have a question about listings or using Zenihand?{' '}
          Email{' '}
          <a href="mailto:support@zenihand.com" style={{ color: '#f0c070', textDecoration: 'none' }}>
            support@zenihand.com
          </a>{' '}
          and we'll respond within one business day.
        </div>

        {/* Bottom disclaimer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit, sans-serif' }}>
          Zenihand is a directory platform connecting families with independent providers.
          We do not employ, supervise, screen, or guarantee any provider or service.
          All services are non-medical. Families arrange services directly with providers.
          <span style={{ opacity: 0.45, display: 'block', marginTop: 10 }}>
            © 2025 Zenihand · Dallas–Fort Worth, TX
          </span>
        </div>
      </div>
    </footer>
  );
}
