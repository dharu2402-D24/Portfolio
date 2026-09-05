import { ProjectCard } from "../ui/ProjectCard";
import { SectionLabel } from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import { Reveal } from "../effects/Reveal";
import { featured } from "../data/data";

export function FeaturedWork({
  onViewAll,
  onOpen,
}: {
  onViewAll: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <section className="relative px-6 md:px-14 max-w-[1200px] mx-auto pt-24 pb-24">
      <Reveal>
        <SectionLabel>Selected Work</SectionLabel>
      </Reveal>
      <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
        <Reveal delay={0.05}>
          <h2 className="font-['Space_Grotesk'] font-medium text-[clamp(36px,5vw,56px)] tracking-[-0.025em] text-white leading-[1.05]">
            Featured Projects
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Button variant="outline" onClick={onViewAll}>
            View All
          </Button>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
