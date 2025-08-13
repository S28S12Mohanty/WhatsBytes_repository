import SmartImage from "@/components/SmartImage";
import Header from "@/components/Header";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import { findProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import AddToCartControls from "@/components/AddToCartControls";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = findProductById(id);
  if (!product) return notFound();

  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <main className="container px-4 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[color:var(--border)]">
            <SmartImage
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((src, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-[color:var(--border)]">
                <SmartImage src={src} alt={`${product.title} ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{product.title}</h1>
            <p className="text-neutral-400 mt-1 capitalize">{product.category} · {product.brand}</p>
          </div>
          <div className="text-3xl font-bold text-emerald-400">${product.price.toFixed(2)}</div>
          <p className="text-neutral-300 leading-relaxed">{product.description}</p>
          <AddToCartControls productId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

