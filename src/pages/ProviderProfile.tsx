import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getCategoryById } from '@/lib/categories';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface Provider {
  id: string;
  full_name: string;
  category: string;
  categories?: string[];
  served_zips: string[];
  bio: string;
  photo_url?: string | null;
  phone?: string;
  email?: string;
  featured?: boolean;
}

const contactSchema = z.object({
  sender_name: z.string().min(2, 'Name is required'),
  sender_email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (!id) return;
    supabase.from('providers').select('*').eq('id', id).eq('approved', true).single()
      .then(({ data }) => {
        setProvider(data as Provider | null);
        setLoading(false);
      });
  }, [id]);

  const onSubmit = async (data: ContactForm) => {
    if (!provider) return;
    const { error } = await supabase.from('inquiries').insert({
      provider_id: provider.id,
      sender_name: data.sender_name,
      sender_email: data.sender_email,
      message: data.message,
    });
    if (error) {
      toast({ title: 'Something went wrong', description: 'Please try again.', variant: 'destructive' });
    } else {
      setSubmitted(true);
      reset();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen section-offwhite flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen section-offwhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Provider not found.</p>
          <Link to="/browse" className="text-amber font-semibold hover:underline">← Back to Browse</Link>
        </div>
      </div>
    );
  }

  const categoryIds = provider.categories?.length ? provider.categories : [provider.category];
  const primaryCat = getCategoryById(categoryIds[0]);

  return (
    <div className="min-h-screen section-offwhite py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={15} /> Back to Browse
        </Link>

        {/* Profile Header */}
        <div className="card-warm p-8 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl flex-shrink-0 overflow-hidden">
              {provider.photo_url ? (
                <img src={provider.photo_url} alt={provider.full_name} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                getInitials(provider.full_name)
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-primary leading-tight">{provider.full_name}</h1>
              {primaryCat && (
                <span className={`text-sm font-medium px-3 py-1 rounded-full w-fit ${primaryCat.color}`}>
                  {primaryCat.emoji} {primaryCat.label}
                </span>
              )}
              {provider.featured && (
                <span className="badge-amber w-fit">★ Featured</span>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-5 flex flex-wrap gap-4">
            {provider.phone && (
              <a
                href={`tel:${provider.phone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-amber hover:underline"
              >
                <Phone size={15} />
                {provider.phone}
              </a>
            )}
            {provider.email && (
              <a
                href={`mailto:${provider.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-amber hover:underline"
              >
                <Mail size={15} />
                {provider.email}
              </a>
            )}
          </div>

          <div className="mt-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">ZIP Codes Served</h2>
            <div className="flex flex-wrap gap-2">
              {provider.served_zips.map((zip) => (
                <span key={zip} className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-mono">
                  {zip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">About</h2>
            <p className="text-foreground/80 leading-relaxed">{provider.bio}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-box mb-6">
          This provider is an independent contractor. Services are non-medical only. Zenihand does not employ, supervise, or guarantee this provider. Please conduct your own interview before making any arrangements.
        </div>

        {/* Contact Form */}
        <div className="card-warm p-8">
          <h2 className="text-xl font-bold text-primary mb-1">Send a Message to {provider.full_name}</h2>
          <p className="text-sm text-muted-foreground mb-5">Your message goes directly to the provider.</p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">✉️</div>
              <p className="text-lg font-bold text-primary mb-2">Message Sent!</p>
              <p className="text-muted-foreground text-sm">
                Your message has been sent. The provider will contact you directly.
              </p>
              <button
                className="mt-5 btn-outline-primary rounded-full px-6 py-2 text-sm font-semibold"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Your Name *</label>
                <input
                  {...register('sender_name')}
                  placeholder="Jane Smith"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errors.sender_name && <p className="text-xs text-destructive mt-1">{errors.sender_name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Your Email *</label>
                <input
                  {...register('sender_email')}
                  type="email"
                  placeholder="jane@email.com"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errors.sender_email && <p className="text-xs text-destructive mt-1">{errors.sender_email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Message *</label>
                <textarea
                  {...register('message')}
                  placeholder="Tell the provider what kind of support you're looking for..."
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-amber rounded-full py-3 text-sm font-semibold w-full disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
