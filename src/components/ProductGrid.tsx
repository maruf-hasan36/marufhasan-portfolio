import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductModal from "./ProductModal";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

const ProductGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--signal-red) / 0.3), transparent)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-primary uppercase mb-4 block">Performance Gear</span>
          <h2 className="heading-section mb-4">
            The <span className="text-gradient-fire">Arsenal</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Precision-engineered equipment and AI-powered gear designed to push the boundaries of human performance.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground glow-red"
                  : "glass-panel-hover text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -12, rotateX: 3, rotateY: -2 }}
              className="glass-panel-hover rounded-2xl overflow-hidden group cursor-pointer"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                    className="p-3 rounded-xl glass-panel text-foreground hover:text-primary transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); if (product.inStock) addToCart(product); }}
                    className={`p-3 rounded-xl text-primary-foreground transition-colors ${
                      product.inStock ? "bg-primary hover:bg-primary/80" : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>

                {!product.inStock && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-muted/80 text-muted-foreground backdrop-blur-sm">
                    Sold Out
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest text-primary uppercase">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="text-xs text-muted-foreground">{product.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gradient-fire">${product.price}</span>
                  <div className="flex gap-1">
                    {product.features.slice(0, 2).map((f) => (
                      <span key={f} className="text-[9px] px-2 py-1 rounded-full bg-muted/50 text-muted-foreground font-mono">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
};

export default ProductGrid;
