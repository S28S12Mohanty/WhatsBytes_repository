"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cart";
import { findProductById } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  const entries = Object.entries(items);
  const enriched = entries
    .map(([productId, quantity]) => ({ product: findProductById(productId), quantity }))
    .filter((x) => x.product);

  const total = enriched.reduce((sum, { product, quantity }) => sum + (product!.price * quantity), 0);

  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <main className="container px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-xl font-semibold">Cart</h1>
          {enriched.length === 0 ? (
            <div className="text-neutral-400">Your cart is empty. <Link className="underline" href="/">Continue shopping</Link>.</div>
          ) : (
            <div className="space-y-4">
              {enriched.map(({ product, quantity }) => (
                <div key={product!.id} className="flex items-center gap-4 border border-neutral-800 rounded-lg p-3 bg-neutral-900/50">
                  <div className="relative w-20 h-20 rounded overflow-hidden">
                    <Image src={product!.images[0]} alt={product!.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{product!.title}</div>
                    <div className="text-sm text-neutral-400">${product!.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQuantity(product!.id, Math.max(0, quantity - 1))} className="px-2 py-1 border border-[color:var(--border)] rounded">-</button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(product!.id, quantity + 1)} className="px-2 py-1 border border-[color:var(--border)] rounded">+</button>
                  </div>
                  <button onClick={() => removeItem(product!.id)} className="text-sm text-red-500 hover:text-red-400">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="border border-[color:var(--border)] rounded-lg p-4 bg-[color:var(--surface)]/60">
            <h2 className="font-semibold mb-3">Summary</h2>
            <div className="flex items-center justify-between text-sm text-neutral-300 mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button disabled={enriched.length === 0} className="w-full bg-[color:var(--primary)] disabled:opacity-50 text-[color:var(--primary-foreground)] rounded-md py-2 font-medium mt-2">Checkout</button>
            <button onClick={clear} disabled={enriched.length === 0} className="w-full border border-[color:var(--border)] rounded-md py-2 font-medium mt-2 hover:bg-[color:var(--surface)]">Clear cart</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


