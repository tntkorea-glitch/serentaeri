import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PRODUCT_CATEGORY_LABEL } from "@/lib/constants";
import { formatKRW } from "@/lib/constants";
import type { ProductCategory } from "@prisma/client";

const CATEGORY_CARDS: { key: ProductCategory; emoji: string }[] = [
  { key: "SINGLE_OIL", emoji: "🌿" },
  { key: "BLEND_OIL", emoji: "🧪" },
  { key: "NUTRITION", emoji: "💊" },
  { key: "SKINCARE", emoji: "🪞" },
  { key: "HAIR_BODY", emoji: "🧴" },
  { key: "COLLECTION", emoji: "🎁" },
  { key: "ACCESSORY", emoji: "🌬️" },
];

export default async function HomePage() {
  const bestSellers = await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block text-xs font-semibold tracking-widest text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full mb-4">
              doTERRA WELLNESS
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-5">
              내 몸이 보내는 신호,
              <br />
              <span className="text-emerald-700">아로마</span>로 답하다
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              부위별로 필요한 에센셜 오일 레시피를 한눈에.
              도테라 정품으로 매일의 웰니스를 관리하세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/body-map"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
              >
                부위별 레시피 보기 →
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-gray-300 bg-white text-sm font-semibold hover:bg-gray-50 transition"
              >
                전체 상품
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center">
              <div className="text-9xl">🌿</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">오늘의 추천</div>
              <div className="text-sm font-semibold">수면 · 휴식 블렌드</div>
              <div className="text-xs text-gray-400 mt-0.5">라벤더 + 시더우드</div>
            </div>
          </div>
        </div>
      </section>

      {/* Body Map CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Link
          href="/body-map"
          className="group block relative overflow-hidden rounded-3xl bg-gray-900 text-white p-8 md:p-12 hover:bg-gray-800 transition"
        >
          <div className="relative z-10 max-w-xl">
            <div className="text-xs text-emerald-300 font-semibold tracking-widest mb-3">
              BODY MAP
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              몸의 어느 부위가 신경 쓰이세요?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              눈, 코, 간, 심장, 수면까지. 부위별로 도움되는 레시피와 필요한 오일을
              한 번에 확인하세요.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 group-hover:gap-3 transition-all">
              인체맵 보기 →
            </span>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[240px] opacity-10 pr-8 pointer-events-none select-none">
            🧍
          </div>
        </Link>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold">카테고리</h2>
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900">
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORY_CARDS.map(({ key, emoji }) => (
            <Link
              key={key}
              href={`/products?category=${key}`}
              className="aspect-square rounded-2xl border border-gray-200 bg-white p-4 flex flex-col items-center justify-center gap-2 hover:border-gray-900 hover:shadow-sm transition"
            >
              <div className="text-3xl">{emoji}</div>
              <div className="text-xs text-center text-gray-700 font-medium leading-tight">
                {PRODUCT_CATEGORY_LABEL[key]}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">베스트셀러</h2>
            <p className="text-sm text-gray-500 mt-1">가장 사랑받는 도테라 제품</p>
          </div>
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900">
            전체보기 →
          </Link>
        </div>

        {bestSellers.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
            <div className="text-5xl mb-3">🌱</div>
            <p className="text-sm">
              아직 등록된 상품이 없어요. 관리자 페이지에서 첫 상품을 등록해보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestSellers.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="group"
              >
                <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden mb-2 relative">
                  {p.images[0] ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
                      🌿
                    </div>
                  )}
                </div>
                <div className="text-[13px] font-medium text-gray-900 line-clamp-1">
                  {p.name}
                </div>
                <div className="text-[13px] font-bold mt-0.5">
                  {formatKRW(p.price)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Trust / Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-6 md:p-8">
          <div className="text-xs font-semibold text-amber-800 tracking-widest mb-2">
            IMPORTANT NOTICE
          </div>
          <h3 className="text-base md:text-lg font-bold text-amber-900 mb-2">
            아로마는 의약품이 아닙니다
          </h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            본 사이트에서 제공하는 모든 레시피와 사용법은 전통적 활용 사례 및 공개
            자료에 기반한 일반 정보이며, 의학적 진단·치료·예방을 대체하지 않습니다.
            알레르기, 임신·수유, 영유아, 반려동물 환경에서는 반드시 사용 전 전문가와
            상의하세요.
          </p>
        </div>
      </section>
    </>
  );
}
