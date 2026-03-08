import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AlertTriangle, Clock, MapPin, Droplets, X } from "lucide-react";
import emergencyBg from "@/assets/emergency-bg.jpg";

const emergencyRequests = [
  {
    id: 1,
    patient: "Patient #4821",
    bloodType: "O-",
    hospital: "Metro General Hospital",
    city: "New York, NY",
    urgency: "critical",
    units: 4,
    timeLeft: "2 hours",
    details: "Emergency surgery patient. Universal donor blood desperately needed. 4 units required within 2 hours.",
  },
  {
    id: 2,
    patient: "Patient #3195",
    bloodType: "AB+",
    hospital: "City Medical Center",
    city: "Los Angeles, CA",
    urgency: "high",
    units: 2,
    timeLeft: "6 hours",
    details: "Post-accident transfusion required. AB+ donors in LA area urgently needed.",
  },
  {
    id: 3,
    patient: "Patient #7723",
    bloodType: "B-",
    hospital: "St. Joseph's Hospital",
    city: "Chicago, IL",
    urgency: "critical",
    units: 3,
    timeLeft: "1.5 hours",
    details: "Pediatric emergency. B- blood extremely rare and needed immediately.",
  },
  {
    id: 4,
    patient: "Patient #5540",
    bloodType: "A+",
    hospital: "University Hospital",
    city: "Houston, TX",
    urgency: "moderate",
    units: 2,
    timeLeft: "12 hours",
    details: "Scheduled surgical procedure. A+ blood units needed for standby.",
  },
];

const EmergencyRequests = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const urgencyColors = {
    critical: { bg: "hsl(345 100% 59% / 0.15)", border: "hsl(345 100% 59% / 0.4)", text: "text-primary" },
    high: { bg: "hsl(30 100% 50% / 0.15)", border: "hsl(30 100% 50% / 0.4)", text: "text-orange-400" },
    moderate: { bg: "hsl(50 100% 50% / 0.15)", border: "hsl(50 100% 50% / 0.4)", text: "text-yellow-400" },
  };

  const selected = emergencyRequests.find((r) => r.id === selectedId);

  return (
    <section id="emergency" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10 z-0">
        <img src={emergencyBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--blood-red) / 0.5), transparent)" }} />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "hsl(345 100% 59% / 0.1)", border: "1px solid hsl(345 100% 59% / 0.3)" }}>
            <AlertTriangle className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-primary uppercase">Live Emergency Feed</span>
          </div>
          <h2 className="heading-section mb-4">
            Emergency <span className="text-gradient-red-cyan">Requests</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Real-time urgent blood requests from hospitals in your network. Every second counts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {emergencyRequests.map((req, i) => {
            const colors = urgencyColors[req.urgency as keyof typeof urgencyColors];
            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedId(req.id)}
                className={`glass-panel rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                  req.urgency === "critical" ? "pulse-red" : ""
                }`}
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${colors.text}`}
                        style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                        {req.urgency}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{req.patient}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{req.hospital}</h3>
                  </div>
                  <span className="text-2xl font-bold text-primary">{req.bloodType}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.city}</span>
                  <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> {req.units} units</span>
                  <span className="flex items-center gap-1 text-primary"><Clock className="w-3 h-3" /> {req.timeLeft}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "hsl(230 25% 5% / 0.8)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-2xl p-8 max-w-md w-full relative"
            >
              <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selected.hospital}</h3>
                  <p className="text-sm text-muted-foreground">{selected.patient}</p>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="text-center p-4 rounded-xl flex-1" style={{ background: "hsl(var(--blood-red) / 0.1)" }}>
                  <p className="text-3xl font-bold text-primary">{selected.bloodType}</p>
                  <p className="text-xs text-muted-foreground mt-1">Blood Type</p>
                </div>
                <div className="text-center p-4 rounded-xl flex-1" style={{ background: "hsl(var(--blood-red) / 0.1)" }}>
                  <p className="text-3xl font-bold text-primary">{selected.units}</p>
                  <p className="text-xs text-muted-foreground mt-1">Units Needed</p>
                </div>
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed mb-6">{selected.details}</p>

              <button
                className="w-full py-4 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, hsl(345 100% 59%), hsl(345 80% 45%))" }}
              >
                <Droplets className="w-5 h-5" />
                Respond to Request
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EmergencyRequests;
