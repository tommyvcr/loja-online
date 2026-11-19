import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const categories = [
  { label: "T-shirts", href: "/roupa?categoria=t-shirts", image: "/images/categories/t-shirts.jpg" },
  { label: "Hoodies", href: "/roupa?categoria=hoodies", image: "/images/categories/hoodies.jpg" },
  { label: "Calças", href: "/roupa?categoria=calcas", image: "/images/categories/calcas.jpg" },
  { label: "Casacos", href: "/roupa?categoria=casacos", image: "/images/categories/casacos.jpg" },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold">Compra por categoria</h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.label} delay={index * 0.1}>
            <Link
              href={category.href}
              className="group relative block aspect-square overflow-hidden rounded-lg bg-neutral-800"
            >
              <Image
                src={category.image}
                alt={category.label}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-lg font-semibold">
                {category.label}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}