import ParticleCanvas from "@/components/ParticleCanvas";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import ChatBot from "@/components/ChatBot";

const Index = () => (
  <div className="relative min-h-screen">
    <ParticleCanvas />
    <ScrollProgress />
    <CursorFollower />
    <Navbar />
    <main className="relative z-10">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Certificates />
      
      <Contact />
    </main>
    <Footer />
    <ChatBot />
  </div>
);

export default Index;
