import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { X, Mail, Send, Check, Copy } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const EMAIL = "dharu2402@gmail.com";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
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
      setSent(false);
      setCopied(false);
    }
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => {
      onClose();
      setName("");
      setEmail("");
      setMessage("");
    }, 1600);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
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
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[640px] rounded-2xl border border-white/[0.08] bg-[#0d0d0d] overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#e84545]/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#2dd4bf]/10 blur-[100px]" />

            <button
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
                Have a project in mind, or just want to say hi? Drop a message — I usually reply within a day.
              </p>

              {/* Email pill */}
              <button
                type="button"
                onClick={copyEmail}
                className="mt-6 group flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/10 hover:border-[#2dd4bf]/50 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#2dd4bf]" />
                <span className="font-['Space_Mono'] text-[13px] tracking-[0.08em] text-white">{EMAIL}</span>
                <span className="ml-1 flex items-center gap-1 font-['Space_Mono'] text-[11px] tracking-[0.18em] uppercase text-[#8a8a8a] group-hover:text-[#2dd4bf] transition-colors">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>

              <form onSubmit={submit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name" value={name} onChange={setName} placeholder="Your Name" />
                <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="hello@example.com" />
                <div className="sm:col-span-2">
                  <Field
                    label="Message"
                    value={message}
                    onChange={setMessage}
                    placeholder="Your message"
                    multiline
                  />
                </div>

                <div className="sm:col-span-2 mt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={sent}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e84545] text-white font-['Space_Mono'] text-[12px] tracking-[0.18em] uppercase cursor-pointer transition-all hover:bg-[#ff5555] disabled:opacity-70"
                  >
                    {sent ? (
                      <>
                        <Check className="w-4 h-4" />
                        Sent
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                  <p className="font-['Space_Mono'] text-[11px] tracking-[0.18em] uppercase text-[#616161]">
                    Or press Esc to close
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-['Space_Grotesk'] text-[14px] text-[#8a8a8a]">{label}</span>
      {multiline ? (
        <textarea
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="mt-2 w-full rounded-xl bg-[#1a1a1a] border border-[#3a3a3a] focus:border-[#e84545] outline-none px-5 py-4 font-['Space_Grotesk'] text-[15px] text-white placeholder:text-[#616161] transition-colors resize-none"
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full rounded-xl bg-[#1a1a1a] border border-[#3a3a3a] focus:border-[#e84545] outline-none px-5 py-3 font-['Space_Grotesk'] text-[15px] text-white placeholder:text-[#616161] transition-colors"
        />
      )}
    </label>
  );
}
