import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  products,
  categoryLabels,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import ProductOptions from "@/components/ProductOptions";
import ProductCard from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

// Diz ao Next.js que páginas existem, para as preparar de antemão
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

// Título e descrição do separador / motores de pesquisa
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | MachadoINC`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <Link href="/" className="text-sm text-neutral-400 transition hover:text-white">
        ← Voltar
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-800">
          <Image
            src={`/images/products/${product.slug}.jpg`}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-neutral-400">
            {categoryLabels[product.category]}
          </p>
          <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
          <p className="mt-3 text-2xl">{product.price.toFixed(2)} €</p>
          <p className="mt-6 text-neutral-300">{product.description}</p>

          <ProductOptions product={product} />
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-2xl font-bold">Também te pode interessar</h2>
        <div className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}