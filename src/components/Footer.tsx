import { Github, Linkedin, Facebook, MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="relative py-16 border-t border-border/50">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
      style={{ background: "linear-gradient(90deg, transparent, hsl(186 100% 50% / 0.2), transparent)" }} />

    <div className="section-container">
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <a href="#" className="font-bold text-2xl tracking-tight">
            <span className="text-gradient-cyan-violet">MH</span>
          </a>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            Full-stack engineer crafting intelligent, scalable web products.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">Quick Links</p>
          <div className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">Connect</p>
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/maruf-hasan36", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/maruf-hasan-mh", label: "LinkedIn" },
              { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              { icon: MessageCircle, href: "https://wa.me/8801935921844", label: "WhatsApp" },
              { icon: Mail, href: "mailto:marufhasanbr@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-lg flex items-center justify-center glass-panel text-muted-foreground hover:text-foreground hover:border-glow-cyan/20 transition-colors duration-300"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 pt-8 flex items-center justify-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Maruf Hasan. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
