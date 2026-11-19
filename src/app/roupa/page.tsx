import type { Metadata } from "next";
import { products, categoryLabels, type Category } from "@/data/products";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = { title: "Roupa | MachadoINC" };

const clothingCategories: Category[] = ["t-shirts", "hoodies", "calcas", "casacos"];

type Props = { searchParams: Promise<{ categoria?: string }> };

export default async function RoupaPage({ searchParams }: Props) {
  const { categoria } = await searchParams;

  // Só aceita categorias que existem; qualquer outro valor mostra tudo
  const active = clothingCategories.find((c) => c === categoria) ?? null;

  const filtered = products.filter((product) =>
    active
      ? product.category === active
      : clothingCategories.includes(product.category)
  );

  const options = [
    { label: "Tudo", value: null },
    ...clothingCategories.map((c) => ({ label: categoryLabels[c], value: c })),
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <h1 className="text-4xl font-bold">Roupa</h1>
      <p className="mt-2 text-neutral-400">{filtered.length} peças</p>

      <CategoryFilter basePath="/roupa" options={options} active={active} />
      <ProductGrid products={filtered} />
    </main>
  );
}

