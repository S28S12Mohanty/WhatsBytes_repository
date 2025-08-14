import { Product, ProductFilters } from "./types";

export function parsePriceRangeParam(value?: string | null) {
  if (!value) return undefined;
  const [minStr, maxStr] = value.split("-");
  const min = Number(minStr);
  const max = Number(maxStr);
  if (Number.isNaN(min) || Number.isNaN(max)) return undefined;
  return { min, max } as const;
}

export function parseCategoriesParam(value?: string | null) {
  if (!value) return [] as string[];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function applyFilters(
  products: Product[],
  filters: ProductFilters
): Product[] {
  let result = products;
  if (filters.q) {
    const qLower = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower) ||
        p.brand.toLowerCase().includes(qLower) ||
        p.category.toLowerCase().includes(qLower)
    );
  }
  if (filters.categories && filters.categories.length > 0) {
    const set = new Set(filters.categories);
    result = result.filter((p) => set.has(p.category));
  }
  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand);
  }
  if (filters.price) {
    result = result.filter(
      (p) => p.price >= filters.price!.min && p.price <= filters.price!.max
    );
  }
  return result;
}


