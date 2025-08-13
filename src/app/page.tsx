import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import { applyFilters, parseCategoriesParam, parsePriceRangeParam } from "@/lib/filters";
import { products } from "@/lib/products";

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const categories = parseCategoriesParam(
    typeof sp.category === "string" ? sp.category : undefined
  );
  const brand = typeof sp.brand === "string" ? sp.brand : undefined;
  const price = parsePriceRangeParam(
    typeof sp.price === "string" ? sp.price : undefined
  );

  const filtered = applyFilters(products, { q, categories, brand, price });

  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <main className="container px-4 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Filters />
        </div>
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="text-neutral-400">No products found. Try adjusting filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
