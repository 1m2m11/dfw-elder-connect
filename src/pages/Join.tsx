import { useState, KeyboardEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CATEGORIES } from '@/lib/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const schema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone is required'),
  category: z.enum(['aide', 'companion', 'housekeeping', 'errands', 'meals'], {
    required_error: 'Please select a category',
  }),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(400, 'Bio must be 400 characters or less'),
  agreed: z.boolean().refine((v) => v === true, 'You must agree to continue'),
});

type FormData = z.infer<typeof schema>;

export default function Join() {
  const [zips, setZips] = useState<string[]>([]);
  const [zipInput, setZipInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { agreed: false },
  });

  const bioValue = watch('bio') || '';

  const addZip = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = zipInput.trim();
      if (val && /^\d{5}$/.test(val) && !zips.includes(val)) {
        setZips((prev) => [...prev, val]);
        setZipInput('');
      }
    }
  };

  const removeZip = (zip: string) => setZips((prev) => prev.filter((z) => z !== zip));

  const onSubmit = async (data: FormData) => {
    let photo_url: string | null = null;

    if (photoFile) {
      const ext = photoFile.name.split('.').pop();
      const path = `provider-photos/${Date.now()}.${ext}`;
      const { data: uploaded } = await supabase.storage.from('provider-photos').upload(path, photoFile);
      if (uploaded) {
        const { data: urlData } = supabase.storage.from('provider-photos').getPublicUrl(path);
        photo_url = urlData.publicUrl;
      }
    }

    const { error } = await supabase.from('providers').insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      category: data.category,
      served_zips: zips,
      bio: data.bio,
      photo_url,
      approved: false,
      featured: false,
    });

    if (!error) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen section-cream flex items-center justify-center px-4">
        <div className="card-warm p-10 max-w-md w-full text-center">
          <div className="text-4xl mb-4">🌿</div>
          <h2 className="font-serif text-2xl font-bold text-forest mb-3">Thanks for registering!</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your profile is under review. We typically respond within 1 business day. Welcome to Zenihand!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-cream py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">List Your Services on Zenihand</h1>
          <p className="text-muted-foreground text-lg">Free for independent providers. Your listing goes live after a quick review.</p>
        </div>

        <div className="card-warm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div>
              <label className="text-sm font-medium mb-1 block">Full Name *</label>
              <Input {...register('full_name')} placeholder="Your full name" />
              {errors.full_name && <p className="text-xs text-destructive mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <Input {...register('email')} type="email" placeholder="you@email.com" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Phone *</label>
              <Input {...register('phone')} type="tel" placeholder="(214) 555-0000" />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">ZIP Codes Served</label>
              <p className="text-xs text-muted-foreground mb-2">Type a 5-digit ZIP and press Enter to add</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {zips.map((zip) => (
                  <span key={zip} className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full font-mono">
                    {zip}
                    <button type="button" onClick={() => removeZip(zip)} className="text-muted-foreground hover:text-destructive ml-1">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                onKeyDown={addZip}
                placeholder="e.g. 75001"
                maxLength={5}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Category *</label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a category...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                    ))}
                  </select>
                )}
              />
              {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Short Bio *</label>
                <span className={`text-xs ${bioValue.length > 380 ? 'text-clay' : 'text-muted-foreground'}`}>
                  {bioValue.length}/400
                </span>
              </div>
              <Textarea {...register('bio')} placeholder="Tell families about your experience and approach..." rows={4} />
              {errors.bio && <p className="text-xs text-destructive mt-1">{errors.bio.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Profile Photo <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80 cursor-pointer"
              />
            </div>

            <div className="border-t border-border pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <Controller
                  control={control}
                  name="agreed"
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mt-0.5 w-4 h-4 accent-forest flex-shrink-0"
                    />
                  )}
                />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  I confirm that I am an independent contractor providing non-medical services only. I am not an employee of Zenihand.
                  I understand Zenihand is a directory platform and does not supervise, employ, or guarantee my services.
                </span>
              </label>
              {errors.agreed && <p className="text-xs text-destructive mt-1">{errors.agreed.message}</p>}
            </div>

            <Button type="submit" className="btn-primary rounded-full w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
