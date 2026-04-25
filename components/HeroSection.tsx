"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const STATS = [
  { value: "7",   label: "Universos" },
  { value: "21",  label: "Figuras" },
  { value: "1/7", label: "Escala máx." },
];

const TAGS = [
  "Bakugan, Battle Planet", "Tokyo Ghoul", "Death Note",
  "Boku No Hero", "Naruto", "Dragon Ball", "Spy x Family",
];

export default function HeroSection() {
  return (
    <section style={{
      position: "relative",
      padding: "160px 0 100px",
      overflow: "hidden",
    }}>
      {/* Top ambient glow */}
      <div style={{
        position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "400px", borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}
        >
          <div style={{ width: "24px", height: "1px", background: "#800080", flexShrink: 0 }} />
          <span className="font-mono-code" style={{
            fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#800080"
          }}>
            Colección Seleccionada · Segunda Mano Premium
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display"
          style={{
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 1.08,
            marginBottom: "28px",
            color: "#eeeef5",
          }}
        >
          Figuras de anime<br />
          <span style={{ color: "#800080" }}>que valen la pena.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "18px", lineHeight: 1.7,
            color: "#8888a8", maxWidth: "540px",
            marginBottom: "40px",
          }}
        >
          Cada pieza revisada, fotografiada y verificada. Escala real, calidad real.
          Sin sorpresas — solo figuras que querrás tener en tu colección.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "64px" }}
        >
          <Link href="#collection">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(139,92,246,0.35)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 28px", borderRadius: "10px",
                background: "#800080", color: "white",
                border: "none", cursor: "pointer",
                fontSize: "15px", fontWeight: 700,
                fontFamily: "inherit",
              }}
            >
              Explorar colección
            </motion.button>
          </Link>
          <Link href="#animes">
            <motion.button
              whileHover={{ scale: 1.02, borderColor: "rgba(139,92,246,0.5)", color: "white" }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 28px", borderRadius: "10px",
                background: "transparent", color: "#8888a8",
                border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
                fontSize: "15px", fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              Ver animes
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: "flex", gap: "48px", flexWrap: "wrap", marginBottom: "40px" }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display" style={{
                fontWeight: 900, fontSize: "2.5rem", lineHeight: 1, color: "#eeeef5"
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "#44445a", marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
        >
          {TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + i * 0.05 }}
              style={{
                background: "rgba(139,92,246,0.1)",
                color: "#a78bfa",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: "999px",
                padding: "4px 14px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
        background: "linear-gradient(to top, #0e0e14, transparent)",
        pointerEvents: "none",
      }} />
    </section>
  );
}