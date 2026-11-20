import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 60, stiffness: 1000 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          !!target.closest("a, button, [onclick]") ||
          !!target.closest("[class*='cursor-pointer']"),
      );
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={`hidden desktop:block fixed top-3 left-3 w-2 h-2 rounded-full border-2 border-white pointer-events-none z-[2147483647] mix-blend-difference ${isPointer ? "bg-white" : ""}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isPointer ? 5 : 1,
        translateZ: 0,
      }}
      transition={{
        scale: { duration: 0.05 },
      }}
    />
  );
};

export default CustomCursor;
