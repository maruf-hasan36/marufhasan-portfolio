import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const languages = [
  { name: "TypeScript", pct: 45, color: "186 100% 50%" },
  { name: "JavaScript", pct: 25, color: "50 100% 55%" },
  { name: "Python", pct: 15, color: "270 100% 57%" },
  { name: "Other", pct: 15, color: "220 80% 60%" },
];

const statsData = [
  { label: "Public Repos", value: "42" },
  { label: "Contributions (2024)", value: "1,247" },
  { label: "Stars Earned", value: "380" },
  { label: "Pull Requests", value: "520+" },
];

// Generate fake contribution data
const generateContributions = () => {
  const weeks = 52;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const rand = Math.random();
      week.push(rand < 0.3 ? 0 : rand < 0.5 ? 1 : rand < 0.7 ? 2 : rand < 0.9 ? 3 : 4);
    }
    data.push(week);
  }
  return data;
};

const contributions = generateContributions();

const getContribColor = (level: number) => {
  const colors = [
    "hsl(240 10% 10%)",
    "hsl(186 100% 50% / 0.2)",
    "hsl(186 100% 50% / 0.4)",
    "hsl(186 100% 50% / 0.65)",
    "hsl(186 100% 50% / 0.9)",
  ];
  return colors[level];
};

const GitHubStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="github" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Open Source</p>
          <h2 className="heading-section mb-4">
            GitHub <span className="text-gradient-cyan-violet">activity</span>
          </h2>
          <p className="body-large max-w-lg mx-auto">My open source contributions and coding activity.</p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-panel rounded-xl p-5 text-center group hover:border-glow-cyan/20 transition-colors duration-300"
            >
              <p className="text-2xl md:text-3xl font-bold text-gradient-cyan-violet">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-mono tracking-wider mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glass-panel rounded-2xl p-6 md:p-8 mb-8"
        >
          <p className="text-sm font-medium mb-4">Contribution Graph</p>
          <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-[700px]">
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <motion.div
                      key={`${wi}-${di}`}
                      className="w-[11px] h-[11px] rounded-[2px]"
                      style={{ background: getContribColor(level) }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + (wi * 7 + di) * 0.001, duration: 0.2 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[10px] text-muted-foreground">Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className="w-[11px] h-[11px] rounded-[2px]" style={{ background: getContribColor(l) }} />
            ))}
            <span className="text-[10px] text-muted-foreground">More</span>
          </div>
        </motion.div>

        {/* Language breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass-panel rounded-2xl p-6 md:p-8"
        >
          <p className="text-sm font-medium mb-6">Top Languages</p>
          {/* Combined bar */}
          <div className="h-3 w-full rounded-full overflow-hidden flex mb-6">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                className="h-full"
                style={{ background: `hsl(${lang.color})` }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${lang.pct}%` } : {}}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: `hsl(${lang.color})` }} />
                <span className="text-sm text-muted-foreground">{lang.name}</span>
                <span className="text-sm font-mono text-foreground ml-auto">{lang.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
