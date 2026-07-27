import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export default function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ 
        repeat: Infinity, 
        repeatType: "reverse", 
        duration: 1.5, 
        ease: "easeInOut" 
      }}
      className={cn("bg-bg-surface-raised", className)}
      {...props as any}
    />
  );
}
