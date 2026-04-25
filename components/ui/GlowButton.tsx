"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  color?: "blue" | "pink" | "purple" | "green";
  size?: "sm" | "md" | "lg";
  outline?: boolean;
  disabled?: boolean;
  className?: string;
}

const sizeMap = { sm: "px-4 py-1.5 text-xs", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-sm" };

export default function GlowButton({
  children, href, onClick, size = "md", outline = false, disabled = false, className = ""
}: GlowButtonProps) {
  const btn = (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`rounded-lg font-semibold transition-all duration-150 ${sizeMap[size]} ${className}`}
      style={{
        background: outline ? "transparent" : "var(--accent)",
        color: outline ? "var(--text-secondary)" : "white",
        border: "1px solid",
        borderColor: outline ? "var(--border)" : "transparent",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={e => {
        if (disabled) return;
        const el = e.currentTarget as HTMLButtonElement;
        if (outline) {
          el.style.borderColor = "rgba(139,92,246,0.5)";
          el.style.color = "var(--accent-bright)";
          el.style.background = "var(--accent-dim)";
        } else {
          el.style.background = "var(--accent-bright)";
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement;
        if (outline) {
          el.style.borderColor = "var(--border)";
          el.style.color = "var(--text-secondary)";
          el.style.background = "transparent";
        } else {
          el.style.background = "var(--accent)";
        }
      }}
    >
      {children}
    </motion.button>
  );

  return href ? <Link href={href}>{btn}</Link> : btn;
}