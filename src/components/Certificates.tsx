import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Award, BadgeCheck, Calendar, Hash, Sparkles, Trophy, Link2, GraduationCap } from "lucide-react";
import certificateImg from "@/assets/certificate-webdev.jpg";
import certificateTs from "@/assets/certificate-typescript.jpg";

interface CertificateItem {
  img: string;
  alt: string;
  title: string;
  issuer: string;
  description: string;
  highlights: { icon: typeof Trophy; label: string; value: string }[];
  skills: string[];
}

const certificates: CertificateItem[] = [
  {
    img: certificateImg,
    alt: "Complete Web Development Course certificate — Programming Hero, awarded to Maruf Hasan",
    title: "Complete Web Development Course",
    issuer: "Programming Hero",
    description:
      "Graduated with excellence after six months of intensive, project-based training — covering the full MERN stack, AI-powered development practices, and professional web engineering readiness.",
    highlights: [
      { icon: Trophy, label: "Completed with Excellence", value: "Top Distinction" },
      { icon: Calendar, label: "Duration", value: "Jan – Jun 2026" },
      { icon: Hash, label: "Credential ID", value: "WEB13-1366" },
      { icon: Sparkles, label: "Batch", value: "Batch 13" },
    ],
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    img: certificateTs,
    alt: "TypeScript Variables and Data Types project certificate — Coursera, awarded to Maruf Hasan",
    title: "TypeScript Variables and Data Types",
    issuer: "Coursera Project Network",
    description:
      "Completed a hands-on Coursera project mastering TypeScript fundamentals — variables, data types, type annotations, and writing safer, strongly-typed JavaScript code.",
    highlights: [
      { icon: GraduationCap, label: "Authorized by", value: "Coursera" },
      { icon: Calendar, label: "Completed", value: "Sep 7, 2026" },
      { icon: Link2, label: "Verify at", value: "coursera.org/verify/92IBJ0Y5OAA8" },
      { icon: Sparkles, label: "Format", value: "Guided Project" },
    ],
    skills: ["TypeScript", "JavaScript", "Type Annotations", "Data Types", "Variables"],
  },
];

const CertificateCard = ({ cert }: { cert: CertificateItem }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-200, 200], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-8, 8]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl overflow-hidden glass-panel group cursor-pointer"
      >
        {/* Glow border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{ boxShadow: "0 0 60px hsl(186 100% 50% / 0.25), inset 0 0 0 1px hsl(186 100% 50% / 0.3)" }}
        />
        <img
          src={cert.img}
          alt={cert.alt}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Shine sweep */}
        <motion.div
          animate={hovered ? { x: ["-100%", "200%"] } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        />
        {/* Verified badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium"
          style={{ transform: "translateZ(40px)" }}
        >
          <BadgeCheck className="w-4 h-4" style={{ color: "hsl(186 100% 50%)" }} />
          Verified Credential
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  return (
    <section id="certificates" className="py-16 md:py-20 relative">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground tracking-widest uppercase">
            <Award className="w-4 h-4" style={{ color: "hsl(270 100% 70%)" }} />
            Certificates & Achievements
          </span>
          <h2 className="heading-section mt-3">
            Proof of <span className="text-gradient-cyan-violet">Mastery</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
            Milestones that mark my journey as a MERN stack developer.
          </p>
        </motion.div>

        <div className="space-y-12">
          {certificates.map((cert, idx) => (
            <div key={cert.title} className="grid lg:grid-cols-2 gap-7 items-center">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <CertificateCard cert={cert} />
              </div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`space-y-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">{cert.title}</h3>
                  <p className="text-base mt-1" style={{ color: "hsl(186 100% 50%)" }}>
                    {cert.issuer}
                  </p>
                  <p className="text-sm md:text-[15px] text-muted-foreground mt-3 leading-normal">{cert.description}</p>
                </div>

                {/* Highlight grid */}
                <div className="grid grid-cols-2 gap-3">
                  {cert.highlights.map((h, i) => (
                    <motion.div
                      key={h.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="glass-panel rounded-xl p-3"
                    >
                      <h.icon className="w-5 h-5 mb-2" style={{ color: i % 2 === 0 ? "hsl(186 100% 50%)" : "hsl(270 100% 70%)" }} />
                      <p className="text-xs text-muted-foreground">{h.label}</p>
                      <p className="text-sm font-semibold mt-0.5 break-words">{h.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Skills covered */}
                <div>
                  <p className="text-sm font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                    Skills Certified
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((s, i) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1.5 text-xs font-medium rounded-full glass-panel"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
