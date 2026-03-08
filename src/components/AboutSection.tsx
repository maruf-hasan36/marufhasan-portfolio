import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Truck, Shield, Headphones } from "lucide-react";

const features = [
  { icon: Cpu, title: "AI-Powered Search", desc: "Find exactly what you need with intelligent product recommendations." },
  { icon: Truck, title: "Quantum Delivery", desc: "Same-day delivery powered by our orbital logistics network." },
  { icon: Shield, title: "Secure Payments", desc: "End-to-end encrypted transactions with zero-knowledge proof." },
  { icon: Headphones, title: "24/7 Support", desc: "AI-assisted customer support available around the clock." },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-purple) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-secondary uppercase mb-4 block">Why ORBITA</span>
          <h2 className="heading-section mb-4">
            Built for the <span className="text-gradient-cyan-purple">Future</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Every feature is designed to deliver the most advanced shopping experience in the digital universe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="glass-panel-hover rounded-2xl p-6 text-center group"
              style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            >
              <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "hsl(var(--electric-cyan) / 0.1)", border: "1px solid hsl(var(--electric-cyan) / 0.2)" }}>
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
