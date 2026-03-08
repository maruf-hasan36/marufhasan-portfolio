import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Activity, Utensils, User, TrendingUp, Zap, Target } from "lucide-react";

const workoutModes = [
  { mode: "Beast Mode", icon: Zap, color: "hsl(var(--signal-red))", desc: "High-intensity power training with maximal load progression", hrv: "High", readiness: "95%", focus: "Strength & Power" },
  { mode: "Flow State", icon: Activity, color: "hsl(var(--quantum-cyan))", desc: "Balanced training optimized for skill acquisition and endurance", hrv: "Moderate", readiness: "78%", focus: "Endurance & Skill" },
  { mode: "Recovery Focus", icon: Target, color: "hsl(var(--solar-orange))", desc: "Active recovery with mobility work and light cardio", hrv: "Low", readiness: "52%", focus: "Mobility & Recovery" },
];

const nutritionData = [
  { macro: "Protein", value: 185, target: 200, unit: "g", color: "hsl(var(--signal-red))" },
  { macro: "Carbs", value: 280, target: 320, unit: "g", color: "hsl(var(--quantum-cyan))" },
  { macro: "Fats", value: 72, target: 80, unit: "g", color: "hsl(var(--solar-orange))" },
];

const FitnessFeatures = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeMode, setActiveMode] = useState(0);

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--quantum-cyan) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-secondary uppercase mb-4 block">Core Modules</span>
          <h2 className="heading-section mb-4">
            Your <span className="text-gradient-fire">AI-First</span> Ecosystem
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Interconnected intelligence modules that learn your body, adapt your training, and optimize your nutrition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Training Mode Selector */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--signal-red) / 0.1)", border: "1px solid hsl(var(--signal-red) / 0.2)" }}>
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Training Protocol</h3>
                <p className="text-xs text-muted-foreground font-mono">Today's recommended mode</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {workoutModes.map((m, i) => (
                <button
                  key={m.mode}
                  onClick={() => setActiveMode(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                    activeMode === i
                      ? "glass-panel border-primary/30"
                      : "hover:bg-muted/20"
                  }`}
                  style={activeMode === i ? { boxShadow: `0 0 20px -5px ${m.color}30` } : {}}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${m.color}15` }}>
                    <m.icon className="w-5 h-5" style={{ color: m.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{m.mode}</p>
                    <p className="text-xs text-muted-foreground truncate">{m.desc}</p>
                  </div>
                  {activeMode === i && (
                    <span className="text-[10px] px-2 py-1 rounded-full font-bold bg-primary/10 text-primary border border-primary/20">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Stats for selected mode */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "HRV", value: workoutModes[activeMode].hrv },
                { label: "Readiness", value: workoutModes[activeMode].readiness },
                { label: "Focus", value: workoutModes[activeMode].focus },
              ].map((s) => (
                <div key={s.label} className="bg-muted/20 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground font-mono mb-1">{s.label}</p>
                  <p className="text-sm font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metabolic Scanner */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--solar-orange) / 0.1)", border: "1px solid hsl(var(--solar-orange) / 0.2)" }}>
                <Utensils className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Metabolic Scanner</h3>
                <p className="text-xs text-muted-foreground font-mono">Today's intake vs targets</p>
              </div>
            </div>

            {/* Macro bars */}
            <div className="space-y-5 mb-8">
              {nutritionData.map((n) => (
                <div key={n.macro}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{n.macro}</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {n.value}{n.unit} / {n.target}{n.unit}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(n.value / n.target) * 100}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: n.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Daily summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/20 rounded-xl p-4">
                <p className="text-xs text-muted-foreground font-mono mb-1">Calories</p>
                <p className="text-2xl font-bold text-gradient-fire font-mono">2,480</p>
                <p className="text-[10px] text-muted-foreground">/ 2,800 kcal target</p>
              </div>
              <div className="bg-muted/20 rounded-xl p-4">
                <p className="text-xs text-muted-foreground font-mono mb-1">Hydration</p>
                <p className="text-2xl font-bold text-secondary font-mono">2.8L</p>
                <p className="text-[10px] text-muted-foreground">/ 3.5L target</p>
              </div>
            </div>

            {/* AI Insight */}
            <div className="mt-5 p-4 rounded-xl border border-accent/20 bg-accent/5">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-accent mb-1">Strategic Surplus Opportunity</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Based on 6 days of caloric deficit adherence and declining metabolic rate indicators, a +400 kcal refeed is recommended tomorrow to maintain hormonal balance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Avatar concept */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 glass-panel rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "hsl(var(--quantum-cyan) / 0.1)", border: "1px solid hsl(var(--quantum-cyan) / 0.2)" }}>
              <User className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">Your Digital Vessel</h3>
          </div>
          <p className="body-large max-w-xl mx-auto mb-6">
            As you train in the real world, your avatar evolves — muscle definition, posture, and bio-geometry transform in the metaverse.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Muscle Geometry", "Posture Analysis", "Vascularity Map", "Founder's Gear"].map((tag) => (
              <span key={tag} className="text-xs px-4 py-2 rounded-full glass-panel font-mono text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FitnessFeatures;
