import Link from "next/link";
import ProductForm from "../_components/ProductForm";
import { createProductAction } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-xs text-gray-500 hover:text-gray-900"
        >
          ← 상품 목록
        </Link>
        <h1 className="text-2xl font-bold mt-1">신규 상품</h1>
      </div>

      <ProductForm action={createProductAction} submitLabel="상품 등록" />
    </div>
  );
}
