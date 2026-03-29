import React, { createContext, useContext, useState, useCallback, useRef } from "react";

interface QuantumContextType {
  isTransitioning: boolean;
  warpTo: (targetId: string) => void;
}

const QuantumContext = createContext<QuantumContextType | null>(null);

export function QuantumProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const teleportRef = useRef<NodeJS.Timeout | null>(null);
  const cleanupRef = useRef<NodeJS.Timeout | null>(null);

  const warpTo = useCallback((targetId: string) => {
    // Prevent overlapping transitions
    if (isTransitioning) return;

    // Trigger warp overlay
    setIsTransitioning(true);
    document.body.style.overflow = "hidden";

    // Teleport halfway through the animation
    if (teleportRef.current) clearTimeout(teleportRef.current);
    teleportRef.current = setTimeout(() => {
      const targetStr = targetId.startsWith("#") ? targetId : `#${targetId}`;
      const element = document.querySelector(targetStr);
      if (element) {
        element.scrollIntoView({ behavior: "instant" }); // Instant snap since screen is obscured
      }
    }, 600); // 600ms corresponds to peak shatter effect

    // End transition
    if (cleanupRef.current) clearTimeout(cleanupRef.current);
    cleanupRef.current = setTimeout(() => {
      setIsTransitioning(false);
      document.body.style.overflow = "auto";
    }, 1500); // Overlay clears fully after 1.5s
  }, [isTransitioning]);

  return (
    <QuantumContext.Provider value={{ isTransitioning, warpTo }}>
      {children}
    </QuantumContext.Provider>
  );
}

export function useQuantumTransition() {
  const context = useContext(QuantumContext);
  if (!context) {
    throw new Error("useQuantumTransition must be used within a QuantumProvider");
  }
  return context;
}
