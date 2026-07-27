import { Search, Mic, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useState, InputHTMLAttributes, useEffect, useRef } from "react";
import { haptics } from "../utils/haptics";
import { audioCues } from "../utils/audio";
import { motion, AnimatePresence } from "motion/react";

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({ className, value, onChange, ...props }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  
  // Keep the latest onChange function
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setIsListening(true);
        };

        rec.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
            
          setInterimTranscript(transcript);
          if (event.results[0].isFinal) {
            onChangeRef.current?.(transcript);
          }
        };

        rec.onend = () => {
          setIsListening(false);
          setInterimTranscript("");
        };

        rec.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const toggleListening = () => {
    audioCues.playClick();
    if (!recognitionRef.current) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      haptics.tick();
      onChangeRef.current?.("");
      recognitionRef.current.start();
    }
  };

  return (
    <div className={cn("relative flex flex-col w-full", className)}>
      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-3 w-full bg-bg-surface-raised border border-white/10 rounded-2xl p-4 shadow-2xl z-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-green/10 via-transparent to-transparent opacity-50 pointer-events-none" />
            <div className="flex items-start gap-3 relative z-10">
              <div className="mt-1">
                <Mic className="w-5 h-5 text-accent-green animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-semibold text-accent-green uppercase tracking-wider mb-1">Listening...</p>
                <p className="text-text-primary text-sm min-h-[20px] italic">
                  {interimTranscript || "Speak now..."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={cn("relative flex items-center w-full transition-all duration-300", isFocused ? "scale-[1.02]" : "")}>

      <div className={cn("absolute left-4 transition-colors duration-300", isFocused ? "text-accent-green" : "text-text-secondary")}>
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Search services, salons..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white/5 backdrop-blur-md rounded-full py-3.5 pl-12 pr-24 text-text-primary placeholder:text-text-secondary border border-white/10 focus:outline-none focus:border-accent-green/50 focus:bg-white/10 transition-all shadow-lg shadow-black/20"
        {...props}
      />
      
      <div className="absolute right-2 flex items-center gap-1">
        {value && (
          <motion.button 
            whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            onClick={() => {
              audioCues.playClick();
              onChange?.("");
            }}
            className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
        <div className="w-[1px] h-6 bg-white/10 mx-1" />
        <motion.button 
          whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 15 } }}
          onClick={toggleListening}
          className={cn(
            "p-2 rounded-full hover:bg-white/10 transition-colors w-9 h-9 flex items-center justify-center relative overflow-hidden",
            isListening ? "text-accent-green bg-accent-green/10" : "text-text-secondary hover:text-accent-green"
          )}
          title="Voice Search"
        >
          {isListening ? (
             <div className="flex items-center justify-center gap-[2px] h-4 w-4">
               <motion.div animate={{ height: ["4px", "12px", "4px"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-accent-green rounded-full" />
               <motion.div animate={{ height: ["8px", "16px", "8px"] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} className="w-1 bg-accent-green rounded-full" />
               <motion.div animate={{ height: ["4px", "12px", "4px"] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 bg-accent-green rounded-full" />
             </div>
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </motion.button>
      </div>
      </div>
    </div>
  );
}
