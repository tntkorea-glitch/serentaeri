import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "../../_components/ProductForm";
import { updateProductAction, deleteProductAction } from "../../actions";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ created?: string; saved?: string }>;

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const updateBound = updateProductAction.bind(null, id);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-xs text-gray-500 hover:text-gray-900"
        >
          ← 상품 목록
        </Link>
        <div className="flex items-center justify-between mt-1">
          <h1 className="text-2xl font-bold">상품 편집</h1>
          {product.isPublished && (
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              사이트에서 보기 ↗
            </Link>
          )}
        </div>
      </div>

      {(sp.created || sp.saved) && (
        <div className="mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg">
          {sp.created ? "상품이 등록되었습니다." : "상품 정보가 저장되었습니다."}
        </div>
      )}

      <ProductForm
        action={updateBound}
        product={product}
        submitLabel="저장"
      />

      <div className="mt-12 pt-6 border-t border-red-200">
        <h3 className="text-sm font-semibold text-red-700 mb-2">위험 영역</h3>
        <p className="text-xs text-gray-500 mb-3">
          삭제하면 복구할 수 없습니다. 주문 이력에 사용된 상품은 삭제 시
          외래키 충돌이 발생할 수 있어요.
        </p>
        <form
          action={async () => {
            "use server";
            await deleteProductAction(id);
          }}
        >
          <button
            type="submit"
            className="px-4 h-9 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700"
          >
            상품 삭제
          </button>
        </form>
      </div>
    </div>
  );
}
