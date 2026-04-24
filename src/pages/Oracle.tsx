import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { askGitaOracle } from "../services/ai";

interface Message {
  id: string;
  role: "user" | "oracle";
  text: string;
}

const LANGUAGES = ["English", "Hindi", "Sanskrit", "Spanish", "French", "German"];

export default function Oracle() {
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    role: "oracle",
    text: "Welcome, seeker. I am the digital aura of the Bhagavad Gita. What troubles your mind or heart today?"
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: "user" as const, text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await askGitaOracle(userMessage.text, language);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "oracle", text: responseText }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "oracle", 
        text: `*The connection wavers...*\n\nError: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-16 flex flex-col items-center px-4 md:px-8 w-full max-w-5xl mx-auto"
    >
      <div className="text-center mb-12 relative z-10 w-full flex flex-col items-center">
         <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-20 h-20 bg-shanti-gold/10 rounded-full flex items-center justify-center mb-8 border border-shanti-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
          >
            <Sparkles className="w-8 h-8 text-shanti-gold opacity-80" />
          </motion.div>
        
        <h2 className="sanskrit text-5xl md:text-7xl grad-text drop-shadow-lg font-normal mb-8">
          The Oracle
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs tracking-widest uppercase opacity-80 mt-4">
          <span className="text-shanti-ink/60">Speak your truth in</span>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-shanti-ink/5 border border-shanti-gold/20 rounded-full px-4 py-2 outline-none focus:border-shanti-gold transition-colors text-shanti-gold appearance-none cursor-pointer text-center"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang} className="bg-shanti-bg text-shanti-ink">{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col glass rounded-[40px] overflow-hidden border border-shanti-gold/20 shadow-2xl relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-shanti-bg/50 to-shanti-bg/95 pointer-events-none z-0" />
        
        <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar scroll-smooth relative z-10 flex flex-col gap-8">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] md:max-w-[75%] p-6 md:p-8 rounded-[32px] ${
                    msg.role === "user"
                      ? "bg-shanti-ink/5 border border-shanti-ink/10 rounded-br-none text-right"
                      : "bg-shanti-gold/5 border border-shanti-gold/20 rounded-tl-none shadow-lg shadow-shanti-gold/5"
                  }`}
                >
                  {msg.role === "oracle" && (
                    <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.3em] font-medium text-shanti-gold">
                      <Sparkles className="w-3 h-3" />
                      Oracle
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div className="flex items-center justify-end gap-2 mb-4 text-[10px] uppercase tracking-[0.3em] font-medium text-shanti-ink/50">
                      You
                    </div>
                  )}
                  <div className={`markdown-body max-w-none text-sm md:text-base leading-relaxed space-y-4 ${msg.role === "user" ? "text-shanti-ink/90" : "text-shanti-ink font-light"}`}>
                    <Markdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-shanti-gold/90" {...props} />,
                        em: ({node, ...props}) => <em className="italic opacity-90" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-shanti-gold/50 pl-4 py-1 italic opacity-80" {...props} />,
                      }}
                    >
                      {msg.text}
                    </Markdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full">
               <div className="bg-shanti-gold/5 border border-shanti-gold/20 rounded-[32px] rounded-tl-none p-6 md:p-8 flex items-center gap-4 text-shanti-gold/70 text-sm tracking-widest uppercase">
                 <Loader2 className="w-5 h-5 animate-spin" />
                 Seeking wisdom...
               </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="p-6 md:p-8 border-t border-shanti-gold/10 bg-shanti-bg/80 backdrop-blur-md relative z-10 w-full shrink-0">
          <form onSubmit={handleSubmit} className="flex items-end gap-4 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the Oracle a question..."
              className="flex-1 bg-shanti-ink/5 border border-shanti-gold/20 rounded-[32px] px-6 py-5 md:py-6 outline-none focus:border-shanti-gold transition-colors text-shanti-ink placeholder-shanti-ink/30 resize-none min-h-[60px] md:min-h-[80px] text-sm md:text-base hide-scrollbar"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full bg-shanti-gold text-shanti-bg flex items-center justify-center hover:bg-shanti-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-shanti-gold/20 mb-1"
            >
              <Send className="w-5 h-5 md:w-6 md:h-6 ml-[-2px] mt-[2px]" />
            </button>
          </form>
          <div className="text-center mt-4 text-[10px] tracking-widest text-shanti-ink/30 uppercase">
            Press Enter to ask, Shift+Enter for new line
          </div>
        </div>
      </div>
    </motion.div>
  );
}
