import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Heart, Flame, Shield } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Concierge", desc: "Proactive AI agent that analyzes your biometrics and suggests Beast Mode, Flow State, or Recovery Focus daily.", color: "signal-red" },
  { icon: Heart, title: "Bio-Feedback Loop", desc: "Real-time HRV, sleep quality, and metabolic analysis to optimize every rep and every meal.", color: "quantum-cyan" },
  { icon: Flame, title: "Adaptive Training", desc: "AI generates and evolves your program weekly based on performance, recovery, and goals.", color: "solar-orange" },
  { icon: Shield, title: "Recovery Science", desc: "Evidence-based recovery protocols with AI-predicted deload timing and strategic surplus opportunities.", color: "signal-red" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--solar-orange) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-secondary uppercase mb-4 block">The AI Ecosystem</span>
          <h2 className="heading-section mb-4">
            Built for <span className="text-gradient-fire">Human Optimization</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Every module is interconnected — powered by a unified AI core that learns, adapts, and evolves with you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="glass-panel-hover rounded-2xl p-6 text-center group"
              style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            >
              <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center`}
                style={{ background: `hsl(var(--${f.color}) / 0.1)`, border: `1px solid hsl(var(--${f.color}) / 0.2)` }}>
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
