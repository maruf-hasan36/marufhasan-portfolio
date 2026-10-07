import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";
import { ChevronDown } from "lucide-react";
import marufPhoto from "@/assets/maruf-photo.webp";
import reactIcon from "@/assets/skill-icons/react.svg";
import nextIcon from "@/assets/skill-icons/nextdotjs.svg";
import nodeIcon from "@/assets/skill-icons/nodedotjs.svg";
import mongoIcon from "@/assets/skill-icons/mongodb.svg";

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
    <section className="relative min-h-[min(700px,88svh)] flex items-center justify-center overflow-hidden pt-24 pb-10">
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
           className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
              <span className="font-mono text-xs tracking-wider text-muted-foreground">Available for work</span>
            </motion.div>

            <motion.h1 variants={childVariants} className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 leading-[1.08]">
              Hi, I'm<br />
              <span className="font-bold text-gradient-cyan-violet">Maruf Hasan</span>
            </motion.h1>

            <motion.div variants={childVariants} className="min-h-10 md:min-h-12 mb-4 flex items-center justify-center lg:justify-start">
              <h2 className="text-lg md:text-2xl font-medium text-foreground/80">
                {displayText}
                <span className="inline-block w-[3px] h-[1.1em] bg-glow-cyan ml-1 animate-pulse-glow align-middle" />
              </h2>
            </motion.div>

            <motion.p variants={childVariants} className="body-large max-w-xl mb-7">
              I build modern, scalable, and user-friendly web applications using MongoDB, Express.js, React, and Node.js — turning ideas into real-world digital solutions through clean and efficient code.
            </motion.p>

            <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <MagneticButton variant="primary" href="#projects">
                View Projects
              </MagneticButton>
              <MagneticButton variant="glass" href="#contact">
                Contact Me
              </MagneticButton>
            </motion.div>

             {/* Core stack */}
             <motion.div variants={childVariants} className="flex flex-wrap gap-2 mt-7 justify-center lg:justify-start" aria-label="Core technology stack">
               {[
                 { label: "React", icon: reactIcon },
                 { label: "Next.js", icon: nextIcon },
                 { label: "Node.js", icon: nodeIcon },
                 { label: "MongoDB", icon: mongoIcon },
               ].map((tech) => (
                 <div key={tech.label} className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/40 px-3 py-2 backdrop-blur-sm">
                   <img src={tech.icon} alt="" aria-hidden width={16} height={16} className="h-4 w-4 object-contain" />
                   <span className="font-mono text-xs font-medium text-foreground/90">{tech.label}</span>
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

               <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-border/30">
                 <img src={marufPhoto} alt="Maruf Hasan, MERN stack developer in Dhaka" width={544} height={800} fetchPriority="high" decoding="async" className="w-full h-full object-cover object-top" />
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
