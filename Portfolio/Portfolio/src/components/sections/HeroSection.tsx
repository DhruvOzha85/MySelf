import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Youtube, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/portfolio";
import { useSound } from "@/hooks/useSound";

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
];

export function HeroSection() {
  const { playClick } = useSound();
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

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
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
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
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold"
          >
            <span className="gradient-text">Dhruv Ozha</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-display text-foreground/80 h-[40px] flex items-center justify-center"
          >
            <span>{text}</span>
            <span className="animate-pulse ml-1">|</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-muted-foreground text-lg"
          >
            Passionate about building beautiful, functional web applications.
            I love turning ideas into reality through clean code and creative design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-4 pt-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity"
                onClick={() => scrollTo("#projects")}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#contact")}
              >
                Contact Me
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                size="lg"
                variant="ghost"
                className="text-primary hover:text-primary-foreground transition-all duration-300 border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/90 px-8 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
                onClick={() => window.open("https://dhruvozha-resume.vercel.app/", "_blank")}
              >
                View Resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4 pt-8"
          >
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

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
