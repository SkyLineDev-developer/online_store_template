import { notFound } from "next/navigation";
import { getAnimeById, animes } from "@/lib/data";
import FiguraCard from "@/components/FiguraCard";
import PageTransition from "@/components/PageTransition";
import GlowButton from "@/components/ui/GlowButton";

interface Props {
  params: Promise<{ animeId: string }>;
}

export default async function AnimePage({ params }: Props) {
  const { animeId } = await params;
  const anime = getAnimeById(animeId);
  if (!anime) notFound();

  const inStock = anime.figuras.filter(f => f.inStock).length;
  const minPrice = Math.min(...anime.figuras.map(f => f.price));
  const maxPrice = Math.max(...anime.figuras.map(f => f.price));

  return (
    <PageTransition>
      {/* Hero */}
      <section style={{ position: "relative", paddingTop: "96px", paddingBottom: "48px", overflow: "hidden" }}>
        {/* Blurred bg image */}
        <img
          src={anime.coverImage}
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.07, filter: "blur(12px)", transform: "scale(1.1)"
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, #0e0e14 0%, rgba(14,14,20,0.6) 40%, #0e0e14 100%)"
        }} />
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent, ${anime.accentColor}60, transparent)`
        }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
            <GlowButton href="/" color="blue" size="sm" outline>← Inicio</GlowButton>
            <span style={{ color: "#44445a" }}>/</span>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#8888a8" }}>{anime.name}</span>
          </div>

          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* Left: info */}
            <div style={{ flex: 1, minWidth: "280px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "16px", height: "1px", background: anime.accentColor }} />
                <span className="font-mono-code" style={{
                  fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: anime.accentColor
                }}>
                  Colección disponible
                </span>
              </div>

              <h1 className="font-display" style={{
                fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1, color: "#eeeef5", marginBottom: "16px"
              }}>
                {anime.name}
              </h1>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                {anime.genre.map(g => (
                  <span key={g} style={{
                    fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px",
                    background: "#1c1c26", color: "#8888a8", border: "1px solid rgba(255,255,255,0.06)"
                  }}>{g}</span>
                ))}
              </div>

              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#8888a8", maxWidth: "520px" }}>
                {anime.description}
              </p>
            </div>

            {/* Right: stats card */}
            <div style={{
              borderRadius: "12px", padding: "24px", minWidth: "220px",
              background: "#16161e", border: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0
            }}>
              <p className="font-mono-code" style={{
                fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em",
                color: "#44445a", marginBottom: "20px"
              }}>Resumen</p>
              {[
                { label: "Figuras", value: `${anime.figuras.length}` },
                { label: "En stock", value: `${inStock} / ${anime.figuras.length}` },
                { label: "Precio mín.", value: `$${minPrice.toLocaleString()} ARS` },
                { label: "Precio máx.", value: `$${maxPrice.toLocaleString()} ARS` },
              ].map(s => (
                <div key={s.label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "14px"
                }}>
                  <span style={{ color: "#44445a" }}>{s.label}</span>
                  <span style={{ fontWeight: 600, color: "#eeeef5" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Figures grid */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{ width: "16px", height: "1px", background: anime.accentColor }} />
          <span className="font-mono-code" style={{
            fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: anime.accentColor
          }}>{anime.figuras.length} piezas</span>
        </div>
        <h2 className="font-display" style={{ fontWeight: 900, fontSize: "2rem", color: "#eeeef5", marginBottom: "32px" }}>
          Figuras disponibles
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {anime.figuras.map((figura, i) => (
            <FiguraCard
              key={figura.id}
              figura={figura}
              animeId={anime.id}
              accentColor={anime.accentColor}
              index={i}
            />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

export function generateStaticParams() {
  return animes.map(a => ({ animeId: a.id }));
}