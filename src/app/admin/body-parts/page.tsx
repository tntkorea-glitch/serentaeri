import { prisma } from "@/lib/prisma";
import {
  BODY_PART_CATEGORY_LABEL,
  BODY_PART_GENDER_LABEL,
  BODY_VIEW_LABEL,
} from "@/lib/constants";
import {
  createBodyPartAction,
  deleteBodyPartAction,
  seedBodyPartsAction,
  updateBodyPartGenderAction,
} from "./actions";
import { BODY_PART_SEED } from "./seed-data";

const CATEGORY_OPTIONS = Object.entries(BODY_PART_CATEGORY_LABEL) as Array<
  [keyof typeof BODY_PART_CATEGORY_LABEL, string]
>;

export default async function AdminBodyPartsPage() {
  const parts = await prisma.bodyPart.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
    include: { _count: { select: { recipes: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">인체 부위</h1>
          <p className="text-sm text-gray-500 mt-1">
            인체맵의 핫스팟으로 사용되며, 부위별 레시피가 이 목록에 연결됩니다.
            행을 눌러 성별/남녀 노트를 편집하세요.
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await seedBodyPartsAction();
          }}
        >
          <button
            type="submit"
            className="px-4 h-10 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800"
          >
            기본 부위 {BODY_PART_SEED.length}개 시드 (upsert)
          </button>
        </form>
      </div>

      {parts.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-500 text-sm">
          아직 등록된 부위가 없어요. 우측 「기본 부위 시드」로 초기 데이터를 넣으세요.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1.5fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr] bg-gray-50 px-4 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">
            <div>부위 / 슬러그</div>
            <div>카테고리</div>
            <div>성별</div>
            <div className="text-center">뷰</div>
            <div className="text-right">좌표</div>
            <div className="text-right">레시피</div>
          </div>

          <div className="divide-y divide-gray-100">
            {parts.map((p) => (
              <details key={p.id} className="group">
                <summary className="grid grid-cols-[1.5fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr] px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 list-none items-center">
                  <div>
                    <div className="font-medium text-gray-900">{p.name}</div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      {p.slug}
                    </div>
                  </div>
                  <div className="text-gray-600 text-xs">
                    {BODY_PART_CATEGORY_LABEL[p.category]}
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        p.gender === "FEMALE"
                          ? "bg-pink-100 text-pink-700"
                          : p.gender === "MALE"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {BODY_PART_GENDER_LABEL[p.gender]}
                    </span>
                    {(p.maleNote || p.femaleNote) && (
                      <span className="ml-1 text-[10px] text-emerald-700">
                        📝
                      </span>
                    )}
                  </div>
                  <div className="text-center text-xs text-gray-500">
                    {BODY_VIEW_LABEL[p.view]}
                  </div>
                  <div className="text-right text-xs font-mono text-gray-500">
                    {p.hotspotX !== null && p.hotspotY !== null
                      ? `${p.hotspotX}, ${p.hotspotY}`
                      : "—"}
                  </div>
                  <div className="text-right text-sm">{p._count.recipes}</div>
                </summary>

                <div className="px-4 pb-5 pt-1 bg-gray-50/70">
                  <form
                    action={async (formData: FormData) => {
                      "use server";
                      await updateBodyPartGenderAction(p.id, formData);
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                        성별 노출
                      </label>
                      <div className="flex gap-2">
                        {(["BOTH", "FEMALE", "MALE"] as const).map((g) => (
                          <label
                            key={g}
                            className="inline-flex items-center gap-1.5 text-sm"
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              defaultChecked={p.gender === g}
                              className="accent-emerald-600"
                            />
                            <span>{BODY_PART_GENDER_LABEL[g]}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-pink-700 tracking-widest uppercase mb-1">
                          여성 노트 (femaleNote)
                        </label>
                        <textarea
                          name="femaleNote"
                          defaultValue={p.femaleNote ?? ""}
                          rows={3}
                          placeholder="여성 관점에서의 보충 설명. 비워두면 표시되지 않음."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-sky-700 tracking-widest uppercase mb-1">
                          남성 노트 (maleNote)
                        </label>
                        <textarea
                          name="maleNote"
                          defaultValue={p.maleNote ?? ""}
                          rows={3}
                          placeholder="남성 관점에서의 보충 설명. 비워두면 표시되지 않음."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 h-9 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800"
                      >
                        저장
                      </button>
                    </div>
                  </form>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
