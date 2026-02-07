import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound, playClick } = useSound();

  const handleClick = (href: string) => {
    playClick();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.a
          href="#home"
          className="text-xl font-display font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
        >
          Dhruv Ozha
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-2",
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                playClick();
                toggleSound();
              }}
              className="relative"
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                playClick();
                toggleTheme();
              }}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <ul className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href);
                    }}
                    className={cn(
                      "block py-2 text-lg font-medium transition-colors",
                      activeSection === item.href.slice(1)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
