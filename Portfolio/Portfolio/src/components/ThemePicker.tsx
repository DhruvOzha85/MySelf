import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Search, X, Clock } from "lucide-react";
import { useTheme, themes, type ThemeName } from "@/hooks/useTheme";

function MiniPreview({ theme }: { theme: typeof themes[0] }) {
  return (
    <div className="flex flex-col gap-1 rounded-md overflow-hidden border" style={{ borderColor: theme.accent + '30' }}>
      <div className="h-2.5 w-full flex items-center px-1.5 gap-1" style={{ backgroundColor: theme.previewBg }}>
        <div className="w-4 h-1 rounded-full" style={{ backgroundColor: theme.accent }} />
        <div className="w-3 h-1 rounded-full opacity-40" style={{ backgroundColor: theme.previewText }} />
        <div className="w-3 h-1 rounded-full opacity-40" style={{ backgroundColor: theme.previewText }} />
      </div>
      <div className="h-4 w-full px-1.5 flex items-center gap-1" style={{ backgroundColor: theme.previewCard }}>
        <div className="w-6 h-1.5 rounded-sm" style={{ backgroundColor: theme.previewText, opacity: 0.6 }} />
      </div>
      <div className="h-2.5 w-full px-1.5 flex items-center justify-end" style={{ backgroundColor: theme.previewBg }}>
        <div className="w-5 h-1.5 rounded-sm" style={{ backgroundColor: theme.accent }} />
      </div>
    </div>
  );
}

export function ThemePicker() {
  const { currentTheme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeTheme = themes.find(t => t.id === resolvedTheme) || themes[0];

  const filtered = useMemo(() => {
    if (!search.trim()) return themes;
    const q = search.toLowerCase();
    return themes.filter(t => t.name.toLowerCase().includes(q));
  }, [search]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleSelect = (id: ThemeName) => {
    setTheme(id);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[var(--bg-card-hover)] border border-transparent hover:border-[var(--border-color)]"
        style={{ color: 'var(--text-secondary)' }}
        id="theme-picker-button"
        aria-label="Theme selector"
      >
        <Palette className="h-4 w-4" style={{ color: activeTheme.accent }} />
        <span className="text-sm font-medium hidden sm:inline">Theme</span>
        <span
          className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-1"
          style={{
            backgroundColor: activeTheme.accent,
            ringColor: activeTheme.accent + '60',
            boxShadow: `0 0 8px ${activeTheme.accent}60`,
          }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 z-[60] w-[340px] sm:w-[400px] max-h-[70vh] flex flex-col rounded-2xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-xl)',
              backdropFilter: 'var(--backdrop-blur)',
            }}
          >
            {/* Header */}
            <div className="p-4 pb-3 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                  Choose Theme
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-[var(--bg-card-hover)] transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 pt-3 pb-3 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search themes..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--input-text)',
                  }}
                />
              </div>
            </div>

            {/* Auto Sync Toggle */}
            <div className="px-4 pb-2 shrink-0">
              <button
                onClick={() => handleSelect("auto")}
                className="w-full flex items-center justify-between p-3 rounded-xl border transition-all"
                style={{
                  backgroundColor: currentTheme === "auto" ? activeTheme.previewBg : 'var(--bg-primary)',
                  borderColor: currentTheme === "auto" ? activeTheme.accent : 'var(--border-color)',
                  boxShadow: currentTheme === "auto" ? `0 0 15px ${activeTheme.accent}20` : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <Clock className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>Auto Time Sync</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Changes theme based on time of day</div>
                  </div>
                </div>
                {currentTheme === "auto" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: activeTheme.accent }}
                  >
                    <Check className="h-3 w-3" style={{ color: activeTheme.previewBg }} />
                  </motion.div>
                )}
              </button>
            </div>

            {/* Theme Grid */}
            <div className="px-4 pb-4 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              <div className="grid grid-cols-2 gap-2.5">
                {filtered.map(theme => {
                  const isActive = currentTheme === theme.id;
                  return (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleSelect(theme.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative text-left rounded-xl p-3 transition-all duration-200 group"
                      style={{
                        backgroundColor: theme.previewBg,
                        border: isActive
                          ? `2px solid ${theme.accent}`
                          : '2px solid transparent',
                        boxShadow: isActive
                          ? `0 0 20px ${theme.accent}30, 0 0 0 1px ${theme.accent}40`
                          : 'none',
                      }}
                    >
                      {/* Active checkmark */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
                          style={{ backgroundColor: theme.accent }}
                        >
                          <Check className="h-3 w-3" style={{ color: theme.previewBg }} />
                        </motion.div>
                      )}

                      {/* Theme info */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base">{theme.emoji}</span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: theme.previewText }}
                        >
                          {theme.name}
                        </span>
                      </div>

                      {/* Mini preview */}
                      <MiniPreview theme={theme} />
                    </motion.button>
                  );
                })}
              </div>
              
              {filtered.length === 0 && (
                <div className="py-4 text-center">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    No themes match "{search}"
                  </p>
                </div>
              )}
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
