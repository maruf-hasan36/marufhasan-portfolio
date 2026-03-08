import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Zap, Dumbbell, Heart, Activity, Trophy, Target, Timer, Flame } from "lucide-react";
import heroFitness from "@/assets/hero-fitness.jpg";
import { useEffect, useRef } from "react";

const FloatingTag = ({ children, delay, x, y, className = "" }: { children: React.ReactNode; delay: number; x: string; y: string; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-panel text-xs font-mono z-20 ${className}`}
    style={{ left: x, top: y }}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const OrbitaHero = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -120]);
  const imgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 0.3], [0, 60]);

  // Mouse parallax for 3D depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-3, 3]), { stiffness: 150, damping: 20 });
  const parallaxX = useSpring(useTransform(mouseX, [-500, 500], [15, -15]), { stiffness: 100, damping: 25 });
  const parallaxY = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 25 });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ perspective: "1200px" }}>
      {/* Hero background image with parallax */}
      <motion.div className="absolute inset-0 z-[0]" style={{ scale: imgScale, y: imgY }}>
        <motion.div style={{ x: parallaxX, y: parallaxY }} className="w-full h-full">
          <img src={heroFitness} alt="FITVERSE PRO — Elite athlete training" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, hsl(240 20% 4% / 0.92) 0%, hsl(240 20% 4% / 0.7) 40%, hsl(240 20% 4% / 0.35) 70%, hsl(240 20% 4% / 0.5) 100%)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        {/* Cinematic vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(240 20% 4% / 0.6) 100%)" }} />
      </motion.div>

      {/* Animated energy lines */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Horizontal scan line */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px opacity-[0.06]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--signal-red)), transparent)" }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: "linear-gradient(hsl(0 85% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 55%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        {/* Corner accents */}
        <div className="absolute top-20 left-8 w-24 h-24 border-l-2 border-t-2 border-primary/10 rounded-tl-3xl" />
        <div className="absolute bottom-20 right-8 w-24 h-24 border-r-2 border-b-2 border-primary/10 rounded-br-3xl" />
        {/* Atmospheric glow */}
        <motion.div
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[800px] h-[400px]"
          style={{ background: "radial-gradient(ellipse, hsl(0 85% 55% / 0.1), transparent 70%)" }}
        />
      </div>

      {/* Floating 3D info tags */}
      <FloatingTag delay={1.5} x="8%" y="25%">
        <Heart className="w-3.5 h-3.5 text-primary" />
        <span className="text-foreground/80">BPM <span className="text-primary font-bold">142</span></span>
      </FloatingTag>
      <FloatingTag delay={1.8} x="5%" y="60%">
        <Flame className="w-3.5 h-3.5 text-accent" />
        <span className="text-foreground/80">Calories <span className="text-accent font-bold">847</span></span>
      </FloatingTag>
      <FloatingTag delay={2.1} x="78%" y="20%">
        <Activity className="w-3.5 h-3.5 text-secondary" />
        <span className="text-foreground/80">VO2max <span className="text-secondary font-bold">58.2</span></span>
      </FloatingTag>
      <FloatingTag delay={2.4} x="80%" y="65%">
        <Timer className="w-3.5 h-3.5 text-primary" />
        <span className="text-foreground/80">Sets <span className="text-primary font-bold">4/5</span></span>
      </FloatingTag>

      {/* Main content with 3D tilt */}
      <motion.div
        style={{ opacity, scale, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="section-container relative z-10"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
          {/* Badge */}
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel mb-8">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Zap className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">AI-Powered Fitness Metaverse</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.p variants={childVariants} className="font-mono text-xs tracking-[0.3em] text-primary/70 uppercase mb-4">
            Your body. Your data. Your evolution.
          </motion.p>

          <motion.h1 variants={childVariants} className="heading-display mb-3">
            <span className="text-foreground">Train </span>
            <span className="text-gradient-fire">Smarter.</span>
          </motion.h1>
          <motion.h1 variants={childVariants} className="heading-display mb-3">
            <span className="text-foreground">Recover </span>
            <span className="text-gradient-cyber">Faster.</span>
          </motion.h1>
          <motion.h1 variants={childVariants} className="heading-display mb-8">
            <span className="text-foreground">Evolve </span>
            <span className="text-gradient-fire">Daily.</span>
          </motion.h1>

          <motion.p variants={childVariants} className="text-lg md:text-xl leading-relaxed max-w-xl mb-12" style={{ color: "hsl(var(--text-secondary))" }}>
            FITVERSE PRO fuses <span className="text-foreground font-medium">AI-driven training protocols</span>, 
            {" "}<span className="text-foreground font-medium">real-time biometric intelligence</span>, 
            {" "}and <span className="text-foreground font-medium">precision nutrition</span> into one 
            {" "}immersive platform — built for athletes who refuse to plateau.
          </motion.p>

          {/* CTA */}
          <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-4 items-start">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-10 py-5 rounded-full text-base font-semibold tracking-wide inline-flex items-center gap-3 overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, hsl(0 85% 55%), hsl(30 100% 55%))",
                boxShadow: "0 0 50px -5px hsl(0 85% 55% / 0.4), 0 0 100px -20px hsl(30 100% 55% / 0.2)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
              <Zap className="w-5 h-5 text-primary-foreground relative z-10" />
              <span className="text-primary-foreground relative z-10">Begin Your Evolution</span>
            </motion.a>

            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group px-10 py-5 rounded-full text-base font-semibold tracking-wide glass-panel-hover inline-flex items-center gap-3 text-foreground"
            >
              <Dumbbell className="w-5 h-5" />
              Explore Gear
            </motion.a>
          </motion.div>

          {/* Stats bar */}
          <motion.div variants={childVariants} className="flex gap-8 mt-16 flex-wrap">
            {[
              { value: "50K+", label: "Athletes", icon: Trophy },
              { value: "1.2M", label: "Workouts Logged", icon: Activity },
              { value: "98%", label: "Goal Completion", icon: Target },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-panel">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gradient-fire font-mono">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OrbitaHero;
