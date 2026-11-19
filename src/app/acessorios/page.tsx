import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = { title: "Acessórios | MachadoINC" };

export default function AcessoriosPage() {
  const items = products.filter((product) => product.category === "acessorios");

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <h1 className="text-4xl font-bold">Acessórios</h1>
      <p className="mt-2 text-neutral-400">{items.length} peças</p>
      <ProductGrid products={items} />
    </main>
  );
}