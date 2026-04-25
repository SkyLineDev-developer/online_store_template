"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Figura } from "@/types";

interface FiguraCardProps {
  figura: Figura;
  animeId: string;
  accentColor: string;
  index: number;
}

const conditionStyle: Record<string, { bg: string; color: string }> = {
  Excelente:    { bg: "rgba(34,197,94,0.12)",   color: "#22c55e" },
  "Muy Bueno":  { bg: "rgba(139,92,246,0.12)",  color: "#a78bfa" },
  Bueno:        { bg: "rgba(251,191,36,0.12)",  color: "#fbbf24" },
};

export default function FiguraCard({ figura, animeId, accentColor, index }: FiguraCardProps) {
  const cond = conditionStyle[figura.condition] ?? conditionStyle["Bueno"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <Link href={`/anime/${animeId}/figura/${figura.id}`} style={{ display: "block" }}>
        <motion.div
          className="group cursor-pointer overflow-hidden"
          style={{ background: "#16161e", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.3)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          {/* Image */}
          <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "#1c1c26" }}>
            <img
              src={figura.images[0]}
              alt={figura.name}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transition: "transform 0.5s ease",
              }}
              className="group-hover:scale-[1.04]"
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(14,14,20,0.85) 0%, transparent 60%)"
            }} />

            {/* Stock pill */}
            <div style={{ position: "absolute", top: "12px", left: "12px" }}>
              {figura.inStock ? (
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px",
                  background: "rgba(34,197,94,0.15)", color: "#22c55e",
                  border: "1px solid rgba(34,197,94,0.3)", backdropFilter: "blur(4px)"
                }}>En stock</span>
              ) : (
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px",
                  background: "rgba(248,113,113,0.12)", color: "#f87171",
                  border: "1px solid rgba(248,113,113,0.25)", backdropFilter: "blur(4px)"
                }}>Agotado</span>
              )}
            </div>

            {/* Scale */}
            <div style={{ position: "absolute", top: "12px", right: "12px" }}>
              <span className="font-mono-code" style={{
                fontSize: "10px", padding: "3px 8px", borderRadius: "4px",
                background: "rgba(14,14,20,0.85)", color: "#44445a"
              }}>{figura.scale}</span>
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: "16px" }}>
            <h4 className="font-display" style={{
              fontWeight: 800, fontSize: "14px", lineHeight: 1.3,
              color: "#eeeef5", marginBottom: "8px"
            }}>
              {figura.name}
            </h4>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
              <span style={{
                fontSize: "10px", fontWeight: 700, padding: "2px 10px", borderRadius: "999px",
                background: cond.bg, color: cond.color
              }}>{figura.condition}</span>
              <span style={{
                fontSize: "10px", fontWeight: 600, padding: "2px 10px", borderRadius: "999px",
                background: "#1c1c26", color: "#44445a", border: "1px solid rgba(255,255,255,0.06)"
              }}>{figura.height}</span>
            </div>

            <p style={{
              fontSize: "12px", lineHeight: 1.6, color: "#8888a8", marginBottom: "12px",
              overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
            }}>
              {figura.description}
            </p>

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)"
            }}>
              <span className="font-mono-code" style={{ fontWeight: 500, fontSize: "16px", color: "#a78bfa" }}>
                ${figura.price.toLocaleString()}
                <span style={{ fontSize: "11px", marginLeft: "4px", color: "#44445a" }}>ARS</span>
              </span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#800080" }}>
                Ver detalle →
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}