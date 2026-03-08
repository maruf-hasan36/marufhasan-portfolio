import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import OrbitaNavbar from "@/components/OrbitaNavbar";
import CartSidebar from "@/components/CartSidebar";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const onLogin = (data: LoginData) => {
    login(data.email, data.password);
    navigate("/");
  };

  const onRegister = (data: RegisterData) => {
    registerUser(data.name, data.email, data.password);
    navigate("/");
  };

  const inputClasses = "w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

  return (
    <div className="min-h-screen bg-background relative">
      <OrbitaNavbar />
      <CartSidebar />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-15"
          style={{ background: "radial-gradient(ellipse, hsl(0 85% 55% / 0.15), transparent 70%)" }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(0 85% 55%), transparent)" }} />

          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to FITVERSE
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(0 85% 55%), hsl(30 100% 55%))" }}>
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{mode === "login" ? "Welcome Back" : "Join FITVERSE"}</h1>
              <p className="text-xs text-muted-foreground">{mode === "login" ? "Sign in to your account" : "Create a new account"}</p>
            </div>
          </div>

          <div className="flex gap-1 p-1 rounded-xl bg-muted/30 mb-8">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {mode === "login" ? (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input {...loginForm.register("email")} placeholder="Email address" className={inputClasses} />
              </div>
              {loginForm.formState.errors.email && <p className="text-xs text-destructive">{loginForm.formState.errors.email.message}</p>}

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input {...loginForm.register("password")} type="password" placeholder="Password" className={inputClasses} />
              </div>
              {loginForm.formState.errors.password && <p className="text-xs text-destructive">{loginForm.formState.errors.password.message}</p>}

              <button type="submit" className="w-full py-4 rounded-xl font-semibold text-primary-foreground"
                style={{ background: "linear-gradient(135deg, hsl(0 85% 55%), hsl(30 100% 55%))" }}>
                Sign In
              </button>

              <p className="text-xs text-center text-muted-foreground">
                Admin: <span className="text-primary">marufhasanbr@gmail.com</span> / <span className="text-primary">maruf123</span>
              </p>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input {...registerForm.register("name")} placeholder="Full name" className={inputClasses} />
              </div>
              {registerForm.formState.errors.name && <p className="text-xs text-destructive">{registerForm.formState.errors.name.message}</p>}

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input {...registerForm.register("email")} placeholder="Email address" className={inputClasses} />
              </div>
              {registerForm.formState.errors.email && <p className="text-xs text-destructive">{registerForm.formState.errors.email.message}</p>}

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input {...registerForm.register("password")} type="password" placeholder="Password (min 6 chars)" className={inputClasses} />
              </div>
              {registerForm.formState.errors.password && <p className="text-xs text-destructive">{registerForm.formState.errors.password.message}</p>}

              <button type="submit" className="w-full py-4 rounded-xl font-semibold text-primary-foreground"
                style={{ background: "linear-gradient(135deg, hsl(0 85% 55%), hsl(30 100% 55%))" }}>
                Create Account
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
