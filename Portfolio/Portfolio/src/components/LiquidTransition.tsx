import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const triggerLiquidTransition = (callback: () => void) => {
  const event = new CustomEvent("liquid-transition", { detail: { callback } });
  window.dispatchEvent(event);
};

export function LiquidTransition() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ callback?: () => void }>;
      if (isActive) return;
      setIsActive(true);
      
      // Execute the scroll callback when the screen is fully covered
      setTimeout(() => {
        if (customEvent.detail?.callback) customEvent.detail.callback();
      }, 550); 
      
      // Remove liquid overlay
      setTimeout(() => {
        setIsActive(false);
      }, 700);
    };
    
    window.addEventListener("liquid-transition", handleTrigger);
    return () => window.removeEventListener("liquid-transition", handleTrigger);
  }, [isActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col justify-end overflow-hidden h-screen w-screen">
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: "0vh", top: "100vh", borderRadius: "100% 100% 0 0" }}
            animate={{ 
              height: "120vh", 
              top: "-10vh", 
              borderRadius: "30% 30% 0 0",
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
            }}
            exit={{ 
              height: "0vh", 
              top: "-10vh", // slide up
              borderRadius: "0 0 100% 100%",
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
            }}
            className="absolute left-[-10vw] right-[-10vw] w-[120vw]"
            style={{ backgroundColor: "var(--accent-primary)" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
