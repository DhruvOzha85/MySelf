import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";
import { useVoiceCommand } from "@/hooks/useVoiceCommand";

export function VoiceAssistant() {
  const { isListening, transcript, feedback, toggleListening } = useVoiceCommand();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none flex flex-col items-center gap-3">
      <AnimatePresence>
        {(isListening || feedback) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto flex items-center gap-4 px-6 py-3 rounded-full border border-[var(--border-color-strong)] shadow-2xl glass"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              boxShadow: isListening ? '0 0 30px var(--accent-subtle)' : 'var(--shadow-xl)'
            }}
          >
            {/* Pulsing Mic Icon */}
            <div className="relative flex items-center justify-center">
              {isListening && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />
              )}
              <button 
                onClick={toggleListening}
                className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <Mic 
                  className="w-4 h-4" 
                  style={{ color: isListening ? 'var(--accent-primary)' : 'var(--text-muted)' }} 
                />
              </button>
            </div>

            {/* Transcription / Feedback Text */}
            <div className="flex flex-col max-w-[250px] min-w-[200px]">
              <span className="text-xs font-semibold mb-0.5 tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                {isListening ? "Listening (Ctrl+V)" : "Voice Command"}
              </span>
              <span className="text-sm truncate">
                {transcript ? (
                   <span style={{ color: 'var(--text-primary)' }}>"{transcript}..."</span>
                ) : (
                   <span style={{ color: 'var(--text-secondary)' }}>
                     {feedback || "Idle"}
                   </span>
                )}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
