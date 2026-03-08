import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const words = ["Scale", "AI", "React", "Node", "Next.js", "Cloud"];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">About</p>
            <h2 className="heading-section mb-6">
              Building the future,<br />
              <span className="text-gradient-cyan-violet">one line at a time.</span>
            </h2>
            <div className="space-y-4 body-large">
              <p>
                I'm a full-stack JavaScript engineer with a deep passion for creating 
                performant, beautiful, and intelligent web applications. My expertise 
                spans from crafting pixel-perfect UIs to designing robust backend architectures.
              </p>
              <p>
                I specialize in React, Next.js, Node.js, and modern cloud infrastructure. 
                Currently exploring the intersection of AI and web development to build 
                the next generation of digital experiences.
              </p>
            </div>
          </motion.div>

          {/* Floating word cloud */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-80 flex items-center justify-center"
          >
            {words.map((word, i) => (
              <motion.span
                key={word}
                className="absolute font-mono text-lg md:text-xl font-medium"
                style={{
                  color: i % 2 === 0 ? "hsl(186 100% 50%)" : "hsl(270 100% 57%)",
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, (i % 2 === 0 ? 5 : -5), 0],
                  rotate: [0, (i % 2 === 0 ? 3 : -3), 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                initial={{
                  top: `${15 + (i % 3) * 30}%`,
                  left: `${10 + (i % 2) * 25 + Math.floor(i / 2) * 15}%`,
                }}
              >
                {word}
              </motion.span>
            ))}
            {/* Decorative ring */}
            <div className="w-48 h-48 rounded-full border border-border/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-32 h-32 rounded-full border border-glow-cyan/20 animate-[spin_15s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
