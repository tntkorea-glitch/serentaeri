import { Product, ProductCategory } from "@prisma/client";
import { PRODUCT_CATEGORY_LABEL } from "@/lib/constants";
import ImageUploader from "@/components/ImageUploader";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  product?: Product;
  submitLabel: string;
};

export default function ProductForm({ action, product, submitLabel }: Props) {
  return (
    <form action={action} className="space-y-5 max-w-3xl">
      <Row label="슬러그 (URL)" required>
        <input
          name="slug"
          defaultValue={product?.slug}
          required
          pattern="[a-z0-9\-]+"
          placeholder="lavender-essential-oil"
          className="input"
        />
        <p className="hint">영문 소문자/숫자/하이픈만. 예: lavender-essential-oil</p>
      </Row>

      <Row label="상품명 (한글)" required>
        <input
          name="name"
          defaultValue={product?.name}
          required
          placeholder="라벤더 에센셜 오일"
          className="input"
        />
      </Row>

      <Row label="상품명 (영문)">
        <input
          name="nameEn"
          defaultValue={product?.nameEn ?? ""}
          placeholder="Lavender"
          className="input"
        />
      </Row>

      <Row label="SKU (재고 코드)">
        <input
          name="sku"
          defaultValue={product?.sku ?? ""}
          placeholder="DOT-LAV-15"
          className="input"
        />
      </Row>

      <Row label="카테고리" required>
        <select
          name="category"
          defaultValue={product?.category ?? "SINGLE_OIL"}
          required
          className="input"
        >
          {(Object.keys(PRODUCT_CATEGORY_LABEL) as ProductCategory[]).map((v) => (
            <option key={v} value={v}>
              {PRODUCT_CATEGORY_LABEL[v]}
            </option>
          ))}
        </select>
      </Row>

      <div className="grid grid-cols-3 gap-4">
        <Row label="판매가 (원)" required>
          <input
            name="price"
            type="number"
            min="0"
            defaultValue={product?.price ?? 0}
            required
            className="input"
          />
        </Row>
        <Row label="정가 (원, 선택)">
          <input
            name="compareAtPrice"
            type="number"
            min="0"
            defaultValue={product?.compareAtPrice ?? ""}
            className="input"
          />
        </Row>
        <Row label="재고">
          <input
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock ?? 0}
            className="input"
          />
        </Row>
      </div>

      <Row label="용량">
        <input
          name="volume"
          defaultValue={product?.volume ?? ""}
          placeholder="15ml / 60캡슐 / 5종 세트 등"
          className="input"
        />
      </Row>

      <Row label="상품 설명">
        <textarea
          name="description"
          defaultValue={product?.description ?? ""}
          rows={6}
          className="input"
          placeholder="향, 사용법, 주의사항 등 자유 서술"
        />
      </Row>

      <Row label="이미지">
        <ImageUploader name="images" initialImages={product?.images ?? []} />
      </Row>

      <Row label="">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={product?.isPublished ?? false}
            className="w-4 h-4"
          />
          <span>공개 (사이트에 노출)</span>
        </label>
      </Row>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="px-5 h-10 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Row({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}
