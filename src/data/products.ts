export type Category = "t-shirts" | "hoodies" | "calcas" | "casacos" | "acessorios";

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  colors: string[];
  sizes: string[];
  isNew: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "t-shirt-base-branca",
    name: "T-shirt Base",
    description: "Algodão orgânico, corte regular.",
    price: 24.9,
    category: "t-shirts",
    colors: ["Branco", "Preto", "Cinza"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 2,
    slug: "hoodie-inc",
    name: "Hoodie INC",
    description: "Hoodie oversized com logótipo bordado.",
    price: 59.9,
    category: "hoodies",
    colors: ["Preto", "Verde-escuro"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 3,
    slug: "calcas-cargo",
    name: "Calças Cargo",
    description: "Calças cargo largas com bolsos laterais.",
    price: 54.9,
    category: "calcas",
    colors: ["Bege", "Preto"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
  },
  {
    id: 4,
    slug: "casaco-bomber",
    name: "Casaco Bomber",
    description: "Bomber leve, ideal para meia-estação.",
    price: 79.9,
    category: "casacos",
    colors: ["Preto", "Azul-marinho"],
    sizes: ["S", "M", "L"],
    isNew: true,
  },
  {
    id: 5,
    slug: "gorro-machado",
    name: "Gorro Machado",
    description: "Gorro de malha com etiqueta tecida.",
    price: 17.5,
    category: "acessorios",
    colors: ["Preto", "Cinza"],
    sizes: ["Único"],
    isNew: false,
  },
  {
    id: 6,
    slug: "t-shirt-grafica",
    name: "T-shirt Gráfica",
    description: "Estampado frontal em serigrafia.",
    price: 29.9,
    category: "t-shirts",
    colors: ["Branco", "Preto"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
  },
];