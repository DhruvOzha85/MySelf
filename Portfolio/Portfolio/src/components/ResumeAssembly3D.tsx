import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Float, Center } from "@react-three/drei";

function FragmentedCore() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [themeColor, setThemeColor] = useState("#ffffff");

  // Keep theme color updated
  useEffect(() => {
    const updateColor = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const primary = rootStyles.getPropertyValue('--accent-primary').trim() || '#ffffff';
      setThemeColor(primary);
    };

    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const pieceCount = 30;
  
  const pieces = useMemo(() => {
    return Array.from({ length: pieceCount }, (_, i) => {
      // Assembled Position (a neat sphere arrangement)
      const phi = Math.acos(-1 + (2 * i) / pieceCount);
      const theta = Math.sqrt(pieceCount * Math.PI) * phi;
      const assembledPos = new THREE.Vector3(
        1.8 * Math.cos(theta) * Math.sin(phi),
        1.8 * Math.sin(theta) * Math.sin(phi),
        1.8 * Math.cos(phi)
      );

      // Exploded Position (chaotic, floating outside)
      const explodedPos = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 + 2,
        (Math.random() - 0.5) * 15
      );

      // Random Rotation
      const rot = new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      return { 
        assembledPos, 
        explodedPos, 
        rot, 
        scale: 0.15 + Math.random() * 0.4,
        isWire: Math.random() > 0.6 // Some pieces are pure wireframe
      };
    });
  }, [pieceCount]);

  useFrame(() => {
    if (!groupRef.current) return;
    
    const section = document.getElementById("resume");
    let progress = 0;
    
    if (section) {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const centerDist = Math.abs(rect.top + rect.height/2 - windowHeight/2);
        const maxDist = windowHeight * 0.8; 
        progress = 1 - Math.min(centerDist / maxDist, 1);
        progress = Math.pow(progress, 3); // ease-in-out snap effect
      }
    }

    if (materialRef.current) {
        materialRef.current.emissive.set(themeColor);
    }

    groupRef.current.children.forEach((child, i) => {
      if (pieces[i]) {
        const p = pieces[i];
        child.position.lerpVectors(p.explodedPos, p.assembledPos, progress);
        
        // When progress=1, rotation is 0, so they align beautifully
        child.rotation.x = THREE.MathUtils.lerp(p.rot.x, 0, progress);
        child.rotation.y = THREE.MathUtils.lerp(p.rot.y, 0, progress);
        child.rotation.z = THREE.MathUtils.lerp(p.rot.z, 0, progress);
        
        // Change scale slightly as it comes together
        child.scale.setScalar(THREE.MathUtils.lerp(p.scale * 1.5, p.scale, progress));
      }
    });

    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x = Math.sin(Date.now() / 3000) * 0.05 + progress * 0.1;
  });

  return (
    <group ref={groupRef}>
      {pieces.map((p, i) => (
        <mesh key={i}>
          <boxGeometry args={[1, 1, 1]} />
          {p.isWire ? (
            <meshBasicMaterial color={themeColor} wireframe transparent opacity={0.3} />
          ) : (
            <meshPhysicalMaterial 
              ref={i === 0 ? materialRef : undefined}
              color="#000000"
              transmission={0.9}
              roughness={0.2}
              thickness={2}
              emissive={themeColor}
              emissiveIntensity={0.6}
            />
          )}
          {!p.isWire && (
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
              <lineBasicMaterial color={themeColor} transparent opacity={0.3} />
            </lineSegments>
          )}
        </mesh>
      ))}
    </group>
  );
}

export function ResumeAssembly3D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Center>
            <FragmentedCore />
          </Center>
        </Float>
      </Canvas>
    </div>
  );
}
