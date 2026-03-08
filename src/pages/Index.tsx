import SpaceScene from "@/components/SpaceScene";
import OrbitaScrollProgress from "@/components/OrbitaScrollProgress";
import OrbitaNavbar from "@/components/OrbitaNavbar";
import OrbitaHero from "@/components/OrbitaHero";
import ProductGrid from "@/components/ProductGrid";
import FitnessFeatures from "@/components/FitnessFeatures";
import AboutSection from "@/components/AboutSection";
import OrbitaFooter from "@/components/OrbitaFooter";
import CartSidebar from "@/components/CartSidebar";

const Index = () => (
  <div className="relative min-h-screen">
    <SpaceScene />
    <OrbitaScrollProgress />
    <OrbitaNavbar />
    <CartSidebar />
    <main className="relative z-10">
      <OrbitaHero />
      <ProductGrid />
      <FitnessFeatures />
      <AboutSection />
    </main>
    <OrbitaFooter />
  </div>
);

export default Index;
