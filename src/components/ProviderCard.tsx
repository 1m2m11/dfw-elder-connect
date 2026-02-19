import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategoryById } from '@/lib/categories';

interface Provider {
  id: string;
  full_name: string;
  category: string;
  served_zips: string[];
  bio: string;
  photo_url?: string | null;
  featured?: boolean;
}

interface ProviderCardProps {
  provider: Provider;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const cat = getCategoryById(provider.category);

  return (
    <div className="card-warm p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200 relative">
      {provider.featured && (
        <span className="absolute top-3 right-3 badge-clay">★ Featured</span>
      )}

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest font-serif font-bold text-lg flex-shrink-0">
          {provider.photo_url ? (
            <img src={provider.photo_url} alt={provider.full_name} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            getInitials(provider.full_name)
          )}
        </div>
        <div>
          <h3 className="font-serif font-semibold text-foreground leading-tight">{provider.full_name}</h3>
          {cat && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.color}`}>
              {cat.emoji} {cat.label}
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{provider.bio}</p>

      <div className="flex flex-wrap gap-1">
        {provider.served_zips.slice(0, 4).map((zip) => (
          <span key={zip} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md font-mono">
            {zip}
          </span>
        ))}
        {provider.served_zips.length > 4 && (
          <span className="text-xs text-muted-foreground">+{provider.served_zips.length - 4} more</span>
        )}
      </div>

      <Link
        to={`/providers/${provider.id}`}
        className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-forest hover:gap-2 transition-all"
      >
        View Profile <ArrowRight size={14} />
      </Link>
    </div>
  );
}
