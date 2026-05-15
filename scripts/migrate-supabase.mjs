/**
 * Supabase 계정 이관 스크립트 — serentaeri
 *
 * 사전 준비:
 *   1. 새 Supabase 계정에 프로젝트 생성 (리전: ap-northeast-2)
 *   2. 새 프로젝트에 Prisma 스키마 적용:
 *        DATABASE_URL="새DB_URL" DIRECT_URL="새DB_DIRECT_URL" npx prisma migrate deploy
 *   3. 아래 NEW_* 값 채우기
 *
 * 실행:
 *   node scripts/migrate-supabase.mjs
 */

import { createClient } from "@supabase/supabase-js";

// ── 구 프로젝트 (source) ──────────────────────────────────────
const OLD_URL = "https://lurfjyhcghcsoingtxac.supabase.co";
const OLD_SERVICE_KEY = process.env.OLD_SUPABASE_SERVICE_KEY ?? "";

// ── 신 프로젝트 (target) — 아래 값을 새 프로젝트 것으로 교체 ──
const NEW_URL = process.env.NEW_SUPABASE_URL ?? "";
const NEW_SERVICE_KEY = process.env.NEW_SUPABASE_SERVICE_KEY ?? "";

const STORAGE_BUCKET = "serentaeri-product-images";

// FK 의존성 순서 — 부모 테이블 먼저
const TABLES = [
  { name: "User",               pk: "id",         conflict: "id" },
  { name: "VerificationToken",  pk: "identifier",  conflict: "identifier,token" },
  { name: "Account",            pk: "id",         conflict: "provider,providerAccountId" },
  { name: "Session",            pk: "id",         conflict: "sessionToken" },
  { name: "Product",            pk: "id",         conflict: "id" },
  { name: "BodyPart",           pk: "id",         conflict: "id" },
  { name: "Recipe",             pk: "id",         conflict: "id" },
  { name: "RecipeIngredient",   pk: "id",         conflict: "recipeId,productId" },
  { name: "BodyPartRecipe",     pk: "id",         conflict: "bodyPartId,recipeId" },
  { name: "Favorite",           pk: "id",         conflict: "id" },
  { name: "CartItem",           pk: "id",         conflict: "userId,productId" },
  { name: "Order",              pk: "id",         conflict: "id" },
  { name: "OrderItem",          pk: "id",         conflict: "id" },
];

// ─────────────────────────────────────────────────────────────

const src = createClient(OLD_URL, OLD_SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const dst = createClient(NEW_URL, NEW_SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function migrateTable({ name, conflict }) {
  process.stdout.write(`▶ ${name} ... `);
  const { data, error } = await src.from(name).select("*");
  if (error) throw new Error(`${name} 읽기 실패: ${error.message}`);

  if (!data.length) {
    console.log("비어있음 (건너뜀)");
    return 0;
  }

  const PAGE = 500;
  let offset = 0;
  while (offset < data.length) {
    const chunk = data.slice(offset, offset + PAGE);
    const { error: e } = await dst
      .from(name)
      .upsert(chunk, { onConflict: conflict });
    if (e) throw new Error(`${name} 쓰기 실패 (offset ${offset}): ${e.message}`);
    offset += PAGE;
  }

  console.log(`✓ ${data.length}개`);
  return data.length;
}

async function migrateStorage() {
  console.log(`\n▶ Storage 버킷 이관 (${STORAGE_BUCKET}) ...`);

  // 새 버킷 생성 (없으면)
  const { error: bucketErr } = await dst.storage.createBucket(STORAGE_BUCKET, {
    public: true,
  });
  if (bucketErr && !bucketErr.message.includes("already exists")) {
    throw new Error(`버킷 생성 실패: ${bucketErr.message}`);
  }

  // 파일 목록 조회
  const { data: files, error: listErr } = await src.storage
    .from(STORAGE_BUCKET)
    .list("", { limit: 1000, offset: 0 });
  if (listErr) throw new Error(`파일 목록 조회 실패: ${listErr.message}`);

  if (!files || files.length === 0) {
    console.log("  → 파일 없음 (건너뜀)");
    return;
  }

  console.log(`  총 ${files.length}개 파일 이관 중...`);
  let done = 0;
  for (const file of files) {
    const { data: blob, error: dlErr } = await src.storage
      .from(STORAGE_BUCKET)
      .download(file.name);
    if (dlErr) {
      console.warn(`  ⚠ ${file.name} 다운로드 실패: ${dlErr.message}`);
      continue;
    }

    const { error: ulErr } = await dst.storage
      .from(STORAGE_BUCKET)
      .upload(file.name, blob, {
        upsert: true,
        contentType: file.metadata?.mimetype,
      });
    if (ulErr) {
      console.warn(`  ⚠ ${file.name} 업로드 실패: ${ulErr.message}`);
      continue;
    }
    done++;
  }
  console.log(`  ✓ ${done} / ${files.length}개 이관 완료`);
}

async function main() {
  if (!OLD_SERVICE_KEY || !NEW_URL || !NEW_SERVICE_KEY) {
    console.error(`
❌ 환경변수가 필요합니다:
   OLD_SUPABASE_SERVICE_KEY=sb_secret_...   (현재 프로젝트 service_role key)
   NEW_SUPABASE_URL=https://xxxx.supabase.co
   NEW_SUPABASE_SERVICE_KEY=sb_secret_...

실행 예시:
   OLD_SUPABASE_SERVICE_KEY=xxx NEW_SUPABASE_URL=https://xxx.supabase.co NEW_SUPABASE_SERVICE_KEY=yyy node scripts/migrate-supabase.mjs
`);
    process.exit(1);
  }

  console.log("=".repeat(50));
  console.log("serentaeri Supabase 이관");
  console.log(`  FROM: ${OLD_URL}`);
  console.log(`  TO:   ${NEW_URL}`);
  console.log("=".repeat(50));

  try {
    console.log("\n[1/2] 테이블 데이터 이관");
    let total = 0;
    for (const table of TABLES) {
      total += await migrateTable(table);
    }
    console.log(`\n  → 총 ${total}개 레코드 이관`);

    console.log("\n[2/2] Storage 이관");
    await migrateStorage();

    console.log("\n" + "=".repeat(50));
    console.log("✅ 이관 완료!");
    console.log("\n다음 단계:");
    console.log("  1. .env 와 .env.local 의 Supabase 값 교체");
    console.log("     - NEXT_PUBLIC_SUPABASE_URL");
    console.log("     - SUPABASE_SERVICE_ROLE_KEY");
    console.log("     - DATABASE_URL / DIRECT_URL");
    console.log("  2. bash push-env.sh  (Vercel 환경변수 업데이트)");
    console.log("  3. 기존 프로젝트 삭제 (Supabase 대시보드 → Settings → Delete project)");
    console.log("=".repeat(50));
  } catch (err) {
    console.error("\n❌ 오류:", err.message);
    process.exit(1);
  }
}

main();
