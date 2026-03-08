import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import missionHeart from "@/assets/mission-heart.jpg";
import { Heart, Shield, Zap } from "lucide-react";

const Mission = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      icon: Heart,
      title: "Save Lives",
      desc: "Every donation can save up to three lives. Be the reason someone gets a second chance.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      desc: "State-of-the-art screening and matching technology ensures complete safety for donors and recipients.",
    },
    {
      icon: Zap,
      title: "Instant Match",
      desc: "Our AI-powered matching system connects donors with recipients in real-time, cutting response times by 80%.",
    },
  ];

  return (
    <section id="mission" className="relative py-32 overflow-hidden">
      {/* Section glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--blood-red) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img src={missionHeart} alt="Digital heart" className="w-full h-auto rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-2xl" style={{
                boxShadow: "inset 0 0 60px hsl(345 100% 59% / 0.1)"
              }} />
            </div>
            {/* Floating glow */}
            <div className="absolute -inset-4 rounded-3xl opacity-20 blur-3xl -z-10"
              style={{ background: "radial-gradient(circle, hsl(345 100% 59% / 0.3), transparent 70%)" }} />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs tracking-widest text-primary uppercase mb-4 block">Our Mission</span>
            <h2 className="heading-section mb-6">
              Connecting <span className="text-gradient-red-cyan">Humanity</span> Through Technology
            </h2>
            <p className="body-large mb-10">
              HEMOVERSE is building the world's most advanced blood donation ecosystem—powered by AI, driven by compassion, and designed to save millions of lives.
            </p>

            <div className="space-y-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  className="flex gap-4 p-4 rounded-xl glass-panel-hover group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--blood-red) / 0.1)", border: "1px solid hsl(var(--blood-red) / 0.2)" }}
                  >
                    <pillar.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
