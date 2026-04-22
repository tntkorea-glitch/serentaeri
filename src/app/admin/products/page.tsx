import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PRODUCT_CATEGORY_LABEL, formatKRW } from "@/lib/constants";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <Link
          href="/admin/products/new"
          className="px-4 h-10 inline-flex items-center bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800"
        >
          + 신규 상품
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-500 text-sm">
          등록된 상품이 없습니다. 우측 상단 「신규 상품」으로 첫 상품을 등록해보세요.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-medium">상품명</th>
                <th className="text-left px-4 py-3 font-medium">카테고리</th>
                <th className="text-right px-4 py-3 font-medium">가격</th>
                <th className="text-right px-4 py-3 font-medium">재고</th>
                <th className="text-center px-4 py-3 font-medium">공개</th>
                <th className="text-right px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {PRODUCT_CATEGORY_LABEL[p.category]}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatKRW(p.price)}
                  </td>
                  <td className="px-4 py-3 text-right">{p.stock}</td>
                  <td className="px-4 py-3 text-center">
                    {p.isPublished ? (
                      <span className="inline-block text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded">
                        공개
                      </span>
                    ) : (
                      <span className="inline-block text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                        비공개
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                    >
                      편집
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
