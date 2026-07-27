import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2800); // slightly longer for dramatic effect
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
      className="min-h-screen flex flex-col items-center justify-center bg-bg-base relative overflow-hidden"
    >
      {/* Cinematic Ambient Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-green/20 rounded-full blur-[100px] pointer-events-none"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center relative z-10"
      >
        <motion.div  className="flex items-center justify-center gap-1 mb-2 text-5xl font-black tracking-tighter bg-bg-base">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-primary"
          >
            M
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.5 }}
            className="text-accent-green"
          >
            2
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-text-primary"
          >
            ZION
          </motion.span>
        </motion.div>
        <motion.span 
          initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          className="text-text-secondary font-serif italic text-2xl tracking-[0.2em]"
        >
          Salons
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
