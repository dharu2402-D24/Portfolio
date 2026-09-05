import { motion, useSpring } from "motion/react";
import { useRef, useCallback, useMemo, useEffect } from "react";
import type { MouseEvent } from "react";

export function JengaText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const chars = useMemo(() => text.split(""), [text]);

  // Store spring setters for each character so we can trigger cascades.
  const springsRef = useRef<Map<number, (angle: number) => void>>(new Map());
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const triggerCascade = useCallback(
    (fromIndex: number, direction: 1 | -1) => {
      const maxAngle = 18;
      const totalChars = chars.length;

      for (let i = 0; i < totalChars; i++) {
        if (chars[i] === " ") continue;

        const distance = Math.abs(i - fromIndex);
        const decay = Math.max(0, 1 - distance * 0.15);
        if (decay <= 0) continue;

        const angle = maxAngle * decay * direction;
        const staggerDelay = distance * 50;

        const existingTimer = timersRef.current.get(i);
        if (existingTimer) clearTimeout(existingTimer);

        const toppleTimer = setTimeout(() => {
          springsRef.current.get(i)?.(angle);

          const resetTimer = setTimeout(() => {
            springsRef.current.get(i)?.(0);
            timersRef.current.delete(i);
          }, 600 + distance * 80);

          timersRef.current.set(i, resetTimer);
        }, staggerDelay);

        timersRef.current.set(i, toppleTimer);
      }
    },
    [chars]
  );

  const registerSpring = useCallback(
    (index: number, setter: (angle: number) => void) => {
      springsRef.current.set(index, setter);
    },
    []
  );

  // Prevent delayed cascade timers from surviving after the component unmounts.
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
      springsRef.current.clear();
    };
  }, []);

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.03, delayChildren: delay },
        },
        hidden: {},
      }}
    >
      {chars.map((char, index) => (
        <JengaChar
          key={index}
          char={char}
          index={index}
          registerSpring={registerSpring}
          triggerCascade={triggerCascade}
        />
      ))}
    </motion.span>
  );
}

function JengaChar({
  char,
  index,
  registerSpring,
  triggerCascade,
}: {
  char: string;
  index: number;
  registerSpring: (index: number, setter: (angle: number) => void) => void;
  triggerCascade: (fromIndex: number, direction: 1 | -1) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rotate = useSpring(0, {
    stiffness: 200,
    damping: 14,
    mass: 0.25,
  });

  useEffect(() => {
    registerSpring(index, (angle: number) => rotate.set(angle));
  }, [index, registerSpring, rotate]);

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      if (char === " " || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const direction: 1 | -1 = e.clientX < centerX ? 1 : -1;

      triggerCascade(index, direction);
    },
    [char, index, triggerCascade]
  );

  if (char === " ") {
    return (
      <motion.span
        className="inline"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        {"\u00A0"}
      </motion.span>
    );
  }

  return (
    <motion.span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      style={{
        rotate,
        transformOrigin: "bottom center",
        display: "inline-block",
        cursor: "default",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
        willChange: "transform",
        padding: "0 0.5px",
      }}
      variants={{
        hidden: { opacity: 0, y: 8, filter: "blur(2px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {char}
    </motion.span>
  );
}
