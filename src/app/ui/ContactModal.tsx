import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { X, Mail, Check, Copy } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const EMAIL = "dharu2402@gmail.com";

const GMAIL_URL =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`;

const YAHOO_URL =
  `https://compose.mail.yahoo.com/?to=${encodeURIComponent(EMAIL)}`;

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      // Ignore clipboard errors.
    }
  };

  const openGmail = () => {
    window.open(GMAIL_URL, "_blank", "noopener,noreferrer");
  };

  const openYahoo = () => {
    window.open(YAHOO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-[640px] rounded-2xl border border-white/[0.08] bg-[#0d0d0d] overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#e84545]/15 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#2dd4bf]/10 blur-[100px]" />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full border border-white/10 hover:border-[#e84545]/60 hover:bg-[#e84545]/10 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="relative p-8 md:p-10">
              <SectionLabel>Contact</SectionLabel>

              <h2 className="mt-4 font-['Space_Grotesk'] font-medium text-[clamp(34px,4.5vw,48px)] tracking-[-0.025em] leading-[1.05] text-white">
                Get In Touch
              </h2>

              <p className="mt-3 font-['Space_Grotesk'] text-[16px] leading-[1.55] text-[#8a8a8a] max-w-[440px]">
                Have a project in mind, or just want to say hi? Choose your
                preferred email service and send me a message.
              </p>

              {/* Email */}
              <button
                type="button"
                onClick={copyEmail}
                className="mt-6 group flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/10 hover:border-[#2dd4bf]/50 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#2dd4bf]" />

                <span className="font-['Space_Mono'] text-[13px] tracking-[0.08em] text-white">
                  {EMAIL}
                </span>

                <span className="ml-1 flex items-center gap-1 font-['Space_Mono'] text-[11px] tracking-[0.18em] uppercase text-[#8a8a8a] group-hover:text-[#2dd4bf] transition-colors">
                  {copied ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}

                  {copied ? "Copied" : "Copy"}
                </span>
              </button>

              {/* Email services */}
              <div className="mt-8">
                <p className="font-['Space_Mono'] text-[11px] tracking-[0.18em] uppercase text-[#616161] mb-4">
                  Choose your email service
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Gmail */}
                  <button
                    type="button"
                    onClick={openGmail}
                    className="group relative flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-[#1a1a1a] border border-white/[0.08] hover:border-[#e84545]/60 hover:bg-[#1d1d1d] transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>

                      <div className="text-left">
                        <p className="font-['Space_Grotesk'] text-[15px] text-white">
                          Gmail
                        </p>

                        <p className="font-['Space_Mono'] text-[10px] tracking-[0.12em] uppercase text-[#616161]">
                          Open composer
                        </p>
                      </div>
                    </div>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4 text-[#616161] transition-all duration-300 group-hover:text-[#e84545] group-hover:translate-x-0.5"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Yahoo */}
                  <button
                    type="button"
                    onClick={openYahoo}
                    className="group relative flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-[#1a1a1a] border border-white/[0.08] hover:border-[#2dd4bf]/60 hover:bg-[#1d1d1d] transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>

                      <div className="text-left">
                        <p className="font-['Space_Grotesk'] text-[15px] text-white">
                          Yahoo Mail
                        </p>

                        <p className="font-['Space_Mono'] text-[10px] tracking-[0.12em] uppercase text-[#616161]">
                          Open composer
                        </p>
                      </div>
                    </div>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4 text-[#616161] transition-all duration-300 group-hover:text-[#2dd4bf] group-hover:translate-x-0.5"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom hint */}
              <div className="mt-7 pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <p className="font-['Space_Mono'] text-[10px] tracking-[0.16em] uppercase text-[#616161]">
                  Email me directly
                </p>

                <p className="font-['Space_Mono'] text-[10px] tracking-[0.16em] uppercase text-[#616161]">
                  Press Esc to close
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}