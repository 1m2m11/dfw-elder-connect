import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (/medical|medication|nurse|doctor|clinical|health care/.test(lower)) {
    return "Zenihand is a non-medical platform. Providers do not offer medical services. Please consult a licensed healthcare provider for medical needs.";
  }
  if (/recommend|best provider|who should|suggest/.test(lower)) {
    return "I'm not able to recommend specific providers. Browse by category and ZIP to find available providers near you.";
  }
  if (/cost|price|fee|pay|rate|charge/.test(lower)) {
    return "Browsing and contacting providers is free. Each provider sets their own rates — discuss fees directly with them.";
  }
  if (/category|service|what do|what kind|what type/.test(lower)) {
    return "Zenihand lists five categories: Non-Medical Personal Aide, Companion Visits, Senior Housekeeping, Errand & Grocery Help, and Meal Prep Assistance.";
  }
  if (/sign up|register|list|become a provider|join/.test(lower)) {
    return "Independent providers can register free at zenihand.com/join. Listings go live after a quick review.";
  }
  if (/agency|employ|background|screen|guarantee/.test(lower)) {
    return "Zenihand is a directory, not an agency. Providers are independent. We recommend families conduct their own interviews and reference checks.";
  }
  if (/how does it work|how it works|how do i use|how to find/.test(lower)) {
    return "Families browse free provider profiles, then contact providers directly. Zenihand connects you — we're not involved in the arrangement.";
  }
  return "I can explain how Zenihand works, what categories are available, and how to browse or register. What would you like to know?";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "Hi! I can explain how Zenihand works, what services are listed, and how to find or become a provider. How can I help?" },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { from: 'user', text: input.trim() };
    const botMsg: Message = { from: 'bot', text: getBotResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[340px] h-[460px] bg-background rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-forest text-primary-foreground px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">Zenihand Assistant</p>
              <p className="text-xs text-primary-foreground/70">Non-medical info only</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] text-sm rounded-2xl px-3 py-2 leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-forest text-primary-foreground rounded-br-sm'
                      : 'bg-secondary text-foreground rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-3 flex gap-2">
            <input
              className="flex-1 text-sm bg-muted rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-forest/30"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button
              onClick={send}
              className="w-9 h-9 rounded-full bg-forest text-primary-foreground flex items-center justify-center hover:bg-forest/90 transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-forest text-primary-foreground shadow-lg flex items-center justify-center hover:bg-forest/90 transition-all hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
