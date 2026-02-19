import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/categories';

const trustItems = [
  { icon: '✦', text: 'Independent Providers Only' },
  { icon: '✦', text: 'Non-Medical Services' },
  { icon: '✦', text: 'DFW Local Directory' },
  { icon: '✦', text: 'Free to Browse & Contact' },
];

const howItWorks = [
  {
    step: '1',
    title: 'Browse by Category or ZIP',
    desc: 'Browse independent providers by category or ZIP code',
  },
  {
    step: '2',
    title: 'Review & Contact Directly',
    desc: 'Review profiles and contact providers directly',
  },
  {
    step: '3',
    title: 'Arrange on Your Terms',
    desc: "Arrange services on your own terms — we don't get involved",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative section-cream py-20 sm:py-28 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(145 35% 26% / 0.07), transparent 70%), hsl(var(--cream))',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-clay/10 text-clay text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            DFW Aging-in-Place Support Directory
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Find Trusted, Independent Support<br className="hidden sm:block" /> for Aging at Home
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Zenihand connects DFW families with independent, non-medical support providers — on your terms, not ours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="btn-primary rounded-full px-8 text-base">
              <Link to="/browse">Browse Providers</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-outline-primary rounded-full px-8 text-base">
              <Link to="/join">List Your Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-forest py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle size={16} className="text-clay flex-shrink-0" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 section-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">Browse by Category</h2>
            <p className="text-muted-foreground text-lg">Find the right kind of support for your family</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/browse/${cat.id}`}
                className="card-warm p-6 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
              >
                <span className="text-4xl">{cat.emoji}</span>
                <h3 className="font-serif font-semibold text-foreground leading-snug">{cat.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-forest group-hover:gap-2 transition-all">
                  Browse <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 section-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest text-primary-foreground font-serif font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 section-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="disclaimer-box text-center">
            <p>
              <strong>Zenihand is a free directory service.</strong> We do not employ, supervise, screen, or guarantee any provider.
              All providers are independent contractors. Families are responsible for their own vetting and arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="bg-forest py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Are you an independent support provider in DFW?
          </h2>
          <p className="text-primary-foreground/75 text-lg mb-8">
            Create your free listing and connect with families looking for your services.
          </p>
          <Button asChild size="lg" className="bg-clay hover:bg-clay/90 text-primary-foreground rounded-full px-10 text-base">
            <Link to="/join">Create Your Free Listing</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
