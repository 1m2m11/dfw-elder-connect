import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-forest text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-3">Zenihand</h3>
            <p className="text-sm text-primary-foreground/75 leading-relaxed">
              Connecting DFW families with independent aging-in-place support.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-primary-foreground/60">Navigate</h4>
            <ul className="flex flex-col gap-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/browse', label: 'Browse Providers' },
                { to: '/join', label: 'List Your Services' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-primary-foreground/60">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li><span className="text-sm text-primary-foreground/60 cursor-default">Privacy Policy</span></li>
              <li><span className="text-sm text-primary-foreground/60 cursor-default">Terms of Use</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6">
          <p className="text-xs text-primary-foreground/55 leading-relaxed max-w-3xl">
            Zenihand is a free directory platform. We do not employ, supervise, or guarantee any provider or service.
            All providers are independent contractors. Non-medical services only.
          </p>
          <p className="text-xs text-primary-foreground/40 mt-2">
            © 2025 Zenihand · Dallas–Fort Worth, TX
          </p>
        </div>
      </div>
    </footer>
  );
}
