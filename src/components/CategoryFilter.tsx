import Link from "next/link";

type Option = { label: string; value: string | null };

export default function CategoryFilter({
  basePath,
  options,
  active,
}: {
  basePath: string;
  options: Option[];
  active: string | null;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {options.map((option) => {
        const isActive = option.value === active;
        const href = option.value ? `${basePath}?categoria=${option.value}` : basePath;

        return (
          <Link
            key={option.label}
            href={href}
            scroll={false}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              isActive
                ? "border-white bg-white text-black"
                : "border-neutral-700 hover:border-neutral-400"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}