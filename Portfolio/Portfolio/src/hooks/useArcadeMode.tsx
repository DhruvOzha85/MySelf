import { useState, useCallback, useEffect, createContext, useContext, useRef } from "react";

interface ArcadeContextType {
  isArcadeActive: boolean;
  score: number;
  toggleArcade: () => void;
  exitArcade: (targetSection?: string) => void;
  addScore: (points: number) => void;
  lastPlayerX: React.MutableRefObject<number>;
}

const ArcadeContext = createContext<ArcadeContextType | null>(null);

export function ArcadeProvider({ children }: { children: React.ReactNode }) {
  const [isArcadeActive, setIsArcadeActive] = useState(false);
  const [score, setScore] = useState(0);
  const lastPlayerX = useRef(100); // Persist player position across sessions

  const toggleArcade = useCallback(() => {
    setIsArcadeActive(prev => {
      if (!prev) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return !prev;
    });
  }, []);

  const exitArcade = useCallback((targetSection?: string) => {
    setIsArcadeActive(false);
    document.body.style.overflow = "auto";
    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const addScore = useCallback((points: number) => {
    setScore(prev => prev + points);
  }, []);

  // Global keyboard shortcut: Ctrl+G
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "g" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        toggleArcade();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleArcade]);

  return (
    <ArcadeContext.Provider value={{ isArcadeActive, score, toggleArcade, exitArcade, addScore, lastPlayerX }}>
      {children}
    </ArcadeContext.Provider>
  );
}

export function useArcadeMode() {
  const ctx = useContext(ArcadeContext);
  if (!ctx) throw new Error("useArcadeMode must be used within ArcadeProvider");
  return ctx;
}
