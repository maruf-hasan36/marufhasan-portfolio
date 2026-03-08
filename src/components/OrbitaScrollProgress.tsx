import { motion, useScroll, useSpring } from "framer-motion";

const OrbitaScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(186 100% 50%), hsl(270 100% 57%))",
        boxShadow: "0 0 10px hsl(186 100% 50% / 0.5)",
      }}
    />
  );
};

export default OrbitaScrollProgress;
