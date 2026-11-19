import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = { title: "Carrinho | MachadoINC" };

export default function CarrinhoPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      <h1 className="text-4xl font-bold">Carrinho</h1>
      <CartView />
    </main>
  );
}