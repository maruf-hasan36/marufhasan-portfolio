import { Dumbbell, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const OrbitaFooter = () => {
  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(0 85% 55%), hsl(30 100% 55%))" }}>
                <Dumbbell className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-wider text-foreground">
                FIT<span className="text-gradient-fire">VERSE</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The AI-powered fitness metaverse. Premium equipment, intelligent training, and precision nutrition in one immersive platform.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Platform</h4>
            <div className="space-y-2">
              {["Gear Shop", "AI Trainer", "Nutrition", "Programs"].map((link) => (
                <a key={link} href="#products" className="block text-sm text-foreground/70 hover:text-primary transition-colors">{link}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Account</h4>
            <div className="space-y-2">
              {["Sign In", "Register", "My Programs", "Order History"].map((link) => (
                <Link key={link} to={link === "Sign In" || link === "Register" ? "/auth" : "#"}
                  className="block text-sm text-foreground/70 hover:text-primary transition-colors">{link}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} FITVERSE PRO. All rights reserved.</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Powered by <Zap className="w-3 h-3 text-primary" /> AI Fitness Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default OrbitaFooter;
