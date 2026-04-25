"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export default function SectionHeader({ label, title, subtitle, color = "#800080" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "40px" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <div style={{ width: "20px", height: "1px", background: color, flexShrink: 0 }} />
        <span className="font-mono-code" style={{
          fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color
        }}>
          {label}
        </span>
      </div>
      <h2 className="font-display" style={{
        fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: "#eeeef5", marginBottom: subtitle ? "12px" : 0,
        lineHeight: 1.1,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: "15px", color: "#8888a8", maxWidth: "520px", lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}