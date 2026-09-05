import { useEffect, useRef, useState } from "react";

export function CustomCursor({
  modalOpen = false,
}: {
  modalOpen?: boolean;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const target = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const dot = {
      x: target.x,
      y: target.y,
    };

    let raf = 0;
    let isHidden = true;
    let isMoving = false;
    let moveTimeout: ReturnType<typeof setTimeout>;
    let lastEl: Element | null = null;
    let lastHoverCheck = 0;

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (isHidden) {
        isHidden = false;
        setHidden(false);
      }

      if (!isMoving) {
        isMoving = true;
        raf = requestAnimationFrame(tick);
      }

      clearTimeout(moveTimeout);

      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);

      const now = performance.now();

      if (now - lastHoverCheck >= 50) {
        lastHoverCheck = now;

        const el = document.elementFromPoint(
          e.clientX,
          e.clientY
        );

        if (el !== lastEl) {
          lastEl = el;

          const interactive = el?.closest(
            "button, a, [role='button'], input, textarea, select, label[for], [data-cursor='hover']"
          );

          setIsHovering(!!interactive);
        }
      }
    };

    const leave = () => {
      isHidden = true;
      setHidden(true);
      setIsHovering(false);
      lastEl = null;
    };

    const enter = () => {
      isHidden = false;
      setHidden(false);
    };

    const tick = () => {
      const dx = target.x - dot.x;
      const dy = target.y - dot.y;

      dot.x += dx * 0.35;
      dot.y += dy * 0.35;

      const v = Math.sqrt(dx * dx + dy * dy);
      const angle =
        Math.atan2(dy, dx) * (180 / Math.PI);

      const scaleX = Math.min(
        2.0,
        1 + v * 0.015
      );

      const scaleY = Math.max(
        0.6,
        1 - v * 0.01
      );

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${dot.x}px, ${dot.y}px, 0) ` +
          `translate(-50%, -50%) ` +
          `rotate(${angle}deg) ` +
          `scale(${scaleX}, ${scaleY})`;
      }

      const diff =
        Math.abs(dx) + Math.abs(dy);

      if (!isMoving && diff < 0.1) {
        if (dotRef.current) {
          dotRef.current.style.transform =
            `translate3d(${target.x}px, ${target.y}px, 0) ` +
            `translate(-50%, -50%) ` +
            `rotate(0deg) ` +
            `scale(1, 1)`;
        }
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener(
      "mousemove",
      move,
      { passive: true }
    );

    document.addEventListener(
      "mouseleave",
      leave
    );

    document.addEventListener(
      "mouseenter",
      enter
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );

      document.removeEventListener(
        "mouseleave",
        leave
      );

      document.removeEventListener(
        "mouseenter",
        enter
      );

      clearTimeout(moveTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 rounded-full will-change-transform ${
        modalOpen
          ? "z-[9999]"
          : "z-[50]"
      }`}
      style={{
        width: isHovering ? 10 : 28,
        height: isHovering ? 10 : 28,
        opacity: hidden ? 0 : 1,
        background: "#ffffff",
        mixBlendMode: "difference",
        transition:
          "width 0.35s cubic-bezier(0.22, 1, 0.36, 1), height 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
      }}
    />
  );
}