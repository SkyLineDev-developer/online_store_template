"use client";

import { ReactNode } from "react";

interface NeonBadgeProps {
  children: ReactNode;
  color?: "blue" | "pink" | "purple" | "green" | "orange";
  variant?: "solid" | "outline";
}

const colorMap = {
  blue:   { color: "#a78bfa", bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.25)" },
  pink:   { color: "#f472b6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.25)" },
  purple: { color: "#a78bfa", bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.25)" },
  green:  { color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)" },
  orange: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)" },
};

export default function NeonBadge({ children, color = "blue", variant = "outline" }: NeonBadgeProps) {
  const c = colorMap[color];
  return (
    <span
      className="inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
      style={{
        color: c.color,
        background: variant === "solid" ? c.bg : "transparent",
        border: `1px solid ${c.border}`,
      }}
    >
      {children}
    </span>
  );
}