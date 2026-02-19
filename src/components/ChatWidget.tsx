import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Volume2 } from 'lucide-react';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (/medical|medication|nurse|doctor|clinical/.test(lower)) {
    return "Zenihand only lists non-medical support services. For medical needs, please contact a licensed healthcare provider.";
  }
  if (/recommend|best|who should i/.test(lower)) {
    return "I can't recommend specific providers. You can browse all listings by category and ZIP at zenihand.com/browse.";
  }
  if (/cost|price|fee|charge/.test(lower)) {
    return "Browsing and contacting providers is free. Each provider sets their own rates — discuss fees directly with them.";
  }
  if (/how does it work|how it works|what is zenihand/.test(lower)) {
    return "Zenihand is a free directory. Families browse independent provider profiles, then contact providers directly. We don't get involved in arrangements.";
  }
  if (/categor|service|what kind/.test(lower)) {
    return "We list five categories: Non-Medical Personal Aide, Companion Visits, Senior Housekeeping, Errand & Grocery Help, and Meal Prep Assistance.";
  }
  if (/sign up|get listed|register|join|provider/.test(lower)) {
    return "Independent providers can list for free at zenihand.com/join. Profiles go live after a quick review.";
  }
  if (/schedul|appointment|book/.test(lower)) {
    return "Zenihand doesn't offer scheduling. Contact providers directly to arrange services.";
  }
  if (/agency|employ|hired/.test(lower)) {
    return "Zenihand is a directory, not an agency. All providers are independent contractors. We don't employ or supervise anyone.";
  }
  return "I can explain how Zenihand works, what categories are available, and how to browse or get listed. What would you like to know?";
}

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "Hi. I can explain how Zenihand works, what services are listed, and how to get listed as a provider. What would you like to know?" },
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
        <div className="w-[340px] h-[460px] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#f5f5f5] border-b border-border px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-[#333]">Zenihand Assistant</p>
              <p className="text-xs text-[#777]">Info only · Non-medical</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#999] hover:text-[#333] transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-[#fafafa]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'bot' ? (
                  <div className="max-w-[85%] flex flex-col gap-1">
                    <div className="text-sm bg-white text-[#333] rounded-2xl rounded-bl-sm px-3 py-2 leading-relaxed border border-[#e8e8e8] shadow-sm">
                      {m.text}
                    </div>
                    <button
                      onClick={() => speak(m.text)}
                      className="self-start flex items-center gap-1 text-[10px] text-[#999] hover:text-[#555] transition-colors px-1"
                      title="Read aloud"
                    >
                      <Volume2 size={11} /> Read aloud
                    </button>
                  </div>
                ) : (
                  <div className="max-w-[80%] text-sm rounded-2xl rounded-br-sm px-3 py-2 leading-relaxed bg-[#1a2e4a] text-white">
                    {m.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#e8e8e8] px-3 py-3 flex gap-2 bg-white">
            <input
              className="flex-1 text-sm bg-[#f5f5f5] rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#1a2e4a]/20 text-[#333] placeholder:text-[#aaa]"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button
              onClick={send}
              className="w-9 h-9 rounded-full bg-[#1a2e4a] text-white flex items-center justify-center hover:bg-[#1a2e4a]/90 transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#1a2e4a] text-white shadow-lg flex items-center justify-center hover:bg-[#1a2e4a]/90 transition-all hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
