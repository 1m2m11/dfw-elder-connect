import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/browse', label: 'Browse Providers' },
    { to: '/join', label: 'List Your Services' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-border/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-forest">Zenihand</span>
          <span className="hidden sm:block text-xs text-muted-foreground font-medium mt-1">DFW</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'text-forest font-semibold'
                  : 'text-foreground/70 hover:text-forest'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="btn-primary rounded-full px-5">
            <Link to="/join">Get Listed Free</Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 text-foreground/70" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-cream px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-forest py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="btn-primary rounded-full w-full mt-1">
            <Link to="/join" onClick={() => setOpen(false)}>Get Listed Free</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
