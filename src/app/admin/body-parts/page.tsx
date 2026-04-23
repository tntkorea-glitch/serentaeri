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

      {/* 새 부위 추가 */}
      <details className="mb-6 bg-white rounded-lg border border-gray-200 group">
        <summary className="px-4 py-3 text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 list-none flex items-center justify-between">
          <span>＋ 새 부위 추가</span>
          <span className="text-xs text-gray-400 group-open:hidden">
            (클릭하여 펼치기)
          </span>
        </summary>
        <div className="px-4 pb-5 border-t border-gray-100">
          <form action={createBodyPartAction} className="space-y-4 pt-4">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                  이름 *
                </label>
                <input
                  name="name"
                  required
                  placeholder="예: 생리·PMS"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                  슬러그 * <span className="text-gray-400 font-normal normal-case">(영소문자/숫자/-)</span>
                </label>
                <input
                  name="slug"
                  required
                  pattern="[a-z0-9-]+"
                  placeholder="예: menstrual"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                  카테고리 *
                </label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none bg-white"
                >
                  <option value="" disabled>
                    선택
                  </option>
                  {CATEGORY_OPTIONS.map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                  성별 *
                </label>
                <select
                  name="gender"
                  defaultValue="BOTH"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none bg-white"
                >
                  <option value="BOTH">남녀 공통</option>
                  <option value="FEMALE">여성 전용</option>
                  <option value="MALE">남성 전용</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                  뷰
                </label>
                <select
                  name="view"
                  defaultValue="FRONT"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none bg-white"
                >
                  <option value="FRONT">정면</option>
                  <option value="BACK">후면</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                  핫스팟 X <span className="text-gray-400 font-normal normal-case">(0~100, 비워두면 맵에 미표시)</span>
                </label>
                <input
                  name="hotspotX"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="비움"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                  핫스팟 Y <span className="text-gray-400 font-normal normal-case">(0~180)</span>
                </label>
                <input
                  name="hotspotY"
                  type="number"
                  step="0.1"
                  min="0"
                  max="180"
                  placeholder="비움"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-1">
                설명 <span className="text-gray-400 font-normal normal-case">(짧게 한 줄)</span>
              </label>
              <input
                name="description"
                placeholder="예: 주기 관련 하복부 긴장, 기분 기복"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-pink-700 tracking-widest uppercase mb-1">
                  여성 노트
                </label>
                <textarea
                  name="femaleNote"
                  rows={2}
                  placeholder="선택. 여성 관점 보충 설명."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-sky-700 tracking-widest uppercase mb-1">
                  남성 노트
                </label>
                <textarea
                  name="maleNote"
                  rows={2}
                  placeholder="선택. 남성 관점 보충 설명."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-200 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="reset"
                className="px-4 h-9 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50"
              >
                초기화
              </button>
              <button
                type="submit"
                className="px-4 h-9 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700"
              >
                부위 추가
              </button>
            </div>
          </form>
        </div>
      </details>

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

                    <div className="flex justify-between items-center pt-1">
                      <button
                        type="submit"
                        className="px-4 h-9 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800"
                      >
                        저장
                      </button>

                      {p._count.recipes === 0 ? (
                        <button
                          type="submit"
                          formAction={async () => {
                            "use server";
                            await deleteBodyPartAction(p.id);
                          }}
                          formNoValidate
                          className="px-3 h-9 text-xs font-semibold text-red-700 border border-red-200 rounded-lg hover:bg-red-50"
                        >
                          이 부위 삭제
                        </button>
                      ) : (
                        <span className="text-[11px] text-gray-400">
                          레시피 {p._count.recipes}개 연결되어 삭제 불가
                        </span>
                      )}
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
