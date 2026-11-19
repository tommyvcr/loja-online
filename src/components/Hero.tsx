"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Quando tiveres a imagem, troca por "/images/hero.jpg"
const HERO_IMAGE: string | null = "/images/hero.jpg";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-screen items-end overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-x-0 -top-[15%] h-[130%]"
      >
        {HERO_IMAGE ? (
          <Image
            src={HERO_IMAGE}
            alt="Coleção MachadoINC"
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-700 via-neutral-900 to-black" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-24"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-300">
          Coleção Outono/Inverno 26
        </p>
        <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight md:text-7xl">
          Roupa para toda a gente.
        </h1>
        <Link
          href="/colecoes"
          className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          Descobrir coleção
        </Link>
      </motion.div>
    </section>
  );
}