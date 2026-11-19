import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-end bg-gradient-to-br from-neutral-700 via-neutral-900 to-black">
      <div className="mx-auto w-full max-w-7xl px-6 pb-24">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
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
      </div>
    </section>
  );
}