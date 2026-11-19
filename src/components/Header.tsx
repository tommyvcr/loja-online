"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { href: "/novidades", label: "Novidades" },
  { href: "/roupa", label: "Roupa" },
  { href: "/acessorios", label: "Acessórios" },
  { href: "/colecoes", label: "Coleções" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-white/10 bg-black/80 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
  <Image
    src="/images/logo/symbol-white.png"
    alt="MachadoINC"
    width={28}
    height={32}
    priority
  />
  <span className="text-xl font-bold tracking-tight">
    Machado<span className="font-light">INC</span>
  </span>
</Link>

        <nav className="hidden gap-8 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-neutral-300 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <button className="text-sm text-neutral-300 transition hover:text-white">Carrinho (0)</button>
      </div>
    </header>
  );
}