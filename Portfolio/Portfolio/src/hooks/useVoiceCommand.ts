import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme, type ThemeName } from "./useTheme";
import { useToast } from "./use-toast";
import { toast as sonnerToast } from "sonner";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

// ─── External Link Map ───────────────────────────────────────────────
const externalLinks: Record<string, { url: string; label: string }> = {
  github:    { url: "https://github.com/DhruvOzha85", label: "GitHub profile" },
  linkedin:  { url: "https://www.linkedin.com/in/dhruv-ozha-bb378639b/", label: "LinkedIn profile" },
  youtube:   { url: "https://www.youtube.com/@DhruvOzha", label: "YouTube channel" },
  leetcode:  { url: "https://leetcode.com/u/DhruvOzha/", label: "LeetCode profile" },
  twitter:   { url: "https://x.com/dhruvozha85", label: "Twitter profile" },
  x:         { url: "https://x.com/dhruvozha85", label: "Twitter profile" },
  instagram: { url: "https://www.instagram.com/dhruv.ozha/", label: "Instagram profile" },
};

// ─── Section Nav Map ─────────────────────────────────────────────────
const sectionKeywords: Record<string, string> = {
  project: "projects",
  projects: "projects",
  skill: "skills",
  skills: "skills",
  about: "about",
  contact: "contact",
  resume: "resume",
  certificate: "certificates",
  certificates: "certificates",
  home: "home",
  leetcode: "leetcode",
  hero: "home",
};

// ─── Helpers ─────────────────────────────────────────────────────────

/** Normalize a string: lowercase, strip punctuation except spaces */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Slugify a project title: "CropPilot" → "croppilot" */
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Fuzzy-match a spoken project name against all data-voice-target elements in the DOM */
function findVoiceTarget(spoken: string): HTMLElement | null {
  const targets = document.querySelectorAll<HTMLElement>("[data-voice-target]");
  const spokenNorm = slugify(spoken);

  // Direct match first
  for (const el of targets) {
    const targetVal = slugify(el.dataset.voiceTarget || "");
    if (targetVal === spokenNorm) return el;
  }

  // Fuzzy: check if the spoken phrase is contained in / contains target
  for (const el of targets) {
    const targetVal = slugify(el.dataset.voiceTarget || "");
    if (targetVal.includes(spokenNorm) || spokenNorm.includes(targetVal)) return el;
  }

  return null;
}

/**
 * Open a URL in a new tab.
 * SpeechRecognition callbacks are NOT user gestures, so Chrome's popup
 * blocker will block window.open(). If blocked, we show a clickable
 * sonner toast — clicking that IS a user gesture, so it works.
 */
function openUrl(url: string, label: string): void {
  // Attempt 1: direct window.open (works if user allowed popups)
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (win) return;

  // Attempt 2: programmatic anchor click (works in some browsers)
  try {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    // Position off-screen but NOT display:none (hidden elements get suppressed)
    a.style.position = "fixed";
    a.style.top = "-9999px";
    a.style.left = "-9999px";
    a.style.opacity = "0";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 200);
  } catch {
    /* ignore */
  }

  // Attempt 3: Clickable toast — user clicks it, which IS a gesture
  sonnerToast(`Open ${label}`, {
    description: "Your browser blocked the popup. Click below to open.",
    duration: 8000,
    action: {
      label: "Open ↗",
      onClick: () => window.open(url, "_blank", "noopener,noreferrer"),
    },
  });
}

// ─── TTS speak() ─────────────────────────────────────────────────────
function speak(text: string, onStart?: () => void, onEnd?: () => void): void {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 0.9;
  utterance.volume = 1;

  // Try to pick a good English voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) =>
      v.name.includes("Google UK English Male") ||
      v.name.includes("Daniel") ||
      v.name.includes("Microsoft David") ||
      v.name.includes("Google US English")
  );
  if (preferred) utterance.voice = preferred;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
}

// ─── Hook ────────────────────────────────────────────────────────────

export function useVoiceCommand(onTourCommand?: (action: "start" | "stop") => void) {
  const [isListening, setIsListening] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const { setTheme, themes } = useTheme();
  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const isDictatingRef = useRef(false);
  const isSpeakingRef = useRef(false);

  // ★ FIX: Use a ref to track the user's INTENT to listen.
  // This avoids the stale-closure problem where onend/speakWithPause
  // captured the initial isListening=false value.
  const wantsToListenRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isDictatingRef.current = isDictating;
  }, [isDictating]);

  // ─── Speak helper that pauses recognition while TTS is active ──────
  const speakWithPause = useCallback(
    (text: string) => {
      setFeedback(text);
      isSpeakingRef.current = true;

      // Pause recognition so TTS doesn't feed back into mic
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }

      speak(
        text,
        undefined,
        () => {
          isSpeakingRef.current = false;
          // Resume listening if user still wants to listen
          if (wantsToListenRef.current) {
            try {
              recognitionRef.current?.start();
            } catch {
              /* ignore */
            }
          }
        }
      );
    },
    [] // No deps — uses only refs, which are stable
  );

  // ─── Command Parser ────────────────────────────────────────────────
  const handleCommand = useCallback(
    (rawTranscript: string) => {
      const command = normalize(rawTranscript);
      console.log("[VoiceAssistant] Command:", command);

      // ── If currently dictating ──────────────────────────────────
      if (isDictatingRef.current) {
        // Check for stop commands first
        if (
          command.includes("stop dictation") ||
          command.includes("end message") ||
          command.includes("end dictation") ||
          command.includes("stop writing")
        ) {
          setIsDictating(false);
          isDictatingRef.current = false;
          speakWithPause("Dictation completed.");
          return;
        }

        // Dispatch the dictated text to the contact form
        window.dispatchEvent(
          new CustomEvent("voice-dictation", { detail: rawTranscript.trim() })
        );
        setFeedback(`📝 "${rawTranscript.trim()}"`);
        return;
      }

      // ── 1. External Link Navigation ────────────────────────────
      const linkIntentMatch = command.match(
        /(?:open|go to|visit|show me|show|launch)\s+(?:my\s+)?(.+)/
      );
      if (linkIntentMatch) {
        const target = linkIntentMatch[1].trim();
        // Check against external link keys
        for (const [key, link] of Object.entries(externalLinks)) {
          if (target.includes(key)) {
            openUrl(link.url, link.label);
            speakWithPause(`Opening your ${link.label}`);
            return;
          }
        }

        // ── 2a. UI Button Click (fuzzy project/cert match) ───────
        const voiceEl = findVoiceTarget(target);
        if (voiceEl) {
          const label = voiceEl.dataset.voiceTarget || target;
          voiceEl.click();
          speakWithPause(`Opening ${label.replace(/-/g, " ")}`);
          return;
        }

        // ── 2b. Section Navigation from "open/go to/show me" ─────
        for (const [keyword, sectionId] of Object.entries(sectionKeywords)) {
          if (target.includes(keyword)) {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              speakWithPause(`Navigating to ${sectionId}`);
              return;
            }
          }
        }
      }

      // ── 2c. Direct section navigation without link-intent prefix ─
      if (
        command.includes("go to") ||
        command.includes("show me") ||
        command.includes("navigate to") ||
        command.includes("scroll to")
      ) {
        for (const [keyword, sectionId] of Object.entries(sectionKeywords)) {
          if (command.includes(keyword)) {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              speakWithPause(`Navigating to ${sectionId}`);
              return;
            }
          }
        }
      }

      // ── 2d. Direct button click commands ────────────────────────
      if (
        command.includes("demo") ||
        command.includes("source") ||
        command.includes("certificate") ||
        command.includes("live project") ||
        command.includes("view resume")
      ) {
        // "view resume" special case
        if (command.includes("view resume") || command.includes("resume")) {
          const resumeBtn = document.querySelector<HTMLElement>('[data-voice-target="resume"]');
          if (resumeBtn) {
            resumeBtn.click();
            speakWithPause("Opening your resume");
            return;
          }
          const resumeSection = document.getElementById("resume");
          if (resumeSection) {
            resumeSection.scrollIntoView({ behavior: "smooth" });
            speakWithPause("Navigating to resume section");
            return;
          }
        }

        // Try fuzzy matching against data-voice-target elements
        const voiceEl = findVoiceTarget(command);
        if (voiceEl) {
          const label = voiceEl.dataset.voiceTarget || "element";
          voiceEl.click();
          speakWithPause(`Opening ${label.replace(/-/g, " ")}`);
          return;
        }
      }

      // ── 3. Dictation Start Commands ─────────────────────────────
      if (
        command.includes("write a message") ||
        command.includes("fill contact form") ||
        command.includes("start dictation") ||
        command.includes("fill the form") ||
        command.includes("dictate message") ||
        command.includes("write message")
      ) {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: "smooth" });
        }

        setIsDictating(true);
        isDictatingRef.current = true;
        speakWithPause("I am listening. What would you like to say in the message?");
        return;
      }

      // ── 4. Scroll Commands ──────────────────────────────────────
      if (command.includes("scroll down")) {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
        setFeedback("Scrolling down");
        return;
      }
      if (command.includes("scroll up")) {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: "smooth" });
        setFeedback("Scrolling up");
        return;
      }
      if (command.includes("scroll to top") || command.includes("go to top")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setFeedback("Scrolling to top");
        return;
      }

      // ── 5. Theme Commands ───────────────────────────────────────
      if (command.includes("theme") || command.includes("mode")) {
        const targetTheme = themes.find((t) => command.includes(t.name.toLowerCase()));
        if (targetTheme) {
          setTheme(targetTheme.id as ThemeName);
          speakWithPause(`Changed theme to ${targetTheme.name}`);
          return;
        }
        if (command.includes("auto")) {
          setTheme("auto");
          speakWithPause("Enabled Auto Theme Sync");
          return;
        }
      }

      // ── 6. Tour Commands ────────────────────────────────────────
      if (
        command.includes("start tour") ||
        command.includes("begin tour") ||
        command.includes("give me a tour") ||
        command.includes("guided tour")
      ) {
        setFeedback("Starting Guided Tour...");
        onTourCommand?.("start");
        return;
      }
      if (
        command.includes("stop tour") ||
        command.includes("end tour") ||
        command.includes("cancel tour")
      ) {
        setFeedback("Stopping tour...");
        onTourCommand?.("stop");
        return;
      }

      // ── 7. Fallback ────────────────────────────────────────────
      speakWithPause(
        "I didn't catch that. You can ask me to open links, view projects, or write a message."
      );
    },
    [setTheme, themes, onTourCommand, speakWithPause]
  );

  // ─── Initialize SpeechRecognition ──────────────────────────────────
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        if (!isDictatingRef.current) {
          setFeedback("Listening...");
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        // Don't process results while TTS is speaking
        if (isSpeakingRef.current) return;

        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript;
            handleCommand(currentTranscript.trim());
            setTranscript("");
          } else {
            setTranscript(event.results[i][0].transcript);
          }
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error === "not-allowed") {
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone permissions to use Voice Commands.",
            variant: "destructive",
          });
        }
        // Don't reset on 'no-speech' — Chrome auto-recovers
        if (event.error !== "no-speech" && event.error !== "aborted") {
          wantsToListenRef.current = false;
          setIsListening(false);
          setFeedback("Error: " + event.error);
        }
      };

      // ★ FIX: onend reads from wantsToListenRef (a ref, never stale)
      // instead of the isListening state (which was always the initial
      // false value due to the stale closure).
      recognition.onend = () => {
        if (wantsToListenRef.current && !isSpeakingRef.current) {
          // Auto-restart: Chrome kills recognition after ~60s silence
          // or after emitting a final result. We want to keep going.
          try {
            recognition.start();
            return; // onstart will fire and keep isListening = true
          } catch {
            // start() failed — fall through to cleanup
          }
        }

        // If TTS is speaking, don't touch the state — speakWithPause
        // will restart recognition when speech ends.
        if (isSpeakingRef.current) return;

        // User intentionally stopped, or auto-restart failed
        setIsListening(false);
        setTimeout(() => setFeedback(""), 2000);
      };

      recognitionRef.current = recognition;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, handleCommand]);

  // ─── Toggle Listening ──────────────────────────────────────────────
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Your browser does not support Voice Commands. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    // ★ FIX: Use the ref to decide, not the (potentially stale) state.
    if (wantsToListenRef.current) {
      // ── STOP ──
      wantsToListenRef.current = false;
      if (isDictatingRef.current) {
        setIsDictating(false);
        isDictatingRef.current = false;
      }
      window.speechSynthesis?.cancel();
      isSpeakingRef.current = false;
      try {
        recognitionRef.current.stop();
      } catch {
        /* already stopped */
      }
      setIsListening(false);
      setFeedback("");
    } else {
      // ── START ──
      wantsToListenRef.current = true;
      setTranscript("");
      setFeedback("Starting...");
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
        wantsToListenRef.current = false;
      }
    }
  }, [toast]);

  // ─── Global Keyboard Shortcut (Ctrl+V to toggle) ──────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "v" &&
        e.ctrlKey &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        toggleListening();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleListening]);

  return { isListening, isDictating, transcript, feedback, toggleListening };
}
