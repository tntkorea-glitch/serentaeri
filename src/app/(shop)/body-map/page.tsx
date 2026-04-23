import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BodyMap from "@/components/body-map/BodyMapSection";
import { BODY_PART_CATEGORY_LABEL } from "@/lib/constants";
import type { BodyPartCategory } from "@prisma/client";

const LISTED_CATEGORIES: BodyPartCategory[] = ["EMOTION", "SKIN"];

export default async function BodyMapPage({
  searchParams,
}: {
  searchParams: Promise<{ gender?: string }>;
}) {
  const { gender: genderParam } = await searchParams;
  const gender: "female" | "male" =
    genderParam === "male" ? "male" : "female";

  const parts = await prisma.bodyPart.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { recipes: true } } },
  });

  const listed = parts.filter((p) =>
    p.hotspotX === null || p.hotspotY === null
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-10 md:mb-14">
        <div className="inline-block text-xs font-semibold tracking-widest text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full mb-3">
          BODY MAP
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          어느 부위가 신경 쓰이세요?
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          깜빡이는 부위를 클릭하면 그에 좋은 아로마 레시피와 오일을 확인할 수 있어요.
        </p>
      </header>

      {parts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
          아직 등록된 부위가 없어요. 관리자 페이지에서 시드 데이터를 삽입해주세요.
        </div>
      ) : (
        <>
          {/* 인체 맵 */}
          <div className="mb-16">
            <BodyMap parts={parts} initialGender={gender} />
          </div>

          {/* 좌표 없는 카테고리 (정서/수면, 피부 전신 등) */}
          <div className="space-y-10">
            {LISTED_CATEGORIES.map((cat) => {
              const items = listed.filter((p) => p.category === cat);
              if (items.length === 0) return null;
              return (
                <section key={cat}>
                  <h2 className="text-lg font-bold mb-4">
                    {BODY_PART_CATEGORY_LABEL[cat]}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {items.map((p) => (
                      <Link
                        key={p.id}
                        href={`/body-map/${p.slug}?gender=${gender}`}
                        className="rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-900 hover:shadow-sm transition"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {p.name}
                          </span>
                          {p.gender !== "BOTH" && (
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                                p.gender === "FEMALE"
                                  ? "bg-pink-100 text-pink-700"
                                  : "bg-sky-100 text-sky-700"
                              }`}
                            >
                              {p.gender === "FEMALE" ? "여성" : "남성"}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-2">
                          {p.description}
                        </div>
                        <div className="text-[11px] text-emerald-700 mt-2">
                          레시피 {p._count.recipes}개
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-16 rounded-xl bg-amber-50 border border-amber-100 p-5 text-xs text-amber-800 leading-relaxed">
        본 사이트의 부위별 레시피는 전통적 활용 사례와 공개 자료를 기반으로 한
        일반 정보이며, 의학적 진단·치료·예방을 대체하지 않습니다. 건강상 우려가
        있으면 반드시 의료 전문가와 상의하세요.
      </div>

    </div>
  );
}
