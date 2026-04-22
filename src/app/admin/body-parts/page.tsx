import { prisma } from "@/lib/prisma";
import {
  BODY_PART_CATEGORY_LABEL,
  BODY_VIEW_LABEL,
} from "@/lib/constants";
import { seedBodyPartsAction } from "./actions";
import { BODY_PART_SEED } from "./seed-data";

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
          </p>
        </div>
        <form action={async () => {
          "use server";
          await seedBodyPartsAction();
        }}>
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
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-medium">부위</th>
                <th className="text-left px-4 py-3 font-medium">슬러그</th>
                <th className="text-left px-4 py-3 font-medium">카테고리</th>
                <th className="text-center px-4 py-3 font-medium">뷰</th>
                <th className="text-right px-4 py-3 font-medium">좌표 (x, y)</th>
                <th className="text-right px-4 py-3 font-medium">레시피</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                    {p.slug}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {BODY_PART_CATEGORY_LABEL[p.category]}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-500">
                    {BODY_VIEW_LABEL[p.view]}
                  </td>
                  <td className="px-4 py-3 text-right text-xs font-mono text-gray-500">
                    {p.hotspotX !== null && p.hotspotY !== null
                      ? `${p.hotspotX}, ${p.hotspotY}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">{p._count.recipes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
