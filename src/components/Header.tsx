"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cart";

export default function Header() {
  const items = useCartStore((s) => s.items);
  const cartCount = useMemo(
    () => Object.values(items).reduce((sum, n) => sum + n, 0),
    [items]
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set("q", q);
    else params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/70 bg-neutral-900/80 border-b border-neutral-800">
      <div className="container px-4 h-16 flex items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Whatbytes
        </Link>
        <form
          onSubmit={onSubmit}
          className="flex-1 max-w-xl mx-auto hidden sm:flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-full px-3 py-2"
        >
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-neutral-800">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="p-2 rounded-full hover:bg-neutral-800" aria-label="profile">
            <User />
          </button>
        </div>
      </div>
      <div className="sm:hidden px-4 pb-3">
        <form onSubmit={onSubmit} className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-full px-3 py-2">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
}


