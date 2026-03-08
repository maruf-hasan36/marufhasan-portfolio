import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2, Server, Wrench, Blocks, Database, Cloud,
  Palette, Terminal, GitBranch, Cpu, Globe, Layers
} from "lucide-react";

const categories = [
  {
    title: "Frontend",
    color: "186 100% 50%",
    skills: [
      { name: "React / Next.js", icon: Blocks, desc: "Production apps with SSR, ISR & RSC", level: 95 },
      { name: "TypeScript", icon: Code2, desc: "Strict mode, fully typed codebases", level: 92 },
      { name: "Tailwind CSS", icon: Palette, desc: "Custom design systems, not defaults", level: 90 },
      { name: "Three.js / WebGL", icon: Layers, desc: "3D experiences & data visualization", level: 75 },
    ],
  },
  {
    title: "Backend",
    color: "270 100% 57%",
    skills: [
      { name: "Node.js", icon: Server, desc: "REST & GraphQL APIs at scale", level: 90 },
      { name: "PostgreSQL", icon: Database, desc: "Complex queries, migrations, RLS", level: 85 },
      { name: "AWS / Vercel", icon: Cloud, desc: "Edge functions, serverless, CI/CD", level: 82 },
      { name: "AI / ML APIs", icon: Cpu, desc: "LLM integration, embeddings, RAG", level: 78 },
    ],
  },
  {
    title: "Tools",
    color: "220 80% 60%",
    skills: [
      { name: "Git / GitHub", icon: GitBranch, desc: "Trunk-based, PRs, Actions", level: 95 },
      { name: "Docker", icon: Terminal, desc: "Containerized dev & deployment", level: 80 },
      { name: "Testing", icon: Wrench, desc: "Vitest, Playwright, Cypress", level: 85 },
      { name: "System Design", icon: Globe, desc: "Scalable architecture patterns", level: 82 },
    ],
  },
];

const SkillCard = ({ skill, index, catColor }: {
  skill: typeof categories[0]["skills"][0]; index: number; catColor: string;
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
      {/* Hover glow */}
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

        {/* Skill bar */}
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
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Expertise</p>
          <h2 className="heading-section mb-4">
            Tools of the <span className="text-gradient-cyan-violet">trade</span>
          </h2>
          <p className="body-large max-w-lg mx-auto">Technologies I use daily to build exceptional digital products.</p>
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
      </div>
    </section>
  );
};

export default Skills;
