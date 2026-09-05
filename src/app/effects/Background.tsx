import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
  color: string;
  phase: number;
  glow: boolean;
  depth: number;
};

function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "232,69,69",
      "45,212,191",
      "245,240,232",
    ];

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;
    let lastFrame = 0;
    let destroyed = false;

    // Mouse position and smoothed position.
    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = width;
      canvas.height = height;

      const area = width * height;

      const count = Math.min(
        150,
        Math.max(70, Math.floor(area / 11000))
      );

      particles = Array.from(
        { length: count },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,

          size: Math.random() * 2.2 + 0.7,

          alpha: Math.random() * 0.38 + 0.12,

          speedX:
            (Math.random() - 0.5) * 0.16,

          speedY:
            -(Math.random() * 0.16 + 0.025),

          color:
            colors[
            Math.floor(
              Math.random() * colors.length
            )
            ],

          phase:
            Math.random() *
            Math.PI *
            2,

          glow: Math.random() > 0.7,

          // Controls how much each particle reacts to the mouse.
          depth:
            Math.random() * 0.7 + 0.3,
        })
      );
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX =
        (event.clientX / window.innerWidth) * 2 - 1;

      mouseY =
        (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    const draw = (time: number) => {
      if (destroyed) return;

      animationFrame =
        requestAnimationFrame(draw);

      // Keep the effect around 30 FPS.
      if (time - lastFrame < 33) return;

      lastFrame = time;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      // Smooth mouse movement.
      smoothMouseX +=
        (mouseX - smoothMouseX) * 0.05;

      smoothMouseY +=
        (mouseY - smoothMouseY) * 0.05;

      const seconds = time * 0.001;

      for (const particle of particles) {
        particle.x += particle.speedX;

        particle.y +=
          particle.speedY +
          Math.sin(
            seconds * 0.35 +
            particle.phase
          ) *
          0.025;

        // Wrap vertically.
        if (particle.y < -20) {
          particle.y = height + 20;
          particle.x =
            Math.random() * width;
        }

        // Wrap horizontally.
        if (particle.x < -20) {
          particle.x = width + 20;
        } else if (particle.x > width + 20) {
          particle.x = -20;
        }

        /*
         * Subtle mouse parallax.
         * Maximum movement is around 10px.
         */
        const mouseOffsetX =
          smoothMouseX *
          particle.depth *
          10;

        const mouseOffsetY =
          smoothMouseY *
          particle.depth *
          10;

        const renderX =
          particle.x + mouseOffsetX;

        const renderY =
          particle.y + mouseOffsetY;

        // Subtle breathing.
        const pulse =
          0.8 +
          Math.sin(
            seconds * 0.8 +
            particle.phase
          ) *
          0.2;

        const alpha =
          particle.alpha * pulse;

        // Soft glow for some particles.
        if (particle.glow) {
          const radius =
            particle.size * 7;

          const gradient =
            ctx.createRadialGradient(
              renderX,
              renderY,
              0,
              renderX,
              renderY,
              radius
            );

          gradient.addColorStop(
            0,
            `rgba(${particle.color}, ${alpha * 0.55
            })`
          );

          gradient.addColorStop(
            0.35,
            `rgba(${particle.color}, ${alpha * 0.12
            })`
          );

          gradient.addColorStop(
            1,
            `rgba(${particle.color}, 0)`
          );

          ctx.fillStyle = gradient;

          ctx.beginPath();

          ctx.arc(
            renderX,
            renderY,
            radius,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }

        // Main particle.
        ctx.fillStyle =
          `rgba(${particle.color}, ${alpha})`;

        ctx.beginPath();

        ctx.arc(
          renderX,
          renderY,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(
          animationFrame
        );
      } else if (!destroyed) {
        lastFrame =
          performance.now();

        animationFrame =
          requestAnimationFrame(draw);
      }
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    animationFrame =
      requestAnimationFrame(draw);

    return () => {
      destroyed = true;

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function Background() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <AmbientParticles />
    </div>
  );
}