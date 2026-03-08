import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import marufPhoto from "@/assets/maruf-photo.png";

const stats = [
  { value: 50, suffix: "+", label: "Open Source Contributions" },
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

const AnimatedCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span>{count}{suffix}</span>;
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const imgRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-150, 150], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-12, 12]), { stiffness: 200, damping: 20 });
  const glowX = useSpring(useTransform(x, [-150, 150], [20, 80]), { stiffness: 200, damping: 20 });
  const glowY = useSpring(useTransform(y, [-150, 150], [20, 80]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      {/* Section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center order-2 md:order-1"
          >
            <motion.div
              ref={imgRef}
              onMouseMove={handleMouse}
              onMouseLeave={handleLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative group cursor-default"
            >
              <motion.div
                className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
                style={{
                  background: useTransform(
                    [glowX, glowY],
                    ([gx, gy]) =>
                      `radial-gradient(circle at ${gx}% ${gy}%, hsl(186 100% 50% / 0.25), hsl(270 100% 57% / 0.15), transparent 70%)`
                  ),
                }}
              />

              {/* Gradient border */}
              <div className="relative p-[2px] rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(186 100% 50% / 0.3), hsl(270 100% 57% / 0.3), hsl(186 100% 50% / 0.1))",
                }}>
                <div className="rounded-3xl overflow-hidden bg-background" style={{ transform: "translateZ(40px)" }}>
                  <img
                    src={marufPhoto}
                    alt="Maruf Hasan"
                    className="w-72 h-80 md:w-80 md:h-[28rem] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  
                  {/* Floating badge on photo */}
                  <motion.div
                    className="absolute bottom-6 left-6 right-6 glass-panel rounded-xl p-4"
                    style={{ transform: "translateZ(60px)" }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="text-xs font-mono text-glow-cyan tracking-wider">STATUS</p>
                    <p className="text-sm font-medium text-foreground mt-1">Building the next big thing ✨</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2"
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

            {/* Stats counters */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-gradient-cyan-violet">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
