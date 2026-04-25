"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Figura } from "@/types";

interface Props {
  figura: Figura;
  accentColor: string;
}

export default function FiguraDetailClient({ figura }: Props) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!figura.inStock || added) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="flex flex-col gap-3">
      <motion.button
        onClick={handleAdd}
        disabled={!figura.inStock}
        whileHover={figura.inStock && !added ? { scale: 1.015 } : {}}
        whileTap={figura.inStock && !added ? { scale: 0.97 } : {}}
        className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
        style={{
          background: added
            ? "rgba(34,197,94,0.15)"
            : figura.inStock
            ? "var(--accent)"
            : "var(--bg-elevated)",
          color: added
            ? "#22c55e"
            : figura.inStock
            ? "white"
            : "var(--text-muted)",
          border: `1px solid ${added ? "rgba(34,197,94,0.3)" : figura.inStock ? "transparent" : "var(--border)"}`,
          cursor: figura.inStock ? "pointer" : "not-allowed",
          boxShadow: added ? "0 0 20px rgba(34,197,94,0.15)" : figura.inStock ? "0 4px 20px rgba(139,92,246,0.25)" : "none",
        }}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span key="added" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              ✓ Agregado al carrito
            </motion.span>
          ) : figura.inStock ? (
            <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              Agregar al carrito
            </motion.span>
          ) : (
            <motion.span key="oos">Sin stock</motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {figura.inStock && (
        <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
          Envío a todo el país · Pago seguro
        </p>
      )}
    </div>
  );
}