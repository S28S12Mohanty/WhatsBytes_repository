"use client";

import { useEffect } from "react";
import { create } from "zustand";

type CartState = {
  items: Record<string, number>;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "whatbytes-cart";

function loadInitial(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  addItem: (productId, quantity = 1) => {
    const items = { ...get().items };
    items[productId] = (items[productId] ?? 0) + quantity;
    set({ items });
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
  removeItem: (productId) => {
    const items = { ...get().items };
    delete items[productId];
    set({ items });
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
  setQuantity: (productId, quantity) => {
    const items = { ...get().items };
    if (quantity <= 0) delete items[productId];
    else items[productId] = quantity;
    set({ items });
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
  clear: () => {
    set({ items: {} });
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
  },
}));

// Hydrate on first client mount
export function CartHydrator() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initial = loadInitial();
      useCartStore.setState({ items: initial });
    }
  }, []);
  return null;
}


