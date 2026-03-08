import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const OrbitaFooter = () => {
  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(186 100% 50%), hsl(270 100% 57%))" }}>
                <span className="text-[10px] font-bold text-background">O</span>
              </div>
              <span className="text-xl font-bold tracking-wider text-foreground">
                ORBI<span className="text-gradient-cyan-purple">TA</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The future of digital commerce. Premium technology products in an immersive 3D shopping experience.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Platform</h4>
            <div className="space-y-2">
              {["Store", "Categories", "Featured", "New Arrivals"].map((link) => (
                <a key={link} href="#products" className="block text-sm text-foreground/70 hover:text-primary transition-colors">{link}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Account</h4>
            <div className="space-y-2">
              {["Sign In", "Register", "Orders", "Wishlist"].map((link) => (
                <Link key={link} to={link === "Sign In" || link === "Register" ? "/auth" : "#"}
                  className="block text-sm text-foreground/70 hover:text-primary transition-colors">{link}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} ORBITA. All rights reserved.</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Powered by <Sparkles className="w-3 h-3 text-primary" /> AI Commerce
          </p>
        </div>
      </div>
    </footer>
  );
};

export default OrbitaFooter;
