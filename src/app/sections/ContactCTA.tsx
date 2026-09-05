import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MouseEvent } from "react";
import { SectionLabel } from "../ui/SectionLabel";

/* Idle shimmer text — CSS keyframes for native 60fps performance */
function FloatingText({ text }: { text: string }) {
  const chars = text.split("");

  return (
    <>
      <style>{`
        @keyframes charFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .float-char {
          display: inline-block;
          animation: charFloat 2.4s ease-in-out infinite;
        }
      `}</style>

      <span className="inline-flex flex-wrap justify-center">
        {chars.map((char, i) => (
          <span
            key={i}
            className="float-char"
            style={{
              animationDelay: `${i * 0.07}s`,
              minWidth: char === " " ? "0.25em" : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
}

/* Wave text for the button — matches nav's "Let's Chat" style */
function WaveText({ text }: { text: string }) {
  return (
    <span className="wave-text" style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="wave-char"
          style={{
            display: "inline-block",
            transitionDelay: `${i * 0.04}s`,
            minWidth: char === " " ? "0.3em" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function ContactCTA({ onContact }: { onContact: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, {
    stiffness: 60,
    damping: 20,
  });

  const mouseY = useSpring(y, {
    stiffness: 60,
    damping: 20,
  });

  const rotateX = useTransform(mouseY, [-1, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      className="relative px-6 md:px-14 max-w-[1200px] mx-auto py-24"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-3xl border border-white/[0.15] bg-[#111111] p-12 md:p-20 text-center shadow-[0_40px_80px_-20px_rgba(0,0,0,1)]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div
          className="relative"
          style={{ transform: "translateZ(30px)" }}
        >
          <SectionLabel color="teal" centered>
            Let's Collaborate
          </SectionLabel>

          <h2 className="mt-6 font-['Space_Grotesk'] font-medium text-[clamp(36px,5.5vw,68px)] tracking-[-0.025em] text-[#f5f0e8] leading-[1.05]">
            <FloatingText text="Got a project in mind?" />
          </h2>

          <p className="mt-6 mx-auto max-w-[460px] font-['Space_Grotesk'] text-[18px] leading-[1.55] text-[#8a8a8a]">
            I'm always open to new projects, collaborations, and creative
            conversations.
          </p>

          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ y: 0, scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              onClick={onContact}
              className="wave-trigger group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full font-['Space_Mono'] text-[16px] tracking-[0.12em] uppercase cursor-pointer bg-[#2dd4bf] text-[#0d0d0d] border border-[#2dd4bf] hover:bg-[#2dd4bf]/90 shadow-[0_0_30px_-8px_rgba(45,212,191,0.5)] hover:shadow-[0_0_40px_-4px_rgba(45,212,191,0.7)] transition-colors duration-300 font-bold"
            >
              <WaveText text="Get In Touch" />

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M9 5L16 12L9 19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}