import type { ProductCategory, RecipeUsage, BodyPartCategory, BodyView, BodyPartGender, OrderStatus, UserRole } from "@prisma/client";

export const PRODUCT_CATEGORY_LABEL: Record<ProductCategory, string> = {
  SINGLE_OIL: "싱글 에센셜 오일",
  BLEND_OIL: "블렌드 오일",
  NUTRITION: "뉴트리션",
  SKINCARE: "스킨케어",
  HAIR_BODY: "헤어 & 바디",
  COLLECTION: "콜렉션 키트",
  ACCESSORY: "디퓨저 & 액세서리",
};

export const RECIPE_USAGE_LABEL: Record<RecipeUsage, string> = {
  DIFFUSER: "디퓨저",
  ROLL_ON: "롤온",
  MASSAGE: "마사지",
  INHALE: "흡입",
  BATH: "입욕",
  TOPICAL: "국소도포",
};

export const BODY_PART_CATEGORY_LABEL: Record<BodyPartCategory, string> = {
  HEAD: "머리/안면",
  UPPER: "상체",
  DIGESTIVE: "소화기",
  LOWER: "하체",
  SKIN: "피부",
  EMOTION: "정서/수면",
};

export const BODY_VIEW_LABEL: Record<BodyView, string> = {
  FRONT: "정면",
  BACK: "후면",
};

export const BODY_PART_GENDER_LABEL: Record<BodyPartGender, string> = {
  BOTH: "남녀 공통",
  FEMALE: "여성",
  MALE: "남성",
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "결제 대기",
  PAID: "결제 완료",
  PREPARING: "배송 준비",
  SHIPPING: "배송중",
  DELIVERED: "배송 완료",
  CANCELED: "취소",
  REFUNDED: "환불",
};

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  CUSTOMER: "고객",
  ADMIN: "관리자",
};

export const formatKRW = (amount: number) =>
  new Intl.NumberFormat("ko-KR").format(amount) + "원";
