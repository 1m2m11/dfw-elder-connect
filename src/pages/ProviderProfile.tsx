import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getCategoryById } from '@/lib/categories';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface Provider {
  id: string;
  full_name: string;
  category: string;
  served_zips: string[];
  bio: string;
  photo_url?: string | null;
  featured?: boolean;
}

const contactSchema = z.object({
  sender_name: z.string().min(2, 'Name is required'),
  sender_email: z.string().email('Valid email required'),
  sender_phone: z.string().optional(),
  message: z.string().min(20, 'Message must be at least 20 characters'),
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
      sender_phone: data.sender_phone || null,
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
      <div className="min-h-screen section-cream flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen section-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Provider not found.</p>
          <Link to="/browse" className="text-forest font-semibold hover:underline">← Back to Browse</Link>
        </div>
      </div>
    );
  }

  const cat = getCategoryById(provider.category);

  return (
    <div className="min-h-screen section-cream py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest mb-6">
          <ArrowLeft size={15} /> Back to Browse
        </Link>

        {/* Profile Header */}
        <div className="card-warm p-8 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center text-forest font-serif font-bold text-2xl flex-shrink-0">
              {provider.photo_url ? (
                <img src={provider.photo_url} alt={provider.full_name} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                getInitials(provider.full_name)
              )}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground mb-1">{provider.full_name}</h1>
              {cat && (
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${cat.color}`}>
                  {cat.emoji} {cat.label}
                </span>
              )}
              {provider.featured && (
                <span className="ml-2 badge-clay">★ Featured</span>
              )}
            </div>
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
          This provider is an independent contractor, not an employee or agent of Zenihand. Services listed are non-medical only.
          Please conduct your own interview and reference check before making any arrangements.
        </div>

        {/* Contact Form */}
        <div className="card-warm p-8">
          <h2 className="font-serif text-xl font-bold mb-1">Send a Message to {provider.full_name}</h2>
          <p className="text-sm text-muted-foreground mb-5">Your message goes directly to the provider.</p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">✉️</div>
              <p className="font-serif text-lg font-semibold text-forest mb-2">Message Sent!</p>
              <p className="text-muted-foreground text-sm">
                Your message has been sent. The provider will follow up with you directly.
              </p>
              <Button variant="outline" className="mt-5" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Your Name *</label>
                <Input {...register('sender_name')} placeholder="Jane Smith" />
                {errors.sender_name && <p className="text-xs text-destructive mt-1">{errors.sender_name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Your Email *</label>
                <Input {...register('sender_email')} type="email" placeholder="jane@email.com" />
                {errors.sender_email && <p className="text-xs text-destructive mt-1">{errors.sender_email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Your Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
                <Input {...register('sender_phone')} type="tel" placeholder="(214) 555-0000" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Message *</label>
                <Textarea {...register('message')} placeholder="Tell the provider what kind of support you're looking for..." rows={4} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" className="btn-primary rounded-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
