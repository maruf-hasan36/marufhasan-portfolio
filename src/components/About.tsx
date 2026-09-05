import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Download, FileText } from "lucide-react";
import marufTshirt from "@/assets/maruf-tshirt.png.asset.json";
import resumeAsset from "@/assets/maruf-resume.pdf.asset.json";

type Skill = { label: string; icon?: string; color?: string };
const icon = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

const coreStack: Skill[] = [
  { label: "JavaScript (ES6+)", icon: icon("javascript") },
  { label: "TypeScript", icon: icon("typescript") },
  { label: "HTML5", icon: icon("html5") },
  { label: "CSS3", icon: icon("css3") },
  { label: "Tailwind CSS", icon: icon("tailwindcss") },
  { label: "React.js", icon: icon("react") },
  { label: "Next.js", icon: icon("nextdotjs", "999999") },
  { label: "Node.js", icon: icon("nodedotjs") },
  { label: "Express.js", icon: icon("express", "999999") },
  { label: "REST API", icon: icon("openapiinitiative") },
  { label: "MongoDB", icon: icon("mongodb") },
  { label: "MongoDB Atlas", icon: icon("mongodb") },
  { label: "MySQL", icon: icon("mysql") },
  { label: "PostgreSQL", icon: icon("postgresql") },
  { label: "Prisma", icon: icon("prisma") },
  { label: "JWT", icon: icon("jsonwebtokens") },
  { label: "Better Auth", icon: icon("auth0") },
  { label: "DaisyUI", icon: icon("daisyui") },
  { label: "Hero UI" },
  { label: "Responsive Design", icon: icon("googlechrome") },
  { label: "Git & GitHub", icon: icon("git") },
];

const tools: Skill[] = [
  { label: "VS Code", icon: icon("visualstudiocode") },
  { label: "Figma", icon: icon("figma") },
  { label: "Vercel", icon: icon("vercel", "999999") },
  { label: "Netlify", icon: icon("netlify") },
  { label: "Stripe", icon: icon("stripe") },
];

const certifications = [
  "Complete Web Development Course — Programming Hero",
  "Diploma in Computer Science & Technology (ongoing)",
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const imgRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-120, 120], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-120, 120], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  // Mobile browsers ignore the `download` attribute on cross-origin/CDN URLs,
  // so fetch the PDF as a blob and trigger the download manually.
  const handleResumeDownload = async () => {
    try {
      const res = await fetch(resumeAsset.url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "Maruf-Hasan-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
    } catch {
      window.open(resumeAsset.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ---------- LEFT: About Me card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.12), transparent 70%)" }} />

            <div className="relative">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-glow-cyan" />
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">About Me</p>
                <div className="flex-1 h-px border-t border-dashed border-border" />
              </div>

              {/* Avatar with 3D tilt + orbit ring */}
              <div className="flex justify-center mb-10">
                <motion.div
                  ref={imgRef}
                  onMouseMove={handleMouse}
                  onMouseLeave={handleLeave}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -inset-4 rounded-full"
                    style={{ background: "conic-gradient(from 0deg, hsl(186 100% 50% / 0.5), hsl(270 100% 57% / 0.5), transparent, hsl(186 100% 50% / 0.5))", filter: "blur(14px)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative w-32 h-32 rounded-full p-[2px]"
                    style={{ background: "linear-gradient(135deg, hsl(186 100% 50%), hsl(270 100% 57%))", transform: "translateZ(30px)" }}>
                    <img
                      src={marufPhoto}
                      alt="Maruf Hasan — MERN Stack Developer"
                      className="w-full h-full rounded-full object-cover object-top bg-background"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-[hsl(var(--text-secondary))]">
                <p>
                  Hi 👋, I'm a passionate <span className="text-foreground font-medium">MERN Stack Developer</span> focused on
                  building modern, scalable, and user-friendly web applications.
                </p>
                <p>
                  I work daily with MongoDB, Express.js, React and Node.js, and I'm highly comfortable with
                  Next.js for fast, SEO-friendly full-stack apps.
                </p>
                <p>
                  I enjoy turning ideas into real-world digital solutions through clean, efficient code — from
                  REST APIs and authentication systems to polished, responsive interfaces.
                </p>
                <p>
                  My goal is to keep growing into a professional full-stack developer, contributing to impactful
                  products and delivering high-quality solutions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2.5">
                  <MapPin className="w-4 h-4 text-glow-cyan" />
                  <span className="font-mono text-xs text-foreground/90">Dhaka, Bangladesh</span>
                </div>
                <motion.button
                  type="button"
                  onClick={handleResumeDownload}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground transition-shadow duration-300 hover:shadow-[0_0_40px_-6px_hsl(var(--glow-cyan)/0.6)]"
                >
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download Resume
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ---------- RIGHT: Skills card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(270 100% 57% / 0.14), transparent 70%)" }} />

            <div className="relative">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-glow-violet" />
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">Skills</p>
                <div className="flex-1 h-px border-t border-dashed border-border" />
              </div>

              <p className="text-xs font-semibold tracking-wider text-foreground mb-4">CORE STACK</p>
              <div className="flex flex-wrap gap-2.5">
                {coreStack.map((s, i) => (
                  <motion.span
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.25 + i * 0.04, type: "spring", stiffness: 320, damping: 20 }}
                    whileHover={{ y: -3, borderColor: "hsl(186 100% 50% / 0.6)" }}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/30 px-4 py-2 font-mono text-xs text-foreground/90 cursor-default"
                  >
                    {s.icon && <img src={s.icon} alt="" aria-hidden loading="lazy" className="w-3.5 h-3.5 object-contain" />}
                    {s.label}
                  </motion.span>
                ))}
              </div>

              <p className="text-xs font-semibold tracking-wider text-foreground mt-8 mb-4">TOOLS &amp; PLATFORMS</p>
              <div className="flex flex-wrap gap-2.5">
                {tools.map((s, i) => (
                  <motion.span
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 320, damping: 20 }}
                    whileHover={{ y: -3, borderColor: "hsl(270 100% 57% / 0.6)" }}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/30 px-4 py-2 font-mono text-xs text-foreground/90 cursor-default"
                  >
                    {s.icon && <img src={s.icon} alt="" aria-hidden loading="lazy" className="w-3.5 h-3.5 object-contain" />}
                    {s.label}
                  </motion.span>
                ))}
              </div>

              <p className="text-sm font-semibold text-foreground mt-10 mb-4">Certifications</p>
              <div className="space-y-3">
                {certifications.map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    className="glass-panel-hover rounded-xl px-4 py-4 flex items-center gap-3"
                  >
                    <FileText className="w-4 h-4 text-glow-cyan shrink-0" />
                    <p className="text-sm text-foreground/90">{c}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
