import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCategoryById } from '@/lib/categories';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Star, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

const ADMIN_PASSWORD = 'zenihand2024';

interface Provider {
  id: string;
  full_name: string;
  category: string;
  served_zips: string[];
  bio: string;
  email: string;
  phone: string;
  created_at: string;
  approved: boolean;
  featured: boolean;
}

interface Inquiry {
  id: string;
  created_at: string;
  provider_id: string;
  sender_name: string;
  sender_email: string;
  sender_phone?: string | null;
  message: string;
  providers?: { full_name: string };
}

type Tab = 'pending' | 'approved' | 'inquiries';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('pending');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [expandedBio, setExpandedBio] = useState<string | null>(null);
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (authed) {
      fetchProviders();
      fetchInquiries();
    }
  }, [authed]);

  async function fetchProviders() {
    const { data } = await supabase.from('providers').select('*').order('created_at', { ascending: false });
    setProviders((data as Provider[]) || []);
  }

  async function fetchInquiries() {
    const { data } = await supabase.from('inquiries').select('*, providers(full_name)').order('created_at', { ascending: false });
    setInquiries((data as Inquiry[]) || []);
  }

  async function approveProvider(id: string) {
    await supabase.from('providers').update({ approved: true }).eq('id', id);
    fetchProviders();
    toast({ title: 'Provider approved!', description: 'They are now visible in the directory.' });
  }

  async function deleteProvider(id: string) {
    await supabase.from('providers').delete().eq('id', id);
    fetchProviders();
    toast({ title: 'Provider removed' });
  }

  async function toggleFeatured(id: string, current: boolean) {
    await supabase.from('providers').update({ featured: !current }).eq('id', id);
    fetchProviders();
  }

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen section-cream flex items-center justify-center px-4">
        <div className="card-warm p-8 max-w-sm w-full">
          <h1 className="font-serif text-2xl font-bold text-center text-forest mb-6">Zenihand Admin</h1>
          <label className="text-sm font-medium block mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring mb-3"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password"
          />
          {pwError && <p className="text-xs text-destructive mb-3">Incorrect password</p>}
          <Button className="btn-primary rounded-full w-full" onClick={handleLogin}>Sign In</Button>
        </div>
      </div>
    );
  }

  const pending = providers.filter((p) => !p.approved);
  const approved = providers.filter((p) => p.approved);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'pending', label: 'Pending Review', count: pending.length },
    { id: 'approved', label: 'Approved Providers', count: approved.length },
    { id: 'inquiries', label: 'Inquiries', count: inquiries.length },
  ];

  function ProviderRow({ p, showApprove }: { p: Provider; showApprove: boolean }) {
    const cat = getCategoryById(p.category);
    const expanded = expandedBio === p.id;
    return (
      <div className="border border-border rounded-xl p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <p className="font-serif font-semibold">{p.full_name}</p>
            <p className="text-sm text-muted-foreground">{cat?.emoji} {cat?.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{p.email} · {p.phone}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {p.served_zips.map((z) => (
                <span key={z} className="text-xs bg-secondary px-2 py-0.5 rounded-full font-mono">{z}</span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Submitted: {new Date(p.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {showApprove && (
              <Button size="sm" className="btn-primary rounded-full gap-1" onClick={() => approveProvider(p.id)}>
                <Check size={14} /> Approve
              </Button>
            )}
            {!showApprove && (
              <Button
                size="sm"
                variant="outline"
                className={`rounded-full gap-1 ${p.featured ? 'border-clay text-clay' : ''}`}
                onClick={() => toggleFeatured(p.id, p.featured)}
              >
                <Star size={14} /> {p.featured ? 'Unfeature' : 'Feature'}
              </Button>
            )}
            <Button size="sm" variant="outline" className="rounded-full gap-1 text-destructive" onClick={() => deleteProvider(p.id)}>
              <Trash2 size={14} /> Remove
            </Button>
          </div>
        </div>
        <button
          className="text-xs text-forest flex items-center gap-1 mt-1 hover:underline"
          onClick={() => setExpandedBio(expanded ? null : p.id)}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />} {expanded ? 'Hide' : 'View'} Bio
        </button>
        {expanded && (
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 leading-relaxed">{p.bio}</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen section-cream py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl font-bold text-forest">Admin Dashboard</h1>
          <button onClick={() => setAuthed(false)} className="text-sm text-muted-foreground hover:text-foreground">Sign out</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border mb-6 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
                activeTab === t.id
                  ? 'text-forest border-b-2 border-forest bg-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
              {t.count !== undefined && (
                <span className="ml-1.5 bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Pending */}
        {activeTab === 'pending' && (
          <div className="flex flex-col gap-3">
            {pending.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">No pending submissions</p>
            ) : (
              pending.map((p) => <ProviderRow key={p.id} p={p} showApprove />)
            )}
          </div>
        )}

        {/* Approved */}
        {activeTab === 'approved' && (
          <div className="flex flex-col gap-3">
            {approved.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">No approved providers yet</p>
            ) : (
              approved.map((p) => <ProviderRow key={p.id} p={p} showApprove={false} />)
            )}
          </div>
        )}

        {/* Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="flex flex-col gap-3">
            {inquiries.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">No inquiries yet</p>
            ) : (
              inquiries.map((inq) => {
                const isExpanded = expandedMsg === inq.id;
                return (
                  <div key={inq.id} className="border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-semibold text-sm">{inq.sender_name}</p>
                        <p className="text-xs text-muted-foreground">{inq.sender_email}{inq.sender_phone ? ` · ${inq.sender_phone}` : ''}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          To: <span className="text-forest">{(inq as any).providers?.full_name || 'Unknown'}</span> · {new Date(inq.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-xs text-forest flex items-center gap-1 mt-2 hover:underline"
                      onClick={() => setExpandedMsg(isExpanded ? null : inq.id)}
                    >
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />} {isExpanded ? 'Hide' : 'View'} Message
                    </button>
                    {isExpanded && (
                      <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 mt-2 leading-relaxed">{inq.message}</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
