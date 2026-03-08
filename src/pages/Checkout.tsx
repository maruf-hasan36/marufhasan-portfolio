import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, CheckCircle, Loader2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OrbitaNavbar from "@/components/OrbitaNavbar";
import CartSidebar from "@/components/CartSidebar";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  cardNumber: z.string().min(16, "Invalid card number").max(19),
  expiry: z.string().min(5, "MM/YY format"),
  cvv: z.string().min(3).max(4),
});

type CheckoutData = z.infer<typeof schema>;

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [state, setState] = useState<"form" | "loading" | "success">("form");
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    setState("loading");
    await new Promise((r) => setTimeout(r, 2500));
    clearCart();
    setState("success");
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

  if (items.length === 0 && state !== "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <OrbitaNavbar />
        <CartSidebar />
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Link to="/" className="text-primary hover:text-primary/80">Back to Store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <OrbitaNavbar />
      <CartSidebar />

      <div className="relative z-10 section-container pt-28 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        {state === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 max-w-md mx-auto"
          >
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">Your order has been placed successfully. Thank you for shopping with ORBITA.</p>
            <Link to="/" className="inline-flex px-8 py-3 rounded-xl font-semibold text-primary-foreground"
              style={{ background: "linear-gradient(135deg, hsl(186 100% 50%), hsl(270 100% 57%))" }}>
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-2xl p-8"
            >
              <h1 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" /> Checkout
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <h3 className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4">Contact</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input {...register("name")} placeholder="Full Name" className={inputClasses} />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register("email")} placeholder="Email" className={inputClasses} />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4">Shipping</h3>
                  <div className="space-y-4">
                    <div>
                      <input {...register("address")} placeholder="Address" className={inputClasses} />
                      {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                      <input {...register("city")} placeholder="City" className={inputClasses} />
                      {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Payment
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <input {...register("cardNumber")} placeholder="Card Number" className={inputClasses} />
                      {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input {...register("expiry")} placeholder="MM/YY" className={inputClasses} />
                        {errors.expiry && <p className="text-xs text-destructive mt-1">{errors.expiry.message}</p>}
                      </div>
                      <div>
                        <input {...register("cvv")} placeholder="CVV" className={inputClasses} />
                        {errors.cvv && <p className="text-xs text-destructive mt-1">{errors.cvv.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full py-4 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, hsl(186 100% 50%), hsl(270 100% 57%))" }}
                >
                  {state === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay $${total.toFixed(2)}`}
                </button>
              </form>
            </motion.div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-2xl p-6 h-fit sticky top-28"
            >
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/30 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span><span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span><span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border/30">
                  <span>Total</span><span className="text-gradient-cyan-purple">${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
