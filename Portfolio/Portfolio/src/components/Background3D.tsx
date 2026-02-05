 import { Suspense, useRef, useMemo, useEffect, useState } from "react";
 import { Canvas, useFrame, useThree } from "@react-three/fiber";
 import { Float } from "@react-three/drei";
 import * as THREE from "three";
 import { useIsMobile } from "@/hooks/use-mobile";
 import { useReducedMotion } from "@/hooks/useReducedMotion";
 
 interface FloatingShapeProps {
   theme: "dark" | "light";
   mousePosition: { x: number; y: number };
   reducedMotion: boolean;
 }
 
 function FloatingShape({ theme, mousePosition, reducedMotion }: FloatingShapeProps) {
   const meshRef = useRef<THREE.Mesh>(null);
   const { viewport } = useThree();
   
   const color = useMemo(() => {
     return theme === "dark" ? "#8B5CF6" : "#6366F1";
   }, [theme]);
 
   useFrame((state, delta) => {
     if (!meshRef.current || reducedMotion) return;
     
     // Slow continuous rotation
     meshRef.current.rotation.y += delta * 0.1;
     meshRef.current.rotation.x += delta * 0.05;
     
     // Gentle parallax based on mouse position
     const targetX = 3 + mousePosition.x * 0.5;
     const targetY = 1 + mousePosition.y * 0.3;
     
     meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02;
     meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02;
   });
 
   return (
     <Float
       speed={reducedMotion ? 0 : 1.5}
       rotationIntensity={reducedMotion ? 0 : 0.2}
       floatIntensity={reducedMotion ? 0 : 0.5}
     >
       <mesh ref={meshRef} position={[3, 1, -5]} scale={1.5}>
         <torusKnotGeometry args={[1, 0.4, 64, 16]} />
         <meshStandardMaterial
           color={color}
           transparent
           opacity={0.15}
           roughness={0.1}
           metalness={0.8}
           emissive={color}
           emissiveIntensity={0.1}
         />
       </mesh>
     </Float>
   );
 }
 
 export function Background3D() {
   const isMobile = useIsMobile();
   const reducedMotion = useReducedMotion();
   const [theme, setTheme] = useState<"dark" | "light">("dark");
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 
   useEffect(() => {
     // Detect theme from document
     const checkTheme = () => {
       const isDark = document.documentElement.classList.contains("dark");
       setTheme(isDark ? "dark" : "light");
     };
     
     checkTheme();
     
     // Observe theme changes
     const observer = new MutationObserver(checkTheme);
     observer.observe(document.documentElement, {
       attributes: true,
       attributeFilter: ["class"],
     });
     
     return () => observer.disconnect();
   }, []);
 
   useEffect(() => {
     const handleMouseMove = (e: MouseEvent) => {
       // Normalize mouse position to -1 to 1 range
       const x = (e.clientX / window.innerWidth) * 2 - 1;
       const y = -(e.clientY / window.innerHeight) * 2 + 1;
       setMousePosition({ x, y });
     };
 
     window.addEventListener("mousemove", handleMouseMove);
     return () => window.removeEventListener("mousemove", handleMouseMove);
   }, []);
 
   // Skip rendering on mobile for performance
   if (isMobile) return null;
 
   return (
     <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
       <Suspense fallback={null}>
         <Canvas
           camera={{ position: [0, 0, 10], fov: 45 }}
           gl={{ 
             antialias: true, 
             alpha: true,
             powerPreference: "low-power"
           }}
           dpr={[1, 1.5]}
         >
           <ambientLight intensity={0.5} />
           <pointLight 
             position={[10, 10, 10]} 
             intensity={0.8} 
             color={theme === "dark" ? "#8B5CF6" : "#6366F1"} 
           />
           <FloatingShape 
             theme={theme} 
             mousePosition={mousePosition} 
             reducedMotion={reducedMotion} 
           />
         </Canvas>
       </Suspense>
     </div>
   );
 }