import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = { title: "Novidades | MachadoINC" };

export default function NovidadesPage() {
  const items = products.filter((product) => product.isNew);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <h1 className="text-4xl font-bold">Novidades</h1>
      <p className="mt-2 text-neutral-400">As últimas peças a chegar à MachadoINC.</p>
      <ProductGrid products={items} />
    </main>
  );
}