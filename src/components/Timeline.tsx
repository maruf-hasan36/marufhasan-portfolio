import { motion } from "framer-motion";
import { Code, Blocks, Server, Database, Cpu } from "lucide-react";

const milestones = [
  { title: "JavaScript foundations", detail: "HTML, CSS, ES6+, DOM and async programming", icon: Code },
  { title: "React interfaces", detail: "Hooks, state and reusable component architecture", icon: Blocks },
  { title: "Node & Express APIs", detail: "Server-side logic and REST API development", icon: Server },
  { title: "MERN applications", detail: "MongoDB, authentication and end-to-end projects", icon: Database },
  { title: "Next.js & TypeScript", detail: "Type-safe apps with Prisma and PostgreSQL", icon: Cpu },
];

const Timeline = () => (
  <section id="journey" className="py-12 md:py-14 relative overflow-hidden">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-7"
      >
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-glow-cyan mb-3">Journey</p>
        <h2 className="heading-section">My MERN <span className="text-gradient-cyan-violet">learning path</span></h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          return (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-panel-hover rounded-xl p-4 relative overflow-hidden"
            >
              <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center my-3">
                <Icon className="w-4 h-4 text-glow-cyan" />
              </div>
              <h3 className="text-sm font-semibold leading-snug">{milestone.title}</h3>
              <p className="text-xs text-muted-foreground leading-normal mt-2">{milestone.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Timeline;