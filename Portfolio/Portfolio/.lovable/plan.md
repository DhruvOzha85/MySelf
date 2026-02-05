

# Subtle 3D Background Object Implementation

## Overview
Add a decorative, developer-themed 3D floating geometric shape to the portfolio background using React Three Fiber. The object will feature smooth animations, mouse parallax response, and theme-aware styling while maintaining performance and professionalism.

---

## What You'll Get

- A floating **torus knot** (elegant mathematical shape popular in developer/tech aesthetics) positioned in the hero section area
- **Glass-like material** that adapts to dark/light theme
- Slow, continuous rotation animation
- Gentle parallax movement responding to your cursor
- Subtle glow effect when cursor approaches
- Automatically disabled on mobile devices for performance
- Clean integration with existing background effects

---

## Technical Implementation

### 1. Install Dependencies
Add React Three Fiber and Drei helpers:
- `@react-three/fiber@^8.18` - React renderer for Three.js
- `@react-three/drei@^9.122.0` - Helper components (lighting, environment)
- `three@^0.169.0` - Three.js core library

### 2. Create New Component: `Background3D.tsx`

**File: `src/components/Background3D.tsx`**

Structure:
```text
Background3D (wrapper)
├── Mobile detection (useIsMobile hook)
├── Theme detection (useTheme hook)
├── Mouse tracking (useMotionValue from Framer Motion)
├── Canvas (React Three Fiber)
│   ├── Suspense fallback (null - graceful loading)
│   ├── FloatingShape (the 3D torus knot)
│   │   ├── useFrame for continuous rotation
│   │   ├── Mouse parallax positioning
│   │   └── MeshTransmissionMaterial (glass effect)
│   ├── Ambient Light
│   └── Point Light (soft purple/blue glow)
```

**Key Features:**
- **Torus Knot Geometry**: Low-poly (64, 16 segments) for performance
- **Glass Material**: Using Drei's `MeshTransmissionMaterial` with transmission, roughness, and color based on theme
- **Rotation**: Slow Y-axis rotation (~0.1 rad/sec) using `useFrame`
- **Parallax**: Mouse position normalized and applied with spring physics
- **Glow on Hover**: Distance-based emissive intensity increase when cursor nears center

### 3. Create Performance Hook: `useReducedMotion.ts`

**File: `src/hooks/useReducedMotion.ts`**

Detects user's "prefers-reduced-motion" system setting and disables 3D effects for accessibility compliance.

### 4. Integrate into BackgroundEffects

**Modified: `src/components/BackgroundEffects.tsx`**

- Import and render `Background3D` component
- Position it with `z-index: -1` behind existing effects
- The 3D canvas will be full-screen fixed, pointer-events disabled

---

## Visual Design Specifications

| Property | Value |
|----------|-------|
| Shape | Torus Knot (radius: 1, tube: 0.4) |
| Position | Offset right, upper area (x: 3, y: 1, z: -5) |
| Size | Moderate (scale ~1.5) |
| Material | Glass transmission (0.9 transmission, 0.1 roughness) |
| Color (Dark) | Purple/violet `#8B5CF6` |
| Color (Light) | Indigo `#6366F1` |
| Rotation Speed | 0.1 radians/second |
| Parallax Range | ±0.5 units |
| Opacity | 60-70% to remain subtle |

---

## Performance Optimizations

1. **Mobile Detection**: Completely skip rendering on mobile devices
2. **Reduced Motion**: Respect user accessibility preferences
3. **Low Poly Count**: 64x16 segments (1,024 faces vs 10,000+ for high detail)
4. **Single Light Setup**: One ambient + one point light
5. **Lazy Loading**: Wrap Canvas in React.lazy with Suspense
6. **Frame Limiting**: Use `frameloop="demand"` when possible
7. **No Shadows**: Disable shadow mapping for performance

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `package.json` | Add three, @react-three/fiber, @react-three/drei |
| `src/components/Background3D.tsx` | **Create** - Main 3D component |
| `src/hooks/useReducedMotion.ts` | **Create** - Accessibility hook |
| `src/components/BackgroundEffects.tsx` | **Modify** - Integrate Background3D |

---

## Fallback Behavior

- **Mobile**: No 3D rendering (existing 2D effects remain)
- **Reduced Motion**: Static shape with no rotation/parallax
- **Loading Error**: Graceful fallback to null (invisible failure)
- **Low Performance**: Consider adding GPU detection in future

