"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FiguraGalleryProps {
  images: string[];
  name: string;
  accentColor: string;
}

export default function FiguraGallery({ images, name, accentColor }: FiguraGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Main image */}
      <div
        onClick={() => setZoomed(true)}
        style={{
          position: "relative", height: "460px", overflow: "hidden",
          background: "#1c1c26", borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.06)", cursor: "zoom-in"
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={images[selected]}
            alt={`${name} vista ${selected + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              width: "100%", height: "100%", objectFit: "contain",
              padding: "16px", display: "block"
            }}
          />
        </AnimatePresence>
        {/* Counter */}
        <div className="font-mono-code" style={{
          position: "absolute", bottom: "12px", right: "12px",
          fontSize: "10px", padding: "3px 8px", borderRadius: "4px",
          background: "rgba(14,14,20,0.85)", color: "#44445a"
        }}>
          {selected + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setSelected(i)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              height: "80px", overflow: "hidden", borderRadius: "8px",
              border: `1px solid ${i === selected ? `${accentColor}80` : "rgba(255,255,255,0.06)"}`,
              background: "#1c1c26", padding: 0, cursor: "pointer",
              outline: i === selected ? `2px solid ${accentColor}40` : "none",
              outlineOffset: "2px",
              position: "relative"
            }}
          >
            <img src={img} alt={`thumb ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {i !== selected && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(0,0,0,0.92)", display: "flex",
              alignItems: "center", justifyContent: "center", padding: "16px"
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "relative", width: "100%", maxWidth: "720px",
                height: "80vh", borderRadius: "16px", overflow: "hidden",
                background: "#1c1c26"
              }}
            >
              <img src={images[selected]} alt={name}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "24px" }} />
              <button
                onClick={() => setZoomed(false)}
                style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: "#16161e", color: "#8888a8", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px", padding: "6px 14px", fontSize: "13px",
                  fontWeight: 600, cursor: "pointer"
                }}
              >
                Cerrar ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}