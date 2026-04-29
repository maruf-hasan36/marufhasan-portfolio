import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";
import { ChevronDown, ArrowRight } from "lucide-react";
import marufPhoto from "@/assets/maruf-photo.png";

const roles = [
  "MERN Stack Developer",
  "React.js & Next.js Developer",
  "Node.js & Express.js Developer",
  "MongoDB Database Specialist",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, isDeleting ? 30 : 80);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Atmospheric gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-30"
          style={{ background: "radial-gradient(ellipse at center top, hsl(186 100% 50% / 0.12), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] opacity-20"
          style={{ background: "radial-gradient(circle, hsl(270 100% 57% / 0.1), transparent 70%)" }} />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] opacity-15"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.08), transparent 70%)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(186 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(186 100% 50%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
      </div>

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="section-container relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center"
        >
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
              <span className="font-mono text-xs tracking-wider text-muted-foreground">Available for work</span>
            </motion.div>

            <motion.h1 variants={childVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight mb-2 leading-[1.05]">
              Hi, I'm
            </motion.h1>
            <motion.h1 variants={childVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-6 leading-[1.05]">
              <span className="text-gradient-cyan-violet">Maruf Hasan</span>
            </motion.h1>

            <motion.div variants={childVariants} className="h-14 md:h-16 mb-6 flex items-center justify-center lg:justify-start">
              <h2 className="text-xl md:text-3xl font-medium text-foreground/80">
                {displayText}
                <span className="inline-block w-[3px] h-[1.1em] bg-glow-cyan ml-1 animate-pulse-glow align-middle" />
              </h2>
            </motion.div>

            <motion.p variants={childVariants} className="body-large max-w-xl mb-10">
              I build modern, scalable, and user-friendly web applications using MongoDB, Express.js, React, and Node.js — turning ideas into real-world digital solutions through clean and efficient code.
            </motion.p>

            <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <MagneticButton variant="primary" href="#projects">
                View Projects <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
              <MagneticButton variant="glass" href="#contact">
                Contact Me
              </MagneticButton>
            </motion.div>

            {/* Quick stats */}
            <motion.div variants={childVariants} className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: "MERN", label: "Stack" },
                { value: "Next.js", label: "Full-Stack" },
                { value: "REST", label: "APIs" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-gradient-cyan-violet">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-mono tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Photo */}
          <motion.div
            variants={childVariants}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative">
              {/* Orbiting rings */}
              <div className="absolute -inset-12 rounded-full border border-border/20 animate-[spin_25s_linear_infinite]" />
              <div className="absolute -inset-20 rounded-full border border-border/10 animate-[spin_35s_linear_infinite_reverse]" />
              {/* Orbiting dots */}
              <div className="absolute -inset-12 animate-[spin_25s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-glow-cyan shadow-[0_0_10px_hsl(186_100%_50%/0.5)]" />
              </div>
              <div className="absolute -inset-20 animate-[spin_35s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-glow-violet shadow-[0_0_10px_hsl(270_100%_57%/0.5)]" />
              </div>

              {/* Glow behind */}
              <div className="absolute -inset-8 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.2), hsl(270 100% 57% / 0.1), transparent 70%)" }} />

              <div className="relative w-72 h-72 rounded-full overflow-hidden border-2 border-border/30">
                <img src={marufPhoto} alt="Maruf Hasan" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
