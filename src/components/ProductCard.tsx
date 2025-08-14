"use client";

import SmartImage from "@/components/SmartImage";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <div className="group rounded-xl border border-[color:var(--border)] overflow-hidden bg-[color:var(--surface)]/60 hover:bg-[color:var(--surface)] transition">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/3]">
        <SmartImage
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="p-4 space-y-2">
        <Link href={`/product/${product.id}`} className="block font-medium leading-tight">
          {product.title}
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-[color:var(--primary)] font-semibold">${product.price.toFixed(2)}</span>
          {product.rating && (
            <span className="flex items-center gap-1 text-xs text-[color:var(--muted)]">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {product.rating}
            </span>
          )}
        </div>
        <button
          onClick={() => addItem(product.id, 1)}
          className="w-full mt-2 bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded-md py-2 text-sm font-medium hover:brightness-110"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


