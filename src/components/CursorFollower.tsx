import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25 });
  const scale = useSpring(1, { stiffness: 400, damping: 20 });
  const opacity = useMotionValue(0);
  const hue = useSpring(186, { stiffness: 100, damping: 30 });

  const hoveredRef = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      opacity.set(1);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, .glass-panel-hover");
      if (interactive && !hoveredRef.current) {
        hoveredRef.current = true;
        scale.set(2.5);
        hue.set(270);
      } else if (!interactive && hoveredRef.current) {
        hoveredRef.current = false;
        scale.set(1);
        hue.set(186);
      }
    };

    const leave = () => { opacity.set(0); };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY, opacity, scale, hue]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          scale,
          opacity,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid hsl(186 100% 50% / 0.4)",
          background: "radial-gradient(circle, hsl(186 100% 50% / 0.08), transparent 70%)",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity,
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "hsl(186 100% 50%)",
        }}
      />
    </>
  );
};

export default CursorFollower;
