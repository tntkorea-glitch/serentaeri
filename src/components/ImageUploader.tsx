"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import Image from "next/image";

type Props = {
  name: string;
  initialImages?: string[];
  folder?: string;
};

export default function ImageUploader({
  name,
  initialImages = [],
  folder = "products",
}: Props) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        form.append("folder", folder);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        if (!res.ok) {
          const err = (await res
            .json()
            .catch(() => ({ error: "업로드 실패" }))) as { error?: string };
          throw new Error(err.error ?? `업로드 실패 (${res.status})`);
        }
        const data = (await res.json()) as { url: string };
        uploaded.push(data.url);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "업로드 중 오류");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((u) => u !== url));
    fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }).catch(() => {});
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    void handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <textarea
        name={name}
        value={images.join("\n")}
        readOnly
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only absolute pointer-events-none"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
        }}
        className={`cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition ${
          dragOver
            ? "border-gray-900 bg-gray-50"
            : "border-gray-300 hover:border-gray-500 hover:bg-gray-50"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            void handleFiles(e.target.files)
          }
        />
        <div className="text-sm font-medium text-gray-700 mb-1">
          {uploading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin" />
              업로드 중...
            </span>
          ) : (
            "클릭하거나 이미지를 여기로 드래그"
          )}
        </div>
        <div className="text-xs text-gray-500">
          JPG · PNG · WebP · GIF · AVIF / 최대 8MB / 여러 장 동시 가능
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">⚠ {error}</p>}

      {images.length > 0 && (
        <>
          <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
            {images.map((url, idx) => (
              <div key={url} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative border border-gray-200">
                  <Image
                    src={url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="150px"
                    unoptimized
                  />
                </div>
                {idx === 0 && (
                  <div className="absolute top-1 left-1 text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded">
                    대표
                  </div>
                )}
                <div className="absolute inset-x-1 bottom-1 flex justify-between opacity-0 group-hover:opacity-100 transition">
                  <div className="flex gap-0.5">
                    <button
                      type="button"
                      onClick={() => moveImage(idx, idx - 1)}
                      className="w-6 h-6 bg-white border border-gray-300 rounded text-xs hover:bg-gray-100"
                      disabled={idx === 0}
                      aria-label="앞으로"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(idx, idx + 1)}
                      className="w-6 h-6 bg-white border border-gray-300 rounded text-xs hover:bg-gray-100"
                      disabled={idx === images.length - 1}
                      aria-label="뒤로"
                    >
                      →
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="w-6 h-6 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600"
                    aria-label="이미지 삭제"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            첫 번째 이미지가 대표 이미지입니다. 화살표로 순서 변경, × 로 삭제하세요.
          </p>
        </>
      )}
    </div>
  );
}
