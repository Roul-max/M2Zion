import { motion, HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export default function PageTransition({ children, className, ...props }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
