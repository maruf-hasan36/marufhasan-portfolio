import ParticleCanvas from "@/components/ParticleCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

const Index = () => (
  <div className="relative min-h-screen">
    <ParticleCanvas />
    <CursorFollower />
    <Navbar />
    <main className="relative z-10">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
