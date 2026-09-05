import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Cinematic loading screen that preloads heavy assets (Three.js chunk, GLB 3D model, fonts, routes)
 * while displaying a brand-aligned geometric gyroscope & cipher decryption animation.
 *
 * Design language:
 *  - Pitch black (#0d0d0d) backdrop matching the portfolio
 *  - Crimson red (#e84545) & Teal (#2dd4bf) dual accent
 *  - Space Mono typography for telemetry & data readouts
 *  - Geometric SVG gyroscope & pulsing core (no generic spinners)
 *  - Clean corner HUD brackets and subtle ambient glows
 */

const NAME = "DHAROHAR MEHTA";
const SUBTITLE = "VISUAL DESIGNER & CREATIVE TECHNOLOGIST";
const MIN_DISPLAY_MS = 2500; // minimum duration to appreciate animation & buffer 3D chunk
const MAX_TIMEOUT_MS = 6000; // safety ceiling so slow networks never freeze

const STATUS_STEPS = [
  "INITIALIZING SYSTEM MATRIX",
  "PRE-WARMING THREE.JS 3D ENGINE",
  "CACHING GEOMETRY & SHADERS",
  "SYSTEM OPERATIONAL",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_STEPS[0]);
  const [assetsReady, setAssetsReady] = useState(false);
  const startTime = useRef(Date.now());
  const completedRef = useRef(false);

  // ── Preload heavy assets & track genuine progress ──
  useEffect(() => {
    let cancelled = false;
    const tasks: Promise<unknown>[] = [];

    // 1. Three.js chunk + InteractiveRender module + useGLTF preload
    tasks.push(
      import("./effects/InteractiveRender")
        .then(() => {
          if (!cancelled) {
            setProgress((p) => Math.max(p, 45));
            setStatusText(STATUS_STEPS[1]);
          }
        })
        .catch(() => {
          // Non-critical fallback
        })
    );

    // 2. Warm the GLB file into HTTP browser cache
    tasks.push(
      fetch(`${import.meta.env.BASE_URL}keychain.glb`)
        .then((r) => r.arrayBuffer())
        .then(() => {
          if (!cancelled) {
            setProgress((p) => Math.max(p, 75));
            setStatusText(STATUS_STEPS[2]);
          }
        })
        .catch(() => {
          // Model will load on-demand if prefetch fails
        })
    );

    // 3. Ensure fonts are loaded and painted
    tasks.push(
      document.fonts.ready
        .then(() => {
          if (!cancelled) {
            setProgress((p) => Math.max(p, 85));
          }
        })
        .catch(() => { })
    );

    // 4. Secondary routes stay lazy and load only when actually needed.
    // This preserves code-splitting and keeps the initial load lightweight.

    // Smooth progress interpolator to bridge steps cleanly
    const ticker = setInterval(() => {
      if (!cancelled) {
        setProgress((p) => {
          if (p >= 94) return p;
          return p + Math.random() * 2.5 + 0.8;
        });
      }
    }, 120);

    // Complete once all tasks resolve
    Promise.all(tasks).finally(() => {
      if (!cancelled) {
        setAssetsReady(true);
      }
    });

    // Hard fallback safety timeout (in case of throttled network)
    const safetyTimeout = setTimeout(() => {
      if (!cancelled) {
        setAssetsReady(true);
      }
    }, MAX_TIMEOUT_MS);

    return () => {
      cancelled = true;
      clearInterval(ticker);
      clearTimeout(safetyTimeout);
    };
  }, []);

  // ── Trigger completion after minimum duration + assets ready ──
  useEffect(() => {
    if (!assetsReady || completedRef.current) return;

    const elapsed = Date.now() - startTime.current;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    const timer = setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      setProgress(100);
      setStatusText(STATUS_STEPS[3]);

      // Brief 250ms pause at 100% so user registers full readiness
      setTimeout(() => {
        onComplete();
      }, 250);
    }, remaining);

    return () => clearTimeout(timer);
  }, [assetsReady, onComplete]);

  return (
    <motion.div
      key="global-loading-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ background: "#0d0d0d" }}
      aria-label="Loading Dharohar Mehta Portfolio"
    >
      {/* Minimal game-style loader */}
      <div className="flex flex-col items-center">
        <div className="game-loader" aria-hidden="true">
          <span className="game-loader-bar" />
          <span className="game-loader-bar" />
          <span className="game-loader-bar" />
          <span className="game-loader-ball" />
        </div>

        <div className="mt-8 text-center">
          <div className="font-['Space_Mono'] text-[11px] md:text-[13px] tracking-[0.3em] text-white/80 uppercase">
            {NAME}
          </div>

          <div className="mt-2 font-['Space_Mono'] text-[9px] md:text-[10px] tracking-[0.28em] text-white/30 uppercase">
            {statusText}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="w-[140px] md:w-[180px] h-[2px] bg-white/[0.07] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, Math.round(progress))}%`,
                background: "linear-gradient(90deg, #e84545, #2dd4bf)",
                transition: "width 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>

          <span className="font-['Space_Mono'] text-[9px] tracking-[0.15em] text-white/40 tabular-nums w-8">
            {Math.min(100, Math.round(progress))}%
          </span>
        </div>
      </div>

      <style>{`
        .game-loader {
          position: relative;
          width: 56px;
          height: 36px;
        }

        .game-loader-bar {
          position: absolute;
          bottom: 0;
          width: 10px;
          height: 30px;
          border-radius: 2px 2px 0 0;
          background: rgba(255, 255, 255, 0.78);
        }

        .game-loader-bar:nth-child(1) {
          left: 0;
        }

        .game-loader-bar:nth-child(2) {
          left: 23px;
        }

        .game-loader-bar:nth-child(3) {
          right: 0;
        }

        .game-loader-ball {
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e84545;
          box-shadow: 0 0 12px rgba(232, 69, 69, 0.35);
          animation:
            game-loader-x 1.5s linear infinite alternate,
            game-loader-y 0.75s cubic-bezier(0, 200, 0.8, 200) infinite;
          will-change: left, top;
        }

        @keyframes game-loader-x {
          100% {
            left: calc(100% - 10px);
          }
        }

        @keyframes game-loader-y {
          100% {
            top: -0.1px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .game-loader-ball {
            animation: none;
            left: calc(50% - 5px);
            top: 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
