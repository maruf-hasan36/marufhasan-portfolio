import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Code, Server, Blocks, Layers, Cpu, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

const milestones = [
  { year: "01", title: "Learned JavaScript", desc: "Started with HTML, CSS and JavaScript fundamentals — ES6+, DOM manipulation, and async programming patterns.", icon: Code, color: "var(--step-one)" },
  { year: "02", title: "Mastered React.js", desc: "Built modern, component-based UIs with React — hooks, state management, and reusable component architecture.", icon: Blocks, color: "var(--step-two)" },
  { year: "03", title: "Backend with Node & Express", desc: "Developed server-side logic and REST APIs using Node.js and Express.js with clean architecture.", icon: Server, color: "var(--step-three)" },
  { year: "04", title: "MongoDB & Full-Stack MERN", desc: "Connected MongoDB with Mongoose and shipped end-to-end MERN stack applications with authentication.", icon: Layers, color: "var(--step-four)" },
  { year: "05", title: "Next.js & TypeScript", desc: "Building SEO-friendly, type-safe full-stack apps with Next.js, TypeScript, Prisma, and PostgreSQL.", icon: Cpu, color: "var(--step-five)" },
];

const Timeline = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.12], [0, 1]);

  return (
    <section id="journey" className="py-16 md:py-20 relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />

      {/* Background decoration */}
      <div className="dark-only-effect absolute right-0 top-1/3 -translate-y-1/2 w-[520px] h-[520px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(270 100% 57% / 0.18), transparent 70%)" }} />
      <div className="dark-only-effect absolute left-0 bottom-1/4 -translate-x-1/3 w-[420px] h-[420px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.15), transparent 70%)" }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Journey</p>
          <h2 className="heading-section mb-4">
            My MERN <span className="text-gradient-cyan-violet">learning path</span>
          </h2>
          <p className="body-large max-w-lg mx-auto">The steps that shaped me as a MERN stack developer.</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline track */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-32 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, hsl(186 100% 50% / 0.08), hsl(270 100% 57% / 0.08), transparent)" }}
          />

          {/* Animated progress fill */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 bottom-32 w-px -translate-x-1/2 origin-top"
            style={{
              height: lineHeight,
              background: "linear-gradient(180deg, hsl(var(--primary) / 0.55), hsl(var(--primary) / 0.55), hsl(var(--secondary) / 0.55), transparent)",
              boxShadow: "0 0 24px hsl(var(--primary) / 0.25)",
            }}
          />

          <div className="space-y-10 md:space-y-14">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isLeft = i % 2 === 0;
              const isExpanded = expanded === i;

              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? "md:text-right md:pr-14" : "md:text-left md:pl-14"} pl-16 md:pl-0`}>
                    <motion.div
                      layout
                      onClick={() => setExpanded(isExpanded ? null : i)}
                      onKeyDown={(e) => e.key === "Enter" && setExpanded(isExpanded ? null : i)}
                      role="button"
                      tabIndex={0}
                      className="glass-panel-hover rounded-2xl p-4 md:p-5 relative overflow-hidden cursor-pointer group"
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                      {/* Subtle top accent */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, hsl(${m.color}), transparent)` }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                      />

                      <div className={`flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border"
                          style={{ color: `hsl(${m.color})`, borderColor: `hsl(${m.color} / 0.25)`, background: `hsl(${m.color} / 0.08)` }}>
                          Step {m.year}
                        </span>
                      </div>

                      <h3 className="text-base md:text-lg font-semibold mb-2 group-hover:text-gradient-cyan-violet transition-all duration-300">
                        {m.title}
                      </h3>

                      <AnimatePresence initial={false}>
                        <motion.div
                          key={isExpanded ? "open" : "closed"}
                          initial={false}
                          animate={{
                            height: isExpanded ? "auto" : "2.75rem",
                            opacity: isExpanded ? 1 : 0.75,
                          }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground leading-normal">
                            {m.desc}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      <div className={`mt-3 flex items-center gap-2 text-xs font-medium ${isLeft ? "md:justify-end" : "md:justify-start"}`}
                        style={{ color: `hsl(${m.color})` }}>
                        <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                          {isExpanded ? "Click to collapse" : "Click to expand"}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Connecting line to card */}
                  <div
                    className={`hidden md:block absolute top-8 ${isLeft ? "left-1/2" : "right-1/2"} h-px w-12 opacity-0 md:opacity-100`}
                    style={{
                      background: `linear-gradient(${isLeft ? "90deg" : "270deg"}, hsl(${m.color} / 0.45), transparent)`,
                    }}
                  />

                  {/* Center node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 top-6">
                    {/* Pulsing halo */}
                    <motion.span
                      className="dark-only-effect absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: `hsl(${m.color} / 0.35)` }}
                      animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.25 }}
                    />
                    <motion.div
                      className="timeline-node relative w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: isExpanded ? `hsl(${m.color} / 0.22)` : `hsl(${m.color} / 0.08)`,
                        border: `1.5px solid hsl(${m.color} / ${isExpanded ? 0.65 : 0.25})`,
                        boxShadow: isExpanded ? `0 0 28px hsl(${m.color} / 0.35)` : "0 0 16px hsl(${m.color} / 0.1)",
                      }}
                      whileHover={{ scale: 1.18, rotate: 8 }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 360 : 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Present / future marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center mt-10 md:mt-12"
          >
            <div className="glass-panel rounded-2xl px-5 py-3 flex items-center gap-4 border border-dashed border-border/60">
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--primary) / 0.12)", border: "1px solid hsl(var(--primary) / 0.3)" }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4 text-glow-cyan" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-foreground">Continuing the journey</p>
                <p className="text-xs text-muted-foreground mt-0.5">Open to impactful projects & collaborations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
