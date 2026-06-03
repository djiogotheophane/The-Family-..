import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, X, User } from "lucide-react";
import { ChatMessage } from "../types";

interface AiConciergeProps {
  currentLang: string;
  isDarkMode: boolean;
}

export default function AiConcierge({ currentLang, isDarkMode }: AiConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // Initialize welcomed speech on mount
  useEffect(() => {
    const welcomeMsgs: { [key: string]: string } = {
      fr: "Sawatdee khrap! Je suis Nara, votre concierge de luxe personnelle pour THE FAMILY. Comment puis-je parfaire votre expérience gastronomique aujourd'hui ?",
      th: "สวัสดีครับ ยินดีต้อนรับสู่ เดอะ แฟมิลี่ ผม ณรา ผู้ช่วยส่วนตัวระดับพรีเมียมของคุณ วันนี้ให้ผมช่วยดูแลความอร่อยให้คุณอย่างไรดีครับ",
      en: "Sawatdee khrap! I am Nara, your elite digital concierge for THE FAMILY restaurant. How may I customize your culinary experience today?",
    };

    const text = welcomeMsgs[currentLang] || welcomeMsgs["fr"];

    setMessages([
      {
        id: "wel_1",
        role: "assistant",
        content: text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [currentLang]);

  // Autoscroll chat
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const defaultChips = [
    {
      fr: "Quels sont vos horaires ?",
      en: "What are your hours?",
      th: "เวลาเปิดปิดร้าน ?",
    },
    {
      fr: "Comment réserver une table ?",
      en: "How do I book a table?",
      th: "วิธีการจองโต๊ะ ?",
    },
    {
      fr: "Proposez-vous du sans-gluten ?",
      en: "Do you have gluten-free dishes?",
      th: "มีเมนูปราศจากกลูเตนไหม ?",
    },
    {
      fr: "L'histoire de THE FAMILY ?",
      en: "History of THE FAMILY?",
      th: "ประวัติของ เดอะ แฟมิลี่ ?",
    },
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userLanguage: currentLang,
        }),
      });

      const data = await response.json();

      setIsTyping(false);

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ast_${Date.now()}`,
          role: "assistant",
          content: data.reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          content:
            currentLang === "fr"
              ? "Désolé, je rencontre une petite déconnexion avec l'office royal. Merci de me réinterroger."
              : "Désolé, I faced an interruption. Please try questioning me again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Messenger Icon Trigger */}
      <button
        type="button"
        id="btn-bot-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-[#D8BC7B] to-[#C1A25B] text-[#2F4A2F] shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center gap-2"
      >
        <MessageSquare size={20} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden md:inline text-xs font-bold uppercase tracking-wider pr-1">Concierge Nara</span>
        <span id="bot-indicator" className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white animate-pulse" />
      </button>

      {/* Slide Drawer Side Messenger Container */}
      {isOpen && (
        <div id="concierge-messenger-root" className="fixed inset-0 z-50 overflow-hidden font-sans pointer-events-none">
          {/* Backdrop (closes messenger) */}
          <div className="absolute inset-0 bg-transparent pointer-events-auto" onClick={() => setIsOpen(false)} />

          <div className="absolute bottom-6 right-6 w-full max-w-sm h-[500px] z-50 pointer-events-auto">
            <div
              className={`w-full h-full rounded-3xl overflow-hidden shadow-2xl border flex flex-col justify-between animate-in slide-in-from-bottom-5 duration-300 ${
                isDarkMode ? "bg-stone-950 border-stone-850 text-stone-100" : "bg-white border-emerald-100 text-stone-800"
              }`}
            >
              {/* Header block with Luxury Golden Banner */}
              <div className="p-4 bg-gradient-to-r from-[#2F4A2F] to-[#3F5B3F] text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#D8BC7B]/20 border border-[#D8BC7B] flex items-center justify-center font-mono font-bold text-sm text-[#D8BC7B]">
                      N
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#2F4A2F]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-normal tracking-wide flex items-center gap-1">
                      <span>Concierge IA Nara</span>
                      <Sparkles size={11} className="text-[#D8BC7B]" />
                    </h4>
                    <span className="text-[9px] text-[#D8BC7B] font-mono uppercase tracking-wider block">
                      Disponible 24h / 24
                    </span>
                  </div>
                </div>

                <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/10 text-white/80">
                  <X size={15} />
                </button>
              </div>

              {/* Messages viewport */}
              <div className="flex-grow overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-stone-900/5 dark:bg-stone-950/20">
                {messages.map((m) => {
                  const isUser = m.role === "user";
                  return (
                    <div key={m.id} className={`flex gap-2.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] uppercase font-bold border ${
                        isUser
                          ? "bg-slate-200 border-stone-300 text-stone-800"
                          : "bg-[#2F4A2F] border-[#D8BC7B]/20 text-[#D8BC7B]"
                      }`}>
                        {isUser ? <User size={12} /> : "N"}
                      </div>

                      {/* Bubble block */}
                      <div className="space-y-0.5">
                        <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-[#D8BC7B]/10 border border-[#D8BC7B]/20 text-stone-800 dark:text-stone-100 rounded-tr-none"
                            : "bg-[#2F4A2F] border border-[#2F4A2F] text-white rounded-tl-none"
                        }`}>
                          {m.content}
                        </div>
                        <span className="text-[8px] font-mono text-stone-400 block tracking-wider text-right uppercase mt-0.5 px-1">
                          {m.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Simulated Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                    <div className="w-7 h-7 rounded-full bg-[#2F4A2F] border border-[#D8BC7B]/20 text-[#D8BC7B] flex items-center justify-center text-[10px] font-bold">
                      N
                    </div>
                    <div className="flex gap-1 p-3.5 rounded-2xl rounded-tl-none bg-[#2F4A2F]/90 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8BC7B] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8BC7B] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8BC7B] animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>

              {/* Suggestions quick chips */}
              <div className="p-3 border-t border-stone-800 flex gap-1.5 overflow-x-auto no-scrollbar">
                {defaultChips.map((chip, idx) => {
                  const text = chip[currentLang as "fr" | "en" | "th"] || chip["fr"];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(text)}
                      className={`shrink-0 px-3 py-1.5 rounded-full border text-[10px] font-medium tracking-wide transition-colors ${
                        isDarkMode
                          ? "bg-[#161815] border-stone-800 text-stone-300 hover:border-[#D8BC7B]/50 hover:text-white"
                          : "bg-stone-50 border-emerald-100 text-[#374A38] hover:border-[#D8BC7B]"
                      }`}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>

              {/* Input sender section */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="p-3 border-t border-stone-800 flex gap-2 bg-stone-900/10"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={
                    currentLang === "fr"
                      ? "Interrogez Nara (ex: Allergènes...)..."
                      : "Sawatdee Nara, ask a question..."
                  }
                  className="flex-grow p-3 text-[11px] rounded-2xl border border-stone-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#D8BC7B]"
                />
                <button
                  type="submit"
                  className="p-3 rounded-2xl bg-[#D8BC7B] text-[#2F4A2F] hover:bg-[#D8BC7B]/80 transition-colors"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
