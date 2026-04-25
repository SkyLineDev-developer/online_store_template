import HeroSection from "@/components/HeroSection";
import AnimeCard from "@/components/AnimeCard";
import SectionHeader from "@/components/ui/SectionHeader";
import PageTransition from "@/components/PageTransition";
import { animes } from "@/lib/data";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />

      <section id="collection" style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        <SectionHeader
          label="Catálogo completo"
          title="Elige tu universo"
          subtitle="7 animes, 21 figuras seleccionadas. Cada una verificada antes de publicarse."
        />

        <div
          id="animes"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {animes.map((anime, index) => (
            <AnimeCard key={anime.id} anime={anime} index={index} />
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{
          borderRadius: "16px", padding: "40px",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "32px", textAlign: "center",
          background: "#16161e", border: "1px solid rgba(255,255,255,0.06)"
        }}>
          {[
            { icon: "✓", label: "Condición verificada" },
            { icon: "📦", label: "Envío a todo el país" },
            { icon: "📸", label: "4 fotos reales por figura" },
            { icon: "🔒", label: "Pago seguro" },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#8888a8" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}