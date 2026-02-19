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
      <section className="section-offwhite py-20 sm:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, hsl(213 50% 19% / 0.06), transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-amber/10 text-amber text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-amber/20">
            DFW Non-Medical Aging-in-Place Directory
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight mb-6">
            Find Independent Non-Medical Support in DFW
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
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
              className="rounded-full px-8 py-3.5 text-base font-semibold inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Get Listed Free
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-primary py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 items-center text-center sm:text-left">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary-foreground/80">
                <span className="text-amber font-bold text-lg leading-none">·</span>
                <span className="text-sm font-medium">{item}</span>
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
            <p className="text-muted-foreground text-lg">Find the right kind of support for your family</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/browse/${cat.id}`}
                className="card-warm p-6 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
              >
                <h3 className="font-semibold text-foreground leading-snug text-base">{cat.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber group-hover:gap-2 transition-all">
                  Browse <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 section-lightgrey">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {step.step}
                </div>
                <h3 className="font-bold text-xl text-primary mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{step.desc}</p>
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
          <p className="text-primary-foreground/70 text-lg mb-8">
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
