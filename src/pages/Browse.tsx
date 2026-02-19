import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProviderCard from '@/components/ProviderCard';
import { CATEGORIES } from '@/lib/categories';
import { Search, X } from 'lucide-react';

interface Provider {
  id: string;
  full_name: string;
  category: string;
  categories?: string[];
  served_zips: string[];
  bio: string;
  photo_url?: string | null;
  featured?: boolean;
}

export default function Browse() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [zipSearch, setZipSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(category || 'all');

  useEffect(() => {
    setActiveCategory(category || 'all');
  }, [category]);

  useEffect(() => {
    fetchProviders();
  }, [activeCategory]);

  async function fetchProviders() {
    setLoading(true);
    let query = supabase
      .from('providers')
      .select('*')
      .eq('approved', true)
      .order('featured', { ascending: false });

    if (activeCategory !== 'all') {
      // Filter by both category (legacy) and categories array
      query = query.or(`category.eq.${activeCategory},categories.cs.{${activeCategory}}`);
    }

    const { data, error } = await query;
    if (!error && data) setProviders(data as Provider[]);
    setLoading(false);
  }

  const filtered = zipSearch.trim().length === 5
    ? providers.filter((p) => p.served_zips.includes(zipSearch.trim()))
    : providers;

  const hasNoResults = !loading && filtered.length === 0;
  const isZipEmpty = zipSearch.trim().length === 5 && filtered.length === 0;

  return (
    <div className="min-h-screen section-offwhite">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Browse Independent Providers</h1>
          <p className="text-muted-foreground text-base">DFW non-medical aging-in-place support — contact providers directly</p>
        </div>

        {/* Filters row */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveCategory('all'); navigate('/browse'); }}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground/70 border-border hover:border-primary hover:text-primary'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); navigate(`/browse/${cat.id}`); }}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground/70 border-border hover:border-primary hover:text-primary'
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* ZIP Search */}
          <div className="flex items-center gap-3 max-w-xs">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Filter by ZIP code"
                value={zipSearch}
                onChange={(e) => setZipSearch(e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-full bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            {zipSearch && (
              <button onClick={() => setZipSearch('')} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-warm p-5 h-52 animate-pulse bg-muted/50" />
            ))}
          </div>
        ) : hasNoResults ? (
          <div className="text-center py-20 text-muted-foreground">
            {isZipEmpty ? (
              <>
                <p className="text-lg font-semibold text-primary mb-2">No providers found in this ZIP yet</p>
                <p className="text-sm">Try another ZIP code or browse all providers.</p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-primary mb-2">No providers found</p>
                <p className="text-sm">Try a different category or ZIP code.</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
