import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme, type ThemeName } from "./useTheme";
import { useToast } from "./use-toast";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

export function useVoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const { setTheme, themes } = useTheme();
  const { toast } = useToast();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const handleCommand = useCallback((command: string) => {
    setFeedback(`Heard: "${command}"`);

    // --- Command Routing ---
    
    // 1. Theme Commands
    if (command.includes("theme") || command.includes("mode")) {
      const targetTheme = themes.find(t => command.includes(t.name.toLowerCase()));
      if (targetTheme) {
        setTheme(targetTheme.id as ThemeName);
        setFeedback(`Changed theme to ${targetTheme.name}`);
        return;
      }
      if (command.includes("auto")) {
        setTheme("auto");
        setFeedback(`Enabled Auto Theme Sync`);
        return;
      }
    }

    // 2. Navigation Commands
    if (command.includes("scroll down")) {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      setFeedback("Scrolling down");
      return;
    }
    if (command.includes("scroll up")) {
      window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
      setFeedback("Scrolling up");
      return;
    }
    if (command.includes("go to") || command.includes("show me") || command.includes("navigate to")) {
      const getSectionId = () => {
        if (command.includes("project")) return "#projects";
        if (command.includes("skill")) return "#skills";
        if (command.includes("about")) return "#about";
        if (command.includes("contact")) return "#contact";
        if (command.includes("resume")) return "#resume";
        if (command.includes("certificate")) return "#certificates";
        if (command.includes("home")) return "#home";
        if (command.includes("leetcode")) return "#leetcode";
        return null;
      };
      const section = getSectionId();
      if (section) {
        const element = document.querySelector(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setFeedback(`Navigating to ${section.replace('#', '')}`);
          return;
        }
      }
    }

    // Default fallback
    setTimeout(() => setFeedback("Command not recognized"), 1000);
  }, [setTheme, themes]);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setFeedback("Listening...");
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript;
            handleCommand(currentTranscript.trim().toLowerCase());
            setTranscript("");
          } else {
            setTranscript(event.results[i][0].transcript);
          }
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed') {
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone permissions to use Voice Commands.",
            variant: "destructive"
          });
        }
        setIsListening(false);
        setFeedback("Error: " + event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => setFeedback(""), 2000);
      };

      recognitionRef.current = recognition;
    }
  }, [setTheme, themes, toast, handleCommand]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Your browser does not support Voice Commands. Try Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      setFeedback("Starting...");
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  }, [isListening, toast]);

  // Global Key Shortcut Listener ('V' key to toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.key.toLowerCase() === 'v' && e.ctrlKey && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        toggleListening();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleListening]);

  return { isListening, transcript, feedback, toggleListening };
}
