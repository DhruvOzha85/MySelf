import { useState, useCallback, useRef, useEffect } from "react";

export interface TourStop {
  sectionId: string;
  title: string;
  narration: string;
}

const tourStops: TourStop[] = [
  {
    sectionId: "home",
    title: "Welcome",
    narration: "Welcome to Dhruv Ozha's portfolio. I'm Jarvis, your personal guide. Let me walk you through what Dhruv has been building. Sit back and enjoy the tour.",
  },
  {
    sectionId: "about",
    title: "About Dhruv",
    narration: "Here's a little about Dhruv. He's an aspiring software developer with a passion for building beautiful, functional web applications. He loves turning ideas into reality through clean code and creative design.",
  },
  {
    sectionId: "skills",
    title: "Technical Skills",
    narration: "These are Dhruv's technical skills. He works with React, JavaScript, Node.js, and many more modern technologies. Notice how the skill cards scroll infinitely, a nice touch of polish.",
  },
  {
    sectionId: "projects",
    title: "Featured Projects",
    narration: "Now let's look at the projects. Each one showcases different technical abilities, from pixel-perfect clones to AI-powered platforms. Click on any card to explore the live demos.",
  },
  {
    sectionId: "certificates",
    title: "Certifications",
    narration: "Dhruv has earned several professional certifications from companies like AWS, Walmart, and Skyscanner through the Forage platform. Each one represents real-world engineering challenges.",
  },
  {
    sectionId: "leetcode",
    title: "LeetCode Journey",
    narration: "Here's the competitive programming section. Dhruv actively practices data structures and algorithms on LeetCode. You can see the stats and submission activity right here.",
  },
  {
    sectionId: "contact",
    title: "Get In Touch",
    narration: "And finally, the contact section. If you'd like to work with Dhruv or just say hello, feel free to reach out through any of these channels. Thanks for taking the tour! I hope you enjoyed it.",
  },
];

export function useGuidedTour() {
  const [isTouring, setIsTouring] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(-1);
  const [tourFeedback, setTourFeedback] = useState("");
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!synthRef.current) { resolve(); return; }

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 0.9;
      utterance.volume = 1;

      // Try to pick a good English voice
      const voices = synthRef.current.getVoices();
      const preferred = voices.find(v => 
        v.name.includes("Google UK English Male") || 
        v.name.includes("Daniel") || 
        v.name.includes("Microsoft David") ||
        v.name.includes("Google US English")
      );
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        if (e.error === 'canceled') resolve(); 
        else reject(e);
      };
      
      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    });
  }, []);

  const scrollToSection = useCallback((sectionId: string): Promise<void> => {
    return new Promise((resolve) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Wait for scroll to finish
        setTimeout(resolve, 1200);
      } else {
        resolve();
      }
    });
  }, []);

  const startTour = useCallback(async () => {
    if (!synthRef.current) {
      setTourFeedback("Text-to-Speech not supported in this browser.");
      return;
    }

    isCancelledRef.current = false;
    setIsTouring(true);
    setCurrentStopIndex(0);

    // Ensure voices are loaded
    if (synthRef.current.getVoices().length === 0) {
      await new Promise<void>((resolve) => {
        synthRef.current!.onvoiceschanged = () => resolve();
        setTimeout(resolve, 500);
      });
    }

    for (let i = 0; i < tourStops.length; i++) {
      if (isCancelledRef.current) break;
      
      const stop = tourStops[i];
      setCurrentStopIndex(i);
      setTourFeedback(`📍 ${stop.title}`);
      
      // Scroll to section
      await scrollToSection(stop.sectionId);
      if (isCancelledRef.current) break;

      // Small pause before speaking
      await new Promise(r => setTimeout(r, 400));
      if (isCancelledRef.current) break;

      // Narrate
      try {
        await speak(stop.narration);
      } catch {
        // Speech was cancelled or errored, continue
      }
      if (isCancelledRef.current) break;

      // Pause between stops
      await new Promise(r => setTimeout(r, 800));
    }

    if (!isCancelledRef.current) {
      setTourFeedback("✅ Tour complete!");
      setTimeout(() => {
        setTourFeedback("");
        setIsTouring(false);
        setCurrentStopIndex(-1);
      }, 3000);
    }
  }, [speak, scrollToSection]);

  const stopTour = useCallback(() => {
    isCancelledRef.current = true;
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsTouring(false);
    setCurrentStopIndex(-1);
    setTourFeedback("Tour stopped.");
    setTimeout(() => setTourFeedback(""), 2000);
  }, []);

  return {
    isTouring,
    currentStopIndex,
    tourFeedback,
    currentStop: currentStopIndex >= 0 ? tourStops[currentStopIndex] : null,
    totalStops: tourStops.length,
    startTour,
    stopTour,
  };
}
