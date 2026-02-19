import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProviderCard from '@/components/ProviderCard';
import { CATEGORIES } from '@/lib/categories';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Provider {
  id: string;
  full_name: string;
  category: string;
  served_zips: string[];
  bio: string;
  photo_url?: string | null;
  featured?: boolean;
}

export default function Browse() {
  const { category } = useParams();
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
    let query = supabase.from('providers').select('*').eq('approved', true).order('featured', { ascending: false });
    if (activeCategory !== 'all') {
      query = query.eq('category', activeCategory);
    }
    const { data, error } = await query;
    if (!error && data) setProviders(data as Provider[]);
    setLoading(false);
  }

  const filtered = zipSearch.trim()
    ? providers.filter((p) => p.served_zips.some((z) => z.includes(zipSearch.trim())))
    : providers;

  return (
    <div className="min-h-screen section-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">Browse Independent Providers</h1>
          <p className="text-muted-foreground">DFW non-medical aging-in-place support, direct from independent providers</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <Link to="/browse">
              <Button
                size="sm"
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                className={activeCategory === 'all' ? 'btn-primary rounded-full' : 'rounded-full'}
                onClick={() => setActiveCategory('all')}
              >
                All
              </Button>
            </Link>
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/browse/${cat.id}`}>
                <Button
                  size="sm"
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  className={activeCategory === cat.id ? 'btn-primary rounded-full' : 'rounded-full'}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.emoji} {cat.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* ZIP Search */}
        <div className="flex items-center gap-3 mb-8 max-w-xs">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter by ZIP code"
              value={zipSearch}
              onChange={(e) => setZipSearch(e.target.value)}
              className="pl-9 rounded-full bg-background"
            />
          </div>
          {zipSearch && (
            <Button variant="ghost" size="sm" onClick={() => setZipSearch('')} className="text-muted-foreground">
              Clear
            </Button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-warm p-5 h-48 animate-pulse bg-muted/50" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-serif mb-2">No providers found</p>
            <p className="text-sm">Try a different category or ZIP code</p>
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
