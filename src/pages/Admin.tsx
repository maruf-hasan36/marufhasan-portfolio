import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Navigate, Link } from "react-router-dom";
import { products as initialProducts, type Product } from "@/lib/products";
import { ArrowLeft, Plus, Pencil, Trash2, Package, BarChart3, ShoppingCart } from "lucide-react";
import OrbitaNavbar from "@/components/OrbitaNavbar";
import CartSidebar from "@/components/CartSidebar";

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<"products" | "analytics">("products");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditPrice(String(p.price));
  };

  const saveEdit = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => p.id === id ? { ...p, name: editName, price: Number(editPrice) } : p)
    );
    setEditingId(null);
  };

  const deleteProduct = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  const analytics = [
    { label: "Total Revenue", value: "$284,500", icon: BarChart3 },
    { label: "Orders Today", value: "127", icon: ShoppingCart },
    { label: "Products", value: String(productList.length), icon: Package },
  ];

  const inputClasses = "px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background relative">
      <OrbitaNavbar />
      <CartSidebar />

      <div className="relative z-10 section-container pt-28 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your ORBITA store</p>

          {/* Analytics cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {analytics.map((a) => (
              <div key={a.label} className="glass-panel rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "hsl(var(--electric-cyan) / 0.1)" }}>
                  <a.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{a.value}</p>
                  <p className="text-xs text-muted-foreground font-mono">{a.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-muted/20 w-fit mb-8">
            {(["products", "analytics"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "products" ? "Products" : "Analytics"}
              </button>
            ))}
          </div>

          {activeTab === "products" ? (
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-border/30 flex items-center justify-between">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Product Management
                </h2>
              </div>

              <div className="divide-y divide-border/20">
                {productList.map((product) => (
                  <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-muted/10 transition-colors">
                    <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />

                    {editingId === product.id ? (
                      <div className="flex-1 flex items-center gap-3">
                        <input value={editName} onChange={(e) => setEditName(e.target.value)} className={`${inputClasses} flex-1`} />
                        <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className={`${inputClasses} w-24`} type="number" />
                        <button onClick={() => saveEdit(product.id)} className="px-4 py-2 rounded-lg text-xs font-semibold text-primary-foreground"
                          style={{ background: "linear-gradient(135deg, hsl(186 100% 50%), hsl(270 100% 57%))" }}>
                          Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground glass-panel">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                        <span className="text-sm font-bold text-gradient-cyan-purple">${product.price}</span>
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                          product.inStock
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}>
                          {product.inStock ? "In Stock" : "Out"}
                        </span>
                        <div className="flex gap-1">
                          <button onClick={() => startEdit(product)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-8">
              <h2 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> Sales Analytics
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Audio", pct: 42, color: "hsl(186 100% 50%)" },
                  { label: "Wearables", pct: 28, color: "hsl(270 100% 57%)" },
                  { label: "AR/VR", pct: 18, color: "hsl(186 80% 40%)" },
                  { label: "Gaming", pct: 8, color: "hsl(270 80% 45%)" },
                  { label: "Drones", pct: 4, color: "hsl(186 60% 35%)" },
                ].map((cat) => (
                  <div key={cat.label} className="flex items-center gap-4">
                    <span className="text-sm font-mono w-20 text-muted-foreground">{cat.label}</span>
                    <div className="flex-1 h-8 rounded-lg overflow-hidden bg-muted/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.pct}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-lg flex items-center justify-end pr-2"
                        style={{ background: cat.color }}
                      >
                        <span className="text-xs font-bold text-primary-foreground">{cat.pct}%</span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
