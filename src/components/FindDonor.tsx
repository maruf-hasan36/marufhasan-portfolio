import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Search, MapPin, Droplets, Phone, User } from "lucide-react";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const mockDonors = [
  { name: "Sarah Chen", type: "O+", city: "New York", distance: "2.3 km", available: true },
  { name: "Marcus Johnson", type: "A+", city: "Brooklyn", distance: "4.1 km", available: true },
  { name: "Aisha Patel", type: "B-", city: "Manhattan", distance: "5.7 km", available: true },
  { name: "James Wilson", type: "AB+", city: "Queens", distance: "7.2 km", available: false },
  { name: "Maria Garcia", type: "O-", city: "Bronx", distance: "8.5 km", available: true },
  { name: "David Kim", type: "A-", city: "Jersey City", distance: "10.1 km", available: true },
];

const FindDonor = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockDonors.filter((d) => {
    if (selectedType && d.type !== selectedType) return false;
    if (searchQuery && !d.city.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="find-donor" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-cyan) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-secondary uppercase mb-4 block">Search Network</span>
          <h2 className="heading-section mb-4">
            Find a <span className="text-gradient-red-cyan">Donor</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Search our global network of verified blood donors. Filter by blood type and location to find the perfect match instantly.
          </p>
        </motion.div>

        {/* Search controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass-panel rounded-2xl p-6 space-y-6">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by city or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all"
              />
            </div>

            {/* Blood type filter */}
            <div>
              <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">Blood Type</p>
              <div className="flex flex-wrap gap-2">
                {bloodTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground glow-red"
                        : "glass-panel-hover text-foreground hover:text-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filtered.map((donor, i) => (
            <motion.div
              key={donor.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              className="glass-panel-hover rounded-xl p-5 cursor-pointer group"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(var(--blood-red) / 0.1)" }}>
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{donor.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {donor.city}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  donor.available
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-muted text-muted-foreground border border-border"
                }`}>
                  {donor.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-sm">
                    <Droplets className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary">{donor.type}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{donor.distance}</span>
                </div>
                {donor.available && (
                  <button className="p-2 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "hsl(var(--blood-red) / 0.1)" }}>
                    <Phone className="w-4 h-4 text-primary" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindDonor;
