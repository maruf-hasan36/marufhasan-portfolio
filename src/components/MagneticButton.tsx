import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "glass";
  onClick?: () => void;
  href?: string;
}

const MagneticButton = ({ children, variant = "primary", onClick, href }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseClasses = "relative px-8 py-4 rounded-full text-base font-medium tracking-wide cursor-pointer transition-all duration-300 inline-flex items-center gap-2";

  const variantClasses = variant === "primary"
    ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_-5px_hsl(var(--glow-cyan)/0.5)]"
    : "glass-panel text-foreground hover:border-foreground/30";

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses}`}
      >
        {variant === "primary" && (
          <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, hsl(186 100% 50% / 0.2), hsl(270 100% 57% / 0.2))",
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Tag>
    </motion.div>
  );
};

export default MagneticButton;
