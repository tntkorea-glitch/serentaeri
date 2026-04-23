"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type {
  BodyPartCategory,
  BodyPartGender,
  BodyView,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { BODY_PART_SEED } from "./seed-data";

const CATEGORIES: readonly BodyPartCategory[] = [
  "HEAD",
  "UPPER",
  "DIGESTIVE",
  "LOWER",
  "SKIN",
  "EMOTION",
];
const VIEWS: readonly BodyView[] = ["FRONT", "BACK"];
const GENDERS: readonly BodyPartGender[] = ["BOTH", "FEMALE", "MALE"];

function parseOptionalNumber(raw: FormDataEntryValue | null) {
  if (raw === null) return null;
  const str = String(raw).trim();
  if (str === "") return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("관리자 권한이 필요합니다.");
  }
}

export async function updateBodyPartGenderAction(
  id: string,
  formData: FormData
) {
  await requireAdmin();

  const gender = formData.get("gender") as BodyPartGender;
  const maleNoteRaw = (formData.get("maleNote") as string | null)?.trim() ?? "";
  const femaleNoteRaw =
    (formData.get("femaleNote") as string | null)?.trim() ?? "";

  await prisma.bodyPart.update({
    where: { id },
    data: {
      gender: (["BOTH", "FEMALE", "MALE"] as const).includes(gender)
        ? gender
        : "BOTH",
      maleNote: maleNoteRaw === "" ? null : maleNoteRaw,
      femaleNote: femaleNoteRaw === "" ? null : femaleNoteRaw,
    },
  });

  revalidatePath("/admin/body-parts");
  revalidatePath("/body-map");
  revalidatePath(`/body-map/${id}`);
}

export async function seedBodyPartsAction() {
  await requireAdmin();

  let created = 0;
  let updated = 0;

  for (const part of BODY_PART_SEED) {
    const existing = await prisma.bodyPart.findUnique({
      where: { slug: part.slug },
    });
    if (existing) {
      await prisma.bodyPart.update({
        where: { slug: part.slug },
        data: part,
      });
      updated++;
    } else {
      await prisma.bodyPart.create({ data: part });
      created++;
    }
  }

  revalidatePath("/admin/body-parts");
  revalidatePath("/body-map");
  return { created, updated };
}

export async function deleteBodyPartAction(id: string) {
  await requireAdmin();
  await prisma.bodyPart.delete({ where: { id } });
  revalidatePath("/admin/body-parts");
  revalidatePath("/body-map");
}

export async function createBodyPartAction(formData: FormData) {
  await requireAdmin();

  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const categoryRaw = String(formData.get("category") ?? "") as BodyPartCategory;
  const viewRaw = String(formData.get("view") ?? "FRONT") as BodyView;
  const genderRaw = String(formData.get("gender") ?? "BOTH") as BodyPartGender;
  const description = String(formData.get("description") ?? "").trim();
  const maleNote = String(formData.get("maleNote") ?? "").trim();
  const femaleNote = String(formData.get("femaleNote") ?? "").trim();
  const hotspotX = parseOptionalNumber(formData.get("hotspotX"));
  const hotspotY = parseOptionalNumber(formData.get("hotspotY"));

  if (!slug || !name) {
    throw new Error("슬러그와 이름은 필수입니다.");
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error("슬러그는 영소문자/숫자/하이픈만 허용됩니다.");
  }
  if (!CATEGORIES.includes(categoryRaw)) {
    throw new Error("카테고리 값이 올바르지 않습니다.");
  }

  const existing = await prisma.bodyPart.findUnique({ where: { slug } });
  if (existing) {
    throw new Error(`이미 존재하는 슬러그입니다: ${slug}`);
  }

  const maxOrder = await prisma.bodyPart.aggregate({
    where: { category: categoryRaw },
    _max: { order: true },
  });
  const nextOrder = (maxOrder._max.order ?? 0) + 10;

  await prisma.bodyPart.create({
    data: {
      slug,
      name,
      category: categoryRaw,
      view: VIEWS.includes(viewRaw) ? viewRaw : "FRONT",
      gender: GENDERS.includes(genderRaw) ? genderRaw : "BOTH",
      description: description === "" ? null : description,
      maleNote: maleNote === "" ? null : maleNote,
      femaleNote: femaleNote === "" ? null : femaleNote,
      hotspotX,
      hotspotY,
      order: nextOrder,
    },
  });

  revalidatePath("/admin/body-parts");
  revalidatePath("/body-map");
  redirect("/admin/body-parts");
}
