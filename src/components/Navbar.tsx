import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header style={{ height: 62, background: '#ffffff', borderBottom: '1px solid #dde2e8', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, color: '#1a2e4a', textDecoration: 'none' }}>
          Zeni<span style={{ color: '#c4873e' }}>hand</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center" style={{ gap: 20 }}>
          <Link
            to="/#how-it-works"
            style={{ fontSize: '0.88rem', fontWeight: 500, color: '#4a5c6a', textDecoration: 'none', fontFamily: 'Outfit, sans-serif' }}
          >
            How It Works
          </Link>
          <Link
            to="/join"
            style={{
              background: 'transparent',
              color: '#1a2e4a',
              border: '1.5px solid #1a2e4a',
              borderRadius: 6,
              padding: '8px 18px',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Get Listed Free
          </Link>
          <Link
            to="/browse"
            style={{
              background: '#c4873e',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '9px 20px',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Browse Providers
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" style={{ color: '#4a5c6a' }} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#ffffff', borderTop: '1px solid #dde2e8', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link to="/#how-it-works" style={{ fontSize: '0.9rem', color: '#4a5c6a', textDecoration: 'none', fontFamily: 'Outfit, sans-serif' }} onClick={() => setOpen(false)}>
            How It Works
          </Link>
          <Link
            to="/browse"
            style={{ background: '#c4873e', color: 'white', borderRadius: 6, padding: '10px 16px', fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}
            onClick={() => setOpen(false)}
          >
            Browse Providers
          </Link>
          <Link
            to="/join"
            style={{ background: 'transparent', color: '#1a2e4a', border: '1.5px solid #1a2e4a', borderRadius: 6, padding: '9px 16px', fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}
            onClick={() => setOpen(false)}
          >
            Get Listed Free
          </Link>
        </div>
      )}
    </header>
  );
}
