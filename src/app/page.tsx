import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCarousel />
      <CategoryGrid />

      <section className="border-t border-white/10 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 text-center text-sm text-neutral-400 md:grid-cols-3">
          <p>Envios grátis a partir de 25 €</p>
          <p>30 dias para devoluções</p>
          <p>Pagamento seguro</p>
        </div>
      </section>
    </main>
  );
}