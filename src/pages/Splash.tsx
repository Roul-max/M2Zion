import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ backgroundColor: "#000000" }}
      className="min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", display: "inline-block" }}
      >
        {/* M2 + ZION row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "22px", lineHeight: 1 }}>

          {/* M2 monogram */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "flex-end", lineHeight: 1, letterSpacing: "-8px" }}
          >
            {/* M */}
            <span style={{
              fontFamily: "'Arial Black', 'Arial Bold', Impact, sans-serif",
              fontSize: "clamp(64px, 16vw, 104px)",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1,
            }}>M</span>

            {/* 2 — same size as M, green text only, no background */}
            <span style={{
              fontFamily: "'Arial Black', 'Arial Bold', Impact, sans-serif",
              fontSize: "clamp(64px, 16vw, 104px)",
              fontWeight: 900,
              color: "#00A85A",
              lineHeight: 1,
            }}>2</span>
          </motion.div>

          {/* ZION — luxury serif */}
          <motion.span
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: "clamp(64px, 16vw, 104px)",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: "4px",
            }}
          >
            ZION
          </motion.span>
        </div>

        {/* Salons — signature script, right-aligned under ION */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.85, ease: "easeOut" }}
          style={{ textAlign: "right", marginTop: "10px", paddingRight: "2px" }}
        >
          <span style={{
            fontFamily: "'Great Vibes', 'Dancing Script', cursive",
            fontSize: "clamp(48px, 12vw, 80px)",
            fontWeight: 400,
            color: "#FFFFFF",
            lineHeight: 1.15,
          }}>Salons</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
