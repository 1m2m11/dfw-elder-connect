import { useState, KeyboardEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CATEGORIES } from '@/lib/categories';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const schema = z.object({
  full_name: z.string().min(2, 'Full legal name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number is required'),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(400, 'Bio must be 400 characters or less'),
  agreed: z.boolean().refine((v) => v === true, 'You must agree to continue'),
});

type FormData = z.infer<typeof schema>;

export default function Join() {
  const [zips, setZips] = useState<string[]>([]);
  const [zipInput, setZipInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
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

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setCategoryError('');
  };

  const onSubmit = async (data: FormData) => {
    if (selectedCategories.length === 0) {
      setCategoryError('Please select at least one category');
      return;
    }

    let photo_url: string | null = null;

    if (photoFile) {
      const ext = photoFile.name.split('.').pop();
      const path = `${Date.now()}.${ext}`;
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
      category: selectedCategories[0], // legacy field
      categories: selectedCategories,
      served_zips: zips,
      bio: data.bio,
      photo_url,
      approved: false,
      featured: false,
    });

    if (!error) {
      setSubmittedEmail(data.email);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen section-offwhite flex items-center justify-center px-4">
        <div className="card-warm p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">Thank you!</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your profile is under review. We'll notify you at <strong>{submittedEmail}</strong> within 1 business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-offwhite py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Get Listed Free on Zenihand</h1>
          <p className="text-muted-foreground text-lg">Independent DFW providers only. Your profile goes live after a quick review. Free, always.</p>
        </div>

        <div className="card-warm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div>
              <label className="text-sm font-semibold mb-1.5 block text-foreground">Full Legal Name *</label>
              <input
                {...register('full_name')}
                placeholder="Your full name"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {errors.full_name && <p className="text-xs text-destructive mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block text-foreground">Email *</label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block text-foreground">Phone *</label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="(214) 555-0000"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block text-foreground">ZIP Codes Served</label>
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
              <input
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, '').slice(0, 5))}
                onKeyDown={addZip}
                placeholder="e.g. 75001"
                maxLength={5}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block text-foreground">Services Offered * (select all that apply)</label>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg border border-transparent hover:border-border hover:bg-secondary/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="w-4 h-4 rounded accent-primary flex-shrink-0"
                    />
                    <span className="text-sm text-foreground/80">
                      {cat.emoji} {cat.label}
                    </span>
                  </label>
                ))}
              </div>
              {categoryError && <p className="text-xs text-destructive mt-1">{categoryError}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-foreground">Bio *</label>
                <span className={`text-xs ${bioValue.length > 380 ? 'text-amber font-semibold' : 'text-muted-foreground'}`}>
                  {bioValue.length}/400
                </span>
              </div>
              <textarea
                {...register('bio')}
                placeholder="Tell families about your experience and approach..."
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
              {errors.bio && <p className="text-xs text-destructive mt-1">{errors.bio.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block text-foreground">
                Profile Photo <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
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
                      className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                    />
                  )}
                />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  I confirm I am an independent contractor providing non-medical services only. I am not an employee of Zenihand.
                  I understand Zenihand is a free directory and does not supervise or guarantee my services.
                </span>
              </label>
              {errors.agreed && <p className="text-xs text-destructive mt-1">{errors.agreed.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-amber rounded-full py-3.5 text-base font-semibold w-full disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
