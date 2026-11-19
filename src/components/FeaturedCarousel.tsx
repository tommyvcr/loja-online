import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function FeaturedCarousel() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="text-3xl font-bold">Em destaque</h2>
          <p className="mt-2 text-neutral-400">Faz scroll para o lado para ver mais.</p>
        </Reveal>
      </div>

      <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}