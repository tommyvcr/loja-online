"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, useHydrated } from "@/lib/cart";

const FREE_SHIPPING_FROM = 25;
const SHIPPING_COST = 3.9;

export default function CartView() {
  const { lines, count, subtotal, setQuantity, removeItem } = useCart();
  const hydrated = useHydrated();

  // Evita mostrar "carrinho vazio" por uma fração de segundo antes de ler o armazenamento
  if (!hydrated) return <div className="mt-10 h-40" />;

  if (lines.length === 0) {
    return (
      <div className="mt-10">
        <p className="text-neutral-400">O teu carrinho está vazio.</p>
        <Link
          href="/roupa"
          className="mt-6 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          Ver roupa
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const missing = FREE_SHIPPING_FROM - subtotal;

  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
      <ul className="divide-y divide-white/10">
        {lines.map((line) => (
          <li key={line.key} className="flex gap-4 py-6">
            <Link
              href={`/produtos/${line.product.slug}`}
              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-800"
            >
              <Image
                src={`/images/products/${line.product.slug}.jpg`}
                alt={line.product.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex justify-between gap-4">
                <div>
                  <Link href={`/produtos/${line.product.slug}`} className="font-medium hover:underline">
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-neutral-400">
                    {line.color} · {line.size}
                  </p>
                </div>
                <p className="font-medium">
                  {(line.product.price * line.quantity).toFixed(2)} €
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-full border border-neutral-700">
                  <button
                    aria-label="Diminuir quantidade"
                    onClick={() => setQuantity(line.key, line.quantity - 1)}
                    className="h-9 w-9 text-lg transition hover:text-neutral-400"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{line.quantity}</span>
                  <button
                    aria-label="Aumentar quantidade"
                    onClick={() => setQuantity(line.key, line.quantity + 1)}
                    className="h-9 w-9 text-lg transition hover:text-neutral-400"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(line.key)}
                  className="text-sm text-neutral-400 underline-offset-4 transition hover:text-white hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-lg border border-white/10 p-6">
        <h2 className="text-lg font-semibold">Resumo</h2>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-400">
              Subtotal ({count} {count === 1 ? "artigo" : "artigos"})
            </dt>
            <dd>{subtotal.toFixed(2)} €</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-400">Envio</dt>
            <dd>{shipping === 0 ? "Grátis" : `${shipping.toFixed(2)} €`}</dd>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
            <dt>Total</dt>
            <dd>{total.toFixed(2)} €</dd>
          </div>
        </dl>

        {missing > 0 && (
          <p className="mt-4 text-xs text-neutral-400">
            Faltam {missing.toFixed(2)} € para envio grátis.
          </p>
        )}

        <button
          disabled
          className="mt-6 w-full rounded-full bg-white py-4 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          Finalizar compra (em breve)
        </button>
      </aside>
    </div>
  );
}