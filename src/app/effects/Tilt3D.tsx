import { ReactNode, useEffect, useRef } from "react";

export function Tilt3D({
  children,
  max = 8,
  className = "",
  glare = true,
  enabled = true,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  glare?: boolean;
  enabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;

    if (!enabled || !el || !inner) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glareEl = glare ? glareRef.current : null;

    const target = {
      rx: 0,
      ry: 0,
      gx: 50,
      gy: 50,
      lift: 0,
    };

    const cur = {
      rx: 0,
      ry: 0,
      gx: 50,
      gy: 50,
      lift: 0,
    };

    let raf = 0;
    let isActive = false;
    let isMouseInside = false;

    const tick = () => {
      const easing = 0.14;

      cur.rx += (target.rx - cur.rx) * easing;
      cur.ry += (target.ry - cur.ry) * easing;
      cur.gx += (target.gx - cur.gx) * easing;
      cur.gy += (target.gy - cur.gy) * easing;
      cur.lift += (target.lift - cur.lift) * easing;

      el.style.transform = `perspective(1100px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) translateZ(0)`;
      el.style.boxShadow = `${-cur.ry * 1.6}px ${cur.rx * 1.6 + 18
        }px ${40 + cur.lift * 30}px -10px rgba(0,0,0,${0.35 + cur.lift * 0.25
        })`;

      inner.style.transform = `translate3d(${cur.ry * 0.6}px, ${-cur.rx * 0.6
        }px, 0)`;

      // Only calculate/update the glare when it is actually enabled.
      if (glareEl) {
        glareEl.style.background = `radial-gradient(circle at ${cur.gx
          }% ${cur.gy}%, rgba(255,255,255,${0.12 * cur.lift
          }) 0%, rgba(255,255,255,0) 55%)`;
      }

      const diff =
        Math.abs(target.rx - cur.rx) +
        Math.abs(target.ry - cur.ry) +
        Math.abs(target.lift - cur.lift);

      if (!isMouseInside && diff < 0.05) {
        isActive = false;

        // Snap to exact resting values to avoid sub-pixel jitter.
        cur.rx = 0;
        cur.ry = 0;
        cur.lift = 0;

        el.style.transform =
          "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)";
        el.style.boxShadow = "0px 18px 40px -10px rgba(0,0,0,0.35)";
        inner.style.transform = "translate3d(0px, 0px, 0)";

        if (glareEl) {
          glareEl.style.background = "none";
        }

        return;
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      isMouseInside = true;

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      target.ry = (px - 0.5) * 2 * max;
      target.rx = -(py - 0.5) * 2 * max;
      target.lift = 1;

      if (glareEl) {
        target.gx = px * 100;
        target.gy = py * 100;
      }

      if (!isActive) {
        isActive = true;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      isMouseInside = false;
      target.rx = 0;
      target.ry = 0;
      target.lift = 0;

      if (glareEl) {
        target.gx = 50;
        target.gy = 50;
      }
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled, max, glare]);

  return (
    <div
      ref={ref}
      className={`relative will-change-transform ${className}`}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div
        ref={innerRef}
        className="will-change-transform"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>

      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
    </div>
  );
}
