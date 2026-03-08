import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

const AnimatedInput = ({
  label, error, ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative group">
    <input
      {...props}
      placeholder=" "
      className="peer w-full bg-transparent border-b border-border py-3 px-1 text-foreground outline-none transition-colors focus:border-glow-cyan text-sm"
    />
    <label className="absolute left-1 top-3 text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-3 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-glow-cyan peer-[:not(:placeholder-shown)]:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
      {label}
    </label>
    <div className="absolute bottom-0 left-1/2 w-0 h-px bg-glow-cyan transition-all duration-300 peer-focus:w-full peer-focus:left-0" />
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);

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

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="section-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-glow-cyan mb-4">Contact</p>
          <h2 className="heading-section">
            Let's build something <span className="text-gradient-cyan-violet">together</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-panel rounded-2xl p-8 md:p-12 space-y-8"
        >
          <AnimatedInput label="Name" {...register("name")} error={errors.name?.message} />
          <AnimatedInput label="Email" type="email" {...register("email")} error={errors.email?.message} />

          <div className="relative group">
            <textarea
              {...register("message")}
              placeholder=" "
              rows={4}
              className="peer w-full bg-transparent border-b border-border py-3 px-1 text-foreground outline-none transition-colors focus:border-glow-cyan text-sm resize-none"
            />
            <label className="absolute left-1 top-3 text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-3 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-glow-cyan peer-[:not(:placeholder-shown)]:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
              Message
            </label>
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="w-full py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:shadow-[0_0_40px_-5px_hsl(var(--glow-cyan)/0.5)] transition-all duration-300 disabled:opacity-70"
          >
            {status === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
            {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === "success" && <><Check className="w-4 h-4" /> Sent!</>}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
