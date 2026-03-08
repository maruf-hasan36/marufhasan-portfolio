import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { items, removeFromCart, updateQuantity, total, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "hsl(232 30% 5% / 0.7)", backdropFilter: "blur(4px)" }}
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 glass-panel border-l border-border/30 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Your Cart</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <button onClick={() => setIsOpen(false)} className="mt-4 text-sm text-primary hover:text-primary/80 transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-3 rounded-xl bg-muted/20"
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground truncate">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.product.category}</p>
                      <p className="text-sm font-bold text-gradient-cyan-purple mt-1">${item.product.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center bg-muted/50 text-foreground hover:bg-muted transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-mono font-bold w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center bg-muted/50 text-foreground hover:bg-muted transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold text-gradient-cyan-purple">${total.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(186 100% 50%), hsl(270 100% 57%))",
                    boxShadow: "0 0 25px -5px hsl(186 100% 50% / 0.3)",
                  }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
