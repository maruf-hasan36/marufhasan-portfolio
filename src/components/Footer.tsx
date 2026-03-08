import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Maruf Hasan. Crafted with precision.
      </p>
      <div className="flex items-center gap-4">
        {[
          { icon: Github, href: "#" },
          { icon: Linkedin, href: "#" },
          { icon: Twitter, href: "#" },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
