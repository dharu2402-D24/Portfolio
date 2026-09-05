import { motion } from "motion/react";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "filled";

/* Custom 2-line chevron arrows */
function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Button({
  children,
  onClick,
  variant = "outline",
  icon = "right",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  icon?: "right" | "left" | "none";
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    primary:
      "border border-[#e84545] text-[#e84545] hover:bg-[#e84545] hover:text-white",
    outline:
      "border border-white/30 text-white hover:bg-white hover:text-[#0d0d0d] hover:border-white",
    filled:
      "bg-[#2dd4bf] text-[#0d0d0d] border border-[#2dd4bf] hover:bg-[#2dd4bf]/90 shadow-[0_0_30px_-8px_rgba(45,212,191,0.6)] hover:shadow-[0_0_40px_-4px_rgba(45,212,191,0.8)]",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full font-['Space_Mono'] text-[13px] tracking-[0.12em] uppercase cursor-pointer transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {icon === "left" && (
        <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
      )}
      <span>{children}</span>
      {icon === "right" && (
        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </motion.button>
  );
}
