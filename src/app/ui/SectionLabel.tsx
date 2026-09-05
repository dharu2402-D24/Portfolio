import { motion } from "motion/react";

export function SectionLabel({
  children,
  color = "red",
  centered = false,
}: {
  children: React.ReactNode;
  color?: "red" | "teal";
  centered?: boolean;
}) {
  const c = color === "red" ? "#e84545" : "#2dd4bf";
  return (
    <div
      className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px]"
        style={{ background: c }}
      />
      <span
        className="font-['Space_Mono'] text-[12px] tracking-[0.25em] uppercase"
        style={{ color: c }}
      >
        {children}
      </span>
      {centered && (
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px]"
          style={{ background: c }}
        />
      )}
    </div>
  );
}
