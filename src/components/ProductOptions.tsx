"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { addItem } from "@/lib/cart";

export default function ProductOptions({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

    function handleAdd() {
    if (!size) return;
    addItem(product.slug, color, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8 space-y-8">
      <div>
        <p className="text-sm text-neutral-400">
          Cor: <span className="text-white">{color}</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                color === c
                  ? "border-white bg-white text-black"
                  : "border-neutral-700 hover:border-neutral-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-neutral-400">
          Tamanho: <span className="text-white">{size ?? "escolhe um"}</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`min-w-12 rounded-lg border px-4 py-2 text-sm transition ${
                size === s
                  ? "border-white bg-white text-black"
                  : "border-neutral-700 hover:border-neutral-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={!size}
        className="w-full rounded-full bg-white py-4 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {added ? "Adicionado ✓" : size ? "Adicionar ao carrinho" : "Escolhe um tamanho"}
      </button>
    </div>
  );
}