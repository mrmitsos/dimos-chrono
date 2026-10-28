import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left bg-primary dark:bg-primaryDark z-50"
    />
  );
};

export default ReadingProgress;
