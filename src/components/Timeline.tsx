import { motion } from "framer-motion";
import { Code, Server, Blocks, Layers, Cpu } from "lucide-react";

const milestones = [
  { year: "2018", title: "Learned JavaScript", desc: "Dove into the fundamentals—DOM manipulation, ES6, async patterns.", icon: Code, color: "186 100% 50%" },
  { year: "2019", title: "First REST API", desc: "Built and deployed my first Node.js + Express API with MongoDB.", icon: Server, color: "200 80% 55%" },
  { year: "2020", title: "Mastered React", desc: "Hooks, context, state management—built production SPAs.", icon: Blocks, color: "230 70% 60%" },
  { year: "2022", title: "Full-Stack Engineer", desc: "Next.js, PostgreSQL, cloud deployment. End-to-end ownership.", icon: Layers, color: "260 80% 60%" },
  { year: "2024", title: "AI & Beyond", desc: "LLM integrations, WebAssembly experiments, pushing boundaries.", icon: Cpu, color: "270 100% 57%" },
];

const Timeline = () => (
  <section id="journey" className="py-32 relative">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Journey</p>
        <h2 className="heading-section">
          The path <span className="text-gradient-cyan-violet">so far</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-16">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center gap-8 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Content */}
                <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} pl-16 md:pl-0`}>
                  <div className="glass-panel rounded-xl p-6">
                    <p className="font-mono text-xs tracking-wider mb-2" style={{ color: `hsl(${m.color})` }}>
                      {m.year}
                    </p>
                    <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `hsl(${m.color} / 0.15)`,
                      border: `1px solid hsl(${m.color} / 0.3)`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: `hsl(${m.color})` }} />
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Timeline;
