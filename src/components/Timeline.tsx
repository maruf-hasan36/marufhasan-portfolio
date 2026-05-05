import { motion } from "framer-motion";
import { Code, Server, Blocks, Layers, Cpu } from "lucide-react";
import { useState } from "react";

const milestones = [
  { year: "01", title: "Learned JavaScript", desc: "Started with HTML, CSS and JavaScript fundamentals — ES6+, DOM, and async patterns.", icon: Code, color: "186 100% 50%" },
  { year: "02", title: "Mastered React.js", desc: "Built modern, component-based UIs with React — hooks, state, and reusable components.", icon: Blocks, color: "200 80% 55%" },
  { year: "03", title: "Backend with Node & Express", desc: "Developed server-side logic and REST APIs using Node.js and Express.js.", icon: Server, color: "230 70% 60%" },
  { year: "04", title: "MongoDB & Full-Stack MERN", desc: "Connected MongoDB with Mongoose and shipped end-to-end MERN stack applications.", icon: Layers, color: "260 80% 60%" },
  { year: "05", title: "Next.js & Authentication", desc: "Built SEO-friendly, full-stack apps with Next.js, JWT and Better Auth integrations.", icon: Cpu, color: "270 100% 57%" },
];

const Timeline = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="journey" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10"
        style={{ background: "radial-gradient(circle, hsl(270 100% 57% / 0.15), transparent 70%)" }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Journey</p>
          <h2 className="heading-section mb-4">
            My MERN <span className="text-gradient-cyan-violet">learning path</span>
          </h2>
          <p className="body-large max-w-lg mx-auto">The steps that shaped me as a MERN stack developer.</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{ background: "linear-gradient(180deg, hsl(186 100% 50% / 0.3), hsl(270 100% 57% / 0.3), transparent)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isLeft = i % 2 === 0;
              const isExpanded = expanded === i;

              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-start gap-6 md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row cursor-pointer`}
                  onClick={() => setExpanded(isExpanded ? null : i)}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} pl-16 md:pl-0`}>
                    <motion.div
                      className="glass-panel-hover rounded-xl p-6 relative overflow-hidden"
                      animate={isExpanded ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Top glow on expanded */}
                      {isExpanded && (
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                          style={{ background: `hsl(${m.color})` }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                      <div className="flex items-center gap-2 mb-2" style={{ justifyContent: isLeft ? "flex-end" : "flex-start" }}>
                        <span className="font-mono text-xs tracking-wider px-2 py-0.5 rounded-md" 
                          style={{ color: `hsl(${m.color})`, background: `hsl(${m.color} / 0.1)` }}>
                          {m.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? "auto" : "2.5rem", opacity: isExpanded ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    {/* Pulsing halo */}
                    <motion.span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: `hsl(${m.color} / 0.35)` }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
                    />
                    <motion.div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isExpanded ? `hsl(${m.color} / 0.25)` : `hsl(${m.color} / 0.1)`,
                        border: `1px solid hsl(${m.color} / ${isExpanded ? 0.6 : 0.2})`,
                        boxShadow: isExpanded ? `0 0 20px hsl(${m.color} / 0.3)` : "none",
                      }}
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 360 : 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Icon className="w-5 h-5" style={{ color: `hsl(${m.color})` }} />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
