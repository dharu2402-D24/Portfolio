import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { SectionLabel } from "../ui/SectionLabel";

const ROTATING = ["experiences", "systems", "solutions"];

function CinematicText({
  text,
  delay = 0,
  className = "",
  ready = true,
}: {
  text: string;
  delay?: number;
  className?: string;
  ready?: boolean;
}) {
  const chars = text.split("");

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className={char === " " ? "inline" : "inline-block"}
          variants={{
            hidden: {
              opacity: 0,
              y: 8,
              filter: "blur(2px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero({
  onProjects,
  onAbout,
  ready = true,
}: {
  onProjects: () => void;
  onAbout: () => void;
  ready?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const isFirst = useRef(true);
  const cleanupInterval = useRef<number | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      isFirst.current = false;

      const interval = window.setInterval(() => {
        setIdx((i) => (i + 1) % ROTATING.length);
      }, 2400);

      cleanupInterval.current = interval;
    }, 1400);

    return () => {
      window.clearTimeout(timeout);

      if (cleanupInterval.current !== null) {
        window.clearInterval(cleanupInterval.current);
        cleanupInterval.current = null;
      }
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 md:px-14 max-w-[1200px] mx-auto min-h-screen flex flex-col items-center justify-center text-center">

      {/* Top label */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
          filter: "blur(4px)",
        }}
        animate={
          ready
            ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
            : {
              opacity: 0,
              y: 10,
              filter: "blur(4px)",
            }
        }
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 1.6,
        }}
        className="mb-8"
      >
        <SectionLabel centered>
          Visual Designer & Developer
        </SectionLabel>
      </motion.div>

      {/* Main heading */}
      <div className="font-['Space_Grotesk'] font-medium tracking-[-0.03em] leading-[0.95] text-[clamp(48px,8vw,104px)]">
        <div className="text-white">
          <CinematicText
            text="Hi, I'm "
            delay={0.2}
            ready={ready}
          />

          <span className="relative inline-block">
            <CinematicText
              text="Dharohar"
              delay={0.4}
              className="relative z-10 text-[#e84545]"
              ready={ready}
            />

            {/* Hand-drawn underline */}
            <motion.svg
              viewBox="0 0 300 18"
              preserveAspectRatio="none"
              className="absolute left-[-2%] right-[-2%] -bottom-[0.12em] w-[104%] h-[0.24em] pointer-events-none overflow-visible"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.25,
                delay: 1.3,
              }}
            >
              <defs>
                <filter
                  id="brush-rough"
                  x="-2%"
                  y="-50%"
                  width="104%"
                  height="200%"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.9 1.4"
                    numOctaves="2"
                    seed="4"
                    result="noise"
                  />

                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="1.6"
                  />
                </filter>

                <mask id="brush-reveal">
                  <motion.rect
                    x="-4"
                    y="0"
                    height="18"
                    fill="white"
                    initial={{ width: 0 }}
                    animate={ready ? { width: 308 } : { width: 0 }}
                    transition={{
                      duration: 0.95,
                      delay: 1.35,
                      ease: [0.6, 0, 0.2, 1],
                    }}
                  />
                </mask>
              </defs>

              <g
                mask="url(#brush-reveal)"
                filter="url(#brush-rough)"
              >
                {/* Brush body */}
                <path
                  d="
                    M4 9
                    C 28 5.5, 60 11.5, 95 8
                    S 165 6.5, 200 9
                    S 260 7, 295 8.5
                    L 295 10
                    C 260 12, 195 11, 165 11.5
                    S 95 12, 60 12.5
                    S 30 11, 4 10.5 Z
                  "
                  fill="#e84545"
                />

                {/* Inner highlight */}
                <path
                  d="M10 9.5 C 60 7.5, 130 10, 200 8.8 S 270 9, 290 9.4"
                  fill="none"
                  stroke="#ff6464"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  opacity="0.55"
                />

                {/* Trailing flick */}
                <path
                  d="M280 9 C 290 8, 297 7.4, 304 6.6"
                  fill="none"
                  stroke="#e84545"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </g>
            </motion.svg>
          </span>
        </div>

        {/* Subtitle */}
        <div className="text-[#c0c0c0] mt-3">
          <CinematicText
            text="I design & build digital"
            delay={0.8}
            ready={ready}
          />
        </div>

        {/* Rotating word */}
        <div className="mt-3 text-[#2dd4bf] flex justify-center">
          <span className="relative inline-block h-[1.05em] overflow-hidden align-baseline">

            {/* Invisible widest word reserves layout width */}
            <span className="invisible whitespace-nowrap">
              {ROTATING.reduce((a, b) =>
                a.length >= b.length ? a : b
              )}
            </span>

            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING[idx]}
                initial={{
                  y: "100%",
                  opacity: 0,
                }}
                animate={
                  ready
                    ? {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: isFirst.current ? 1.4 : 0,
                      },
                    }
                    : {
                      y: "100%",
                      opacity: 0,
                    }
                }
                exit={{
                  y: "-100%",
                  opacity: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className="absolute inset-0 whitespace-nowrap"
              >
                {ROTATING[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>

      {/* Description */}
      <motion.p
        initial={{
          opacity: 0,
          y: 15,
          filter: "blur(4px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1,
          delay: 1.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-10 max-w-[560px] mx-auto font-['Space_Grotesk'] text-[19px] leading-[1.55] text-[#a0a0a0]"
      >
        3D modelling, graphic design, motion graphics,
        game development, music, and code — all under
        one roof.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <Button
          variant="primary"
          onClick={onProjects}
        >
          View Projects
        </Button>

        <Button
          variant="outline"
          icon="none"
          onClick={onAbout}
        >
          About Me
        </Button>
      </motion.div>
    </section>
  );
}