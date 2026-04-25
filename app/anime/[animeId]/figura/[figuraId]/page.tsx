import { notFound } from "next/navigation";
import { getFiguraById, animes } from "@/lib/data";
import FiguraGallery from "@/components/FiguraGallery";
import PageTransition from "@/components/PageTransition";
import GlowButton from "@/components/ui/GlowButton";
import FiguraDetailClient from "@/components/FiguraDetailClient";

interface Props {
  params: Promise<{ animeId: string; figuraId: string }>;
}

const conditionStyle: Record<string, { bg: string; color: string }> = {
  Excelente:   { bg: "rgba(34,197,94,0.12)",  color: "#22c55e" },
  "Muy Bueno": { bg: "rgba(139,92,246,0.12)", color: "#a78bfa" },
  Bueno:       { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
};

export default async function FiguraPage({ params }: Props) {
  const { animeId, figuraId } = await params;
  const result = getFiguraById(animeId, figuraId);
  if (!result) notFound();
  const { anime, figura } = result;

  const cond = conditionStyle[figura.condition] ?? conditionStyle["Bueno"];

  const specs = [
    { label: "Escala",         value: figura.scale },
    { label: "Material",       value: figura.material },
    { label: "Altura",         value: figura.height },
    { label: "Condición",      value: figura.condition },
    { label: "Disponibilidad", value: figura.inStock ? "En stock" : "Agotado" },
  ];

  return (
    <PageTransition>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "112px 24px 96px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
          <GlowButton href="/" color="blue" size="sm" outline>← Inicio</GlowButton>
          <span style={{ color: "#44445a" }}>/</span>
          <GlowButton href={`/anime/${anime.id}`} color="blue" size="sm" outline>{anime.name}</GlowButton>
          <span style={{ color: "#44445a" }}>/</span>
          <span style={{ fontSize: "13px", color: "#8888a8" }}>{figura.name}</span>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "56px",
          alignItems: "start"
        }}>
          {/* Gallery */}
          <FiguraGallery images={figura.images} name={figura.name} accentColor={anime.accentColor} />

          {/* Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Header */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "16px", height: "1px", background: anime.accentColor }} />
                <span className="font-mono-code" style={{
                  fontSize: "11px", textTransform: "uppercase",
                  letterSpacing: "0.1em", color: anime.accentColor
                }}>{anime.name}</span>
              </div>

              <h1 className="font-display" style={{
                fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                lineHeight: 1.15, color: "#eeeef5", marginBottom: "16px"
              }}>
                {figura.name}
              </h1>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 700, padding: "3px 12px", borderRadius: "999px",
                  background: cond.bg, color: cond.color
                }}>{figura.condition}</span>
                <span style={{
                  fontSize: "11px", fontWeight: 600, padding: "3px 12px", borderRadius: "999px",
                  background: "rgba(139,92,246,0.1)", color: "#a78bfa",
                  border: "1px solid rgba(139,92,246,0.2)"
                }}>{figura.scale}</span>
                <span style={{
                  fontSize: "11px", fontWeight: 600, padding: "3px 12px", borderRadius: "999px",
                  background: "#1c1c26", color: "#44445a", border: "1px solid rgba(255,255,255,0.06)"
                }}>{figura.material}</span>
              </div>

              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#8888a8" }}>
                {figura.description}
              </p>
            </div>

            {/* Price + CTA */}
            <div style={{
              borderRadius: "12px", padding: "24px",
              background: "#16161e", border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", flexDirection: "column", gap: "20px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p className="font-mono-code" style={{
                    fontSize: "10px", textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "#44445a", marginBottom: "4px"
                  }}>Precio</p>
                  <p className="font-mono-code" style={{ fontSize: "2rem", fontWeight: 500, color: "#a78bfa" }}>
                    ${figura.price.toLocaleString()}
                    <span style={{ fontSize: "12px", marginLeft: "6px", color: "#44445a" }}>ARS</span>
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600,
                  color: figura.inStock ? "#22c55e" : "#f87171" }}>
                  <span className="status-dot" style={{
                    width: "8px", height: "8px", borderRadius: "50%", display: "inline-block",
                    background: figura.inStock ? "#22c55e" : "#f87171"
                  }} />
                  {figura.inStock ? "En stock" : "Agotado"}
                </div>
              </div>
              <FiguraDetailClient figura={figura} accentColor={anime.accentColor} />
            </div>

            {/* Specs */}
            <div style={{
              borderRadius: "12px", padding: "24px",
              background: "#16161e", border: "1px solid rgba(255,255,255,0.06)"
            }}>
              <p className="font-mono-code" style={{
                fontSize: "10px", textTransform: "uppercase",
                letterSpacing: "0.1em", color: "#44445a", marginBottom: "16px"
              }}>Especificaciones</p>
              {specs.map(spec => (
                <div key={spec.label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "14px"
                }}>
                  <span style={{ color: "#44445a" }}>{spec.label}</span>
                  <span style={{
                    fontWeight: 600,
                    color: spec.label === "Disponibilidad"
                      ? figura.inStock ? "#22c55e" : "#f87171"
                      : "#eeeef5"
                  }}>{spec.value}</span>
                </div>
              ))}
            </div>

            <GlowButton href={`/anime/${anime.id}`} color="blue" size="md" outline>
              ← Volver a {anime.name}
            </GlowButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export function generateStaticParams() {
  return animes.flatMap(anime =>
    anime.figuras.map(figura => ({ animeId: anime.id, figuraId: figura.id }))
  );
}