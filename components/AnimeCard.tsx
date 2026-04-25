"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Anime } from "@/types";

interface AnimeCardProps {
  anime: Anime;
  index: number;
}

export default function AnimeCard({ anime, index }: AnimeCardProps) {
  const inStockCount = anime.figuras.filter(f => f.inStock).length;
  const minPrice = Math.min(...anime.figuras.map(f => f.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link href={`/anime/${anime.id}`} style={{ display: "block" }}>
        <motion.div
          className="group cursor-pointer overflow-hidden"
          style={{
            background: "#16161e",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
          }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.35)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          {/* Cover image using plain img tag */}
          <div style={{ position: "relative", height: "176px", overflow: "hidden", background: "#1c1c26" }}>
            <img
              src={anime.coverImage}
              alt={anime.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.5s ease",
              }}
              className="group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(14,14,20,0.85) 0%, rgba(14,14,20,0.2) 50%, transparent 100%)"
            }} />
            {/* Accent top line on hover */}
            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${anime.accentColor}90, transparent)`
              }}
            />
            {/* Genre tags */}
            <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {anime.genre.slice(0, 2).map(g => (
                <span key={g} style={{
                  fontSize: "10px", fontWeight: 600, padding: "2px 8px",
                  borderRadius: "999px", background: "rgba(14,14,20,0.8)",
                  color: "#8888a8", backdropFilter: "blur(4px)"
                }}>
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Card content */}
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "12px" }}>
              <h3 className="font-display" style={{ fontWeight: 900, fontSize: "15px", lineHeight: 1.3, color: "#eeeef5" }}>
                {anime.name}
              </h3>
              <span className="font-mono-code" style={{ fontSize: "10px", color: "#44445a", flexShrink: 0, marginTop: "2px" }}>
                {anime.figuras.length} figs
              </span>
            </div>

            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#8888a8", marginBottom: "16px",
              overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {anime.description}
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#44445a" }}>
                  Desde{" "}
                </span>
                <span className="font-mono-code" style={{ fontSize: "14px", fontWeight: 500, color: "#a78bfa" }}>
                  ${minPrice.toLocaleString()}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px",
                color: inStockCount > 0 ? "#22c55e" : "#f87171" }}>
                <span className="status-dot" style={{
                  width: "6px", height: "6px", borderRadius: "50%", display: "inline-block",
                  background: inStockCount > 0 ? "#22c55e" : "#f87171"
                }} />
                {inStockCount}/{anime.figuras.length} en stock
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}