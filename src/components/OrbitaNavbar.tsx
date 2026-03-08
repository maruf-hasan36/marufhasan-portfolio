import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User, LogOut, Dumbbell } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Link } from "react-router-dom";

const OrbitaNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Gear", href: "/#products" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/#about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-panel py-3" : "py-5"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(0 85% 55%), hsl(30 100% 55%))" }}>
              <Dumbbell className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-wider text-foreground">
              FIT<span className="text-gradient-fire">VERSE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.isAdmin && (
                  <Link to="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Admin
                  </Link>
                )}
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <button onClick={logout} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <User className="w-4 h-4" /> Sign In
              </Link>
            )}

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-xl glass-panel-hover text-foreground"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, hsl(0 85% 55%), hsl(30 100% 55%))" }}
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setIsOpen(true)} className="relative p-2 text-foreground">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center bg-primary text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 glass-panel pt-24 px-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium text-foreground py-3 border-b border-border/30">
                  {link.label}
                </a>
              ))}
              {!isAuthenticated && (
                <Link to="/auth" onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium text-foreground py-3 border-b border-border/30">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrbitaNavbar;
