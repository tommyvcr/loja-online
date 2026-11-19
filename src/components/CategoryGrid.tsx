import Link from "next/link";
import Reveal from "./Reveal";

const categories = [
  { label: "T-shirts", href: "/roupa?categoria=t-shirts" },
  { label: "Hoodies", href: "/roupa?categoria=hoodies" },
  { label: "Calças", href: "/roupa?categoria=calcas" },
  { label: "Casacos", href: "/roupa?categoria=casacos" },
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
              className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
            >
              <div className="h-full w-full bg-gradient-to-br from-neutral-700 to-neutral-900 transition duration-500 group-hover:scale-105" />
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