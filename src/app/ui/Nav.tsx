import { useState, useEffect, useRef, useCallback } from "react";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import imgLogo from "../../assets/images/logo.png";

/* ── Cipher character set for the decrypt hover effect ── */
const CIPHER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789—·×+≈∆";

/**
 * DecryptText — Cinematic text-decryption hover effect.
 */
function DecryptText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const text = children;
  const [displayChars, setDisplayChars] = useState<string[]>(text.split(""));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animating = useRef(false);

  const scramble = useCallback(() => {
    if (animating.current) return;
    animating.current = true;
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayChars(
        text.split("").map((char, i) => {
          if (char === " ") return "\u00A0";
          if (i < Math.floor(iteration)) return char;
          return CIPHER[Math.floor(Math.random() * CIPHER.length)];
        })
      );

      iteration += 0.5;

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayChars(text.split(""));
        animating.current = false;
      }
    }, 28);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span onMouseEnter={scramble} className={className}>
      {displayChars.map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ minWidth: char === "\u00A0" ? "0.3em" : undefined }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/* ── Stadium-wave text ── */
function WaveText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={`wave-text ${className}`}
      style={{ display: "inline-flex" }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="wave-char"
          style={{
            display: "inline-block",
            transitionDelay: `${i * 0.04}s`,
            minWidth: char === " " ? "0.4em" : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* ── Types ── */
type Section = "home" | "projects" | "about" | "contact";

/* ── Nav ── */
export function Nav({
  active,
  onNavigate,
  inDetail = false,
}: {
  active: Section;
  onNavigate: (s: Section) => void;
  inDetail?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /* ── Chunky / voxel glass backdrop ── */
  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = headerRef.current;
      if (!el) return;

      const p = Math.min(1, window.scrollY / 180);

      /*
       * Keep the bar dark enough to remain readable while still
       * allowing the background to deform through the glass.
       */
      const blur = 10 + p * 4;
      const opacity = 0.72 + p * 0.1;

      el.style.backdropFilter = `url(#nav-voxel-glass) blur(${blur}px) saturate(1.08)`;
      (el.style as any).WebkitBackdropFilter =
        `url(#nav-voxel-glass) blur(${blur}px) saturate(1.08)`;

      el.style.background = `rgba(9, 9, 10, ${opacity})`;

      el.style.borderBottomColor =
        `rgba(255, 255, 255, ${0.055 + p * 0.025})`;
    };

    const onScroll = () => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Lock body scroll when mobile overlay is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const items: { key: Section; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "projects", label: "Projects" },
    { key: "about", label: "About" },
  ];

  const handleNav = (s: Section) => {
    setMobileOpen(false);
    onNavigate(s);
  };

  return (
    <>
      {/* ── SVG filter used by the navbar backdrop ── */}
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{
          position: "absolute",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter
            id="nav-voxel-glass"
            x="-20%"
            y="-40%"
            width="140%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            {/* First make the backdrop broad and soft */}
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="3.5"
              result="soft"
            />

            {/* Low-frequency distortion gives the glass chunky movement */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.055 0.085"
              numOctaves="1"
              seed="17"
              result="noise"
            />

            <feDisplacementMap
              in="soft"
              in2="noise"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
              result="voxel"
            />

            {/* Slight contrast boost */}
            <feComponentTransfer in="voxel">
              <feFuncR
                type="linear"
                slope="1.08"
                intercept="-0.015"
              />
              <feFuncG
                type="linear"
                slope="1.08"
                intercept="-0.015"
              />
              <feFuncB
                type="linear"
                slope="1.08"
                intercept="-0.015"
              />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* ── Header bar ── */}
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 1.8,
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] overflow-hidden"
      >
        {/* Very subtle light refraction — NOT a grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(255,255,255,0.045) 0%,
                rgba(255,255,255,0.012) 32%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Slight dark lower edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* ── Content ── */}
        <div className="relative max-w-[1400px] mx-auto flex items-center justify-between h-[72px] px-6 md:px-10">
          {/* ── Logo ── */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 2.0,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => handleNav("home")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <img
              src={imgLogo}
              alt="DM"
              width={28}
              height={28}
              draggable={false}
              className="h-7 w-7 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-700 select-none"
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            />
          </motion.button>

          {/* ── Desktop navigation ── */}
          <LayoutGroup id="nav">
            <nav className="hidden md:flex items-center">
              {items.map((item, i) => {
                const isActive = !inDetail && item.key === active;

                return (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 2.1 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleNav(item.key)}
                    className="group relative px-5 py-2.5 cursor-pointer"
                  >
                    <DecryptText
                      className={`font-['Space_Mono'] text-[12px] tracking-[0.22em] uppercase transition-colors duration-600 ${isActive
                          ? "text-white"
                          : "text-white/60 group-hover:text-white"
                        }`}
                    >
                      {item.label}
                    </DecryptText>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 block w-[3px] h-[3px] rounded-full bg-[#e84545]"
                        style={{
                          boxShadow:
                            "0 0 8px 2px rgba(232,69,69,0.45)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Subtle separator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.3 }}
                className="w-px h-3.5 bg-white/[0.06] mx-2"
              />

              {/* Contact / Let's Talk */}
              <motion.button
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0, scale: 0.97 }}
                transition={{
                  duration: 0.8,
                  delay: 2.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handleNav("contact")}
                className="wave-trigger group relative px-6 py-2 ml-2 rounded-full cursor-pointer bg-[#2dd4bf] text-[#0d0d0d] font-bold shadow-[0_0_20px_-5px_rgba(45,212,191,0.4)] hover:shadow-[0_0_25px_-3px_rgba(45,212,191,0.6)] hover:bg-[#2dd4bf]/90 transition-all duration-300"
              >
                <WaveText
                  text="Let's  Talk"
                  className="font-['Space_Mono'] text-[12px] tracking-[0.22em] uppercase"
                />
              </motion.button>
            </nav>
          </LayoutGroup>

          {/* ── Mobile hamburger ── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer text-white/30 hover:text-white/70 transition-colors duration-500"
            aria-label="Toggle menu"
          >
            <div className="relative w-4 h-3 flex flex-col justify-between">
              <motion.span
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 5 : 0,
                  width: mobileOpen ? 18 : 16,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block h-px bg-current origin-left"
              />

              <motion.span
                animate={{
                  opacity: mobileOpen ? 0 : 1,
                  scaleX: mobileOpen ? 0 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="block h-px w-3 bg-current"
              />

              <motion.span
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? -5 : 0,
                  width: mobileOpen ? 18 : 10,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block h-px bg-current origin-left"
              />
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {[
                ...items,
                { key: "contact" as Section, label: "Let's  Talk" },
              ].map((item, i) => {
                const isActive = !inDetail && item.key === active;
                const isContact = item.key === "contact";

                return (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleNav(item.key)}
                    className={
                      isContact
                        ? "wave-trigger group relative mt-4 px-8 py-3 rounded-full cursor-pointer bg-[#2dd4bf] text-[#0d0d0d] font-bold shadow-[0_0_20px_-5px_rgba(45,212,191,0.4)] hover:shadow-[0_0_25px_-3px_rgba(45,212,191,0.6)] hover:bg-[#2dd4bf]/90 transition-all duration-300"
                        : `relative font-['Space_Mono'] text-[14px] tracking-[0.28em] uppercase cursor-pointer transition-colors duration-500 ${isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                        }`
                    }
                  >
                    {isContact ? (
                      <WaveText
                        text="Let's  Talk"
                        className="font-['Space_Mono'] text-[14px] tracking-[0.28em] uppercase"
                      />
                    ) : (
                      item.label
                    )}

                    {isActive && !isContact && (
                      <motion.span
                        layoutId="nav-dot-m"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#e84545]"
                        style={{
                          boxShadow:
                            "0 0 8px 2px rgba(232,69,69,0.45)",
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}