import { motion, AnimatePresence } from "framer-motion";
import { useQuantumTransition } from "@/hooks/useQuantumTransition";

export function QuantumTransition() {
  const { isTransitioning } = useQuantumTransition();

  // 10 columns for a staggered, tech-shutter effect
  const columns = Array.from({ length: 10 });

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex">
          {columns.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, opacity: 0, transition: { duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] } }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              // Alternate scaling from top/bottom for interlocked teeth effect
              style={{ transformOrigin: i % 2 === 0 ? "top" : "bottom" }}
              className="flex-1 h-full bg-[#050510] border-x border-primary/30 relative overflow-hidden"
            >
              {/* Inner scanning laser line */}
              <motion.div
                initial={{ top: "-100%" }}
                animate={{ top: "200%" }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                className="absolute w-full h-[150%] bg-gradient-to-b from-transparent via-primary/40 to-transparent blur-md mix-blend-screen"
              />
            </motion.div>
          ))}

          {/* Central Flash at the exact moment of scroll teleportation (600ms) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 0] }}
            // Teleport happens at 600ms, and total animation duration of flash is 1.2s.
            // 0 -> 0.4s (0), 0.4->0.6s (1), 0.6->1.2s (0)
            transition={{ duration: 1.2, times: [0, 0.3, 0.5, 1], ease: "anticipate" }}
            className="absolute inset-0 bg-cyan-400 mix-blend-overlay pointer-events-none"
          />

          {/* Identity HUD text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            animate={{ opacity: [0, 1, 0], scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, times: [0, 0.5, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-center"
          >
            <div 
              className="font-['Space_Grotesk'] font-bold text-5xl md:text-7xl tracking-tighter text-white"
            >
              Dhruv Ozha
            </div>
            <div className="font-['Inter'] font-light text-sm md:text-xl tracking-[0.3em] uppercase text-primary/80">
              Full-Stack Developer
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
