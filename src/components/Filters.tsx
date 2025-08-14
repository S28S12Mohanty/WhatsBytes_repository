"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { brands, categories, maxPrice, minPrice } from "@/lib/products";
import { useMemo, useState } from "react";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedCategories = useMemo(() => {
    const raw = searchParams.get("category");
    if (!raw) return new Set<string>();
    return new Set(raw.split(","));
  }, [searchParams]);

  const priceInitial = useMemo(() => {
    const raw = searchParams.get("price");
    if (!raw) return [minPrice, maxPrice] as [number, number];
    const [minS, maxS] = raw.split("-");
    const min = Number(minS);
    const max = Number(maxS);
    if (Number.isNaN(min) || Number.isNaN(max)) return [minPrice, maxPrice] as [number, number];
    return [min, max] as [number, number];
  }, [searchParams]);

  const [price, setPrice] = useState<[number, number]>(priceInitial);

  function updateParam(key: string, value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value.length > 0) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  function onToggleCategory(cat: string) {
    const next = new Set(selectedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    updateParam("category", Array.from(next).join(","));
  }

  function onBrandChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    updateParam("brand", v || undefined);
  }

  function onPriceCommit() {
    updateParam("price", `${price[0]}-${price[1]}`);
  }

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-[color:var(--muted)]">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onToggleCategory(cat)}
              className={`px-3 py-1.5 rounded-full border text-sm transition ${selectedCategories.has(cat)
                  ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] border-[color:var(--primary)]"
                  : "bg-[color:var(--surface)] border-[color:var(--border)] hover:border-[color:var(--muted)]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-[color:var(--muted)]">Price</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              className="w-24 bg-[color:var(--surface)] border border-[color:var(--border)] rounded px-2 py-1.5 text-[color:var(--fg)]"
              value={price[0]}
              min={minPrice}
              max={price[1]}
              onChange={(e) => setPrice([Number(e.target.value), price[1]])}
              onBlur={onPriceCommit}
            />
            <span className="text-neutral-400">—</span>
            <input
              type="number"
              className="w-24 bg-[color:var(--surface)] border border-[color:var(--border)] rounded px-2 py-1.5 text-[color:var(--fg)]"
              value={price[1]}
              min={price[0]}
              max={maxPrice}
              onChange={(e) => setPrice([price[0], Number(e.target.value)])}
              onBlur={onPriceCommit}
            />
          </div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price[0]}
            onChange={(e) => setPrice([Number(e.target.value), price[1]])}
            onMouseUp={onPriceCommit}
            onTouchEnd={onPriceCommit}
            className="w-full accent-[color:var(--primary)]"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price[1]}
            onChange={(e) => setPrice([price[0], Number(e.target.value)])}
            onMouseUp={onPriceCommit}
            onTouchEnd={onPriceCommit}
            className="w-full accent-[color:var(--primary)]"
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-[color:var(--muted)]">Brand</h3>
        <select
          defaultValue={searchParams.get("brand") ?? ""}
          onChange={onBrandChange}
          className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded px-3 py-2 text-sm w-full text-[color:var(--fg)]"
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}


