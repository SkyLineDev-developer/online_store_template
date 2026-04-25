import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "online_store_template — Figuras Anime",
  description: "Tienda de figuras de anime premium seleccionadas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" style={{ backgroundColor: "#0e0e14" }}>
      <body
        className="dot-grid min-h-screen"
        style={{
          backgroundColor: "#0e0e14",
          color: "#eeeef5",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Top ambient glow */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)",
          }}
        />

        <Navbar />

        <main className="relative z-10">{children}</main>

        {/* Footer */}
        <footer
          className="relative z-10 mt-24 py-10 px-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div
              className="font-display font-black text-xl"
              style={{ color: "#eeeef5" }}
            >
              Akihabara<span style={{ color: "#800080" }}>2099</span>
            </div>
            <p
              className="font-mono-code text-xs text-center"
              style={{ color: "#44445a" }}
            >
              © 2099 online_store_template · Figuras de anime seleccionadas
            </p>
            <div
              className="flex items-center gap-2 font-mono-code text-xs"
              style={{ color: "#44445a" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block status-dot"
                style={{ backgroundColor: "#22c55e" }}
              />
              Sistema en línea
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}