import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategoryById } from '@/lib/categories';

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

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function ProviderCard({ provider }: { provider: Provider }) {
  const categoryIds = provider.categories?.length ? provider.categories : [provider.category];
  const primaryCat = getCategoryById(categoryIds[0]);

  return (
    <div className="card-warm" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
      {provider.featured && (
        <span className="badge-amber" style={{ position: 'absolute', top: 12, right: 12 }}>★ Featured</span>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'hsl(213 50% 19% / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', color: '#1a2e4a', flexShrink: 0, overflow: 'hidden' }}>
          {provider.photo_url ? (
            <img src={provider.photo_url} alt={provider.full_name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            getInitials(provider.full_name)
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h3 style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 600, color: '#1a2e4a', fontSize: '0.95rem', lineHeight: 1.3 }}>{provider.full_name}</h3>
          {primaryCat && (
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#4a5c6a', background: '#f0f4f8', padding: '2px 8px', borderRadius: 40, fontFamily: 'Outfit, sans-serif', width: 'fit-content' }}>
              {primaryCat.label}
            </span>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.82rem', color: '#6e8290', lineHeight: 1.6, fontFamily: 'Outfit, sans-serif', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{provider.bio}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {provider.served_zips.slice(0, 4).map((zip) => (
          <span key={zip} style={{ fontSize: '0.72rem', background: '#f0f4f8', color: '#4a5c6a', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>{zip}</span>
        ))}
        {provider.served_zips.length > 4 && (
          <span style={{ fontSize: '0.72rem', color: '#8295a3', fontFamily: 'Outfit, sans-serif' }}>+{provider.served_zips.length - 4} more</span>
        )}
      </div>

      <Link
        to={`/providers/${provider.id}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', fontWeight: 600, color: '#c4873e', textDecoration: 'none', marginTop: 'auto', fontFamily: 'Outfit, sans-serif' }}
      >
        View Profile <ArrowRight size={13} />
      </Link>
    </div>
  );
}
