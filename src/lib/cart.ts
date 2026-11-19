"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getProductBySlug } from "@/data/products";

export type CartItem = {
  slug: string;
  color: string;
  size: string;
  quantity: number;
};

const STORAGE_KEY = "machadoinc-cart";
const MAX_QUANTITY = 10;
const EMPTY: CartItem[] = [];

let items: CartItem[] | null = null;
const listeners = new Set<() => void>();

const lineKey = (item: Pick<CartItem, "slug" | "color" | "size">) =>
  `${item.slug}__${item.color}__${item.size}`;

// O que está no localStorage pode ter sido editado à mão: validar sempre
function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.slug === "string" &&
    typeof v.color === "string" &&
    typeof v.size === "string" &&
    typeof v.quantity === "number"
  );
}

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

function save(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // armazenamento cheio ou bloqueado: o carrinho continua a funcionar até fechar a página
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Se o carrinho mudar noutro separador, este também atualiza
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      items = read();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): CartItem[] {
  if (items === null) items = read();
  return items;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

// ---------- Ações ----------

export function addItem(slug: string, color: string, size: string) {
  const current = getSnapshot();
  const key = lineKey({ slug, color, size });
  const exists = current.some((item) => lineKey(item) === key);

  save(
    exists
      ? current.map((item) =>
          lineKey(item) === key
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
            : item
        )
      : [...current, { slug, color, size, quantity: 1 }]
  );
}

export function setQuantity(key: string, quantity: number) {
  const current = getSnapshot();
  if (quantity < 1) {
    save(current.filter((item) => lineKey(item) !== key));
    return;
  }
  save(
    current.map((item) =>
      lineKey(item) === key
        ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }
        : item
    )
  );
}

export function removeItem(key: string) {
  save(getSnapshot().filter((item) => lineKey(item) !== key));
}

export function clearCart() {
  save([]);
}

// ---------- Hooks ----------

export function useCart() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const lines = useMemo(
    () =>
      stored.flatMap((item) => {
        const product = getProductBySlug(item.slug);
        return product ? [{ ...item, key: lineKey(item), product }] : [];
      }),
    [stored]
  );

  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  return { lines, count, subtotal, addItem, setQuantity, removeItem, clearCart };
}

const noopSubscribe = () => () => {};

// false no servidor e na primeira renderização; true depois de a página carregar no browser
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}