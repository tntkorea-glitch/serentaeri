"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma, ProductCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("관리자 권한이 필요합니다.");
  }
  return session.user;
}

function parseImages(raw: string): string[] {
  return raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseIntOrNull(raw: FormDataEntryValue | null): number | null {
  if (raw === null || raw === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();

  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  if (!slug || !name) {
    throw new Error("slug와 상품명은 필수입니다.");
  }

  const data: Prisma.ProductCreateInput = {
    slug,
    name,
    nameEn: String(formData.get("nameEn") ?? "").trim() || null,
    sku: String(formData.get("sku") ?? "").trim() || null,
    category: formData.get("category") as ProductCategory,
    price: parseIntOrNull(formData.get("price")) ?? 0,
    compareAtPrice: parseIntOrNull(formData.get("compareAtPrice")),
    stock: parseIntOrNull(formData.get("stock")) ?? 0,
    volume: String(formData.get("volume") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    images: parseImages(String(formData.get("images") ?? "")),
    isPublished: formData.get("isPublished") === "on",
  };

  const product = await prisma.product.create({ data });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect(`/admin/products/${product.id}/edit?created=1`);
}

export async function updateProductAction(id: string, formData: FormData) {
  await requireAdmin();

  const data: Prisma.ProductUpdateInput = {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    nameEn: String(formData.get("nameEn") ?? "").trim() || null,
    sku: String(formData.get("sku") ?? "").trim() || null,
    category: formData.get("category") as ProductCategory,
    price: parseIntOrNull(formData.get("price")) ?? 0,
    compareAtPrice: parseIntOrNull(formData.get("compareAtPrice")),
    stock: parseIntOrNull(formData.get("stock")) ?? 0,
    volume: String(formData.get("volume") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    images: parseImages(String(formData.get("images") ?? "")),
    isPublished: formData.get("isPublished") === "on",
  };

  await prisma.product.update({ where: { id }, data });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug as string}`);
  redirect(`/admin/products/${id}/edit?saved=1`);
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}
