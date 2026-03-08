import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "NeuralChat",
    desc: "Real-time AI chat platform with streaming responses, multi-model support, and collaborative workspaces.",
    tech: ["Next.js", "OpenAI", "WebSocket", "PostgreSQL"],
    color: "186 100% 50%",
    github: "#",
    live: "#",
  },
  {
    title: "CloudForge",
    desc: "Infrastructure-as-code dashboard for managing multi-cloud deployments with visual topology mapping.",
    tech: ["React", "Node.js", "AWS SDK", "D3.js"],
    color: "270 100% 57%",
    github: "#",
    live: "#",
  },
  {
    title: "DataLens",
    desc: "Analytics platform with real-time data visualization, custom dashboards, and automated reporting.",
    tech: ["TypeScript", "Three.js", "Supabase", "Recharts"],
    color: "220 80% 60%",
    github: "#",
    live: "#",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-panel-hover rounded-2xl overflow-hidden group cursor-default"
    >
      {/* Color bar */}
      <div className="h-1 w-full" style={{ background: `hsl(${project.color})` }} />

      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <div className="flex gap-2">
            <a href={project.github} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Github className="w-4 h-4 text-muted-foreground" />
            </a>
            <a href={project.live} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at bottom, hsl(${project.color} / 0.08), transparent)`,
        }}
      />
    </motion.div>
  );
};

const Projects = () => (
  <section id="projects" className="py-32 relative">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Work</p>
        <h2 className="heading-section">
          Selected <span className="text-gradient-cyan-violet">projects</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
