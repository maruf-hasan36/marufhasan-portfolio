import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.15), transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(270 100% 57% / 0.12), transparent 70%)" }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-container text-center relative z-10"
      >
        <motion.p variants={childVariants} className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
          Portfolio / 2024
        </motion.p>

        <motion.h1 variants={childVariants} className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4">
          Hi, I'm <span className="font-semibold">Maruf Hasan</span>
        </motion.h1>

        <motion.h2 variants={childVariants} className="text-2xl md:text-4xl lg:text-5xl font-medium text-gradient-cyan-violet mb-8">
          Full Stack JavaScript Engineer
        </motion.h2>

        <motion.p variants={childVariants} className="body-large max-w-2xl mx-auto mb-12">
          I build intelligent and scalable web products that push the boundaries of what's possible on the modern web.
        </motion.p>

        <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton variant="primary" href="#projects">
            View Projects
          </MagneticButton>
          <MagneticButton variant="glass" href="#contact">
            Contact Me
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={childVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
