import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { fadeUp, slideInLeft, slideInRight, scaleIn, staggerContainer } from "@/lib/animations";

type AnimationType = "fadeUp" | "slideLeft" | "slideRight" | "scale" | "stagger";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
}

const animations = {
  fadeUp,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
  scale: scaleIn,
  stagger: staggerContainer,
};

const AnimatedSection = ({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  threshold = 0.2,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const selectedVariant = animations[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={selectedVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
