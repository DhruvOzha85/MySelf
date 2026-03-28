import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const Preloader = () => {
  const [isComplete, setIsComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressWrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  // Create refs for name characters
  const nameCharsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "auto";
      },
    });

    // --- Phase 1: Terminal Boot Sequence (0.0s - 1.0s) ---
    const terminalLines = gsap.utils.toArray('.terminal-line') as HTMLElement[];
    terminalLines.forEach((line, index) => {
      const text = line.innerText;
      line.innerText = "";
      line.style.opacity = "1";
      
      const dummy = { p: 0 };
      tl.to(dummy, {
        p: 1,
        duration: 0.25,
        onUpdate: () => {
          line.innerText = text.slice(0, Math.ceil(dummy.p * text.length));
        },
      }, index * 0.3);
    });

    tl.to(terminalRef.current, { opacity: 0.3, duration: 0.5 }, 1.0);

    // --- Phase 2: Progress Counter & Bar (1.0s - 2.5s) ---
    const countObj = { value: 0 };
    tl.to(countObj, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(countObj.value) + "%";
        }
      },
    }, 1.0);

    tl.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 1.5, ease: "power2.inOut" },
      1.0
    );

    tl.to(counterRef.current, { scale: 1.1, duration: 0.1, ease: "power1.out" }, 2.5);

    // --- Phase 3: Shatter & WELCOME reveal (2.5s - 3.5s) ---
    tl.to([counterRef.current, progressWrapperRef.current], {
      scale: 1.3,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.2,
      ease: "power2.in",
    }, 2.6);

    tl.fromTo(
      welcomeRef.current,
      { scale: 2, opacity: 0, display: "none" },
      { scale: 1, opacity: 1, display: "block", duration: 0.3, ease: "back.out(2)" },
      2.8
    );

    tl.to(
      welcomeRef.current,
      { scale: 0.9, opacity: 0, filter: "blur(5px)", duration: 0.2 },
      3.2
    );

    // --- Phase 4: Identity Reveal (3.2s - 3.8s) ---
    const chars = nameCharsRef.current.filter(Boolean);
    tl.fromTo(
      chars,
      { y: 60, opacity: 0, rotationX: -90 },
      { y: 0, opacity: 1, rotationX: 0, stagger: 0.05, duration: 0.6, ease: "back.out(1.7)" },
      3.2
    );

    tl.fromTo(
      roleRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.4, ease: "none" },
      3.5
    );

    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
      3.5
    );

    // --- Phase 5: Exit Transition (3.8s - 4.2s) ---
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut",
      },
      4.1
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "auto";
    };
  }, []);

  if (isComplete) return null;

  const name = "Dhruv Ozha";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-black z-0 pointer-events-none"></div>

      {/* Phase 1: Terminal */}
      <div
        ref={terminalRef}
        className="absolute top-8 left-8 text-[#00d4ff] font-['JetBrains_Mono'] text-sm md:text-base z-10 flex flex-col gap-1 tracking-wider"
      >
        <div className="terminal-line opacity-0">&gt; initializing system...</div>
        <div className="terminal-line opacity-0">&gt; loading modules...</div>
        <div className="terminal-line opacity-0">&gt; compiling assets...</div>
      </div>

      {/* Phase 2: Counter & Progress */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div
          ref={counterRef}
          className="text-white font-['Space_Grotesk'] font-bold tracking-tighter"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
        >
          0%
        </div>
        
        <div
          ref={progressWrapperRef}
          className="w-[60%] md:w-[40%] h-1 relative mt-4 bg-white/10 overflow-hidden rounded-full block"
        >
          <div
            ref={progressRef}
            className="h-full bg-neon-blue relative"
            style={{ width: "0%" }}
          >
            {/* Sparkling tip */}
            <div className="absolute top-1/2 right-0 w-2 h-2 bg-white rounded-full -translate-y-1/2 translate-x-1/2 shadow-[0_0_15px_5px_rgba(0,212,255,1)]"></div>
          </div>
        </div>
      </div>

      {/* Phase 3: WELCOME */}
      <div
        ref={welcomeRef}
        className="absolute z-30 pointer-events-none"
        style={{ display: "none" }}
      >
        <span
          className="glitch-text text-white font-['Space_Grotesk'] font-bold text-6xl md:text-9xl tracking-widest uppercase"
          data-text="WELCOME"
        >
          WELCOME
        </span>
      </div>

      {/* Phase 4: Identity */}
      <div className="absolute z-40 flex flex-col items-center pointer-events-none">
        <div className="flex overflow-hidden pb-4" style={{ perspective: "1000px" }}>
          {name.split("").map((char, i) => (
            char === " " ? (
              <span key={i} className="inline-block w-3 md:w-6"></span>
            ) : (
              <span
                key={i}
                ref={(el) => (nameCharsRef.current[i] = el)}
                className="inline-block text-white font-['Space_Grotesk'] font-bold text-4xl md:text-7xl opacity-0"
              >
                {char}
              </span>
            )
          ))}
        </div>
        
        <div className="relative mt-2">
          <div
            ref={roleRef}
            className="text-white/80 font-['Inter'] font-light text-sm md:text-xl tracking-[0.2em] uppercase opacity-0 flex items-center"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            Full Stack Developer
            <div className="typewriter-cursor ml-2"></div>
          </div>
          <div
            ref={lineRef}
            className="absolute -bottom-2 left-0 w-full h-[2px] bg-neon-blue origin-left opacity-0"
            style={{ transform: "scaleX(0)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
