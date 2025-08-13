"use client";

import Link from "next/link";
import { Moon, Search, ShoppingCart, SunMedium, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("wb-theme") : null;
    const initial = (stored === "light" || stored === "dark") ? stored : (
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    );
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") localStorage.setItem("wb-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set("q", q);
    else params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--surface)]/70 bg-[color:var(--surface)]/80 border-b border-[color:var(--border)]">
      <div className="container px-4 h-16 flex items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight text-lg text-[color:var(--fg)]">
          Whatbytes
        </Link>
        <form
          onSubmit={onSubmit}
          className="flex-1 max-w-xl mx-auto hidden sm:flex items-center gap-2 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-full px-3 py-2"
        >
          <Search className="w-4 h-4 text-[color:var(--muted)]" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-[color:var(--fg)] placeholder-[color:var(--muted)]"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
        <div className="flex items-center gap-1 sm:gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-[color:var(--surface)]" aria-label="toggle theme">
            {theme === "dark" ? <SunMedium /> : <Moon />}
          </button>
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-[color:var(--surface)]">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-[color:var(--primary)] text-[color:var(--primary-foreground)] px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="p-2 rounded-full hover:bg-[color:var(--surface)]" aria-label="profile">
            <User />
          </button>
        </div>
      </div>
      <div className="sm:hidden px-4 pb-3">
        <form onSubmit={onSubmit} className="flex items-center gap-2 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-full px-3 py-2">
          <Search className="w-4 h-4 text-[color:var(--muted)]" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-[color:var(--fg)] placeholder-[color:var(--muted)]"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
}


