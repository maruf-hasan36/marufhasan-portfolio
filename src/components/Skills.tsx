import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Code2, Server, Blocks, Database, Palette,
  GitBranch, Globe, Lock, FileCode, Layers,
  Braces, Monitor, Sparkles, ArrowLeftRight, CreditCard, Cloud, Code,
} from "lucide-react";

const categories = [
  {
    title: "Frontend",
    color: "var(--skill-frontend)",
    skills: [
      { name: "HTML5 & CSS3", icon: FileCode, desc: "Semantic markup & modern styling" },
      { name: "Tailwind CSS", icon: Palette, desc: "Utility-first responsive design" },
      { name: "JavaScript (ES6+)", icon: Code2, desc: "Modern JS, async patterns, modules" },
      { name: "TypeScript", icon: Braces, desc: "Type-safe scalable code" },
      { name: "React.js", icon: Blocks, desc: "Hooks, components, state management" },
      { name: "Next.js", icon: Layers, desc: "SSR, SEO-friendly, full-stack apps" },
      { name: "Responsive Design", icon: Monitor, desc: "Mobile-first adaptive layouts" },
      { name: "DaisyUI / Hero UI", icon: Sparkles, desc: "Component UI libraries" },
    ],
  },
  {
    title: "Backend",
    color: "var(--skill-backend)",
    skills: [
      { name: "Node.js", icon: Server, desc: "Server-side JavaScript runtime" },
      { name: "Express.js", icon: Globe, desc: "REST API development & routing" },
      { name: "REST API Development", icon: ArrowLeftRight, desc: "Designing & consuming RESTful APIs" },
    ],
  },
  {
    title: "Database & ORM",
    color: "var(--skill-database)",
    skills: [
      { name: "MongoDB / Atlas", icon: Database, desc: "NoSQL document database & Mongoose" },
      { name: "MySQL", icon: Database, desc: "Relational SQL database" },
      { name: "PostgreSQL", icon: Database, desc: "Advanced open-source SQL database" },
      { name: "Prisma", icon: Database, desc: "Type-safe ORM & migrations" },
    ],
  },
  {
    title: "Auth, Payments & Tools",
    color: "var(--skill-tools)",
    skills: [
      { name: "JWT / Better Auth", icon: Lock, desc: "Secure auth & user management" },
      { name: "Stripe Payments", icon: CreditCard, desc: "Payment integration & checkout" },
      { name: "Git & GitHub", icon: GitBranch, desc: "Version control & collaboration" },
      { name: "VS Code / Figma", icon: Code, desc: "Editor & design tooling" },
      { name: "Vercel / Netlify", icon: Cloud, desc: "Deployment & hosting platforms" },
    ],
  },
];

const SkillCard = ({ skill, index, catColor }: {
  skill: { name: string; icon: typeof Code2; desc: string }; index: number; catColor: string;
}) => {
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
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-panel-hover rounded-xl p-3 cursor-default group relative overflow-hidden"
    >
      <div className="dark-only-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, hsl(${catColor} / 0.06), transparent 70%)` }} />

      <div className="relative sm:flex sm:items-center sm:gap-3" style={{ transform: "translateZ(20px)" }}>
        <div className="mx-auto sm:mx-0 mb-1.5 sm:mb-0 w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `hsl(${catColor} / 0.1)`, border: `1px solid hsl(${catColor} / 0.2)` }}>
          <Icon className="w-5 h-5" style={{ color: `hsl(${catColor})` }} />
        </div>
        <div className="text-center sm:text-left min-w-0">
          <p className="font-medium text-[11px] sm:text-sm leading-tight text-foreground">{skill.name}</p>
          <p className="hidden sm:block text-xs text-muted-foreground">{skill.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
     <section id="skills" className="py-12 md:py-14 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="text-center mb-7"
        >
           <p className="font-mono text-xs tracking-[0.2em] uppercase text-glow-cyan mb-3">Skills</p>
           <h2 className="heading-section mb-3">
            My <span className="text-gradient-cyan-violet">tech stack</span>
          </h2>
          <p className="body-large max-w-lg mx-auto">The technologies I use to build modern, scalable web applications — from frontend UI to backend APIs and databases.</p>
        </motion.div>

         <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.title}>
               <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${cat.color})` }} />
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{cat.title}</p>
                <div className="flex-1 h-px bg-border/50" />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3">
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
