import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductCard({
  product,
  className = "w-64 shrink-0 snap-start sm:w-72",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link href={`/produtos/${product.slug}`} className={`group block ${className}`}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-800">
        <Image
          src={`/images/products/${product.slug}.jpg`}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
            Novo
          </span>
        )}
      </div>
      <h3 className="mt-3 font-medium">{product.name}</h3>
      <p className="text-sm text-neutral-400">{product.price.toFixed(2)} €</p>
    </Link>
  );
}