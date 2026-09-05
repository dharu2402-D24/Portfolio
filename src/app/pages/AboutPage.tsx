import { motion, AnimatePresence } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../effects/Reveal";
import { WordReveal } from "../effects/WordReveal";
import { JengaText } from "../effects/JengaText";

const InteractiveRenderScene = lazy(() =>
  import("../effects/InteractiveRender").then((module) => ({
    default: module.InteractiveRenderScene,
  }))
);

function InteractiveRender() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Preload the 3D model in the background after initial entrance animations complete.
    // This avoids blocking the main thread during scrolling, completely eliminating the lag.
    const t = setTimeout(() => {
      setShouldLoad(true);
    }, 3500);

    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 200, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative lg:col-span-6 order-1 lg:order-2 w-[120%] lg:w-[130%] max-w-[800px] lg:max-w-none mx-auto aspect-square lg:-mr-32 lg:-mt-24 cursor-grab active:cursor-grabbing"
    >
      {shouldLoad && (
        <Suspense fallback={null}>
          <InteractiveRenderScene />
        </Suspense>
      )}
    </motion.div>
  );
}

const capabilities = [
  { label: "Graphic Design", tools: "Figma · Illustrator · Photoshop", value: 76, color: "#e84545" },
  { label: "UI/UX Design", tools: "Figma", value: 86, color: "#e84545" },
  { label: "3D Modelling", tools: "Blender", value: 72, color: "#e84545" },
  { label: "Motion Graphics", tools: "Davinci Resolve", value: 46, color: "#2dd4bf" },
  { label: "Game Des/Dev", tools: "Unreal Engine · Unity", value: 50, color: "#2dd4bf" },
  { label: "Frontend Dev", tools: "HTML · JS · React", value: 28, color: "#2dd4bf" },
];

const timeline = [
  {
    phase: "Foundation",
    accent: "#2dd4bf",
    title: "Where it all started",
    text: "Graphic design, poster work, and visual communication. Learning to see structure in everything.",
    principle: {
      title: "Visual Identities",
      text: "Nothing decorative without purpose.",
    },
  },
  {
    phase: "Expansion",
    accent: "#2dd4bf",
    title: "Building Systems",
    text: "Moved into UI/UX — designing product interfaces, component libraries, and interaction patterns.",
    principle: {
      title: "Systems over Screens",
      text: "Building coherent design systems.",
    },
  },
  {
    phase: "Dimension",
    accent: "#2dd4bf",
    title: "Adding Depth",
    text: "Exploring 3D modelling, motion graphics, and game environments. Merging design with code.",
    principle: {
      title: "Spatial Thinking",
      text: "Designing in layers, depth, and dimension.",
    },
  },
  {
    phase: "Convergence",
    accent: "#2dd4bf",
    title: "What's Next?",
    text: "Interactive digital experiences where design, 3D, and development converge into one practice.",
    principle: {
      title: "Interaction-First",
      text: "Every element communicates through behavior.",
    },
  },
];

function ProjectGallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="mt-40 relative">
      <div className="text-center mb-24 flex flex-col items-center">
        <Reveal>
          <SectionLabel>Approach · Evolution</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-['Space_Grotesk'] font-medium text-[clamp(36px,5vw,56px)] tracking-[-0.025em] leading-[1.05] text-white max-w-[820px] mx-auto">
            How I <span className="text-[#e84545]">think</span>, and how I{" "}
            <span className="text-[#2dd4bf]">got here</span>.
          </h2>
        </Reveal>
      </div>

      <div className="relative max-w-[1040px] mx-auto w-full flex flex-col pt-8">
        {timeline.map((item, index) => (
          <GalleryCard
            key={item.phase}
            item={item}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
}

function GalleryCard({
  item,
  index,
  hoveredIndex,
  setHoveredIndex
}: {
  item: (typeof timeline)[number];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const isHovered = hoveredIndex === index;
  const colors = ["#a93439", "#168f86", "#a93439", "#168f86"];
  const bgColor = colors[index % colors.length];

  return (
    <motion.div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      animate={{
        y: hoveredIndex !== null && index < hoveredIndex ? "-1.25vw" : "0vw",
        backgroundColor: isHovered ? bgColor : "#101010",
        scale: isHovered ? 1 : 1,
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
      style={{
        zIndex: timeline.length - index,
        marginBottom: "-1.75vw",
      }}
    >
      {/* Subtle editorial lighting — keeps the accent color from feeling flat. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, transparent 42%, rgba(0,0,0,0.18) 100%)",
          opacity: isHovered ? 0.75 : 0.25,
        }}
      />

      {/* Small phase marker gives every card a stronger visual anchor. */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none"
        style={{
          backgroundColor: isHovered ? "rgba(255,255,255,0.45)" : bgColor,
          opacity: isHovered ? 0.55 : 0.25,
        }}
      />

      <div className="relative flex justify-between items-center px-8 md:px-10 py-7 md:py-8">
        <div className="flex items-center gap-4 min-w-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              backgroundColor: isHovered ? "rgba(255,255,255,0.65)" : bgColor,
              boxShadow: isHovered ? "0 0 12px rgba(255,255,255,0.18)" : "none",
            }}
          />
          <h3 className="font-['Space_Grotesk'] text-[clamp(25px,4vw,42px)] uppercase font-bold text-white tracking-[-0.035em] leading-none">
            {item.phase}
          </h3>
        </div>

        <span className="shrink-0 ml-6 text-white/45 font-mono text-[11px] tracking-[0.28em]">
          0{index + 1}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="px-8 md:px-10 pb-9 md:pb-10 pt-1 flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="flex-1 min-w-0">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-white/50" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
                    {String(index + 1).padStart(2, "0")} / Phase
                  </span>
                </div>

                <h4 className="text-[clamp(22px,2.4vw,28px)] font-bold text-white mb-3 tracking-[-0.02em]">
                  {item.title}
                </h4>
                <p className="text-white/80 text-base md:text-lg max-w-2xl leading-[1.65]">
                  {item.text}
                </p>
              </div>

              <div className="md:w-[34%] shrink-0 bg-black/25 p-5 md:p-6 rounded-xl border border-white/15 h-fit">
                <strong className="block font-mono text-[10px] tracking-[0.28em] uppercase text-white/55 mb-3">
                  Principle
                </strong>
                <h5 className="font-['Space_Grotesk'] text-lg font-medium text-white mb-2 tracking-[-0.015em]">
                  {item.principle.title}
                </h5>
                <p className="text-sm text-white/65 leading-relaxed">
                  {item.principle.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SkillWaveform({
  value,
}: {
  value: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const revealRef = useRef(0);
  const hasRevealedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, active: false });
  const isOnScreenRef = useRef(false);
  const drawingRef = useRef(false);

  // Intersection observer for reveal trigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isVisible) return;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const BAR_WIDTH = 2;
    const BAR_GAP = 2.5;
    const MAX_HEIGHT = 30;
    const IDLE_HEIGHT = 3; // Quiet idle state — just little nubs

    let barCount = 0;
    let w = 0;
    let h = 0;

    // Pre-compute a base waveform envelope unique to this skill
    const seed = value * 137.5;
    const computeEnvelope = (count: number) => {
      const env: number[] = [];
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const wave1 = Math.sin(t * Math.PI * 3.2 + seed) * 0.3;
        const wave2 = Math.sin(t * Math.PI * 7.1 + seed * 0.6) * 0.15;
        const wave3 = Math.sin(t * Math.PI * 11.3 + seed * 1.4) * 0.08;
        const base = 0.4 + wave1 + wave2 + wave3;
        env.push(Math.max(0.15, Math.min(1, base)));
      }
      return env;
    };

    let envelope: number[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = MAX_HEIGHT + 6;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      barCount = Math.floor(w / (BAR_WIDTH + BAR_GAP));
      envelope = computeEnvelope(barCount);
    };

    resize();
    window.addEventListener("resize", resize);

    // Teal color: #2dd4bf
    const cr = 45, cg = 212, cb = 191;
    startTimeRef.current = performance.now();

    // Smoothed cursor x for fluid follow
    let smoothCursorX = -9999;

    // Throttle idle to ~30fps
    let lastDrawTime = 0;
    const IDLE_INTERVAL = 33;

    const draw = (now: number) => {
      // Pause when off-screen
      if (!isOnScreenRef.current) {
        drawingRef.current = false;
        return;
      }

      // Throttle idle frames (no cursor interaction)
      if (!mouseRef.current.active && hasRevealedRef.current) {
        if (now - lastDrawTime < IDLE_INTERVAL) {
          rafRef.current = requestAnimationFrame(draw);
          return;
        }
      }
      lastDrawTime = now;

      const elapsed = (now - startTimeRef.current) / 1000;
      const centerY = h / 2;

      // Reveal animation
      if (isVisible && !hasRevealedRef.current) {
        revealRef.current = Math.min(1, revealRef.current + 0.02);
        if (revealRef.current >= 1) hasRevealedRef.current = true;
      }
      const reveal = revealRef.current;

      // Smooth cursor follow
      const targetX = mouseRef.current.x;
      smoothCursorX += (targetX - smoothCursorX) * 0.12;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < barCount; i++) {
        const x = i * (BAR_WIDTH + BAR_GAP);
        const revealProgress = Math.max(0, Math.min(1, (reveal * barCount - i) / 4));

        if (revealProgress <= 0) continue;

        // Is this bar within the skill level?
        const activeCount = Math.floor((value / 100) * barCount);
        const isActive = i < activeCount;

        // Idle breathing - stronger pulsing to appear alive
        const phase = i * 0.4 + elapsed * (1.5 + (i % 5) * 0.1);
        const pulse = Math.sin(phase) * 0.4 + Math.sin(phase * 0.6 + i * 0.2) * 0.2;

        // Active bars have a taller, much more energetic idle state
        const activeIdleHeight = IDLE_HEIGHT * (1.8 + envelope[i] * 1.5 + pulse * 1.5);
        const inactiveIdleHeight = 2 * (0.5 + pulse * 0.2);
        const idleHeight = isActive ? activeIdleHeight : inactiveIdleHeight;

        // Cursor proximity
        let cursorInfluence = 0;
        if (mouseRef.current.active) {
          const barCenterX = x + BAR_WIDTH / 2;
          const dist = Math.abs(barCenterX - smoothCursorX);
          const radius = 80;
          if (dist < radius) {
            cursorInfluence = Math.exp(-(dist * dist) / (2 * (radius / 2.5) ** 2));
          }
        }

        // Fully interactive hover for active bars: ignore envelope and spike to max height
        let excitedHeight: number;
        if (isActive) {
          excitedHeight = MAX_HEIGHT * (0.85 + pulse * 0.15); // Full height interaction
        } else {
          excitedHeight = envelope[i] * MAX_HEIGHT * 0.35; // Diminished interaction for inactive
        }

        let barHeight = idleHeight + (excitedHeight - idleHeight) * cursorInfluence;
        barHeight *= revealProgress;
        barHeight = Math.max(1.5, barHeight);

        // Alpha: active bars are brighter at rest, inactive are very dim
        const activeIdleAlpha = 0.75 + pulse * 0.1;
        const inactiveIdleAlpha = 0.08 + pulse * 0.02;
        const baseAlpha = isActive ? activeIdleAlpha : inactiveIdleAlpha;
        const excitedAlpha = isActive ? 1.0 : 0.25 + cursorInfluence * 0.15;
        const alpha = (baseAlpha + (excitedAlpha - baseAlpha) * cursorInfluence) * revealProgress;

        const halfBar = barHeight / 2;
        const radius = Math.min(BAR_WIDTH / 2, halfBar);

        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx.beginPath();
        ctx.roundRect(x, centerY - halfBar, BAR_WIDTH, barHeight, radius);
        ctx.fill();

        // Glow on tall active bars near cursor
        if (isActive && cursorInfluence > 0.4 && barHeight > MAX_HEIGHT * 0.35) {
          const glowAlpha = alpha * 0.2 * cursorInfluence;
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${glowAlpha})`;
          ctx.beginPath();
          ctx.roundRect(x - 1, centerY - halfBar - 1, BAR_WIDTH + 2, barHeight + 2, radius + 1);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    // Start/stop drawing based on viewport visibility
    const startDrawing = () => {
      if (drawingRef.current) return;
      drawingRef.current = true;
      rafRef.current = requestAnimationFrame(draw);
    };

    // Visibility observer — pause rAF when scrolled off-screen
    const visObs = new IntersectionObserver(
      ([entry]) => {
        isOnScreenRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startDrawing();
        }
        // When not intersecting, draw() will self-stop via the isOnScreenRef check
      },
      { threshold: 0 }
    );
    const container = containerRef.current;
    if (container) visObs.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      drawingRef.current = false;
      window.removeEventListener("resize", resize);
      visObs.disconnect();
    };
  }, [value, isVisible]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, active: true };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { ...mouseRef.current, active: false };
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="w-full"
      />
    </div>
  );
}

function CapabilityRow({
  cap,
  index,
}: {
  cap: (typeof capabilities)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="flex items-baseline gap-3">
        <p className="font-['Space_Grotesk'] font-medium text-[18px] text-[#f5f0e8] leading-none">
          {cap.label}
        </p>
        <span className="h-px flex-1 min-w-[20px] bg-white/[0.06] translate-y-[-2px]" />
        <p className="font-['Space_Mono'] text-[10px] tracking-[0.18em] uppercase text-[#8a8a8a] whitespace-nowrap">
          {cap.tools}
        </p>
      </div>

      <SkillWaveform value={cap.value} />
    </motion.div>
  );
}

export function AboutPage({ onContact }: { onContact: () => void }) {
  return (
    <section className="relative pt-16 pb-24 px-6 md:px-14 max-w-[1200px] mx-auto">
      {/* Hero */}
      <Reveal>
        <SectionLabel color="teal">About</SectionLabel>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <h1 className="font-['Space_Grotesk'] font-medium text-[clamp(56px,8vw,96px)] tracking-[-0.03em] leading-[1] text-white">
            <JengaText text="Dharohar" delay={0.05} className="cursor-default" />
          </h1>
          <h1 className="mt-4 font-['Space_Grotesk'] font-medium text-[clamp(56px,8vw,96px)] tracking-[-0.03em] leading-[1] text-[#e84545]">
            <JengaText text="Mehta" delay={0.2} className="cursor-default" />
          </h1>

          <Reveal delay={0.18}>
            <p className="mt-10 font-['Space_Grotesk'] font-medium text-[20px] leading-[1.55] text-white max-w-[640px]">
              I design and build interactive digital systems, ranging from 3D environments and motion design to product interfaces and visual identities.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-6 font-['Space_Grotesk'] font-medium text-[20px] leading-[1.55] text-white max-w-[640px]">
              I work across 3D environments, UI, and development, creating clear, intentional experiences. From posters and social media to reels, game worlds, and code, every decision is visual and every detail is intentional.
            </p>
          </Reveal>
        </div>

        {/* 3D render — original asset from Figma */}
        <InteractiveRender />
      </div>

      {/* Capabilities */}
      <div className="mt-32">
        <Reveal>
          <SectionLabel>Capabilities</SectionLabel>
        </Reveal>
        <h2 className="mt-6 font-['Space_Grotesk'] font-medium text-[clamp(36px,5vw,56px)] tracking-[-0.025em] leading-[1.05] text-white">
          <WordReveal text="What I Work With" delay={0.05} />
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {capabilities.map((c, i) => (
            <CapabilityRow key={c.label} cap={c} index={i} />
          ))}
        </div>
      </div>

      {/* Unified Approach + Journey timeline */}
      <ProjectGallerySection />
    </section>
  );
}
