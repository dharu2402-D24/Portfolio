import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Nav } from "./ui/Nav";
import { Background } from "./effects/Background";
import { CustomCursor } from "./ui/CustomCursor";
import { Hero } from "./sections/Hero";
import { FeaturedWork } from "./sections/FeaturedWork";
import { AboutPage } from "./pages/AboutPage";
import { ContactCTA } from "./sections/ContactCTA";
import { Footer } from "./sections/Footer";
import { allProjects, ProjectDetail } from "./data/data";
import { LoadingScreen } from "./LoadingScreen";

const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((module) => ({
    default: module.ProjectsPage,
  }))
);

const ProjectDetailPage = lazy(() =>
  import("./pages/ProjectDetailPage").then((module) => ({
    default: module.ProjectDetailPage,
  }))
);

const ContactModal = lazy(() =>
  import("./ui/ContactModal").then((module) => ({
    default: module.ContactModal,
  }))
);

export type Section = "home" | "projects" | "about" | "contact";
type Route = "main" | "projects" | "detail";

const NAV_OFFSET = 80;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState<Route>("main");
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactLoaded, setContactLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const openContact = () => setContactOpen(true);
  const lenisRef = useRef<any>(null);

  // ── Smooth scroll ──
  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let cancelled = false;
    let rafId = 0;
    let lenis: {
      destroy: () => void;
      raf: (time: number) => void;
    } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) =>
          Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      lenis?.destroy();
      lenisRef.current = null;
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (contactOpen) {
      setContactLoaded(true);
    }
  }, [contactOpen]);

  const project = allProjects.find((p) => p.id === activeId);

  const isDetailed = (p: typeof project): p is ProjectDetail =>
    !!p && "process" in p;

  const scrollTo = (s: Section) => {
    const el =
      s === "home"
        ? homeRef.current
        : s === "projects"
          ? projectsRef.current
          : s === "about"
            ? aboutRef.current
            : contactRef.current;

    if (!el) return;

    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      NAV_OFFSET +
      1;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, { duration: 1.2 });
    } else {
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  const handleNav = (s: Section) => {
    if (route !== "main") {
      setActiveId(null);
      setRoute("main");

      requestAnimationFrame(() =>
        requestAnimationFrame(() => scrollTo(s))
      );
    } else {
      scrollTo(s);
    }
  };

  const handleViewAll = () => {
    setActiveId(null);
    setRoute("projects");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOpen = (id: string) => {
    const p = allProjects.find((x) => x.id === id);

    if (p && "process" in p) {
      setActiveId(id);
      setRoute("detail");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setRoute("projects");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleBack = () => {
    setActiveId(null);
    setRoute("projects");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ── Active section tracking ──
  useEffect(() => {
    if (route !== "main") {
      setActiveSection(
        route === "projects" ? "projects" : "home"
      );
      return;
    }

    const sections = [
      ["home", homeRef],
      ["projects", projectsRef],
      ["about", aboutRef],
      ["contact", contactRef],
    ] as const;

    const ratios: Record<Section, number> = {
      home: 0,
      projects: 0,
      about: 0,
      contact: 0,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.section as Section;
          ratios[id] = entry.intersectionRatio;
        });

        const top = (Object.entries(ratios) as [Section, number][]).reduce(
          (a, b) => (b[1] > a[1] ? b : a)
        )[0];

        setActiveSection((current) => (current === top ? current : top));
      },
      {
        rootMargin: `-${NAV_OFFSET + 20}px 0px -30% 0px`,
        threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
      }
    );

    sections.forEach(([, ref]) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();

  }, [route]);

  return (
    <div
      className={`relative min-h-screen text-white overflow-x-hidden font-['Space_Grotesk'] ${isTouch ? "" : "cursor-none"
        } ${loading ? "h-screen overflow-hidden" : ""}`}
    >
      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen
            onComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────
          GLOBAL BACKGROUND
          ───────────────────────────────────── */}

      <div className="fixed inset-0 z-0 bg-[#0d0d0d]" />

      <Background />

      {/* ─────────────────────────────────────
          ALL WEBSITE CONTENT
          ───────────────────────────────────── */}

      <div className="relative z-10">
        {!isTouch && <CustomCursor />}

        <Nav
          active={activeSection}
          onNavigate={handleNav}
        />

        <main>
          <Suspense fallback={null}>
            <AnimatePresence mode="wait">

              {/* ── Project detail ── */}
              {route === "detail" &&
                isDetailed(project) && (
                  <motion.div
                    key={"detail-" + activeId}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -16,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProjectDetailPage
                      project={project}
                      onBack={handleBack}
                      onOpen={handleOpen}
                    />
                  </motion.div>
                )}

              {/* ── All projects ── */}
              {route === "projects" && (
                <motion.div
                  key="projects"
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -16,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectsPage
                    onOpen={handleOpen}
                  />
                </motion.div>
              )}

              {/* ── Main page ── */}
              {route === "main" && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Home */}
                  <div
                    ref={homeRef}
                    data-section="home"
                  >
                    <Hero
                      onProjects={() =>
                        scrollTo("projects")
                      }
                      onAbout={() =>
                        scrollTo("about")
                      }
                      ready={!loading}
                    />
                  </div>

                  {/* Featured projects */}
                  <div
                    ref={projectsRef}
                    data-section="projects"
                  >
                    <FeaturedWork
                      onViewAll={handleViewAll}
                      onOpen={handleOpen}
                    />
                  </div>

                  {/* About */}
                  <div
                    ref={aboutRef}
                    data-section="about"
                  >
                    <AboutPage
                      onContact={openContact}
                    />
                  </div>

                  {/* Contact */}
                  <div
                    ref={contactRef}
                    data-section="contact"
                  >
                    <ContactCTA
                      onContact={openContact}
                    />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </Suspense>
        </main>

        <Footer onContact={openContact} />
      </div>

      {/* Contact modal */}
      {contactLoaded && (
        <Suspense fallback={null}>
          <ContactModal
            open={contactOpen}
            onClose={() =>
              setContactOpen(false)
            }
          />
        </Suspense>
      )}
    </div>
  );
}