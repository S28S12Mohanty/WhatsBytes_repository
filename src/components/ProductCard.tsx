"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <div className="group rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900/50 hover:bg-neutral-900 transition">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/3]">
        <Image
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
          <span className="text-emerald-400 font-semibold">${product.price.toFixed(2)}</span>
          {product.rating && (
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {product.rating}
            </span>
          )}
        </div>
        <button
          onClick={() => addItem(product.id, 1)}
          className="w-full mt-2 bg-emerald-500 text-black rounded-md py-2 text-sm font-medium hover:bg-emerald-400"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


