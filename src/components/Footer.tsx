import { FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/60 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-background" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                AllForms<span className="text-primary">Hub</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Your one-stop destination for free downloadable forms. Tax, legal, immigration, business and more.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-background/30 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Categories
            </h4>
            {["Tax & IRS", "Immigration", "Business", "Employment", "Legal"].map((c) => (
              <a key={c} href="#forms" className="block text-sm text-background/50 hover:text-background transition-colors mb-2">
                {c}
              </a>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-background/30 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Support
            </h4>
            <a href="mailto:support@allformhubs.com" className="text-sm text-primary hover:text-primary/80 transition-colors">
              support@allformhubs.com
            </a>
            <p className="text-xs text-background/40 mt-4 leading-relaxed">
              All forms link to official government and institutional sources. AllFormsHub does not provide legal, tax, or immigration advice.
            </p>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center text-xs text-background/30">
          © {new Date().getFullYear()} AllFormsHub.com · All rights reserved
        </div>
      </div>
    </footer>
  );
}
