import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../effects/Reveal";
import { ProjectDetail, allProjects } from "../data/data";

export function ProjectDetailPage({
  project,
  onBack,
  onOpen,
}: {
  project: ProjectDetail;
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  const [imageIdx, setImageIdx] = useState(0);

  // Build the images array: prefer project.images, else fall back to hero/image
  const imageList: string[] = project.images
    ? project.images
    : project.hero
    ? [project.hero]
    : project.image
    ? [project.image]
    : [];
  const hasImages = imageList.length > 0;
  const hasMultiple = imageList.length > 1;
  const heroImage = imageList[imageIdx] ?? "";

  // Next project cycles through ALL openable projects (featured + more)
  const openable = (allProjects as ProjectDetail[]).filter((p) => "process" in p || "video" in p);
  const idx = openable.findIndex((p) => p.id === project.id);
  const next = idx === -1 ? openable[0] : openable[(idx + 1) % openable.length];

  return (
    <section className="relative pt-36 pb-24 px-6 md:px-14 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" icon="left" onClick={onBack}>
            Back to Projects
          </Button>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#2dd4bf]/40 bg-[#2dd4bf]/10 font-['Space_Mono'] text-[11px] tracking-[0.18em] uppercase text-[#2dd4bf] hover:bg-[#2dd4bf]/20 hover:border-[#2dd4bf]/60 transition-all duration-300"
            >
              Visit Project
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full border border-[#e84545]/30 bg-[#e84545]/10 font-['Space_Mono'] text-[11px] tracking-[0.18em] uppercase text-[#e84545]">
            {project.category}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-5 font-['Space_Grotesk'] font-medium text-[clamp(44px,7vw,88px)] tracking-[-0.03em] leading-[1] text-white uppercase">
          {project.title}
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-6 max-w-[820px] font-['Space_Grotesk'] text-[clamp(18px,1.6vw,22px)] leading-[1.55] text-[#a0a0a0]">
          {project.description}
        </p>
      </Reveal>

      {/* Hero image (with optional carousel) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 relative"
      >
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#111111] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <AnimatePresence mode="wait">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-auto block"
              />
            ) : hasImages ? (
              <motion.img
                key={imageIdx}
                src={heroImage}
                alt={`${project.title} ${imageIdx + 1}`}
                width={1200}
                height={900}
                loading="eager"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-auto block"
              />
            ) : null}
          </AnimatePresence>

          {/* Prev / Next arrows */}
          {hasMultiple && (
            <>
              <button
                onClick={() => setImageIdx((i) => (i - 1 + imageList.length) % imageList.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200 cursor-pointer"
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => setImageIdx((i) => (i + 1) % imageList.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200 cursor-pointer"
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {hasMultiple && (
          <div className="flex justify-center gap-2 mt-4">
            {imageList.map((_, i) => (
              <button
                key={i}
                onClick={() => setImageIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === imageIdx ? "bg-[#e84545] w-4" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Role */}
      {project.role && (
        <Reveal delay={0.1}>
        <div className="mt-20 flex items-start gap-4">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-[3px] bg-[#e84545]"
          />

          <div>
            <p className="font-['Space_Mono'] text-[12px] tracking-[0.22em] uppercase text-[#8a8a8a]">
              Role / Contribution
            </p>

            <p className="mt-2 font-['Space_Grotesk'] text-[clamp(24px,3vw,34px)] tracking-[-0.01em] text-[#f5f0e8]">
              {project.role}
            </p>
          </div>
        </div>
      </Reveal>
      )}

      {/* Process */}
      {project.process && project.process.length > 0 && (
        <div className="mt-24">
          <Reveal>
          <SectionLabel>Design Process</SectionLabel>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-xl border border-white/[0.08] bg-[#141414] p-6 overflow-hidden transition-colors hover:border-[#2dd4bf]/40"
            >
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)",
                }}
              />

              <div className="relative flex items-start justify-between">
                <p className="font-['Space_Grotesk'] font-medium text-[20px] text-[#f5f0e8]">
                  {p.step}
                </p>

                <span className="font-['Space_Mono'] text-[28px] text-[#2dd4bf] leading-none">
                  0{i + 1}
                </span>
              </div>

              <div className="relative mt-3 h-[2px] w-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1 + 0.3,
                  }}
                  className="absolute inset-0 bg-[#2dd4bf] origin-left"
                />
              </div>

              <p className="relative mt-4 font-['Space_Grotesk'] text-[15px] leading-[1.55] text-[#8a8a8a]">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      )}

      {/* Next project */}
      <Reveal>
        <div className="mt-32 pt-16 border-t border-white/[0.06]">
          <p className="font-['Space_Mono'] text-[12px] tracking-[0.22em] uppercase text-[#8a8a8a]">
            Next Project
          </p>

          <button
            onClick={() => onOpen(next.id)}
            className="group mt-4 flex items-center justify-between w-full text-left cursor-pointer"
          >
            <h3 className="font-['Space_Grotesk'] font-medium text-[clamp(36px,5vw,64px)] tracking-[-0.025em] text-white group-hover:text-[#e84545] transition-colors duration-500">
              {next.title}
            </h3>

            <span className="text-[#e84545] font-['Space_Mono'] text-[14px] tracking-[0.18em] uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
              Open →
            </span>
          </button>
        </div>
      </Reveal>
    </section>
  );
}