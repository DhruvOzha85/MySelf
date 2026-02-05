 import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

 import { Background3D } from "./Background3D";
 
export function BackgroundEffects() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
     <>
       {/* 3D Background */}
       <Background3D />
       
       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(250, 84%, 60%) 0%, transparent 70%)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Static floating shapes */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-primary/20 animate-float" />
      <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-accent/20 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-1/4 w-3 h-3 rounded-full bg-primary/15 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/3 w-5 h-5 rounded-full bg-accent/15 animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-20 right-10 w-4 h-4 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "4s" }} />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
       </div>
     </>
  );
}
