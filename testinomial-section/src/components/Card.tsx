import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface MarqueeProps {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  skew?: boolean;
}

export default function Marquee({
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 5,
  skew = false,
}: MarqueeProps) {
  const marqueeClass = `group flex    p-2 gap-4  ${
    vertical ? "flex-col" : "flex-row"
  } ${skew ? "skew-x-[30deg]" : ""} `;
  const itemClass = `flex gap-4  ${vertical ? "flex-col" : "flex-row"} ${
    reverse ? "reverse" : ""
  }`;

  const animationControls = useAnimation();

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      animationControls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      animationControls.start("animate");
    }
  };

  const marqueeVariants = {
    animate: {
      x: vertical ? 0 : reverse ? ["-100%", "0%"] : ["0%", "-100%"],
      y: vertical ? (reverse ? ["-100%", "0%"] : ["0%", "-100%"]) : 0,
      transition: {
        x: { duration: 20, repeat: Infinity, ease: "linear" },
        y: { duration: 20, repeat: Infinity, ease: "linear" },
      },
    },
  };

  useEffect(() => {
    animationControls.start("animate");
  }, [animationControls, reverse]);

  return (
    <div
      className={marqueeClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <motion.div
          key={i}
          className={itemClass}
          animate={animationControls}
          variants={marqueeVariants}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}
