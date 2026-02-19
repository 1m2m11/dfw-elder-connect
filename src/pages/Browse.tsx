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

  return (
    <div style={{ background: '#f8f9fb', minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #dde2e8', padding: '40px 40px 32px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#c4873e', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>Providers</div>
          <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.7rem', color: '#1a2e4a', marginBottom: 20 }}>Browse Independent Providers</h1>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => { setActiveCategory('all'); navigate('/browse'); }}
              style={{
                padding: '6px 16px',
                fontSize: '0.82rem',
                fontWeight: 500,
                borderRadius: 40,
                border: activeCategory === 'all' ? '1.5px solid #1a2e4a' : '1.5px solid #dde2e8',
                background: activeCategory === 'all' ? '#1a2e4a' : 'transparent',
                color: activeCategory === 'all' ? 'white' : '#4a5c6a',
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); navigate(`/browse/${cat.id}`); }}
                style={{
                  padding: '6px 16px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  borderRadius: 40,
                  border: activeCategory === cat.id ? '1.5px solid #1a2e4a' : '1.5px solid #dde2e8',
                  background: activeCategory === cat.id ? '#1a2e4a' : 'transparent',
                  color: activeCategory === cat.id ? 'white' : '#4a5c6a',
                  cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'all 0.15s',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ZIP Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, maxWidth: 280 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#8295a3' }} />
              <input
                placeholder="Filter by ZIP code"
                value={zipSearch}
                onChange={(e) => setZipSearch(e.target.value.replace(/\D/g, '').slice(0, 5))}
                style={{ width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, fontSize: '0.82rem', border: '1.5px solid #dde2e8', borderRadius: 40, background: '#ffffff', outline: 'none', fontFamily: 'Outfit, sans-serif', color: '#1a2e4a' }}
              />
            </div>
            {zipSearch && (
              <button onClick={() => setZipSearch('')} style={{ color: '#8295a3', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '40px 40px' }}>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-warm h-52 animate-pulse" style={{ background: '#e8edf2' }} />
            ))}
          </div>
        ) : hasNoResults ? (
          <div style={{ background: '#ffffff', border: '1.5px dashed #dde2e8', borderRadius: 10, padding: '64px 32px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.98rem', color: '#4a5c6a', marginBottom: 22, lineHeight: 1.75, fontFamily: 'Outfit, sans-serif' }}>
              We're currently onboarding independent providers in DFW.<br />Check back soon or get listed today.
            </p>
            <Link
              to="/join"
              style={{ background: '#2563EB', color: 'white', border: 'none', borderRadius: 7, padding: '12px 28px', fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
            >
              Get Listed Free
            </Link>
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
