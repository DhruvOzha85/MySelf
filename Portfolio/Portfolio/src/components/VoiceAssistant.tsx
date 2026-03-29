import { motion, AnimatePresence } from "framer-motion";
import { Mic, Navigation, Square } from "lucide-react";
import { useCallback } from "react";
import { useVoiceCommand } from "@/hooks/useVoiceCommand";
import { useGuidedTour } from "@/hooks/useGuidedTour";

export function VoiceAssistant() {
  const { isTouring, tourFeedback, currentStop, currentStopIndex, totalStops, startTour, stopTour } = useGuidedTour();
  
  const handleTourCommand = useCallback((action: 'start' | 'stop') => {
    if (action === 'start') startTour();
    else stopTour();
  }, [startTour, stopTour]);

  const { isListening, transcript, feedback, toggleListening } = useVoiceCommand(handleTourCommand);

  const showWidget = isListening || feedback || isTouring || tourFeedback;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none flex flex-col items-center gap-3">
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto flex items-center gap-4 px-6 py-3 rounded-full border border-[var(--border-color-strong)] shadow-2xl glass"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              boxShadow: isListening || isTouring ? '0 0 30px var(--accent-subtle)' : 'var(--shadow-xl)'
            }}
          >
            {/* Left Icon Area */}
            <div className="relative flex items-center justify-center">
              {(isListening || isTouring) && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: isTouring ? '#10b981' : 'var(--accent-primary)' }}
                />
              )}
              <button 
                onClick={isTouring ? stopTour : toggleListening}
                className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors"
              >
                {isTouring ? (
                  <Square className="w-4 h-4 text-red-400" />
                ) : (
                  <Mic 
                    className="w-4 h-4" 
                    style={{ color: isListening ? 'var(--accent-primary)' : 'var(--text-muted)' }} 
                  />
                )}
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col max-w-[280px] min-w-[200px]">
              {isTouring ? (
                <>
                  <span className="text-xs font-semibold mb-0.5 tracking-wider uppercase" style={{ color: '#10b981' }}>
                    🎙️ Jarvis Tour ({currentStopIndex + 1}/{totalStops})
                  </span>
                  <span className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                    {tourFeedback || currentStop?.title || "Starting..."}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs font-semibold mb-0.5 tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                    {isListening ? "Listening (Ctrl+V)" : "Voice Command"}
                  </span>
                  <span className="text-sm truncate">
                    {transcript ? (
                      <span style={{ color: 'var(--text-primary)' }}>"{transcript}..."</span>
                    ) : (
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {feedback || tourFeedback || "Idle"}
                      </span>
                    )}
                  </span>
                </>
              )}
            </div>

            {/* Tour Button (only when not touring and not actively listening) */}
            {!isTouring && !isListening && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={startTour}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                }}
                title="Start Jarvis Guided Tour"
              >
                <Navigation className="w-3 h-3" />
                Tour
              </motion.button>
            )}

            {/* Stop button while touring */}
            {isTouring && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={stopTour}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all hover:scale-105"
                title="Stop Tour"
              >
                <Square className="w-3 h-3" />
                Stop
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
