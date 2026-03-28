import { Suspense, useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Get theme accent colors from CSS variables
function getThemeColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    primary: style.getPropertyValue('--glow-primary').trim() || '#a855f7',
    secondary: style.getPropertyValue('--glow-secondary').trim() || '#6366f1',
    bg: style.getPropertyValue('--bg-root').trim() || '#050510',
    text: style.getPropertyValue('--text-muted').trim() || '#606078',
  };
}

interface ShapeData {
  geom: THREE.BufferGeometry;
  basePos: THREE.Vector3;
  velocity: THREE.Vector3;
  rotSpeed: THREE.Vector3;
  color: string;
  scale: number;
  hasWireframe: boolean;
  driftAmplitude: number;
  driftFrequency: number;
  driftOffset: number;
}

// --- Wandering Shape: each shape drifts freely + reacts to cursor ---
function WanderingShape({
  shape,
  mouse3D,
  reducedMotion,
}: {
  shape: ShapeData;
  mouse3D: React.MutableRefObject<THREE.Vector3>;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const currentPos = useRef(shape.basePos.clone());
  const currentVel = useRef(shape.velocity.clone());
  const glowIntensity = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    const mesh = meshRef.current;
    const pos = currentPos.current;
    const vel = currentVel.current;

    // --- 1. Free-floating drift (sinusoidal wandering) ---
    const driftX = Math.sin(elapsed * shape.driftFrequency + shape.driftOffset) * shape.driftAmplitude;
    const driftY = Math.cos(elapsed * shape.driftFrequency * 0.7 + shape.driftOffset * 2) * shape.driftAmplitude;
    const driftZ = Math.sin(elapsed * shape.driftFrequency * 0.5 + shape.driftOffset * 3) * shape.driftAmplitude * 0.5;

    // Apply velocity-based movement
    pos.x += vel.x * delta;
    pos.y += vel.y * delta;
    pos.z += vel.z * delta;

    // --- 2. Soft boundary bounce: keep within visible area ---
    const boundsX = 14, boundsY = 10, boundsZ = 8;
    if (pos.x > boundsX || pos.x < -boundsX) vel.x *= -0.8;
    if (pos.y > boundsY || pos.y < -boundsY) vel.y *= -0.8;
    if (pos.z > boundsZ || pos.z < -boundsZ - 4) vel.z *= -0.8;
    pos.x = THREE.MathUtils.clamp(pos.x, -boundsX, boundsX);
    pos.y = THREE.MathUtils.clamp(pos.y, -boundsY, boundsY);
    pos.z = THREE.MathUtils.clamp(pos.z, -boundsZ - 4, boundsZ);

    // --- 3. Cursor proximity reaction ---
    const cursorWorld = mouse3D.current;
    const dx = pos.x + driftX - cursorWorld.x;
    const dy = pos.y + driftY - cursorWorld.y;
    const dz = pos.z + driftZ - cursorWorld.z;
    const distToCursor = Math.sqrt(dx * dx + dy * dy + dz * dz);

    const reactionRadius = 5;
    const pushStrength = 3;

    if (distToCursor < reactionRadius && distToCursor > 0.1) {
      // Push away from cursor
      const force = (1 - distToCursor / reactionRadius) * pushStrength;
      const nx = dx / distToCursor;
      const ny = dy / distToCursor;
      const nz = dz / distToCursor;
      vel.x += nx * force * delta * 10;
      vel.y += ny * force * delta * 10;
      vel.z += nz * force * delta * 5;

      // Glow up when near cursor
      glowIntensity.current = THREE.MathUtils.lerp(
        glowIntensity.current,
        (1 - distToCursor / reactionRadius) * 0.6,
        delta * 5
      );
    } else {
      glowIntensity.current = THREE.MathUtils.lerp(glowIntensity.current, 0, delta * 3);
    }

    // --- 4. Gentle drag to slow down over time ---
    vel.x *= 0.995;
    vel.y *= 0.995;
    vel.z *= 0.995;

    // --- 5. Subtle spring back toward original area ---
    const homeForce = 0.02;
    vel.x += (shape.basePos.x - pos.x) * homeForce * delta;
    vel.y += (shape.basePos.y - pos.y) * homeForce * delta;
    vel.z += (shape.basePos.z - pos.z) * homeForce * delta;

    // Apply final position with drift overlay
    mesh.position.set(pos.x + driftX, pos.y + driftY, pos.z + driftZ);

    // Self-rotation
    mesh.rotation.x += shape.rotSpeed.x * delta;
    mesh.rotation.y += shape.rotSpeed.y * delta;
    mesh.rotation.z += shape.rotSpeed.z * delta;

    // Update material opacity based on cursor glow
    const mat = mesh.material as THREE.MeshPhysicalMaterial;
    mat.emissiveIntensity = 0.1 + glowIntensity.current * 2;
    mat.opacity = 0.65 + glowIntensity.current * 0.35;

    // Scale pulse near cursor
    const targetScale = shape.scale * (1 + glowIntensity.current * 0.25);
    mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4);

    // Wireframe follow
    if (wireRef.current) {
      wireRef.current.position.copy(mesh.position);
      wireRef.current.rotation.copy(mesh.rotation);
      wireRef.current.scale.copy(mesh.scale).multiplyScalar(1.02);
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        geometry={shape.geom}
        position={shape.basePos.toArray()}
        scale={shape.scale}
      >
        <meshPhysicalMaterial
          color={shape.color}
          emissive={shape.color}
          emissiveIntensity={0.1}
          transparent
          opacity={0.65}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
        />
      </mesh>
      {shape.hasWireframe && (
        <mesh
          ref={wireRef}
          geometry={shape.geom}
          position={shape.basePos.toArray()}
          scale={shape.scale * 1.02}
        >
          <meshBasicMaterial
            color={shape.color}
            wireframe
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </>
  );
}

// --- Neural Network Grid ---
function NeuralLines({ count = 45, maxDistance = 3.2, mouse3D }: {
  count?: number;
  maxDistance?: number;
  mouse3D: React.MutableRefObject<THREE.Vector3>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const basePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 16;
        const z = (Math.random() - 0.5) * 10 - 2;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [count]);

  const animatedPositions = useRef(basePoints.map(p => p.clone()));
  const velocities = useRef(basePoints.map(() => new THREE.Vector3(
    (Math.random() - 0.5) * 0.1,
    (Math.random() - 0.5) * 0.1,
    (Math.random() - 0.5) * 0.05,
  )));

  const pointsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    basePoints.forEach((p, i) => { arr[i*3]=p.x; arr[i*3+1]=p.y; arr[i*3+2]=p.z; });
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, [basePoints, count]);

  // Use a fixed size buffer for line segments to avoid allocation
  const maxSegments = count * 4; 
  const lineBuffer = useMemo(() => new Float32Array(maxSegments * 2 * 3), [maxSegments]);
  const linesGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(lineBuffer, 3));
    return g;
  }, [lineBuffer]);

  useFrame((_, delta) => {
    const pts = animatedPositions.current;
    const vels = velocities.current;
    const cursor = mouse3D.current;

    for (let i = 0; i < pts.length; i++) {
      pts[i].x += vels[i].x * delta;
      pts[i].y += vels[i].y * delta;
      pts[i].z += vels[i].z * delta;

      if (Math.abs(pts[i].x) > 12) vels[i].x *= -0.8;
      if (Math.abs(pts[i].y) > 9) vels[i].y *= -0.8;
      if (Math.abs(pts[i].z) > 7) vels[i].z *= -0.8;

      const dx = pts[i].x - cursor.x;
      const dy = pts[i].y - cursor.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 3.5 && dist > 0.1) {
        const f = (1 - dist/3.5) * 1.5 * delta;
        vels[i].x += (dx/dist) * f;
        vels[i].y += (dy/dist) * f;
      }

      vels[i].multiplyScalar(0.99);
    }

    if (pointsRef.current) {
      const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pts.length; i++) {
        posArr[i*3] = pts[i].x; posArr[i*3+1] = pts[i].y; posArr[i*3+2] = pts[i].z;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    let segmentIndex = 0;
    for (let i = 0; i < pts.length && segmentIndex < maxSegments; i++) {
      for (let j = i + 1; j < pts.length && segmentIndex < maxSegments; j++) {
        const d = pts[i].distanceToSquared(pts[j]);
        if (d < maxDistance * maxDistance) {
            const idx = segmentIndex * 6;
            lineBuffer[idx] = pts[i].x; lineBuffer[idx+1] = pts[i].y; lineBuffer[idx+2] = pts[i].z;
            lineBuffer[idx+3] = pts[j].x; lineBuffer[idx+4] = pts[j].y; lineBuffer[idx+5] = pts[j].z;
            segmentIndex++;
        }
      }
    }
    
    if (linesRef.current) {
        // Zero out the rest of the buffer
        for(let k = segmentIndex * 6; k < lineBuffer.length; k++) lineBuffer[k] = 0; 
        linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const [colors, setColors] = useState(() => getThemeColors());
  useEffect(() => {
    const observer = new MutationObserver(() => setColors(getThemeColors()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeom}>
        <pointsMaterial
          size={0.05}
          color={colors.primary}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeom}>
        <lineBasicMaterial
          color={colors.secondary}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// --- Main Scene ---
export function Background3D() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const mouse3D = useRef(new THREE.Vector3(0, 0, 5));
  const [colors, setColors] = useState(() => getThemeColors());

  useEffect(() => {
    const observer = new MutationObserver(() => setColors(getThemeColors()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse3D.current.set(x * 12, y * 8, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const shapes = useMemo(() => {
    const arr: ShapeData[] = [];
    const numShapes = 14; 

    const geometries = [
      new THREE.TetrahedronGeometry(1.2),
      new THREE.CylinderGeometry(0.5, 0.5, 1.5, 6),
      new THREE.OctahedronGeometry(1.3),
    ];

    const themeColors = [colors.primary, colors.secondary];

    for (let i = 0; i < numShapes; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 8 - 4;

      arr.push({
        geom: geometries[Math.floor(Math.random() * geometries.length)],
        basePos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3((Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3, (Math.random()-0.5)*0.1),
        rotSpeed: new THREE.Vector3((Math.random()-0.5)*0.4, (Math.random()-0.5)*0.4, (Math.random()-0.5)*0.2),
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        scale: Math.random() * 0.5 + 0.3,
        hasWireframe: Math.random() > 0.5,
        driftAmplitude: Math.random() * 1.2 + 0.5,
        driftFrequency: Math.random() * 0.2 + 0.1,
        driftOffset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [colors]);

  function CameraParallax() {
    useFrame((state) => {
      const m = mouse3D.current;
      state.camera.position.x += (m.x * 0.1 - state.camera.position.x) * 0.02;
      state.camera.position.y += (m.y * 0.1 - state.camera.position.y) * 0.02;
      state.camera.lookAt(0, 0, 0);
    });
    return null;
  }

  // Optimize WanderingShape internally
  const Shape = useCallback(({ shape, mouse3D, reducedMotion }: any) => {
     const meshRef = useRef<THREE.Mesh>(null);
     const currentPos = useRef(shape.basePos.clone());
     const currentVel = useRef(shape.velocity.clone());

     useFrame((state, delta) => {
       if (!meshRef.current || reducedMotion) return;
       const elapsed = state.clock.elapsedTime;
       const mesh = meshRef.current;
       const pos = currentPos.current;
       const vel = currentVel.current;

       // Movement logic
       pos.x += vel.x * delta; pos.y += vel.y * delta;
       if (Math.abs(pos.x) > 13) vel.x *= -0.8;
       if (Math.abs(pos.y) > 9) vel.y *= -0.8;

       const dX = Math.sin(elapsed * shape.driftFrequency + shape.driftOffset) * shape.driftAmplitude;
       const dY = Math.cos(elapsed * shape.driftFrequency + shape.driftOffset) * shape.driftAmplitude;
       
       mesh.position.set(pos.x + dX, pos.y + dY, pos.z);
       mesh.rotation.x += shape.rotSpeed.x * delta;
       mesh.rotation.y += shape.rotSpeed.y * delta;

       // Subtle mouse push
       const dx = mesh.position.x - mouse3D.current.x;
       const dy = mesh.position.y - mouse3D.current.y;
       const dist = Math.sqrt(dx*dx + dy*dy);
       if(dist < 4) {
         vel.x += (dx/dist) * 2 * delta;
         vel.y += (dy/dist) * 2 * delta;
       }
       vel.multiplyScalar(0.995);
     });

     return (
       <mesh ref={meshRef} geometry={shape.geom} scale={shape.scale}>
         <meshStandardMaterial color={shape.color} metalness={0.7} roughness={0.3} transparent opacity={0.6} />
       </mesh>
     );
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1, backgroundColor: colors.bg }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{
            antialias: false, 
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.2]}
        >
          <color attach="background" args={[colors.bg]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color={colors.primary} />
          <pointLight position={[-10, -10, 5]} intensity={1} color={colors.secondary} />

          {shapes.map((s, i) => <Shape key={i} shape={s} mouse3D={mouse3D} reducedMotion={reducedMotion} />)}
          <NeuralLines count={45} maxDistance={3.2} mouse3D={mouse3D} />
          <CameraParallax />
        </Canvas>
      </Suspense>
    </div>
  );
}