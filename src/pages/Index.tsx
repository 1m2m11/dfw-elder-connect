import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/categories';

const trustItems = [
  'Independent providers, not employees.',
  'Non-medical services only.',
  'Families contact providers directly to interview.',
];

const howItWorks = [
  { step: '1', title: 'Browse', desc: 'Search independent providers by category and ZIP code at no cost.' },
  { step: '2', title: 'Contact Directly', desc: 'Reach out to providers yourself. Ask questions. Take your time.' },
  { step: '3', title: 'Arrange on Your Terms', desc: 'Set up services directly. Zenihand is not involved in the arrangement.' },
];

const guidanceItems = [
  { label: 'Personal Aide', desc: 'Help with daily routines such as bathing, dressing, and mobility' },
  { label: 'Companion Visits', desc: 'Conversation, check-ins, and social support' },
  { label: 'Senior Housekeeping', desc: 'Light cleaning and home upkeep' },
  { label: 'Errand & Grocery Help', desc: 'Shopping, appointments, and transportation support' },
  { label: 'Meal Prep Assistance', desc: 'Preparing simple meals at home' },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative overflow-hidden text-center"
        style={{
          background: 'linear-gradient(160deg, #1a2e4a 0%, #243d5e 55%, #2a4a6e 100%)',
          padding: '88px 40px 80px',
        }}
      >
        {/* bottom shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        <div className="max-w-3xl mx-auto relative">
          {/* Eyebrow */}
          <div
            className="inline-block mb-6"
            style={{
              background: 'rgba(196,135,62,0.18)',
              color: '#f0c070',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '5px 16px',
              borderRadius: 40,
              border: '1px solid rgba(196,135,62,0.3)',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            DFW Local Directory · Non-Medical Only
          </div>

          <h1
            style={{
              fontFamily: 'Lora, Georgia, serif',
              fontSize: 'clamp(2.2rem, 5vw, 3rem)',
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.22,
              marginBottom: 22,
            }}
          >
            Independent Help for<br />
            <em style={{ fontStyle: 'italic', color: '#f0c070' }}>Aging at Home</em> in DFW
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: 520, margin: '0 auto 38px', lineHeight: 1.75, fontFamily: 'Outfit, sans-serif' }}>
            Connecting DFW families with trusted independent providers offering non-medical support at home.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/browse"
              style={{ background: '#c4873e', color: 'white', border: 'none', borderRadius: 7, padding: '13px 30px', fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
            >
              Browse Providers
            </Link>
            <Link
              to="/join"
              style={{ background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.45)', borderRadius: 7, padding: '12px 30px', fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}
            >
              Get Listed Free
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #dde2e8', padding: '16px 40px' }}>
        <div className="flex justify-center gap-12 flex-wrap">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center" style={{ gap: 9 }}>
              <div style={{ width: 6, height: 6, background: '#c4873e', borderRadius: '50%', flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#4a5c6a', fontFamily: 'Outfit, sans-serif' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Guidance */}
      <section style={{ background: '#f0f4f8', borderTop: '1px solid #dde2e8', borderBottom: '1px solid #dde2e8', padding: '52px 40px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.5rem', color: '#1a2e4a', marginBottom: 14 }}>Not Sure Where to Start?</h2>
          <p style={{ fontSize: '0.94rem', color: '#4a5c6a', marginBottom: 22, lineHeight: 1.7, fontFamily: 'Outfit, sans-serif' }}>
            Choosing the right type of help can feel overwhelming. Here's a quick guide:
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 22 }}>
            {guidanceItems.map((item) => (
              <li key={item.label} style={{ fontSize: '0.93rem', color: '#4a5c6a', lineHeight: 1.55, fontFamily: 'Outfit, sans-serif' }}>
                <strong style={{ color: '#1a2e4a', fontWeight: 600 }}>{item.label}</strong> — {item.desc}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '0.86rem', color: '#6e8290', fontStyle: 'italic', lineHeight: 1.65, fontFamily: 'Outfit, sans-serif' }}>
            You can contact providers directly to ask questions before making any decision. Take your time — there's no pressure.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section style={{ background: '#ffffff', padding: '64px 40px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#c4873e', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>Browse by Type</div>
          <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.7rem', color: '#1a2e4a', marginBottom: 28 }}>What kind of support do you need?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/browse/${cat.id}`}
                className="cat-card group"
                style={{ textDecoration: 'none' }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a2e4a', lineHeight: 1.35 }}>{cat.label}</div>
                <div style={{ fontSize: '0.78rem', color: '#8295a3', lineHeight: 1.55, flex: 1, fontFamily: 'Outfit, sans-serif' }}>{cat.description}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2563EB', marginTop: 6, fontFamily: 'Outfit, sans-serif' }}>Browse →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ background: '#1a2e4a', padding: '64px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#f0c070', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>Simple Process</div>
          <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.7rem', color: 'white', marginBottom: 40 }}>How Zenihand Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} style={{ textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(240,192,112,0.45)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <span style={{ color: '#f0c070', fontFamily: 'Lora, Georgia, serif', fontSize: '1.1rem', fontWeight: 600 }}>{step.step}</span>
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontFamily: 'Outfit, sans-serif' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section style={{ background: '#1a2e4a', padding: '48px 40px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.45rem', color: 'white', marginBottom: 12 }}>
            Are you an independent support provider in DFW?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', marginBottom: 30, lineHeight: 1.7, fontFamily: 'Outfit, sans-serif' }}>
            Create your free listing and connect with families looking for your services.
          </p>
          <Link
            to="/join"
            style={{ background: '#c4873e', color: 'white', border: 'none', borderRadius: 7, padding: '13px 34px', fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
          >
            Get Listed Free
          </Link>
        </div>
      </section>
    </div>
  );
}
