import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BodyMap from "@/components/body-map/BodyMapSection";
import {
  BODY_PART_CATEGORY_LABEL,
  BODY_PART_GENDER_LABEL,
  RECIPE_USAGE_LABEL,
  formatKRW,
} from "@/lib/constants";

type Params = Promise<{ slug: string }>;

export default async function BodyPartDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ gender?: string }>;
}) {
  const { slug } = await params;
  const { gender: genderParam } = await searchParams;
  const gender: "female" | "male" =
    genderParam === "male" ? "male" : "female";

  const part = await prisma.bodyPart.findUnique({
    where: { slug },
    include: {
      recipes: {
        include: {
          recipe: {
            include: {
              ingredients: {
                include: { product: true },
                orderBy: { order: "asc" },
              },
            },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!part) notFound();

  const allParts = await prisma.bodyPart.findMany({
    orderBy: { order: "asc" },
  });

  const publishedRecipes = part.recipes
    .map((r) => r.recipe)
    .filter((r) => r.isPublished);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link
        href={`/body-map?gender=${gender}`}
        className="text-xs text-gray-500 hover:text-gray-900"
      >
        ← 인체맵으로
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 mt-4">
        {/* Left: body map with active part */}
        <div className="order-2 lg:order-1">
          <BodyMap parts={allParts} activeSlug={part.slug} initialGender={gender} />
        </div>

        {/* Right: part info + recipes */}
        <div className="order-1 lg:order-2">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs text-emerald-700 font-semibold tracking-widest">
              {BODY_PART_CATEGORY_LABEL[part.category]}
            </span>
            {part.gender !== "BOTH" && (
              <span
                className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  part.gender === "FEMALE"
                    ? "bg-pink-100 text-pink-700"
                    : "bg-sky-100 text-sky-700"
                }`}
              >
                {BODY_PART_GENDER_LABEL[part.gender]} 전용
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            {part.name}
          </h1>
          {part.description && (
            <p className="text-gray-600 leading-relaxed mb-6">
              {part.description}
            </p>
          )}

          {(part.femaleNote || part.maleNote) && (
            <div className="space-y-3 mb-8">
              {part.femaleNote && (
                <div className="rounded-xl border border-pink-100 bg-pink-50/60 px-4 py-3">
                  <div className="text-[11px] font-bold text-pink-700 tracking-widest mb-1">
                    여성
                  </div>
                  <p className="text-sm text-pink-900/90 leading-relaxed">
                    {part.femaleNote}
                  </p>
                </div>
              )}
              {part.maleNote && (
                <div className="rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3">
                  <div className="text-[11px] font-bold text-sky-700 tracking-widest mb-1">
                    남성
                  </div>
                  <p className="text-sm text-sky-900/90 leading-relaxed">
                    {part.maleNote}
                  </p>
                </div>
              )}
            </div>
          )}

          <h2 className="text-lg font-bold mb-4">
            {part.name}에 추천하는 레시피{" "}
            {publishedRecipes.length > 0 && (
              <span className="text-gray-400 font-normal">
                ({publishedRecipes.length})
              </span>
            )}
          </h2>

          {publishedRecipes.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-500 text-sm">
              이 부위에 대한 레시피가 아직 준비 중입니다.
            </div>
          ) : (
            <div className="space-y-6">
              {publishedRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="border border-gray-200 rounded-2xl p-5 bg-white"
                >
                  <div className="text-[11px] text-emerald-700 font-semibold tracking-widest mb-1">
                    {RECIPE_USAGE_LABEL[recipe.usage]}
                  </div>
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="block hover:underline"
                  >
                    <h3 className="text-lg font-bold mb-1">{recipe.title}</h3>
                  </Link>
                  {recipe.summary && (
                    <p className="text-sm text-gray-600 mb-3">
                      {recipe.summary}
                    </p>
                  )}

                  {recipe.ingredients.length > 0 && (
                    <>
                      <div className="text-[11px] uppercase tracking-wider text-gray-400 mt-4 mb-2">
                        사용 오일
                      </div>
                      <ul className="space-y-1.5 text-sm mb-3">
                        {recipe.ingredients.map((ing) => (
                          <li key={ing.id} className="flex justify-between">
                            <span>{ing.product.name}</span>
                            <span className="text-gray-500 text-xs">
                              {ing.dropCount ?? ""}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-2 mt-3 flex-wrap">
                        {recipe.ingredients.map((ing) => (
                          <Link
                            key={ing.id}
                            href={`/products/${ing.product.slug}`}
                            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-900 bg-white text-xs transition"
                          >
                            <span className="w-6 h-6 rounded bg-gray-100 relative overflow-hidden shrink-0">
                              {ing.product.images[0] ? (
                                <Image
                                  src={ing.product.images[0]}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="24px"
                                />
                              ) : (
                                <span className="flex items-center justify-center w-full h-full text-xs">
                                  🌿
                                </span>
                              )}
                            </span>
                            <span className="font-medium">
                              {ing.product.name}
                            </span>
                            <span className="text-gray-500">
                              {formatKRW(ing.product.price)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  {recipe.cautions && (
                    <div className="mt-4 text-[11px] text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 leading-relaxed">
                      ⚠ {recipe.cautions}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 rounded-xl bg-amber-50 border border-amber-100 p-5 text-xs text-amber-800 leading-relaxed">
        본 콘텐츠는 일반 정보 제공 목적이며, 의학적 진단·치료·예방을 대체하지
        않습니다. 알레르기, 임신·수유, 영유아, 반려동물 환경에서는 반드시 사용 전
        전문가와 상의하세요.
      </div>
    </div>
  );
}
