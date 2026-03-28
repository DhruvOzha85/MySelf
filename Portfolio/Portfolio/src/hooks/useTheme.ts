import { useEffect, useState, useCallback } from "react";

export type ThemeName =
  | "light" | "dark" | "ocean" | "forest" | "sunset"
  | "candy" | "midnight" | "monochrome" | "ember" | "sakura" | "auto";

export interface ThemeInfo {
  id: Omit<ThemeName, "auto">;
  name: string;
  emoji: string;
  accent: string;
  previewBg: string;
  previewCard: string;
  previewText: string;
}

export const themes: ThemeInfo[] = [
  { id: "light",      name: "Light",      emoji: "☀️",  accent: "#6366f1", previewBg: "#f8fafc", previewCard: "#ffffff", previewText: "#1e293b" },
  { id: "dark",       name: "Dark",       emoji: "🌑",  accent: "#a855f7", previewBg: "#0a0a14", previewCard: "#141420", previewText: "#f0f0f5" },
  { id: "ocean",      name: "Ocean",      emoji: "🌊",  accent: "#00b4d8", previewBg: "#020c18", previewCard: "#0a2540", previewText: "#e0f4ff" },
  { id: "forest",     name: "Forest",     emoji: "🌲",  accent: "#22c55e", previewBg: "#0a1a0a", previewCard: "#142814", previewText: "#d4f0d4" },
  { id: "sunset",     name: "Sunset",     emoji: "🌅",  accent: "#f97316", previewBg: "#1a0e08", previewCard: "#2e1a0e", previewText: "#fff0e0" },
  { id: "candy",      name: "Candy",      emoji: "🍬",  accent: "#ec4899", previewBg: "#fdf2f8", previewCard: "#ffffff", previewText: "#831843" },
  { id: "midnight",   name: "Midnight",   emoji: "🌌",  accent: "#8b5cf6", previewBg: "#0a0520", previewCard: "#150e30", previewText: "#e0d4ff" },
  { id: "monochrome", name: "Monochrome", emoji: "🖤",  accent: "#a0a0a0", previewBg: "#111111", previewCard: "#1c1c1c", previewText: "#e8e8e8" },
  { id: "ember",      name: "Ember",      emoji: "🔥",  accent: "#ef4444", previewBg: "#1a0808", previewCard: "#2a1010", previewText: "#ffe0d0" },
  { id: "sakura",     name: "Sakura",     emoji: "🌸",  accent: "#f472b6", previewBg: "#fef7f7", previewCard: "#ffffff", previewText: "#6b2140" },
];

function getThemeByTime(): ThemeName {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "light";     // Morning
  if (hour >= 12 && hour < 16) return "ocean";    // Afternoon
  if (hour >= 16 && hour < 19) return "sunset";   // Evening
  return "midnight";                              // Night (19:00 - 06:00)
}

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedTheme") as ThemeName | null;
      if (stored === "auto") return "auto";
      if (stored && themes.some(t => t.id === stored)) return stored;
    }
    return "auto"; // Default to auto
  });

  const [resolvedTheme, setResolvedTheme] = useState<ThemeName>(() => 
    currentTheme === "auto" ? getThemeByTime() : currentTheme
  );

  useEffect(() => {
    localStorage.setItem("selectedTheme", currentTheme);
    
    if (currentTheme === "auto") {
      setResolvedTheme(getThemeByTime());
      const interval = setInterval(() => {
        setResolvedTheme(getThemeByTime());
      }, 60000); // Check every minute
      return () => clearInterval(interval);
    } else {
      setResolvedTheme(currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((name: ThemeName) => {
    setCurrentTheme(name);
  }, []);

  return { currentTheme, resolvedTheme, setTheme, themes };
}
