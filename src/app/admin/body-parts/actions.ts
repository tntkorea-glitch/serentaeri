"use server";

import { revalidatePath } from "next/cache";
import type { BodyPartGender } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { BODY_PART_SEED } from "./seed-data";

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
