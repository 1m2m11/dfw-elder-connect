import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            AllForms<span className="gradient-text">Hub</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <a
            href="mailto:support@allformhubs.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
          <a
            href="#forms"
            className="text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors"
          >
            Browse Forms
          </a>
        </nav>
      </div>
    </header>
  );
}
