import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import projectAiHub from "@/assets/project-aihub.png";
import projectGoodReads from "@/assets/project-goodreads.png.asset.json";
import projectIdeaVault from "@/assets/project-ideavault.png";

const projects = [
  {
    title: "AI Hub — All-in-One AI Store",
    desc: "Start exploring AI smarter, faster, and easier with AI Store. A unified subscription platform giving access to the most advanced frontier AI models under one powerful interface.",
    tech: ["React", "Tailwind CSS", "Modern UI Components"],
    color: "186 100% 50%",
    github: "https://github.com/maruf-hasan36/Ai-Store",
    live: "https://lnkd.in/gryp9sxv",
    image: projectAiHub,
    year: "AI",
  },
  {
    title: "GoodReads — Book Community Platform",
    desc: "A responsive book management platform to discover books, share reviews, and manage user profiles. Features email/password and Google OAuth authentication, category filtering with search, an interactive review system, and protected routes with smooth responsive animations.",
    tech: ["React", "Firebase Auth", "Tailwind CSS", "OAuth"],
    color: "270 100% 70%",
    github: "https://github.com/maruf-hasan36/B13-A8",
    live: "https://b13-a8-nu.vercel.app/",
    image: projectGoodReads.url,
    year: "Full-Stack",
  },
  {
    title: "IdeaVault — Creative Platform",
    desc: "A MERN stack idea validation and collaboration platform to explore, submit, and manage startup ideas. Features secure JWT auth with protected routes, full CRUD via Express REST API with MongoDB, and a responsive Next.js frontend with real-time data.",
    tech: ["Next.js", "Express.js", "MongoDB", "JWT"],
    color: "270 100% 70%",
    github: "https://github.com/maruf-hasan36",
    live: "https://assignmet-9-client.vercel.app/",
    image: projectIdeaVault,
    year: "MERN",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-200, 200], [10, -10]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-10, 10]), { stiffness: 200, damping: 25 });
  const imgScale = useSpring(hovered ? 1.05 : 1, { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-panel rounded-2xl overflow-hidden group cursor-default relative"
    >
      {/* Project Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ scale: imgScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Year badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-panel text-xs font-mono" 
          style={{ color: `hsl(${project.color})` }}>
          {project.year}
        </div>

        {/* Hover overlay with links */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          initial={false}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "hsl(240 20% 4% / 0.55)", backdropFilter: "blur(6px)" }}
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 14, opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 14, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: hovered ? 0.05 : 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group/btn relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border border-border/60 text-sm font-medium overflow-hidden transition-colors duration-300 hover:border-foreground/30"
          >
            <Github className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-[-8deg]" />
            <span>View Code</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          </motion.a>

          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 14, opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 14, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: hovered ? 0.12 : 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group/btn relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, hsl(${project.color} / 0.95), hsl(${project.color} / 0.7))`,
              color: "hsl(240 20% 4%)",
              boxShadow: `0 8px 24px -8px hsl(${project.color} / 0.6), 0 0 0 1px hsl(${project.color} / 0.4) inset`,
            }}
          >
            <span>View Project</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </motion.a>
        </motion.div>
      </div>

      <div className="p-6 relative" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold group-hover:text-gradient-cyan-violet transition-all duration-300">{project.title}</h3>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0" />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-[11px] px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground border border-border/50">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at bottom, hsl(${project.color} / 0.1), transparent)` }} />
    </motion.div>
  );
};

const Projects = () => (
  <section id="projects" className="py-32 relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
      style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Work</p>
        <h2 className="heading-section mb-4">
          Selected <span className="text-gradient-cyan-violet">projects</span>
        </h2>
        <p className="body-large max-w-lg mx-auto">Handpicked work that showcases my approach to building digital products.</p>
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
