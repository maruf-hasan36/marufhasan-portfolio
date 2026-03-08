import { motion } from "framer-motion";
import { X, ShoppingCart, Star, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: Props) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "hsl(232 30% 5% / 0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel rounded-3xl max-w-3xl w-full overflow-hidden relative"
        style={{ perspective: "1000px" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full glass-panel text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-72 md:h-full">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent md:hidden" />
          </div>

          {/* Details */}
          <div className="p-8">
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase">{product.category}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">{product.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating})</span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground/80">{f}</span>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gradient-cyan-purple">${product.price}</span>
              <button
                onClick={() => { if (product.inStock) addToCart(product); }}
                disabled={!product.inStock}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ${
                  product.inStock
                    ? "text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
                style={product.inStock ? {
                  background: "linear-gradient(135deg, hsl(186 100% 50%), hsl(270 100% 57%))",
                  boxShadow: "0 0 25px -5px hsl(186 100% 50% / 0.3)",
                } : {}}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
