import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import marufPhoto from "@/assets/maruf-photo.png";

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

          {/* Photo with 3D tilt + glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <motion.div
              ref={imgRef}
              onMouseMove={handleMouse}
              onMouseLeave={handleLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative group cursor-default"
            >
              {/* Animated glow behind photo */}
              <motion.div
                className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{
                  background: useTransform(
                    [glowX, glowY],
                    ([gx, gy]) =>
                      `radial-gradient(circle at ${gx}% ${gy}%, hsl(186 100% 50% / 0.25), hsl(270 100% 57% / 0.15), transparent 70%)`
                  ),
                }}
              />

              {/* Border glow */}
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, hsl(186 100% 50% / 0.4), hsl(270 100% 57% / 0.4))",
                  padding: "1px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  borderRadius: "1rem",
                }}
              />

              <div className="relative overflow-hidden rounded-2xl" style={{ transform: "translateZ(40px)" }}>
                <img
                  src={marufPhoto}
                  alt="Maruf Hasan"
                  className="w-72 h-80 md:w-80 md:h-96 object-cover object-top"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
