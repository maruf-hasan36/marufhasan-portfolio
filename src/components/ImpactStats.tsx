import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Heart, Users, Building2, Globe } from "lucide-react";

const AnimatedCounter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const stats = [
  { icon: Heart, value: 120000, suffix: "+", label: "Lives Saved", color: "var(--blood-red)" },
  { icon: Users, value: 50000, suffix: "+", label: "Active Donors", color: "var(--neon-cyan)" },
  { icon: Building2, value: 500, suffix: "+", label: "Blood Banks", color: "var(--blood-red)" },
  { icon: Globe, value: 85, suffix: "", label: "Countries Active", color: "var(--neon-cyan)" },
];

const bloodTypeDistribution = [
  { type: "O+", pct: 38, color: "hsl(345 100% 59%)" },
  { type: "A+", pct: 27, color: "hsl(345 80% 50%)" },
  { type: "B+", pct: 16, color: "hsl(186 100% 50%)" },
  { type: "AB+", pct: 7, color: "hsl(186 80% 40%)" },
  { type: "O-", pct: 5, color: "hsl(345 60% 40%)" },
  { type: "A-", pct: 4, color: "hsl(186 60% 35%)" },
  { type: "B-", pct: 2, color: "hsl(345 40% 35%)" },
  { type: "AB-", pct: 1, color: "hsl(186 40% 30%)" },
];

const ImpactStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-cyan) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-widest text-secondary uppercase mb-4 block">Our Impact</span>
          <h2 className="heading-section mb-4">
            Numbers That <span className="text-gradient-red-cyan">Matter</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Real-time metrics from the HEMOVERSE ecosystem. Every number represents a life touched.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -8, rotateX: 5 }}
              className="glass-panel rounded-2xl p-6 text-center group"
              style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            >
              <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `hsl(${stat.color} / 0.1)` }}>
                <stat.icon className="w-7 h-7" style={{ color: `hsl(${stat.color})` }} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                <AnimatedCounter target={stat.value} />
                <span className="text-gradient-red-cyan">{stat.suffix}</span>
              </p>
              <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Blood type distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-panel rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Donor Blood Type Distribution</h3>

          <div className="space-y-3">
            {bloodTypeDistribution.map((bt, i) => (
              <div key={bt.type} className="flex items-center gap-4">
                <span className="text-sm font-mono font-bold w-8 text-foreground">{bt.type}</span>
                <div className="flex-1 h-8 rounded-lg overflow-hidden bg-muted/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${bt.pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-lg flex items-center justify-end pr-2"
                    style={{ background: bt.color }}
                  >
                    <span className="text-xs font-bold text-primary-foreground">{bt.pct}%</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
