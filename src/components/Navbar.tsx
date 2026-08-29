import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as "dark" | "light") || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handler);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 px-4"
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 rounded-full glass-panel px-5 py-2.5 transition-all duration-500 ${
            scrolled ? "max-w-3xl shadow-[0_8px_40px_-12px_hsl(var(--glow-cyan)/0.25)]" : "max-w-4xl"
          }`}
        >
          {/* Logo */}
          <a href="#" className="relative group flex items-center gap-2 select-none">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative flex items-center justify-center w-8 h-8 rounded-xl font-mono-code font-bold text-sm text-white overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(var(--glow-cyan)), hsl(var(--glow-violet)))" }}
            >
              M
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.span>
            <span className="font-mono-code font-bold text-lg tracking-tight text-foreground">
              H<span className="text-gradient-cyan-violet">.</span>
            </span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: "hsl(var(--glow-cyan))" }} />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-sm px-3.5 py-2 rounded-full transition-colors duration-300 ${
                  activeSection === l.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeSection === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "hsl(var(--glow-cyan) / 0.12)",
                      border: "1px solid hsl(var(--glow-cyan) / 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              whileTap={{ scale: 0.85, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                  className="block"
                >
                  {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`fixed top-20 left-4 right-4 z-40 glass-panel rounded-3xl p-4 md:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm py-3 px-4 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
