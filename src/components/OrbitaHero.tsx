import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Zap, Dumbbell } from "lucide-react";
import heroFitness from "@/assets/hero-fitness.jpg";

const OrbitaHero = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -80]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(16px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-20"
          style={{ background: "radial-gradient(ellipse, hsl(0 85% 55% / 0.15), transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-15"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.08), transparent 70%)" }} />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] opacity-10"
          style={{ background: "radial-gradient(circle, hsl(30 100% 55% / 0.08), transparent 70%)" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(hsl(0 85% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 55%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
      </div>

      <motion.div style={{ opacity, scale, y }} className="section-container relative z-10 text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel mb-10">
            <Zap className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">AI-Powered Fitness Metaverse</span>
          </motion.div>

          <motion.h1 variants={childVariants} className="heading-display mb-4">
            Welcome to
          </motion.h1>
          <motion.h1 variants={childVariants} className="heading-display mb-8">
            <span className="text-gradient-fire">FITVERSE</span>{" "}
            <span className="text-foreground">PRO</span>
          </motion.h1>

          <motion.p variants={childVariants} className="body-large max-w-2xl mx-auto mb-12">
            The future of human optimization. AI-driven training, precision nutrition, and immersive biometric tracking — all in one digital sanctuary.
          </motion.p>

          {/* CTA */}
          <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="#products"
              className="group relative px-10 py-5 rounded-full text-base font-semibold tracking-wide inline-flex items-center gap-3 overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, hsl(0 85% 55%), hsl(30 100% 55%))",
                boxShadow: "0 0 40px -5px hsl(0 85% 55% / 0.4)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
              <Zap className="w-5 h-5 text-primary-foreground relative z-10" />
              <span className="text-primary-foreground relative z-10">Start Training</span>
            </a>

            <a href="#features" className="group px-10 py-5 rounded-full text-base font-semibold tracking-wide glass-panel-hover inline-flex items-center gap-3 text-foreground">
              <Dumbbell className="w-5 h-5" />
              Explore Gear
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={childVariants} className="flex gap-12 mt-16 justify-center flex-wrap">
            {[
              { value: "50K+", label: "Athletes" },
              { value: "1M+", label: "Workouts" },
              { value: "98%", label: "Goal Hit Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient-fire">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-mono tracking-widest mt-2 uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OrbitaHero;
