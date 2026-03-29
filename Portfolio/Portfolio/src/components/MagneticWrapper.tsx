import { useMagnetic } from "@/hooks/useMagnetic";
import React from "react";

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  elasticity?: number;
  maxDistance?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function MagneticWrapper({
  children,
  strength = 0.35,
  elasticity = 0.15,
  maxDistance = 150,
  className = "",
  as: Tag = "div",
}: MagneticWrapperProps) {
  const magneticRef = useMagnetic({ strength, elasticity, maxDistance });

  return (
    // @ts-expect-error - dynamic tag element
    <Tag ref={magneticRef} className={`magnetic-element ${className}`} style={{ willChange: "transform", display: "inline-block" }}>
      {children}
    </Tag>
  );
}
