import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';

const trustItems = [
  'Independent providers, not employees.',
  'Non-medical services only.',
  'Families contact providers directly to interview.',
];

const howItWorks = [
  {
    step: '1',
    title: 'Browse',
    desc: 'Search providers by category and ZIP code',
  },
  {
    step: '2',
    title: 'Contact',
    desc: 'Reach out directly to providers you choose',
  },
  {
    step: '3',
    title: 'Arrange',
    desc: 'Set up services on your own terms',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-20 sm:py-28 relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1a2e4a 0%, #243d5e 55%, #2a4a6e 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20" style={{ fontFamily: 'Outfit, sans-serif' }}>
            DFW Non-Medical Aging-in-Place Directory
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Find Independent Non-Medical{' '}
            <span style={{ color: '#f0c070', fontStyle: 'italic' }}>Support in DFW</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)', fontFamily: 'Outfit, sans-serif' }}>
            Zenihand connects families with independent providers offering non-medical support across the DFW Metro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/browse"
              className="btn-amber rounded-full px-8 py-3.5 text-base font-semibold inline-flex items-center justify-center"
            >
              Browse Providers
            </Link>
            <Link
              to="/join"
              className="rounded-full px-8 py-3.5 text-base font-semibold inline-flex items-center justify-center transition-colors"
              style={{ border: '2px solid rgba(255,255,255,0.45)', color: '#ffffff', background: 'transparent', fontFamily: 'Outfit, sans-serif' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Get Listed Free
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #dde2e8' }} className="py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 items-center text-center sm:text-left">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c4873e', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: '0.82rem', color: '#4a5c6a', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 section-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Browse by Category</h2>
            <p className="text-muted-foreground text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>Find the right kind of support for your family</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/browse/${cat.id}`}
                className="card-warm p-6 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-200 group"
              >
                <h3 className="font-semibold leading-snug text-base" style={{ color: '#1a2e4a' }}>{cat.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: '#c4873e', fontFamily: 'Outfit, sans-serif' }}>
                  Browse <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ background: '#1a2e4a' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    border: '2px solid rgba(240,192,112,0.45)',
                    background: 'transparent',
                    width: 40,
                    height: 40,
                  }}
                >
                  <span style={{ color: '#f0c070', fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: '1.1rem' }}>{step.step}</span>
                </div>
                <h3 className="font-bold text-xl text-white mb-2">{step.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Outfit, sans-serif' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 section-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="disclaimer-box text-center">
            <p>
              <strong>Zenihand is a free directory service.</strong> We do not employ, supervise, screen, or guarantee any provider.
              All providers are independent contractors. Families are responsible for their own vetting and arrangements.
              Contact: <a href="mailto:support@zenihand.com" className="underline">support@zenihand.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Are you an independent support provider in DFW?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.70)', fontFamily: 'Outfit, sans-serif' }}>
            Create your free listing and connect with families looking for your services.
          </p>
          <Link
            to="/join"
            className="btn-amber rounded-full px-10 py-3.5 text-base font-semibold inline-flex items-center justify-center"
          >
            Get Listed Free
          </Link>
        </div>
      </section>
    </div>
  );
}
