import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  PRODUCT_CATEGORY_LABEL,
  formatKRW,
} from "@/lib/constants";
import type { ProductCategory } from "@prisma/client";

const CATEGORIES: ("ALL" | ProductCategory)[] = [
  "ALL",
  "SINGLE_OIL",
  "BLEND_OIL",
  "NUTRITION",
  "SKINCARE",
  "HAIR_BODY",
  "COLLECTION",
  "ACCESSORY",
];

type SearchParams = Promise<{ category?: string }>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const selected = (sp.category as ProductCategory | undefined) ?? null;

  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      ...(selected ? { category: selected } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">상품</h1>
        <p className="text-gray-500 text-sm">
          도테라 공식 정품. 한 곳에서 둘러보고 한 번에 주문.
        </p>
      </header>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => {
          const isSelected = c === "ALL" ? !selected : selected === c;
          const href = c === "ALL" ? "/products" : `/products?category=${c}`;
          const label =
            c === "ALL" ? "전체" : PRODUCT_CATEGORY_LABEL[c as ProductCategory];
          return (
            <Link
              key={c}
              href={href}
              className={`px-3.5 h-9 inline-flex items-center text-sm rounded-full border transition ${
                isSelected
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Product grid */}
      {products.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
          <div className="text-5xl mb-3">🌿</div>
          <p className="text-sm">
            이 카테고리에 등록된 상품이 아직 없어요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="group">
              <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden mb-3 relative">
                {p.images[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 280px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">
                    🌿
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-400 mb-0.5">
                {PRODUCT_CATEGORY_LABEL[p.category]}
              </div>
              <div className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {p.name}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold">{formatKRW(p.price)}</span>
                {p.compareAtPrice && p.compareAtPrice > p.price && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatKRW(p.compareAtPrice)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
