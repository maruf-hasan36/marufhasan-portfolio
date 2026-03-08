import { Heart } from "lucide-react";

const HemoFooter = () => {
  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary heartbeat" />
              <span className="text-xl font-bold tracking-wider text-foreground">
                HEMO<span className="text-gradient-red-cyan">VERSE</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The world's most advanced blood donation ecosystem. Connecting humanity through technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Platform</h4>
            <div className="space-y-2">
              {["Find Donor", "Become Donor", "Emergency Requests", "Impact Stats", "Community Heroes"].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-sm text-foreground/70 hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Legal</h4>
            <div className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Data Protection", "Accessibility"].map((link) => (
                <a key={link} href="#" className="block text-sm text-foreground/70 hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} HEMOVERSE. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with <Heart className="w-3 h-3 text-primary inline mx-1" /> for humanity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HemoFooter;
