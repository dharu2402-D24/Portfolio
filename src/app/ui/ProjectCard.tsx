import { motion } from "motion/react";
import { Tilt3D } from "../effects/Tilt3D";

export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
};

export function ProjectCard({
  project,
  index = 0,
  onOpen,
}: {
  project: Project;
  index?: number;
  onOpen?: (id: string) => void;
}) {
  const isOpenable = Boolean(onOpen);
  const hasImage = Boolean(project.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      <Tilt3D
        max={7}
        glare={false}
        enabled={isOpenable}
        className="rounded-2xl"
      >
        <button
          type="button"
          disabled={!isOpenable}
          onClick={() => onOpen?.(project.id)}
          className={`group relative block w-full text-left rounded-2xl overflow-hidden bg-[#141414] border border-white/[0.06] transition-colors ${isOpenable
              ? "cursor-pointer hover:border-white/20"
              : "cursor-default"
            }`}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
            {hasImage && (
              <img
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                loading="lazy"
                className={`w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpenable ? "group-hover:scale-110" : ""
                  }`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                }}
              />
            )}

            {hasImage && (
              <div
                className={`absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60 transition-opacity duration-500 ${isOpenable ? "group-hover:opacity-40" : ""
                  }`}
              />
            )}
          </div>

          {/* Body */}
          <div className="relative p-6 border-t border-white/[0.06]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-['Space_Mono'] text-[11px] tracking-[0.18em] uppercase text-[#e84545] mb-2">
                  {project.category}
                </p>

                <h3 className="font-['Space_Grotesk'] font-medium text-[22px] text-white tracking-[-0.01em] truncate">
                  {project.title}
                </h3>
              </div>

              {isOpenable && (
                <div className="shrink-0 w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center transition-all duration-300 ease-out group-hover:bg-[#e84545] group-hover:border-[#e84545] transform-gpu">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-[16px] h-[16px] text-white transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M5 12H19M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </button>
      </Tilt3D>
    </motion.div>
  );
}