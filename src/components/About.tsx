import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Download, FileText } from "lucide-react";
import marufTshirt from "@/assets/maruf-tshirt.jpg";
import resumeAsset from "@/assets/maruf-resume.pdf.asset.json";
import javascriptIcon from "@/assets/skill-icons/javascript.svg";
import typescriptIcon from "@/assets/skill-icons/typescript.svg";
import htmlIcon from "@/assets/skill-icons/html5.svg";
import cssIcon from "@/assets/skill-icons/css3.svg";
import tailwindIcon from "@/assets/skill-icons/tailwindcss.svg";
import reactIcon from "@/assets/skill-icons/react.svg";
import nextIcon from "@/assets/skill-icons/nextdotjs.svg";
import nodeIcon from "@/assets/skill-icons/nodedotjs.svg";
import expressIcon from "@/assets/skill-icons/express.svg";
import apiIcon from "@/assets/skill-icons/openapiinitiative.svg";
import mongoIcon from "@/assets/skill-icons/mongodb.svg";
import mysqlIcon from "@/assets/skill-icons/mysql.svg";
import postgresIcon from "@/assets/skill-icons/postgresql.svg";
import prismaIcon from "@/assets/skill-icons/prisma.svg";
import jwtIcon from "@/assets/skill-icons/jsonwebtokens.svg";
import authIcon from "@/assets/skill-icons/auth0.svg";
import daisyIcon from "@/assets/skill-icons/daisyui.svg";
import heroIcon from "@/assets/skill-icons/heroui.svg";
import responsiveIcon from "@/assets/skill-icons/googlechrome.svg";
import gitIcon from "@/assets/skill-icons/git.svg";
import vscodeIcon from "@/assets/skill-icons/vscode.svg";
import figmaIcon from "@/assets/skill-icons/figma.svg";
import vercelIcon from "@/assets/skill-icons/vercel.svg";
import netlifyIcon from "@/assets/skill-icons/netlify.svg";
import stripeIcon from "@/assets/skill-icons/stripe.svg";

type Skill = { label: string; icon: string };

const coreStack: Skill[] = [
  { label: "JavaScript (ES6+)", icon: javascriptIcon },
  { label: "TypeScript", icon: typescriptIcon },
  { label: "HTML5", icon: htmlIcon },
  { label: "CSS3", icon: cssIcon },
  { label: "Tailwind CSS", icon: tailwindIcon },
  { label: "React.js", icon: reactIcon },
  { label: "Next.js", icon: nextIcon },
  { label: "Node.js", icon: nodeIcon },
  { label: "Express.js", icon: expressIcon },
  { label: "REST API", icon: apiIcon },
  { label: "MongoDB", icon: mongoIcon },
  { label: "MongoDB Atlas", icon: mongoIcon },
  { label: "MySQL", icon: mysqlIcon },
  { label: "PostgreSQL", icon: postgresIcon },
  { label: "Prisma", icon: prismaIcon },
  { label: "JWT", icon: jwtIcon },
  { label: "Better Auth", icon: authIcon },
  { label: "DaisyUI", icon: daisyIcon },
  { label: "Hero UI", icon: heroIcon },
  { label: "Responsive Design", icon: responsiveIcon },
  { label: "Git & GitHub", icon: gitIcon },
];

const tools: Skill[] = [
  { label: "VS Code", icon: vscodeIcon },
  { label: "Figma", icon: figmaIcon },
  { label: "Vercel", icon: vercelIcon },
  { label: "Netlify", icon: netlifyIcon },
  { label: "Stripe", icon: stripeIcon },
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
    <section id="about" className="py-16 md:py-20 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ---------- LEFT: About Me card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.12), transparent 70%)" }} />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-glow-cyan" />
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">About Me</p>
                <div className="flex-1 h-px border-t border-dashed border-border" />
              </div>

              {/* Avatar with 3D tilt + orbit ring */}
              <div className="flex justify-center mb-7">
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
                      src={marufTshirt}
                      alt="Maruf Hasan — MERN Stack Developer"
                      width={128}
                      height={128}
                      decoding="async"
                      className="w-full h-full rounded-full object-cover object-top bg-background"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-3 text-sm md:text-[15px] leading-normal text-[hsl(var(--text-secondary))]">
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

              <div className="flex flex-wrap items-center gap-3 mt-6">
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
            className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(270 100% 57% / 0.14), transparent 70%)" }} />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-glow-violet" />
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-foreground">Skills</p>
                <div className="flex-1 h-px border-t border-dashed border-border" />
              </div>

              <p className="text-xs font-semibold tracking-wider text-foreground mb-4">CORE STACK</p>
              <div className="flex flex-wrap gap-2">
                {coreStack.map((s, i) => (
                  <motion.span
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.25 + i * 0.04, type: "spring", stiffness: 320, damping: 20 }}
                    whileHover={{ y: -3, borderColor: "hsl(186 100% 50% / 0.6)" }}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/30 px-3 py-1.5 font-mono text-xs text-foreground/90 cursor-default"
                  >
                    <img src={s.icon} alt="" aria-hidden width={16} height={16} className="w-4 h-4 shrink-0 object-contain" />
                    {s.label}
                  </motion.span>
                ))}
              </div>

              <p className="text-xs font-semibold tracking-wider text-foreground mt-6 mb-3">TOOLS &amp; PLATFORMS</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((s, i) => (
                  <motion.span
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 320, damping: 20 }}
                    whileHover={{ y: -3, borderColor: "hsl(270 100% 57% / 0.6)" }}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/30 px-3 py-1.5 font-mono text-xs text-foreground/90 cursor-default"
                  >
                    <img src={s.icon} alt="" aria-hidden width={16} height={16} className="w-4 h-4 shrink-0 object-contain" />
                    {s.label}
                  </motion.span>
                ))}
              </div>

              <p className="text-sm font-semibold text-foreground mt-6 mb-3">Certifications</p>
              <div className="space-y-2">
                {certifications.map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    className="glass-panel-hover rounded-xl px-4 py-3 flex items-center gap-3"
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
