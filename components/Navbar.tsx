"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(14,14,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "18px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.div
            className="font-display"
            whileHover={{ scale: 1.03 }}
            style={{ fontWeight: 900, fontSize: "22px", cursor: "pointer", color: "#eeeef5" }}
          >
            Akihabara<span style={{ color: "#800080" }}>2099</span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ display: "flex", gap: "28px" }}>
            {[
              { label: "Colección", href: "/#collection" },
              { label: "Animes", href: "/#animes" },
            ].map((item) => (
              <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
                <motion.span
                  whileHover={{ y: -1 }}
                  style={{
                    fontSize: "14px", fontWeight: 500,
                    color: "#8888a8", cursor: "pointer",
                    position: "relative", display: "inline-block",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = "#eeeef5"}
                  onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = "#8888a8"}
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Status badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 14px", borderRadius: "8px",
            background: "#16161e", border: "1px solid rgba(255,255,255,0.06)",
            fontSize: "12px", color: "#44445a",
          }}>
            <span className="status-dot" style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#22c55e", display: "inline-block", flexShrink: 0,
            }} />
            21 figuras disponibles
          </div>
        </div>
      </div>
    </motion.nav>
  );
}