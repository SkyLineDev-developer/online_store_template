export interface Figura {
  id: string;
  name: string;
  price: number;
  condition: "Excelente" | "Muy Bueno" | "Bueno";
  scale: string;
  material: string;
  height: string;
  description: string;
  images: string[]; // 4 images per figure
  inStock: boolean;
  animeId: string;
}

export interface Anime {
  id: string;
  name: string;
  genre: string[];
  coverImage: string;
  accentColor: string; // neon color unique per anime
  description: string;
  figuras: Figura[];
}

export interface CartItem {
  figura: Figura;
  quantity: number;
}