import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase-admin";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "관리자 권한이 필요합니다." },
      { status: 403 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "products");

  if (!(file instanceof Blob) || !("name" in file)) {
    return NextResponse.json(
      { error: "파일이 없습니다." },
      { status: 400 }
    );
  }

  const f = file as File;

  if (!ALLOWED_TYPES.has(f.type)) {
    return NextResponse.json(
      { error: `허용되지 않는 파일 형식: ${f.type}` },
      { status: 400 }
    );
  }

  if (f.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `파일이 너무 큽니다 (${(f.size / 1024 / 1024).toFixed(1)}MB). 최대 8MB.` },
      { status: 400 }
    );
  }

  const ext = f.name.split(".").pop()?.toLowerCase() ?? "bin";
  const safeFolder = folder.replace(/[^a-z0-9\-_]/gi, "");
  const filename = `${safeFolder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(filename, f, {
      contentType: f.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return NextResponse.json(
      { error: `업로드 실패: ${error.message}` },
      { status: 500 }
    );
  }

  const { data } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filename);

  return NextResponse.json({
    url: data.publicUrl,
    path: filename,
    size: f.size,
    type: f.type,
  });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "관리자 권한이 필요합니다." },
      { status: 403 }
    );
  }

  const body = (await request.json()) as { path?: string; url?: string };
  let path = body.path;
  if (!path && body.url) {
    const marker = `/object/public/${STORAGE_BUCKET}/`;
    const idx = body.url.indexOf(marker);
    if (idx >= 0) path = body.url.substring(idx + marker.length);
  }
  if (!path) {
    return NextResponse.json({ error: "path 또는 url 필요" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .remove([path]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
