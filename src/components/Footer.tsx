import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3">Zenihand</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Connecting DFW families with independent non-medical support providers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-primary-foreground/50">Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/browse', label: 'Browse Providers' },
                { to: '/join', label: 'Get Listed' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-primary-foreground/50">Contact</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="mailto:support@zenihand.com" className="text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors">
                  support@zenihand.com
                </a>
              </li>
              <li>
                <span className="text-sm text-primary-foreground/60">Dallas–Fort Worth, TX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6">
          <p className="text-xs text-primary-foreground/55 leading-relaxed max-w-3xl mb-3">
            Have a question about listings or using Zenihand? Email{' '}
            <a href="mailto:support@zenihand.com" className="underline hover:text-primary-foreground transition-colors">
              support@zenihand.com
            </a>{' '}
            and we'll respond within one business day.
          </p>
          <p className="text-xs text-primary-foreground/55 leading-relaxed max-w-3xl mb-3">
            Zenihand is a directory platform connecting families with independent providers. We do not employ, supervise, screen, or guarantee any provider or service. All services are non-medical. Families arrange services directly with providers.
          </p>
          <p className="text-xs text-primary-foreground/40 mt-2">
            © 2025 Zenihand · Dallas–Fort Worth, TX
          </p>
        </div>
      </div>
    </footer>
  );
}
