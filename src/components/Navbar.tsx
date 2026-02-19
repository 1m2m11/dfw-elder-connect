import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/browse', label: 'Browse' },
    { to: '/#how-it-works', label: 'How It Works' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary tracking-tight">Zenihand</span>
          <span className="hidden sm:block text-xs text-muted-foreground font-medium border border-border rounded px-1.5 py-0.5">DFW</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'text-primary font-semibold'
                  : 'text-foreground/60 hover:text-primary'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 btn-amber rounded-full px-5 py-2 text-sm font-semibold"
          >
            Browse Providers
          </Link>
          <Link
            to="/join"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
          >
            Get Listed Free
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 text-foreground/70" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-primary py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/browse"
            className="btn-amber rounded-full text-center px-5 py-2.5 text-sm font-semibold mt-1"
            onClick={() => setOpen(false)}
          >
            Browse Providers
          </Link>
          <Link
            to="/join"
            className="rounded-full text-center px-5 py-2.5 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
            onClick={() => setOpen(false)}
          >
            Get Listed Free
          </Link>
        </div>
      )}
    </header>
  );
}
