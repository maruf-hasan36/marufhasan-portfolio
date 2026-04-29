import { motion, useInView } from "framer-motion";
import { useRef, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, Loader2, Mail, MapPin, MessageCircle, Linkedin, Github, Facebook } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

const AnimatedInput = forwardRef<HTMLInputElement, { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, error, ...props }, ref) => (
    <div className="relative group">
      <input
        ref={ref}
        {...props}
        placeholder=" "
        className="peer w-full bg-muted/30 border border-border rounded-xl py-4 px-4 text-foreground outline-none transition-all duration-300 focus:border-glow-cyan focus:bg-muted/50 text-sm"
      />
      <label className="absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-glow-cyan peer-focus:bg-background peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
        {label}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive mt-2 pl-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
);
AnimatedInput.displayName = "AnimatedInput";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
  };

  const info = [
    { icon: Mail, label: "Email", value: "marufhasanbr@gmail.com", href: "mailto:marufhasanbr@gmail.com" },
    { icon: MessageCircle, label: "WhatsApp", value: "+880 1935 921844", href: "https://wa.me/8801935921844" },
    { icon: Linkedin, label: "LinkedIn", value: "maruf-hasan-mh", href: "https://www.linkedin.com/in/maruf-hasan-mh" },
    { icon: Github, label: "GitHub", value: "maruf-hasan36", href: "https://github.com/maruf-hasan36" },
    { icon: Facebook, label: "Facebook", value: "Maruf Hasan", href: "https://facebook.com" },
    { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
  ];

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.3), transparent)" }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Contact</p>
          <h2 className="heading-section mb-4">
            Let's build something <span className="text-gradient-cyan-violet">together</span>
          </h2>
          <p className="body-large max-w-lg mx-auto">Have a project in mind? Let's create something extraordinary.</p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-10 max-w-4xl mx-auto">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-panel rounded-xl p-5 flex items-center gap-4 group hover:border-glow-cyan/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(186 100% 50% / 0.1)", border: "1px solid hsl(186 100% 50% / 0.2)" }}>
                  <Icon className="w-4 h-4 text-glow-cyan" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}

            {/* Decorative */}
            <div className="glass-panel rounded-xl p-5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, hsl(186 100% 50%) 1px, transparent 0)",
                  backgroundSize: "16px 16px",
                }} />
              <p className="text-sm text-muted-foreground italic relative">"Great things are done by a series of small things brought together."</p>
              <p className="text-xs text-muted-foreground/60 mt-2 relative">— Vincent Van Gogh</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass-panel rounded-2xl p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatedInput label="Name" {...register("name")} error={errors.name?.message} />
              <AnimatedInput label="Email" type="email" {...register("email")} error={errors.email?.message} />
            </div>

            <div className="relative group">
              <textarea
                {...register("message")}
                placeholder=" "
                rows={5}
                className="peer w-full bg-muted/30 border border-border rounded-xl py-4 px-4 text-foreground outline-none transition-all duration-300 focus:border-glow-cyan focus:bg-muted/50 text-sm resize-none"
              />
              <label className="absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-glow-cyan peer-focus:bg-background peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
                Message
              </label>
              {errors.message && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive mt-2 pl-1">
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsl(186 100% 50% / 0.2), hsl(270 100% 57% / 0.2))" }} />
              <span className="relative flex items-center gap-2">
                {status === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
                {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "success" && <><Check className="w-4 h-4" /> Message Sent!</>}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
