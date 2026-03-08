import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2, Server, Wrench, Blocks, Database, Cloud,
  Palette, Terminal, GitBranch, Cpu, Globe, Layers
} from "lucide-react";

const categories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", icon: Blocks, desc: "Production apps with SSR, ISR & RSC" },
      { name: "TypeScript", icon: Code2, desc: "Strict mode, fully typed codebases" },
      { name: "Tailwind CSS", icon: Palette, desc: "Custom design systems, not defaults" },
      { name: "Three.js / WebGL", icon: Layers, desc: "3D experiences & data visualization" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server, desc: "REST & GraphQL APIs at scale" },
      { name: "PostgreSQL", icon: Database, desc: "Complex queries, migrations, RLS" },
      { name: "AWS / Vercel", icon: Cloud, desc: "Edge functions, serverless, CI/CD" },
      { name: "AI / ML APIs", icon: Cpu, desc: "LLM integration, embeddings, RAG" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git / GitHub", icon: GitBranch, desc: "Trunk-based, PRs, Actions" },
      { name: "Docker", icon: Terminal, desc: "Containerized dev & deployment" },
      { name: "Testing", icon: Wrench, desc: "Vitest, Playwright, Cypress" },
      { name: "System Design", icon: Globe, desc: "Scalable architecture patterns" },
    ],
  },
];

const SkillCard = ({ skill, index }: { skill: typeof categories[0]["skills"][0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-panel-hover rounded-xl p-5 cursor-default group"
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <Icon className="w-5 h-5 text-glow-cyan transition-colors duration-300 group-hover:text-foreground" />
          {hovered && (
            <motion.div
              layoutId="skill-glow"
              className="absolute -inset-2 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.2), transparent)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
        </div>
        <div>
          <p className="font-medium text-sm text-foreground">{skill.name}</p>
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={hovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-muted-foreground mt-1 overflow-hidden"
          >
            {skill.desc}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Expertise</p>
          <h2 className="heading-section">
            Tools of the <span className="text-gradient-cyan-violet">trade</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 pl-1">
                {cat.title}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {cat.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
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
