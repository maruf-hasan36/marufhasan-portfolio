import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { UserPlus, Heart, CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  bloodType: z.string().min(1, "Please select your blood type"),
  city: z.string().min(2, "City is required"),
});

type FormData = z.infer<typeof schema>;

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BecomeDonor = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    setSubmitState("loading");
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitState("success");
  };

  return (
    <section id="become-donor" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--blood-red) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs tracking-widest text-primary uppercase mb-4 block">Join Us</span>
            <h2 className="heading-section mb-6">
              Become a <span className="text-gradient-red-cyan">Donor</span>
            </h2>
            <p className="body-large mb-10">
              Register in under 2 minutes. Join 50,000+ donors saving lives worldwide. Your blood type could be the one someone desperately needs.
            </p>

            <div className="space-y-4">
              {[
                { icon: "🩸", text: "Quick health pre-screening" },
                { icon: "📍", text: "Location-based matching" },
                { icon: "🔔", text: "Real-time emergency alerts" },
                { icon: "🏆", text: "Earn community hero badges" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-foreground/80">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
              {/* Glow accent */}
              <div className="absolute -top-20 -right-20 w-40 h-40 opacity-20 blur-3xl"
                style={{ background: "radial-gradient(circle, hsl(345 100% 59%), transparent)" }} />

              {submitState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Welcome, Hero!</h3>
                  <p className="text-muted-foreground">You're now part of the HEMOVERSE donor network.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "hsl(var(--blood-red) / 0.1)" }}>
                      <UserPlus className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Donor Registration</h3>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1.5 block">Full Name</label>
                    <input
                      {...register("fullName")}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="text-xs text-primary mt-1">{errors.fullName.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1.5 block">Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-xs text-primary mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone & Blood Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1.5 block">Phone</label>
                      <input
                        {...register("phone")}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="+1 234 567"
                      />
                      {errors.phone && <p className="text-xs text-primary mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1.5 block">Blood Type</label>
                      <select
                        {...register("bloodType")}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      >
                        <option value="">Select</option>
                        {bloodTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.bloodType && <p className="text-xs text-primary mt-1">{errors.bloodType.message}</p>}
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1.5 block">City</label>
                    <input
                      {...register("city")}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="Your city"
                    />
                    {errors.city && <p className="text-xs text-primary mt-1">{errors.city.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitState === "loading"}
                    className="w-full py-4 rounded-xl font-semibold text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, hsl(345 100% 59%), hsl(345 80% 45%))",
                      boxShadow: "0 0 30px -5px hsl(345 100% 59% / 0.3)",
                    }}
                  >
                    {submitState === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        Register as Donor
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BecomeDonor;
