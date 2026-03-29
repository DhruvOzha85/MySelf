import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  onFocusStart?: () => void;
  onFocusEnd?: () => void;
}

export function HolographicCard({ children, className = "", onFocusStart, onFocusEnd }: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Raw mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized bounds for tilt (-1 to 1)
  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);

  // Spring animations for a smooth return and float effect
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothXPct = useSpring(xPct, springConfig);
  const smoothYPct = useSpring(yPct, springConfig);

  // Map normalized percent (-0.5 to 0.5) to a rotation degree
  // The max tilt on X and Y axis is 8 degrees.
  const rotateX = useTransform(smoothYPct, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothXPct, [0, 1], [-8, 8]);

  // For the bright glint/foil effect
  const glareX = useSpring(mouseX, springConfig);
  const glareY = useSpring(mouseY, springConfig);

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      onFocusStart?.();
    }, 600); // 600ms hover triggers cinematic focus
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Pixel coordinates relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Normalize from 0 to 1
    const xP = x / rect.width;
    const yP = y / rect.height;

    xPct.set(xP);
    yPct.set(yP);
  };

  const handleMouseLeave = () => {
    // Clear cinematic focus
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    onFocusEnd?.();

    // Return to center
    xPct.set(0.5);
    yPct.set(0.5);
    // Center glare slightly out of bounds to hide it
    if (ref.current) {
      mouseX.set(ref.current.offsetWidth / 2);
      mouseY.set(-ref.current.offsetHeight);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* Glare/Glint Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 rounded-[inherit] overflow-hidden"
        style={{
          background: useMotionTemplate`radial-gradient(circle 250px at ${glareX}px ${glareY}px, rgba(255,255,255,0.12), transparent 80%)`,
          mixBlendMode: "screen" as any,
        }}
      />
      {/* 3D Depth Spacer for actual children (makes content pop off card) */}
      <div
        className="h-full w-full"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
