import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Droplets, Star } from "lucide-react";

const heroes = [
  { name: "Dr. Amara Singh", donations: 52, type: "O-", badge: "Platinum", avatar: "AS", streak: 24 },
  { name: "Carlos Rivera", donations: 41, type: "A+", badge: "Gold", avatar: "CR", streak: 18 },
  { name: "Yuki Tanaka", donations: 38, type: "B+", badge: "Gold", avatar: "YT", streak: 15 },
  { name: "Elena Volkov", donations: 35, type: "AB-", badge: "Gold", avatar: "EV", streak: 12 },
  { name: "Michael Okafor", donations: 29, type: "O+", badge: "Silver", avatar: "MO", streak: 10 },
  { name: "Sophie Laurent", donations: 25, type: "A-", badge: "Silver", avatar: "SL", streak: 8 },
];

const badgeColors: Record<string, { bg: string; border: string; text: string }> = {
  Platinum: { bg: "hsl(186 100% 50% / 0.1)", border: "hsl(186 100% 50% / 0.3)", text: "text-secondary" },
  Gold: { bg: "hsl(45 100% 50% / 0.1)", border: "hsl(45 100% 50% / 0.3)", text: "text-yellow-400" },
  Silver: { bg: "hsl(0 0% 70% / 0.1)", border: "hsl(0 0% 70% / 0.3)", text: "text-gray-300" },
};

const CommunityHeroes = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="heroes" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--blood-red) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-primary uppercase mb-4 block">Community</span>
          <h2 className="heading-section mb-4">
            Our <span className="text-gradient-red-cyan">Heroes</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Celebrating the extraordinary individuals who make HEMOVERSE possible. These donors have saved countless lives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {heroes.map((hero, i) => {
            const badge = badgeColors[hero.badge];
            return (
              <motion.div
                key={hero.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -10, rotateY: 3, rotateX: 3 }}
                className="glass-panel-hover rounded-2xl p-6 group relative overflow-hidden"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, hsl(345 100% 59%), transparent)" }} />

                <div className="flex items-center gap-4 mb-5">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-primary-foreground shrink-0"
                    style={{ background: "linear-gradient(135deg, hsl(345 100% 59%), hsl(345 80% 45%))" }}>
                    {hero.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{hero.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${badge.text}`}
                      style={{ background: badge.bg, border: `1px solid ${badge.border}` }}>
                      <Award className="w-3 h-3" /> {hero.badge}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-xl bg-muted/30">
                    <Droplets className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{hero.donations}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">Donations</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-muted/30">
                    <span className="text-lg font-bold text-primary block">{hero.type}</span>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Blood Type</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-muted/30">
                    <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{hero.streak}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">Streak</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityHeroes;
