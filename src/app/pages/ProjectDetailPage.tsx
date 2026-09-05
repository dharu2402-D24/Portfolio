import { motion } from "motion/react";
import { Button } from "../ui/Button";
import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../effects/Reveal";
import { ProjectDetail, featured } from "../data/data";

export function ProjectDetailPage({
  project,
  onBack,
  onOpen,
}: {
  project: ProjectDetail;
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  const idx = featured.findIndex((p) => p.id === project.id);
  const next = idx === -1 ? featured[0] : featured[(idx + 1) % featured.length];

  const heroImage = project.hero ?? project.image;
  const hasHeroImage = Boolean(heroImage);

  return (
    <section className="relative pt-36 pb-24 px-6 md:px-14 max-w-[1200px] mx-auto">
      <Reveal>
        <Button variant="outline" icon="left" onClick={onBack}>
          Back to Projects
        </Button>
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

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-12 aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#111111] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        {hasHeroImage && (
          <img
            src={heroImage}
            alt={project.title}
            width={1200}
            height={675}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Role */}
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

      {/* Process */}
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