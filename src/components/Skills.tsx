import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2, Server, Blocks, Database, Palette,
  GitBranch, Globe, Lock, FileCode, Layers,
} from "lucide-react";

const categories = [
  {
    title: "Frontend",
    color: "186 100% 50%",
    skills: [
      { name: "HTML5 & CSS3", icon: FileCode, desc: "Semantic markup & modern styling", level: 95 },
      { name: "Tailwind CSS", icon: Palette, desc: "Utility-first responsive design", level: 92 },
      { name: "JavaScript (ES6+)", icon: Code2, desc: "Modern JS, async patterns, modules", level: 92 },
      { name: "React.js", icon: Blocks, desc: "Hooks, components, state management", level: 90 },
      { name: "Next.js", icon: Layers, desc: "SSR, SEO-friendly, full-stack apps", level: 88 },
    ],
  },
  {
    title: "Backend",
    color: "270 100% 57%",
    skills: [
      { name: "Node.js", icon: Server, desc: "Server-side JavaScript runtime", level: 90 },
      { name: "Express.js", icon: Globe, desc: "REST API development & routing", level: 88 },
    ],
  },
  {
    title: "Database",
    color: "220 80% 60%",
    skills: [
      { name: "MongoDB", icon: Database, desc: "NoSQL document database & Mongoose", level: 88 },
    ],
  },
  {
    title: "Authentication & Tools",
    color: "200 80% 55%",
    skills: [
      { name: "JWT / Better Auth", icon: Lock, desc: "Secure auth & user management", level: 85 },
      { name: "Git & GitHub", icon: GitBranch, desc: "Version control & collaboration", level: 92 },
      { name: "REST API Development", icon: Globe, desc: "Designing & consuming RESTful APIs", level: 90 },
    ],
  },
];

const SkillCard = ({ skill, index, catColor }: {
  skill: { name: string; icon: typeof Code2; desc: string; level: number }; index: number; catColor: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-80, 80], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-80, 80], [-6, 6]), { stiffness: 300, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-panel-hover rounded-xl p-6 cursor-default group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, hsl(${catColor} / 0.06), transparent 70%)` }} />

      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `hsl(${catColor} / 0.1)`, border: `1px solid hsl(${catColor} / 0.2)` }}>
            <Icon className="w-5 h-5" style={{ color: `hsl(${catColor})` }} />
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">{skill.name}</p>
            <p className="text-xs text-muted-foreground">{skill.desc}</p>
          </div>
        </div>

        <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-3">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, hsl(${catColor}), hsl(${catColor} / 0.5))` }}
            initial={{ width: 0 }}
            animate={hovered ? { width: `${skill.level}%` } : { width: `${skill.level}%` }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground font-mono mt-1 text-right">{skill.level}%</p>
      </div>
    </motion.div>
  );
};

const capabilities = [
  "Build full-stack web applications using MERN stack",
  "Create responsive and modern UI with React & Tailwind",
  "Develop server-side logic and APIs using Node.js & Express",
  "Work with databases (MongoDB) efficiently",
  "Build SEO-friendly apps using Next.js",
  "Handle authentication and user management systems",
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Skills</p>
          <h2 className="heading-section mb-4">
            My <span className="text-gradient-cyan-violet">tech stack</span>
          </h2>
          <p className="body-large max-w-lg mx-auto">The MERN stack technologies I use to build modern web applications.</p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${cat.color})` }} />
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{cat.title}</p>
                <div className="flex-1 h-px bg-border/50" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} catColor={cat.color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* What I Can Do */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2 h-2 rounded-full bg-glow-cyan" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">What I Can Do</p>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-panel-hover rounded-xl p-5 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                  style={{ background: "hsl(186 100% 50% / 0.1)", border: "1px solid hsl(186 100% 50% / 0.3)" }}>
                  <span className="text-glow-cyan text-xs">✓</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{cap}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
