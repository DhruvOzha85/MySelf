import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Youtube, Twitter, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/portfolio";
import { useSound } from "@/hooks/useSound";
import profilePhoto from "@/assets/profile-photo.jpg";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { useQuantumTransition } from "@/hooks/useQuantumTransition";
import { XLogo } from "@/components/ui/XLogo";

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: XLogo, href: socialLinks.twitter, label: "X (Twitter)" },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
];

export function HeroSection() {
  const { playClick } = useSound();
  const { warpTo } = useQuantumTransition();
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Hacker Glitch Effect State
  const finalName = "Dhruv Ozha";
  const [hackerName, setHackerName] = useState(finalName);

  const triggerGlitch = () => {
    let iteration = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>_~*^$#@";
    
    const interval = setInterval(() => {
      setHackerName(
        finalName
          .split("")
          .map((letter, index) => {
            if (index < iteration) return finalName[index];
            if (letter === " ") return " ";
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= finalName.length) {
        clearInterval(interval);
        setHackerName(finalName); // Fallback lock
      }
      
      iteration += 1 / 3; // Decode speed
    }, 45);

    // Return the interval ID so it can be cleared on unmount if needed
    return interval;
  };

  useEffect(() => {
    // Wait for the full 900ms entrance fade to finish before glitching
    let intervalId: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      intervalId = triggerGlitch();
    }, 1200);

    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const toRotate = [
    "Aspiring Software Developer",
    "Full Stack Web Developer",
    "Frontend Specialist",
    "Tech Enthusiast"
  ];

  useEffect(() => {
    const ticker = setTimeout(() => {
      tick();
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed((prev) => prev / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(2000); // Pause at end
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500); // Pause before new word
    } else {
      setTypingSpeed(100); // Normal typing speed
    }
  };

  const scrollTo = (href: string) => {
    playClick();
    warpTo(href);
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative pt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column — Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-center md:text-left order-1"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold relative"
            >
              <span 
                className="gradient-text tabular-nums tracking-tight cursor-default"
                onMouseEnter={triggerGlitch}
              >
                {hackerName}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl font-display text-foreground/80 h-[40px] flex items-center justify-center md:justify-start"
            >
              <span>{text}</span>
              <span className="animate-pulse ml-1">|</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl text-muted-foreground text-lg"
            >
              Passionate about building beautiful, functional web applications.
              I love turning ideas into reality through clean code and creative design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center md:items-start gap-4 pt-4"
            >
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <MagneticWrapper strength={0.45} maxDistance={130}>
                  <Button
                     size="lg"
                     variant="ghost"
                     className="text-primary hover:text-primary-foreground transition-all duration-300 border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/90 px-8 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
                     onClick={() => window.open("https://dhruvozha-resume.vercel.app/", "_blank")}
                  >
                    View Resume
                  </Button>
                </MagneticWrapper>

                <MagneticWrapper strength={0.4} maxDistance={120}>
                  <Button
                    size="lg"
                    className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity"
                    onClick={() => scrollTo("#contact")}
                  >
                    Contact Me
                  </Button>
                </MagneticWrapper>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center md:justify-start gap-4 pt-4"
            >
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <MagneticWrapper key={label} strength={0.5} maxDistance={80}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                </MagneticWrapper>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group flex items-center justify-center order-2"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-2xl gradient-bg opacity-50 blur-xl group-hover:opacity-70 transition-opacity" />
              <img
                src={profilePhoto}
                alt="Dhruv Ozha"
                className="relative w-full h-full object-cover rounded-2xl border-2 border-border shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollTo("#about")}
          className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
