import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Search, UserPlus } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HemoHero = () => {
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
      {/* Background image overlay */}
      <div className="absolute inset-0 z-[1]">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, hsl(230 25% 5% / 0.7) 0%, hsl(230 25% 5% / 0.3) 40%, hsl(230 25% 5% / 0.8) 100%)"
        }} />
      </div>

      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-20"
          style={{ background: "radial-gradient(ellipse, hsl(345 100% 59% / 0.15), transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-15"
          style={{ background: "radial-gradient(circle, hsl(186 100% 50% / 0.1), transparent 70%)" }} />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="section-container relative z-10 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel mb-10">
            <span className="w-2.5 h-2.5 rounded-full bg-primary pulse-red" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Saving Lives Through Technology</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={childVariants} className="heading-display mb-4">
            Donate Blood.
          </motion.h1>
          <motion.h1 variants={childVariants} className="heading-display mb-8">
            <span className="text-gradient-red-cyan">Save Lives.</span>
          </motion.h1>

          <motion.p variants={childVariants} className="body-large max-w-2xl mx-auto mb-12">
            Connecting humanity through cutting-edge technology. Join the world's most advanced blood donation network and become part of something extraordinary.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="#find-donor"
              className="group relative px-10 py-5 rounded-full text-base font-semibold tracking-wide inline-flex items-center gap-3 overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, hsl(345 100% 59%), hsl(345 80% 45%))",
                boxShadow: "0 0 40px -5px hsl(345 100% 59% / 0.4)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
              <Search className="w-5 h-5 text-primary-foreground relative z-10" />
              <span className="text-primary-foreground relative z-10">Find Donor</span>
            </a>

            <a
              href="#become-donor"
              className="group px-10 py-5 rounded-full text-base font-semibold tracking-wide glass-panel-hover inline-flex items-center gap-3 text-foreground"
            >
              <UserPlus className="w-5 h-5" />
              Become Donor
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div variants={childVariants} className="flex gap-12 mt-16 justify-center flex-wrap">
            {[
              { value: "50K+", label: "Active Donors" },
              { value: "120K+", label: "Lives Saved" },
              { value: "500+", label: "Blood Banks" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient-red-cyan">{stat.value}</p>
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

export default HemoHero;
