import { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useArcadeMode } from "@/hooks/useArcadeMode";

// ═══════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════
interface Platform {
  x: number; y: number; w: number; h: number; color: string; label?: string;
}
interface Coin {
  x: number; y: number; collected: boolean; angle: number;
}
interface Door {
  x: number; y: number; w: number; h: number; label: string; sectionId: string; glow: number;
}
interface ParallaxLayer {
  stars: { x: number; y: number; size: number; brightness: number }[];
  speed: number;
}
interface Player {
  x: number; y: number; vx: number; vy: number;
  w: number; h: number;
  onGround: boolean; facing: number; frame: number; frameTimer: number;
}
interface Camera {
  x: number; y: number;
}

// ═══════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════
const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const MOVE_SPEED = 4;
const FRICTION = 0.85;
const PLAYER_W = 20;
const PLAYER_H = 28;
const COIN_RADIUS = 8;
const WORLD_WIDTH = 6000;
const WORLD_HEIGHT = 600;
const GROUND_Y = 500;

// Theme accent colors (fallback values)
const NEON_CYAN = "#00d4ff";
const NEON_PURPLE = "#a855f7";
const NEON_GREEN = "#10b981";
const NEON_PINK = "#ec4899";
const NEON_ORANGE = "#f59e0b";
const NEON_RED = "#ef4444";

// ═══════════════════════════════════════════════
// WORLD DATA
// ═══════════════════════════════════════════════
function createPlatforms(): Platform[] {
  return [
    // Ground (full width)
    { x: 0, y: GROUND_Y, w: WORLD_WIDTH, h: 100, color: "#1a1a2e" },

    // SPAWN ZONE (0–600)
    { x: 80, y: 420, w: 120, h: 14, color: NEON_CYAN },
    { x: 250, y: 360, w: 100, h: 14, color: NEON_CYAN },

    // ABOUT ZONE (600–1400)
    { x: 650, y: 400, w: 200, h: 14, color: NEON_PURPLE, label: "ABOUT" },
    { x: 900, y: 340, w: 150, h: 14, color: NEON_PURPLE },
    { x: 1100, y: 380, w: 180, h: 14, color: NEON_PURPLE },

    // SKILLS ZONE (1400–2200)
    { x: 1450, y: 420, w: 160, h: 14, color: NEON_GREEN, label: "SKILLS" },
    { x: 1650, y: 360, w: 120, h: 14, color: NEON_GREEN },
    { x: 1800, y: 300, w: 140, h: 14, color: NEON_GREEN },
    { x: 1980, y: 380, w: 160, h: 14, color: NEON_GREEN },

    // PROJECTS ZONE (2200–3200)
    { x: 2300, y: 400, w: 220, h: 14, color: NEON_PINK, label: "PROJECTS" },
    { x: 2600, y: 340, w: 180, h: 14, color: NEON_PINK },
    { x: 2850, y: 280, w: 160, h: 14, color: NEON_PINK },
    { x: 3050, y: 360, w: 120, h: 14, color: NEON_PINK },

    // CERTS ZONE (3200–4000)
    { x: 3300, y: 420, w: 200, h: 14, color: NEON_ORANGE, label: "CERTS" },
    { x: 3550, y: 360, w: 140, h: 14, color: NEON_ORANGE },
    { x: 3750, y: 320, w: 160, h: 14, color: NEON_ORANGE },

    // LEETCODE ZONE (4000–4800)
    { x: 4100, y: 400, w: 180, h: 14, color: NEON_RED, label: "LEETCODE" },
    { x: 4350, y: 340, w: 150, h: 14, color: NEON_RED },
    { x: 4550, y: 300, w: 120, h: 14, color: NEON_RED },

    // CONTACT ZONE (4800–5600)
    { x: 4900, y: 420, w: 200, h: 14, color: NEON_CYAN, label: "CONTACT" },
    { x: 5150, y: 360, w: 160, h: 14, color: NEON_CYAN },
    { x: 5400, y: 320, w: 140, h: 14, color: NEON_CYAN },
  ];
}

function createCoins(): Coin[] {
  const coins: Coin[] = [];
  // Skill coins scattered in SKILLS zone (1400–2200)
  const positions = [
    [1500, 380], [1560, 380], [1700, 320], [1760, 320],
    [1850, 260], [1910, 260], [2020, 340], [2080, 340],
    // A few in other zones for fun
    [700, 360], [950, 300], [2400, 360], [2700, 300],
    [3400, 380], [4200, 360], [5000, 380],
  ];
  positions.forEach(([x, y]) => {
    coins.push({ x, y, collected: false, angle: Math.random() * Math.PI * 2 });
  });
  return coins;
}

function createDoors(): Door[] {
  return [
    { x: 800, y: GROUND_Y - 60, w: 36, h: 60, label: "ABOUT", sectionId: "about", glow: 0 },
    { x: 1600, y: GROUND_Y - 60, w: 36, h: 60, label: "SKILLS", sectionId: "skills", glow: 0 },
    { x: 2500, y: GROUND_Y - 60, w: 36, h: 60, label: "PROJECTS", sectionId: "projects", glow: 0 },
    { x: 3500, y: GROUND_Y - 60, w: 36, h: 60, label: "CERTS", sectionId: "certificates", glow: 0 },
    { x: 4400, y: GROUND_Y - 60, w: 36, h: 60, label: "LEETCODE", sectionId: "leetcode", glow: 0 },
    { x: 5200, y: GROUND_Y - 60, w: 36, h: 60, label: "CONTACT", sectionId: "contact", glow: 0 },
  ];
}

function createParallax(): ParallaxLayer[] {
  const layers: ParallaxLayer[] = [];
  for (let layer = 0; layer < 3; layer++) {
    const stars: ParallaxLayer["stars"] = [];
    const count = 40 + layer * 20;
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * WORLD_WIDTH * 1.5,
        y: Math.random() * WORLD_HEIGHT * 0.8,
        size: Math.random() * (3 - layer) + 0.5,
        brightness: Math.random() * 0.5 + 0.3,
      });
    }
    layers.push({ stars, speed: 0.1 + layer * 0.15 });
  }
  return layers;
}

// ═══════════════════════════════════════════════
// ZONE DETECTION
// ═══════════════════════════════════════════════
function getZoneName(x: number): string {
  if (x < 600) return "🏠 SPAWN";
  if (x < 1400) return "👤 ABOUT";
  if (x < 2200) return "⚡ SKILLS";
  if (x < 3200) return "🚀 PROJECTS";
  if (x < 4000) return "🏆 CERTIFICATES";
  if (x < 4800) return "💻 LEETCODE";
  return "📬 CONTACT";
}

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export function ArcadeMode() {
  const { isArcadeActive, score, exitArcade, addScore, lastPlayerX } = useArcadeMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coinsRef = useRef<Coin[] | null>(null); // Persist coins across re-entries
  const gameStateRef = useRef<{
    player: Player;
    camera: Camera;
    platforms: Platform[];
    coins: Coin[];
    doors: Door[];
    parallax: ParallaxLayer[];
    keys: Set<string>;
    time: number;
    nearDoor: Door | null;
  } | null>(null);

  // ── Init Game State ──
  const initGame = useCallback(() => {
    // Only create new coins if we don't have persisted ones
    if (!coinsRef.current) {
      coinsRef.current = createCoins();
    }
    
    gameStateRef.current = {
      player: {
        x: lastPlayerX.current, y: GROUND_Y - PLAYER_H,
        vx: 0, vy: 0,
        w: PLAYER_W, h: PLAYER_H,
        onGround: false, facing: 1, frame: 0, frameTimer: 0,
      },
      camera: { x: Math.max(0, lastPlayerX.current - 400), y: 0 },
      platforms: createPlatforms(),
      coins: coinsRef.current,
      doors: createDoors(),
      parallax: createParallax(),
      keys: new Set(),
      time: 0,
      nearDoor: null,
    };
  }, [lastPlayerX]);

  // ── Game Loop ──
  useEffect(() => {
    if (!isArcadeActive) return;
    initGame();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Key handlers
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Save position before exiting
        if (gameStateRef.current) lastPlayerX.current = gameStateRef.current.player.x;
        exitArcade();
        return;
      }
      gameStateRef.current?.keys.add(e.key.toLowerCase());
      // Prevent default for game keys
      if (["arrowleft", "arrowright", "arrowup", "arrowdown", " "].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      gameStateRef.current?.keys.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let animId: number;

    function update() {
      const gs = gameStateRef.current;
      if (!gs) return;

      gs.time += 1;
      const { player, keys, platforms, coins, doors } = gs;

      // ── Input ──
      const left = keys.has("arrowleft") || keys.has("a");
      const right = keys.has("arrowright") || keys.has("d");
      const jump = keys.has("arrowup") || keys.has("w") || keys.has(" ");
      const enter = keys.has("arrowdown") || keys.has("s");

      if (left) { player.vx -= 0.8; player.facing = -1; }
      if (right) { player.vx += 0.8; player.facing = 1; }
      if (jump && player.onGround) { player.vy = JUMP_FORCE; player.onGround = false; }

      // ── Physics ──
      player.vx *= FRICTION;
      player.vy += GRAVITY;
      player.x += player.vx;
      player.y += player.vy;

      // Clamp to world
      if (player.x < 0) { player.x = 0; player.vx = 0; }
      if (player.x > WORLD_WIDTH - player.w) { player.x = WORLD_WIDTH - player.w; player.vx = 0; }

      // ── Platform Collision ──
      player.onGround = false;
      for (const p of platforms) {
        if (
          player.x + player.w > p.x &&
          player.x < p.x + p.w &&
          player.y + player.h >= p.y &&
          player.y + player.h <= p.y + p.h + 12 &&
          player.vy >= 0
        ) {
          player.y = p.y - player.h;
          player.vy = 0;
          player.onGround = true;
        }
      }

      // ── Coin Collection ──
      for (const coin of coins) {
        if (coin.collected) continue;
        coin.angle += 0.05;
        const dx = (player.x + player.w / 2) - coin.x;
        const dy = (player.y + player.h / 2) - coin.y;
        if (Math.sqrt(dx * dx + dy * dy) < 24) {
          coin.collected = true;
          addScore(10);
        }
      }

      // ── Door Proximity ──
      gs.nearDoor = null;
      for (const door of doors) {
        door.glow = Math.sin(gs.time * 0.05) * 0.3 + 0.7;
        const dx = (player.x + player.w / 2) - (door.x + door.w / 2);
        const dy = (player.y + player.h) - (door.y + door.h);
        if (Math.abs(dx) < 40 && Math.abs(dy) < 40) {
          gs.nearDoor = door;
          if (enter) {
            lastPlayerX.current = player.x;
            exitArcade(door.sectionId);
            return;
          }
        }
      }

      // ── Walk Animation ──
      if (Math.abs(player.vx) > 0.5) {
        player.frameTimer += 1;
        if (player.frameTimer > 8) { player.frame = (player.frame + 1) % 4; player.frameTimer = 0; }
      } else {
        player.frame = 0;
      }

      // ── Camera ──
      const targetCamX = player.x - (canvas!.width / 2) + player.w / 2;
      const targetCamY = Math.min(0, player.y - canvas!.height * 0.6);
      gs.camera.x += (targetCamX - gs.camera.x) * 0.1;
      gs.camera.y += (targetCamY - gs.camera.y) * 0.1;
      gs.camera.x = Math.max(0, Math.min(WORLD_WIDTH - canvas!.width, gs.camera.x));
    }

    function render() {
      const gs = gameStateRef.current;
      if (!gs || !ctx || !canvas) return;
      const { player, camera, platforms, coins, doors, parallax, time } = gs;
      const W = canvas.width;
      const H = canvas.height;

      // ── Clear ──
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, W, H);

      // ── Parallax Stars ──
      for (const layer of parallax) {
        for (const star of layer.stars) {
          const sx = star.x - camera.x * layer.speed;
          const sy = star.y - camera.y * layer.speed * 0.3;
          const wrappedX = ((sx % W) + W) % W;
          const pulse = star.brightness + Math.sin(time * 0.03 + star.x) * 0.15;
          ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
          ctx.fillRect(wrappedX, sy, star.size, star.size);
        }
      }

      // ── Grid Lines (subtle) ──
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 1;
      const gridSize = 100;
      const gridOffsetX = (-camera.x * 0.3) % gridSize;
      for (let gx = gridOffsetX; gx < W; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      ctx.save();
      ctx.translate(-camera.x, -camera.y);

      // ── Zone Labels (background text) ──
      const zones = [
        { x: 300, label: "SPAWN", color: NEON_CYAN },
        { x: 1000, label: "ABOUT", color: NEON_PURPLE },
        { x: 1800, label: "SKILLS", color: NEON_GREEN },
        { x: 2700, label: "PROJECTS", color: NEON_PINK },
        { x: 3600, label: "CERTIFICATES", color: NEON_ORANGE },
        { x: 4400, label: "LEETCODE", color: NEON_RED },
        { x: 5100, label: "CONTACT", color: NEON_CYAN },
      ];
      ctx.font = "bold 48px 'Courier New', monospace";
      ctx.textAlign = "center";
      for (const z of zones) {
        ctx.fillStyle = z.color + "15";
        ctx.fillText(z.label, z.x, 120);
      }

      // ── Platforms ──
      for (const p of platforms) {
        // Skip ground platform visual (just collision)
        if (p.w === WORLD_WIDTH) {
          ctx.fillStyle = "#0f0f23";
          ctx.fillRect(p.x, p.y, p.w, p.h);
          continue;
        }
        // Neon platform
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color + "30";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
        ctx.shadowBlur = 0;
      }

      // ── Doors ──
      for (const door of doors) {
        const glowAlpha = door.glow;
        // Door frame
        ctx.shadowColor = NEON_CYAN;
        ctx.shadowBlur = 15 * glowAlpha;
        ctx.fillStyle = `rgba(0, 212, 255, ${0.15 * glowAlpha})`;
        ctx.fillRect(door.x, door.y, door.w, door.h);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.8 * glowAlpha})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(door.x, door.y, door.w, door.h);
        // Inner glow line
        ctx.fillStyle = `rgba(0, 212, 255, ${0.4 * glowAlpha})`;
        ctx.fillRect(door.x + door.w / 2 - 1, door.y + 5, 2, door.h - 10);
        ctx.shadowBlur = 0;
        // Label
        ctx.fillStyle = `rgba(0, 212, 255, ${0.9 * glowAlpha})`;
        ctx.font = "bold 10px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText(door.label, door.x + door.w / 2, door.y - 8);
      }

      // ── Coins ──
      for (const coin of coins) {
        if (coin.collected) continue;
        const wobble = Math.sin(coin.angle) * 3;
        ctx.save();
        ctx.translate(coin.x, coin.y + wobble);
        // Glow
        ctx.shadowColor = NEON_GREEN;
        ctx.shadowBlur = 12;
        // Spinning coin (scale X using cos for 3D effect)
        const scaleX = Math.abs(Math.cos(coin.angle));
        ctx.scale(scaleX, 1);
        ctx.beginPath();
        ctx.arc(0, 0, COIN_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = NEON_GREEN + "cc";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // "$" symbol
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 10px 'Courier New'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (scaleX > 0.3) ctx.fillText("$", 0, 1);
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // ── Player ──
      const px = player.x;
      const py = player.y;
      ctx.save();
      ctx.translate(px + player.w / 2, py);
      ctx.scale(player.facing, 1);
      ctx.translate(-player.w / 2, 0);

      // Body
      ctx.fillStyle = NEON_CYAN;
      ctx.fillRect(3, 8, 14, 12);
      // Head
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(4, 0, 12, 10);
      // Eyes
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(10, 3, 3, 3);
      // Legs (animated)
      const legOffset = player.onGround ? Math.sin(player.frame * Math.PI / 2) * 3 : 2;
      ctx.fillStyle = NEON_PURPLE;
      ctx.fillRect(4, 20, 5, 8);
      ctx.fillRect(11 + legOffset, 20, 5, 8);

      ctx.restore();

      // ── Near-Door Prompt ──
      if (gs.nearDoor) {
        const d = gs.nearDoor;
        const promptY = d.y - 30;
        const pulse = Math.sin(time * 0.1) * 0.2 + 0.8;
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse})`;
        ctx.font = "bold 12px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText("▼ ENTER (↓/S)", d.x + d.w / 2, promptY);
      }

      ctx.restore(); // End camera transform

      // ── HUD ──
      // Zone name
      ctx.fillStyle = "rgba(10, 10, 26, 0.7)";
      ctx.fillRect(0, 0, W, 50);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText(getZoneName(player.x), 20, 32);

      // Score
      ctx.textAlign = "right";
      ctx.fillStyle = NEON_GREEN;
      ctx.fillText(`SCORE: ${score}`, W - 20, 32);

      // Controls hint (bottom)
      ctx.fillStyle = "rgba(10, 10, 26, 0.6)";
      ctx.fillRect(0, H - 40, W, 40);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "12px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText("← → / A D  Move  |  SPACE  Jump  |  ↓ / S  Enter Door  |  ESC  Exit", W / 2, H - 16);

      // Progress bar (world position)
      const progress = player.x / WORLD_WIDTH;
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(20, 44, W - 40, 3);
      ctx.fillStyle = NEON_CYAN;
      ctx.fillRect(20, 44, (W - 40) * progress, 3);
    }

    function gameLoop() {
      update();
      render();
      animId = requestAnimationFrame(gameLoop);
    }

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isArcadeActive, initGame, exitArcade, addScore, score]);

  return (
    <AnimatePresence>
      {isArcadeActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200]"
          style={{ backgroundColor: "#0a0a1a" }}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
