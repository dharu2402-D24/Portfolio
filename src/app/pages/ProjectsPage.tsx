import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../effects/Reveal";
import { allProjects } from "../data/data";

const categories = ["All", "UI/UX Design", "Graphic Design", "3D Design", "Logo Redesign", "Redesign"];

export function ProjectsPage({ onOpen }: { onOpen: (id: string) => void }) {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? allProjects
        : allProjects.filter((p) => p.category.toLowerCase() === filter.toLowerCase()),
    [filter]
  );

  return (
    <section className="relative px-6 md:px-14 max-w-[1200px] mx-auto pt-36 pb-24">
      <Reveal>
        <SectionLabel>Portfolio · 2026</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-6 font-['Space_Grotesk'] font-medium text-[clamp(48px,7vw,88px)] tracking-[-0.03em] leading-[1] text-white">
          All <span className="text-[#e84545]">Projects</span>
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-[640px] font-['Space_Grotesk'] text-[19px] leading-[1.55] text-[#8a8a8a]">
          A collection of design and development work spanning product UX, visual identity, and 3D explorations.
        </p>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.15}>
        <div className="mt-12 flex gap-2 p-2 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm w-fit max-w-full overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="relative px-5 py-2.5 font-['Space_Mono'] text-[12px] tracking-[0.15em] uppercase cursor-pointer rounded-full"
              >
                {active && (
                  <motion.div
                    layoutId="filter-bg"
                    className="absolute inset-0 rounded-full bg-[#e84545]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${active ? "text-white" : "text-[#8a8a8a] hover:text-white"}`}>
                  {c}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} index={0} onOpen={"process" in p ? onOpen : undefined} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
