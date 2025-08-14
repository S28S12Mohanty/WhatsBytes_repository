"use client";

import { useCartStore } from "@/store/cart";

export default function AddToCartControls({ productId }: { productId: string }) {
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const items = useCartStore((s) => s.items);
  const qty = items[productId] ?? 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2">
        <button onClick={() => setQuantity(productId, Math.max(0, qty - 1))} className="px-2">-</button>
        <span className="min-w-6 text-center">{qty}</span>
        <button onClick={() => setQuantity(productId, qty + 1)} className="px-2">+</button>
      </div>
      <button
        onClick={() => addItem(productId, Math.max(1, 1))}
        className="bg-emerald-500 hover:bg-emerald-400 text-black rounded-md px-6 py-2 font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
}


