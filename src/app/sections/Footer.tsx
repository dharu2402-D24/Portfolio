import { motion } from "motion/react";

/* ── Authentic SVG Icons ── */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const socials = [
  {
    Icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/dharohar-mehta-68a22a325/",
    label: "LinkedIn",
  },
  {
    Icon: GitHubIcon,
    href: "https://github.com/dharu2402-D24",
    label: "GitHub",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer({ onContact }: { onContact?: () => void }) {
  return (
    <footer className="relative border-t border-white/[0.06] mt-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-14 pt-16 pb-10">
        {/* ── Top Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <p className="font-['Space_Grotesk'] font-medium text-[22px] text-white tracking-[-0.02em]">
              <span className="text-[#e84545]">Dharohar</span> <span className="text-[#2dd4bf]">Mehta</span>
            </p>
            <p className="mt-3 font-['Space_Grotesk'] text-[15px] leading-[1.6] text-[#8a8a8a] max-w-[320px]">
              Visual Designer & Developer crafting interactive digital experiences across 3D, motion, and product design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <p className="font-['Space_Mono'] text-[11px] tracking-[0.25em] uppercase text-[#555] mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-['Space_Grotesk'] text-[15px] text-[#8a8a8a] hover:text-[#e84545] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-1">
            <p className="font-['Space_Mono'] text-[11px] tracking-[0.25em] uppercase text-[#555] mb-5">
              Connect
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-[#8a8a8a] hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30 hover:bg-[#2dd4bf]/[0.06] transition-all duration-300"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </motion.a>
              ))}
              <motion.button
                type="button"
                onClick={onContact}
                aria-label="Email"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-[#8a8a8a] hover:text-[#e84545] hover:border-[#e84545]/30 hover:bg-[#e84545]/[0.06] transition-all duration-300 cursor-pointer"
              >
                <MailIcon className="w-[18px] h-[18px]" />
              </motion.button>
            </div>
            <p className="mt-5 font-['Space_Grotesk'] text-[14px] text-[#2dd4bf]/80">
              dharu2402@gmail.com
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-14 mb-6 h-px w-full bg-white/[0.06]" />

        {/* ── Bottom Row ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Space_Mono'] text-[12px] text-[#555]">
            © {new Date().getFullYear()} Dharohar Mehta · All rights reserved
          </p>
          <p className="font-['Space_Mono'] text-[12px] text-[#555]">
            Designed in <span className="text-[#e84545]">Figma</span> · Built with <span className="text-[#2dd4bf]">React</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
