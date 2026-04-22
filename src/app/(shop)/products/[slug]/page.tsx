import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  PRODUCT_CATEGORY_LABEL,
  formatKRW,
  RECIPE_USAGE_LABEL,
} from "@/lib/constants";

type Params = Promise<{ slug: string }>;

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      recipeIngredients: {
        include: { recipe: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!product || !product.isPublished) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/products" className="text-xs text-gray-500 hover:text-gray-900">
        ← 상품 목록
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-4">
        {/* Image */}
        <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden relative">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl text-gray-300">
              🌿
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="text-xs text-gray-400 mb-2">
            {PRODUCT_CATEGORY_LABEL[product.category]}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            {product.name}
          </h1>
          {product.nameEn && (
            <div className="text-sm text-gray-500 mb-4">{product.nameEn}</div>
          )}

          {product.volume && (
            <div className="text-sm text-gray-600 mb-6">
              용량 · {product.volume}
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-gray-100">
            <span className="text-3xl font-extrabold">
              {formatKRW(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-base text-gray-400 line-through">
                {formatKRW(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.description && (
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-8">
              {product.description}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 h-13 px-6 py-4 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 disabled:bg-gray-300"
              disabled
              title="장바구니 기능은 곧 추가됩니다"
            >
              장바구니에 담기
            </button>
            <button
              type="button"
              className="h-13 px-6 py-4 border border-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50"
              disabled
              title="결제 기능은 곧 추가됩니다"
            >
              바로 구매
            </button>
          </div>

          <p className="text-[11px] text-gray-400 mt-3">
            장바구니/결제 기능은 곧 추가됩니다. 그 전에는 카카오톡으로 주문 문의해주세요.
          </p>

          {product.stock <= 5 && product.stock > 0 && (
            <div className="mt-3 text-xs text-amber-700">
              ⚠ 남은 재고 {product.stock}개
            </div>
          )}
          {product.stock === 0 && (
            <div className="mt-3 text-xs text-red-600">품절</div>
          )}
        </div>
      </div>

      {/* 사용된 레시피 */}
      {product.recipeIngredients.length > 0 && (
        <div className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-xl font-bold mb-6">이 오일이 들어가는 레시피</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.recipeIngredients
              .filter((ri) => ri.recipe.isPublished)
              .map((ri) => (
                <Link
                  key={ri.id}
                  href={`/recipes/${ri.recipe.slug}`}
                  className="block p-5 rounded-xl border border-gray-200 hover:border-gray-900 transition"
                >
                  <div className="text-xs text-emerald-700 font-semibold mb-1">
                    {RECIPE_USAGE_LABEL[ri.recipe.usage]}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {ri.recipe.title}
                  </div>
                  {ri.recipe.summary && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {ri.recipe.summary}
                    </p>
                  )}
                </Link>
              ))}
          </div>
        </div>
      )}

      <div className="mt-16 rounded-xl bg-amber-50 border border-amber-100 p-5 text-xs text-amber-800 leading-relaxed">
        본 제품은 의약품이 아니며, 의학적 진단·치료를 대체하지 않습니다.
        알레르기, 임신·수유, 영유아, 반려동물 환경에서 사용 시 사전 주의를 확인하세요.
      </div>
    </div>
  );
}
