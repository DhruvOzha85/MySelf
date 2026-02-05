import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(ring, {
        opacity: 0.5,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(ring, {
        opacity: 1,
        duration: 0.3,
      });
    };

    const handleClick = () => {
      gsap.to(dot, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
      gsap.to(ring, {
        scale: 1.5,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(ring, { scale: 1, opacity: 1 });
        },
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", handleClick);

    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClick);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
